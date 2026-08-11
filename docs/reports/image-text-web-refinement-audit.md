# Image with Text Web Refinement Audit

Status: `human-review-ready`; technical refinement complete; remains `pilot`

Date: 2026-07-15

Component: S3 Image with Text

Contract: `components/contracts/image-text.contract.json` (`0.3.0`, `pilot`)

Decision: keep Image with Text as a passive, complete media-and-narrative
section. Require target-owned media, visible title and non-empty body; compose
one optional canonical Button action; preserve five presentations and stable
source order; leave media/action/content lifecycle with each target.

## Outcome

- Required media, title and body form one validity boundary. Missing any member
  omits the root instead of rendering an incomplete or unnamed section.
- The required visible heading names the native thematic `section` through
  `aria-labelledby`; targets retain heading-rank ownership.
- Target-owned native media retains source, intrinsic dimensions, responsive
  sources, alternative, loading, art direction and focal-point ownership.
- Eyebrow and action collapse independently. The action is a truthful native
  destination styled through canonical Button rather than a cancelled fixture.
- Default/Reversed use intrinsic two-track response at `768px`; Stacked remains
  one column, Overlay uses explicit inverse text and an invariant scrim, and
  Offset owns only contained parent geometry.
- Reversed preserves media then content in DOM order and moves media visually
  only when the root has two tracks.
- A private `4 / 3` media ratio replaces unbounded portrait growth. Crop,
  measure, threshold, block size, scrim and inset remain review candidates, not
  public properties.
- Forced colors decomposes Overlay into visible media followed by system-color
  content. Reduced motion adds no S3 animation or runtime.
- Site-only S3 height, measure, crop and breakpoint rules are removed. Exhibit
  and Studio consume the same renderer, fixture and canonical CSS.
- Shopify receives a localized addable section with responsive image output,
  explicit image semantics, required content, a complete action pair and the
  five variants. ADR 0147 records the permanent boundary.

## Before / After Findings

| Finding | Baseline | Final | Result |
| --- | --- | --- | --- |
| Section naming | Required title visually present but root unlabelled; empty H2 allowed | Non-empty H2 names root; invalid title omits root | pass |
| Required composition | Renderer could omit media/body independently | Media/title/body are one strict precondition | pass |
| Media geometry | Portrait fixture drives `1.5x` block ratio and extreme heights | Private `4 / 3` bounded media in ordinary modes | pass candidate |
| Default response | Viewport, generic container and site rules compete | Intrinsic tracks plus one named descendant query; exact `767/768px` transition | pass |
| Reversed order | Physical order with independent repair rules | Stable DOM; media order changes only in two-track mode | pass |
| Overlay contrast | Wrapper white, but child title/body remain dark over image | Explicit inverse children over semantic-opacity scrim | pass |
| Forced colors | No component fallback | Visible media plus `Canvas`/`CanvasText` content | pass |
| Optional content | Action exists as fake fragment and is cancelled | Eyebrow/action collapse; real native destination | pass |
| Studio ownership | `420/300/460/620px` and `720px` behavior in site CSS | Site supplies fixture media only | pass |
| Shopify | CSS-ready with no dedicated Liquid/schema/data | Localized addable Section Adapter; all maturity layers ready | pass |

## Contract And API

The six-property neutral surface remains intentionally small:

- `variant` — `default`, `reversed`, `stacked`, `overlay`, or `offset`.
- `media` — required target-owned native slot with explicit image/media facts.
- `eyebrow` — optional short context.
- `title` — required non-empty contextual heading content; target owns rank.
- `body` — required non-empty target-owned rich-content slot.
- `action` — optional complete Button-composed navigation or command.

S3 exposes no source URL, alt shortcut, focal point, object fit, ratio, media
height, heading level, alignment, breakpoint, content width, padding, scrim
opacity, loading state, analytics event or editor object. It has no
controlled/uncontrolled store. Interactive media/action lifecycle belongs to
the target or canonical child contract.

## Rubric

| Gate | Result | Evidence / remaining review |
| --- | --- | --- |
| Purpose and limits | `pass` | Passive single media/narrative section; Hero, Gallery, Rich Text and Product Card remain distinct. |
| Anatomy and composition | `pass` | Required named root/media/content/title/body; optional eyebrow and canonical Button action. |
| Variants and modes | `pass` | Five variants preserve source order and have explicit responsive/Overlay boundaries. |
| Public API | `pass` | Six semantic properties; crop, threshold, measure and scrim remain private. |
| State ownership | `pass` | No local state; target owns media, content, action and editor lifecycle. |
| Tokens and values | `pass` | Complete type/color/surface/spacing/radius/opacity semantics; numeric composition is private. |
| Visual system | `pass` for candidate | Four paired viewports plus five wide variants; final aesthetics await owner approval. |
| Accessibility | `pass` | Named section, native image/heading/action, stable order, contrast and system-color fallback. |
| Motion | `pass` | No S3 motion/runtime; inherited durations clamp to `0.00001s` under reduce. |
| Responsive behavior | `pass` | Intrinsic tracks and named container descendant order; no viewport or Studio rule. |
| Content resilience | `pass` | Empty/optional, long, unbroken, Spanish/Arabic RTL and effective 200% contain. |
| Runtime and assets | `pass` locally / global gap | Zero S3 JS/assets; Sections remains under ceiling; global CSS/runtime exceptions remain explicit. |
| Cross-target translation | `pass` for Web/Shopify | Web/Webflow/Shopify CSS synchronized; dedicated Shopify section is ready. |
| Documentation parity | `pass` | Exact Exhibit/Studio root DOM and one fixture/render branch. |
| Verification | `pass` | Validators, official Liquid, browser matrix, bundle budgets, copies, console and diff checks pass. |

