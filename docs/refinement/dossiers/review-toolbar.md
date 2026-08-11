# Review Sort / Filter Bar Refinement Dossier

Status: `human-review-ready`

Date: 2026-07-15

Registry: `V8` / `review-toolbar`

Dependency order: 155, phase 6 (Composed components), depth 1 after proposed
dependency reconciliation (baseline depth 0)

## Purpose

Review Toolbar is a compact layout composition for controls that affect a
target-owned review list. Its neutral value is the relationship between an
optional ordering/filtering control and an optional write-review action, plus
container-responsive placement of those canonical children.

It does not define the available sort or filter options, perform sorting or
filtering, fetch reviews, own review results, calculate counts, synchronize a
URL, announce result totals, open a form, select a review provider, or decide
whether the write action is navigation or an in-page action.

The historical component name and `.review-toolbar` class describe visual
placement. They do not by themselves justify the WAI-ARIA `toolbar` widget
role, roving focus, or arrow-key navigation.

## Accepted Source Facts

- ADR 0085 keeps Review Toolbar structural and keeps sorting, filtering,
  write-review entry, URL synchronization and result announcements target-owned.
- ADRs 0035, 0047, 0048 and 0089 keep action semantics, selection, native
  value, progressive enhancement and keyboard behavior in canonical Button and
  Select.
- The repository is the source of truth. Figma is evidence and a future target.
- Exhibit and Studio must mount one renderer and one initial fixture.
- No component may move from `pilot` without explicit human approval.

## Baseline Audit

- Contract `0.2.0`, registry, MDX fallback and the shared renderer expose the
  same required root, optional Select composition and optional Button action.
- The formal dependency array is empty even though the contract, renderer and
  documentation explicitly compose canonical Select and Button.
- The root declares `role="toolbar"`, has an accessible label and exposes two
  normal Tab stops: the enhanced Select trigger and write-review Button.
- There is no roving `tabindex`, Left/Right focus movement, Home/End focus
  movement, orientation model, or toolbar-owned JavaScript.
- The Select trigger consumes its own listbox keyboard model. Treating that
  child as an item in a horizontal toolbar would create an avoidable arrow-key
  ownership conflict.
- The shared Studio fixture uses one controlled sort value only to demonstrate
  the native Select `change` boundary. Its status truthfully states that no
  reviews were fetched. The write action similarly reports that no destination
  is configured.
- Exhibit and Studio already mount one `ReviewsStudio` renderer and identical
  initial fixture. Baseline root DOM parity hashes to
  `1777fdc0c03bae41c2ae052dad685f3d54887aa35bb2992dc4bd08f314164d7e`.
- The candidate contains at 280px (`scrollWidth === clientWidth === 216px`), but
  responsive stacking is controlled by a page-viewport media query rather than
  by the component's actual container.
- Root spacing is private hardcoded composition: 12px primary gap, 16px block
  padding and 8px internal/narrow gap. The sort wrapper also assigns a small
  type size despite canonical Select owning its label and value typography.
- Eight paired baseline images cover Exhibit and Studio at Mobile, Tablet,
  Desktop and XL under `output/playwright/refinement-batch-54/before/`.
- Baseline Reviews CSS is `3,697 B` deterministic level-9 metadata-free gzip
  against the permanent `3.7 KiB` (`3,788 B`) ceiling. Review Toolbar adds no
  neutral runtime beyond the independently canonical Select enhancer.

## Standards And Mature-System Evidence

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| WAI-ARIA APG Toolbar | A toolbar is a composite widget intended to reduce Tab stops. APG requires one entry stop plus arrow-key focus movement and recommends the role only for groups of three or more controls. It also warns about children that need the toolbar's arrow pair. | Do not use `role="toolbar"` for one Select plus one action with ordinary Tab order. Preserve child-native keyboard behavior. |
| WAI-ARIA 1.2 Group | `group` represents a logical collection of UI objects without making it a page landmark or defining composite-widget keyboard behavior. | Use a named `group` for the two related review controls when an accessible group label is useful. |
| HTML / native controls | Native Select and Button/anchor semantics already define focus, activation, value and change behavior. | Keep one canonical Select and one canonical Button or anchor; do not add a Review Toolbar focus manager or parallel value store. |
| Open UI Select research | Select owns a trigger/value, option collection and popup behavior; rich/custom presentation does not move value ownership to the surrounding layout. | Keep sort option inventory and selected value in Select/target code. Review Toolbar only composes it. |
| Radix Toolbar | Radix exposes Root, Button, Link, ToggleGroup and Separator and implements roving `tabindex` plus arrows/Home/End. | Radix confirms that a real toolbar is a behavior primitive, not a styling label. The Gallery candidate deliberately does not adopt that API. |
| Polaris Select and choice controls | Mature target controls expose current/default selection, disabled state and `change` at the control level. Search/filtering and rich multi-choice behavior use different controls. | Keep controlled/uncontrolled selection and option meaning in the child. Do not turn the toolbar into a generic filter state store. |
| Shopify theme app extensions | Product reviews and ratings are explicit app-block use cases; app blocks own provider data and must adapt responsively to their host section. | Keep Shopify adapter status planned. A provider app block may consume Gallery CSS, but neutral source must not invent provider Liquid or settings. |

