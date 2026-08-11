import { useEffect, useId, useMemo, useRef, type ReactNode } from 'react';

export type MarqueePresentation = 'auto' | 'static';
export type MarqueeDirection = 'forward' | 'reverse';
export type MarqueePace = 'slow' | 'default' | 'fast';

export interface MarqueeArtworkItem {
  key: string;
  content: ReactNode;
  ariaHidden?: boolean;
}

interface MarqueePartClassNames {
  label?: string;
  viewport?: string;
  track?: string;
  group?: string;
  item?: string;
  control?: string;
}

interface MarqueeArtworkProps {
  items: readonly MarqueeArtworkItem[];
  label?: string;
  presentation?: MarqueePresentation;
  direction?: MarqueeDirection;
  pace?: MarqueePace;
  pauseLabel: string;
  resumeLabel: string;
  className?: string;
  partClassNames?: MarqueePartClassNames;
  labelAs?: 'p' | 'h2' | 'h3';
}

const marqueeFixtureItems: readonly MarqueeArtworkItem[] = [
  { key: 'handmade', content: 'Made by hand' },
  { key: 'materials', content: 'Natural materials' },
  { key: 'small-batch', content: 'Small batches' },
  { key: 'useful', content: 'Made to be used' },
  { key: 'local', content: 'Crafted in Buenos Aires' },
  { key: 'care', content: 'Packed with care' },
] as const;

function part(base: string, additional = '') {
  return [base, additional].filter(Boolean).join(' ');
}

export default function MarqueeArtwork({
  items,
  label = '',
  presentation = 'auto',
  direction = 'forward',
  pace = 'default',
  pauseLabel,
  resumeLabel,
  className = '',
  partClassNames = {},
  labelAs = 'p',
}: MarqueeArtworkProps) {
  const rootRef = useRef<HTMLElement>(null);
  const uid = useId().replace(/:/g, '');
  const normalizedLabel = label.trim();
  const normalizedPauseLabel = pauseLabel.trim();
  const normalizedResumeLabel = resumeLabel.trim();
  const validItems = useMemo(() => items.filter((item) => item.key.trim() && item.content != null), [items]);
  const labelId = `marquee-label-${uid}`;
  const runtimeKey = [
    presentation,
    direction,
    pace,
    normalizedLabel,
    normalizedPauseLabel,
    normalizedResumeLabel,
    labelAs,
    validItems.map((item) => item.key).join('|'),
  ].join(':');

  useEffect(() => {
    if (rootRef.current) window.TheGallery?.enhanceMarquees(rootRef.current);
  }, [runtimeKey]);

  const motionLabelsValid = presentation === 'static'
    || (normalizedPauseLabel && normalizedResumeLabel);
  if (validItems.length === 0 || !motionLabelsValid) return null;

  const Root = normalizedLabel ? 'section' : 'div';
  const Label = labelAs;
  const classes = [
    'marquee',
    presentation === 'static' ? 'marquee--static' : 'marquee--auto',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Root
      key={runtimeKey}
      ref={(node) => { rootRef.current = node; }}
      className={classes}
      aria-labelledby={normalizedLabel ? labelId : undefined}
      data-marquee=""
      data-presentation={presentation}
      data-direction={direction}
      data-pace={pace}
      data-marquee-state={presentation === 'static' ? 'static' : 'pending'}
    >
      {normalizedLabel && (
        <Label className={part('marquee__label', partClassNames.label)} id={labelId} dir="auto">
          {normalizedLabel}
        </Label>
      )}
      <div className={part('marquee__viewport', partClassNames.viewport)}>
        <div className={part('marquee__track', partClassNames.track)}>
          <ul className={part('marquee__group marquee__group--source', partClassNames.group)}>
            {validItems.map((item) => (
              <li
                className={part('marquee__item', partClassNames.item)}
                dir={typeof item.content === 'string' ? 'auto' : undefined}
                aria-hidden={item.ariaHidden || undefined}
                key={item.key}
              >
                {item.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {presentation === 'auto' && (
        <button
          className={part('btn btn--outline btn--sm marquee__control', partClassNames.control)}
          type="button"
          data-pause-label={normalizedPauseLabel}
          data-resume-label={normalizedResumeLabel}
          aria-label={normalizedPauseLabel}
          hidden
        >
          {normalizedPauseLabel}
        </button>
      )}
    </Root>
  );
}

export { marqueeFixtureItems };
