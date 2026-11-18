"""
ComfyUI-Translation 插件主初始化文件
主要功能：提供多语言翻译服务的后端API，管理翻译配置和资源文件
"""

import asyncio
import gzip
import os
import json
import logging
import platform
import sys
import shutil
import stat
import atexit
import server
import folder_paths
from aiohttp import web
from collections import OrderedDict
from copy import deepcopy
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from threading import Lock
from typing import Optional

try:
    from comfyui_workflow_templates import get_asset_path, iter_templates
except ImportError:
    iter_templates = None

# 插件版本信息
VERSION = "3.5.3"
# 插件名称
ADDON_NAME = "ComfyUI-Global-Translation"
# ComfyUI 主程序路径
COMFY_PATH = Path(folder_paths.__file__).parent
# 当前插件路径
CUR_PATH = Path(__file__).parent
FALLBACK_LOCALE = "en-US"
LOGGER = logging.getLogger(__name__)
TRANSLATION_CACHE_SIZE = 8
translation_cache = OrderedDict()
translation_work = {}
blueprint_catalog_lock = Lock()


def read_json(path: Path, *, object_only=False, read_errors=None, **kwargs):
    try:
        content = path.read_bytes()
        try:
            data = json.loads(content.decode("utf-8-sig"), **kwargs)
        except UnicodeDecodeError:
            data = json.loads(content.decode("gbk"), **kwargs)
        if object_only and not isinstance(data, dict):
            raise ValueError("expected a JSON object")
        return data
    except (OSError, ValueError, RecursionError) as exc:
        if read_errors is not None and isinstance(exc, OSError):
            read_errors.append(path)
        LOGGER.warning("Cannot read translation JSON %s: %s", path, exc)
        return None


def disabled_plugin_names(value):
    return [name for name in value if isinstance(name, str)] if isinstance(value, list) else []


def load_config():
    config_path = CUR_PATH.joinpath("config.json")
    default_config = {"translation_enabled": True, "locale": "zh-CN", "button_style": "gradient", "disabled_plugins": [], "translate_options": True}
    if config_path.exists():
        config_data = read_json(config_path, object_only=True)
        if isinstance(config_data, dict):
            default_config.update(config_data)
            default_config["disabled_plugins"] = disabled_plugin_names(default_config["disabled_plugins"])
    return default_config

# 全局配置变量 - 存储翻译启用状态和当前语言
GLOBAL_CONFIG = load_config()


def sanitize_locale(locale):
    """校验调用方传入的语言代码，防止路径穿越出插件目录。
    仅接受插件目录下的单层目录名：拒绝非字符串、绝对路径、含 .. 或分隔符的路径，
    并用 realpath + commonpath 兜底确认解析结果仍在插件目录内。
    通过校验返回原始 locale 字符串，否则返回 None。"""
    if not isinstance(locale, str) or not locale:
        return None
    p = Path(locale)
    if p.is_absolute() or ".." in p.parts or len(p.parts) != 1:
        return None
    base = os.path.realpath(CUR_PATH)
    candidate = os.path.realpath(os.path.join(base, *p.parts))
    try:
        if os.path.commonpath([base, candidate]) != base:
            return None
    except ValueError:
        # Windows 下不同盘符等场景 commonpath 会抛错，一律视为非法
        return None
    return locale


def merge_translation(base, incoming, *, deep=False, conflicts=None, prefix=()):
    for key, value in incoming.items():
        if deep and isinstance(value, dict) and isinstance(base.get(key), dict):
            merge_translation(base[key], value, deep=True, conflicts=conflicts, prefix=(*prefix, key))
        else:
            if conflicts is not None and key in base and base[key] != value:
                conflicts.append(".".join((*prefix, key)))
            base[key] = value


def reject_nonfinite_number(value):
    raise ValueError(f"Invalid JSON number: {value}")


def read_translation_dict(path, read_errors):
    duplicate_keys = set()
    options = {"parse_constant": reject_nonfinite_number}
    if LOGGER.isEnabledFor(logging.DEBUG):
        def collect_duplicates(pairs):
            result = {}
            for key, value in pairs:
                if key in result and result[key] != value:
                    duplicate_keys.add(key)
                result[key] = value
            return result

        options["object_pairs_hook"] = collect_duplicates
    data = read_json(path, object_only=True, read_errors=read_errors, **options)
    if duplicate_keys:
        LOGGER.debug("Translation dictionary %s has conflicting duplicate keys: %s", path, ", ".join(sorted(duplicate_keys)))
    return data or {}


