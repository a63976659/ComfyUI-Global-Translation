const vueTitleSelector = '[data-testid="node-title"] .editable-text > span';
const vueHeaderSelector = '[data-testid^="node-header-"]';
const vueWidgetSelector = '[data-testid="node-widgets"] [data-widget-name]';
const vueTextareaSelector = `${vueWidgetSelector} textarea`;
const vueWidgetLabelSelector = `${vueWidgetSelector} label[for]`;
const vueTextSelector = `${vueTitleSelector}, ${vueTextareaSelector}, ${vueWidgetLabelSelector}`;

function getBlueprint(node, catalog) {
  if (!node.isSubgraphNode?.() || !catalog) return;
  const graph = node.subgraph;
  const definitions = Object.hasOwn(catalog, graph.name) ? catalog[graph.name] : [];

  // Clipboard insertion remaps the definition UUID but keeps its boundary slot IDs.
  const slotIds = new Set([...graph.inputNode.slots, ...graph.outputNode.slots].map((slot) => slot.id));
  const named = definitions.filter((definition) => definition.id === graph.id ||
    definition.slots.some((id) => slotIds.has(id)));

  // Renaming in the UI also changes the definition name. Recover the labels
  // from its complete original boundary, allowing new promoted ports.
  const matches = named.length ? named : Object.values(catalog).flat().filter((definition) =>
    definition.slots.length && definition.slots.every((id) => slotIds.has(id))
  );
  if (!matches.length) return;
  const ranked = matches.map((definition) => ({
    definition,
    count: definition.slots.filter((id) => slotIds.has(id)).length,
  }));
  const largest = Math.max(...ranked.map(({ count }) => count));
  const best = ranked.filter(({ count }) => count === largest).map(({ definition }) => definition);
  const [first] = best;
  const labels = Object.fromEntries(["inputs", "outputs"].map((direction) => [
    direction,
    Object.fromEntries(Object.entries(first.labels[direction] ?? {}).filter(([name, label]) =>
      best.every((definition) => definition.labels[direction]?.[name] === label)
    )),
  ]));
  const title = named.length && best.every((definition) => definition.label === first.label)
    ? first : {};
  return { ...title, labels };
}

function getTitleTranslation(original, blueprint) {
  if (typeof blueprint?.label === "string" && [blueprint.name, blueprint.title, blueprint.file].includes(original)) {
    return blueprint.label;
  }
}

function normalizeComponentName(name) {
  return name.toLowerCase().replace(/[\s_-]+/g, " ").trim();
}

function getInternalTranslation(graph, slot, direction, label, nodes, visited = new Set()) {
  if (!slot?.linkIds.length || visited.has(slot)) return;
  const path = new Set(visited).add(slot);
  const normalizedLabel = normalizeComponentName(label);
  const translations = slot.linkIds.map((id) => {
    const connection = graph.getLink(id)?.resolve(graph);
    const internalNode = direction === "inputs" ? connection?.inputNode : connection?.outputNode;
    const field = direction === "inputs" ? connection?.input : connection?.output;
    const translation = nodes[internalNode?.type];
    if (!field || ![field.name, field.localized_name, field.label].some(
      (name) => typeof name === "string" && normalizeComponentName(name) === normalizedLabel
    )) return;
    if (internalNode.isSubgraphNode?.()) {
      const nested = internalNode.subgraph;
      const boundary = direction === "inputs" ? field._subgraphSlot :
        nested.outputNode.slots[internalNode.outputs.indexOf(field)];
      return getInternalTranslation(nested, boundary, direction, label, nodes, path);
    }
    return translation?.[direction]?.[field.name] ??
      (direction === "inputs" ? translation?.widgets?.[field.name] : undefined);
  });
  const [first] = translations;
  if (first && translations.every((translation) => translation === first)) return first;
}

