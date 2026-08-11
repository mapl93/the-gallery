import { Check } from 'lucide-react';

export type StepsArtworkStatus = 'completed' | 'current' | 'upcoming';

export interface StepsArtworkItem {
  id: string;
  title: string;
  description?: string;
  status: StepsArtworkStatus;
}

interface StepsArtworkProps {
  className?: string;
  label: string;
  orientation?: 'horizontal' | 'vertical';
  items: StepsArtworkItem[];
}

export default function StepsArtwork({
  className = '',
  label,
  orientation = 'horizontal',
  items,
}: StepsArtworkProps) {
  const accessibleLabel = label.trim();
  if (!accessibleLabel || items.length === 0) return null;

  return (
    <ol
      className={[
        'steps',
        orientation === 'vertical' ? 'steps--vertical' : '',
        className,
      ].filter(Boolean).join(' ')}
      aria-label={accessibleLabel}
    >
      {items.map((item, index) => {
        const completed = item.status === 'completed';
        const current = item.status === 'current';
        return (
          <li
            className={[
              'steps__item',
              completed ? 'steps__item--completed' : '',
              current ? 'steps__item--active' : '',
            ].filter(Boolean).join(' ')}
            aria-current={current ? 'step' : undefined}
            key={item.id}
          >
            <span className="steps__indicator" aria-hidden="true">
              {completed ? <Check /> : index + 1}
            </span>
            <span className="steps__content">
              <span className="steps__title">{item.title}</span>
              {item.description && <span className="steps__description">{item.description}</span>}
              {completed && <span className="steps__state visually-hidden">Completed</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
