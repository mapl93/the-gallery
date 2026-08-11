# Review Highlights / Themes Refinement Dossier

Status: Technically refined; ready for human review; remains `pilot`

Date: 2026-07-15

Registry: `V5` / `review-highlights`

Dependency order: 152, phase 6 (Composed components), depth 0

## Purpose

Review Highlights presents a short, target-supplied collection of recurring
review themes and optional counts. Its neutral value is scannable review
classification: it does not extract themes, calculate counts, own reviews, or
control a result set.

Reasonable target projections are:

- passive theme summaries;
- native links to target-owned filtered destinations;
- native toggle buttons for target-owned in-place selection.

The component is not a generic Tag, query controller, facet engine, Toggle
Group, navigation model, result announcer, provider integration or review
taxonomy.

## Accepted Source Facts

- ADR 0085 explicitly leaves passive, navigation, single-select and
  multi-select behavior target-owned.
- Theme extraction, count synchronization, URLs, filtering, result state,
  focus, empty results and announcements are unresolved product or target
  decisions.
- The repo is the source of truth. Figma is evidence and a future target.
- Exhibit and Studio must render one implementation and one fixture.
- Review Highlights has no canonical component dependency and must not invent a
  Button, Toggle Group or Tag dependency while its item mode remains open.
- No component may be promoted from `pilot` without explicit human approval.

## Baseline Audit

- Contract `0.2.0` correctly states the interaction boundary but exposes only a
  root and repeated `.review-highlights__tag`; it does not require native list
  structure.
- Registry still describes a "filterable tag cloud", contradicting ADR 0085's
  neutral boundary.
- The shared renderer always emits four toggle buttons, one initially pressed,
  and reports a local selection change even though the docs call passive text
  the default. Exhibit therefore presents an unresolved filtering candidate as
  the canonical artwork.
- MDX contains passive `span` items, so its fallback and shared artwork express
  different anatomy and semantics.
- CSS applies hover presentation to passive spans and allows a semanticless
  `.is-active` class to look selected. The hover rule can also mask the pressed
  surface while a selected button is hovered.
- The root is a labelled `section` rather than a native collection. Counts are
  descendants of their labels, but bare numbers have no explicit unit.
- Passive items unnecessarily receive a 44px touch target. Interactive items
  should retain it; passive classification text does not need action geometry.
- Item and count typography specify sizes only, inheriting family, weight and
  line height from the host. Count opacity can weaken contrast without adding
  semantic value.
- Eight paired baseline screenshots cover Exhibit and Studio at Mobile,
  Tablet, Desktop and XL under
  `output/playwright/refinement-batch-51/before/`.
- Baseline Reviews CSS is `3,781 B` deterministic gzip against the fixed
  `3.7 KiB` (`3,788 B`) family ceiling. The component adds no neutral runtime.

## Standards And Mature-System Evidence

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| HTML / native list semantics | Repeated related items belong in `ul` / `li`; native elements preserve relationships without custom roles. | Use a native unordered list and list items for every mode. Restore explicit `role=list` because the visual reset removes markers. |
| WAI-ARIA APG Button | A toggle button uses `aria-pressed`, keeps a stable label and supports native Enter/Space activation. | Only a target-owned in-place selection uses native buttons with stable names and projected pressed state. |
| WAI-ARIA APG Toolbar / Radio | Visually similar toggle controls need radio semantics when exactly one choice is allowed. | Do not infer single-select from pill styling; a future single-select target needs an explicit radio-group decision. |
| WCAG 4.1.3 | A visible brief result message such as "18 results returned" is a status message when content updates without focus movement. | Review Highlights does not invent announcements; the results controller owns a complete localized status. |
| Open UI Press Button | Native press behavior is still exploratory; current Web implementations require explicit state ownership. | Document authored/projected state and do not add neutral runtime merely to demonstrate a possible filter. |
| Radix Toggle Group | `single` and `multiple`, controlled and uncontrolled values, roving focus and orientation are explicit API decisions. | These are evidence that a filtering target needs a separate accepted contract, not implicit behavior in a theme cloud. |
| Polaris Chip | Passive chips classify content; actions do not belong to the passive component. | The shared neutral fixture should be passive. |
| Polaris Clickable Chip | Interactive filters, links, removal, disabled state and events are distinct from passive chips. | Native target projections may reuse the visual class, but must supply truthful link/button semantics and ownership. |

References:

- <https://www.w3.org/WAI/ARIA/apg/patterns/button/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/>
- <https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html>
- <https://open-ui.org/components/press-button.explainer>
- <https://www.radix-ui.com/primitives/docs/components/toggle-group>
- <https://shopify.dev/docs/api/app-home/web-components/typography-and-content/chip>
- <https://shopify.dev/docs/api/app-home/web-components/actions/clickable-chip>
- <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/list-style#accessibility>

