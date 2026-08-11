import type { MouseEventHandler, ReactNode } from 'react';
import PriceArtwork from './PriceArtwork';
import QuantitySelectorArtwork from './QuantitySelectorArtwork';

interface CartLineItemArtworkProps {
  title: string;
  href?: string;
  onNavigate?: MouseEventHandler<HTMLAnchorElement>;
  details?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  currentPrice?: string;
  currentPriceLabel?: string;
  compareAtPrice?: string;
  compareAtPriceLabel?: string;
  unitPrice?: string;
  unitPriceLabel?: string;
  quantity?: number | null;
  quantityMin?: number | null;
  quantityMax?: number | null;
  quantityName?: string;
  onQuantityChange?: (value: number | null) => void;
  removeLabel?: string;
  removeAccessibleLabel?: string;
  removePending?: boolean;
  onRemove?: () => void;
  saveLabel?: string;
  saveAccessibleLabel?: string;
  savePending?: boolean;
  saveDisabled?: boolean;
  onSave?: () => void;
  className?: string;
  lineKey?: string;
}

export default function CartLineItemArtwork({
  title,
  href = '',
  onNavigate,
  details,
  imageSrc = '',
  imageAlt = '',
  imageClassName = '',
  currentPrice = '',
  currentPriceLabel = '',
  compareAtPrice = '',
  compareAtPriceLabel = '',
  unitPrice = '',
  unitPriceLabel = '',
  quantity,
  quantityMin = null,
  quantityMax = null,
  quantityName = '',
  onQuantityChange,
  removeLabel = '',
  removeAccessibleLabel = '',
  removePending = false,
  onRemove,
  saveLabel = '',
  saveAccessibleLabel = '',
  savePending = false,
  saveDisabled = false,
  onSave,
  className = '',
  lineKey = '',
}: CartLineItemArtworkProps) {
  const classes = ['cart-line', className].filter(Boolean).join(' ');
  const showQuantity = quantity !== undefined && onQuantityChange;
  const showActions = Boolean(removeLabel || saveLabel);

  return (
    <li className={classes} data-line-key={lineKey || undefined}>
      {imageSrc && (
        <img
          className={['cart-line__image', imageClassName].filter(Boolean).join(' ')}
          src={imageSrc}
          alt={imageAlt}
        />
      )}
      <div className="cart-line__info">
        {href ? (
          <a className="cart-line__title" href={href} onClick={onNavigate}>{title}</a>
        ) : (
          <span className="cart-line__title">{title}</span>
        )}
        {details && <div className="cart-line__details">{details}</div>}
        {showQuantity && (
          <QuantitySelectorArtwork
            className="cart-line__quantity"
            value={quantity}
            min={quantityMin}
            max={quantityMax}
            name={quantityName}
            accessibleLabel={`${title} quantity`}
            groupLabel={`${title} quantity selector`}
            decrementLabel={`Decrease ${title} quantity`}
            incrementLabel={`Increase ${title} quantity`}
            onValueChange={onQuantityChange}
          />
        )}
        {showActions && (
          <div className="cart-line__actions">
            {removeLabel && (
              <button
                className="btn btn--link cart-line__remove"
                type="button"
                aria-label={removeAccessibleLabel || removeLabel}
                aria-busy={removePending || undefined}
                disabled={removePending}
                onClick={onRemove}
              >
                {removeLabel}
              </button>
            )}
            {saveLabel && (
              <button
                className="btn btn--link cart-line__save"
                type="button"
                aria-label={saveAccessibleLabel || saveLabel}
                aria-busy={savePending || undefined}
                disabled={saveDisabled || savePending}
                onClick={onSave}
              >
                {saveLabel}
              </button>
            )}
          </div>
        )}
      </div>
      {currentPrice && (
        <div className="cart-line__price">
          <PriceArtwork
            currentPrice={currentPrice}
            currentPriceLabel={currentPriceLabel}
            compareAtPrice={compareAtPrice}
            compareAtPriceLabel={compareAtPriceLabel}
            unitPrice={unitPrice}
            unitPriceLabel={unitPriceLabel}
            variant={compareAtPrice ? 'on-sale' : 'default'}
          />
        </div>
      )}
    </li>
  );
}
