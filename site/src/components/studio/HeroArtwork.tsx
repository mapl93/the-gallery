import { useId, type CSSProperties } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { editorialMedia } from './editorialMedia';

type HeroLayout = 'full' | 'split' | 'text-only';
type HeroHeight = 'default' | 'fullscreen';
type HeroMediaBehavior = 'none' | 'parallax' | 'slideshow';
type HeroNavigation = 'both' | 'arrows' | 'indicators';

interface HeroArtworkProps {
  label?: string;
  title: string;
  description?: string;
  layout?: HeroLayout;
  height?: HeroHeight;
  mediaBehavior?: HeroMediaBehavior;
  media?: boolean;
  overlay?: boolean;
  actions?: boolean;
  slides?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  navigation?: HeroNavigation;
  autoplayInterval?: number;
  previousLabel?: string;
  nextLabel?: string;
  pauseLabel?: string;
  playLabel?: string;
  statusTemplate?: string;
  className?: string;
}

const heroSlides = [
  { src: editorialMedia.tableware, alt: '' },
  { src: editorialMedia.pastelTableware, alt: '' },
  { src: editorialMedia.texturedVase, alt: '' },
] as const;

export default function HeroArtwork({
  label = '',
  title,
  description = '',
  layout = 'full',
  height = 'default',
  mediaBehavior = 'none',
  media = true,
  overlay = true,
  actions = true,
  slides = true,
  autoplay = false,
  loop = true,
  navigation = 'both',
  autoplayInterval = 6000,
  previousLabel = 'Previous slide',
  nextLabel = 'Next slide',
  pauseLabel = 'Pause slideshow',
  playLabel = 'Play slideshow',
  statusTemplate = 'Slide {current} of {total}',
  className = '',
}: HeroArtworkProps) {
  const uid = useId().replace(/:/g, '');
  const normalizedTitle = title.trim();
  if (!normalizedTitle) return null;

  const hasMedia = media && layout !== 'text-only';
  const isSlideshow = hasMedia && slides && mediaBehavior === 'slideshow';
  const effectiveBehavior = isSlideshow
    ? 'slideshow'
    : hasMedia && mediaBehavior === 'parallax' ? 'parallax' : 'none';
  const interval = Math.min(12000, Math.max(3000, Number(autoplayInterval) || 6000));
  const titleId = `hero-title-${uid}`;
  const trackId = `hero-track-${uid}`;
  const runtimeKey = [layout, height, effectiveBehavior, autoplay, loop, navigation, interval].join(':');
  const classes = [
    'hero',
    isSlideshow ? 'carousel' : '',
    layout === 'split' ? 'hero--split' : '',
    layout === 'text-only' ? 'hero--text-only' : '',
    height === 'fullscreen' ? 'hero--fullscreen' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <section
      key={runtimeKey}
      className={classes}
      aria-labelledby={titleId}
      aria-roledescription={isSlideshow ? 'carousel' : undefined}
      data-hero
      data-media-behavior={effectiveBehavior}
      data-autoplay={String(isSlideshow && autoplay)}
      data-loop={String(loop)}
      data-navigation={navigation}
      data-autoplay-interval={interval}
      style={{ '--_hero-interval': `${interval}ms` } as CSSProperties}
    >
      <div className="hero__inner">
        {hasMedia && (
          <div className="hero__media">
            {isSlideshow ? (
              <div className="hero__track carousel__track" id={trackId} tabIndex={0} aria-label="Hero slides">
                {heroSlides.map((slide, index) => (
                  <div
                    className="hero__slide carousel__slide"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={statusTemplate.replace('{current}', String(index + 1)).replace('{total}', String(heroSlides.length))}
                    aria-current={index === 0 ? 'true' : undefined}
                    key={slide.src}
                  >
                    <img src={slide.src} alt={slide.alt} />
                  </div>
                ))}
              </div>
            ) : (
              <img className="hero__media-item" src={editorialMedia.tableware} alt="" />
            )}
            {overlay && <div className="hero__overlay" aria-hidden="true" />}
          </div>
        )}

        <div className="hero__content">
          {label.trim() && <p className="hero__label" dir="auto">{label}</p>}
          <h2 className="hero__title" id={titleId} dir="auto">{normalizedTitle}</h2>
          {description.trim() && <p className="hero__description" dir="auto">{description}</p>}
          {actions && (
            <div className="hero__actions">
              <a className="btn" href="/components/gallery-grid">View collection</a>
              <a className="btn btn--secondary" href="/components/brand-story">Read the story</a>
            </div>
          )}
        </div>
      </div>

      {isSlideshow && (
        <div className="hero__controls" aria-label="Hero slideshow controls">
          {(navigation === 'both' || navigation === 'arrows') && (
            <>
              <button className="icon-btn icon-btn--round carousel__nav-btn hero__previous" type="button" aria-label={previousLabel} aria-controls={trackId}>
                <ChevronLeft className="icon-btn__icon" aria-hidden="true" />
              </button>
              <button className="icon-btn icon-btn--round carousel__nav-btn hero__next" type="button" aria-label={nextLabel} aria-controls={trackId}>
                <ChevronRight className="icon-btn__icon" aria-hidden="true" />
              </button>
            </>
          )}
          {(navigation === 'both' || navigation === 'indicators') && (
            <div className="hero__indicators carousel__dots" aria-label="Choose slide">
              {heroSlides.map((slide, index) => (
                <button
                  className={`hero__indicator carousel__dot${index === 0 ? ' carousel__dot--active' : ''}`}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-controls={trackId}
                  aria-current={index === 0 ? 'true' : undefined}
                  key={slide.src}
                />
              ))}
            </div>
          )}
          {autoplay && (
            <button
              className="icon-btn icon-btn--round carousel__nav-btn hero__rotation-control"
              type="button"
              aria-label={pauseLabel}
              aria-pressed="false"
              data-pause-label={pauseLabel}
              data-play-label={playLabel}
            >
              <span className="hero__pause-icon"><Pause className="icon-btn__icon" aria-hidden="true" /></span>
              <span className="hero__play-icon" hidden><Play className="icon-btn__icon" aria-hidden="true" /></span>
            </button>
          )}
        </div>
      )}

      {isSlideshow && autoplay && (
        <div className="hero__progress" aria-hidden="true">
          <span className="hero__progress-value" />
        </div>
      )}
      {isSlideshow && (
        <p className="hero__status carousel__status visually-hidden" role="status" aria-live="polite" aria-atomic="true" data-status-template={statusTemplate}>
          {statusTemplate.replace('{current}', '1').replace('{total}', String(heroSlides.length))}
        </p>
      )}
    </section>
  );
}
