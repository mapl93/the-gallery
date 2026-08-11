# 0252. Four-Type Target-Qualified Urgency Policy

Status: Accepted

Date: 2026-07-21

Builds on: ADR 0170

## Context

ADR 0170 established G8 as a passive, text-complete, zero-motion commercial
signal with four technically supported claim types. It intentionally deferred
which types remain in v1 and what evidence qualifies them.

The owner selected G8-B and supplied claim-specific qualification boundaries.
Neutral G8 presents only an already-qualified type and complete localized
message; the target that owns the commercial data remains responsible for
proof, freshness, privacy and omission.

## Decision

- V1 retains `low-stock`, `selling-fast`, `viewers` and `recent-sale`.
- Every type is explicit. There is no runtime default, synthetic value,
  merchant-copy fallback, random fixture or neutral data calculation.
- The target supplies an already-qualified type, complete localized text and a
  validity/freshness boundary. Missing, expired, stale, unverified or
  unsupported evidence omits the complete component.
- `low-stock` means purchasable tracked inventory for the exact selected
  variant in the current market. The target owns the merchant-approved
  threshold and tracking, policy, availability and freshness checks. Aggregate
  inventory must not be presented as selected-variant inventory.
- `selling-fast` requires target-verified velocity of valid confirmed purchases
  across a documented recent window and qualification threshold. Cart,
  checkout, favorite, visit or other engagement activity is insufficient.
  Tests, cancellations and other invalidated transactions are excluded, and
  localized copy distinguishes product from selected-variant scope.
- `viewers` uses a privacy-safe approximate bucket rather than an exact
  continuously changing count. It derives from distinct active product
  sessions in a documented short window and appears only above a target-defined
  privacy minimum. It exposes no person, account or location data.
- `recent-sale` is a general anonymous statement backed by a valid confirmed
  purchase in a documented freshness window. It includes no purchaser identity,
  location or relative-time counter; expired or invalidated events omit it.
- Neutral G8 performs no polling, expiry scheduling, analytics, inventory or
  event ingestion. A target may replace the complete passive claim at a bounded
  cadence without adding a neutral live region.
- G8 remains passive and non-live, authors no animation and exposes no focus,
  keyboard, pointer, dismissal or controlled-state behavior.
- Each production adapter must document and prove its authoritative source,
  qualification rule, refresh/expiry policy, privacy treatment, stale/error
  omission and target placement. Shopify remains `planned` until such an
  adapter exists; copied CSS is not data certification.
- Targets must not simultaneously present the same recent-sale fact through G8
  and Social Proof.
- G8 remains `pilot`. The accepted semantic/data boundary makes the neutral
  component eligible for human visual/stability review but does not promote it
  to `stable` or certify any production data adapter.

## Consequences

- All four existing contract variants and Batch 87 evidence remain valid.
- The base stays target-agnostic and runtime-free while production claims have
  explicit truth requirements.
- A Shopify or other adapter cannot become ready merely by exposing arbitrary
  theme settings or static example copy.
- Final Warning/neutral treatments, typography, cue geometry, placement and
  component-specific design evidence remain human-review gates.

## References

- <https://www.w3.org/WAI/WCAG22/Understanding/use-of-color>
- <https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html>
- <https://shopify.dev/docs/api/liquid/objects/variant>
- <https://shopify.dev/docs/storefronts/themes/store/requirements>
