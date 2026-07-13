import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface SequenceViewportStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };
const stepsFixture = ['Details', 'Shipping', 'Review'];
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

function variantClass(contract: ComponentContract, value: StudioPropertyValue): string | null {
  return contract.variants.find((variant) => variant.name === value)?.className?.replace(/^\./, '') ?? null;
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
    if (contract.slug !== 'carousel') return;
    setSlideIndex(values.current === true ? 0 : 1);
  }, [contract.slug, values.current]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };

  function reset() {
    setValues({ ...initialValues });
    setSlideIndex(0);
    setTokenOverrides({});
  }

  function renderSteps() {
    const orientation: 'horizontal' | 'vertical' = values.orientation === 'vertical' ? 'vertical' : 'horizontal';
    const classes = ['steps', variantClass(contract, orientation), 'docs-studio__preview-steps'].filter(Boolean).join(' ');
    return (
      <ol className={classes} aria-label="Order progress" aria-orientation={orientation}>
        {stepsFixture.map((label, index) => {
          const stateClass = index === 0 ? 'steps__item--completed' : index === 1 ? 'steps__item--active' : '';
          return (
            <li className={`steps__item ${stateClass}`.trim()} aria-current={index === 1 ? 'step' : undefined} key={label}>
              <span className="steps__indicator">{index === 0 ? <Check aria-hidden="true" /> : index + 1}</span>
              <span className="steps__title">{label}</span>
            </li>
          );
        })}
      </ol>
    );
  }

  function selectSlide(next: number) {
    const normalized = Math.max(0, Math.min(slidesFixture.length - 1, next));
    setSlideIndex(normalized);
    setValues((current) => ({ ...current, current: normalized === 0, disabled: normalized === 0 }));
    const track = trackRef.current;
    if (track) track.scrollTo({ left: normalized * track.clientWidth, behavior: 'smooth' });
  }

  function carouselKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') selectSlide(slideIndex - 1);
    else if (event.key === 'ArrowRight') selectSlide(slideIndex + 1);
    else return;
    event.preventDefault();
  }

  function renderCarousel() {
    return (
      <div className="carousel docs-studio__preview-carousel" aria-label="Artwork studies" onKeyDown={carouselKeyDown}>
        <div className="carousel__track" ref={trackRef} tabIndex={0}>
          {slidesFixture.map((label, index) => (
            <article className={`carousel__slide docs-studio__carousel-slide docs-studio__carousel-slide--${index + 1}`} aria-label={`${index + 1} of ${slidesFixture.length}: ${label}`} key={label}>
              <span>{label}</span>
            </article>
          ))}
        </div>
        <div className="carousel__nav carousel__nav--prev">
          <button className="carousel__nav-btn" type="button" aria-label="Previous slide" disabled={values.disabled === true || slideIndex === 0} onClick={() => selectSlide(slideIndex - 1)}>
            <ArrowLeft aria-hidden="true" />
          </button>
        </div>
        <div className="carousel__nav carousel__nav--next">
          <button className="carousel__nav-btn" type="button" aria-label="Next slide" disabled={slideIndex === slidesFixture.length - 1} onClick={() => selectSlide(slideIndex + 1)}>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
        <div className="carousel__dots" aria-label="Choose slide">
          {slidesFixture.map((label, index) => (
            <button
              className={`carousel__dot${slideIndex === index ? ' carousel__dot--active' : ''}`}
              type="button"
              aria-label={`Go to ${label}`}
              aria-current={slideIndex === index ? 'true' : undefined}
              key={label}
              onClick={() => selectSlide(index)}
            />
          ))}
        </div>
      </div>
    );
  }

  function renderScrollArea() {
    return (
      <div className="scroll-area docs-studio__preview-scroll-area" tabIndex={0} aria-label={String(values.label || '')}>
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
      }
    : contract.slug === 'carousel'
      ? {
          surface: '--color-surface-primary',
          hover: '--color-surface-secondary',
          border: '--color-border-subtle',
          text: '--color-text-primary',
          spacing: '--space-layout-element-gap',
          radius: '--radius-full',
          shadow: '--shadow-md',
          'disabled-opacity': '--opacity-disabled',
        }
      : {
          thumb: '--color-border-subtle',
          'thumb-hover': '--color-border-default',
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
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
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
