# Mega Menu Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Mega Menu is now a non-modal site-navigation disclosure with labelled native
destination groups, optional promo and featured links, controlled hidden/open
state, ordinary Link keyboard behavior, container response, and a target-owned
external Button controller. It does not claim application-menu semantics,
neutral route data, hover intent, modal focus containment, or mobile fallback.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Broad site hierarchy disclosure; not an application command menu, modal, data provider, or arbitrary marketing canvas. |
| Anatomy and composition | pass | Labelled nav, bounded inner, visible-heading groups, native lists/items/links, optional promo and featured destination list. |
| Variants, sizes, states | pass | Three composition presets, controlled closed/open, hover/focus/current, wide/two-column/one-column, RTL, dark and special-media modes. |
| Public API and ownership | pass | `label`, `open`, `columns`, `promo`, `featured`; target owns controller, routes, records, policy and analytics. |
| Tokens and visual system | pass | 22 accepted public references; gutter, thresholds, scrim/on-promo colors, gaps, media geometry and focus details remain private. |
| Accessibility and motion | pass | Native nav/lists/links, Button controls relation, hidden/inert closure, visible focus/current, Escape restoration, no trap/app-menu model, reduced motion. |
| Responsive/content resilience | pass | Four viewports, 320px Arabic RTL/unbroken text, bounded overflow, empty optional slots and media failure without page overflow. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no listener, provider, observer, timer, request, pointer-intent engine or bundled asset. |
| Cross-target translation | pass | Web/Shopify/framework/Figma/native controller and data boundaries are documented. |
| Documentation and verification | pass | Dossier, ADR 0105, contract/Studio/registry/MDX, shared renderer/fixture, before/after evidence and this report. |

## Contract And Browser Evidence

- Contract `0.3.0`: 16 anatomy parts, 3 composition presets, 1 size, 7
  states, 7 behaviors, 5 properties, 22 public token references, and no required
  canonical component dependency.
- Exhibit and Studio expose one labelled navigation landmark, two visible-
  heading native link lists, ordinary promo/featured links, one current page,
  and an external canonical Button with synchronized expanded/control state.
- Closing synchronizes `aria-hidden` and `inert`, hides the surface immediately,
  leaves zero visible tabbable descendants, and intercepts no pointer input.
  Escape from an internal link closes without trapping and returns focus to the
  trigger because the target-local renderer moved that lifecycle.
- At 320px, six Arabic RTL links including one unbroken value remain 44px high;
  the surface scrolls to finite content end and page width remains equal to the
  viewport. Removing every optional slot leaves the labelled shell stable.
- Broken decorative images preserve a `192×144px` promo and visible link names
  without page overflow. Dark and forced-colors renders preserve boundaries,
  focus/current meaning and promo legibility. Reduced motion reports `0s` for
  layer, link and featured-media transitions.
- Eight canonical images cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  Arabic RTL, overflow end, media fallback, dark and forced-colors captures
  supplement two contemporaneous desktop before images.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Labelled native grouped-link disclosure with external controlled Button lifecycle. | CSS/semantics evidenced; activation, collision, route and mobile substitution remain target code. |
| Shopify | Nested linklists plus promo/featured blocks and bounded target controller. | Shared CSS copies correctly; dedicated schema/controller remains planned. |
| React / Angular | Controlled `open`, slots/records, external trigger refs and native links. | Strategy documented; no neutral framework adapter certified. |
| Figma | Closed/open, composition presets, current/focus, narrow/wide and media examples. | Studio validates presentation; routes/controller/provider excluded. |
| SwiftUI / Compose | Platform-native navigation disclosure or alternate destination surface. | Conceptual mapping only; Web DOM is not copied. |

## Performance And Risks

- Mega Menu adds no neutral runtime. Batch 20 Global is the documented
  `4,470 B / 3.7 KiB` exception (`681 B` over); shared runtime remains the
  unchanged `10,321 B` exception; complete Web CSS is `63,981 B / 64 KiB`.
- Human review must approve surface/shadow, grid density, headings, link rhythm,
  current/focus treatment, media ratios, scrim, close affordance and narrow
  stacking, or provide a component-specific visual reference.
- Activation mode, pointer delay, outside/focus dismissal, collision/top-layer
  service, Header/Mobile Menu coordination, shared navigation data, analytics,
  Shopify block schema, and private on-promo token debt remain explicit target
  or owner decisions.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, native-link/disclosure/
focus/RTL/content/special-media probes, four-viewport evidence, TypeScript,
structural/parity/static-preview/refinement audits, temporary docs build,
deterministic performance, diff checks, and `site/dist` verification are included
in Batch 20.
