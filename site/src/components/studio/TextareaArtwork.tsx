import type {
  ChangeEventHandler,
  CSSProperties,
  Ref,
} from 'react';
import type { InputArtworkVariant } from './InputArtwork';

interface TextareaArtworkProps {
  id: string;
  label: string;
  value: string;
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
  resize?: 'vertical' | 'horizontal' | 'both';
  minLines?: number;
  maxLines?: number;
  rows?: number;
  className?: string;
  dataState?: string;
  fieldStyle?: CSSProperties;
  fieldRef?: Ref<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

export default function TextareaArtwork({
  id,
  label,
  value,
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
  resize = 'vertical',
  minLines = 4,
  maxLines,
  rows,
  className = '',
  dataState,
  fieldStyle,
  fieldRef,
  onChange,
}: TextareaArtworkProps) {
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
      <label className="input__label" htmlFor={id}>{visibleLabel}</label>
      <div className="input__control">
        <textarea
          ref={fieldRef}
          className="input__field textarea__field"
          id={id}
          name={name || undefined}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete || undefined}
          required={required}
          readOnly={readOnly}
          minLength={minLength}
          maxLength={maxLength}
          disabled={disabled}
          rows={rows}
          aria-invalid={variant === 'error' || undefined}
          aria-describedby={visibleMessage ? messageId : undefined}
          data-resize={resize === 'vertical' ? undefined : resize}
          data-min-lines={minLines === 4 ? undefined : minLines}
          data-max-lines={maxLines}
          data-studio-state={dataState}
          style={fieldStyle}
          onChange={onChange}
        />
      </div>
      {visibleMessage && (
        <span className="input__message" id={messageId} role={messageRole}>
          {visibleMessage}
        </span>
      )}
    </div>
  );
}
