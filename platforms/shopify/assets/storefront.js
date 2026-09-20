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
const workIndexes = new Map();
const internalHeaders = new Map();

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
  document.addEventListener('storefront:footer-snap', handleScroll);
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
      document.removeEventListener('storefront:footer-snap', handleScroll);
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

function enhanceInternalHeader(header) {
  if (!(header instanceof HTMLElement) || internalHeaders.has(header)) return;

  let frame = 0;
  let lastScrollY = Math.max(0, window.scrollY);
  let lastDirection = 0;
  let accumulatedDistance = 0;

  function setHidden(hidden) {
    const containsFocus = header.contains(document.activeElement);
    header.classList.toggle('is-scroll-hidden', hidden && !containsFocus && !state.panel);
  }

  function render() {
    frame = 0;
    const nextScrollY = Math.max(0, window.scrollY);
    const delta = nextScrollY - lastScrollY;
    lastScrollY = nextScrollY;

    if (nextScrollY <= headerRevealOffset() || state.panel) {
      lastDirection = 0;
      accumulatedDistance = 0;
      setHidden(false);
      return;
    }

    if (Math.abs(delta) < 2) return;
    const direction = Math.sign(delta);
    if (direction !== lastDirection) {
      lastDirection = direction;
      accumulatedDistance = 0;
    }
    accumulatedDistance += Math.abs(delta);

    if (direction > 0 && accumulatedDistance >= 24) {
      setHidden(true);
      accumulatedDistance = 0;
    } else if (direction < 0 && accumulatedDistance >= 12) {
      setHidden(false);
      accumulatedDistance = 0;
    }
  }

  function headerRevealOffset() {
    return Math.max(16, header.offsetHeight);
  }

  function handleScroll() {
    if (!frame) frame = window.requestAnimationFrame(render);
  }

  function handleFocusIn() {
    setHidden(false);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  header.addEventListener('focusin', handleFocusIn);
  render();

  internalHeaders.set(header, {
    destroy() {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      header.removeEventListener('focusin', handleFocusIn);
      header.classList.remove('is-scroll-hidden');
    }
  });
}

function enhanceInternalHeadersWithin(scope = document) {
  if (scope instanceof Element && scope.matches('[data-storefront-header]')) {
    enhanceInternalHeader(scope);
  }
  scope.querySelectorAll?.('[data-storefront-header]').forEach(enhanceInternalHeader);
}

function destroyInternalHeadersWithin(scope) {
  internalHeaders.forEach((entry, header) => {
    if (scope === header || scope.contains?.(header)) {
      entry.destroy();
      internalHeaders.delete(header);
    }
  });
}

function enhanceWorkIndex(root) {
  if (!(root instanceof HTMLElement) || workIndexes.has(root)) return;

  const form = root.querySelector('[data-work-controls]');
  const grid = root.querySelector('[data-work-grid]');
  const empty = root.querySelector('[data-work-empty]');
  const resultCount = root.querySelector('[data-work-result-count]');
  const selectors = [...root.querySelectorAll('[data-work-selector]')];
  const filters = [...root.querySelectorAll('[data-work-filter]')];
  const items = [...root.querySelectorAll('[data-work-item]')];
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!(grid instanceof HTMLElement) || items.length === 0) return;

  items.forEach((item, index) => {
    item.dataset.workOriginalIndex = String(index);
  });

  function originalIndex(item) {
    return Number(item.dataset.workOriginalIndex ?? 0);
  }

  function rank(value, order) {
    const index = order.indexOf(value);
    return index === -1 ? order.length : index;
  }

  function parsedDate(item) {
    const value = Date.parse(item.dataset.workDate ?? '');
    return Number.isNaN(value) ? null : value;
  }

  function compareDates(a, b, direction) {
    const aDate = parsedDate(a);
    const bDate = parsedDate(b);
    if (aDate === null && bDate === null) return originalIndex(a) - originalIndex(b);
    if (aDate === null) return 1;
    if (bDate === null) return -1;
    return (aDate - bDate) * direction;
  }

  function activeSortMode() {
    const selected = root.querySelector('[data-work-sort]:checked');
    return selected instanceof HTMLInputElement ? selected.value : 'default';
  }

  function compareItems(a, b) {
    const mode = activeSortMode();
    if (mode === 'date-desc') return compareDates(a, b, -1);
    if (mode === 'date-asc') return compareDates(a, b, 1);
    if (mode === 'title') {
      return (a.dataset.workTitle ?? '').localeCompare(b.dataset.workTitle ?? '');
    }
    if (mode === 'kind') {
      const difference = rank(a.dataset.workKind, ['collection', 'piece', 'service'])
        - rank(b.dataset.workKind, ['collection', 'piece', 'service']);
      return difference || compareDates(a, b, -1);
    }

    const featuredDifference = Number(b.dataset.workFeatured === 'true')
      - Number(a.dataset.workFeatured === 'true');
    if (featuredDifference) return featuredDifference;
    const kindDifference = rank(a.dataset.workKind, ['collection', 'piece', 'service'])
      - rank(b.dataset.workKind, ['collection', 'piece', 'service']);
    return kindDifference || compareDates(a, b, -1);
  }

  function stopVideo(video) {
    if (!(video instanceof HTMLVideoElement)) return;
    video.pause();
    try {
      video.currentTime = 0;
    } catch {}
  }

  function stopVideosWithin(element) {
    element.querySelectorAll?.('[data-work-hover-video]').forEach(stopVideo);
  }

  function syncSelector(selector) {
    const selected = selector.querySelector('input:checked');
    const value = selector.querySelector('[data-work-selector-value]');
    if (!(selected instanceof HTMLInputElement) || !(value instanceof HTMLElement)) return;
    value.textContent = selected.dataset.workOptionLabel ?? '';
  }

  function closeSelectors(except = null) {
    selectors.forEach((selector) => {
      if (selector instanceof HTMLDetailsElement && selector !== except) selector.open = false;
    });
  }

  function handleSelectorToggle(event) {
    const selector = event.currentTarget;
    if (selector instanceof HTMLDetailsElement && selector.open) closeSelectors(selector);
  }

  function handleDocumentPointerDown(event) {
    if (!(event.target instanceof Node)) return;
    if (!selectors.some((selector) => selector.contains(event.target))) closeSelectors();
  }

  function handleRootKeydown(event) {
    if (event.key !== 'Escape') return;
    const openSelector = selectors.find((selector) => selector instanceof HTMLDetailsElement && selector.open);
    if (!(openSelector instanceof HTMLDetailsElement)) return;
    openSelector.open = false;
    openSelector.querySelector('summary')?.focus();
  }

  function update() {
    const activeFilters = {};
    filters.forEach((filter) => {
      if (!(filter instanceof HTMLInputElement) || !filter.checked) return;
      activeFilters[filter.dataset.workFilter] = filter.value;
    });

    items.sort(compareItems).forEach((item) => grid.append(item));

    let visibleCount = 0;
    items.forEach((item) => {
      const matchesFilters = Object.entries(activeFilters).every(([name, value]) => (
        !value || item.dataset[`work${name[0].toUpperCase()}${name.slice(1)}`] === value
      ));
      const visible = matchesFilters;
      item.hidden = !visible;
      if (visible) visibleCount += 1;
      else stopVideosWithin(item);
    });

    if (empty instanceof HTMLElement) empty.hidden = visibleCount !== 0;
    if (resultCount instanceof HTMLElement) {
      const noun = visibleCount === 1 ? root.dataset.resultSingular : root.dataset.resultPlural;
      resultCount.textContent = `${visibleCount} ${noun ?? ''}`.trim();
    }
  }

  function handleChange(event) {
    if (!(event.target instanceof HTMLInputElement)) return;
    if (!event.target.matches('[data-work-filter], [data-work-sort]')) return;
    const selector = event.target.closest('[data-work-selector]');
    if (selector instanceof HTMLDetailsElement) {
      syncSelector(selector);
      selector.open = false;
      selector.querySelector('summary')?.focus();
    }
    update();
  }

  function activeCardFromEvent(event) {
    const card = event.target instanceof Element ? event.target.closest('.storefront-work-card') : null;
    return card instanceof HTMLElement && root.contains(card) ? card : null;
  }

  function playHoverVideo(event) {
    if (!finePointer.matches || reducedMotion.matches) return;
    const card = activeCardFromEvent(event);
    if (!card) return;
    const video = card.querySelector('[data-work-hover-video]');
    if (!(video instanceof HTMLVideoElement)) return;
    const playPromise = video.play();
    playPromise?.catch(() => {});
  }

  function stopHoverVideo(event) {
    const card = activeCardFromEvent(event);
    if (!card || (event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) return;
    stopVideosWithin(card);
  }

  function handlePreferenceChange() {
    if (!finePointer.matches || reducedMotion.matches) stopVideosWithin(root);
  }

  if (form instanceof HTMLFormElement) {
    form.hidden = false;
    form.addEventListener('change', handleChange);
  }
  selectors.forEach((selector) => {
    syncSelector(selector);
    selector.addEventListener('toggle', handleSelectorToggle);
  });
  document.addEventListener('pointerdown', handleDocumentPointerDown);
  root.addEventListener('keydown', handleRootKeydown);
  root.addEventListener('pointerover', playHoverVideo);
  root.addEventListener('pointerout', stopHoverVideo);
  root.addEventListener('focusin', playHoverVideo);
  root.addEventListener('focusout', stopHoverVideo);
  finePointer.addEventListener('change', handlePreferenceChange);
  reducedMotion.addEventListener('change', handlePreferenceChange);
  update();

  workIndexes.set(root, {
    destroy() {
      stopVideosWithin(root);
      form?.removeEventListener('change', handleChange);
      selectors.forEach((selector) => selector.removeEventListener('toggle', handleSelectorToggle));
      document.removeEventListener('pointerdown', handleDocumentPointerDown);
      root.removeEventListener('keydown', handleRootKeydown);
      root.removeEventListener('pointerover', playHoverVideo);
      root.removeEventListener('pointerout', stopHoverVideo);
      root.removeEventListener('focusin', playHoverVideo);
      root.removeEventListener('focusout', stopHoverVideo);
      finePointer.removeEventListener('change', handlePreferenceChange);
      reducedMotion.removeEventListener('change', handlePreferenceChange);
    }
  });
}

function enhanceWorkIndexesWithin(scope = document) {
  if (scope instanceof Element && scope.matches('[data-storefront-work]')) {
    enhanceWorkIndex(scope);
  }
  scope.querySelectorAll?.('[data-storefront-work]').forEach(enhanceWorkIndex);
}

function destroyWorkIndexesWithin(scope) {
  workIndexes.forEach((entry, root) => {
    if (scope === root || scope.contains?.(root)) {
      entry.destroy();
      workIndexes.delete(root);
    }
  });
}

let footerSnapController = null;

function enhanceFooterSnap() {
  if (footerSnapController || !document.body.classList.contains('template-index')) return;

  const root = document.documentElement;
  const footer = document.querySelector('.storefront-footer');
  const gateway = document.querySelector('.landing-gateway');
  const desktop = window.matchMedia('(min-width: 48rem)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!(footer instanceof HTMLElement) || !(gateway instanceof HTMLElement)) return;

  const originalFooterAriaHidden = footer.getAttribute('aria-hidden');
  const footerWasInert = footer.inert;
  const gatewayWasInert = gateway.inert;
  let enabled = false;
  let open = false;
  let lastTrigger = null;
  let wheelDirection = 0;
  let wheelDistance = 0;
  let wheelTriggered = false;
  let wheelEndTimer = 0;
  let motionEndTimer = 0;
  let touchStartY = null;

  function dispatchSnapEvent() {
    document.dispatchEvent(new CustomEvent('storefront:footer-snap', {
      detail: { open }
    }));
  }

  function finishMotion() {
    window.clearTimeout(motionEndTimer);
    root.classList.remove('storefront-footer-snap-moving');
    dispatchSnapEvent();
  }

  function removeFooterHash() {
    if (window.location.hash !== '#footer-contact') return;
    const nextUrl = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(window.history.state, '', nextUrl);
  }

  function setOpen(nextOpen, {
    animate = true,
    trigger = null,
    updateHistory = false
  } = {}) {
    if (!enabled || open === nextOpen) return;

    open = nextOpen;
    if (trigger instanceof HTMLElement) lastTrigger = trigger;

    const shouldAnimate = animate && !reducedMotion.matches;
    root.classList.toggle('storefront-footer-snap-immediate', !shouldAnimate);
    root.classList.toggle('storefront-footer-snap-open', open);
    root.classList.toggle('storefront-footer-snap-moving', shouldAnimate);
    footer.inert = !open;
    footer.setAttribute('aria-hidden', String(!open));
    gateway.inert = open;

    if (open && updateHistory && window.location.hash !== '#footer-contact') {
      window.history.pushState(window.history.state, '', '#footer-contact');
    } else if (!open) {
      removeFooterHash();
    }

    if (!open && footer.contains(document.activeElement)) {
      const fallbackTrigger = document.querySelector('a[href$="#footer-contact"]');
      const focusTarget = lastTrigger?.isConnected ? lastTrigger : fallbackTrigger;
      focusTarget?.focus({ preventScroll: true });
    }

    window.clearTimeout(motionEndTimer);
    dispatchSnapEvent();

    if (shouldAnimate) {
      motionEndTimer = window.setTimeout(finishMotion, 900);
    } else {
      root.classList.remove('storefront-footer-snap-moving');
      footer.getBoundingClientRect();
      window.requestAnimationFrame(() => {
        root.classList.remove('storefront-footer-snap-immediate');
        dispatchSnapEvent();
      });
    }
  }

  function resetWheelGesture() {
    wheelDirection = 0;
    wheelDistance = 0;
    wheelTriggered = false;
  }

  function handleWheel(event) {
    if (!enabled || state.panel || event.ctrlKey) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    event.preventDefault();
    const direction = Math.sign(event.deltaY);
    if (!direction) return;

    if (wheelDirection && wheelDirection !== direction) resetWheelGesture();
    wheelDirection = direction;
    wheelDistance += event.deltaY;
    window.clearTimeout(wheelEndTimer);
    wheelEndTimer = window.setTimeout(resetWheelGesture, 180);

    if (wheelTriggered || Math.abs(wheelDistance) < 1) return;
    wheelTriggered = true;
    setOpen(direction > 0);
  }

  function handleTouchStart(event) {
    if (!enabled || state.panel || event.touches.length !== 1) return;
    touchStartY = event.touches[0].clientY;
  }

  function handleTouchMove(event) {
    if (!enabled || state.panel || touchStartY === null) return;
    event.preventDefault();
  }

  function handleTouchEnd(event) {
    if (!enabled || state.panel || touchStartY === null) return;
    const endY = event.changedTouches[0]?.clientY;
    const distance = typeof endY === 'number' ? touchStartY - endY : 0;
    touchStartY = null;
    if (Math.abs(distance) >= 32) setOpen(distance > 0);
  }

  function handleKeydown(event) {
    if (!enabled || state.panel || event.defaultPrevented) return;
    if (event.target instanceof Element
        && event.target.closest('a, button, input, select, textarea, [contenteditable="true"]')) return;

    const openKeys = ['ArrowDown', 'PageDown', 'End'];
    const closeKeys = ['ArrowUp', 'PageUp', 'Home'];
    const isSpace = event.key === ' ';
    if (!openKeys.includes(event.key) && !closeKeys.includes(event.key) && !isSpace) return;

    event.preventDefault();
    setOpen(isSpace ? !event.shiftKey : openKeys.includes(event.key), { animate: false });
  }

  function handleAnchorClick(event) {
    if (!enabled || event.defaultPrevented || !(event.target instanceof Element)) return;
    const link = event.target.closest('a[href]');
    if (!(link instanceof HTMLAnchorElement)) return;

    const target = new URL(link.href, window.location.href);
    if (target.origin !== window.location.origin || target.hash !== '#footer-contact') return;
    if (target.pathname !== window.location.pathname) return;

    event.preventDefault();
    setOpen(true, { trigger: link, updateHistory: true });
  }

  function handleHistoryChange() {
    if (!enabled) return;
    setOpen(window.location.hash === '#footer-contact');
  }

  function enable() {
    if (enabled) return;
    const initiallyOpen = window.location.hash === '#footer-contact'
      || window.scrollY >= window.innerHeight / 2;
    enabled = true;
    open = !initiallyOpen;
    root.classList.add('storefront-footer-snap');
    window.scrollTo(0, 0);
    setOpen(initiallyOpen, { animate: false });
  }

  function disable() {
    if (!enabled) return;
    const wasOpen = open;
    enabled = false;
    window.clearTimeout(wheelEndTimer);
    window.clearTimeout(motionEndTimer);
    resetWheelGesture();
    root.classList.remove(
      'storefront-footer-snap',
      'storefront-footer-snap-open',
      'storefront-footer-snap-moving',
      'storefront-footer-snap-immediate'
    );
    footer.inert = footerWasInert;
    gateway.inert = gatewayWasInert;
    if (originalFooterAriaHidden === null) footer.removeAttribute('aria-hidden');
    else footer.setAttribute('aria-hidden', originalFooterAriaHidden);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (wasOpen) footer.scrollIntoView({ block: 'start' });
        else window.scrollTo(0, 0);
        dispatchSnapEvent();
      });
    });
  }

  function handleBreakpointChange() {
    if (desktop.matches) enable();
    else disable();
  }

  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: false });
  window.addEventListener('touchend', handleTouchEnd, { passive: true });
  window.addEventListener('popstate', handleHistoryChange);
  window.addEventListener('hashchange', handleHistoryChange);
  document.addEventListener('click', handleAnchorClick);
  document.addEventListener('keydown', handleKeydown);
  desktop.addEventListener('change', handleBreakpointChange);
  reducedMotion.addEventListener('change', finishMotion);
  handleBreakpointChange();

  footerSnapController = {
    contains(scope) {
      return scope === footer || scope === gateway || scope.contains?.(footer) || scope.contains?.(gateway);
    },
    destroy() {
      disable();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('popstate', handleHistoryChange);
      window.removeEventListener('hashchange', handleHistoryChange);
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('keydown', handleKeydown);
      desktop.removeEventListener('change', handleBreakpointChange);
      reducedMotion.removeEventListener('change', finishMotion);
      footerSnapController = null;
    }
  };
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
  destroyWorkIndexesWithin(event.target);
  destroyInternalHeadersWithin(event.target);
  if (footerSnapController?.contains(event.target)) footerSnapController.destroy();
  if (state.panel && (event.target.contains(state.panel) || !state.panel.isConnected)) {
    closeOverlay({ restoreFocus: false });
  }
});

document.addEventListener('shopify:section:load', (event) => {
  enhanceTrackingEyesWithin(event.target);
  enhanceWorkIndexesWithin(event.target);
  enhanceInternalHeadersWithin(event.target);
  enhanceFooterSnap();
});

enhanceTrackingEyesWithin(document);
enhanceWorkIndexesWithin(document);
enhanceInternalHeadersWithin(document);
enhanceFooterSnap();
