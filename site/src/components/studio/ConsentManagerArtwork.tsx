import type { MouseEventHandler, ReactNode } from 'react';
import ModalArtwork from './ModalArtwork';

interface ConsentManagerArtworkProps {
  id: string;
  title: string;
  description: string;
  policyLabel: string;
  policyHref: string;
  acceptLabel: string;
  rejectLabel: string;
  customizeLabel: string;
  preferencesTitle: string;
  preferencesDescription?: string;
  closePreferencesLabel: string;
  saveLabel: string;
  open: boolean;
  preferencesOpen: boolean;
  busy?: boolean;
  preferences: ReactNode;
  feedback?: ReactNode;
  closeIcon?: ReactNode;
  modalOverlayClassName?: string;
  onPreferencesOpenChange: (open: boolean) => void;
  onAcceptRequest: () => void;
  onRejectRequest: () => void;
  onCustomizeRequest: () => void;
  onSaveRequest: () => void;
  onPolicyClick?: MouseEventHandler<HTMLAnchorElement>;
}

function text(value: string) {
  return value.trim();
}

function isRealPolicyHref(value: string) {
  const href = value.trim();
  return Boolean(href && href !== '#' && !/^javascript:/i.test(href));
}

export default function ConsentManagerArtwork({
  id,
  title,
  description,
  policyLabel,
  policyHref,
  acceptLabel,
  rejectLabel,
  customizeLabel,
  preferencesTitle,
  preferencesDescription = '',
  closePreferencesLabel,
  saveLabel,
  open,
  preferencesOpen,
  busy = false,
  preferences,
  feedback,
  closeIcon,
  modalOverlayClassName,
  onPreferencesOpenChange,
  onAcceptRequest,
  onRejectRequest,
  onCustomizeRequest,
  onSaveRequest,
  onPolicyClick,
}: ConsentManagerArtworkProps) {
  const requiredText = [
    title,
    description,
    policyLabel,
    acceptLabel,
    rejectLabel,
    customizeLabel,
    preferencesTitle,
    closePreferencesLabel,
    saveLabel,
  ];
  if (!open || requiredText.some((value) => !text(value)) || !isRealPolicyHref(policyHref) || !preferences) {
    return null;
  }

  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  function requestPreferences(nextOpen: boolean) {
    if (nextOpen) onCustomizeRequest();
    onPreferencesOpenChange(nextOpen);
  }

  return (
    <section
      className="consent-manager"
      id={id}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-busy={busy || undefined}
    >
      <div className="consent-manager__content">
        <h2 className="consent-manager__title" id={titleId} dir="auto">{text(title)}</h2>
        <p className="consent-manager__description" id={descriptionId} dir="auto">
          {text(description)}
        </p>
        <a
          className="link consent-manager__policy"
          href={policyHref.trim()}
          onClick={onPolicyClick}
        >
          {text(policyLabel)}
        </a>
      </div>

      <div className="consent-manager__actions">
        <button
          className="btn btn--outline consent-manager__action consent-manager__action--accept"
          type="button"
          disabled={busy}
          onClick={onAcceptRequest}
        >
          {text(acceptLabel)}
        </button>
        <button
          className="btn btn--outline consent-manager__action consent-manager__action--reject"
          type="button"
          disabled={busy}
          onClick={onRejectRequest}
        >
          {text(rejectLabel)}
        </button>
        <ModalArtwork
          id={`${id}-preferences`}
          title={text(preferencesTitle)}
          open={preferencesOpen}
          dismissLabel={text(closePreferencesLabel)}
          triggerLabel={text(customizeLabel)}
          triggerClassName="btn--outline consent-manager__action consent-manager__action--customize"
          triggerDisabled={busy}
          overlayClassName={modalOverlayClassName}
          className="consent-manager__preferences"
          initialFocus="title"
          dismissOnBackdrop={false}
          closeIcon={closeIcon}
          onOpenChange={requestPreferences}
          actions={(
            <button
              className="btn consent-manager__save"
              type="button"
              disabled={busy}
              onClick={onSaveRequest}
            >
              {text(saveLabel)}
            </button>
          )}
        >
          {text(preferencesDescription) && (
            <p className="consent-manager__preferences-description" dir="auto">
              {text(preferencesDescription)}
            </p>
          )}
          <div className="consent-manager__preferences-list">{preferences}</div>
        </ModalArtwork>
      </div>

      {feedback && <div className="consent-manager__feedback">{feedback}</div>}
    </section>
  );
}
