import { useEffect, useId, useRef, type MouseEvent } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react';
import CountdownArtwork from './CountdownArtwork';

export type AnnouncementMode = 'static' | 'countdown' | 'rotating';

interface AnnouncementArtworkProps {
  mode?: AnnouncementMode;
  label?: string;
  message?: boolean;
  countdown?: boolean;
  messages?: boolean;
  visible?: boolean;
  dismissible?: boolean;
  dismissLabel: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  previousLabel: string;
  nextLabel: string;
  pauseLabel: string;
  playLabel: string;
  counterTemplate: string;
  statusTemplate: string;
  onDismissRequest?: () => void;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

const rotatingMessages = [
  'Complimentary shipping on selected works.',
  'Private studio visits available this month.',
  'New ceramic studies are now in the collection.',
] as const;

function format(template: string, current: number, total: number) {
  return template
    .replace('{current}', String(current))
    .replace('{total}', String(total));
}

export default function AnnouncementArtwork({
  mode = 'static',
  label = '',
  message = true,
  countdown = true,
  messages = true,
  visible = true,
  dismissible = false,
  dismissLabel,
  autoplay = false,
  autoplayInterval = 6000,
  previousLabel,
  nextLabel,
  pauseLabel,
  playLabel,
  counterTemplate,
  statusTemplate,
  onDismissRequest,
  onNavigate,
  className = '',
}: AnnouncementArtworkProps) {
  const rootRef = useRef<HTMLElement>(null);
  const uid = useId().replace(/:/g, '');
  const normalizedLabel = label.trim();
  const interval = Math.min(12000, Math.max(3000, Number(autoplayInterval) || 6000));
  const rotating = mode === 'rotating';
  const effectiveAutoplay = rotating && autoplay;
  const trackId = `announcement-track-${uid}`;
  const runtimeKey = [mode, effectiveAutoplay, interval, messages].join(':');

  useEffect(() => {
    if (rootRef.current) window.TheGallery?.enhanceAnnouncements(rootRef.current);
  }, [runtimeKey]);

  if (!visible) return null;
  if (mode === 'static' && !message) return null;
  if (mode === 'countdown' && !countdown) return null;
  if (rotating && (!messages || !normalizedLabel)) return null;

  const classes = [
    'announcement',
    mode === 'countdown' ? 'announcement--countdown' : '',
    rotating ? 'announcement--rotating' : '',
    dismissible ? 'announcement--dismissible' : '',
    className,
  ].filter(Boolean).join(' ');
  const Root = normalizedLabel ? 'section' : 'div';

  function dismiss() {
    rootRef.current?.dispatchEvent(new CustomEvent('announcementdismissrequest', {
      bubbles: true,
    }));
    onDismissRequest?.();
  }

  return (
    <Root
      key={runtimeKey}
      ref={(node) => { rootRef.current = node; }}
      className={classes}
      aria-label={normalizedLabel || undefined}
      aria-roledescription={rotating ? 'carousel' : undefined}
      data-announcement={rotating ? '' : undefined}
      data-autoplay={String(effectiveAutoplay)}
      data-autoplay-interval={interval}
    >
      <div className="announcement__body">
        {mode === 'static' && (
          <p className="announcement__message" dir="auto">
            Complimentary shipping on selected works.{' '}
            <a className="announcement__link" href="#shipping" onClick={onNavigate}>View details</a>
          </p>
        )}

        {mode === 'countdown' && (
          <div className="announcement__countdown">
            <CountdownArtwork
              className="countdown--inline"
              deadline="2027-01-01T00:00:00-03:00"
              units="days-hours-minutes-seconds"
              fallbackText="Offer ends January 1, 2027"
            />
          </div>
        )}

        {rotating && (
          <div className="announcement__rotation carousel">
            <div className="announcement__track carousel__track" id={trackId} tabIndex={0} aria-label={normalizedLabel}>
              {rotatingMessages.map((item, index) => (
                <div
                  className="announcement__slide carousel__slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={format(statusTemplate, index + 1, rotatingMessages.length)}
                  aria-current={index === 0 ? 'true' : undefined}
                  key={item}
                  dir="auto"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="announcement__controls" aria-label={`${normalizedLabel} controls`}>
              <button className="icon-btn icon-btn--sm icon-btn--round carousel__nav-btn announcement__previous" type="button" aria-label={previousLabel} aria-controls={trackId}>
                <ChevronLeft className="icon-btn__icon" aria-hidden="true" />
              </button>
              <span className="announcement__counter" aria-hidden="true" data-counter-template={counterTemplate}>
                {format(counterTemplate, 1, rotatingMessages.length)}
              </span>
              <button className="icon-btn icon-btn--sm icon-btn--round carousel__nav-btn announcement__next" type="button" aria-label={nextLabel} aria-controls={trackId}>
                <ChevronRight className="icon-btn__icon" aria-hidden="true" />
              </button>
              {effectiveAutoplay && (
                <button
                  className="icon-btn icon-btn--sm icon-btn--round carousel__nav-btn announcement__rotation-control"
                  type="button"
                  aria-label={pauseLabel}
                  aria-pressed="false"
                  data-pause-label={pauseLabel}
                  data-play-label={playLabel}
                >
                  <span className="announcement__pause-icon"><Pause className="icon-btn__icon" aria-hidden="true" /></span>
                  <span className="announcement__play-icon" hidden><Play className="icon-btn__icon" aria-hidden="true" /></span>
                </button>
              )}
            </div>
            <p
              className="announcement__status carousel__status visually-hidden"
              role="status"
              aria-live={effectiveAutoplay ? 'off' : 'polite'}
              aria-atomic="true"
              data-status-template={statusTemplate}
            >
              {format(statusTemplate, 1, rotatingMessages.length)}
            </p>
          </div>
        )}

        {dismissible && (
          <button className="close-btn announcement__dismiss" type="button" aria-label={dismissLabel} onClick={dismiss}>
            <X className="close-btn__icon" aria-hidden="true" />
          </button>
        )}
      </div>
    </Root>
  );
}
