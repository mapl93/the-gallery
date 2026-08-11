import fs from 'node:fs';
import path from 'node:path';

const heading = (label) => `  /* ---- ${label} ---- */`;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function deindent(source) {
  return source
    .split('\n')
    .map((line) => line.startsWith('  ') ? line.slice(2) : line)
    .join('\n')
    .trim();
}

function extractBlock(source, definition) {
  const startMarker = heading(definition.start);
  const start = source.indexOf(startMarker);
  if (start < 0) throw new Error(`runtime module ${definition.id}: missing start heading ${definition.start}`);

  const endMarker = definition.end ? heading(definition.end) : `  ${definition.endBefore}`;
  const end = source.indexOf(endMarker, start + startMarker.length);
  if (end < 0) throw new Error(`runtime module ${definition.id}: missing end marker ${definition.end ?? definition.endBefore}`);

  return deindent(source.slice(start, end));
}

function bootstrap(id) {
  const simple = {
    select: ['enhanceSelects'],
    slider: ['enhanceSliders'],
    combobox: ['enhanceComboboxes'],
    'date-picker': ['enhanceDatepickers'],
    'toggle-group': ['enhanceToggleGroups'],
    'pin-input': ['enhancePinInputs'],
    'file-upload': ['enhanceFileUploads'],
    'product-gallery': ['enhanceProductGalleries'],
  };

  if (id === 'mobile-navigation') return '';
  if (simple[id]) {
    const name = simple[id][0];
    return `expose({ ${name} });\nregister({ id: '${id}', enhance: ${name} });`;
  }
  if (id === 'textarea') {
    return `expose({ enhanceTextareas });
register({
  id: 'textarea',
  enhance: enhanceTextareas,
  attributes: ['data-min-lines', 'data-max-lines'],
  onAttribute: (target) => applyTextareaLineBounds(target),
  setup: () => {
    let frame = 0;
    window.addEventListener('resize', () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => enhanceTextareas(document));
    }, { passive: true });
    document.fonts?.ready.then(() => enhanceTextareas(document));
  },
});`;
  }
  if (id === 'checkbox') {
    return `expose({ enhanceCheckboxes });
register({
  id: 'checkbox',
  enhance: enhanceCheckboxes,
  attributes: ['data-indeterminate'],
  onAttribute: (target) => syncCheckbox(target),
});`;
  }
  if (id === 'quantity') {
    return `expose({ enhanceQuantities, enhanceNumberInputs: enhanceQuantities });
register({ id: 'quantity', enhance: enhanceQuantities });`;
  }
  if (id === 'countdown') {
    return `expose({ enhanceCountdowns, refreshCountdowns });
register({
  id: 'countdown',
  enhance: enhanceCountdowns,
  attributes: ['datetime', 'data-countdown-units', 'data-countdown-expired-announcement', 'lang'],
  onAttribute: (target, attributeName) => {
    if (target instanceof HTMLElement && target.matches('[data-countdown]')) enhanceCountdown(target);
    else if (attributeName === 'lang') refreshCountdowns();
  },
  cleanup: () => scheduleCountdowns(),
});`;
  }
  if (id === 'marquee') {
    return `expose({ enhanceMarquees });
register({
  id: 'marquee',
  enhance: enhanceMarquees,
  attributes: ['data-presentation', 'data-direction', 'data-pace'],
  onAttribute: (target) => {
    if (target instanceof HTMLElement && target.matches('[data-marquee]')) enhanceMarquee(target);
  },
  cleanup: cleanupMarquees,
});`;
  }
  if (id === 'carousel-rotation') {
    return `expose({ enhanceHeroes, enhanceAnnouncements });
register({
  id: 'carousel-rotation',
  enhance: (scope) => {
    enhanceHeroes(scope);
    enhanceAnnouncements(scope);
  },
  cleanup: cleanupCarouselRotations,
});`;
  }
  if (id === 'reading-progress') {
    return `expose({ enhanceReadingProgress });
register({
  id: 'reading-progress',
  enhance: enhanceReadingProgress,
  attributes: ['data-reading-mode', 'data-reading-value', 'data-reading-target', 'data-reading-scroll-root'],
  onAttribute: (target) => {
    if (target instanceof HTMLElement && target.matches('[data-reading-progress]')) configureReadingProgress(target);
  },
  cleanup: cleanupReadingProgress,
  setup: () => document.fonts?.ready.then(() => scheduleReadingProgress()),
});`;
  }
  if (id === 'filter-panel') {
    return `expose({ enhanceFilterPanels, destroyFilterPanels });
register({ id: 'filter-panel', enhance: enhanceFilterPanels, cleanup: cleanupFilterPanels });`;
  }
  throw new Error(`runtime module ${id}: unknown bootstrap`);
}

