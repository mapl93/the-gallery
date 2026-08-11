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
  subtitle?: string;
  hoverMediaIndex?: number;
  badgeLabel?: string;
  quickAddLabel?: string;
  quickAddText?: string;
  currentPrice?: string;
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
  subtitle = '',
  hoverMediaIndex,
  badgeLabel = '',
  quickAddLabel = '',
  quickAddText = 'Quick add',
  currentPrice = '',
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
        {quickAddLabel && (
          <div className="product-card__quick-add">
            <button className="btn btn--full" type="button" aria-label={quickAddLabel}>{quickAddText}</button>
          </div>
        )}
      </div>
      <div className="product-card__body">
        {vendor && <span className="product-card__vendor" dir="auto">{vendor}</span>}
        <h3 className="product-card__title">
          <a href={href} dir="auto">{title}</a>
        </h3>
        {subtitle && <span className="product-card__subtitle" dir="auto">{subtitle}</span>}
      </div>
      {(currentPrice || footerAction) && (
        <div className="product-card__footer">
          {currentPrice && (
            <PriceArtwork currentPrice={currentPrice} currentPriceLabel={currentPriceLabel} />
          )}
          {footerAction}
        </div>
      )}
    </article>
  );
}
