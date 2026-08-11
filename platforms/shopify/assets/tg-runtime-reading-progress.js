/** Generated from components/js/theme.js: Shared reading-state service: decorative article position. */
import { enhanceMatches, expose, register } from './tg-runtime-core.js';

/* ---- Shared reading-state service: decorative article position ---- */
const readingProgressEntries = new Map();
const readingProgressSources = new Map();
const readingProgressObserved = new Map();
const readingProgressPending = new Set();
let readingProgressResizeObserver = null;
let readingProgressFrame = 0;
let readingProgressWindowResizeAttached = false;

function handleReadingProgressResize() {
  scheduleReadingProgress();
}

function readingDocumentScroller() {
  return document.scrollingElement || document.documentElement;
}

function readingElementById(root, id) {
  const tree = root.getRootNode();
  return typeof tree.getElementById === 'function'
    ? tree.getElementById(id)
    : document.getElementById(id);
}

function setReadingProgress(root, value, state) {
  const bounded = Math.min(100, Math.max(0, Number(value) || 0));
  const rounded = Math.round(bounded * 100) / 100;
  root.style.setProperty('--_reading-progress-scale', String(rounded / 100));
  root.dataset.value = String(rounded);
  root.dataset.readingState = state;
  root.hidden = false;
}

function setReadingProgressUnavailable(root, state) {
  root.dataset.readingState = state;
  root.removeAttribute('data-value');
  root.style.setProperty('--_reading-progress-scale', '0');
  root.hidden = true;
}

function measureReadingProgress(root) {
  const entry = readingProgressEntries.get(root);
  if (!entry || !root.isConnected || !entry.target.isConnected) {
    if (root.isConnected) setReadingProgressUnavailable(root, 'unavailable');
    return;
  }

  const documentScroller = readingDocumentScroller();
  const usesViewport = entry.scroller === documentScroller;
  const targetRect = entry.target.getBoundingClientRect();
  const scrollOffset = usesViewport ? window.scrollY : entry.scroller.scrollTop;
  const scrollportStart = usesViewport
    ? 0
    : entry.scroller.getBoundingClientRect().top + entry.scroller.clientTop;
  const scrollportSize = usesViewport ? window.innerHeight : entry.scroller.clientHeight;
  const targetStart = targetRect.top - scrollportStart + scrollOffset;
  const range = targetRect.height - scrollportSize;

  if (!(range > 0)) {
    setReadingProgressUnavailable(root, 'unavailable');
    return;
  }

  setReadingProgress(root, ((scrollOffset - targetStart) / range) * 100, 'automatic');
}

function scheduleReadingProgress(roots = readingProgressEntries.keys()) {
  for (const root of roots) readingProgressPending.add(root);
  if (readingProgressFrame || readingProgressPending.size === 0) return;
  readingProgressFrame = window.requestAnimationFrame(() => {
    readingProgressFrame = 0;
    const pending = Array.from(readingProgressPending);
    readingProgressPending.clear();
    pending.forEach(measureReadingProgress);
  });
}

function observeReadingElement(element, root) {
  if (!(element instanceof Element) || typeof ResizeObserver === 'undefined') return;
  if (!readingProgressResizeObserver) {
    readingProgressResizeObserver = new ResizeObserver((records) => {
      const roots = new Set();
      records.forEach((record) => {
        readingProgressObserved.get(record.target)?.forEach((item) => roots.add(item));
      });
      scheduleReadingProgress(roots);
    });
  }
  let roots = readingProgressObserved.get(element);
  if (!roots) {
    roots = new Set();
    readingProgressObserved.set(element, roots);
    readingProgressResizeObserver.observe(element);
  }
  roots.add(root);
}

function unobserveReadingElement(element, root) {
  const roots = readingProgressObserved.get(element);
  if (!roots) return;
  roots.delete(root);
  if (roots.size > 0) return;
  readingProgressResizeObserver?.unobserve(element);
  readingProgressObserved.delete(element);
}

