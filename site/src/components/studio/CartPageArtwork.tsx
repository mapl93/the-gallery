import type { MouseEventHandler, ReactNode } from 'react';

type CartPageHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface CartPageArtworkProps {
  id: string;
  title: string;
  count?: string;
  continueLabel?: string;
  continueHref?: string;
  onContinue?: MouseEventHandler<HTMLAnchorElement>;
  lineItems: ReactNode;
  summary: ReactNode;
  summaryPlacement?: 'sticky' | 'flow' | string;
  headingTag?: CartPageHeadingTag;
  className?: string;
}

function hasRequiredComposition(content: ReactNode) {
  return content !== null && content !== undefined && content !== false;
}

export default function CartPageArtwork({
  id,
  title,
  count = '',
  continueLabel = '',
  continueHref = '',
  onContinue,
  lineItems,
  summary,
  summaryPlacement = 'sticky',
  headingTag: HeadingTag = 'h2',
  className = '',
}: CartPageArtworkProps) {
  const visibleTitle = title.trim();
  const visibleCount = count.trim();
  const visibleContinueLabel = continueLabel.trim();
  const visibleContinueHref = continueHref.trim();

  if (!visibleTitle || !hasRequiredComposition(lineItems) || !hasRequiredComposition(summary)) return null;

  const titleId = `${id}-title`;
  const rootClassName = [
    'cart-page',
    summaryPlacement === 'flow' ? 'cart-page--summary-flow' : null,
    className,
  ].filter(Boolean).join(' ');
  const showContinue = Boolean(visibleContinueLabel && visibleContinueHref);

  return (
    <section className={rootClassName} aria-labelledby={titleId}>
      <header className="cart-page__header">
        <HeadingTag className="cart-page__title" id={titleId}>{visibleTitle}</HeadingTag>
        {visibleCount && <p className="cart-page__count"><bdi>{visibleCount}</bdi></p>}
        {showContinue && (
          <a className="cart-page__continue" href={visibleContinueHref} onClick={onContinue}>
            {visibleContinueLabel}
          </a>
        )}
      </header>
      <div className="cart-page__layout">
        <div className="cart-page__items">{lineItems}</div>
        <div className="cart-page__summary">{summary}</div>
      </div>
    </section>
  );
}
