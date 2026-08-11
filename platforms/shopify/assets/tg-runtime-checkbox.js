/** Generated from components/js/theme.js: Checkbox indeterminate state. */
import { enhanceMatches, expose, register } from './tg-runtime-core.js';

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

expose({ enhanceCheckboxes });
register({
  id: 'checkbox',
  enhance: enhanceCheckboxes,
  attributes: ['data-indeterminate'],
  onAttribute: (target) => syncCheckbox(target),
});
