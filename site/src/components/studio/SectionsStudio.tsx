import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import {
  PackageCheck,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import AccordionArtwork from './AccordionArtwork';
import BeforeAfterArtwork, { beforeAfterFixtureMedia } from './BeforeAfterArtwork';
import ComparisonTableArtwork, {
  buildComparisonTableFixture,
  type ComparisonInteraction,
  type ComparisonSelectionMode,
} from './ComparisonTableArtwork';
import { editorialImage } from './editorialMedia';
import MarqueeArtwork, {
  marqueeFixtureItems,
  type MarqueeDirection,
  type MarqueePace,
  type MarqueePresentation,
} from './MarqueeArtwork';
import LogoBarArtwork, {
  logoBarFixtureMarks,
  type LogoBarPresentation,
} from './LogoBarArtwork';
import ProductCardArtwork from './ProductCardArtwork';
import StatArtwork from './StatArtwork';

interface SectionsStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtures: Record<string, StudioPropertyValues> = {
  'featured-collection': {
    variant: 'grid', title: 'Selected works', viewAllLabel: 'View the collection',
    viewAllDestination: '/components/collection-grid', products: true,
  },
  'image-text': {
    variant: 'default', media: true, eyebrow: 'Material study', title: 'Clay remembers the hand',
    body: true, action: true,
  },
  multicolumn: { title: 'Made with intention', items: true },
  'gallery-grid': { variant: 'grid', title: 'In the gallery', items: true },
  lookbook: { title: 'Objects in place', items: true },
  'video-section': {
    variant: 'contained', media: true, caption: 'A quiet afternoon in the ceramics studio.',
  },
  'brand-story': {
    media: true, eyebrow: 'Our practice', title: 'A gallery built around attention', body: true, signature: true,
  },
  'faq-section': {
    title: 'Questions from collectors', subtitle: 'Details about the work, delivery, and care.', items: true,
  },
  'contact-section': {
    title: 'Speak with the gallery', description: 'Ask about a work, commission, or private viewing.',
    formLabel: 'Send an inquiry to the gallery', details: true, form: true,
  },
  'stats-section': { title: 'The studio in numbers', metrics: true },
  'logo-bar': {
    presentation: 'static', label: 'Presented with', marks: true,
    direction: 'forward', pace: 'default', pauseLabel: 'Pause logos', resumeLabel: 'Resume logos',
  },
  'comparison-table': {
    title: 'Choose your finish', table: true, interaction: 'selectable',
    selectionMode: 'single', selectedId: 'satin', selectedIds: ['satin', 'gloss'],
  },
  'shipping-info': { items: true },
  'rich-text-section': { title: 'On useful beauty', body: true },
  'instagram-feed': {
    heading: 'From the studio', handle: '@thegallery', handleDestination: '/components/instagram-feed', items: true, action: true,
  },
  'before-after': {
    label: 'Reveal the warm color treatment percentage',
    description: 'Original and warm treatments of the same vessel.',
    beforeMedia: true, afterMedia: true, beforeLabel: 'Original', afterLabel: 'Warm treatment',
    value: 50, disabled: false, name: '',
  },
  marquee: {
    presentation: 'auto', label: 'Studio principles', items: true,
    direction: 'forward', pace: 'default', pauseLabel: 'Pause scrolling', resumeLabel: 'Resume scrolling',
  },
  'collage-section': { heading: 'Studies in form', items: true },
};

const featuredCollectionProducts = [
  {
    title: 'Ribbed stoneware vessel',
    imageAlt: 'Tall ribbed stoneware vessel in a dark studio setting',
    mediaIndex: 1,
    vendor: 'The Gallery Studio',
    subtitle: 'Ash glaze · one of one',
    currentPrice: '$298.00',
  },
  {
    title: 'Low serving bowl',
    imageAlt: 'Low ceramic serving bowl arranged on a wooden table',
    mediaIndex: 2,
    vendor: 'Atelier Norte',
    currentPrice: '$186.00',
  },
  {
    title: 'Taza de gres torneada a mano',
    imageAlt: 'Maker finishing a wheel-thrown stoneware cup',
    mediaIndex: 3,
    vendor: 'Taller Sur',
    subtitle: 'Esmalte de ceniza',
    currentPrice: '$124.00',
  },
  {
    title: 'وعاء من الخزف الحجري',
    imageAlt: 'Stoneware vessel with a pale mineral glaze',
    mediaIndex: 4,
    vendor: 'Bayt Studio',
    currentPrice: '$210.00',
  },
  {
    title: 'Quiet form No. 07',
    imageAlt: 'Rounded ceramic form with a soft matte finish',
    mediaIndex: 5,
    subtitle: 'Porcelain · satin glaze',
    currentPrice: '$340.00',
  },
  {
    title: 'Pair of nesting dishes',
    imageAlt: 'Two nesting ceramic dishes photographed from above',
    mediaIndex: 6,
    vendor: 'The Gallery Editions',
    currentPrice: '$152.00',
  },
] as const;

const instagramFeedItems = [
  {
    alt: 'Wheel-thrown stoneware forms drying on a studio board',
    caption: 'Wheel-thrown forms',
    destination: '/components/process-timeline',
    mediaIndex: 1,
  },
  {
    alt: 'Mineral glaze samples arranged after firing',
    caption: 'Glaze tests',
    mediaIndex: 2,
  },
  {
    alt: 'One-of-one ceramic work wrapped for protected delivery',
    caption: 'Packing one-of-one works',
    destination: '/components/shipping-info',
    mediaIndex: 3,
  },
  {
    alt: 'Ceramic vessels installed on a quiet gallery shelf',
    caption: 'Installation view',
    mediaIndex: 4,
  },
  {
    alt: 'Clay, oxide, and glaze samples in the material archive',
    caption: 'Material archive',
    destination: '/components/gallery-grid',
    mediaIndex: 5,
  },
  {
    alt: 'Late afternoon light crossing the ceramics studio',
    caption: 'Studio light',
    mediaIndex: 6,
  },
] as const;

const collageItems = [
  {
    alt: 'Large hand-built vessel beside a linen chair',
    caption: 'Sculptural scale',
    featured: true,
    mediaIndex: 1,
  },
  {
    alt: 'Two stoneware cups on a timber table',
    caption: 'Daily rituals',
    destination: '/components/gallery-grid',
    mediaIndex: 2,
  },
  {
    alt: 'Mineral glaze samples arranged in a studio tray',
    caption: 'Surface studies',
    mediaIndex: 3,
  },
  {
    alt: 'Low ceramic bowl in late afternoon light',
    caption: 'Quiet utility',
    destination: '/components/image-text',
    mediaIndex: 4,
  },
  {
    alt: 'Clay forms drying together on an open shelf',
    caption: 'Works in progress',
    mediaIndex: 5,
  },
] as const;

function defaultValue(contract: ComponentContract, property: ContractProperty): StudioPropertyValue {
  if ('defaultValue' in property) return property.defaultValue ?? null;
  if (property.type === 'boolean' || property.type === 'slot') return false;
  if (property.type === 'number') return null;
  if (property.type === 'string-list') return [];
  if (property.type === 'enum') {
    const options = property.valuesFrom === 'variants'
      ? contract.variants
      : property.valuesFrom === 'sizes'
        ? contract.sizes
        : null;
    return options?.find((option) => option.default)?.name ?? property.values?.[0] ?? null;
  }
  return '';
}

function initialValues(contract: ComponentContract): StudioPropertyValues {
  return {
    ...Object.fromEntries((contract.properties ?? []).map((property) => [property.name, defaultValue(contract, property)])),
    ...(fixtures[contract.slug] ?? {}),
  } as StudioPropertyValues;
}

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

function optionClass(contract: ComponentContract, value: StudioPropertyValue): string | null {
  return contract.variants.find((option) => option.name === value)?.className?.replace(/^\./, '') ?? null;
}

function SectionMedia({ index = 1, className = '', alt }: { index?: number; className?: string; alt: string }) {
  return (
    <img
      className={`${className} docs-studio__sections-media docs-studio__sections-media--${((index - 1) % 6) + 1}`}
      src={editorialImage(index - 1)}
      alt={alt}
    />
  );
}

export default function SectionsStudio({ contract, definition }: SectionsStudioProps) {
  const uid = useId().replace(/:/g, '');
  const baseline = useMemo(() => initialValues(contract), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const activeTokens = useMemo(() => Object.fromEntries(definition.groups.flatMap((group) => (
    group.controls.filter((control) => control.tokens).map((control) => [control.id, resolveTokens(control, contract)[0] ?? null])
  ))), [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(baseline);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [stateValue, setStateValue] = useState(contract.states[0]?.name ?? 'default');
  const [openFaq, setOpenFaq] = useState(0);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const read = () => {
      const computed = getComputedStyle(document.documentElement);
      setBaseTokenValues(Object.fromEntries(studioTokens.map((token) => [token, computed.getPropertyValue(token).trim()])));
    };
    const observer = new MutationObserver(read);
    read();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [studioTokens]);

  function reset() {
    setValues({ ...baseline });
    setTokenOverrides({});
    setStateValue(contract.states[0]?.name ?? 'default');
    setOpenFaq(0);
    setEmail('');
    setMessage('');
    setFeedback('');
  }

  function renderFeaturedCollection() {
    const title = String(values.title || '').trim();
    if (!title || values.products !== true) return null;

    const variantName = String(values.variant || 'grid');
    const variant = optionClass(contract, values.variant);
    const isGrid = variantName === 'grid';
    const isCarousel = variantName === 'carousel';
    const viewAllLabel = String(values.viewAllLabel || '').trim();
    const viewAllDestination = String(values.viewAllDestination || '').trim();
    const rootDependency = isGrid ? 'collection-grid' : isCarousel ? 'carousel' : '';
    const listDependency = isGrid ? 'collection-grid__items' : isCarousel ? 'carousel__track' : '';
    const itemDependency = isGrid ? 'collection-grid__item' : isCarousel ? 'carousel__slide' : '';
    const titleId = `sections-featured-${uid}`;

    return (
      <section
        className={['featured-collection', variant, rootDependency, 'docs-studio__sections-featured'].filter(Boolean).join(' ')}
        aria-labelledby={titleId}
      >
        <header className="featured-collection__header">
          <h2 className="featured-collection__title" id={titleId}>{title}</h2>
          {viewAllLabel && viewAllDestination && (
            <a className="link featured-collection__link" href={viewAllDestination}>{viewAllLabel}</a>
          )}
        </header>
        <ul
          className={['featured-collection__grid', listDependency].filter(Boolean).join(' ')}
          role="list"
          aria-labelledby={titleId}
          tabIndex={isCarousel ? 0 : undefined}
        >
          {featuredCollectionProducts.map((product, index) => (
            <li className={['featured-collection__item', itemDependency].filter(Boolean).join(' ')} key={product.title}>
              <ProductCardArtwork
                {...product}
                href={`/components/product-card?work=${index + 1}`}
                className="docs-studio__product-card docs-studio__product-card--compact docs-studio__sections-product-card"
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  function renderImageText() {
    const title = String(values.title || '').trim();
    const hasMedia = values.media === true;
    const hasBody = values.body === true;
    if (!title || !hasMedia || !hasBody) return null;

    const eyebrow = String(values.eyebrow || '').trim();
    const variant = optionClass(contract, values.variant);
    const titleId = `sections-image-text-${uid}`;
    return (
      <section
        className={['image-text', variant, 'docs-studio__sections-image-text'].filter(Boolean).join(' ')}
        aria-labelledby={titleId}
      >
        <div className="image-text__media">
          <SectionMedia index={2} alt="Stoneware bowls and plates arranged on a wooden table" />
        </div>
        <div className="image-text__content">
          {eyebrow && <p className="image-text__eyebrow">{eyebrow}</p>}
          <h2 className="image-text__title" id={titleId}>{title}</h2>
          <div className="image-text__body">
            <p>Every surface records pressure, time, and the decisions made while the clay is still responsive.</p>
          </div>
          {values.action === true && (
            <a className="image-text__cta btn" href="/components/material-library">Explore the material</a>
          )}
        </div>
      </section>
    );
  }

  function renderMulticolumn() {
    if (values.items !== true) return null;

    const title = String(values.title || '').trim();
    const titleId = `sections-multicolumn-${uid}`;
    const Root = title ? 'section' : 'div';
    const items = [
      [Sparkles, 'Small batches', 'Each group is made slowly and finished by hand.'],
      [ShieldCheck, 'Durable materials', 'Glazes and forms are selected for everyday use.'],
      [RefreshCw, 'Considered cycles', 'Clay and packaging are reused whenever possible.'],
    ] as const;
    return (
      <Root
        className="multicolumn docs-studio__sections-multicolumn"
        aria-labelledby={title ? titleId : undefined}
      >
        {title && (
          <div className="multicolumn__header">
            <h2 className="multicolumn__title" id={titleId}>{title}</h2>
          </div>
        )}
        <ul className="multicolumn__grid">
          {items.map(([Icon, itemTitle, text]) => (
            <li className="multicolumn__item" key={itemTitle}>
              <Icon className="multicolumn__icon" aria-hidden="true" />
              <h3 className="multicolumn__item-title">{itemTitle}</h3>
              <p className="multicolumn__item-text">{text}</p>
            </li>
          ))}
        </ul>
      </Root>
    );
  }

  function renderGallery() {
    if (values.items !== true) return null;
    const variant = optionClass(contract, values.variant);
    const title = String(values.title || '').trim();
    const titleId = `sections-gallery-grid-${uid}`;
    const Root = title ? 'section' : 'div';
    const items = [
      ['Textured ceramic vase against a dark studio backdrop', 1],
      ['Handmade ceramic tableware arranged on linen', 2],
      ['Ceramic artist standing beside work in the studio', 3],
      ['Pastel ceramic tableware arranged on a dining table', 4],
    ] as const;
    return (
      <Root
        className={['gallery-grid', variant, 'docs-studio__sections-gallery'].filter(Boolean).join(' ')}
        aria-labelledby={title ? titleId : undefined}
      >
        {title && <div className="gallery-grid__header"><h2 className="gallery-grid__title" id={titleId}>{title}</h2></div>}
        <ul className="gallery-grid__items">
          {items.map(([alt, index]) => <li className="gallery-grid__item" key={alt}><SectionMedia index={index} alt={alt} /></li>)}
        </ul>
      </Root>
    );
  }

  function renderLookbook() {
    if (values.items !== true) return null;
    const title = String(values.title || '').trim();
    const titleId = `sections-lookbook-${uid}`;
    const Root = title ? 'section' : 'div';
    const items = [
      {
        alt: 'Textured stoneware vessel against a dark studio backdrop',
        caption: 'Mineral study',
        index: 1,
        modifier: 'lookbook__cell--wide',
      },
      {
        alt: 'Stoneware tableware arranged on linen',
        caption: 'Objects for daily rituals',
        index: 2,
        modifier: 'lookbook__cell--tall',
      },
      {
        alt: 'Ceramic artist shaping a vessel in the studio',
        caption: 'The maker at work',
        index: 3,
      },
      {
        alt: 'Pastel tableware arranged on a dining surface',
        caption: 'Soft forms, shared table',
        index: 4,
      },
      {
        alt: 'Potter shaping clay at the wheel',
        caption: 'Wheel-thrown process',
        index: 5,
      },
      {
        alt: 'Ceramic vessels arranged on studio shelves',
        caption: 'Archive of vessels',
        index: 6,
      },
    ];

    return (
      <Root
        className="lookbook docs-studio__sections-lookbook"
        aria-labelledby={title ? titleId : undefined}
      >
        {title && <div className="lookbook__header"><h2 className="lookbook__title" id={titleId}>{title}</h2></div>}
        <ol className="lookbook__grid">
          {items.map((item) => (
            <li
              className={['lookbook__cell', item.modifier].filter(Boolean).join(' ')}
              key={item.caption}
            >
              <figure className="lookbook__figure">
                <SectionMedia index={item.index} alt={item.alt} />
                <figcaption className="lookbook__caption">{item.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </Root>
    );
  }

  function renderVideo() {
    if (values.media !== true) return null;
    const variant = optionClass(contract, values.variant);
    const caption = String(values.caption || '').trim();
    return <figure className={['video-section', variant].filter(Boolean).join(' ')}><div className="video-section__wrapper"><SectionMedia className="video-section__media" index={4} alt="A ceramicist centering clay on a pottery wheel" /></div>{caption && <figcaption className="video-section__caption">{caption}</figcaption>}</figure>;
  }

  function renderBrandStory() {
    const title = String(values.title || '').trim();
    if (!title || values.media !== true || values.body !== true) return null;

    const eyebrow = String(values.eyebrow || '').trim();
    const titleId = `sections-brand-story-${uid}`;
    return (
      <section className="brand-story image-text" aria-labelledby={titleId}>
        <div className="image-text__media">
          <SectionMedia index={5} alt="A ceramicist shaping a vessel at a wheel in the studio" />
        </div>
        <div className="image-text__content">
          {eyebrow && <p className="image-text__eyebrow">{eyebrow}</p>}
          <h2 className="image-text__title" id={titleId}>{title}</h2>
          <div className="image-text__body">
            <p>We work with independent makers whose practices value material intelligence, restraint, and lasting use.</p>
            <p>The gallery gives those objects enough room to be seen closely.</p>
          </div>
          {values.signature === true && <footer className="brand-story__signature">The Gallery</footer>}
        </div>
      </section>
    );
  }

  function renderFaq() {
    const items = [
      ['Is every work handmade?', 'Yes. Small variations are evidence of the making process and part of each work.'],
      ['Can I request a private viewing?', 'The gallery can arrange a remote or in-person viewing for available works.'],
      ['How should I care for the ceramics?', 'Use a soft cloth and avoid sudden temperature changes unless the work states otherwise.'],
    ];
    if (values.items !== true || items.length === 0) return null;

    const title = String(values.title || '').trim();
    const subtitle = String(values.subtitle || '').trim();
    const titleId = title ? `sections-faq-${uid}` : undefined;
    const Root = title ? 'section' : 'div';

    return (
      <Root className="faq-section" aria-labelledby={titleId}>
        {(title || subtitle) && (
          <header className="faq-section__header">
            {title && <h2 className="faq-section__title" id={titleId}>{title}</h2>}
            {subtitle && <p className="faq-section__subtitle">{subtitle}</p>}
          </header>
        )}
        <AccordionArtwork
          className="faq-section__list"
          idPrefix={`sections-faq-${uid}`}
          items={items.map(([question, answer]) => ({
            key: question,
            title: question,
            className: 'faq-section__item',
            content: <p>{answer}</p>,
          }))}
          expandedItems={items.map((_, index) => openFaq === index)}
          onToggle={(index) => setOpenFaq((current) => current === index ? -1 : index)}
          headingLevel={title ? 3 : 2}
        />
      </Root>
    );
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback('Preview only: no message was sent.');
  }

  function renderContact() {
    const title = String(values.title || '').trim();
    const description = String(values.description || '').trim();
    const formLabel = String(values.formLabel || '').trim();
    const hasDetails = values.details === true;
    const hasInfo = Boolean(title || description || hasDetails);
    if (values.form !== true || !formLabel) return null;

    const titleId = title ? `sections-contact-title-${uid}` : undefined;
    const emailId = `sections-contact-email-${uid}`;
    const messageId = `sections-contact-message-${uid}`;
    const Root = title ? 'section' : 'div';

    return (
      <Root className="contact-section" aria-labelledby={titleId}>
        <div className="contact-section__grid">
          {hasInfo && (
            <div className="contact-section__info">
              {(title || description) && (
                <header className="contact-section__header">
                  {title && <h2 className="contact-section__title" id={titleId}>{title}</h2>}
                  {description && <p className="contact-section__text">{description}</p>}
                </header>
              )}
              {hasDetails && (
                <address className="contact-section__details">
                  <ul>
                    <li className="contact-section__detail">
                      <a href="mailto:studio@thegallery.example">studio@thegallery.example</a>
                    </li>
                    <li className="contact-section__detail">
                      <span>Private viewings by appointment</span>
                    </li>
                  </ul>
                </address>
              )}
            </div>
          )}
          <form className="contact-section__form" aria-label={formLabel} method="post" onSubmit={submitContact}>
            <div className="input">
              <label className="input__label" htmlFor={emailId}>Email (required)</label>
              <div className="input__control">
                <input
                  className="input__field"
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  required
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setFeedback('');
                  }}
                />
              </div>
            </div>
            <div className="input">
              <label className="input__label" htmlFor={messageId}>Message (required)</label>
              <div className="input__control">
                <textarea
                  className="input__field textarea__field"
                  id={messageId}
                  name="message"
                  value={message}
                  required
                  data-min-lines="4"
                  onChange={(event) => {
                    setMessage(event.target.value);
                    setFeedback('');
                  }}
                />
              </div>
            </div>
            <button className="btn" type="submit">Send inquiry</button>
            {feedback && <p className="contact-section__status" role="status">{feedback}</p>}
          </form>
        </div>
      </Root>
    );
  }

  function renderStats() {
    if (values.metrics !== true) return null;

    const title = String(values.title || '').trim();
    const Root = title ? 'section' : 'div';
    const titleId = title ? `sections-stats-${uid}` : undefined;
    const metrics = [
      ['18', 'Independent makers'],
      ['42', 'New works'],
      ['7', 'Material studies'],
    ] as const;

    return (
      <Root
        className="stats-section docs-studio__sections-stats"
        aria-labelledby={titleId}
      >
        <div className="stats-section__inner">
          {title && <h2 className="stats-section__title" id={titleId}>{title}</h2>}
          <ul className="stats-section__grid stat-group">
            {metrics.map(([value, label]) => (
              <StatArtwork
                as="li"
                value={value}
                label={label}
                className="stats-section__item"
                key={label}
              />
            ))}
          </ul>
        </div>
      </Root>
    );
  }

  function renderLogoBar() {
    return (
      <LogoBarArtwork
        marks={values.marks === true ? logoBarFixtureMarks : []}
        label={String(values.label || '')}
        presentation={String(values.presentation || 'static') as LogoBarPresentation}
        direction={String(values.direction || 'forward') as MarqueeDirection}
        pace={String(values.pace || 'default') as MarqueePace}
        pauseLabel={String(values.pauseLabel || '')}
        resumeLabel={String(values.resumeLabel || '')}
        className="docs-studio__sections-logo-bar"
      />
    );
  }

  function renderComparison() {
    return (
      <ComparisonTableArtwork
        title={String(values.title || '')}
        fixture={values.table === true ? buildComparisonTableFixture() : null}
        interaction={String(values.interaction || 'passive') as ComparisonInteraction}
        selectionMode={String(values.selectionMode || 'single') as ComparisonSelectionMode}
        selectedId={String(values.selectedId || '')}
        selectedIds={Array.isArray(values.selectedIds) ? values.selectedIds : []}
        onSelectionChange={(selection) => setValues((current) => ({
          ...current,
          ...(Array.isArray(selection)
            ? { selectedIds: selection }
            : { selectedId: selection }),
        }))}
        className="docs-studio__sections-comparison"
      />
    );
  }

  function renderShipping() {
    if (values.items !== true) return null;

    const items = [[Truck, 'Careful delivery', 'Tracked delivery with protective packing.'], [PackageCheck, 'Gallery checked', 'Every work is inspected before dispatch.'], [ShieldCheck, 'Insured transit', 'Coverage is included until arrival.']] as const;
    return (
      <ul className="shipping-info" role="list">
        {items.map(([Icon, label, text]) => (
          <li className="shipping-info__item" key={label}>
            <Icon className="shipping-info__icon" aria-hidden="true" />
            <p className="shipping-info__label">{label}</p>
            <p className="shipping-info__text">{text}</p>
          </li>
        ))}
      </ul>
    );
  }

  function renderRichText() {
    if (values.body !== true) return null;

    const title = String(values.title || '').trim();
    const titleId = `sections-rich-text-${uid}`;
    const Root = title ? 'section' : 'div';
    return (
      <Root
        className="rich-text-section docs-studio__sections-rich-text"
        aria-labelledby={title ? titleId : undefined}
      >
        {title && <h2 className="rich-text-section__title" id={titleId}>{title}</h2>}
        <div className="rich-text-section__body">
          <p>The most useful objects rarely ask for attention. They earn it slowly through proportion, touch, and repetition.</p>
          <blockquote>
            <p>A vessel becomes familiar through use, but never entirely ordinary.</p>
            <cite>Studio journal</cite>
          </blockquote>
          <h3>Material as record</h3>
          <p>Clay preserves a sequence of decisions:</p>
          <ul>
            <li>pressure held at the rim</li>
            <li>the pace of drying</li>
            <li>the final layer of glaze</li>
          </ul>
          <p>See how those decisions become form in the <a href="/components/process-timeline">making process</a>.</p>
        </div>
      </Root>
    );
  }

  function renderInstagram() {
    if (values.items !== true) return null;

    const heading = String(values.heading || '').trim();
    const handle = String(values.handle || '').trim();
    const handleDestination = String(values.handleDestination || '').trim();
    const hasHandle = Boolean(handle && handleDestination);
    const headingId = `sections-instagram-${uid}`;
    const Root = heading ? 'section' : 'div';

    return (
      <Root
        className="instagram-feed docs-studio__sections-instagram"
        aria-labelledby={heading ? headingId : undefined}
      >
        {(heading || hasHandle) && (
          <header className="instagram-feed__header">
            {heading && <h2 className="instagram-feed__heading" id={headingId}>{heading}</h2>}
            {hasHandle && <a className="instagram-feed__handle" href={handleDestination}>{handle}</a>}
          </header>
        )}
        <ul className="instagram-feed__grid">
          {instagramFeedItems.map((item) => {
            const figure = (
              <figure className="instagram-feed__figure">
                <SectionMedia
                  className="instagram-feed__media"
                  index={item.mediaIndex}
                  alt={item.alt}
                />
                <figcaption className="instagram-feed__caption">{item.caption}</figcaption>
              </figure>
            );

            return (
              <li className="instagram-feed__item" key={item.caption}>
                {'destination' in item
                  ? <a className="instagram-feed__link" href={item.destination}>{figure}</a>
                  : figure}
              </li>
            );
          })}
        </ul>
        {values.action === true && (
          <div className="instagram-feed__cta">
            <a className="btn btn--outline" href="/components/gallery-grid">Browse the visual archive</a>
          </div>
        )}
      </Root>
    );
  }

  function renderBeforeAfter() {
    return (
      <BeforeAfterArtwork
        label={String(values.label || '')}
        description={String(values.description || '')}
        beforeMedia={values.beforeMedia === true ? beforeAfterFixtureMedia.before : null}
        afterMedia={values.afterMedia === true ? beforeAfterFixtureMedia.after : null}
        beforeLabel={String(values.beforeLabel || '')}
        afterLabel={String(values.afterLabel || '')}
        value={Number(values.value ?? 50)}
        disabled={values.disabled === true}
        name={String(values.name || '')}
        className="docs-studio__sections-before-after"
      />
    );
  }

  function renderMarquee() {
    return (
      <MarqueeArtwork
        items={values.items === true ? marqueeFixtureItems : []}
        label={String(values.label || '')}
        presentation={String(values.presentation || 'auto') as MarqueePresentation}
        direction={String(values.direction || 'forward') as MarqueeDirection}
        pace={String(values.pace || 'default') as MarqueePace}
        pauseLabel={String(values.pauseLabel || '')}
        resumeLabel={String(values.resumeLabel || '')}
        className="docs-studio__sections-marquee"
      />
    );
  }

  function renderCollage() {
    if (values.items !== true) return null;

    const heading = String(values.heading || '').trim();
    const headingId = `sections-collage-${uid}`;
    const Root = heading ? 'section' : 'div';

    return (
      <Root
        className="collage-section docs-studio__sections-collage"
        aria-labelledby={heading ? headingId : undefined}
      >
        {heading && (
          <header className="collage-section__header">
            <h2 className="collage-section__heading" id={headingId}>{heading}</h2>
          </header>
        )}
        <ul className="collage-section__grid">
          {collageItems.map((item) => {
            const figure = (
              <figure className="collage-section__figure">
                <SectionMedia className="collage-section__media" index={item.mediaIndex} alt={item.alt} />
                <figcaption className="collage-section__caption">{item.caption}</figcaption>
              </figure>
            );

            return (
              <li
                className={`collage-section__item${'featured' in item && item.featured ? ' collage-section__item--feature' : ''}`}
                key={item.caption}
              >
                {'destination' in item
                  ? <a className="collage-section__link" href={item.destination}>{figure}</a>
                  : figure}
              </li>
            );
          })}
        </ul>
      </Root>
    );
  }

  function renderPreview() {
    if (contract.slug === 'featured-collection') return renderFeaturedCollection();
    if (contract.slug === 'image-text') return renderImageText();
    if (contract.slug === 'multicolumn') return renderMulticolumn();
    if (contract.slug === 'gallery-grid') return renderGallery();
    if (contract.slug === 'lookbook') return renderLookbook();
    if (contract.slug === 'video-section') return renderVideo();
    if (contract.slug === 'brand-story') return renderBrandStory();
    if (contract.slug === 'faq-section') return renderFaq();
    if (contract.slug === 'contact-section') return renderContact();
    if (contract.slug === 'stats-section') return renderStats();
    if (contract.slug === 'logo-bar') return renderLogoBar();
    if (contract.slug === 'comparison-table') return renderComparison();
    if (contract.slug === 'shipping-info') return renderShipping();
    if (contract.slug === 'rich-text-section') return renderRichText();
    if (contract.slug === 'instagram-feed') return renderInstagram();
    if (contract.slug === 'before-after') return renderBeforeAfter();
    if (contract.slug === 'marquee') return renderMarquee();
    return renderCollage();
  }

  return (
    <div className={`docs-studio docs-studio__sections docs-studio__sections--${contract.slug}`}>
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector
          definition={definition}
          contract={contract}
          values={values}
          slotIconValues={emptySlotIcons}
          stateValue={stateValue}
          tokenValues={{ ...baseTokenValues, ...tokenOverrides }}
          activeTokens={activeTokens}
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={() => undefined}
          onStateChange={setStateValue}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />
        <section
          className={`docs-studio__stage docs-studio__stage--sections docs-studio__sections-stage docs-studio__sections-stage--${contract.slug}`}
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className={`docs-studio__stage-inner docs-studio__sections-inner docs-studio__sections-inner--${contract.slug}`}>
            {renderPreview()}
          </div>
        </section>
      </div>
    </div>
  );
}
