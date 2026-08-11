# ADR 0265: Hybrid Exact-Variant Wishlist Reconciliation

- Status: Accepted
- Date: 2026-08-10
- Owners: The Gallery
- Scope: U8 Wishlist identity, persistence, sign-in merge, removal, unavailable
  records, and Shopify translation
- Refines: ADR 0191

## Context

ADR 0191 established Wishlist as a controlled presentation shell and correctly
kept persistence outside neutral source, but left the concrete v1 persistence
profile, saved-item identity, merge policy, removal lifecycle, and unavailable
records open. The owner selected U8-C and then clarified its merge and identity
rules.

The accepted product direction needs anonymous saving before sign-in and an
authenticated cross-device wishlist after sign-in. Those stores cannot be
merged safely by parent product alone: multiple variants of one product may be
meaningfully distinct saved records. A failed synchronization must not destroy
the only remaining local copy.

## Decision

- U8 remains a target-controlled presentation component. Its neutral source
  owns no local storage, cookies, account database, network request, query,
  merge engine, authentication, mutation state, or provider SDK.
- The accepted target profile is hybrid: anonymous users have a local-device
  wishlist and authenticated users have an account wishlist.
- Every saved record identifies one exact target variant or merchandise
  selection. Stable variant identity is the merge/deduplication key. Parent
  product identity remains available for navigation and presentation.
- Multiple variants of the same parent product may coexist. Each Product Card
  visibly and accessibly names its saved option selection; image, swatch, or
  color alone is insufficient.
- After sign-in, the authenticated service performs an idempotent union of local
  and account records by exact variant identity and returns the authoritative
  merged result. Neither source wins by destructive replacement.
- Local anonymous records are cleared only after confirmed merge success.
  Failure or interruption preserves them intact and exposes truthful retry
  feedback through the target lifecycle.
- Per-card Remove remains a canonical Button command, not a pressed Save toggle.
  Its accessible name includes product and exact option context. The target
  updates list/count/empty truth only after confirmed removal, communicates
  pending/failure/success, places focus deliberately, and offers undo when
  feasible.
- Sold-out or no-longer-available exact variants remain visible with truthful
  localized status. Users may navigate to the parent product, select another
  available option, or explicitly remove the record. Targets do not silently
  delete it or convert it to a product-level favorite.
- Privacy, consent, retention, local limits, encryption, account authorization,
  protected customer data, conflicts, telemetry, and analytics remain target
  responsibilities.
- Shopify target work may combine storefront local persistence with a customer-
  account full-page extension or other authenticated app service. Customer
  metafield writes require the relevant scopes and approved protected-customer-
  data access. Theme CSS alone is never behavior readiness.
- Contract status remains `pilot`. Human review and target persistence/sync
  evidence are required before `stable` or Shopify target-ready promotion.

## Consequences

- Wishlist can describe one stable cross-target behavior without coupling base
  source to React, Shopify, browser storage, or a particular provider.
- Exact variant identity prevents accidental collapse of meaningful selections
  during sign-in merge.
- Confirmation-first cleanup prevents data loss when authentication, network,
  provider validation, or account mutation fails.
- Product Card remains the canonical owner of visible variant and availability
  presentation; Wishlist only arranges records and composes commands.
- A reusable Save toggle remains a separate future canonical component decision
  and is not inferred from the saved-items Remove command.

## Not Approved

This decision does not approve:

- parent-product identity as the saved-record or deduplication key;
- destructive source replacement during sign-in;
- clearing local records before confirmed account success;
- optimistic removal presented as authoritative success;
- silent deletion or substitution of unavailable variants;
- local storage, Shopify metafields, or any provider SDK in neutral source; or
- promotion from `pilot` to `stable` without explicit human review.

## References

- <https://www.w3.org/WAI/ARIA/apg/patterns/button/>
- <https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html>
- <https://www.radix-ui.com/primitives/docs/components/toggle>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets/full-page>
- <https://shopify.dev/docs/apps/build/customer-accounts/metafields-in-customer-accounts>
