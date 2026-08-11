# Component Refinement Batch 20

Status: Mega Menu and Bottom Navigation Bar complete for human review

Date: 2026-07-14

Components: Mega Menu, Bottom Navigation Bar

## Outcome

Both final Global navigation nodes are prepared for explicit human stability
review. Research dossiers, accepted semantic boundaries, canonical CSS, one
shared Exhibit/Studio renderer and fixture, contracts, Studio metadata,
registry, docs, generated/copied targets, browser behavior, responsive/special-
media evidence, and individual reports are reconciled.

Mega Menu is a non-modal grouped-link site-navigation disclosure with an
external target-owned controller. Bottom Navigation is a native mobile
destination list with router-owned current state and link-owned count meaning.
Neither contract moved to `stable`; Button remains the only human-approved
component. `site/dist` was not rebuilt or modified.

## Research And Decision

- WAI site-navigation/fly-out guidance, native navigation landmarks, Open UI
  invoker research, Radix, Polaris, WCAG target size, and native-platform
  navigation bars establish the ordinary-link disclosure and destination-list
  boundaries.
- ADR 0105 keeps the accepted property surfaces narrow. Mega Menu retains
  `label`, controlled `open`, and optional `columns`/`promo`/`featured`; Bottom
  Navigation retains required `label`/`items`. Controller, route, provider,
  inventory, body-offset and announcement policies remain target-owned.
- Contracts, registry, MDX, Studio metadata, shared renderer and canonical CSS
  describe the same compositions. No target-agnostic component dependency or
  neutral JavaScript was added.

## Browser Evidence Summary

- Mega Menu exposes native labelled groups/lists/links, synchronized Button
  controls/hidden/inert state, immediate closed-focus safety, Escape restoration,
  normal Link order, 44px targets, finite container overflow and no page overflow.
  Arabic RTL/unbroken content, empty slots, broken media, dark, reduced motion
  and forced colors remain legible and bounded.
- Bottom Navigation exposes one labelled nav/list, five links, exactly one
  current route, visible labels/focus/current, a link-owned `Cart, 2 items` name,
  and no duplicate live count. Targets measure 58–90px; 320px RTL long labels,
  `99+`, missing icon/count and 24px safe-area override remain bounded.
- Browser console inspection reports zero errors and warnings.
- Twenty-five after images include 16 canonical captures for 2 components ×
  Exhibit/Studio × Mobile/Tablet/Desktop/XL plus 9 localized/RTL, overflow,
  optional/empty, media-error, dark and forced-colors cases. Four contemporaneous
  desktop before captures are retained under
  `output/playwright/refinement-batch-20/before/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Global CSS | `4,470 B` | `3.7 KiB` | documented exception (`681 B` over) |
| Shared neutral runtime | `10,321 B` | `8 KiB` | existing documented exception; unchanged |
| Batch 20 runtime delta | `0 B` | `0 B` target-owned behavior | pass |
| Neutral Web components CSS | `63,981 B` | `64 KiB` | pass (`1,555 B` headroom) |

Relative to the Batch 20 baseline, Global adds `442 B`, neutral runtime source
adds `0 B`, and the complete Web component bundle adds `474 B` deterministic
gzip. The Global exception is explicit and does not rewrite the permanent
ceiling; it records native lists, immediate closed-focus safety, logical/
container geometry, current/count treatment and special-media behavior.

## Validation

- Registry/docs, DTCG source, 183 contracts, and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; copied Global CSS and
  shared JS are byte-identical to canonical source. Shopify's 24 existing non-
  blocking maturity warnings remain backlog; both dedicated navigation adapters
  remain planned.
- Structural certification passes 183/183 with one stable contract and zero
  manifest drift. Exhibit/Studio parity is 183/183 shared with complete visual/
  interaction coverage. All 252 static previews and the refinement audit pass.
- TypeScript, a complete Vite build into `/tmp`, browser semantics/interaction/
  content/responsive/special-media probes, zero browser console errors or
  warnings, deterministic gzip, syntax/diff checks, and explicit `site/dist`
  cleanliness pass.

## Remaining Human Risks And Open Input

1. Mega Menu needs approval of surface/shadow, grid density, headings, link
   rhythm, focus/current treatment, media ratios, scrim and narrow stacking.
2. Mega Menu click/hover/focus policy, pointer intent, collision/top-layer,
   Header/Mobile Menu coordination, shared records and Shopify schema remain
   target/architecture decisions.
3. Bottom Navigation needs approval of height, icon stroke/size, label wrapping,
   current/background/underline treatment, count geometry, divider and safe area.
4. Bottom destination inventory/order/maximum, overflow policy, breakpoint,
   body offset, route/count services and announcements remain target decisions.
5. No component-specific owner visual references are registered; accept the
   repository renders or provide replacement evidence.
6. Global remains over its `3.7 KiB` ceiling and shared runtime remains above
   `8 KiB`; both are visible exceptions, not implicit resets.
7. Pin Input still requires the owner choice between one full-code native input
   with derived cells and the accepted multiple-input model.

## Program Progress

The regenerated matrix shows 183 components, 104 dependency edges, 60 dossiers,
and 57 components ready for human review. Only Button is human-approved; both
Batch 20 components remain `pilot` pending explicit human review. The next
dependency-safe batch begins the commerce primitives with Badge, Tag and Price;
Pin Input remains isolated until its value-owner decision is required by a
dependent component.
