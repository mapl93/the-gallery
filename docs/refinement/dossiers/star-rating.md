# Component Dossier: Star Rating Display (Deprecated)

Status: `human-review-ready` migration record

Contract: `components/contracts/star-rating.contract.json` (`0.4.0`, `deprecated`)

Decision: ADR 0235

## Outcome

V2 `star-rating` is no longer an independent component candidate. The owner
selected consolidation into canonical A11 Rating before v1. V2 remains in the
183-component inventory only as a temporary, explicit migration record and is
removed at the version boundary.

The deprecated identity owns no selector, CSS, renderer, fixture, behavior,
token, JavaScript, Shopify adapter, or visual decision. Its documentation route
renders canonical Rating so consumers can see the replacement, but no
`.star-rating*` compatibility alias exists.

## Purpose And Limits

- Documents the replacement of former V2 Star Rating by canonical Rating.
- Preserves discoverability while consumers migrate before v1.
- Must not be imported, styled, extended, stabilized, or used to justify a
  second passive rating implementation.
- Does not change Star Input, which remains the separate interactive native
  radio-group field.

## Research And Identity Comparison

Earlier research found that WAI image guidance, MUI, Spectrum, Open UI, Radix,
Polaris, and Shopify support one passive named rating graphic with target-owned
data boundaries; none supplied a durable semantic boundary for two overlapping
passive Gallery components. Category placement alone was not a consumer-facing
selection rule. Consolidation therefore preserves the useful V2 capabilities
(`ratingValue` and `lg`) in canonical Rating while removing duplicate identity.

See `docs/refinement/dossiers/rating.md` for the current standards, anatomy,
accessibility, visual, target, and performance research. This migration record
does not copy or fork that dossier.

## Migration Mapping

| Former V2 concept | Canonical replacement |
| --- | --- |
| `.star-rating` | `.rating` |
| `.star-rating--lg` | `.rating--lg` |
| `.star-rating__star[data-state]` | `.rating__star`, `.rating__star--filled`, `.rating__star--half` |
| `ratingValue` | `ratingValue` (`0..5`, step `0.5`) |
| `label` | `accessibleLabel` |
| `size` | `size` (`default | lg`) |
| no count API | optional `reviewCount` |
| V2 Review-family CSS/runtime | none; canonical Primitives CSS and zero runtime |
| proposed V2 target adapters | canonical Rating adapter only |

Consumers must migrate markup and property naming directly. There is no
deprecation class that can remain accidentally after v1.

## Canonical Anatomy And API Reference

The deprecated contract references canonical Rating solely to make migration
machine-readable:

- ordinary `.rating` root with `data-rating`;
- `.rating__stars[role="img"][aria-label]`;
- five decorative `.rating__star` states;
- optional `.rating__count[dir="auto"]`;
- required `ratingValue` and `accessibleLabel`;
- optional `reviewCount` and `size`.

Strict canonical composition rejects missing/blank labels, non-finite values,
values outside `0..5`, non-half-step values, and unsupported size options.

## Dependencies And Consumers

- Deprecated V2 declares dependency on `rating`; that edge means
  "replace with canonical Rating", not composition ownership.
- Review Summary and Review Card now depend directly on `rating` and contain no
  V2 selector or renderer.
- `ReviewsStudio` no longer has a Star Rating display branch.
- Both `/components/star-rating` views are mapped to `RatingStudio` only to
  present the migration target with the exact canonical fixture.

## Cross-Target Result

| Target | Deprecated V2 result |
| --- | --- |
| Neutral Web | No implementation or alias; documentation forwards to canonical Rating. |
| Shopify | Unsupported/deprecated; use `snippets/rating.liquid`. |
| React / Angular | Do not create a V2 wrapper; use future canonical Rating adapter. |
| Figma | Do not create a second component; map old instances to canonical Rating. |
| SwiftUI / Compose | Do not create a second native identity. |

## Evidence

- Canonical Rating and deprecated V2 Exhibit roots are byte-for-byte identical.
- Canonical Rating and deprecated V2 Studio roots are byte-for-byte identical.
- Deprecated routes contain zero `.star-rating`, `.star-rating__stars`, or
  `.star-rating__star` matches.
- Canonical CSS, site components/styles, and Shopify sources contain no legacy
  selector implementation.
- The migration screenshot lives at
  `output/playwright/refinement-primitives/rating-0235/star-rating-deprecated-exhibit.png`.
- The same bounded evidence session verified one tab and zero console errors or
  warnings, then closed the browser/server and passed `evidence:assert-clean`.

## Performance And Lifecycle

Deprecated V2 adds `0 B` CSS, `0 B` JavaScript, zero assets, zero listeners,
zero observers, zero timers, and zero target files. Canonical Rating's budget is
recorded in its own dossier. Removing the former Reviews CSS implementation
recovered family budget rather than preserving unused compatibility code.

## Review And Removal Checklist

1. Confirm all canonical consumers use `rating` directly.
2. Confirm no `.star-rating*` selector or V2 renderer/fixture exists.
3. Confirm docs clearly identify deprecation and replacement.
4. Confirm future adapters do not add V2 wrappers.
5. Remove the V2 registry/contract/docs migration record at the agreed v1
   boundary; do not promote it to `stable`.

The independent visual review belongs to canonical Rating. V2 has no separate
visual candidate to approve.
