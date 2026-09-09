/** Generated from components/js/theme.js: Combobox. */
import { enhanceMatches, expose, register } from './tg-runtime-core.js';

/* ---- Combobox ---- */
function enhanceCombobox(root) {
  if (!(root instanceof HTMLElement)
      || !root.classList.contains('combobox')
      || root.dataset.comboboxEnhanced === 'true') return;
  const input = root.querySelector('.combobox__input');
  const listbox = root.querySelector('.combobox__listbox');
  if (!(input instanceof HTMLInputElement) || !(listbox instanceof HTMLElement)) return;

  const fieldId = input.id || nextSelectId('combobox');
  const listboxId = listbox.id || `${fieldId}-listbox`;
  let highlighted = -1;
  let composing = false;
  let selecting = false;

  input.id = fieldId;
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', input.getAttribute('aria-autocomplete') || 'list');
  input.setAttribute('aria-controls', listboxId);
  listbox.id = listboxId;
  listbox.setAttribute('role', 'listbox');
  if (!listbox.hasAttribute('aria-label') && !listbox.hasAttribute('aria-labelledby')) {
    listbox.setAttribute('aria-label', 'Suggestions');
  }

  function options() {
    return Array.from(listbox.querySelectorAll('.combobox__option'));
  }

  function optionValue(option) {
    return option.getAttribute('data-value') ?? option.textContent.trim();
  }

  function optionDisabled(option) {
    return option.getAttribute('aria-disabled') === 'true'
      || option.hasAttribute('data-disabled')
      || option.hasAttribute('disabled');
  }

  function normalize(value) {
    return value.trim().toLocaleLowerCase();
  }

  function available() {
    return options().filter((option) => !option.hidden && !optionDisabled(option));
  }

  function setHighlighted(option) {
    const items = options();
    highlighted = option ? items.indexOf(option) : -1;
    items.forEach((item, index) => {
      item.toggleAttribute('data-highlighted', index === highlighted);
    });
    if (option && highlighted >= 0) {
      input.setAttribute('aria-activedescendant', option.id);
      option.scrollIntoView({ block: 'nearest' });
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  }

  function syncSelected() {
    options().forEach((option) => {
      option.setAttribute('aria-selected', String(optionValue(option) === input.value));
    });
  }

  function filter() {
    const query = normalize(input.value);
    let matches = 0;
    options().forEach((option) => {
      const match = !query || normalize(optionValue(option)).includes(query);
      option.hidden = !match;
      if (match) matches += 1;
    });
    const empty = listbox.querySelector('.combobox__empty');
    if (empty instanceof HTMLElement) empty.hidden = matches > 0;
    const active = options()[highlighted];
    if (!active || active.hidden || optionDisabled(active)) setHighlighted(null);
    syncSelected();
  }

  function close() {
    root.classList.remove('combobox--open');
    listbox.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    setHighlighted(null);
  }

  function open() {
    if (input.disabled || input.readOnly) return;
    filter();
    root.classList.add('combobox--open');
    listbox.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  }

  function move(direction) {
    const items = available();
    if (items.length === 0) return;
    const active = options()[highlighted];
    const current = items.indexOf(active);
    const next = current < 0
      ? (direction > 0 ? 0 : items.length - 1)
      : Math.min(items.length - 1, Math.max(0, current + direction));
    setHighlighted(items[next]);
  }

  function select(option) {
    if (!option || optionDisabled(option)) return;
    selecting = true;
    input.value = optionValue(option);
    filter();
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    selecting = false;
    close();
    input.focus();
  }

  function setupOptions() {
    options().forEach((option, index) => {
      option.id ||= `${fieldId}-option-${index}`;
      option.setAttribute('role', 'option');
      option.tabIndex = -1;
      option.setAttribute('aria-disabled', String(optionDisabled(option)));
    });
    filter();
  }

  function eventOption(event) {
    const option = event.target instanceof Element
      ? event.target.closest('.combobox__option')
      : null;
    return option && listbox.contains(option) ? option : null;
  }

  input.addEventListener('click', open);
  input.addEventListener('compositionstart', () => { composing = true; });
  input.addEventListener('compositionend', () => {
    composing = false;
    filter();
    open();
  });
  input.addEventListener('input', () => {
    if (selecting || composing) return;
    filter();
    open();
  });
  input.addEventListener('keydown', (event) => {
    if (composing || event.isComposing || event.keyCode === 229) return;
    const isOpen = root.classList.contains('combobox--open');
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) open();
      move(event.key === 'ArrowDown' ? 1 : -1);
    } else if (event.key === 'Enter' && isOpen && highlighted >= 0) {
      event.preventDefault();
      select(options()[highlighted]);
    } else if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      close();
    } else if (event.key === 'Tab') {
      close();
    }
  });
  listbox.addEventListener('pointerdown', (event) => {
    if (eventOption(event)) event.preventDefault();
  });
  listbox.addEventListener('pointermove', (event) => {
    const option = eventOption(event);
    if (option && !optionDisabled(option)) setHighlighted(option);
  });
  listbox.addEventListener('click', (event) => select(eventOption(event)));

  document.addEventListener('pointerdown', (event) => {
    if (!event.composedPath().includes(root)) close();
  });
  input.form?.addEventListener('reset', () => window.setTimeout(() => {
    filter();
    close();
  }));
  new MutationObserver(() => {
    if (input.disabled || input.readOnly) close();
    filter();
  }).observe(input, {
    attributes: true,
    attributeFilter: ['disabled', 'readonly', 'required', 'value'],
  });
  new MutationObserver(setupOptions).observe(listbox, { childList: true, subtree: true });

  root.dataset.comboboxEnhanced = 'true';
  setupOptions();
  if (root.classList.contains('combobox--open') || input.getAttribute('aria-expanded') === 'true') open();
  else close();
}

function enhanceComboboxes(scope = document) {
  enhanceMatches(scope, '.combobox', enhanceCombobox);
}

expose({ enhanceComboboxes });
register({ id: 'combobox', enhance: enhanceComboboxes });
