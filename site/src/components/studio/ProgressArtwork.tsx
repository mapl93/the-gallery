export type ProgressArtworkVariant = 'bar' | 'circle';

interface ProgressArtworkProps {
  accessibleLabel: string;
  label?: string;
  variant?: ProgressArtworkVariant;
  value?: number;
  min?: number;
  max?: number;
  displayValue?: string;
  valueText?: string;
  indeterminate?: boolean;
  className?: string;
}

function isFiniteNumber(value: number | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export default function ProgressArtwork({
  accessibleLabel,
  label = '',
  variant = 'bar',
  value,
  min = 0,
  max = 100,
  displayValue = '',
  valueText = '',
  indeterminate = false,
  className = '',
}: ProgressArtworkProps) {
  const resolvedLabel = accessibleLabel.trim();
  const visibleLabel = label.trim();
  const visibleValue = displayValue.trim();
  const accessibleValue = valueText.trim();

  if (
    !resolvedLabel
    || !isFiniteNumber(min)
    || !isFiniteNumber(max)
    || max <= min
    || (variant === 'circle' && indeterminate)
    || (!indeterminate && !isFiniteNumber(value))
  ) {
    return null;
  }

  const current = isFiniteNumber(value)
    ? Math.min(max, Math.max(min, value))
    : min;
  const resolvedMin = min;
  const resolvedMax = max;
  const percent = ((current - resolvedMin) / (resolvedMax - resolvedMin)) * 100;
  const circle = variant === 'circle';
  const common = {
    role: 'progressbar',
    'aria-label': resolvedLabel,
    'aria-valuemin': resolvedMin,
    'aria-valuemax': resolvedMax,
    'aria-valuenow': indeterminate ? undefined : current,
    'aria-valuetext': indeterminate ? undefined : accessibleValue || undefined,
  } as const;

  if (circle) {
    return (
      <div className={['progress-circle', className].filter(Boolean).join(' ')} {...common}>
        <svg aria-hidden="true">
          <circle className="progress-circle__bg" cx="50%" cy="50%" pathLength="100" />
          <circle className="progress-circle__fill" cx="50%" cy="50%" pathLength="100" strokeDasharray={`${percent} ${100 - percent}`} style={percent === 0 ? { visibility: 'hidden' } : undefined} />
        </svg>
        {visibleValue && <span className="progress-circle__text">{visibleValue}</span>}
      </div>
    );
  }

  return (
    <div
      className={['progress', className, indeterminate ? 'progress--indeterminate' : null].filter(Boolean).join(' ')}
      aria-busy={indeterminate || undefined}
      {...common}
    >
      {(visibleLabel || (!indeterminate && visibleValue)) && (
        <div className="progress__label">
          {visibleLabel && <span className="progress__label-text">{visibleLabel}</span>}
          {!indeterminate && visibleValue && <span className="progress__value">{visibleValue}</span>}
        </div>
      )}
      <div className="progress__track">
        <div className="progress__bar" style={indeterminate ? undefined : { width: `${percent}%` }} />
      </div>
    </div>
  );
}
