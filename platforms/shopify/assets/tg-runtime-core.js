/**
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
