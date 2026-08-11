import type { MouseEventHandler, ReactNode } from 'react';

type ArticleCardHeadingLevel = 2 | 3 | 4 | 5 | 6;

interface ArticleCardArtworkProps {
  title: string;
  href: string;
  variant?: string;
  surface?: string;
  media?: ReactNode;
  category?: string;
  metadata?: ReactNode;
  excerpt?: string;
  excerptLines?: string;
  author?: ReactNode;
  headingLevel?: ArticleCardHeadingLevel;
  className?: string;
  onNavigate?: MouseEventHandler<HTMLAnchorElement>;
}

export default function ArticleCardArtwork({
  title,
  href,
  variant = 'standard',
  surface = 'default',
  media,
  category = '',
  metadata,
  excerpt = '',
  excerptLines = 'none',
  author,
  headingLevel = 2,
  className = '',
  onNavigate,
}: ArticleCardArtworkProps) {
  if (!title.trim() || !href.trim()) return null;

  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const normalizedSurface = ['default', 'flat', 'elevated'].includes(surface) ? surface : 'default';
  const normalizedExcerptLines = ['none', '2', '3', '4'].includes(excerptLines) ? excerptLines : 'none';
  const hasMedia = Boolean(media) && variant !== 'minimal';
  const surfaceClass = normalizedSurface === 'flat'
    ? 'card--flat'
    : normalizedSurface === 'elevated'
      ? 'card--elevated'
      : '';

  return (
    <article
      className={['card', 'article-card', surfaceClass, className].filter(Boolean).join(' ')}
      data-surface={normalizedSurface}
      data-excerpt-lines={normalizedExcerptLines}
    >
      {category.trim() && (
        <div
          className={[
            'article-card__category-slot',
            hasMedia ? 'article-card__category-slot--overlay' : null,
          ].filter(Boolean).join(' ')}
        >
          <span className="badge article-card__category" dir="auto">{category}</span>
        </div>
      )}
      <a className="article-card__primary-link" href={href} onClick={onNavigate}>
        <div className="article-card__layout">
          {hasMedia && (
            <div className="card__media article-card__media">
              {media}
            </div>
          )}
          <div className="card__body article-card__body">
            {metadata && <div className="article-card__meta">{metadata}</div>}
            <Heading className="article-card__title" dir="auto">{title}</Heading>
            {excerpt.trim() && <p className="article-card__excerpt" dir="auto">{excerpt}</p>}
          </div>
        </div>
      </a>
      {author && (
        <footer className="card__footer article-card__author">
          {author}
        </footer>
      )}
    </article>
  );
}