References:

- <https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/>
- <https://www.w3.org/TR/wai-aria-1.2/#group>
- <https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element>
- <https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element>
- <https://open-ui.org/components/select.research/>
- <https://www.radix-ui.com/primitives/docs/components/toolbar>
- <https://shopify.dev/docs/api/app-home/web-components/forms/select>
- <https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/configuration>

## Owner Visual References

Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
and inspector `1020:480`. Direct read-only inspection confirms that both nodes
remain the generic Button component-detail shell and Studio inspector, not
Review Toolbar artwork. They support the editorial shell and metadata-driven
inspector direction only. No toolbar width, spacing, border, responsive mode,
control order or visual hierarchy can be promoted from them.

## Convergence And Differences

Consensus:

- the surrounding layout must not duplicate Select or Button behavior;
- a two-control grouping with normal Tab order is not an APG toolbar widget;
- option inventory, selected value and result effects remain target-owned;
- the write affordance uses Button for an action and an anchor for navigation;
- in-place result updates need target-owned loading, focus retention and
  meaningful announcements;
- the layout must reflow from its container, not only the browser viewport;
- the composition must remain functional with native Select fallback and
  without Review Toolbar JavaScript.

Differences that remain product, provider or target decisions:

- which sort and filter controls exist and whether both appear;
- labels, localized option copy and default sort;
- client-side, server-side or URL-backed result updates;
- result count, loading, empty, failure and announcement behavior;
- whether write-review navigates, reveals Review Form, opens an overlay, or is
  supplied entirely by a provider;
- provider, authentication, moderation and eligibility rules;
- final Figma, Shopify, React, Angular, SwiftUI and Compose presentation.

## Recommended Direction

Keep `.review-toolbar` as the historical class and visual name, but render it as
an optional labelled `group`, not an ARIA toolbar widget. Preserve normal Tab
order and child-native keyboard interaction. Do not add roving focus.

Reconcile registry and contract dependencies to `select` and `button`, because
both are explicit canonical compositions. Keep `control` and `writeAction` as
optional slots; the root is useful with either or both and must not render empty
placeholders.

Make narrow stacking container-responsive by naming the root as an inline-size
container and changing only descendant widths/layout in a container query.
Remove the sort wrapper's typography assignment so Select remains the sole
typography owner. Keep 8/12/16px layout measures private rather than promoting
each compositional value into public API.

Retain the docs-only controlled sort demonstration and local write-action
feedback, but state that they exercise event boundaries and never represent a
real result update or destination. Do not add provider Liquid, result markup,
filter state, count state or orchestration runtime.

## Alternatives Requiring A Decision

1. **True APG toolbar widget.** Requires at least three coherent commands,
   orientation, roving focus, arrow/Home/End behavior, disabled-item policy and
   reconciliation with child controls that already consume arrows.
2. **Provider-backed review controls.** Requires provider, data schema, allowed
   sort/filter options, endpoint, loading, error, result and moderation rules.
3. **Filter composition.** Requires single/multiple selection, apply/clear
   behavior, counts, disclosure/overlay behavior, URL state and announcements.
4. **Write-review disclosure.** Requires deciding inline Review Form, Modal,
   Drawer, navigation or provider-owned activation plus focus/dismissal rules.
5. **Result-status ownership.** Requires accepted loading, count, empty, error,
   focus and live-region policy.

The current repo does not contain enough product evidence to select these.

## Candidate Anatomy

| Part | Required | Semantics | Ownership |
| --- | --- | --- | --- |
| Root | yes | Optional labelled `group`; responsive layout only | Review Toolbar |
| Control wrapper | no | Structural slot wrapper | Review Toolbar |
| Select | no | Canonical native/enhanced single select | Select / target |
| Native-select hook | no | Containment-only BEM hook; no field visuals | Review Toolbar |
| Write action | no | Canonical Button or native anchor | Button / target |
| Result list/status | no | Deliberately outside this component | Target |

## State And Mode Matrix

| Mode/state | Neutral expectation |
| --- | --- |
| Both slots | Select and action share one row when space allows. |
| Control only | Control uses available width without an empty action region. |
| Action only | Action remains intrinsic without an empty control region. |
| Empty composition | Root may be omitted; contract does not invent a placeholder. |
| Select open/changed | Select owns popup and value; target handles the native change request and results. |
| Action activation | Button or anchor owns activation; destination/result remains target-owned. |
| Loading/results | Target drives child busy/disabled state and truthful external status. |
| Disabled | Child Select/Button owns native disabled presentation and behavior. |
| Long/localized content | Labels, options and action copy wrap or size without root overflow. |
| Narrow container | Children stack and stretch from container width, independent of viewport width. |
| RTL | DOM order remains logical; intrinsic layout and child controls follow direction. |
| Reduced motion | Review Toolbar adds no motion; Select/Button obey their own reduced-motion rules. |
| Forced colors | Child focus/borders remain perceivable; structural border uses a semantic token. |

