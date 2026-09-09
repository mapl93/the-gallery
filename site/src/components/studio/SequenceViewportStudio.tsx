import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import StepsArtwork, { type StepsArtworkItem } from './StepsArtwork';

interface SequenceViewportStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };
const stepsFixture: StepsArtworkItem[] = [
  { id: 'details', title: 'Details', description: 'Artwork and contact', status: 'completed' },
  { id: 'shipping', title: 'Shipping', description: 'Delivery method', status: 'current' },
  { id: 'review', title: 'Review', description: 'Confirm order', status: 'upcoming' },
];
const slidesFixture = ['Celadon study', 'Ash glaze study', 'Porcelain study'];

function defaultValue(contract: ComponentContract, property: ContractProperty): StudioPropertyValue {
  if ('defaultValue' in property) return property.defaultValue ?? null;
  if (property.type === 'boolean' || property.type === 'slot') return false;
  if (property.type === 'number') return null;
  if (property.type === 'enum') {
    const source = property.valuesFrom === 'variants' ? contract.variants : contract.sizes;
    return source.find((option) => option.default)?.name ?? null;
  }
  return '';
}

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

function initialFixtureValues(contract: ComponentContract): StudioPropertyValues {
  const values = Object.fromEntries((contract.properties ?? []).map((property) => (
    [property.name, defaultValue(contract, property)]
  ))) as StudioPropertyValues;
  if (contract.slug === 'carousel') {
    values.current = true;
    values.disabled = true;
  }
  if (contract.slug === 'scroll-area') values.label = 'Artwork notes';
  return values;
}