def merge_translation_file(base, incoming, path, *, deep=False):
    conflicts = [] if LOGGER.isEnabledFor(logging.DEBUG) else None
    merge_translation(base, incoming, deep=deep, conflicts=conflicts)
    if conflicts:
        LOGGER.debug("Translation dictionary %s overrides these keys: %s", path, ", ".join(conflicts))


def record_translation_scan_error(path, exc, scan_errors):
    LOGGER.warning("Cannot inspect translation path %s: %s", path, exc)
    if scan_errors is not None:
        scan_errors.append(path)


def translation_file_entries(path, scan_errors=None):
    # Stable across filesystems: later names win unless the registered node has a matching source.
    try:
        with os.scandir(path) as entries:
            return sorted(
                (entry for entry in entries if os.path.normcase(entry.name).endswith(".json")),
                key=lambda entry: (entry.name.casefold(), entry.name),
            )
    except (FileNotFoundError, NotADirectoryError):
        return []
    except OSError as exc:
        record_translation_scan_error(path, exc, scan_errors)
        return []


def nodes_translation_path(locale, scan_errors=None):
    path = CUR_PATH.joinpath(locale, "Nodes")
    try:
        if stat.S_ISDIR(path.stat().st_mode):
            return path
    except (FileNotFoundError, NotADirectoryError):
        pass
    except OSError as exc:
        record_translation_scan_error(path, exc, scan_errors)
        return path
    return CUR_PATH.joinpath(FALLBACK_LOCALE, "Nodes")


def node_source_name(node_class):
    module = getattr(node_class, "RELATIVE_PYTHON_MODULE", "nodes")
    if not isinstance(module, str):
        return None
    package, _, module_name = module.partition(".")
    if package == "custom_nodes":
        return module_name.casefold().replace("-", "_")
    if package in ("nodes", "comfy_extras"):
        return "internal"
    if package == "comfy_api_nodes":
        return "comfyui_api_partner"


def translation_revision(path, read_stat, scan_errors, accepts_mode=stat.S_ISREG):
    try:
        info = read_stat()
    except (FileNotFoundError, NotADirectoryError):
        return None
    except OSError as exc:
        record_translation_scan_error(path, exc, scan_errors)
        return None
    if accepts_mode(info.st_mode):
        return path, info.st_size, info.st_mtime_ns, info.st_ctime_ns, info.st_ino


def directory_revisions(path, scan_errors, disabled=()):
    revisions = []
    for entry in translation_file_entries(path, scan_errors):
        source = Path(entry.path)
        if source.stem not in disabled:
            revision = translation_revision(source, entry.stat, scan_errors)
            if revision is not None:
                revisions.append(revision)
    return tuple(revisions)


def flat_dictionary_revisions(locale, directory, single_file, scan_errors):
    override = CUR_PATH.joinpath(locale, single_file)
    local = translation_revision(override, override.stat, scan_errors)
    files = directory_revisions(CUR_PATH.joinpath(locale, directory), scan_errors)
    if local is not None:
        return (*files, local)

    fallback = CUR_PATH.joinpath(FALLBACK_LOCALE, single_file)
    default = translation_revision(fallback, fallback.stat, scan_errors)
    return files if default is None else (default, *files)


def translation_inputs(locale, disabled_plugins):
    scan_errors = []
    disabled = set(disabled_plugin_names(disabled_plugins))
    node_directory = nodes_translation_path(locale, scan_errors)
    locale_path = CUR_PATH.joinpath(locale)
    directories = (node_directory, locale_path.joinpath("Categories"), locale_path.joinpath("Menus"))
    # Windows atomic replacements can retain file timestamps and size. Observe
    # the containing directories as well, without opening each dictionary.
    directory_stamps = tuple(translation_revision(path, path.stat, scan_errors, stat.S_ISDIR) for path in directories)
    node_files = directory_revisions(node_directory, scan_errors, disabled)
    category_files = flat_dictionary_revisions(locale, "Categories", "NodeCategory.json", scan_errors)
    menu_files = flat_dictionary_revisions(locale, "Menus", "Menu.json", scan_errors)
    registered = getattr(sys.modules.get("nodes"), "NODE_CLASS_MAPPINGS", {})
    # Capture the source priority used by compilation as part of the cache key.
    sources = tuple(sorted((name, node_source_name(cls)) for name, cls in registered.copy().items()))
    inputs = node_files, category_files, menu_files, sources, directory_stamps
    return inputs, not scan_errors


