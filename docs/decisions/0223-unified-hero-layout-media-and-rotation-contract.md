# ADR 0223: Unified Hero Layout, Media And Rotation Contract

- Status: Accepted
- Date: 2026-07-20
- Supersedes the open identity boundary in ADR 0145
- Related: ADR 0220 and `docs/refinement/owner-decision-responses.md`

## Context

G1 Hero Banner and S1 Hero Section duplicated the same page-introduction,
media, scrim, heading, copy and action composition. G1 owned the real Shopify
section while S1 contained the stronger container-responsive full, split,
text-only and fullscreen source. S1 exposed empty parallax and incomplete
slideshow hooks.

The owner selected one public Hero under the existing `hero` identity and
required the useful behavior from both components, including complete parallax,
slideshow, optional autoplay and a visible current-slide timing bar.

## Decision

- G1 `hero` is the sole canonical public implementation and Shopify adapter.
  S1 `hero-section` becomes a deprecated migration record and owns no distinct
  CSS, renderer, fixture, behavior or target adapter.
- Layout, height and media behavior are independent semantic axes:
  `layout: full | split | text-only`, `height: default | fullscreen`, and
  `mediaBehavior: none | parallax | slideshow`. Text-only derives media and
  motion as absent.
- Hero composes canonical Button, Icon Button and Carousel anatomy. Slideshow
  uses a real focusable scroll-snap track and real ordered slide groups. Looping
  changes logical indices; it never clones slides.
- Navigation is `both | arrows | indicators`; direct touch scrolling is
  supplementary. The Hero root does not intercept horizontal arrows.
- Autoplay defaults off. When enabled it requires visible Pause/Play, pauses on
  hover and focus-within, performs no hidden-document work, and is suppressed
  by reduced motion. Manual slide selection pauses autoplay and never causes an
  implicit automatic restart.
- Loop defaults true. With loop false, endpoint navigation is disabled and
  autoplay stops at the final real slide.
- The interval defaults to 6000ms and is bounded to 3000–12000ms. One visual,
  aria-hidden timing bar resets on navigation and freezes with autoplay.
  Discrete current-slide changes update one polite localized status.
- Parallax is progressive CSS scroll-driven translation of the classified
  single-media item. Unsupported browsers retain static media and reduced
  motion removes translation and animation.
- The target owns media classification, alternative text, crop/focal point,
  loading priority, video controls/captions/transcripts/consent, heading rank,
  action destinations, analytics and authored contrast verification.

## Consequences

- Neutral Web gains one bounded Hero slideshow controller in shared
  `theme.js`; it creates no clones, network request, per-instance observer or
  background work while the document is hidden.
- Exhibit and Studio use one `HeroArtwork` renderer and fixture for both the
  canonical G1 page and temporary S1 migration page.
- Shopify theme-editor settings and image-slide blocks map to the same semantic
  axes and shared runtime.
- S1 remains in the 183-item certification inventory only as a deprecated
  migration record until its final removal is approved; it cannot be promoted
  to `stable`.
- G1 remains `pilot` until explicit human visual, interaction and device review.
