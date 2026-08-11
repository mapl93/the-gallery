/** Generated from components/js/theme.js: Filter Panel adaptive Drawer. */
import { enhanceMatches, expose, register } from './core.js';

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

expose({ enhanceFilterPanels, destroyFilterPanels });
register({ id: 'filter-panel', enhance: enhanceFilterPanels, cleanup: cleanupFilterPanels });
