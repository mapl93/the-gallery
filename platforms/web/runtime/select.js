/** Generated from components/js/theme.js: Select. */
import { expose, register } from './core.js';

/* ---- Select ---- */
let selectId = 0;

function nextSelectId(prefix) {
  selectId += 1;
  return `${prefix}-${selectId}`;
}

function enhanceMatches(scope, selector, enhance) {
  if (scope instanceof Element && scope.matches(selector)) enhance(scope);
  scope.querySelectorAll?.(selector).forEach(enhance);
}

function createSelectIcon(className, pathData) {
  const namespace = 'http://www.w3.org/2000/svg';
  const icon = document.createElementNS(namespace, 'svg');
  const path = document.createElementNS(namespace, 'path');

  icon.setAttribute('class', className);
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('fill', 'none');
  icon.setAttribute('stroke', 'currentColor');
  icon.setAttribute('stroke-width', '2');
  icon.setAttribute('stroke-linecap', 'round');
  icon.setAttribute('stroke-linejoin', 'round');
  icon.setAttribute('aria-hidden', 'true');
  path.setAttribute('d', pathData);
  icon.append(path);
  return icon;
}

function enhanceSelect(root) {
  if (!(root instanceof HTMLElement) || root.dataset.selectEnhanced === 'true') return;

  const nativeField = Array.from(root.children).find((child) => (
    child instanceof HTMLSelectElement && child.classList.contains('select__field')
  ));
  if (!(nativeField instanceof HTMLSelectElement)) return;
  if (nativeField.multiple || nativeField.size > 1 || nativeField.querySelector('optgroup')) return;

  const label = Array.from(root.children).find((child) => (
    child instanceof HTMLLabelElement && child.classList.contains('select__label')
  ));
  const fieldId = nativeField.id || nextSelectId('select');
  const triggerId = `${fieldId}-trigger`;
  const listboxId = `${fieldId}-listbox`;
  const labelId = label?.id || `${fieldId}-label`;
  let highlightedIndex = -1;
  let optionElements = [];
  let typeahead = '';
  let typeaheadTimer;

  nativeField.id = fieldId;
  nativeField.classList.add('select__native');
  nativeField.tabIndex = -1;
  nativeField.setAttribute('aria-hidden', 'true');

  if (label) {
    label.id = labelId;
    label.htmlFor = triggerId;
  }

  const trigger = document.createElement('button');
  trigger.className = 'select__field select__trigger';
  trigger.type = 'button';
  trigger.id = triggerId;
  trigger.setAttribute('role', 'combobox');
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', listboxId);
  if (label) {
    trigger.setAttribute('aria-labelledby', labelId);
  } else {
    trigger.setAttribute('aria-label', nativeField.getAttribute('aria-label') || 'Select option');
  }

  const value = document.createElement('span');
  value.className = 'select__value';
  const indicator = createSelectIcon('select__indicator', 'm6 9 6 6 6-6');
  trigger.append(value, indicator);

  const listbox = document.createElement('div');
  listbox.className = 'select__listbox';
  listbox.id = listboxId;
  listbox.setAttribute('role', 'listbox');
  if (label) listbox.setAttribute('aria-labelledby', labelId);
  listbox.hidden = true;

  const control = document.createElement('div');
  control.className = 'select__control';
  nativeField.before(control);
  control.append(nativeField, trigger, listbox);
  root.classList.add('select--enhanced');
  root.dataset.selectEnhanced = 'true';

  function options() {
    return Array.from(nativeField.options);
  }

  function isAvailable(index) {
    const option = options()[index];
    return Boolean(option && !option.disabled && !option.hidden);
  }

  function findAvailable(start, direction) {
    const items = options();
    if (items.length === 0) return -1;

    for (let step = 1; step <= items.length; step += 1) {
      const index = (start + direction * step + items.length) % items.length;
      if (isAvailable(index)) return index;
    }
    return -1;
  }

  function setHighlighted(index) {
    if (!isAvailable(index)) return;
    highlightedIndex = index;
    optionElements.forEach((option, optionIndex) => {
      option.toggleAttribute('data-highlighted', optionIndex === index);
    });
    const active = optionElements[index];
    if (active) {
      trigger.setAttribute('aria-activedescendant', active.id);
      active.scrollIntoView({ block: 'nearest' });
    }
  }

  function sync() {
    const selected = nativeField.options[nativeField.selectedIndex];
    const describedBy = nativeField.getAttribute('aria-describedby');
    const invalid = nativeField.getAttribute('aria-invalid');
    value.textContent = selected?.textContent?.trim() || '';
    trigger.disabled = nativeField.disabled;
    trigger.toggleAttribute('data-placeholder', !selected || selected.value === '');
    if (describedBy) trigger.setAttribute('aria-describedby', describedBy);
    else trigger.removeAttribute('aria-describedby');
    if (invalid) trigger.setAttribute('aria-invalid', invalid);
    else trigger.removeAttribute('aria-invalid');
    if (nativeField.required) trigger.setAttribute('aria-required', 'true');
    else trigger.removeAttribute('aria-required');
    label?.classList.toggle('select__label--required', nativeField.required);
    optionElements.forEach((option, index) => {
      option.setAttribute('aria-selected', String(index === nativeField.selectedIndex));
    });
  }

  function closeSelect() {
    root.classList.remove('select--open');
    listbox.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.removeAttribute('aria-activedescendant');
    highlightedIndex = -1;
    optionElements.forEach((option) => option.removeAttribute('data-highlighted'));
  }

  function positionListbox() {
    listbox.removeAttribute('data-align');
    if (listbox.getBoundingClientRect().right > window.innerWidth - 16) {
      listbox.dataset.align = 'end';
    }
  }

  function openSelect() {
    if (nativeField.disabled) return;
    root.classList.add('select--open');
    listbox.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    positionListbox();
    const selectedIndex = nativeField.selectedIndex;
    setHighlighted(isAvailable(selectedIndex) ? selectedIndex : findAvailable(selectedIndex, 1));
  }

  function selectOption(index) {
    if (!isAvailable(index)) return;
    nativeField.selectedIndex = index;
    sync();
    nativeField.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    nativeField.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    closeSelect();
    trigger.focus();
  }

  function buildOptions() {
    listbox.replaceChildren();
    optionElements = options().map((option, index) => {
      const item = document.createElement('div');
      item.className = 'select__option';
      item.id = `${fieldId}-option-${index}`;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', String(index === nativeField.selectedIndex));
      item.setAttribute('aria-disabled', String(option.disabled));
      item.tabIndex = -1;
      item.hidden = option.hidden;
      const optionLabel = document.createElement('span');
      optionLabel.className = 'select__option-label';
      optionLabel.textContent = option.textContent?.trim() || '';
      const optionCheck = createSelectIcon('select__option-check', 'M20 6 9 17l-5-5');
      item.append(optionLabel, optionCheck);
      item.addEventListener('pointermove', () => {
        if (!option.disabled) setHighlighted(index);
      });
      item.addEventListener('click', () => selectOption(index));
      listbox.append(item);
      return item;
    });
    sync();
  }

  trigger.addEventListener('click', () => {
    if (root.classList.contains('select--open')) closeSelect();
    else openSelect();
  });

  trigger.addEventListener('keydown', (event) => {
    const open = root.classList.contains('select--open');

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        openSelect();
        return;
      }
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      setHighlighted(findAvailable(highlightedIndex, direction));
      return;
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      if (!open) openSelect();
      const start = event.key === 'Home' ? -1 : 0;
      const direction = event.key === 'Home' ? 1 : -1;
      setHighlighted(findAvailable(start, direction));
      return;
    }

    if ((event.key === 'Enter' || event.key === ' ') && open) {
      event.preventDefault();
      selectOption(highlightedIndex);
      return;
    }

    if (event.key === 'Escape' && open) {
      event.preventDefault();
      closeSelect();
      return;
    }

    if (event.key === 'Tab') {
      closeSelect();
      return;
    }

    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      typeahead += event.key.toLocaleLowerCase();
      clearTimeout(typeaheadTimer);
      typeaheadTimer = window.setTimeout(() => { typeahead = ''; }, 500);
      const items = options();
      const start = Math.max(highlightedIndex, nativeField.selectedIndex, -1);
      const match = items.findIndex((option, index) => {
        const normalizedIndex = (start + index + 1) % items.length;
        const candidate = items[normalizedIndex];
        return !candidate.disabled
          && !candidate.hidden
          && candidate.textContent.trim().toLocaleLowerCase().startsWith(typeahead);
      });
      if (match >= 0) {
        const normalizedIndex = (start + match + 1) % items.length;
        if (!open) openSelect();
        setHighlighted(normalizedIndex);
      }
    }
  });

  nativeField.addEventListener('change', sync);
  document.addEventListener('pointerdown', (event) => {
    if (!event.composedPath().includes(root)) closeSelect();
  });
  nativeField.form?.addEventListener('reset', () => window.setTimeout(sync));

  const observer = new MutationObserver(() => buildOptions());
  observer.observe(nativeField, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: [
      'aria-describedby',
      'aria-invalid',
      'disabled',
      'hidden',
      'label',
      'required',
      'selected',
      'value'
    ]
  });

  buildOptions();
}

function enhanceSelects(scope = document) {
  enhanceMatches(scope, '.select', enhanceSelect);
}

expose({ enhanceSelects });
register({ id: 'select', enhance: enhanceSelects });
