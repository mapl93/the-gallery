# 0248. First-Party Collection Promo Placement Policy

Status: Accepted

Date: 2026-07-20

Builds on: ADR 0218

## Context

ADR 0218 certifies the neutral E6 implementation as a passive editorial article
inside a real Collection Grid item, with one optional explicit canonical Link,
parent-owned Span 2 placement, intrinsic response and zero runtime. It
intentionally left commercial eligibility, insertion, optional-destination and
target ownership decisions open.

The owner selected E6-A. Neutral v1 needs one bounded first-party editorial
promotion, not an advertising surface or an insertion engine. It must remain a
truthful member of the collection result presentation without becoming a
Product Card, changing product records, or fabricating navigation.

## Decision

- E6 represents first-party editorial content only in neutral v1. Sponsored or
  paid placements, disclosure, targeting and measurement are outside this
  contract and require a separate reviewed decision.
- E6 remains one passive article. Its media, title and remaining surface are not
  links or buttons. The one optional CTA is an explicit canonical native Link
  rendered only from a complete non-empty visible label and destination pair.
  A missing pair leaves a valid passive article with no destination.
- Eligible collection pages, editorial records, insertion index, frequency,
  audience and stable source order are target-owned inputs. E6 exposes no public
  placement, frequency, audience, targeting or analytics property.
- Promo insertion must not alter the product query, product order, pagination,
  product count or filter/sort truth. Targets that cannot preserve those facts
  omit E6 rather than simulate an in-grid placement.
- `span-2` remains an available request only when the actual parent Collection
  Grid has at least two coherent tracks. The parent item owns placement and a
  one-track layout falls back without creating an implicit track or reordering.
- Heading rank and native destination metadata remain target-document and
  target-navigation concerns. Neutral E6 does not expose heading level,
  `target`, `rel`, locale or download behavior as visual component properties.
- Shopify maps E6 only through an explicit collection-grid block or record whose
  section owns schema, source data, insertion, localization, editor preview,
  pagination/count preservation and live-store behavior. CSS projection alone
  does not make the Shopify adapter target-ready.
- The current media/no-media, overlay, typography, crop, spacing, radius, focus,
  icon and one/two-track artwork is a human-review candidate, not final visual
  approval. Component-specific Figma evidence and explicit stability review
  remain required.
- E6 remains `pilot`; this owner decision moves the technically complete
  candidate into the human-review queue and does not promote it to `stable`.

## Consequences

- The neutral contract has a clear commercial boundary and does not need
  sponsorship, disclosure, targeting or placement APIs.
- Optional CTA omission is a supported semantic state rather than an unresolved
  product question.
- Collection result truth and Shopify/editor integration stay with the layer
  that owns the underlying product data.
- Existing batch 127 browser evidence remains valid because this decision
  reconciles ownership and policy without changing E6 DOM, CSS or runtime.
- Final visual quality, target integration and stability remain explicit human
  gates.

## References

- <https://www.w3.org/WAI/ARIA/apg/patterns/link/>
- <https://www.w3.org/WAI/tutorials/images/decision-tree/>
- <https://open-ui.org/components/link-area-delegation.explainer/>
- <https://shopify.dev/docs/storefronts/themes/architecture/blocks/index>
- <https://shopify.dev/docs/storefronts/themes/architecture/templates/collection>
