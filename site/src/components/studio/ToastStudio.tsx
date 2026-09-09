import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { getStudioLucideIcon } from './lucideCatalogue';

interface ToastStudioProps {
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

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

function variantClass(contract: ComponentContract, value: StudioPropertyValue): string | null {
  return contract.variants.find((option) => option.name === value)?.className?.replace(/^\./, '') ?? null;
}

export default function ToastStudio({ contract, definition }: ToastStudioProps) {
  const initialValues = useMemo<StudioPropertyValues>(() => {
    const result = Object.fromEntries((contract.properties ?? []).map((property) => (
      [property.name, defaultValue(contract, property)]
    ))) as StudioPropertyValues;
    Object.assign(result, {
      title: 'Saved',
      message: 'Your changes have been saved.',
      variant: 'success',
      icon: true,
      action: true,
      dismissAction: true,
      dismissLabel: 'Dismiss notification',
      announcement: 'polite',
      visible: true,
    });
    return result;
  }, [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const initialIcons = useMemo<StudioSlotIconValues>(() => ({ leading: 'check', trailing: '' }), []);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [slotIconValues, setSlotIconValues] = useState<StudioSlotIconValues>(initialIcons);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [triggerVisible, setTriggerVisible] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

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
  const visible = values.visible === true;
  const variant = String(values.variant || 'info');
  const announcement = String(values.announcement || 'none');
  const Icon = getStudioLucideIcon(slotIconValues.leading);
  const CloseIcon = getStudioLucideIcon('x');

  function setVisible(next: boolean) {
    if (!next) setTriggerVisible(true);
    setValues((current) => ({ ...current, visible: next }));
  }

  function dismiss() {
    setVisible(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function reset() {
    setValues({ ...initialValues });
    setSlotIconValues({ ...initialIcons });
    setTokenOverrides({});
    setTriggerVisible(false);
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
          stateValue={visible ? 'visible' : 'hidden'}
          tokenValues={tokenValues}
          activeTokens={{
            surface: '--color-surface-primary',
            'default-border': null,
            'title-color': '--color-text-primary',
            'message-color': '--color-text-secondary',
            feedback: `--color-feedback-${variant}-default`,
            radius: '--radius-md',
            shadow: '--shadow-lg',
            'type-size': '--typo-body-sm-size',
            'type-line-height': '--typo-body-sm-line-height',
            spacing: '--space-layout-element-gap',
          }}
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={(slot, iconName) => setSlotIconValues((current) => ({ ...current, [slot]: iconName }))}
          onStateChange={(next) => setVisible(next === 'visible')}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />

        <section
          className="docs-studio__stage"
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className="docs-studio__stage-inner docs-studio__toast-fixture">
            {triggerVisible && (
              <button ref={triggerRef} className="btn btn--outline" type="button" onClick={() => setVisible(true)}>Show toast</button>
            )}
            {visible && (
              <div
                className={['toast', variantClass(contract, values.variant), 'is-visible', 'docs-studio__preview-toast'].filter(Boolean).join(' ')}
                aria-hidden="false"
              >
                {values.icon === true && Icon && <Icon className="toast__icon" aria-hidden="true" />}
                <div
                  className="toast__content"
                  role={announcement === 'assertive' ? 'alert' : announcement === 'polite' ? 'status' : undefined}
                  aria-live={announcement === 'none' ? undefined : announcement as 'polite' | 'assertive'}
                  aria-atomic={announcement === 'none' ? undefined : 'true'}
                >
                  {String(values.title || '') && <p className="toast__title">{String(values.title)}</p>}
                  <p className="toast__message">{String(values.message || '')}</p>
                </div>
                {values.action === true && (
                  <button className="btn btn--link btn--sm toast__action" type="button" onClick={dismiss}>Undo</button>
                )}
                {values.dismissAction === true && (
                  <button
                    className="close-btn toast__close"
                    type="button"
                    aria-label={String(values.dismissLabel || 'Dismiss notification')}
                    onClick={dismiss}
                  >
                    {CloseIcon && <CloseIcon className="close-btn__icon" aria-hidden="true" />}
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
