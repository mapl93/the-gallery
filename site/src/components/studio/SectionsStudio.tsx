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
  ChevronDown,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Play,
  RefreshCw,
  ShieldCheck,
  Sparkles,
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
import { editorialImage } from './editorialMedia';

interface SectionsStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtures: Record<string, StudioPropertyValues> = {
  'hero-section': {
    variant: 'full', media: true, overlay: true, eyebrow: 'The summer exhibition',
    title: 'Useful objects, considered slowly',
    subtitle: 'A study of material, proportion, and the rituals that give objects meaning.',
    actions: true, slides: false,
  },
  'featured-collection': {
    variant: 'grid', title: 'Selected works', viewAllLabel: 'View the collection',
    viewAllDestination: '#collection', products: true,
  },
  'image-text': {
    variant: 'default', media: true, eyebrow: 'Material study', title: 'Clay remembers the hand',
    body: true, action: true,
  },
  multicolumn: { title: 'Made with intention', items: true },
  'gallery-grid': { variant: 'grid', title: 'In the gallery', items: true },
  lookbook: { title: 'Objects in place', items: true },
  'video-section': {
    variant: 'contained', media: true, playAction: true,
    playLabel: 'Play the studio film', caption: 'A quiet afternoon in the ceramics studio.',
  },
  'brand-story': {
    media: true, eyebrow: 'Our practice', title: 'A gallery built around attention', body: true, signature: true,
  },
  'faq-section': {
    title: 'Questions from collectors', subtitle: 'Details about the work, delivery, and care.', items: true,
  },
  'contact-section': {
    title: 'Speak with the gallery', description: 'Ask about a work, commission, or private viewing.',
    details: true, form: true,
  },
  'stats-section': { title: 'The studio in numbers', metrics: true },
  'logo-bar': { variant: 'static', label: 'Presented with', logos: true },
  'comparison-table': { title: 'Choose your finish', table: true },
  'shipping-info': { items: true },
  'rich-text-section': { title: 'On useful beauty', body: true },
  'instagram-feed': {
    heading: 'From the studio', handle: '@thegallery', handleDestination: '#studio', items: true, action: true,
  },
  'before-after': {
    beforeMedia: true, afterMedia: true, beforeLabel: 'Raw clay', afterLabel: 'Final glaze', control: true,
  },
  marquee: { items: true },
  'collage-section': { heading: 'Studies in form', items: true },
};

