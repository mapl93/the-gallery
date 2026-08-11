import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import {
  Check,
  Clipboard,
  Home,
  PackageSearch,
  QrCode,
  Search,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { editorialMedia } from './editorialMedia';
import StepsArtwork, { type StepsArtworkItem } from './StepsArtwork';

interface PagesStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const checkoutStepsFixture: StepsArtworkItem[] = [
  { id: 'information', title: 'Information', status: 'completed' },
  { id: 'shipping', title: 'Shipping', status: 'current' },
  { id: 'payment', title: 'Payment', status: 'upcoming' },
];

const fixtureValues: Record<string, StudioPropertyValues> = {
  'coming-soon': {
    backgroundMedia: true,
    brand: true,
    heading: 'A new collection is taking shape',
    subtitle: 'Objects for thoughtful daily rituals',
    body: true,
    socialLinks: true,
    formHeading: 'Be first to enter the gallery',
    formDescription: 'Receive one note when the collection opens.',
    form: true,
    footer: true,
  },
  'page-404': {
    illustration: true,
    code: '404',
    heading: 'This work is not on view',
    message: 'The page may have moved, or the exhibition may have ended.',
    search: true,
    recoveryLinks: true,
    suggestions: true,
  },
  'gift-card': {
    visual: true,
    issuer: 'The Gallery',
    balance: '$150.00 available',
    heading: 'A gift for their collection',
    instructions: 'Use this code for any available work in the gallery.',
    codeLabel: 'Gift card code',
    code: 'GALLERY-7K4P-92M',
    copyLabel: 'Copy code',
    details: true,
    actions: true,
    qr: true,
    form: false,
  },
  'policy-page': {
    title: 'Shipping policy',
    updatedDate: 'Updated July 12, 2026',
    updatedDateTime: '2026-07-12',
    tocTitle: 'On this page',
    tocItems: true,
    body: true,
  },
  'checkout-progress': {
    accessibleLabel: 'Checkout progress',
    steps: true,
  },
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

function initialFixtureValues(contract: ComponentContract): StudioPropertyValues {
  return {
    ...Object.fromEntries((contract.properties ?? []).map((property) => (
      [property.name, defaultValue(contract, property)]
    ))),
    ...(fixtureValues[contract.slug] ?? {}),
  } as StudioPropertyValues;
}

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

function LocalField({
  id,
  className = '',
  label,
  name,
  placeholder,
  required = false,
  value,
  message,
  onChange,
}: {
  id: string;
  className?: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  message?: string;
  onChange: (value: string) => void;
}) {
  const messageId = `${id}-message`;
  return (
    <div className={`input ${className}`}>
      <label className="input__label" htmlFor={id}>{label}</label>
      <div className="input__control">
        <input
          className="input__field"
          id={id}
          name={name}
          type="text"
          value={value}
          placeholder={placeholder}
          aria-describedby={message ? messageId : undefined}
          required={required}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      {message && <p className="input__message" id={messageId}>{message}</p>}
    </div>
  );
}

export default function PagesStudio({ contract, definition }: PagesStudioProps) {
  const generatedId = useId().replace(/:/g, '');
  const initialValues = useMemo(() => initialFixtureValues(contract), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const activeTokens = useMemo(() => Object.fromEntries(definition.groups.flatMap((group) => (
    group.controls
      .filter((control) => control.tokens)
      .map((control) => [control.id, resolveTokens(control, contract)[0] ?? null])
  ))), [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [giftCode, setGiftCode] = useState('');
  const [comingSoonFeedback, setComingSoonFeedback] = useState('');
  const [searchFeedback, setSearchFeedback] = useState('');
  const [giftFeedback, setGiftFeedback] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');

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
    setEmail('');
    setSearchQuery('');
    setGiftCode('');
    setComingSoonFeedback('');
    setSearchFeedback('');
    setGiftFeedback('');
    setCopyFeedback('');
  }

  function submitComingSoon(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setComingSoonFeedback(
      `Preview only: ${email} passed native validation. No request was sent.`,
    );
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchFeedback(searchQuery
      ? `Preview only: "${searchQuery}" was captured locally. No request was sent.`
      : 'Enter a search term to preview local recovery feedback.');
  }

  function submitGiftForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGiftFeedback(giftCode
      ? `Local preview received ${giftCode}. No commerce request was sent.`
      : 'Enter a code to preview local form feedback.');
  }

  async function copyCode() {
    const code = String(values.code || '').trim();
    let copied = false;
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
    } catch {
      const codeElement = document.getElementById(`gift-card-code-${generatedId}`);
      const selection = window.getSelection();
      if (codeElement && selection) {
        const range = document.createRange();
        range.selectNodeContents(codeElement);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    setCopyFeedback(copied
      ? 'Gift card code copied.'
      : 'Gift card code selected. Copy it with your device command.');
  }

  function renderComingSoon() {
    const heading = String(values.heading || '').trim();
    if (!heading) return null;

    const formHeading = String(values.formHeading || '').trim();
    const formDescription = String(values.formDescription || '').trim();
    const hasFormRegion = Boolean(formHeading || formDescription || values.form === true);
    const headingId = `coming-soon-title-${generatedId}`;
    const formHeadingId = `coming-soon-form-${generatedId}`;
    const emailId = `coming-soon-email-${generatedId}`;
    const emailMessageId = `${emailId}-message`;

    return (
      <section
        className="coming-soon docs-studio__pages-coming-soon"
        aria-labelledby={headingId}
      >
        {values.backgroundMedia === true && (
          <img
            className="coming-soon__bg docs-studio__pages-media docs-studio__pages-media--coming-soon"
            src={editorialMedia.galleryInterior}
            alt=""
          />
        )}
        {values.brand === true && (
          <div className="coming-soon__logo-bar">
            <span className="coming-soon__store-name">The Gallery</span>
          </div>
        )}
        <div className="coming-soon__inner">
          <div className="coming-soon__left">
            <h2 className="coming-soon__heading" id={headingId}>
              {heading}
            </h2>
            {String(values.subtitle || '') && (
              <p className="coming-soon__subtitle">{String(values.subtitle)}</p>
            )}
            {values.body === true && (
              <p className="coming-soon__body">
                <strong>Edition one</strong> brings together small-batch vessels and sculptural studies.
              </p>
            )}
            {values.socialLinks === true && (
              <nav className="coming-soon__social" aria-label="Gallery social links">
                <a className="link" href="https://www.instagram.com/" target="_blank" rel="noopener">
                  Instagram
                </a>
                <a className="link" href="https://www.facebook.com/" target="_blank" rel="noopener">
                  Facebook
                </a>
              </nav>
            )}
          </div>
          {hasFormRegion && (
            <div className="coming-soon__right">
              {formHeading && (
                <h3 className="coming-soon__form-header" id={formHeadingId}>
                  {formHeading}
                </h3>
              )}
              {formDescription && (
                <p className="coming-soon__form-subtext">{formDescription}</p>
              )}
              {values.form === true && (
                <form
                  className="coming-soon__form"
                  aria-labelledby={formHeading ? formHeadingId : undefined}
                  onSubmit={submitComingSoon}
                >
                  <div className="input docs-studio__pages-coming-soon-field">
                    <label className="input__label" htmlFor={emailId}>Email address</label>
                    <div className="input__control">
                      <input
                        className="input__field"
                        id={emailId}
                        name="email"
                        type="email"
                        value={email}
                        placeholder="name@example.com"
                        autoComplete="email"
                        aria-describedby={emailMessageId}
                        required
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setComingSoonFeedback('');
                        }}
                      />
                    </div>
                    <p
                      className="input__message"
                      id={emailMessageId}
                      role="status"
                      aria-live="polite"
                    >
                      {comingSoonFeedback || 'We will only email when the collection opens.'}
                    </p>
                  </div>
                  <button className="btn" type="submit">Notify me</button>
                </form>
              )}
            </div>
          )}
        </div>
        {values.footer === true && <footer className="coming-soon__footer">The Gallery, Buenos Aires</footer>}
      </section>
    );
  }

  function renderPage404() {
    const heading = String(values.heading || '').trim();
    const message = String(values.message || '').trim();
    const hasRecovery = values.search === true
      || values.recoveryLinks === true
      || values.suggestions === true;
    if (!heading || !message || !hasRecovery) return null;

    const headingId = `page-404-title-${generatedId}`;
    const searchId = `page-404-search-${generatedId}`;
    const searchMessageId = `${searchId}-message`;
    const suggestionsId = `page-404-suggestions-${generatedId}`;

    return (
      <section className="page-404" aria-labelledby={headingId}>
        <div className="empty-state page-404__core">
          {values.illustration === true && (
            <div className="empty-state__icon page-404__illustration" aria-hidden="true">
              <PackageSearch />
            </div>
          )}
          {String(values.code || '').trim() && (
            <p className="page-404__code" aria-hidden="true">{String(values.code).trim()}</p>
          )}
          <h2 className="empty-state__title page-404__heading" id={headingId}>{heading}</h2>
          <p className="empty-state__message page-404__text">{message}</p>
          {values.recoveryLinks === true && (
            <a className="btn page-404__primary-action" href="/">
              <Home className="btn__icon btn__icon--leading" aria-hidden="true" />
              Return to the gallery
            </a>
          )}
        </div>
        {values.search === true && (
          <form
            className="page-404__search"
            role="search"
            aria-label="Search the gallery"
            onSubmit={submitSearch}
          >
            <div className="input page-404__search-field">
              <label className="input__label" htmlFor={searchId}>Search the gallery</label>
              <div className="page-404__search-row">
                <div className="input__control">
                  <input
                    className="input__field"
                    id={searchId}
                    name="q"
                    type="search"
                    value={searchQuery}
                    placeholder="Artists, works, or collections"
                    aria-describedby={searchMessageId}
                    required
                    onChange={(event) => {
                      setSearchQuery(event.target.value);
                      setSearchFeedback('');
                    }}
                  />
                </div>
                <button className="btn page-404__search-action" type="submit">
                  <Search className="btn__icon btn__icon--leading" aria-hidden="true" />
                  Search
                </button>
              </div>
              <p
                className="input__message"
                id={searchMessageId}
                role={searchFeedback ? 'status' : undefined}
                aria-live={searchFeedback ? 'polite' : undefined}
              >
                {searchFeedback || 'Enter a title or artist. Search handling remains target-owned.'}
              </p>
            </div>
          </form>
        )}
        {values.recoveryLinks === true && (
          <nav className="page-404__links" aria-label="More recovery links">
            <a className="link page-404__link" href="/components">Browse components</a>
            <a className="link page-404__link" href="/architecture">Read the architecture</a>
          </nav>
        )}
        {values.suggestions === true && (
          <section className="page-404__suggestions" aria-labelledby={suggestionsId}>
            <h3 className="page-404__suggestions-heading" id={suggestionsId}>Continue exploring</h3>
            <ul className="page-404__suggestion-list">
              <li className="page-404__suggestion-item">
                <a className="link page-404__suggestion-link" href="/components/product-card">Product Card</a>
              </li>
              <li className="page-404__suggestion-item">
                <a className="link page-404__suggestion-link" href="/components/gallery-grid">Gallery Grid</a>
              </li>
              <li className="page-404__suggestion-item">
                <a className="link page-404__suggestion-link" href="/components/artist-profile">Artist Profile</a>
              </li>
            </ul>
          </section>
        )}
      </section>
    );
  }

  function renderGiftCard() {
    const issuer = String(values.issuer || '').trim();
    const balance = String(values.balance || '').trim();
    const heading = String(values.heading || '').trim();
    const instructions = String(values.instructions || '').trim();
    const codeLabel = String(values.codeLabel || '').trim();
    const code = String(values.code || '').trim();
    if (!issuer || !balance || !heading || !instructions || !codeLabel || !code) return null;

    const headingId = `gift-card-title-${generatedId}`;
    const codeLabelId = `gift-card-code-label-${generatedId}`;
    const codeId = `gift-card-code-${generatedId}`;
    const copyStatusId = `gift-card-copy-status-${generatedId}`;
    const formStatusId = `gift-card-form-status-${generatedId}`;

    return (
      <section className="gift-card" aria-labelledby={headingId}>
        <div className="gift-card__layout">
          <div className="gift-card__card">
            {values.visual === true && (
              <img
                className="gift-card__media docs-studio__pages-media--gift-card"
                src={editorialMedia.texturedVase}
                alt=""
              />
            )}
            <div className="gift-card__card-content">
              <p className="gift-card__issuer">{issuer}</p>
              <p className="gift-card__balance">{balance}</p>
            </div>
          </div>

          <div className="gift-card__content">
            <div>
              <h2 className="gift-card__heading" id={headingId}>{heading}</h2>
              <p className="gift-card__instructions">{instructions}</p>
            </div>

            <div className="gift-card__code-group" aria-labelledby={codeLabelId}>
              <p className="gift-card__code-label" id={codeLabelId}>{codeLabel}</p>
              <div className="gift-card__code-row">
                <code className="gift-card__code" id={codeId}>{code}</code>
                {String(values.copyLabel || '').trim() && (
                  <button
                    className="btn btn--secondary gift-card__copy-action"
                    type="button"
                    aria-describedby={copyStatusId}
                    onClick={copyCode}
                  >
                    {copyFeedback === 'Gift card code copied.'
                      ? <Check className="btn__icon btn__icon--leading" aria-hidden="true" />
                      : <Clipboard className="btn__icon btn__icon--leading" aria-hidden="true" />}
                    <span className="gift-card__copy-label">{String(values.copyLabel).trim()}</span>
                  </button>
                )}
              </div>
              {String(values.copyLabel || '').trim() && (
                <p
                  className="gift-card__copy-status"
                  id={copyStatusId}
                  role="status"
                  aria-live="polite"
                >
                  {copyFeedback}
                </p>
              )}
            </div>

            {values.details === true && (
              <dl className="gift-card__details">
                <div className="gift-card__detail">
                  <dt>Status</dt>
                  <dd>Active</dd>
                </div>
                <div className="gift-card__detail">
                  <dt>Expiration</dt>
                  <dd>No expiration</dd>
                </div>
              </dl>
            )}

            {values.actions === true && (
              <div className="gift-card__actions" aria-label="Gift card destinations">
                <a className="btn gift-card__action" href="/components">Browse the gallery</a>
              </div>
            )}

            {values.qr === true && (
              <figure className="gift-card__qr">
                <div className="gift-card__qr-graphic" aria-hidden="true">
                  <QrCode />
                </div>
                <figcaption className="gift-card__qr-caption">
                  QR media is supplied by the issuing target; the visible code remains available.
                </figcaption>
              </figure>
            )}

            {values.form === true && (
              <form
                className="gift-card__form"
                aria-label="Target-owned gift card form preview"
                onSubmit={submitGiftForm}
              >
                <LocalField
                  id={`gift-code-${generatedId}`}
                  className="gift-card__field"
                  label="Service code"
                  name="gift_card_code"
                  placeholder="Enter a code"
                  required
                  value={giftCode}
                  message="This local preview does not contact a gift card service."
                  onChange={(nextValue) => {
                    setGiftCode(nextValue);
                    setGiftFeedback('');
                  }}
                />
                <button className="btn btn--secondary" type="submit">Submit preview</button>
                <p
                  className="gift-card__form-status"
                  id={formStatusId}
                  role="status"
                  aria-live="polite"
                >
                  {giftFeedback}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  function renderPolicyPage() {
    const title = String(values.title || '').trim();
    const updatedDate = String(values.updatedDate || '').trim();
    const updatedDateTime = String(values.updatedDateTime || '').trim();
    const tocTitle = String(values.tocTitle || '').trim();
    const hasBody = values.body === true;
    const hasToc = values.tocItems === true && Boolean(tocTitle);

    if (!title || !hasBody) return null;

    return (
      <article className="policy-page" aria-labelledby={`policy-title-${generatedId}`}>
        <header className="policy-page__header">
          <h2 className="policy-page__title" id={`policy-title-${generatedId}`}>{title}</h2>
          {updatedDate && updatedDateTime && (
            <time className="policy-page__date" dateTime={updatedDateTime}>{updatedDate}</time>
          )}
          {updatedDate && !updatedDateTime && <p className="policy-page__date">{updatedDate}</p>}
        </header>
        {hasToc && (
          <nav className="policy-page__toc" aria-labelledby={`policy-toc-${generatedId}`}>
            <h3 className="policy-page__toc-title" id={`policy-toc-${generatedId}`}>{tocTitle}</h3>
            <ol className="policy-page__toc-list">
              <li><a className="link policy-page__toc-link" href={`#shipping-${generatedId}`}>Dispatch and handling</a></li>
              <li><a className="link policy-page__toc-link" href={`#delivery-${generatedId}`}>Delivery</a></li>
              <li><a className="link policy-page__toc-link" href={`#returns-${generatedId}`}>Returns</a></li>
            </ol>
          </nav>
        )}
        <div className="policy-page__body">
          <p>Each work is inspected and packed by the studio before it begins its journey.</p>
          <section
            className="policy-page__section"
            id={`shipping-${generatedId}`}
            aria-labelledby={`shipping-title-${generatedId}`}
          >
            <h3 className="policy-page__section-title" id={`shipping-title-${generatedId}`}>Dispatch and handling</h3>
            <p>Available works usually leave the gallery within three business days. Made-to-order work follows the timeline shown with the piece.</p>
            <ul>
              <li>In-stock work is packed after a final condition check.</li>
              <li>Made-to-order timing remains attached to the individual work.</li>
            </ul>
          </section>
          <section
            className="policy-page__section"
            id={`delivery-${generatedId}`}
            aria-labelledby={`delivery-title-${generatedId}`}
          >
            <h3 className="policy-page__section-title" id={`delivery-title-${generatedId}`}>Delivery</h3>
            <p>Delivery timing depends on destination and carrier service. Tracking details are supplied by the target storefront after dispatch.</p>
            <blockquote>
              Transit estimates begin after dispatch and do not replace the carrier's current service information.
            </blockquote>
          </section>
          <section
            className="policy-page__section"
            id={`returns-${generatedId}`}
            aria-labelledby={`returns-title-${generatedId}`}
          >
            <h3 className="policy-page__section-title" id={`returns-title-${generatedId}`}>Returns</h3>
            <p>
              <a className="link" href="/components/contact-section">Contact the gallery</a>{' '}
              before returning a work so its condition and return route can be documented.
            </p>
          </section>
        </div>
      </article>
    );
  }

  function renderCheckoutProgress() {
    const accessibleLabel = String(values.accessibleLabel || '').trim();
    if (!accessibleLabel || values.steps !== true) return null;

    return (
      <div className="checkout-progress">
        <StepsArtwork
          className="checkout-progress__list"
          label={accessibleLabel}
          items={checkoutStepsFixture}
        />
      </div>
    );
  }

  function renderPreview() {
    if (contract.slug === 'coming-soon') return renderComingSoon();
    if (contract.slug === 'page-404') return renderPage404();
    if (contract.slug === 'gift-card') return renderGiftCard();
    if (contract.slug === 'policy-page') return renderPolicyPage();
    return renderCheckoutProgress();
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
          stateValue="default"
          tokenValues={tokenValues}
          activeTokens={activeTokens}
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />
        <section
          className={`docs-studio__stage docs-studio__stage--pages docs-studio__stage--pages-${contract.slug}`}
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className={`docs-studio__stage-inner docs-studio__pages-stage-inner docs-studio__pages-stage-inner--${contract.slug}`}>
            {renderPreview()}
          </div>
        </section>
      </div>
    </div>
  );
}
