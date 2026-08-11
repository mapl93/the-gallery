# Wishlist Web Refinement Audit

Status: `human-review-ready`; remains `pilot`

Date: 2026-08-10

## Outcome

Wishlist is one heading-labelled, target-controlled exact-variant saved-item
collection. U8 owns the native section/list shell, required title, optional
passive count, optional canonical Product Card collection, optional resolved
Empty State, and intrinsic container response. Product Card owns media,
navigation, exact-option and availability presentation, Price, focus layering,
and target-composed actions.

Owner decision U8-C and ADR 0265 resolve the v1 semantic profile: anonymous
local-device and authenticated account records are united idempotently after
sign-in by stable exact variant identity. Neither source destructively replaces
the other, and local records are cleared only after confirmed account success.
Remove is a contextual command; list/count/empty truth changes after confirmed
mutation. Unavailable exact variants remain visible and removable.

Neutral source stores nothing and adds no U8 runtime. Exhibit and Studio use the
same `WishlistArtwork`, fixture, Product Cards, Price, Button, Empty State, DOM,
CSS, and behavior. Shopify remains `planned` pending an actual hybrid service/
extension implementation. No `stable` or Shopify target-ready promotion is
claimed.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Controlled exact-variant presentation; not a query, storage adapter, account store, merge engine, mutation coordinator, router, live region, or analytics client. |
| Anatomy and composition | pass | Labelled native section/header; optional passive count; populated `ul > li > article.card.product-card`; optional canonical Empty State. |
| Variants, sizes, and states | pass | One neutral intrinsic profile; populated, resolved-empty, and retained-unavailable composition; provider lifecycle remains target-owned. |
| Public API and ownership | pass | Required `title`; optional `count`, `products`, `emptyState`; no IDs, arrays, callbacks, storage, provider, columns, or breakpoints exposed. |
| Tokens and hardcoded values | pass | Wishlist-owned semantic layout/title/count tokens only; private card minimum and gutter cap stay compositional. |
| Accessibility and motion | pass | Labelled section, native list/articles, visible exact options, product+option Remove names, no `aria-pressed`, passive count, forced-color focus, and zero reduced-motion activity. |
| Responsive/content resilience | pass | Mobile/Tablet/Desktop/XL, equal 480px roots, localized RTL at 200px, effective 200 percent, and resolved empty have zero overflow. |
| Runtime and assets | pass | `0 B` U8 runtime delta; no listener, observer, timer, request, storage, account state, provider SDK, or target script. |
| Cross-target translation | pass with integration risks | Hybrid behavior and Shopify service boundaries are documented; live secure persistence/sync evidence remains target-owned. |
| Documentation and verification | pass | Dossier, ADRs, contract, registry, CSS, renderer, Studio, MDX, adapters, evidence, validators, and matrix agree. |

## Research Direction

- HTML section and unordered-list semantics supply the appropriate thematic
  collection structure without a custom widget model.
