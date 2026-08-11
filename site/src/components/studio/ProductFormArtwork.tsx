import type { FormEvent, ReactNode } from 'react';

interface ProductFormArtworkProps {
  id?: string;
  submitLabel: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
  action?: string;
  method?: 'get' | 'post';
  onReset?: () => void;
  variantSelector?: ReactNode;
  quantitySelector?: ReactNode;
  targetData?: ReactNode;
  feedback?: ReactNode;
  feedbackId?: string;
  feedbackRole?: 'status' | 'alert';
  submitDisabled?: boolean;
  pending?: boolean;
  submitName?: string;
  submitValue?: string;
  submitIcon?: ReactNode;
}

export default function ProductFormArtwork({
  id,
  submitLabel,
  onSubmit,
  className = '',
  action,
  method = 'post',
  onReset,
  variantSelector,
  quantitySelector,
  targetData,
  feedback,
  feedbackId,
  feedbackRole,
  submitDisabled = false,
  pending = false,
  submitName = 'intent',
  submitValue = 'add',
  submitIcon,
}: ProductFormArtworkProps) {
  if (!submitLabel.trim()) return null;

  return (
    <form
      id={id}
      className={['product-form', className].filter(Boolean).join(' ')}
      action={action}
      method={method}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      {variantSelector}
      {quantitySelector}
      {targetData}
      {feedback && (
        <p className="product-form__message" id={feedbackId} role={feedbackRole}>{feedback}</p>
      )}
      <div className="product-form__actions">
        <button
          className="btn btn--lg product-form__submit"
          type="submit"
          name={submitName}
          value={submitValue}
          disabled={submitDisabled || pending}
          aria-busy={pending || undefined}
          aria-describedby={feedback ? feedbackId : undefined}
        >
          {submitIcon}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
