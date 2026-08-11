import { Children, type ReactNode } from 'react';

export interface MakersMarkFixture {
  artist: string;
  href: string;
  studio: string;
  year: string;
  stampText: string;
}

interface MakersMarkArtworkProps {
  artist: string;
  href?: string;
  stamp?: ReactNode;
  studio?: string;
  year?: string;
  className?: string;
}

const makersMarkFixture: MakersMarkFixture = {
  artist: 'Maria Garcia',
  href: '/makers/maria-garcia',
  studio: 'Buenos Aires studio',
  year: 'Made in 2026',
  stampText: 'MG',
};

function hasRenderableContent(content: ReactNode): boolean {
  return Children.toArray(content).some((node) => (
    typeof node !== 'string' || node.trim().length > 0
  ));
}

export function buildMakersMarkFixture(): MakersMarkFixture {
  return { ...makersMarkFixture };
}

export function MakersMarkFixtureStamp({ text }: { text: string }) {
  const visibleText = text.trim();
  if (!visibleText) return null;

  return (
    <span className="docs-studio__ceramics-stamp-symbol" aria-hidden="true">
      {visibleText}
    </span>
  );
}

export default function MakersMarkArtwork({
  artist,
  href = '',
  stamp,
  studio = '',
  year = '',
  className = '',
}: MakersMarkArtworkProps) {
  const visibleArtist = artist.trim();
  const visibleHref = href.trim();
  const visibleStudio = studio.trim();
  const visibleYear = year.trim();
  if (!visibleArtist) return null;

  return (
    <div
      className={['makers-mark', className.trim() || null].filter(Boolean).join(' ')}
    >
      {hasRenderableContent(stamp) && (
        <div className="makers-mark__stamp">{stamp}</div>
      )}
      <div className="makers-mark__info">
        <p className="makers-mark__artist" dir="auto">
          {visibleHref ? (
            <a className="link makers-mark__artist-link" href={visibleHref}>{visibleArtist}</a>
          ) : visibleArtist}
        </p>
        {visibleStudio && (
          <p className="makers-mark__studio" dir="auto">{visibleStudio}</p>
        )}
        {visibleYear && (
          <p className="makers-mark__year" dir="auto">{visibleYear}</p>
        )}
      </div>
    </div>
  );
}
