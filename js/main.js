/**
 * ComfyUI-Translation 主逻辑模块
 */

import { app } from "../../../scripts/app.js";
import { installBlueprintTranslation } from "./BlueprintTranslate.js";
import { applyMenuTranslation, observeFactory } from "./MenuTranslate.js";
import { registerSettings, addPanelButtons, setupPluginManager } from "./SettingsPanel.js";
import {
  isAlreadyTranslatedText,
  isAlreadyTranslated,
  isTranslationEnabled,
  isOptionTranslationEnabled,
  canTranslateDropdownText,
  isProtectedUiText,
  initConfig,
  syncWithComfyLocale,
  watchComfyLocale,
  currentConfig,
  translatedValueSet,
  error
} from "./utils.js";

export class TUtils {
  static T = {
    Menu: {},
    Nodes: {},
    NodeCategory: {},
    Blueprints: {},
  };
  static refreshBlueprintTranslation;
  static menuTranslations = {};

  // ===== 【石头(Q:34720803)优化更新】自定义DOM面板翻译支持 开始 =====
  // 所有节点 ui 字典的汇总，用于翻译挂到 body 下的弹窗等节点外 DOM
  static globalUiDict = {};
  // 已挂载翻译观察器的 DOMWidget 根元素
  static domObserved = new WeakMap();
  static translatedUiText = new WeakMap();
  static inputHooks = new WeakSet();
  // ===== 【石头(Q:34720803)优化更新】自定义DOM面板翻译支持 结束 =====

