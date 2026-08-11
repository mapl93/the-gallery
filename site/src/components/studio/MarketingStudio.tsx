import {
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
import CountdownArtwork from './CountdownArtwork';
import CheckboxArtwork from './CheckboxArtwork';
import ConsentManagerArtwork from './ConsentManagerArtwork';
import HeroArtwork from './HeroArtwork';

interface MarketingStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  hero: {
    layout: 'full',
    height: 'default',
    mediaBehavior: 'slideshow',
    label: 'New collection',
    title: 'Objects shaped for daily rituals',
    description: 'A quiet study in hand-thrown stoneware, tactile glazes, and useful forms.',
    media: true,
    overlay: true,
    actions: true,
    slides: true,
    autoplay: true,
    loop: true,
    navigation: 'both',
    autoplayInterval: 6000,
    previousLabel: 'Previous slide',
    nextLabel: 'Next slide',
    pauseLabel: 'Pause slideshow',
    playLabel: 'Play slideshow',
    statusTemplate: 'Slide {current} of {total}',
  },
  'hero-section': {
    layout: 'full', height: 'default', mediaBehavior: 'slideshow',
    label: 'New collection', title: 'Objects shaped for daily rituals',
    description: 'A quiet study in hand-thrown stoneware, tactile glazes, and useful forms.',
    media: true, overlay: true, actions: true, slides: true, autoplay: true,
    loop: true, navigation: 'both', autoplayInterval: 6000,
    previousLabel: 'Previous slide', nextLabel: 'Next slide',
    pauseLabel: 'Pause slideshow', playLabel: 'Play slideshow',
    statusTemplate: 'Slide {current} of {total}',
  },
  newsletter: {
    title: 'Notes from the studio',
    description: 'Receive new collection releases and occasional stories from the workshop.',
    form: true,
    note: 'One concise update each month. Unsubscribe at any time.',
  },
  testimonials: { title: 'Collector notes', items: true },
  'trust-badges': {
    variant: 'compact',
    items: true,
    accessibleLabel: 'Example purchase assurances',
  },
  'payment-icons': {
    icons: true,
    size: 'default',
    accessibleLabel: 'Example accepted payment methods',
  },
  countdown: {
    variant: 'cards',
    deadline: new Date(Date.now() + 225525000).toISOString(),
    units: 'days-hours-minutes-seconds',
    fallbackText: 'Ends at the configured deadline',
    expiredAnnouncement: 'Countdown complete',
  },
  urgency: { variant: 'low-stock', message: 'Example only: 3 pieces remain' },
  'cookie-consent': {
    title: 'Choose how this site uses data',
    description: 'You can accept, reject, or review optional uses before making a choice.',
    policyLabel: 'Read the privacy and cookie policy',
    policyHref: '/policies/privacy-and-cookies',
    acceptLabel: 'Accept optional uses',
    rejectLabel: 'Reject optional uses',
    customizeLabel: 'Customize choices',
    preferencesTitle: 'Privacy preferences',
    preferencesDescription: 'Review the example categories supplied by this preview target.',
    preferences: true,
    closePreferencesLabel: 'Close privacy preferences',
    saveLabel: 'Save choices',
    feedback: false,
    open: true,
    preferencesOpen: false,
    busy: false,
  },
  'social-proof': {
    message: 'Example only: a Celadon Study purchase was recorded.',
    time: 'Sample time: recently',
    image: true,
    imageAlt: 'Textured stoneware vase',
    dismissAction: true,
    dismissLabel: 'Dismiss purchase notification',
    visible: true,
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

function sizeClass(contract: ComponentContract, value: StudioPropertyValue): string | null {
  return contract.sizes.find((option) => option.name === value)?.className?.replace(/^\./, '') ?? null;
}

function MarketingMedia({
  className = '',
  kind,
  alt,
}: {
  className?: string;
  kind: 'social-proof';
  alt: string;
}) {
  const source = {
    'social-proof': editorialMedia.texturedVase,
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
    <li className="payment-icons__item">
      <svg
        className="payment-icons__mark"
        viewBox="0 0 48 28"
        role="img"
        aria-label={label}
      >
        <rect width="48" height="28" rx="4" fill="currentColor" opacity="0.15" />
        <text x="24" y="18" textAnchor="middle" fontSize="8" fill="currentColor">
          {shortLabel}
        </text>
      </svg>
    </li>
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
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

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
    setNewsletterEmail('');
    setNewsletterStatus('');
    setAnalyticsConsent(false);
  }

  function currentState(): string {
    if (contract.slug === 'cookie-consent') {
      if (values.open !== true) return 'closed';
      if (values.preferencesOpen === true) return 'preferencesOpen';
      if (values.busy === true) return 'busy';
      return 'open';
    }
    if (contract.slug === 'social-proof') {
      return values.visible === true && String(values.message || '').trim() ? 'visible' : 'hidden';
    }
    return 'default';
  }

  function renderHero() {
    return <HeroArtwork
      className="docs-studio__marketing-hero"
      label={String(values.label || '')}
      title={String(values.title || '')}
      description={String(values.description || '')}
      layout={String(values.layout || 'full') as 'full' | 'split' | 'text-only'}
      height={String(values.height || 'default') as 'default' | 'fullscreen'}
      mediaBehavior={String(values.mediaBehavior || 'none') as 'none' | 'parallax' | 'slideshow'}
      media={values.media === true}
      overlay={values.overlay === true}
      actions={values.actions === true}
      slides={values.slides === true}
      autoplay={values.autoplay === true}
      loop={values.loop !== false}
      navigation={String(values.navigation || 'both') as 'both' | 'arrows' | 'indicators'}
      autoplayInterval={Number(values.autoplayInterval) || 6000}
      previousLabel={String(values.previousLabel || 'Previous slide')}
      nextLabel={String(values.nextLabel || 'Next slide')}
      pauseLabel={String(values.pauseLabel || 'Pause slideshow')}
      playLabel={String(values.playLabel || 'Play slideshow')}
      statusTemplate={String(values.statusTemplate || 'Slide {current} of {total}')}
    />;
  }

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewsletterStatus('Preview only: no subscription was sent.');
  }

  function renderNewsletter() {
    const emailId = `studio-newsletter-email-${generatedId}`;
    const titleId = `studio-newsletter-title-${generatedId}`;
    const noteId = `${emailId}-note`;
    const title = String(values.title || '').trim();
    const description = String(values.description || '').trim();
    const note = String(values.note || '').trim();

    if (!title || values.form !== true) return null;

    return (
      <section className="newsletter docs-studio__marketing-newsletter" aria-labelledby={titleId}>
        <div className="newsletter__content">
          <h2 className="newsletter__title" id={titleId}>{title}</h2>
          {description && <p className="newsletter__description">{description}</p>}
          <form className="newsletter__form" aria-labelledby={titleId} onSubmit={submitNewsletter}>
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
                  aria-describedby={note ? noteId : undefined}
                  required
                  value={newsletterEmail}
                  onChange={(event) => {
                    setNewsletterEmail(event.target.value);
                    setNewsletterStatus('');
                  }}
                />
              </div>
            </div>
            <button className="btn" type="submit">Subscribe</button>
          </form>
          {newsletterStatus && <p className="newsletter__status" role="status">{newsletterStatus}</p>}
          {note && <p className="newsletter__note" id={noteId}>{note}</p>}
        </div>
      </section>
    );
  }

  function renderTestimonials() {
    const title = String(values.title || '').trim();
    if (values.items !== true) return null;

    const titleId = `studio-testimonials-title-${generatedId}`;
    const Root = title ? 'section' : 'div';

    return (
      <Root
        className="testimonials docs-studio__marketing-testimonials"
        aria-labelledby={title ? titleId : undefined}
      >
        {title && <h2 className="testimonials__title" id={titleId}>{title}</h2>}
        <ul className="testimonials__grid">
          {testimonialFixtures.map((item) => (
            <li className="testimonials__item" key={item.name}>
              <figure className="testimonial">
                <span className="testimonial__mark" aria-hidden="true">“</span>
                <blockquote className="testimonial__quote"><p>{item.quote}</p></blockquote>
                <figcaption className="testimonial__author">
                  <span className="avatar" aria-hidden="true">{item.initials}</span>
                  <span className="testimonial__identity">
                    <span className="testimonial__name">{item.name}</span>
                    <span className="testimonial__detail">{item.detail}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Root>
    );
  }

  function renderTrustBadges() {
    if (values.items !== true) return null;

    const classes = ['trust-badges', variantClass(contract, values.variant)].filter(Boolean).join(' ');
    const accessibleLabel = String(values.accessibleLabel || '').trim();
    return (
      <ul className={classes} role="list" aria-label={accessibleLabel || undefined}>
        <li className="trust-badge">
          <ShieldCheck className="trust-badge__icon" aria-hidden="true" />
          <span className="trust-badge__text">Example: secure checkout</span>
        </li>
        <li className="trust-badge">
          <Truck className="trust-badge__icon" aria-hidden="true" />
          <span className="trust-badge__text">Example: tracked delivery</span>
        </li>
        <li className="trust-badge">
          <PackageCheck className="trust-badge__icon" aria-hidden="true" />
          <span className="trust-badge__text">Example: careful packaging</span>
        </li>
      </ul>
    );
  }

  function renderPaymentIcons() {
    if (values.icons !== true) return null;

    const classes = ['payment-icons', sizeClass(contract, values.size)].filter(Boolean).join(' ');
    const accessibleLabel = String(values.accessibleLabel || '').trim();
    return (
      <ul
        className={classes}
        role="list"
        aria-label={accessibleLabel || undefined}
      >
        <PaymentMark label="Example card method" shortLabel="CARD" />
        <PaymentMark label="Example wallet method" shortLabel="WALLET" />
        <PaymentMark label="Example bank transfer" shortLabel="BANK" />
      </ul>
    );
  }

  function renderCountdown() {
    return <CountdownArtwork
      className={variantClass(contract, values.variant) ?? undefined}
      deadline={String(values.deadline || '')}
      units={String(values.units || 'days-hours-minutes-seconds')}
      fallbackText={String(values.fallbackText || '')}
      expiredAnnouncement={String(values.expiredAnnouncement || '')}
    />;
  }

  function renderUrgency() {
    const variant = String(values.variant || '');
    const message = String(values.message || '').trim();
    const variantOption = contract.variants.find((option) => option.name === variant);
    if (!variantOption || !message) return null;

    const Cue = variant === 'selling-fast' ? Flame : variant === 'viewers' ? Eye : Clock3;
    return (
      <p className={['urgency', variantClass(contract, variant)].filter(Boolean).join(' ')}>
        <span className="urgency__cue" aria-hidden="true">
          {variant !== 'low-stock' && <Cue />}
        </span>
        <span className="urgency__message">{message}</span>
      </p>
    );
  }

  function renderCookieConsent() {
    const managerId = `studio-consent-manager-${generatedId}`;
    const open = values.open === true;
    const preferencesOpen = open && values.preferencesOpen === true;
    const busy = values.busy === true;
    const feedback = values.feedback === true
      ? busy
        ? 'Preview target is applying the requested choice.'
        : 'Preview target reconciled the latest request.'
      : null;
    const preferences = values.preferences === true ? (
      <>
        <div className="consent-manager__preference">
          <CheckboxArtwork
            label="Necessary site operation"
            name="preview-consent-necessary"
            value="necessary"
            checked
            disabled
          />
          <p className="consent-manager__preference-description">
            Example target-required category; the Consent Manager does not define it.
          </p>
        </div>
        <div className="consent-manager__preference">
          <CheckboxArtwork
            label="Analytics"
            name="preview-consent-analytics"
            value="analytics"
            checked={analyticsConsent}
            disabled={busy}
            onChange={(event) => setAnalyticsConsent(event.currentTarget.checked)}
          />
          <p className="consent-manager__preference-description">
            Example target-owned optional value used only by this documentation fixture.
          </p>
        </div>
      </>
    ) : null;

    function closeAfterDecision() {
      setValue('preferencesOpen', false);
      setValue('open', false);
    }

    return (
      <div className="docs-studio__consent-target">
        <button
          className="btn btn--outline docs-studio__marketing-trigger"
          type="button"
          aria-expanded={open}
          aria-controls={managerId}
          hidden={open}
          onClick={() => setValue('open', true)}
        >
          Show consent choices
        </button>
        <ConsentManagerArtwork
          id={managerId}
          title={String(values.title || '')}
          description={String(values.description || '')}
          policyLabel={String(values.policyLabel || '')}
          policyHref={String(values.policyHref || '')}
          acceptLabel={String(values.acceptLabel || '')}
          rejectLabel={String(values.rejectLabel || '')}
          customizeLabel={String(values.customizeLabel || '')}
          preferencesTitle={String(values.preferencesTitle || '')}
          preferencesDescription={String(values.preferencesDescription || '')}
          closePreferencesLabel={String(values.closePreferencesLabel || '')}
          saveLabel={String(values.saveLabel || '')}
          open={open}
          preferencesOpen={preferencesOpen}
          busy={busy}
          preferences={preferences}
          feedback={feedback}
          closeIcon={<X className="close-btn__icon" aria-hidden="true" />}
          modalOverlayClassName="docs-studio__consent-preferences-overlay"
          onPreferencesOpenChange={(nextOpen) => setValue('preferencesOpen', nextOpen)}
          onAcceptRequest={closeAfterDecision}
          onRejectRequest={closeAfterDecision}
          onCustomizeRequest={() => setValue('feedback', false)}
          onSaveRequest={() => {
            setValue('feedback', true);
            setValue('preferencesOpen', false);
          }}
          onPolicyClick={(event) => event.preventDefault()}
        />
      </div>
    );
  }

  function renderSocialProof() {
    const noticeId = `studio-social-proof-${generatedId}`;
    const message = String(values.message || '').trim();
    const time = String(values.time || '').trim();
    const imageAlt = String(values.imageAlt || '').trim();
    const dismissLabel = String(values.dismissLabel || '').trim();
    const visible = values.visible === true && Boolean(message);
    const hasDismissAction = values.dismissAction === true && Boolean(dismissLabel);
    return (
      <div className="docs-studio__marketing-trigger-stage">
        {message && (
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
        )}
        {visible && (
          <div
            className="toast toast--info social-proof is-visible docs-studio__marketing-social-proof"
            id={noticeId}
            aria-hidden="false"
          >
            {values.image === true && (
              <MarketingMedia
                className="social-proof__image"
                kind="social-proof"
                alt={imageAlt}
              />
            )}
            <div className="toast__content social-proof__content">
              <p className="toast__message social-proof__text">{message}</p>
              {time && <span className="social-proof__time">{time}</span>}
            </div>
            {hasDismissAction && (
              <button
                className="close-btn toast__close social-proof__close"
                type="button"
                aria-label={dismissLabel}
                onClick={() => setValue('visible', false)}
              >
                <X className="close-btn__icon" aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  function renderPreview() {
    if (contract.slug === 'hero' || contract.slug === 'hero-section') return renderHero();
    if (contract.slug === 'newsletter') return renderNewsletter();
    if (contract.slug === 'testimonials') return renderTestimonials();
    if (contract.slug === 'trust-badges') return renderTrustBadges();
    if (contract.slug === 'payment-icons') return renderPaymentIcons();
    if (contract.slug === 'countdown') return renderCountdown();
    if (contract.slug === 'urgency') return renderUrgency();
    if (contract.slug === 'cookie-consent') return renderCookieConsent();
    if (contract.slug === 'social-proof') return renderSocialProof();
    return null;
  }

  const overlayStage = contract.slug === 'social-proof';

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
