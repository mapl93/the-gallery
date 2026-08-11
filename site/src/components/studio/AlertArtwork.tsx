import type { ReactNode, Ref } from 'react';

export type AlertArtworkVariant = 'info' | 'success' | 'warning' | 'error';
export type AlertArtworkAnnouncement = 'none' | 'polite' | 'assertive';

interface AlertArtworkProps {
  message: string;
  title?: string;
  variant?: AlertArtworkVariant;
  announcement?: AlertArtworkAnnouncement;
  icon?: ReactNode;
  dismissAction?: ReactNode;
  className?: string;
  rootRef?: Ref<HTMLDivElement>;
  tabIndex?: number;
}

export default function AlertArtwork({
  message,
  title = '',
  variant = 'info',
  announcement = 'none',
  icon,
  dismissAction,
  className = '',
  rootRef,
  tabIndex,
}: AlertArtworkProps) {
  const visibleMessage = message.trim();
  const visibleTitle = title.trim();
  if (!visibleMessage) return null;

  const role = announcement === 'assertive'
    ? 'alert'
    : announcement === 'polite'
      ? 'status'
      : undefined;

  return (
    <div
      ref={rootRef}
      className={['alert', `alert--${variant}`, className].filter(Boolean).join(' ')}
      role={role}
      aria-live={announcement === 'none' ? undefined : announcement}
      tabIndex={tabIndex}
    >
      {icon}
      <div className="alert__content">
        {visibleTitle && <p className="alert__title">{visibleTitle}</p>}
        <p className="alert__message">{visibleMessage}</p>
      </div>
      {dismissAction}
    </div>
  );
}
