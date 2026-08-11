/** Generated from components/js/theme.js: Toggle group. */
import { enhanceMatches, expose, register } from './tg-runtime-core.js';

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

expose({ enhanceToggleGroups });
register({ id: 'toggle-group', enhance: enhanceToggleGroups });
