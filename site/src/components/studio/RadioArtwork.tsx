import type { CSSProperties } from 'react';

export type RadioArtworkVariant = 'default' | 'error' | 'success' | 'warning';

interface RadioArtworkProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  variant?: RadioArtworkVariant;
  required?: boolean;
  disabled?: boolean;
  describedBy?: string;
  className?: string;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  studioState?: string;
}

export default function RadioArtwork({
  label,
  name,
  value,
  checked,
  onCheckedChange,
  id,
  variant = 'default',
  required = false,
  disabled = false,
  describedBy,
  className = '',
  inputClassName = '',
  inputStyle,
  studioState,
}: RadioArtworkProps) {
  const visibleLabel = label.trim();
  const groupName = name.trim();
  const submittedValue = value.trim();
  if (!visibleLabel || !groupName || !submittedValue) return null;

  return (
    <label
      className={[
        'radio',
        variant === 'default' ? null : `radio--${variant}`,
        className.trim() || null,
      ].filter(Boolean).join(' ')}
    >
      <input
        className={['radio__input', inputClassName.trim() || null].filter(Boolean).join(' ')}
        id={id}
        type="radio"
        name={groupName}
        value={submittedValue}
        checked={checked}
        required={required}
        disabled={disabled}
        aria-invalid={variant === 'error' || undefined}
        aria-describedby={describedBy}
        data-studio-state={studioState}
        style={inputStyle}
        onChange={(event) => onCheckedChange(event.currentTarget.checked)}
      />
      <span className="radio__label" dir="auto">{visibleLabel}</span>
    </label>
  );
}
