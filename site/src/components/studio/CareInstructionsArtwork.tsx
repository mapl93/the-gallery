import type { ElementType, ReactNode } from 'react';
import { CircleCheck, Sparkles, Waves } from 'lucide-react';

type CareInstructionsHeadingLevel = 2 | 3 | 4 | 5 | 6;
type CareInstructionsVariant = 'default' | 'do' | 'dont';

export interface CareInstructionsArtworkItem {
  key: string;
  label: string;
  description?: string;
  icon?: ReactNode;
}

interface CareInstructionsArtworkProps {
  id: string;
  title?: string;
  items: readonly CareInstructionsArtworkItem[];
  variant?: CareInstructionsVariant;
  headingLevel?: CareInstructionsHeadingLevel;
  className?: string;
}

const careInstructionsFixtureRecords = [
  {
    key: 'piece-guidance',
    label: 'Follow the care card',
    description: 'Use the guidance supplied for the individual piece.',
    Icon: Waves,
  },
  {
    key: 'appliance-guidance',
    label: 'Confirm appliance use',
    description: 'Use a dishwasher or microwave only when the piece record allows it.',
    Icon: CircleCheck,
  },
  {
    key: 'treatment-guidance',
    label: 'Ask before treating',
    description: 'Contact the maker before using abrasive, chemical, or repair treatments.',
    Icon: Sparkles,
  },
] as const;

export function buildCareInstructionsFixture(): CareInstructionsArtworkItem[] {
  return careInstructionsFixtureRecords.map(({ Icon, ...item }) => ({
    ...item,
    icon: <Icon />,
  }));
}

export default function CareInstructionsArtwork({
  id,
  title = '',
  items,
  variant = 'default',
  headingLevel = 2,
  className = '',
}: CareInstructionsArtworkProps) {
  const rootId = id.trim();
  const visibleTitle = title.trim();
  const visibleItems = items.map((item) => ({
    ...item,
    key: item.key.trim(),
    label: item.label.trim(),
    description: item.description?.trim(),
  })).filter((item) => item.key && item.label);
  if (!rootId || visibleItems.length === 0) return null;

  const Root = (visibleTitle ? 'section' : 'div') as ElementType;
  const Heading = `h${headingLevel}` as ElementType;
  const titleId = `${rootId}-title`;
  const variantClass = variant === 'do' || variant === 'dont'
    ? `care-instructions--${variant}`
    : '';

  return (
    <Root
      className={['care-instructions', variantClass, className.trim() || null]
        .filter(Boolean)
        .join(' ')}
      aria-labelledby={visibleTitle ? titleId : undefined}
    >
      {visibleTitle && (
        <header className="care-instructions__header">
          <Heading className="care-instructions__title" id={titleId} dir="auto">
            {visibleTitle}
          </Heading>
        </header>
      )}
      <ul
        className="care-instructions__list care-instructions__grid"
        role="list"
      >
        {visibleItems.map((item) => (
          <li className="care-item" key={item.key}>
            {item.icon != null && (
              <span className="care-item__icon" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <p className="care-item__label" dir="auto">{item.label}</p>
            {item.description && (
              <p className="care-item__description" dir="auto">
                {item.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Root>
  );
}
