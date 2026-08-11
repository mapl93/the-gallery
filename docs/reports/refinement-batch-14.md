# Component Refinement Batch 14

Status: Tooltip, Accordion, and Tabs complete for human review

Date: 2026-07-13

Components: Tooltip, Accordion, Tabs

## Outcome

All three components are prepared for explicit human stability review. Their
research dossiers, semantic contracts, source CSS, shared Exhibit/Studio
renderer, target boundaries, generated/copied outputs, browser behavior,
responsive evidence, and individual reports are reconciled.

Tooltip no longer replaces its trigger name. Accordion no longer leaves
collapsed descendants in rendering or focus order. Tabs now has a complete
horizontal automatic/manual keyboard model and explicit disabled/panel focus
semantics. FAQ Section was migrated as a dependent Accordion consumer. No
contract moved to `stable`; Button remains the only human-approved component.
`site/dist` was not rebuilt or modified.

## Research And Decision

- WAI-ARIA APG, WCAG 1.4.13, HTML, Open UI, Radix, and Shopify evidence defines
  described Tooltip content, hover persistence/Escape, Accordion heading/hidden
  composition, and labelled roving Tabs with automatic/manual activation.
- ADR 0099 supersedes only the Tooltip/Accordion/Tabs portion of ADR 0071. It
  records the neutral item/anatomy semantics and preserves provider, group,
  positioning, routing, and richer-mode ownership in targets.
- The component guide, MDX pages, Studio metadata, registry, contracts, and FAQ
  consumer now describe the same source contract rather than stale alternatives.

## Browser Evidence Summary

- Tooltip exposes `Material details` as its name and `View material details` as
  its separate description. Focus/hover reveal it; hover transfer persists;
  Escape hides it without moving focus. A 128-character 320px fixture wraps with
  no inline overflow. Contrast is `16.89:1` light and `7.00:1` dark.
- Accordion exposes heading-contained native triggers and only expanded regions.
  Click/Space/Enter synchronize `aria-expanded` and native `hidden`; independent
  multiple-open and disabled-expanded item states are supported. Localized RTL
  content has zero root/stage inline overflow.
- Tabs verifies automatic selection, manual focus-without-selection, Enter
  commit, disabled skipping/fallback, direction-aware arrows, Home/End, one
  selected/visible pair, and Tab into the active panel. At 320px, a `1192px`
  localized tab strip scrolls inside a `256px` list without root overflow.
- Thirty-six after images include 24 canonical captures for 3 components ×
  Exhibit/Studio × Mobile/Tablet/Desktop/XL and 12 dark, forced-color/
  reduced-motion, disabled/manual/RTL, Escape/hover, and localized stress cases.
- The initial live-before browser command used invalid CLI argument syntax and
  wrote no files. Six desktop baselines were honestly reconstructed from the
  pre-edit `HEAD` CSS and shared renderer with the original fixtures/tokens;
  their filenames and directory explicitly say `before-reconstructed`. They are
  comparison aids, not contemporaneous live evidence.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Layout CSS | `5,144 B` | `4.8 KiB` | documented exception (`229 B` over) |
| Shared neutral runtime | `10,321 B` | `8 KiB` | existing documented exception; unchanged |
| Batch 14 runtime delta | `0 B` | `0 B` target-owned | pass |
| Neutral Web components CSS | `60,996 B` | `64 KiB` | pass (`4,540 B` headroom) |

Relative to the Batch 14 start, Layout adds `510 B`, neutral runtime adds `0 B`,
and the complete Web component bundle adds `416 B` deterministic gzip. ADR 0099
records why the Layout family overage is accepted for review without silently
changing the permanent rubric: three skeletal components gain explicit
semantic nodes, safe hidden behavior, disabled/focus states, wrapping/overflow,
special-media, and direction-aware presentation. Recalibration remains deferred
until the remaining Layout family supplies comparable evidence.

## Validation

- Registry/docs, DTCG source, 183 contracts, and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; Webflow and Shopify
  Layout copies are byte-identical to canonical `components/css/layout.css`.
  Existing 26 Shopify maturity warnings remain non-blocking backlog.
- Structural certification reports 183/183 automated passes, one stable
  contract, zero structural gaps, and zero Web manifest drift.
- Exhibit/Studio parity reports 183/183 structurally shared components and full
  interaction coverage; 252 static previews report zero errors/warnings.
- The refinement matrix reports 183 components, 100 dependency edges,
  43 dossiers, and 40 ready for human review.
- TypeScript, a complete Vite build into `/tmp`, browser keyboard/ARIA/
  contrast/content/special-media/overflow probes, deterministic gzip,
  `git diff --check`, and explicit `site/dist` cleanliness pass. The temporary
  build retains the already-known large main-chunk warning.
- Fresh browser sessions report only the existing missing `favicon.ico`; an HMR
  session also recorded a transient Studio JSON 404 while that source file was
  being patched. No component runtime warning/error survived reload or build.

## Remaining Human Risks And Open Input

1. Tooltip needs approval of surface/text pairing, offset, maximum measure,
   arrow, radius/type, and trigger relationship. Provider delay, touch policy,
   collision/portal behavior, and disabled triggers remain target architecture.
2. Accordion needs approval of group surface, dividers, trigger height/spacing,
   weight, icon, hover/focus, and immediate panel transition. Single/multiple/
   collapsible value API and native-details translation remain open.
3. Tabs needs approval of tab height/spacing, selected text/underline, focus,
   scrollbar affordance, panel spacing, and disabled treatment. Vertical,
   routed, closable, lazy, dynamic, and overflow-menu modes remain open.
4. No component-specific owner visual references are registered; accept the
   repository renders or provide replacement evidence.
5. Production Web/Shopify/framework/native implementations still require
   device and assistive-technology testing of their target-owned services.
6. The Layout family is `229 B` above its provisional ceiling. This is visible
   review debt, not a failed full-bundle budget or an implicit budget reset.
7. Pin Input still requires the owner choice between one full-code native input
   with derived cells and the accepted multiple-input model.

## Program Progress

The regenerated matrix now shows 183 components, 100 dependency edges,
43 dossiers, and 40 components ready for human review. Only Button is
human-approved. The next graph entries are Breadcrumb, Header, and Announcement
Bar; Pin Input remains isolated until its value-owner decision is needed by a
dependent component.
