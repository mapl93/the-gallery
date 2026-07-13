import { useState, useRef, useCallback, useEffect, useId } from 'react';
import previewBundleCss from '../styles/preview-bundle.css?inline';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatHtml(html: string): string {
  const selfClosing = new Set(['br','hr','img','input','meta','link','area','base','col','embed','source','track','wbr']);
  let result = '';
  let indent = 0;
  const raw = html.replace(/\s*\n\s*/g, ' ').trim();
  const tokens = raw.split(/(<[^>]+>)/).filter(Boolean);
  for (const token of tokens) {
    if (token.startsWith('</')) {
      indent = Math.max(0, indent - 1);
      result += '  '.repeat(indent) + token + '\n';
    } else if (token.startsWith('<')) {
      result += '  '.repeat(indent) + token + '\n';
      const tag = token.replace(/<\/?/, '').split(/[\s>/]/)[0].toLowerCase();
      if (!token.endsWith('/>') && !selfClosing.has(tag)) {
        indent++;
      }
    } else {
      const text = token.trim();
      if (text) {
        result += '  '.repeat(indent) + text + '\n';
      }
    }
  }
  return result.trimEnd();
}

export interface Interaction {
  /** Selector for the element(s) to toggle */
  selector: string;
  /** CSS class to toggle, or 'attr:name=value' for attributes */
  toggle: string;
  /** Button label */
  triggerLabel: string;
  /** If true, start in the "on" state */
  startVisible?: boolean;
  /** Selector inside the preview that toggles the interactive state */
  triggerSelector?: string;
  /** Selector inside the preview that closes the interactive state */
  closeSelector?: string;
  /** Selector that closes only when the event target itself matches it */
  dismissSelector?: string;
}

function getDomInteraction(root: HTMLElement): Interaction | undefined {
  const configEl = root.querySelector<HTMLElement>('[data-preview-selector][data-preview-toggle]');
  if (!configEl) return undefined;

  return {
    selector: configEl.dataset.previewSelector ?? '',
    toggle: configEl.dataset.previewToggle ?? '',
    triggerLabel: configEl.dataset.previewTriggerLabel ?? 'Toggle preview',
    startVisible: configEl.dataset.previewStartVisible === 'true',
    triggerSelector: configEl.dataset.previewTriggerSelector,
    closeSelector: configEl.dataset.previewCloseSelector,
    dismissSelector: configEl.dataset.previewDismissSelector,
  };
}

interface Props {
  html: string;
  label?: string;
  interaction?: Interaction;
  layout?: 'default' | 'anchored' | 'overlay';
}

