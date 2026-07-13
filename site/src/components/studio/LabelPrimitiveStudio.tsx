import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface LabelPrimitiveStudioProps {
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

function initialValuesFor(contract: ComponentContract): StudioPropertyValues {
  const values = Object.fromEntries(
    (contract.properties ?? []).map((property) => [
      property.name,
      defaultPropertyValue(contract, property),
    ])
  ) as StudioPropertyValues;

  if (contract.slug === 'badge') {
    values.label = 'Limited edition';
  } else {
    values.label = 'Stoneware';
    values.removeAction = true;
    values.removeLabel = 'Remove Stoneware filter';
  }
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

function activeTokensFor(
  slug: string,
  variant: string
): Record<string, string | null> {
  if (slug === 'badge') {
    return {
      background: `--color-feedback-${variant}-bg`,
      text: `--color-feedback-${variant}-default`,
    };
  }

  return {
    background: '--color-surface-secondary',
    text: '--color-text-secondary',
    border: '--color-border-subtle',
    focus: '--color-border-focus',
  };
}

export default function LabelPrimitiveStudio({
  contract,
  definition,
}: LabelPrimitiveStudioProps) {
  const initialValues = useMemo(() => initialValuesFor(contract), [contract]);
  const studioTokens = useMemo(
    () => collectStudioTokens(definition, contract),
    [definition, contract]
  );
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [previewState, setPreviewState] = useState('default');
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [removed, setRemoved] = useState(false);

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
  const label = typeof values.label === 'string' ? values.label : '';
  const variant = typeof values.variant === 'string' ? values.variant : 'info';
  const activeTokens = useMemo(
    () => activeTokensFor(contract.slug, variant),
    [contract.slug, variant]
  );
  const removeAction = values.removeAction === true;
  const removalDisabled = values.removalDisabled === true;
  const removeLabel = typeof values.removeLabel === 'string' && values.removeLabel
    ? values.removeLabel
    : undefined;

  function handleStateChange(state: string) {
    setPreviewState(state);
    if (contract.slug === 'tag') {
      setValues((current) => ({
        ...current,
        removalDisabled: state === 'removeDisabled',
      }));
    }
  }

  function handleReset() {
    setValues({ ...initialValues });
    setPreviewState('default');
    setTokenOverrides({});
    setRemoved(false);
  }

  const removeStyle: CSSProperties = previewState === 'removeHover'
    ? { opacity: 1 }
    : previewState === 'removeFocusVisible'
      ? { outline: '2px solid var(--color-border-focus)', outlineOffset: 2 }
      : {};

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
          onPropertiesChange={(next) => {
            setValues((current) => ({ ...current, ...next }));
            setRemoved(false);
          }}
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
            {contract.slug === 'badge' ? (
              <span
                className={[
                  'badge',
                  'docs-studio__preview-badge',
                  optionClass(contract.variants, values.variant),
                ].filter(Boolean).join(' ')}
                role={values.announceChanges === true ? 'status' : undefined}
              >
                {label}
              </span>
            ) : removed ? (
              <p className="docs-studio__preview-removal" role="status">Tag removed</p>
            ) : (
              <span className="tag docs-studio__preview-tag">
                <span className="tag__label">{label}</span>
                {removeAction && (
                  <button
                    className="tag__remove"
                    type="button"
                    aria-label={removeLabel}
                    disabled={removalDisabled}
                    data-studio-state={previewState}
                    style={removeStyle}
                    onClick={() => setRemoved(true)}
                  />
                )}
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
