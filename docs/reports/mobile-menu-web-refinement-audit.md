# Mobile Menu Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Mobile Menu is now a direct native site-navigation list that consumes canonical
Drawer and its Close Button instead of recreating overlay state, dismissal, or
focus behavior. It explicitly excludes application-menu roles and unresolved
nested navigation.

No visual approval, production global-overlay certification, or `stable`
promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Direct mobile site destinations; nested disclosure, routing, breakpoint and close-after-navigation policy remain targets. |
| Anatomy and composition | pass | Required native list with one-or-more list-item links inside canonical left Drawer, visible title, and Close Button. |
| Variants, sizes, states | pass | One direct-link treatment; current, hover, focus, open/closed inherited Drawer, dark and special-media states. |
| Public API and ownership | pass | One required target-owned `items` slot; no duplicate open, title, dismissal, focus, or provider state. |
| Tokens and visual system | pass | Twelve existing public references; row padding, weight, dividers, and optional fixture indicator remain compositional. |
| Accessibility and motion | pass | Native nav/list/link model, no ARIA menu roles, current-page state, Drawer focus/Escape/restoration, special media. |
| Responsive/content resilience | pass | Full-width narrow Drawer, 44px rows, long unbroken RTL label, four viewports, and zero inline overflow. |
| Runtime and assets | pass | `0 B` Mobile Menu runtime; docs behavior reuses Drawer obligations; no route/provider/request/timer/observer. |
| Cross-target translation | pass | Direct link data and Drawer lifecycle are separately documented for Web, Shopify, frameworks, Figma, and native. |
| Documentation and verification | pass | Dossier, ADR 0101, one renderer/fixture, real before/after evidence, adapters, and this report. |

## Contract And Browser Evidence

- Contract `0.3.0`: 3 required anatomy parts, 1 variant, 1 size, 5 states,
  4 behaviors, 1 property, 12 public token references, and canonical Drawer
  dependency.
- The shared renderer exposes one named `role="dialog"`/`aria-modal="true"`
  Drawer containing one labelled nav and four direct `ul > li > a` records.
  `menu`, `menubar`, and `menuitem` role count is zero.
- Initial focus lands on canonical Close Button. `Shift+Tab` wraps to the final
  Journal link and `Tab` wraps back to Close. `Escape` removes the dialog and all
  five menu/close focusables; the next animation frame restores the current
  `Open mobile menu` trigger. Reopen returns focus to Close.
- A 390px RTL stress case keeps Drawer `358/358px`, list `295/295px`, and link
  `295/295px` client/scroll widths with a long unbroken Arabic label. Rows compute
  the canonical `44px` minimum target.
- Light title/link/current contrast is `17.93:1`; settled dark link contrast is
  `17.18:1`. Current state keeps primary text and uses accent only as underline.
  Reduced motion computes `0s`; forced colors preserves system dividers/current
  underline; focus remains visible.
- Eight canonical captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL.
  Localized RTL, dark, forced-colors, reduced-motion, and focus captures
  supplement two real desktop before captures.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native nav/list/link content in canonical modal left Drawer. | CSS and docs lifecycle evidenced; production overlay coordinator remains target-owned. |
| Shopify | First-level merchant navigation mapped to canonical Drawer/Mobile classes. | Semantic Liquid validates; missing focus/inert/scroll/runtime and nested policy keep adapter planned. |
| React / Angular | Target item records/slots plus framework Drawer lifecycle. | Strategy documented; adapter not certified. |
| Figma | Direct item/current/focus and containing Drawer composition. | Studio validates; no route or runtime ownership. |
| SwiftUI / Compose | Native modal navigation/drawer with direct links. | Conceptual mapping only. |

## Performance And Risks

- Mobile Menu adds no neutral JS or standalone asset. Batch 16 Global CSS is the
  documented `4,028 B / 3.7 KiB` exception; Web CSS remains
  `61,781 B / 64 KiB`; shared runtime is unchanged at `10,321 B`.
- Human review must approve Drawer width, physical left placement, title/header
  rhythm, Close target, row height/padding, divider, weight, current underline,
  optional chevron fixture, hover surface, focus ring, and dense/long-label rhythm.
- Nested menus, accordion versus drill-in navigation, breakpoint policy, route
  resolution, close-after-navigation, mutual exclusion, background inertness,
  scroll locking, and production target lifecycle remain open.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, native-role/focus-cycle/
Escape/restoration/closed-focusable/contrast/RTL/overflow/special-media probes,
four-viewport evidence, TypeScript, structural/parity/static-preview/refinement
audits, temporary build, performance, diff checks, and `site/dist` verification
are included in Batch 16.
