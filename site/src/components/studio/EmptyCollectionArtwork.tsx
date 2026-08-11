import type { ReactNode } from 'react';
import EmptyStateArtwork, { type EmptyStateHeadingElement } from './EmptyStateArtwork';

interface EmptyCollectionArtworkProps {
  title: string;
  titleElement: EmptyStateHeadingElement;
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export default function EmptyCollectionArtwork({
  title,
  message = '',
  icon,
  action,
  className = '',
  titleElement,
}: EmptyCollectionArtworkProps) {
  return (
    <EmptyStateArtwork
      className={['empty-collection', className].filter(Boolean).join(' ')}
      title={title}
      message={message}
      icon={icon}
      action={action}
      titleElement={titleElement}
    />
  );
}
