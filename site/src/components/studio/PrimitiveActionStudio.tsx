import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { getStudioLucideIcon } from './lucideCatalogue';

interface PrimitiveActionStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

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

  if (contract.slug === 'button-group') {
    values.groupLabel = 'Display options';
  } else if (contract.slug === 'icon-button') {
    values.accessibleLabel = 'Settings';
    values.icon = true;
  } else if (contract.slug === 'close-button') {
    values.accessibleLabel = 'Close dialog';
    values.icon = true;
  } else if (contract.slug === 'toggle') {
    values.groupLabel = 'View mode';
  } else if (contract.slug === 'fab') {
    values.accessibleLabel = 'Scroll to top';
    values.icon = true;
    values.visible = true;
  }

  return values;
}

function initialIconsFor(slug: string): StudioSlotIconValues {
  return {
    leading: slug === 'close-button' ? 'x' : slug === 'fab' ? 'arrow-up' : 'settings',
    trailing: 'arrow-right',
  };
}

function initialStateFor(slug: string): string {
  return slug === 'fab' ? 'visible' : 'default';
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
  values: StudioPropertyValues,
  state: string
): Record<string, string | null> {
  if (slug === 'icon-button') {
    const filled = values.variant === 'filled';
    return {
      background: state === 'filledHover'
        ? '--color-border-subtle'
        : filled || state === 'hover'
          ? '--color-surface-secondary'
          : null,
      text: filled || state === 'hover' ? '--color-text-primary' : '--color-text-secondary',
      focus: '--color-border-focus',
    };
  }

  if (slug === 'close-button') {
    return {
      background: state === 'hover' ? '--color-surface-secondary' : null,
      text: state === 'hover' ? '--color-text-primary' : '--color-text-secondary',
      focus: '--color-border-focus',
    };
  }

  if (slug === 'toggle') {
    return {
      'selected-surface': '--color-button-primary-bg-default',
      'hover-surface': '--color-surface-secondary',
      'default-text': '--color-text-secondary',
      'selected-text': '--color-button-primary-text-default',
      'default-border': '--color-border-subtle',
      focus: '--color-border-focus',
    };
  }

  if (slug === 'fab') {
    return {
      background: state === 'hover' ? '--color-surface-secondary' : '--color-surface-primary',
      text: '--color-text-primary',
      border: '--color-border-subtle',
      focus: '--color-border-focus',
    };
  }

  return {};
}

function focusStyle(state: string): CSSProperties | undefined {
  if (state !== 'focusVisible') return undefined;
  return {
    outline: '2px solid var(--color-border-focus)',
    outlineOffset: 2,
  };
}

