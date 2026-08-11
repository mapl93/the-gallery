import { useEffect, useRef, type CSSProperties } from 'react';

export type ReadingProgressMode = 'controlled' | 'automatic';

interface ReadingProgressArtworkProps {
  mode?: ReadingProgressMode;
  value?: number;
  targetId?: string;
  scrollRootId?: string;
  className?: string;
}

function boundedValue(value: number | undefined) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(100, Math.max(0, parsed)) : 0;
}

export default function ReadingProgressArtwork({
  mode = 'controlled',
  value = 0,
  targetId = '',
  scrollRootId = '',
  className = '',
}: ReadingProgressArtworkProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const controlledValue = boundedValue(value);
  const normalizedTargetId = targetId.trim();
  const normalizedScrollRootId = scrollRootId.trim();
  const runtimeKey = [mode, normalizedTargetId, normalizedScrollRootId].join(':');
  const style = mode === 'controlled'
    ? ({ '--_reading-progress-scale': controlledValue / 100 } as CSSProperties)
    : undefined;

  useEffect(() => {
    if (rootRef.current) window.TheGallery?.enhanceReadingProgress(rootRef.current);
  }, [runtimeKey, controlledValue]);

  return (
    <div
      key={runtimeKey}
      ref={rootRef}
      className={`reading-progress${className ? ` ${className}` : ''}`}
      aria-hidden="true"
      data-reading-progress=""
      data-reading-mode={mode}
      data-reading-value={mode === 'controlled' ? controlledValue : undefined}
      data-reading-target={mode === 'automatic' ? normalizedTargetId : undefined}
      data-reading-scroll-root={mode === 'automatic' && normalizedScrollRootId ? normalizedScrollRootId : undefined}
      data-reading-state={mode === 'controlled' ? 'controlled' : 'pending'}
      data-value={mode === 'controlled' ? controlledValue : undefined}
      style={style}
    >
      <div className="reading-progress__bar" />
    </div>
  );
}

export function ReadingProgressFixture({
  mode,
  value,
  targetId,
  scrollRootId,
}: Required<Pick<ReadingProgressArtworkProps, 'mode' | 'value' | 'targetId' | 'scrollRootId'>>) {
  return (
    <div className="docs-studio__reading-progress-fixture">
      <ReadingProgressArtwork
        mode={mode}
        value={value}
        targetId={targetId}
        scrollRootId={scrollRootId}
      />
      <div
        className="docs-studio__reading-scroll"
        id="reading-progress-scroll-root"
        tabIndex={0}
        aria-label="Article preview"
      >
        <article className="docs-studio__reading-article" id="reading-progress-article">
          <p className="docs-studio__reading-kicker">Studio journal</p>
          <h2>Following a form from wheel to kiln</h2>
          <p>Clay records pressure, speed, and every pause in the maker's hands.</p>
          <p>The article range begins with this first paragraph and ends with the final reflection below.</p>
          <h3>Shaping</h3>
          <p>Each wall is raised gradually so the vessel can hold its own weight without losing the marks of its making.</p>
          <p>Small changes in water and pressure alter the silhouette more than a later decorative gesture can.</p>
          <h3>Drying</h3>
          <p>The form rests until moisture leaves evenly. Rushing this stage can turn an invisible tension into a crack.</p>
          <p>Handles and joined parts are watched closely because they dry at a different pace from the body.</p>
          <h3>Firing</h3>
          <p>Heat makes every earlier decision permanent while adding results that cannot be completely predicted.</p>
          <p>The final surface is read as a record of material, time, atmosphere, and deliberate restraint.</p>
        </article>
      </div>
    </div>
  );
}
