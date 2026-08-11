interface StatArtworkProps {
  as?: 'div' | 'li';
  value: string;
  label: string;
  change?: string;
  changeDirection?: 'neutral' | 'up' | 'down';
  alternateDigits?: boolean;
  slashedZero?: boolean;
  tabularNumbers?: boolean;
  contextualAlternates?: boolean;
  fractions?: boolean;
  className?: string;
}

export default function StatArtwork({
  as: Root = 'div',
  value,
  label,
  change = '',
  changeDirection = 'neutral',
  alternateDigits = false,
  slashedZero = true,
  tabularNumbers = true,
  contextualAlternates = true,
  fractions = false,
  className = '',
}: StatArtworkProps) {
  return (
    <Root
      className={['stat', className].filter(Boolean).join(' ')}
      data-stat-alternate-digits={String(alternateDigits)}
      data-stat-slashed-zero={String(slashedZero)}
      data-stat-tabular-numbers={String(tabularNumbers)}
      data-stat-contextual-alternates={String(contextualAlternates)}
      data-stat-fractions={String(fractions)}
    >
      <span className="stat__value">{value}</span>
      <span className="stat__label">{label}</span>
      {change && (
        <span
          className="stat__change"
          data-direction={changeDirection === 'neutral' ? undefined : changeDirection}
        >
          {change}
        </span>
      )}
    </Root>
  );
}
