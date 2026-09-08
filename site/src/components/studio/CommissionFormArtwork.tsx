import type {
  ElementType,
  FormEventHandler,
  ReactNode,
} from 'react';

type CommissionHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface CommissionFormFixture {
  title: string;
  intro: string;
  nameLabel: string;
  namePlaceholder: string;
  nameMessage: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailMessage: string;
  requestLabel: string;
  requestPlaceholder: string;
  requestMessage: string;
  uploadLabel: string;
  uploadHint: string;
  uploadEmptyStatus: string;
  uploadAccept: string;
  submitLabel: string;
  resetLabel: string;
}

interface CommissionFormArtworkProps {
  id: string;
  title?: string;
  intro?: string;
  fields?: ReactNode;
  referenceUpload?: ReactNode;
  actions?: ReactNode;
  result?: ReactNode;
  headingLevel?: CommissionHeadingLevel;
  className?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onReset?: FormEventHandler<HTMLFormElement>;
}

const commissionFixture: CommissionFormFixture = {
  title: 'Commission a work',
  intro: 'Share the scale, use, and atmosphere you have in mind.',
  nameLabel: 'Name',
  namePlaceholder: 'Your name',
  nameMessage: 'Use the name the studio should reply to.',
  emailLabel: 'Email',
  emailPlaceholder: 'you@example.com',
  emailMessage: 'Use an address where the studio can reply.',
  requestLabel: 'Commission request',
  requestPlaceholder: 'Scale, use, material, and timing context',
  requestMessage: 'Include enough context for an initial feasibility review.',
  uploadLabel: 'Reference image (optional)',
  uploadHint: 'JPEG or PNG; this local preview does not upload files.',
  uploadEmptyStatus: 'No reference selected.',
  uploadAccept: '.jpg,.jpeg,.png,image/jpeg,image/png',
  submitLabel: 'Preview request',
  resetLabel: 'Reset',
};

export function buildCommissionFormFixture(): CommissionFormFixture {
  return { ...commissionFixture };
}

export default function CommissionFormArtwork({
  id,
  title = '',
  intro = '',
  fields,
  referenceUpload,
  actions,
  result,
  headingLevel = 2,
  className = '',
  onSubmit,
  onReset,
}: CommissionFormArtworkProps) {
  const rootId = id.trim();
  const visibleTitle = title.trim();
  const visibleIntro = intro.trim();
  if (!rootId || !fields) return null;

  const titleId = `${rootId}-title`;
  const introId = `${rootId}-intro`;
  const Heading = `h${headingLevel}` as ElementType;

  return (
    <form
      className={['commission-form', className.trim() || null].filter(Boolean).join(' ')}
      id={rootId}
      aria-labelledby={visibleTitle ? titleId : undefined}
      aria-describedby={visibleIntro ? introId : undefined}
      autoComplete="on"
      encType={referenceUpload ? 'multipart/form-data' : undefined}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      {(visibleTitle || visibleIntro) && (
        <header className="commission-form__header">
          {visibleTitle && (
            <Heading className="commission-form__title" id={titleId} dir="auto">
              {visibleTitle}
            </Heading>
          )}
          {visibleIntro && (
            <p className="commission-form__text" id={introId} dir="auto">
              {visibleIntro}
            </p>
          )}
        </header>
      )}
      <div className="commission-form__fields">{fields}</div>
      {referenceUpload && (
        <div className="commission-form__upload-zone">{referenceUpload}</div>
      )}
      {actions && <div className="commission-form__actions">{actions}</div>}
      {result}
    </form>
  );
}
