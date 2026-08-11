# 0249. Empty Collection Target-Owned Lifecycle Profile

Status: Accepted

Date: 2026-07-20

Builds on: ADRs 0219 and 0236

## Context

ADR 0219 removes E7's duplicate Empty State and Button implementation and makes
it a zero-runtime Collection profile over canonical Empty State. ADR 0236
assigns contextual native heading rank to the host. The remaining product
questions concerned whether E7 remains named, whether absence causes become
public variants, and which layer owns result replacement, recovery, status and
focus.

The owner selected E7-A. The component's durable value is a Collection-domain
identity and canonical composition, while the evidence that makes an empty view
truthful belongs to the target that owns the collection query and result region.

## Decision

- E7 remains a distinct named Collection-domain profile and has zero intentional
  visual divergence from canonical Empty State.
- Its semantic surface is required non-empty `title`, optional `message`,
  optional decorative `icon`, and at most one optional target-composed canonical
  Button command or Link navigation action.
- The host supplies a contextual native heading under ADR 0236. Heading rank is
  not an E7 property, variant or Studio control.
- E7 exposes no public cause or reason enum. Genuinely empty source inventory,
  filtered or searched zero results and merchandising exclusion are target
  lifecycle facts expressed through truthful localized content and the recovery
  action actually available in that context.
- The target is the sole truth owner. It atomically selects E7 instead of stale
  Grid and Pagination output, decides which filter/sort controls remain useful,
  and owns the recovery operation, URL/history, loading/error feedback,
  analytics and deliberate post-action focus.
- Static or route-rendered E7 remains ordinary content. It creates no automatic
  live region and does not move focus. A qualifying in-place transition may
  update one pre-existing target-owned localized Status output.
- Shopify remains planned until its owning collection section distinguishes
  source inventory empty from filtered/search zero, supplies truthful localized
  copy and recovery, and proves atomic Grid/Pagination/filter replacement,
  URL/history, focus, status and section-refresh behavior.
- Final review evaluates E7 as the canonical Empty State artwork in collection
  context. E7-specific Figma evidence may document that composition but may not
  introduce an independent visual system without a new decision.
- E7 remains `pilot`; entering the human-review queue does not promote it to
  `stable`.

## Consequences

- Consumers get a stable, portable Collection identity without a cross-target
  cause taxonomy that the component cannot validate.
- Button-versus-Link semantics remain truthful and target-specific without
  leaking action sub-properties into E7.
- Result truth, status and focus stay coordinated by one owning target rather
  than fragmented across Empty State markup.
- Existing batch 128 browser evidence remains valid because the owner decision
  reconciles lifecycle ownership without changing E7 DOM, CSS or runtime.
- Shopify data distinction, final visual review, Figma evidence and explicit
  stability approval remain evidence gates.

## References

- <https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html>
- <https://www.w3.org/WAI/tutorials/page-structure/headings/>
- <https://shopify.dev/docs/api/liquid/objects/collection>
- <https://shopify.dev/docs/storefronts/themes/navigation-search/filtering/tag-filtering>
