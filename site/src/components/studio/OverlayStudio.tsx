import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { getStudioLucideIcon } from './lucideCatalogue';
import ModalArtwork from './ModalArtwork';

interface OverlayStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

function defaultValue(contract: ComponentContract, property: ContractProperty): StudioPropertyValue {
  if ('defaultValue' in property) return property.defaultValue ?? null;
  if (property.type === 'boolean' || property.type === 'slot') return false;
  if (property.type === 'number') return null;
  if (property.type === 'enum') {
    const source = property.valuesFrom === 'variants'
      ? contract.variants
      : property.valuesFrom === 'sizes'
        ? contract.sizes
        : null;
    return source?.find((option) => option.default)?.name ?? property.values?.[0] ?? null;
  }
  return '';
}

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

function variantClass(contract: ComponentContract, value: StudioPropertyValue): string | null {
  return contract.variants.find((option) => option.name === value)?.className?.replace(/^\./, '') ?? null;
}

export default function OverlayStudio({ contract, definition }: OverlayStudioProps) {
  const initialValues = useMemo<StudioPropertyValues>(() => {
    const result = Object.fromEntries((contract.properties ?? []).map((property) => (
      [property.name, defaultValue(contract, property)]
    ))) as StudioPropertyValues;
    Object.assign(result, contract.slug === 'modal'
      ? {
          title: 'Confirm order',
          content: true,
          dismissAction: true,
          dismissLabel: 'Close modal',
          descriptionId: 'studio-modal-description',
          actions: true,
          open: true,
        }
      : {
          title: 'Collection notes',
          content: true,
          dismissAction: true,
          dismissLabel: 'Close drawer',
          footer: true,
          open: true,
        });
    return result;
  }, [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const read = () => {
      const computed = getComputedStyle(document.documentElement);
      setBaseTokenValues(Object.fromEntries(studioTokens.map((token) => (
        [token, computed.getPropertyValue(token).trim()]
      ))));
    };
    const observer = new MutationObserver(read);
    read();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [studioTokens]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };
  const open = values.open === true;
  const CloseIcon = getStudioLucideIcon('x');

  function setOpen(next: boolean) {
    if (next && !open) {
      const activeElement = document.activeElement;
      returnFocusRef.current = activeElement instanceof HTMLElement && activeElement !== document.body
        ? activeElement
        : null;
    }
    setValues((current) => ({ ...current, open: next }));
  }

  useEffect(() => {
    if (contract.slug === 'modal') return undefined;
    if (open) {
      wasOpenRef.current = true;
      const frame = requestAnimationFrame(() => {
        (initialFocusRef.current ?? panelRef.current)?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }

    if (!wasOpenRef.current) return undefined;
    wasOpenRef.current = false;
    const returnTarget = returnFocusRef.current?.isConnected
      ? returnFocusRef.current
      : triggerRef.current;
    returnFocusRef.current = null;
    const frame = requestAnimationFrame(() => returnTarget?.focus());
    return () => cancelAnimationFrame(frame);
  }, [contract.slug, open]);

  function handleDialogKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key !== 'Tab') return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = Array.from(panel.querySelectorAll<HTMLElement>([
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(','))).filter((element) => (
      !element.hidden && element.getAttribute('aria-hidden') !== 'true'
    ));

    if (focusable.length === 0) {
      event.preventDefault();
      panel.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const activeElement = document.activeElement;
    if (event.shiftKey && (activeElement === first || !panel.contains(activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleBackdropClick(event: MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) setOpen(false);
  }

  function reset() {
    setValues({ ...initialValues });
    setTokenOverrides({});
  }

  function renderModal() {
    const title = String(values.title || '').trim();
    if (!title) return null;
    const descriptionId = String(values.descriptionId || '').trim() || undefined;
    const hasActions = values.actions === true;
    return (
      <ModalArtwork
        id="studio-modal"
        title={title}
        open={open}
        dismissLabel={String(values.dismissLabel || 'Close modal')}
        triggerLabel="Open modal"
        descriptionId={descriptionId}
        overlayClassName="docs-studio__preview-modal-overlay"
        className="docs-studio__preview-modal"
        closeIcon={CloseIcon && <CloseIcon className="close-btn__icon" aria-hidden="true" />}
        actions={hasActions ? (
          <>
            <button className="btn btn--outline" type="button" onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn" type="button" onClick={() => setOpen(false)}>Confirm</button>
          </>
        ) : undefined}
        initialFocus={hasActions ? 'first-action' : 'close'}
        onOpenChange={setOpen}
      >
        {values.content !== false && (
          <p id={descriptionId}>Are you sure you want to place this order for <strong>$240.00</strong>?</p>
        )}
      </ModalArtwork>
    );
  }

  function renderDrawer() {
    if (!open) {
      return (
        <button
          ref={triggerRef}
          className="btn"
          type="button"
          aria-haspopup="dialog"
          aria-controls="studio-drawer"
          aria-expanded="false"
          onClick={() => setOpen(true)}
        >
          Open drawer
        </button>
      );
    }
    const placementClass = variantClass(contract, values.placement);
    const title = String(values.title || 'Collection notes');
    return (
      <div
        className="drawer-overlay is-open docs-studio__preview-drawer-overlay"
        aria-hidden="false"
        onClick={handleBackdropClick}
      >
        <aside
          ref={(node) => { panelRef.current = node; }}
          className={['drawer', placementClass, 'is-open', 'docs-studio__preview-drawer'].filter(Boolean).join(' ')}
          id="studio-drawer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="studio-drawer-title"
          tabIndex={-1}
          onKeyDown={handleDialogKeyDown}
        >
          <div className="drawer__header">
            <h2 className="drawer__title" id="studio-drawer-title">{title}</h2>
            {values.dismissAction !== false && (
              <button
                ref={initialFocusRef}
                className="close-btn drawer__close"
                type="button"
                aria-label={String(values.dismissLabel || 'Close drawer')}
                onClick={() => setOpen(false)}
              >
                {CloseIcon && <CloseIcon className="close-btn__icon" aria-hidden="true" />}
              </button>
            )}
          </div>
          {values.content !== false && (
            <div className="drawer__body">
              <p>This vessel was formed in three stages and fired at high temperature.</p>
            </div>
          )}
          {values.footer === true && (
            <div className="drawer__footer">
              <button className="btn btn--full" type="button" onClick={() => setOpen(false)}>Done</button>
            </div>
          )}
        </aside>
      </div>
    );
  }

  const activeTokens: Record<string, string | null> = contract.slug === 'modal'
    ? {
        surface: '--color-surface-primary',
        divider: '--color-border-subtle',
        title: '--color-text-primary',
        radius: '--radius-lg',
        shadow: '--shadow-2xl',
        'overlay-opacity': '--opacity-overlay',
        'title-size': '--typo-h3-size',
        'title-line-height': '--typo-h3-line-height',
        'title-family': '--font-family-body',
        'body-padding': '--space-layout-element-gap',
      }
    : {
        surface: '--color-surface-primary',
        divider: '--color-border-subtle',
        title: '--color-text-primary',
        shadow: '--shadow-2xl',
        'overlay-opacity': '--opacity-overlay',
        'title-size': '--typo-h4-size',
        'title-line-height': '--typo-h4-line-height',
        'title-family': '--font-family-body',
        padding: '--space-layout-element-gap',
      };

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector
          definition={definition}
          contract={contract}
          values={values}
          slotIconValues={emptySlotIcons}
          stateValue={open ? 'open' : 'closed'}
          tokenValues={tokenValues}
          activeTokens={activeTokens}
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={() => undefined}
          onStateChange={(next) => setOpen(next === 'open')}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />

        <section
          className="docs-studio__stage docs-studio__stage--overlay"
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className="docs-studio__stage-inner">
            {contract.slug === 'modal' ? renderModal() : renderDrawer()}
          </div>
        </section>
      </div>
    </div>
  );
}
