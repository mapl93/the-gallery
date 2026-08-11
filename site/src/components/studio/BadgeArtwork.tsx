interface BadgeArtworkProps {
  label: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  announceChanges?: boolean;
  className?: string;
}

export default function BadgeArtwork({
  label,
  variant = 'info',
  announceChanges = false,
  className = '',
}: BadgeArtworkProps) {
  const visibleLabel = label.trim();
  if (!visibleLabel) return null;

  return (
    <span
      className={[
        'badge',
        variant === 'info' ? null : `badge--${variant}`,
        className.trim() || null,
      ].filter(Boolean).join(' ')}
      role={announceChanges ? 'status' : undefined}
      dir="auto"
    >
      {visibleLabel}
    </span>
  );
}
