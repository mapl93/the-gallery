import { Children, type MouseEvent, type ReactNode } from 'react';

interface BlogSidebarArtworkProps {
  label: string;
  sections: ReactNode;
  className?: string;
}

interface BlogSidebarFixtureProps {
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>, label: string) => void;
}

function hasRenderableContent(content: ReactNode): boolean {
  return Children.toArray(content).some((node) => (
    typeof node !== 'string' || node.trim().length > 0
  ));
}

export const blogSidebarFixture = {
  label: 'More from the journal',
  recentTitle: 'Recent notes',
  recentItems: [
    { label: 'The case for slower tools', href: '#recent-slower-tools' },
    { label: 'Testing a new ash glaze', href: '#recent-ash-glaze' },
    { label: 'What survives the firing', href: '#recent-firing' },
  ],
  topicsTitle: 'Explore topics',
  topicItems: [
    { label: 'Stoneware', href: '#topic-stoneware' },
    { label: 'Glaze', href: '#topic-glaze' },
    { label: 'Kiln', href: '#topic-kiln' },
    { label: 'Tools', href: '#topic-tools' },
  ],
};

export default function BlogSidebarArtwork({
  label,
  sections,
  className = '',
}: BlogSidebarArtworkProps) {
  const accessibleLabel = label.trim();
  if (!accessibleLabel || !hasRenderableContent(sections)) return null;

  return (
    <aside
      className={['blog-sidebar', className.trim() || null].filter(Boolean).join(' ')}
      aria-label={accessibleLabel}
    >
      {sections}
    </aside>
  );
}

export function BlogSidebarFixture({ onNavigate }: BlogSidebarFixtureProps) {
  const navigate = (event: MouseEvent<HTMLAnchorElement>, label: string) => {
    onNavigate?.(event, label);
  };

  return (
    <>
      <section className="blog-sidebar__section">
        <h2 className="blog-sidebar__title" dir="auto">{blogSidebarFixture.recentTitle}</h2>
        <ul className="blog-sidebar__list">
          {blogSidebarFixture.recentItems.map((item) => (
            <li className="blog-sidebar__list-item" key={item.href}>
              <a
                className="link link--subtle blog-sidebar__link"
                href={item.href}
                dir="auto"
                onClick={(event) => navigate(event, 'Sidebar article link')}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className="blog-sidebar__section">
        <h2 className="blog-sidebar__title" dir="auto">{blogSidebarFixture.topicsTitle}</h2>
        <ul className="blog-sidebar__topics tag-cloud">
          {blogSidebarFixture.topicItems.map((item) => (
            <li className="blog-sidebar__topic tag-cloud__entry" key={item.href}>
              <a
                className="link link--subtle blog-sidebar__topic-link tag-cloud__item"
                href={item.href}
                dir="auto"
                onClick={(event) => navigate(event, 'Topic link')}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