def get_nodes_translation(files, sources, read_errors):
    translations = {}
    preferred = {}
    for path, *_ in files:
        dictionary = read_translation_dict(path, read_errors)
        source = path.stem.casefold().replace("-", "_")
        matching = {key: value for key, value in dictionary.items() if sources.get(key) == source}
        if matching:
            merge_translation(preferred, deepcopy(matching), deep=True)
        merge_translation_file(translations, dictionary, path, deep=True)
    merge_translation_file(translations, preferred, "registered node sources", deep=True)
    return translations


def get_flat_translation(files, read_errors):
    translations = {}
    for path, *_ in files:
        merge_translation_file(translations, read_translation_dict(path, read_errors), path)
    return translations


@lru_cache(maxsize=1)
def get_blueprint_catalog():
    catalog = {}
    sources = [(path, True) for path in COMFY_PATH.joinpath("blueprints").glob("*.json")]
    templates = ()
    if iter_templates is not None:
        try:
            templates = iter_templates()
        except (OSError, ValueError, KeyError, TypeError, AttributeError):
            pass
    for template in templates:
        for asset in template.assets:
            if isinstance(asset.filename, str) and asset.filename.endswith(".json"):
                try:
                    sources.append((Path(get_asset_path(template.template_id, asset.filename)), False))
                except (OSError, KeyError):
                    continue
    seen = set()
    for path, from_library in sources:
        workflow = read_json(path)
        nodes = workflow.get("nodes") if isinstance(workflow, dict) else None
        if not isinstance(nodes, list):
            continue
        nodes = [node for node in nodes if isinstance(node, dict)]
        if not nodes:
            continue
        definitions = workflow.get("definitions")
        subgraphs = definitions.get("subgraphs") if isinstance(definitions, dict) else None
        if not isinstance(subgraphs, list):
            continue
        instances = nodes + [
            node
            for definition in subgraphs
            if isinstance(definition, dict) and isinstance(definition.get("nodes"), list)
            for node in definition.get("nodes", [])
            if isinstance(node, dict)
        ]
        for graph in subgraphs:
            graph_id = graph.get("id") if isinstance(graph, dict) else None
            if not isinstance(graph_id, str) or (from_library and graph_id != nodes[0].get("type")):
                continue
            name = graph.get("name")
            if not isinstance(name, str) or not name:
                continue
            instance = next((node for node in instances if node.get("type") == graph_id), {})
            title = instance.get("title")
            title = title if isinstance(title, str) and title else name
            file = path.stem if from_library else name
            slot_ids = []
            labels = {}
            for direction in ("inputs", "outputs"):
                slots = graph.get(direction)
                if not isinstance(slots, list):
                    continue
                slot_ids.extend(
                    slot["id"]
                    for slot in slots
                    if isinstance(slot, dict) and isinstance(slot.get("id"), str)
                )
                labels[direction] = {
                    slot["name"]: slot.get("label") or slot.get("localized_name") or slot["name"]
                    for slot in slots
                    if isinstance(slot, dict) and isinstance(slot.get("name"), str)
                }
            blueprint = {
                "id": graph_id,
                "name": name,
                "title": title,
                "file": file,
                "slots": slot_ids,
                "labels": labels,
            }
            signature = json.dumps(blueprint, sort_keys=True)
            if signature in seen:
                continue
            seen.add(signature)
            for alias in dict.fromkeys((name, file, title)):
                catalog.setdefault(alias, []).append(blueprint)
            if from_library:
                break
    return catalog


def get_blueprint_translation(menus):
    with blueprint_catalog_lock:
        blueprints_by_name = get_blueprint_catalog()
    catalog = {
        name: [
            {
                **blueprint,
                "label": menus.get(blueprint["file"]) or menus.get(blueprint["title"]) or menus.get(blueprint["name"]),
            }
            for blueprint in blueprints
        ]
        for name, blueprints in blueprints_by_name.items()
    }
    return {"catalog": catalog}


@dataclass
class TranslationPayload:
    plain: bytes
    cacheable: bool
    gzipped: Optional[bytes] = None


def compile_translation(inputs):
    node_files, category_files, menu_files, sources, _directory_stamps = inputs
    read_errors = []
    nodes_translation = get_nodes_translation(node_files, dict(sources), read_errors)
    node_category_translation = get_flat_translation(category_files, read_errors)
    menu_translation = get_flat_translation(menu_files, read_errors)

    data = json.dumps({
        "Nodes": nodes_translation,
        "NodeCategory": node_category_translation,
        "Menu": menu_translation,
        "Blueprints": get_blueprint_translation(menu_translation)
    }, ensure_ascii=False)
    return TranslationPayload(data.encode("utf-8"), cacheable=not read_errors)


