import type { ReactNode } from 'react';

export type AvatarArtworkSize = 'sm' | 'default' | 'lg' | 'xl';

interface AvatarArtworkProps {
  name: string;
  content: ReactNode;
  size?: AvatarArtworkSize;
  redundant?: boolean;
  className?: string;
}

export default function AvatarArtwork({
  name,
  content,
  size = 'default',
  redundant = false,
  className = '',
}: AvatarArtworkProps) {
  const accessibleName = name.trim();
  if (!accessibleName || content == null) return null;

  const classes = [
    'avatar',
    size === 'default' ? '' : `avatar--${size}`,
    className.trim(),
  ].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      role={redundant ? undefined : 'img'}
      aria-label={redundant ? undefined : accessibleName}
      aria-hidden={redundant || undefined}
    >
      {content}
    </span>
  );
}
