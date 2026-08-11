# Component Refinement Batch 29

Status: Product Gallery technically refined; product/architecture input required

Date: 2026-07-14

Components: Product Gallery

## Outcome

Product Gallery's dossier, semantic decision, contract, canonical CSS/JS,
shared Exhibit/Studio renderer and fixture, Studio metadata, MDX, Shopify Liquid
and locales, generated adapters, browser evidence and individual audit are
reconciled. The component remains `pilot` and is intentionally not ready for
human stability review until the owner decides mobile control duplication and
the v1 rich-media/Lightbox boundary.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Research And Decision

- WAI-ARIA APG permits direct Carousel pickers as Buttons and permits Tabs only
  with complete tab/tablist/tabpanel relationships and keyboard behavior.
- Open UI demonstrates that mature carousel APIs vary across dots, navigation,
  touch, looping, events and autoplay; the Gallery does not expose all of them.
- Radix Tabs confirms controlled/uncontrolled and orientation APIs are coupled
  to full Tabs behavior, not a shortcut for image picker Buttons.
- Shopify's current guidance requires type-specific rendering and controls for
  image, video, external video and model media. The current adapter is documented
  honestly as image-only.
- ADR 0114 accepts finite ordinary Button groups, `aria-current`, a 48rem
  container layout, 44px compact targets and bounded neutral enhancement while
  preserving the unresolved rich-media/Lightbox and mobile-control decisions.

## Browser Evidence Summary

- Exact Exhibit/Studio initial outerHTML parity is 1,504 characters.
- Four viewports cover both modes; before/after evidence includes four baseline
  and eighteen refined images.
- A 628px gallery stays stacked at a large viewport; an 800px gallery uses the
  side rail and hides dots. Mobile root/document widths do not overflow.
- Compact controls grow from 8x8px to 44x44px without changing the private 8px
  bullet.
- Studio semantic controls now bind. Pointer and neutral Web Tab+Enter selection
  synchronize main source, main alt and `aria-current` in both groups.
- Dark, forced colors, reduced motion, wide hover magnification, long localized
  content and 200% zoom are evidenced.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Product CSS | `5,050 B` | `5.2 KiB` | pass (`274 B` headroom; `+156 B` batch delta) |
| Shared neutral runtime | `10,492 B` | `8 KiB` | exception (`2,300 B` over; `+321 B` bounded behavior delta) |
| Neutral Web components CSS | `64,930 B` | `64 KiB` | pass (`606 B` headroom; `+122 B` batch delta) |

## Validation

- Registry/docs, DTCG source, 183 contracts and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; known unrelated Shopify
  maturity warnings remain non-blocking backlog.
- Structural certification, Exhibit/Studio parity, static previews and global
  refinement audits pass across all 183 components.
- TypeScript, JavaScript syntax, temporary Vite build, browser semantic/
  responsive/special-media probes, locale parsing, deterministic gzip, generated
  copy identity, diff checks and explicit `site/dist` cleanliness pass.

## Required Product And Architecture Input

1. Decide whether Product Gallery v1 requires or optionally composes Lightbox
   and which zoom/pan, swipe, loop or full-screen capabilities belong there.
2. Decide whether mobile keeps thumbnails plus compact dots or chooses one
   control set. Six controls for three items are currently coherent but
   redundant.
3. Decide whether image-only is acceptable for v1 or full Shopify product media
   parity is required before human review.
4. Define controlled/uncontrolled API names and change events when framework
   adapters are implemented; the neutral contract does not invent them.
5. Human review must approve the square crop, threshold, control geometry,
   selected treatment, hover magnification and imagery.

## Program Progress

The regenerated matrix shows 183 components, 105 dependency edges, 70 dossiers
and 63 components ready for human review. Product Gallery is refined but blocked;
only Button is human-approved. The next dependency-safe component is Product
Info (review order 71).