const previewHostCss = `${previewBundleCss}

:host {
  display: block;
  width: 100%;
}

.tg-preview-root {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-start;
  width: 100%;
  position: relative;
  isolation: isolate;
  transform: translateZ(0);
  color: var(--color-text-primary);
  font-family: var(--font-family-body);
  font-size: var(--typo-body-size);
  line-height: var(--typo-body-line-height);
}

.tg-preview-root > :only-child {
  max-width: 100%;
  margin-inline: auto;
}

.tg-preview-frame {
  width: min(100%, 960px);
  margin: 0 auto;
}

.tg-preview-frame--sm {
  width: min(100%, 360px);
}

.tg-preview-frame--md {
  width: min(100%, 520px);
}

.tg-preview-frame--lg {
  width: min(100%, 720px);
}

.tg-preview-collection-grid {
  padding: var(--space-layout-element-gap);
}

.tg-preview-cart-page {
  grid-template-columns: minmax(0, 1fr) !important;
  padding: var(--space-layout-element-gap);
}

.tg-preview-cart-page .cart-summary {
  position: static;
}

.tg-preview-stage {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.tg-preview-stage--overlay {
  display: grid;
  place-items: center;
  min-height: 320px;
  background: color-mix(in srgb, var(--color-text-primary) 12%, transparent);
}

.tg-preview-stage--tall {
  min-height: 420px;
}

.tg-preview-overlay-layer {
  position: absolute !important;
  inset: 0 !important;
}

.tg-preview-drawer-layer {
  position: absolute !important;
  top: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: min(400px, 100%) !important;
  height: auto !important;
}

.tg-preview-floating-notice {
  position: absolute !important;
  top: 24px !important;
  right: 16px !important;
  bottom: auto !important;
  width: min(380px, calc(100% - 32px));
}

.tg-preview-bottom-layer {
  position: absolute !important;
  right: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
}

.tg-preview-bottom-left-notice {
  position: absolute !important;
  right: 16px !important;
  bottom: 16px !important;
  left: 16px !important;
  width: auto;
  max-width: 380px;
}

.tg-preview-contained-cookie {
  padding: 16px 24px !important;
}

.tg-preview-contained-cookie .cookie-banner__inner {
  flex-direction: column;
  text-align: center;
}

.tg-preview-menu-layer {
  position: absolute !important;
  top: 24px !important;
  right: 24px !important;
  bottom: 24px !important;
  left: 24px !important;
  max-height: calc(100% - 48px);
  overflow-y: auto;
}

.tg-preview-anchor-stage {
  position: relative;
  display: inline-block;
  min-width: min(100%, 240px);
}

.tg-preview-anchor-stage--field {
  width: min(100%, 320px);
  padding-bottom: 92px;
}

.tg-preview-anchor-stage--menu {
  padding-bottom: 160px;
}

.tg-preview-anchor-stage--popover {
  padding-bottom: 128px;
}

.tg-preview-anchor-stage--calendar {
  width: min(100%, 360px);
  padding-bottom: 340px;
}

.tg-preview-anchor-stage--field .combobox__listbox {
  top: 50px;
}

.tg-preview-anchor-stage--menu .dropdown__menu {
  top: 46px;
}

.tg-preview-anchor-stage--calendar .datepicker__calendar {
  top: 50px;
}

.tg-preview-anchor-popover {
  top: calc(100% - 120px) !important;
  left: 0 !important;
}

.tg-preview-context-stage {
  position: relative;
  display: grid;
  place-items: start center;
  width: min(100%, 320px);
  min-height: 220px;
}

.tg-preview-context-layer {
  position: absolute !important;
  top: 72px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
}

.tg-preview-stage--overlay [data-preview-trigger][aria-expanded="true"],
[data-preview-trigger][hidden] {
  display: none !important;
}

.tg-preview-surface {
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.tg-preview-pad {
  padding: 24px;
}

.tg-preview-grid {
  display: grid;
  gap: 16px;
}

.tg-preview-grid--2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.tg-preview-grid--3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.tg-preview-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tg-preview-radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: min(100%, 360px);
  min-width: 0;
  margin: 0 auto;
  padding: 0;
  border: 0;
}

.tg-preview-radio-group > legend {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.tg-preview-inline {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tg-preview-inline--spread {
  justify-content: space-between;
}

.tg-preview-bottom-nav {
  position: relative;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.tg-preview-swatch--clay { background: #c4a882; }
.tg-preview-swatch--sage { background: #5a7d6f; }
.tg-preview-swatch--ink { background: #2c3e50; }

.tg-preview-range-fill--middle {
  left: 20%;
  width: 60%;
}

.tg-preview-media {
  display: block;
  width: 100%;
  background:
    radial-gradient(circle at 18% 20%, rgba(255,255,255,0.55), transparent 30%),
    linear-gradient(135deg, #f4eadf 0%, #d9c1a5 52%, #8f694f 100%);
}

.tg-preview-media--square {
  aspect-ratio: 1;
}

.tg-preview-media--portrait {
  aspect-ratio: 4 / 5;
}

.tg-preview-media--landscape {
  aspect-ratio: 4 / 3;
}

.tg-preview-media--wide {
  aspect-ratio: 16 / 9;
}

.tg-preview-media--thumb {
  aspect-ratio: 1;
}

.tg-preview-media--avatar {
  aspect-ratio: 1;
  border-radius: var(--radius-sm);
}

.tg-preview-card {
  width: min(100%, 320px);
}

.tg-preview-card-media {
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 10;
  background: #e5e5e5;
}

.tg-preview-card-media::before {
  content: "";
  display: block;
  width: 72px;
  height: 96px;
  border: 1px solid #a3a3a3;
  border-radius: 44% 44% 28% 28%;
  background: #fafafa;
  box-shadow: inset 0 -16px 0 #d4d4d4;
}

.tg-preview-carousel {
  width: min(100%, 400px);
}

.tg-preview-carousel-slide {
  display: grid;
  place-items: end start;
  width: 100%;
  min-width: 100%;
  height: 250px;
  padding: 20px;
  background: #c7d4ce;
  color: #171717;
  font-weight: 600;
}

.tg-preview-scroll-area {
  width: min(100%, 320px);
  height: 160px;
  padding: 16px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
}

.tg-preview-lightbox-artwork {
  display: block;
  width: min(60vw, 400px);
  height: min(45vh, 300px);
  background:
    radial-gradient(ellipse at 50% 68%, #9ca3af 0 18%, transparent 19%),
    radial-gradient(ellipse at 50% 48%, #e5e7eb 0 21%, transparent 22%),
    linear-gradient(135deg, #d9d4c7, #768a82);
}

.tg-preview-text-center {
  text-align: center;
}

.tg-preview-note {
  color: var(--color-text-secondary);
  font-size: calc(var(--typo-body-size) * 0.875);
}

.tg-preview-static {
  position: static !important;
  inset: auto !important;
  transform: none !important;
}

.tg-preview-w-25 { width: 25%; }
.tg-preview-w-50 { width: 50%; }
.tg-preview-w-70 { width: 70%; }
.tg-preview-w-100 { width: 100%; }

.tg-preview-badge-pin {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
}

.tg-preview-skeleton-circle {
  width: 48px;
  height: 48px;
}

.tg-preview-line {
  width: 320px;
  max-width: 100%;
}

@media (max-width: 767px) {
  .tg-preview-grid--2,
  .tg-preview-grid--3 {
    grid-template-columns: 1fr;
  }
}
`;

