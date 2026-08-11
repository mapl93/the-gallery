import type { ElementType, ReactNode } from 'react';
import { editorialImage } from './editorialMedia';

type GlazeGuideHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface GlazeGuideArtworkSample {
  key: string;
  name: string;
  visual: ReactNode;
  code?: string;
}

export interface GlazeGuideArtworkDetail {
  key: string;
  name: string;
  media?: ReactNode;
  facts?: readonly {
    term: string;
    value: string;
  }[];
}

interface GlazeGuideArtworkProps {
  id: string;
  title?: string;
  samples: readonly GlazeGuideArtworkSample[];
  detail?: GlazeGuideArtworkDetail;
  headingLevel?: GlazeGuideHeadingLevel;
  className?: string;
}

const glazeGuideFixtureRecords = [
  {
    key: 'ash-white',
    name: 'Ash white',
    code: 'AW-12',
    appearance: 'Warm off-white glaze with soft tonal variation',
  },
  {
    key: 'celadon-mist',
    name: 'Celadon mist',
    code: 'CM-04',
    appearance: 'Muted green glaze with a softly varied surface',
  },
  {
    key: 'iron-black',
    name: 'Iron black',
    code: 'IB-09',
    appearance: 'Deep charcoal glaze with a low-sheen surface',
  },
] as const;

export function buildGlazeGuideFixture(): {
  samples: GlazeGuideArtworkSample[];
  detail: GlazeGuideArtworkDetail;
} {
  return {
    samples: glazeGuideFixtureRecords.map((sample, index) => ({
      key: sample.key,
      name: sample.name,
      code: sample.code,
      visual: (
        <span
          className={`glaze-swatch__circle docs-studio__ceramics-glaze docs-studio__ceramics-glaze--${index + 1}`}
          role="img"
          aria-label={sample.appearance}
        />
      ),
    })),
    detail: {
      key: 'ash-white-reference',
      name: 'Ash white reference',
      media: (
        <img
          className="docs-studio__ceramics-media docs-studio__ceramics-media--2"
          src={editorialImage(1)}
          alt="Pale glazed bowls and cups arranged on a wooden studio table"
          width="1800"
          height="2700"
        />
      ),
      facts: [
        { term: 'Code', value: 'AW-12' },
        { term: 'Appearance', value: 'Warm off-white with soft tonal variation' },
        { term: 'Record', value: 'Demonstration content' },
      ],
    },
  };
}

export default function GlazeGuideArtwork({
  id,
  title = '',
  samples,
  detail,
  headingLevel = 2,
  className = '',
}: GlazeGuideArtworkProps) {
  const rootId = id.trim();
  const visibleTitle = title.trim();
  const visibleSamples = samples.filter((sample) => (
    sample.key.trim() && sample.name.trim() && sample.visual != null
  ));
  if (!rootId || visibleSamples.length === 0) return null;

  const Root = (visibleTitle ? 'section' : 'div') as ElementType;
  const Heading = `h${headingLevel}` as ElementType;
  const DetailHeading = `h${Math.min(headingLevel + 1, 6)}` as ElementType;
  const titleId = `${rootId}-title`;
  const visibleDetailName = detail?.name.trim();
  const visibleDetailFacts = detail?.facts?.map((fact) => ({
    term: fact.term.trim(),
    value: fact.value.trim(),
  })).filter((fact) => fact.term && fact.value) ?? [];
  const detailNameId = `${rootId}-detail-name`;

  return (
    <Root
      className={['glaze-guide', className.trim() || null].filter(Boolean).join(' ')}
      aria-labelledby={visibleTitle ? titleId : undefined}
    >
      {visibleTitle && (
        <header className="glaze-guide__header">
          <Heading className="glaze-guide__title" id={titleId} dir="auto">
            {visibleTitle}
          </Heading>
        </header>
      )}
      <ul className="glaze-guide__grid">
        {visibleSamples.map((sample) => {
          const visibleCode = sample.code?.trim();
          return (
            <li className="glaze-guide__item" key={sample.key}>
              <figure className="glaze-swatch">
                {sample.visual}
                <figcaption className="glaze-swatch__caption">
                  <span className="glaze-swatch__name" dir="auto">{sample.name.trim()}</span>
                  {visibleCode && (
                    <span className="glaze-swatch__code" dir="auto">{visibleCode}</span>
                  )}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
      {detail && visibleDetailName && (
        <article className="glaze-detail" aria-labelledby={detailNameId}>
          {detail.media != null && (
            <div className="glaze-detail__image">{detail.media}</div>
          )}
          <div className="glaze-detail__info">
            <DetailHeading className="glaze-detail__name" id={detailNameId} dir="auto">
              {visibleDetailName}
            </DetailHeading>
            {visibleDetailFacts.length > 0 && (
              <dl className="glaze-detail__meta">
                {visibleDetailFacts.map((fact) => (
                  <div className="glaze-detail__meta-group" key={`${fact.term}-${fact.value}`}>
                    <dt dir="auto">{fact.term}</dt>
                    <dd dir="auto">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </article>
      )}
    </Root>
  );
}
