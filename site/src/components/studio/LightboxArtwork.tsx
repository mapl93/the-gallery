import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
} from 'react';
import { ArrowLeft, ArrowRight, Minus, Plus, RotateCcw, X } from 'lucide-react';
import ModalArtwork from './ModalArtwork';

interface LightboxImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

interface LightboxArtworkProps {
  images: LightboxImage[];
  currentId: string;
  open: boolean;
  loop?: boolean;
  title?: string;
  dismissLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  zoomInLabel?: string;
  zoomOutLabel?: string;
  resetZoomLabel?: string;
  fallbackLabel?: string;
  className?: string;
  returnFocusRef?: RefObject<HTMLElement | null>;
  onCurrentIdChange: (id: string) => void;
  onOpenChange: (open: boolean) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;
const SWIPE_THRESHOLD = 48;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function LightboxArtwork({
  images,
  currentId,
  open,
  loop = false,
  title = 'Image viewer',
  dismissLabel = 'Close image viewer',
  previousLabel = 'Previous image',
  nextLabel = 'Next image',
  zoomInLabel = 'Zoom in',
  zoomOutLabel = 'Zoom out',
  resetZoomLabel = 'Reset zoom',
  fallbackLabel = 'Image unavailable',
  className = '',
  returnFocusRef,
  onCurrentIdChange,
  onOpenChange,
}: LightboxArtworkProps) {
  const fallbackIndex = Math.max(0, images.findIndex((image) => image.id === currentId));
  const currentIndex = images.length ? fallbackIndex : -1;
  const current = currentIndex >= 0 ? images[currentIndex] : undefined;
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [imageFailed, setImageFailed] = useState(false);
  const pointerRef = useRef<{
    id: number;
    startX: number;
    startY: number;
    panX: number;
    panY: number;
  } | null>(null);
  const id = useId().replace(/:/g, '');
  const captionId = `${id}-caption`;
  const mediaId = `${id}-media`;
  const hasMultiple = images.length > 1;
  const atStart = currentIndex <= 0;
  const atEnd = currentIndex >= images.length - 1;
  const canPrevious = hasMultiple && (loop || !atStart);
  const canNext = hasMultiple && (loop || !atEnd);
  const transformStyle = useMemo(() => ({
    '--_lightbox-image-transform': `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
  } as CSSProperties), [pan, zoom]);

  useEffect(() => {
    setZoom(MIN_ZOOM);
    setPan({ x: 0, y: 0 });
    setImageFailed(false);
    pointerRef.current = null;
  }, [currentId, open]);

  function move(direction: number) {
    if (!hasMultiple) return;
    let next = currentIndex + direction;
    if (loop) next = (next + images.length) % images.length;
    else next = clamp(next, 0, images.length - 1);
    if (next !== currentIndex) onCurrentIdChange(images[next].id);
  }

  function updateZoom(next: number) {
    const resolved = clamp(next, MIN_ZOOM, MAX_ZOOM);
    setZoom(resolved);
    if (resolved === MIN_ZOOM) setPan({ x: 0, y: 0 });
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(rtl ? 1 : -1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(rtl ? -1 : 1);
    } else if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      updateZoom(zoom + ZOOM_STEP);
    } else if (event.key === '-') {
      event.preventDefault();
      updateZoom(zoom - ZOOM_STEP);
    } else if (event.key === '0') {
      event.preventDefault();
      updateZoom(MIN_ZOOM);
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0 || !current) return;
    const target = event.target as Element;
    if (target.closest('button, a, video, iframe, model-viewer')) return;
    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId || zoom === MIN_ZOOM) return;
    const bound = (zoom - MIN_ZOOM) * 240;
    setPan({
      x: clamp(pointer.panX + event.clientX - pointer.startX, -bound, bound),
      y: clamp(pointer.panY + event.clientY - pointer.startY, -bound, bound),
    });
  }

  function handlePointerEnd(event: PointerEvent<HTMLElement>) {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    pointerRef.current = null;
    if (zoom !== MIN_ZOOM) return;
    const deltaX = event.clientX - pointer.startX;
    const deltaY = event.clientY - pointer.startY;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    move((deltaX < 0) !== rtl ? 1 : -1);
  }

  if (!current) return null;

  return (
    <ModalArtwork
      id={`${id}-lightbox`}
      title={title}
      open={open}
      dismissLabel={dismissLabel}
      triggerLabel={title}
      showTrigger={false}
      overlayClassName={`lightbox lightbox--open ${className}`.trim()}
      className="lightbox__dialog"
      headerClassName="lightbox__header"
      titleClassName="lightbox__title visually-hidden"
      closeClassName="lightbox__close"
      bodyClassName="lightbox__body"
      closeIcon={<X className="close-btn__icon" aria-hidden="true" />}
      descriptionId={current.caption ? captionId : undefined}
      returnFocusRef={returnFocusRef}
      onDialogKeyDown={handleDialogKeyDown}
      onOpenChange={onOpenChange}
    >
      <figure
        className="lightbox__content"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div className="lightbox__viewport" data-zoomed={zoom > MIN_ZOOM || undefined}>
          {imageFailed ? (
            <div className="lightbox__fallback" id={mediaId} role="img" aria-label={current.alt}>{fallbackLabel}</div>
          ) : (
            <img
              className={`lightbox__image ${current.className ?? ''}`.trim()}
              id={mediaId}
              src={current.src}
              alt={current.alt}
              draggable="false"
              style={transformStyle}
              onError={() => setImageFailed(true)}
            />
          )}
        </div>
        <div className="lightbox__counter" dir="ltr" aria-hidden="true">{currentIndex + 1} / {images.length}</div>
        {current.caption && <figcaption className="lightbox__caption" id={captionId}>{current.caption}</figcaption>}
      </figure>
      <div className="lightbox__zoom" role="group" aria-label="Image zoom controls">
        <button className="lightbox__zoom-action icon-btn icon-btn--round" type="button" aria-label={zoomOutLabel} disabled={zoom === MIN_ZOOM} onClick={() => updateZoom(zoom - ZOOM_STEP)}>
          <Minus className="icon-btn__icon" aria-hidden="true" />
        </button>
        <button className="lightbox__zoom-action icon-btn icon-btn--round" type="button" aria-label={resetZoomLabel} disabled={zoom === MIN_ZOOM} onClick={() => updateZoom(MIN_ZOOM)}>
          <RotateCcw className="icon-btn__icon" aria-hidden="true" />
        </button>
        <button className="lightbox__zoom-action icon-btn icon-btn--round" type="button" aria-label={zoomInLabel} disabled={zoom === MAX_ZOOM} onClick={() => updateZoom(zoom + ZOOM_STEP)}>
          <Plus className="icon-btn__icon" aria-hidden="true" />
        </button>
      </div>
      {hasMultiple && (
        <>
          <button className="lightbox__nav lightbox__nav--prev icon-btn icon-btn--round" type="button" aria-label={previousLabel} aria-controls={mediaId} disabled={!canPrevious} onClick={() => move(-1)}>
            <ArrowLeft className="icon-btn__icon" aria-hidden="true" />
          </button>
          <button className="lightbox__nav lightbox__nav--next icon-btn icon-btn--round" type="button" aria-label={nextLabel} aria-controls={mediaId} disabled={!canNext} onClick={() => move(1)}>
            <ArrowRight className="icon-btn__icon" aria-hidden="true" />
          </button>
        </>
      )}
      <p className="lightbox__status visually-hidden" role="status" aria-live="polite" aria-atomic="true">
        {`${currentIndex + 1} of ${images.length}: ${current.caption || current.alt}`}
      </p>
    </ModalArtwork>
  );
}

export type { LightboxImage };
