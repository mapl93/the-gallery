import { useId, type MouseEvent, type ReactNode } from 'react';
import CartLineItemArtwork from './CartLineItemArtwork';
import StepsArtwork, { type StepsArtworkItem } from './StepsArtwork';

export interface OrderDetailLineItem {
  id: string;
  title: string;
  href?: string;
  details?: readonly string[];
  imageSrc?: string;
  imageAlt?: string;
  currentPrice?: string;
  currentPriceLabel?: string;
}

interface OrderDetailArtworkProps {
  title: string;
  meta?: ReactNode;
  trackingLabel?: string;
  trackingItems?: readonly StepsArtworkItem[];
  lineItemsLabel?: string;
  lineItems?: readonly OrderDetailLineItem[];
  className?: string;
  onLineItemNavigate?: (
    item: OrderDetailLineItem,
    event: MouseEvent<HTMLAnchorElement>,
  ) => void;
}

const trackingStatuses = new Set(['completed', 'current', 'upcoming']);

export default function OrderDetailArtwork({
  title,
  meta,
  trackingLabel = '',
  trackingItems = [],
  lineItemsLabel = '',
  lineItems = [],
  className = '',
  onLineItemNavigate,
}: OrderDetailArtworkProps) {
  const generatedId = useId();
  const visibleTitle = title.trim();
  if (!visibleTitle) return null;

  const normalizedTrackingLabel = trackingLabel.trim();
  const normalizedTrackingItems = trackingItems.map((item) => ({
    ...item,
    id: item.id.trim(),
    title: item.title.trim(),
    description: item.description?.trim(),
  }));
  const trackingIds = new Set(normalizedTrackingItems.map(({ id }) => id));
  const hasCompleteTracking = Boolean(normalizedTrackingLabel)
    && normalizedTrackingItems.length > 0
    && trackingIds.size === normalizedTrackingItems.length
    && normalizedTrackingItems.filter(({ status }) => status === 'current').length <= 1
    && normalizedTrackingItems.every((item) => (
      Boolean(item.id && item.title) && trackingStatuses.has(item.status)
    ));

  const normalizedLineItemsLabel = lineItemsLabel.trim();
  const normalizedLineItems = lineItems.map((item) => ({
    ...item,
    id: item.id.trim(),
    title: item.title.trim(),
    href: item.href?.trim(),
    details: item.details?.map((detail) => detail.trim()).filter(Boolean),
    imageSrc: item.imageSrc?.trim(),
    imageAlt: item.imageAlt?.trim(),
    currentPrice: item.currentPrice?.trim(),
    currentPriceLabel: item.currentPriceLabel?.trim(),
  }));
  const lineItemIds = new Set(normalizedLineItems.map(({ id }) => id));
  const hasCompleteLineItems = Boolean(normalizedLineItemsLabel)
    && normalizedLineItems.length > 0
    && lineItemIds.size === normalizedLineItems.length
    && normalizedLineItems.every((item) => Boolean(item.id && item.title));

  const titleId = `${generatedId}-order-detail-title`;

  return (
    <section
      className={['order-detail', className].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
    >
      <header className="order-detail__header">
        <h2 className="order-detail__title" id={titleId}>{visibleTitle}</h2>
        {meta && <div className="order-detail__meta">{meta}</div>}
      </header>
      {hasCompleteTracking && (
        <StepsArtwork
          className="order-detail__tracking"
          label={normalizedTrackingLabel}
          items={normalizedTrackingItems}
        />
      )}
      {hasCompleteLineItems && (
        <section className="order-detail__items" aria-label={normalizedLineItemsLabel}>
          <ul className="cart-lines">
            {normalizedLineItems.map((item) => (
              <CartLineItemArtwork
                className="order-detail__line-item"
                lineKey={item.id}
                title={item.title}
                href={item.href}
                onNavigate={(event) => onLineItemNavigate?.(item, event)}
                details={item.details?.map((detail, index) => <span key={`${item.id}-${index}`}>{detail}</span>)}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                currentPrice={item.currentPrice}
                currentPriceLabel={item.currentPriceLabel}
                key={item.id}
              />
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