function defaultValue(contract: ComponentContract, property: ContractProperty): StudioPropertyValue {
  if ('defaultValue' in property) return property.defaultValue ?? null;
  if (property.type === 'boolean' || property.type === 'slot') return false;
  if (property.type === 'number') return null;
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

function ProductCard({ index }: { index: number }) {
  return (
    <article className="product-card docs-studio__sections-product-card">
      <div className="product-card__media">
        <SectionMedia className="product-card__image product-card__image--primary" index={index} alt={`Ceramic study ${index}`} />
      </div>
      <div className="product-card__body">
        <span className="product-card__vendor">The Gallery Studio</span>
        <h3 className="product-card__title"><a href="#product" onClick={(event) => event.preventDefault()}>Study No. {index}</a></h3>
      </div>
      <div className="product-card__footer"><span className="price"><span className="price__current">${80 + index * 18}.00</span></span></div>
    </article>
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

  function renderHero() {
    const variant = optionClass(contract, values.variant);
    const isSlides = values.variant === 'slideshow' && values.slides === true;
    return (
      <section className={['hero-section', variant, 'docs-studio__sections-hero'].filter(Boolean).join(' ')} aria-labelledby={`sections-hero-${uid}`}>
        {values.media === true && (
          <div className="hero-section__media">
            {isSlides ? <div className="hero-section__slide"><SectionMedia index={1} alt="Stoneware vessels in the gallery" /></div> : <SectionMedia index={1} alt="Stoneware vessels in the gallery" />}
          </div>
        )}
        {values.overlay === true && <div className="hero-section__overlay" aria-hidden="true" />}
        <div className="hero-section__content">
          {String(values.eyebrow || '') && <div className="hero-section__eyebrow">{String(values.eyebrow)}</div>}
          <h2 className="hero-section__title" id={`sections-hero-${uid}`}>{String(values.title)}</h2>
          {String(values.subtitle || '') && <p className="hero-section__subtitle">{String(values.subtitle)}</p>}
          {values.actions === true && <div className="hero-section__actions"><a className="btn" href="#works" onClick={(e) => e.preventDefault()}>View works</a><a className="btn btn--secondary" href="#story" onClick={(e) => e.preventDefault()}>Our practice</a></div>}
        </div>
      </section>
    );
  }

  function renderFeaturedCollection() {
    const variant = optionClass(contract, values.variant);
    return (
      <section className={['featured-collection', variant, 'docs-studio__sections-featured'].filter(Boolean).join(' ')}>
        <div className="featured-collection__header">
          {String(values.title || '') && <h2 className="featured-collection__title">{String(values.title)}</h2>}
          {String(values.viewAllLabel || '') && <a className="featured-collection__link" href={String(values.viewAllDestination || '#collection')} onClick={(e) => e.preventDefault()}>{String(values.viewAllLabel)}</a>}
        </div>
        {values.products === true && <div className="featured-collection__grid">{[1, 2, 3].map((index) => <ProductCard index={index} key={index} />)}</div>}
      </section>
    );
  }

  function renderImageText() {
    const variant = optionClass(contract, values.variant);
    return (
      <section className={['image-text', variant, 'docs-studio__sections-image-text'].filter(Boolean).join(' ')}>
        {values.media === true && <div className="image-text__media"><SectionMedia index={2} alt="Hands shaping a vessel" /></div>}
        <div className="image-text__content">
          {String(values.eyebrow || '') && <div className="image-text__eyebrow">{String(values.eyebrow)}</div>}
          <h2 className="image-text__title">{String(values.title)}</h2>
          {values.body === true && <div className="image-text__body"><p>Every surface records pressure, time, and the decisions made while the clay is still responsive.</p></div>}
          {values.action === true && <a className="image-text__cta btn" href="#material" onClick={(e) => e.preventDefault()}>Explore the material</a>}
        </div>
      </section>
    );
  }

  function renderMulticolumn() {
    const items = [
      [Sparkles, 'Small batches', 'Each group is made slowly and finished by hand.'],
      [ShieldCheck, 'Durable materials', 'Glazes and forms are selected for everyday use.'],
      [RefreshCw, 'Considered cycles', 'Clay and packaging are reused whenever possible.'],
    ] as const;
    return <section className="multicolumn docs-studio__sections-multicolumn">{String(values.title || '') && <div className="multicolumn__header"><h2 className="multicolumn__title">{String(values.title)}</h2></div>}{values.items === true && <div className="multicolumn__grid">{items.map(([Icon, title, text]) => <article className="multicolumn__item" key={title}><Icon className="multicolumn__icon" aria-hidden="true" /><h3 className="multicolumn__item-title">{title}</h3><p className="multicolumn__item-text">{text}</p></article>)}</div>}</section>;
  }

  function renderGallery() {
    const variant = optionClass(contract, values.variant);
    return <section className={['gallery-grid', variant, 'docs-studio__sections-gallery'].filter(Boolean).join(' ')}>{String(values.title || '') && <div className="gallery-grid__header"><h2 className="gallery-grid__title">{String(values.title)}</h2></div>}{values.items === true && <div className="gallery-grid__items">{[1, 2, 3, 4].map((index) => <div className="gallery-grid__item" tabIndex={0} key={index}><SectionMedia index={index} alt={`Gallery installation view ${index}`} /></div>)}</div>}</section>;
  }

  function renderLookbook() {
    return <section className="lookbook docs-studio__sections-lookbook">{String(values.title || '') && <div className="lookbook__header"><h2 className="lookbook__title">{String(values.title)}</h2></div>}{values.items === true && <div className="lookbook__grid">{[1, 2, 3, 4].map((index) => <div className={`lookbook__cell${index === 1 ? ' lookbook__cell--wide' : ''}`} tabIndex={0} key={index}><SectionMedia index={index + 1} alt={`Ceramic object in an interior ${index}`} /><div className="lookbook__caption">Stoneware study {index}</div>{index === 1 && <span className="lookbook__hotspot" aria-hidden="true" />}</div>)}</div>}</section>;
  }

  function renderVideo() {
    const variant = optionClass(contract, values.variant);
    return <figure className={['video-section', variant, 'docs-studio__sections-video'].filter(Boolean).join(' ')}>{values.media === true && <div className="video-section__wrapper"><SectionMedia className="video-section__poster" index={4} alt="Still from the studio film" />{values.playAction === true && <button className="video-section__play" type="button" aria-label={String(values.playLabel || 'Play video')}><Play aria-hidden="true" /></button>}</div>}{String(values.caption || '') && <figcaption className="video-section__caption">{String(values.caption)}</figcaption>}</figure>;
  }

  function renderBrandStory() {
    return <section className="brand-story docs-studio__sections-brand"><div className="brand-story__grid">{values.media === true && <div className="brand-story__media"><SectionMedia index={5} alt="The maker at a workbench" /></div>}<div className="brand-story__content">{String(values.eyebrow || '') && <div className="brand-story__eyebrow">{String(values.eyebrow)}</div>}<h2 className="brand-story__title">{String(values.title)}</h2>{values.body === true && <div className="brand-story__text"><p>We work with independent makers whose practices value material intelligence, restraint, and lasting use.</p><p>The gallery gives those objects enough room to be seen closely.</p></div>}{values.signature === true && <div className="brand-story__signature docs-studio__sections-signature" aria-label="The Gallery">The Gallery</div>}</div></div></section>;
  }

  function renderFaq() {
    const items = [
      ['Is every work handmade?', 'Yes. Small variations are evidence of the making process and part of each work.'],
      ['Can I request a private viewing?', 'The gallery can arrange a remote or in-person viewing for available works.'],
      ['How should I care for the ceramics?', 'Use a soft cloth and avoid sudden temperature changes unless the work states otherwise.'],
    ];
    return <section className="faq-section docs-studio__sections-faq">{(String(values.title || '') || String(values.subtitle || '')) && <div className="faq-section__header">{String(values.title || '') && <h2 className="faq-section__title">{String(values.title)}</h2>}{String(values.subtitle || '') && <p className="faq-section__subtitle">{String(values.subtitle)}</p>}</div>}{values.items === true && <div className="accordion">{items.map(([title, content], index) => { const expanded = openFaq === index; const trigger = `sections-faq-trigger-${uid}-${index}`; const panel = `sections-faq-panel-${uid}-${index}`; return <div className="accordion__item" key={title}><button className="accordion__trigger" id={trigger} type="button" aria-expanded={expanded} aria-controls={panel} onClick={() => setOpenFaq(expanded ? -1 : index)}><span>{title}</span><ChevronDown className="accordion__icon" aria-hidden="true" /></button><div className="accordion__panel" id={panel} role="region" aria-labelledby={trigger}><div className="accordion__panel-inner"><div className="accordion__content">{content}</div></div></div></div>; })}</div>}</section>;
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(`Thank you${email ? `, ${email}` : ''}. Your preview message was received.`);
  }

  function renderContact() {
    const emailId = `sections-contact-email-${uid}`;
    const messageId = `sections-contact-message-${uid}`;
    const feedbackId = `sections-contact-feedback-${uid}`;
    return <section className="contact-section docs-studio__sections-contact"><div className="contact-section__grid"><div className="contact-section__info">{String(values.title || '') && <h2 className="contact-section__title">{String(values.title)}</h2>}{String(values.description || '') && <p className="contact-section__text">{String(values.description)}</p>}{values.details === true && <><div className="contact-section__detail"><Mail aria-hidden="true" /><span>studio@thegallery.example</span></div><div className="contact-section__detail"><MapPin aria-hidden="true" /><span>Private viewings by appointment</span></div></>}</div>{values.form === true && <form className="contact-section__form" onSubmit={submitContact}><div className="input"><label className="input__label" htmlFor={emailId}>Email</label><div className="input__control"><input className="input__field" id={emailId} type="email" value={email} required aria-describedby={feedback ? feedbackId : undefined} onChange={(e) => setEmail(e.target.value)} /></div></div><div className="input textarea"><label className="input__label" htmlFor={messageId}>Message</label><div className="input__control"><textarea className="input__field textarea__field" id={messageId} value={message} required onChange={(e) => setMessage(e.target.value)} /></div></div><button className="btn" type="submit">Send inquiry</button>{feedback && <p className="input__message" id={feedbackId} role="status">{feedback}</p>}</form>}</div></section>;
  }

  function renderStats() {
    return <section className="stats-section docs-studio__sections-stats">{String(values.title || '') && <h2 className="stats-section__title">{String(values.title)}</h2>}{values.metrics === true && <div className="stats-section__grid">{[['18', 'Independent makers'], ['42', 'New works'], ['7', 'Material studies']].map(([number, label]) => <div className="stats-section__item" key={label}><div className="stats-section__number">{number}</div><div className="stats-section__label">{label}</div></div>)}</div>}</section>;
  }

  function renderLogoBar() {
    const variant = optionClass(contract, values.variant);
    return <section className={['logo-bar', variant, 'docs-studio__sections-logo-bar'].filter(Boolean).join(' ')}>{String(values.label || '') && <div className="logo-bar__label">{String(values.label)}</div>}{values.logos === true && <div className="logo-bar__logos" aria-label="Gallery partners">{['Form', 'Matter', 'Atelier', 'Index'].map((label) => <span className="docs-studio__sections-logo" key={label}>{label}</span>)}</div>}</section>;
  }

  function renderComparison() {
    return <section className="comparison-table docs-studio__sections-comparison" tabIndex={0}>{String(values.title || '') && <h2 className="comparison-table__title">{String(values.title)}</h2>}{values.table === true && <table><thead><tr><th scope="col">Quality</th><th className="comparison-table__highlight" scope="col">Satin</th><th scope="col">Gloss</th></tr></thead><tbody><tr><th scope="row">Soft reflection</th><td className="comparison-table__highlight"><Check className="comparison-table__check" aria-label="Included" /></td><td><X className="comparison-table__cross" aria-label="Not included" /></td></tr><tr><th scope="row">Dishwasher suitable</th><td className="comparison-table__highlight"><Check className="comparison-table__check" aria-label="Included" /></td><td><Check className="comparison-table__check" aria-label="Included" /></td></tr></tbody></table>}</section>;
  }

  function renderShipping() {
    const items = [[Truck, 'Careful delivery', 'Tracked delivery with protective packing.'], [PackageCheck, 'Gallery checked', 'Every work is inspected before dispatch.'], [ShieldCheck, 'Insured transit', 'Coverage is included until arrival.']] as const;
    return <section className="shipping-info docs-studio__sections-shipping">{values.items === true && items.map(([Icon, label, text]) => <div className="shipping-info__item" key={label}><Icon className="shipping-info__icon" aria-hidden="true" /><div className="shipping-info__label">{label}</div><div className="shipping-info__text">{text}</div></div>)}</section>;
  }

  function renderRichText() {
    return <article className="rich-text-section docs-studio__sections-rich-text">{String(values.title || '') && <h2 className="rich-text-section__title">{String(values.title)}</h2>}{values.body === true && <div className="rich-text-section__body"><p>The most useful objects rarely ask for attention. They earn it slowly through proportion, touch, and repetition.</p><blockquote>A vessel becomes familiar through use, but never entirely ordinary.</blockquote><h3>Material as record</h3><p>Clay preserves a sequence of decisions. <a href="#process" onClick={(e) => e.preventDefault()}>Read about the process</a>.</p></div>}</article>;
  }

  function renderInstagram() {
    return <section className="instagram-feed docs-studio__sections-instagram">{(String(values.heading || '') || String(values.handle || '')) && <div className="instagram-feed__header">{String(values.heading || '') && <h2 className="instagram-feed__heading">{String(values.heading)}</h2>}{String(values.handle || '') && <a className="instagram-feed__handle" href={String(values.handleDestination || '#studio')} onClick={(e) => e.preventDefault()}>{String(values.handle)}</a>}</div>}{values.items === true && <div className="instagram-feed__grid">{[1, 2, 3, 4, 5, 6].map((index) => <div className="instagram-feed__item" tabIndex={0} key={index}><SectionMedia index={index} alt={`Studio detail ${index}`} /><div className="instagram-feed__overlay"><span className="instagram-feed__stat"><Heart aria-hidden="true" /> {20 + index}</span><span className="instagram-feed__stat"><MessageCircle aria-hidden="true" /> {index}</span></div></div>)}</div>}{values.action === true && <div className="instagram-feed__cta"><a className="btn btn--outline" href="#social" onClick={(e) => e.preventDefault()}>Visit the studio journal</a></div>}</section>;
  }

  function renderBeforeAfter() {
    return <figure className="before-after docs-studio__sections-before-after">{values.beforeMedia === true && <SectionMedia className="before-after__image" index={2} alt="Raw clay before glazing" />}{values.afterMedia === true && <div className="before-after__overlay"><SectionMedia index={3} alt="Finished glazed ceramic" /></div>}{values.control === true && <div className="before-after__handle" aria-hidden="true" />}{String(values.beforeLabel || '') && <figcaption className="before-after__label before-after__label--before">{String(values.beforeLabel)}</figcaption>}{String(values.afterLabel || '') && <span className="before-after__label before-after__label--after">{String(values.afterLabel)}</span>}</figure>;
  }

  function renderMarquee() {
    return <div className="marquee docs-studio__sections-marquee" aria-label="Gallery themes">{values.items === true && <div className="marquee__track">{['Form', 'Material', 'Ritual', 'Use'].map((item, index) => <span key={item} className="marquee__item">{item} <span className="marquee__separator" aria-hidden="true">/</span>{index === 3 ? '' : ''}</span>)}</div>}</div>;
  }

  function renderCollage() {
    return <section className="collage-section docs-studio__sections-collage">{String(values.heading || '') && <div className="collage-section__header"><h2 className="collage-section__heading">{String(values.heading)}</h2></div>}{values.items === true && <div className="collage-section__grid">{[1, 2, 3, 4, 5].map((index) => <div className={`collage-section__item${index === 1 ? ' collage-section__item--feature' : ''}`} tabIndex={0} key={index}><SectionMedia index={index} alt={`Material study ${index}`} /><div className="collage-section__caption">Study {index}</div></div>)}</div>}</section>;
  }

  function renderPreview() {
    if (contract.slug === 'hero-section') return renderHero();
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
