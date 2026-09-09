import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import InputArtwork from '../components/studio/InputArtwork';
import FieldWrapperArtwork from '../components/studio/FieldWrapperArtwork';
import NumberInputArtwork from '../components/studio/NumberInputArtwork';
import InlineErrorArtwork from '../components/studio/InlineErrorArtwork';
import TextareaArtwork from '../components/studio/TextareaArtwork';
import CheckboxArtwork from '../components/studio/CheckboxArtwork';
import RadioArtwork from '../components/studio/RadioArtwork';
import SwitchArtwork from '../components/studio/SwitchArtwork';

// This composition owns its content and validation flow. Native fields own data;
// the web adapter owns Select enhancement and all composed components' appearance.
export default function ContactComposition() {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [pieceCount, setPieceCount] = useState<number | null>(null);
  const [replyMethod, setReplyMethod] = useState('');
  const [careNotes, setCareNotes] = useState(false);
  const [visitInfo, setVisitInfo] = useState(false);
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
    setName(''); setEmail(''); setMessage(''); setPieceCount(null);
    setReplyMethod(''); setCareNotes(false); setVisitInfo(false);
    setErrors([]); setResult(''); setBusy(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const invalid = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[name]'))
      .filter((field) => !field.validity.valid);
    setErrors([...new Set(invalid.map((field) => field.name))]);
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
    <p>Complete the fields and choose how you would like to hear from the studio. Preview a request, or submit an empty form to review validation.</p>
    <form ref={formRef} className="form docs-contact-composition" noValidate onSubmit={submit} onReset={reset} aria-label="Contact the studio">
      {errors.length > 0 && <div className="form__error-summary" tabIndex={-1} aria-labelledby="contact-errors-title">
        <h2 className="form__error-summary-title" id="contact-errors-title">Review these fields</h2>
        <ul className="form__error-summary-list">{errors.map((field) => {
          const targetId = field === 'replyMethod' ? 'contact-reply-email' : `contact-${field}`;
          const label = { name: 'Name', email: 'Email', topic: 'Subject', message: 'Message', replyMethod: 'Preferred reply', pieceCount: 'Number of pieces' }[field] || field;
          return <li key={field}><a href={`#${targetId}`} onClick={(event) => {
            const target = field === 'topic' ? formRef.current?.querySelector<HTMLElement>('.select__trigger') || document.getElementById(targetId) : document.getElementById(targetId);
            if (target) { event.preventDefault(); target.focus(); }
          }}>{label}</a></li>;
        })}</ul>
      </div>}
      <section className="form__section" aria-labelledby="contact-details-title">
        <h2 className="form__section-title" id="contact-details-title">Contact the studio</h2>
        <div className="form__row" data-columns="two">
          <FieldWrapperArtwork controlId="contact-name" label="Name" required
            description="The name we should use when replying."
            variant={errors.includes('name') ? 'error' : 'default'}
            feedback={errors.includes('name') ? 'Enter your name.' : ''}>
            <div className={`input field__control${errors.includes('name') ? ' input--error' : ''}`}>
              <input className="input__field" id="contact-name" name="name" autoComplete="name" value={name} required
                aria-invalid={errors.includes('name') || undefined}
                aria-describedby={`contact-name-help${errors.includes('name') ? ' contact-name-feedback' : ''}`}
                onChange={(event) => setName(event.target.value)} />
            </div>
          </FieldWrapperArtwork>
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
        <FieldWrapperArtwork controlId="contact-pieceCount" label="Number of pieces"
          description="For a set or series; leave empty if undecided."
          variant={errors.includes('pieceCount') ? 'error' : 'default'}
          feedback={errors.includes('pieceCount') ? 'Use a whole number between 1 and 99.' : ''}>
          <NumberInputArtwork id="contact-pieceCount" name="pieceCount" label="Number of pieces"
            decrementLabel="Decrease number of pieces" incrementLabel="Increase number of pieces"
            className="field__control" value={pieceCount} onValueChange={setPieceCount} min={1} max={99} step={1}
            variant={errors.includes('pieceCount') ? 'error' : 'default'}
            describedBy={`contact-pieceCount-help${errors.includes('pieceCount') ? ' contact-pieceCount-feedback' : ''}`} />
        </FieldWrapperArtwork>
        <fieldset className="fieldset" aria-describedby={`contact-reply-help${errors.includes('replyMethod') ? ' contact-reply-message' : ''}`}>
          <legend className="fieldset__legend">Preferred reply</legend>
          <p className="fieldset__description" id="contact-reply-help">We will use your email to coordinate either option.</p>
          <div className="fieldset__content">
            {[
              ['email', 'Reply by email'],
              ['call', 'Arrange a studio call'],
            ].map(([value, label]) => <RadioArtwork key={value} name="replyMethod" value={value} label={label}
              id={`contact-reply-${value}`} checked={replyMethod === value} required
              describedBy={`contact-reply-help${errors.includes('replyMethod') ? ' contact-reply-message' : ''}`}
              variant={errors.includes('replyMethod') ? 'error' : 'default'}
              onCheckedChange={(checked) => { if (checked) setReplyMethod(value); }} />)}
            {errors.includes('replyMethod') && <InlineErrorArtwork id="contact-reply-message" message="Choose a reply preference." announcement="none" />}
          </div>
        </fieldset>
        <CheckboxArtwork label="Include care instructions in the reply" name="careNotes" value="include"
          checked={careNotes} onChange={(event) => setCareNotes(event.target.checked)} />
        <SwitchArtwork label="Show studio visit information" checked={visitInfo}
          onChange={(event) => setVisitInfo(event.target.checked)} />
        {visitInfo && <p>Visits are arranged by appointment. Include your preferred dates in the message.</p>}
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
    <p>Customize <Link to="/components/button">Button</Link>, <Link to="/components/input">Input</Link>, <Link to="/components/select">Select</Link>, <Link to="/components/textarea">Textarea</Link>, <Link to="/components/checkbox">Checkbox</Link>, <Link to="/components/radio">Radio</Link>, <Link to="/components/switch">Switch</Link>, <Link to="/components/field-wrapper">Field Wrapper</Link>, <Link to="/components/fieldset">Fieldset</Link>, <Link to="/components/form">Form</Link>, <Link to="/components/number-input">Number Input</Link> and <Link to="/components/inline-error">Inline Error</Link>. The <Link to="/foundations/control-pilot">control matrix</Link> retains side-by-side alignment and state checks.</p>
  </>;
}
