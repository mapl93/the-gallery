import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface TimelinePrimitiveStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const timelineFixture = [
  {
    date: '2024',
    title: 'Studio founded',
    content: 'The first collection takes shape in Buenos Aires.',
  },
  {
    date: '2025',
    title: 'Gallery opens',
    content: 'The collection becomes available to a wider audience.',
  },
  {
    date: '2026',
    title: 'New chapter',
    content: 'The studio expands its material research.',
  },
];

const statusLabels: Record<string, string> = {
  current: 'Current',
  completed: 'Completed',
  delayed: 'Delayed',
  warning: 'Warning',
  error: 'Error',
};

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

export default function TimelinePrimitiveStudio({
  contract,
  definition,
}: TimelinePrimitiveStudioProps) {
  const initialValues = useMemo<StudioPropertyValues>(() => ({
    // The selected entry state is preview content, not the contract default.
    status: 'current',
  }), []);
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
  const stateValue = typeof values.status === 'string' ? values.status : 'default';

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
          stateValue={stateValue}
          tokenValues={tokenValues}
          activeTokens={{
            'marker-outline': '--color-border-subtle',
            'marker-fill': '--color-surface-primary',
            'current-marker': '--color-button-primary-bg-default',
            'completed-marker': '--color-feedback-success-default',
            'delayed-marker': '--color-feedback-warning-bg',
            'warning-marker': '--color-feedback-warning-default',
            'error-marker': '--color-feedback-error-default',
            'date-color': '--color-text-disabled',
            'title-color': '--color-text-primary',
            'content-color': '--color-text-secondary',
          }}
          onPropertiesChange={(next) => setValues((previous) => ({ ...previous, ...next }))}
          onSlotIconChange={() => undefined}
          onStateChange={(nextState) => setValues((previous) => ({
            ...previous,
            status: nextState,
          }))}
          onTokenChange={(token, value) => setTokenOverrides((previous) => ({
            ...previous,
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
            <ol className="timeline docs-studio__preview-timeline">
              {timelineFixture.map((item, index) => {
                const itemStatus = index === 1 ? stateValue : 'default';
                const isCurrent = itemStatus === 'current';
                return (
                  <li
                    className="timeline__item"
                    data-status={itemStatus === 'default' ? undefined : itemStatus}
                    aria-current={isCurrent ? 'step' : undefined}
                    key={`${item.date}-${item.title}`}
                  >
                    <div className="timeline__meta">
                      <span className="timeline__date">{item.date}</span>
                      {statusLabels[itemStatus] && (
                        <span className="timeline__status">{statusLabels[itemStatus]}</span>
                      )}
                    </div>
                    <h4 className="timeline__title">{item.title}</h4>
                    <p className="timeline__content">{item.content}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
