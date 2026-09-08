import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mail } from 'lucide-react';
import InputArtwork, { type InputArtworkVariant } from '../components/studio/InputArtwork';

const cases: { id: string; label: string; variant: InputArtworkVariant; icons?: boolean; busy?: boolean; disabled?: boolean; readOnly?: boolean }[] = [
  { id: 'plain', label: 'Text only', variant: 'default' },
  { id: 'icons', label: 'Leading and trailing icons', variant: 'default', icons: true },
  { id: 'busy', label: 'Loading', variant: 'default', icons: true, busy: true },
  { id: 'error', label: 'Error', variant: 'error' },
  { id: 'success', label: 'Success', variant: 'success', icons: true },
  { id: 'warning', label: 'Warning', variant: 'warning' },
  { id: 'disabled', label: 'Disabled', variant: 'default', disabled: true },
  { id: 'readonly', label: 'Read only', variant: 'default', readOnly: true },
];

export default function ControlPilot() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState('');
  return <>
    <h1>Input + Button pilot</h1>
    <p>Review matching control height, text alignment and focus in real compositions. Use the page theme control for Light / Dark, resize the window, and navigate with Tab. This is a local demonstration; actions only update the message below.</p>
    <p>Default Input and Button target 46 px with the default 16 px text. Longer button labels can wrap and grow. Small and large Button retain their own sizes. The owner reviewed the overall treatment; label and supporting-message spacing follows the 4 px Input gap.</p>
    <div className="docs-control-pilot">
      {cases.map((item) => <section className="docs-control-pilot__case" key={item.id} data-pilot-case={item.id}>
        <h2>{item.label}</h2>
        <div className="docs-control-pilot__row">
          <InputArtwork id={`pilot-${item.id}`} label="Email address" type="email"
            value={values[item.id] ?? ''} placeholder="name@example.com"
            onChange={(event) => setValues((current) => ({ ...current, [item.id]: event.target.value }))}
            variant={item.variant} disabled={item.disabled} readOnly={item.readOnly}
            message={item.variant === 'error' ? 'Enter a valid email address.' : item.variant === 'success' ? 'Address verified.' : item.variant === 'warning' ? 'Please check the address.' : 'Supporting text stays below the aligned controls.'}
            leadingIcon={item.icons ? <Mail className="input__icon input__icon--leading" aria-hidden="true" /> : undefined}
            trailingIcon={item.icons ? <Check className="input__icon input__icon--trailing" aria-hidden="true" /> : undefined} />
          <button className={`btn${item.variant === 'error' ? ' btn--danger' : ''}`} type="button"
            disabled={item.disabled || item.busy} aria-busy={item.busy || undefined}
            onClick={() => setResult(`${item.label}: local action completed.`)}>
            {item.icons && <Mail className="btn__icon btn__icon--leading" aria-hidden="true" />}
            <span>{item.busy ? 'Sending' : 'Continue'}</span>
            {item.icons && <ArrowRight className="btn__icon btn__icon--trailing" aria-hidden="true" />}
          </button>
        </div>
      </section>)}
      <section className="docs-control-pilot__case" data-pilot-case="sizes">
        <h2>Button size and content checks</h2>
        <div className="docs-control-pilot__buttons">
          <button className="btn btn--sm" type="button">Small</button>
          <button className="btn" type="button">Default</button>
          <button className="btn btn--lg" type="button">Large</button>
          <button className="btn btn--icon-only" type="button" aria-label="Continue"><ArrowRight className="btn__icon" aria-hidden="true" /></button>
          <button className="btn docs-control-pilot__long" type="button">Continue with this longer translated action label</button>
        </div>
      </section>
      <section className="docs-control-pilot__case" data-pilot-case="text">
        <h2>Feedback text</h2>
        <div className="docs-control-pilot__feedback">
          <span className="text-accent">Accent</span><span className="text-success">Success</span>
          <span className="text-warning">Warning</span><span className="text-error">Error</span><span className="text-info">Information</span>
        </div>
      </section>
      <p role="status">{result || 'No action performed.'}</p>
    </div>
    <p>The layout belongs to this documentation fixture. Control appearance comes from the generated web adapter. Review individual properties in <Link to="/components/input">Input Studio</Link> and <Link to="/components/button">Button Studio</Link>, and definitions in the <Link to="/tokens">token catalogue</Link>.</p>
  </>;
}