def gzip_translation(payload):
    payload.gzipped = gzip.compress(payload.plain)
    return payload.gzipped


async def run_translation_work(key, operation, *args, on_success=None):
    future = translation_work.get(key)
    if future is None:
        future = asyncio.get_running_loop().run_in_executor(None, operation, *args)
        translation_work[key] = future

        def completed(result):
            translation_work.pop(key, None)
            if not result.cancelled() and result.exception() is None and on_success is not None:
                on_success(result.result())

        future.add_done_callback(completed)
    # A disconnected client must not cancel work shared by other requests.
    return await asyncio.shield(future)


async def get_translation_body(locale, disabled_plugins, compressed):
    loop = asyncio.get_running_loop()
    inputs, scan_succeeded = await loop.run_in_executor(None, translation_inputs, locale, disabled_plugins)
    payload = translation_cache.get(inputs) if scan_succeeded else None
    if payload is not None:
        translation_cache.move_to_end(inputs)
    else:
        def cache_payload(result):
            # Incomplete results from temporary filesystem errors must be retried.
            if scan_succeeded and result.cacheable:
                translation_cache[inputs] = result
                if len(translation_cache) > TRANSLATION_CACHE_SIZE:
                    translation_cache.popitem(last=False)

        payload = await run_translation_work(
            ("compile", inputs, scan_succeeded), compile_translation, inputs, on_success=cache_payload
        )
    if not compressed:
        return payload.plain
    if payload.gzipped is None:
        return await run_translation_work(("gzip", id(payload)), gzip_translation, payload)
    return payload.gzipped


def accepts_gzip(accept_encoding):
    qualities = {}
    for entry in accept_encoding.split(","):
        coding, _, parameters = entry.partition(";")
        coding = coding.strip().lower()
        if coding not in ("gzip", "identity", "*"):
            continue
        quality = 1.0
        for parameter in parameters.split(";"):
            name, _, value = parameter.partition("=")
            if name.strip().lower() == "q":
                try:
                    quality = float(value)
                except ValueError:
                    quality = 0.0
                break
        qualities[coding] = quality if 0 <= quality <= 1.0 else 0.0
    gzip_quality = qualities.get("gzip", qualities.get("*", 0.0))
    return gzip_quality > 0 and gzip_quality >= qualities.get("identity", 0.0)


@server.PromptServer.instance.routes.get("/translation_node/get_locales")
async def get_locales(request: web.Request):
    """
    API端点: 获取支持的语言列表
    扫描插件目录，返回所有包含语言文件的文件夹名称
    """
    locales = sorted(
        item.name for item in CUR_PATH.iterdir() if item.is_dir() and (
            any(item.joinpath(name).is_dir() for name in ("Nodes", "Menus", "Categories"))
            or any(item.joinpath(name).is_file() for name in ("Menu.json", "NodeCategory.json"))
        )
    )
    if not locales:
        locales = [FALLBACK_LOCALE, "zh-CN"]
    return web.Response(status=200, body=json.dumps(locales), headers={"Content-Type": "application/json"})


@server.PromptServer.instance.routes.post("/translation_node/get_translation")
async def get_translation(request: web.Request):
    post = await request.post()
    locale = post.get("locale", GLOBAL_CONFIG.get("locale", "zh-CN"))
    if sanitize_locale(locale) is None:
        return web.Response(status=400, body=json.dumps({"error": "invalid locale"}), headers={"Content-Type": "application/json"})
    accept_encoding = request.headers.get("Accept-Encoding", "")
    headers = {"Vary": "Accept-Encoding"}

    # 翻译的启用/停用由前端决定：默认不翻译，前端在跟随 Comfy.Locale 或用户手动开启时才会请求本接口。
    # 因此服务端不再按 translation_enabled 拦截，仅按请求的 locale 返回对应译文。
    disabled_plugins = GLOBAL_CONFIG.get("disabled_plugins", [])

    try:
        compressed = accepts_gzip(accept_encoding)
        json_data = await get_translation_body(locale, disabled_plugins, compressed)
        if compressed:
            headers["Content-Encoding"] = "gzip"
    except Exception:
        LOGGER.exception("Cannot compile translations for %s", locale)
        return web.json_response({"error": "cannot compile translations"}, status=500)

    return web.Response(body=json_data, headers=headers, content_type="application/json")


