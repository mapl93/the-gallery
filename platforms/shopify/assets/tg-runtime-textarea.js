/** Generated from components/js/theme.js: Textarea line bounds. */
import { enhanceMatches, expose, register } from './tg-runtime-core.js';

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

expose({ enhanceTextareas });
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
});