  static async syncTranslation(OnFinished = () => {}) {
    try {
      translatedValueSet.clear();
      
      if (!isTranslationEnabled()) {
        TUtils.T = { Menu: {}, Nodes: {}, NodeCategory: {}, Blueprints: {} };
        TUtils.menuTranslations = {};
        TUtils.globalUiDict = {}; // 【石头(Q:34720803)优化更新】关闭翻译时同步清空 ui 字典
        OnFinished();
        return;
      }
      
      try {
        const response = await fetch("./translation_node/get_translation", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `locale=${currentConfig.locale}`
        });
        
        if (!response.ok) {
          throw new Error(`请求翻译数据失败: ${response.status} ${response.statusText}`);
        }
        
        const resp = await response.json();
        for (var key in TUtils.T) {
          if (key in resp) TUtils.T[key] = resp[key];
          else TUtils.T[key] = {};
        }

        // 合并分类到菜单中
        TUtils.menuTranslations = TUtils.T.Menu;
        TUtils.T.Menu = Object.assign({}, TUtils.T.Menu || {}, TUtils.T.NodeCategory || {});
        
        // 提取 Node 中 key 到 Menu
        for (let key in TUtils.T.Nodes) {
          let node = TUtils.T.Nodes[key];
          if(node && node["title"]) {
            TUtils.T.Menu = TUtils.T.Menu || {};
            TUtils.T.Menu[key] = node["title"] || key;
          }
        }
        
        // ---- 构建判断用的 Set，提取所有字典内容 ----
        // 注意：跳过“恒等翻译”（值与键相同，如 "cfg": "cfg"），避免英文原名污染已翻译判定
        for (const dict of [TUtils.T.Menu, TUtils.T.NodeCategory]) {
          if (!dict) continue;
          for (const [k, val] of Object.entries(dict)) {
            if (val && typeof val === 'string' && val !== k) translatedValueSet.add(val);
          }
        }
        for (const nodeKey in TUtils.T.Nodes) {
          const nodeDict = TUtils.T.Nodes[nodeKey];
          if (!nodeDict) continue;
          if (nodeDict.title && typeof nodeDict.title === 'string' && nodeDict.title !== nodeKey) translatedValueSet.add(nodeDict.title);
          for (const cat of ['inputs', 'outputs', 'widgets']) {
            if (nodeDict[cat]) {
              for (const [k, val] of Object.entries(nodeDict[cat])) {
                 if (val && typeof val === 'string' && val !== k) translatedValueSet.add(val);
              }
            }
          }
        }

        // 【石头(Q:34720803)优化更新】
        // 汇总各节点的 ui 自定义界面字典（英文原文 -> 中文），供节点 DOM 面板及 body 弹层翻译使用
        TUtils.globalUiDict = {};
        for (const nodeKey in TUtils.T.Nodes) {
          const ui = TUtils.T.Nodes[nodeKey]?.["ui"];
          if (ui && typeof ui === "object") {
            for (const [k, val] of Object.entries(ui)) {
              if (val && typeof val === "string" && val !== k) {
                TUtils.globalUiDict[k] = val;
                translatedValueSet.add(val);
              }
            }
          }
        }

      } catch (e) {
        error("获取翻译数据失败:", e);
      }
      
      OnFinished();
    } catch (err) {
      error("同步翻译过程出错:", err);
      OnFinished();
    }
  }

  static applyNodeTypeTranslationEx(nodeName) {
    try {
      let nodesT = this.T.Nodes;
      var nodeType = LiteGraph.registered_node_types[nodeName];
      if (!nodeType) return;
      
      let class_type = nodeType.comfyClass ? nodeType.comfyClass : nodeType.type;
      if (nodesT.hasOwnProperty(class_type)) {
        const hasNativeTranslation = nodeType.title && isAlreadyTranslatedText(nodeType.title);
        if (!hasNativeTranslation && nodesT[class_type]["title"]) {
          nodeType.title = nodesT[class_type]["title"];
        }
      }
    } catch (e) {
      error(`为节点类型 ${nodeName} 应用翻译失败:`, e);
    }
  }

  static applyVueNodeDisplayNameTranslation(nodeDef) {
    try {
      if (typeof nodeDef?.name !== "string") return;
      if (nodeDef.display_name != null && typeof nodeDef.display_name !== "string") return;
      const nodesT = TUtils.T.Nodes;
      const class_type = nodeDef.name;
      if (nodesT.hasOwnProperty(class_type)) {
        const hasNativeTranslation = nodeDef.display_name && isAlreadyTranslatedText(nodeDef.display_name);
        if (!hasNativeTranslation && nodesT[class_type]["title"]) {
          nodeDef.display_name = nodesT[class_type]["title"];
        }
      }
    } catch (e) {
      error(`为Vue节点 ${nodeDef?.name} 应用显示名称翻译失败:`, e);
    }
  }

  static applyVueNodeTranslation(nodeDef) {
    try {
      const catsT = TUtils.T.NodeCategory;
      if (!nodeDef.category) return;
      const catArr = nodeDef.category.split("/");
      nodeDef.category = catArr.map((cat) => catsT?.[cat] || cat).join("/");
    } catch (e) {
      error(`为Vue节点 ${nodeDef?.name} 应用翻译失败:`, e);
    }
  }

  static applyNodeTypeTranslation(app) {
    try {
      if (!isTranslationEnabled()) return;
      for (let nodeName in LiteGraph.registered_node_types) {
        this.applyNodeTypeTranslationEx(nodeName);
      }
    } catch (e) {
      error("应用节点类型翻译失败:", e);
    }
  }

  static needsTranslation(item) {
    if (typeof item?.name !== "string" || !item.name) return false;
    if (item.label != null && typeof item.label !== "string") return false;

    const rowField = item.name.match(/\.\d+\.([^.]+)$/)?.[1];
    if (rowField && item.label?.endsWith(` ${rowField}`)) return true;
    
    if (isAlreadyTranslated(item.name, item.label)) {
      return false;
    }
    
    return true;
  }

  static safeApplyTranslation(item, translation) {
    if (typeof translation === "string" && translation && this.needsTranslation(item)) {
      if (!item._original_name) {
        item._original_name = item.name;
      }
      const rowField = item.name.match(/\.\d+\.([^.]+)$/)?.[1];
      item.label = rowField && item.label?.endsWith(` ${rowField}`)
        ? item.label.slice(0, -rowField.length) + translation
        : translation;
    }
  }

  static restoreOriginalTranslation(item) {
    if (item._original_name) {
      item.label = item._original_name;
      delete item._original_name;
    } else if (item.label && item.name) {
      item.label = item.name;
    }
  }

  static isCustomNodeTitle(node, translation) {
    const type = node.constructor;
    return !!node.title && ![
      type.comfyClass || type.type, type.title, type.nodeData?.display_name, translation
    ].includes(node.title);
  }

  static applyNodeTranslation(node) {
    try {
      if (!node || !node.constructor) return;

      let keys = ["inputs", "outputs", "widgets"];
      let nodesT = this.T.Nodes;
      let class_type = node.constructor.comfyClass ? node.constructor.comfyClass : node.constructor.type;
      
      if (!class_type) return;

      if (!isTranslationEnabled()) {
        for (let key of keys) {
          if (!node.hasOwnProperty(key)) continue;
          if (!node[key] || !Array.isArray(node[key])) continue;
          node[key].forEach((item) => {
            if (item._original_name) {
              this.restoreOriginalTranslation(item);
            }
          });
        }
        
        if (node._original_title && !node._translation_custom_title) {
          node.title = node._original_title;
          node.constructor.title = node._original_title;
          delete node._original_title;
        }
        return;
      }
      
      if (!nodesT || !nodesT.hasOwnProperty(class_type)) return;
      
      var t = nodesT[class_type];
      if (!t) return;
      
      for (let key of keys) {
        if (!t[key] && !(key === "inputs" && t.widgets)) continue;
        if (!node.hasOwnProperty(key)) continue;
        if (!node[key] || !Array.isArray(node[key])) continue;
        
        node[key].forEach((item) => {
          if (typeof item?.name !== "string" || !item.name) return;
          // 【石头(Q:34720803)优化更新】
          // 控件被“转换为输入”后会作为 input 槽位从工作流恢复，
          // inputs 字典查不到时回退到 widgets 字典（与动态 addInput 路径行为一致）
          const widgetName = typeof item.widget?.name === "string" ? item.widget.name : item.name;
          const trans = t[key]?.[item.name] ?? (key === "inputs" ? t.widgets?.[widgetName] : undefined);
          if (trans !== undefined) {
            const hasNativeTranslation = item.label && isAlreadyTranslatedText(item.label) && !item._original_name;
            if (!hasNativeTranslation) {
              this.safeApplyTranslation(item, trans);
            }
          }
        });
      }
      
      if (t.hasOwnProperty("title")) {
        const hasNativeTranslation = node.title && isAlreadyTranslatedText(node.title);
        const isCustomizedTitle = node._translation_custom_title || this.isCustomNodeTitle(node, t.title);
        
        if (!isCustomizedTitle && !hasNativeTranslation) {
          if (!node._original_title) {
            node._original_title = node.title || node.constructor.nodeData?.display_name || class_type;
          }
          node.title = t["title"];
          node.constructor.title = t["title"];
        }
      }
      
      if (!this.inputHooks.has(node)) {
        this.inputHooks.add(node);
        const onInputAdded = node.onInputAdded;
        node.onInputAdded = function (slot) {
          const result = onInputAdded?.apply(this, arguments);
          if (!slot || !isTranslationEnabled()) return result;
          const dict = TUtils.T.Nodes[class_type];
          const name = slot.name;
          const widgetName = typeof slot.widget?.name === "string" ? slot.widget.name : name;
          if (typeof name === "string") {
            TUtils.safeApplyTranslation(slot, dict?.inputs?.[name] ?? dict?.widgets?.[widgetName]);
          }
          if (dict?.inputs || dict?.widgets) {
            queueMicrotask(() => {
              if (!isTranslationEnabled() || typeof slot.name !== "string") return;
              const current = TUtils.T.Nodes[class_type];
              const currentWidgetName = typeof slot.widget?.name === "string" ? slot.widget.name : slot.name;
              if (slot.name !== name || currentWidgetName !== widgetName) {
                TUtils.safeApplyTranslation(slot, current?.inputs?.[slot.name] ?? current?.widgets?.[currentWidgetName]);
              }
              const widget = this.widgets?.find((item) => item?.name === currentWidgetName);
              if (widget) TUtils.safeApplyTranslation(widget, current?.widgets?.[currentWidgetName]);
            });
          }
          return result;
        };
      }

      // 拦截动态生成的小部件 (addWidget)，确保第三方插件动态添加的控件也能被翻译
      let addWidget = node.addWidget;
      if (addWidget && !node._addWidget_translated) {
        node.addWidget = function (type, name, value, callback, options) {
          // 先让底层创建控件
          let res = addWidget.apply(this, arguments);
          // 控件创建完毕后立刻检查翻译
          if (isTranslationEnabled() && typeof res?.name === "string" && res.name) {
            let class_type = this.constructor.comfyClass || this.constructor.type;
            let dict = TUtils.T.Nodes[class_type];
            if (dict && dict["widgets"] && res.name in dict["widgets"]) {
              TUtils.safeApplyTranslation(res, dict["widgets"][res.name]);
            }
          }
          return res;
        };
        node._addWidget_translated = true; // 防止重复拦截
      }

      // 【石头(Q:34720803)优化更新】
      // 第三方节点通过 addDOMWidget 挂载的自定义 HTML 面板不在 canvas 翻译范围内，
      // 在这里为其安装 DOM 子树翻译
      this.installNodeDomTranslation(node);
    } catch (e) {
      error(`为节点 ${node?.title || '未知'} 应用翻译失败:`, e);
    }
  }

  // ============================================================
  // 【石头(Q:34720803)优化更新】自定义 DOM 面板翻译（通用机制）区块 开始
  // 节点翻译条目支持 "ui": { "英文原文": "中文" }，可翻译该节点通过
  // addDOMWidget 等方式创建的 HTML 界面中的文本节点及 placeholder/title 等属性。
  // ============================================================

  // 【石头(Q:34720803)优化更新】支持翻译的元素属性白名单
  static DOM_TEXT_ATTRIBUTES = ["placeholder", "title", "aria-label"];

  static hasNodeUiTranslation(element, key) {
    const header = element?.closest?.('[data-testid="node-title"]');
    if (header) {
      const id = header.closest("[data-node-id]")?.dataset.nodeId;
      const node = app.canvas?.graph?.getNodeById(id);
      if (node?.isSubgraphNode?.()) return true;
      if (node) {
        const type = node.constructor.comfyClass || node.constructor.type;
        if (this.isCustomNodeTitle(node, this.T.Nodes[type]?.title)) return true;
      }
    }
    for (let current = element; current; current = current.parentElement) {
      const nodeType = this.domObserved.get(current);
      const ui = nodeType && this.T.Nodes[nodeType]?.ui;
      if (ui && Object.hasOwn(ui, key) && typeof ui[key] === "string") return true;
    }
    return false;
  }

  // 【石头(Q:34720803)优化更新】翻译一个 DOM 子树：全等匹配文本节点与白名单属性
  static translateDomSubtree(root, dict, fallback = false) {
    if (!root || root.nodeType !== 1 || !dict) return;
    const has = Object.prototype.hasOwnProperty;
    // 1) 文本节点：仅当整个文本（去除首尾空白后）与字典键完全一致时替换，
    //    保留原有首尾空白；含变量拼接的动态文本因不能全等匹配而自然跳过
    try {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => {
          const key = n.nodeValue && n.nodeValue.trim();
          if (!key || this.translatedUiText.get(n) === n.nodeValue ||
              !has.call(dict, key) || isProtectedUiText(n.parentElement) ||
              !canTranslateDropdownText(n.parentElement) ||
              (fallback && this.hasNodeUiTranslation(n.parentElement, key))) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      const targets = [];
      let cur;
      while ((cur = walker.nextNode())) targets.push(cur);
      for (const tn of targets) {
        const key = tn.nodeValue.trim();
        const translated = dict[key];
        if (typeof translated === "string" && translated !== key) {
          tn.nodeValue = tn.nodeValue.replace(key, () => translated);
          this.translatedUiText.set(tn, tn.nodeValue);
        }
      }
    } catch (e) {
      error("翻译DOM文本节点失败:", e);
    }
    // 2) 常见可翻译属性（输入框 placeholder、悬浮提示 title 等），同样要求完全一致
    try {
      const els = root.querySelectorAll ? [root, ...root.querySelectorAll("*")] : [root];
      for (const el of els) {
        if (el.nodeType !== 1) continue;
        for (const attr of this.DOM_TEXT_ATTRIBUTES) {
          const v = el.getAttribute(attr);
          if (v && has.call(dict, v) && typeof dict[v] === "string" && dict[v] !== v &&
              (!fallback || !this.hasNodeUiTranslation(el, v))) {
            el.setAttribute(attr, dict[v]);
          }
        }
      }
    } catch (e) {
      error("翻译DOM属性失败:", e);
    }
  }

  // 【石头(Q:34720803)优化更新】为节点的 DOMWidget 根元素安装翻译与重绘监听
  static installNodeDomTranslation(node) {
    try {
      if (!isTranslationEnabled() || !node || !Array.isArray(node.widgets)) return;
      const class_type = node.constructor?.comfyClass ? node.constructor.comfyClass : node.constructor?.type;
      const translation = this.T.Nodes[class_type];
      if (!translation) return;
      for (const w of node.widgets) {
        const el = w?.element || w?.domElement;
        if (!el || el.nodeType !== 1 || this.domObserved.has(el)) continue;
        if (!translation.ui && (typeof w.name !== "string" || !translation.widgets?.[w.name])) continue;
        this.domObserved.set(el, class_type);
        // 字典在重新同步翻译后可能整体替换，回调时按类名现取
        const repaint = () => {
          const dict = this.T.Nodes[class_type];
          if (dict?.ui) this.translateDomSubtree(el, dict.ui);
          const name = w.name;
          if (typeof name !== "string") return;
          const placeholder = el.getAttribute("placeholder");
          const label = dict?.widgets?.[name];
          if (typeof label === "string" && label && (placeholder === name || placeholder === name.split(".").at(-1))) {
            el.setAttribute("placeholder", label);
          }
        };
        repaint();
        // 自定义面板常在交互后整体重建（replaceChildren），监听子树变化并按帧合并后幂等重翻
        const observer = new MutationObserver(() => {
          if (el._translationUiRaf) return;
          el._translationUiRaf = requestAnimationFrame(() => {
            el._translationUiRaf = null;
            repaint();
          });
        });
        observer.observe(el, { childList: true, characterData: true, subtree: true });
      }
    } catch (e) {
      error(`为节点 ${node?.title || '未知'} 安装DOM翻译失败:`, e);
    }
  }

  // 【石头(Q:34720803)优化更新】兜底补刷被第三方扩展覆盖/重建的节点槽位标签
  static refreshNodeSlotLabels(node) {
    try {
      const class_type = node.constructor?.comfyClass ? node.constructor.comfyClass : node.constructor?.type;
      const t = class_type && this.T.Nodes[class_type];
      if (!t) return;
      // 兜底：第三方节点可能在本插件应用翻译之后直接改名或重建输入/输出槽位，
      // 周期性补刷可覆盖所有此类时序问题；safeApplyTranslation 本身幂等，不会重复翻译
      for (const key of ["inputs", "outputs", "widgets"]) {
        const arr = node[key];
        if (!Array.isArray(arr)) continue;
        for (const item of arr) {
          if (typeof item?.name !== "string" || !item.name) continue;
          // 【石头(Q:34720803)优化更新】同上：转换为输入的控件在 inputs 中但译文在 widgets 字典里
          const widgetName = typeof item.widget?.name === "string" ? item.widget.name : item.name;
          const trans = t[key]?.[item.name] ?? (key === "inputs" ? t.widgets?.[widgetName] : undefined);
          if (trans !== undefined) {
            this.safeApplyTranslation(item, trans);
          }
        }
      }
    } catch (e) {
      error("补刷节点槽位翻译失败:", e);
    }
  }

  // 【石头(Q:34720803)优化更新】监听 body 顶层新增元素，翻译节点挂到节点子树外的弹窗
  static installGlobalUiObserver() {
    if (this._globalUiObserverInstalled || typeof document === "undefined" || !document.body) return;
    this._globalUiObserverInstalled = true;
    try {
      // 部分节点把预览/编辑弹窗直接挂到 body（位于节点 DOM 子树之外），
      // 监听 body 顶层新增元素，用全部节点 ui 字典的汇总翻译
      const observer = new MutationObserver((mutations) => {
        if (!isTranslationEnabled()) return;
        for (const m of mutations) {
          for (const added of m.addedNodes) {
            if (added.nodeType === 1) this.translateDomSubtree(added, this.globalUiDict, true);
          }
        }
      });
      observer.observe(document.body, { childList: true });
    } catch (e) {
      error("安装全局UI翻译监听失败:", e);
    }
  }

  // 【石头(Q:34720803)优化更新】低频守护轮询：补挂 DOMWidget 观察器并补刷槽位名
  static startTranslationGuard(app) {
    if (this._guardStarted) return;
    this._guardStarted = true;
    try {
      // 低频守护轮询：发现晚于翻译创建的 DOMWidget 根元素并补挂观察器，
      // 同时补刷被第三方扩展覆盖的槽位名
      setInterval(() => {
        if (!isTranslationEnabled()) return;
        const nodes = app?.graph?._nodes;
        if (!Array.isArray(nodes)) return;
        for (const node of nodes) {
          if (!node || !node.constructor) continue;
          this.installNodeDomTranslation(node);
          this.refreshNodeSlotLabels(node);
        }
      }, 1000);
    } catch (e) {
      error("启动翻译守护轮询失败:", e);
    }
  }
  // ============================================================
  // 【石头(Q:34720803)优化更新】自定义 DOM 面板翻译（通用机制）区块 结束
  // ============================================================

  static applyNodeDescTranslation(nodeType, nodeData, app) {
    try {
      if (!isTranslationEnabled()) return;
      
      let nodesT = this.T.Nodes;
      var t = nodesT[nodeType.comfyClass];
      if (t?.["description"]) {
        nodeData.description = t["description"];
      }

      if (t) {
        var nodeInputT = t["inputs"] || {};
        var nodeWidgetT = t["widgets"] || {};
        for (let itype in nodeData.input) {
          for (let socketname in nodeData.input[itype]) {
            let inp = nodeData.input[itype][socketname];
            if (inp[1] === undefined || !inp[1].tooltip) continue;
            var tooltip = inp[1].tooltip;
            var tooltipT = nodeInputT[tooltip] || nodeWidgetT[tooltip] || tooltip;
            inp[1].tooltip = tooltipT;
          }
        }
        
        var nodeOutputT = t["outputs"] || {};
        for (var i = 0; i < (nodeData.output_tooltips || []).length; i++) {
          var tooltip = nodeData.output_tooltips[i];
          var tooltipT = nodeOutputT[tooltip] || tooltip;
          nodeData.output_tooltips[i] = tooltipT;
        }
      }
    } catch (e) {
      error(`为节点 ${nodeType?.comfyClass || '未知'} 应用描述翻译失败:`, e);
    }
  }

  static applyMenuTranslation(app) {
    try {
      if (!isTranslationEnabled()) return;
      applyMenuTranslation(TUtils.T, (element, key) => this.hasNodeUiTranslation(element, key));
      
      const dragHandle = app.ui.menuContainer.querySelector(".drag-handle");
      if (dragHandle && dragHandle.childNodes[1]) {
        observeFactory(dragHandle.childNodes[1], (mutationsList, observer) => {
          for (let mutation of mutationsList) {
            for (let node of mutation.addedNodes) {
              var match = node.data?.match(/(Queue size:) (\w+)/);
              if (match?.length == 3) {
                const t = TUtils.T.Menu[match[1]] ? TUtils.T.Menu[match[1]] : match[1];
                node.data = t + " " + match[2];
              }
            }
          }
        });
      }
    } catch (e) {
      error("应用菜单翻译失败:", e);
    }
  }

  static applyContextMenuTranslation() {
    try {
      if (!isTranslationEnabled()) return;

      const canvasItems = new WeakSet();
      const getCanvasMenuOptions = LGraphCanvas.prototype.getCanvasMenuOptions;
      LGraphCanvas.prototype.getCanvasMenuOptions = function (...args) {
        const items = getCanvasMenuOptions.apply(this, args);
        for (const item of items ?? []) {
          if (item && typeof item === "object") canvasItems.add(item);
        }
        return items;
      };

      function openContextMenu(target, [items, options = {}]) {
        const ctx = Reflect.construct(target, [items, options]);
        const menu = TUtils.T.Menu;
        const nodes = TUtils.T.Nodes;
        const title = ctx.root.querySelector(":scope > .litemenu-title");
        if (title && Object.hasOwn(nodes, title.textContent)) {
          title.textContent = nodes[title.textContent]?.title || title.textContent;
        }

        // Core extensions wrap the constructor and keep the original items for
        // filtering and callbacks. Translate only the visible labels.
        for (const entry of ctx.root.querySelectorAll(":scope > .litemenu-entry")) {
          const item = entry.value;
          const content = typeof item === "string" ? item : item?.content;
          if (typeof content !== "string" || entry.childElementCount) continue;
          let label;
          if (typeof item?.value === "string" && Object.hasOwn(nodes, item.value)) {
            label = nodes[item.value]?.title;
          }
          if (!label && (canvasItems.has(item) || isOptionTranslationEnabled()) && Object.hasOwn(menu, content)) {
            label = menu[content];
          }
          if (!label && typeof item === "object") {
            const converted = content.match(/^Convert (.+) to (input|widget)$/);
            if (converted) {
              const [, field, target] = converted;
              const node = options.extra ?? options.parentMenu?.options?.extra;
              const slot = node?.inputs?.find((input) => input.name === field) ??
                node?.widgets?.find((widget) => widget.name === field);
              label = (menu["Convert "] ?? "Convert ") + (slot?.label || field) +
                (menu[` to ${target}`] ?? ` to ${target}`);
            }
          }
          if (typeof label === "string" && label && entry.textContent === content) {
            entry.textContent = label;
          }
        }

        // LiteGraph opens child menus through the instance constructor.
        Object.defineProperty(ctx, "constructor", { value: LiteGraph.ContextMenu, configurable: true, writable: true });
        return ctx;
      }

      LiteGraph.ContextMenu = new Proxy(LiteGraph.ContextMenu, {
        construct: openContextMenu,
        apply: (target, _thisArg, args) => openContextMenu(target, args)
      });
    } catch (e) {
      error("应用上下文菜单翻译失败:", e);
    }
  }

  static addRegisterNodeDefCB(app) {
    try {
      const f = app.registerNodeDef;
      app.registerNodeDef = async function (nodeId, nodeData) {
        var res = f.apply(this, arguments);
        res.then(() => {
          TUtils.applyNodeTypeTranslationEx(nodeId);
        });
        return res;
      };
    } catch (e) {
      error("添加节点定义注册回调失败:", e);
    }
  }

  static addNodeTitleMonitoring(app) {
    try {
      if (typeof LGraphNode === 'undefined') return;
      const originalSetTitle = LGraphNode.prototype.setTitle || function(title) { this.title = title; };
      LGraphNode.prototype.setTitle = function(title) {
        if (title && title !== this.constructor.title) { this._translation_custom_title = true; }
        return originalSetTitle.call(this, title);
      };
    } catch (e) {
      error("添加节点标题监听失败:", e);
    }
  }
}

