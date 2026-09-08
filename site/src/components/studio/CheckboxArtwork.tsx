import type {
  ChangeEventHandler,
  CSSProperties,
  ReactNode,
  Ref,
} from 'react';

interface CheckboxArtworkProps {
  label: ReactNode;
  checked?: boolean;
  name?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  describedBy?: string;
  invalid?: boolean;
  indeterminate?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  dataState?: string;
  inputStyle?: CSSProperties;
  inputRef?: Ref<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function CheckboxArtwork({
  label,
  checked = false,
  name = '',
  value = 'on',
  disabled = false,
  required = false,
  describedBy,
  invalid = false,
  indeterminate = false,
  className = '',
  inputClassName = '',
  labelClassName = '',
  dataState,
  inputStyle,
  inputRef,
  onChange,
}: CheckboxArtworkProps) {
  if (typeof label === 'string' && !label.trim()) return null;

  return (
    <label className={['checkbox', className].filter(Boolean).join(' ')}>
      <input
        ref={inputRef}
        className={['checkbox__input', inputClassName].filter(Boolean).join(' ')}
        type="checkbox"
        name={name || undefined}
        value={value}
        checked={checked}
        disabled={disabled}
        required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy || undefined}
        data-indeterminate={indeterminate ? 'true' : undefined}
        data-studio-state={dataState}
        style={inputStyle}
        onChange={onChange}
      />
      <span className={[
        'checkbox__label',
        required ? 'checkbox__label--required' : '',
        labelClassName,
      ].filter(Boolean).join(' ')}>
        {label}
      </span>
    </label>
  );
}
