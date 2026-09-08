import type {
  ChangeEventHandler,
  CSSProperties,
  HTMLInputTypeAttribute,
  ReactNode,
} from 'react';

export type InputArtworkVariant = 'default' | 'error' | 'success' | 'warning';

interface InputArtworkProps {
  id: string;
  label: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  readOnly?: boolean;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  variant?: InputArtworkVariant;
  message?: string;
  messageRole?: 'alert' | 'status';
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  fieldClassName?: string;
  dataState?: string;
  fieldStyle?: CSSProperties;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function InputArtwork({
  id,
  label,
  value,
  type = 'text',
  name = '',
  placeholder = '',
  autoComplete = '',
  required = false,
  readOnly = false,
  minLength,
  maxLength,
  disabled = false,
  variant = 'default',
  message = '',
  messageRole,
  leadingIcon,
  trailingIcon,
  className = '',
  fieldClassName = '',
  dataState,
  fieldStyle,
  onChange,
}: InputArtworkProps) {
  const visibleLabel = label.trim();
  const visibleMessage = message.trim();
  if (!id || !visibleLabel) return null;

  const messageId = `${id}-message`;
  const rootClassName = [
    'input',
    variant === 'default' ? '' : `input--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClassName}>
      <label className={`input__label${required ? ' input__label--required' : ''}`} htmlFor={id}>{visibleLabel}</label>
      <div className="input__control">
        {leadingIcon}
        <input
          className={['input__field', fieldClassName].filter(Boolean).join(' ')}
          id={id}
          type={type}
          name={name || undefined}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete || undefined}
          required={required}
          readOnly={readOnly}
          minLength={minLength}
          maxLength={maxLength}
          disabled={disabled}
          aria-invalid={variant === 'error' || undefined}
          aria-describedby={visibleMessage ? messageId : undefined}
          data-studio-state={dataState}
          style={fieldStyle}
          onChange={onChange}
        />
        {trailingIcon}
      </div>
      {visibleMessage && (
        <span className="input__message" id={messageId} role={messageRole}>
          {visibleMessage}
        </span>
      )}
    </div>
  );
}
