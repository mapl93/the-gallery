import type { ReactNode } from 'react';

interface CartNoteArtworkProps {
  toggleLabel: string;
  expanded: boolean;
  field?: ReactNode;
  className?: string;
  onExpandedChange?: (expanded: boolean) => void;
}

export default function CartNoteArtwork({
  toggleLabel,
  expanded,
  field,
  className = '',
  onExpandedChange,
}: CartNoteArtworkProps) {
  const visibleToggleLabel = toggleLabel.trim();
  if (!visibleToggleLabel || !field) return null;

  return (
    <details
      className={['cart-note', className].filter(Boolean).join(' ')}
      open={expanded}
      onToggle={(event) => onExpandedChange?.(event.currentTarget.open)}
    >
      <summary className="cart-note__toggle">{visibleToggleLabel}</summary>
      {field}
    </details>
  );
}
