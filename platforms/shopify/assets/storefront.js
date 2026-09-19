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

const trackingEyes = new Map();

function resetTrackingEyes(eyes, { animate = true } = {}) {
  const wasTracking = eyes.classList.contains('is-tracking');
  eyes.classList.remove('is-tracking');
  if (animate && wasTracking) eyes.classList.add('is-returning');
  if (!animate) eyes.classList.remove('is-returning');
  eyes.querySelectorAll('[data-brand-eye-pupil]').forEach((pupil) => {
    pupil.style.removeProperty('transform');
  });
}

function enhanceTrackingEyes(eyes) {
  if (!(eyes instanceof HTMLElement) || trackingEyes.has(eyes)) return;

  const gateway = eyes.closest('.landing-gateway');
  const navigation = gateway?.querySelector('.landing-gateway__navigation');
  const footerZone = document.querySelector('[data-brand-eyes-zone="footer"]');
  const primaryTarget = navigation instanceof HTMLElement ? navigation : footerZone;
  const pupils = [...eyes.querySelectorAll('[data-brand-eye-pupil]')];
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!(primaryTarget instanceof HTMLElement)
      || pupils.length === 0) return;

  let frame = 0;
  let pointer = null;
  let activationBounds = [];

  function measureActivationBounds() {
    const eyesRect = eyes.getBoundingClientRect();
    if (eyesRect.width === 0) {
      activationBounds = [];
      return;
    }

    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    const viewportInset = 16;
    const nextBounds = [];

    if (navigation instanceof HTMLElement) {
      const navigationRect = navigation.getBoundingClientRect();
      if (navigationRect.width > 0) {
        const horizontalPadding = Math.max(48, Math.min(160, viewportWidth * 0.08));
        const topPadding = Math.max(48, Math.min(72, viewportHeight * 0.065));
        const bottomPadding = Math.max(24, Math.min(48, viewportHeight * 0.035));
        nextBounds.push({
          left: Math.max(
            viewportInset,
            Math.min(eyesRect.left, navigationRect.left) - horizontalPadding
          ),
          right: Math.min(
            viewportWidth - viewportInset,
            Math.max(eyesRect.right, navigationRect.right) + horizontalPadding
          ),
          top: Math.max(0, Math.min(eyesRect.top, navigationRect.top) - topPadding),
          bottom: Math.min(
            viewportHeight,
            Math.max(eyesRect.bottom, navigationRect.bottom) + bottomPadding
          ),
          target: navigation
        });
      }
    } else {
      const eyeHorizontalPadding = Math.max(64, Math.min(160, viewportWidth * 0.08));
      const eyeVerticalPadding = Math.max(72, Math.min(96, viewportHeight * 0.08));
      nextBounds.push({
        left: Math.max(viewportInset, eyesRect.left - eyeHorizontalPadding),
        right: Math.min(viewportWidth - viewportInset, eyesRect.right + eyeHorizontalPadding),
        top: Math.max(0, eyesRect.top - eyeVerticalPadding),
        bottom: Math.min(viewportHeight, eyesRect.bottom + eyeVerticalPadding),
        target: eyes
      });
    }

    if (footerZone instanceof HTMLElement) {
      const footerRect = footerZone.getBoundingClientRect();
      const footerIsVisible = footerRect.width > 0
        && footerRect.height > 0
        && footerRect.bottom > 0
        && footerRect.top < viewportHeight;
      if (footerIsVisible) {
        const footerHorizontalPadding = Math.max(64, Math.min(160, viewportWidth * 0.08));
        const footerVerticalPadding = Math.max(96, Math.min(128, viewportHeight * 0.1));
        nextBounds.push({
          left: Math.max(viewportInset, footerRect.left - footerHorizontalPadding),
          right: Math.min(viewportWidth - viewportInset, footerRect.right + footerHorizontalPadding),
          top: Math.max(0, footerRect.top - footerVerticalPadding),
          bottom: Math.min(viewportHeight, footerRect.bottom + footerVerticalPadding),
          target: footerZone
        });
      }
    }

    activationBounds = nextBounds;
  }

  function render() {
    frame = 0;
    if (!pointer || activationBounds.length === 0 || !finePointer.matches || reducedMotion.matches) {
      resetTrackingEyes(eyes, {
        animate: finePointer.matches && !reducedMotion.matches
      });
      return;
    }

    const activeBounds = activationBounds.find((bounds) => (
      pointer.x >= bounds.left
      && pointer.x <= bounds.right
      && pointer.y >= bounds.top
      && pointer.y <= bounds.bottom
    ));
    if (!activeBounds) {
      resetTrackingEyes(eyes);
      return;
    }

    eyes.classList.remove('is-returning');
    eyes.classList.add('is-tracking');
    const eyesRect = eyes.getBoundingClientRect();
    const eyesCenterX = eyesRect.left + eyesRect.width / 2;
    const eyesCenterY = eyesRect.top + eyesRect.height / 2;
    const deltaX = pointer.x - eyesCenterX;
    const deltaY = pointer.y - eyesCenterY;
    const distance = Math.hypot(deltaX, deltaY);
    const directionX = distance > 0 ? deltaX / distance : 0;
    const horizontalProgress = (directionX + 1) / 2;
    const sharedOffsetX = horizontalProgress * 15;
    const targetRect = activeBounds.target.getBoundingClientRect();
    const verticalReference = deltaY < 0
      ? Math.max(1, eyesCenterY - activeBounds.top)
      : Math.max(
          1,
          activeBounds.target === eyes
            ? activeBounds.bottom - eyesCenterY
            : targetRect.top - eyesCenterY
        );
    const verticalProgress = Math.max(-1, Math.min(1, deltaY / verticalReference));
    const verticalTravel = verticalProgress < 0 ? 3.5 : 8;
    const convergenceRadius = eyesRect.width * 0.75;
    const radialConvergence = Math.max(0, Math.min(1, 1 - distance / convergenceRadius));
    const horizontalConvergence = Math.max(
      0,
      Math.min(1, 1 - Math.abs(deltaX) / convergenceRadius)
    );
    const lowerDistance = Math.max(0, deltaY);
    const verticalDecay = 1 - Math.min(1, lowerDistance / (verticalReference * 1.5)) * 0.45;
    const corridorConvergence = horizontalConvergence * verticalDecay * 0.75;
    const convergence = Math.max(radialConvergence, corridorConvergence);

    const eyeVectors = pupils.map((pupil) => {
      const eye = pupil.closest('.brand-eye');
      if (!(eye instanceof SVGElement)) return null;
      const eyeRect = eye.getBoundingClientRect();
      const localDeltaX = pointer.x - (eyeRect.left + eyeRect.width / 2);
      const localDeltaY = pointer.y - (eyeRect.top + eyeRect.height / 2);
      const localDistance = Math.hypot(localDeltaX, localDeltaY);
      return { pupil, localDeltaX, localDeltaY, localDistance };
    }).filter(Boolean);
    if (eyeVectors.length === 0) return;

    const angularVerticalDirection = eyeVectors.reduce((sum, vector) => (
      sum + (vector.localDistance > 0 ? vector.localDeltaY / vector.localDistance : 0)
    ), 0) / eyeVectors.length;
    const distanceOffsetY = verticalProgress * verticalTravel;
    const angularOffsetY = angularVerticalDirection * verticalTravel;
    const sharedOffsetY = verticalProgress < 0
      ? Math.min(distanceOffsetY, angularOffsetY)
      : Math.max(distanceOffsetY, angularOffsetY);

    eyeVectors.forEach(({ pupil, localDeltaX, localDistance }) => {
      const localDirectionX = localDistance > 0 ? localDeltaX / localDistance : 0;
      const localOffsetX = ((localDirectionX + 1) / 2) * 15;
      const offsetX = sharedOffsetX + (localOffsetX - sharedOffsetX) * convergence;
      pupil.style.transform = `translate(${offsetX.toFixed(2)}px, ${sharedOffsetY.toFixed(2)}px)`;
    });
  }

  function scheduleRender() {
    if (!frame) frame = window.requestAnimationFrame(render);
  }

  function handlePointerMove(event) {
    pointer = { x: event.clientX, y: event.clientY };
    scheduleRender();
  }

  function handleScroll() {
    measureActivationBounds();
    scheduleRender();
  }

  function handlePointerLeave() {
    pointer = null;
    scheduleRender();
  }

  function handlePreferenceChange() {
    measureActivationBounds();
    scheduleRender();
  }

  const resizeObserver = typeof ResizeObserver === 'undefined'
    ? null
    : new ResizeObserver(measureActivationBounds);
  resizeObserver?.observe(eyes);
  if (navigation instanceof HTMLElement) resizeObserver?.observe(navigation);
  if (footerZone instanceof HTMLElement) resizeObserver?.observe(footerZone);
  measureActivationBounds();

  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', measureActivationBounds, { passive: true });
  window.addEventListener('blur', handlePointerLeave);
  document.documentElement.addEventListener('pointerleave', handlePointerLeave);
  finePointer.addEventListener('change', handlePreferenceChange);
  reducedMotion.addEventListener('change', handlePreferenceChange);

  trackingEyes.set(eyes, {
    destroy() {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measureActivationBounds);
      window.removeEventListener('blur', handlePointerLeave);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      finePointer.removeEventListener('change', handlePreferenceChange);
      reducedMotion.removeEventListener('change', handlePreferenceChange);
      resetTrackingEyes(eyes, { animate: false });
    }
  });
}

function enhanceTrackingEyesWithin(scope = document) {
  if (scope instanceof Element && scope.matches('[data-brand-eyes-track]')) {
    enhanceTrackingEyes(scope);
  }
  scope.querySelectorAll?.('[data-brand-eyes-track]').forEach(enhanceTrackingEyes);
}

function destroyTrackingEyesWithin(scope) {
  trackingEyes.forEach((entry, eyes) => {
    if (scope === eyes || scope.contains?.(eyes)) {
      entry.destroy();
      trackingEyes.delete(eyes);
    }
  });
}

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
  destroyTrackingEyesWithin(event.target);
  if (state.panel && (event.target.contains(state.panel) || !state.panel.isConnected)) {
    closeOverlay({ restoreFocus: false });
  }
});

document.addEventListener('shopify:section:load', (event) => {
  enhanceTrackingEyesWithin(event.target);
});

enhanceTrackingEyesWithin(document);
