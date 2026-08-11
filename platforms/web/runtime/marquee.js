/** Generated from components/js/theme.js: Marquee progressive motion. */
import { enhanceMatches, expose, register } from './core.js';

/* ---- Marquee progressive motion ---- */
const marqueeEntries = new Map();
const marqueeObserved = new Map();
const marqueePending = new Set();
const marqueeReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const marqueeVelocities = { slow: 24, default: 40, fast: 64 };
let marqueeResizeObserver = null;
let marqueeResizeFrame = 0;

function scheduleMarqueeMeasurement(root) {
  if (root instanceof HTMLElement) marqueePending.add(root);
  if (marqueeResizeFrame || marqueePending.size === 0) return;
  marqueeResizeFrame = window.requestAnimationFrame(() => {
    marqueeResizeFrame = 0;
    const roots = Array.from(marqueePending);
    marqueePending.clear();
    roots.forEach((item) => measureMarquee(item));
  });
}

function observeMarqueeElement(element, root) {
  if (!(element instanceof Element) || typeof ResizeObserver === 'undefined') return;
  if (!marqueeResizeObserver) {
    marqueeResizeObserver = new ResizeObserver((records) => {
      records.forEach((record) => {
        marqueeObserved.get(record.target)?.forEach(scheduleMarqueeMeasurement);
      });
    });
  }
  let roots = marqueeObserved.get(element);
  if (!roots) {
    roots = new Set();
    marqueeObserved.set(element, roots);
    marqueeResizeObserver.observe(element);
  }
  roots.add(root);
}

function unobserveMarqueeElement(element, root) {
  const roots = marqueeObserved.get(element);
  if (!roots) return;
  roots.delete(root);
  if (roots.size > 0) return;
  marqueeResizeObserver?.unobserve(element);
  marqueeObserved.delete(element);
}

function dispatchMarqueePlayback(entry) {
  const { root } = entry;
  const signature = [
    root.dataset.marqueeState,
    root.dataset.userPaused,
    root.dataset.hoverPaused,
    root.dataset.hiddenPaused,
    root.dataset.reducedMotion,
    root.dataset.direction,
    root.dataset.pace,
  ].join(':');
  if (signature === entry.signature) return;
  entry.signature = signature;
  root.dispatchEvent(new CustomEvent('marqueeplaybackchange', {
    bubbles: true,
    detail: {
      state: root.dataset.marqueeState,
      userPaused: entry.userPaused,
      hoverPaused: entry.hoverPaused,
      hiddenPaused: entry.hiddenPaused,
      reducedMotion: marqueeReducedMotion.matches,
      direction: root.dataset.direction,
      pace: root.dataset.pace,
    },
  }));
}

function syncMarqueePlayback(entry) {
  const { root, track, control } = entry;
  const reduced = marqueeReducedMotion.matches;
  const paused = entry.userPaused || entry.hoverPaused || entry.hiddenPaused || reduced;
  const pauseLabel = String(control.dataset.pauseLabel || 'Pause scrolling').trim();
  const resumeLabel = String(control.dataset.resumeLabel || 'Resume scrolling').trim();
  const nextLabel = entry.userPaused ? resumeLabel : pauseLabel;

  root.dataset.marqueeState = reduced ? 'static' : (paused ? 'paused' : 'playing');
  root.dataset.userPaused = String(entry.userPaused);
  root.dataset.hoverPaused = String(entry.hoverPaused);
  root.dataset.hiddenPaused = String(entry.hiddenPaused);
  root.dataset.reducedMotion = String(reduced);
  track.style.animationPlayState = paused ? 'paused' : 'running';
  control.hidden = reduced;
  control.textContent = nextLabel;
  control.setAttribute('aria-label', nextLabel);
  dispatchMarqueePlayback(entry);
}

function measureMarquee(root) {
  const entry = marqueeEntries.get(root);
  if (!entry || !root.isConnected || marqueeReducedMotion.matches) return;
  const groupWidth = entry.sourceGroup.getBoundingClientRect().width;
  const trackStyles = getComputedStyle(entry.track);
  const groupGap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
  const pace = Object.hasOwn(marqueeVelocities, root.dataset.pace)
    ? root.dataset.pace
    : 'default';
  const velocity = marqueeVelocities[pace];
  const distance = groupWidth + groupGap;
  if (!(distance > 0)) return;
  root.style.setProperty('--_marquee-duration', `${distance / velocity}s`);
}

function removeMarqueeCopy(root) {
  root.querySelectorAll('.marquee__group--copy').forEach((copy) => copy.remove());
}

function cleanupMarquee(root, { reset = true } = {}) {
  const entry = marqueeEntries.get(root);
  if (entry) {
    entry.root.removeEventListener('pointerenter', entry.onPointerEnter);
    entry.root.removeEventListener('pointerleave', entry.onPointerLeave);
    entry.root.removeEventListener('focusin', entry.onFocusIn);
    entry.control.removeEventListener('pointerdown', entry.onControlPointerDown);
    entry.control.removeEventListener('click', entry.onControlClick);
    unobserveMarqueeElement(entry.sourceGroup, root);
    unobserveMarqueeElement(entry.viewport, root);
    marqueeEntries.delete(root);
  }
  marqueePending.delete(root);
  removeMarqueeCopy(root);
  if (!reset) return;
  root.removeAttribute('data-marquee-enhanced');
  root.removeAttribute('data-user-paused');
  root.removeAttribute('data-hover-paused');
  root.removeAttribute('data-hidden-paused');
  root.removeAttribute('data-reduced-motion');
  root.style.removeProperty('--_marquee-duration');
  const track = root.querySelector('.marquee__track');
  const control = root.querySelector('.marquee__control');
  if (track instanceof HTMLElement) track.style.removeProperty('animation-play-state');
  if (control instanceof HTMLButtonElement) control.hidden = true;
}

