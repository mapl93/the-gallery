import { type MouseEvent } from 'react';

export interface TableOfContentsItem {
  id: string;
  label: string;
  children?: readonly TableOfContentsItem[];
}

interface TableOfContentsArtworkProps {
  label: string;
  title?: string;
  items: readonly TableOfContentsItem[];
  currentSectionId?: string;
  placement?: 'flow' | 'sticky' | string;
  className?: string;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>, item: TableOfContentsItem) => void;
}

interface NormalizedTableOfContentsItem {
  id: string;
  label: string;
  children: NormalizedTableOfContentsItem[];
}

function normalizeItems(
  items: readonly TableOfContentsItem[],
  seen = new Set<string>(),
): NormalizedTableOfContentsItem[] | null {
  if (!Array.isArray(items) || items.length === 0) return null;

  const normalized: NormalizedTableOfContentsItem[] = [];
  for (const item of items) {
    const id = String(item?.id ?? '').trim();
    const label = String(item?.label ?? '').trim();
    if (!id || !label || /[\s#]/u.test(id) || seen.has(id)) return null;
    seen.add(id);

    let children: NormalizedTableOfContentsItem[] = [];
    if (item.children !== undefined) {
      if (!Array.isArray(item.children)) return null;
      if (item.children.length > 0) {
        const nested = normalizeItems(item.children, seen);
        if (!nested) return null;
        children = nested;
      }
    }

    normalized.push({ id, label, children });
  }

  return normalized;
}

function renderItems(
  items: readonly NormalizedTableOfContentsItem[],
  currentSectionId: string,
  onNavigate?: TableOfContentsArtworkProps['onNavigate'],
) {
  return items.map((item) => (
    <li className="toc__item" key={item.id}>
      <a
        className="link link--nav toc__link"
        href={`#${encodeURIComponent(item.id)}`}
        aria-current={item.id === currentSectionId ? 'location' : undefined}
        dir="auto"
        onClick={onNavigate ? (event) => onNavigate(event, item) : undefined}
      >
        {item.label}
      </a>
      {item.children.length > 0 ? (
        <ol className="toc__list">
          {renderItems(item.children, currentSectionId, onNavigate)}
        </ol>
      ) : null}
    </li>
  ));
}

export default function TableOfContentsArtwork({
  label,
  title = '',
  items,
  currentSectionId = '',
  placement = 'sticky',
  className = '',
  onNavigate,
}: TableOfContentsArtworkProps) {
  const accessibleLabel = label.trim();
  const normalizedItems = normalizeItems(items);
  if (!accessibleLabel || !normalizedItems) return null;

  const normalizedCurrentSectionId = currentSectionId.trim();
  const validIds = new Set<string>();
  const collectIds = (entries: readonly NormalizedTableOfContentsItem[]) => {
    entries.forEach((entry) => {
      validIds.add(entry.id);
      collectIds(entry.children);
    });
  };
  collectIds(normalizedItems);
  const controlledCurrentSectionId = validIds.has(normalizedCurrentSectionId)
    ? normalizedCurrentSectionId
    : '';

  return (
    <nav
      className={[
        'toc',
        placement === 'sticky' ? 'toc--sticky' : null,
        className.trim() || null,
      ].filter(Boolean).join(' ')}
      aria-label={accessibleLabel}
      data-current-section-id={controlledCurrentSectionId || undefined}
    >
      {title.trim() && <p className="toc__title" dir="auto">{title}</p>}
      <ol className="toc__list">
        {renderItems(normalizedItems, controlledCurrentSectionId, onNavigate)}
      </ol>
    </nav>
  );
}

export const tableOfContentsFixtureItems: readonly TableOfContentsItem[] = [
  {
    id: 'article-arrival',
    label: 'Arrival at the studio',
  },
  {
    id: 'article-repetition',
    label: 'Learning through repetition',
    children: [
      {
        id: 'article-pressure',
        label: 'Noticing pressure points',
      },
    ],
  },
  {
    id: 'article-records',
    label: 'Keeping useful records',
  },
] as const;
