import type { ReactNode } from 'react';

interface StickyAtcArtworkProps {
  visible: boolean;
  title: string;
  actionLabel: string;
  productFormId: string;
  image?: ReactNode;
  price?: ReactNode;
  actionDisabled?: boolean;
  pending?: boolean;
  className?: string;
  submitName?: string;
  submitValue?: string;
}

export default function StickyAtcArtwork({
  visible,
  title,
  actionLabel,
  productFormId,
  image,
  price,
  actionDisabled = false,
  pending = false,
  className = '',
  submitName = 'intent',
  submitValue = 'add',
}: StickyAtcArtworkProps) {
  const productTitle = title.trim();
  const label = actionLabel.trim();
  const formId = productFormId.trim();
  if (!productTitle || !label || !formId) return null;

  return (
    <div
      className={['sticky-atc', visible && 'sticky-atc--visible', className].filter(Boolean).join(' ')}
      aria-hidden={visible ? undefined : true}
      inert={visible ? undefined : true}
    >
      <div className="sticky-atc__inner">
        <div className="sticky-atc__info">
          {image}
          <span className="sticky-atc__title" dir="auto">{productTitle}</span>
          {price && <div className="sticky-atc__price">{price}</div>}
        </div>
        <button
          className="btn sticky-atc__action"
          type="submit"
          form={formId}
          name={submitName}
          value={submitValue}
          disabled={actionDisabled || pending}
          aria-busy={pending || undefined}
        >
          {label}
        </button>
      </div>
    </div>
  );
}
