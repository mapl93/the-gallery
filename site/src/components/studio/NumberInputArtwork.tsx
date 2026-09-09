import type { ReactNode } from 'react';

interface NumberInputArtworkProps {
  id: string;
  label: string;
  decrementLabel: string;
  incrementLabel: string;
  value: number | null;
  onValueChange: (value: number | null) => void;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  describedBy?: string;
  variant?: 'default' | 'error' | 'success' | 'warning';
  className?: string;
  decrementIcon?: ReactNode;
  incrementIcon?: ReactNode;
}

// The copied Web runtime enhances these native actions with stepDown/stepUp.
export default function NumberInputArtwork({
  id, label, decrementLabel, incrementLabel, value, onValueChange, name,
  min, max, step = 1, required = false, disabled = false, readOnly = false,
  describedBy, variant = 'default', className = '', decrementIcon, incrementIcon,
}: NumberInputArtworkProps) {
  const unavailable = disabled || readOnly;
  return <div className={['number-input', variant === 'default' ? '' : `number-input--${variant}`, className].filter(Boolean).join(' ')}>
    <button className="number-input__btn number-input__btn--decrement" type="button"
      aria-label={decrementLabel} aria-controls={id}
      disabled={unavailable || (value !== null && min !== undefined && value <= min)}>
      {decrementIcon || <span aria-hidden="true">−</span>}
    </button>
    <input className="number-input__field" id={id} name={name || undefined} type="number"
      value={value ?? ''} min={min} max={max} step={step} required={required}
      disabled={disabled} readOnly={readOnly} aria-label={label}
      aria-invalid={variant === 'error' || undefined} aria-describedby={describedBy}
      onChange={(event) => onValueChange(Number.isFinite(event.currentTarget.valueAsNumber) ? event.currentTarget.valueAsNumber : null)} />
    <button className="number-input__btn number-input__btn--increment" type="button"
      aria-label={incrementLabel} aria-controls={id}
      disabled={unavailable || (value !== null && max !== undefined && value >= max)}>
      {incrementIcon || <span aria-hidden="true">+</span>}
    </button>
  </div>;
}
