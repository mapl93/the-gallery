import { Eye, EyeOff } from 'lucide-react';
import type { ChangeEventHandler, CSSProperties } from 'react';

export type PasswordInputArtworkVariant = 'default' | 'error' | 'success' | 'warning';
export type PasswordInputArtworkStrength = 'none' | 'weak' | 'fair' | 'good' | 'strong';

interface PasswordInputArtworkProps {
  id: string;
  value: string;
  visible?: boolean;
  name?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  variant?: PasswordInputArtworkVariant;
  describedBy?: string;
  strength?: PasswordInputArtworkStrength;
  strengthText?: string;
  className?: string;
  dataState?: string;
  fieldStyle?: CSSProperties;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onVisibleChange?: (visible: boolean) => void;
}

export default function PasswordInputArtwork({
  id,
  value,
  visible = false,
  name = '',
  placeholder = '',
  autoComplete = 'current-password',
  required = false,
  readOnly = false,
  disabled = false,
  variant = 'default',
  describedBy = '',
  strength = 'none',
  strengthText = '',
  className = '',
  dataState,
  fieldStyle,
  onChange,
  onVisibleChange,
}: PasswordInputArtworkProps) {
  if (!id) return null;

  const visibleStrengthText = strengthText.trim();
  const hasStrength = strength !== 'none' && Boolean(visibleStrengthText);
  const strengthId = hasStrength ? `${id}-strength` : '';
  const fieldDescribedBy = [describedBy.trim(), strengthId].filter(Boolean).join(' ') || undefined;
  const VisibilityIcon = visible ? EyeOff : Eye;
  const rootClassName = [
    'password-input',
    variant === 'default' ? '' : `password-input--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <>
      <div className={rootClassName}>
        <input
          className="password-input__field"
          id={id}
          name={name || undefined}
          type={visible ? 'text' : 'password'}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete || undefined}
          autoCapitalize="none"
          spellCheck={false}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          aria-invalid={variant === 'error' || undefined}
          aria-describedby={fieldDescribedBy}
          data-studio-state={dataState}
          style={fieldStyle}
          onChange={onChange}
        />
        <button
          className="password-input__toggle"
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          aria-controls={id}
          disabled={disabled}
          onClick={() => onVisibleChange?.(!visible)}
        >
          <VisibilityIcon aria-hidden="true" />
        </button>
      </div>
      {hasStrength && (
        <div className="password-strength" id={strengthId} data-strength={strength}>
          {Array.from({ length: 4 }, (_, index) => (
            <span className="password-strength__bar" aria-hidden="true" key={index} />
          ))}
          <span className="password-strength__text">{visibleStrengthText}</span>
        </div>
      )}
    </>
  );
}
