import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

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
  values.accessibleLabel = 'Quantity';
  values.decrementLabel = 'Decrease quantity';
  values.incrementLabel = 'Increase quantity';
  values.describedBy = 'quantity-feedback';
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
  const focused = state === 'focusWithin'
    || state === 'errorFocusWithin'
    || state === 'successFocusWithin'
    || state === 'warningFocusWithin';

  return {
    fill: '--color-input-default-unfocused-bg',
    'button-hover-fill': '--color-surface-secondary',
    'value-color': '--color-text-primary',
    'button-color': semantic
      ? `--color-input-${variant}-unfocused-icon`
      : '--color-text-secondary',
    border: semantic
      ? `--color-input-${variant}-${focused ? 'focused' : 'unfocused'}-inner-border`
      : `--color-input-default-${focused ? 'focused' : state === 'hover' ? 'hover' : 'unfocused'}-inner-border`,
  };
}

function numberValue(value: StudioPropertyValue): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function simulatedRootStyle(variant: string, state: string): CSSProperties {
  const semantic = variant === 'error' || variant === 'success' || variant === 'warning';
  const focused = state === 'focusWithin'
    || state === 'errorFocusWithin'
    || state === 'successFocusWithin'
    || state === 'warningFocusWithin';
  const border = semantic
    ? `--color-input-${variant}-${focused ? 'focused' : 'unfocused'}-inner-border`
    : `--color-input-default-${focused ? 'focused' : state === 'hover' ? 'hover' : 'unfocused'}-inner-border`;
  const ring = semantic
    ? `--color-input-${variant}-focused-outer-border`
    : '--color-input-default-focused-outer-border';

  return {
    borderColor: `var(${border})`,
    outlineColor: focused ? `var(${ring})` : undefined,
  };
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
  const current = numberValue(values.value) ?? 0;
  const min = numberValue(values.min);
  const max = numberValue(values.max);
  const step = Math.max(numberValue(values.step) ?? 1, Number.EPSILON);
  const disabled = values.disabled === true;
  const activeTokens = activeColorTokens(variant, previewState);
  const classes = [
    'qty',
    optionClass(contract.variants, values.variant),
  ].filter(Boolean).join(' ');
  const feedback = variant === 'error'
    ? 'Choose a quantity within the available range.'
    : variant === 'warning'
      ? 'This quantity is close to the available limit.'
      : variant === 'success'
        ? 'This quantity is available.'
        : 'Choose the number of pieces.';

  function updateValue(direction: -1 | 1) {
    const next = Number((current + direction * step).toFixed(10));
    const clamped = Math.min(max ?? next, Math.max(min ?? next, next));
    setValues((existing) => ({ ...existing, value: clamped }));
  }

  function handleStateChange(state: string) {
    setPreviewState(state);
    setValues((currentValues) => ({
      ...currentValues,
      disabled: state === 'disabled',
      value: state === 'buttonDisabled' && numberValue(currentValues.max) !== null
        ? currentValues.max
        : currentValues.value,
      variant: state === 'errorFocusWithin'
        ? 'error'
        : state === 'successFocusWithin'
          ? 'success'
          : state === 'warningFocusWithin'
            ? 'warning'
            : currentValues.variant,
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
            <div>
              <div
                className={classes}
                role="group"
                aria-label="Quantity selector"
                data-studio-state={previewState}
                style={simulatedRootStyle(variant, previewState)}
              >
                <button
                  className="qty__btn qty__btn--decrement"
                  type="button"
                  aria-label={String(values.decrementLabel || 'Decrease quantity')}
                  disabled={disabled || (min !== null && current <= min)}
                  style={previewState === 'buttonHover'
                    ? { background: 'var(--color-surface-secondary)' }
                    : undefined}
                  onClick={() => updateValue(-1)}
                >
                  <svg className="qty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <input
                  className="qty__input"
                  type="number"
                  value={current}
                  min={min ?? undefined}
                  max={max ?? undefined}
                  step={step}
                  disabled={disabled}
                  aria-label={String(values.accessibleLabel || 'Quantity')}
                  aria-describedby={String(values.describedBy || '') || undefined}
                  aria-invalid={variant === 'error' || undefined}
                  onChange={(event) => setValues((currentValues) => ({
                    ...currentValues,
                    value: event.target.value === '' ? null : event.target.valueAsNumber,
                  }))}
                />
                <button
                  className="qty__btn qty__btn--increment"
                  type="button"
                  aria-label={String(values.incrementLabel || 'Increase quantity')}
                  disabled={disabled || (max !== null && current >= max)}
                  onClick={() => updateValue(1)}
                >
                  <svg className="qty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
              <p
                id="quantity-feedback"
                className="docs-studio__preview-message"
                data-variant={variant}
              >
                {feedback}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
