import type { ReactNode } from 'react';

interface FieldWrapperArtworkProps {
  controlId: string;
  label: string;
  children: ReactNode;
  description?: string;
  feedback?: string;
  feedbackIcon?: ReactNode;
  required?: boolean;
  variant?: 'default' | 'error' | 'success' | 'warning';
}

// Site adapter only. The child authors its native state and the matching
// `${controlId}-help` / `${controlId}-feedback` described-by references.
export default function FieldWrapperArtwork({
  controlId, label, children, description = '', feedback = '', feedbackIcon,
  required = false, variant = 'default',
}: FieldWrapperArtworkProps) {
  return <div className={`field${variant === 'default' ? '' : ` field--${variant}`}`}>
    <label className={`field__label${required ? ' field__label--required' : ''}`} htmlFor={controlId}>{label}</label>
    {children}
    {description && <span className="field__description" id={`${controlId}-help`}>{description}</span>}
    {feedback && <span className={`field__feedback${variant === 'default' ? '' : ` field__${variant}`}`} id={`${controlId}-feedback`}>
      {feedbackIcon}{feedback}
    </span>}
  </div>;
}
