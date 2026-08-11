# Refinement Batch 108 — Rich Product Gallery And Canonical Lightbox

Status: Human-review-ready; both contracts remain `pilot`

Date: 2026-07-20

Components: Product Gallery (`D2`, dependency order `58`) and renewed canonical Lightbox (`B17`)

Accepted decision: D2-C / ADR 0238

## Outcome

Batch 108 replaces the image-only Product Gallery boundary with the accepted
rich-media composition for image, hosted video, external video and model
records. It introduces one stable-id state model, explicit rich-media
activation/release, finite or optional loop bounds, direct swipe and canonical
Lightbox image detail. AR remains an eligible model action supplied by a target.

Standalone Lightbox and Product Gallery now use the same renderer and Modal
lifecycle. Quick View consumes Product Gallery with image detail disabled.
Neutral Web, the documentation renderer and Shopify share the same behavioral
contract without adding a player, provider, model viewer or gesture dependency.

## Delivered

- Accepted ADR 0238, updated open-question/decision coverage and
  human-review-ready Product Gallery/Lightbox dossiers and audits.
- Product Gallery contract `0.3.0` and Lightbox contract `0.4.0`, plus Studio and
  registry updates.
- Shared controlled Product Gallery renderer with discriminated media records,
  explicit native content slots, canonical Badges/Icon Buttons and Lightbox.
- Shared canonical Lightbox renderer composed from Modal, with finite/loop
  navigation, swipe, 1x-3x zoom, bounded pan, fallback and current-trigger focus
  restoration.
- Neutral Web runtime for stable-id selection, deferred rich templates,
  lifecycle release and Lightbox state/focus/zoom/pan.
- Shopify `product.media` snippet using native image/video/external-video/model
  filters, deferred templates, localized actions and eligible Shopify XR.
- Quick View `imageDetail="none"` composition and renewed semantic MDX pages.
- Regenerated Neutral Web and Shopify adapter outputs; `site/dist` untouched.

## Verification Summary

- Product Gallery Exhibit/Studio outer HTML is exactly equal (`7,105`
  characters); standalone Lightbox is exactly equal (`3,855` characters).
- Eight primary Mobile/Tablet/Desktop/XL captures cover Exhibit and Studio.
  Special captures cover hosted video, model, Lightbox zoom, 900px container,
  dark, forced colors/reduced motion and 200% zoom.
- Video/provider/model content count is zero before explicit activation. Play or
  View in 3D creates only the selected native slot and selection change removes
  it.
- Swipe, direct controls, finite disabled bounds and loop wrap synchronize the
  stable current id and polite status.
- Product Lightbox uses only image records, computes a 2x transform, traps focus,
  closes with Escape and restores focus to the current visible detail action.
- Quick View has one passive Product Gallery and no nested Lightbox.
- One managed fixed-port server, one headless Playwright session and one tab
  were used. Cleanup reports port 4173 free, server stopped and session closed.
- Contracts, Studio, TypeScript, JavaScript syntax, docs, decision coverage,
  Neutral Web and Shopify adapter validators pass.
- Shopify adapter now reports `85` target-ready, `58` dedicated Liquid and
  `34/34` schema-ready components. Theme Check has no findings in modified
  Product Gallery files; unrelated baseline files retain existing findings.
- Structural certification reports `183/183` automated pass and refinement
  reports `136` components ready for human review.

## Budgets

| Surface | Final | Ceiling | Result |
| --- | ---: | ---: | --- |
| Product CSS | `4,803 B` | `5,324 B` | pass; `521 B` headroom |
| Neutral component CSS | `70,985 B` | `65,536 B` | documented `5,449 B` gap |
| Layout CSS | `7,174 B` | `4,915 B` | documented `2,259 B` gap |
| Shared runtime | `21,633 B` | `8,192 B` | documented `13,441 B` gap |

The performance audit reports 18 surfaces, 10 pass and 8 documented gaps, with
zero undocumented gaps. Ceilings were not raised. ADR 0238 is executable
evidence for the Product Gallery/Lightbox surfaces.

## Risks And Open Questions

- Decide whether compact Product Gallery visibly keeps both thumbnails and dots
  or only one synchronized direct-control group.
- Approve stage crop/surface, side rail, media Badges, nav controls and fixture
  direction.
- Approve Lightbox canvas, image bounds, caption/counter, mobile layout and the
  1x-3x zoom/pan presentation.
- Decide whether private Lightbox on-canvas values warrant semantic tokens.
- Reduce or explicitly accept the existing neutral CSS/runtime distribution
  gaps before v1 packaging.

## Readiness Decision

Product Gallery and Lightbox are `human-review-ready`. Their semantic identity,
state ownership, rich-media lifecycle, accessibility, responsive behavior,
target translation and Exhibit/Studio parity are reconciled. Explicit visual
review remains pending; no `stable` promotion is authorized.