function cleanMarqueeCopy(copy) {
  copy.classList.remove('marquee__group--source');
  copy.classList.add('marquee__group--copy');
  copy.setAttribute('aria-hidden', 'true');
  copy.setAttribute('inert', '');
  copy.removeAttribute('id');
  copy.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
  copy.querySelectorAll('a, button, input, select, textarea, [tabindex], [contenteditable]').forEach((element) => {
    element.setAttribute('tabindex', '-1');
    element.removeAttribute('contenteditable');
  });
}

function enhanceMarquee(root) {
  if (!(root instanceof HTMLElement) || !root.matches('[data-marquee]')) return;
  cleanupMarquee(root);

  const presentation = root.dataset.presentation === 'static' ? 'static' : 'auto';
  const direction = root.dataset.direction === 'reverse' ? 'reverse' : 'forward';
  const pace = Object.hasOwn(marqueeVelocities, root.dataset.pace)
    ? root.dataset.pace
    : 'default';
  const viewport = root.querySelector('.marquee__viewport');
  const track = root.querySelector('.marquee__track');
  const sourceGroup = root.querySelector('.marquee__group--source');
  const control = root.querySelector('.marquee__control');
  const items = sourceGroup?.querySelectorAll(':scope > .marquee__item') ?? [];

  if (root.dataset.presentation !== presentation) root.dataset.presentation = presentation;
  if (root.dataset.direction !== direction) root.dataset.direction = direction;
  if (root.dataset.pace !== pace) root.dataset.pace = pace;
  root.dataset.marqueeState = 'static';
  if (presentation !== 'auto'
      || !(viewport instanceof HTMLElement)
      || !(track instanceof HTMLElement)
      || !(sourceGroup instanceof HTMLElement)
      || !(control instanceof HTMLButtonElement)
      || items.length < 2) return;

  if (marqueeReducedMotion.matches) {
    root.dataset.reducedMotion = 'true';
    control.hidden = true;
    marqueeEntries.set(root, {
      root, viewport, track, sourceGroup, control,
      userPaused: false, hoverPaused: false, hiddenPaused: document.hidden,
      signature: '', reducedOnly: true,
      onPointerEnter: () => {}, onPointerLeave: () => {}, onFocusIn: () => {},
      onControlPointerDown: () => {}, onControlClick: () => {},
    });
    return;
  }

  const copy = sourceGroup.cloneNode(true);
  if (!(copy instanceof HTMLElement)) return;
  cleanMarqueeCopy(copy);
  track.append(copy);

  const entry = {
    root, viewport, track, sourceGroup, control,
    userPaused: false,
    hoverPaused: false,
    hiddenPaused: document.hidden,
    controlIntent: null,
    signature: '',
    onPointerEnter: null,
    onPointerLeave: null,
    onFocusIn: null,
    onControlPointerDown: null,
    onControlClick: null,
  };
  entry.onPointerEnter = () => {
    entry.hoverPaused = true;
    syncMarqueePlayback(entry);
  };
  entry.onPointerLeave = () => {
    entry.hoverPaused = false;
    syncMarqueePlayback(entry);
  };
  entry.onFocusIn = (event) => {
    if (event.relatedTarget instanceof Node && root.contains(event.relatedTarget)) return;
    entry.userPaused = true;
    syncMarqueePlayback(entry);
  };
  entry.onControlPointerDown = () => {
    entry.controlIntent = !entry.userPaused;
  };
  entry.onControlClick = () => {
    entry.userPaused = typeof entry.controlIntent === 'boolean'
      ? entry.controlIntent
      : !entry.userPaused;
    entry.controlIntent = null;
    syncMarqueePlayback(entry);
  };

  root.addEventListener('pointerenter', entry.onPointerEnter);
  root.addEventListener('pointerleave', entry.onPointerLeave);
  root.addEventListener('focusin', entry.onFocusIn);
  control.addEventListener('pointerdown', entry.onControlPointerDown);
  control.addEventListener('click', entry.onControlClick);
  marqueeEntries.set(root, entry);
  root.dataset.marqueeState = 'paused';
  root.dataset.marqueeEnhanced = 'true';
  observeMarqueeElement(sourceGroup, root);
  observeMarqueeElement(viewport, root);
  measureMarquee(root);
  syncMarqueePlayback(entry);
}

function enhanceMarquees(scope = document) {
  enhanceMatches(scope, '[data-marquee]', enhanceMarquee);
}

function cleanupMarquees() {
  marqueeEntries.forEach((entry, root) => {
    if (!root.isConnected) cleanupMarquee(root, { reset: false });
  });
  if (marqueeEntries.size === 0) {
    marqueeResizeObserver?.disconnect();
    marqueeResizeObserver = null;
    marqueeObserved.clear();
    marqueePending.clear();
    if (marqueeResizeFrame) window.cancelAnimationFrame(marqueeResizeFrame);
    marqueeResizeFrame = 0;
  }
}

document.addEventListener('visibilitychange', () => {
  marqueeEntries.forEach((entry) => {
    entry.hiddenPaused = document.hidden;
    if (!entry.reducedOnly) syncMarqueePlayback(entry);
  });
});
marqueeReducedMotion.addEventListener?.('change', () => {
  Array.from(marqueeEntries.keys()).forEach(enhanceMarquee);
});

expose({ enhanceMarquees });
register({
  id: 'marquee',
  enhance: enhanceMarquees,
  attributes: ['data-presentation', 'data-direction', 'data-pace'],
  onAttribute: (target) => {
    if (target instanceof HTMLElement && target.matches('[data-marquee]')) enhanceMarquee(target);
  },
  cleanup: cleanupMarquees,
});
