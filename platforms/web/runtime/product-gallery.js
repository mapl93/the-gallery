/** Generated from components/js/theme.js: Product gallery. */
import { enhanceMatches, expose, register } from './core.js';

/* ---- Product gallery ---- */
function enhanceProductGallery(root) {
  if (!(root instanceof HTMLElement)
      || !root.matches('[data-product-gallery]')
      || root.dataset.productGalleryEnhanced === 'true') return;

  const panels = Array.from(root.querySelectorAll('[data-gallery-media-id][data-gallery-media-type]')).filter((panel) => (
    panel instanceof HTMLElement
  ));
  const controls = Array.from(root.querySelectorAll('button[data-gallery-media-id]'));
  const viewport = root.querySelector('[data-gallery-viewport]');
  const status = root.querySelector('[data-gallery-status]');
  const lightbox = root.querySelector('[data-gallery-lightbox]');
  if (panels.length === 0 || !(viewport instanceof HTMLElement)) return;

  let pointer = null;
  let lightboxTrigger = null;
  let zoom = 1;
  let panX = 0;
  let panY = 0;

  function currentId() {
    return root.dataset.galleryCurrentId
      || panels.find((panel) => !panel.hidden)?.dataset.galleryMediaId
      || panels[0].dataset.galleryMediaId;
  }

  function release(panel) {
    if (!(panel instanceof HTMLElement)) return;
    panel.querySelectorAll('video, audio').forEach((media) => media.pause());
    panel.querySelectorAll('[data-gallery-generated]').forEach((generated) => generated.remove());
    panel.querySelectorAll('[data-gallery-poster]').forEach((poster) => { poster.hidden = false; });
    panel.querySelectorAll('[data-gallery-active-slot]').forEach((slot) => { slot.hidden = true; });
  }

  function updateBounds() {
    const index = panels.findIndex((panel) => panel.dataset.galleryMediaId === currentId());
    const loop = root.dataset.loop === 'true';
    root.querySelectorAll('[data-gallery-action="previous"]').forEach((control) => {
      if (control instanceof HTMLButtonElement) control.disabled = !loop && index <= 0;
    });
    root.querySelectorAll('[data-gallery-action="next"]').forEach((control) => {
      if (control instanceof HTMLButtonElement) control.disabled = !loop && index >= panels.length - 1;
    });
  }

  function select(id, announce = true) {
    const next = panels.find((panel) => panel.dataset.galleryMediaId === String(id));
    if (!next) return;
    const previous = panels.find((panel) => panel.dataset.galleryMediaId === currentId());
    if (previous && previous !== next) release(previous);
    panels.forEach((panel) => { panel.hidden = panel !== next; });
    controls.forEach((control) => {
      if (control.dataset.galleryMediaId === String(id)) control.setAttribute('aria-current', 'true');
      else control.removeAttribute('aria-current');
    });
    root.dataset.galleryCurrentId = String(id);
    updateBounds();
    if (announce && status) {
      const index = panels.indexOf(next);
      status.textContent = `${index + 1} of ${panels.length}: ${next.dataset.galleryLabel || ''}`;
    }
    root.dispatchEvent(new CustomEvent('tg:product-gallery-change', {
      bubbles: true,
      detail: { currentId: String(id) },
    }));
  }

  function move(direction) {
    const index = panels.findIndex((panel) => panel.dataset.galleryMediaId === currentId());
    let next = index + direction;
    if (root.dataset.loop === 'true') next = (next + panels.length) % panels.length;
    else next = Math.min(Math.max(next, 0), panels.length - 1);
    if (next !== index) select(panels[next].dataset.galleryMediaId);
  }

  function activate(panel) {
    const template = panel?.querySelector('template[data-gallery-template]');
    const slot = panel?.querySelector('[data-gallery-active-slot]');
    const poster = panel?.querySelector('[data-gallery-poster]');
    if (!(template instanceof HTMLTemplateElement) || !(slot instanceof HTMLElement)) return;
    slot.replaceChildren(template.content.cloneNode(true));
    slot.querySelectorAll('*').forEach((element) => element.setAttribute('data-gallery-generated', ''));
    slot.hidden = false;
    if (poster instanceof HTMLElement) poster.hidden = true;
    const video = slot.querySelector('video');
    if (video instanceof HTMLVideoElement) video.play().catch(() => {});
  }

  function lightboxImages() {
    return panels.filter((panel) => panel.dataset.galleryMediaType === 'image');
  }

  function syncLightbox(id) {
    if (!(lightbox instanceof HTMLElement)) return;
    const sourcePanel = panels.find((panel) => panel.dataset.galleryMediaId === String(id));
    const source = sourcePanel?.querySelector('img[data-gallery-detail-source], .product-gallery__media--image img');
    const target = lightbox.querySelector('[data-gallery-lightbox-image], .lightbox__image');
    if (!(source instanceof HTMLImageElement) || !(target instanceof HTMLImageElement)) return;
    target.src = source.currentSrc || source.src;
    target.srcset = source.srcset;
    target.sizes = source.sizes;
    target.alt = source.alt;
    lightbox.dataset.galleryLightboxCurrentId = String(id);
    const images = lightboxImages();
    const index = images.indexOf(sourcePanel);
    const counter = lightbox.querySelector('[data-gallery-lightbox-counter]');
    const caption = lightbox.querySelector('[data-gallery-lightbox-caption]');
    const lightboxStatus = lightbox.querySelector('[data-gallery-lightbox-status]');
    const text = sourcePanel?.dataset.galleryCaption || sourcePanel?.dataset.galleryLabel || source.alt;
    if (counter) counter.textContent = `${index + 1} / ${images.length}`;
    if (caption) caption.textContent = text;
    if (lightboxStatus) lightboxStatus.textContent = `${index + 1} of ${images.length}: ${text}`;
    const loop = root.dataset.loop === 'true';
    lightbox.querySelectorAll('[data-gallery-lightbox-action="previous"]').forEach((control) => {
      if (control instanceof HTMLButtonElement) control.disabled = !loop && index <= 0;
    });
    lightbox.querySelectorAll('[data-gallery-lightbox-action="next"]').forEach((control) => {
      if (control instanceof HTMLButtonElement) control.disabled = !loop && index >= images.length - 1;
    });
    select(id, false);
    setZoom(1);
  }

  function moveLightbox(direction) {
    if (!(lightbox instanceof HTMLElement)) return;
    const images = lightboxImages();
    const id = lightbox.dataset.galleryLightboxCurrentId;
    const index = images.findIndex((panel) => panel.dataset.galleryMediaId === id);
    let next = index + direction;
    if (root.dataset.loop === 'true') next = (next + images.length) % images.length;
    else next = Math.min(Math.max(next, 0), images.length - 1);
    if (next !== index) syncLightbox(images[next].dataset.galleryMediaId);
  }

  function setZoom(next) {
    if (!(lightbox instanceof HTMLElement)) return;
    zoom = Math.min(Math.max(next, 1), 3);
    if (zoom === 1) { panX = 0; panY = 0; }
    const image = lightbox.querySelector('[data-gallery-lightbox-image], .lightbox__image');
    if (image instanceof HTMLElement) {
      image.style.setProperty('--_lightbox-image-transform', `translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`);
    }
    const viewportElement = lightbox.querySelector('.lightbox__viewport');
    if (viewportElement instanceof HTMLElement) viewportElement.toggleAttribute('data-zoomed', zoom > 1);
    lightbox.querySelectorAll('[data-gallery-zoom="out"], [data-gallery-zoom="reset"]').forEach((control) => {
      if (control instanceof HTMLButtonElement) control.disabled = zoom === 1;
    });
    lightbox.querySelectorAll('[data-gallery-zoom="in"]').forEach((control) => {
      if (control instanceof HTMLButtonElement) control.disabled = zoom === 3;
    });
  }

  function openLightbox(trigger) {
    if (!(lightbox instanceof HTMLElement)) return;
    const panel = trigger.closest('[data-gallery-media-id]');
    if (!(panel instanceof HTMLElement)) return;
    lightboxTrigger = trigger;
    syncLightbox(panel.dataset.galleryMediaId);
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.querySelector('[data-gallery-lightbox-close]')?.focus();
  }

  function closeLightbox() {
    if (!(lightbox instanceof HTMLElement)) return;
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.hidden = true;
    setZoom(1);
    if (lightboxTrigger instanceof HTMLElement && lightboxTrigger.isConnected) lightboxTrigger.focus();
    lightboxTrigger = null;
  }

  root.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const control = target?.closest('button[data-gallery-media-id]');
    if (control instanceof HTMLButtonElement && root.contains(control)) {
      select(control.dataset.galleryMediaId);
      return;
    }
    const action = target?.closest('[data-gallery-action]');
    if (action instanceof HTMLButtonElement) {
      move(action.dataset.galleryAction === 'previous' ? -1 : 1);
      return;
    }
    const activation = target?.closest('[data-gallery-activate]');
    if (activation instanceof HTMLButtonElement) {
      activate(activation.closest('[data-gallery-media-id]'));
      return;
    }
    const detail = target?.closest('[data-gallery-open-detail]');
    if (detail instanceof HTMLButtonElement) {
      openLightbox(detail);
      return;
    }
    const lightboxAction = target?.closest('[data-gallery-lightbox-action]');
    if (lightboxAction instanceof HTMLButtonElement) {
      moveLightbox(lightboxAction.dataset.galleryLightboxAction === 'previous' ? -1 : 1);
      return;
    }
    const zoomAction = target?.closest('[data-gallery-zoom]');
    if (zoomAction instanceof HTMLButtonElement) {
      if (zoomAction.dataset.galleryZoom === 'in') setZoom(zoom + 0.5);
      else if (zoomAction.dataset.galleryZoom === 'out') setZoom(zoom - 0.5);
      else setZoom(1);
      return;
    }
    if (target?.closest('[data-gallery-lightbox-close]')) closeLightbox();
  });

  root.addEventListener('keydown', (event) => {
    if (!(lightbox instanceof HTMLElement) || lightbox.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); closeLightbox(); return; }
    const rtl = getComputedStyle(root).direction === 'rtl';
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveLightbox(rtl ? 1 : -1); return; }
    if (event.key === 'ArrowRight') { event.preventDefault(); moveLightbox(rtl ? -1 : 1); return; }
    if (event.key === '+' || event.key === '=') { event.preventDefault(); setZoom(zoom + 0.5); return; }
    if (event.key === '-') { event.preventDefault(); setZoom(zoom - 0.5); return; }
    if (event.key === '0') { event.preventDefault(); setZoom(1); return; }
    if (event.key !== 'Tab') return;
    const focusable = Array.from(lightbox.querySelectorAll('button:not(:disabled), [href], [tabindex]:not([tabindex="-1"])'));
    const index = focusable.indexOf(document.activeElement);
    if (event.shiftKey && index <= 0) { event.preventDefault(); focusable[focusable.length - 1]?.focus(); }
    else if (!event.shiftKey && index === focusable.length - 1) { event.preventDefault(); focusable[0]?.focus(); }
  });

  root.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || !(event.target instanceof Element)
        || event.target.closest('button, video, iframe, model-viewer')) return;
    const inLightbox = event.target.closest('[data-gallery-lightbox]');
    const inViewport = event.target.closest('[data-gallery-viewport]');
    if (!inLightbox && !inViewport) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, panX, panY, lightbox: Boolean(inLightbox) };
    root.setPointerCapture(event.pointerId);
  });
  root.addEventListener('pointermove', (event) => {
    if (!pointer || pointer.id !== event.pointerId || !pointer.lightbox || zoom === 1) return;
    const bound = (zoom - 1) * 240;
    panX = Math.min(Math.max(pointer.panX + event.clientX - pointer.x, -bound), bound);
    panY = Math.min(Math.max(pointer.panY + event.clientY - pointer.y, -bound), bound);
    setZoom(zoom);
  });
  root.addEventListener('pointerup', (event) => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const start = pointer;
    pointer = null;
    if (root.hasPointerCapture(event.pointerId)) root.releasePointerCapture(event.pointerId);
    if (start.lightbox && zoom !== 1) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    const rtl = getComputedStyle(root).direction === 'rtl';
    const direction = (deltaX < 0) !== rtl ? 1 : -1;
    if (start.lightbox) moveLightbox(direction);
    else move(direction);
  });
  root.addEventListener('pointercancel', () => { pointer = null; });
  root.addEventListener('tg:product-gallery-select', (event) => {
    if (event instanceof CustomEvent) select(event.detail?.currentId);
  });

  const initial = currentId();
  select(initial, false);
  if (lightbox instanceof HTMLElement) lightbox.hidden = true;

  root.dataset.productGalleryEnhanced = 'true';
}

function enhanceProductGalleries(scope = document) {
  enhanceMatches(scope, '[data-product-gallery]', enhanceProductGallery);
}

expose({ enhanceProductGalleries });
register({ id: 'product-gallery', enhance: enhanceProductGalleries });
