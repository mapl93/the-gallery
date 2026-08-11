# Masonry Gallery Web Refinement Audit

Status: ready for human review; remains `pilot`

Date: 2026-07-14

Component: Masonry Gallery (`F5`)

## Outcome

Masonry Gallery is reconciled as a passive native artwork list with
authoritative source order, component-width multi-columns, target-owned natural
media proportions and optional persistent captions. Contract, registry,
canonical CSS, MDX, shared Exhibit/Studio renderer, Studio metadata, Shopify
Liquid/locales, generated Web/Shopify/Webflow adapters, dossier, ADR and browser
evidence agree.

The component is `human-review-ready` but remains `pilot`. Human review must
approve the visual proposal and the activation question remains open. No Link,
Lightbox, Price or Card dependency and no activation property was inferred.

## Research And Decision

- HTML and WAI support native list plus figure/caption composition, contextual
  per-image alternative text and visible text as the preferred naming source.
- CSS multi-column layout preserves source flow and supports fragmentation;
  experimental Grid masonry still carries explicit reading-order concerns.
- Open UI documents divergent Card/media/overlay APIs rather than a settled
  gallery anatomy. Radix keeps Grid and Aspect Ratio generic; Polaris keeps
  image alt, ratio, sources, fit and loading explicit.
- Shopify sections and blocks provide the target-native ordered merchant editor
  model, with `block.shopify_attributes` and image metadata preserved.
- Direct Figma inspection of file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and
  inspector `1020:480`, found the generic Studio/Button prototype, not Masonry
  Gallery artwork. No ratio, column, caption or spacing choice was inferred.

ADR 0127 records the safe boundary: passive native composition, intrinsic
multi-columns, natural media, persistent captions, target-native optional
interaction and zero neutral runtime. ADR 0080 still reserves passive versus
link versus Lightbox activation for explicit owner/product review.

## Contract And Implementation Result

- Contract `0.2.0` remains `pilot`: seven anatomy parts, one variant, one size,
  three states, seven behaviors, one required slot, twenty-one public tokens and
  no dependency.
- `.masonry-gallery` is a native list with canonical margin/list reset, logical
  section inset and CSS multi-columns using a private `13rem` minimum and
  maximum of three tracks.
- `.masonry-gallery__item` uses intact inline-block fragmentation and logical
  track spacing; no dense packing, CSS order or JavaScript measurement exists.
- Images retain natural dimensions. The shared fixture proves repository
  portrait `1800x2700` and landscape `1800x1200–1202` assets without nth-child
  ratios or component crop.
- Passive figures have no cursor, tabindex, hover scale or activation. Their
  optional caption remains opaque on fine and coarse pointers.
- Only a native interactive target root receives paired fine-pointer hover and
  focus-visible disclosure, visible focus and optional subtle image scale.
- Caption uses neutral surface/text tokens, complete type pairs and semantic
  weights. Button color tokens, literal font weight/type scale and hover-only
  opacity are removed.
- Canonical CSS owns forced-color caption separation and reduced-motion
  behavior. Site-only list/figure resets, columns and artificial ratios are
  removed.
- Fixture title/alt pairs match actual assets and omit blank price spans. MDX
  uses native list/figure anatomy. Exhibit and Studio share one renderer and
  fixture.
- Shopify maps image-backed artwork blocks, alt/decorative intent, optional
  title and formatted price to the same passive anatomy. It localizes its
  accessible name and schema, preserves editor block attributes and reports
  `implemented`, `section-adapter`, `ready: true`.

## Browser Evidence

### Parity And Responsive Layout

- Mobile (`390x844`), Tablet (`768x1024`), Desktop (`1440x1000`) and XL
  (`1920x1200`) produce exact initial Exhibit/Studio `outerHTML` parity. Clean
  component HTML is `1,989` characters.
- Exhibit root widths are `310/688/532/536px`; Studio widths are
  `310/688/644/704px`. Mobile resolves one visual track; all other docs roots
  resolve two. Every passive caption computes opacity `1`, root overflow is
  visible and page overflow is zero.
- Isolated `260/580/900px` roots resolve `1/2/3` visual tracks with identical
  source order. The private minimum and maximum therefore respond to component
  width rather than page viewport.
- Natural source dimensions remain `1800x2700` portrait and
  `1800x1200–1202` landscape. No measured or generated height is written.

