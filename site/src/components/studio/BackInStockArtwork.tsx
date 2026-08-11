import type {
  ChangeEventHandler,
  FormEventHandler,
  ReactNode,
} from 'react';
import InputArtwork, { type InputArtworkVariant } from './InputArtwork';

export type BackInStockRequestState = 'idle' | 'submitting' | 'confirmed' | 'retryableError';

interface BackInStockArtworkProps {
  id: string;
  heading: string;
  emailLabel: string;
  submitLabel: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  description?: string;
  emailValue?: string;
  emailPlaceholder?: string;
  emailMessage?: string;
  emailVariant?: InputArtworkVariant;
  emailIndicator?: ReactNode;
  required?: boolean;
  requestState?: BackInStockRequestState;
  action?: string;
  method?: 'get' | 'post';
  targetData?: ReactNode;
  feedback?: ReactNode;
  className?: string;
  onEmailChange?: ChangeEventHandler<HTMLInputElement>;
  onReset?: () => void;
}

export default function BackInStockArtwork({
  id,
  heading,
  emailLabel,
  submitLabel,
  onSubmit,
  description = '',
  emailValue = '',
  emailPlaceholder = '',
  emailMessage = '',
  emailVariant = 'default',
  emailIndicator,
  required = true,
  requestState = 'idle',
  action,
  method = 'post',
  targetData,
  feedback,
  className = '',
  onEmailChange,
  onReset,
}: BackInStockArtworkProps) {
  const visibleHeading = heading.trim();
  const visibleDescription = description.trim();
  const visibleEmailLabel = emailLabel.trim();
  const visibleSubmitLabel = submitLabel.trim();
  if (!id || !visibleHeading || !visibleEmailLabel || !visibleSubmitLabel) return null;

  const titleId = `${id}-title`;
  const emailId = `${id}-email`;
  const feedbackId = `${id}-status`;
  const needsFeedback = requestState === 'confirmed' || requestState === 'retryableError';
  const resolvedRequestState = needsFeedback && !feedback ? 'idle' : requestState;
  const locked = resolvedRequestState === 'submitting' || resolvedRequestState === 'confirmed';
  const dataState = resolvedRequestState === 'retryableError'
    ? 'retryable-error'
    : resolvedRequestState;

  return (
    <div
      className={['back-in-stock', className].filter(Boolean).join(' ')}
      data-state={dataState}
    >
      <h2 className="back-in-stock__heading" id={titleId}>{visibleHeading}</h2>
      {visibleDescription && <p className="back-in-stock__text">{visibleDescription}</p>}
      <form
        className="back-in-stock__form"
        action={action}
        method={method}
        aria-labelledby={titleId}
        aria-busy={resolvedRequestState === 'submitting' || undefined}
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <InputArtwork
          id={emailId}
          label={visibleEmailLabel}
          type="email"
          name="email"
          value={emailValue}
          placeholder={emailPlaceholder}
          autoComplete="email"
          required={required}
          readOnly={locked}
          variant={emailVariant}
          message={emailMessage}
          messageRole={emailVariant === 'error' ? 'alert' : undefined}
          fieldClassName="back-in-stock__input"
          trailingIcon={emailIndicator}
          onChange={onEmailChange}
        />
        {targetData}
        <button
          className="btn back-in-stock__submit"
          type="submit"
          disabled={locked}
          aria-busy={resolvedRequestState === 'submitting' || undefined}
        >
          {visibleSubmitLabel}
        </button>
      </form>
      {feedback && (
        <p
          className="back-in-stock__status"
          id={feedbackId}
          role={resolvedRequestState === 'retryableError' ? 'alert' : 'status'}
        >
          {feedback}
        </p>
      )}
    </div>
  );
}
