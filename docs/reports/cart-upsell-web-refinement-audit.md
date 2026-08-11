# Cart Upsell Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-16

## Outcome

Cart Upsell is now a named target-controlled recommendation list with per-item
capability. Its public API contains only a non-empty region title and semantic
items slot; each recommendation may independently compose canonical Link, Price
and Button. Collection-wide add label/disabled state, raw price markup, generic
collection/item elements, optimistic component state and an internal live region
are removed.

The target still owns recommendation source, intent, ranking, tracking URLs,
availability, product destinations, variant selection, formatting, cart
mutation, pending/result truth, status, focus policy, analytics and refresh.
No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Compact target recommendation projection only; not an engine, product record, variant picker, cart store, formatter, bundle, live region or analytics client. |
| Anatomy and composition | pass | Named `section`, visible heading, `ul > li`, optional media and canonical Link/Price/Button; generic `div`/`article` and raw price removed. |
| Variants, sizes and states | pass | One intrinsic composition; item capability is optional composition, not collection-wide variant/state. |
| Public API and ownership | pass | Required `title`/`items` only; `addLabel` and `addDisabled` removed without pilot aliases. |
| Tokens and hardcoded values | pass | Semantic surface/border/type/spacing/radius; logical intrinsic layout; dependencies own their interaction/price styles. |
| Accessibility and motion | pass | Labelled section, native list, decorative repeated image, contextual action name, Link → Button order, retained focus, external status, no K6 motion/live/widget semantics. |
| Responsive/content resilience | pass | Both modes at four viewports plus localized RTL 200px, navigation-only 200px, three items, dark, reduced motion, forced colors and effective 200% zoom. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no listener, observer, request, formatter, timer, asset or animation. |
| Cross-target translation | pass | Neutral Web implemented; Shopify/React/Figma/native boundaries documented without inventing a target source or add policy. |
| Documentation and verification | pass | Dossier, ADR 0178, contract, registry, renderer, CSS, Studio, MDX, adapters, evidence and reports agree. |

## Contract And Browser Evidence

- Contract `0.2.0` declares three canonical dependencies, nine anatomy parts,
  one visual state, seven ownership/semantic behaviors and two public properties.
- Exhibit and Studio emit one byte-identical `958`-character K6 subtree. It is a
  `SECTION` labelled by `cart-upsell-preview-title`, containing `UL > LI`, a
  decorative `img alt=""`, canonical `link link--nav`, canonical `price`, and
  canonical `btn btn--sm` named “Add Celadon incense holder to cart”.
- The K6 root has no `role`, `aria-live` or `tabindex`. The target fixture status
  is a sibling outside the subtree. Keyboard traversal is Link then Button;
  activation leaves focus on the Button, keeps it enabled, and populates the
  external result status.
- Blank title gives root count `0`; restoring the title gives `1`. Studio keeps
  required `items` checked and non-removable, matching the rule that targets
  omit K6 rather than render an empty recommendation region.
- Component client/scroll widths are `324/324` in both Mobile modes,
  `518/518` in both Tablet modes, `514/514` Exhibit and `518/518` Studio on
  Desktop, and `518/518` in both XL modes. Localized RTL at a 200px authored
  width is `198/198`; navigation-only 200px is also `198/198`; three items are
  `518/518`; effective 200% is `234/234`.
- Localized long Arabic title/product/price/action wraps without overflow.
  Removing media, Price and action leaves one valid navigation-only item with
  no reserved blank column. Three cloned stress items retain three distinct
  action names.
- Default title/link contrast is `17.93:1`; Button text/background is `10.37:1`.
  Reduced motion yields Link transition `0s` and root animation `0s`. Forced
  colors resolves the boundary/title divider to system black, Link to system
  blue, and Button to system foreground/background.
- Sixteen final images cover the required viewports and special modes. One
  stable headless session and one tab were used at a time; the final console has
  zero errors/warnings and cleanup leaves port `4173` free.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Named section/list with target item composition and canonical Link/Price/Button. | Implemented and evidenced; target behavior/status remain external. |
| Shopify | Target-native section/snippet/controller may use official recommendations or merchant/manual data and must preserve returned tracking URLs. | Planned; source/context, cart placement, limit, variant/add policy, settings, refresh/status, editor and live proof remain open. No Liquid was invented. |
| React / Angular / Hydrogen | Controlled title plus item render/composition from the owning store/fetcher. | Boundary documented; no framework/store dependency in neutral source. |
| Figma | Named region plus repeatable recommendation item with optional media/Link/Price/Button equivalents. | Studio validates semantic controls; registered generic nodes are not K6 approval. |
| SwiftUI / Compose | Native labelled section/list with optional navigation, formatted price and target action. | Conceptual mapping; commerce service and async status remain native target concerns. |

Shopify's product recommendation object is request/section scoped and product
purchase can require variant selection. Those current platform facts support the
planned boundary but do not select a cart upsell architecture or commercial
policy for The Gallery.

## Performance And Risks

- Final K6 CSS is `1,717 B` raw / `524 B` gzip, `+133 B` gzip from baseline.
  The increase funds native list reset, logical wrapping, content resilience,
  semantic typography and canonical composition.
- Complete Cart CSS is `16,114 B` raw / `3,072 B` gzip, a `+67 B` batch delta
  that reaches but does not exceed its permanent family ceiling. Later Cart
  work must recover budget before adding CSS.
- Complete Web component CSS is `506,793 B` raw / `67,914 B` gzip, an existing
  `2,378 B` program gap and a `+76 B` batch delta. Shared runtime remains
  `53,811 B` raw / `10,501 B` gzip, an existing `2,309 B` gap; K6 runtime delta
  is `0 B`.
- Canonical, Webflow and Shopify Cart CSS are byte-identical. Cart SHA-256 is
  `5190b191c0afb6fbb6017a14b5153b3cf4ebe9b6b3e35515fe9a674545776a2a`;
  K6 slice SHA-256 is
  `197816bdf4563a9988f95e2eb6115e6a5755e11b76d27d767202f06d53676715`.
- Human review must approve the primary surface, heading/Price hierarchy, media
  scale, Button emphasis, item density, narrow wrap and navigation-only balance.
- Product/target owners must select recommendation source, truthful intent copy,
  cart placement, maximum count, tracking, variant/add policy, availability/
  pending/result behavior, status/focus, analytics and refresh.

## Validation

Contracts, Studio, registry/docs, TypeScript, static previews, Neutral Web,
Shopify adapter, four-viewport/special-mode browser inspection, exact shared-
renderer parity, keyboard/result behavior, deterministic performance,
generated-copy identity, structural/certification/refinement audits, diff
checks, `site/dist` cleanliness and owned-resource cleanup are included in
Batch 87.
