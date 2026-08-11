# Filter Panel Web Refinement Audit

Status: `human-review-ready`; contract remains `pilot`

Date: 2026-07-20

Decision: ADR 0250

Evidence: `output/playwright/refinement-batch-134/`

## Outcome

The former `filters` / Collection Filters candidate is now the domain-neutral
`filter-panel` / Filter Panel. It presents one target-supplied facet form beside
its associated results when its own container is at least `40rem`, and presents
that same form inside canonical modal Drawer when constrained. There are no
desktop/mobile form copies and no compatibility aliases.

Immediate commitment is the default. Manual mode maintains one draft until
Apply and restores the committed values on Cancel. Filter Panel owns the native
form anatomy, adaptive surface and bounded Drawer lifecycle; the target owns
facet data, query parameters, URL/history, result replacement, truthful status,
focus after replacement, pagination reset and analytics. Sort and result count
remain outside E3.

The Neutral Web runtime, shared React Exhibit/Studio renderer and Shopify Main
Collection implementation now follow that contract. Automated browser evidence
has zero assertion, console and page errors. No `stable` promotion is claimed.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Domain-neutral faceted narrowing; filtering algorithm, data discovery, sort, count, URL/history and results stay target-owned. |
| Anatomy and composition | pass | One named GET form/control tree, native active list, fieldset/legend groups, sibling results and canonical Drawer/Button/Checkbox/Radio/Input/Tag dependencies. |
| Variants, sizes and states | pass for v1 | Immediate/Manual; panel, Drawer closed/open; zero/one/many groups and values; committed/draft projections. |
| Public API and ownership | pass | Stable semantic labels, action and slots only; width/threshold, geometry and internal event wiring stay private. |
| Tokens and visual system | pass | Five existing semantic public tokens; private `15rem` panel width and `40rem` threshold; no new token layer or assets. |
| Accessibility and interaction | pass | Native controls, named modal Drawer, focus containment/return, Escape/backdrop, inert background, scroll lock, forced colors and reduced motion. |
| Responsive/content resilience | pass | Container-derived switch at 640 CSS px; no overflow at five direct widths or in localized RTL 200% stress. |
| Runtime and assets | pass with documented global gap | One bounded ResizeObserver/listener lifecycle, deterministic destroy, no request/history/data ownership or assets. |
| Cross-target translation | pass for implemented targets | Neutral Web, first-party React docs and Shopify Main Collection implement the same semantic boundary. |
| Exhibit/Studio parity | pass | Exact normalized DOM and computed-style hashes plus equal geometry at the controlled 520px host. |
| Architecture/readiness | **human review ready** | ADR 0250 resolves identity, adaptive surface, commitment and ownership; remaining gates are human visual/live-target review. |

## Contract And Implementation

- Contract `0.3.0` remains `pilot` and records one form/control tree, the
  container-derived surfaces, both commitment modes and target lifecycle
  ownership.
- Registry, contract, MDX, Studio metadata, dossier and decision ledger use
  only `filter-panel`; `filters` is retained only in superseded historical
  records.
- `.filter-panel` is a named inline-size container. At `>= 40rem` its surface is
  an adjacent non-modal panel with a private `15rem` inline size. Below that
  threshold the canonical Drawer surface is initially closed and opened by a
  canonical Button.
- The neutral enhancer observes only the root, reuses the same form across
  surfaces, manages Drawer focus/inertness/scroll/dismissal and emits bounded
  request/lifecycle events without changing URL, history or results.
- Exhibit and Studio share `FilterPanelArtwork`; the docs-only `160px` grid
  override found during visual QA was removed so the renderer now demonstrates
  the canonical `15rem` panel width.
- Shopify maps `collection.filters` list, boolean and price-range records to
  canonical controls and real filter parameter names/values. Immediate mode
  uses native GET submission; Manual mode exposes Apply/Cancel. Sort preserves
  active filter values while staying outside E3.

## Browser Evidence

- Mobile, Tablet, Desktop and XL captures exist for both Exhibit and Studio.
  Every state contains one form and two fieldsets with no component, stage or
  document overflow.
- Direct hosts at `320`, `520` and `639px` use a closed Drawer; `640` and
  `760px` use the visible adjacent panel. Both surfaces retain one form and one
  choice tree.
- At a controlled `520px`, Exhibit and Studio produce identical DOM hash
  `e19de631`, identical computed-style hash `bd5a20ba` and equal geometry.
- The Drawer opens as a named modal dialog, focuses Close, contains Tab,
  excludes results, locks scroll, closes by Escape/backdrop and restores the
  trigger.
- Immediate changes update native FormData and committed Tags. Manual draft
  changes leave committed Tags unchanged; Cancel restores controls and Apply
  commits. Removing Stoneware unchecks its choice and focuses the surviving
  `Remove Available now` action.
- The neutral adapter produced exactly two surface, two open, one change and
  one commit event in the bounded probe, then removed its enhancement marker on
  destroy.
- Localized Arabic/English unbroken content at RTL and 200% remains contained.
  Dark text contrast measured `17.18:1`; forced colors retain a solid `4px`
  keyboard-focus outline and `1px` surface boundary; tested transitions resolve
  to `0s` under reduced motion.
- Structured evidence is in `evidence-summary.json`; eight natural and five
  special-state screenshots are preserved with the batch.

## Performance And Risks

- Collection CSS is `2,490 / 2,560 B` gzip, leaving `70 B`.
- The neutral component bundle is `71,754 / 65,536 B`; its documented global
  gap is `6,218 B`.
- Shared runtime is `22,807 / 8,192 B`; its documented global gap is `14,615 B`.
  ADR 0250 is registered as evidence for the required E3 contribution and does
  not raise either ceiling.
- Residual gates are explicit human approval of panel density/width, dividers,
  Drawer geometry/motion and localized wrapping; live Shopify theme behavior;
  extreme merchant facet counts; and component-specific Figma evidence.
- A future async coordinator must remain target-native. Moving fetch, URL,
  history or result status into neutral Filter Panel would violate ADR 0250.

## Validation

Batch 134 covers the component contract, Studio metadata, registry/docs,
Neutral Web and Shopify adapters, source/copied CSS identity, TypeScript, static
previews, structural Exhibit/Studio audit, global refinement/performance audits,
semantic and interaction browser probes, viewport and direct-container
evidence, localized/RTL/200%, dark, forced colors, reduced motion, diff checks,
resource cleanup and `site/dist` cleanliness. `site/dist` was not rebuilt.
