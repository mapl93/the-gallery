import type { ReactNode } from 'react';

type ArticleHeroHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface ArticleHeroArtworkProps {
  title: string;
  variant?: 'full' | 'split' | 'text-only' | string;
  backgroundMedia?: ReactNode;
  splitMedia?: ReactNode;
  category?: string;
  metadata?: ReactNode;
  headingLevel?: ArticleHeroHeadingLevel;
  className?: string;
}

const variantClasses: Record<string, string> = {
  full: 'article-hero--image',
  split: 'article-hero--split',
  'text-only': 'article-hero--text',
};

export default function ArticleHeroArtwork({
  title,
  variant = 'full',
  backgroundMedia,
  splitMedia,
  category = '',
  metadata,
  headingLevel = 2,
  className = '',
}: ArticleHeroArtworkProps) {
  if (!title.trim()) return null;

  const Heading = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const normalizedVariant = variantClasses[variant] ? variant : 'full';
  const isFull = normalizedVariant === 'full';
  const isSplit = normalizedVariant === 'split';
  const selectedMedia = isFull ? backgroundMedia : isSplit ? splitMedia : null;
  const withoutSelectedMedia = (isFull || isSplit) && !selectedMedia;
  const rootClasses = new Set([
    'article-hero',
    variantClasses[normalizedVariant],
    ...className.split(/\s+/).filter(Boolean),
    ...(withoutSelectedMedia ? ['article-hero--without-media'] : []),
  ]);

  return (
    <header
      className={[...rootClasses].join(' ')}
    >
      <div className="article-hero__layout">
        {isFull && backgroundMedia && <div className="article-hero__bg">{backgroundMedia}</div>}
        {isFull && backgroundMedia && <div className="article-hero__overlay" aria-hidden="true" />}
        {isSplit && splitMedia && <div className="article-hero__media">{splitMedia}</div>}
        <div className="article-hero__content">
          {category.trim() && <p className="article-hero__category" dir="auto">{category}</p>}
          <Heading className="article-hero__title" dir="auto">{title}</Heading>
          {metadata && <div className="article-hero__meta">{metadata}</div>}
        </div>
      </div>
    </header>
  );
}
