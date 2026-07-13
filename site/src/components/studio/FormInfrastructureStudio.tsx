import { useEffect, useMemo, useState, type CSSProperties, type FormEvent, type ReactElement } from 'react';
import { CircleAlert } from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface FormInfrastructureStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };
const feedbackMessages: Record<string, string> = {
  error: 'Enter a valid email address.',
  success: 'Email address verified.',
  warning: 'Double-check this email address.',
};

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

function fixtureValues(slug: string): StudioPropertyValues {
  if (slug === 'field-wrapper') return { label: 'Email address', description: 'Used only for order updates.', variant: 'default', required: true };
  if (slug === 'fieldset') return { legend: 'Delivery preference', description: 'Choose one option for this order.', disabled: false, describedBy: 'studio-fieldset-description' };
  if (slug === 'inline-error') return { message: 'Enter a valid email address.', icon: true, announcement: 'polite' };
  if (slug === 'form') return { columns: 'two', errorSummary: false, actions: true, noValidate: false, autocomplete: 'on' };
  return {};
}

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

function variantClass(contract: ComponentContract, value: StudioPropertyValue): string | null {
  return contract.variants.find((variant) => variant.name === value)?.className?.replace(/^\./, '') ?? null;
}

export default function FormInfrastructureStudio({ contract, definition }: FormInfrastructureStudioProps) {
  const initialValues = useMemo<StudioPropertyValues>(() => ({
    ...Object.fromEntries((contract.properties ?? []).map((property) => [property.name, defaultValue(contract, property)])),
    ...fixtureValues(contract.slug),
  }), [contract]);
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
    const observer = new MutationObserver(read);
    read();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [studioTokens]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };

  function reset() {
    setValues({ ...initialValues });
    setTokenOverrides({});
  }

  function renderFieldWrapper() {
    const variant = String(values.variant || 'default');
    const message = feedbackMessages[variant];
    const rootClass = ['field', variantClass(contract, values.variant), 'docs-studio__preview-field-wrapper'].filter(Boolean).join(' ');
    const inputClass = ['input', variant === 'default' ? null : `input--${variant}`].filter(Boolean).join(' ');
    const messageClass = variant === 'error' ? 'field__error' : variant === 'success' ? 'field__success' : 'field__warning';
    return (
      <div className={rootClass}>
        <label className={`field__label${values.required === true ? ' field__label--required' : ''}`} htmlFor="studio-field-wrapper-input">{String(values.label || '')}</label>
        <div className={inputClass}>
          <input className="input__field" id="studio-field-wrapper-input" type="email" defaultValue="studio@example.com" required={values.required === true} aria-invalid={variant === 'error' || undefined} aria-describedby="studio-field-wrapper-description studio-field-wrapper-feedback" />
        </div>
        {String(values.description || '') && <span className="field__description" id="studio-field-wrapper-description">{String(values.description)}</span>}
        {message && <span className={messageClass} id="studio-field-wrapper-feedback" role={variant === 'error' ? 'alert' : undefined}>{message}</span>}
      </div>
    );
  }

  function renderFieldset() {
    const describedBy = String(values.describedBy || '') || undefined;
    return (
      <fieldset className="fieldset docs-studio__preview-fieldset" disabled={values.disabled === true} aria-describedby={describedBy}>
        <legend className="fieldset__legend">{String(values.legend || '')}</legend>
        {String(values.description || '') && <div className="fieldset__description" id={describedBy}>{String(values.description)}</div>}
        <div className="docs-studio__fieldset-options">
          {['Standard delivery', 'Studio pickup', 'Schedule later'].map((label, index) => (
            <label key={label}><input type="radio" name="studio-delivery" defaultChecked={index === 0} /> <span>{label}</span></label>
          ))}
        </div>
      </fieldset>
    );
  }

  function renderInlineError() {
    const announcement = String(values.announcement || 'polite');
    return (
      <div className="inline-error docs-studio__preview-inline-error" role={announcement === 'assertive' ? 'alert' : announcement === 'polite' ? 'status' : undefined} aria-live={announcement === 'none' ? undefined : announcement as 'polite' | 'assertive'}>
        {values.icon === true && <CircleAlert className="inline-error__icon" aria-hidden="true" />}
        <span>{String(values.message || '')}</span>
      </div>
    );
  }

  function renderForm() {
    const columns = String(values.columns || 'one');
    const preventSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();
    return (
      <form className="form docs-studio__preview-form" noValidate={values.noValidate === true} autoComplete={String(values.autocomplete || 'on')} onSubmit={preventSubmit}>
        {values.errorSummary === true && (
          <div className="form__error-summary" role="alert" aria-labelledby="studio-form-errors-title">
            <p className="form__error-summary-title" id="studio-form-errors-title">Review the highlighted field</p>
            <ul className="form__error-summary-list"><li><a href="#studio-form-email">Enter a valid email address.</a></li></ul>
          </div>
        )}
        <section className="form__section" aria-labelledby="studio-form-section-title">
          <h2 className="form__section-title" id="studio-form-section-title">Contact details</h2>
          <div className="form__row" data-columns={columns}>
            <div className="field">
              <label className="field__label" htmlFor="studio-form-name">Name</label>
              <div className="input"><input className="input__field" id="studio-form-name" type="text" defaultValue="Avery Stone" /></div>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="studio-form-email">Email</label>
              <div className={`input${values.errorSummary === true ? ' input--error' : ''}`}><input className="input__field" id="studio-form-email" type="email" defaultValue="avery@example.com" aria-invalid={values.errorSummary === true || undefined} /></div>
            </div>
            {columns === 'three' && (
              <div className="field">
                <label className="field__label" htmlFor="studio-form-phone">Phone</label>
                <div className="input"><input className="input__field" id="studio-form-phone" type="tel" defaultValue="+54 11 5555 0101" /></div>
              </div>
            )}
          </div>
        </section>
        {values.actions === true && <div className="form__actions"><button className="btn btn--outline" type="button">Cancel</button><button className="btn" type="submit">Save</button></div>}
      </form>
    );
  }

  const renderers: Record<string, () => ReactElement> = {
    'field-wrapper': renderFieldWrapper,
    fieldset: renderFieldset,
    'inline-error': renderInlineError,
    form: renderForm,
  };

  const activeTokens: Record<string, string | null> = {
    text: '--color-text-primary',
    secondary: contract.tokens.public.color?.includes('--color-text-secondary') ? '--color-text-secondary' : null,
    error: contract.tokens.public.color?.includes('--color-feedback-error-default') ? '--color-feedback-error-default' : null,
    success: contract.tokens.public.color?.includes('--color-feedback-success-default') ? '--color-feedback-success-default' : null,
    warning: contract.tokens.public.color?.includes('--color-feedback-warning-default') ? '--color-feedback-warning-default' : null,
    border: contract.tokens.public.color?.includes('--color-border-subtle') ? '--color-border-subtle' : null,
    radius: contract.tokens.public.radius?.[0] ?? null,
  };

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector definition={definition} contract={contract} values={values} slotIconValues={emptySlotIcons} stateValue="default" tokenValues={tokenValues} activeTokens={activeTokens} onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))} onSlotIconChange={() => undefined} onStateChange={() => undefined} onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))} onReset={reset} />
        <section className="docs-studio__stage" aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}>
          <div className="docs-studio__stage-inner">{renderers[contract.slug]()}</div>
        </section>
      </div>
    </div>
  );
}
