import MarqueeArtwork, {
  type MarqueeArtworkItem,
  type MarqueeDirection,
  type MarqueePace,
} from './MarqueeArtwork';

export type LogoBarPresentation = 'static' | 'marquee';

interface LogoBarArtworkProps {
  marks: readonly MarqueeArtworkItem[];
  label?: string;
  presentation?: LogoBarPresentation;
  direction?: MarqueeDirection;
  pace?: MarqueePace;
  pauseLabel: string;
  resumeLabel: string;
  className?: string;
}

function InformativeMark({ name, wordmark }: { name: string; wordmark: string }) {
  return (
    <svg
      className="logo-bar__mark"
      viewBox="0 0 176 40"
      role="img"
      aria-label={name}
      focusable="false"
    >
      <rect className="logo-bar__mark-frame" x="1" y="1" width="174" height="38" rx="19" />
      <text className="logo-bar__wordmark" x="88" y="25" textAnchor="middle">{wordmark}</text>
    </svg>
  );
}

function DecorativeMark() {
  return (
    <svg
      className="logo-bar__mark"
      viewBox="0 0 176 40"
      aria-hidden="true"
      focusable="false"
    >
      <path className="logo-bar__mark-symbol" d="M54 20h16m36 0h16M79 11l18 18m0-18L79 29" />
    </svg>
  );
}

function LinkedMark() {
  return (
    <a className="logo-bar__link" href="/components/marquee" aria-label="Visit Use Objects">
      <svg className="logo-bar__mark" viewBox="0 0 176 40" aria-hidden="true" focusable="false">
        <circle className="logo-bar__mark-frame" cx="29" cy="20" r="16" />
        <text className="logo-bar__wordmark logo-bar__wordmark--linked" x="101" y="25" textAnchor="middle">USE OBJECTS</text>
      </svg>
    </a>
  );
}

const logoBarFixtureMarks: readonly MarqueeArtworkItem[] = [
  { key: 'form-journal', content: <InformativeMark name="Form Journal" wordmark="FORM JOURNAL" /> },
  { key: 'material-review', content: <InformativeMark name="Material Review" wordmark="MATERIAL REVIEW" /> },
  { key: 'decorative-glyph', content: <DecorativeMark />, ariaHidden: true },
  { key: 'use-objects', content: <LinkedMark /> },
  { key: 'taller-sur', content: <InformativeMark name="Taller Sur" wordmark="TALLER SUR" /> },
  { key: 'bayt-studio', content: <InformativeMark name="Bayt Studio" wordmark="BAYT STUDIO" /> },
] as const;

export default function LogoBarArtwork({
  marks,
  label = '',
  presentation = 'static',
  direction = 'forward',
  pace = 'default',
  pauseLabel,
  resumeLabel,
  className = '',
}: LogoBarArtworkProps) {
  return (
    <MarqueeArtwork
      items={marks}
      label={label}
      labelAs="h2"
      presentation={presentation === 'marquee' ? 'auto' : 'static'}
      direction={direction}
      pace={pace}
      pauseLabel={pauseLabel}
      resumeLabel={resumeLabel}
      className={[
        'logo-bar',
        `logo-bar--${presentation}`,
        className,
      ].filter(Boolean).join(' ')}
      partClassNames={{
        label: 'logo-bar__label',
        viewport: 'logo-bar__viewport',
        track: 'logo-bar__track',
        group: 'logo-bar__list',
        item: 'logo-bar__item',
        control: 'logo-bar__control',
      }}
    />
  );
}

export { logoBarFixtureMarks };
