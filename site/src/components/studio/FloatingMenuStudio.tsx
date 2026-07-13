import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react';
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
  const menuItemRefs = useRef<Array<HTMLButtonElement | null>>([]);

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

  function reset() {
    setValues({ ...initialValues });
    setHighlightedItem(0);
    setTokenOverrides({});
  }

  function menuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const itemCount = menuItemRefs.current.length;
    if (!itemCount) return;
    let next = highlightedItem;
    if (event.key === 'ArrowDown') next = (highlightedItem + 1) % itemCount;
    else if (event.key === 'ArrowUp') next = (highlightedItem - 1 + itemCount) % itemCount;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = itemCount - 1;
    else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    } else return;
    event.preventDefault();
    setHighlightedItem(next);
    menuItemRefs.current[next]?.focus();
  }

  function renderMenuItems(context = false) {
    const items: MenuFixtureItem[] = context
      ? [
          { label: 'Copy reference', icon: Copy },
          { label: 'Edit record', icon: Pencil },
          { label: 'Remove record', icon: Trash2, danger: true },
        ]
      : [
          { label: 'Edit artwork', icon: Pencil, shortcut: 'E' },
          { label: 'Duplicate', icon: Copy, shortcut: 'D' },
          { label: 'Delete', icon: Trash2, shortcut: 'Del', danger: true },
        ];

    return items.map((item, index) => {
      const Icon = item.icon;
      const danger = item.danger && (context || values.itemVariant === 'danger');
      return (
        <button
          className={`dropdown__item${danger ? ' dropdown__item--danger' : ''}`}
          type="button"
          role="menuitem"
          key={item.label}
          ref={(element) => { menuItemRefs.current[index] = element; }}
          data-highlighted={highlightedItem === index || undefined}
          onPointerMove={() => setHighlightedItem(index)}
          onClick={() => setOpen(false)}
        >
          <Icon className="dropdown__item-icon" aria-hidden="true" />
          <span>{item.label}</span>
          {item.shortcut && <span className="dropdown__item-shortcut">{item.shortcut}</span>}
        </button>
      );
    });
  }

  function renderPreview() {
    if (contract.slug === 'popover') {
      return (
        <div className="docs-studio__floating-anchor">
          <button
            className="btn btn--outline"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="studio-popover"
            onClick={() => setOpen(!open)}
          >
            Artwork details
          </button>
          <div
            className={`popover docs-studio__preview-popover${open ? ' popover--open' : ''}`}
            id="studio-popover"
            role="dialog"
            aria-label="Artwork details"
          >
            <div className="popover__arrow" aria-hidden="true" />
            <p className="popover__title">Stoneware vessel</p>
            <div className="popover__content">Hand-thrown and finished with a satin celadon glaze.</div>
          </div>
        </div>
      );
    }

    if (contract.slug === 'hover-card') {
      return (
        <div className="hover-card docs-studio__preview-hover-card docs-studio__preview-hover-card--open">
          <a className="link" href="#studio-artist" onClick={(event) => event.preventDefault()}>View artist</a>
          <div className="hover-card__content">
            <strong>Lucia Ferrer</strong>
            <p>Clay studies shaped by coastal geology and quiet repetition.</p>
          </div>
        </div>
      );
    }

    if (contract.slug === 'dropdown-menu') {
      return (
        <div className={`dropdown docs-studio__preview-dropdown${open ? ' dropdown--open' : ''}`}>
          <button
            className="btn btn--outline"
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls="studio-dropdown-menu"
            onClick={() => setOpen(!open)}
          >
            Actions
            <ChevronDown className="btn__icon btn__icon--trailing" aria-hidden="true" />
          </button>
          <div
            className="dropdown__menu"
            id="studio-dropdown-menu"
            role="menu"
            aria-label="Artwork actions"
            onKeyDown={menuKeyDown}
          >
            <div className="dropdown__label">Artwork</div>
            {renderMenuItems()}
          </div>
        </div>
      );
    }

    function openContextMenu(event: MouseEvent<HTMLElement>) {
      event.preventDefault();
      setOpen(true);
    }

    return (
      <div className="docs-studio__context-anchor" onContextMenu={openContextMenu}>
        <button
          className="btn btn--outline"
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls="studio-context-menu"
          onClick={() => setOpen(!open)}
        >
          Artwork actions
        </button>
        <div
          className={`context-menu docs-studio__preview-context-menu${open ? ' context-menu--open' : ''}`}
          id="studio-context-menu"
          role="menu"
          aria-label="Artwork context actions"
          onKeyDown={menuKeyDown}
        >
          {renderMenuItems(true)}
        </div>
      </div>
    );
  }

  const activeTokens: Record<string, string | null> = {
    surface: '--color-surface-primary',
    border: '--color-border-subtle',
    text: '--color-text-primary',
    secondary: contract.slug === 'hover-card' ? null : '--color-text-secondary',
    hover: ['dropdown-menu', 'context-menu'].includes(contract.slug) ? '--color-surface-secondary' : null,
    disabled: ['dropdown-menu', 'context-menu'].includes(contract.slug) ? '--color-text-disabled' : null,
    danger: ['dropdown-menu', 'context-menu'].includes(contract.slug) ? '--color-feedback-error-default' : null,
    radius: contract.slug === 'hover-card' ? '--radius-lg' : '--radius-md',
    shadow: contract.slug === 'hover-card' ? '--shadow-xl' : '--shadow-lg',
    transition: contract.slug === 'hover-card' ? '--transition-base' : '--transition-fast',
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
