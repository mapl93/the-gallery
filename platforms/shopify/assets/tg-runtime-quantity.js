/** Generated from components/js/theme.js: Quantity selector. */
import { enhanceMatches, expose, register } from './tg-runtime-core.js';

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

expose({ enhanceQuantities, enhanceNumberInputs: enhanceQuantities });
register({ id: 'quantity', enhance: enhanceQuantities });
