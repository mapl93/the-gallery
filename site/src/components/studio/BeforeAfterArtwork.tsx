import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from 'react';
import { editorialMedia } from './editorialMedia';

interface BeforeAfterArtworkProps {
  label: string;
  beforeMedia: ReactNode;
  afterMedia: ReactNode;
  description?: string;
  beforeLabel?: string;
  afterLabel?: string;
  value?: number;
  disabled?: boolean;
  name?: string;
  className?: string;
}

const beforeAfterFixtureMedia = {
  before: (
    <img
      className="before-after__image before-after__fixture-media before-after__fixture-media--before"
      src={editorialMedia.texturedVase}
      alt="Textured ceramic vessel in the original neutral color treatment"
      draggable="false"
    />
  ),
  after: (
    <img
      className="before-after__image before-after__fixture-media before-after__fixture-media--after"
      src={editorialMedia.texturedVase}
      alt="The same textured ceramic vessel with the warm color treatment applied"
      draggable="false"
    />
  ),
} as const;

function percentage(value: number | undefined) {
  if (!Number.isFinite(value)) return 50;
  return Math.min(100, Math.max(0, Math.round(Number(value))));
}

export default function BeforeAfterArtwork({
  label,
  beforeMedia,
  afterMedia,
  description = '',
  beforeLabel = '',
  afterLabel = '',
  value = 50,
  disabled = false,
  name = '',
  className = '',
}: BeforeAfterArtworkProps) {
  const rootRef = useRef<HTMLElement>(null);
  const uid = useId().replace(/:/g, '');
  const normalizedLabel = label.trim();
  const normalizedDescription = description.trim();
  const normalizedBeforeLabel = beforeLabel.trim();
  const normalizedAfterLabel = afterLabel.trim();
  const normalizedName = name.trim();
  const normalizedValue = percentage(value);
  const inputId = `before-after-control-${uid}`;
  const descriptionId = `before-after-description-${uid}`;
  const runtimeKey = [
    normalizedLabel,
    normalizedDescription,
    normalizedBeforeLabel,
    normalizedAfterLabel,
    normalizedValue,
    disabled,
    normalizedName,
    Boolean(beforeMedia),
    Boolean(afterMedia),
  ].join(':');

  useEffect(() => {
    if (rootRef.current) window.TheGallery?.enhanceSliders(rootRef.current);
  }, [runtimeKey]);

  if (!normalizedLabel || beforeMedia == null || afterMedia == null) return null;

  const progressStyle = {
    '--_slider-progress': `${normalizedValue}%`,
  } as CSSProperties;

  return (
    <figure
      key={runtimeKey}
      ref={(node) => { rootRef.current = node; }}
      className={['before-after', 'slider', className].filter(Boolean).join(' ')}
      style={progressStyle}
    >
      <div className="before-after__stage slider__track">
        <div className="before-after__media-frame">
          {beforeMedia}
          {normalizedBeforeLabel && (
            <span className="before-after__label before-after__label--before" dir="auto">
              {normalizedBeforeLabel}
            </span>
          )}
          <div className="before-after__overlay">
            {afterMedia}
            {normalizedAfterLabel && (
              <span className="before-after__label before-after__label--after" dir="auto">
                {normalizedAfterLabel}
              </span>
            )}
          </div>
        </div>
        <div className="before-after__divider" aria-hidden="true" />
        <input
          className="before-after__input slider__input"
          id={inputId}
          name={normalizedName || undefined}
          type="range"
          min="0"
          max="100"
          step="1"
          defaultValue={normalizedValue}
          disabled={disabled}
          aria-describedby={normalizedDescription ? descriptionId : undefined}
        />
      </div>
      <label className="before-after__control-label visually-hidden" htmlFor={inputId}>
        {normalizedLabel}
      </label>
      {normalizedDescription && (
        <figcaption className="before-after__description" id={descriptionId} dir="auto">
          {normalizedDescription}
        </figcaption>
      )}
    </figure>
  );
}

export { beforeAfterFixtureMedia };
