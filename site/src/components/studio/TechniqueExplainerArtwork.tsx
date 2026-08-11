import type { ElementType, ReactNode } from 'react';
import { editorialMedia } from './editorialMedia';

type TechniqueExplainerHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface TechniqueExplainerArtworkStep {
  key: string;
  name: string;
  description: string;
  details?: ReactNode;
  media?: ReactNode;
}

interface TechniqueExplainerArtworkProps {
  id: string;
  title?: string;
  steps: readonly TechniqueExplainerArtworkStep[];
  headingLevel?: TechniqueExplainerHeadingLevel;
  className?: string;
}

const techniqueExplainerFixtureRecords = [
  {
    key: 'shape-form',
    name: 'Shape the form',
    description: 'The wall is raised and refined while the clay remains centered and responsive.',
    details: 'Working note: keep the wall evenly supported while the clay remains soft.',
    src: editorialMedia.potterAtWheel,
    alt: 'Ceramic artist shaping a tall vessel on a pottery wheel',
  },
  {
    key: 'apply-detail',
    name: 'Apply surface detail',
    description: 'Color and marks are added deliberately after the form can support careful handling.',
    details: null,
    src: editorialMedia.artistInStudio,
    alt: 'Ceramic artist painting surface detail on a handled vessel',
  },
  {
    key: 'review-work',
    name: 'Review the fired work',
    description: 'Finished forms are reviewed together so variations in profile and surface remain visible.',
    details: null,
    src: editorialMedia.ceramicsShelves,
    alt: 'Shelves holding rows of finished pale ceramic forms',
  },
] as const;

export function buildTechniqueExplainerFixture(): TechniqueExplainerArtworkStep[] {
  return techniqueExplainerFixtureRecords.map((step, index) => ({
    key: step.key,
    name: step.name,
    description: step.description,
    details: step.details ? <p>{step.details}</p> : undefined,
    media: (
      <img
        className={`docs-studio__ceramics-media docs-studio__ceramics-media--${index + 4}`}
        src={step.src}
        alt={step.alt}
        width="1800"
        height="2700"
      />
    ),
  }));
}

export default function TechniqueExplainerArtwork({
  id,
  title = '',
  steps,
  headingLevel = 2,
  className = '',
}: TechniqueExplainerArtworkProps) {
  const rootId = id.trim();
  const visibleTitle = title.trim();
  const visibleSteps = steps.filter((step) => (
    step.key.trim() && step.name.trim() && step.description.trim()
  ));
  if (!rootId || visibleSteps.length === 0) return null;

  const Root = (visibleTitle ? 'section' : 'div') as ElementType;
  const Heading = `h${headingLevel}` as ElementType;
  const StepHeading = `h${Math.min(headingLevel + 1, 6)}` as ElementType;
  const titleId = `${rootId}-title`;

  return (
    <Root
      className={['technique-explainer', className.trim() || null].filter(Boolean).join(' ')}
      aria-labelledby={visibleTitle ? titleId : undefined}
    >
      {visibleTitle && (
        <header className="technique-explainer__header">
          <Heading className="technique-explainer__title" id={titleId} dir="auto">
            {visibleTitle}
          </Heading>
        </header>
      )}
      <ol className="technique-explainer__steps">
        {visibleSteps.map((step, index) => (
          <li className="technique-step" key={step.key}>
            <div className="technique-step__content">
              <span className="technique-step__number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <StepHeading className="technique-step__name" dir="auto">
                {step.name.trim()}
              </StepHeading>
              <p className="technique-step__description" dir="auto">
                {step.description.trim()}
              </p>
              {step.details != null && (
                <div className="technique-step__details" dir="auto">{step.details}</div>
              )}
            </div>
            {step.media != null && (
              <figure className="technique-step__media">{step.media}</figure>
            )}
          </li>
        ))}
      </ol>
    </Root>
  );
}
