import { Mail, ShieldCheck } from 'lucide-react';
import type { ChangeEventHandler, FormEventHandler, MouseEventHandler } from 'react';
import InputArtwork from './InputArtwork';
import PasswordInputArtwork from './PasswordInputArtwork';

interface AuthFormsArtworkProps {
  id: string;
  title: string;
  subtitle?: string;
  form?: boolean;
  forgotAction?: boolean;
  dividerLabel?: string;
  socialActions?: boolean;
  footer?: boolean;
  email: string;
  password: string;
  passwordVisible?: boolean;
  className?: string;
  onEmailChange?: ChangeEventHandler<HTMLInputElement>;
  onPasswordChange?: ChangeEventHandler<HTMLInputElement>;
  onPasswordVisibleChange?: (visible: boolean) => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onAlternativeAction?: (method: 'email-link' | 'single-sign-on') => void;
  onNavigate?: MouseEventHandler<HTMLAnchorElement>;
}

export default function AuthFormsArtwork({
  id,
  title,
  subtitle = '',
  form = true,
  forgotAction = true,
  dividerLabel = '',
  socialActions = true,
  footer = true,
  email,
  password,
  passwordVisible = false,
  className = '',
  onEmailChange,
  onPasswordChange,
  onPasswordVisibleChange,
  onSubmit,
  onAlternativeAction,
  onNavigate,
}: AuthFormsArtworkProps) {
  const visibleTitle = title.trim();
  const visibleSubtitle = subtitle.trim();
  const visibleDividerLabel = dividerLabel.trim();
  if (!id || !visibleTitle || !form) return null;

  const titleId = `${id}-title`;
  const dividerLabelId = `${id}-alternatives-label`;
  const emailId = `${id}-email`;
  const passwordId = `${id}-password`;

  return (
    <section
      className={['auth', className].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
    >
      <header className="auth__header">
        <h2 className="auth__title" id={titleId}>{visibleTitle}</h2>
        {visibleSubtitle && <p className="auth__subtitle">{visibleSubtitle}</p>}
      </header>

      <form className="form auth__form" onSubmit={onSubmit}>
        <InputArtwork
          className="docs-studio__account-field"
          id={emailId}
          label="Email address"
          type="email"
          name="email"
          value={email}
          autoComplete="username"
          required
          onChange={onEmailChange}
        />
        <div className="field docs-studio__account-field">
          <label className="field__label field__label--required" htmlFor={passwordId}>Password</label>
          <PasswordInputArtwork
            id={passwordId}
            name="password"
            value={password}
            visible={passwordVisible}
            autoComplete="current-password"
            required
            onChange={onPasswordChange}
            onVisibleChange={onPasswordVisibleChange}
          />
        </div>
        {forgotAction && (
          <div className="auth__forgot">
            <a className="link" href="#reset" onClick={onNavigate}>Forgot password?</a>
          </div>
        )}
        <button className="btn btn--full" type="submit">Sign in</button>
      </form>

      {socialActions && (
        <div className="auth__alternatives">
          {visibleDividerLabel && (
            <div className="auth__divider">
              <hr className="divider" aria-hidden="true" />
              <span className="auth__divider-label" id={dividerLabelId}>{visibleDividerLabel}</span>
              <hr className="divider" aria-hidden="true" />
            </div>
          )}
          <div
            className="auth__social"
            role={visibleDividerLabel ? 'group' : undefined}
            aria-labelledby={visibleDividerLabel ? dividerLabelId : undefined}
          >
            <button
              className="btn btn--outline btn--full"
              type="button"
              onClick={() => onAlternativeAction?.('email-link')}
            >
              <Mail className="btn__icon btn__icon--leading" aria-hidden="true" />
              Continue with email link
            </button>
            <button
              className="btn btn--outline btn--full"
              type="button"
              onClick={() => onAlternativeAction?.('single-sign-on')}
            >
              <ShieldCheck className="btn__icon btn__icon--leading" aria-hidden="true" />
              Continue with single sign-on
            </button>
          </div>
        </div>
      )}

      {footer && (
        <p className="auth__footer">
          New to the gallery?{' '}
          <a className="link" href="#register" onClick={onNavigate}>Create an account</a>
        </p>
      )}
    </section>
  );
}
