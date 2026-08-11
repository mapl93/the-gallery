import type { ChangeEventHandler, FormEventHandler, ReactNode, Ref } from 'react';
import { CircleCheck } from 'lucide-react';
import AlertArtwork from './AlertArtwork';
import InputArtwork from './InputArtwork';

interface PasswordResetArtworkProps {
  id: string;
  title: string;
  text: string;
  email: string;
  icon?: ReactNode;
  form?: boolean;
  successMessage?: string;
  showSuccess?: boolean;
  confirmationRef?: Ref<HTMLDivElement>;
  className?: string;
  onEmailChange?: ChangeEventHandler<HTMLInputElement>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export default function PasswordResetArtwork({
  id,
  title,
  text,
  email,
  icon,
  form = true,
  successMessage = '',
  showSuccess = false,
  confirmationRef,
  className = '',
  onEmailChange,
  onSubmit,
}: PasswordResetArtworkProps) {
  const visibleTitle = title.trim();
  const visibleText = text.trim();
  const visibleSuccessMessage = successMessage.trim();
  const confirmed = showSuccess && Boolean(visibleSuccessMessage);
  if (!id || !visibleTitle || !visibleText || (!form && !confirmed)) return null;

  const titleId = `${id}-title`;

  return (
    <section
      className={['password-reset', className].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
    >
      {icon}
      <header className="password-reset__header">
        <h2 className="password-reset__title" id={titleId}>{visibleTitle}</h2>
        <p className="password-reset__text">{visibleText}</p>
      </header>

      {confirmed ? (
        <AlertArtwork
          className="password-reset__success"
          variant="success"
          announcement="polite"
          message={visibleSuccessMessage}
          icon={<CircleCheck className="alert__icon" aria-hidden="true" />}
          rootRef={confirmationRef}
          tabIndex={-1}
        />
      ) : (
        <form className="form password-reset__form" onSubmit={onSubmit}>
          <InputArtwork
            className="docs-studio__account-field"
            id={`${id}-email`}
            label="Email address"
            type="email"
            name="email"
            value={email}
            autoComplete="email"
            required
            onChange={onEmailChange}
          />
          <button className="btn btn--full" type="submit">Send reset link</button>
        </form>
      )}
    </section>
  );
}
