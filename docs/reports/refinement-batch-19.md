# Component Refinement Batch 19

Status: Carousel, Scroll Area, and Lightbox complete for human review

Date: 2026-07-14

Components: Carousel / Slider, Scroll Area, Lightbox

## Outcome

All three components are prepared for explicit human stability review. Research
dossiers, accepted semantic boundaries, canonical CSS, one shared Exhibit/Studio
renderer and fixture, contracts, Studio metadata, registry, docs, generated/
copied targets, browser interaction, responsive/special-media evidence, and
individual reports are reconciled.

Carousel is now a finite native scroll-snap collection with canonical controls
and direct-scroll synchronization. Scroll Area remains a single native overflow
node with conditional named-region semantics and platform-aware presentation.
Lightbox composes canonical modal/control sources around a stable, finite image-
viewer lifecycle. No contract moved to `stable`; Button remains the only human-
approved component. `site/dist` was not rebuilt or modified.

## Research And Decision

- WAI-ARIA APG Carousel and Modal Dialog patterns, Open UI Carousel research,
  W3C CSS Overflow/Scroll Snap/Scrollbars and WAI image guidance, Radix, Embla,
  and Shopify establish the finite native-scroll, single-overflow-node, and
  stable named-modal boundaries.
- ADR 0104 keeps the accepted property surfaces narrow: Carousel item
  `current`/`disabled`, Scroll Area optional `label`, and Lightbox `open`/`alt`/
  `caption`. Collection/index state, platform services, custom scrolling,
  autoplay, virtualization, zoom, gestures, and product actions remain target
  or future product decisions.
- Contracts, registry, MDX, Studio metadata, shared renderers, and canonical CSS
  describe the same composition. Carousel consumes Icon Button; Lightbox
  consumes Modal, Close Button, and Icon Button; Scroll Area has no dependency
  or runtime.

## Browser Evidence Summary

- Carousel exposes a named region and slides, 44×44px dot targets, native track
  focus, and synchronized controls/status. Next selects `2 / 3`; direct scroll
  reaches the exact end, selects `3 / 3`, and disables Next. Root arrows do not
  capture descendant input; Arabic RTL variable-width content stays bounded.
- Scroll Area uses one named focusable native region only when labelled.
  PageDown moves `0→201px` of `258px`; removing the label removes role/tabindex/
  name together. Arabic RTL two-axis content measures `324×278px` client versus
  `940×621px` scroll content without page overflow.
- Lightbox enters focus on Close, traps through enabled controls, restores the
  trigger after Escape/backdrop, synchronizes finite arrow/control navigation,
  preserves a stable dialog name without caption, and exposes an informative
  media fallback. RTL logical navigation and a long caption remain bounded.
- Reduced motion disables Carousel smooth/dot motion and Lightbox transition.
  Forced colors preserves focus, bounds, scrollbars, and modal controls. Browser
  console inspection reports zero errors and warnings.
- Thirty-seven after images include 24 canonical captures for 3 components ×
  Exhibit/Studio × Mobile/Tablet/Desktop/XL plus 13 focus, keyboard, localized/
  RTL, long/extreme content, dark, forced-colors, empty-caption, and media-error
  cases. Six contemporaneous desktop before captures are retained under
  `output/playwright/refinement-batch-19/before/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Layout CSS | `6,822 B` | `4.8 KiB` | documented exception (`1,907 B` over) |
| Shared neutral runtime | `10,321 B` | `8 KiB` | existing documented exception; unchanged |
| Batch 19 runtime delta | `0 B` | `0 B` target-owned behavior | pass |
| Neutral Web components CSS | `63,507 B` | `64 KiB` | pass (`2,029 B` headroom) |

Relative to the Batch 19 baseline, Layout adds `465 B`, neutral runtime source
adds `0 B`, and the complete Web component bundle adds `614 B` deterministic
gzip. The Layout exception is explicit and does not rewrite the permanent
ceiling; it records native logical scrolling, focus and special-media behavior,
canonical control/modal composition, safe media geometry, finite bounds, and
fallback presentation.

## Validation

- Registry/docs, DTCG source, 183 contracts, and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; copied Layout CSS and
  shared JS are byte-identical to canonical source. Shopify's 24 existing non-
  blocking maturity warnings remain backlog, while dedicated Carousel and
  Lightbox adapters remain planned and Scroll Area maps through shared classes.
- Structural certification passes 183/183 with one stable contract and zero
  manifest drift. Exhibit/Studio parity is 183/183 shared with complete visual/
  interaction coverage. All 252 static previews and the refinement audit pass.
- TypeScript, a complete Vite build into `/tmp`, browser semantics/interaction/
  content/responsive/special-media probes, zero browser console errors or
  warnings, deterministic gzip, syntax/diff checks, and explicit `site/dist`
  cleanliness pass.

## Remaining Human Risks And Open Input

1. Carousel needs approval of slide width/peek, gap, control/dot geometry,
   shadows, focus, and future visible-page/autoplay/virtualization boundaries.
2. Scroll Area needs approval of scrollbar weight/color, focus boundary,
   coarse-pointer behavior, and whether any custom-scroll or axis API belongs in
   a later scope.
3. Lightbox needs approval of media bounds, scrim/control/caption hierarchy,
   private on-scrim token debt, and future zoom/gesture/thumbnail/action scope.
4. No component-specific owner visual references are registered; accept the
   repository renders or provide replacement evidence.
5. Production modal portal/inertness/scroll-lock and large Carousel collection
   loading/virtualization remain target services with explicit budgets.
6. Layout remains over its `4.8 KiB` ceiling and shared runtime remains above
   `8 KiB`; both are visible exceptions, not implicit resets.
7. Pin Input still requires the owner choice between one full-code native input
   with derived cells and the accepted multiple-input model.

## Program Progress

The regenerated matrix shows 183 components, 104 dependency edges, 58 dossiers,
and 55 components ready for human review. Only Button is human-approved; all
three Batch 19 components remain `pilot` pending explicit human review. Mega
Menu and Bottom Navigation Bar are the next dependency-safe interaction nodes,
followed by the commerce primitives beginning with Badge and Tag; Pin Input
remains isolated until its value-owner decision is required by a dependent
component.