## Owner Visual References

Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
and inspector `1020:480`. Live inspection confirms they are the generic Button
component-detail shell and generic Studio inspector, not Review Highlights
artwork. They establish the editorial docs-shell direction only. No theme-pill
color, typography, radius, spacing or interaction value can be promoted from
these nodes.

## Convergence And Differences

Consensus:

- repeated themes form a compact collection;
- passive and interactive chips are different semantic contracts;
- native links and buttons must carry their actual purpose;
- selection mode, state owner and result lifecycle must be explicit;
- counts and labels come from the target/provider;
- focus and touch geometry apply to interactive projections;
- concise labels scan better, while the neutral layout must still contain
  localization and extreme content.

Differences that remain product or target decisions:

- passive summary versus navigation versus filtering;
- single versus multiple filter selection;
- whether zero-count themes are omitted, disabled or navigable;
- URL/query synchronization and back/forward behavior;
- immediate versus applied filtering;
- focus retention, loading, empty results and localized announcements;
- provider taxonomy, ordering and count freshness.

## Recommended Direction

Use a native `ul[role=list]` root with repeated `li` items. The shared
Exhibit/Studio fixture is passive and uses a plain text theme surface because
that is the only mode accepted without additional product architecture.

Keep target projection open through the item slot:

- passive: `span.review-highlights__tag`;
- navigation: `a.review-highlights__tag[href][aria-current?]`;
- in-place toggle: `button.review-highlights__tag[aria-pressed]`.

Style only real native state attributes. Remove `.is-active`; it creates a
selected appearance without exposing meaning. Restrict hover, focus, disabled
and touch-target treatment to interactive elements. The neutral component
contains no state or result runtime.

This recommendation strengthens the accepted boundary without choosing a
filtering model.

## Alternatives Requiring A Decision

1. **Canonical multi-select filter.** Add a controlled/uncontrolled array,
   request event, result-controller association, clear/reset policy and
   announcement contract. A formal Toggle Group relationship may follow.
2. **Canonical single-select filter.** Use radio-group semantics rather than
   independent toggle buttons and decide whether one value must remain selected.
3. **Canonical navigation cloud.** Require target URLs, link semantics,
   `aria-current`, history behavior and destination/result ownership.
4. **Separate passive and interactive components.** Keep Review Highlights
   strictly passive and introduce a future Review Theme Filter only after the
   provider and results architecture is accepted.

The current repo does not contain enough product evidence to choose among these
alternatives.

## Candidate Anatomy

| Part | Required | Semantics | Ownership |
| --- | --- | --- | --- |
| Root | yes | Native unordered list, optionally named | Review Highlights |
| Item | yes, repeated | Native list item | Review Highlights |
| Theme surface | yes | Passive text, native link or native button | Target chooses truthful element |
| Label | yes per item | Visible localized theme name | Target/provider |
| Count | no | Visible target-formatted count with accessible unit/context | Target/provider |

## State And Mode Matrix

| Mode/state | Neutral expectation |
| --- | --- |
| Passive default | Native list; no cursor, hover, focus or touch-action contract. |
| Navigation | Native link with URL; optional truthful `aria-current`; no toggle state. |
| In-place unpressed | Native button with `aria-pressed=false`; stable name. |
| In-place pressed | `aria-pressed=true`; state remains visible under hover and forced colors. |
| Hover | Fine-pointer feedback only for links and enabled buttons. |
| Focus-visible | 2px tokenized outline with 2px offset on interactive surfaces. |
| Disabled | Native button only; unavailable state remains visible. |
| Empty | Valid empty native list; surrounding target owns empty explanation. |
| Long/localized | Items wrap intrinsically without expanding their container. |
| RTL | Source order remains authoritative; flex wrapping follows writing direction. |
| Reduced motion | Interactive transition resolves to none. |

## Public API And State Ownership

Keep the public semantic API narrow:

- `label`: optional localized accessible name when surrounding content does not
  identify the collection;
- `items`: required target-owned repeated theme composition.

Do not expose private gap, padding, pill radius, label/count spacing, typography
internals, theme ordering or provider identifiers as public properties.

The passive neutral component has no controlled/uncontrolled state. A target
that chooses buttons owns authored initial state, projected state, request
reconciliation and reset; framework adapters may expose controlled and initial
values only after that target contract is accepted.

## Token And Hardcoded Audit

Public existing tokens should cover:

- secondary/primary surfaces, default/subtle/focus borders and primary/secondary
  text;
