import type { ReactNode } from 'react';
import { editorialImage } from './editorialMedia';
import PriceArtwork from './PriceArtwork';

export type ProductCardMediaRatio = 'square' | 'portrait';

interface ProductCardArtworkProps {
  title: string;
  href: string;
  imageAlt: string;
  mediaRatio?: ProductCardMediaRatio;
  mediaIndex?: number;
  vendor?: string;
  description?: string;
  hoverMediaIndex?: number;
  badgeLabel?: string;
  quickLookLabel?: string;
  quickLookText?: string;
  currentPrice: string;
  currentPriceLabel?: string;
  footerAction?: ReactNode;
  className?: string;
}

export default function ProductCardArtwork({
  title,
  href,
  imageAlt,
  mediaRatio = 'square',
  mediaIndex = 1,
  vendor = '',
  description = '',
  hoverMediaIndex,
  badgeLabel = '',
  quickLookLabel = '',
  quickLookText = 'Quick look',
  currentPrice,
  currentPriceLabel = 'Price',
  footerAction,
  className = '',
}: ProductCardArtworkProps) {
  return (
    <article
      className={['card', 'product-card', className].filter(Boolean).join(' ')}
      data-media-ratio={mediaRatio}
    >
      <div className="product-card__media">
        <img
          src={editorialImage(mediaIndex - 1)}
          alt={imageAlt}
          className={`product-card__image product-card__image--primary docs-studio__product-media docs-studio__product-media--${mediaIndex}`}
        />
        {hoverMediaIndex !== undefined && (
          <img
            src={editorialImage(hoverMediaIndex - 1)}
            alt=""
            className={`product-card__image product-card__image--hover docs-studio__product-media docs-studio__product-media--${hoverMediaIndex}`}
          />
        )}
        {badgeLabel && <div className="product-card__badges"><span className="badge">{badgeLabel}</span></div>}
        {quickLookLabel && (
          <div className="product-card__quick-look">
            <button className="btn btn--sm" type="button" aria-label={quickLookLabel}>{quickLookText}</button>
          </div>
        )}
      </div>
      <div className="product-card__body">
        {vendor && <span className="product-card__vendor" dir="auto">{vendor}</span>}
        <h3 className="product-card__title">
          <a href={href} dir="auto">{title}</a>
        </h3>
        {description && <span className="product-card__description" dir="auto">{description}</span>}
      </div>
      <div className="product-card__price">
        <PriceArtwork currentPrice={currentPrice} currentPriceLabel={currentPriceLabel} />
      </div>
      {footerAction && (
        <div className="product-card__footer">
          {footerAction}
        </div>
      )}
    </article>
  );
}
