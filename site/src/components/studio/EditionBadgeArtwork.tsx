export type EditionBadgeVariant = 'default' | 'limited';

export interface EditionBadgeFixture {
  variant: EditionBadgeVariant;
  label: string;
  number: string;
  total: string;
}

interface EditionBadgeArtworkProps {
  variant?: EditionBadgeVariant;
  label?: string;
  number?: string;
  total?: string;
  className?: string;
}

const editionBadgeFixture: EditionBadgeFixture = {
  variant: 'limited',
  label: 'Limited edition',
  number: '42',
  total: '100',
};

export function buildEditionBadgeFixture(): EditionBadgeFixture {
  return { ...editionBadgeFixture };
}

export default function EditionBadgeArtwork({
  variant = 'default',
  label = '',
  number = '',
  total = '',
  className = '',
}: EditionBadgeArtworkProps) {
  const visibleLabel = label.trim();
  const visibleNumber = number.trim();
  const visibleTotal = total.trim();
  const hasCount = Boolean(visibleNumber || visibleTotal);

  if (!visibleLabel && !hasCount) return null;

  return (
    <p
      className={[
        'edition-badge',
        variant === 'limited' ? 'edition-badge--limited' : null,
        className.trim() || null,
      ].filter(Boolean).join(' ')}
    >
      {visibleLabel && (
        <bdi className="edition-badge__label" dir="auto">{visibleLabel}</bdi>
      )}
      {hasCount && (
        <span className="edition-badge__count">
          {visibleNumber && (
            <bdi className="edition-badge__number" dir="auto">{visibleNumber}</bdi>
          )}
          {visibleNumber && visibleTotal && (
            <span className="edition-badge__separator">/</span>
          )}
          {visibleTotal && (
            <bdi className="edition-badge__total" dir="auto">{visibleTotal}</bdi>
          )}
        </span>
      )}
    </p>
  );
}
