# Component Refinement Batch 17

Status: Popover, Hover Card, and Dropdown Menu complete for human review

Date: 2026-07-14

Components: Popover, Hover Card, Dropdown Menu

## Outcome

All three components are prepared for explicit human stability review. Research
dossiers, accepted semantic boundaries, canonical CSS, one shared Exhibit/Studio
renderer, contracts, Studio metadata, registry, docs, copied/generated targets,
browser interaction, responsive/special-media evidence, and individual reports
are reconciled.

Popover now uses content-derived non-modal semantics and portable/native Web
open states. Hover Card now has canonical passive anatomy, a complete
dismissible interest cycle, and direction-correct RTL geometry. Dropdown Menu
now demonstrates a complete immediate-command menu composite rather than a set
of independently tabbable buttons. No contract moved to `stable`; Button remains
the only human-approved component. `site/dist` was not rebuilt or modified.

## Research And Decision

- WAI-ARIA APG Menu Button/Menu, WAI-ARIA 1.2, WCAG 1.4.13, WHATWG HTML
  Popover, Open UI Popover/invoker/interest-invoker work, Radix and Polaris
  establish the content-derived popover, passive destination-preview and
  immediate-command menu boundaries.
- ADR 0102 preserves ADR 0072's narrow public properties while accepting native
  Web Popover mapping, Hover Card's temporary target dismissal state and the
  complete target-owned APG menu lifecycle.
- Component guide examples, MDX pages, Studio metadata, registry, contracts,
  shared renderer and canonical CSS now describe the same source contracts.
  Positioning/collision/portal services, Hover Card delay and checkable/radio/
  submenu breadth remain explicit target or product decisions.

## Browser Evidence Summary

- Popover exposes no forced dialog semantics. Its trigger/panel relationship is
  synchronized; toggle, Escape, outside dismissal and focus restoration pass.
  A live native Web probe confirms `showPopover()`/`:popover-open`/`hidePopover()`.
  A 390px extreme localized case keeps stage `358/358px` and surface
  `318/318px` client/scroll width. Title/content contrast is
  `17.93:1`/`7.81:1` light and `17.18:1`/`12.09:1` dark.
- Hover Card reveals on pointer or keyboard interest, stays visible through
  pointer transfer, dismisses with Escape without moving link focus and resets
  after the interest cycle. Arabic RTL evidence keeps stage `358/358px`, surface
  `278/278px`, and physical bounds x `55–335px`. Title/description contrast is
  `17.93:1`/`7.81:1` light and `17.18:1`/`12.09:1` dark.
- Dropdown Menu exposes one trigger-named menu, two groups, one separator, four
  commands and one roving tab stop. Arrow/Home/End, typeahead, disabled non-
  activation, Escape restoration, non-trapping Tab/Shift+Tab, outside dismissal
  and selection closure pass. Arabic RTL stays stage `358/358px`, menu
  `278/278px`; a long command grows to `62px` without inline overflow. Normal/
  danger contrast is `17.93:1`/`8.05:1` light and `17.18:1`/`10.03:1` dark.
- All surfaces and menu items compute `0s` under reduced motion and retain
  perceivable system boundaries/focus/states under forced colors. Forty-one
  after images include 24 canonical captures for 3 components × Exhibit/Studio
  × Mobile/Tablet/Desktop/XL plus 17 localized/RTL, dark, forced-colors,
  reduced-motion, focus, dismissed and disabled cases.
- Six contemporaneous live desktop before captures exist under
  `output/playwright/refinement-batch-17/before/`; no reconstruction is used.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Layout CSS | `5,845 B` | `4.8 KiB` | documented exception (`930 B` over) |
| Shared neutral runtime | `10,321 B` | `8 KiB` | existing documented exception; unchanged |
| Batch 17 runtime delta | `0 B` | `0 B` target-owned behavior | pass |
| Neutral Web components CSS | `62,398 B` | `64 KiB` | pass (`3,138 B` headroom) |

Relative to the Batch 17 baseline, Layout adds `588 B`, neutral runtime source
adds `0 B`, and the complete Web component bundle adds `617 B` deterministic
gzip. The Layout exception is explicit and does not rewrite the permanent
ceiling; it records bounded logical geometry, semantic typography, Hover Card
RTL placement, menu structure/states, touch behavior, reduced motion and forced
colors.

## Validation

- Registry/docs, DTCG source, 183 contracts, and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; copied Layout CSS and
  shared JS are byte-identical to canonical source. Shopify reports 24 existing
  non-blocking maturity warnings; these three primitives correctly remain
  `planned` for dedicated Liquid/runtime adapters.
- Structural certification passes 183/183 with one stable contract and zero
  manifest drift. Exhibit/Studio parity is 183/183 shared with complete visual/
  interaction coverage. Static preview and refinement audits pass.
- The refinement matrix now covers 183 components, 101 dependency edges,
  52 dossiers, and 49 components ready for human review.
- TypeScript, a complete Vite build into `/tmp`, browser DOM/accessibility/
  keyboard/native-popover/contrast/RTL/content/special-media probes,
  deterministic gzip, `git diff --check`, and explicit `site/dist` cleanliness
  pass.
- Browser console inspection reports no error or warning.

## Remaining Human Risks And Open Input

1. Popover needs approval of width, padding, title/content rhythm, radius,
   shadow, arrow treatment, and the target positioning/collision/focus service.
2. Hover Card needs approval of width, radius/shadow, offset, destination/surface
   relationship, delay, collision and duplicate assistive-technology exposure.
3. Dropdown Menu needs approval of width, desktop/touch density, item typography,
   icon/shortcut alignment, hover/focus balance, danger color and disabled
   opacity. Its light disabled text measures `2.91:1`, intentionally conveys an
   unavailable non-activatable command, and should be reviewed visually.
4. Native Popover hosting, portal/collision infrastructure and production
   Web/Shopify/framework/native focus behavior remain target certification work.
5. Checkable menu items, radio groups and submenus remain unaccepted future
   product scope; they were not inferred from Radix or platform examples.
6. No component-specific owner visual references are registered; accept the
   repository renders or provide replacement evidence.
7. Layout is `930 B` over its provisional family ceiling and shared runtime
   remains above `8 KiB`; both are visible exceptions, not implicit budget
   resets.
8. Pin Input still requires the owner choice between one full-code native input
   with derived cells and the accepted multiple-input model.

## Program Progress

The regenerated matrix shows 183 components, 101 dependency edges, 52 dossiers,
and 49 components ready for human review. Only Button is human-approved. Context
Menu is the next direct dependency consumer of Dropdown Menu; Command Palette,
Steps, Carousel, Scroll Area and Lightbox follow in dependency-safe Layout order.
Pin Input remains isolated until its value-owner decision is needed by a
dependent component.
