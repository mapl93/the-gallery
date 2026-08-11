import type { ReactNode } from 'react';

export interface SegmentedControlOption {
  label: string;
  value: string;
  disabled?: boolean;
  content?: ReactNode;
  itemClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

interface SegmentedControlArtworkProps {
  className?: string;
  groupLabel: string;
  name: string;
  options: readonly SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  variant?: string;
  required?: boolean;
  disabled?: boolean;
  describedBy?: string;
  invalid?: boolean;
  legendClassName?: string;
  optionsClassName?: string;
  onValueChange?: (value: string) => void;
}

export default function SegmentedControlArtwork({
  className = '',
  groupLabel,
  name,
  options,
  value,
  defaultValue,
  variant = 'default',
  required = false,
  disabled = false,
  describedBy,
  invalid = false,
  legendClassName = '',
  optionsClassName = '',
  onValueChange,
}: SegmentedControlArtworkProps) {
  const validOptions = options.filter((option) => option.label.trim() && option.value.trim());
  const controlled = value !== undefined;
  const variantClass = ['error', 'success', 'warning'].includes(variant)
    ? `segmented--${variant}`
    : '';
  const classes = ['segmented', variantClass, className].filter(Boolean).join(' ');

  if (!groupLabel.trim() || !name.trim() || validOptions.length < 2) return null;

  return (
    <fieldset className={classes} disabled={disabled} aria-describedby={describedBy}>
      <legend className={['segmented__legend', legendClassName].filter(Boolean).join(' ')}>{groupLabel}</legend>
      <div className={['segmented__options', optionsClassName].filter(Boolean).join(' ')}>
        {validOptions.map((option) => (
          <label
            className={['segmented__item', option.itemClassName].filter(Boolean).join(' ')}
            key={option.value}
          >
            <input
              className={['segmented__input', option.inputClassName].filter(Boolean).join(' ')}
              type="radio"
              name={name}
              value={option.value}
              checked={controlled ? value === option.value : undefined}
              defaultChecked={!controlled ? defaultValue === option.value : undefined}
              required={required}
              disabled={option.disabled}
              aria-invalid={invalid || undefined}
              onChange={() => onValueChange?.(option.value)}
            />
            <span className={['segmented__label', option.labelClassName].filter(Boolean).join(' ')}>
              {option.content ?? option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
