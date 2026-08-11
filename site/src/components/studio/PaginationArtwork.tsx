import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationArtworkProps {
  className?: string;
  label: string;
  currentPage: number;
  pageItems: boolean;
  onPageChange: (page: number) => void;
}

const fixtureTotalPages = 10;

function clampPage(value: number): number {
  return Math.max(1, Math.min(fixtureTotalPages, Number.isFinite(value) ? value : 1));
}

export default function PaginationArtwork({
  className = '',
  label,
  currentPage,
  pageItems,
  onPageChange,
}: PaginationArtworkProps) {
  if (!pageItems) return null;

  const current = clampPage(currentPage);
  const pages = [...new Set([1, current - 1, current, current + 1, fixtureTotalPages])]
    .filter((page) => page >= 1 && page <= fixtureTotalPages)
    .sort((a, b) => a - b);
  const change = (page: number) => onPageChange(clampPage(page));

  return (
    <nav
      className={['pagination', className].filter(Boolean).join(' ')}
      aria-label={label}
      data-current-page={current}
    >
      <ul className="pagination__list">
        {current > 1 && (
          <li className="pagination__item">
            <a
              className="link link--subtle pagination__link"
              href={`#page-${current - 1}`}
              aria-label="Previous page"
              onClick={(event) => {
                event.preventDefault();
                change(current - 1);
              }}
            >
              <ArrowLeft aria-hidden="true" />
            </a>
          </li>
        )}
        {pages.flatMap((page, index) => {
          const gap = index > 0 && page - pages[index - 1] > 1
            ? [(
              <li className="pagination__item" aria-hidden="true" key={`ellipsis-${page}`}>
                <span className="pagination__ellipsis" aria-hidden="true">…</span>
              </li>
            )]
            : [];
          const item = page === current
            ? (
              <li className="pagination__item" key={page}>
                <span className="pagination__current" aria-current="page">{page}</span>
              </li>
            )
            : (
              <li className="pagination__item" key={page}>
                <a
                  className="link link--subtle pagination__link"
                  href={`#page-${page}`}
                  aria-label={`Page ${page}`}
                  onClick={(event) => {
                    event.preventDefault();
                    change(page);
                  }}
                >
                  {page}
                </a>
              </li>
            );
          return [...gap, item];
        })}
        {current < fixtureTotalPages && (
          <li className="pagination__item">
            <a
              className="link link--subtle pagination__link"
              href={`#page-${current + 1}`}
              aria-label="Next page"
              onClick={(event) => {
                event.preventDefault();
                change(current + 1);
              }}
            >
              <ArrowRight aria-hidden="true" />
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