export default function ComponentPreview({
  html,
  label = 'Preview',
  interaction,
  layout = 'default',
}: Props) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [active, setActive] = useState(interaction?.startVisible ?? false);
  const hostRef = useRef<HTMLDivElement>(null);
  const previewRootRef = useRef<HTMLDivElement | null>(null);
  const resolvedInteractionRef = useRef<Interaction | undefined>(interaction);
  const id = useId();

  const applyInteractionState = useCallback((next: boolean) => {
    const currentInteraction = resolvedInteractionRef.current ?? interaction;
    if (!currentInteraction || !previewRootRef.current) return;

    const els = previewRootRef.current.querySelectorAll(currentInteraction.selector);
    els.forEach((el) => {
      if (currentInteraction.toggle.startsWith('attr:')) {
        const [attr, val] = currentInteraction.toggle.slice(5).split('=');
        if (next) {
          el.setAttribute(attr, val ?? '');
        } else if (attr === 'aria-hidden' && val === 'false') {
          el.setAttribute(attr, 'true');
        } else {
          el.removeAttribute(attr);
        }
        return;
      }

      el.classList.toggle(currentInteraction.toggle, next);
    });

    const triggerSelector = currentInteraction.triggerSelector ?? '[data-preview-trigger]';
    previewRootRef.current.querySelectorAll(triggerSelector).forEach((el) => {
      el.setAttribute('aria-expanded', String(next));
      if (layout === 'overlay') {
        el.toggleAttribute('hidden', next);
      }
    });
  }, [interaction, layout]);

  useEffect(() => {
    if (!hostRef.current) return;

    const shadowRoot = hostRef.current.shadowRoot ?? hostRef.current.attachShadow({ mode: 'open' });
    const styleEl = document.createElement('style');
    const rootEl = document.createElement('div');

    styleEl.textContent = previewHostCss;
    rootEl.className = 'tg-preview-root';
    rootEl.innerHTML = html;
    window.TheGallery?.enhanceSelects(rootEl);
    window.TheGallery?.enhanceTextareas(rootEl);
    window.TheGallery?.enhanceCheckboxes(rootEl);
    window.TheGallery?.enhanceQuantities(rootEl);
    window.TheGallery?.enhanceToggleGroups(rootEl);

    const currentInteraction = getDomInteraction(rootEl) ?? interaction;
    resolvedInteractionRef.current = currentInteraction;

    const closeSelector = currentInteraction?.closeSelector
      ?? '[data-preview-close], .drawer__close, .modal__close, .toast__close, .popup__close, .lightbox__close, .size-chart__close, .social-proof__close, [aria-label="Close"], [aria-label="Dismiss"]';
    const triggerSelector = currentInteraction?.triggerSelector ?? '[data-preview-trigger]';

    const handleTriggerClick = (event: Event) => {
      if (!resolvedInteractionRef.current) return;
      event.preventDefault();
      setActive((current) => !current);
    };

    const handleCloseClick = (event: Event) => {
      if (!resolvedInteractionRef.current) return;
      event.preventDefault();
      setActive(false);
    };

    const handlePreviewClick = (event: MouseEvent) => {
      const currentResolvedInteraction = resolvedInteractionRef.current;
      if (!currentResolvedInteraction?.dismissSelector) return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target.matches(currentResolvedInteraction.dismissSelector)) {
        event.preventDefault();
        setActive(false);
      }
    };

    const handlePreviewKeyDown = (event: KeyboardEvent) => {
      if (!resolvedInteractionRef.current || event.key !== 'Escape') return;
      setActive(false);
    };

    const triggerEls = currentInteraction ? Array.from(rootEl.querySelectorAll(triggerSelector)) : [];
    const closeEls = currentInteraction ? Array.from(rootEl.querySelectorAll(closeSelector)) : [];

    triggerEls.forEach((el) => el.addEventListener('click', handleTriggerClick));
    closeEls.forEach((el) => el.addEventListener('click', handleCloseClick));
    rootEl.addEventListener('click', handlePreviewClick);
    rootEl.addEventListener('keydown', handlePreviewKeyDown);
    shadowRoot.replaceChildren(styleEl, rootEl);
    previewRootRef.current = rootEl;

    return () => {
      triggerEls.forEach((el) => el.removeEventListener('click', handleTriggerClick));
      closeEls.forEach((el) => el.removeEventListener('click', handleCloseClick));
      rootEl.removeEventListener('click', handlePreviewClick);
      rootEl.removeEventListener('keydown', handlePreviewKeyDown);
      previewRootRef.current = null;
      resolvedInteractionRef.current = interaction;
    };
  }, [html, interaction]);

  useEffect(() => {
    applyInteractionState(active);
  }, [active, applyInteractionState, html]);

  return (
    <div className={`docs-preview${layout === 'overlay' ? ' docs-preview--overlay' : ''}${layout === 'anchored' ? ' docs-preview--anchored' : ''}`}>
      <div className="docs-preview__toolbar">
        <span>{label}</span>
        <div className="docs-preview__toolbar-tabs">
          <button
            className={`docs-preview__tab${tab === 'preview' ? ' is-active' : ''}`}
            onClick={() => setTab('preview')}
          >
            Preview
          </button>
          <button
            className={`docs-preview__tab${tab === 'code' ? ' is-active' : ''}`}
            onClick={() => setTab('code')}
          >
            Code
          </button>
        </div>
      </div>
      <div
        className="docs-preview__canvas"
        id={`${id}-canvas`}
        style={{ display: tab === 'preview' ? undefined : 'none' }}
      >
        <div
          ref={hostRef}
          className="docs-preview__shadow-host"
        />
      </div>
      <div
        className={`docs-preview__code${tab === 'code' ? ' is-visible' : ''}`}
        id={`${id}-code`}
      >
        <code dangerouslySetInnerHTML={{ __html: escapeHtml(formatHtml(html)) }} />
      </div>
    </div>
  );
}
