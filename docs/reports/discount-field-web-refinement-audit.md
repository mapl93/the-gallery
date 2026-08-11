# Discount Field Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-16

## Outcome

Discount Field is now a native progressive disclosure that composes canonical
Input and Button, presents a controlled native list of target-confirmed codes,
responds to its own container and adds no neutral runtime. The commerce target
continues to own normalization, applicability, requests, totals, errors,
announcements, focus policy and persistence.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Buyer-entered code entry and confirmed-code presentation only; not a discount engine, formatter, cart store, totals surface or live region. |
| Anatomy and composition | pass | Native `details`/`summary`, panel, form, required canonical Input and apply Button, optional native code list and per-code canonical removal Buttons. |
| Variants, sizes and states | pass | One neutral intrinsic composition; closed/open, Input error, apply disabled/busy and zero/one/many confirmed codes. |
| Public API and ownership | pass | Seven semantic properties; obsolete single-code `applied`, `appliedCode` and global `removeLabel` removed without aliases. |
| Tokens and hardcoded values | pass | Existing semantic color/type/radius/spacing/touch tokens; focus geometry, fractions, one-pixel boundary and 22rem container threshold remain private compositional values. |
| Accessibility and motion | pass | Native disclosure/form/list semantics, visible label, preserved invalid value, associated alert, contextual removal names, 44px target, no K4 live region and no component motion. |
| Responsive/content resilience | pass | Exhibit/Studio at Mobile/Tablet/Desktop/XL plus localized RTL 200px, multiple mixed-direction codes, dark, reduced motion, forced colors and effective 200% zoom. |
| Runtime and assets | pass | `0 B` neutral runtime delta and no neutral asset/listener/observer/request/parser; Shopify-only standard-action controller measured separately. |
| Cross-target translation | pass | Neutral Web implemented; dedicated Shopify Liquid/controller validates; framework, Figma and native ownership documented. |
| Documentation and verification | pass | Dossier, ADR 0176, contract, registry, CSS, shared renderers, Studio, MDX, Shopify, adapters, evidence and reports agree. |

## Contract And Browser Evidence

- Contract `0.2.0` declares Input and Button as canonical dependencies, ten
  anatomy parts, seven semantic properties, six states and six behaviors.
- Browser inspection finds native `DETAILS`, `SUMMARY`, one form and no live
  region inside K4. Static disclosure closes and reopens natively.
- Exhibit and Studio emit an identical 605-character `.discount-field` subtree.
- Enter with `INVALID` preserves the exact candidate, keeps focus, sets
  `aria-invalid="true"` and exposes the associated alert message.
- Enter with `summer-25` preserves case and appends one target-confirmed record
  to `STUDIO10` and `WELCOME5`. Removing it preserves the other records,
  announces the target result and returns focus to Input.
- The removal Button is 44px tall. Disabled apply is disabled without busy;
  busy apply is disabled with `aria-busy="true"` and keeps the visible label.
- At 200px, client/scroll widths are `200/200` and the form resolves to one
  column. At effective 200% zoom, component widths are `520/520` and document
  widths are `720/720`.
- Fifteen final images cover the required viewports and special modes. The only
  console error is the pre-existing docs-site `/favicon.ico` 404; K4 emits no
  component error or warning.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native details/summary/form/list with canonical Input/Button and target callbacks. | Implemented and evidenced; commerce truth and status remain external. |
| Shopify | Localized snippet outside the native cart form; `Shopify.actions.getCart()` hydrates confirmed codes and `updateCart({ discountCodes })` replaces the full list. | Liquid, locales, asset and Main Cart pass the official validator; contract stays planned until editor/live-store proof. |
| React / Angular / Hydrogen | Controlled open/value/code/request state with target mutation and contextual status. | Boundary documented; no framework or store dependency added to neutral source. |
| Figma | Closed/open, error, disabled/busy, zero/many codes and narrow/wide compositions. | Studio validates the semantic controls; component-specific visual approval remains pending. |
| SwiftUI / Compose | Native expandable group, text field, progress-capable actions and controlled records. | Conceptual mapping; commerce, announcements and focus remain platform-native. |

## Performance And Risks

- Final K4 CSS slice is `2,082 B` raw / `711 B` gzip, `+138 B` from baseline.
  Complete Cart CSS is `3,062 B / 3,072 B`, a `-1 B` batch delta with `10 B`
  remaining because the family compresses better as a whole.
- Complete Web component CSS is `67,871 B / 65,536 B`, an existing `2,335 B`
  program gap and a `+50 B` batch delta. Shared runtime remains `10,501 B /
  8,192 B`; K4 neutral runtime delta is `0 B`.
- The target-specific Shopify controller is `6,775 B` raw / `1,668 B` gzip.
  It uses abortable listener ownership and standard storefront actions, but
  production profiling and configured/default-action refresh behavior still
  require a live store.
- Human review must approve native marker/prominence, Input/Button balance,
  vertical rhythm, code-row surface/border, removal emphasis and 22rem stacking.
- Product targets must decide normalization, allowed characters, stack/replace
  policy, maximum count, applicability copy, retry/stale-cart behavior, totals
  refresh, announcement cadence, removal focus and analytics.
- No K4-specific owner visual reference exists; review this repository candidate
  or supply replacement evidence.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, official Liquid files,
native disclosure/form/list semantics, invalid/apply/remove/disabled/busy states,
localized RTL narrow content, dark/forced-colors/reduced-motion, effective 200%
zoom, four-viewport evidence, TypeScript, structural/parity/static-preview
audits, deterministic performance, generated-copy identity, diff checks,
`site/dist` cleanliness and the owned-resource gate are included in Batch 85.
