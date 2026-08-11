/** Generated from components/js/theme.js: Slider / range. */
import { enhanceMatches, expose, register } from './tg-runtime-core.js';

/* ---- Slider / range ---- */
function sliderNumber(field, attribute, fallback) {
  const parsed = Number(field.getAttribute(attribute));
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

expose({ enhanceSliders });
register({ id: 'slider', enhance: enhanceSliders });
