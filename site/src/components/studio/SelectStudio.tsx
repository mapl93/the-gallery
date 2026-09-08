import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
} from './StudioInspector';

interface SelectStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const previewOptions = [
  { value: '', label: 'Choose a country', disabled: false, hidden: true },
  { value: 'ar', label: 'Argentina', disabled: false, hidden: false },
  { value: 'mx', label: 'Mexico', disabled: false, hidden: false },
  { value: 'es', label: 'Spain', disabled: false, hidden: false },
];

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

function initialSelectValues(contract: ComponentContract): StudioPropertyValues {
  const values = Object.fromEntries(
    (contract.properties ?? []).map((property) => [
      property.name,
      defaultPropertyValue(contract, property),
    ])
  ) as StudioPropertyValues;

  // Preview content is a site fixture, not a semantic component default.
  values.label = 'Country';
  values.message = 'Choose the country for this address.';
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
  definition: StudioDefinition,
  contract: ComponentContract,
  variant: string,
  state: string
): Record<string, string | null> {
  const controls = definition.groups.flatMap((group) => group.controls);
  const allowed = Object.fromEntries(
    controls.map((control) => [control.id, new Set(resolveControlTokens(control, contract))])
  ) as Record<string, Set<string>>;
  const stateName = state === 'hover'
    ? 'hover'
    : state === 'disabled'
      ? 'disabled'
      : state === 'focusVisible'
        ? 'focused'
        : 'unfocused';
  const variantState = variant === 'default' ? stateName : stateName === 'focused' ? 'focused' : 'unfocused';

  const firstAllowed = (controlId: string, candidates: string[]) => (
    candidates.find((token) => allowed[controlId]?.has(token)) ?? null
  );

  return {
    fill: firstAllowed('fill', [
      `--color-input-default-${stateName}-bg`,
      '--color-input-default-unfocused-bg',
    ]),
    'value-color': firstAllowed('value-color', [
      `--color-input-default-${stateName}-value`,
      '--color-input-default-unfocused-value',
    ]),
    border: firstAllowed('border', [
      `--color-input-${variant}-${variantState}-inner-border`,
      `--color-input-default-${stateName}-inner-border`,
      '--color-input-default-unfocused-inner-border',
    ]),
    'label-color': firstAllowed('label-color', [
      `--color-input-${variant}-unfocused-label`,
      '--color-input-default-unfocused-label',
    ]),
    'message-color': firstAllowed('message-color', [
      `--color-input-${variant}-unfocused-message`,
      '--color-input-default-unfocused-message',
    ]),
    'indicator-color': firstAllowed('indicator-color', [
      `--color-input-${variant}-unfocused-icon`,
      '--color-input-default-unfocused-icon',
    ]),
    'panel-fill': firstAllowed('panel-fill', ['--color-surface-primary']),
    'panel-border': firstAllowed('panel-border', ['--color-border-subtle']),
    'option-fill': firstAllowed('option-fill', ['--color-surface-secondary']),
    'option-text': firstAllowed('option-text', ['--color-text-primary']),
  };
}

function simulatedFieldStyle(
  activeTokens: Record<string, string | null>,
  state: string,
  variant: string
): CSSProperties {
  const semantic = variant === 'error' || variant === 'success' || variant === 'warning';
  const focused = state === 'focusVisible';
  if (state !== 'hover' && !focused) return {};

  const outerBorder = variant === 'error'
    ? '--color-input-error-focused-outer-border'
    : variant === 'success'
      ? '--color-input-success-focused-outer-border'
      : variant === 'warning'
        ? '--color-input-warning-focused-outer-border'
      : '--color-input-default-focused-outer-border';

  return {
    backgroundColor: activeTokens.fill ? `var(${activeTokens.fill})` : undefined,
    color: activeTokens['value-color'] ? `var(${activeTokens['value-color']})` : undefined,
    borderColor: activeTokens.border
      ? semantic
        ? `color-mix(in oklch, var(${activeTokens.border}) var(--_select-semantic-boundary-weight), var(--color-text-primary))`
        : `var(${activeTokens.border})`
      : undefined,
    outlineColor: focused ? `var(${outerBorder})` : undefined,
  };
}

