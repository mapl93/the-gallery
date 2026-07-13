import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { getStudioLucideIcon } from './lucideCatalogue';

interface FeedbackDisplayStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

function defaultValue(contract: ComponentContract, property: ContractProperty): StudioPropertyValue {
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

function initialValuesFor(contract: ComponentContract): StudioPropertyValues {
  const values = Object.fromEntries((contract.properties ?? []).map((property) => (
    [property.name, defaultValue(contract, property)]
  ))) as StudioPropertyValues;

  if (contract.slug === 'alert') {
    Object.assign(values, {
      title: 'Notice',
      message: 'Your changes have been saved.',
      icon: true,
      dismissAction: true,
      dismissLabel: 'Dismiss notification',
    });
  } else if (contract.slug === 'progress') {
    Object.assign(values, {
      accessibleLabel: 'Upload progress',
      label: 'Uploading',
      value: 65,
      valueText: '65%',
    });
  } else if (contract.slug === 'spinner') {
    values.label = 'Loading collection';
  } else {
    Object.assign(values, {
      value: '1,234',
      label: 'Orders',
      change: '+12%',
      changeDirection: 'up',
    });
  }
  return values;
}

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

function optionClass(options: ComponentContract['variants'], value: StudioPropertyValue): string | null {
  return options.find((option) => option.name === value)?.className?.replace(/^\./, '') ?? null;
}

function numeric(value: StudioPropertyValue, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function activeTokens(slug: string, values: StudioPropertyValues): Record<string, string | null> {
  if (slug === 'alert') {
    return { feedback: `--color-feedback-${String(values.variant || 'info')}-default` };
  }
  if (slug === 'stat') {
    return {
      'change-color': values.changeDirection === 'down'
        ? '--color-feedback-error-default'
        : values.changeDirection === 'up'
          ? '--color-feedback-success-default'
          : null,
    };
  }
  return {};
}

export default function FeedbackDisplayStudio({ contract, definition }: FeedbackDisplayStudioProps) {
  const initialValues = useMemo(() => initialValuesFor(contract), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const initialIcons = useMemo<StudioSlotIconValues>(() => ({ leading: 'check', trailing: 'x' }), []);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [slotIconValues, setSlotIconValues] = useState(initialIcons);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [dismissed, setDismissed] = useState(false);

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
  const Icon = getStudioLucideIcon(slotIconValues.leading);
  const DismissIcon = getStudioLucideIcon('x');

  function reset() {
    setValues({ ...initialValues });
    setSlotIconValues({ ...initialIcons });
    setTokenOverrides({});
    setDismissed(false);
  }

  function renderPreview() {
    if (contract.slug === 'alert') {
      if (dismissed) return <p className="docs-studio__preview-removal" role="status">Alert dismissed</p>;
      const announcement = String(values.announcement || 'none');
      return (
        <div
          className={['alert', 'docs-studio__preview-alert', optionClass(contract.variants, values.variant)].filter(Boolean).join(' ')}
          role={announcement === 'assertive' ? 'alert' : announcement === 'polite' ? 'status' : undefined}
          aria-live={announcement === 'none' ? undefined : announcement as 'polite' | 'assertive'}
        >
          {values.icon === true && Icon && <Icon className="alert__icon" aria-hidden="true" />}
          <div className="alert__content">
            {String(values.title || '') && <p className="alert__title">{String(values.title)}</p>}
            <p className="alert__message">{String(values.message || '')}</p>
          </div>
          {values.dismissAction === true && (
            <button
              className="close-btn alert__dismiss"
              type="button"
              aria-label={String(values.dismissLabel || 'Dismiss alert')}
              onClick={() => setDismissed(true)}
            >
              {DismissIcon && <DismissIcon className="close-btn__icon" aria-hidden="true" />}
            </button>
          )}
        </div>
      );
    }

    if (contract.slug === 'progress') {
      const min = numeric(values.min, 0);
      const max = Math.max(numeric(values.max, 100), min + Number.EPSILON);
      const current = Math.min(max, Math.max(min, numeric(values.value, min)));
      const percent = ((current - min) / (max - min)) * 100;
      const indeterminate = values.indeterminate === true;
      const circle = values.variant === 'circle' && !indeterminate;
      const common = {
        role: 'progressbar',
        'aria-label': String(values.accessibleLabel || 'Progress'),
        'aria-valuemin': min,
        'aria-valuemax': max,
        'aria-valuenow': indeterminate ? undefined : current,
        'aria-valuetext': String(values.valueText || '') || undefined,
      } as const;

      if (circle) {
        return (
          <div className="progress-circle docs-studio__preview-progress-circle" {...common}>
            <svg viewBox="0 0 36 36" aria-hidden="true">
              <circle className="progress-circle__bg" cx="18" cy="18" r="15.9" />
              <circle className="progress-circle__fill" cx="18" cy="18" r="15.9" strokeDasharray={`${percent} ${100 - percent}`} />
            </svg>
            {String(values.valueText || '') && <span className="progress-circle__text">{String(values.valueText)}</span>}
          </div>
        );
      }

      return (
        <div className={['progress', 'docs-studio__preview-progress', indeterminate ? 'progress--indeterminate' : null].filter(Boolean).join(' ')} aria-busy={indeterminate || undefined} {...common}>
          {(String(values.label || '') || String(values.valueText || '')) && (
            <div className="progress__label">
              <span className="progress__label-text">{String(values.label || '')}</span>
              {!indeterminate && <span className="progress__value">{String(values.valueText || '')}</span>}
            </div>
          )}
          <div className="progress__track"><div className="progress__bar" style={indeterminate ? undefined : { width: `${percent}%` }} /></div>
        </div>
      );
    }

    if (contract.slug === 'spinner') {
      const spinner = <span className={['spinner', optionClass(contract.sizes, values.size)].filter(Boolean).join(' ')} aria-hidden="true" />;
      const label = String(values.label || '');
      return label ? (
        <div className="spinner-overlay docs-studio__preview-spinner" role="status">
          {spinner}<span className="spinner-overlay__text">{label}</span>
        </div>
      ) : spinner;
    }

    const direction = String(values.changeDirection || 'neutral');
    const change = String(values.change || '');
    return (
      <div
        className="stat docs-studio__preview-stat"
        data-stat-alternate-digits={String(values.alternateDigits === true)}
        data-stat-slashed-zero={String(values.slashedZero !== false)}
        data-stat-tabular-numbers={String(values.tabularNumbers !== false)}
        data-stat-contextual-alternates={String(values.contextualAlternates !== false)}
        data-stat-fractions={String(values.fractions === true)}
      >
        <span className="stat__value">{String(values.value || '')}</span>
        <span className="stat__label">{String(values.label || '')}</span>
        {change && <span className="stat__change" data-direction={direction === 'neutral' ? undefined : direction}>{change}</span>}
      </div>
    );
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
          activeTokens={activeTokens(contract.slug, values)}
          onPropertiesChange={(next) => { setValues((current) => ({ ...current, ...next })); setDismissed(false); }}
          onSlotIconChange={(slot, iconName) => setSlotIconValues((current) => ({ ...current, [slot]: iconName }))}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />
        <section className="docs-studio__stage" aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}>
          <div className="docs-studio__stage-inner">{renderPreview()}</div>
        </section>
      </div>
    </div>
  );
}
