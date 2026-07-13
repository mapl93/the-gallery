import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractOption } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface DividerStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

function optionClass(options: ContractOption[], value: StudioPropertyValue): string | null {
  return options.find((option) => option.name === value)?.className?.replace(/^\./, '') ?? null;
}

export default function DividerStudio({ contract, definition }: DividerStudioProps) {
  const initialValues = useMemo<StudioPropertyValues>(() => ({
    variant: contract.variants.find((option) => option.default)?.name ?? 'default',
    orientation: 'horizontal',
    semantics: 'decorative',
  }), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const slotIconValues = useMemo<StudioSlotIconValues>(() => ({
    leading: 'minus',
    trailing: 'minus',
  }), []);
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
    const observer = new MutationObserver(read);
    read();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [studioTokens]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };
  const variantClass = optionClass(contract.variants, values.variant);
  const activeRuleToken = values.variant === 'decorative'
    ? '--color-border-decorative'
    : '--color-border-subtle';

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
          slotIconValues={slotIconValues}
          stateValue={contract.states[0]?.name ?? 'default'}
          tokenValues={tokenValues}
          activeTokens={{ 'rule-color': activeRuleToken }}
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({
            ...current,
            [token]: value,
          }))}
          onReset={reset}
        />
        <section
          className="docs-studio__stage"
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className={[
            'docs-studio__stage-inner',
            'docs-studio__preview-divider',
            values.orientation === 'vertical' ? 'docs-studio__preview-divider--vertical' : null,
          ].filter(Boolean).join(' ')}>
            <hr
              className={['divider', variantClass].filter(Boolean).join(' ')}
              data-orientation={values.orientation === 'vertical' ? 'vertical' : undefined}
              aria-hidden={values.semantics === 'decorative' ? 'true' : undefined}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
