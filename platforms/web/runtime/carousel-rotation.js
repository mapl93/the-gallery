/** Generated from components/js/theme.js: Shared Carousel rotation service. */
import { enhanceMatches, expose, register } from './core.js';

/* ---- Shared Carousel rotation service ---- */
const carouselRotationEntries = new Map();
const carouselReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function enhanceCarouselRotation(root, options) {
  const track = root.querySelector(options.track);
  const slides = Array.from(root.querySelectorAll(options.slide)).filter((slide) => (
    slide instanceof HTMLElement
  ));
  if (!(track instanceof HTMLElement) || slides.length < 2) return;

  const previous = root.querySelector(options.previous);
  const next = root.querySelector(options.next);
  const indicators = options.indicator
    ? Array.from(root.querySelectorAll(options.indicator)).filter((control) => (
      control instanceof HTMLButtonElement
    ))
    : [];
  const rotationControl = root.querySelector(options.rotationControl);
  const pauseIcon = root.querySelector(options.pauseIcon);
  const playIcon = root.querySelector(options.playIcon);
  const status = root.querySelector(options.status);
  const counter = options.counter ? root.querySelector(options.counter) : null;
  const progressValue = options.progress ? root.querySelector(options.progress) : null;
  const parsedInterval = Number(root.dataset.autoplayInterval);
  const interval = Number.isFinite(parsedInterval)
    ? Math.min(12000, Math.max(3000, parsedInterval))
    : 6000;
  const autoplay = root.dataset.autoplay === 'true';
  const loop = options.loop(root);
  const statusTemplate = status instanceof HTMLElement
    ? status.dataset.statusTemplate || options.statusFallback
    : options.statusFallback;
  const counterTemplate = counter instanceof HTMLElement
    ? counter.dataset.counterTemplate || '{current}/{total}'
    : '{current}/{total}';

  let current = Math.max(0, slides.findIndex((slide) => slide.getAttribute('aria-current') === 'true'));
  let userPaused = false;
  let hoverPaused = false;
  let hiddenPaused = document.hidden;
  let timer = 0;
  let remaining = interval;
  let startedAt = 0;
  let scrollFrame = 0;
  let programmaticScroll = false;
  let scrollReleaseTimer = 0;
  let playbackSignature = '';

  if (options.intervalProperty) root.style.setProperty(options.intervalProperty, `${interval}ms`);

  function format(template, index) {
    return template
      .replace('{current}', String(index + 1))
      .replace('{total}', String(slides.length));
  }

  function reduced() {
    return carouselReducedMotion.matches;
  }

  function shouldPlay() {
    return autoplay && !reduced() && !userPaused && !hoverPaused && !hiddenPaused;
  }

  function clearTimer(preserveRemaining = true) {
    if (!timer) return;
    if (preserveRemaining) {
      remaining = Math.max(0, remaining - (performance.now() - startedAt));
    }
    window.clearTimeout(timer);
    timer = 0;
  }

  function resetProgress() {
    if (!(progressValue instanceof HTMLElement)) return;
    progressValue.style.animationName = 'none';
    void progressValue.offsetWidth;
    progressValue.style.removeProperty('animation-name');
  }

  function updateRotationControl() {
    if (!(rotationControl instanceof HTMLButtonElement)) return;
    const pauseLabel = rotationControl.dataset.pauseLabel || options.pauseFallback;
    const playLabel = rotationControl.dataset.playLabel || options.playFallback;
    rotationControl.setAttribute('aria-label', userPaused ? playLabel : pauseLabel);
    rotationControl.setAttribute('aria-pressed', String(userPaused));
    if (pauseIcon instanceof HTMLElement) pauseIcon.hidden = userPaused;
    if (playIcon instanceof HTMLElement) playIcon.hidden = !userPaused;
  }

  function emitPlaybackChange(state) {
    root.dispatchEvent(new CustomEvent(options.playbackEvent, {
      bubbles: true,
      detail: { state, current, autoplay, userPaused },
    }));
  }

  function syncPlayback() {
    root.dataset.reducedMotion = String(reduced());
    const nextState = !autoplay || reduced()
      ? 'off'
      : shouldPlay() ? 'playing' : 'paused';
    const nextSignature = `${nextState}:${userPaused}`;
    const changed = playbackSignature !== nextSignature;
    playbackSignature = nextSignature;
    root.dataset.autoplayState = nextState;
    root.dataset.userPaused = String(userPaused);
    if (status instanceof HTMLElement) status.setAttribute('aria-live', shouldPlay() ? 'off' : 'polite');
    updateRotationControl();

    if (!shouldPlay()) {
      clearTimer(true);
      if (changed) emitPlaybackChange(nextState);
      return;
    }

    if (!timer) {
      if (remaining <= 0) remaining = interval;
      startedAt = performance.now();
      timer = window.setTimeout(() => {
        timer = 0;
        remaining = interval;
        if (!loop && current === slides.length - 1) {
          userPaused = true;
          syncPlayback();
          return;
        }
        selectSlide(current + 1, { manual: false, scroll: true });
      }, remaining);
    }
    if (changed) emitPlaybackChange(nextState);
  }

  function syncSelection({ announce = true } = {}) {
    slides.forEach((slide, index) => {
      if (index === current) slide.setAttribute('aria-current', 'true');
      else slide.removeAttribute('aria-current');
    });
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('carousel__dot--active', index === current);
      if (index === current) indicator.setAttribute('aria-current', 'true');
      else indicator.removeAttribute('aria-current');
    });
    if (previous instanceof HTMLButtonElement) previous.disabled = !loop && current === 0;
    if (next instanceof HTMLButtonElement) next.disabled = !loop && current === slides.length - 1;
    root.dataset.currentSlide = String(current);
    if (counter instanceof HTMLElement) counter.textContent = format(counterTemplate, current);
    if (announce && status instanceof HTMLElement) status.textContent = format(statusTemplate, current);
  }

  function normalizeIndex(index) {
    if (loop) return (index + slides.length) % slides.length;
    return Math.max(0, Math.min(slides.length - 1, index));
  }

  function releaseProgrammaticScroll() {
    programmaticScroll = false;
    if (scrollReleaseTimer) window.clearTimeout(scrollReleaseTimer);
    scrollReleaseTimer = 0;
  }

  function selectSlide(index, { manual = false, scroll = true } = {}) {
    const nextIndex = normalizeIndex(index);
    const changed = nextIndex !== current;
    if (manual && autoplay) userPaused = true;
    current = nextIndex;
    clearTimer(false);
    remaining = interval;
    syncSelection({ announce: changed });
    resetProgress();
    if (scroll && changed) {
      programmaticScroll = true;
      if (scrollReleaseTimer) window.clearTimeout(scrollReleaseTimer);
      scrollReleaseTimer = window.setTimeout(releaseProgrammaticScroll, 800);
      slides[current].scrollIntoView({
        behavior: reduced() ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
    syncPlayback();
    if (changed) {
      root.dispatchEvent(new CustomEvent(options.changeEvent, {
        bubbles: true,
        detail: { current, total: slides.length, manual },
      }));
    }
  }

  root.addEventListener('click', (event) => {
    const control = event.target instanceof Element ? event.target.closest('button') : null;
    if (!(control instanceof HTMLButtonElement) || !root.contains(control)) return;
    if (control === previous) selectSlide(current - 1, { manual: true, scroll: true });
    else if (control === next) selectSlide(current + 1, { manual: true, scroll: true });
    else if (control === rotationControl) {
      userPaused = !userPaused;
      syncPlayback();
    } else {
      const indicatorIndex = indicators.indexOf(control);
      if (indicatorIndex >= 0) selectSlide(indicatorIndex, { manual: true, scroll: true });
    }
  });

  track.addEventListener('scroll', () => {
    if (programmaticScroll || scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      const trackRect = track.getBoundingClientRect();
      const midpoint = trackRect.left + (trackRect.width / 2);
      const nearest = slides.reduce((best, slide, index) => {
        const rect = slide.getBoundingClientRect();
        const distance = Math.abs((rect.left + (rect.width / 2)) - midpoint);
        return distance < best.distance ? { index, distance } : best;
      }, { index: current, distance: Number.POSITIVE_INFINITY }).index;
      if (nearest !== current) selectSlide(nearest, { manual: true, scroll: false });
    });
  }, { passive: true });
  track.addEventListener('scrollend', releaseProgrammaticScroll);
  track.addEventListener('pointerdown', releaseProgrammaticScroll, { passive: true });

  root.addEventListener('pointerenter', () => {
    hoverPaused = true;
    syncPlayback();
  });
  root.addEventListener('pointerleave', () => {
    hoverPaused = false;
    syncPlayback();
  });
  root.addEventListener('focusin', () => {
    if (autoplay) userPaused = true;
    syncPlayback();
  });

  slides.forEach((slide, index) => {
    if (!slide.getAttribute('aria-label')) slide.setAttribute('aria-label', format(statusTemplate, index));
  });
  syncSelection({ announce: false });
  if (status instanceof HTMLElement) status.textContent = format(statusTemplate, current);
  resetProgress();
  syncPlayback();

  carouselRotationEntries.set(root, {
    syncPlayback,
    setHidden(value) {
      hiddenPaused = value;
      syncPlayback();
    },
    destroy() {
      clearTimer(false);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (scrollReleaseTimer) window.clearTimeout(scrollReleaseTimer);
    },
  });
}

function cleanupCarouselRotations() {
  carouselRotationEntries.forEach((entry, root) => {
    if (root.isConnected) return;
    entry.destroy();
    carouselRotationEntries.delete(root);
  });
}

document.addEventListener('visibilitychange', () => {
  carouselRotationEntries.forEach((entry) => entry.setHidden(document.hidden));
});
carouselReducedMotion.addEventListener?.('change', () => {
  carouselRotationEntries.forEach((entry) => entry.syncPlayback());
});

/* ---- Hero slideshow ---- */
function enhanceHero(root) {
  if (!(root instanceof HTMLElement)
      || !root.matches('[data-hero]')
      || root.dataset.heroEnhanced === 'true') return;

  root.dataset.heroEnhanced = 'true';
  if (root.dataset.mediaBehavior !== 'slideshow') return;
  enhanceCarouselRotation(root, {
    track: '.hero__track',
    slide: '.hero__slide',
    previous: '.hero__previous',
    next: '.hero__next',
    indicator: '.hero__indicator',
    rotationControl: '.hero__rotation-control',
    pauseIcon: '.hero__pause-icon',
    playIcon: '.hero__play-icon',
    status: '.hero__status',
    progress: '.hero__progress-value',
    counter: null,
    loop: (element) => element.dataset.loop !== 'false',
    intervalProperty: '--_hero-interval',
    statusFallback: 'Slide {current} of {total}',
    pauseFallback: 'Pause slideshow',
    playFallback: 'Play slideshow',
    changeEvent: 'herochange',
    playbackEvent: 'heroplaybackchange',
  });
}

function enhanceHeroes(scope = document) {
  enhanceMatches(scope, '[data-hero]', enhanceHero);
}

/* ---- Announcement rotation ---- */
function enhanceAnnouncement(root) {
  if (!(root instanceof HTMLElement)
      || !root.matches('[data-announcement]')
      || root.dataset.announcementEnhanced === 'true') return;

  root.dataset.announcementEnhanced = 'true';
  enhanceCarouselRotation(root, {
    track: '.announcement__track',
    slide: '.announcement__slide',
    previous: '.announcement__previous',
    next: '.announcement__next',
    indicator: null,
    rotationControl: '.announcement__rotation-control',
    pauseIcon: '.announcement__pause-icon',
    playIcon: '.announcement__play-icon',
    status: '.announcement__status',
    progress: null,
    counter: '.announcement__counter',
    loop: () => true,
    intervalProperty: null,
    statusFallback: 'Message {current} of {total}',
    pauseFallback: 'Pause announcements',
    playFallback: 'Play announcements',
    changeEvent: 'announcementchange',
    playbackEvent: 'announcementplaybackchange',
  });
}

function enhanceAnnouncements(scope = document) {
  enhanceMatches(scope, '[data-announcement]', enhanceAnnouncement);
}

expose({ enhanceHeroes, enhanceAnnouncements });
register({
  id: 'carousel-rotation',
  enhance: (scope) => {
    enhanceHeroes(scope);
    enhanceAnnouncements(scope);
  },
  cleanup: cleanupCarouselRotations,
});
