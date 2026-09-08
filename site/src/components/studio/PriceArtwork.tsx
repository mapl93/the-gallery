interface PriceArtworkProps {
  currentPrice: string;
  currentPriceLabel?: string;
  compareAtPrice?: string;
  compareAtPriceLabel?: string;
  unitPrice?: string;
  unitPriceLabel?: string;
  variant?: string;
  className?: string | null;
  alternateDigits?: boolean;
  tabularNumbers?: boolean;
  contextualAlternates?: boolean;
  fractions?: boolean;
}

export default function PriceArtwork({
  currentPrice,
  currentPriceLabel = '',
  compareAtPrice = '',
  compareAtPriceLabel = '',
  unitPrice = '',
  unitPriceLabel = '',
  variant = 'default',
  className = null,
  alternateDigits = false,
  tabularNumbers = true,
  contextualAlternates = true,
  fractions = false,
}: PriceArtworkProps) {
  const classes = ['price', className].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      data-price-alternate-digits={String(alternateDigits)}
      data-price-tabular-numbers={String(tabularNumbers)}
      data-price-contextual-alternates={String(contextualAlternates)}
      data-price-fractions={String(fractions)}
    >
      {variant === 'on-sale' && compareAtPrice && (
        <s className="price__compare">
          {compareAtPriceLabel && (
            <span className="price__label">{compareAtPriceLabel}: </span>
          )}
          <bdi className="price__value">{compareAtPrice}</bdi>
        </s>
      )}
      <span className="price__current">
        {currentPriceLabel && (
          <span className="price__label">{currentPriceLabel}: </span>
        )}
        <bdi className="price__value">{currentPrice}</bdi>
      </span>
      {unitPrice && (
        <span className="price__unit">
          {unitPriceLabel && (
            <span className="price__label">{unitPriceLabel}: </span>
          )}
          <bdi className="price__value">{unitPrice}</bdi>
        </span>
      )}
    </span>
  );
}