function coreSource() {
  return `/**
 * The Gallery modular runtime core.
 * Generated from components/js/theme.js; do not edit target copies directly.
 */

const entries = new Map();
let observer = null;

export function enhanceMatches(scope, selector, enhance) {
  if (scope instanceof Element && scope.matches(selector)) enhance(scope);
  scope.querySelectorAll?.(selector).forEach(enhance);
}

export function expose(api) {
  window.TheGallery = Object.assign(window.TheGallery || {}, api);
}

function restartObserver() {
  if (typeof MutationObserver === 'undefined' || !document.documentElement) return;
  observer?.disconnect();
  const attributes = [...new Set([...entries.values()].flatMap((entry) => entry.attributes || []))];
  observer = new MutationObserver((records) => {
    records.forEach((record) => {
      if (record.type === 'attributes') {
        entries.forEach((entry) => {
          if (entry.attributes?.includes(record.attributeName)) entry.onAttribute?.(record.target, record.attributeName);
        });
        return;
      }
      record.addedNodes.forEach((node) => {
        if (node instanceof Element) entries.forEach((entry) => entry.enhance?.(node));
      });
      if (record.removedNodes.length > 0) entries.forEach((entry) => entry.cleanup?.());
    });
  });
  const options = { childList: true, subtree: true };
  if (attributes.length > 0) {
    options.attributes = true;
    options.attributeFilter = attributes;
  }
  observer.observe(document.documentElement, options);
}

export function register(entry) {
  if (!entry?.id || entries.has(entry.id)) return;
  entries.set(entry.id, entry);
  entry.enhance?.(document);
  entry.setup?.();
  restartObserver();
}
`;
}

function loaderSource(definitions, moduleExpression) {
  const serializable = definitions.map(({ id, selectors }) => ({ id, selectors }));
  return `/**
 * The Gallery selective runtime loader.
 * Loads an enhancer only when matching component markup exists.
 */

const modules = ${JSON.stringify(serializable, null, 2)};
const pending = new Map();

function matches(scope, selectors) {
  return selectors.some((selector) => (
    (scope instanceof Element && scope.matches(selector)) || scope.querySelector?.(selector)
  ));
}

function load(definition) {
  if (!pending.has(definition.id)) {
    pending.set(definition.id, import(${moduleExpression}));
  }
  return pending.get(definition.id);
}

function scan(scope = document) {
  modules.forEach((definition) => {
    if (matches(scope, definition.selectors)) load(definition);
  });
}

scan(document);
new MutationObserver((records) => {
  records.forEach((record) => record.addedNodes.forEach((node) => {
    if (node instanceof Element) scan(node);
  }));
}).observe(document.documentElement, { childList: true, subtree: true });
`;
}

export function loadRuntimeConfig(repoRoot) {
  const configPath = path.join(repoRoot, 'components', 'js', 'runtime-modules.json');
  const config = readJson(configPath);
  const source = fs.readFileSync(path.join(repoRoot, config.source), 'utf8');
  return { config, source };
}

export function buildRuntimeSources(repoRoot, options = {}) {
  const { config, source } = loadRuntimeConfig(repoRoot);
  const moduleFile = options.moduleFile ?? ((id) => `${id}.js`);
  const coreImport = options.coreImport ?? './core.js';
  const loaderExpression = options.loaderExpression ?? '`./runtime/${definition.id}.js`';
  const modules = new Map();

  config.modules.forEach((definition) => {
    const imports = definition.id === 'mobile-navigation'
      ? ''
      : definition.id === 'select'
        ? `import { expose, register } from '${coreImport}';\n\n`
        : `import { enhanceMatches, expose, register } from '${coreImport}';\n\n`;
    const body = extractBlock(source, definition);
    const ending = bootstrap(definition.bootstrap);
    const generated = `/** Generated from ${config.source}: ${definition.start}. */\n${imports}${body}${ending ? `\n\n${ending}` : ''}\n`;
    modules.set(moduleFile(definition.id), generated);
  });

  return {
    config,
    core: coreSource(),
    loader: loaderSource(config.modules, loaderExpression),
    modules,
  };
}

export function runtimeModulesForComponents(config, componentIds) {
  const selected = new Set(componentIds);
  return config.modules
    .filter((definition) => definition.components.some((component) => selected.has(component)))
    .map((definition) => definition.id);
}
