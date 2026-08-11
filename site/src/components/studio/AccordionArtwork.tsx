import { ChevronDown } from 'lucide-react';
import type { ElementType, ReactNode } from 'react';

export interface AccordionArtworkItem {
  key: string;
  title: ReactNode;
  content: ReactNode;
  className?: string;
  disabled?: boolean;
}

interface AccordionArtworkProps {
  className?: string;
  idPrefix: string;
  items: AccordionArtworkItem[];
  expandedItems: boolean[];
  onToggle: (index: number) => void;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  regionPanels?: boolean;
}

export default function AccordionArtwork({
  className = '',
  idPrefix,
  items,
  expandedItems,
  onToggle,
  headingLevel = 3,
  regionPanels = false,
}: AccordionArtworkProps) {
  const Heading = `h${headingLevel}` as ElementType;

  return (
    <div className={['accordion', className].filter(Boolean).join(' ')}>
      {items.map((item, index) => {
        const expanded = expandedItems[index] === true;
        const triggerId = `${idPrefix}-trigger-${index}`;
        const panelId = `${idPrefix}-panel-${index}`;

        return (
          <div
            className={['accordion__item', item.className].filter(Boolean).join(' ')}
            key={item.key}
          >
            <Heading className="accordion__heading">
              <button
                className="accordion__trigger"
                id={triggerId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => onToggle(index)}
              >
                <span>{item.title}</span>
                <ChevronDown className="accordion__icon" aria-hidden="true" />
              </button>
            </Heading>
            <div
              className="accordion__panel"
              id={panelId}
              role={regionPanels ? 'region' : undefined}
              aria-labelledby={regionPanels ? triggerId : undefined}
              hidden={!expanded}
            >
              <div className="accordion__panel-inner">
                <div className="accordion__content">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
