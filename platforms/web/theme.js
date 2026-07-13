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

  /* ---- Cart Drawer ---- */
  const cartToggle = document.querySelector('[data-cart-toggle]');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartOverlay = document.querySelector('.cart-drawer__overlay');
  const cartClose = document.querySelector('[data-cart-close]');

  function openCart() {
    cartDrawer?.classList.add('is-open');
    cartOverlay?.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer?.classList.remove('is-open');
    cartOverlay?.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  if (cartToggle) {
    cartToggle.addEventListener('click', openCart);
  }

  if (cartClose) {
    cartClose.addEventListener('click', closeCart);
  }

  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartDrawer?.classList.contains('is-open')) {
      closeCart();
    }
  });

  /* ---- Select ---- */
  let selectId = 0;

  function nextSelectId(prefix) {
    selectId += 1;
    return `${prefix}-${selectId}`;
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
        'selected',
        'value'
      ]
    });

    buildOptions();
  }

  function enhanceSelects(scope = document) {
    const roots = [];
    if (scope instanceof Element && scope.matches('.select')) roots.push(scope);
    scope.querySelectorAll?.('.select').forEach((root) => roots.push(root));
    roots.forEach(enhanceSelect);
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
    const fields = [];
    if (scope instanceof Element && scope.matches('.textarea__field')) fields.push(scope);
    scope.querySelectorAll?.('.textarea__field').forEach((field) => fields.push(field));
    fields.forEach(applyTextareaLineBounds);
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
    const inputs = [];
    if (scope instanceof Element && scope.matches('.checkbox__input')) inputs.push(scope);
    scope.querySelectorAll?.('.checkbox__input').forEach((input) => inputs.push(input));
    inputs.forEach(enhanceCheckbox);
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
    if (!(root instanceof HTMLElement) || !root.classList.contains('qty')) return;

    const field = root.querySelector('[data-qty-input], .qty__input');
    const minus = root.querySelector('[data-qty-minus]');
    const plus = root.querySelector('[data-qty-plus]');
    if (!(field instanceof HTMLInputElement)
        || !(minus instanceof HTMLButtonElement)
        || !(plus instanceof HTMLButtonElement)) return;

    function sync() {
      const value = quantityValue(field);
      const min = quantityConstraint(field, 'min');
      const max = quantityConstraint(field, 'max');
      const unavailable = field.disabled;

      minus.disabled = unavailable || (value !== null && min !== null && value <= min);
      plus.disabled = unavailable || (value !== null && max !== null && value >= max);
    }

    function update(direction) {
      if (field.disabled) return;

      const min = quantityConstraint(field, 'min');
      const max = quantityConstraint(field, 'max');
      const step = quantityStep(field);
      const current = quantityValue(field);
      const fallback = direction > 0
        ? (min ?? 0) - step
        : (max ?? min ?? 0) + step;
      const next = clampQuantity((current ?? fallback) + direction * step, min, max);

      field.value = String(next);
      field.dispatchEvent(new Event('input', { bubbles: true }));
      field.dispatchEvent(new Event('change', { bubbles: true }));
      sync();
    }

    sync();
    if (root.dataset.qtyEnhanced === 'true') return;
    root.dataset.qtyEnhanced = 'true';

    minus.addEventListener('click', () => update(-1));
    plus.addEventListener('click', () => update(1));
    field.addEventListener('input', sync);
    field.addEventListener('change', sync);
    field.form?.addEventListener('reset', () => window.setTimeout(sync));

    new MutationObserver(sync).observe(field, {
      attributes: true,
      attributeFilter: ['disabled', 'max', 'min', 'step', 'value'],
    });
  }

  function enhanceQuantities(scope = document) {
    const roots = [];
    if (scope instanceof Element && scope.matches('.qty')) roots.push(scope);
    scope.querySelectorAll?.('.qty').forEach((root) => roots.push(root));
    roots.forEach(enhanceQuantity);
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
    const roots = [];
    if (scope instanceof Element && scope.matches('.toggle-group')) roots.push(scope);
    scope.querySelectorAll?.('.toggle-group').forEach((root) => roots.push(root));
    roots.forEach(enhanceToggleGroup);
  }

  const gallery = window.TheGallery || {};
  gallery.enhanceSelects = enhanceSelects;
  gallery.enhanceTextareas = enhanceTextareas;
  gallery.enhanceCheckboxes = enhanceCheckboxes;
  gallery.enhanceQuantities = enhanceQuantities;
  gallery.enhanceToggleGroups = enhanceToggleGroups;
  window.TheGallery = gallery;

  enhanceSelects(document);
  enhanceTextareas(document);
  enhanceCheckboxes(document);
  enhanceQuantities(document);
  enhanceToggleGroups(document);
  new MutationObserver((records) => {
    records.forEach((record) => {
      if (record.type === 'attributes') {
        applyTextareaLineBounds(record.target);
        syncCheckbox(record.target);
        return;
      }
      record.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          enhanceSelects(node);
          enhanceTextareas(node);
          enhanceCheckboxes(node);
          enhanceQuantities(node);
          enhanceToggleGroups(node);
        }
      });
    });
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-min-lines', 'data-max-lines', 'data-indeterminate'],
    childList: true,
    subtree: true,
  });

  let textareaResizeFrame = 0;
  window.addEventListener('resize', () => {
    window.cancelAnimationFrame(textareaResizeFrame);
    textareaResizeFrame = window.requestAnimationFrame(() => enhanceTextareas(document));
  }, { passive: true });
  document.fonts?.ready.then(() => enhanceTextareas(document));

  /* ---- Dark Mode Toggle (V2 prep) ---- */
  window.toggleTheme = function () {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('tg-theme', next);
  };

})();
