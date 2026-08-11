/**
 * The Gallery selective runtime loader.
 * Loads an enhancer only when matching component markup exists.
 */

const modules = [
  {
    "id": "mobile-navigation",
    "selectors": [
      "[data-menu-toggle]",
      "#mobile-nav"
    ]
  },
  {
    "id": "select",
    "selectors": [
      ".select"
    ]
  },
  {
    "id": "textarea",
    "selectors": [
      ".textarea"
    ]
  },
  {
    "id": "checkbox",
    "selectors": [
      ".checkbox__input"
    ]
  },
  {
    "id": "quantity",
    "selectors": [
      ".quantity-selector",
      ".number-input"
    ]
  },
  {
    "id": "slider",
    "selectors": [
      ".slider",
      ".range-slider"
    ]
  },
  {
    "id": "combobox",
    "selectors": [
      ".combobox"
    ]
  },
  {
    "id": "date-picker",
    "selectors": [
      ".datepicker"
    ]
  },
  {
    "id": "toggle-group",
    "selectors": [
      ".toggle-group"
    ]
  },
  {
    "id": "pin-input",
    "selectors": [
      "[data-pin-input]"
    ]
  },
  {
    "id": "countdown",
    "selectors": [
      "[data-countdown]"
    ]
  },
  {
    "id": "marquee",
    "selectors": [
      "[data-marquee]"
    ]
  },
  {
    "id": "carousel-rotation",
    "selectors": [
      "[data-hero]",
      "[data-announcement]"
    ]
  },
  {
    "id": "reading-progress",
    "selectors": [
      "[data-reading-progress]"
    ]
  },
  {
    "id": "file-upload",
    "selectors": [
      ".file-upload"
    ]
  },
  {
    "id": "product-gallery",
    "selectors": [
      "[data-product-gallery]"
    ]
  },
  {
    "id": "filter-panel",
    "selectors": [
      "[data-filter-panel]"
    ]
  }
];
const pending = new Map();

function matches(scope, selectors) {
  return selectors.some((selector) => (
    (scope instanceof Element && scope.matches(selector)) || scope.querySelector?.(selector)
  ));
}

function load(definition) {
  if (!pending.has(definition.id)) {
    pending.set(definition.id, import(`./tg-runtime-${definition.id}.js`));
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
