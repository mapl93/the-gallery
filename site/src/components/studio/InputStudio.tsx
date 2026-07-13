import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { getStudioLucideIcon } from './lucideCatalogue';

interface InputStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

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

function initialInputValues(contract: ComponentContract): StudioPropertyValues {
  const values = Object.fromEntries(
    (contract.properties ?? []).map((property) => [
      property.name,
      defaultPropertyValue(contract, property),
    ])
  ) as StudioPropertyValues;

  if (contract.slug === 'textarea') {
    values.label = 'Message';
    values.placeholder = 'Write a message...';
    values.message = 'Share any details that will help us respond.';
  } else {
    values.label = 'Email address';
    values.placeholder = 'name@example.com';
    values.message = 'We will only use this for your receipt.';
  }
  return values;
}

function initialSlotIcons(definition: StudioDefinition): StudioSlotIconValues {
  const control = definition.groups
    .flatMap((group) => group.controls)
    .find((candidate) => candidate.kind === 'slot-composition' && candidate.iconCatalogue);

  if (!control?.iconCatalogue) return { leading: '', trailing: '' };

  return {
    leading: control.iconCatalogue.defaultLeading,
    trailing: control.iconCatalogue.defaultTrailing,
  };
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
        || state === 'errorFocusVisible'
        || state === 'successFocusVisible'
        || state === 'warningFocusVisible'
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
    'icon-color': firstAllowed('icon-color', [
      `--color-input-${variant}-unfocused-icon`,
      '--color-input-default-unfocused-icon',
    ]),
  };
}

function simulatedFieldStyle(
  activeTokens: Record<string, string | null>,
  state: string,
  variant: string
): CSSProperties {
  const focused = state === 'focusVisible'
    || state === 'errorFocusVisible'
    || state === 'successFocusVisible'
    || state === 'warningFocusVisible';
  const simulated = state === 'hover' || focused;
  if (!simulated) return {};

  const outerBorder = variant === 'error'
    ? '--color-input-error-focused-outer-border'
    : variant === 'success'
      ? '--color-input-success-focused-outer-border'
      : variant === 'warning'
        ? '--color-input-warning-focused-outer-border'
      : '--color-input-default-focused-outer-border';

  return {
    background: activeTokens.fill ? `var(${activeTokens.fill})` : undefined,
    color: activeTokens['value-color'] ? `var(${activeTokens['value-color']})` : undefined,
    borderColor: activeTokens.border ? `var(${activeTokens.border})` : undefined,
    outlineColor: focused ? `var(${outerBorder})` : undefined,
  };
}

export default function InputStudio({ contract, definition }: InputStudioProps) {
  const generatedId = useId().replace(/:/g, '');
  const fieldId = `studio-input-${generatedId}`;
  const messageId = `${fieldId}-message`;
  const initialValues = useMemo(() => initialInputValues(contract), [contract]);
  const initialSlotIconValues = useMemo(() => initialSlotIcons(definition), [definition]);
  const studioTokens = useMemo(
    () => collectStudioTokens(definition, contract),
    [definition, contract]
  );
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [slotIconValues, setSlotIconValues] = useState<StudioSlotIconValues>(initialSlotIconValues);
  const [previewState, setPreviewState] = useState('default');
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
  const activeTokens = useMemo(
    () => activeColorTokens(definition, contract, variant, previewState),
    [definition, contract, variant, previewState]
  );
  const label = typeof values.label === 'string' ? values.label : '';
  const value = typeof values.value === 'string' ? values.value : '';
  const placeholder = typeof values.placeholder === 'string' ? values.placeholder : '';
  const message = typeof values.message === 'string' ? values.message : '';
  const resize = typeof values.resize === 'string' ? values.resize : 'vertical';
  const minLines = typeof values.minLines === 'number' ? values.minLines : 4;
  const maxLines = typeof values.maxLines === 'number' ? values.maxLines : null;
  const disabled = values.disabled === true;
  const leadingIcon = values.leadingIcon === true;
  const trailingIcon = values.trailingIcon === true;
  const isTextarea = contract.slug === 'textarea';
  const LeadingIcon = getStudioLucideIcon(slotIconValues.leading);
  const TrailingIcon = getStudioLucideIcon(slotIconValues.trailing);
  const classes = [
    'input',
    isTextarea ? 'docs-studio__preview-textarea' : 'docs-studio__preview-input',
    optionClass(contract.variants, values.variant),
  ].filter(Boolean).join(' ');
  const fieldStyle = simulatedFieldStyle(activeTokens, previewState, variant);

  useEffect(() => {
    if (isTextarea && textareaRef.current) {
      window.TheGallery?.enhanceTextareas(textareaRef.current);
    }
  }, [isTextarea, minLines, maxLines, tokenValues]);

  function handleStateChange(state: string) {
    setPreviewState(state);
    setValues((current) => ({
      ...current,
      disabled: state === 'disabled',
      variant: state === 'errorFocusVisible'
        ? 'error'
        : state === 'successFocusVisible'
          ? 'success'
          : state === 'warningFocusVisible'
            ? 'warning'
            : current.variant,
    }));
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
          onPropertiesChange={(next) => setValues((current) => {
            const merged = { ...current, ...next };
            if (isTextarea) {
              const nextMin = typeof merged.minLines === 'number' ? merged.minLines : 4;
              if (typeof merged.maxLines === 'number' && merged.maxLines < nextMin) {
                merged.maxLines = nextMin;
              }
            }
            return merged;
          })}
          onSlotIconChange={(slot, iconName) => (
            setSlotIconValues((current) => ({ ...current, [slot]: iconName }))
          )}
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
            <div className={classes}>
              <label className="input__label" htmlFor={fieldId}>{label}</label>
              <div className="input__control">
                {leadingIcon && LeadingIcon && (
                  <LeadingIcon
                    className="input__icon input__icon--leading"
                    aria-hidden="true"
                    focusable="false"
                  />
                )}
                {isTextarea ? (
                  <textarea
                    ref={textareaRef}
                    className="input__field textarea__field"
                    id={fieldId}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-invalid={variant === 'error' || undefined}
                    aria-describedby={message ? messageId : undefined}
                    data-resize={resize === 'vertical' ? undefined : resize}
                    data-min-lines={minLines === 4 ? undefined : minLines}
                    data-max-lines={maxLines ?? undefined}
                    data-studio-state={previewState}
                    style={fieldStyle}
                    onChange={(event) => setValues((current) => ({
                      ...current,
                      value: event.target.value,
                    }))}
                  />
                ) : (
                  <input
                    className="input__field"
                    id={fieldId}
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-invalid={variant === 'error' || undefined}
                    aria-describedby={message ? messageId : undefined}
                    data-studio-state={previewState}
                    style={fieldStyle}
                    onChange={(event) => setValues((current) => ({
                      ...current,
                      value: event.target.value,
                    }))}
                  />
                )}
                {trailingIcon && TrailingIcon && (
                  <TrailingIcon
                    className="input__icon input__icon--trailing"
                    aria-hidden="true"
                    focusable="false"
                  />
                )}
              </div>
              {message && (
                <span
                  className="input__message"
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
