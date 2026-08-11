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
  if (slug === 'field-wrapper') return { label: 'Email address', control: true, description: 'Used only for order updates.', variant: 'success', feedback: 'Email address verified.', required: true };
  if (slug === 'fieldset') return { legend: 'Delivery preference', content: true, description: 'Choose one option for this order.', disabled: false, describedBy: 'fieldset-description' };
  if (slug === 'inline-error') return { message: 'Enter a valid email address.', icon: true, announcement: 'none' };
  if (slug === 'form') return { columns: 'two', content: true, errorSummary: false, actions: true, noValidate: false, autocomplete: 'on' };
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

  function changeProperties(next: StudioPropertyValues) {
    setValues((current) => {
      const changed = { ...current, ...next };
      if (contract.slug === 'field-wrapper' && next.variant !== undefined) {
        const currentFeedback = String(current.feedback || '');
        const usesFixtureFeedback = currentFeedback === '' || Object.values(feedbackMessages).includes(currentFeedback);
        if (usesFixtureFeedback) {
          const nextVariant = String(next.variant || 'default');
          changed.feedback = nextVariant === 'default' ? '' : feedbackMessages[nextVariant] || '';
        }
      }
      return changed;
    });
  }

  function renderFieldWrapper() {
    const variant = String(values.variant || 'default');
    const message = variant === 'default' ? '' : String(values.feedback || feedbackMessages[variant] || '');
    const rootClass = ['field', variantClass(contract, values.variant)].filter(Boolean).join(' ');
    const inputClass = ['input', 'field__control', variant === 'default' ? null : `input--${variant}`].filter(Boolean).join(' ');
    const messageClass = variant === 'error' ? 'field__error' : variant === 'success' ? 'field__success' : 'field__warning';
    const description = String(values.description || '');
    const describedBy = [description ? 'field-email-help' : '', message ? 'field-email-feedback' : ''].filter(Boolean).join(' ') || undefined;
    return (
      <div className="docs-studio__field-fixture">
        <div className={rootClass}>
          <label className={`field__label${values.required === true ? ' field__label--required' : ''}`} htmlFor="field-email">{String(values.label || '')}</label>
          <div className={inputClass}>
            <input className="input__field" id="field-email" name="email" type="email" defaultValue="studio@example.com" required={values.required === true} aria-invalid={variant === 'error' || undefined} aria-describedby={describedBy} />
          </div>
          {description && <span className="field__description" id="field-email-help">{description}</span>}
          {message && <span className={`field__feedback ${messageClass}`} id="field-email-feedback">{message}</span>}
        </div>
      </div>
    );
  }

  function renderFieldset() {
    const description = String(values.description || '');
    const describedBy = description ? String(values.describedBy || 'fieldset-description') : undefined;
    return (
      <div className="docs-studio__field-fixture">
        <fieldset className="fieldset" disabled={values.disabled === true} aria-describedby={describedBy}>
          <legend className="fieldset__legend">{String(values.legend || '')}</legend>
          {description && <div className="fieldset__description" id={describedBy}>{description}</div>}
          <div className="fieldset__content">
            {['Standard delivery', 'Studio pickup', 'Schedule later'].map((label, index) => (
              <label className="radio" key={label}><input className="radio__input" type="radio" name="delivery" value={['standard', 'pickup', 'later'][index]} defaultChecked={index === 0} /><span className="radio__label">{label}</span></label>
            ))}
          </div>
        </fieldset>
      </div>
    );
  }

  function renderInlineError() {
    const announcement = String(values.announcement || 'none');
    return (
      <div className="docs-studio__field-fixture">
        <div className="inline-error" role={announcement === 'assertive' ? 'alert' : announcement === 'polite' ? 'status' : undefined} aria-live={announcement === 'none' ? undefined : announcement as 'polite' | 'assertive'} aria-atomic={announcement === 'none' ? undefined : true}>
          {values.icon === true && <CircleAlert className="inline-error__icon" aria-hidden="true" focusable="false" />}
          <span className="inline-error__message">{String(values.message || '')}</span>
        </div>
      </div>
    );
  }

  function renderForm() {
    const columns = String(values.columns || 'one');
    const preventSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();
    const hasErrors = values.errorSummary === true;
    return (
      <form className="form docs-studio__preview-form" noValidate={values.noValidate === true} autoComplete={String(values.autocomplete || 'on')} onSubmit={preventSubmit}>
        {hasErrors && (
          <div className="form__error-summary" tabIndex={-1} aria-labelledby="form-demo-errors-title">
            <p className="form__error-summary-title" id="form-demo-errors-title">Review the highlighted field</p>
            <ul className="form__error-summary-list"><li><a href="#form-demo-email">Enter a valid email address.</a></li></ul>
          </div>
        )}
        <section className="form__section" aria-labelledby="form-demo-section-title">
          <h2 className="form__section-title" id="form-demo-section-title">Contact details</h2>
          <div className="form__row" data-columns={columns}>
            <div className="field">
              <label className="field__label" htmlFor="form-demo-name">Name</label>
              <div className="input"><input className="input__field" id="form-demo-name" name="name" type="text" defaultValue="Avery Stone" autoComplete="name" /></div>
            </div>
            <div className={`field${hasErrors ? ' field--error' : ''}`}>
              <label className="field__label" htmlFor="form-demo-email">Email</label>
              <div className={`input${hasErrors ? ' input--error' : ''}`}><input className="input__field" id="form-demo-email" name="email" type="email" defaultValue={hasErrors ? 'avery' : 'avery@example.com'} autoComplete="email" required aria-invalid={hasErrors || undefined} aria-describedby={hasErrors ? 'form-demo-email-error' : undefined} key={hasErrors ? 'invalid' : 'valid'} /></div>
              {hasErrors && <span className="field__feedback field__error" id="form-demo-email-error">Enter a valid email address.</span>}
            </div>
            {columns === 'three' && (
              <div className="field">
                <label className="field__label" htmlFor="form-demo-phone">Phone</label>
                <div className="input"><input className="input__field" id="form-demo-phone" name="phone" type="tel" defaultValue="+54 11 5555 0101" autoComplete="tel" /></div>
              </div>
            )}
          </div>
        </section>
        {values.actions === true && <div className="form__actions"><button className="btn btn--outline" type="reset">Reset</button><button className="btn" type="submit" name="intent" value="save">Save</button></div>}
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
        <StudioInspector definition={definition} contract={contract} values={values} slotIconValues={emptySlotIcons} stateValue="default" tokenValues={tokenValues} activeTokens={activeTokens} onPropertiesChange={changeProperties} onSlotIconChange={() => undefined} onStateChange={() => undefined} onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))} onReset={reset} />
        <section className="docs-studio__stage" aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}>
          <div className="docs-studio__stage-inner">{renderers[contract.slug]()}</div>
        </section>
      </div>
    </div>
  );
}
