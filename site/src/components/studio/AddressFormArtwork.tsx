import { Children, type FormEventHandler, type ReactNode } from 'react';

interface AddressFormArtworkProps {
  fields: ReactNode;
  actions?: ReactNode;
  className?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export default function AddressFormArtwork({
  fields,
  actions,
  className = '',
  onSubmit,
}: AddressFormArtworkProps) {
  if (Children.toArray(fields).length === 0) return null;

  return (
    <form
      className={['form', 'address-form', className].filter(Boolean).join(' ')}
      onSubmit={onSubmit}
    >
      <div className="form__section address-form__fields">{fields}</div>
      {Children.toArray(actions).length > 0 && (
        <div className="form__actions address-form__actions">{actions}</div>
      )}
    </form>
  );
}