function attachReadingSource(root, scroller) {
  const source = scroller === readingDocumentScroller() ? window : scroller;
  let entry = readingProgressSources.get(source);
  if (!entry) {
    const roots = new Set();
    const listener = () => scheduleReadingProgress(roots);
    entry = { roots, listener };
    readingProgressSources.set(source, entry);
    source.addEventListener('scroll', listener, { passive: true });
  }
  entry.roots.add(root);
}

function detachReadingSource(root, scroller) {
  const source = scroller === readingDocumentScroller() ? window : scroller;
  const entry = readingProgressSources.get(source);
  if (!entry) return;
  entry.roots.delete(root);
  if (entry.roots.size > 0) return;
  source.removeEventListener('scroll', entry.listener);
  readingProgressSources.delete(source);
}

function cleanupReadingProgressRoot(root) {
  const entry = readingProgressEntries.get(root);
  if (!entry) return;
  detachReadingSource(root, entry.scroller);
  unobserveReadingElement(entry.target, root);
  if (entry.scroller instanceof Element) unobserveReadingElement(entry.scroller, root);
  readingProgressEntries.delete(root);
  readingProgressPending.delete(root);

  if (readingProgressEntries.size === 0) {
    if (readingProgressWindowResizeAttached) {
      window.removeEventListener('resize', handleReadingProgressResize);
      readingProgressWindowResizeAttached = false;
    }
    if (readingProgressFrame) {
      window.cancelAnimationFrame(readingProgressFrame);
      readingProgressFrame = 0;
    }
    readingProgressPending.clear();
    readingProgressResizeObserver?.disconnect();
    readingProgressResizeObserver = null;
    readingProgressObserved.clear();
  }
}

function configureReadingProgress(root) {
  if (!(root instanceof HTMLElement) || !root.matches('[data-reading-progress]')) return;
  cleanupReadingProgressRoot(root);
  root.dataset.readingProgressEnhanced = 'true';
  root.setAttribute('aria-hidden', 'true');

  const mode = root.dataset.readingMode === 'automatic' ? 'automatic' : 'controlled';
  if (mode === 'controlled') {
    const value = Number(root.dataset.readingValue);
    if (!Number.isFinite(value)) setReadingProgressUnavailable(root, 'invalid');
    else setReadingProgress(root, value, 'controlled');
    return;
  }

  const targetId = String(root.dataset.readingTarget || '').trim();
  const scrollRootId = String(root.dataset.readingScrollRoot || '').trim();
  const target = targetId ? readingElementById(root, targetId) : null;
  const scroller = scrollRootId
    ? readingElementById(root, scrollRootId)
    : readingDocumentScroller();

  if (!(target instanceof HTMLElement)
      || !(scroller instanceof HTMLElement)
      || (scroller !== readingDocumentScroller() && !scroller.contains(target))) {
    setReadingProgressUnavailable(root, 'invalid');
    return;
  }

  readingProgressEntries.set(root, { target, scroller });
  attachReadingSource(root, scroller);
  observeReadingElement(target, root);
  if (scroller instanceof Element) observeReadingElement(scroller, root);
  if (!readingProgressWindowResizeAttached) {
    window.addEventListener('resize', handleReadingProgressResize, { passive: true });
    readingProgressWindowResizeAttached = true;
  }
  scheduleReadingProgress([root]);
}

function enhanceReadingProgress(scope = document) {
  enhanceMatches(scope, '[data-reading-progress]', configureReadingProgress);
}

function cleanupReadingProgress() {
  readingProgressEntries.forEach((_entry, root) => {
    if (!root.isConnected) cleanupReadingProgressRoot(root);
  });
  scheduleReadingProgress();
}

expose({ enhanceReadingProgress });
register({
  id: 'reading-progress',
  enhance: enhanceReadingProgress,
  attributes: ['data-reading-mode', 'data-reading-value', 'data-reading-target', 'data-reading-scroll-root'],
  onAttribute: (target) => {
    if (target instanceof HTMLElement && target.matches('[data-reading-progress]')) configureReadingProgress(target);
  },
  cleanup: cleanupReadingProgress,
  setup: () => document.fonts?.ready.then(() => scheduleReadingProgress()),
});
