import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface RatingStudioProps {
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
    return source?.find((option) => option.default)?.name ?? property.values?.[0] ?? null;
  }
  return '';
}

function initialRatingValues(contract: ComponentContract): StudioPropertyValues {
  const values = Object.fromEntries((contract.properties ?? []).map((property) => (
    [property.name, defaultPropertyValue(contract, property)]
  ))) as StudioPropertyValues;

  // Preview content only; the component contract does not define rating data defaults.
  values.accessibleLabel = '4.5 out of 5 stars, based on 24 reviews';
  values.reviewCount = '(24)';
  return values;
}

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

export default function RatingStudio({ contract, definition }: RatingStudioProps) {
  const initialValues = useMemo(() => initialRatingValues(contract), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    const read = () => {
      const computed = getComputedStyle(document.documentElement);
      setBaseTokenValues(Object.fromEntries(studioTokens.map((token) => (
        [token, computed.getPropertyValue(token).trim()]
      ))));
    };
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const observer = new MutationObserver(read);
    read();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    colorScheme.addEventListener('change', read);
    return () => {
      observer.disconnect();
      colorScheme.removeEventListener('change', read);
    };
  }, [studioTokens]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };
  const accessibleLabel = String(values.accessibleLabel || '');
  const reviewCount = String(values.reviewCount || '');
  const starStates = ['filled', 'filled', 'filled', 'filled', 'half'] as const;
  const activeTokens = {
    'filled-color': '--color-text-accent',
    'empty-color': '--color-border-subtle',
    'count-color': '--color-text-secondary',
  };

  function reset() {
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
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => (
            setTokenOverrides((current) => ({ ...current, [token]: value }))
          )}
          onReset={reset}
        />

        <section
          className="docs-studio__stage"
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className="docs-studio__stage-inner">
            <div className="rating" role="img" aria-label={accessibleLabel}>
              <span className="rating__stars" aria-hidden="true">
                {starStates.map((state, index) => (
                  <span
                    className={`rating__star rating__star--${state}`}
                    key={`${state}-${index}`}
                  >
                    {'\u2605'}
                  </span>
                ))}
              </span>
              {reviewCount && <span className="rating__count">{reviewCount}</span>}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
