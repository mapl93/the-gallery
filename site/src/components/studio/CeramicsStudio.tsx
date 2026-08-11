import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import { Upload } from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import AccordionArtwork from './AccordionArtwork';
import CareInstructionsArtwork, { buildCareInstructionsFixture } from './CareInstructionsArtwork';
import CommissionFormArtwork, { buildCommissionFormFixture } from './CommissionFormArtwork';
import DimensionsArtwork, {
  buildDimensionsFixture,
  DimensionsFixtureVisual,
  type DimensionsFixtureUnit,
} from './DimensionsArtwork';
import EditionBadgeArtwork, { buildEditionBadgeFixture } from './EditionBadgeArtwork';
import FiringScheduleArtwork, { buildFiringScheduleFixture } from './FiringScheduleArtwork';
import FileUploadArtwork from './FileUploadArtwork';
import GlazeGuideArtwork, { buildGlazeGuideFixture } from './GlazeGuideArtwork';
import MaterialLibraryArtwork, { buildMaterialLibraryFixture } from './MaterialLibraryArtwork';
import InputArtwork from './InputArtwork';
import MakersMarkArtwork, {
  buildMakersMarkFixture,
  MakersMarkFixtureStamp,
} from './MakersMarkArtwork';
import TechniqueExplainerArtwork, { buildTechniqueExplainerFixture } from './TechniqueExplainerArtwork';
import TextareaArtwork from './TextareaArtwork';
import WorkshopListingArtwork, { buildWorkshopListingFixture } from './WorkshopListingArtwork';
import SegmentedControlArtwork from './SegmentedControlArtwork';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { editorialImage } from './editorialMedia';

interface CeramicsStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

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
  'firing-info': {
    title: 'Firing schedule',
    startingTemperatureCelsius: 20,
    segments: true,
    actualSamples: true,
    actualSummaries: true,
    view: 'both',
    displayUnit: 'celsius',
    actualStatus: 'complete',
  },
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
    href: '/makers/maria-garcia',
    studio: 'Buenos Aires studio',
    year: 'Made in 2026',
  },
  'edition-badge': { ...buildEditionBadgeFixture() },
  'ceramics-glossary': {
    title: 'Ceramics glossary',
    intro: 'Terms used in studio notes and material records.',
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
    items: true,
    contact: true,
  },
};

const glossaryGroups = [
  {
    letter: 'B',
    terms: [
      {
        term: 'Bisque',
        definition: 'Clay that has completed an initial firing before glaze firing.',
        imageIndex: 2,
        relatedLabel: 'Crawling',
        relatedGroup: 'c',
        relatedIndex: 0,
      },
      {
        term: 'Bone dry',
        definition: 'Clay that has lost all visible moisture and is ready for its first firing.',
        imageIndex: null,
        relatedLabel: '',
        relatedGroup: '',
        relatedIndex: null,
      },
    ],
  },
  {
    letter: 'C',
    terms: [
      {
        term: 'Crawling',
        definition: 'A glaze defect where the fired coating pulls away and exposes areas of clay.',
        imageIndex: null,
        relatedLabel: 'Bisque',
        relatedGroup: 'b',
        relatedIndex: 0,
      },
      {
        term: 'Crazing',
        definition: 'A network of fine cracks in a fired glaze caused by a clay-and-glaze fit mismatch.',
        imageIndex: null,
        relatedLabel: '',
        relatedGroup: '',
        relatedIndex: null,
      },
    ],
  },
] as const;

const glossaryTermCount = glossaryGroups.reduce((total, group) => total + group.terms.length, 0);
const defaultGlossaryExpansion = () => Array.from(
  { length: glossaryTermCount },
  (_, index) => index === 0,
);

const faqItems = [
  {
    question: 'How should I wash a glazed piece?',
    answer: 'Follow the care instructions supplied with the specific piece. Avoid assuming that every glaze, attachment, or finish has the same cleaning requirements.',
  },
  {
    question: 'Can it go in a dishwasher or microwave?',
    answer: 'Only when the individual product record explicitly says so. Construction, glaze, decoration, and attachments can change what is safe.',
  },
  {
    question: 'Where can I find material details?',
    answer: 'Clay body, glaze, firing, and food-contact information belong to the target product or care record.',
  },
] as const;

const defaultFaqExpansion = () => faqItems.map((_, index) => index === 0);

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

