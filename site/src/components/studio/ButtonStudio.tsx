import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import { resolveStudioControlTokens as resolveControlTokens, type StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { getStudioLucideIcon } from './lucideCatalogue';

interface ButtonStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

function propertyOptions(contract: ComponentContract, property: ContractProperty): string[] {
  if (property.values) return property.values;
  if (property.valuesFrom === 'variants') return contract.variants.map((option) => option.name);
  if (property.valuesFrom === 'sizes') return contract.sizes.map((option) => option.name);
  return [];
}

function defaultPropertyValue(
  contract: ComponentContract,
  property: ContractProperty
): StudioPropertyValue {
  if ('defaultValue' in property) return property.defaultValue ?? null;
  if (property.type === 'boolean' || property.type === 'slot') return false;
  if (property.type === 'number') return null;
  if (property.type === 'enum') {
    if (property.unsetBehavior) return null;
    const source = property.valuesFrom === 'variants'
      ? contract.variants
      : property.valuesFrom === 'sizes'
        ? contract.sizes
        : null;
    if (source) return source.find((option) => option.default)?.name ?? null;
    return propertyOptions(contract, property)[0] ?? null;
  }
  return '';
}

function initialButtonValues(contract: ComponentContract): StudioPropertyValues {
  const values = Object.fromEntries(
    (contract.properties ?? []).map((property) => [
      property.name,
      defaultPropertyValue(contract, property),
    ])
  ) as StudioPropertyValues;

  // Preview content is a site fixture, not the semantic default of the component.
  values.label = 'Add to cart';
  values.loadingPosition = null;
  return values;
}

function initialButtonSlotIcons(definition: StudioDefinition): StudioSlotIconValues {
  const iconControl = definition.groups
    .flatMap((group) => group.controls)
    .find((control) => control.kind === 'slot-composition' && control.iconCatalogue);

  if (!iconControl?.iconCatalogue) {
    throw new Error(`Studio definition ${definition.slug} is missing its icon catalogue defaults`);
  }

  return {
    leading: iconControl.iconCatalogue.defaultLeading,
    trailing: iconControl.iconCatalogue.defaultTrailing,
  };
}

function collectStudioTokens(
  definition: StudioDefinition,
  contract: ComponentContract
): string[] {
  return [...new Set(
    definition.groups.flatMap((group) => (
      group.controls.flatMap((control) => resolveControlTokens(control, contract))
    ))
  )];
}

function optionClass(options: ComponentContract['variants'], value: StudioPropertyValue): string | null {
  const option = options.find((candidate) => candidate.name === value);
  return option?.className?.replace(/^\./, '') ?? null;
}

function activeColorTokens(
  definition: StudioDefinition,
  contract: ComponentContract,
  variant: string,
  previewState: string
): Record<string, string | null> {
  const state = previewState === 'hover' || previewState === 'active'
    ? previewState
    : 'default';
  const controls = definition.groups.flatMap((group) => group.controls);
  const allowed = Object.fromEntries(
    controls.map((control) => [control.id, new Set(resolveControlTokens(control, contract))])
  ) as Record<string, Set<string>>;

  const candidates: Record<string, string | null> = {
    fill: `--color-button-${variant}-bg-${state}`,
    text: `--color-button-${variant}-text-${state}`,
    border: `--color-button-${variant}-border-${state}`,
    'focus-ring': '--color-border-focus',
  };

  return Object.fromEntries(
    Object.entries(candidates).map(([controlId, token]) => [
      controlId,
      token && allowed[controlId]?.has(token) ? token : null,
    ])
  );
}

function simulatedStateStyle(
  activeTokens: Record<string, string | null>,
  previewState: string
): CSSProperties {
  if (previewState === 'focusVisible') {
    return {
      outline: 'var(--border-button-focus-ring-width) solid var(--color-border-focus)',
      outlineOffset: 'var(--border-button-focus-ring-offset)',
    };
  }

  if (!['hover', 'active'].includes(previewState)) return {};
  return {
    background: activeTokens.fill ? `var(${activeTokens.fill})` : 'transparent',
    color: activeTokens.text ? `var(${activeTokens.text})` : undefined,
    borderColor: activeTokens.border ? `var(${activeTokens.border})` : 'transparent',
  };
}

export default function ButtonStudio({ contract, definition }: ButtonStudioProps) {
  const initialValues = useMemo(() => initialButtonValues(contract), [contract]);
  const initialSlotIconValues = useMemo(
    () => initialButtonSlotIcons(definition),
    [definition]
  );
  const studioTokens = useMemo(
    () => collectStudioTokens(definition, contract),
    [definition, contract]
  );
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [slotIconValues, setSlotIconValues] = useState<StudioSlotIconValues>(
    initialSlotIconValues
  );
  const [previewState, setPreviewState] = useState('default');
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    const readTokenValues = () => {
      const computed = getComputedStyle(document.documentElement);
      setBaseTokenValues(Object.fromEntries(
        studioTokens.map((token) => [token, computed.getPropertyValue(token).trim()])
      ));
    };
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const observer = new MutationObserver(readTokenValues);

    readTokenValues();
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    colorScheme.addEventListener('change', readTokenValues);

    return () => {
      observer.disconnect();
      colorScheme.removeEventListener('change', readTokenValues);
    };
  }, [studioTokens]);

  const tokenValues = useMemo(
    () => ({ ...baseTokenValues, ...tokenOverrides }),
    [baseTokenValues, tokenOverrides]
  );
  const variant = typeof values.variant === 'string' ? values.variant : 'primary';
  const activeTokens = useMemo(
    () => activeColorTokens(definition, contract, variant, previewState),
    [definition, contract, variant, previewState]
  );

  const classes = [
    'btn',
    'docs-studio__preview-button',
    optionClass(contract.variants, values.variant),
    optionClass(contract.sizes, values.size),
    values.iconOnly === true ? 'btn--icon-only' : null,
    values.fullWidth === true ? 'btn--full' : null,
  ].filter(Boolean).join(' ');

  const label = typeof values.label === 'string' ? values.label : '';
  const disabled = values.disabled === true;
  const busy = values.busy === true;
  const leadingIcon = values.leadingIcon === true;
  const trailingIcon = values.trailingIcon === true;
  const iconOnly = values.iconOnly === true;
  const loadingPosition = typeof values.loadingPosition === 'string'
    ? values.loadingPosition
    : undefined;
  const accessibleLabel = label.trim() || contract.name;
  const LeadingIcon = getStudioLucideIcon(slotIconValues.leading);
  const TrailingIcon = getStudioLucideIcon(slotIconValues.trailing);
  const stageStyle = tokenOverrides as CSSProperties;
  const previewStyle = simulatedStateStyle(activeTokens, previewState);

  function handlePropertiesChange(next: StudioPropertyValues) {
    setValues((current) => ({ ...current, ...next }));
  }

  function handleStateChange(state: string) {
    setPreviewState(state);
    setValues((current) => ({
      ...current,
      disabled: state === 'disabled',
      busy: state === 'busy',
    }));
  }

  function handleSlotIconChange(slot: keyof StudioSlotIconValues, iconName: string) {
    setSlotIconValues((current) => ({ ...current, [slot]: iconName }));
  }

  function handleTokenChange(token: string, value: string) {
    setTokenOverrides((current) => ({ ...current, [token]: value }));
  }

  function handleReset() {
    setValues({ ...initialValues });
    setSlotIconValues({ ...initialSlotIconValues });
    setPreviewState('default');
    setTokenOverrides({});
  }

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector
          definition={definition}
          contract={contract}
          values={values}
          slotIconValues={slotIconValues}
          stateValue={previewState}
          tokenValues={tokenValues}
          activeTokens={activeTokens}
          onPropertiesChange={handlePropertiesChange}
          onSlotIconChange={handleSlotIconChange}
          onStateChange={handleStateChange}
          onTokenChange={handleTokenChange}
          onReset={handleReset}
        />

        <section
          className="docs-studio__stage"
          aria-label={`${contract.name} preview`}
          style={stageStyle}
        >
          <div className="docs-studio__stage-inner">
            <button
              className={classes}
              type="button"
              disabled={disabled || busy}
              aria-busy={busy || undefined}
              aria-label={iconOnly || !label.trim() ? accessibleLabel : undefined}
              data-loading-position={busy ? loadingPosition : undefined}
              data-studio-state={previewState}
              style={previewStyle}
            >
              {leadingIcon && LeadingIcon && (
                <LeadingIcon
                  className="btn__icon btn__icon--leading"
                  aria-hidden="true"
                  focusable="false"
                />
              )}
              {!iconOnly && <span>{label}</span>}
              {trailingIcon && TrailingIcon && (
                <TrailingIcon
                  className="btn__icon btn__icon--trailing"
                  aria-hidden="true"
                  focusable="false"
                />
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
