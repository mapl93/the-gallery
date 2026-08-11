import type {
  ChangeEventHandler,
  CSSProperties,
  InputHTMLAttributes,
} from 'react';

export type SwitchArtworkSize = 'default' | 'sm' | 'lg';
export type SwitchArtworkVariant = 'default' | 'error' | 'success' | 'warning';

interface SwitchArtworkProps {
  id?: string;
  label: string;
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  describedBy?: string;
  size?: SwitchArtworkSize;
  variant?: SwitchArtworkVariant;
  className?: string;
  dataState?: string;
  trackStyle?: CSSProperties;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function SwitchArtwork({
  id,
  label,
  name,
  value = 'on',
  checked,
  defaultChecked,
  disabled = false,
  required = false,
  invalid = false,
  describedBy,
  size = 'default',
  variant = 'default',
  className = '',
  dataState,
  trackStyle,
  onChange,
}: SwitchArtworkProps) {
  const visibleLabel = label.trim();
  if (!visibleLabel) return null;

  const checkedProps: Pick<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'defaultChecked'> =
    checked === undefined ? { defaultChecked } : { checked };
  const rootClassName = [
    'switch',
    size === 'default' ? '' : `switch--${size}`,
    variant === 'default' ? '' : `switch--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <label className={rootClassName} htmlFor={id}>
      <input
        {...checkedProps}
        className="switch__input"
        id={id}
        type="checkbox"
        role="switch"
        name={name || undefined}
        value={value}
        disabled={disabled}
        required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy || undefined}
        data-studio-state={dataState}
        onChange={onChange}
      />
      <span className="switch__track" aria-hidden="true" style={trackStyle}>
        <span className="switch__thumb" />
      </span>
      <span className="switch__label">{visibleLabel}</span>
    </label>
  );
}