function CeramicMedia({ index, className = '', alt }: { index: number; className?: string; alt: string }) {
  return (
    <img
      className={`${className} docs-studio__ceramics-media docs-studio__ceramics-media--${((index - 1) % 6) + 1}`}
      src={editorialImage(index - 1)}
      alt={alt}
    />
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
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [expandedGlossaryItems, setExpandedGlossaryItems] = useState<boolean[]>(defaultGlossaryExpansion);
  const [expandedFaqItems, setExpandedFaqItems] = useState<boolean[]>(defaultFaqExpansion);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
    setExpandedGlossaryItems(defaultGlossaryExpansion());
    setExpandedFaqItems(defaultFaqExpansion());
  }, [baseline, contract.states]);

  function reset() {
    setValues({ ...baseline });
    setTokenOverrides({});
    setStateValue(contract.states[0]?.name ?? 'default');
    setUnit('cm');
    setExpandedGlossaryItems(defaultGlossaryExpansion());
    setExpandedFaqItems(defaultFaqExpansion());
    setName('');
    setEmail('');
    setRequest('');
    setReferenceName('');
    setFeedback('');
  }

  function submitCommission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submittedName = String(data.get('name') || '').trim();
    setFeedback(
      `Local preview ready for ${submittedName}. Nothing was submitted or uploaded.`,
    );
  }

  function renderMaterialLibrary() {
    return (
      <MaterialLibraryArtwork
        id={`materials-${uid}`}
        title={String(values.title || '')}
        subtitle={String(values.subtitle || '')}
        materials={values.materials === true ? buildMaterialLibraryFixture() : []}
      />
    );
  }

  function renderGlazeGuide() {
    const fixture = buildGlazeGuideFixture();
    return (
      <GlazeGuideArtwork
        id={`glazes-${uid}`}
        className="docs-studio__ceramics-glazes"
        title={String(values.title || '')}
        samples={values.swatches === true ? fixture.samples : []}
        detail={values.detail === true ? fixture.detail : undefined}
      />
    );
  }

  function renderTechnique() {
    return (
      <TechniqueExplainerArtwork
        id={`technique-${uid}`}
        className="docs-studio__ceramics-technique"
        title={String(values.title || '')}
        steps={values.steps === true ? buildTechniqueExplainerFixture() : []}
      />
    );
  }

  function renderCare() {
    const variant = values.variant === 'do' || values.variant === 'dont'
      ? values.variant
      : 'default';
    return (
      <CareInstructionsArtwork
        id="studio-care-instructions"
        title={String(values.title || '')}
        items={values.items === true ? buildCareInstructionsFixture() : []}
        variant={variant}
        className="docs-studio__ceramics-care"
      />
    );
  }

  function renderDimensions() {
    const measurements = buildDimensionsFixture(unit);
    return (
      <DimensionsArtwork
        id={`dimensions-${uid}`}
        className="docs-studio__ceramics-dimensions"
        visual={values.visual === true
          ? <DimensionsFixtureVisual measurements={measurements} />
          : undefined}
        measurements={values.measurements === true ? measurements : []}
        unitControls={values.unitControls === true
          ? (
            <SegmentedControlArtwork
              className="dimensions__unit-control"
              groupLabel="Display length in"
              name={`dimensions-unit-${uid}`}
              options={[
                { label: 'cm', value: 'cm' },
                { label: 'in', value: 'in' },
              ]}
              value={unit}
              onValueChange={(nextUnit) => setUnit(nextUnit as DimensionsFixtureUnit)}
            />
          )
          : undefined}
      />
    );
  }

  function renderFiringInfo() {
    const schedule = buildFiringScheduleFixture();
    const view = values.view === 'planned' || values.view === 'actual' || values.view === 'both'
      ? values.view
      : undefined;
    const displayUnit = values.displayUnit === 'fahrenheit' ? 'fahrenheit' : 'celsius';
    const actualStatus = values.actualStatus === 'collecting' ? 'collecting' : 'complete';
    return (
      <FiringScheduleArtwork
        id={`firing-schedule-${uid}`}
        className="docs-studio__ceramics-firing"
        title={String(values.title || '')}
        startingTemperatureCelsius={typeof values.startingTemperatureCelsius === 'number'
          ? values.startingTemperatureCelsius
          : schedule.startingTemperatureCelsius}
        segments={values.segments === true ? schedule.segments : []}
        actualSamples={values.actualSamples === true ? schedule.actualSamples : []}
        actualSummaries={values.actualSummaries === true ? schedule.actualSummaries : []}
        view={view}
        displayUnit={displayUnit}
        actualStatus={actualStatus}
      />
    );
  }

  function renderWorkshops() {
    return (
      <WorkshopListingArtwork
        id={`workshop-listing-${uid}`}
        className="docs-studio__ceramics-workshops"
        workshops={values.workshops === true ? buildWorkshopListingFixture() : []}
      />
    );
  }

  function renderCommissionForm() {
    const fixture = buildCommissionFormFixture();
    const rootId = `commission-form-${uid}`;
    const fields = values.fields === true
      ? (
        <>
          <InputArtwork
            id={`${rootId}-name`}
            label={fixture.nameLabel}
            name="name"
            value={name}
            placeholder={fixture.namePlaceholder}
            autoComplete="name"
            required
            message={fixture.nameMessage}
            onChange={(event) => setName(event.target.value)}
          />
          <InputArtwork
            id={`${rootId}-email`}
            label={fixture.emailLabel}
            name="email"
            type="email"
            value={email}
            placeholder={fixture.emailPlaceholder}
            autoComplete="email"
            required
            message={fixture.emailMessage}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextareaArtwork
            id={`${rootId}-request`}
            label={fixture.requestLabel}
            name="request"
            value={request}
            placeholder={fixture.requestPlaceholder}
            required
            minLines={5}
            message={fixture.requestMessage}
            onChange={(event) => setRequest(event.target.value)}
          />
        </>
      )
      : undefined;
    const referenceUpload = values.referenceUpload === true
      ? (
        <FileUploadArtwork
          id={`${rootId}-reference`}
          label={fixture.uploadLabel}
          hint={fixture.uploadHint}
          emptyStatus={fixture.uploadEmptyStatus}
          name="reference"
          accept={fixture.uploadAccept}
          selectedFileNames={referenceName}
          icon={<Upload className="file-upload__icon" aria-hidden="true" />}
          onChange={(event) => setReferenceName(
            event.target.files
              ? Array.from(event.target.files, (file) => file.name).join(', ')
              : '',
          )}
        />
      )
      : undefined;
    const actions = values.actions === true
      ? (
        <>
          <button className="btn" type="submit" name="intent" value="preview">
            {fixture.submitLabel}
          </button>
          <button className="btn btn--outline" type="reset">
            {fixture.resetLabel}
          </button>
        </>
      )
      : undefined;

    return (
      <CommissionFormArtwork
        id={rootId}
        className="docs-studio__ceramics-commission"
        title={String(values.title || '')}
        intro={String(values.intro || '')}
        fields={fields}
        referenceUpload={referenceUpload}
        actions={actions}
        result={values.actions === true && feedback
          ? <p className="docs-studio__ceramics-feedback" role="status">{feedback}</p>
          : undefined}
        onSubmit={submitCommission}
        onReset={() => {
          setName('');
          setEmail('');
          setRequest('');
          setReferenceName('');
          setFeedback('');
        }}
      />
    );
  }

  function renderMakersMark() {
    const fixture = buildMakersMarkFixture();
    return (
      <MakersMarkArtwork
        className="docs-studio__ceramics-makers-mark"
        artist={String(values.artist || '')}
        href={typeof values.href === 'string' ? values.href : fixture.href}
        studio={String(values.studio || '')}
        year={String(values.year || '')}
        stamp={values.stamp === true
          ? <MakersMarkFixtureStamp text={fixture.stampText} />
          : undefined}
      />
    );
  }

  function renderEditionBadge() {
    return (
      <div className="docs-studio__ceramics-edition-frame">
        <EditionBadgeArtwork
          variant={values.variant === 'limited' ? 'limited' : 'default'}
          label={String(values.label || '')}
          number={String(values.number || '')}
          total={String(values.total || '')}
        />
      </div>
    );
  }

  function renderGlossary() {
    const title = String(values.title || '');
    const intro = String(values.intro || '');
    return (
      <section
        className="ceramics-glossary docs-studio__ceramics-glossary"
        aria-labelledby={title ? `glossary-${uid}` : undefined}
      >
        {title && <h2 className="ceramics-glossary__title" id={`glossary-${uid}`}>{title}</h2>}
        {intro && <p className="ceramics-glossary__intro">{intro}</p>}
        {values.terms === true && glossaryGroups.map((group, groupIndex) => {
          const groupStart = glossaryGroups
            .slice(0, groupIndex)
            .reduce((total, previous) => total + previous.terms.length, 0);
          const groupId = `glossary-${uid}-${group.letter.toLowerCase()}`;
          return (
            <section
              className="ceramics-glossary__group"
              aria-labelledby={`${groupId}-heading`}
              key={group.letter}
            >
              <h3 className="ceramics-glossary__letter" id={`${groupId}-heading`}>
                {group.letter}
              </h3>
              <AccordionArtwork
                className="ceramics-glossary__terms"
                idPrefix={groupId}
                items={group.terms.map((item, itemIndex) => ({
                  key: item.term,
                  title: <dfn>{item.term}</dfn>,
                  className: 'glossary-term',
                  content: (
                    <>
                      <p>{item.definition}</p>
                      {item.imageIndex !== null && (
                        <CeramicMedia
                          className="glossary-term__image"
                          index={item.imageIndex}
                          alt="Bisque-fired stoneware before glaze application"
                        />
                      )}
                      {item.relatedLabel && item.relatedIndex !== null && (
                        <p className="glossary-term__related">
                          Related:{' '}
                          <a
                            className="link link--subtle glossary-term__related-link"
                            href={`#glossary-${uid}-${item.relatedGroup}-trigger-${item.relatedIndex}`}
                          >
                            {item.relatedLabel}
                          </a>
                        </p>
                      )}
                    </>
                  ),
                }))}
                expandedItems={expandedGlossaryItems.slice(groupStart, groupStart + group.terms.length)}
                onToggle={(itemIndex) => setExpandedGlossaryItems((current) => current.map(
                  (expanded, index) => index === groupStart + itemIndex ? !expanded : expanded,
                ))}
                headingLevel={4}
                regionPanels
              />
            </section>
          );
        })}
      </section>
    );
  }

  function renderStudioTour() {
    const heading = String(values.heading || '').trim();
    const steps = [
      {
        title: 'Materials area',
        description: 'Clay is weighed, wedged, and prepared for daily forms.',
        alt: 'Prepared clay and tableware arranged in the materials area',
        imageIndex: 4,
      },
      {
        title: 'Forming area',
        description: 'Wheel-thrown and hand-built pieces are shaped in natural light.',
        alt: 'A potter shaping a vessel at the wheel in the forming area',
        imageIndex: 5,
      },
      {
        title: 'Kiln room',
        description: 'Dried work is loaded in measured layers before each firing.',
        alt: 'Shelves of ceramic vessels beside the studio kiln room',
        imageIndex: 6,
      },
    ];

    if (!heading || values.steps !== true) return null;

    const headingId = `tour-${uid}`;
    return (
      <section
        className="process-timeline studio-tour docs-studio__ceramics-tour"
        aria-labelledby={headingId}
      >
        <header className="studio-tour__header">
          {String(values.eyebrow || '').trim() && (
            <p className="studio-tour__eyebrow">{String(values.eyebrow)}</p>
          )}
          <h2 className="process-timeline__title studio-tour__heading" id={headingId}>
            {heading}
          </h2>
          {String(values.intro || '').trim() && (
            <p className="studio-tour__intro">{String(values.intro)}</p>
          )}
        </header>
        <ol
          className="process-timeline__track"
          role="list"
          tabIndex={0}
          aria-labelledby={headingId}
        >
          {steps.map((step, index) => (
            <li className="process-step" key={step.title}>
              <span className="process-step__number" aria-hidden="true">{index + 1}</span>
              <div className="process-step__image">
                <CeramicMedia index={step.imageIndex} alt={step.alt} />
              </div>
              <h3 className="process-step__title">{step.title}</h3>
              <p className="process-step__description">{step.description}</p>
            </li>
          ))}
        </ol>
        {values.media === true && (
          <figure className="studio-tour__media">
            <CeramicMedia
              className="studio-tour__media-asset"
              index={7}
              alt="Natural light crossing the north workroom and display shelves"
            />
            <figcaption className="studio-tour__media-caption">
              The north workroom connects forming, drying, and final inspection.
            </figcaption>
          </figure>
        )}
      </section>
    );
  }

  function renderFaq() {
    const heading = String(values.heading || '').trim();
    const subheading = String(values.subheading || '').trim();
    if (values.items !== true) return null;

    const headingId = heading ? `faq-${uid}` : undefined;
    return (
      <section
        className="ceramics-faq docs-studio__ceramics-faq"
        aria-labelledby={headingId}
      >
        {(heading || subheading) && (
          <header className="ceramics-faq__header">
            {heading && <h2 className="ceramics-faq__heading" id={headingId}>{heading}</h2>}
            {subheading && <p className="ceramics-faq__subheading">{subheading}</p>}
          </header>
        )}
        <AccordionArtwork
          className="ceramics-faq__list"
          idPrefix={`ceramics-faq-${uid}`}
          items={faqItems.map((item) => ({
            key: item.question,
            title: item.question,
            className: 'ceramics-faq__item',
            content: <p>{item.answer}</p>,
          }))}
          expandedItems={expandedFaqItems}
          onToggle={(itemIndex) => setExpandedFaqItems((current) => current.map(
            (expanded, index) => index === itemIndex ? !expanded : expanded,
          ))}
          headingLevel={3}
          regionPanels
        />
        {values.contact === true && (
          <footer className="ceramics-faq__contact">
            <p className="ceramics-faq__contact-text">Need more care information?</p>
            <a
              className="link ceramics-faq__contact-link"
              href="/components/care-instructions"
            >
              Review the care instructions
            </a>
          </footer>
        )}
      </section>
    );
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
