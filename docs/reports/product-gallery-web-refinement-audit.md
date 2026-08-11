# Product Gallery Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-20

Accepted direction: D2-C / ADR 0238

## Outcome

Product Gallery is now a controlled rich-media composition for image, hosted
video, external video and model records. It uses stable ids, explicit activation,
finite or optional loop bounds, swipe plus named controls, canonical Badges and
canonical Lightbox image detail. Shopify maps the same lifecycle through
`product.media`, deferred native media templates and eligible model/AR actions.

The component is ready for human review, not `stable`. Compact thumbnail-plus-
dot density and the visual treatment still require owner approval.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Finite product-media inspection; no fetching, autoplay, player/model engine, AR inference or analytics. |
| Anatomy and composition | pass | Stable panels, poster/activation, native active content, Badge, Icon Buttons, direct controls, status and canonical Lightbox. |
| States and modes | pass | Four media types, inactive/active/released, image detail/none, finite/loop, first/middle/last, narrow/wide, RTL and special media. |
| Public API | pass | Only `imageDetail` and `loop`; media/current id/events/localization/native content remain adapter mappings. |
| State ownership | pass | One controlled React owner or one opt-in DOM enhancer; no double enhancement. |
| Accessibility | pass | Named native controls, `aria-current`, synchronized alt/status, explicit activation, focus trap/restore, logical keys and supplementary swipe. |
| Responsive/content | pass with human visual item | Container-based compact/side rail, four viewports, long/localized and 200% evidence; duplicate compact control density awaits review. |
| Runtime/assets | pass with documented program gaps | Rich content deferred and released; no player/gesture/provider dependency. ADR 0238 documents shared-runtime/CSS gaps. |
| Cross-target translation | pass | Neutral Web, documentation React and Shopify implemented; future adapter mappings recorded. |
| Parity/evidence | pass | Exact Exhibit/Studio Product Gallery and standalone Lightbox markup parity plus bounded one-session evidence. |

## Contract And Implementation Evidence

- Product Gallery contract `0.3.0` declares canonical Button, Badge, Icon Button
  and Lightbox dependencies, rich media anatomy, explicit activation/release,
  swipe, finite/loop navigation and `imageDetail`/`loop` properties.
- Lightbox contract `0.4.0` owns loop, swipe and bounded zoom/pan over canonical
  Modal composition.
- Shared React Product Gallery uses discriminated media records and controlled
  `currentId`; Quick View consumes it with `imageDetail="none"`.
- Shared Web runtime synchronizes stable ids, panels, controls and status,
  instantiates rich templates only on explicit action, releases former content,
  and provides the canonical Lightbox lifecycle.
- Shopify Liquid reads `product.media`, uses native media filters, keeps rich
  content in inert templates and exposes localized Play, View in 3D, AR, detail,
  zoom and navigation controls.
- The docs renderer and Shopify mapping add no React/provider/player/model
  dependency to the target-agnostic base.

## Browser Evidence

- Product Gallery Exhibit/Studio initial outer HTML: exact equality, `7,105`
  characters and one root. Standalone Lightbox equality: `3,855` characters.
- Eight primary captures cover Exhibit/Studio at Mobile, Tablet, Desktop and XL.
  Additional captures cover hosted video, model, Lightbox zoom, 900px container,
  dark, forced colors/reduced motion and 200% zoom.
- Before activation, video/iframe/model runtime counts were zero. Explicit Play
  or View in 3D created only the requested content; a selection change removed
  it.
- Direct swipe changed `1 of 5: Front view` to
  `2 of 5: Turntable video`. Finite bounds disabled at edges; loop wrapped Front
  view to Glaze detail without semantic clones.
- Product Lightbox used two image records, synchronized the parent to
  `5 of 5: Glaze detail`, computed `matrix(2, 0, 0, 2, 0, 0)`, trapped focus and
  restored Escape focus to the currently visible detail trigger.
- Quick View rendered one Product Gallery with `imageDetail="none"`, zero image
  detail actions and zero nested Lightboxes.
- Wide container computed `row-reverse` and hid dots. At 200%, Product Gallery
  client and scroll widths were both `628px`. Reduced-motion transition was
  `0s`. Final browser console: zero errors and zero warnings.
- Evidence manifest:
  `output/playwright/refinement-product/product-gallery-0238/manifest.json`.

## Adapter And Automated Validation

- Contract, Studio, docs, TypeScript and shared-JavaScript syntax validations
  pass after the final adapter generation.
- Neutral Web and Shopify adapters are generated from canonical sources and
  validate successfully.
- Shopify CLI Theme Check reports no offenses in files modified for Product
  Gallery; unrelated artist-profile and `_legacy` baseline findings remain
  outside this component.
- Certification/refinement audits preserve the human-review gate and do not
  promote the contract to `stable`.
- `site/dist` is not rebuilt or modified.

## Performance

| Surface | Final gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Product CSS | `4,803 B` | `5,324 B` | pass; `521 B` headroom |
| Neutral component CSS | `70,985 B` | `65,536 B` | documented ADR 0238 gap |
| Layout CSS | `7,174 B` | `4,915 B` | documented ADR 0238 gap |
| Shared runtime | `21,633 B` | `8,192 B` | documented ADR 0238 gap |

The accepted feature adds no framework, player, provider, model viewer, gesture
library, timer, observer, request, cookie, storage or analytics dependency.
Interactive target content stays deferred until requested.

## Human Review And Risks

- Choose whether compact layouts show thumbnails and dots together or only one
  visible direct-control group.
- Approve stage crop/surface, side rail, media Badges, control placement,
  Lightbox canvas, caption/counter hierarchy and zoom controls.
- Decide whether the documented neutral CSS/runtime distribution gaps are
  accepted or should be reduced before v1 packaging.
- Explicit human approval is required before `stable`; this report does not
  authorize promotion.
