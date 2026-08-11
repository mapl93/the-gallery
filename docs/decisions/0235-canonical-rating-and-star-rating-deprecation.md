# ADR 0235: Canonical Rating And Star Rating Deprecation

- Status: Accepted
- Date: 2026-07-20
- Decision owner: The Gallery owner
- Applies to: A11 Rating, V2 Star Rating, Review Summary and Review Card
- Supersedes identity boundary in: ADR 0110 and ADR 0133

## Context

The registry contained two passive star displays. A11 `rating` exposed a compact
target-resolved star sequence and optional localized count, while V2
`star-rating` exposed a supplied half-step value and `default | lg` geometry.
Their semantic purpose overlapped and category membership did not provide a
stable selection rule.

The owner accepted decision `A11-A`: consolidate both passive displays into one
canonical public Rating identity and migrate/deprecate V2 before v1 without a
permanent alias.

## Decision

1. A11 `rating` is the only canonical passive rating display.
2. Canonical Rating accepts a required target-supplied `ratingValue` from `0`
   through `5` in `0.5` steps, a required complete localized
   `accessibleLabel`, optional complete localized `reviewCount`, and
   `default | lg` size.
3. Invalid required composition emits no Rating root. The neutral component
   does not normalize, round or invent provider data or accessible copy.
4. Rating remains one ordinary root containing one named star image and an
   optional independently readable count. Individual full, half and empty
   stars are decorative and shape-distinct.
5. Neutral Web owns CSS only. Targets generate the truthful star sequence from
   the already normalized half-step value; no browser runtime is added.
6. V2 `star-rating` becomes a deprecated pre-v1 migration record that points to
   canonical Rating. It owns no selector alias, CSS, renderer, fixture,
   behavior, tokens or target adapter and is removed at the version boundary.
7. Review Summary and Review Card compose canonical Rating and declare that
   dependency. Review Summary keeps its exact aggregate separate from the
   target-supplied half-step `ratingDisplayValue` used by Rating, so neutral
   code never performs an implicit rounding decision.
8. Star Input remains the separate interactive native radio-group component.
9. Provider scale normalization, rounding, missing/zero policy, aggregate
   synchronization, structured data, review navigation and dynamic
   announcements remain target-owned.

## Consequences

- Consumers select one passive Rating API across commerce and reviews.
- A11 gains a semantic numeric input and large presentation without gaining
  calculation or runtime ownership.
- V2 stays discoverable only long enough to document the migration and cannot
  become a permanent compatibility implementation.
- Review Summary may display an exact score such as `4.6` while its target
  deliberately supplies a half-step star projection such as `4.5`; the two
  values and labels are explicit rather than silently rounded.
- Rating, Review Summary and Review Card remain `pilot` pending explicit human
  visual/stability review.
