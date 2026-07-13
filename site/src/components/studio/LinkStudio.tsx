import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface LinkStudioProps {
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

function initialLinkValues(contract: ComponentContract): StudioPropertyValues {
  const values = Object.fromEntries((contract.properties ?? []).map((property) => (
    [property.name, defaultPropertyValue(contract, property)]
  ))) as StudioPropertyValues;

  // Preview content only; these values are not component defaults.
  values.label = 'View the collection';
  values.href = '#link-studio-destination';
  return values;
}

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

function optionClass(
  options: ComponentContract['variants'],
  value: StudioPropertyValue
): string | null {
  return options.find((option) => option.name === value)?.className?.replace(/^\./, '') ?? null;
}

export default function LinkStudio({ contract, definition }: LinkStudioProps) {
  const initialValues = useMemo(() => initialLinkValues(contract), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    const readTokenValues = () => {
      const computed = getComputedStyle(document.documentElement);
      setBaseTokenValues(Object.fromEntries(studioTokens.map((token) => (
        [token, computed.getPropertyValue(token).trim()]
      ))));
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

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };
  const variant = typeof values.variant === 'string' ? values.variant : 'default';
  const classes = [
    'link',
    optionClass(contract.variants, values.variant),
  ].filter(Boolean).join(' ');
  const activeTextToken = variant === 'subtle'
    ? '--color-text-secondary'
    : variant === 'nav'
      ? '--color-text-primary'
      : '--color-text-accent';

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
          activeTokens={{
            'text-color': activeTextToken,
            'focus-color': '--color-border-focus',
            'transition-duration': '--transition-fast',
            'transition-easing': '--easing-default',
          }}
          onPropertiesChange={(next) => (
            setValues((current) => ({ ...current, ...next }))
          )}
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
            <a
              className={classes}
              href={String(values.href || '')}
              target={values.target ? String(values.target) : undefined}
              rel={values.rel ? String(values.rel) : undefined}
              aria-current={values.currentPage === true ? 'page' : undefined}
            >
              {String(values.label || '')}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