export default function SelectStudio({ contract, definition }: SelectStudioProps) {
  const generatedId = useId().replace(/:/g, '');
  const nativeId = `studio-select-${generatedId}`;
  const triggerId = `${nativeId}-trigger`;
  const labelId = `${nativeId}-label`;
  const listboxId = `${nativeId}-listbox`;
  const messageId = `${nativeId}-message`;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const initialValues = useMemo(() => initialSelectValues(contract), [contract]);
  const studioTokens = useMemo(
    () => collectStudioTokens(definition, contract),
    [definition, contract]
  );
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [selectedValue, setSelectedValue] = useState('');
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
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

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!event.composedPath().includes(rootRef.current as EventTarget)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  const tokenValues = useMemo(
    () => ({ ...baseTokenValues, ...tokenOverrides }),
    [baseTokenValues, tokenOverrides]
  );
  const variant = typeof values.variant === 'string' ? values.variant : 'default';
  const activeTokens = useMemo(
    () => activeColorTokens(definition, contract, variant, previewState),
    [definition, contract, variant, previewState]
  );
  const label = typeof values.label === 'string' ? values.label : '';
  const message = typeof values.message === 'string' ? values.message : '';
  const name = typeof values.name === 'string' ? values.name : '';
  const disabled = values.disabled === true;
  const required = values.required === true;
  const selectedIndex = previewOptions.findIndex((option) => option.value === selectedValue);
  const selectedOption = previewOptions[selectedIndex] ?? previewOptions[0];
  const fieldStyle = simulatedFieldStyle(activeTokens, previewState, variant);
  const classes = [
    'select',
    'select--enhanced',
    'docs-studio__preview-select',
    optionClass(contract.variants, values.variant),
    open ? 'select--open' : null,
  ].filter(Boolean).join(' ');

  function isOptionAvailable(index: number): boolean {
    const option = previewOptions[index];
    const simulatedDisabled = previewState === 'optionDisabled' && index === 1;
    return Boolean(option && !option.hidden && !option.disabled && !simulatedDisabled);
  }

  function firstAvailable(direction: 1 | -1, start = highlightedIndex): number {
    for (let step = 1; step <= previewOptions.length; step += 1) {
      const index = (start + direction * step + previewOptions.length) % previewOptions.length;
      if (isOptionAvailable(index)) return index;
    }
    return -1;
  }

  function openListbox() {
    if (disabled) return;
    setOpen(true);
    setHighlightedIndex(isOptionAvailable(selectedIndex) ? selectedIndex : firstAvailable(1, selectedIndex));
  }

  function chooseOption(index: number) {
    const option = previewOptions[index];
    if (!option || !isOptionAvailable(index)) return;
    setSelectedValue(option.value);
    setOpen(false);
    setHighlightedIndex(-1);
    setPreviewState('default');
    triggerRef.current?.focus();
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        openListbox();
      } else {
        setHighlightedIndex(firstAvailable(event.key === 'ArrowDown' ? 1 : -1));
      }
      return;
    }
    if ((event.key === 'Enter' || event.key === ' ') && open) {
      event.preventDefault();
      chooseOption(highlightedIndex);
      return;
    }
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
      setHighlightedIndex(-1);
      return;
    }
    if (event.key === 'Tab') setOpen(false);
  }

  function handleStateChange(state: string) {
    const optionState = [
      'optionHover',
      'optionHighlighted',
      'optionSelected',
      'optionDisabled',
    ].includes(state);
    setPreviewState(state);
    setValues((current) => ({
      ...current,
      disabled: state === 'disabled',
    }));
    setOpen(state === 'open' || optionState);
    setHighlightedIndex(optionState ? 1 : -1);
    if (state === 'optionSelected') setSelectedValue('ar');
  }

  function handleReset() {
    setValues({ ...initialValues });
    setSelectedValue('');
    setOpen(false);
    setHighlightedIndex(-1);
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
          slotIconValues={{ leading: '', trailing: '' }}
          stateValue={previewState}
          tokenValues={tokenValues}
          activeTokens={activeTokens}
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={() => {}}
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
            <div
              ref={rootRef}
              className={classes}
              data-select-enhanced="true"
            >
              <label
                className={`select__label${required ? ' select__label--required' : ''}`}
                id={labelId}
                htmlFor={triggerId}
              >
                {label}
              </label>
              <div className="select__control">
                <select
                  className="select__field select__native"
                  id={nativeId}
                  name={name || undefined}
                  value={selectedValue}
                  disabled={disabled}
                  required={required}
                  tabIndex={-1}
                  aria-hidden="true"
                  aria-invalid={variant === 'error' || undefined}
                  aria-describedby={message ? messageId : undefined}
                  onChange={(event) => setSelectedValue(event.target.value)}
                >
                  {previewOptions.map((option, index) => (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled || (previewState === 'optionDisabled' && index === 1)}
                      hidden={option.hidden}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  ref={triggerRef}
                  className="select__field select__trigger"
                  id={triggerId}
                  type="button"
                  role="combobox"
                  disabled={disabled}
                  aria-required={required || undefined}
                  aria-haspopup="listbox"
                  aria-expanded={open}
                  aria-controls={listboxId}
                  aria-labelledby={labelId}
                  aria-invalid={variant === 'error' || undefined}
                  aria-describedby={message ? messageId : undefined}
                  aria-activedescendant={open && highlightedIndex >= 0
                    ? `${nativeId}-option-${highlightedIndex}`
                    : undefined}
                  data-placeholder={selectedValue === '' || undefined}
                  data-studio-state={previewState}
                  style={fieldStyle}
                  onClick={() => (open ? setOpen(false) : openListbox())}
                  onKeyDown={handleTriggerKeyDown}
                >
                  <span className="select__value">{selectedOption.label}</span>
                  <ChevronDown className="select__indicator" aria-hidden="true" />
                </button>
                <div
                  className="select__listbox"
                  id={listboxId}
                  role="listbox"
                  aria-labelledby={labelId}
                  hidden={!open}
                >
                  {previewOptions.map((option, index) => option.hidden ? null : (
                    <div
                      className="select__option"
                      id={`${nativeId}-option-${index}`}
                      key={option.value}
                      role="option"
                      tabIndex={-1}
                      aria-selected={index === selectedIndex}
                      aria-disabled={option.disabled || (previewState === 'optionDisabled' && index === 1)}
                      data-highlighted={index === highlightedIndex || undefined}
                      onPointerMove={() => isOptionAvailable(index) && setHighlightedIndex(index)}
                      onClick={() => chooseOption(index)}
                    >
                      <span className="select__option-label">{option.label}</span>
                      <Check className="select__option-check" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </div>
              {message && (
                <span
                  className="select__message"
                  id={messageId}
                  role={variant === 'error' ? 'alert' : undefined}
                >
                  {message}
                </span>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
