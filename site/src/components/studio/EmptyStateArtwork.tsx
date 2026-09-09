import type { ReactNode } from 'react';

export type EmptyStateHeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface EmptyStateArtworkProps {
  title: string;
  titleElement: EmptyStateHeadingElement;
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  titleId?: string;
}

export default function EmptyStateArtwork({
  title,
  message = '',
  icon,
  action,
  className = '',
  titleId,
  titleElement,
}: EmptyStateArtworkProps) {
  if (!title.trim() || !/^h[1-6]$/.test(titleElement)) return null;

  const Title = titleElement;

  return (
    <div className={['empty-state', className].filter(Boolean).join(' ')}>
      {icon && (
        <div className="empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <Title className="empty-state__title" id={titleId}>{title}</Title>
      {message.trim() && <p className="empty-state__message">{message}</p>}
      {action}
    </div>
  );
}