### Semantics, Optional Content And Interaction

- Accessibility inspection exposes one named native list, five list items, five
  named figures and five images with accurate alternatives. The passive
  candidate exposes no link, button, live region or selected state.
- A missing complete caption, missing title and missing price are independently
  omitted without blank replacement anatomy.
- Passive pieces compute `cursor: auto` and `tabIndex: -1`. A synthetic native
  link target computes caption opacity `0` at rest, `1` after fine-pointer hover
  and `1` at focus-visible; image transform becomes `scale(1.02)` only there.
- The interactive target receives a `2px` solid primary outline with `2px`
  offset, dispatches exactly one native Enter click and retains focus.

### Content, Themes, Reflow And Preferences

- Long Arabic title plus unbroken Latin price remain contained in a `368px` RTL
  root; `scrollWidth === clientWidth`.
- An isolated `320px` CSS root at 200% keeps `scrollWidth === clientWidth` and
  creates no page overflow.
- Light caption contrast is `17.93:1` title and `7.81:1` price. Dark contrast is
  `17.18:1` and `12.09:1` respectively.
- Forced colors resolves to Canvas/CanvasText with a solid `1px` caption
  boundary. Reduced motion resolves image/caption transitions to `0s` and image
  transform to `none`.
- Four before images, eight final viewport images and eleven special-state
  images live under `output/playwright/refinement-batch-42/`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native ordered list, passive figures, intrinsic multi-columns, natural images and persistent optional captions. | Implemented, generated and validated; no component runtime. |
| Shopify | Localized addable section with reorderable image-backed artwork blocks, decorative intent and optional metadata. | `implemented`, `section-adapter`, maturity `ready: true`; official Liquid/locales validation passes. |
| Webflow | Canonical target-agnostic CSS copy and target-authored semantic markup. | Source/generated identity verified. |
| React / Angular | Passive ordered items/slots with adapter-owned images and optional native activation composition. | Planned; no state service or lifecycle required. |
| Figma | One/two/three columns, natural ratios, caption/theme/localized/extreme and future interactive-focus specimens. | Planned; registered reference is unrelated generic Button artwork. |
| SwiftUI / Compose | Native visual collection retaining logical data order, target aspect ratios and explicit activation. | Conceptual; loading/accessibility details remain target-owned. |

## Performance And Risks

- Storytelling CSS is `4,376 B / 4.2 KiB`, a `76 B` exception and `2 B`
  increase from Batch 41.
- Complete neutral Web component CSS is `66,291 B / 64 KiB`, a `755 B` program
  gap and `53 B` increase from Batch 41. The ceiling remains binding.
- Shared runtime is `10,501 B / 8 KiB`, the existing `2,309 B` exception.
  Masonry Gallery adds `0 B` runtime, listener, observer, timer or request.
- Human review must approve the private `13rem` minimum, maximum three columns,
  source-flow visual reading, natural ratio treatment, medium radius, caption
  surface/placement, type hierarchy, padding and optional interactive scale.
- Owner/product review must separately decide passive/link/Lightbox activation.
  Public columns, ratio, crop, caption mode, density, group naming and activation
  remain intentionally absent.

## Validation

Registry/docs, source tokens, 183 contracts, 183 Studio definitions, neutral
Web, Shopify and Webflow adapters, official Shopify five-file validation,
structural certification, static Preview audit, exact Exhibit/Studio parity,
source/generated CSS identity, four viewport modes, isolated intrinsic tracks,
natural media, optional omission, passive/interactive boundaries, native Enter,
localized RTL extremes, 200% reflow, light/dark contrast, forced colors, reduced
motion, deterministic gzip, global refinement audit, temporary site build
outside `site/dist`, diff checks, final component-console inspection and
explicit `site/dist` cleanliness comprise Batch 42.

The fresh site console contains only the pre-existing shell-level
`/favicon.ico` 404. `site/dist` was not rebuilt or modified.

## Remaining Human Review

- Approve or revise private column width/count/gap and source-flow visual order.
- Approve or revise natural proportions, radius, caption surface/placement,
  type hierarchy, padding and interactive scale.
- Decide passive versus artwork link versus Lightbox versus target-selectable
  activation and any dependency implications.
- Confirm that layout, ratio, crop, caption and activation controls remain
  outside the v1 neutral API.
- Do not promote the contract to `stable` without explicit human approval.