## Public API And State Ownership

Keep the semantic API narrow:

- `label`: optional accessible group name when surrounding context is
  insufficient;
- `control`: optional target-owned canonical Select or another accepted native
  review-list control slot;
- `writeAction`: optional canonical Button or anchor slot.

The component emits no synthetic event. Targets listen to the child's native
`change`/activation events. Static Web may use a native selected option; React
and Angular may control the child value or use a child default. No target should
store a second Review Toolbar copy of the selected value.

Do not expose container breakpoint, flex basis, gap, padding, border position,
child width, option inventory, selected value, result count, loading, empty,
error, provider ID, URL state or write-flow state as Review Toolbar properties.

## Token And Hardcoded Audit

- `--color-border-subtle` is the only root visual token and remains public.
- The current `--typo-body-sm-size` reference is redundant child-typography
  ownership and should be removed from CSS, contract and Studio metadata.
- The 8px child gap, 12px root gap and 16px block padding are private layout
  measures. They remain hardcoded implementation facts rather than public token
  overrides or new source tokens.
- Select and Button own typography, dimensions, icons, surfaces, borders,
  focus, hover, disabled, busy and validation values.
- No component-specific token layer is warranted.

## Responsive And Content Evidence Plan

- paired Exhibit/Studio screenshots at 390, 768, 1440 and 1920px;
- intrinsic hosts at 216px, 320px, 480px and 720px, including a wide viewport
  with a narrow host to prove container rather than viewport behavior;
- both slots, control-only and action-only composition;
- short, long localized and extreme labels/options/action copy;
- Select native fallback, enhanced keyboard commit and reset synchronization;
- action focus/activation, sequential Tab order and absence of toolbar arrow
  focus management;
- 200% type, RTL, dark, forced colors and reduced motion;
- exact Exhibit/Studio root DOM parity;
- static fallback syntax, source/generated CSS identity and deterministic gzip.

## Cross-Target Translation

| Target | Translation |
| --- | --- |
| Neutral Web | Labelled group plus canonical Select and Button/anchor; no toolbar focus manager. |
| Shopify | Provider theme app block supplies review data, allowed controls and lifecycle while consuming generated CSS. |
| Webflow | Native Select/action composition plus external CMS/provider result behavior. |
| React / Angular | Controlled or uncontrolled child Select plus target action callback/navigation; no wrapper state store. |
| Figma | Group layout composed from accepted Select/Button instances after component-specific artwork exists. |
| SwiftUI / Compose | Target-native picker/menu and action in an adaptive stack; result lifecycle stays target-owned. |

## Performance Budget

- Reviews CSS: `3,788 B` deterministic metadata-free gzip ceiling.
- Review Toolbar orchestration runtime: `0 B` listeners, observers, timers,
  requests, result stores, formatters and layout reads beyond child-owned Select
  progressive enhancement and docs-only feedback.
- Neutral Review Toolbar assets: `0 B`.
- Provider requests, result data, pagination and analytics budgets are
  target-owned and require an explicit integration decision.
- Global Neutral Web CSS/runtime exceptions remain visible program gaps and are
  not budget increases.

## Risks And Open Questions

| Risk/question | Boundary | Required action |
| --- | --- | --- |
| Historical name suggests ARIA toolbar semantics. | accessibility/source | Document the class/name as visual history and use `group`, not a composite widget. |
| Sort/filter option model is unknown. | product/provider | Define per target before integration; do not infer from docs fixtures. |
| Write-review destination is unknown. | product/target | Choose navigation, inline form, overlay or provider activation before wiring it. |
| Results lifecycle is external. | product/accessibility | Define loading, focus, counts, empty/error and announcements with the real target. |
| No component-specific Figma artwork exists. | human visual | Approve browser candidate before creating the Figma target. |
| Reviews CSS has 91 B baseline headroom. | performance | Recover or hold bytes; never raise the ceiling implicitly. |
| Formal dependencies are incomplete. | architecture/source alignment | Reconcile registry and contract to canonical Select and Button in this batch. |

## Readiness Boundary

Technical readiness requires corrected group semantics, complete formal
dependencies, exact child ownership, container-responsive stacking, slot
omission, keyboard/event evidence, content/special-mode evidence, exact
Exhibit/Studio parity, generated-target validation and budget compliance.

Human review must approve the visual hierarchy, inline-versus-stacked behavior,
spacing, border treatment, Select/action emphasis and localized examples. Product
or target owners must still select provider, options, results lifecycle and
write-review flow. The component remains `pilot` until explicit human approval.
