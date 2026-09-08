import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import InputArtwork from '../components/studio/InputArtwork';
import TextareaArtwork from '../components/studio/TextareaArtwork';

// This composition owns its content and validation flow. Native fields own data;
// the web adapter owns Select enhancement and all four controls' appearance.
export default function ContactComposition() {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState('');
  const [busy, setBusy] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (formRef.current) {
      window.TheGallery?.enhanceSelects(formRef.current);
      window.TheGallery?.enhanceTextareas(formRef.current);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  function reset() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setName(''); setEmail(''); setMessage('');
    setErrors([]); setResult(''); setBusy(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const invalid = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[name]'))
      .filter((field) => !field.validity.valid);
    setErrors(invalid.map((field) => field.name));
    setResult('');
    if (invalid.length) {
      const first = invalid[0];
      const target = first.matches('.select__native')
        ? form.querySelector<HTMLButtonElement>('.select__trigger') : first;
      target?.focus();
      return;
    }
    setBusy(true);
    timerRef.current = setTimeout(() => {
      setBusy(false);
      setResult('Your request is ready to send. This preview has not sent any data.');
    }, 700);
  }

  const topicError = errors.includes('topic');
  return <>
    <h1>Contact form composition</h1>
    <p>A local example using Button, Input, Select and Textarea. Complete the fields to preview a request, or submit an empty form to review validation.</p>
    <form ref={formRef} className="form docs-contact-composition" noValidate onSubmit={submit} onReset={reset} aria-label="Contact the studio">
      <section className="form__section" aria-labelledby="contact-details-title">
        <h2 className="form__section-title" id="contact-details-title">Contact the studio</h2>
        <div className="form__row" data-columns="two">
          <InputArtwork id="contact-name" name="name" label="Name" value={name} autoComplete="name" required
            onChange={(event) => setName(event.target.value)}
            variant={errors.includes('name') ? 'error' : 'default'}
            message={errors.includes('name') ? 'Enter your name.' : 'The name we should use when replying.'} />
          <InputArtwork id="contact-email" name="email" type="email" label="Email" value={email} autoComplete="email" required
            onChange={(event) => setEmail(event.target.value)}
            leadingIcon={<Mail className="input__icon input__icon--leading" aria-hidden="true" />}
            variant={errors.includes('email') ? 'error' : 'default'}
            message={errors.includes('email') ? 'Enter a valid email address.' : 'Used only to reply to this request.'} />
        </div>
        <div className={`select${topicError ? ' select--error' : ''}`}>
          <label className="select__label" htmlFor="contact-topic">Subject</label>
          <select className="select__field" id="contact-topic" name="topic" defaultValue="" required
            aria-invalid={topicError || undefined} aria-describedby="contact-topic-message">
            <option value="" hidden>Choose a subject</option>
            <option value="work">A work in the collection</option>
            <option value="commission">A commission for a home or a public space</option>
            <option value="visit">A studio visit</option>
            <option value="workshop" disabled>Workshops — currently unavailable</option>
          </select>
          <span className="select__message" id="contact-topic-message">{topicError ? 'Choose a subject.' : 'Choose the closest match; you can add details below.'}</span>
        </div>
        <TextareaArtwork id="contact-message" name="message" label="Message" value={message} required minLength={10}
          onChange={(event) => setMessage(event.target.value)}
          variant={errors.includes('message') ? 'error' : 'default'}
          message={errors.includes('message') ? 'Add at least 10 characters about your request.' : 'Include any dimensions, timing or delivery details that matter.'} />
      </section>
      <div className="form__actions">
        <button className="btn btn--outline" type="reset">Reset</button>
        <button className="btn" type="submit" disabled={busy} aria-busy={busy || undefined}>
          <span>{busy ? 'Preparing request' : 'Preview request'}</span>
          <ArrowRight className="btn__icon btn__icon--trailing" aria-hidden="true" />
        </button>
      </div>
      <p role="status" aria-atomic="true">{result || (errors.length ? 'Review the highlighted fields before continuing.' : 'No request sent.')}</p>
    </form>
    <p>Customize the controls in <Link to="/components/button">Button</Link>, <Link to="/components/input">Input</Link>, <Link to="/components/select">Select</Link> and <Link to="/components/textarea">Textarea</Link>. The <Link to="/foundations/control-pilot">control matrix</Link> retains side-by-side alignment and state checks.</p>
  </>;
}
