import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

export type FilterPanelCommitMode = 'immediate' | 'manual';

interface FilterPanelArtworkProps {
  className?: string;
  commitMode?: FilterPanelCommitMode;
  label: string;
  formAction: string;
  triggerLabel: string;
  dismissLabel: string;
  applyLabel?: string;
  cancelLabel?: string;
  activeFiltersLabel?: string;
  activeFilters?: ReactNode;
  filterGroups?: ReactNode;
  results: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onReset?: () => void;
  onCancel?: () => void;
}

const panelThreshold = 640;

export default function FilterPanelArtwork({
  className = '',
  commitMode = 'immediate',
  label,
  formAction,
  triggerLabel,
  dismissLabel,
  applyLabel = '',
  cancelLabel = '',
  activeFiltersLabel = '',
  activeFilters,
  filterGroups,
  results,
  onSubmit,
  onReset,
  onCancel,
}: FilterPanelArtworkProps) {
  const generatedId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [panelMode, setPanelMode] = useState(true);
  const [open, setOpen] = useState(false);
  const titleId = `filter-panel-title-${generatedId}`;
  const surfaceId = `filter-panel-surface-${generatedId}`;
  const normalizedLabel = label.trim();
  const normalizedAction = formAction.trim();
  const isDrawer = !panelMode;
  const hasManualActions = commitMode === 'manual' && applyLabel.trim() && cancelLabel.trim();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver((entries) => {
      const width = entries[entries.length - 1]?.contentRect.width ?? root.getBoundingClientRect().width;
      setPanelMode(width >= panelThreshold);
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (panelMode) setOpen(false);
  }, [panelMode]);

  useEffect(() => {
    const resultsElement = resultsRef.current;
    if (!isDrawer || !open) {
      if (resultsElement) resultsElement.inert = false;
      return undefined;
    }
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    if (resultsElement) resultsElement.inert = true;
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      if (resultsElement) resultsElement.inert = false;
    };
  }, [isDrawer, open]);

  function closeDrawer({ restore = true } = {}) {
    setOpen(false);
    if (restore) requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function handleSurfaceKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!isDrawer || !open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = Array.from(surfaceRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
    ) ?? []).filter((element) => !element.hidden);
    if (focusable.length === 0) {
      event.preventDefault();
      surfaceRef.current?.focus();
      return;
    }
    const index = focusable.indexOf(document.activeElement as HTMLElement);
    if (event.shiftKey && index <= 0) {
      event.preventDefault();
      focusable[focusable.length - 1]?.focus();
    } else if (!event.shiftKey && index === focusable.length - 1) {
      event.preventDefault();
      focusable[0]?.focus();
    }
  }

  if (!normalizedLabel || !normalizedAction) return null;

  return (
    <div
      ref={rootRef}
      className={[
        'filter-panel',
        `filter-panel--${commitMode}`,
        className.trim() || null,
      ].filter(Boolean).join(' ')}
      data-filter-panel=""
      data-filter-panel-enhanced="true"
      data-commit-mode={commitMode}
      data-surface={panelMode ? 'panel' : 'drawer'}
    >
      <div className="filter-panel__toolbar">
        <button
          ref={triggerRef}
          className="btn filter-panel__trigger"
          type="button"
          aria-haspopup="dialog"
          aria-controls={surfaceId}
          aria-expanded={isDrawer && open}
          data-filter-panel-trigger=""
          hidden={panelMode}
          onClick={() => setOpen(true)}
        >
          <SlidersHorizontal className="btn__icon btn__icon--leading" aria-hidden="true" />
          {triggerLabel}
        </button>
      </div>
      {activeFilters != null && activeFiltersLabel.trim() && (
        <ul className="filter-panel__active" aria-label={activeFiltersLabel.trim()}>
          {activeFilters}
        </ul>
      )}
      <div className="filter-panel__layout">
        <div
          className={['drawer-overlay', 'filter-panel__overlay', isDrawer && open ? 'is-open' : null].filter(Boolean).join(' ')}
          data-filter-panel-overlay=""
          aria-hidden={!isDrawer || !open}
          hidden={!isDrawer || !open}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDrawer();
          }}
        />
        <div
          ref={surfaceRef}
          className={['drawer', 'drawer--left', 'filter-panel__surface', isDrawer && open ? 'is-open' : null].filter(Boolean).join(' ')}
          id={surfaceId}
          data-filter-panel-surface=""
          role={isDrawer ? 'dialog' : undefined}
          aria-modal={isDrawer ? true : undefined}
          aria-labelledby={titleId}
          tabIndex={isDrawer ? -1 : undefined}
          hidden={isDrawer && !open}
          onKeyDown={handleSurfaceKeyDown}
        >
          <header className="drawer__header filter-panel__header">
            <h2 className="drawer__title filter-panel__title" id={titleId}>{normalizedLabel}</h2>
            <button
              ref={closeRef}
              className="close-btn drawer__close filter-panel__close"
              type="button"
              aria-label={dismissLabel}
              data-filter-panel-close=""
              hidden={panelMode}
              onClick={() => closeDrawer()}
            >
              <X className="close-btn__icon" aria-hidden="true" />
            </button>
          </header>
          <form
            className="filter-panel__form"
            action={normalizedAction}
            method="get"
            aria-label={normalizedLabel}
            onSubmit={(event) => {
              onSubmit?.(event);
              if (isDrawer && commitMode === 'manual') closeDrawer({ restore: false });
            }}
            onReset={onReset}
          >
            <div className="drawer__body filter-panel__body">{filterGroups}</div>
            {hasManualActions && (
              <footer className="drawer__footer filter-panel__footer">
                <button
                  className="btn btn--outline filter-panel__cancel"
                  type="button"
                  data-filter-panel-cancel=""
                  onClick={() => {
                    onCancel?.();
                    if (isDrawer) closeDrawer();
                  }}
                >
                  {cancelLabel.trim()}
                </button>
                <button className="btn filter-panel__apply" type="submit">{applyLabel.trim()}</button>
              </footer>
            )}
          </form>
        </div>
        <div ref={resultsRef} className="filter-panel__results">{results}</div>
      </div>
    </div>
  );
}
