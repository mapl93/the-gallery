/** Generated from components/js/theme.js: Pin input. */
import { enhanceMatches, expose, register } from './core.js';

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

expose({ enhancePinInputs });
register({ id: 'pin-input', enhance: enhancePinInputs });
