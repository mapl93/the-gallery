import type { MouseEvent } from 'react';

export type OrderHistoryStatusVariant = 'info' | 'success' | 'warning' | 'error';

export interface OrderHistoryItem {
  id: string;
  numberLabel: string;
  href: string;
  dateLabel: string;
  dateTime: string;
  statusLabel: string;
  statusVariant?: OrderHistoryStatusVariant;
  totalLabel: string;
}

interface OrderHistoryArtworkProps {
  label?: string;
  orders: readonly OrderHistoryItem[];
  className?: string;
  onNavigate?: (
    order: OrderHistoryItem,
    event: MouseEvent<HTMLAnchorElement>,
  ) => void;
}

const statusVariants = new Set<OrderHistoryStatusVariant>([
  'info',
  'success',
  'warning',
  'error',
]);

export default function OrderHistoryArtwork({
  label = '',
  orders,
  className = '',
  onNavigate,
}: OrderHistoryArtworkProps) {
  const visibleLabel = label.trim();
  const normalizedOrders = orders.map((order) => ({
    ...order,
    id: order.id.trim(),
    numberLabel: order.numberLabel.trim(),
    href: order.href.trim(),
    dateLabel: order.dateLabel.trim(),
    dateTime: order.dateTime.trim(),
    statusLabel: order.statusLabel.trim(),
    statusVariant: order.statusVariant ?? 'info',
    totalLabel: order.totalLabel.trim(),
  }));
  const orderIds = new Set(normalizedOrders.map(({ id }) => id));
  const hasCompleteOrders = normalizedOrders.length > 0
    && orderIds.size === normalizedOrders.length
    && normalizedOrders.every((order) => (
      Boolean(
        order.id
        && order.numberLabel
        && order.href
        && order.dateLabel
        && order.dateTime
        && order.statusLabel
        && order.totalLabel,
      )
      && statusVariants.has(order.statusVariant)
    ));

  if (!hasCompleteOrders) return null;

  const Root = visibleLabel ? 'section' : 'div';

  return (
    <Root
      className={['order-list', className].filter(Boolean).join(' ')}
      aria-label={visibleLabel || undefined}
    >
      <ul className="order-list__items">
        {normalizedOrders.map((order) => (
          <li className="order-row" key={order.id}>
            <a
              className="link order-row__number"
              href={order.href}
              onClick={(event) => onNavigate?.(order, event)}
            >
              {order.numberLabel}
            </a>
            <time className="order-row__date" dateTime={order.dateTime}>
              {order.dateLabel}
            </time>
            <span
              className={[
                'badge',
                'order-row__status',
                order.statusVariant === 'info' ? '' : `badge--${order.statusVariant}`,
              ].filter(Boolean).join(' ')}
            >
              {order.statusLabel}
            </span>
            <span className="order-row__total"><bdi>{order.totalLabel}</bdi></span>
          </li>
        ))}
      </ul>
    </Root>
  );
}
