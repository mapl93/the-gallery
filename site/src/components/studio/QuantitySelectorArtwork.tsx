import { useRef, type CSSProperties } from 'react';

interface QuantitySelectorArtworkProps {
  value: number | null;
  onValueChange: (value: number | null) => void;
  min?: number | null;
  max?: number | null;
  step?: number;
  name?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  accessibleLabel?: string;
  decrementLabel?: string;
  incrementLabel?: string;
  describedBy?: string;
  invalid?: boolean;
  groupLabel?: string;
  studioState?: string;
  rootStyle?: CSSProperties;
  decrementStyle?: CSSProperties;
}

export default function QuantitySelectorArtwork({
  value,
  onValueChange,
  min = null,
  max = null,
  step = 1,
  name = '',
  className = '',
  disabled = false,
  readOnly = false,
  required = false,
  accessibleLabel = 'Quantity',
  decrementLabel = 'Decrease quantity',
  incrementLabel = 'Increase quantity',
  describedBy = '',
  invalid = false,
  groupLabel = 'Quantity selector',
  studioState,
  rootStyle,
  decrementStyle,
}: QuantitySelectorArtworkProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const normalizedStep = Number.isFinite(step) && step > 0 ? step : 1;
  const classes = ['qty', className].filter(Boolean).join(' ');

  function updateValue(direction: -1 | 1) {
    const input = inputRef.current;
    if (!input || disabled || readOnly) return;

    try {
      if (direction < 0) input.stepDown();
      else input.stepUp();
      onValueChange(Number.isNaN(input.valueAsNumber) ? null : input.valueAsNumber);
    } catch {
      const base = value ?? min ?? 0;
      const next = Number((base + direction * normalizedStep).toFixed(10));
      onValueChange(Math.min(max ?? next, Math.max(min ?? next, next)));
    }
  }

  return (
    <div
      className={classes}
      role="group"
      aria-label={groupLabel}
      data-studio-state={studioState}
      style={rootStyle}
    >
      <button
        className="qty__btn qty__btn--decrement"
        type="button"
        aria-label={decrementLabel}
        disabled={disabled || readOnly || (value !== null && min !== null && value <= min)}
        style={decrementStyle}
        onClick={() => updateValue(-1)}
      >
        <svg className="qty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M5 12h14" />
        </svg>
      </button>
      <input
        ref={inputRef}
        className="qty__input"
        type="number"
        name={name || undefined}
        value={value ?? ''}
        min={min ?? undefined}
        max={max ?? undefined}
        step={normalizedStep}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        aria-label={accessibleLabel}
        aria-describedby={describedBy || undefined}
        aria-invalid={invalid || undefined}
        onChange={(event) => onValueChange(
          event.target.value === '' ? null : event.target.valueAsNumber
        )}
      />
      <button
        className="qty__btn qty__btn--increment"
        type="button"
        aria-label={incrementLabel}
        disabled={disabled || readOnly || (value !== null && max !== null && value >= max)}
        onClick={() => updateValue(1)}
      >
        <svg className="qty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}
