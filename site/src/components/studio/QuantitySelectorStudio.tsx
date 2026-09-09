import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import QuantitySelectorArtwork from './QuantitySelectorArtwork';
import FieldWrapperArtwork from './FieldWrapperArtwork';

interface QuantitySelectorStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

function defaultPropertyValue(
  contract: ComponentContract,
  property: ContractProperty
): StudioPropertyValue {
  if ('defaultValue' in property) return property.defaultValue ?? null;
  if (property.type === 'boolean' || property.type === 'slot') return false;
  if (property.type === 'number') return null;
  if (property.type === 'enum') {
    const source = property.valuesFrom === 'variants'
      ? contract.variants
      : property.valuesFrom === 'sizes'
        ? contract.sizes
        : null;
    if (source) return source.find((option) => option.default)?.name ?? null;
    return property.values?.[0] ?? null;
  }
  return '';
}

function initialQuantityValues(contract: ComponentContract): StudioPropertyValues {
  const values = Object.fromEntries(
    (contract.properties ?? []).map((property) => [
      property.name,
      defaultPropertyValue(contract, property),
    ])
  ) as StudioPropertyValues;

  values.value = 1;
  values.min = 1;
  values.max = 8;
  values.name = 'quantity';
  values.accessibleLabel = 'Quantity';
  values.decrementLabel = 'Decrease quantity';
  values.incrementLabel = 'Increase quantity';
  values.describedBy = 'studio-quantity-selector-feedback';
  return values;
}

function resolveControlTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const categoryTokens = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  if (!control.tokens.match) return [];
  const pattern = new RegExp(control.tokens.match);
  return categoryTokens.filter((token) => pattern.test(token));
}

function collectStudioTokens(definition: StudioDefinition, contract: ComponentContract): string[] {
  return [...new Set(
    definition.groups.flatMap((group) => (
      group.controls.flatMap((control) => resolveControlTokens(control, contract))
    ))
  )];
}

function optionClass(options: ComponentContract['variants'], value: StudioPropertyValue): string | null {
  return options.find((option) => option.name === value)?.className?.replace(/^\./, '') ?? null;
}

function activeColorTokens(variant: string, state: string): Record<string, string | null> {
  const semantic = variant === 'error' || variant === 'success' || variant === 'warning';
  const focused = state === 'focusWithin';

  return {
    fill: '--color-input-default-unfocused-bg',
    'button-hover-fill': '--color-surface-secondary',
    'value-color': '--color-text-primary',
    'button-color': semantic
      ? `--color-input-${variant}-unfocused-icon`
      : '--color-text-secondary',
    'focus-ring': `--color-input-${semantic ? variant : 'default'}-focused-outer-border`,
    border: semantic
      ? `--color-input-${variant}-${focused ? 'focused' : 'unfocused'}-inner-border`
      : `--color-input-default-${focused ? 'focused' : state === 'hover' ? 'hover' : 'unfocused'}-inner-border`,
  };
}

function numberValue(value: StudioPropertyValue): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function simulatedRootStyle(variant: string, state: string): CSSProperties {
  if (state !== 'hover' && state !== 'focusWithin') return {};
  const semantic = variant === 'error' || variant === 'success' || variant === 'warning';
  const focused = state === 'focusWithin';
  const border = semantic
    ? `--color-input-${variant}-${focused ? 'focused' : 'unfocused'}-inner-border`
    : `--color-input-default-${focused ? 'focused' : state === 'hover' ? 'hover' : 'unfocused'}-inner-border`;
  const ring = semantic
    ? `--color-input-${variant}-focused-outer-border`
    : '--color-input-default-focused-outer-border';

  return {
    '--_qty-border': semantic
      ? `color-mix(in srgb, var(${border}) 70%, var(--color-text-primary))`
      : `var(${border})`,
    outlineColor: focused ? `var(${ring})` : undefined,
  } as CSSProperties;
}

export default function QuantitySelectorStudio({
  contract,
  definition,
}: QuantitySelectorStudioProps) {
  const initialValues = useMemo(() => initialQuantityValues(contract), [contract]);
  const studioTokens = useMemo(
    () => collectStudioTokens(definition, contract),
    [definition, contract]
  );
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
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
  const variant = typeof values.variant === 'string' ? values.variant : 'default';
  const current = numberValue(values.value);
  const min = numberValue(values.min);
  const max = numberValue(values.max);
  const rawStep = numberValue(values.step);
  const step = rawStep !== null && rawStep > 0 ? rawStep : 1;
  const disabled = values.disabled === true;
  const readOnly = values.readOnly === true;
  const required = values.required === true;
  const name = typeof values.name === 'string' ? values.name : '';
  const activeTokens = activeColorTokens(variant, previewState);
  const classes = [optionClass(contract.variants, values.variant)].filter(Boolean).join(' ');
  const feedback = variant === 'error'
    ? 'Choose a quantity within the available range.'
    : variant === 'warning'
      ? 'This quantity is close to the available limit.'
      : variant === 'success'
        ? 'This quantity is available.'
        : 'Choose the number of pieces.';

  function handleStateChange(state: string) {
    setPreviewState(state);
    setValues((currentValues) => ({
      ...currentValues,
      disabled: state === 'disabled',
      readOnly: state === 'readOnly',
      value: state === 'buttonDisabled' && numberValue(currentValues.max) !== null
        ? currentValues.max
        : currentValues.value,
    }));
  }

  function handleReset() {
    setValues({ ...initialValues });
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
          slotIconValues={emptySlotIcons}
          stateValue={previewState}
          tokenValues={tokenValues}
          activeTokens={activeTokens}
          onPropertiesChange={(next) => setValues((currentValues) => ({ ...currentValues, ...next }))}
          onSlotIconChange={() => undefined}
          onStateChange={handleStateChange}
          onTokenChange={(token, nextValue) => (
            setTokenOverrides((currentValues) => ({ ...currentValues, [token]: nextValue }))
          )}
          onReset={handleReset}
        />

        <section
          className="docs-studio__stage"
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className="docs-studio__stage-inner">
            <div className="docs-studio__field-fixture">
              <FieldWrapperArtwork
                controlId="studio-quantity-selector"
                label={String(values.accessibleLabel || 'Quantity')}
                required={required}
                variant={variant as 'default' | 'error' | 'success' | 'warning'}
                feedback={feedback}
              >
              <QuantitySelectorArtwork
                id="studio-quantity-selector"
                value={current}
                min={min}
                max={max}
                step={step}
                name={name}
                className={classes}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                accessibleLabel={String(values.accessibleLabel || 'Quantity')}
                decrementLabel={String(values.decrementLabel || 'Decrease quantity')}
                incrementLabel={String(values.incrementLabel || 'Increase quantity')}
                describedBy={String(values.describedBy || '')}
                invalid={variant === 'error'}
                studioState={previewState}
                rootStyle={simulatedRootStyle(variant, previewState)}
                decrementStyle={previewState === 'buttonHover'
                  ? { background: 'var(--color-surface-secondary)' }
                  : undefined}
                onValueChange={(value) => setValues((currentValues) => ({
                  ...currentValues,
                  value,
                }))}
              />
              </FieldWrapperArtwork>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
