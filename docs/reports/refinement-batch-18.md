# Component Refinement Batch 18

Status: Context Menu, Command Palette, and Steps complete for human review

Date: 2026-07-14

Components: Context Menu, Command Palette, Steps / Stepper

## Outcome

All three components are prepared for explicit human stability review. Research
dossiers, accepted semantic boundaries, canonical CSS, one shared Exhibit/Studio
renderer, contracts, Studio metadata, registry, docs, generated/copied targets,
browser interaction, responsive/special-media evidence, and individual reports
are reconciled.

Context Menu now completes the canonical Dropdown Menu lifecycle around real
context invocation geometry. Command Palette now composes canonical Modal and
Close Button presentation with a complete editable Combobox/Listbox lifecycle.
Steps now exposes a passive native ordered progress sequence with logical layout
and text-equivalent state meaning. No contract moved to `stable`; Button remains
the only human-approved component. `site/dist` was not rebuilt or modified.

## Research And Decision

- WAI-ARIA APG Menu/Keyboard/Modal Dialog/Combobox/Listbox guidance, WAI-ARIA
  `aria-current`, Open UI menu/Combobox proposals, W3C forms/status guidance,
  Radix, cmdk, GitHub, Carbon, and Shopify establish the immediate context-
  command, modal command-search, and passive ordered-progress boundaries.
- ADR 0103 keeps the accepted root properties narrow: Context Menu `open`,
  Command Palette `open`/`query`, and Steps `orientation`. Coordinates,
  collision/portal policy, inventories, ranking/execution, workflow routing,
  validation, and announcements remain target/application responsibilities.
- Contracts, registry, MDX, Studio metadata, shared renderers, and canonical CSS
  now describe the same composition. Context Menu consumes Dropdown Menu;
  Command Palette consumes Modal and its transitive Close Button dependency;
  Steps remains target-agnostic ordered-list source.

## Browser Evidence Summary

- Context Menu opens from Shift+F10 with `Copy reference` focused, navigates and
  typeaheads through inherited commands, prevents disabled activation, restores
  focus on Escape, and clamps pointer invocation to exact `8px` right/bottom
  insets. Normal/danger contrast is `17.93:1`/`8.05:1` light and
  `17.18:1`/`10.03:1` dark.
- Command Palette focuses the query, keeps active-descendant focus in the input,
  skips the disabled final option with End, executes/restores with Enter,
  reopens through Control+K, traps Tab between input and Close, preserves four
  options during IME composition, and exposes a correct empty status after
  commit. Twenty results scroll inside `320px` (`1,046px` content).
- Steps renders an `OL`, exactly one current item, no invalid orientation
  property, and completion text. Vertical connectors terminate correctly. Eight
  steps scroll from `326px` client to `896px` content; Arabic RTL/long copy stays
  bounded and ordered. Current/upcoming text contrast is `17.93:1`/`7.81:1`
  light and `17.18:1`/`12.09:1` dark.
- Context/Command transitions compute `0s` under reduced motion; Steps has no
  authored motion. Forced colors preserves structural boundaries and state
  distinctions. Browser console inspection reports zero errors and warnings.
- Forty-three after images include 24 canonical captures for 3 components ×
  Exhibit/Studio × Mobile/Tablet/Desktop/XL plus 19 localized/RTL, dark,
  forced-colors, reduced-motion, focus, empty, extreme-overflow, vertical, and
  clamped-placement cases. Six contemporaneous live desktop before captures are
  retained under `output/playwright/refinement-batch-18/before/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Layout CSS | `6,357 B` | `4.8 KiB` | documented exception (`1,442 B` over) |
| Shared neutral runtime | `10,321 B` | `8 KiB` | existing documented exception; unchanged |
| Batch 18 runtime delta | `0 B` | `0 B` target-owned behavior | pass |
| Neutral Web components CSS | `62,893 B` | `64 KiB` | pass (`2,643 B` headroom) |

Relative to the Batch 18 baseline, Layout adds `512 B`, neutral runtime source
adds `0 B`, and the complete Web component bundle adds `495 B` deterministic
gzip. The Layout exception is explicit and does not rewrite the permanent
ceiling; it records bounded surfaces, canonical modal/command presentation,
logical progress geometry, internal overflow, semantic typography, reduced
motion, and forced-color boundaries.

## Validation

- Registry/docs, DTCG source, 183 contracts, and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; copied Layout CSS and
  shared JS are byte-identical to canonical source. Shopify reports 24 existing
  non-blocking maturity warnings; Context/Command remain planned dedicated
  adapters while passive Steps maps through the shared class contract.
- Structural certification passes 183/183 with one stable contract and zero
  manifest drift. Exhibit/Studio parity is 183/183 shared with complete visual/
  interaction coverage. Static preview and refinement audits pass.
- The refinement matrix covers 183 components, 101 dependency edges,
  55 dossiers, and 52 components ready for human review.
- TypeScript, a complete Vite build into `/tmp`, browser DOM/accessibility/
  keyboard/IME/contrast/RTL/content/overflow/special-media probes,
  deterministic gzip, `git diff --check`, and explicit `site/dist` cleanliness
  pass.

## Remaining Human Risks And Open Input

1. Context Menu needs approval of width/density, radius/shadow, focus/hover and
   danger/disabled balance, plus target long-press, collision/portal, and visible
   fallback policies.
2. Command Palette needs approval of panel position/width, overlay, query chrome,
   result density/highlight, footer help, and production overlay/shortcut/
   command-provider coordination.
3. Steps needs approval of indicator/connector geometry, spacing/type, completed
   check, long-copy/overflow direction, and whether interactive/error variants
   belong in a later scope.
4. No component-specific owner visual references are registered; accept the
   repository renders or provide replacement evidence.
5. Large Command Palette inventories need target thresholds for async loading,
   ranking, cancellation, result announcements, and virtualization. Very large
   Context Menu inventories should use a different information architecture.
6. Checkable/radio/submenu Context Menu breadth, Command result action versus
   navigation semantics, and Steps navigation/error/automatic-orientation scope
   remain explicit open product decisions.
7. Layout is `1,442 B` over its provisional family ceiling and shared runtime
   remains above `8 KiB`; both are visible exceptions, not implicit resets.
8. Pin Input still requires the owner choice between one full-code native input
   with derived cells and the accepted multiple-input model.

## Program Progress

The regenerated matrix shows 183 components, 101 dependency edges, 55 dossiers,
and 52 components ready for human review. Only Button is human-approved.
Carousel, Scroll Area, and Lightbox are the next dependency-safe Layout nodes;
Pin Input remains isolated until its value-owner decision is required by a
dependent component.
