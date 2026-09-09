import { useEffect, useRef, type CSSProperties } from 'react';

interface QuantitySelectorArtworkProps {
  id?: string;
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
  id,
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
  const rootRef = useRef<HTMLDivElement>(null);
  const normalizedStep = Number.isFinite(step) && step > 0 ? step : 1;
  const classes = ['qty', className].filter(Boolean).join(' ');

  useEffect(() => {
    if (rootRef.current) {
      window.TheGallery?.enhanceQuantities(rootRef.current);
    }
  }, [value, min, max, normalizedStep, disabled, readOnly]);

  return (
    <div
      ref={rootRef}
      className={classes}
      data-qty
      role="group"
      aria-label={groupLabel}
      data-studio-state={studioState}
      style={rootStyle}
    >
      <button
        className="qty__btn qty__btn--decrement"
        data-qty-minus
        type="button"
        aria-label={decrementLabel}
        disabled={disabled || readOnly || (value !== null && min !== null && value <= min)}
        style={decrementStyle}
      >
        <svg className="qty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M5 12h14" />
        </svg>
      </button>
      <input
        className="qty__input"
        data-qty-input
        id={id}
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
        onInput={(event) => onValueChange(
          event.currentTarget.value === '' ? null : event.currentTarget.valueAsNumber
        )}
      />
      <button
        className="qty__btn qty__btn--increment"
        data-qty-plus
        type="button"
        aria-label={incrementLabel}
        disabled={disabled || readOnly || (value !== null && max !== null && value >= max)}
      >
        <svg className="qty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}