@server.PromptServer.instance.routes.get("/translation_node/get_config")
async def get_config(request: web.Request):
    # 每次从磁盘重新读取，确保前端始终拿到最后一次保存的配置
    # （避免启动时读取失败回退默认值后，内存与磁盘长期分歧）
    global GLOBAL_CONFIG
    GLOBAL_CONFIG = load_config()
    return web.Response(status=200, body=json.dumps(GLOBAL_CONFIG), headers={"Content-Type": "application/json"})


@server.PromptServer.instance.routes.get("/translation_node/get_plugin_list")
async def get_plugin_list(request: web.Request):
    """
    API端点: 获取当前语言的插件翻译文件列表
    返回所有 JSON 文件名（不含扩展名）
    """
    # 优先用前端传入的实际翻译语言（与 get_translation 同源），回退磁盘配置，
    # 避免语言改为跟随 Comfy.Locale 后磁盘 locale 滞后导致列表与实际翻译语言不一致
    locale = request.query.get("locale") or GLOBAL_CONFIG.get("locale", "zh-CN")
    if sanitize_locale(locale) is None:
        return web.Response(status=400, body=json.dumps({"error": "invalid locale"}), headers={"Content-Type": "application/json"})
    plugins = [Path(entry.name).stem for entry in translation_file_entries(nodes_translation_path(locale))]
    return web.Response(status=200, body=json.dumps(plugins, ensure_ascii=False), headers={"Content-Type": "application/json"})


@server.PromptServer.instance.routes.post("/translation_node/set_config")
async def set_config(request: web.Request):
    try:
        post = await request.post()
        enabled = post.get("translation_enabled", "true").lower() == "true"
        locale = post.get("locale", "zh-CN")
        button_style = post.get("button_style", "gradient")

        # 解析禁用插件列表
        disabled_plugins_str = post.get("disabled_plugins", "[]")
        try:
            disabled_plugins = disabled_plugin_names(json.loads(disabled_plugins_str))
        except (json.JSONDecodeError, TypeError):
            disabled_plugins = []

        # 解析选项翻译开关
        translate_options = post.get("translate_options", "true").lower() == "true"

        config_data = {
            "translation_enabled": enabled,
            "locale": locale,
            "button_style": button_style,
            "disabled_plugins": disabled_plugins,
            "translate_options": translate_options
        }
        config_path = CUR_PATH.joinpath("config.json")

        with open(config_path, 'w', encoding='utf-8') as f:
            json.dump(config_data, f, indent=2, ensure_ascii=False)

        global GLOBAL_CONFIG
        GLOBAL_CONFIG = config_data

        return web.Response(status=200, body=json.dumps({"success": True, "config": config_data}), headers={"Content-Type": "application/json"})
    except Exception as e:
        return web.Response(status=500, body=json.dumps({"success": False, "error": str(e)}), headers={"Content-Type": "application/json"})


def rmtree(path: Path):
    if not path.exists():
        return
    if Path(path.resolve()).as_posix() != path.as_posix():
        path.unlink()
        return
    if path.is_file():
        path.unlink()
    elif path.is_dir():
        if path.name == ".git":
            if platform.system() == "darwin":
                from subprocess import call
                call(['rm', '-rf', path.as_posix()])
            elif platform.system() == "Windows":
                os.system(f'rd/s/q "{path.as_posix()}"')
            return
        for child in path.iterdir():
            rmtree(child)
        try:
            path.rmdir()
        except BaseException:
            pass


def register():
    import nodes
    translation_node_ext_path = COMFY_PATH.joinpath("web", "extensions", ADDON_NAME)
    if hasattr(nodes, "EXTENSION_WEB_DIRS"):
        rmtree(translation_node_ext_path)
        return
    
    try:
        if os.name == "nt":
            try:
                import _winapi
                _winapi.CreateJunction(CUR_PATH.as_posix(), translation_node_ext_path.as_posix())
            except WindowsError:
                shutil.copytree(CUR_PATH.as_posix(), translation_node_ext_path.as_posix(), ignore=shutil.ignore_patterns(".git"))
        else:
            shutil.copytree(CUR_PATH.as_posix(), translation_node_ext_path.as_posix(), ignore=shutil.ignore_patterns(".git"))
    except Exception:
        pass


def unregister():
    translation_node_ext_path = COMFY_PATH.joinpath("web", "extensions", ADDON_NAME)
    try:
        rmtree(translation_node_ext_path)
    except BaseException:
        pass

register()
atexit.register(unregister)

NODE_CLASS_MAPPINGS = {}
WEB_DIRECTORY = "./js"

__all__ = ["NODE_CLASS_MAPPINGS", "WEB_DIRECTORY"]
__version__ = VERSION
