# Refinement Batch 100 — Wishlist

Status: Refined; persistence, reusable action ownership, mutation lifecycle,
Shopify architecture, and human visual review required; remains `pilot`

Date: 2026-07-17

Component: Wishlist (`U8`, dependency order `113`)

## Outcome

Batch 100 replaces copied Product Card markup, a second circular heart Button,
local saved-item state, mixed command/toggle semantics, internal live count,
fixed Studio columns, portrait media, and unlabelled generic collection markup
with one target-controlled native Wishlist composition. It uses a labelled
section, passive count, native list, canonical Product Cards, canonical Price,
canonical Remove Buttons, and optional canonical Empty State.

Exhibit and Studio now use the same `WishlistArtwork`, fixture, DOM, and four-
property API. U8 owns no saved IDs, query, account/guest identity, persistence,
mutation, formatter, focus recovery, announcement, privacy, or analytics state
and adds no runtime. Shopify stays intentionally planned until the owner selects
a current customer-account extension, headless/app service, theme-app/local
profile, compatibility profile, or omission.

## Delivered

- Permanent U8 dossier, detailed audit, ADR 0191, Shopify adapter boundary, and
  explicit action/persistence/lifecycle/target questions.
- Contract `0.2.0`, registry, Studio metadata, MDX, Account CSS, shared
  Wishlist/Product Card/Empty State renderers, and generated adapter
  reconciliation.
- Native labelled section/list/articles, one title Link and canonical Remove
  Button per Product Card, passive count, product-specific accessible names,
  and external honest demo feedback.
- Optional populated and resolved-empty compositions with a post-resolution
  products-or-empty invariant, optional count omission, and required-title
  fail-closed behavior.
- Four semantic properties, fourteen public tokens, two private composition
  values, named-container intrinsic tracks/gutters, and zero U8 runtime.
- Retained four-image baseline plus Mobile/Tablet/Desktop/XL per mode,
  equal-container parity, Remove activation, keyboard focus, resolved empty,
  direct 320/200px, localized RTL, effective 200 percent, light/dark, forced
  colors, and reduced motion evidence.
- Regenerated Neutral Web, Webflow, and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions, and MDX pages
  validate; static audit covers 251 previews with zero errors.
- One labelled native section, one direct unordered list, three list items,
  three canonical Product Card articles/title Links/Remove Buttons, zero
  `aria-pressed`, and zero U8 live regions pass.
- Remove is the real pointer target, keeps the controlled collection unchanged
  in Studio, and produces one external honest Status. Tab reaches Remove with a
  visible outline; forced colors preserves it.
- Resolved empty composes canonical Empty State and Link with H2/H3 hierarchy,
  synchronized `0 items`, no list, and zero overflow. Count omission and empty
  required-title guards pass.
- At 480px, Exhibit and Studio share DOM hash `6d0b9500`, computed-style hash
  `dee071b6`, 48px logical gutter, and 384px grid.
- Four viewports, direct 320/200px, localized RTL/unbroken content, effective
  200 percent, light/dark contrast, forced colors, reduced motion, and zero
  U8/document overflow pass.
- Shopify official validation revision 5 passes. U8 remains `planned`,
  `ready:false`, and global target-ready count remains 79 because account and
  persistence architecture are deliberately unresolved.
- Browser evidence used one named headless session, one tab, and one managed
  server at a time; final cleanup closed both and left port 4173 free.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| U8 CSS slice | `671 B` | `598 B` | component observation | `-73 B`; duplicate Button/toggle visuals removed while native/list/empty/container composition becomes explicit |
| Account CSS | `2,920 B` | `2,776 B` | `3,072 B` | pass; `296 B` headroom |
| Neutral Web component CSS | `68,452 B` | `68,459 B` | `65,536 B` | existing program gap `2,923 B`; raw CSS drops `249 B`, global gzip context changes `+7 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; U8 delta `0 B` |
| Shopify U8 runtime | `0 B` added | `0 B` added | target observation | no persistence/account behavior added |

Account CSS SHA-256 is
`ca5372ee2975bda8e91657e4e2a40cdff39ee1d10f10c3010ffe230ba6f88369`;
the U8 slice SHA-256 is
`35a4ed426346b5077f40c76faeddfabc6e84dbe50d9eefdb1b65eca92a6cffe0`.

## Risks And Open Questions

- Owner architecture input is required on a reusable Save toggle owner versus
  target-composed Wishlist Remove commands only.
- Owner product/architecture input is required on account-only, guest local,
  app-backed, or hybrid persistence and the resulting privacy/merge rules.
- Owner input is required on optimistic versus confirmed removal, pending,
  failure, undo, focus, status, count/empty transition, ordering, and stale
  product policy.
- Owner target input is required on customer-account full-page extension,
  headless/app service, theme-app/local storage, explicit compatibility, or
  target omission.
- Human review must approve layout rhythm, title/count alignment, card density,
  media, Remove placement, empty presentation, fixture copy, final visuals, and
  corrected U8-specific Figma artwork.
- Complete Neutral Web CSS and shared runtime remain above their existing
  program ceilings; U8 reduces local/account CSS and adds no runtime, while
  whole-bundle gzip changes `+7 B` from concatenated compression context.

## Readiness Decision

`refined-decision-needed`. Safe neutral semantic, canonical, responsive,
adapter, performance, and evidence work is complete, but persistence, action
ownership, mutation lifecycle, selected Shopify architecture, and human
visual/product decisions determine cross-target completion. U8 is not yet
human-review-ready across targets and remains `pilot`; no automatic `stable`
promotion was made.
