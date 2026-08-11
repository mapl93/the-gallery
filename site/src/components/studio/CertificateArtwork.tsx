import { Children, type MouseEventHandler, type ReactNode } from 'react';

export interface CertificateDetail {
  label: string;
  value: string;
}

export interface CertificateFixture {
  label: string;
  title: string;
  artist: string;
  details: CertificateDetail[];
  signature: string;
  verificationHref: string;
  verificationText: string;
}

export interface CertificateDetailsFixture {
  title: string;
  details: CertificateDetail[];
  verificationHref: string;
  verificationText: string;
}

interface CertificateArtworkProps {
  titleId: string;
  title: string;
  label?: string;
  artist?: string;
  details?: readonly CertificateDetail[];
  signature?: ReactNode;
  signatureLabel?: string;
  verificationHref?: string;
  verificationText?: string;
  verificationMedia?: ReactNode;
  onVerificationClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}

const certificateFixture: CertificateFixture = {
  label: 'Certificate of authenticity',
  title: 'Moon Jar No. 07',
  artist: 'Marina Paz',
  details: [
    { label: 'Medium', value: 'Stoneware and ash glaze' },
    { label: 'Dimensions', value: '28 x 24 x 24 cm' },
    { label: 'Edition', value: 'Unique work' },
    { label: 'Record', value: 'TG-MP-2026-007' },
  ],
  signature: 'Marina Paz',
  verificationHref: '#certificate-record',
  verificationText: 'View certificate record TG-MP-2026-007',
};

const certificateDetailsFixture: CertificateDetailsFixture = {
  title: 'Altered Rim Bowl',
  details: [
    { label: 'Maker', value: 'Maria Garcia' },
    { label: 'Year', value: '2026' },
    { label: 'Material', value: 'Stoneware' },
    { label: 'Reference', value: 'MG-2026-014' },
  ],
  verificationHref: '#certificate-record-mg-2026-014',
  verificationText: 'View certificate record MG-2026-014',
};

function copyDetails(details: readonly CertificateDetail[]): CertificateDetail[] {
  return details.map((detail) => ({ ...detail }));
}

function hasRenderableContent(content: ReactNode): boolean {
  return Children.toArray(content).some((node) => (
    typeof node !== 'string' || node.trim().length > 0
  ));
}

export function buildCertificateFixture(): CertificateFixture {
  return { ...certificateFixture, details: copyDetails(certificateFixture.details) };
}

export function buildCertificateDetailsFixture(): CertificateDetailsFixture {
  return {
    ...certificateDetailsFixture,
    details: copyDetails(certificateDetailsFixture.details),
  };
}

export function CertificateVerificationFixtureMedia() {
  return (
    <svg viewBox="0 0 80 80" focusable="false">
      <rect width="80" height="80" fill="currentColor" opacity="0.08" />
      <path
        d="M8 8h24v24H8zM48 8h24v24H48zM8 48h24v24H8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      />
      <path
        d="M48 48h8v8h-8zM64 48h8v16h-8zM48 64h16v8H48z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function CertificateArtwork({
  titleId,
  title,
  label = '',
  artist = '',
  details = [],
  signature,
  signatureLabel,
  verificationHref = '',
  verificationText = '',
  verificationMedia,
  onVerificationClick,
  className = '',
}: CertificateArtworkProps) {
  const visibleTitle = title.trim();
  const visibleTitleId = titleId.trim();
  const visibleLabel = label.trim();
  const visibleArtist = artist.trim();
  const visibleDetails = details
    .map((detail) => ({ label: detail.label.trim(), value: detail.value.trim() }))
    .filter((detail) => detail.label && detail.value);
  const visibleVerificationHref = verificationHref.trim();
  const visibleVerificationText = verificationText.trim();
  const hasSignature = hasRenderableContent(signature);
  const hasVerification = Boolean(visibleVerificationHref && visibleVerificationText);
  const hasBody = Boolean(visibleDetails.length || hasSignature || hasVerification);

  if (!visibleTitle || !visibleTitleId) return null;

  return (
    <article
      className={['coa', className.trim() || null].filter(Boolean).join(' ')}
      aria-labelledby={visibleTitleId}
    >
      {visibleLabel && <p className="coa__header">{visibleLabel}</p>}
      <h2 className="coa__title" id={visibleTitleId}>{visibleTitle}</h2>
      {visibleArtist && <p className="coa__artist">{visibleArtist}</p>}
      {hasBody && <div className="coa__divider" aria-hidden="true" />}
      {visibleDetails.length > 0 && (
        <dl className="coa__details">
          {visibleDetails.map((detail) => (
            <div className="coa__detail" key={`${detail.label}:${detail.value}`}>
              <dt className="coa__detail-label">{detail.label}</dt>
              <dd className="coa__detail-value">{detail.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {hasSignature && (
        <p className="coa__signature" aria-label={signatureLabel?.trim() || undefined}>
          {signature}
        </p>
      )}
      {hasVerification && (
        <a
          className="coa__verification"
          href={visibleVerificationHref}
          onClick={onVerificationClick}
        >
          {hasRenderableContent(verificationMedia) && (
            <span className="coa__qr" aria-hidden="true">{verificationMedia}</span>
          )}
          <span className="coa__verify">{visibleVerificationText}</span>
        </a>
      )}
    </article>
  );
}
