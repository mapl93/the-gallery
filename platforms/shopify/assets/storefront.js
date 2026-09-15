const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

const state = {
  name: null,
  panel: null,
  scrim: null,
  trigger: null,
  inertElements: []
};

function visibleFocusableElements(panel) {
  return [...panel.querySelectorAll(FOCUSABLE_SELECTOR)].filter((element) => {
    return !element.hidden && element.getClientRects().length > 0;
  });
}

function setExpanded(name, expanded) {
  document.querySelectorAll(`[data-storefront-open="${name}"]`).forEach((trigger) => {
    trigger.setAttribute('aria-expanded', String(expanded));
  });
}

function markInertOutside(panel, scrim) {
  const keep = [panel, scrim].filter(Boolean);
  const madeInert = [];

  function visit(element) {
    if (keep.some((node) => node === element)) return;
    if (!keep.some((node) => element.contains(node))) {
      if (!element.inert) {
        element.inert = true;
        madeInert.push(element);
      }
      return;
    }
    [...element.children].forEach(visit);
  }

  [...document.body.children].forEach(visit);
  return madeInert;
}

function restoreInert() {
  state.inertElements.forEach((element) => {
    element.inert = false;
  });
  state.inertElements = [];
}

function closeOverlay({ restoreFocus = true } = {}) {
  if (!state.panel) return;

  const panel = state.panel;
  const scrim = state.scrim;
  const trigger = state.trigger;
  const name = state.name;

  panel.classList.remove('is-open');
  panel.setAttribute('aria-hidden', 'true');
  panel.inert = true;
  if (scrim) {
    scrim.classList.remove('is-open');
    scrim.setAttribute('aria-hidden', 'true');
  }

  document.body.classList.remove('storefront-overlay-open');
  setExpanded(name, false);
  restoreInert();

  state.name = null;
  state.panel = null;
  state.scrim = null;
  state.trigger = null;

  const hideClosedSurfaces = () => {
    if (!panel.classList.contains('is-open')) panel.hidden = true;
    if (scrim && !scrim.classList.contains('is-open')) scrim.hidden = true;
  };
  const exitAnimations = [panel, scrim]
    .filter(Boolean)
    .flatMap((element) => element.getAnimations());

  if (exitAnimations.length > 0) {
    Promise.allSettled(exitAnimations.map((animation) => animation.finished)).then(hideClosedSurfaces);
  } else {
    hideClosedSurfaces();
  }

  if (restoreFocus && trigger?.isConnected) trigger.focus();
}

function openOverlay(name, trigger) {
  const panel = document.querySelector(`[data-storefront-panel="${name}"]`);
  const scrim = document.querySelector(`[data-storefront-scrim="${name}"]`);
  if (!panel) return false;

  if (state.panel) closeOverlay({ restoreFocus: false });

  panel.hidden = false;
  panel.inert = false;
  panel.setAttribute('aria-hidden', 'false');
  if (scrim) {
    scrim.hidden = false;
    scrim.setAttribute('aria-hidden', 'false');
  }

  state.name = name;
  state.panel = panel;
  state.scrim = scrim;
  state.trigger = trigger;
  state.inertElements = markInertOutside(panel, scrim);

  document.body.classList.add('storefront-overlay-open');
  setExpanded(name, true);

  window.requestAnimationFrame(() => {
    panel.classList.add('is-open');
    scrim?.classList.add('is-open');
    const autofocus = panel.querySelector('[autofocus], [data-storefront-autofocus]');
    const firstFocusable = visibleFocusableElements(panel)[0];
    (autofocus || firstFocusable || panel).focus();
  });

  return true;
}

document.addEventListener('click', (event) => {
  const opener = event.target.closest('[data-storefront-open]');
  if (opener) {
    const name = opener.getAttribute('data-storefront-open');
    if (openOverlay(name, opener)) event.preventDefault();
    return;
  }

  if (event.target.closest('[data-storefront-close]')) {
    closeOverlay();
    return;
  }

  if (state.scrim && event.target === state.scrim) {
    closeOverlay();
    return;
  }

  if (state.panel?.classList.contains('search-overlay') && event.target === state.panel) {
    closeOverlay();
  }
});

document.addEventListener('keydown', (event) => {
  if (!state.panel) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    closeOverlay();
    return;
  }

  if (event.key !== 'Tab') return;

  const focusable = visibleFocusableElements(state.panel);
  if (focusable.length === 0) {
    event.preventDefault();
    state.panel.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

document.addEventListener('shopify:section:unload', (event) => {
  if (state.panel && (event.target.contains(state.panel) || !state.panel.isConnected)) {
    closeOverlay({ restoreFocus: false });
  }
});
