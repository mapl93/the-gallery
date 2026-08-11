# Component Refinement Batch 24

Status: Cart Drawer complete for human review

Date: 2026-07-14

Components: Cart Drawer

## Outcome

Cart Drawer is prepared for explicit human stability review. Its dossier,
accepted ownership boundary, contract, canonical CSS/runtime, shared
Exhibit/Studio renderer and fixture, Studio metadata, registry, MDX fallback,
Shopify mapping, generated adapters, browser evidence and individual report are
reconciled.

The component now composes canonical Drawer, Price and Quantity Selector using
native list/description-list semantics and a single value owner. Cart data,
money, totals, mutation, status, checkout and production overlay services remain
target-owned. It remains `pilot`; Button is still the only human-approved
component. `site/dist` was not rebuilt or modified.

## Research And Decision

- WAI-ARIA APG, HTML, WCAG, Open UI, Radix and official Shopify evidence support
  a native structural composition inside a true modal Drawer, not a second
  overlay API or a cross-target cart client.
- ADR 0109 adopts the two existing semantic slots, native item/summary
  structures, canonical Price/Quantity dependencies, target cart ownership and
  isolated `.cart-drawer__summary*` classes.
- Isolation fixes a concrete import-order collision: the later Cart Summary
  component previously overrode Cart Drawer's compact footer through shared
  `.cart-summary*` class names.
- Selector-dead Cart Drawer listeners were removed instead of inferring the
  still-open production overlay/cart architecture.

## Browser Evidence Summary

- The shared docs renderer opens a visible-title named modal dialog, focuses the
  canonical Close Button, traps Tab/Shift+Tab, closes with Escape/Close and
  restores the trigger. The Exhibit fallback synchronizes `aria-hidden` and
  `inert` inside its preview shadow root.
- Native semantics include one item list with two items and one compact
  description list. Each line has one title destination, decorative media,
  canonical Price and Quantity, and a contextual removal Button.
- Canonical Quantity stepping increments exactly once. Target-local state keeps
  quantities, total and status synchronized; removal preserves a logical focus
  destination and the last removal shows an authored empty state without a
  summary.
- Desktop resolves a `400px` panel, `80px` media and a 44px-high removal target.
  At 320px the item container query uses `64px` media and stacks actions. Long
  Arabic/mixed-money content, the 390px viewport and 200% zoom have no horizontal
  overflow; the Drawer body scrolls independently.
- Light contrast is `17.93:1` primary and `7.81:1` supporting; dark is
  `17.18:1`/`12.09:1`. Forced colors retains boundaries/action affordances and
  reduced motion resolves Drawer/Close transitions to `0s`.
- Thirteen after images include eight canonical Exhibit/Studio x
  Mobile/Tablet/Desktop/XL captures plus 320px, long RTL, dark, forced-colors/
  reduced-motion and zoom evidence. Two before images preserve the former
  generic, duplicate and style-colliding baseline.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Global CSS | `4,668 B` | `3.7 KiB` | existing exception (`880 B` over) |
| Shared neutral runtime | `10,171 B` | `8 KiB` | existing exception (`1,979 B` over) |
| Batch 24 runtime delta | `-150 B` | no new cart runtime | pass |
| Neutral Web components CSS | `64,719 B` | `64 KiB` | pass (`817 B` headroom) |

Relative to the Batch 24 baseline, Global CSS adds `198 B`, complete Web
component CSS adds `235 B`, and neutral runtime removes `150 B`. The bounded CSS
delta covers structural resets, isolated summary ownership, logical responsive
geometry, semantic type pairs, removal target/focus and forced colors.

## Validation

- Registry/docs, DTCG source, 183 contracts and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; canonical Global CSS and
  shared JS are byte-identical to generated copies. Shopify's existing
  non-blocking maturity warnings remain backlog and Cart Drawer remains planned.
- Structural certification, shared Exhibit/Studio parity, static previews and
  refinement audit pass across all 183 components.
- TypeScript, a complete Vite build into `/tmp`, browser semantic/lifecycle/
  mutation/responsive/special-media probes, console checks, locale parsing,
  deterministic gzip, generated-copy comparisons, diff checks and explicit
  `site/dist` cleanliness pass.

## Remaining Human Risks And Open Input

1. Approve media crop/size, density, title/variant/Price hierarchy, separator,
   removal treatment, compact summary/footer balance and narrow stacking.
2. Select production overlay coordination with Header, Mobile Menu, Search,
   Lightbox and other modal surfaces, including inertness, scroll lock, stacking,
   route dismissal and focus restoration.
3. Select cart mutation, pending/error/retry/rollback/undo, focus-after-removal,
   status cadence, empty/error visuals and badge synchronization policy.
4. Shopify must choose form navigation versus Ajax `change.js` with Section
   Rendering and prove line errors, discounts/properties, inventory, editor
   preview and live-store behavior.
5. No component-specific owner visual reference is registered; accept the
   repository candidate or provide replacement evidence.
6. Global CSS and shared runtime retain existing budget exceptions; complete Web
   CSS has only `817 B` headroom.
7. Pin Input still requires the owner choice between one full-code native input
   with derived cells and the accepted multiple-input model.

## Program Progress

The regenerated matrix shows 183 components, 105 dependency edges, 65 dossiers,
and 62 components ready for human review. Only Button is human-approved; Cart
Drawer remains `pilot` pending explicit review. The next dependency-safe
component is Rating Stars (review order 66).
