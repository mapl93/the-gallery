import {
  Fragment,
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import {
  Clock3,
  Eye,
  Flame,
  Mail,
  PackageCheck,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { editorialMedia } from './editorialMedia';

interface MarketingStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  hero: {
    label: 'New collection',
    title: 'Objects shaped for daily rituals',
    description: 'A quiet study in hand-thrown stoneware, tactile glazes, and useful forms.',
    media: true,
    overlay: true,
    actions: true,
  },
  newsletter: {
    title: 'Notes from the studio',
    description: 'Receive new collection releases and occasional stories from the workshop.',
    form: true,
    note: 'One concise update each month. Unsubscribe at any time.',
  },
  testimonials: { title: 'Collector notes', items: true },
  popup: {
    variant: 'split',
    media: true,
    title: 'Private studio viewing',
    text: 'Reserve a place for the next presentation of one-of-a-kind works.',
    dismissAction: true,
    dismissLabel: 'Close popup',
  },
  'trust-badges': { variant: 'compact', items: true },
  'payment-icons': { icons: true, small: false },
  countdown: { variant: 'cards', segments: true },
  urgency: { variant: 'low-stock', message: 'Sample inventory: 3 pieces remain' },
  'cookie-consent': {
    message: 'This site uses cookies according to its published policy.',
    actions: true,
    preferences: false,
    visible: true,
  },
  'social-proof': {
    message: 'Sample purchase: Celadon Study was purchased from the gallery.',
    time: 'Recently',
    image: true,
    imageAlt: 'Celadon stoneware study',
    dismissAction: true,
    dismissLabel: 'Dismiss purchase notification',
    visible: true,
  },
  'announcement-extended': {
    slides: true,
    dismissAction: false,
    dismissLabel: 'Dismiss announcement',
  },
};

const testimonialFixtures = [
  {
    quote: 'The finish catches the light beautifully, and the form feels balanced in the hand.',
    initials: 'MG',
    name: 'Maria Garcia',
    detail: 'Ceramics collector',
  },
  {
    quote: 'Every detail feels considered, from the weight of the clay to the careful packaging.',
    initials: 'AL',
    name: 'Ana Lopez',
    detail: 'Gallery member',
  },
  {
    quote: 'A useful object with the quiet presence of a small sculpture.',
    initials: 'JR',
    name: 'Jules Rivera',
    detail: 'Interior designer',
  },
];

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

function variantClass(contract: ComponentContract, value: StudioPropertyValue): string | null {
  return contract.variants.find((option) => option.name === value)?.className?.replace(/^\./, '') ?? null;
}

function MarketingMedia({
  className = '',
  kind,
  alt,
}: {
  className?: string;
  kind: 'hero' | 'popup' | 'social-proof';
  alt: string;
}) {
  const source = {
    hero: editorialMedia.tableware,
    popup: editorialMedia.texturedVase,
    'social-proof': editorialMedia.artistInStudio,
  }[kind];

  return (
    <img
      className={`${className} docs-studio__marketing-media docs-studio__marketing-media--${kind}`}
      src={source}
      alt={alt}
    />
  );
}

function PaymentMark({ label, shortLabel }: { label: string; shortLabel: string }) {
  return (
    <span role="listitem">
      <svg
        className="docs-studio__marketing-payment-mark"
        viewBox="0 0 48 28"
        role="img"
        aria-label={label}
      >
        <rect width="48" height="28" rx="4" fill="currentColor" opacity="0.15" />
        <text x="24" y="18" textAnchor="middle" fontSize="8" fill="currentColor">
          {shortLabel}
        </text>
      </svg>
    </span>
  );
}

export default function MarketingStudio({ contract, definition }: MarketingStudioProps) {
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
  const [popupVisible, setPopupVisible] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterFeedback, setNewsletterFeedback] = useState('One concise studio update each month.');
  const [announcementVisible, setAnnouncementVisible] = useState(true);

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

  function setValue(name: string, value: StudioPropertyValue) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function reset() {
    setValues({ ...initialValues });
    setTokenOverrides({});
    setPopupVisible(true);
    setNewsletterEmail('');
    setNewsletterFeedback('One concise studio update each month.');
    setAnnouncementVisible(true);
  }

  function currentState(): string {
    if (contract.slug === 'popup') return popupVisible ? 'overlayOpen' : 'overlayHidden';
    if (contract.slug === 'cookie-consent' || contract.slug === 'social-proof') {
      return values.visible === true ? 'visible' : 'hidden';
    }
    return 'default';
  }

  function renderHero() {
    return (
      <section className="hero docs-studio__marketing-hero" aria-labelledby={`studio-hero-title-${generatedId}`}>
        {values.media === true && (
          <div className="hero__media">
            <MarketingMedia kind="hero" alt="Hand-thrown stoneware arranged in the gallery" />
          </div>
        )}
        {values.overlay === true && <div className="hero__overlay" aria-hidden="true" />}
        <div className="hero__content">
          {String(values.label || '') && <span className="hero__label">{String(values.label)}</span>}
          <h2 className="hero__title" id={`studio-hero-title-${generatedId}`}>{String(values.title)}</h2>
          {String(values.description || '') && <p className="hero__description">{String(values.description)}</p>}
          {values.actions === true && (
            <div className="hero__actions">
              <a className="btn" href="#studio-hero-collection" onClick={(event) => event.preventDefault()}>View collection</a>
              <a className="btn btn--secondary" href="#studio-hero-story" onClick={(event) => event.preventDefault()}>Read the story</a>
            </div>
          )}
        </div>
      </section>
    );
  }

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewsletterFeedback(`Thanks, ${newsletterEmail}. You are on the preview list.`);
  }

  function renderNewsletter() {
    const emailId = `studio-newsletter-email-${generatedId}`;
    const messageId = `${emailId}-message`;
    return (
      <section className="newsletter docs-studio__marketing-newsletter" aria-labelledby={`studio-newsletter-title-${generatedId}`}>
        <div className="newsletter__content">
          <h2 className="newsletter__title" id={`studio-newsletter-title-${generatedId}`}>{String(values.title)}</h2>
          {String(values.description || '') && <p className="newsletter__description">{String(values.description)}</p>}
          {values.form === true && (
            <form className="newsletter__form" onSubmit={submitNewsletter}>
              <div className="input">
                <label className="input__label" htmlFor={emailId}>Email address</label>
                <div className="input__control">
                  <Mail className="input__icon input__icon--leading" aria-hidden="true" />
                  <input
                    className="input__field newsletter__input"
                    id={emailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    aria-describedby={messageId}
                    required
                    value={newsletterEmail}
                    onChange={(event) => {
                      setNewsletterEmail(event.target.value);
                      setNewsletterFeedback('One concise studio update each month.');
                    }}
                  />
                </div>
                <span
                  className="input__message docs-studio__marketing-newsletter-status"
                  id={messageId}
                  role="status"
                  aria-live="polite"
                >
                  {newsletterFeedback}
                </span>
              </div>
              <button className="btn" type="submit">Subscribe</button>
            </form>
          )}
          {String(values.note || '') && <p className="newsletter__note">{String(values.note)}</p>}
        </div>
      </section>
    );
  }

  function renderTestimonials() {
    return (
      <section className="testimonials docs-studio__marketing-testimonials" aria-labelledby={`studio-testimonials-title-${generatedId}`}>
        <h2 className="testimonials__title" id={`studio-testimonials-title-${generatedId}`}>{String(values.title)}</h2>
        {values.items === true && (
          <div className="testimonials__grid" role="list">
            {testimonialFixtures.map((item) => (
              <figure className="testimonial" role="listitem" key={item.name}>
                <blockquote className="testimonial__quote"><p>{item.quote}</p></blockquote>
                <figcaption className="testimonial__author">
                  <span className="avatar" aria-hidden="true">{item.initials}</span>
                  <span>
                    <span className="testimonial__name">{item.name}</span>
                    <span className="testimonial__detail">{item.detail}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
    );
  }

  function renderPopup() {
    const popupId = `studio-marketing-popup-${generatedId}`;
    const titleId = `${popupId}-title`;
    const variant = variantClass(contract, values.variant);
    return (
      <div className="docs-studio__marketing-trigger-stage">
        <button
          className="btn docs-studio__marketing-trigger"
          type="button"
          aria-expanded={popupVisible}
          aria-controls={popupId}
          hidden={popupVisible}
          onClick={() => setPopupVisible(true)}
        >
          Show popup
        </button>
        {popupVisible && (
          <div className="popup-overlay docs-studio__marketing-popup-overlay" data-open>
            <div
              className={['popup', variant, 'docs-studio__marketing-popup'].filter(Boolean).join(' ')}
              id={popupId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              data-open={values.variant === 'slide' || undefined}
            >
              {values.dismissAction === true && (
                <button
                  className="popup__close close-btn"
                  type="button"
                  aria-label={String(values.dismissLabel || 'Close popup')}
                  onClick={() => setPopupVisible(false)}
                >
                  <X className="close-btn__icon" aria-hidden="true" />
                </button>
              )}
              {values.media === true && (
                <div className="popup__media">
                  <MarketingMedia kind="popup" alt="A glazed stoneware vessel on a display plinth" />
                </div>
              )}
              <div className="popup__body">
                <h2 className="popup__title" id={titleId}>{String(values.title)}</h2>
                {String(values.text || '') && <p className="popup__text">{String(values.text)}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderTrustBadges() {
    const classes = ['trust-badges', variantClass(contract, values.variant)].filter(Boolean).join(' ');
    return (
      <ul className={classes} aria-label="Purchase assurances">
        {values.items === true && (
          <>
            <li className="trust-badge"><ShieldCheck aria-hidden="true" /><span>Secure checkout</span></li>
            <li className="trust-badge"><Truck aria-hidden="true" /><span>Tracked delivery</span></li>
            <li className="trust-badge"><PackageCheck aria-hidden="true" /><span>Careful packaging</span></li>
          </>
        )}
      </ul>
    );
  }

  function renderPaymentIcons() {
    return (
      <div
        className={['payment-icons', values.small === true ? 'payment-icons--sm' : null].filter(Boolean).join(' ')}
        role="list"
        aria-label="Accepted payment methods"
      >
        {values.icons === true && (
          <>
            <PaymentMark label="Visa" shortLabel="VISA" />
            <PaymentMark label="Mastercard" shortLabel="MC" />
            <PaymentMark label="American Express" shortLabel="AMEX" />
          </>
        )}
      </div>
    );
  }

  function renderCountdown() {
    const segments = [
      { value: '02', label: 'Days' },
      { value: '14', label: 'Hours' },
      { value: '38', label: 'Minutes' },
    ];
    return (
      <div
        className={['countdown', variantClass(contract, values.variant)].filter(Boolean).join(' ')}
        role="timer"
        aria-label="2 days, 14 hours, and 38 minutes remaining in this static preview"
      >
        {values.segments === true && segments.map((segment, index) => (
          <Fragment key={segment.label}>
            {index > 0 && <span className="countdown__separator" aria-hidden="true">:</span>}
            <div className="countdown__segment" aria-hidden="true">
              <span className="countdown__number">{segment.value}</span>
              <span className="countdown__label">{segment.label}</span>
            </div>
          </Fragment>
        ))}
      </div>
    );
  }

  function renderUrgency() {
    const variant = String(values.variant || 'low-stock');
    const Cue = variant === 'selling-fast' ? Flame : variant === 'viewers' ? Eye : Clock3;
    const showIcon = variant !== 'low-stock';
    return (
      <p className={['urgency', variantClass(contract, values.variant)].filter(Boolean).join(' ')}>
        {showIcon && <Cue aria-hidden="true" />}
        <span>{String(values.message)}</span>
      </p>
    );
  }

  function renderCookiePreferences() {
    if (values.preferences !== true) return null;
    return (
      <div className="cookie-preferences" aria-label="Preference preview">
        <div className="cookie-preferences__category">
          <div>
            <div className="cookie-preferences__name">Optional site preferences</div>
            <p className="cookie-preferences__desc">Review additional choices for this site.</p>
          </div>
        </div>
      </div>
    );
  }

  function renderCookieConsent() {
    const bannerId = `studio-cookie-banner-${generatedId}`;
    const visible = values.visible === true;
    return (
      <div className="docs-studio__marketing-trigger-stage">
        <button
          className="btn btn--outline docs-studio__marketing-trigger"
          type="button"
          aria-expanded={visible}
          aria-controls={bannerId}
          hidden={visible}
          onClick={() => setValue('visible', true)}
        >
          Show cookie notice
        </button>
        {visible && (
          <aside
            className="cookie-banner docs-studio__marketing-cookie-banner"
            id={bannerId}
            data-visible
            aria-label="Cookie options"
          >
            <div className="cookie-banner__inner">
              <div>
                <p className="cookie-banner__text">
                  {String(values.message)}{' '}
                  <a href="#studio-cookie-policy" onClick={(event) => event.preventDefault()}>Read the cookie policy</a>.
                </p>
                {renderCookiePreferences()}
              </div>
              {values.actions === true && (
                <div className="cookie-banner__actions">
                  <button className="btn" type="button" onClick={() => setValue('preferences', values.preferences !== true)}>
                    Review options
                  </button>
                  <button className="btn btn--outline" type="button" onClick={() => setValue('visible', false)}>
                    Dismiss notice
                  </button>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    );
  }

  function renderSocialProof() {
    const noticeId = `studio-social-proof-${generatedId}`;
    const visible = values.visible === true;
    return (
      <div className="docs-studio__marketing-trigger-stage">
        <button
          className="btn btn--outline docs-studio__marketing-trigger"
          type="button"
          aria-expanded={visible}
          aria-controls={noticeId}
          hidden={visible}
          onClick={() => setValue('visible', true)}
        >
          Show notification
        </button>
        {visible && (
          <aside
            className="social-proof docs-studio__marketing-social-proof"
            id={noticeId}
            data-visible
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {values.image === true && (
              <MarketingMedia
                className="social-proof__image"
                kind="social-proof"
                alt={String(values.imageAlt || '')}
              />
            )}
            <div>
              <p className="social-proof__text">{String(values.message)}</p>
              {String(values.time || '') && <span className="social-proof__time">{String(values.time)}</span>}
            </div>
            {values.dismissAction === true && (
              <button
                className="social-proof__close"
                type="button"
                aria-label={String(values.dismissLabel || 'Dismiss notification')}
                onClick={() => setValue('visible', false)}
              >
                <X aria-hidden="true" />
              </button>
            )}
          </aside>
        )}
      </div>
    );
  }

  function renderAnnouncement() {
    if (!announcementVisible) {
      return <button className="btn" type="button" onClick={() => setAnnouncementVisible(true)}>Show announcement</button>;
    }
    const hasSlides = values.slides === true;
    return (
      <aside
        className={[
          'announcement',
          hasSlides ? 'announcement-bar--rotating' : 'announcement-bar--countdown',
          'docs-studio__marketing-announcement',
        ].filter(Boolean).join(' ')}
        aria-label="Limited-time gallery announcement"
      >
        {hasSlides ? (
          <div className="announcement-bar__slides docs-studio__marketing-announcement-slides">
            <div className="announcement-bar__slide">
              <span>New studio works are now available</span>
            </div>
          </div>
        ) : (
          <><span>Studio event closes in</span>&nbsp;<strong>2 days, 14 hours</strong></>
        )}
        {values.dismissAction === true && (
          <button
            className="announcement-bar__dismiss"
            type="button"
            aria-label={String(values.dismissLabel || 'Dismiss announcement')}
            onClick={() => setAnnouncementVisible(false)}
          >
            <X aria-hidden="true" />
          </button>
        )}
      </aside>
    );
  }

  function renderPreview() {
    if (contract.slug === 'hero') return renderHero();
    if (contract.slug === 'newsletter') return renderNewsletter();
    if (contract.slug === 'testimonials') return renderTestimonials();
    if (contract.slug === 'popup') return renderPopup();
    if (contract.slug === 'trust-badges') return renderTrustBadges();
    if (contract.slug === 'payment-icons') return renderPaymentIcons();
    if (contract.slug === 'countdown') return renderCountdown();
    if (contract.slug === 'urgency') return renderUrgency();
    if (contract.slug === 'cookie-consent') return renderCookieConsent();
    if (contract.slug === 'social-proof') return renderSocialProof();
    return renderAnnouncement();
  }

  const overlayStage = ['popup', 'cookie-consent', 'social-proof'].includes(contract.slug);

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector
          definition={definition}
          contract={contract}
          values={values}
          slotIconValues={emptySlotIcons}
          stateValue={currentState()}
          tokenValues={tokenValues}
          activeTokens={activeTokens}
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />
        <section
          className={[
            'docs-studio__stage',
            'docs-studio__stage--marketing',
            overlayStage ? 'docs-studio__stage--overlay' : null,
          ].filter(Boolean).join(' ')}
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className={`docs-studio__stage-inner docs-studio__marketing-stage-inner docs-studio__marketing-stage-inner--${contract.slug}`}>
            {renderPreview()}
          </div>
        </section>
      </div>
    </div>
  );
}
