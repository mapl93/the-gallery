import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { getStudioLucideIcon } from './lucideCatalogue';

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
    result.open = true;
    return result;
  }, [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});

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
    setValues((current) => ({ ...current, open: next }));
  }

  function reset() {
    setValues({ ...initialValues });
    setTokenOverrides({});
  }

  function renderModal() {
    if (!open) return <button className="btn" type="button" onClick={() => setOpen(true)}>Open modal</button>;
    return (
      <div className="modal-overlay docs-studio__preview-modal-overlay" aria-hidden="false">
        <div className="modal docs-studio__preview-modal" role="dialog" aria-modal="true" aria-labelledby="studio-modal-title">
          <div className="modal__header">
            <h2 className="modal__title" id="studio-modal-title">Confirm order</h2>
            <button className="close-btn" type="button" aria-label="Close modal" onClick={() => setOpen(false)}>
              {CloseIcon && <CloseIcon className="close-btn__icon" aria-hidden="true" />}
            </button>
          </div>
          <div className="modal__body">
            <p>Are you sure you want to place this order for <strong>$240.00</strong>?</p>
          </div>
          <div className="modal__footer">
            <button className="btn btn--outline" type="button" onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn" type="button" onClick={() => setOpen(false)}>Confirm</button>
          </div>
        </div>
      </div>
    );
  }

  function renderDrawer() {
    if (!open) return <button className="btn" type="button" onClick={() => setOpen(true)}>Open drawer</button>;
    const placementClass = variantClass(contract, values.placement);
    return (
      <div className="drawer-overlay is-open docs-studio__preview-drawer-overlay">
        <aside
          className={['drawer', placementClass, 'is-open', 'docs-studio__preview-drawer'].filter(Boolean).join(' ')}
          role="dialog"
          aria-modal="true"
          aria-labelledby="studio-drawer-title"
        >
          <div className="drawer__header">
            <h2 id="studio-drawer-title">Collection notes</h2>
            <button className="drawer__close" type="button" aria-label="Close drawer" onClick={() => setOpen(false)}>
              {CloseIcon && <CloseIcon aria-hidden="true" />}
            </button>
          </div>
          <div className="drawer__body">
            <p>This vessel was formed in three stages and fired at high temperature.</p>
          </div>
          <div className="drawer__footer">
            <button className="btn btn--full" type="button" onClick={() => setOpen(false)}>Done</button>
          </div>
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
        'title-family': '--font-family-body',
        'body-padding': '--space-layout-element-gap',
      }
    : {
        surface: '--color-surface-primary',
        'hover-surface': '--color-surface-secondary',
        divider: '--color-border-subtle',
        'secondary-text': '--color-text-secondary',
        focus: '--color-border-focus',
        radius: '--radius-sm',
        shadow: '--shadow-2xl',
        'overlay-opacity': '--opacity-overlay',
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
