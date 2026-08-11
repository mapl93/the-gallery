import { useEffect, useRef } from 'react';

export type CountdownUnit = 'days' | 'hours' | 'minutes' | 'seconds';

interface CountdownArtworkProps {
  className?: string;
  deadline: string;
  units: string;
  fallbackText: string;
  expiredAnnouncement?: string;
}

const unitFallbacks: Record<CountdownUnit, string> = {
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
};

const units: CountdownUnit[] = ['days', 'hours', 'minutes', 'seconds'];

export default function CountdownArtwork({
  className,
  deadline,
  units: selectedUnits,
  fallbackText,
  expiredAnnouncement = '',
}: CountdownArtworkProps) {
  const rootRef = useRef<HTMLTimeElement>(null);

  useEffect(() => {
    if (rootRef.current) window.TheGallery?.enhanceCountdowns(rootRef.current);
  }, [deadline, selectedUnits, expiredAnnouncement]);

  return (
    <time
      ref={rootRef}
      className={['countdown', className].filter(Boolean).join(' ')}
      dateTime={deadline}
      data-countdown=""
      data-countdown-units={selectedUnits}
      data-countdown-expired-announcement={expiredAnnouncement}
    >
      <span className="countdown__fallback">{fallbackText}</span>
      <span className="countdown__display" aria-hidden="true" hidden>
        {units.map((unit) => (
          <span className="countdown__item" data-countdown-unit={unit} key={unit}>
            <span className="countdown__separator" aria-hidden="true" hidden>:</span>
            <span className="countdown__segment">
              <span className="countdown__number">00</span>
              <span className="countdown__label">{unitFallbacks[unit]}</span>
            </span>
          </span>
        ))}
      </span>
      <span className="countdown__announcement" aria-live="polite" aria-atomic="true" />
    </time>
  );
}
