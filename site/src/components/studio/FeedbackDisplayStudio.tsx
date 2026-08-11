import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { getStudioLucideIcon } from './lucideCatalogue';
import AlertArtwork, { type AlertArtworkVariant } from './AlertArtwork';
import ProgressArtwork from './ProgressArtwork';
import StatArtwork from './StatArtwork';

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
      displayValue: '65%',
      valueText: '65 percent complete',
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

function mergeValues(
  slug: string,
  current: StudioPropertyValues,
  next: StudioPropertyValues,
): StudioPropertyValues {
  const merged = { ...current, ...next };
  if (slug !== 'progress') return merged;

  if (next.variant === 'circle') {
    merged.indeterminate = false;
  } else if (next.indeterminate === true) {
    merged.variant = 'bar';
  }

  const min = numeric(merged.min, 0);
  const max = numeric(merged.max, 100);
  if (max <= min) {
    if ('max' in next && !('min' in next)) {
      merged.min = max - 1;
    } else {
      merged.max = min + 1;
    }
  }

  return merged;
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
      const variant = String(values.variant || 'info') as AlertArtworkVariant;
      return (
        <AlertArtwork
          className="docs-studio__preview-alert"
          title={String(values.title || '')}
          message={String(values.message || '')}
          variant={variant}
          announcement={announcement as 'none' | 'polite' | 'assertive'}
          icon={values.icon === true && Icon
            ? <Icon className="alert__icon" aria-hidden="true" />
            : undefined}
          dismissAction={values.dismissAction === true ? (
            <button
              className="close-btn alert__dismiss"
              type="button"
              aria-label={String(values.dismissLabel ?? '')}
              onClick={() => setDismissed(true)}
            >
              {DismissIcon && <DismissIcon className="close-btn__icon" aria-hidden="true" />}
            </button>
          ) : undefined}
        />
      );
    }

    if (contract.slug === 'progress') {
      return (
        <ProgressArtwork
          className={values.variant === 'circle'
            ? 'docs-studio__preview-progress-circle'
            : 'docs-studio__preview-progress'}
          accessibleLabel={String(values.accessibleLabel ?? '')}
          label={String(values.label ?? '')}
          variant={values.variant === 'circle' ? 'circle' : 'bar'}
          value={typeof values.value === 'number' && Number.isFinite(values.value) ? values.value : undefined}
          min={numeric(values.min, 0)}
          max={numeric(values.max, 100)}
          displayValue={String(values.displayValue ?? '')}
          valueText={String(values.valueText ?? '')}
          indeterminate={values.indeterminate === true}
        />
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

    const direction = String(values.changeDirection || 'neutral') as 'neutral' | 'up' | 'down';
    return (
      <StatArtwork
        value={String(values.value || '')}
        label={String(values.label || '')}
        change={String(values.change || '')}
        changeDirection={direction}
        alternateDigits={values.alternateDigits === true}
        slashedZero={values.slashedZero !== false}
        tabularNumbers={values.tabularNumbers !== false}
        contextualAlternates={values.contextualAlternates !== false}
        fractions={values.fractions === true}
        className="docs-studio__preview-stat"
      />
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
          onPropertiesChange={(next) => { setValues((current) => mergeValues(contract.slug, current, next)); setDismissed(false); }}
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
