import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { getStudioLucideIcon } from './lucideCatalogue';

interface EmptyStateStudioProps {
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

export default function EmptyStateStudio({ contract, definition }: EmptyStateStudioProps) {
  const initialValues = useMemo<StudioPropertyValues>(() => ({
    title: 'Nothing here yet',
    message: 'Start browsing to discover unique artisan pieces.',
    icon: true,
    action: true,
  }), []);
  const initialIcons = useMemo<StudioSlotIconValues>(() => ({
    leading: 'shopping-bag',
    trailing: 'arrow-right',
  }), []);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [slotIconValues, setSlotIconValues] = useState<StudioSlotIconValues>(initialIcons);
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

  const Icon = getStudioLucideIcon(slotIconValues.leading);
  const tokenValues = { ...baseTokenValues, ...tokenOverrides };

  function reset() {
    setValues({ ...initialValues });
    setSlotIconValues({ ...initialIcons });
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
          activeTokens={{
            'icon-color': '--color-text-disabled',
            'title-color': '--color-text-primary',
            'message-color': '--color-text-secondary',
          }}
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={(slot, iconName) => setSlotIconValues((current) => ({
            ...current,
            [slot]: iconName,
          }))}
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
          <div className="docs-studio__stage-inner">
            <div className="empty-state docs-studio__preview-empty-state">
              {values.icon === true && Icon && (
                <div className="empty-state__icon" aria-hidden="true">
                  <Icon />
                </div>
              )}
              <h2 className="empty-state__title">{String(values.title || '')}</h2>
              {String(values.message || '') && (
                <p className="empty-state__message">{String(values.message)}</p>
              )}
              {values.action === true && (
                <button className="btn" type="button">Explore components</button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
