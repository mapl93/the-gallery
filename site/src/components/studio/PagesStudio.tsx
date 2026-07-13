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
  Camera,
  Home,
  PackageSearch,
  QrCode,
  Search,
  Users,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface PagesStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const transparentImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E";
const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

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
    passwordTriggerLabel: 'Private access',
    passwordEntry: false,
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
    brand: 'The Gallery',
    amount: '$150.00',
    heading: 'A gift for their collection',
    message: 'Use this card for any available work in the gallery.',
    code: 'GALLERY-7K4P-92M',
    copyLabel: 'Copy gift card code',
    balance: '$150.00 available',
    actions: true,
    qr: true,
    form: true,
  },
  'policy-page': {
    title: 'Shipping policy',
    updatedDate: 'Updated July 12, 2026',
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
  placeholder,
  value,
  message,
  onChange,
}: {
  id: string;
  className?: string;
  label: string;
  placeholder?: string;
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
          type="text"
          value={value}
          placeholder={placeholder}
          aria-describedby={message ? messageId : undefined}
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
    setComingSoonFeedback(email
      ? `Thanks. ${email} is on the local preview list.`
      : 'Enter an email address to preview the confirmation.');
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchFeedback(searchQuery
      ? `Local preview search: ${searchQuery}`
      : 'Enter a search term to preview recovery feedback.');
  }

  function submitGiftForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGiftFeedback(giftCode
      ? `Local preview received ${giftCode}. No commerce request was sent.`
      : 'Enter a code to preview local form feedback.');
  }

  async function copyCode() {
    const code = String(values.code || '');
    let copied = false;
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
    } catch {
      const fallback = document.createElement('textarea');
      fallback.value = code;
      fallback.setAttribute('readonly', '');
      fallback.style.position = 'fixed';
      fallback.style.opacity = '0';
      document.body.appendChild(fallback);
      fallback.select();
      copied = document.execCommand('copy');
      fallback.remove();
    }
    setCopyFeedback(copied ? 'Code copied.' : 'Code selected. Copy it from the visible field.');
  }

  function renderComingSoon() {
    return (
      <main className="coming-soon docs-studio__pages-coming-soon">
        {values.backgroundMedia === true && (
          <img
            className="coming-soon__bg docs-studio__pages-media docs-studio__pages-media--coming-soon"
            src={transparentImage}
            alt="Abstract gallery installation preview"
          />
        )}
        {values.brand === true && (
          <div className="coming-soon__logo-bar">
            <span className="coming-soon__store-name">The Gallery</span>
          </div>
        )}
        <div className="coming-soon__inner">
          <section className="coming-soon__left" aria-labelledby={`coming-soon-title-${generatedId}`}>
            <h2 className="coming-soon__heading" id={`coming-soon-title-${generatedId}`}>
              {String(values.heading || '')}
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
                <a className="coming-soon__social-link" href="#instagram" onClick={(event) => event.preventDefault()} aria-label="Instagram">
                  <Camera aria-hidden="true" />
                </a>
                <a className="coming-soon__social-link" href="#facebook" onClick={(event) => event.preventDefault()} aria-label="Facebook">
                  <Users aria-hidden="true" />
                </a>
              </nav>
            )}
          </section>
          <section className="coming-soon__right" aria-labelledby={`coming-soon-form-${generatedId}`}>
            {String(values.formHeading || '') && (
              <h3 className="coming-soon__form-header" id={`coming-soon-form-${generatedId}`}>
                {String(values.formHeading)}
              </h3>
            )}
            {String(values.formDescription || '') && (
              <p className="coming-soon__form-subtext">{String(values.formDescription)}</p>
            )}
            {values.form === true && (
              <div className="coming-soon__newsletter">
                <form className="coming-soon__form" onSubmit={submitComingSoon} noValidate>
                  <div className="input docs-studio__pages-coming-soon-field">
                    <label className="input__label" htmlFor={`coming-soon-email-${generatedId}`}>Email address</label>
                    <div className="input__control">
                      <input
                        className="input__field coming-soon__input"
                        id={`coming-soon-email-${generatedId}`}
                        type="email"
                        value={email}
                        placeholder="name@example.com"
                        aria-describedby={`coming-soon-email-message-${generatedId}`}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <p className="input__message" id={`coming-soon-email-message-${generatedId}`}>
                      We will only email when the collection opens.
                    </p>
                  </div>
                  <button className="btn coming-soon__submit" type="submit">Notify me</button>
                </form>
                {comingSoonFeedback && (
                  <p className="coming-soon__success docs-studio__pages-feedback" role="status">
                    {comingSoonFeedback}
                  </p>
                )}
              </div>
            )}
            {String(values.passwordTriggerLabel || '') && (
              <button
                className="coming-soon__password-link"
                type="button"
                onClick={() => setComingSoonFeedback('Private access remains target-owned in this preview.')}
              >
                {String(values.passwordTriggerLabel)}
              </button>
            )}
            {values.passwordEntry === true && (
              <div className="docs-studio__pages-password-slot" aria-label="Private access content">
                <span>Private viewing</span>
                <span>Target-provided access content</span>
              </div>
            )}
          </section>
        </div>
        {values.footer === true && <footer className="coming-soon__footer">The Gallery, Buenos Aires</footer>}
      </main>
    );
  }

  function renderPage404() {
    return (
      <main className="page-404 docs-studio__pages-404" aria-labelledby={`page-404-title-${generatedId}`}>
        {values.illustration === true && (
          <div className="page-404__illustration docs-studio__pages-404-illustration" aria-hidden="true">
            <PackageSearch />
          </div>
        )}
        {String(values.code || '') && <div className="page-404__code">{String(values.code)}</div>}
        <h2 className="page-404__heading" id={`page-404-title-${generatedId}`}>{String(values.heading || '')}</h2>
        <p className="page-404__text">{String(values.message || '')}</p>
        {values.search === true && (
          <form className="page-404__search" role="search" onSubmit={submitSearch}>
            <label className="docs-studio__pages-sr-only" htmlFor={`page-search-${generatedId}`}>Search the gallery</label>
            <input
              className="page-404__search-input"
              id={`page-search-${generatedId}`}
              type="search"
              value={searchQuery}
              placeholder="Search artists or works"
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button className="page-404__search-btn" type="submit">
              <Search aria-hidden="true" />
              <span className="docs-studio__pages-sr-only">Search</span>
            </button>
          </form>
        )}
        {searchFeedback && <p className="docs-studio__pages-inline-status" role="status">{searchFeedback}</p>}
        {values.recoveryLinks === true && (
          <nav className="page-404__links" aria-label="Recovery links">
            <a className="page-404__link" href="#home" onClick={(event) => event.preventDefault()}><Home aria-hidden="true" /> Home</a>
            <a className="page-404__link" href="#collection" onClick={(event) => event.preventDefault()}>Current collection</a>
          </nav>
        )}
        {values.suggestions === true && (
          <section className="page-404__suggestions" aria-labelledby={`suggestions-${generatedId}`}>
            <h3 className="page-404__suggestions-heading" id={`suggestions-${generatedId}`}>Still on view</h3>
            <div className="docs-studio__pages-suggestions">
              <a href="#vessels" onClick={(event) => event.preventDefault()}>Sculptural vessels</a>
              <a href="#tableware" onClick={(event) => event.preventDefault()}>Tableware studies</a>
              <a href="#artists" onClick={(event) => event.preventDefault()}>Featured artists</a>
            </div>
          </section>
        )}
      </main>
    );
  }

  function renderGiftCard() {
    return (
      <main className="gift-card docs-studio__pages-gift-card" aria-labelledby={`gift-card-title-${generatedId}`}>
        {values.visual === true && (
          <div className="gift-card__visual">
            <img
              className="docs-studio__pages-media docs-studio__pages-media--gift-card"
              src={transparentImage}
              alt="Abstract ceramic composition on a gift card"
            />
            <div className="gift-card__visual-overlay">
              {String(values.brand || '') && <span className="gift-card__brand">{String(values.brand)}</span>}
              <span className="gift-card__amount">{String(values.amount || '')}</span>
            </div>
          </div>
        )}
        <h2 className="gift-card__heading" id={`gift-card-title-${generatedId}`}>{String(values.heading || '')}</h2>
        {String(values.message || '') && <p className="gift-card__message">{String(values.message)}</p>}
        <div className="gift-card__code-wrapper">
          <span className="gift-card__code">{String(values.code || '')}</span>
          {String(values.copyLabel || '') && (
            <button className="gift-card__copy-btn" type="button" aria-label={String(values.copyLabel)} onClick={copyCode}>
              {copyFeedback === 'Code copied.' ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
            </button>
          )}
        </div>
        {copyFeedback && <p className="docs-studio__pages-inline-status" role="status">{copyFeedback}</p>}
        {String(values.balance || '') && <p className="gift-card__balance"><strong>Balance:</strong> {String(values.balance)}</p>}
        {values.actions === true && (
          <div className="gift-card__actions">
            <a className="gift-card__action gift-card__action--primary" href="#browse" onClick={(event) => event.preventDefault()}>Browse works</a>
            <button className="gift-card__action gift-card__action--secondary" type="button" onClick={() => window.print()}>Print</button>
          </div>
        )}
        {values.qr === true && (
          <div className="gift-card__qr docs-studio__pages-qr" role="img" aria-label="QR code for the sample gift card">
            <QrCode aria-hidden="true" />
          </div>
        )}
        {values.form === true && (
          <form className="gift-card__form" onSubmit={submitGiftForm} noValidate>
            <LocalField
              id={`gift-code-${generatedId}`}
              className="gift-card__field"
              label="Gift card code"
              placeholder="Enter a code"
              value={giftCode}
              message="This local preview does not check a live balance."
              onChange={setGiftCode}
            />
            <button className="btn" type="submit">Check preview</button>
            {giftFeedback && <p className="docs-studio__pages-inline-status" role="status">{giftFeedback}</p>}
          </form>
        )}
      </main>
    );
  }

  function renderPolicyPage() {
    return (
      <article className="policy-page docs-studio__pages-policy" aria-labelledby={`policy-title-${generatedId}`}>
        <header className="policy-page__header">
          <h2 className="policy-page__title" id={`policy-title-${generatedId}`}>{String(values.title || '')}</h2>
          {String(values.updatedDate || '') && <p className="policy-page__date">{String(values.updatedDate)}</p>}
        </header>
        {values.tocItems === true && (
          <nav className="policy-page__toc" aria-labelledby={`policy-toc-${generatedId}`}>
            {String(values.tocTitle || '') && (
              <h3 className="policy-page__toc-title" id={`policy-toc-${generatedId}`}>{String(values.tocTitle)}</h3>
            )}
            <ol className="policy-page__toc-list">
              <li><a className="policy-page__toc-link" href={`#shipping-${generatedId}`}>Dispatch and handling</a></li>
              <li><a className="policy-page__toc-link" href={`#delivery-${generatedId}`}>Delivery</a></li>
              <li><a className="policy-page__toc-link" href={`#returns-${generatedId}`}>Returns</a></li>
            </ol>
          </nav>
        )}
        {values.body === true && (
          <div className="policy-page__body">
            <p>Each work is inspected and packed by the studio before it begins its journey.</p>
            <h2 id={`shipping-${generatedId}`}>Dispatch and handling</h2>
            <p>Available works usually leave the gallery within three business days. Made-to-order work follows the timeline shown with the piece.</p>
            <h2 id={`delivery-${generatedId}`}>Delivery</h2>
            <p>Delivery timing depends on destination and carrier service. Tracking details are supplied by the target storefront after dispatch.</p>
            <h2 id={`returns-${generatedId}`}>Returns</h2>
            <p>Contact the gallery before returning a work so its condition and return route can be documented.</p>
          </div>
        )}
      </article>
    );
  }

  function renderCheckoutProgress() {
    return (
      <ol className="checkout-progress docs-studio__pages-checkout" aria-label={String(values.accessibleLabel || '')}>
        {values.steps === true && (
          <>
            <li className="checkout-progress__step" data-status="complete">
              <span className="checkout-progress__indicator"><Check aria-label="Complete" /></span>
              <span className="checkout-progress__label">Information</span>
            </li>
            <li className="checkout-progress__step" data-status="current" aria-current="step">
              <span className="checkout-progress__indicator">2</span>
              <span className="checkout-progress__label">Shipping</span>
            </li>
            <li className="checkout-progress__step">
              <span className="checkout-progress__indicator">3</span>
              <span className="checkout-progress__label">Payment</span>
            </li>
          </>
        )}
      </ol>
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
