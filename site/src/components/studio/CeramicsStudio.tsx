import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import {
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  CircleCheck,
  Play,
  QrCode,
  Sparkles,
  Upload,
  Waves,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface CeramicsStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const transparentImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E";
const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtures: Record<string, StudioPropertyValues> = {
  'material-library': {
    title: 'Material library',
    subtitle: 'Clay bodies selected for function, surface, and firing character.',
    materials: true,
  },
  'glaze-guide': { title: 'Glaze guide', swatches: true, detail: true },
  'technique-explainer': { title: 'From clay to vessel', steps: true },
  'care-instructions': { title: 'Care instructions', items: true, variant: 'default' },
  dimensions: { visual: true, measurements: true, unitControls: true },
  'firing-info': { title: 'Firing details', details: true },
  'workshop-listing': { workshops: true },
  'commission-form': {
    title: 'Commission a work',
    intro: 'Share the scale, use, and atmosphere you have in mind.',
    fields: true,
    referenceUpload: true,
    actions: true,
  },
  'makers-mark': {
    stamp: true,
    artist: 'Maria Garcia',
    studio: 'Buenos Aires studio',
    year: 'Made in 2026',
  },
  'edition-badge': { variant: 'limited', number: '42', total: '100', label: 'Limited edition' },
  'certificate-details': { icon: true, title: 'Certificate details', details: true, qr: true },
  'ceramics-glossary': {
    title: 'Ceramics glossary',
    intro: 'Terms used in studio notes and material records.',
    alphabetNavigation: true,
    terms: true,
  },
  'studio-tour': {
    eyebrow: 'Inside the studio',
    heading: 'From clay shelf to kiln',
    intro: 'A walkthrough of the spaces used to prepare, form, and fire each piece.',
    steps: true,
    media: true,
  },
  'ceramics-faq': {
    heading: 'Ceramics care FAQ',
    subheading: 'Care guidance for studio-made tableware.',
    categories: true,
    items: true,
    contact: true,
  },
};

const materials = [
  ['Stoneware 03', 'Stoneware', 'A durable warm clay body with a fine mineral speckle.', 'Speckled'],
  ['Porcelain 01', 'Porcelain', 'A translucent white body suited to precise, light forms.', 'Translucent'],
  ['Terracotta 07', 'Earthenware', 'An iron-rich body with a soft red fired surface.', 'Low fire'],
] as const;

const glazes = [
  ['Ash white', 'AW-12'],
  ['Celadon mist', 'CM-04'],
  ['Iron black', 'IB-09'],
] as const;

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

function variantClass(contract: ComponentContract, value: StudioPropertyValue): string | null {
  return contract.variants.find((variant) => variant.name === value)?.className?.replace(/^\./, '') ?? null;
}

function CeramicMedia({ index, className = '', alt }: { index: number; className?: string; alt: string }) {
  return (
    <img
      className={`${className} docs-studio__ceramics-media docs-studio__ceramics-media--${((index - 1) % 6) + 1}`}
      src={transparentImage}
      alt={alt}
    />
  );
}

function TextField({
  id,
  label,
  value,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="input">
      <label className="input__label" htmlFor={id}>{label}</label>
      <div className="input__control">
        <input
          className="input__field"
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}

export default function CeramicsStudio({ contract, definition }: CeramicsStudioProps) {
  const uid = useId().replace(/:/g, '');
  const baseline = useMemo(() => initialValues(contract), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const activeTokens = useMemo(() => Object.fromEntries(definition.groups.flatMap((group) => (
    group.controls
      .filter((control) => control.tokens)
      .map((control) => [control.id, resolveTokens(control, contract)[0] ?? null])
  ))), [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(baseline);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [stateValue, setStateValue] = useState(contract.states[0]?.name ?? 'default');
  const [selectedGlaze, setSelectedGlaze] = useState(0);
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [openTerm, setOpenTerm] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [referenceName, setReferenceName] = useState('');
  const [feedback, setFeedback] = useState('');

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

  useEffect(() => {
    setValues(baseline);
    setStateValue(contract.states[0]?.name ?? 'default');
    setTokenOverrides({});
  }, [baseline, contract.states]);

  function reset() {
    setValues({ ...baseline });
    setTokenOverrides({});
    setStateValue(contract.states[0]?.name ?? 'default');
    setSelectedGlaze(0);
    setUnit('cm');
    setOpenTerm(0);
    setOpenFaq(0);
    setName('');
    setRequest('');
    setReferenceName('');
    setFeedback('');
  }

  function submitCommission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(name && request
      ? `Local preview received a request from ${name}. Nothing was submitted.`
      : 'Complete the name and request fields to preview local confirmation.');
  }

  function renderMaterialLibrary() {
    return (
      <section className="material-library docs-studio__ceramics-materials" aria-labelledby={`materials-${uid}`}>
        {(String(values.title || '') || String(values.subtitle || '')) && (
          <header className="material-library__header">
            {String(values.title || '') && <h2 className="material-library__title" id={`materials-${uid}`}>{String(values.title)}</h2>}
            {String(values.subtitle || '') && <p className="material-library__subtitle">{String(values.subtitle)}</p>}
          </header>
        )}
        {values.materials === true && (
          <div className="material-library__grid">
            {materials.map(([name, type, description, tag], index) => (
              <article className="material-card" key={name}>
                <div className="material-card__swatch"><CeramicMedia index={index + 1} alt={`${name} clay body sample`} /></div>
                <div className="material-card__body">
                  <h3 className="material-card__name">{name}</h3>
                  <div className="material-card__type">{type}</div>
                  <p className="material-card__description">{description}</p>
                  <div className="material-card__properties"><span className="material-card__tag">{tag}</span></div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  function renderGlazeGuide() {
    const selected = stateValue === 'selected' ? selectedGlaze : -1;
    return (
      <section className="glaze-guide docs-studio__ceramics-glazes" aria-labelledby={`glazes-${uid}`}>
        {String(values.title || '') && <header className="glaze-guide__header"><h2 className="glaze-guide__title" id={`glazes-${uid}`}>{String(values.title)}</h2></header>}
        {values.swatches === true && (
          <div className="glaze-guide__grid" role="list" aria-label="Glaze samples">
            {glazes.map(([name, code], index) => (
              <button
                className="glaze-swatch"
                type="button"
                role="listitem"
                aria-selected={selected === index}
                key={name}
                onClick={() => { setSelectedGlaze(index); setStateValue('selected'); }}
              >
                <span className={`glaze-swatch__circle docs-studio__ceramics-glaze docs-studio__ceramics-glaze--${index + 1}`} aria-hidden="true" />
                <span className="glaze-swatch__name">{name}</span>
                <span className="glaze-swatch__code">{code}</span>
              </button>
            ))}
          </div>
        )}
        {values.detail === true && (
          <div className="glaze-detail">
            <div className="glaze-detail__image"><CeramicMedia index={selectedGlaze + 2} alt={`${glazes[selectedGlaze][0]} glaze on a test tile`} /></div>
            <div className="glaze-detail__info">
              <h3 className="glaze-detail__name">{glazes[selectedGlaze][0]}</h3>
              <dl className="glaze-detail__meta"><dt>Code</dt><dd>{glazes[selectedGlaze][1]}</dd><dt>Surface</dt><dd>Satin, softly varied</dd><dt>Firing note</dt><dd>Studio-supplied sample record</dd></dl>
            </div>
          </div>
        )}
      </section>
    );
  }

  function renderTechnique() {
    const steps = [
      ['01', 'Prepare', 'The clay is weighed and wedged before forming.'],
      ['02', 'Form', 'Each vessel is shaped in a deliberate working rhythm.'],
      ['03', 'Finish', 'The surface is refined before drying and firing.'],
    ] as const;
    return (
      <section className="technique-explainer docs-studio__ceramics-technique" aria-labelledby={`technique-${uid}`}>
        {String(values.title || '') && <header className="technique-explainer__header"><h2 className="technique-explainer__title" id={`technique-${uid}`}>{String(values.title)}</h2></header>}
        {values.steps === true && steps.map(([number, name, description], index) => (
          <article className="technique-step" key={name}>
            <div className="technique-step__content"><div className="technique-step__number" aria-hidden="true">{number}</div><h3 className="technique-step__name">{name}</h3><p className="technique-step__description">{description}</p></div>
            <div className="technique-step__media"><CeramicMedia index={index + 3} alt={`${name} stage of the ceramics process`} /></div>
          </article>
        ))}
      </section>
    );
  }

  function renderCare() {
    const className = variantClass(contract, values.variant);
    const items = [
      [Waves, 'Wash gently', 'Follow the care supplied with the piece.'],
      [CircleCheck, 'Dry fully', 'Let the surface dry before storage.'],
      [Sparkles, 'Handle mindfully', 'Protect rims from sudden impact.'],
    ] as const;
    return (
      <section className={['care-instructions', className, 'docs-studio__ceramics-care'].filter(Boolean).join(' ')}>
        {String(values.title || '') && <h2 className="care-instructions__title">{String(values.title)}</h2>}
        {values.items === true && <div className="care-instructions__grid">{items.map(([Icon, label, description]) => <div className="care-item" key={label}><Icon className="care-item__icon" aria-hidden="true" /><span className="care-item__label">{label}</span><span className="care-item__description">{description}</span></div>)}</div>}
      </section>
    );
  }

  function renderDimensions() {
    const measurements = unit === 'cm'
      ? [['Height', '12 cm'], ['Diameter', '24 cm'], ['Capacity', '1.4 L']]
      : [['Height', '4.7 in'], ['Diameter', '9.4 in'], ['Capacity', '47 fl oz']];
    return (
      <section className="dimensions docs-studio__ceramics-dimensions" aria-label="Object dimensions">
        {values.visual === true && <div className="dimensions__visual"><CeramicMedia index={2} alt="Bowl silhouette used to illustrate dimensions" /><span className="dimensions__label docs-studio__ceramics-dimension-label">24 cm</span></div>}
        {values.measurements === true && <dl className="dimensions__table">{measurements.map(([term, value]) => <div className="docs-studio__ceramics-dimension-row" key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>}
        {values.unitControls === true && <div className="dimensions__unit-toggle" aria-label="Displayed measurement unit">{(['cm', 'in'] as const).map((item) => <button type="button" aria-pressed={unit === item} key={item} onClick={() => { setUnit(item); setStateValue('selectedUnit'); }}>{item}</button>)}</div>}
      </section>
    );
  }

  function renderFiringInfo() {
    const details = [['Clay body', 'Speckled stoneware'], ['Bisque', '980 C'], ['Glaze', '1240 C'], ['Atmosphere', 'Oxidation']];
    return <section className="firing-info docs-studio__ceramics-firing">{String(values.title || '') && <h2 className="firing-info__title">{String(values.title)}</h2>}{values.details === true && <dl className="firing-info__list">{details.map(([term, value]) => <div className="firing-info__item" key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>}</section>;
  }

  function renderWorkshops() {
    const availability = stateValue === 'full' ? 'Workshop full' : stateValue === 'lowAvailability' ? '2 places left' : '8 places available';
    const availabilityClass = stateValue === 'full' ? 'workshop-card__spots--full' : stateValue === 'lowAvailability' ? 'workshop-card__spots--low' : '';
    return (
      <section className="workshop-grid docs-studio__ceramics-workshops" aria-label="Studio workshops">
        {values.workshops === true && [1, 2].map((index) => <article className="workshop-card" key={index}><div className="workshop-card__image"><CeramicMedia index={index + 4} alt={`Participants at wheel-forming workshop ${index}`} /></div><div className="workshop-card__body"><div className="workshop-card__date"><CalendarDays aria-hidden="true" /> July {18 + index}, 2026</div><h2 className="workshop-card__title">Wheel forming foundations</h2><div className="workshop-card__level">Open studio / introductory</div><p className="workshop-card__description">A target-supplied workshop record describing one guided studio session.</p><div className="workshop-card__footer"><span className="workshop-card__price">$120</span><span className={`workshop-card__spots ${availabilityClass}`}>{availability}</span><button className="btn btn--sm" type="button" disabled={stateValue === 'full'}>View details</button></div></div></article>)}
      </section>
    );
  }

  function renderCommissionForm() {
    return (
      <form className="commission-form docs-studio__ceramics-commission" onSubmit={submitCommission}>
        {(String(values.title || '') || String(values.intro || '')) && <header className="commission-form__header">{String(values.title || '') && <h2 className="commission-form__title">{String(values.title)}</h2>}{String(values.intro || '') && <p className="commission-form__text">{String(values.intro)}</p>}</header>}
        {values.fields === true && <div className="commission-form__fields"><TextField id={`commission-name-${uid}`} label="Name" value={name} placeholder="Your name" onChange={setName} /><div className="input"><label className="input__label" htmlFor={`commission-request-${uid}`}>Commission request</label><div className="input__control"><textarea className="input__field textarea__field" id={`commission-request-${uid}`} value={request} placeholder="Scale, use, and material notes" data-resize="both" onChange={(event) => setRequest(event.target.value)} /></div><p className="input__message">This preview keeps your text only in this page.</p></div></div>}
        {values.referenceUpload === true && <div className="commission-form__upload-zone"><label className="file-upload"><input className="file-upload__input" type="file" accept="image/*" onChange={(event) => setReferenceName(event.target.files?.[0]?.name ?? '')} /><Upload className="file-upload__icon" aria-hidden="true" /><span className="file-upload__text">Add a visual reference</span><span className="file-upload__hint">{referenceName || 'Image files; local preview only'}</span></label></div>}
        {values.actions === true && <div className="commission-form__actions"><button className="btn" type="submit">Preview request</button><button className="btn btn--outline" type="button" onClick={() => { setName(''); setRequest(''); setReferenceName(''); setFeedback(''); }}>Clear</button></div>}
        {feedback && <p className="docs-studio__ceramics-feedback" role="status">{feedback}</p>}
      </form>
    );
  }

  function renderMakersMark() {
    return <aside className="makers-mark docs-studio__ceramics-makers-mark" aria-label="Maker information">{values.stamp === true && <div className="makers-mark__stamp docs-studio__ceramics-stamp" role="img" aria-label="Stamped MG maker mark">MG</div>}<div className="makers-mark__info"><p className="makers-mark__artist">{String(values.artist)}</p>{String(values.studio || '') && <p className="makers-mark__studio">{String(values.studio)}</p>}{String(values.year || '') && <p className="makers-mark__year">{String(values.year)}</p>}</div></aside>;
  }

  function renderEditionBadge() {
    const className = variantClass(contract, values.variant);
    const accessible = [values.label, values.number && values.total ? `piece ${values.number} of ${values.total}` : values.number || values.total].filter(Boolean).join(', ');
    return <p className={['edition-badge', className, 'docs-studio__ceramics-edition'].filter(Boolean).join(' ')} aria-label={accessible}>{String(values.label || '') && <span className="edition-badge__label">{String(values.label)}</span>}{String(values.number || '') && <span className="edition-badge__number">{String(values.number)}</span>}{String(values.number || '') && String(values.total || '') && <span className="edition-badge__separator" aria-hidden="true">/</span>}{String(values.total || '') && <span className="edition-badge__total">{String(values.total)}</span>}</p>;
  }

  function renderCertificate() {
    const details = [['Maker', 'Maria Garcia'], ['Work', 'Altered Rim Bowl'], ['Year', '2026'], ['Reference', 'MG-2026-014']];
    return <section className="certificate-details docs-studio__ceramics-certificate" aria-labelledby={`certificate-${uid}`}>{values.icon === true && <BadgeCheck className="certificate-details__icon" aria-hidden="true" />}{String(values.title || '') && <h2 className="certificate-details__title" id={`certificate-${uid}`}>{String(values.title)}</h2>}{values.details === true && <dl className="certificate-details__grid">{details.map(([label, value]) => <div className="certificate-details__field" key={label}><dt className="certificate-details__label">{label}</dt><dd className="certificate-details__value">{value}</dd></div>)}</dl>}{values.qr === true && <div className="certificate-details__qr docs-studio__ceramics-qr" role="img" aria-label="Example QR media with no verification behavior"><QrCode aria-hidden="true" /></div>}</section>;
  }

  function renderGlossary() {
    const expanded = stateValue === 'expandedTerm' ? openTerm : -1;
    const terms = [['Bisque', 'Clay that has completed an initial firing before glaze firing.'], ['Crawling', 'A glaze surface condition described by the target record.']];
    return <section className="ceramics-glossary docs-studio__ceramics-glossary" aria-labelledby={`glossary-${uid}`}>{String(values.title || '') && <h2 className="ceramics-glossary__title" id={`glossary-${uid}`}>{String(values.title)}</h2>}{String(values.intro || '') && <p className="ceramics-glossary__intro">{String(values.intro)}</p>}{values.alphabetNavigation === true && <div className="ceramics-glossary__alpha-nav" role="group" aria-label="Glossary letters">{['B', 'C', 'Q'].map((letter, index) => <button className="ceramics-glossary__alpha-btn" type="button" aria-pressed={stateValue === 'activeControl' && index === 0} disabled={stateValue === 'disabledControl' && index === 2} key={letter}>{letter}</button>)}</div>}{values.terms === true && <section className="ceramics-glossary__group" aria-labelledby={`glossary-letter-${uid}`}><h3 className="ceramics-glossary__letter" id={`glossary-letter-${uid}`}>B-C</h3>{terms.map(([term, definition], index) => { const isOpen = expanded === index; const contentId = `glossary-${uid}-${index}`; return <article className="glossary-term" aria-expanded={isOpen} key={term}><button className="glossary-term__trigger" type="button" aria-expanded={isOpen} aria-controls={contentId} onClick={() => { setOpenTerm(index); setStateValue('expandedTerm'); }}>{term}<ChevronDown aria-hidden="true" /></button><div className="glossary-term__content" id={contentId}><p>{definition}</p><p className="glossary-term__related">Related: <a className="glossary-term__related-link" href="#ceramics-glossary" onClick={(event) => event.preventDefault()}>Studio terminology</a></p></div></article>; })}</section>}</section>;
  }

  function renderStudioTour() {
    const steps = [['Materials area', 'Clay is weighed, wedged, and prepared for daily forms.'], ['Forming area', 'Wheel-thrown and hand-built pieces are shaped in natural light.']];
    return <section className="studio-tour docs-studio__ceramics-tour" aria-labelledby={`tour-${uid}`}><header className="studio-tour__header">{String(values.eyebrow || '') && <p className="studio-tour__eyebrow">{String(values.eyebrow)}</p>}{String(values.heading || '') && <h2 className="studio-tour__heading" id={`tour-${uid}`}>{String(values.heading)}</h2>}{String(values.intro || '') && <p className="studio-tour__intro">{String(values.intro)}</p>}</header>{values.steps === true && <ol className="studio-tour__steps">{steps.map(([title, description], index) => <li className="studio-tour__step" key={title}><div className="studio-tour__step-media"><CeramicMedia index={index + 4} alt={`${title} in the ceramics studio`} /></div><span className="studio-tour__step-number" aria-hidden="true">{index + 1}</span><h3 className="studio-tour__step-title">{title}</h3><p className="studio-tour__step-desc">{description}</p></li>)}</ol>}{values.media === true && <div className="studio-tour__video"><CeramicMedia className="studio-tour__video-poster" index={1} alt="Studio walkthrough poster" /><button className="studio-tour__video-play" type="button" aria-label="Local preview of studio tour media"><Play aria-hidden="true" /></button></div>}</section>;
  }

  function renderFaq() {
    const expanded = stateValue === 'expandedItem' ? openFaq : -1;
    const items = [['How should I wash a glazed piece?', 'Follow the care instructions supplied with the specific piece.'], ['Where can I find material details?', 'Material details are provided with the target product record.']];
    return <section className="ceramics-faq docs-studio__ceramics-faq" aria-labelledby={`faq-${uid}`}><header className="ceramics-faq__header">{String(values.heading || '') && <h2 className="ceramics-faq__heading" id={`faq-${uid}`}>{String(values.heading)}</h2>}{String(values.subheading || '') && <p className="ceramics-faq__subheading">{String(values.subheading)}</p>}</header>{values.categories === true && <div className="ceramics-faq__categories" role="group" aria-label="FAQ category">{['Care', 'Materials'].map((category, index) => <button className="ceramics-faq__category-btn" type="button" aria-pressed={stateValue === 'activeCategory' && index === 0} key={category}>{category}</button>)}</div>}{values.items === true && <div className="ceramics-faq__list">{items.map(([question, answer], index) => { const isOpen = expanded === index; const answerId = `ceramics-faq-${uid}-${index}`; return <article className="faq-item" aria-expanded={isOpen} key={question}><button className="faq-item__question" type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => { setOpenFaq(index); setStateValue('expandedItem'); }}>{question}<ChevronDown aria-hidden="true" /></button><div className="faq-item__answer" id={answerId}><p>{answer}</p></div></article>; })}</div>}{values.contact === true && <footer className="ceramics-faq__contact"><p className="ceramics-faq__contact-text">Need more care information?</p><a className="ceramics-faq__contact-link" href="#care-guidance" onClick={(event) => event.preventDefault()}>Review the care guidance</a></footer>}</section>;
  }

  function renderPreview() {
    if (contract.slug === 'material-library') return renderMaterialLibrary();
    if (contract.slug === 'glaze-guide') return renderGlazeGuide();
    if (contract.slug === 'technique-explainer') return renderTechnique();
    if (contract.slug === 'care-instructions') return renderCare();
    if (contract.slug === 'dimensions') return renderDimensions();
    if (contract.slug === 'firing-info') return renderFiringInfo();
    if (contract.slug === 'workshop-listing') return renderWorkshops();
    if (contract.slug === 'commission-form') return renderCommissionForm();
    if (contract.slug === 'makers-mark') return renderMakersMark();
    if (contract.slug === 'edition-badge') return renderEditionBadge();
    if (contract.slug === 'certificate-details') return renderCertificate();
    if (contract.slug === 'ceramics-glossary') return renderGlossary();
    if (contract.slug === 'studio-tour') return renderStudioTour();
    return renderFaq();
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
          className={`docs-studio__stage docs-studio__stage--ceramics docs-studio__ceramics-stage docs-studio__ceramics-stage--${contract.slug}`}
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className={`docs-studio__stage-inner docs-studio__ceramics-inner docs-studio__ceramics-inner--${contract.slug}`}>
            {renderPreview()}
          </div>
        </section>
      </div>
    </div>
  );
}
