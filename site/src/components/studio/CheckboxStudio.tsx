import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import CheckboxArtwork from './CheckboxArtwork';

interface CheckboxStudioProps {
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

function initialCheckboxValues(contract: ComponentContract): StudioPropertyValues {
  const values = Object.fromEntries(
    (contract.properties ?? []).map((property) => [
      property.name,
      defaultPropertyValue(contract, property),
    ])
  ) as StudioPropertyValues;

  values.label = 'Accept terms and conditions';
  values.name = 'terms';
  values.value = 'accepted';
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

function activeColorTokens(
  variant: string,
  state: string,
  selected: boolean
): Record<string, string | null> {
  const semantic = variant === 'error' || variant === 'success' || variant === 'warning';
  const controlColor = semantic
    ? `--color-input-${variant}-unfocused-inner-border`
    : selected
      ? '--color-button-primary-bg-default'
      : state === 'hover'
        ? '--color-input-default-hover-inner-border'
        : '--color-input-default-unfocused-inner-border';
  const labelColor = semantic
    ? `--color-input-${variant}-unfocused-label`
    : '--color-text-primary';
  const focusRing = semantic
    ? `--color-input-${variant}-focused-outer-border`
    : '--color-input-default-focused-outer-border';

  return {
    fill: '--color-input-default-unfocused-bg',
    'control-color': controlColor,
    'label-color': labelColor,
    'focus-ring': focusRing,
  };
}

function simulatedControlStyle(
  activeTokens: Record<string, string | null>,
  state: string,
  variant: string
): CSSProperties {
  const focused = state === 'focusVisible';
  const hover = state === 'hover';
  if (!focused && !hover) return {};

  return {
    borderColor: activeTokens['control-color']
      ? variant === 'error' || variant === 'success' || variant === 'warning'
        ? `color-mix(in srgb, var(${activeTokens['control-color']}) 70%, var(--color-text-primary))`
        : `var(${activeTokens['control-color']})`
      : undefined,
    outline: focused && activeTokens['focus-ring']
      ? `4px solid var(${activeTokens['focus-ring']})`
      : undefined,
    outlineOffset: focused ? 0 : undefined,
  };
}

export default function CheckboxStudio({ contract, definition }: CheckboxStudioProps) {
  const initialValues = useMemo(() => initialCheckboxValues(contract), [contract]);
  const studioTokens = useMemo(
    () => collectStudioTokens(definition, contract),
    [definition, contract]
  );
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [previewState, setPreviewState] = useState('default');
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);

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
  const checked = values.checked === true;
  const indeterminate = values.indeterminate === true;
  const disabled = values.disabled === true;
  const required = values.required === true;
  const label = typeof values.label === 'string' ? values.label : '';
  const name = typeof values.name === 'string' ? values.name : '';
  const value = typeof values.value === 'string' ? values.value : 'on';
  const describedBy = typeof values.describedBy === 'string' && values.describedBy
    ? values.describedBy
    : undefined;
  const activeTokens = useMemo(
    () => activeColorTokens(variant, previewState, checked || indeterminate),
    [variant, previewState, checked, indeterminate]
  );
  const controlStyle = simulatedControlStyle(activeTokens, previewState, variant);
  const classes = [
    'checkbox',
    'docs-studio__preview-checkbox',
    optionClass(contract.variants, values.variant),
  ].filter(Boolean).join(' ');

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  function handleStateChange(state: string) {
    setPreviewState(state);
    setValues((current) => ({
      ...current,
      checked: state === 'checked' ? true : state === 'indeterminate' ? false : current.checked,
      indeterminate: state === 'indeterminate' ? true : state === 'checked' ? false : current.indeterminate,
      disabled: state === 'disabled',
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
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={() => undefined}
          onStateChange={handleStateChange}
          onTokenChange={(token, nextValue) => (
            setTokenOverrides((current) => ({ ...current, [token]: nextValue }))
          )}
          onReset={handleReset}
        />

        <section
          className="docs-studio__stage"
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className="docs-studio__stage-inner">
            <CheckboxArtwork
              className={classes.replace(/^checkbox\s*/, '')}
              label={label}
              name={name}
              value={value}
              checked={checked}
              disabled={disabled}
              required={required}
              invalid={variant === 'error'}
              describedBy={describedBy}
              indeterminate={indeterminate}
              dataState={previewState}
              inputStyle={controlStyle}
              inputRef={inputRef}
              onChange={(event) => setValues((current) => ({
                ...current,
                checked: event.target.checked,
                indeterminate: false,
              }))}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
