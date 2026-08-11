import type { MouseEventHandler } from 'react';
import PriceArtwork from './PriceArtwork';

export interface CartUpsellItem {
  key: string;
  title: string;
  href?: string;
  onNavigate?: MouseEventHandler<HTMLAnchorElement>;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  currentPrice?: string;
  currentPriceLabel?: string;
  compareAtPrice?: string;
  compareAtPriceLabel?: string;
  unitPrice?: string;
  unitPriceLabel?: string;
  actionLabel?: string;
  actionAccessibleLabel?: string;
  actionDisabled?: boolean;
  actionBusy?: boolean;
  onAction?: MouseEventHandler<HTMLButtonElement>;
}

interface CartUpsellArtworkProps {
  id: string;
  title: string;
  items: CartUpsellItem[];
  className?: string;
}

export default function CartUpsellArtwork({
  id,
  title,
  items,
  className = '',
}: CartUpsellArtworkProps) {
  const visibleTitle = title.trim();
  const visibleItems = items
    .map((item) => ({
      ...item,
      title: item.title.trim(),
      href: item.href?.trim() ?? '',
      currentPrice: item.currentPrice?.trim() ?? '',
      actionLabel: item.actionLabel?.trim() ?? '',
      actionAccessibleLabel: item.actionAccessibleLabel?.trim() ?? '',
    }))
    .filter((item) => item.title);

  if (!visibleTitle || visibleItems.length === 0) return null;

  const titleId = `${id}-title`;
  const rootClassName = ['cart-upsell', className].filter(Boolean).join(' ');

  return (
    <section className={rootClassName} aria-labelledby={titleId}>
      <h2 className="cart-upsell__title" id={titleId}>{visibleTitle}</h2>
      <ul className="cart-upsell__items">
        {visibleItems.map((item) => {
          const actionVisible = item.actionLabel && item.actionAccessibleLabel;

          return (
            <li className="cart-upsell__item" key={item.key}>
              {item.imageSrc && (
                <img
                  className={['cart-upsell__item-image', item.imageClassName].filter(Boolean).join(' ')}
                  src={item.imageSrc}
                  alt={item.imageAlt ?? ''}
                />
              )}
              <div className="cart-upsell__item-info">
                {item.href ? (
                  <a
                    className="link link--nav cart-upsell__item-title"
                    href={item.href}
                    onClick={item.onNavigate}
                  >
                    {item.title}
                  </a>
                ) : (
                  <span className="cart-upsell__item-title">{item.title}</span>
                )}
                {item.currentPrice && (
                  <PriceArtwork
                    className="cart-upsell__price"
                    currentPrice={item.currentPrice}
                    currentPriceLabel={item.currentPriceLabel}
                    compareAtPrice={item.compareAtPrice}
                    compareAtPriceLabel={item.compareAtPriceLabel}
                    unitPrice={item.unitPrice}
                    unitPriceLabel={item.unitPriceLabel}
                    variant={item.compareAtPrice ? 'on-sale' : 'default'}
                  />
                )}
              </div>
              {actionVisible && (
                <button
                  className="btn btn--sm cart-upsell__action"
                  type="button"
                  aria-label={item.actionAccessibleLabel}
                  aria-busy={item.actionBusy || undefined}
                  disabled={item.actionDisabled || item.actionBusy}
                  onClick={item.onAction}
                >
                  {item.actionLabel}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