- full body-small and caption family/size/line-height/weight roles;
- full radius, touch target and disabled opacity. Review Highlights owns no
  transition; state changes are immediate.

Private audited composition may retain the `8px` item gap, `16px` block inset,
`6px 14px` pill padding, `4px` label-count gap and 2px focus geometry. These are
not stable cross-target customization decisions.

The fixed Reviews CSS ceiling remains `3,788 B`. Refinement must recover bytes
by removing ambiguous selectors and redundant declarations before adding
complete semantics and typography; raising the ceiling is not authorized.

## Responsive And Content Evidence Plan

- paired Exhibit/Studio images at 390, 768, 1440 and 1728px;
- intrinsic 220px host with long unbroken and localized RTL labels at 200% type;
- empty collection and omitted counts;
- large, zero and localized count strings;
- passive, navigation-current, toggle-pressed, hover, focus and disabled CSS
  projections;
- light/dark contrast, forced colors and reduced motion;
- normalized Exhibit/Studio DOM parity;
- source/generated CSS identity and deterministic gzip.

## Cross-Target Translation

| Target | Translation |
| --- | --- |
| Neutral Web | Native list/list-item structure and target-selected span/link/button surfaces; zero component runtime. |
| Shopify | Provider/theme app block supplies review taxonomy, localized counts and any URLs/actions while consuming generated CSS. No placeholder review provider Liquid. |
| Webflow | CMS/provider-authored list and truthful native surfaces using copied CSS. |
| React / Angular | Passive list now; a future accepted interactive adapter owns controlled/initial selection and request callbacks. |
| Figma | Passive and target-mode visual states only after component-specific artwork exists; no runtime semantics. |
| SwiftUI / Compose | Native list/flow layout with Text, Link or Button/Toggle semantics selected by the target integration. |

## Performance Budget

- Reviews CSS: `3,788 B` deterministic gzip ceiling.
- Passive Review Highlights runtime: `0 B` listeners, observers, timers,
  requests, formatters and layout reads.
- No target-neutral media, icon or font asset.
- Global Neutral Web CSS/runtime exceptions remain visible program gaps and are
  not budget increases.

## Risks And Open Questions

| Risk/question | Boundary | Required action |
| --- | --- | --- |
| Item mode remains unresolved. | product/target | Human/target decision before a filtering or navigation adapter. |
| Provider taxonomy and counts are unknown. | target/data | Select provider/data model and localization policy. |
| Result lifecycle is unknown. | architecture | Define URL, loading, focus, empty and announcement ownership with the results controller. |
| Zero-count policy is unknown. | product/accessibility | Decide omit versus disabled versus available per target. |
| No component-specific Figma artwork exists. | human visual | Approve browser candidate before creating the Figma target. |
| Reviews CSS had 7 B headroom at baseline. | performance | Preserve or recover space within the family; do not raise the ceiling silently. |

## Readiness Boundary

Technical readiness requires one passive canonical fixture, reconciled native
list anatomy, target-native state hooks, complete typography, content and
special-mode evidence, generated adapters, performance measurement and a
durable report. It does not choose a filtering model, provider, result
controller, Figma artwork or `stable` status.

## Refinement Evidence

- The registry, contract `0.3.0`, canonical renderer, Studio metadata and MDX
  now agree on one passive native list with target-owned theme labels and
  optional counts.
- The accessible tree exposes `list` / `listitem` relationships and localized
  count units. The canonical fixture contains zero focusable controls and zero
  live regions.
- Target-only probes verify native link/current, button/pressed, disabled,
  Enter, Space, hover and focus-visible behavior without adding component
  runtime or mutating `aria-pressed` on behalf of the target.
- Exhibit and Studio root markup is identical at Mobile, Tablet, Desktop and
  XL with SHA-256
  `0e6612b81fef543e6ebae9c7b5fa1fd5e38750b9b33dbf2cf757892b965ba098`.
- Fifteen final images cover the four paired viewports plus dark, forced
  colors, reduced motion, empty, target projection/focus and a 220px RTL host
  at 200% type. Eight paired baseline images preserve before evidence.
- Canonical Reviews CSS is `3,778 B` deterministic gzip against the unchanged
  `3,788 B` ceiling: `10 B` remain and the refinement recovers `3 B` from the
  `3,781 B` baseline.
- Neutral Web, Shopify and Webflow receive regenerated CSS; the three Reviews
  CSS files are byte-identical and the neutral component adds no runtime.

## Readiness Decision

Review Highlights is technically prepared for human review. It remains
`pilot`: visual approval, item mode, provider taxonomy/count policy, result
lifecycle, zero-count policy and component-specific Figma artwork are still
explicitly open.
