import { Children, type ReactNode } from 'react';

interface AccountSettingsArtworkProps {
  sections: ReactNode;
  className?: string;
}

interface AccountSettingsSectionArtworkProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  headingElement?: 'h2' | 'h3';
  className?: string;
}

export default function AccountSettingsArtwork({
  sections,
  className = '',
}: AccountSettingsArtworkProps) {
  const visibleSections = Children.toArray(sections);
  if (visibleSections.length === 0) return null;

  return (
    <div className={['account-settings', className].filter(Boolean).join(' ')}>
      {visibleSections}
    </div>
  );
}

export function AccountSettingsSectionArtwork({
  id,
  title,
  description = '',
  children,
  headingElement = 'h2',
  className = '',
}: AccountSettingsSectionArtworkProps) {
  const visibleId = id.trim();
  const visibleTitle = title.trim();
  const visibleDescription = description.trim();
  const visibleContent = Children.toArray(children);
  if (!visibleId || !visibleTitle || visibleContent.length === 0) return null;

  const titleId = `${visibleId}-title`;
  const descriptionId = `${visibleId}-description`;
  const Heading = headingElement;

  return (
    <section
      className={['account-settings__section', className].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
    >
      <header className="account-settings__section-header">
        <Heading className="account-settings__section-title" id={titleId}>
          {visibleTitle}
        </Heading>
        {visibleDescription && (
          <p className="account-settings__section-description" id={descriptionId}>
            {visibleDescription}
          </p>
        )}
      </header>
      <div className="account-settings__section-content">{visibleContent}</div>
    </section>
  );
}
