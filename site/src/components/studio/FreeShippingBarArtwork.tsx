import ProgressArtwork from './ProgressArtwork';

interface FreeShippingBarArtworkProps {
  message: string;
  accessibleLabel: string;
  value: number;
  max: number;
  valueText?: string;
  className?: string;
}

export default function FreeShippingBarArtwork({
  message,
  accessibleLabel,
  value,
  max,
  valueText = '',
  className = '',
}: FreeShippingBarArtworkProps) {
  const visibleMessage = message.trim();
  const visibleAccessibleLabel = accessibleLabel.trim();

  if (
    !visibleMessage
    || !visibleAccessibleLabel
    || !Number.isFinite(value)
    || !Number.isFinite(max)
    || max <= 0
  ) {
    return null;
  }

  const current = Math.min(max, Math.max(0, value));
  const achieved = current >= max;

  return (
    <div className={[
      'shipping-bar',
      achieved ? 'shipping-bar--achieved' : null,
      className,
    ].filter(Boolean).join(' ')}>
      <p className="shipping-bar__message">{visibleMessage}</p>
      <ProgressArtwork
        className="shipping-bar__progress"
        accessibleLabel={visibleAccessibleLabel}
        value={current}
        min={0}
        max={max}
        valueText={valueText.trim()}
      />
    </div>
  );
}
