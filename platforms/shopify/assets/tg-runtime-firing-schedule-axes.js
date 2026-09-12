/** Generated from components/js/theme.js: Firing Schedule axis typography. */
import { enhanceMatches, expose, register } from './tg-runtime-core.js';

/* ---- Firing Schedule axis typography ---- */
const firingAxisObservers = new Map();

function updateFiringAxisScale(plot) {
  if (!plot.getClientRects().length) return;
  const matrix = plot.getCTM();
  const scale = matrix && Math.hypot(matrix.a, matrix.b);
  // Hidden or detached plots are measured again when their viewport appears.
  if (!scale || !Number.isFinite(scale)) return;
  plot.style.setProperty('--_firing-axis-scale', String(1 / scale));
  // Keep native axis anchors, but reserve enough viewport width for the actual
  // localized text at its token size. A larger minimum scrolls inside the chart.
  const view = plot.viewBox.baseVal;
  if (!(view.width > 0 && view.height > 0)) return;
  const labels = Array.from(plot.querySelectorAll('.firing-schedule__axes text')).map((text) => {
    const transform = text.getCTM();
    const box = text.getBBox();
    const x = text.x.baseVal[0]?.value ?? 0;
    const y = text.y.baseVal[0]?.value ?? 0;
    const anchor = new DOMPoint(x, y).matrixTransform(transform);
    const corners = [[box.x, box.y], [box.x + box.width, box.y],
      [box.x, box.y + box.height], [box.x + box.width, box.y + box.height]]
      .map(([bx, by]) => new DOMPoint(bx, by).matrixTransform(transform));
    return {
      x: (anchor.x - matrix.e) / scale - view.x,
      y: (anchor.y - matrix.f) / scale - view.y,
      left: Math.min(...corners.map(p => p.x)) - anchor.x,
      right: Math.max(...corners.map(p => p.x)) - anchor.x,
      top: Math.min(...corners.map(p => p.y)) - anchor.y,
      bottom: Math.max(...corners.map(p => p.y)) - anchor.y,
    };
  });
  // CSS resolves the public gap length; native SVG needs measured placement
  // because it does not lay out these labels with CSS gap.
  const axes = plot.querySelector('.firing-schedule__axes');
  const gap = axes ? parseFloat(getComputedStyle(axes).columnGap) : 0;
  let minimumScale = 0;
  const reserve = (value) => { if (Number.isFinite(value)) minimumScale = Math.max(minimumScale, value); };
  labels.forEach((a, index) => {
    reserve(-a.left / a.x);
    reserve(a.right / (view.width - a.x));
    reserve(-a.top / a.y);
    reserve(a.bottom / (view.height - a.y));
    labels.slice(index + 1).forEach((b) => {
      const horizontal = a.x === b.x ? Infinity : a.x < b.x
        ? (a.right - b.left + gap) / (b.x - a.x)
        : (b.right - a.left + gap) / (a.x - b.x);
      const vertical = a.y === b.y ? Infinity : a.y < b.y
        ? (a.bottom - b.top + gap) / (b.y - a.y)
        : (b.bottom - a.top + gap) / (a.y - b.y);
      reserve(Math.min(horizontal, vertical));
    });
  });
  const minimum = Math.ceil(view.width * minimumScale) + 1;
  const previous = parseFloat(plot.style.getPropertyValue('--_firing-axis-min'));
  // Glyph bounds are quantized. One CSS pixel of rounding reserve/hysteresis
  // prevents repeated resize callbacks alternating between adjacent widths.
  if (!Number.isFinite(previous) || Math.abs(previous - minimum) > 1) {
    plot.style.setProperty('--_firing-axis-min', `${minimum}px`);
  }
}

function enhanceFiringAxis(plot) {
  if (!(plot instanceof SVGSVGElement) || typeof ResizeObserver === 'undefined') return;
  updateFiringAxisScale(plot);
  let entry = firingAxisObservers.get(plot);
  if (!entry) {
    const resize = new ResizeObserver(() => updateFiringAxisScale(plot));
    resize.observe(plot);
    const axes = plot.querySelector('.firing-schedule__axes');
    if (axes) resize.observe(axes);
    const attributes = new MutationObserver(() => updateFiringAxisScale(plot));
    entry = { resize, attributes };
    firingAxisObservers.set(plot, entry);
  }
  // Token overrides can change spacing without resizing any glyph. Observe
  // host styles too, including hosts outside a shadow root; never our own style.
  entry.attributes.disconnect();
  entry.attributes.observe(plot, { attributes: true, attributeFilter: ['viewBox', 'preserveAspectRatio'] });
  let ancestor = plot.parentElement;
  while (ancestor) {
    entry.attributes.observe(ancestor, { attributes: true, attributeFilter: ['style', 'class', 'data-theme'] });
    ancestor = ancestor.parentElement || ancestor.getRootNode().host;
  }
}

function enhanceFiringSchedules(scope = document) {
  enhanceMatches(scope, '.firing-schedule__plot', enhanceFiringAxis);
}

function releaseFiringAxis(plot, entry) {
  entry.resize.disconnect();
  entry.attributes.disconnect();
  plot.style.removeProperty('--_firing-axis-scale');
  plot.style.removeProperty('--_firing-axis-min');
  firingAxisObservers.delete(plot);
}

function cleanupFiringSchedules() {
  firingAxisObservers.forEach((observer, plot) => {
    if (!plot.isConnected) releaseFiringAxis(plot, observer);
  });
}

function destroyFiringSchedules(scope = document) {
  firingAxisObservers.forEach((observer, plot) => {
    if (scope === plot || scope.contains?.(plot)) releaseFiringAxis(plot, observer);
  });
}

expose({ enhanceFiringSchedules, destroyFiringSchedules });
register({
  id: 'firing-schedule-axes',
  enhance: enhanceFiringSchedules,
  cleanup: cleanupFiringSchedules,
});
