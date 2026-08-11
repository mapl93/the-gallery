import type { ElementType, ReactNode } from 'react';
import TagArtwork from './TagArtwork';
import { editorialImage } from './editorialMedia';

type MaterialLibraryHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface MaterialLibraryArtworkItem {
  key: string;
  name: string;
  media?: ReactNode;
  type?: string;
  description?: string;
  properties?: readonly string[];
}

interface MaterialLibraryArtworkProps {
  id: string;
  title?: string;
  subtitle?: string;
  materials: readonly MaterialLibraryArtworkItem[];
  headingLevel?: MaterialLibraryHeadingLevel;
  className?: string;
}

export const materialLibraryFixture = [
  {
    key: 'stoneware-03',
    name: 'Stoneware 03',
    type: 'Stoneware',
    description: 'A durable warm clay body with a fine mineral speckle.',
    properties: ['Speckled', 'Durable'],
    imageAlt: 'Close view of a ridged stoneware vessel surface',
  },
  {
    key: 'porcelain-01',
    name: 'Porcelain 01',
    type: 'Porcelain',
    description: 'A translucent white body suited to precise, light forms.',
    properties: ['Translucent'],
    imageAlt: 'Pale glazed tableware arranged on a studio table',
  },
  {
    key: 'terracotta-07',
    name: 'Terracotta 07',
    type: 'Earthenware',
    description: 'An iron-rich body with a soft red fired surface.',
    properties: ['Low fire'],
    imageAlt: 'Ceramic artist applying surface detail at a studio table',
  },
] as const;

export function buildMaterialLibraryFixture(): MaterialLibraryArtworkItem[] {
  return materialLibraryFixture.map((material, index) => ({
    ...material,
    media: (
      <img
        className={`docs-studio__ceramics-media docs-studio__ceramics-media--${index + 1}`}
        src={editorialImage(index)}
        alt={material.imageAlt}
        width="1800"
        height="2700"
      />
    ),
  }));
}

export default function MaterialLibraryArtwork({
  id,
  title = '',
  subtitle = '',
  materials,
  headingLevel = 2,
  className = '',
}: MaterialLibraryArtworkProps) {
  const rootId = id.trim();
  const visibleTitle = title.trim();
  const visibleSubtitle = subtitle.trim();
  const visibleMaterials = materials.filter((material) => (
    material.key.trim() && material.name.trim()
  ));
  if (!rootId || visibleMaterials.length === 0) return null;

  const Root = (visibleTitle ? 'section' : 'div') as ElementType;
  const Header = (visibleTitle ? 'header' : 'div') as ElementType;
  const Heading = `h${headingLevel}` as ElementType;
  const CardHeading = `h${Math.min(headingLevel + 1, 6)}` as ElementType;
  const titleId = `${rootId}-title`;

  return (
    <Root
      className={['material-library', className.trim() || null].filter(Boolean).join(' ')}
      aria-labelledby={visibleTitle ? titleId : undefined}
    >
      {(visibleTitle || visibleSubtitle) && (
        <Header className="material-library__header">
          {visibleTitle && (
            <Heading className="material-library__title" id={titleId} dir="auto">
              {visibleTitle}
            </Heading>
          )}
          {visibleSubtitle && (
            <p className="material-library__subtitle" dir="auto">{visibleSubtitle}</p>
          )}
        </Header>
      )}
      <ul className="material-library__grid">
        {visibleMaterials.map((material, index) => {
          const nameId = `${rootId}-material-${index + 1}-name`;
          const visibleType = material.type?.trim();
          const visibleDescription = material.description?.trim();
          const visibleProperties = material.properties?.map((property) => property.trim()).filter(Boolean) ?? [];

          return (
            <li className="material-library__item" key={material.key}>
              <article className="material-card" aria-labelledby={nameId}>
                {material.media != null && (
                  <div className="material-card__swatch">{material.media}</div>
                )}
                <div className="material-card__body">
                  <CardHeading className="material-card__name" id={nameId} dir="auto">
                    {material.name.trim()}
                  </CardHeading>
                  {visibleType && <p className="material-card__type" dir="auto">{visibleType}</p>}
                  {visibleDescription && (
                    <p className="material-card__description" dir="auto">{visibleDescription}</p>
                  )}
                  {visibleProperties.length > 0 && (
                    <ul className="material-card__properties">
                      {visibleProperties.map((property) => (
                        <li className="material-card__property" key={property}>
                          <TagArtwork className="material-card__tag" label={property} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Root>
  );
}
