import type { MouseEvent, ReactNode } from 'react';

export interface AccountDashboardDestination {
  id: string;
  title: string;
  description?: string;
  href: string;
  linkLabel: string;
  icon?: ReactNode;
}

interface AccountDashboardArtworkProps {
  id: string;
  greeting: string;
  headerActions?: ReactNode;
  destinations: readonly AccountDashboardDestination[];
  className?: string;
  onNavigate?: (
    destination: AccountDashboardDestination,
    event: MouseEvent<HTMLAnchorElement>,
  ) => void;
}

export default function AccountDashboardArtwork({
  id,
  greeting,
  headerActions,
  destinations,
  className = '',
  onNavigate,
}: AccountDashboardArtworkProps) {
  const visibleId = id.trim();
  const visibleGreeting = greeting.trim();
  const normalizedDestinations = destinations.map((destination) => ({
    ...destination,
    id: destination.id.trim(),
    title: destination.title.trim(),
    description: destination.description?.trim() ?? '',
    href: destination.href.trim(),
    linkLabel: destination.linkLabel.trim(),
  }));
  const destinationIds = new Set(normalizedDestinations.map(({ id: destinationId }) => destinationId));
  const hasCompleteDestinations = normalizedDestinations.length > 0
    && destinationIds.size === normalizedDestinations.length
    && normalizedDestinations.every(({ id: destinationId, title, href, linkLabel }) => (
      Boolean(destinationId && title && href && linkLabel)
    ));

  if (!visibleId || !visibleGreeting || !hasCompleteDestinations) return null;

  const titleId = `${visibleId}-title`;

  return (
    <section
      className={['account-dashboard', className].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
    >
      <header className="account-dashboard__header">
        <h2 className="account-dashboard__greeting" id={titleId}>{visibleGreeting}</h2>
        {headerActions && (
          <div className="account-dashboard__actions">{headerActions}</div>
        )}
      </header>

      <ul className="account-dashboard__grid">
        {normalizedDestinations.map((destination) => (
          <li className="card account-card" key={destination.id}>
            <div className="card__body account-card__body">
              {destination.icon}
              <h3 className="account-card__title">{destination.title}</h3>
              {destination.description && (
                <p className="account-card__description">{destination.description}</p>
              )}
            </div>
            <div className="card__footer account-card__footer">
              <a
                className="link account-card__link"
                href={destination.href}
                onClick={(event) => onNavigate?.(destination, event)}
              >
                {destination.linkLabel}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
