# Component Refinement Batch 15

Status: Breadcrumb, Header, and Announcement Bar complete for human review

Date: 2026-07-13

Components: Breadcrumb, Header, Announcement Bar

## Outcome

All three components are prepared for explicit human stability review. Research
dossiers, semantic contracts, source CSS, one Exhibit/Studio renderer per family,
target boundaries, generated/copied outputs, browser behavior, responsive
evidence, and individual reports are reconciled.

Breadcrumb now exposes its ordered native hierarchy. Header now responds to its
own container and composes canonical Button actions without claiming target
services. Announcement Bar now remains neutral static content unless a target
intentionally names it as a section. A measured light-theme contrast failure in
Header current text and Breadcrumb hover was corrected by keeping primary text
and reserving the existing accent for the underline. No contract moved to
`stable`; Button remains the only human-approved component. `site/dist` was not
rebuilt or modified.

## Research And Decision

- WAI-ARIA APG/landmark guidance, HTML, WCAG 2.2, Open UI, Radix, Shopify, and
  Polaris boundary evidence defines native breadcrumb hierarchy, page-shell
  landmarks, ordinary navigation links, target-owned global services, and the
  difference between static promotion and dynamic status.
- ADR 0100 supersedes only the Breadcrumb portion of ADR 0071. It preserves ADR
  0086's Header/Announcement product and target-service boundaries.
- Component guide examples, MDX pages, Studio metadata, registry, contracts,
  shared renderers, canonical CSS, and Shopify Liquid now describe the same
  narrow source contracts.

## Browser Evidence Summary

- Breadcrumb accessibility exposes named navigation, ordered list/listitems,
  native ancestor links, hidden separators and one current item. An extreme
  localized mobile path remains contained at `358px` stage / `326px` component.
  Link/current contrast is `7.81:1`/`17.93:1`; hover text is `17.93:1` with an
  accent underline.
- Header compact mode keeps a `358px` root free of overflow and retains named
  Cart/Menu Button actions. A `900px` supplemental host switches to expanded
  mode, hides the menu trigger, and displays a `491px` nav. Localized RTL stress
  keeps root `900/900px` while nav owns `552/760px` visible/scroll width.
  Logo/current/normal/badge contrast is `17.93:1`/`17.93:1`/`7.81:1`/`10.37:1`.
- Announcement Bar is neutral by default and a named section only when labelled;
  it never gains `aria-live`. Extreme localized mobile content remains
  `358/358px` and grows vertically. Contrast is `16.89:1` light and `7.00:1`
  dark.
- Thirty-eight after images include 24 canonical captures for 3 components ×
  Exhibit/Studio × Mobile/Tablet/Desktop/XL and 14 hover/focus, expanded-host,
  labelled-region, localized/RTL, dark, and forced-colors/reduced-motion cases.
- Six contemporaneous live desktop before captures exist under
  `output/playwright/refinement-batch-15/before/`; no reconstruction is used.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Layout CSS | `5,257 B` | `4.8 KiB` | documented exception (`342 B` over) |
| Global CSS | `3,624 B` | `3.7 KiB` | pass (`164 B` headroom) |
| Shared neutral runtime | `10,321 B` | `8 KiB` | existing documented exception; unchanged |
| Batch 15 runtime delta | `0 B` | `0 B` passive | pass |
| Neutral Web components CSS | `61,364 B` | `64 KiB` | pass (`4,172 B` headroom) |

Relative to the Batch 14 close, Layout adds `113 B`, neutral runtime adds `0 B`,
and the complete Web component bundle adds `368 B` deterministic gzip. The
continuing Layout exception is explicit and does not rewrite the permanent
ceiling. Global remains inside its own permanent family budget.

## Validation

- Registry/docs, DTCG source, 183 contracts, and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; Webflow and Shopify copied
  Layout/Global CSS are byte-identical to canonical source. Announcement Bar's
  static Shopify mapping is target-ready; Header's runtime maturity gap remains
  explicit rather than being papered over.
- Structural certification, Exhibit/Studio parity, static previews, and the
  refinement matrix regenerate without drift or preview failures.
- TypeScript, a complete Vite build into `/tmp`, browser DOM/accessibility/
  keyboard/contrast/container/content/special-media probes, deterministic gzip,
  `git diff --check`, and explicit `site/dist` cleanliness pass.
- Fresh browser sessions report only the already-known missing `favicon.ico`;
  no component runtime error or warning survives reload/build.

## Remaining Human Risks And Open Input

1. Breadcrumb needs approval of separator, spacing, current weight, focus ring,
   target height, wrap rhythm, and complete-path policy. Collapse remains product
   work if ever desired.
2. Header needs approval of sticky height, wordmark scale, padding, border,
   underline, icon actions, cart badge, compact priority, and internal nav scroll.
   Target services/action architecture remain open under ADR 0086.
3. Announcement Bar needs approval of statement surface, compact height, type,
   centered alignment, underline/focus, and copy-length guidance. Dismissal,
   rotation, scheduling, targeting and campaign lifecycle remain open.
4. No component-specific owner visual references are registered; accept the
   repository renders or provide replacement evidence.
5. Production Web/Shopify/framework/native implementations still require device
   and assistive-technology testing of their target-owned services.
6. Layout remains `342 B` over its provisional ceiling and shared runtime remains
   above `8 KiB`; both are visible exceptions, not implicit budget resets.
7. Pin Input still requires the owner choice between one full-code native input
   with derived cells and the accepted multiple-input model.

## Program Progress

The regenerated matrix now shows 183 components, 100 dependency edges,
46 dossiers, and 43 components ready for human review. Only Button is
human-approved. The next dependency-safe graph entries follow Breadcrumb/Header/
Announcement Bar; Pin Input remains isolated until its value-owner decision is
needed by a dependent component.
