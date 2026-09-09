/**
 * The Gallery — Theme JS
 * Minimal, progressive enhancement only.
 */

(function () {
  'use strict';

  /* ---- Mobile Navigation ---- */
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menuClose = document.querySelector('[data-menu-close]');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.add('is-open');
      mobileNav.setAttribute('aria-hidden', 'false');
      menuClose?.focus();
    });
  }

  if (menuClose && mobileNav) {
    menuClose.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      mobileNav.setAttribute('aria-hidden', 'true');
      menuToggle?.focus();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav?.classList.contains('is-open')) {
      mobileNav.classList.remove('is-open');
      mobileNav.setAttribute('aria-hidden', 'true');
      menuToggle?.focus();
    }
  });

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

  /* ---- Textarea line bounds ---- */
  const defaultTextareaMinLines = 4;

  function textareaLineCount(value) {
    if (value === null || value === '') return null;
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
  }

  function textareaHeight(field, lines) {
    const computed = getComputedStyle(field);
    const fontSize = Number.parseFloat(computed.fontSize) || 16;
    const lineHeight = Number.parseFloat(computed.lineHeight) || fontSize * 1.5;
    const chrome = [
      computed.paddingTop,
      computed.paddingBottom,
      computed.borderTopWidth,
      computed.borderBottomWidth,
    ].reduce((total, value) => total + (Number.parseFloat(value) || 0), 0);
    return Math.ceil(lineHeight * lines + chrome);
  }

  function applyTextareaLineBounds(field) {
    if (!(field instanceof HTMLTextAreaElement) || !field.classList.contains('textarea__field')) return;

    const explicitMin = textareaLineCount(field.getAttribute('data-min-lines'));
    const max = textareaLineCount(field.getAttribute('data-max-lines'));
    const effectiveMin = explicitMin ?? defaultTextareaMinLines;

    if (explicitMin) {
      field.style.setProperty('--_textarea-min-height', `${textareaHeight(field, explicitMin)}px`);
    } else {
      field.style.removeProperty('--_textarea-min-height');
    }

    if (max) {
      field.style.setProperty(
        '--_textarea-max-height',
        `${textareaHeight(field, Math.max(max, effectiveMin))}px`
      );
    } else {
      field.style.removeProperty('--_textarea-max-height');
    }
  }

  function enhanceTextareas(scope = document) {
    enhanceMatches(scope, '.textarea__field', applyTextareaLineBounds);
  }

  /* ---- Checkbox indeterminate state ---- */
  function syncCheckbox(input) {
    if (!(input instanceof HTMLInputElement)
        || input.type !== 'checkbox'
        || !input.classList.contains('checkbox__input')) return;
    input.indeterminate = input.getAttribute('data-indeterminate') === 'true';
  }

  function enhanceCheckbox(input) {
    if (!(input instanceof HTMLInputElement)
        || input.type !== 'checkbox'
        || !input.classList.contains('checkbox__input')) return;
    syncCheckbox(input);
    if (input.dataset.checkboxEnhanced === 'true') return;
    input.dataset.checkboxEnhanced = 'true';
    input.addEventListener('change', () => {
      if (!input.indeterminate && input.getAttribute('data-indeterminate') === 'true') {
        input.removeAttribute('data-indeterminate');
      }
    });
  }

  function enhanceCheckboxes(scope = document) {
    enhanceMatches(scope, '.checkbox__input', enhanceCheckbox);
  }

  /* ---- Quantity selector ---- */
  function quantityConstraint(field, attribute) {
    const raw = field.getAttribute(attribute);
    if (raw === null || raw === '') return null;
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  }

  function quantityStep(field) {
    const value = quantityConstraint(field, 'step');
    return value !== null && value > 0 ? value : 1;
  }

  function quantityValue(field) {
    return Number.isFinite(field.valueAsNumber) ? field.valueAsNumber : null;
  }

  function clampQuantity(value, min, max) {
    let next = value;
    if (min !== null) next = Math.max(min, next);
    if (max !== null) next = Math.min(max, next);
    return Number(next.toFixed(10));
  }

  function enhanceQuantity(root) {
    if (!(root instanceof HTMLElement)) return;
    const isQuantity = root.classList.contains('qty');
    const isNumberInput = root.classList.contains('number-input');
    if (!isQuantity && !isNumberInput) return;

    const field = root.querySelector(isQuantity
      ? '[data-qty-input], .qty__input'
      : '.number-input__field');
    const minus = root.querySelector(isQuantity
      ? '[data-qty-minus]'
      : '.number-input__btn--decrement');
    const plus = root.querySelector(isQuantity
      ? '[data-qty-plus]'
      : '.number-input__btn--increment');
    if (!(field instanceof HTMLInputElement)
        || !(minus instanceof HTMLButtonElement)
        || !(plus instanceof HTMLButtonElement)) return;

    function sync() {
      const value = quantityValue(field);
      const min = quantityConstraint(field, 'min');
      const max = quantityConstraint(field, 'max');
      const unavailable = field.disabled || field.readOnly;

      minus.disabled = unavailable || (value !== null && min !== null && value <= min);
      plus.disabled = unavailable || (value !== null && max !== null && value >= max);
    }

    function update(direction) {
      if (field.disabled || field.readOnly) return;

      const previous = field.value;
      const min = quantityConstraint(field, 'min');
      const max = quantityConstraint(field, 'max');
      try {
        if (direction > 0) field.stepUp();
        else field.stepDown();
      } catch {
        const step = quantityStep(field);
        const current = quantityValue(field);
        const fallback = direction > 0
          ? (min ?? 0) - step
          : (max ?? min ?? 0) + step;
        const next = clampQuantity((current ?? fallback) + direction * step, min, max);
        field.value = String(next);
      }

      if (field.value !== previous) {
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
      }
      sync();
    }

    sync();
    const enhancedKey = isQuantity ? 'qtyEnhanced' : 'numberInputEnhanced';
    if (root.dataset[enhancedKey] === 'true') return;
    root.dataset[enhancedKey] = 'true';

    minus.addEventListener('click', () => update(-1));
    plus.addEventListener('click', () => update(1));
    field.addEventListener('input', sync);
    field.addEventListener('change', sync);
    field.form?.addEventListener('reset', () => window.setTimeout(sync));

    new MutationObserver(sync).observe(field, {
      attributes: true,
      attributeFilter: ['disabled', 'max', 'min', 'readonly', 'step', 'value'],
    });
  }

  function enhanceQuantities(scope = document) {
    enhanceMatches(scope, '.qty, .number-input', enhanceQuantity);
  }

  /* ---- Slider / range ---- */
  function sliderNumber(field, attribute, fallback) {
    const authored = field.getAttribute(attribute);
    if (authored === null || authored.trim() === '') return fallback;
    const parsed = Number(authored);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function sliderPercent(field) {
    const min = sliderNumber(field, 'min', 0);
    const max = sliderNumber(field, 'max', 100);
    const value = Number.isFinite(field.valueAsNumber) ? field.valueAsNumber : min;
    if (max <= min) return 0;
    return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  }

  function sliderOutput(root) {
    return root.querySelector('.slider__value');
  }

  function enhanceSingleSlider(root) {
    if (!(root instanceof HTMLElement) || !root.classList.contains('slider')) return;
    const field = Array.from(root.children).flatMap((child) => (
      child.classList?.contains('slider__track') ? Array.from(child.children) : [child]
    )).find((child) => (
      child instanceof HTMLInputElement
      && child.type === 'range'
      && child.classList.contains('slider__input')
    ));
    if (!(field instanceof HTMLInputElement)) return;

    function sync() {
      root.style.setProperty('--_slider-progress', `${sliderPercent(field)}%`);
      const output = sliderOutput(root);
      if (output) output.textContent = field.value;
    }

    sync();
    if (root.dataset.sliderEnhanced === 'true') return;
    root.dataset.sliderEnhanced = 'true';
    field.addEventListener('input', sync);
    field.addEventListener('change', sync);
    field.form?.addEventListener('reset', () => window.setTimeout(sync));
    new MutationObserver(sync).observe(field, {
      attributes: true,
      attributeFilter: ['disabled', 'max', 'min', 'step', 'value'],
    });
  }

  function enhanceRangeSlider(root) {
    if (!(root instanceof HTMLElement) || !root.classList.contains('range-slider')) return;
    const fields = Array.from(root.querySelectorAll('.range-slider__input')).filter((field) => (
      field instanceof HTMLInputElement && field.type === 'range'
    ));
    if (fields.length !== 2) return;
    const [lower, upper] = fields;
    const host = root.closest('.slider') || root;

    function sync(changed) {
      if (lower.valueAsNumber > upper.valueAsNumber) {
        if (changed === upper) upper.value = lower.value;
        else lower.value = upper.value;
      }
      root.style.setProperty('--_slider-range-start', `${sliderPercent(lower)}%`);
      root.style.setProperty('--_slider-range-end', `${sliderPercent(upper)}%`);
      const output = sliderOutput(host);
      if (output) output.textContent = `${lower.value}–${upper.value}`;
    }

    function commit(field) {
      field.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      field.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    sync();
    if (root.dataset.rangeSliderEnhanced === 'true') return;
    root.dataset.rangeSliderEnhanced = 'true';
    fields.forEach((field) => {
      field.addEventListener('input', () => sync(field));
      field.addEventListener('change', () => sync(field));
      new MutationObserver(() => sync(field)).observe(field, {
        attributes: true,
        attributeFilter: ['disabled', 'max', 'min', 'step', 'value'],
      });
    });

    root.addEventListener('pointerdown', (event) => {
      const target = event.target instanceof Element
        ? event.target.closest('.range-slider__track, .range-slider__fill')
        : null;
      if (!target || lower.disabled || upper.disabled) return;
      const bounds = root.getBoundingClientRect();
      if (bounds.width <= 0) return;
      // The track's default pointer action would blur the native owner focused below.
      event.preventDefault();
      const rtl = getComputedStyle(root).direction === 'rtl';
      const position = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
      const ratio = rtl ? 1 - position : position;
      const min = sliderNumber(lower, 'min', 0);
      const max = sliderNumber(lower, 'max', 100);
      const next = min + ratio * Math.max(max - min, 0);
      const field = Math.abs(next - lower.valueAsNumber) <= Math.abs(next - upper.valueAsNumber)
        ? lower
        : upper;
      field.valueAsNumber = field === lower
        ? Math.min(next, upper.valueAsNumber)
        : Math.max(next, lower.valueAsNumber);
      sync(field);
      commit(field);
      field.focus();
    });

    lower.form?.addEventListener('reset', () => window.setTimeout(() => sync()));
  }

  function enhanceSliders(scope = document) {
    enhanceMatches(scope, '.slider, .range-slider', (root) => {
      enhanceSingleSlider(root);
      enhanceRangeSlider(root);
    });
  }

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

  /* ---- Date picker ---- */
  function parseIsoDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
    if (!match) return null;
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    return date.getFullYear() === Number(match[1])
      && date.getMonth() === Number(match[2]) - 1
      && date.getDate() === Number(match[3])
      ? date
      : null;
  }

  function isoDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function dateAt(year, month, day) {
    return new Date(year, month, day);
  }

  function sameDate(first, second) {
    return Boolean(first && second && isoDate(first) === isoDate(second));
  }

  function enhanceDatepicker(root) {
    if (!(root instanceof HTMLElement)
        || !root.classList.contains('datepicker')
        || root.dataset.datepickerEnhanced === 'true') return;
    const input = root.querySelector('.datepicker__input');
    const trigger = root.querySelector('.datepicker__trigger');
    const calendar = root.querySelector('.datepicker__calendar');
    const monthLabel = root.querySelector('.datepicker__month-year');
    const previous = root.querySelector('[data-datepicker-previous]');
    const next = root.querySelector('[data-datepicker-next]');
    const grid = root.querySelector('.datepicker__grid');
    if (!(input instanceof HTMLInputElement)
        || !(trigger instanceof HTMLButtonElement)
        || !(calendar instanceof HTMLElement)
        || !(monthLabel instanceof HTMLElement)
        || !(previous instanceof HTMLButtonElement)
        || !(next instanceof HTMLButtonElement)
        || !(grid instanceof HTMLElement)) return;

    const fieldId = input.id || nextSelectId('datepicker');
    const calendarId = calendar.id || `${fieldId}-calendar`;
    const monthId = monthLabel.id || `${calendarId}-month`;
    const locale = root.lang || input.lang || document.documentElement.lang || navigator.language || 'en';
    const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
    const dayFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'full' });
    const weekdayLong = new Intl.DateTimeFormat(locale, { weekday: 'long' });
    const weekdayShort = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const authoredToday = parseIsoDate(root.dataset.today);
    const today = authoredToday || new Date();
    let selected = parseIsoDate(input.value);
    let displayed = dateAt((selected || today).getFullYear(), (selected || today).getMonth(), 1);
    let focusDate = selected || today;
    let min = null;
    let max = null;
    let keyboardActivating = false;

    input.id = fieldId;
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-haspopup', 'dialog');
    input.setAttribute('aria-autocomplete', 'none');
    input.setAttribute('aria-controls', calendarId);
    trigger.type = 'button';
    trigger.setAttribute('aria-controls', calendarId);
    calendar.id = calendarId;
    calendar.setAttribute('role', 'dialog');
    calendar.setAttribute('aria-label', calendar.getAttribute('aria-label') || 'Choose date');
    monthLabel.id = monthId;
    monthLabel.setAttribute('aria-live', 'polite');
    grid.setAttribute('role', 'grid');
    grid.setAttribute('aria-labelledby', monthId);

    function bound(attribute) {
      return parseIsoDate(input.getAttribute(`data-${attribute}`) || input.getAttribute(attribute));
    }

    function unavailable(date) {
      return Boolean((min && date < min) || (max && date > max));
    }

    function dayButton(date) {
      return grid.querySelector(`[data-date="${isoDate(date)}"]`);
    }

    function focusRenderedDay() {
      const button = dayButton(focusDate);
      if (button instanceof HTMLButtonElement) button.focus();
    }

    function updateTrigger() {
      trigger.disabled = input.disabled || input.readOnly;
      trigger.setAttribute('aria-label', selected
        ? `Change date, ${new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(selected)}`
        : 'Choose date');
    }

    function moveFocus(date) {
      if (unavailable(date)) return;
      const current = dayButton(focusDate);
      focusDate = date;
      if (date.getFullYear() === displayed.getFullYear()
          && date.getMonth() === displayed.getMonth()) {
        const nextButton = dayButton(date);
        if (current instanceof HTMLButtonElement) current.tabIndex = -1;
        if (nextButton instanceof HTMLButtonElement) {
          nextButton.tabIndex = 0;
          nextButton.focus();
          return;
        }
      }
      displayed = dateAt(date.getFullYear(), date.getMonth(), 1);
      render();
      focusRenderedDay();
    }

    function selectDate(date) {
      if (unavailable(date)) return;
      input.value = isoDate(date);
      selected = date;
      displayed = dateAt(date.getFullYear(), date.getMonth(), 1);
      focusDate = date;
      updateTrigger();
      input.focus();
      close(false);
      input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    function handleDayKeydown(event, date) {
      const rtl = getComputedStyle(root).direction === 'rtl';
      let target = null;
      if (event.key === 'ArrowLeft') target = dateAt(date.getFullYear(), date.getMonth(), date.getDate() + (rtl ? 1 : -1));
      else if (event.key === 'ArrowRight') target = dateAt(date.getFullYear(), date.getMonth(), date.getDate() + (rtl ? -1 : 1));
      else if (event.key === 'ArrowUp') target = dateAt(date.getFullYear(), date.getMonth(), date.getDate() - 7);
      else if (event.key === 'ArrowDown') target = dateAt(date.getFullYear(), date.getMonth(), date.getDate() + 7);
      else if (event.key === 'Home') target = dateAt(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
      else if (event.key === 'End') target = dateAt(date.getFullYear(), date.getMonth(), date.getDate() + 6 - date.getDay());
      else if (event.key === 'PageUp' || event.key === 'PageDown') {
        const delta = event.key === 'PageUp' ? -1 : 1;
        const months = event.shiftKey ? delta * 12 : delta;
        const last = dateAt(date.getFullYear(), date.getMonth() + months + 1, 0).getDate();
        target = dateAt(date.getFullYear(), date.getMonth() + months, Math.min(date.getDate(), last));
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        keyboardActivating = true;
        return;
      } else if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
        return;
      }
      if (target) {
        event.preventDefault();
        moveFocus(target);
      }
    }

    const weekdays = document.createElement('div');
    weekdays.className = 'datepicker__weekdays';
    weekdays.setAttribute('role', 'row');
    for (let day = 0; day < 7; day += 1) {
      const heading = document.createElement('span');
      const abbreviation = document.createElement('abbr');
      const date = dateAt(2023, 0, day + 1);
      heading.className = 'datepicker__weekday';
      heading.setAttribute('role', 'columnheader');
      abbreviation.title = weekdayLong.format(date);
      abbreviation.textContent = weekdayShort.format(date);
      heading.append(abbreviation);
      weekdays.append(heading);
    }

    function render() {
      min = bound('min');
      max = bound('max');
      monthLabel.textContent = monthFormatter.format(displayed);

      const first = dateAt(displayed.getFullYear(), displayed.getMonth(), 1);
      const start = dateAt(first.getFullYear(), first.getMonth(), 1 - first.getDay());
      const renderedDays = [];
      for (let index = 0; index < 42; index += 1) {
        renderedDays.push(dateAt(start.getFullYear(), start.getMonth(), start.getDate() + index));
      }
      if (!renderedDays.some((date) => sameDate(date, focusDate)) || unavailable(focusDate)) {
        focusDate = renderedDays.find((date) => sameDate(date, selected) && !unavailable(date))
          || renderedDays.find((date) => sameDate(date, today) && !unavailable(date))
          || renderedDays.find((date) => date.getMonth() === displayed.getMonth() && !unavailable(date))
          || renderedDays.find((date) => !unavailable(date))
          || displayed;
      }

      const weeks = Array.from({ length: 6 }, (_, weekIndex) => {
        const week = document.createElement('div');
        week.className = 'datepicker__week';
        week.setAttribute('role', 'row');
        renderedDays.slice(weekIndex * 7, weekIndex * 7 + 7).forEach((date) => {
          const button = document.createElement('button');
          const isSelected = sameDate(date, selected);
          const isToday = sameDate(date, today);
          button.className = [
            'datepicker__day',
            date.getMonth() !== displayed.getMonth() ? 'datepicker__day--outside' : '',
            isSelected ? 'datepicker__day--selected' : '',
            isToday ? 'datepicker__day--today' : '',
          ].filter(Boolean).join(' ');
          button.type = 'button';
          button.setAttribute('role', 'gridcell');
          button.dataset.date = isoDate(date);
          button.textContent = String(date.getDate());
          button.setAttribute('aria-label', dayFormatter.format(date));
          button.setAttribute('aria-selected', String(isSelected));
          if (isToday) button.setAttribute('aria-current', 'date');
          button.disabled = unavailable(date);
          button.tabIndex = sameDate(date, focusDate) && !button.disabled ? 0 : -1;
          week.append(button);
        });
        return week;
      });

      grid.replaceChildren(weekdays, ...weeks);
      const previousEnd = dateAt(displayed.getFullYear(), displayed.getMonth(), 0);
      const nextStart = dateAt(displayed.getFullYear(), displayed.getMonth() + 1, 1);
      previous.disabled = Boolean(min && previousEnd < min);
      next.disabled = Boolean(max && nextStart > max);
      updateTrigger();
    }

    function shiftMonth(delta) {
      const desired = focusDate.getDate();
      const targetMonth = dateAt(displayed.getFullYear(), displayed.getMonth() + delta, 1);
      const last = dateAt(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate();
      displayed = targetMonth;
      const candidate = dateAt(targetMonth.getFullYear(), targetMonth.getMonth(), Math.min(desired, last));
      if (!unavailable(candidate)) focusDate = candidate;
      render();
    }

    function open(focus = true) {
      if (input.disabled || input.readOnly) return;
      selected = parseIsoDate(input.value);
      if (selected) {
        displayed = dateAt(selected.getFullYear(), selected.getMonth(), 1);
        focusDate = selected;
      }
      render();
      root.classList.add('datepicker--open');
      calendar.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      if (focus) focusRenderedDay();
    }

    function close(focusInput = false) {
      const active = document.activeElement;
      if (focusInput || calendar.contains(active)) {
        if (!input.disabled) input.focus();
        else if (active instanceof HTMLElement) active.blur();
      }
      root.classList.remove('datepicker--open');
      calendar.hidden = true;
      input.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', () => {
      if (root.classList.contains('datepicker--open')) close(true);
      else open(true);
    });
    previous.addEventListener('click', () => shiftMonth(-1));
    next.addEventListener('click', () => shiftMonth(1));
    grid.addEventListener('click', (event) => {
      if (keyboardActivating) return;
      const button = event.target instanceof Element ? event.target.closest('.datepicker__day') : null;
      const date = button && grid.contains(button) ? parseIsoDate(button.dataset.date) : null;
      if (date) selectDate(date);
    });
    grid.addEventListener('keydown', (event) => {
      const button = event.target instanceof Element ? event.target.closest('.datepicker__day') : null;
      const date = button && grid.contains(button) ? parseIsoDate(button.dataset.date) : null;
      if (date) handleDayKeydown(event, date);
    });
    grid.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      const button = event.target instanceof Element ? event.target.closest('.datepicker__day') : null;
      const date = button && grid.contains(button) ? parseIsoDate(button.dataset.date) : null;
      keyboardActivating = false;
      if (date) window.setTimeout(() => selectDate(date));
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        open(true);
      } else if (event.key === 'Escape' && root.classList.contains('datepicker--open')) {
        event.preventDefault();
        close(true);
      }
    });
    input.addEventListener('input', () => {
      selected = parseIsoDate(input.value);
      updateTrigger();
    });
    input.addEventListener('change', () => {
      selected = parseIsoDate(input.value);
      if (selected) {
        displayed = dateAt(selected.getFullYear(), selected.getMonth(), 1);
        focusDate = selected;
      }
      if (root.classList.contains('datepicker--open')) render();
      updateTrigger();
    });
    root.addEventListener('focusout', () => window.setTimeout(() => {
      if (!root.contains(document.activeElement)) close(false);
    }));
    document.addEventListener('pointerdown', (event) => {
      if (!event.composedPath().includes(root)) close(false);
    });
    input.form?.addEventListener('reset', () => window.setTimeout(() => {
      selected = parseIsoDate(input.value);
      displayed = dateAt((selected || today).getFullYear(), (selected || today).getMonth(), 1);
      focusDate = selected || today;
      render();
      close(false);
    }));
    new MutationObserver(() => {
      selected = parseIsoDate(input.value);
      render();
      if (input.disabled || input.readOnly) close(false);
    }).observe(input, {
      attributes: true,
      attributeFilter: ['data-max', 'data-min', 'disabled', 'readonly', 'value'],
    });

    root.dataset.datepickerEnhanced = 'true';
    render();
    if (root.classList.contains('datepicker--open') || input.getAttribute('aria-expanded') === 'true') open(false);
    else close(false);
  }

  function enhanceDatepickers(scope = document) {
    enhanceMatches(scope, '.datepicker', enhanceDatepicker);
  }

  /* ---- Toggle group ---- */
  function enhanceToggleGroup(root) {
    if (!(root instanceof HTMLElement) || !root.classList.contains('toggle-group')) return;
    if (root.dataset.toggleGroupEnhanced === 'true') return;

    const toggles = Array.from(root.querySelectorAll('.toggle')).filter((toggle) => (
      toggle instanceof HTMLButtonElement
    ));
    if (toggles.length === 0) return;

    function selectToggle(selected) {
      if (!(selected instanceof HTMLButtonElement) || selected.disabled) return;
      toggles.forEach((toggle) => {
        const pressed = toggle === selected;
        toggle.setAttribute('aria-pressed', String(pressed));
        toggle.classList.toggle('toggle--active', pressed);
      });
    }

    const selected = toggles.find((toggle) => toggle.getAttribute('aria-pressed') === 'true')
      || toggles.find((toggle) => toggle.classList.contains('toggle--active'))
      || toggles.find((toggle) => !toggle.disabled)
      || toggles[0];
    selectToggle(selected);

    root.addEventListener('click', (event) => {
      const toggle = event.target instanceof Element
        ? event.target.closest('.toggle')
        : null;
      if (toggle && root.contains(toggle)) selectToggle(toggle);
    });
    root.dataset.toggleGroupEnhanced = 'true';
  }

  function enhanceToggleGroups(scope = document) {
    enhanceMatches(scope, '.toggle-group', enhanceToggleGroup);
  }

  /* ---- Pin input ---- */
  function enhancePinInput(root) {
    if (!(root instanceof HTMLElement)
        || !root.matches('[data-pin-input]')
        || root.dataset.pinInputEnhanced === 'true') return;

    const fields = Array.from(root.querySelectorAll('.pin-input__field')).filter((field) => (
      field instanceof HTMLInputElement && field.type === 'text'
    ));
    if (fields.length < 2) return;

    let distributing = false;
    const digits = (value) => value.replace(/\D/g, '');

    function sync() {
      fields.forEach((field) => {
        field.classList.toggle('pin-input__field--filled', field.value.length === 1);
      });
      root.dataset.complete = String(fields.every((field) => field.value.length === 1));
    }

    function focusField(index) {
      const field = fields[index];
      if (!field || field.disabled) return;
      field.focus();
      field.select();
    }

    function distribute(value, requestedStart) {
      const characters = digits(value).slice(0, fields.length).split('');
      if (characters.length === 0) return;
      const start = characters.length >= fields.length ? 0 : requestedStart;
      let lastChanged = start;

      distributing = true;
      characters.forEach((character, offset) => {
        const index = start + offset;
        if (!fields[index]) return;
        fields[index].value = character;
        lastChanged = index;
      });
      sync();
      distributing = false;

      focusField(Math.min(lastChanged + 1, fields.length - 1));
      fields[lastChanged].dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }

    root.addEventListener('input', (event) => {
      const field = event.target;
      if (distributing || !(field instanceof HTMLInputElement)) return;
      const index = fields.indexOf(field);
      if (index < 0) return;
      const next = digits(field.value);
      if (next.length > 1) {
        distribute(next, index);
        return;
      }
      field.value = next.slice(-1);
      sync();
      if (field.value && index < fields.length - 1) focusField(index + 1);
    });

    root.addEventListener('keydown', (event) => {
      const field = event.target;
      if (!(field instanceof HTMLInputElement) || event.altKey || event.ctrlKey || event.metaKey) return;
      const index = fields.indexOf(field);
      if (index < 0) return;
      const rtl = getComputedStyle(root).direction === 'rtl';
      const previousKey = rtl ? 'ArrowRight' : 'ArrowLeft';
      const nextKey = rtl ? 'ArrowLeft' : 'ArrowRight';

      if (event.key === previousKey && index > 0) {
        event.preventDefault();
        focusField(index - 1);
      } else if (event.key === nextKey && index < fields.length - 1) {
        event.preventDefault();
        focusField(index + 1);
      } else if (event.key === 'Backspace' && field.value === '' && index > 0) {
        event.preventDefault();
        focusField(index - 1);
      }
    });

    root.addEventListener('paste', (event) => {
      const field = event.target;
      if (!(field instanceof HTMLInputElement) || field.disabled || field.readOnly) return;
      const index = fields.indexOf(field);
      const pasted = event.clipboardData?.getData('text') || '';
      if (index < 0 || digits(pasted).length === 0) return;
      event.preventDefault();
      distribute(pasted, index);
    });

    fields.forEach((field, index) => {
      field.value = digits(field.value).slice(0, 1);
      field.maxLength = 1;
      field.inputMode = 'numeric';
      field.pattern = '[0-9]*';
      field.autocomplete = index === 0 ? 'one-time-code' : 'off';
    });
    fields[0].form?.addEventListener('reset', () => window.setTimeout(sync, 0));
    sync();
    root.dataset.pinInputEnhanced = 'true';
  }

  function enhancePinInputs(scope = document) {
    enhanceMatches(scope, '[data-pin-input]', enhancePinInput);
  }

  /* ---- Countdown ---- */
  const countdownUnitOrder = ['days', 'hours', 'minutes', 'seconds'];
  const countdownUnitMilliseconds = {
    days: 86400000,
    hours: 3600000,
    minutes: 60000,
    seconds: 1000,
  };
  const countdownUnitNames = {
    days: 'day',
    hours: 'hour',
    minutes: 'minute',
    seconds: 'second',
  };
  const countdownDeadlinePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/;
  const countdownEntries = new Map();
  let countdownTimer = 0;

  function countdownLocale(root) {
    return root.lang
      || root.closest('[lang]')?.getAttribute('lang')
      || document.documentElement.lang
      || navigator.language
      || 'en';
  }

  function countdownUnits(root) {
    const requested = String(root.dataset.countdownUnits || 'days-hours-minutes-seconds')
      .split('-')
      .filter(Boolean);
    const selected = countdownUnitOrder.filter((unit) => requested.includes(unit));
    return selected.length > 0 ? selected : [...countdownUnitOrder];
  }

  function parseCountdownDeadline(value) {
    const source = String(value || '').trim();
    if (!countdownDeadlinePattern.test(source)) return null;
    const dateParts = source.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/);
    if (!dateParts) return null;
    const [, yearText, monthText, dayText, hourText, minuteText, secondText = '0'] = dateParts;
    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);
    const hour = Number(hourText);
    const minute = Number(minuteText);
    const second = Number(secondText);
    const daysInMonth = month >= 1 && month <= 12
      ? new Date(Date.UTC(year, month, 0)).getUTCDate()
      : 0;
    if (day < 1 || day > daysInMonth || hour > 23 || minute > 59 || second > 59) return null;
    const parsed = Date.parse(source);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function countdownElements(root) {
    const items = new Map();
    root.querySelectorAll('[data-countdown-unit]').forEach((item) => {
      if (!(item instanceof HTMLElement)) return;
      const unit = item.dataset.countdownUnit;
      if (!countdownUnitOrder.includes(unit) || items.has(unit)) return;
      items.set(unit, {
        item,
        number: item.querySelector('.countdown__number'),
        label: item.querySelector('.countdown__label'),
        separator: item.querySelector('.countdown__separator'),
      });
    });
    return {
      display: root.querySelector('.countdown__display'),
      fallback: root.querySelector('.countdown__fallback'),
      announcement: root.querySelector('.countdown__announcement'),
      items,
    };
  }

  function countdownNumberFormatter(locale, options = {}) {
    try {
      return new Intl.NumberFormat(locale, options);
    } catch (_) {
      return new Intl.NumberFormat('en', options);
    }
  }

  function countdownListFormatter(locale) {
    try {
      return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' });
    } catch (_) {
      return { format: (values) => values.join(', ') };
    }
  }

  function formatCountdownUnit(locale, unit, value) {
    const options = {
      style: 'unit',
      unit: countdownUnitNames[unit],
      unitDisplay: 'long',
      useGrouping: false,
    };
    const formatter = countdownNumberFormatter(locale, options);
    const phrase = formatter.format(value);
    const unitPart = formatter.formatToParts(value).find((part) => part.type === 'unit')?.value;
    return {
      phrase,
      label: unitPart || unit,
      number: countdownNumberFormatter(locale, {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }).format(value),
    };
  }

  function countdownValues(remaining, units) {
    const smallest = units[units.length - 1];
    const smallestMilliseconds = countdownUnitMilliseconds[smallest];
    let cursor = remaining > 0
      ? Math.ceil(remaining / smallestMilliseconds) * smallestMilliseconds
      : 0;
    const values = {};

    units.forEach((unit) => {
      const unitMilliseconds = countdownUnitMilliseconds[unit];
      values[unit] = Math.floor(cursor / unitMilliseconds);
      cursor %= unitMilliseconds;
    });

    return { values, smallestMilliseconds };
  }

  function invalidateCountdown(entry) {
    const { root, elements } = entry;
    root.dataset.countdownState = 'invalid';
    root.removeAttribute('role');
    root.removeAttribute('aria-label');
    if (elements.display instanceof HTMLElement) elements.display.hidden = true;
    if (elements.fallback instanceof HTMLElement) elements.fallback.hidden = false;
    if (elements.announcement instanceof HTMLElement) elements.announcement.textContent = '';
    entry.lastState = 'invalid';
    entry.expiredNotified = false;
  }

  function configureCountdown(entry) {
    entry.deadline = parseCountdownDeadline(entry.root.getAttribute('datetime'));
    entry.units = countdownUnits(entry.root);
    entry.locale = countdownLocale(entry.root);
    entry.elements = countdownElements(entry.root);
    entry.expiredNotified = false;
    entry.lastState = null;

    if (entry.deadline === null || entry.elements.items.size === 0) {
      invalidateCountdown(entry);
      return false;
    }

    entry.root.dataset.countdownEnhanced = 'true';
    return true;
  }

  function renderCountdown(entry, now = Date.now()) {
    const { root, deadline, units, locale, elements } = entry;
    if (deadline === null || !root.isConnected) return Number.POSITIVE_INFINITY;

    const remaining = Math.max(0, deadline - now);
    const state = remaining > 0 ? 'running' : 'expired';
    const { values, smallestMilliseconds } = countdownValues(remaining, units);
    const phrases = [];

    countdownUnitOrder.forEach((unit) => {
      const parts = elements.items.get(unit);
      if (!parts) return;
      const selectedIndex = units.indexOf(unit);
      const selected = selectedIndex >= 0;
      parts.item.hidden = !selected;
      if (parts.separator instanceof HTMLElement) parts.separator.hidden = !selected || selectedIndex === 0;
      if (!selected) return;

      const formatted = formatCountdownUnit(locale, unit, values[unit]);
      if (parts.number instanceof HTMLElement) parts.number.textContent = formatted.number;
      if (parts.label instanceof HTMLElement) parts.label.textContent = formatted.label;
      phrases.push(formatted.phrase);
    });

    root.dataset.countdownState = state;
    root.setAttribute('role', 'timer');
    root.setAttribute('aria-label', countdownListFormatter(locale).format(phrases));
    if (elements.display instanceof HTMLElement) elements.display.hidden = false;
    if (elements.fallback instanceof HTMLElement) elements.fallback.hidden = true;

    if (state === 'running') {
      if (elements.announcement instanceof HTMLElement) elements.announcement.textContent = '';
      entry.expiredNotified = false;
    } else if (entry.lastState === 'running' && !entry.expiredNotified) {
      const announcement = String(root.dataset.countdownExpiredAnnouncement || '').trim();
      if (announcement && elements.announcement instanceof HTMLElement) {
        elements.announcement.textContent = announcement;
      }
      root.dispatchEvent(new CustomEvent('countdownexpire', {
        bubbles: true,
        detail: {
          deadline: new Date(deadline).toISOString(),
          state: 'expired',
        },
      }));
      entry.expiredNotified = true;
    }

    entry.lastState = state;
    if (state === 'expired') return Number.POSITIVE_INFINITY;

    const remainder = remaining % smallestMilliseconds;
    return Math.max(20, (remainder || smallestMilliseconds) + 20);
  }

  function clearCountdownTimer() {
    if (!countdownTimer) return;
    window.clearTimeout(countdownTimer);
    countdownTimer = 0;
  }

  function scheduleCountdowns({ render = false } = {}) {
    clearCountdownTimer();
    if (document.hidden) return;

    const now = Date.now();
    let nextDelay = Number.POSITIVE_INFINITY;
    countdownEntries.forEach((entry, root) => {
      if (!root.isConnected) {
        countdownEntries.delete(root);
        return;
      }
      const delay = render ? renderCountdown(entry, now) : (() => {
        if (entry.deadline === null || entry.lastState === 'expired') return Number.POSITIVE_INFINITY;
        const remaining = Math.max(0, entry.deadline - now);
        const smallest = entry.units[entry.units.length - 1];
        const unitMilliseconds = countdownUnitMilliseconds[smallest];
        const remainder = remaining % unitMilliseconds;
        return Math.max(20, (remainder || unitMilliseconds) + 20);
      })();
      nextDelay = Math.min(nextDelay, delay);
    });

    if (Number.isFinite(nextDelay)) {
      countdownTimer = window.setTimeout(() => scheduleCountdowns({ render: true }), nextDelay);
    }
  }

  function enhanceCountdown(root) {
    if (!(root instanceof HTMLElement) || !root.matches('[data-countdown]')) return;
    let entry = countdownEntries.get(root);
    if (!entry) {
      entry = {
        root,
        deadline: null,
        units: [...countdownUnitOrder],
        locale: 'en',
        elements: countdownElements(root),
        lastState: null,
        expiredNotified: false,
      };
      countdownEntries.set(root, entry);
    }

    if (configureCountdown(entry)) renderCountdown(entry);
    scheduleCountdowns();
  }

  function enhanceCountdowns(scope = document) {
    enhanceMatches(scope, '[data-countdown]', enhanceCountdown);
  }

  function refreshCountdowns() {
    countdownEntries.forEach((entry) => {
      if (entry.root.isConnected && configureCountdown(entry)) renderCountdown(entry);
    });
    scheduleCountdowns();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearCountdownTimer();
    else scheduleCountdowns({ render: true });
  });
  window.addEventListener('pageshow', () => scheduleCountdowns({ render: true }));
  window.addEventListener('focus', () => scheduleCountdowns({ render: true }));

  /* ---- Marquee progressive motion ---- */
  const marqueeEntries = new Map();
  const marqueeObserved = new Map();
  const marqueePending = new Set();
  const marqueeReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const marqueeVelocities = { slow: 24, default: 40, fast: 64 };
  let marqueeResizeObserver = null;
  let marqueeResizeFrame = 0;

  function scheduleMarqueeMeasurement(root) {
    if (root instanceof HTMLElement) marqueePending.add(root);
    if (marqueeResizeFrame || marqueePending.size === 0) return;
    marqueeResizeFrame = window.requestAnimationFrame(() => {
      marqueeResizeFrame = 0;
      const roots = Array.from(marqueePending);
      marqueePending.clear();
      roots.forEach((item) => measureMarquee(item));
    });
  }

  function observeMarqueeElement(element, root) {
    if (!(element instanceof Element) || typeof ResizeObserver === 'undefined') return;
    if (!marqueeResizeObserver) {
      marqueeResizeObserver = new ResizeObserver((records) => {
        records.forEach((record) => {
          marqueeObserved.get(record.target)?.forEach(scheduleMarqueeMeasurement);
        });
      });
    }
    let roots = marqueeObserved.get(element);
    if (!roots) {
      roots = new Set();
      marqueeObserved.set(element, roots);
      marqueeResizeObserver.observe(element);
    }
    roots.add(root);
  }

  function unobserveMarqueeElement(element, root) {
    const roots = marqueeObserved.get(element);
    if (!roots) return;
    roots.delete(root);
    if (roots.size > 0) return;
    marqueeResizeObserver?.unobserve(element);
    marqueeObserved.delete(element);
  }

  function dispatchMarqueePlayback(entry) {
    const { root } = entry;
    const signature = [
      root.dataset.marqueeState,
      root.dataset.userPaused,
      root.dataset.hoverPaused,
      root.dataset.hiddenPaused,
      root.dataset.reducedMotion,
      root.dataset.direction,
      root.dataset.pace,
    ].join(':');
    if (signature === entry.signature) return;
    entry.signature = signature;
    root.dispatchEvent(new CustomEvent('marqueeplaybackchange', {
      bubbles: true,
      detail: {
        state: root.dataset.marqueeState,
        userPaused: entry.userPaused,
        hoverPaused: entry.hoverPaused,
        hiddenPaused: entry.hiddenPaused,
        reducedMotion: marqueeReducedMotion.matches,
        direction: root.dataset.direction,
        pace: root.dataset.pace,
      },
    }));
  }

  function syncMarqueePlayback(entry) {
    const { root, track, control } = entry;
    const reduced = marqueeReducedMotion.matches;
    const paused = entry.userPaused || entry.hoverPaused || entry.hiddenPaused || reduced;
    const pauseLabel = String(control.dataset.pauseLabel || 'Pause scrolling').trim();
    const resumeLabel = String(control.dataset.resumeLabel || 'Resume scrolling').trim();
    const nextLabel = entry.userPaused ? resumeLabel : pauseLabel;

    root.dataset.marqueeState = reduced ? 'static' : (paused ? 'paused' : 'playing');
    root.dataset.userPaused = String(entry.userPaused);
    root.dataset.hoverPaused = String(entry.hoverPaused);
    root.dataset.hiddenPaused = String(entry.hiddenPaused);
    root.dataset.reducedMotion = String(reduced);
    track.style.animationPlayState = paused ? 'paused' : 'running';
    control.hidden = reduced;
    control.textContent = nextLabel;
    control.setAttribute('aria-label', nextLabel);
    dispatchMarqueePlayback(entry);
  }

  function measureMarquee(root) {
    const entry = marqueeEntries.get(root);
    if (!entry || !root.isConnected || marqueeReducedMotion.matches) return;
    const groupWidth = entry.sourceGroup.getBoundingClientRect().width;
    const trackStyles = getComputedStyle(entry.track);
    const groupGap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
    const pace = Object.hasOwn(marqueeVelocities, root.dataset.pace)
      ? root.dataset.pace
      : 'default';
    const velocity = marqueeVelocities[pace];
    const distance = groupWidth + groupGap;
    if (!(distance > 0)) return;
    root.style.setProperty('--_marquee-duration', `${distance / velocity}s`);
  }

  function removeMarqueeCopy(root) {
    root.querySelectorAll('.marquee__group--copy').forEach((copy) => copy.remove());
  }

  function cleanupMarquee(root, { reset = true } = {}) {
    const entry = marqueeEntries.get(root);
    if (entry) {
      entry.root.removeEventListener('pointerenter', entry.onPointerEnter);
      entry.root.removeEventListener('pointerleave', entry.onPointerLeave);
      entry.root.removeEventListener('focusin', entry.onFocusIn);
      entry.control.removeEventListener('pointerdown', entry.onControlPointerDown);
      entry.control.removeEventListener('click', entry.onControlClick);
      unobserveMarqueeElement(entry.sourceGroup, root);
      unobserveMarqueeElement(entry.viewport, root);
      marqueeEntries.delete(root);
    }
    marqueePending.delete(root);
    removeMarqueeCopy(root);
    if (!reset) return;
    root.removeAttribute('data-marquee-enhanced');
    root.removeAttribute('data-user-paused');
    root.removeAttribute('data-hover-paused');
    root.removeAttribute('data-hidden-paused');
    root.removeAttribute('data-reduced-motion');
    root.style.removeProperty('--_marquee-duration');
    const track = root.querySelector('.marquee__track');
    const control = root.querySelector('.marquee__control');
    if (track instanceof HTMLElement) track.style.removeProperty('animation-play-state');
    if (control instanceof HTMLButtonElement) control.hidden = true;
  }

  function cleanMarqueeCopy(copy) {
    copy.classList.remove('marquee__group--source');
    copy.classList.add('marquee__group--copy');
    copy.setAttribute('aria-hidden', 'true');
    copy.setAttribute('inert', '');
    copy.removeAttribute('id');
    copy.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
    copy.querySelectorAll('a, button, input, select, textarea, [tabindex], [contenteditable]').forEach((element) => {
      element.setAttribute('tabindex', '-1');
      element.removeAttribute('contenteditable');
    });
  }

  function enhanceMarquee(root) {
    if (!(root instanceof HTMLElement) || !root.matches('[data-marquee]')) return;
    cleanupMarquee(root);

    const presentation = root.dataset.presentation === 'static' ? 'static' : 'auto';
    const direction = root.dataset.direction === 'reverse' ? 'reverse' : 'forward';
    const pace = Object.hasOwn(marqueeVelocities, root.dataset.pace)
      ? root.dataset.pace
      : 'default';
    const viewport = root.querySelector('.marquee__viewport');
    const track = root.querySelector('.marquee__track');
    const sourceGroup = root.querySelector('.marquee__group--source');
    const control = root.querySelector('.marquee__control');
    const items = sourceGroup?.querySelectorAll(':scope > .marquee__item') ?? [];

    if (root.dataset.presentation !== presentation) root.dataset.presentation = presentation;
    if (root.dataset.direction !== direction) root.dataset.direction = direction;
    if (root.dataset.pace !== pace) root.dataset.pace = pace;
    root.dataset.marqueeState = 'static';
    if (presentation !== 'auto'
        || !(viewport instanceof HTMLElement)
        || !(track instanceof HTMLElement)
        || !(sourceGroup instanceof HTMLElement)
        || !(control instanceof HTMLButtonElement)
        || items.length < 2) return;

    if (marqueeReducedMotion.matches) {
      root.dataset.reducedMotion = 'true';
      control.hidden = true;
      marqueeEntries.set(root, {
        root, viewport, track, sourceGroup, control,
        userPaused: false, hoverPaused: false, hiddenPaused: document.hidden,
        signature: '', reducedOnly: true,
        onPointerEnter: () => {}, onPointerLeave: () => {}, onFocusIn: () => {},
        onControlPointerDown: () => {}, onControlClick: () => {},
      });
      return;
    }

    const copy = sourceGroup.cloneNode(true);
    if (!(copy instanceof HTMLElement)) return;
    cleanMarqueeCopy(copy);
    track.append(copy);

    const entry = {
      root, viewport, track, sourceGroup, control,
      userPaused: false,
      hoverPaused: false,
      hiddenPaused: document.hidden,
      controlIntent: null,
      signature: '',
      onPointerEnter: null,
      onPointerLeave: null,
      onFocusIn: null,
      onControlPointerDown: null,
      onControlClick: null,
    };
    entry.onPointerEnter = () => {
      entry.hoverPaused = true;
      syncMarqueePlayback(entry);
    };
    entry.onPointerLeave = () => {
      entry.hoverPaused = false;
      syncMarqueePlayback(entry);
    };
    entry.onFocusIn = (event) => {
      if (event.relatedTarget instanceof Node && root.contains(event.relatedTarget)) return;
      entry.userPaused = true;
      syncMarqueePlayback(entry);
    };
    entry.onControlPointerDown = () => {
      entry.controlIntent = !entry.userPaused;
    };
    entry.onControlClick = () => {
      entry.userPaused = typeof entry.controlIntent === 'boolean'
        ? entry.controlIntent
        : !entry.userPaused;
      entry.controlIntent = null;
      syncMarqueePlayback(entry);
    };

    root.addEventListener('pointerenter', entry.onPointerEnter);
    root.addEventListener('pointerleave', entry.onPointerLeave);
    root.addEventListener('focusin', entry.onFocusIn);
    control.addEventListener('pointerdown', entry.onControlPointerDown);
    control.addEventListener('click', entry.onControlClick);
    marqueeEntries.set(root, entry);
    root.dataset.marqueeState = 'paused';
    root.dataset.marqueeEnhanced = 'true';
    observeMarqueeElement(sourceGroup, root);
    observeMarqueeElement(viewport, root);
    measureMarquee(root);
    syncMarqueePlayback(entry);
  }

  function enhanceMarquees(scope = document) {
    enhanceMatches(scope, '[data-marquee]', enhanceMarquee);
  }

  function cleanupMarquees() {
    marqueeEntries.forEach((entry, root) => {
      if (!root.isConnected) cleanupMarquee(root, { reset: false });
    });
    if (marqueeEntries.size === 0) {
      marqueeResizeObserver?.disconnect();
      marqueeResizeObserver = null;
      marqueeObserved.clear();
      marqueePending.clear();
      if (marqueeResizeFrame) window.cancelAnimationFrame(marqueeResizeFrame);
      marqueeResizeFrame = 0;
    }
  }

  document.addEventListener('visibilitychange', () => {
    marqueeEntries.forEach((entry) => {
      entry.hiddenPaused = document.hidden;
      if (!entry.reducedOnly) syncMarqueePlayback(entry);
    });
  });
  marqueeReducedMotion.addEventListener?.('change', () => {
    Array.from(marqueeEntries.keys()).forEach(enhanceMarquee);
  });

  /* ---- Shared Carousel rotation service ---- */
  const carouselRotationEntries = new Map();
  const carouselReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function enhanceCarouselRotation(root, options) {
    const track = root.querySelector(options.track);
    const slides = Array.from(root.querySelectorAll(options.slide)).filter((slide) => (
      slide instanceof HTMLElement
    ));
    if (!(track instanceof HTMLElement) || slides.length < 2) return;

    const previous = root.querySelector(options.previous);
    const next = root.querySelector(options.next);
    const indicators = options.indicator
      ? Array.from(root.querySelectorAll(options.indicator)).filter((control) => (
        control instanceof HTMLButtonElement
      ))
      : [];
    const rotationControl = root.querySelector(options.rotationControl);
    const pauseIcon = root.querySelector(options.pauseIcon);
    const playIcon = root.querySelector(options.playIcon);
    const status = root.querySelector(options.status);
    const counter = options.counter ? root.querySelector(options.counter) : null;
    const progressValue = options.progress ? root.querySelector(options.progress) : null;
    const parsedInterval = Number(root.dataset.autoplayInterval);
    const interval = Number.isFinite(parsedInterval)
      ? Math.min(12000, Math.max(3000, parsedInterval))
      : 6000;
    const autoplay = root.dataset.autoplay === 'true';
    const loop = options.loop(root);
    const statusTemplate = status instanceof HTMLElement
      ? status.dataset.statusTemplate || options.statusFallback
      : options.statusFallback;
    const counterTemplate = counter instanceof HTMLElement
      ? counter.dataset.counterTemplate || '{current}/{total}'
      : '{current}/{total}';

    let current = Math.max(0, slides.findIndex((slide) => slide.getAttribute('aria-current') === 'true'));
    let userPaused = false;
    let hoverPaused = false;
    let hiddenPaused = document.hidden;
    let timer = 0;
    let remaining = interval;
    let startedAt = 0;
    let scrollFrame = 0;
    let programmaticScroll = false;
    let scrollReleaseTimer = 0;
    let playbackSignature = '';

    if (options.intervalProperty) root.style.setProperty(options.intervalProperty, `${interval}ms`);

    function format(template, index) {
      return template
        .replace('{current}', String(index + 1))
        .replace('{total}', String(slides.length));
    }

    function reduced() {
      return carouselReducedMotion.matches;
    }

    function shouldPlay() {
      return autoplay && !reduced() && !userPaused && !hoverPaused && !hiddenPaused;
    }

    function clearTimer(preserveRemaining = true) {
      if (!timer) return;
      if (preserveRemaining) {
        remaining = Math.max(0, remaining - (performance.now() - startedAt));
      }
      window.clearTimeout(timer);
      timer = 0;
    }

    function resetProgress() {
      if (!(progressValue instanceof HTMLElement)) return;
      progressValue.style.animationName = 'none';
      void progressValue.offsetWidth;
      progressValue.style.removeProperty('animation-name');
    }

    function updateRotationControl() {
      if (!(rotationControl instanceof HTMLButtonElement)) return;
      const pauseLabel = rotationControl.dataset.pauseLabel || options.pauseFallback;
      const playLabel = rotationControl.dataset.playLabel || options.playFallback;
      rotationControl.setAttribute('aria-label', userPaused ? playLabel : pauseLabel);
      rotationControl.setAttribute('aria-pressed', String(userPaused));
      if (pauseIcon instanceof HTMLElement) pauseIcon.hidden = userPaused;
      if (playIcon instanceof HTMLElement) playIcon.hidden = !userPaused;
    }

    function emitPlaybackChange(state) {
      root.dispatchEvent(new CustomEvent(options.playbackEvent, {
        bubbles: true,
        detail: { state, current, autoplay, userPaused },
      }));
    }

    function syncPlayback() {
      root.dataset.reducedMotion = String(reduced());
      const nextState = !autoplay || reduced()
        ? 'off'
        : shouldPlay() ? 'playing' : 'paused';
      const nextSignature = `${nextState}:${userPaused}`;
      const changed = playbackSignature !== nextSignature;
      playbackSignature = nextSignature;
      root.dataset.autoplayState = nextState;
      root.dataset.userPaused = String(userPaused);
      if (status instanceof HTMLElement) status.setAttribute('aria-live', shouldPlay() ? 'off' : 'polite');
      updateRotationControl();

      if (!shouldPlay()) {
        clearTimer(true);
        if (changed) emitPlaybackChange(nextState);
        return;
      }

      if (!timer) {
        if (remaining <= 0) remaining = interval;
        startedAt = performance.now();
        timer = window.setTimeout(() => {
          timer = 0;
          remaining = interval;
          if (!loop && current === slides.length - 1) {
            userPaused = true;
            syncPlayback();
            return;
          }
          selectSlide(current + 1, { manual: false, scroll: true });
        }, remaining);
      }
      if (changed) emitPlaybackChange(nextState);
    }

    function syncSelection({ announce = true } = {}) {
      slides.forEach((slide, index) => {
        if (index === current) slide.setAttribute('aria-current', 'true');
        else slide.removeAttribute('aria-current');
      });
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('carousel__dot--active', index === current);
        if (index === current) indicator.setAttribute('aria-current', 'true');
        else indicator.removeAttribute('aria-current');
      });
      if (previous instanceof HTMLButtonElement) previous.disabled = !loop && current === 0;
      if (next instanceof HTMLButtonElement) next.disabled = !loop && current === slides.length - 1;
      root.dataset.currentSlide = String(current);
      if (counter instanceof HTMLElement) counter.textContent = format(counterTemplate, current);
      if (announce && status instanceof HTMLElement) status.textContent = format(statusTemplate, current);
    }

    function normalizeIndex(index) {
      if (loop) return (index + slides.length) % slides.length;
      return Math.max(0, Math.min(slides.length - 1, index));
    }

    function releaseProgrammaticScroll() {
      programmaticScroll = false;
      if (scrollReleaseTimer) window.clearTimeout(scrollReleaseTimer);
      scrollReleaseTimer = 0;
    }

    function selectSlide(index, { manual = false, scroll = true } = {}) {
      const nextIndex = normalizeIndex(index);
      const changed = nextIndex !== current;
      if (manual && autoplay) userPaused = true;
      current = nextIndex;
      clearTimer(false);
      remaining = interval;
      syncSelection({ announce: changed });
      resetProgress();
      if (scroll && changed) {
        programmaticScroll = true;
        if (scrollReleaseTimer) window.clearTimeout(scrollReleaseTimer);
        scrollReleaseTimer = window.setTimeout(releaseProgrammaticScroll, 800);
        slides[current].scrollIntoView({
          behavior: reduced() ? 'auto' : 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }
      syncPlayback();
      if (changed) {
        root.dispatchEvent(new CustomEvent(options.changeEvent, {
          bubbles: true,
          detail: { current, total: slides.length, manual },
        }));
      }
    }

    root.addEventListener('click', (event) => {
      const control = event.target instanceof Element ? event.target.closest('button') : null;
      if (!(control instanceof HTMLButtonElement) || !root.contains(control)) return;
      if (control === previous) selectSlide(current - 1, { manual: true, scroll: true });
      else if (control === next) selectSlide(current + 1, { manual: true, scroll: true });
      else if (control === rotationControl) {
        userPaused = !userPaused;
        syncPlayback();
      } else {
        const indicatorIndex = indicators.indexOf(control);
        if (indicatorIndex >= 0) selectSlide(indicatorIndex, { manual: true, scroll: true });
      }
    });

    track.addEventListener('scroll', () => {
      if (programmaticScroll || scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        const trackRect = track.getBoundingClientRect();
        const midpoint = trackRect.left + (trackRect.width / 2);
        const nearest = slides.reduce((best, slide, index) => {
          const rect = slide.getBoundingClientRect();
          const distance = Math.abs((rect.left + (rect.width / 2)) - midpoint);
          return distance < best.distance ? { index, distance } : best;
        }, { index: current, distance: Number.POSITIVE_INFINITY }).index;
        if (nearest !== current) selectSlide(nearest, { manual: true, scroll: false });
      });
    }, { passive: true });
    track.addEventListener('scrollend', releaseProgrammaticScroll);
    track.addEventListener('pointerdown', releaseProgrammaticScroll, { passive: true });

    root.addEventListener('pointerenter', () => {
      hoverPaused = true;
      syncPlayback();
    });
    root.addEventListener('pointerleave', () => {
      hoverPaused = false;
      syncPlayback();
    });
    root.addEventListener('focusin', () => {
      if (autoplay) userPaused = true;
      syncPlayback();
    });

    slides.forEach((slide, index) => {
      if (!slide.getAttribute('aria-label')) slide.setAttribute('aria-label', format(statusTemplate, index));
    });
    syncSelection({ announce: false });
    if (status instanceof HTMLElement) status.textContent = format(statusTemplate, current);
    resetProgress();
    syncPlayback();

    carouselRotationEntries.set(root, {
      syncPlayback,
      setHidden(value) {
        hiddenPaused = value;
        syncPlayback();
      },
      destroy() {
        clearTimer(false);
        if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
        if (scrollReleaseTimer) window.clearTimeout(scrollReleaseTimer);
      },
    });
  }

  function cleanupCarouselRotations() {
    carouselRotationEntries.forEach((entry, root) => {
      if (root.isConnected) return;
      entry.destroy();
      carouselRotationEntries.delete(root);
    });
  }

  document.addEventListener('visibilitychange', () => {
    carouselRotationEntries.forEach((entry) => entry.setHidden(document.hidden));
  });
  carouselReducedMotion.addEventListener?.('change', () => {
    carouselRotationEntries.forEach((entry) => entry.syncPlayback());
  });

  /* ---- Hero slideshow ---- */
  function enhanceHero(root) {
    if (!(root instanceof HTMLElement)
        || !root.matches('[data-hero]')
        || root.dataset.heroEnhanced === 'true') return;

    root.dataset.heroEnhanced = 'true';
    if (root.dataset.mediaBehavior !== 'slideshow') return;
    enhanceCarouselRotation(root, {
      track: '.hero__track',
      slide: '.hero__slide',
      previous: '.hero__previous',
      next: '.hero__next',
      indicator: '.hero__indicator',
      rotationControl: '.hero__rotation-control',
      pauseIcon: '.hero__pause-icon',
      playIcon: '.hero__play-icon',
      status: '.hero__status',
      progress: '.hero__progress-value',
      counter: null,
      loop: (element) => element.dataset.loop !== 'false',
      intervalProperty: '--_hero-interval',
      statusFallback: 'Slide {current} of {total}',
      pauseFallback: 'Pause slideshow',
      playFallback: 'Play slideshow',
      changeEvent: 'herochange',
      playbackEvent: 'heroplaybackchange',
    });
  }

  function enhanceHeroes(scope = document) {
    enhanceMatches(scope, '[data-hero]', enhanceHero);
  }

  /* ---- Announcement rotation ---- */
  function enhanceAnnouncement(root) {
    if (!(root instanceof HTMLElement)
        || !root.matches('[data-announcement]')
        || root.dataset.announcementEnhanced === 'true') return;

    root.dataset.announcementEnhanced = 'true';
    enhanceCarouselRotation(root, {
      track: '.announcement__track',
      slide: '.announcement__slide',
      previous: '.announcement__previous',
      next: '.announcement__next',
      indicator: null,
      rotationControl: '.announcement__rotation-control',
      pauseIcon: '.announcement__pause-icon',
      playIcon: '.announcement__play-icon',
      status: '.announcement__status',
      progress: null,
      counter: '.announcement__counter',
      loop: () => true,
      intervalProperty: null,
      statusFallback: 'Message {current} of {total}',
      pauseFallback: 'Pause announcements',
      playFallback: 'Play announcements',
      changeEvent: 'announcementchange',
      playbackEvent: 'announcementplaybackchange',
    });
  }

  function enhanceAnnouncements(scope = document) {
    enhanceMatches(scope, '[data-announcement]', enhanceAnnouncement);
  }

  /* ---- Shared reading-state service: decorative article position ---- */
  const readingProgressEntries = new Map();
  const readingProgressSources = new Map();
  const readingProgressObserved = new Map();
  const readingProgressPending = new Set();
  let readingProgressResizeObserver = null;
  let readingProgressFrame = 0;
  let readingProgressWindowResizeAttached = false;

  function handleReadingProgressResize() {
    scheduleReadingProgress();
  }

  function readingDocumentScroller() {
    return document.scrollingElement || document.documentElement;
  }

  function readingElementById(root, id) {
    const tree = root.getRootNode();
    return typeof tree.getElementById === 'function'
      ? tree.getElementById(id)
      : document.getElementById(id);
  }

  function setReadingProgress(root, value, state) {
    const bounded = Math.min(100, Math.max(0, Number(value) || 0));
    const rounded = Math.round(bounded * 100) / 100;
    root.style.setProperty('--_reading-progress-scale', String(rounded / 100));
    root.dataset.value = String(rounded);
    root.dataset.readingState = state;
    root.hidden = false;
  }

  function setReadingProgressUnavailable(root, state) {
    root.dataset.readingState = state;
    root.removeAttribute('data-value');
    root.style.setProperty('--_reading-progress-scale', '0');
    root.hidden = true;
  }

  function measureReadingProgress(root) {
    const entry = readingProgressEntries.get(root);
    if (!entry || !root.isConnected || !entry.target.isConnected) {
      if (root.isConnected) setReadingProgressUnavailable(root, 'unavailable');
      return;
    }

    const documentScroller = readingDocumentScroller();
    const usesViewport = entry.scroller === documentScroller;
    const targetRect = entry.target.getBoundingClientRect();
    const scrollOffset = usesViewport ? window.scrollY : entry.scroller.scrollTop;
    const scrollportStart = usesViewport
      ? 0
      : entry.scroller.getBoundingClientRect().top + entry.scroller.clientTop;
    const scrollportSize = usesViewport ? window.innerHeight : entry.scroller.clientHeight;
    const targetStart = targetRect.top - scrollportStart + scrollOffset;
    const range = targetRect.height - scrollportSize;

    if (!(range > 0)) {
      setReadingProgressUnavailable(root, 'unavailable');
      return;
    }

    setReadingProgress(root, ((scrollOffset - targetStart) / range) * 100, 'automatic');
  }

  function scheduleReadingProgress(roots = readingProgressEntries.keys()) {
    for (const root of roots) readingProgressPending.add(root);
    if (readingProgressFrame || readingProgressPending.size === 0) return;
    readingProgressFrame = window.requestAnimationFrame(() => {
      readingProgressFrame = 0;
      const pending = Array.from(readingProgressPending);
      readingProgressPending.clear();
      pending.forEach(measureReadingProgress);
    });
  }

  function observeReadingElement(element, root) {
    if (!(element instanceof Element) || typeof ResizeObserver === 'undefined') return;
    if (!readingProgressResizeObserver) {
      readingProgressResizeObserver = new ResizeObserver((records) => {
        const roots = new Set();
        records.forEach((record) => {
          readingProgressObserved.get(record.target)?.forEach((item) => roots.add(item));
        });
        scheduleReadingProgress(roots);
      });
    }
    let roots = readingProgressObserved.get(element);
    if (!roots) {
      roots = new Set();
      readingProgressObserved.set(element, roots);
      readingProgressResizeObserver.observe(element);
    }
    roots.add(root);
  }

  function unobserveReadingElement(element, root) {
    const roots = readingProgressObserved.get(element);
    if (!roots) return;
    roots.delete(root);
    if (roots.size > 0) return;
    readingProgressResizeObserver?.unobserve(element);
    readingProgressObserved.delete(element);
  }

  function attachReadingSource(root, scroller) {
    const source = scroller === readingDocumentScroller() ? window : scroller;
    let entry = readingProgressSources.get(source);
    if (!entry) {
      const roots = new Set();
      const listener = () => scheduleReadingProgress(roots);
      entry = { roots, listener };
      readingProgressSources.set(source, entry);
      source.addEventListener('scroll', listener, { passive: true });
    }
    entry.roots.add(root);
  }

  function detachReadingSource(root, scroller) {
    const source = scroller === readingDocumentScroller() ? window : scroller;
    const entry = readingProgressSources.get(source);
    if (!entry) return;
    entry.roots.delete(root);
    if (entry.roots.size > 0) return;
    source.removeEventListener('scroll', entry.listener);
    readingProgressSources.delete(source);
  }

  function cleanupReadingProgressRoot(root) {
    const entry = readingProgressEntries.get(root);
    if (!entry) return;
    detachReadingSource(root, entry.scroller);
    unobserveReadingElement(entry.target, root);
    if (entry.scroller instanceof Element) unobserveReadingElement(entry.scroller, root);
    readingProgressEntries.delete(root);
    readingProgressPending.delete(root);

    if (readingProgressEntries.size === 0) {
      if (readingProgressWindowResizeAttached) {
        window.removeEventListener('resize', handleReadingProgressResize);
        readingProgressWindowResizeAttached = false;
      }
      if (readingProgressFrame) {
        window.cancelAnimationFrame(readingProgressFrame);
        readingProgressFrame = 0;
      }
      readingProgressPending.clear();
      readingProgressResizeObserver?.disconnect();
      readingProgressResizeObserver = null;
      readingProgressObserved.clear();
    }
  }

  function configureReadingProgress(root) {
    if (!(root instanceof HTMLElement) || !root.matches('[data-reading-progress]')) return;
    cleanupReadingProgressRoot(root);
    root.dataset.readingProgressEnhanced = 'true';
    root.setAttribute('aria-hidden', 'true');

    const mode = root.dataset.readingMode === 'automatic' ? 'automatic' : 'controlled';
    if (mode === 'controlled') {
      const value = Number(root.dataset.readingValue);
      if (!Number.isFinite(value)) setReadingProgressUnavailable(root, 'invalid');
      else setReadingProgress(root, value, 'controlled');
      return;
    }

    const targetId = String(root.dataset.readingTarget || '').trim();
    const scrollRootId = String(root.dataset.readingScrollRoot || '').trim();
    const target = targetId ? readingElementById(root, targetId) : null;
    const scroller = scrollRootId
      ? readingElementById(root, scrollRootId)
      : readingDocumentScroller();

    if (!(target instanceof HTMLElement)
        || !(scroller instanceof HTMLElement)
        || (scroller !== readingDocumentScroller() && !scroller.contains(target))) {
      setReadingProgressUnavailable(root, 'invalid');
      return;
    }

    readingProgressEntries.set(root, { target, scroller });
    attachReadingSource(root, scroller);
    observeReadingElement(target, root);
    if (scroller instanceof Element) observeReadingElement(scroller, root);
    if (!readingProgressWindowResizeAttached) {
      window.addEventListener('resize', handleReadingProgressResize, { passive: true });
      readingProgressWindowResizeAttached = true;
    }
    scheduleReadingProgress([root]);
  }

  function enhanceReadingProgress(scope = document) {
    enhanceMatches(scope, '[data-reading-progress]', configureReadingProgress);
  }

  function cleanupReadingProgress() {
    readingProgressEntries.forEach((_entry, root) => {
      if (!root.isConnected) cleanupReadingProgressRoot(root);
    });
    scheduleReadingProgress();
  }

  /* ---- File upload ---- */
  function enhanceFileUpload(root) {
    if (!(root instanceof HTMLElement) || !root.classList.contains('file-upload')) return;
    if (root.dataset.fileUploadEnhanced === 'true') return;

    const input = root.querySelector('.file-upload__input');
    const status = root.querySelector('.file-upload__status');
    if (!(input instanceof HTMLInputElement) || input.type !== 'file') return;

    const emptyStatus = status instanceof HTMLElement
      ? status.dataset.emptyLabel || status.textContent?.trim() || ''
      : '';

    function syncStatus() {
      const hasSelection = Boolean(input.files && input.files.length > 0);
      root.classList.toggle('file-upload--selected', hasSelection);
      if (!(status instanceof HTMLElement)) return;
      const nextStatus = hasSelection
        ? Array.from(input.files, (file) => file.name).join(', ')
        : emptyStatus;
      if (status.textContent !== nextStatus) status.textContent = nextStatus;
    }

    let dragDepth = 0;
    function includesFiles(event) {
      if (!(event instanceof DragEvent) || !event.dataTransfer) return false;
      const types = Array.from(event.dataTransfer.types || []);
      return types.length === 0 || types.includes('Files');
    }

    root.addEventListener('dragenter', (event) => {
      if (input.disabled || !includesFiles(event)) return;
      dragDepth += 1;
      root.classList.add('file-upload--dragover');
    });
    root.addEventListener('dragover', (event) => {
      if (input.disabled || !includesFiles(event)) return;
      root.classList.add('file-upload--dragover');
    });
    root.addEventListener('dragleave', () => {
      dragDepth = Math.max(0, dragDepth - 1);
      if (dragDepth === 0) root.classList.remove('file-upload--dragover');
    });
    root.addEventListener('drop', () => {
      dragDepth = 0;
      root.classList.remove('file-upload--dragover');
    });
    root.addEventListener('dragend', () => {
      dragDepth = 0;
      root.classList.remove('file-upload--dragover');
    });
    input.addEventListener('input', syncStatus);
    input.addEventListener('change', syncStatus);
    input.form?.addEventListener('reset', () => window.setTimeout(syncStatus, 0));

    syncStatus();
    root.dataset.fileUploadEnhanced = 'true';
  }

  function enhanceFileUploads(scope = document) {
    enhanceMatches(scope, '.file-upload', enhanceFileUpload);
  }

  /* ---- Product gallery ---- */
  function enhanceProductGallery(root) {
    if (!(root instanceof HTMLElement)
        || !root.matches('[data-product-gallery]')
        || root.dataset.productGalleryEnhanced === 'true') return;

    const panels = Array.from(root.querySelectorAll('[data-gallery-media-id][data-gallery-media-type]')).filter((panel) => (
      panel instanceof HTMLElement
    ));
    const controls = Array.from(root.querySelectorAll('button[data-gallery-media-id]'));
    const viewport = root.querySelector('[data-gallery-viewport]');
    const status = root.querySelector('[data-gallery-status]');
    const lightbox = root.querySelector('[data-gallery-lightbox]');
    if (panels.length === 0 || !(viewport instanceof HTMLElement)) return;

    let pointer = null;
    let lightboxTrigger = null;
    let zoom = 1;
    let panX = 0;
    let panY = 0;

    function currentId() {
      return root.dataset.galleryCurrentId
        || panels.find((panel) => !panel.hidden)?.dataset.galleryMediaId
        || panels[0].dataset.galleryMediaId;
    }

    function release(panel) {
      if (!(panel instanceof HTMLElement)) return;
      panel.querySelectorAll('video, audio').forEach((media) => media.pause());
      panel.querySelectorAll('[data-gallery-generated]').forEach((generated) => generated.remove());
      panel.querySelectorAll('[data-gallery-poster]').forEach((poster) => { poster.hidden = false; });
      panel.querySelectorAll('[data-gallery-active-slot]').forEach((slot) => { slot.hidden = true; });
    }

    function updateBounds() {
      const index = panels.findIndex((panel) => panel.dataset.galleryMediaId === currentId());
      const loop = root.dataset.loop === 'true';
      root.querySelectorAll('[data-gallery-action="previous"]').forEach((control) => {
        if (control instanceof HTMLButtonElement) control.disabled = !loop && index <= 0;
      });
      root.querySelectorAll('[data-gallery-action="next"]').forEach((control) => {
        if (control instanceof HTMLButtonElement) control.disabled = !loop && index >= panels.length - 1;
      });
    }

    function select(id, announce = true) {
      const next = panels.find((panel) => panel.dataset.galleryMediaId === String(id));
      if (!next) return;
      const previous = panels.find((panel) => panel.dataset.galleryMediaId === currentId());
      if (previous && previous !== next) release(previous);
      panels.forEach((panel) => { panel.hidden = panel !== next; });
      controls.forEach((control) => {
        if (control.dataset.galleryMediaId === String(id)) control.setAttribute('aria-current', 'true');
        else control.removeAttribute('aria-current');
      });
      root.dataset.galleryCurrentId = String(id);
      updateBounds();
      if (announce && status) {
        const index = panels.indexOf(next);
        status.textContent = `${index + 1} of ${panels.length}: ${next.dataset.galleryLabel || ''}`;
      }
      root.dispatchEvent(new CustomEvent('tg:product-gallery-change', {
        bubbles: true,
        detail: { currentId: String(id) },
      }));
    }

    function move(direction) {
      const index = panels.findIndex((panel) => panel.dataset.galleryMediaId === currentId());
      let next = index + direction;
      if (root.dataset.loop === 'true') next = (next + panels.length) % panels.length;
      else next = Math.min(Math.max(next, 0), panels.length - 1);
      if (next !== index) select(panels[next].dataset.galleryMediaId);
    }

    function activate(panel) {
      const template = panel?.querySelector('template[data-gallery-template]');
      const slot = panel?.querySelector('[data-gallery-active-slot]');
      const poster = panel?.querySelector('[data-gallery-poster]');
      if (!(template instanceof HTMLTemplateElement) || !(slot instanceof HTMLElement)) return;
      slot.replaceChildren(template.content.cloneNode(true));
      slot.querySelectorAll('*').forEach((element) => element.setAttribute('data-gallery-generated', ''));
      slot.hidden = false;
      if (poster instanceof HTMLElement) poster.hidden = true;
      const video = slot.querySelector('video');
      if (video instanceof HTMLVideoElement) video.play().catch(() => {});
    }

    function lightboxImages() {
      return panels.filter((panel) => panel.dataset.galleryMediaType === 'image');
    }

    function syncLightbox(id) {
      if (!(lightbox instanceof HTMLElement)) return;
      const sourcePanel = panels.find((panel) => panel.dataset.galleryMediaId === String(id));
      const source = sourcePanel?.querySelector('img[data-gallery-detail-source], .product-gallery__media--image img');
      const target = lightbox.querySelector('[data-gallery-lightbox-image], .lightbox__image');
      if (!(source instanceof HTMLImageElement) || !(target instanceof HTMLImageElement)) return;
      target.src = source.currentSrc || source.src;
      target.srcset = source.srcset;
      target.sizes = source.sizes;
      target.alt = source.alt;
      lightbox.dataset.galleryLightboxCurrentId = String(id);
      const images = lightboxImages();
      const index = images.indexOf(sourcePanel);
      const counter = lightbox.querySelector('[data-gallery-lightbox-counter]');
      const caption = lightbox.querySelector('[data-gallery-lightbox-caption]');
      const lightboxStatus = lightbox.querySelector('[data-gallery-lightbox-status]');
      const text = sourcePanel?.dataset.galleryCaption || sourcePanel?.dataset.galleryLabel || source.alt;
      if (counter) counter.textContent = `${index + 1} / ${images.length}`;
      if (caption) caption.textContent = text;
      if (lightboxStatus) lightboxStatus.textContent = `${index + 1} of ${images.length}: ${text}`;
      const loop = root.dataset.loop === 'true';
      lightbox.querySelectorAll('[data-gallery-lightbox-action="previous"]').forEach((control) => {
        if (control instanceof HTMLButtonElement) control.disabled = !loop && index <= 0;
      });
      lightbox.querySelectorAll('[data-gallery-lightbox-action="next"]').forEach((control) => {
        if (control instanceof HTMLButtonElement) control.disabled = !loop && index >= images.length - 1;
      });
      select(id, false);
      setZoom(1);
    }

    function moveLightbox(direction) {
      if (!(lightbox instanceof HTMLElement)) return;
      const images = lightboxImages();
      const id = lightbox.dataset.galleryLightboxCurrentId;
      const index = images.findIndex((panel) => panel.dataset.galleryMediaId === id);
      let next = index + direction;
      if (root.dataset.loop === 'true') next = (next + images.length) % images.length;
      else next = Math.min(Math.max(next, 0), images.length - 1);
      if (next !== index) syncLightbox(images[next].dataset.galleryMediaId);
    }

    function setZoom(next) {
      if (!(lightbox instanceof HTMLElement)) return;
      zoom = Math.min(Math.max(next, 1), 3);
      if (zoom === 1) { panX = 0; panY = 0; }
      const image = lightbox.querySelector('[data-gallery-lightbox-image], .lightbox__image');
      if (image instanceof HTMLElement) {
        image.style.setProperty('--_lightbox-image-transform', `translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`);
      }
      const viewportElement = lightbox.querySelector('.lightbox__viewport');
      if (viewportElement instanceof HTMLElement) viewportElement.toggleAttribute('data-zoomed', zoom > 1);
      lightbox.querySelectorAll('[data-gallery-zoom="out"], [data-gallery-zoom="reset"]').forEach((control) => {
        if (control instanceof HTMLButtonElement) control.disabled = zoom === 1;
      });
      lightbox.querySelectorAll('[data-gallery-zoom="in"]').forEach((control) => {
        if (control instanceof HTMLButtonElement) control.disabled = zoom === 3;
      });
    }

    function openLightbox(trigger) {
      if (!(lightbox instanceof HTMLElement)) return;
      const panel = trigger.closest('[data-gallery-media-id]');
      if (!(panel instanceof HTMLElement)) return;
      lightboxTrigger = trigger;
      syncLightbox(panel.dataset.galleryMediaId);
      lightbox.hidden = false;
      lightbox.setAttribute('aria-hidden', 'false');
      lightbox.querySelector('[data-gallery-lightbox-close]')?.focus();
    }

    function closeLightbox() {
      if (!(lightbox instanceof HTMLElement)) return;
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.hidden = true;
      setZoom(1);
      if (lightboxTrigger instanceof HTMLElement && lightboxTrigger.isConnected) lightboxTrigger.focus();
      lightboxTrigger = null;
    }

    root.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const control = target?.closest('button[data-gallery-media-id]');
      if (control instanceof HTMLButtonElement && root.contains(control)) {
        select(control.dataset.galleryMediaId);
        return;
      }
      const action = target?.closest('[data-gallery-action]');
      if (action instanceof HTMLButtonElement) {
        move(action.dataset.galleryAction === 'previous' ? -1 : 1);
        return;
      }
      const activation = target?.closest('[data-gallery-activate]');
      if (activation instanceof HTMLButtonElement) {
        activate(activation.closest('[data-gallery-media-id]'));
        return;
      }
      const detail = target?.closest('[data-gallery-open-detail]');
      if (detail instanceof HTMLButtonElement) {
        openLightbox(detail);
        return;
      }
      const lightboxAction = target?.closest('[data-gallery-lightbox-action]');
      if (lightboxAction instanceof HTMLButtonElement) {
        moveLightbox(lightboxAction.dataset.galleryLightboxAction === 'previous' ? -1 : 1);
        return;
      }
      const zoomAction = target?.closest('[data-gallery-zoom]');
      if (zoomAction instanceof HTMLButtonElement) {
        if (zoomAction.dataset.galleryZoom === 'in') setZoom(zoom + 0.5);
        else if (zoomAction.dataset.galleryZoom === 'out') setZoom(zoom - 0.5);
        else setZoom(1);
        return;
      }
      if (target?.closest('[data-gallery-lightbox-close]')) closeLightbox();
    });

    root.addEventListener('keydown', (event) => {
      if (!(lightbox instanceof HTMLElement) || lightbox.hidden) return;
      if (event.key === 'Escape') { event.preventDefault(); closeLightbox(); return; }
      const rtl = getComputedStyle(root).direction === 'rtl';
      if (event.key === 'ArrowLeft') { event.preventDefault(); moveLightbox(rtl ? 1 : -1); return; }
      if (event.key === 'ArrowRight') { event.preventDefault(); moveLightbox(rtl ? -1 : 1); return; }
      if (event.key === '+' || event.key === '=') { event.preventDefault(); setZoom(zoom + 0.5); return; }
      if (event.key === '-') { event.preventDefault(); setZoom(zoom - 0.5); return; }
      if (event.key === '0') { event.preventDefault(); setZoom(1); return; }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(lightbox.querySelectorAll('button:not(:disabled), [href], [tabindex]:not([tabindex="-1"])'));
      const index = focusable.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) { event.preventDefault(); focusable[focusable.length - 1]?.focus(); }
      else if (!event.shiftKey && index === focusable.length - 1) { event.preventDefault(); focusable[0]?.focus(); }
    });

    root.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 || !(event.target instanceof Element)
          || event.target.closest('button, video, iframe, model-viewer')) return;
      const inLightbox = event.target.closest('[data-gallery-lightbox]');
      const inViewport = event.target.closest('[data-gallery-viewport]');
      if (!inLightbox && !inViewport) return;
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, panX, panY, lightbox: Boolean(inLightbox) };
      root.setPointerCapture(event.pointerId);
    });
    root.addEventListener('pointermove', (event) => {
      if (!pointer || pointer.id !== event.pointerId || !pointer.lightbox || zoom === 1) return;
      const bound = (zoom - 1) * 240;
      panX = Math.min(Math.max(pointer.panX + event.clientX - pointer.x, -bound), bound);
      panY = Math.min(Math.max(pointer.panY + event.clientY - pointer.y, -bound), bound);
      setZoom(zoom);
    });
    root.addEventListener('pointerup', (event) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const start = pointer;
      pointer = null;
      if (root.hasPointerCapture(event.pointerId)) root.releasePointerCapture(event.pointerId);
      if (start.lightbox && zoom !== 1) return;
      const deltaX = event.clientX - start.x;
      const deltaY = event.clientY - start.y;
      if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      const rtl = getComputedStyle(root).direction === 'rtl';
      const direction = (deltaX < 0) !== rtl ? 1 : -1;
      if (start.lightbox) moveLightbox(direction);
      else move(direction);
    });
    root.addEventListener('pointercancel', () => { pointer = null; });
    root.addEventListener('tg:product-gallery-select', (event) => {
      if (event instanceof CustomEvent) select(event.detail?.currentId);
    });

    const initial = currentId();
    select(initial, false);
    if (lightbox instanceof HTMLElement) lightbox.hidden = true;

    root.dataset.productGalleryEnhanced = 'true';
  }

  function enhanceProductGalleries(scope = document) {
    enhanceMatches(scope, '[data-product-gallery]', enhanceProductGallery);
  }

  /* ---- Filter Panel adaptive Drawer ---- */
  const filterPanelObservers = new Map();

  function enhanceFilterPanel(root) {
    if (!(root instanceof HTMLElement)
        || root.dataset.filterPanelEnhanced === 'true'
        || typeof ResizeObserver === 'undefined') return;

    const trigger = root.querySelector('[data-filter-panel-trigger]');
    const overlay = root.querySelector('[data-filter-panel-overlay]');
    const surface = root.querySelector('[data-filter-panel-surface]');
    const close = root.querySelector('[data-filter-panel-close]');
    const cancel = root.querySelector('[data-filter-panel-cancel]');
    const form = root.querySelector('.filter-panel__form');
    const results = root.querySelector('.filter-panel__results');
    if (!(trigger instanceof HTMLButtonElement)
        || !(overlay instanceof HTMLElement)
        || !(surface instanceof HTMLElement)
        || !(close instanceof HTMLButtonElement)
        || !(form instanceof HTMLFormElement)) return;

    let panelMode = true;
    let open = false;
    let priorOverflow = '';

    function focusable() {
      return Array.from(surface.querySelectorAll(
        'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      )).filter((element) => element instanceof HTMLElement && !element.hidden);
    }

    function emit(name, detail) {
      root.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }));
    }

    function setOpen(nextOpen, { restore = true } = {}) {
      if (panelMode) nextOpen = false;
      if (open === nextOpen && (panelMode || surface.hidden === !nextOpen)) return;
      open = nextOpen;
      trigger.setAttribute('aria-expanded', String(open));
      overlay.classList.toggle('is-open', open);
      surface.classList.toggle('is-open', open);
      overlay.hidden = !open;
      surface.hidden = !panelMode && !open;
      overlay.setAttribute('aria-hidden', String(!open));
      if (open) {
        priorOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        if (results instanceof HTMLElement) results.inert = true;
        window.requestAnimationFrame(() => close.focus());
      } else {
        document.documentElement.style.overflow = priorOverflow;
        if (results instanceof HTMLElement) results.inert = false;
        if (restore && !panelMode) trigger.focus();
      }
      emit('tg:filter-panel-open-change', { open, surface: panelMode ? 'panel' : 'drawer' });
    }

    function setSurface(nextPanelMode) {
      if (panelMode === nextPanelMode && root.dataset.surface) return;
      if (open) setOpen(false, { restore: false });
      panelMode = nextPanelMode;
      root.dataset.surface = panelMode ? 'panel' : 'drawer';
      trigger.hidden = panelMode;
      close.hidden = panelMode;
      overlay.hidden = true;
      surface.hidden = false;
      trigger.setAttribute('aria-expanded', 'false');
      if (panelMode) {
        surface.removeAttribute('role');
        surface.removeAttribute('aria-modal');
      } else {
        surface.setAttribute('role', 'dialog');
        surface.setAttribute('aria-modal', 'true');
        surface.hidden = true;
      }
      emit('tg:filter-panel-surface-change', { surface: panelMode ? 'panel' : 'drawer' });
    }

    trigger.addEventListener('click', () => setOpen(true));
    close.addEventListener('click', () => setOpen(false));
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) setOpen(false);
    });
    surface.addEventListener('keydown', (event) => {
      if (!open) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (items.length === 0) {
        event.preventDefault();
        surface.focus();
        return;
      }
      const index = items.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) {
        event.preventDefault();
        items[items.length - 1].focus();
      } else if (!event.shiftKey && index === items.length - 1) {
        event.preventDefault();
        items[0].focus();
      }
    });
    form.addEventListener('change', () => {
      if (root.dataset.commitMode === 'immediate') {
        emit('tg:filter-panel-change-request', { formData: new FormData(form) });
        if (root.hasAttribute('data-native-immediate-submit')) form.requestSubmit();
      }
    });
    form.addEventListener('submit', () => {
      emit('tg:filter-panel-commit-request', { formData: new FormData(form) });
    });
    if (cancel instanceof HTMLButtonElement) {
      cancel.addEventListener('click', () => {
        form.reset();
        emit('tg:filter-panel-cancel-request', {});
        if (!panelMode) setOpen(false);
      });
    }

    const observer = new ResizeObserver((entries) => {
      const width = entries[entries.length - 1]?.contentRect.width ?? root.getBoundingClientRect().width;
      setSurface(width >= 640);
    });
    observer.observe(root);
    filterPanelObservers.set(root, {
      observer,
      cleanup: () => {
        if (open) setOpen(false, { restore: false });
        observer.disconnect();
      },
    });
    root.dataset.filterPanelEnhanced = 'true';
  }

  function enhanceFilterPanels(scope = document) {
    enhanceMatches(scope, '[data-filter-panel]', enhanceFilterPanel);
  }

  function cleanupFilterPanels() {
    filterPanelObservers.forEach((entry, root) => {
      if (root.isConnected) return;
      entry.cleanup();
      filterPanelObservers.delete(root);
    });
  }

  function destroyFilterPanels(scope = document) {
    const roots = [];
    if (scope instanceof Element && scope.matches('[data-filter-panel]')) roots.push(scope);
    scope.querySelectorAll?.('[data-filter-panel]').forEach((root) => roots.push(root));
    roots.forEach((root) => {
      const entry = filterPanelObservers.get(root);
      if (!entry) return;
      entry.cleanup();
      filterPanelObservers.delete(root);
      delete root.dataset.filterPanelEnhanced;
    });
  }

  const gallery = window.TheGallery || {};
  gallery.enhanceSelects = enhanceSelects;
  gallery.enhanceTextareas = enhanceTextareas;
  gallery.enhanceCheckboxes = enhanceCheckboxes;
  gallery.enhanceQuantities = enhanceQuantities;
  gallery.enhanceNumberInputs = enhanceQuantities;
  gallery.enhanceSliders = enhanceSliders;
  gallery.enhanceComboboxes = enhanceComboboxes;
  gallery.enhanceDatepickers = enhanceDatepickers;
  gallery.enhanceToggleGroups = enhanceToggleGroups;
  gallery.enhancePinInputs = enhancePinInputs;
  gallery.enhanceCountdowns = enhanceCountdowns;
  gallery.refreshCountdowns = refreshCountdowns;
  gallery.enhanceMarquees = enhanceMarquees;
  gallery.enhanceHeroes = enhanceHeroes;
  gallery.enhanceAnnouncements = enhanceAnnouncements;
  gallery.enhanceReadingProgress = enhanceReadingProgress;
  gallery.enhanceFileUploads = enhanceFileUploads;
  gallery.enhanceProductGalleries = enhanceProductGalleries;
  gallery.enhanceFilterPanels = enhanceFilterPanels;
  gallery.destroyFilterPanels = destroyFilterPanels;
  window.TheGallery = gallery;

  enhanceSelects(document);
  enhanceTextareas(document);
  enhanceCheckboxes(document);
  enhanceQuantities(document);
  enhanceSliders(document);
  enhanceComboboxes(document);
  enhanceDatepickers(document);
  enhanceToggleGroups(document);
  enhancePinInputs(document);
  enhanceCountdowns(document);
  enhanceMarquees(document);
  enhanceHeroes(document);
  enhanceAnnouncements(document);
  enhanceReadingProgress(document);
  enhanceFileUploads(document);
  enhanceProductGalleries(document);
  enhanceFilterPanels(document);
  new MutationObserver((records) => {
    records.forEach((record) => {
      if (record.type === 'attributes') {
        applyTextareaLineBounds(record.target);
        syncCheckbox(record.target);
        if (record.target instanceof HTMLElement && record.target.matches('[data-countdown]')) {
          enhanceCountdown(record.target);
        } else if (record.target instanceof HTMLElement && record.target.matches('[data-marquee]')) {
          enhanceMarquee(record.target);
        } else if (record.target instanceof HTMLElement && record.target.matches('[data-reading-progress]')) {
          configureReadingProgress(record.target);
        } else if (record.attributeName === 'lang') {
          refreshCountdowns();
        }
        return;
      }
      record.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          enhanceSelects(node);
          enhanceTextareas(node);
          enhanceCheckboxes(node);
          enhanceQuantities(node);
          enhanceSliders(node);
          enhanceComboboxes(node);
          enhanceDatepickers(node);
          enhanceToggleGroups(node);
          enhancePinInputs(node);
          enhanceCountdowns(node);
          enhanceMarquees(node);
          enhanceHeroes(node);
          enhanceAnnouncements(node);
          enhanceReadingProgress(node);
          enhanceFileUploads(node);
          enhanceProductGalleries(node);
          enhanceFilterPanels(node);
        }
      });
      if (record.removedNodes.length > 0) {
        scheduleCountdowns();
        cleanupMarquees();
        cleanupCarouselRotations();
        cleanupReadingProgress();
        cleanupFilterPanels();
      }
    });
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: [
      'data-min-lines',
      'data-max-lines',
      'data-indeterminate',
      'datetime',
      'data-countdown-units',
      'data-countdown-expired-announcement',
      'data-presentation',
      'data-direction',
      'data-pace',
      'data-reading-mode',
      'data-reading-value',
      'data-reading-target',
      'data-reading-scroll-root',
      'lang',
    ],
    childList: true,
    subtree: true,
  });

  let textareaResizeFrame = 0;
  window.addEventListener('resize', () => {
    window.cancelAnimationFrame(textareaResizeFrame);
    textareaResizeFrame = window.requestAnimationFrame(() => enhanceTextareas(document));
  }, { passive: true });
  document.fonts?.ready.then(() => enhanceTextareas(document));
  document.fonts?.ready.then(() => scheduleReadingProgress());

  /* ---- Dark Mode Toggle (V2 prep) ---- */
  window.toggleTheme = function () {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('tg-theme', next);
  };

})();
