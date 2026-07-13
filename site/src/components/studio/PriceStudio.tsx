import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface PriceStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

function initialPropertyValue(
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

function initialPriceValues(contract: ComponentContract): StudioPropertyValues {
  const values = Object.fromEntries(
    (contract.properties ?? []).map((property) => [
      property.name,
      initialPropertyValue(contract, property),
    ])
  ) as StudioPropertyValues;

  // These values belong to the Studio fixture, not to the component contract.
  values.currentPrice = '$120.00';
  values.compareAtPrice = '$150.00';
  values.unitPrice = '$12.00 / 100 g';
  values.variant = 'on-sale';
  values.accessibleLabel = 'Sale price $120.00, previously $150.00';
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

function optionClass(
  options: ComponentContract['variants'],
  value: StudioPropertyValue
): string | null {
  return options.find((option) => option.name === value)?.className?.replace(/^\./, '') ?? null;
}

export default function PriceStudio({ contract, definition }: PriceStudioProps) {
  const initialValues = useMemo(() => initialPriceValues(contract), [contract]);
  const studioTokens = useMemo(
    () => collectStudioTokens(definition, contract),
    [definition, contract]
  );
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
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
  const currentPrice = typeof values.currentPrice === 'string' ? values.currentPrice : '';
  const compareAtPrice = typeof values.compareAtPrice === 'string' ? values.compareAtPrice : '';
  const unitPrice = typeof values.unitPrice === 'string' ? values.unitPrice : '';
  const accessibleLabel = typeof values.accessibleLabel === 'string'
    ? values.accessibleLabel
    : '';
  const activeTokens = {
    'current-color': '--color-text-primary',
    'compare-color': '--color-text-disabled',
    'unit-color': '--color-text-secondary',
  };
  const classes = [
    'price',
    optionClass(contract.variants, values.variant),
  ].filter(Boolean).join(' ');

  function handleReset() {
    setValues({ ...initialValues });
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
          stateValue="default"
          tokenValues={tokenValues}
          activeTokens={activeTokens}
          onPropertiesChange={(next) => (
            setValues((current) => ({ ...current, ...next }))
          )}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
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
            <span
              className={classes}
              role={accessibleLabel ? 'group' : undefined}
              aria-label={accessibleLabel || undefined}
              data-price-alternate-digits={String(values.alternateDigits === true)}
              data-price-slashed-zero={String(values.slashedZero !== false)}
              data-price-tabular-numbers={String(values.tabularNumbers !== false)}
              data-price-contextual-alternates={String(values.contextualAlternates !== false)}
              data-price-fractions={String(values.fractions === true)}
            >
              {variant === 'on-sale' && compareAtPrice && (
                <span className="price__compare">{compareAtPrice}</span>
              )}
              <span className="price__current">{currentPrice}</span>
              {unitPrice && <span className="price__unit">{unitPrice}</span>}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