## Browser Evidence

- Evidence directory: `output/playwright/refinement-batch-62/`.
- Baseline: eight paired viewport captures and five wide variant captures.
- Final: eight paired viewport captures, five wide variants and seven special
  captures for focus, dark, forced colors, mobile Overlay, localized/extreme
  content and effective 200% layout.
- Paired viewports: `390x844`, `768x1024`, `1280x900`, and `1536x960` in both
  Exhibit and Studio.
- Exact initial root DOM at all paired renders: `737` characters, FNV-1a
  `aafe8637`. Both views share the same heading id/relationship, image
  alternative and real action destination.
- Default root at direct `1120px`: `560px 560px` tracks and `420px` total
  height. Baseline was an `840px` portrait media row. Reversed has the same
  geometry, media computed `order: 2`, and unchanged DOM children
  `[media, content]`.
- Stacked at `1120px`: `840px` media plus bounded content; baseline media was
  `1,680px`. Overlay is `1120x650px`, content `640x650px`, and all three text
  parts compute `rgb(255 255 255)`. Offset is `1120x502px` with two `498px`
  tracks and `374px` media.
- At root `767px`, Default/Reversed have one track and media `order: 0`; at
  `768px`, both have two `384px` tracks and Reversed media `order: 2`.
- Empty title, missing required media, or missing required body yields root
  count `0`. Empty eyebrow/action yields part count `0` while root remains `1`.
- Pointer and Enter action both reach `/components/material-library`. Focus is a
  `2px` solid outline with `2px` offset.
- Light contrast is `17.93:1` for title and `7.81:1` for body. White over the
  worst-case 60% black scrim result is `5.74:1`.
- Mobile Overlay is `358x384px`, uses inverse title/body, and has no overflow.
  Forced colors produces `532x399px` visible media followed by `532x399px`
  system-color content.
- Long Arabic/Spanish RTL content at `1120px`, unbroken content at `358px`, and
  effective `288px` layout all report root `scrollWidth == clientWidth` with no
  overflowing descendants.
- Dark computes surface `rgb(23 23 23)`, title `rgb(250 250 250)`, and body
  `rgb(212 212 212)`. Fresh console inspection reports zero errors and zero
  warnings.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,464 B` | `6,743 B` | `6,861 B` | pass; `118 B` remaining |
| Neutral Web component CSS | `66,551 B` | `66,850 B` | `65,536 B` | existing gap is `1,314 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing gap; `0 B` added |

S3 adds no listener, observer, timer, network request, layout read, formatter,
component JavaScript or asset. The one media asset, responsive source selection,
loading and intrinsic dimensions remain target-owned. Canonical, Webflow and
Shopify Sections CSS copies are SHA-256 identical.

## Cross-Target Result

| Target | Result |
| --- | --- |
| Neutral Web | Refined, generated, validated and browser-evidenced passive composition. |
| Shopify | `implemented`, `ready: true`, section-adapter; Liquid, schema, data, behavior, template composition and editor preview are ready. |
| Webflow | Canonical Sections CSS copy regenerated and source-identical. |
| React / Angular | Planned thin slots/props composition with no local store. |
| Figma | Generic Studio/Button reference only; final S3 crop/density/scrim require owner review. |
| SwiftUI / Compose | Documented target-native adaptive media/narrative projection. |

Shopify adapter metrics after the batch are 59 target-ready components, 29
dedicated Liquid-ready components and 20/20 ready section schemas. S3 has nine
used settings, a preset, no dead or undeclared settings, native responsive image
generation and no section JavaScript.

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run build:components`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- `npm run audit:previews:static`
- official Shopify Liquid validation for the Section Adapter and two schema
  locale files, artifact `image-text-s3-batch62`, revision 1
- real Chromium interaction, responsive, content, theme, contrast,
  forced-color, reduced-motion and effective-zoom matrix
- source/generated-copy identity checks
- `git diff --check`
- clean `site/dist` status

Global certification, Exhibit/Studio, refinement and dependency reports are
regenerated after this report and recorded in Batch 62.

## Human Review Queue

1. Approve the private `4 / 3` crop and Default/Reversed two-column balance.
2. Approve Mobile/Stacked type rhythm, content padding and long-page height.
3. Approve Offset inset, grid gap, radius and contained density.
4. Approve Overlay minimum height, scrim falloff, text measure and CTA hierarchy.
5. Confirm the six-property neutral API and nine-setting Shopify surface.
6. Define interactive video/media child policy only if a product needs it.
7. Create component-specific Figma examples after browser visual approval.

## Readiness

`ready for human review`: semantic, visual-candidate, responsive, interaction,
runtime, documentation and Web/Shopify translation evidence is complete. Human
review must approve aesthetics and the public contract before any stability
promotion. Contract remains `pilot`; no `stable` promotion was made.
