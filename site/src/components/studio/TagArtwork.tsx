import type { CSSProperties, MouseEventHandler, Ref } from 'react';

interface TagArtworkProps {
  label: string;
  className?: string;
  removeAction?: boolean;
  removeLabel?: string;
  removalDisabled?: boolean;
  removeButtonRef?: Ref<HTMLButtonElement>;
  removeState?: string;
  removeStyle?: CSSProperties;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
}

export default function TagArtwork({
  label,
  className = '',
  removeAction = false,
  removeLabel = '',
  removalDisabled = false,
  removeButtonRef,
  removeState,
  removeStyle,
  onRemove,
}: TagArtworkProps) {
  const visibleLabel = label.trim();
  const visibleRemoveLabel = removeLabel.trim();
  if (!visibleLabel) return null;

  return (
    <span className={['tag', className.trim() || null].filter(Boolean).join(' ')}>
      <span className="tag__label" dir="auto">{visibleLabel}</span>
      {removeAction && visibleRemoveLabel && (
        <button
          ref={removeButtonRef}
          className="tag__remove"
          type="button"
          aria-label={visibleRemoveLabel}
          disabled={removalDisabled}
          data-studio-state={removeState}
          style={removeStyle}
          onClick={onRemove}
        />
      )}
    </span>
  );
}
