import type { ElementType, MouseEvent, ReactNode } from 'react';
import ArticleCardArtwork from './ArticleCardArtwork';
import { editorialImage } from './editorialMedia';

type RelatedArticlesHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface RelatedArticleArtworkItem {
  key: string;
  card: ReactNode;
}

interface RelatedArticlesArtworkProps {
  id: string;
  title: string;
  articles: readonly RelatedArticleArtworkItem[];
  headingLevel?: RelatedArticlesHeadingLevel;
  className?: string;
}

interface RelatedArticlesFixtureOptions {
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>, label: string) => void;
}

export const relatedArticlesFixture = [
  {
    key: 'ash-glazes',
    title: 'A field guide to ash glazes',
    href: '#related-ash-glazes',
    category: 'Materials',
    imageAlt: 'Ceramic bowls and vessels arranged on a wooden workbench',
  },
  {
    key: 'permanent-tools',
    title: 'The tools that earn a permanent place',
    href: '#related-permanent-tools',
    category: 'Studio notes',
    imageAlt: 'Ceramic artist decorating a vessel at a studio table',
  },
  {
    key: 'small-batch',
    title: 'Firing a small batch with intention',
    href: '#related-small-batch',
    category: 'Process',
    imageAlt: 'Glazed ceramic cups arranged in a small group',
  },
] as const;

export function buildRelatedArticlesFixture({
  onNavigate,
}: RelatedArticlesFixtureOptions = {}): RelatedArticleArtworkItem[] {
  return relatedArticlesFixture.map((article, index) => ({
    key: article.key,
    card: (
      <ArticleCardArtwork
        title={article.title}
        href={article.href}
        media={(
          <img
            src={editorialImage(index + 1)}
            alt={article.imageAlt}
            className={`docs-studio__blog-media docs-studio__blog-media--${index + 1}`}
          />
        )}
        category={article.category}
        headingLevel={3}
        onNavigate={(event) => onNavigate?.(event, 'Related article link')}
      />
    ),
  }));
}

export default function RelatedArticlesArtwork({
  id,
  title,
  articles,
  headingLevel = 2,
  className = '',
}: RelatedArticlesArtworkProps) {
  const rootId = id.trim();
  const visibleTitle = title.trim();
  const visibleArticles = articles
    .filter((article) => article.key.trim() && article.card != null)
    .slice(0, 3);
  if (!rootId || !visibleTitle || visibleArticles.length === 0) return null;

  const Heading = `h${headingLevel}` as ElementType;
  const titleId = `${rootId}-title`;

  return (
    <section
      className={['related-articles', className.trim() || null].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
    >
      <Heading className="related-articles__title" id={titleId} dir="auto">
        {visibleTitle}
      </Heading>
      <ul className="related-articles__grid">
        {visibleArticles.map((article) => (
          <li className="related-articles__item" key={article.key}>
            {article.card}
          </li>
        ))}
      </ul>
    </section>
  );
}