- [WAI-ARIA APG Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
  distinguishes commands from persistent toggles: a Remove command does not use
  `aria-pressed`; a true toggle would retain a stable label and explicit pressed
  state.
- [WCAG Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
  requires programmatic notification for async results that do not move focus;
  therefore mutation status belongs to the target lifecycle, not the passive
  count.
- Radix Toggle likewise exposes explicit controlled/uncontrolled pressed state,
  supporting the decision not to hide a reusable Save toggle inside Wishlist.
- Shopify currently identifies Wishlist as a valid customer-account full-page
  extension use case, while customer metafield writes require relevant scopes
  and protected-customer-data approval:
  <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets/full-page>
  and
  <https://shopify.dev/docs/apps/build/customer-accounts/metafields-in-customer-accounts>.
- Open UI provides no portable Wishlist element or persistence contract. Native
  collection/Button semantics plus target-owned storage remain the neutral
  direction.

## Contract And Identity

- Contract `0.4.0` depends on Product Card and Empty State and exposes four
  semantic properties: `title`, `count`, `products`, and `emptyState`.
- The runtime contains one labelled `SECTION`, one `UL`, three `LI`, three
  canonical Product Card articles, three title Links, three canonical Remove
  Buttons, zero `aria-pressed`, and zero internal live/status/alert regions.
- Three stable exact variant IDs are unique. The first two records share parent
  product `celadon-study-no-4` but retain distinct selections `Large · Seafoam`
  and `Small · Porcelain white`.
- Every option selection is visible and included in the corresponding Remove
  accessible name. One `Small · Ash grey` record remains with visible `No
  longer available` status.
- Exact IDs are fixture/target data, not new Wishlist props. Neutral U8 remains
  controlled slot composition and stores nothing.

## Interaction And Lifecycle Evidence

- Activating Remove leaves all three records, `3 items`, and the exact variant
  present. Site-only feedback reports that removal was requested and no saved
  item changed, proving the target confirmation boundary.
- Tab from the first product title reaches its contextual Remove Button with a
  solid `2px` outline. Forced colors retains the same visible focus.
- Resolved empty removes the list, renders one canonical Empty State with H3
  under the U8 H2 and a Link action, and stays contained.
- Omitting optional count removes its node. Empty required title fails closed;
  restoring properties returns the original three exact records.
- Count remains passive. Real pending/success/failure/undo/count/empty status and
  logical post-removal focus remain target-owned.

## Responsive And Parity Evidence

- Exhibit and Studio pass Mobile, Tablet, Desktop, and XL with zero component,
  descendant, or document overflow. One- and two-column intrinsic states are
  both observed according to the available component container.
- At an exact 480px root, normalized DOM hashes match (`5ed91685`) and selected
  computed-style hashes match (`1fdb4ad2`). Both equality checks are `true`.
- At 200px, localized RTL title/count/option/action content stacks in one column
  with zero overflow.
- The 640px effective-200-percent case remains contained in two intrinsic tracks.
- Dark, forced-colors, reduced-motion, exact-variant/unavailable, non-mutating
  removal, keyboard focus, resolved-empty, and same-container states have
  retained screenshots.
- Nineteen final images and machine-readable results live in
  `output/playwright/refinement-batch-149/`.
- Evidence used one named headless Playwright session and one page. There were no
  console or page errors. Cleanup reports the browser/session closed, managed
  server stopped, and port 4173 free.

## Cross-Target Translation

| Target | Translation | Readiness |
| --- | --- | --- |
| Neutral Web | Labelled section, passive count, native list, exact-variant Product Cards, optional Empty State and target Remove commands. | Implemented/evidenced; zero U8 runtime or storage. |
| Web target service | Local-device records plus authenticated account service and exact-variant union after sign-in. | Contract-ready; security, retention, conflict and live sync proof remain integration-owned. |
| Shopify customer accounts | Full-page Wishlist extension backed by an authenticated app/service. | Officially viable; extension, scopes and protected-data approval are not implemented in theme adapter. |
| Shopify storefront | Local-device records plus app proxy/service bridge for confirmed sign-in union. | Planned; no universal Liquid wishlist and CSS is not behavior readiness. |
| Headless / Hydrogen | Local persistence, authenticated service, product query, idempotent union and confirmed removal around canonical projection. | Contract-ready; live provider evidence required. |
| React / Angular | Controlled collection/slots with target state/services; no base framework store. | Planned adapter mapping. |
| Figma | Populated/empty exact-option Product Card composition. | Planned; generic Button nodes are not U8 approval evidence. |
| SwiftUI / Compose | Native section/list/grid with exact-item cards and target async lifecycle. | Conceptual mapping documented. |

## Performance

- U8 CSS slice: `1,448 B` raw / `557 B` gzip; SHA-256
  `d940e994e496d1647260693fbdd9b0aacee301bde21704588dd19ac3d6633d62`.
- Current Account family CSS: `16,435 B` raw / `2,826 B` gzip, passing the
  permanent `3,072 B` ceiling with `246 B` headroom.
- U8 adds `0 B` runtime. Shared runtime and the known global neutral-CSS gap are
  program-level concerns documented by the performance audit, not duplicated
  U8 cost.

## Remaining Risks

- Human review must approve section/header rhythm, title/count alignment, grid
  density, Product Card media, exact-selection treatment, unavailable badge,
  Remove placement, Empty State, fixture copy, and final visual identity.
- Each target must prove local storage security/retention, authenticated service,
  idempotent merge, confirmed cleanup, privacy/consent, authorization, provider
  scopes, conflicts/offline retry, mutation status, undo, and focus recovery.
- Shopify theme CSS does not prove customer-account extension or storefront
  service behavior. U8-specific Figma evidence also remains pending.

## Validation

Batch 149 covers exact identity, two variants of one parent, visible options,
retained unavailability, native semantics, contextual command naming, confirmed
mutation boundary, focus, populated/empty/omitted composition, exact Exhibit/
Studio parity, four viewports, localized RTL/200px, effective 200 percent, dark,
forced colors, reduced motion, one-page lifecycle, and resource cleanup.
Repository validators, adapters, audits, temporary production build, diff checks,
and `site/dist` cleanliness are rerun before the global matrix is accepted.

## Readiness Decision

`human-review-ready`. Neutral visual, semantic, technical, responsive,
performance, documentation, parity, and target-boundary gates are complete.
Live hybrid persistence/synchronization and human visual approval remain
explicit risks, so the contract stays `pilot`; no automatic `stable` or Shopify
target-ready promotion was made.
