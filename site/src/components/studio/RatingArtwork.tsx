export type RatingArtworkSize = 'default' | 'lg';

interface RatingArtworkProps {
  ratingValue: number;
  accessibleLabel: string;
  reviewCount?: string;
  size?: RatingArtworkSize;
  className?: string;
}

export function isCanonicalRatingValue(value: number): boolean {
  return Number.isFinite(value)
    && value >= 0
    && value <= 5
    && Math.abs((value * 2) - Math.round(value * 2)) < Number.EPSILON * 8;
}

export default function RatingArtwork({
  ratingValue,
  accessibleLabel,
  reviewCount = '',
  size = 'default',
  className = '',
}: RatingArtworkProps) {
  const label = accessibleLabel.trim();
  const count = reviewCount.trim();

  if (!label || !isCanonicalRatingValue(ratingValue) || !['default', 'lg'].includes(size)) {
    return null;
  }

  const states = [1, 2, 3, 4, 5].map((position) => (
    ratingValue >= position ? 'filled' : ratingValue >= position - 0.5 ? 'half' : 'empty'
  ));

  return (
    <span
      className={[
        'rating',
        size === 'lg' ? 'rating--lg' : null,
        className,
      ].filter(Boolean).join(' ')}
      data-rating={ratingValue}
    >
      <span className="rating__stars" role="img" aria-label={label}>
        {states.map((state, index) => (
          <span
            aria-hidden="true"
            className={`rating__star${state === 'empty' ? '' : ` rating__star--${state}`}`}
            key={`${state}-${index}`}
          >
            {state === 'filled' ? '\u2605' : '\u2606'}
          </span>
        ))}
      </span>
      {count && <span className="rating__count" dir="auto">{count}</span>}
    </span>
  );
}