export default function PrimitiveActionStudio({
  contract,
  definition,
}: PrimitiveActionStudioProps) {
  const initialValues = useMemo(() => initialValuesFor(contract), [contract]);
  const initialIcons = useMemo(() => initialIconsFor(contract.slug), [contract.slug]);
  const studioTokens = useMemo(
    () => collectStudioTokens(definition, contract),
    [definition, contract]
  );
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [slotIconValues, setSlotIconValues] = useState<StudioSlotIconValues>(initialIcons);
  const [previewState, setPreviewState] = useState(initialStateFor(contract.slug));
  const [selectedToggle, setSelectedToggle] = useState(0);
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
  const activeTokens = activeTokensFor(contract.slug, values, previewState);
  const Icon = getStudioLucideIcon(slotIconValues.leading);
  const disabled = values.disabled === true;

  function handleStateChange(state: string) {
    setPreviewState(state);
    setValues((current) => {
      if (contract.slug === 'fab') {
        return {
          ...current,
          visible: state !== 'hidden',
          disabled: state === 'disabled',
        };
      }

      return {
        ...current,
        disabled: state === 'disabled',
        variant: contract.slug === 'icon-button' && state === 'filledHover'
          ? 'filled'
          : current.variant,
      };
    });
  }

  function handleReset() {
    setValues({ ...initialValues });
    setSlotIconValues({ ...initialIcons });
    setPreviewState(initialStateFor(contract.slug));
    setSelectedToggle(0);
    setTokenOverrides({});
  }

  function renderPreview() {
    if (contract.slug === 'button-group') {
      return (
        <div
          className={[
            'btn-group',
            'docs-studio__preview-button-group',
            optionClass(contract.variants, values.variant),
          ].filter(Boolean).join(' ')}
          role="group"
          aria-label={String(values.groupLabel ?? '')}
        >
          {['Option 1', 'Option 2', 'Option 3'].map((label) => (
            <button className="btn btn--outline" type="button" key={label}>{label}</button>
          ))}
        </div>
      );
    }

    if (contract.slug === 'icon-button') {
      const style: CSSProperties = {
        ...(previewState === 'hover'
          ? { background: 'var(--color-surface-secondary)', color: 'var(--color-text-primary)' }
          : previewState === 'filledHover'
            ? { background: 'var(--color-border-subtle)' }
            : {}),
        ...focusStyle(previewState),
      };
      return (
        <button
          className={[
            'icon-btn',
            'docs-studio__preview-icon-button',
            optionClass(contract.variants, values.variant),
            optionClass(contract.sizes, values.size),
            values.round === true ? 'icon-btn--round' : null,
          ].filter(Boolean).join(' ')}
          type="button"
          aria-label={String(values.accessibleLabel ?? '')}
          disabled={disabled}
          style={style}
        >
          {Icon && <Icon className="icon-btn__icon" aria-hidden="true" />}
        </button>
      );
    }

    if (contract.slug === 'close-button') {
      const style: CSSProperties = {
        ...(previewState === 'hover'
          ? { background: 'var(--color-surface-secondary)', color: 'var(--color-text-primary)' }
          : {}),
        ...focusStyle(previewState),
      };
      return (
        <button
          className="close-btn docs-studio__preview-close-button"
          type="button"
          aria-label={String(values.accessibleLabel ?? '')}
          disabled={disabled}
          style={style}
        >
          {Icon && <Icon className="close-btn__icon" aria-hidden="true" />}
        </button>
      );
    }

    if (contract.slug === 'toggle') {
      return (
        <div
          className="toggle-group docs-studio__preview-toggle-group"
          role="group"
          aria-label={String(values.groupLabel ?? '')}
        >
          {['Option 1', 'Option 2', 'Option 3'].map((label, index) => {
            const pressed = selectedToggle === index;
            const simulateHover = previewState === 'hover' && index === 1 && !pressed;
            const simulateFocus = previewState === 'focusVisible' && index === selectedToggle;
            return (
              <button
                className={['toggle', pressed ? 'toggle--active' : null].filter(Boolean).join(' ')}
                type="button"
                aria-pressed={pressed}
                disabled={disabled}
                style={{
                  ...(simulateHover ? { background: 'var(--color-surface-secondary)' } : {}),
                  ...(simulateFocus ? focusStyle('focusVisible') : {}),
                }}
                onClick={() => setSelectedToggle(index)}
                key={label}
              >
                {label}
              </button>
            );
          })}
        </div>
      );
    }

    const visible = values.visible === true;
    const style: CSSProperties = {
      ...(previewState === 'hover' ? { background: 'var(--color-surface-secondary)' } : {}),
      ...focusStyle(previewState),
    };
    return (
      <div className="docs-studio__fab-stage">
        <button
          className={[
            'fab',
            'docs-studio__preview-fab',
            visible ? 'fab--visible' : null,
          ].filter(Boolean).join(' ')}
          type="button"
          aria-label={String(values.accessibleLabel ?? '')}
          disabled={disabled}
          style={style}
        >
          {Icon && <Icon className="fab__icon" aria-hidden="true" />}
        </button>
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
          stateValue={previewState}
          tokenValues={tokenValues}
          activeTokens={activeTokens}
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={(slot, iconName) => (
            setSlotIconValues((current) => ({ ...current, [slot]: iconName }))
          )}
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
          <div className="docs-studio__stage-inner">{renderPreview()}</div>
        </section>
      </div>
    </div>
  );
}