const ext = {
  name: "ComfyUI.TranslationNode",
  
  async init(app) {
    try {
      await initConfig();
      // 默认开启：读取 ComfyUI 官方语言(Comfy.Locale)决定本次会话的翻译语言
      await syncWithComfyLocale(app);
      // 用户在设置中切换 Comfy.Locale 后自动刷新页面，使翻译与配置界面立即生效
      watchComfyLocale(app);
      await registerSettings(app);

      await TUtils.syncTranslation();
    } catch (e) {
      error("扩展初始化失败:", e);
    }
  },
  
  async setup(app) {
    try {      
      TUtils.addNodeTitleMonitoring(app);
      
      if (isTranslationEnabled()) {
        TUtils.applyNodeTypeTranslation(app);
        TUtils.applyContextMenuTranslation();
        TUtils.applyMenuTranslation(app);
        TUtils.addRegisterNodeDefCB(app);
      }
      
      // 【石头(Q:34720803)优化更新】启动自定义DOM面板翻译：body 弹层监听 + 守护轮询
      TUtils.installGlobalUiObserver();
      TUtils.startTranslationGuard(app);

      addPanelButtons(app);
      setupPluginManager();

      if (isTranslationEnabled()) {
        TUtils.refreshBlueprintTranslation = installBlueprintTranslation(
          app,
          () => isTranslationEnabled() ? TUtils.T : null,
          () => TUtils.menuTranslations
        );
      }
    } catch (e) {
      error("扩展设置失败:", e);
    }
  },
  
  async beforeRegisterNodeDef(nodeType, nodeData, app) {
    try {
      TUtils.applyNodeDescTranslation(nodeType, nodeData, app);
    } catch (e) {
      error(`注册节点定义前处理失败 (${nodeType?.comfyClass || '未知'}):`, e);
    }
  },
  
  beforeRegisterVueAppNodeDefs(nodeDefs) {
    try {
      if (!isTranslationEnabled()) return;
      nodeDefs.forEach(TUtils.applyVueNodeDisplayNameTranslation);
      nodeDefs.forEach(TUtils.applyVueNodeTranslation);
    } catch (e) {
      error("注册Vue应用节点定义前处理失败:", e);
    }
  },
  
  loadedGraphNode(node, app) {
    try {
      const originalTitle = node.constructor.comfyClass || node.constructor.type;
      const nodeT = TUtils.T.Nodes[originalTitle];
      const translatedTitle = nodeT?.title;
      
      if (TUtils.isCustomNodeTitle(node, translatedTitle)) {
        node._translation_custom_title = true;
      }
      TUtils.applyNodeTranslation(node);
    } catch (e) {
      error(`加载图表节点处理失败 (${node?.title || '未知'}):`, e);
    }
  },
  
  afterConfigureGraph() {
    TUtils.refreshBlueprintTranslation?.();
  },

  nodeCreated(node, app) {
    try {
      TUtils.applyNodeTranslation(node);
    } catch (e) {
      error(`创建节点处理失败 (${node?.title || '未知'}):`, e);
    }
  },
};

app.registerExtension(ext);
