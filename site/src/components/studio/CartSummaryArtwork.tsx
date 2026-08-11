import type { MouseEventHandler, ReactNode } from 'react';

export interface CartSummaryRow {
  key: string;
  label: string;
  value: string;
  total?: boolean;
}

interface CartSummaryArtworkProps {
  id: string;
  title: string;
  rows: CartSummaryRow[];
  note?: string;
  checkoutLabel: string;
  checkoutDisabled?: boolean;
  checkoutBusy?: boolean;
  onCheckout?: MouseEventHandler<HTMLButtonElement>;
  expressContent?: ReactNode;
  className?: string;
}

export default function CartSummaryArtwork({
  id,
  title,
  rows,
  note = '',
  checkoutLabel,
  checkoutDisabled = false,
  checkoutBusy = false,
  onCheckout,
  expressContent,
  className = '',
}: CartSummaryArtworkProps) {
  const visibleTitle = title.trim();
  const visibleCheckoutLabel = checkoutLabel.trim();
  const visibleRows = rows
    .map((row) => ({ ...row, label: row.label.trim(), value: row.value.trim() }))
    .filter((row) => row.label && row.value);
  const visibleNote = note.trim();

  if (!visibleTitle || !visibleCheckoutLabel || !visibleRows.some((row) => row.total)) return null;

  const titleId = `${id}-title`;
  const rootClassName = ['cart-summary', className].filter(Boolean).join(' ');

  return (
    <section className={rootClassName} aria-labelledby={titleId}>
      <h2 className="cart-summary__title" id={titleId}>{visibleTitle}</h2>
      <dl className="cart-summary__rows">
        {visibleRows.map((row) => (
          <div className={`cart-summary__row${row.total ? ' cart-summary__row--total' : ''}`} key={row.key}>
            <dt className="cart-summary__label">{row.label}</dt>
            <dd className="cart-summary__value"><bdi>{row.value}</bdi></dd>
          </div>
        ))}
      </dl>
      {visibleNote && <p className="cart-summary__note">{visibleNote}</p>}
      <button
        className="btn btn--full cart-summary__checkout"
        type="button"
        disabled={checkoutDisabled || checkoutBusy}
        aria-busy={checkoutBusy || undefined}
        onClick={onCheckout}
      >
        {visibleCheckoutLabel}
      </button>
      {expressContent && <div className="cart-summary__express">{expressContent}</div>}
    </section>
  );
}