export default function SequenceViewportStudio({ contract, definition }: SequenceViewportStudioProps) {
  const initialValues = useMemo(() => initialFixtureValues(contract), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [slideIndex, setSlideIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const carouselFrameRef = useRef<number | null>(null);
  const previousRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const carouselTrackId = useId();

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

  useEffect(() => () => {
    if (carouselFrameRef.current !== null) cancelAnimationFrame(carouselFrameRef.current);
  }, []);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };

  function reset() {
    if (contract.slug === 'carousel') selectSlide(0, true);
    setValues({ ...initialValues });
    setSlideIndex(0);
    setTokenOverrides({});
  }

  function renderSteps() {
    const orientation: 'horizontal' | 'vertical' = values.orientation === 'vertical' ? 'vertical' : 'horizontal';
    return (
      <StepsArtwork
        className="docs-studio__preview-steps"
        label="Order progress"
        orientation={orientation}
        items={stepsFixture}
      />
    );
  }

  function updateSlide(next: number) {
    if ((next === 0 && document.activeElement === previousRef.current)
      || (next === slidesFixture.length - 1 && document.activeElement === nextRef.current)) {
      trackRef.current?.focus({ preventScroll: true });
    }
    setSlideIndex(next);
    setValues((current) => ({ ...current, current: next === 0, disabled: next === 0 }));
  }

  function selectSlide(next: number, instant = false) {
    const normalized = Math.max(0, Math.min(slidesFixture.length - 1, next));
    updateSlide(normalized);
    slideRefs.current[normalized]?.scrollIntoView({
      block: 'nearest',
      inline: 'start',
      behavior: instant ? 'instant' : matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }

  function syncCarouselFromScroll() {
    if (carouselFrameRef.current !== null) return;
    carouselFrameRef.current = requestAnimationFrame(() => {
      carouselFrameRef.current = null;
      const track = trackRef.current;
      if (!track) return;
      const rtl = getComputedStyle(track).direction === 'rtl';
      const trackEdge = rtl ? track.getBoundingClientRect().right : track.getBoundingClientRect().left;
      const next = slideRefs.current.reduce((closest, slide, index) => {
        if (!slide) return closest;
        const rect = slide.getBoundingClientRect();
        const distance = Math.abs((rtl ? rect.right : rect.left) - trackEdge);
        return distance < closest.distance ? { index, distance } : closest;
      }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;
      if (next !== slideIndex) {
        updateSlide(next);
      }
    });
  }

  function renderCarousel() {
    return (
      <div className="carousel docs-studio__preview-carousel" role="region" aria-roledescription="carousel" aria-label="Artwork studies">
        <div className="carousel__track" id={carouselTrackId} ref={trackRef} tabIndex={0} aria-label="Artwork slides" onScroll={syncCarouselFromScroll}>
          {slidesFixture.map((label, index) => (
            <article
              className={`carousel__slide docs-studio__carousel-slide docs-studio__carousel-slide--${index + 1}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slidesFixture.length}: ${label}`}
              key={label}
              ref={(element) => { slideRefs.current[index] = element; }}
            >
              <span>{label}</span>
            </article>
          ))}
        </div>
        <div className="carousel__nav carousel__nav--prev">
          <button ref={previousRef} className="icon-btn icon-btn--round carousel__nav-btn" type="button" aria-label="Previous slide" aria-controls={carouselTrackId} disabled={values.disabled === true || slideIndex === 0} onClick={() => selectSlide(slideIndex - 1)}>
            <ArrowLeft className="icon-btn__icon" aria-hidden="true" />
          </button>
        </div>
        <div className="carousel__nav carousel__nav--next">
          <button ref={nextRef} className="icon-btn icon-btn--round carousel__nav-btn" type="button" aria-label="Next slide" aria-controls={carouselTrackId} disabled={slideIndex === slidesFixture.length - 1} onClick={() => selectSlide(slideIndex + 1)}>
            <ArrowRight className="icon-btn__icon" aria-hidden="true" />
          </button>
        </div>
        <div className="carousel__dots" aria-label="Choose slide">
          {slidesFixture.map((label, index) => (
            <button
              className={`carousel__dot${slideIndex === index ? ' carousel__dot--active' : ''}`}
              type="button"
              aria-label={`Go to ${label}`}
              aria-controls={carouselTrackId}
              aria-current={slideIndex === index ? 'true' : undefined}
              key={label}
              onClick={() => selectSlide(index)}
            />
          ))}
        </div>
        <p className="carousel__status visually-hidden" role="status" aria-live="polite" aria-atomic="true">
          {`${slideIndex + 1} of ${slidesFixture.length}: ${slidesFixture[slideIndex]}`}
        </p>
      </div>
    );
  }

  function renderScrollArea() {
    const label = String(values.label || '').trim();
    return (
      <div className="scroll-area docs-studio__preview-scroll-area" role={label ? 'region' : undefined} tabIndex={label ? 0 : undefined} aria-label={label || undefined}>
        <h3>Artwork notes</h3>
        {Array.from({ length: 7 }, (_, index) => (
          <p key={index}>Study {index + 1}. Glaze density, firing atmosphere, and surface response.</p>
        ))}
      </div>
    );
  }

  const activeTokens: Record<string, string | null> = contract.slug === 'steps'
    ? {
        connector: '--color-border-subtle',
        active: '--color-button-primary-bg-default',
        'active-text': '--color-button-primary-text-default',
        'indicator-surface': '--color-surface-secondary',
        secondary: '--color-text-secondary',
        text: '--color-text-primary',
        radius: '--radius-full',
        'body-small': '--typo-body-sm-size',
        caption: '--typo-caption-size',
        spacing: '--space-layout-element-gap',
      }
    : contract.slug === 'carousel'
      ? {
          surface: '--color-surface-primary',
          hover: '--color-surface-secondary',
          border: '--color-border-subtle',
          focus: '--color-border-focus',
          text: '--color-text-primary',
          spacing: '--space-layout-element-gap',
          'touch-target': '--space-layout-touch-target',
          radius: '--radius-full',
          shadow: '--shadow-md',
          'disabled-opacity': '--opacity-disabled',
          transition: '--transition-fast',
          easing: '--easing-default',
        }
      : {
          thumb: '--color-border-subtle',
          'thumb-hover': '--color-border-default',
          focus: '--color-border-focus',
          radius: '--radius-full',
        };

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
          onPropertiesChange={(next) => {
            setValues((current) => ({ ...current, ...next }));
            if (contract.slug === 'carousel' && 'current' in next) {
              selectSlide(next.current === true ? 0 : slideIndex === 0 ? 1 : slideIndex);
            }
          }}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />
        <section className="docs-studio__stage" aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}>
          <div className="docs-studio__stage-inner">
            {contract.slug === 'steps' ? renderSteps() : contract.slug === 'carousel' ? renderCarousel() : renderScrollArea()}
          </div>
        </section>
      </div>
    </div>
  );
}
