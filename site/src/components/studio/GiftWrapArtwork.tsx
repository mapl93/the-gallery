import type { ReactNode } from 'react';
import CheckboxArtwork from './CheckboxArtwork';

interface GiftWrapArtworkProps {
  label: string;
  selected?: boolean;
  price?: ReactNode;
  name?: string;
  value?: string;
  disabled?: boolean;
  describedBy?: string;
  className?: string;
  onSelectedChange?: (selected: boolean) => void;
}

export default function GiftWrapArtwork({
  label,
  selected = false,
  price,
  name = '',
  value = 'on',
  disabled = false,
  describedBy,
  className = '',
  onSelectedChange,
}: GiftWrapArtworkProps) {
  const visibleLabel = label.trim();
  if (!visibleLabel) return null;

  return (
    <CheckboxArtwork
      className={['gift-wrap', className].filter(Boolean).join(' ')}
      labelClassName="gift-wrap__info"
      label={(
        <>
          <span className="gift-wrap__label">{visibleLabel}</span>
          {price && <span className="gift-wrap__price">{price}</span>}
        </>
      )}
      checked={selected}
      name={name}
      value={value}
      disabled={disabled}
      describedBy={describedBy}
      onChange={(event) => onSelectedChange?.(event.target.checked)}
    />
  );
}
