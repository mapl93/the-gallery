import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import { resolveStudioControlTokens as resolveControlTokens, type StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import InputArtwork from './InputArtwork';
import TextareaArtwork from './TextareaArtwork';
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
    values.name = 'message';
    values.autocomplete = 'off';
    values.placeholder = 'Write a message...';
    values.message = 'Share any details that will help us respond.';
  } else {
    values.label = 'Full name';
    values.name = 'full-name';
    values.autocomplete = 'name';
    values.placeholder = 'Ada Lovelace';
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
    'placeholder-color': firstAllowed('placeholder-color', [
      '--color-input-default-unfocused-placeholder',
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
    'focus-ring': firstAllowed('focus-ring', [
      `--color-input-${variant}-focused-outer-border`,
      '--color-input-default-focused-outer-border',
    ]),
  };
}

function simulatedFieldStyle(
  activeTokens: Record<string, string | null>,
  state: string,
  variant: string
): CSSProperties {
  const focused = state === 'focusVisible';
  const simulated = state === 'hover' || focused;
  if (!simulated) return {};

  const semanticVariant = variant === 'error' || variant === 'success' || variant === 'warning';
  const borderColor = activeTokens.border
    ? semanticVariant
      ? `color-mix(in srgb, var(${activeTokens.border}) 70%, var(--color-text-primary))`
      : focused
        ? `color-mix(in srgb, var(${activeTokens.border}) 60%, var(--color-text-primary))`
        : `var(${activeTokens.border})`
    : undefined;

  return {
    background: activeTokens.fill ? `var(${activeTokens.fill})` : undefined,
    color: activeTokens['value-color'] ? `var(${activeTokens['value-color']})` : undefined,
    borderColor,
    outlineColor: focused && activeTokens['focus-ring']
      ? `var(${activeTokens['focus-ring']})`
      : undefined,
  };
}

export default function InputStudio({ contract, definition }: InputStudioProps) {
  const generatedId = useId().replace(/:/g, '');
  const fieldId = `studio-input-${generatedId}`;
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
  const name = typeof values.name === 'string' ? values.name : '';
  const autocomplete = typeof values.autocomplete === 'string' ? values.autocomplete : '';
  const placeholder = typeof values.placeholder === 'string' ? values.placeholder : '';
  const message = typeof values.message === 'string' ? values.message : '';
  const required = values.required === true;
  const readOnly = values.readOnly === true;
  const minLength = typeof values.minLength === 'number' ? values.minLength : undefined;
  const maxLength = typeof values.maxLength === 'number' ? values.maxLength : undefined;
  const resize = typeof values.resize === 'string' ? values.resize : 'vertical';
  const minLines = typeof values.minLines === 'number' ? values.minLines : 4;
  const maxLines = typeof values.maxLines === 'number' ? values.maxLines : null;
  const disabled = values.disabled === true;
  const leadingIcon = values.leadingIcon === true;
  const trailingIcon = values.trailingIcon === true;
  const isTextarea = contract.slug === 'textarea';
  const LeadingIcon = getStudioLucideIcon(slotIconValues.leading);
  const TrailingIcon = getStudioLucideIcon(slotIconValues.trailing);
  const artworkClassName = isTextarea
    ? 'docs-studio__preview-textarea'
    : ['docs-studio__preview-input', optionClass(contract.variants, values.variant)]
      .filter(Boolean).join(' ');
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
      readOnly: state === 'readOnly',
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
            const nextMinLength = typeof merged.minLength === 'number' ? merged.minLength : 0;
            if (typeof merged.maxLength === 'number' && merged.maxLength < nextMinLength) {
              merged.maxLength = nextMinLength;
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
            {isTextarea ? (
              <TextareaArtwork
                id={fieldId}
                className={artworkClassName}
                label={label}
                value={value}
                name={name}
                placeholder={placeholder}
                autoComplete={autocomplete}
                required={required}
                readOnly={readOnly}
                minLength={minLength}
                maxLength={maxLength}
                disabled={disabled}
                variant={variant as 'default' | 'error' | 'success' | 'warning'}
                message={message}
                messageRole={variant === 'error' ? 'alert' : undefined}
                resize={resize as 'vertical' | 'horizontal' | 'both'}
                minLines={minLines}
                maxLines={maxLines ?? undefined}
                dataState={previewState}
                fieldStyle={fieldStyle}
                fieldRef={textareaRef}
                onChange={(event) => setValues((current) => ({
                  ...current,
                  value: event.target.value,
                }))}
              />
            ) : (
              <InputArtwork
                id={fieldId}
                className="docs-studio__preview-input"
                label={label}
                value={value}
                name={name}
                placeholder={placeholder}
                autoComplete={autocomplete}
                required={required}
                readOnly={readOnly}
                minLength={minLength}
                maxLength={maxLength}
                disabled={disabled}
                variant={variant as 'default' | 'error' | 'success' | 'warning'}
                message={message}
                messageRole={variant === 'error' ? 'alert' : undefined}
                leadingIcon={leadingIcon && LeadingIcon ? (
                  <LeadingIcon
                    className="input__icon input__icon--leading"
                    aria-hidden="true"
                    focusable="false"
                  />
                ) : undefined}
                trailingIcon={trailingIcon && TrailingIcon ? (
                  <TrailingIcon
                    className="input__icon input__icon--trailing"
                    aria-hidden="true"
                    focusable="false"
                  />
                ) : undefined}
                dataState={previewState}
                fieldStyle={fieldStyle}
                onChange={(event) => setValues((current) => ({
                  ...current,
                  value: event.target.value,
                }))}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