export function installBlueprintTranslation(app, getTranslations, getMenus) {
  const originals = new WeakMap();
  const workflowDefinitions = new WeakMap();
  const observedGraphs = new WeakSet();
  const decorated = new WeakSet();
  const vuePlaceholders = new WeakMap();
  const vueWidgetLabels = new WeakMap();
  const canvasContainer = app.canvas.canvas.parentElement;
  let menu;
  let normalizedMenu;
  let refreshQueued = false;

  function getMenuTranslation(name) {
    const currentMenu = getMenus();
    if (currentMenu !== menu) {
      menu = currentMenu;
      normalizedMenu = new Map();
      for (const [key, value] of Object.entries(menu)) {
        if (typeof value !== "string" || !value) continue;
        const normalizedKey = normalizeComponentName(key);
        const existing = normalizedMenu.get(normalizedKey);
        normalizedMenu.set(normalizedKey, existing === undefined || existing === value ? value : null);
      }
    }
    const exact = Object.hasOwn(menu, name) ? menu[name] : undefined;
    if (typeof exact === "string" && exact) return exact;
    return normalizedMenu.get(normalizeComponentName(name)) ?? undefined;
  }

  function getWorkflowDefinition(graph) {
    let definition = workflowDefinitions.get(graph);
    if (!definition) {
      definition = { labels: { inputs: {}, outputs: {} } };
      workflowDefinitions.set(graph, definition);
      for (const [direction, slots] of [
        ["inputs", graph.inputNode.slots], ["outputs", graph.outputNode.slots],
      ]) {
        for (const slot of slots) {
          definition.labels[direction][slot.name] = slot.label || slot.localized_name || slot.name;
        }
      }
    }
    return definition;
  }

  function getDisplayTitle(node, original) {
    const translations = getTranslations();
    if (!translations) return;
    const blueprint = getBlueprint(node, translations.Blueprints?.catalog);
    if (blueprint) return getTitleTranslation(original, blueprint);
  }

  function originalLabel(slot) {
    const change = originals.get(slot);
    if (change && slot.label === change.label) return change.original;
    if (change) originals.delete(slot);
    return slot.label;
  }

  function applySlotLabel(slot, original, label) {
    const next = label || original;
    const widget = slot._widget;
    const element = widget?.element;
    if (element?.tagName === "TEXTAREA" && (label || slot.label !== next) &&
        [slot.name, slot.label, original].includes(element.placeholder)) {
      const placeholder = next ?? slot.name;
      if (element.placeholder !== placeholder) element.placeholder = placeholder;
    }
    if (label) originals.set(slot, { original, label });
    else originals.delete(slot);
    if (slot.label === next) return;
    if (widget) widget.label = next;
    slot.label = next;
  }

  function applyBlueprint(node) {
    const translation = getTranslations();
    const blueprint = translation && (getBlueprint(node, translation.Blueprints?.catalog) ??
      getWorkflowDefinition(node.subgraph));
    if (!blueprint && !decorated.has(node)) return;
    if (!decorated.has(node)) {
      decorated.add(node);
      const getTitle = node.getTitle;
      node.getTitle = function () {
        const original = getTitle.call(this);
        return getDisplayTitle(this, original) || original;
      };

      // Save and clipboard use this serializer, including for nested instances.
      const serialize = node.serializeFromStoreState;
      node.serializeFromStoreState = function (state) {
        const data = serialize.call(this, state);
        for (const direction of ["inputs", "outputs"]) {
          for (const [index, item] of data[direction].entries()) {
            const change = originals.get(state[direction][index]);
            if (change && item.label === change.label) item.label = change.original;
          }
        }
        return data;
      };
    }

    const graph = node.subgraph;
    for (const direction of ["inputs", "outputs"]) {
      const menuPrefix = direction === "inputs" ? "input." : "output.";
      const definitionSlots = direction === "inputs" ? graph.inputNode.slots : graph.outputNode.slots;
      for (const [index, slot] of node[direction].entries()) {
        const original = originalLabel(slot);
        const definition = direction === "inputs" ? slot._subgraphSlot : definitionSlots[index];
        let label;
        const officialLabel = blueprint?.labels?.[direction]?.[slot.name];
        const definitionLabel = definition?.label || definition?.localized_name || definition?.name;
        if (blueprint && definition && (!officialLabel || officialLabel === definitionLabel) &&
            (original == null || original === definition.label ||
              original === definition.name || original === definition.localized_name)) {
          const display = original || slot.localized_name || slot.name;
          if (typeof display === "string") {
            label = getInternalTranslation(graph, definition, direction, display, translation.Nodes) ??
              getMenuTranslation(menuPrefix + display) ?? getMenuTranslation(display);
          }
        }
        applySlotLabel(slot, original, label);
      }
    }
    node.setDirtyCanvas(true, true);
    if (canvasContainer.querySelector("[data-node-id]")) {
      const nodeSelector = `[data-node-id="${CSS.escape(String(node.id))}"]`;
      canvasContainer.querySelectorAll(`${nodeSelector} :is(${vueTextSelector})`).forEach(translateVueText);
    }
  }

  function observeGraph(graph) {
    if (observedGraphs.has(graph)) return;
    observedGraphs.add(graph);
    if (graph !== app.rootGraph) {
      const definition = getWorkflowDefinition(graph);
      for (const direction of ["input", "output"]) {
        graph.events.addEventListener(`${direction}-added`, ({ detail }) => queueMicrotask(() => {
          const slot = detail[direction];
          if (graph[`${direction}Node`].slots.includes(slot)) {
            definition.labels[`${direction}s`][slot.name] = slot.label || slot.localized_name || slot.name;
            if (!refreshQueued) {
              refreshQueued = true;
              queueMicrotask(() => {
                refreshQueued = false;
                refresh();
              });
            }
          }
        }));
      }
    }
    graph.events.addEventListener("node:added", ({ detail: { node } }) => {
      if (node.isSubgraphNode?.()) queueMicrotask(() => {
        if (node.graph === graph) applyBlueprint(node);
      });
    });
    graph.events.addEventListener("node:slot-label:changed", ({ detail: { nodeId } }) => queueMicrotask(() => {
      const node = graph.getNodeById(nodeId);
      if (node?.isSubgraphNode?.()) applyBlueprint(node);
    }));
    graph.events.addEventListener("renaming-input", ({ detail: { input, oldName, newName } }) => {
      const root = app.rootGraph;
      for (const owner of [root, ...root.subgraphs.values()]) {
        for (const node of owner.nodes) {
          if (node.subgraph !== graph) continue;
          const slot = node.inputs.find((slot) => slot._subgraphSlot === input);
          if (!slot) continue;
          const change = originals.get(slot);
          // ComfyUI matches the old label before forwarding a subgraph rename to the host.
          if (change && change.label === slot.label && (change.original ?? slot.name) === oldName) {
            applySlotLabel(slot, newName);
          }
        }
      }
    });
  }

  function refresh() {
    const root = app.rootGraphOrUndefined;
    if (!root) return;
    for (const graph of [root, ...root.subgraphs.values()]) {
      observeGraph(graph);
      for (const node of graph.nodes) {
        if (node.isSubgraphNode?.()) applyBlueprint(node);
      }
    }
  }

  function translateVueTitle(title) {
    const graph = app.canvas?.graph;
    const id = title.closest(vueHeaderSelector)?.dataset.testid.slice("node-header-".length);
    const node = graph?.getNodeById(id);
    if (!node?.isSubgraphNode?.()) return;
    const label = getDisplayTitle(node, node.title);
    const text = title.firstChild;
    if (label && text?.nodeType === Node.TEXT_NODE && text.nodeValue === node.title) {
      text.nodeValue = label;
    }
  }

  function translateVueText(element) {
    if (element.matches(vueTitleSelector)) {
      translateVueTitle(element);
      return;
    }
    const textarea = element.matches(vueTextareaSelector) ? element : element.control;
    if (!textarea?.matches(vueTextareaSelector)) return;
    const id = textarea.closest("[data-node-id]")?.dataset.nodeId;
    const node = app.canvas.graph?.getNodeById(id);
    if (!node?.isSubgraphNode?.()) return;
    const name = textarea.closest("[data-widget-name]").dataset.widgetName;
    const slot = node.inputs.find((input) => input.name === name);
    if (!slot) return;
    const change = originals.get(slot);
    const label = change && change.label === slot.label ? change.label : undefined;
    const previous = vuePlaceholders.get(textarea);
    if (!label) {
      if (previous === textarea.placeholder) textarea.placeholder = "";
      vuePlaceholders.delete(textarea);
    } else if (!textarea.placeholder || textarea.placeholder === previous) {
      if (textarea.placeholder !== label) textarea.placeholder = label;
      vuePlaceholders.set(textarea, label);
    }
    for (const element of textarea.labels) {
      if (!element.matches(vueWidgetLabelSelector)) continue;
      const text = element.firstChild;
      if (text?.nodeType !== Node.TEXT_NODE) continue;
      const previous = vueWidgetLabels.get(text);
      const original = previous && text.nodeValue === previous.label ? previous.original : text.nodeValue;
      if (!label) {
        if (text.nodeValue !== original) text.nodeValue = original;
        vueWidgetLabels.delete(text);
      } else if (text.nodeValue !== label && [change.original, slot.localized_name, slot.name].includes(original)) {
        text.nodeValue = label;
        vueWidgetLabels.set(text, { original, label });
      }
    }
  }

  const textObserver = new MutationObserver((mutations) => {
    const targets = new Set();
    for (const mutation of mutations) {
      const element = mutation.target.nodeType === Node.TEXT_NODE ? mutation.target.parentElement : mutation.target;
      const target = element?.closest?.(vueTextSelector);
      if (target) targets.add(target);
      for (const added of mutation.addedNodes) {
        if (added.matches?.(vueTextSelector)) targets.add(added);
        added.querySelectorAll?.(vueTextSelector).forEach((element) => targets.add(element));
      }
    }
    for (const element of targets) translateVueText(element);
  });
  textObserver.observe(canvasContainer, {
    childList: true,
    characterData: true,
    subtree: true,
    attributeFilter: ["placeholder"],
  });
  canvasContainer.querySelectorAll(vueTextSelector).forEach(translateVueText);

  app.rootGraph.events.addEventListener("subgraph-created", ({ detail: { subgraph } }) => {
    observeGraph(subgraph);
  });
  refresh();
  return refresh;
}
