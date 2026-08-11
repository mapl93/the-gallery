import type {
  ChangeEventHandler,
  FormEventHandler,
} from 'react';
import InputArtwork, { type InputArtworkVariant } from './InputArtwork';

export interface DiscountFieldCode {
  key: string;
  code: string;
  removeLabel: string;
  removeActionLabel?: string;
  removeDisabled?: boolean;
  removeBusy?: boolean;
}

interface DiscountFieldArtworkProps {
  id: string;
  toggleLabel: string;
  expanded: boolean;
  inputPresent?: boolean;
  inputLabel: string;
  inputValue: string;
  inputName?: string;
  inputMessage?: string;
  inputVariant?: InputArtworkVariant;
  applyLabel: string;
  applyDisabled?: boolean;
  applyBusy?: boolean;
  appliedCodes?: DiscountFieldCode[];
  className?: string;
  onExpandedChange?: (expanded: boolean) => void;
  onInputChange?: ChangeEventHandler<HTMLInputElement>;
  onApply?: FormEventHandler<HTMLFormElement>;
  onRemove?: (key: string) => void;
}

export default function DiscountFieldArtwork({
  id,
  toggleLabel,
  expanded,
  inputPresent = true,
  inputLabel,
  inputValue,
  inputName = 'discount',
  inputMessage = '',
  inputVariant = 'default',
  applyLabel,
  applyDisabled = false,
  applyBusy = false,
  appliedCodes = [],
  className = '',
  onExpandedChange,
  onInputChange,
  onApply,
  onRemove,
}: DiscountFieldArtworkProps) {
  const visibleToggleLabel = toggleLabel.trim();
  const visibleInputLabel = inputLabel.trim();
  const visibleApplyLabel = applyLabel.trim();
  const visibleCodes = appliedCodes
    .map((entry) => ({
      ...entry,
      code: entry.code.trim(),
      removeLabel: entry.removeLabel.trim(),
      removeActionLabel: entry.removeActionLabel?.trim() || 'Remove',
    }))
    .filter((entry) => entry.key && entry.code && entry.removeLabel);

  if (!id || !visibleToggleLabel || !inputPresent || !visibleInputLabel || !visibleApplyLabel) {
    return null;
  }

  return (
    <details
      className={['discount-field', className].filter(Boolean).join(' ')}
      open={expanded}
      onToggle={(event) => onExpandedChange?.(event.currentTarget.open)}
    >
      <summary className="discount-field__toggle">{visibleToggleLabel}</summary>
      <div className="discount-field__panel">
        <form className="discount-field__form" onSubmit={onApply}>
          <InputArtwork
            id={`${id}-input`}
            className="discount-field__input"
            label={visibleInputLabel}
            value={inputValue}
            name={inputName}
            autoComplete="off"
            required
            variant={inputVariant}
            message={inputMessage}
            messageRole={inputVariant === 'error' ? 'alert' : undefined}
            onChange={onInputChange}
          />
          <button
            className="btn btn--outline discount-field__apply"
            type="submit"
            disabled={applyDisabled || applyBusy}
            aria-busy={applyBusy || undefined}
          >
            {visibleApplyLabel}
          </button>
        </form>

        {visibleCodes.length > 0 && (
          <ul className="discount-field__codes">
            {visibleCodes.map((entry) => (
              <li className="discount-field__code-item" key={entry.key}>
                <span className="discount-field__code"><bdi>{entry.code}</bdi></span>
                <button
                  className="btn btn--link discount-field__remove"
                  type="button"
                  aria-label={entry.removeLabel}
                  disabled={entry.removeDisabled || entry.removeBusy}
                  aria-busy={entry.removeBusy || undefined}
                  onClick={() => onRemove?.(entry.key)}
                >
                  {entry.removeActionLabel}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}
