import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import PriceArtwork from './PriceArtwork';

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
  values.currentPriceLabel = 'Sale price';
  values.compareAtPrice = '$150.00';
  values.compareAtPriceLabel = 'Regular price';
  values.unitPrice = '$12.00 / 100 g';
  values.unitPriceLabel = 'Unit price';
  values.variant = 'on-sale';
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
  const currentPriceLabel = typeof values.currentPriceLabel === 'string'
    ? values.currentPriceLabel
    : '';
  const compareAtPrice = typeof values.compareAtPrice === 'string' ? values.compareAtPrice : '';
  const compareAtPriceLabel = typeof values.compareAtPriceLabel === 'string'
    ? values.compareAtPriceLabel
    : '';
  const unitPrice = typeof values.unitPrice === 'string' ? values.unitPrice : '';
  const unitPriceLabel = typeof values.unitPriceLabel === 'string'
    ? values.unitPriceLabel
    : '';
  const activeTokens = {
    'current-color': '--color-text-primary',
    'supporting-color': '--color-text-secondary',
  };
  const priceClass = optionClass(contract.variants, values.variant);

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
            <PriceArtwork
              className={priceClass}
              variant={variant}
              currentPrice={currentPrice}
              currentPriceLabel={currentPriceLabel}
              compareAtPrice={compareAtPrice}
              compareAtPriceLabel={compareAtPriceLabel}
              unitPrice={unitPrice}
              unitPriceLabel={unitPriceLabel}
              alternateDigits={values.alternateDigits === true}
              tabularNumbers={values.tabularNumbers !== false}
              contextualAlternates={values.contextualAlternates !== false}
              fractions={values.fractions === true}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
