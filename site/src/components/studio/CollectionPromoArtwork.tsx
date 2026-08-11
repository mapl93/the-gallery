import { ArrowRight } from 'lucide-react';
import type { ElementType, MouseEvent, ReactNode } from 'react';

export type CollectionPromoVariant = 'default' | 'span-2';
type CollectionPromoHeadingLevel = 2 | 3 | 4 | 5 | 6;

interface CollectionPromoArtworkProps {
  className?: string;
  variant?: CollectionPromoVariant;
  media?: ReactNode;
  eyebrow?: string;
  title: string;
  headingLevel?: CollectionPromoHeadingLevel;
  ctaLabel?: string;
  href?: string;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export default function CollectionPromoArtwork({
  className = '',
  variant = 'default',
  media,
  eyebrow = '',
  title,
  headingLevel = 2,
  ctaLabel = '',
  href = '',
  onNavigate,
}: CollectionPromoArtworkProps) {
  const visibleTitle = title.trim();
  const visibleEyebrow = eyebrow.trim();
  const visibleCtaLabel = ctaLabel.trim();
  const destination = href.trim();

  if (!visibleTitle) return null;

  const Heading = `h${headingLevel}` as ElementType;
  const hasCta = Boolean(visibleCtaLabel && destination);

  return (
    <article
      className={[
        'collection-promo',
        variant === 'span-2' ? 'collection-promo--span-2' : null,
        className.trim() || null,
      ].filter(Boolean).join(' ')}
    >
      {media}
      {media != null && <div className="collection-promo__overlay" aria-hidden="true" />}
      <div className="collection-promo__content">
        {visibleEyebrow && (
          <p className="collection-promo__eyebrow" dir="auto">{visibleEyebrow}</p>
        )}
        <Heading className="collection-promo__title" dir="auto">{visibleTitle}</Heading>
        {hasCta && (
          <a
            className="link collection-promo__cta"
            href={destination}
            onClick={onNavigate}
          >
            <span dir="auto">{visibleCtaLabel}</span>
            <ArrowRight className="collection-promo__cta-icon" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
