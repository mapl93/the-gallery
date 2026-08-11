# Hero Web Refinement Audit

Status: `human-review-ready`; not `stable`

Date: 2026-07-20

Component: G1 Hero (`hero`)

Contract: `components/contracts/hero.contract.json` (`0.3.0`, `pilot`)

Decision: ADR 0223

## Outcome

The accepted G1/S1 consolidation is implemented. G1 is the sole canonical Hero;
S1 is a deprecated migration record. Layout, height and media behavior are
independent semantic axes. Parallax is a reduced-motion-safe progressive CSS
capability. Slideshow now has real slides, native selection controls, optional
autoplay, finite or circular navigation, focus/hover/visibility pauses, a
visible Pause/Play control, localized status and a synchronized visual timing
bar.

Exhibit and Studio render the same `HeroArtwork` fixture and canonical source.
The Shopify section maps merchant settings and slide blocks to that same
contract. No `stable` promotion was made.

## Before / After

| Finding | Before | Final | Result |
| --- | --- | --- | --- |
| Public identity | G1 and S1 duplicated anatomy and adapter ownership | G1 canonical; S1 deprecated-forward only | pass |
| Layout | G1 default-only; S1 separate full/split/text-only CSS | One independent layout axis and intrinsic container response | pass |
| Parallax | Empty class hook or permanent compositor hint | Progressive scroll-driven CSS; static fallback; zero motion when reduced | pass |
| Slideshow | Presentation-only horizontal lane | Real controls, current state, scroll synchronization and events | pass |
| Loop | Undefined | Logical wrap by default; finite disabled endpoints; no clones | pass |
| Autoplay | Shopify video behavior was unconditional; neutral Hero had no lifecycle | Opt-in false default, visible Pause/Play, focus/hover/hidden/reduced pauses | pass |
| Timing feedback | None | One aria-hidden current-slide progress bar that freezes and resets | pass |
| Media semantics | Visible title reused as image alternative | Decorative fixtures use empty alt; targets classify authored media | pass |
| Responsive controls | Narrow Exhibit title broke within words; mobile controls overlapped content/actions | Private narrow-container type scale, taller composition and dedicated control band | pass |
| Exhibit / Studio | Separate G1/S1 implementations and docs repair | One renderer and fixture for both pages and both modes | pass |
| Shopify | G1-only behavior with contract drift | Canonical section, blocks, localized controls, same runtime; manifest target-ready | pass |

## Interaction Evidence

- Autoplay state was `playing`; progress transform advanced from `0.148843` to
  `0.233519` during a 500ms sample.
- Pointer hover froze the bar and changed state to `paused`; pointer leave
  resumed it. Focus on Next paused it; blur resumed it.
- Manual Next selected slide index 1, updated matching slide and indicator
  current states, paused rotation and changed the control label to
  `Play slideshow`.
- With `loop=false`, direct selection of the last real slide disabled Next,
  retained Previous and did not clone any slide.
- Parallax rendered one media item and no slideshow controls. Text-only rendered
  content with no media or controls.
- Reduced-motion evidence reports autoplay off, progress/rotation hidden,
  non-smooth scrolling and no parallax transform/animation.
- The final browser pass reported zero console errors and warnings.

## Visual And Content Evidence

Directory: `output/playwright/refinement-marketing/hero-0223/`

- 16 paired final captures: G1 and the S1 migration page, Exhibit and Studio,
  at 390x844, 768x1024, 1280x800 and 1600x1000.
- `hero-studio-parallax-mobile.png` verifies the static/progressive media
  composition without carousel controls.
- `hero-studio-text-only-desktop.png` verifies coherent media omission.
- `hero-studio-localized-long-mobile.png` verifies long Spanish label, title and
  description without overflow or action/control collision.
- Baseline captures are retained in the earlier parity directories; no
  `site/dist` rebuild was performed.

## Composition, API And Accessibility

- The required non-empty title gates rendering; heading rank is host-owned.
- Overlay is media-contained and absent without media. Text-only removes stale
  media, slides, controls, progress and motion.
- Actions are canonical Button; navigation and rotation controls are canonical
  Icon Button; track, slides and dots compose canonical Carousel anatomy.
- The contract exposes 19 semantic properties and keeps timers, pause reasons,
  geometry and progress mechanics private.
- Static Web owns an uncontrolled progressive-enhancement lifecycle and emits
  `herochange` / `heroplaybackchange`; future stateful targets may control the
  same semantic state without changing anatomy.
- Native buttons own keyboard operation. No root-wide arrow handler exists.
- Discrete slide changes use a polite status; continuously changing progress is
  visual-only. Focus, hover, document visibility and reduced motion all affect
  rotation as required.

## Cross-Target Result

| Target | Result |
| --- | --- |
| Neutral Web | Implemented canonical CSS + shared JS; generated adapter validates 183 components. |
| Shopify | Implemented target-native Hero section, settings, image-slide blocks, localized labels and shared runtime; 84 components are target-ready globally. |
| React / Angular | Planned thin controlled/uncontrolled adapter over the same semantic contract. |
| Figma | Planned semantic component/property mapping; no runtime or target types enter neutral source. |
| SwiftUI / Compose | Planned native paging, pause, reduced-motion and accessibility equivalents. |

## Performance

The fixed ceilings were not changed.

| Surface | Current gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Neutral component CSS | 69,470 B | 65,536 B | documented global gap |
| Shared runtime | 13,078 B | 8,192 B | documented global gap |
| Marketing family | 5,335 B | 4,198 B | 1,137 B documented by ADR 0223 |

The Hero runtime adds bounded slideshow lifecycle work only when a slideshow is
present. It performs no hidden-document timeout work, creates no slide clones,
network requests or per-instance observer, and leaves media loading to targets.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run build:adapter:web` and `npm run validate:adapter:web`
- `npm run build:adapter:shopify` and `npm run validate:adapter:shopify`
- official Shopify Liquid validation for the canonical section and locales
- real Chromium interaction, responsive and special-mode evidence
- `npm run audit:refinement:performance -- --allow-gaps`
- `npm run evidence:assert-clean`
- `git diff --check`

## Readiness

`human-review-ready`. The implementation, semantics, interaction lifecycle,
cross-target mapping and evidence are reconciled. Human visual/device review is
still required, and the contract remains `pilot`.
