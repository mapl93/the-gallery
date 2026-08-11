import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { ArrowLeft, ArrowRight, Box, Play } from 'lucide-react';
import LightboxArtwork from './LightboxArtwork';

type ProductGalleryMediaType = 'image' | 'video' | 'external-video' | 'model';
type ProductGalleryImageDetail = 'lightbox' | 'none';

interface ProductGalleryMediaBase {
  id: string;
  type: ProductGalleryMediaType;
  label: string;
  previewSrc: string;
  previewAlt: string;
  className?: string;
  badgeLabel?: string;
}

interface ProductGalleryImageMedia extends ProductGalleryMediaBase {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

interface ProductGalleryInteractiveMedia extends ProductGalleryMediaBase {
  type: 'video' | 'external-video' | 'model';
  activationLabel: string;
  activeContent?: ReactNode;
  arAction?: ReactNode;
}

type ProductGalleryMedia = ProductGalleryImageMedia | ProductGalleryInteractiveMedia;

interface ProductGalleryArtworkProps {
  media: ProductGalleryMedia[];
  currentId: string;
  onCurrentIdChange: (id: string) => void;
  imageDetail?: ProductGalleryImageDetail;
  loop?: boolean;
  className?: string;
  selectionLabel?: string;
  thumbnailGroupLabel?: string;
  paginationGroupLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  openDetailLabel?: string;
  showThumbnails?: boolean;
  showPagination?: boolean;
}

const SWIPE_THRESHOLD = 48;

function mediaBadge(media: ProductGalleryMedia) {
  if (media.badgeLabel) return media.badgeLabel;
  if (media.type === 'video') return 'Video';
  if (media.type === 'external-video') return 'External video';
  if (media.type === 'model') return '3D';
  return '';
}

function clampIndex(index: number, length: number) {
  return Math.min(Math.max(index, 0), Math.max(length - 1, 0));
}

export default function ProductGalleryArtwork({
  media,
  currentId,
  onCurrentIdChange,
  imageDetail = 'lightbox',
  loop = false,
  className = '',
  selectionLabel = 'Show product media',
  thumbnailGroupLabel = 'Product media views',
  paginationGroupLabel = 'Product media pages',
  previousLabel = 'Previous media',
  nextLabel = 'Next media',
  openDetailLabel = 'Open image detail',
  showThumbnails = true,
  showPagination = true,
}: ProductGalleryArtworkProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageActionRef = useRef<HTMLButtonElement>(null);
  const restoreImageFocusRef = useRef(false);
  const pointerRef = useRef<{ id: number; x: number; y: number } | null>(null);
  const [activeInteractiveId, setActiveInteractiveId] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const id = useId().replace(/:/g, '');

  const foundIndex = media.findIndex((item) => item.id === currentId);
  const currentIndex = foundIndex >= 0 ? foundIndex : 0;
  const current = media[currentIndex];
  const hasMultipleMedia = media.length > 1;
  const atStart = currentIndex === 0;
  const atEnd = currentIndex === media.length - 1;
  const canPrevious = hasMultipleMedia && (loop || !atStart);
  const canNext = hasMultipleMedia && (loop || !atEnd);
  const imageMedia = media.filter((item): item is ProductGalleryImageMedia => item.type === 'image');

  useEffect(() => {
    rootRef.current?.querySelectorAll('video').forEach((video) => video.pause());
    setActiveInteractiveId(null);
  }, [currentId]);

  useEffect(() => {
    if (current?.type !== 'image') setLightboxOpen(false);
  }, [current?.type]);

  useEffect(() => {
    if (lightboxOpen) {
      restoreImageFocusRef.current = true;
      return undefined;
    }
    if (!restoreImageFocusRef.current) return undefined;
    restoreImageFocusRef.current = false;
    const frame = requestAnimationFrame(() => imageActionRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [lightboxOpen]);

  if (!current) return null;

  function select(idToSelect: string) {
    if (idToSelect !== current.id) onCurrentIdChange(idToSelect);
  }

  function move(direction: number) {
    if (!hasMultipleMedia) return;
    let next = currentIndex + direction;
    if (loop) next = (next + media.length) % media.length;
    else next = clampIndex(next, media.length);
    select(media[next].id);
  }

  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || (event.target as Element).closest('button, video, iframe, model-viewer')) return;
    pointerRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pointerEnd(event: PointerEvent<HTMLDivElement>) {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    pointerRef.current = null;
    const deltaX = event.clientX - pointer.x;
    const deltaY = event.clientY - pointer.y;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    move((deltaX < 0) !== rtl ? 1 : -1);
  }

  function renderImage(item: ProductGalleryImageMedia) {
    const image = <img src={item.src} alt={item.alt} className={item.className} />;
    if (imageDetail === 'none') return image;
    return (
      <button
        ref={item.id === current.id ? imageActionRef : undefined}
        className="product-gallery__image-action"
        type="button"
        aria-label={`${openDetailLabel}: ${item.label}`}
        onClick={() => setLightboxOpen(true)}
      >
        {image}
      </button>
    );
  }

  function renderInteractive(item: ProductGalleryInteractiveMedia) {
    const active = activeInteractiveId === item.id;
    if (active && item.activeContent) {
      return <div className="product-gallery__interactive" data-gallery-active-content>{item.activeContent}</div>;
    }
    const Icon = item.type === 'model' ? Box : Play;
    return (
      <div className="product-gallery__poster">
        <img src={item.previewSrc} alt={item.previewAlt} className={item.className} />
        <button className="product-gallery__activate btn" type="button" onClick={() => setActiveInteractiveId(item.id)}>
          <Icon className="btn__icon" aria-hidden="true" />
          <span>{item.activationLabel}</span>
        </button>
        {item.type === 'model' && item.arAction && <div className="product-gallery__ar">{item.arAction}</div>}
      </div>
    );
  }

  return (
    <div className={['product-gallery', className].filter(Boolean).join(' ')} ref={rootRef} data-image-detail={imageDetail} data-loop={loop || undefined}>
      <div className="product-gallery__layout">
        <div
          className="product-gallery__main"
          data-gallery-viewport
          onPointerDown={pointerDown}
          onPointerUp={pointerEnd}
          onPointerCancel={pointerEnd}
        >
          {media.map((item) => (
            <div
              className={`product-gallery__media product-gallery__media--${item.type}`}
              data-gallery-media-id={item.id}
              data-gallery-media-type={item.type}
              hidden={item.id !== current.id}
              key={item.id}
            >
              {item.type === 'image' ? renderImage(item) : renderInteractive(item)}
            </div>
          ))}
          {hasMultipleMedia && (
            <>
              <button className="product-gallery__nav product-gallery__nav--prev icon-btn icon-btn--round" type="button" aria-label={previousLabel} disabled={!canPrevious} onClick={() => move(-1)}>
                <ArrowLeft className="icon-btn__icon" aria-hidden="true" />
              </button>
              <button className="product-gallery__nav product-gallery__nav--next icon-btn icon-btn--round" type="button" aria-label={nextLabel} disabled={!canNext} onClick={() => move(1)}>
                <ArrowRight className="icon-btn__icon" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
        {hasMultipleMedia && showThumbnails && (
          <div className="product-gallery__thumbs" role="group" aria-label={thumbnailGroupLabel}>
            {media.map((item) => {
              const badge = mediaBadge(item);
              return (
                <button
                  className="product-gallery__thumb"
                  type="button"
                  aria-label={`${selectionLabel}: ${item.label}`}
                  aria-current={current.id === item.id ? 'true' : undefined}
                  data-gallery-media-id={item.id}
                  onClick={() => select(item.id)}
                  key={item.id}
                >
                  <img src={item.previewSrc} alt="" className={item.className} />
                  {badge && <span className="badge product-gallery__media-badge" aria-hidden="true">{badge}</span>}
                </button>
              );
            })}
          </div>
        )}
        {hasMultipleMedia && showPagination && (
          <div className="product-gallery__dots" role="group" aria-label={paginationGroupLabel}>
            {media.map((item) => (
              <button
                className="product-gallery__dot"
                type="button"
                aria-label={`${selectionLabel}: ${item.label}`}
                aria-current={current.id === item.id ? 'true' : undefined}
                data-gallery-media-id={item.id}
                onClick={() => select(item.id)}
                key={item.id}
              />
            ))}
          </div>
        )}
        <p className="product-gallery__status visually-hidden" role="status" aria-live="polite" aria-atomic="true">
          {`${currentIndex + 1} of ${media.length}: ${current.label}`}
        </p>
      </div>
      {imageDetail === 'lightbox' && imageMedia.length > 0 && (
        <LightboxArtwork
          images={imageMedia.map((item) => ({
            id: item.id,
            src: item.src,
            alt: item.alt,
            caption: item.caption || item.label,
            className: item.className,
          }))}
          currentId={current.type === 'image' ? current.id : imageMedia[0].id}
          open={lightboxOpen && current.type === 'image'}
          loop={loop}
          title="Product image detail"
          returnFocusRef={imageActionRef}
          onCurrentIdChange={select}
          onOpenChange={setLightboxOpen}
        />
      )}
    </div>
  );
}

export type {
  ProductGalleryArtworkProps,
  ProductGalleryImageDetail,
  ProductGalleryMedia,
  ProductGalleryMediaType,
};
