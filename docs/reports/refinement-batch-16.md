# Component Refinement Batch 16

Status: Footer, Mobile Menu, and Search Overlay complete for human review

Date: 2026-07-13

Components: Footer, Mobile Menu, Search Overlay

## Outcome

All three components are prepared for explicit human stability review. Research
dossiers, semantic contracts, canonical CSS, one shared Exhibit/Studio renderer,
accepted dependency composition, target boundaries, Shopify markup, generated/
copied outputs, browser behavior, responsive evidence, and individual reports
are reconciled.

Footer now uses labelled native navigation groups and responds to its own
container. Mobile Menu now consumes canonical Drawer and Close Button without a
duplicate state or application-menu model. Search Overlay is now a named modal
with native search form/label/input, canonical dismissal, ordinary linked
results, and no unconditional live region. No contract moved to `stable`; Button
remains the only human-approved component. `site/dist` was not rebuilt or
modified.

## Research And Decision

- WAI-ARIA APG landmarks/dialog/disclosure/search/combobox guidance, WHATWG HTML,
  Open UI, Radix, Shopify, and Polaris boundary evidence defines the native
  page-footer, direct site navigation, modal search, and target service split.
- ADR 0101 preserves ADR 0086's global schema/provider/overlay/service boundaries
  while accepting narrow neutral semantics and canonical dependencies.
- Component guide examples, MDX pages, Studio metadata, registry, contracts,
  shared renderer, canonical CSS, and Shopify Liquid now describe the same source
  contracts. Shopify section groups and both production overlay runtimes remain
  explicit target work.

## Browser Evidence Summary

- Footer has three visible-heading-labelled nav groups and ordinary optional
  brand/metadata content. A 960px host produces `320/160/160/160px` columns; a
  390px localized/unbroken case keeps Footer `358/358px` and grid `326/326px`
  client/scroll width. Heading/secondary contrast is `16.44:1`/`7.17:1` light
  and `14.50:1`/`10.21:1` dark; hover settles at `16.44:1`.
- Mobile Menu exposes no ARIA menu roles. Initial focus is canonical Close;
  Shift+Tab/Tab wrap between Journal and Close, Escape removes all focusables and
  restores the trigger, and reopen focuses Close. A localized RTL case remains
  Drawer `358/358px`, list/link `295/295px`, with a 44px row minimum. Light/dark
  link contrast is `17.93:1`/`17.18:1`.
- Search Overlay exposes one named modal, matching native label/input IDs,
  `ul > li > a` results, and zero live regions. Initial focus is query; reverse
  Tab wraps Close→last result, Escape removes the dialog/restores the trigger,
  and reopen focuses query. Localized mobile stays overlay `358/358px`, panel
  `326/326px`; title/result/price contrast is `17.93:1`/`17.93:1`/`7.81:1`
  light and `17.18:1`/`17.18:1`/`12.09:1` dark.
- All three compute `0s` under reduced motion and retain visible system boundaries
  under forced colors. Forty after images include 24 canonical captures for
  3 components × Exhibit/Studio × Mobile/Tablet/Desktop/XL plus 16 wide-host,
  localized/RTL, dark, forced-colors, reduced-motion, and focus cases.
- Six contemporaneous live desktop before captures exist under
  `output/playwright/refinement-batch-16/before/`; no reconstruction is used.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Global CSS | `4,028 B` | `3.7 KiB` | documented exception (`239 B` over) |
| Shared neutral runtime | `10,321 B` | `8 KiB` | existing documented exception; unchanged |
| Batch 16 runtime delta | `0 B` | `0 B` passive | pass |
| Neutral Web components CSS | `61,781 B` | `64 KiB` | pass (`3,755 B` headroom) |

Relative to Batch 15, Global adds `404 B`, neutral runtime source adds `0 B`, and
the complete Web component bundle adds `417 B` deterministic gzip. The new Global
exception is explicit and does not rewrite the permanent ceiling; it records the
container query, semantic typography/anatomy, touch/wrap behavior, bounded modal
layout, canonical dependency hooks, interaction states, reduced motion, and
forced-colors boundaries.

## Validation

- Registry/docs, DTCG source, 183 contracts, and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; copied Global CSS and
  shared JS are byte-identical to canonical source. Shopify reports 24 existing
  non-blocking maturity warnings; Footer, Mobile Menu, and Search Overlay remain
  correctly `planned` for their unresolved section-group/runtime layers.
- Structural certification passes 183/183 with one stable contract and zero
  manifest drift. Exhibit/Studio parity is 183/183 shared with complete visual/
  interaction coverage. Static audit covers 252 previews with 0 errors, 0
  warnings, and 6 informational notes.
- The refinement matrix now covers 183 components, 101 dependency edges,
  49 dossiers, and 46 components ready for human review.
- TypeScript, a complete Vite build into `/tmp`, browser DOM/accessibility/
  keyboard/contrast/container/content/special-media probes, deterministic gzip,
  `git diff --check`, and explicit `site/dist` cleanliness pass.
- The browser log reports only the already-known missing `favicon.ico`; no
  component runtime error or warning survives reload/build.

## Remaining Human Risks And Open Input

1. Footer needs approval of surface, serif headings, 48rem threshold, 2:1 column
   ratio, spacing, touch rhythm, dividers, link states, and sub-footer alignment.
   Required services/content and Shopify section-group publishing remain open.
2. Mobile Menu needs approval of left Drawer width, header/row rhythm, Close
   target, divider, weight, current underline, chevron fixture, hover and focus.
   Nested disclosure/drill-in, breakpoint and close-after-route policy remain open.
3. Search Overlay needs approval of backdrop, top offset, 40rem panel, radius/
   shadow, title, Close target, field focus, result density/media, mobile padding,
   and long-title rhythm. Provider/status/global-overlay lifecycle remains open.
4. No component-specific owner visual references are registered; accept the
   repository renders or provide replacement evidence.
5. Production Web/Shopify/framework/native implementations still require device
   and assistive-technology testing of target-owned inertness, scroll locking,
   service/data truth, route cleanup, and overlay coordination.
6. Global is `239 B` over its provisional family ceiling and shared runtime
   remains above `8 KiB`; both are visible exceptions, not implicit budget resets.
7. Pin Input still requires the owner choice between one full-code native input
   with derived cells and the accepted multiple-input model.

## Program Progress

The regenerated matrix shows 183 components, 101 dependency edges, 49 dossiers,
and 46 components ready for human review. Only Button is human-approved. The next
dependency-safe graph entries follow Footer/Mobile Menu/Search Overlay; Pin Input
remains isolated until its value-owner decision is needed by a dependent
component.
