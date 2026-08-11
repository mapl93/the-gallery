import type { MouseEventHandler, ReactNode } from 'react';
import EmptyStateArtwork, { type EmptyStateHeadingElement } from './EmptyStateArtwork';

interface CartEmptyArtworkProps {
  title: string;
  titleElement: EmptyStateHeadingElement;
  message?: string;
  icon?: ReactNode;
  actionLabel?: string;
  href?: string;
  className?: string;
  onAction?: MouseEventHandler<HTMLAnchorElement>;
}

export default function CartEmptyArtwork({
  title,
  titleElement,
  message = '',
  icon,
  actionLabel = '',
  href = '',
  className = '',
  onAction,
}: CartEmptyArtworkProps) {
  const hasAction = actionLabel.trim().length > 0 && href.trim().length > 0;

  return (
    <EmptyStateArtwork
      className={['cart-empty', className].filter(Boolean).join(' ')}
      title={title}
      titleElement={titleElement}
      message={message}
      icon={icon}
      action={hasAction ? (
        <a className="btn" href={href} onClick={onAction}>{actionLabel}</a>
      ) : undefined}
    />
  );
}
