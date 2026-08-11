import type { ElementType } from 'react';
import BadgeArtwork from './BadgeArtwork';
import PriceArtwork from './PriceArtwork';
import { editorialMedia } from './editorialMedia';

type WorkshopHeadingLevel = 2 | 3 | 4 | 5 | 6;
type WorkshopAvailabilityVariant = 'info' | 'success' | 'warning' | 'error';

export interface WorkshopListingRecord {
  id: string;
  title: string;
  scheduleLabel?: string;
  scheduleDateTime?: string;
  level?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  price?: string;
  priceLabel?: string;
  availability?: string;
  availabilityVariant?: WorkshopAvailabilityVariant;
  actionLabel?: string;
  actionHref?: string;
}

interface WorkshopListingArtworkProps {
  id: string;
  workshops: readonly WorkshopListingRecord[];
  headingLevel?: WorkshopHeadingLevel;
  className?: string;
}

const workshopFixtureRecords: readonly WorkshopListingRecord[] = [
  {
    id: 'wheel-forming-foundations',
    title: 'Wheel forming foundations',
    scheduleLabel: 'Saturday, 15 August · 14:00 ART',
    scheduleDateTime: '2026-08-15T14:00:00-03:00',
    level: 'Introductory · In person',
    description: 'A small-group studio session covering centering and the first cylinder.',
    image: {
      src: editorialMedia.potterAtWheel,
      alt: 'A potter centering clay on a wheel during a studio session.',
      width: 1800,
      height: 2700,
    },
    price: 'ARS\u00a048.000',
    priceLabel: 'Price',
    availability: '2 places left',
    availabilityVariant: 'warning',
    actionLabel: 'View workshop',
    actionHref: '/components/workshop-listing',
  },
  {
    id: 'surface-and-glaze-lab',
    title: 'Surface and glaze lab',
    scheduleLabel: 'Sunday, 23 August · 10:30 ART',
    scheduleDateTime: '2026-08-23T10:30:00-03:00',
    level: 'Intermediate · In person',
    description: 'Test layered surfaces and document one repeatable glaze combination.',
    image: {
      src: editorialMedia.ceramicsShelves,
      alt: 'Ceramic test pieces and vessels arranged on studio shelves.',
      width: 1800,
      height: 2700,
    },
    price: 'ARS\u00a062.000',
    priceLabel: 'Price',
    availability: 'Workshop full',
    availabilityVariant: 'error',
    actionLabel: 'View workshop',
    actionHref: '/components/workshop-listing',
  },
];

export function buildWorkshopListingFixture(): WorkshopListingRecord[] {
  return workshopFixtureRecords.map((record) => ({
    ...record,
    image: record.image ? { ...record.image } : undefined,
  }));
}

export default function WorkshopListingArtwork({
  id,
  workshops,
  headingLevel = 2,
  className = '',
}: WorkshopListingArtworkProps) {
  const rootId = id.trim();
  const seenIds = new Set<string>();
  const visibleWorkshops = workshops.map((workshop) => ({
    ...workshop,
    id: workshop.id.trim(),
    title: workshop.title.trim(),
    scheduleLabel: workshop.scheduleLabel?.trim() ?? '',
    scheduleDateTime: workshop.scheduleDateTime?.trim() ?? '',
    level: workshop.level?.trim() ?? '',
    description: workshop.description?.trim() ?? '',
    price: workshop.price?.trim() ?? '',
    priceLabel: workshop.priceLabel?.trim() ?? '',
    availability: workshop.availability?.trim() ?? '',
    actionLabel: workshop.actionLabel?.trim() ?? '',
    actionHref: workshop.actionHref?.trim() ?? '',
  })).filter((workshop) => {
    if (!workshop.id || !workshop.title || seenIds.has(workshop.id)) return false;
    seenIds.add(workshop.id);
    return true;
  });

  if (!rootId || visibleWorkshops.length === 0) return null;

  const Heading = `h${headingLevel}` as ElementType;

  return (
    <ul
      className={['workshop-grid', className.trim() || null].filter(Boolean).join(' ')}
      id={rootId}
    >
      {visibleWorkshops.map((workshop, index) => {
        const titleId = `${rootId}-${workshop.id}-title`;
        const hasFooter = Boolean(
          workshop.price || workshop.availability || (workshop.actionLabel && workshop.actionHref)
        );

        return (
          <li className="workshop-grid__item" key={workshop.id}>
            <article className="card workshop-card" aria-labelledby={titleId}>
              {workshop.image?.src && (
                <div className="card__media workshop-card__image">
                  <img
                    src={workshop.image.src}
                    alt={workshop.image.alt}
                    width={workshop.image.width}
                    height={workshop.image.height}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              )}
              <div className="card__body workshop-card__body">
                {workshop.scheduleLabel && (
                  workshop.scheduleDateTime
                    ? (
                      <time
                        className="workshop-card__date"
                        dateTime={workshop.scheduleDateTime}
                        dir="auto"
                      >
                        {workshop.scheduleLabel}
                      </time>
                    )
                    : <p className="workshop-card__date" dir="auto">{workshop.scheduleLabel}</p>
                )}
                <Heading className="workshop-card__title" id={titleId} dir="auto">
                  {workshop.title}
                </Heading>
                {workshop.level && (
                  <p className="workshop-card__level" dir="auto">{workshop.level}</p>
                )}
                {workshop.description && (
                  <p className="workshop-card__description" dir="auto">
                    {workshop.description}
                  </p>
                )}
              </div>
              {hasFooter && (
                <footer className="card__footer workshop-card__footer">
                  {(workshop.price || workshop.availability) && (
                    <div className="workshop-card__meta">
                      {workshop.price && (
                        <PriceArtwork
                          className="workshop-card__price"
                          currentPrice={workshop.price}
                          currentPriceLabel={workshop.priceLabel}
                        />
                      )}
                      {workshop.availability && (
                        <BadgeArtwork
                          className="workshop-card__spots"
                          label={workshop.availability}
                          variant={workshop.availabilityVariant ?? 'info'}
                        />
                      )}
                    </div>
                  )}
                  {workshop.actionLabel && workshop.actionHref && (
                    <a
                      className="btn btn--outline btn--sm workshop-card__action"
                      href={workshop.actionHref}
                      aria-label={`${workshop.actionLabel}: ${workshop.title}`}
                    >
                      {workshop.actionLabel}
                    </a>
                  )}
                </footer>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
