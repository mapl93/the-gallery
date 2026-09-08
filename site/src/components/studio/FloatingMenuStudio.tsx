import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { ChevronDown, Copy, Pencil, Trash2 } from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface FloatingMenuStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

interface MenuFixtureItem {
  label: string;
  icon: typeof Copy;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
}

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

function initialFixtureValues(contract: ComponentContract): StudioPropertyValues {
  const values = Object.fromEntries((contract.properties ?? []).map((property) => (
    [property.name, defaultValue(contract, property)]
  ))) as StudioPropertyValues;
  if ('open' in values) values.open = true;
  if (contract.slug === 'dropdown-menu') values.itemVariant = 'danger';
  return values;
}

export default function FloatingMenuStudio({ contract, definition }: FloatingMenuStudioProps) {
  const initialValues = useMemo(() => initialFixtureValues(contract), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [highlightedItem, setHighlightedItem] = useState(0);
  const [contextPosition, setContextPosition] = useState<{ left: number; top: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const contextAnchorRef = useRef<HTMLDivElement | null>(null);
  const popoverId = useId();
  const dropdownTriggerId = useId();
  const dropdownMenuId = useId();
  const dropdownGroupLabelId = useId();
  const contextTriggerId = useId();
  const contextMenuId = useId();
  const contextGroupLabelId = useId();

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

  function setOpen(next: boolean) {
    setValues((current) => ({ ...current, open: next }));
    if (next) setHighlightedItem(0);
  }

  useEffect(() => {
    if (!open || !['popover', 'popup', 'dropdown-menu', 'context-menu'].includes(contract.slug)) return undefined;
    const dismissOutside = (event: globalThis.PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || surfaceRef.current?.contains(target)) return;
      setValues((current) => ({ ...current, open: false }));
    };
    document.addEventListener('pointerdown', dismissOutside, true);
    return () => document.removeEventListener('pointerdown', dismissOutside, true);
  }, [contract.slug, open]);

  useEffect(() => {
    if (!open || contract.slug !== 'context-menu') return undefined;
    const dismissForViewportChange = () => {
      setValues((current) => ({ ...current, open: false }));
      requestAnimationFrame(() => triggerRef.current?.focus());
    };
    window.addEventListener('resize', dismissForViewportChange);
    window.addEventListener('scroll', dismissForViewportChange, true);
    return () => {
      window.removeEventListener('resize', dismissForViewportChange);
      window.removeEventListener('scroll', dismissForViewportChange, true);
    };
  }, [contract.slug, open]);

  useEffect(() => {
    if (!open || contract.slug !== 'context-menu' || contextPosition) return undefined;
    const frame = requestAnimationFrame(() => {
      const trigger = triggerRef.current?.getBoundingClientRect();
      if (trigger) positionContextMenu(trigger.left, trigger.bottom + 4);
    });
    return () => cancelAnimationFrame(frame);
  }, [contract.slug, contextPosition, open]);

  function closeAndRestoreFocus() {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function menuItems(): HTMLButtonElement[] {
    return Array.from(surfaceRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? []);
  }

  function focusMenuItem(index: number) {
    const items = menuItems();
    if (!items.length) return;
    const next = (index + items.length) % items.length;
    setHighlightedItem(next);
    requestAnimationFrame(() => items[next]?.focus());
  }

  function openMenu(index: number) {
    setOpen(true);
    requestAnimationFrame(() => focusMenuItem(index));
  }

  function positionContextMenu(clientX: number, clientY: number) {
    const anchor = contextAnchorRef.current;
    const surface = surfaceRef.current;
    if (!anchor || !surface) return;
    const bounds = anchor.getBoundingClientRect();
    const trigger = triggerRef.current?.getBoundingClientRect();
    const invocationX = Number.isFinite(clientX) ? clientX : trigger?.left ?? bounds.left;
    const invocationY = Number.isFinite(clientY) ? clientY : trigger?.bottom ?? bounds.top;
    const inset = 8;
    const left = Math.min(
      Math.max(invocationX - bounds.left, inset),
      Math.max(inset, bounds.width - surface.offsetWidth - inset),
    );
    const top = Math.min(
      Math.max(invocationY - bounds.top, inset),
      Math.max(inset, bounds.height - surface.offsetHeight - inset),
    );
    setContextPosition({ left, top });
  }

  function openContextMenuAt(clientX: number, clientY: number) {
    setOpen(true);
    requestAnimationFrame(() => {
      positionContextMenu(clientX, clientY);
      focusMenuItem(0);
    });
  }

  function moveFocusFromMenu(reverse: boolean) {
    const focusableSelector = [
      'a[href]',
      'button:not(:disabled)',
      'input:not(:disabled)',
      'select:not(:disabled)',
      'textarea:not(:disabled)',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');
    const focusables = Array.from(document.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => (
      !surfaceRef.current?.contains(element)
      && element.getClientRects().length > 0
      && element.getAttribute('aria-hidden') !== 'true'
    ));
    const triggerIndex = triggerRef.current ? focusables.indexOf(triggerRef.current) : -1;
    const fallbackIndex = reverse ? focusables.length - 1 : 0;
    const nextIndex = triggerIndex < 0
      ? fallbackIndex
      : (triggerIndex + (reverse ? -1 : 1) + focusables.length) % focusables.length;
    const next = focusables[nextIndex];
    setOpen(false);
    requestAnimationFrame(() => next?.focus());
  }

  function reset() {
    setValues({ ...initialValues });
    setHighlightedItem(0);
    setContextPosition(null);
    setTokenOverrides({});
  }

  function menuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const items = menuItems();
    const itemCount = items.length;
    if (!itemCount) return;
    const focusedIndex = items.indexOf(document.activeElement as HTMLButtonElement);
    const current = focusedIndex >= 0 ? focusedIndex : highlightedItem;
    let next = current;
    if (event.key === 'ArrowDown') next = (current + 1) % itemCount;
    else if (event.key === 'ArrowUp') next = (current - 1 + itemCount) % itemCount;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = itemCount - 1;
    else if (event.key === 'Escape') {
      event.preventDefault();
      closeAndRestoreFocus();
      return;
    } else if (event.key === 'Tab') {
      event.preventDefault();
      moveFocusFromMenu(event.shiftKey);
      return;
    } else if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
      const query = event.key.toLocaleLowerCase();
      const ordered = [...items.slice(current + 1), ...items.slice(0, current + 1)];
      const match = ordered.find((item) => item.textContent?.trim().toLocaleLowerCase().startsWith(query));
      if (!match) return;
      next = items.indexOf(match);
    } else return;
    event.preventDefault();
    focusMenuItem(next);
  }

  function renderMenuItems(context = false, group: 'all' | 'primary' | 'danger' = 'all') {
    const items: MenuFixtureItem[] = context
      ? [
          { label: 'Copy reference', icon: Copy },
          { label: 'Edit record', icon: Pencil },
          { label: 'Export record', icon: Copy, disabled: true },
          { label: 'Remove record', icon: Trash2, danger: true },
        ]
      : [
          { label: 'Edit artwork', icon: Pencil, shortcut: 'E' },
          { label: 'Duplicate', icon: Copy, shortcut: 'D' },
          { label: 'Export certificate', icon: Copy, disabled: true },
          { label: 'Delete', icon: Trash2, shortcut: 'Del', danger: true },
        ];

    return items.map((item, index) => ({ item, index })).filter(({ item }) => (
      group === 'all' || (group === 'danger' ? item.danger : !item.danger)
    )).map(({ item, index }) => {
      const Icon = item.icon;
      const danger = item.danger && (context || values.itemVariant === 'danger');
      return (
        <button
          className={`dropdown__item${danger ? ' dropdown__item--danger' : ''}`}
          type="button"
          role="menuitem"
          key={item.label}
          tabIndex={highlightedItem === index ? 0 : -1}
          aria-disabled={item.disabled || undefined}
          data-disabled={item.disabled || undefined}
          data-highlighted={highlightedItem === index || undefined}
          onPointerMove={() => setHighlightedItem(index)}
          onFocus={() => setHighlightedItem(index)}
          onClick={(event) => {
            if (item.disabled) {
              event.preventDefault();
              return;
            }
            closeAndRestoreFocus();
          }}
        >
          <Icon className="dropdown__item-icon" aria-hidden="true" />
          <span>{item.label}</span>
          {item.shortcut && <span className="dropdown__item-shortcut">{item.shortcut}</span>}
        </button>
      );
    });
  }

  function renderPreview() {
    if (contract.slug === 'popover' || contract.slug === 'popup') {
      const dimensionFields = [
        ['Width', '100%'],
        ['Max. width', '300px'],
        ['Height', '25px'],
        ['Max. height', 'none'],
      ] as const;
      return (
        <div className="docs-studio__floating-anchor">
          <button
            className="btn btn--outline"
            type="button"
            ref={triggerRef}
            aria-expanded={open}
            aria-controls={popoverId}
            onClick={() => setOpen(!open)}
            onKeyDown={(event) => {
              if (event.key !== 'Escape' || !open) return;
              event.preventDefault();
              closeAndRestoreFocus();
            }}
          >
            Open popover
          </button>
          <div
            className={`popover docs-studio__preview-popover${open ? ' popover--open' : ''}`}
            id={popoverId}
            ref={surfaceRef}
            aria-hidden={!open}
            hidden={!open}
            onKeyDown={(event) => {
              if (event.key !== 'Escape') return;
              event.preventDefault();
              closeAndRestoreFocus();
            }}
          >
            {values.showArrow !== false && <div className="popover__arrow" aria-hidden="true" />}
            <p className="popover__title">Dimensions</p>
            <div className="popover__content">
              <p className="docs-studio__popover-description">Set the dimensions for the layer.</p>
              <div className="docs-studio__popover-fields">
                {dimensionFields.map(([label, value], index) => {
                  const fieldId = `${popoverId}-dimension-${index}`;
                  return (
                    <div className="docs-studio__popover-field" key={label}>
                      <label htmlFor={fieldId}>{label}</label>
                      <input className="input__field docs-studio__popover-input" id={fieldId} defaultValue={value} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (contract.slug === 'dropdown-menu') {
      return (
        <div className="docs-studio__floating-menu-anchor">
          <div className={`dropdown docs-studio__preview-dropdown${open ? ' dropdown--open' : ''}`}>
            <button
              className="btn btn--outline"
              type="button"
              id={dropdownTriggerId}
              ref={triggerRef}
              aria-haspopup="menu"
              aria-expanded={open}
              aria-controls={dropdownMenuId}
              onClick={() => (open ? setOpen(false) : openMenu(0))}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  openMenu(0);
                } else if (event.key === 'ArrowUp') {
                  event.preventDefault();
                  openMenu(-1);
                } else if (event.key === 'Escape' && open) {
                  event.preventDefault();
                  closeAndRestoreFocus();
                }
              }}
            >
              Actions
              <ChevronDown className="btn__icon btn__icon--trailing" aria-hidden="true" />
            </button>
            <div
              className="dropdown__menu"
              id={dropdownMenuId}
              ref={surfaceRef}
              role="menu"
              aria-labelledby={dropdownTriggerId}
              aria-hidden={!open}
              onKeyDown={menuKeyDown}
            >
              <div className="dropdown__group" role="group" aria-labelledby={dropdownGroupLabelId}>
                <div className="dropdown__label" id={dropdownGroupLabelId}>Artwork</div>
                {renderMenuItems(false, 'primary')}
              </div>
              <div className="dropdown__separator" role="separator" />
              <div className="dropdown__group" role="group" aria-label="Destructive actions">
                {renderMenuItems(false, 'danger')}
              </div>
            </div>
          </div>
        </div>
      );
    }

    function openContextMenu(event: MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
      openContextMenuAt(event.clientX, event.clientY);
    }

    return (
      <div className="docs-studio__context-anchor" ref={contextAnchorRef}>
        <button
          className="btn btn--outline"
          type="button"
          id={contextTriggerId}
          ref={triggerRef}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={contextMenuId}
          onContextMenu={openContextMenu}
          onClick={(event) => {
            if (open) {
              closeAndRestoreFocus();
              return;
            }
            const rect = event.currentTarget.getBoundingClientRect();
            openContextMenuAt(rect.left, rect.bottom + 4);
          }}
          onKeyDown={(event) => {
            if ((event.shiftKey && event.key === 'F10') || event.key === 'ContextMenu') {
              event.preventDefault();
              const rect = event.currentTarget.getBoundingClientRect();
              openContextMenuAt(rect.left, rect.bottom + 4);
            } else if (event.key === 'ArrowDown') {
              event.preventDefault();
              const rect = event.currentTarget.getBoundingClientRect();
              openContextMenuAt(rect.left, rect.bottom + 4);
            } else if (event.key === 'Escape' && open) {
              event.preventDefault();
              closeAndRestoreFocus();
            }
          }}
        >
          Artwork actions
        </button>
        <div
          className={`context-menu docs-studio__preview-context-menu${open ? ' context-menu--open' : ''}`}
          id={contextMenuId}
          ref={surfaceRef}
          role="menu"
          aria-labelledby={contextTriggerId}
          aria-hidden={!open}
          style={contextPosition ? { left: contextPosition.left, top: contextPosition.top } : undefined}
          onKeyDown={menuKeyDown}
        >
          <div className="dropdown__group" role="group" aria-labelledby={contextGroupLabelId}>
            <div className="dropdown__label" id={contextGroupLabelId}>Artwork</div>
            {renderMenuItems(true, 'primary')}
          </div>
          <div className="dropdown__separator" role="separator" />
          <div className="dropdown__group" role="group" aria-label="Destructive actions">
            {renderMenuItems(true, 'danger')}
          </div>
        </div>
      </div>
    );
  }

  const activeTokens: Record<string, string | null> = {
    surface: '--color-surface-primary',
    border: '--color-border-subtle',
    focus: ['dropdown-menu', 'context-menu'].includes(contract.slug) ? '--color-border-focus' : null,
    text: '--color-text-primary',
    secondary: '--color-text-secondary',
    hover: ['dropdown-menu', 'context-menu'].includes(contract.slug) ? '--color-surface-secondary' : null,
    disabled: ['dropdown-menu', 'context-menu'].includes(contract.slug) ? '--color-text-disabled' : null,
    danger: ['dropdown-menu', 'context-menu'].includes(contract.slug) ? '--color-feedback-error-default' : null,
    radius: '--radius-md',
    shadow: '--shadow-lg',
    'body-size': '--typo-body-size',
    'body-small': ['popover', 'popup'].includes(contract.slug) ? '--typo-body-sm-size' : null,
    caption: ['dropdown-menu', 'context-menu'].includes(contract.slug) ? '--typo-caption-size' : null,
    spacing: '--space-layout-element-gap',
    'touch-target': ['dropdown-menu', 'context-menu'].includes(contract.slug) ? '--space-layout-touch-target' : null,
    transition: '--transition-fast',
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
          stateValue="default"
          tokenValues={tokenValues}
          activeTokens={activeTokens}
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />

        <section
          className="docs-studio__stage docs-studio__stage--floating"
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className="docs-studio__stage-inner">{renderPreview()}</div>
        </section>
      </div>
    </div>
  );
}
