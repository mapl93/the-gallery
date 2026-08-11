import { Children, type ReactNode } from 'react';

interface WishlistArtworkProps {
  title: string;
  titleId: string;
  count?: string;
  products?: ReactNode;
  emptyState?: ReactNode;
  className?: string;
}

export default function WishlistArtwork({
  title,
  titleId,
  count = '',
  products = null,
  emptyState,
  className = '',
}: WishlistArtworkProps) {
  if (!title.trim()) return null;

  const hasProducts = Children.count(products) > 0;

  return (
    <section
      className={['wishlist', className].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
    >
      <header className="wishlist__header">
        <h2 className="wishlist__title" id={titleId} dir="auto">{title}</h2>
        {count.trim() && <span className="wishlist__count" dir="auto">{count}</span>}
      </header>
      {hasProducts ? (
        <ul className="wishlist__grid">
          {products}
        </ul>
      ) : emptyState}
    </section>
  );
}
