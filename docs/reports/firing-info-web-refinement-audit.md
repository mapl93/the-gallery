# Firing Schedule Web Refinement Audit

Date: 2026-08-11

Batch: 164

Component: R6 `firing-info` (public identity: Firing Schedule)

Status: ready for explicit human review; remains `pilot`

## Outcome

Owner decision 60 replaces the passive Kiln / Firing Info fact card with one
specific informative Firing Schedule. A normalized Celsius/seconds program now
derives both a required real-time temperature ramp chart and the required
canonical Data Table. Optional controlled observations add an actual curve and
segment-correlated summaries without giving R6 equipment, persistence, polling,
alarm or safety authority.

The implementation passes its current Web, shared-renderer, accessibility,
responsive, content-stress, target-projection, performance and resource-
cleanliness gates. Exhibit and Studio use one renderer and fixture. The contract
stays `pilot`; production schedule records, safety review, first native target
consumers, final visual approval and explicit human stability review remain
open.

## Certification Summary

| Area | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Informative schedule projection only; no programming, equipment connection, recommendation, validation or alarm behavior. |
| Anatomy and composition | pass | Conditional named root, visible summary, informative SVG figure, legend/caption and canonical Data Table. |
| Source coherence | pass | One normalized starting temperature plus ordered segments derives planned points, durations, axes and rows. |
| States and modes | pass | Auto/planned/actual/both, collecting/complete, Celsius/Fahrenheit, missing summaries and actual-unavailable fallback. |
| Accessibility | pass | Explicit SVG name/description, visible caption, non-color series treatment, native table relationships and exactly two named overflow focus owners. |
| Responsive/content resilience | pass | Four paired viewports plus `240/390/720px`, RTL/long, localized, 200%, spacing and print with no root/document overflow. |
| Contrast and motion | pass | AA text and non-text line contrast; forced-color differentiation; zero active reduced-motion parts. |
| Exhibit/Studio parity | pass | Same renderer/fixture and exact normalized DOM/style hashes. |
| Targets | Web implemented; native consumers bounded | Web, Webflow and Shopify CSS projections validate; Web model is source-identical. |
| Performance | pass for R6/Ceramics | R6 CSS `1,162 B` gzip; Ceramics `5,345/5,427 B`; neutral model `1,610 B` gzip. |
| Human review | required | Production schema/safety/target/visual gates remain explicit; no `stable` promotion. |

## Purpose, API And Ownership

R6 accepts a technically reviewed planned source:

| Property | Requirement | Meaning |
| --- | --- | --- |
| `title` | optional | Contextual heading; non-empty value creates a named section. |
| `startingTemperatureCelsius` | required finite number | Normalized program start. |
| `segments` | required non-empty ordered records | Stable id, label, target Celsius, non-negative hold and positive rate or `full` plus estimate. |
| `actualSamples` | optional controlled records | Strictly increasing elapsed seconds plus Celsius temperature. |
| `actualSummaries` | optional controlled records | Duration, reached temperature and deviation correlated by segment id. |
| `view` | optional enum | `planned`, `actual` or `both`; default follows actual availability. |
| `displayUnit` | optional enum | `celsius` or `fahrenheit`; all values derive from the normalized source. |
| `actualStatus` | optional enum | `collecting` or `complete`; meaningful only with observations. |

The neutral model validates the complete planned program. Empty segments,
duplicate/blank ids, invalid finite values and `full` ramps without a positive
estimated duration fail closed. It derives ramp/hold boundaries, accumulated
seconds, planned points and per-segment durations. A controlled-cooling target
below the prior temperature naturally produces a negative slope. No second
planned curve can drift from the table.

Invalid or out-of-order observations become unavailable while the valid planned
schedule remains. A requested actual/both view therefore falls back to planned.
Missing actual summaries never invent values from raw samples; the corresponding
table cells remain visibly unavailable.

The target owns records, provenance, revisions, applicability, technical and
safety approval, source replacement, localization, update cadence, persistence,
alerts and any equipment transport. R6 owns only deterministic projection and
safe view fallback.

## Anatomy And Dependency Composition

The titled fixture renders one native `SECTION` named by its visible heading.
It contains:

1. A visible summary with starting temperature, planned duration and observed
   lifecycle.
2. One `FIGURE` with a named focusable horizontal chart scroll owner.
3. One informative `SVG[role="img"]` explicitly labelled by non-empty `title`
   and `desc` elements.
4. A visible native legend and `figcaption` that identify planned/actual series,
   elapsed range, maximum temperature, lifecycle and largest deviation.
5. One canonical `DataTableArtwork`, with its own native caption, `scope=col`,
   `scope=row` and named focusable horizontal overflow owner.

The verified fixture has four planned segment rows and eight columns in both
mode. Seven raw observations draw one actual path but create no table rows or
focus stops. Only the chart and table overflow owners are focusable. There are
no component live regions or embedded scripts.

The planned series is dashed; the actual series is solid and color-accented.
Meaning therefore survives monochrome and forced colors. Chart dimensions,
ticks, insets, line widths, dash pattern, minimum readable measures and table
density remain private composition details rather than public API.

## Standards And External Evidence

[WAI guidance for complex images](https://www.w3.org/WAI/curricula/content-author-modules/images/)
supports concise identification plus an equivalent detailed text or data
representation. [WAI SVG guidance](https://www.w3.org/WAI/tutorials/images/tips/)
and the [ACT named-SVG rule](https://www.w3.org/WAI/standards-guidelines/act/rules/7d6734/)
support an explicitly named informative SVG; [SVG 2](https://www.w3.org/TR/SVG/struct.html)
defines `title`/`desc` structural accessibility behavior. R6 therefore uses one
explicit image name/description while retaining the canonical table as the
primary detailed representation.

[Open UI Table](https://open-ui.org/components/table/) treats a passive table as
structured content rather than a selectable widget, and the
[Polaris Table](https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/table)
maintains row/column structure for target-native data presentation. The Gallery
keeps native table relationships and makes only the overflow owner focusable.
[Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)
does not supply a chart or passive-table state model that should replace this
native composition.

These references support accessibility and composition; none defines a safe
ceramics schedule schema, controller semantics, sample cadence or visual
identity. Those remain owner/target decisions.

## State And Functional Evidence

The Studio control surface exposes Auto, Planned, Actual and Both; Celsius and
Fahrenheit; Collecting and Complete; optional actual samples/summaries; and a
required disabled segments slot. Verified projections include:

- planned mode: one planned path and five planned-only columns;
- actual mode: one actual path with the correlated actual columns;
- both mode: two paths and eight columns;
- no actual samples: planned fallback, no observed status and no stale actual
  controls;
- no summaries: actual columns remain with visible not-available dashes;
- collecting: legend and summary say collecting without per-sample live output;
- Fahrenheit: the first row converts `100 °C/h` to `180 °F/h`, `200 °C` to
  `392 °F`, and `-2 °C` deviation to `-4 °F` without adding the temperature
  offset to the delta.

The neutral model test verifies `4,200` planned seconds and three planned points
for a one-ramp/hold fixture, rejects empty segments and missing full-rate
estimates, converts `100 °C` to `212 °F`, converts `100 °C/h` to `180 °F/h`, and
falls back to planned when actual data is unavailable.

## Accessibility, Contrast And Special Modes

The SVG exposes an explicit name and description through `aria-labelledby`.
Its visible caption communicates the same high-level result. The table exposes
native caption and header relationships, so screen-reader users do not need to
interpret coordinates or traverse raw points.

Measured contrast:

| Mode | Title | Summary | Table text | Planned line | Actual line |
| --- | ---: | ---: | ---: | ---: | ---: |
| Light | `16.44:1` | `7.17:1` | `16.44:1` | `17.93:1` | `3.56:1` |
| Dark | `14.50:1` | `10.21:1` | `14.50:1` | `17.18:1` | `7.92:1` |

Forced colors preserves visible root/chart/table boundaries, a `2px` focus
outline, dashed versus solid series and a thicker actual stroke. Both path fills
remain `none`; this was visually verified after correcting the former forced-
color area-fill defect. Reduced motion has zero active animation or transition
parts.

## Responsive And Extreme Content

Eight natural captures cover paired Exhibit and Studio at Mobile, Tablet,
Desktop and XL. Every fixture contains four rows, eight both-mode columns, two
curves and two named scroll owners. Root and document overflow remain zero.

Direct component widths prove the intrinsic behavior:

| Root | Chart internal overflow | Table internal overflow | Root/document overflow |
| ---: | ---: | ---: | ---: |
| `240px` | `434px` | `854px` | `0 / 0` |
| `390px` | `284px` | `704px` | `0 / 0` |
| `720px` | `0px` | `374px` | `0 / 0` |

The chart fits naturally once enough component space exists. The wider table
keeps numeric values intact inside its named horizontal scroll owner. Long RTL
copy, localized Fahrenheit, effective 200% text, user text spacing and print
retain four complete rows and eight columns without leaking overflow to the
root or document.

## Exhibit And Studio Parity

Both modes import `FiringScheduleArtwork` and `buildFiringScheduleFixture`.
With the same `760px` host and tokens, normalized evidence produces:

- DOM hash `16c77db5` in Exhibit and Studio;
- style hash `3b242ce7` in Exhibit and Studio;
- four rows, equal chart/table geometry and zero root overflow.

The internal `FiringInfoArtwork` file is only a pre-v1 re-export alias; it does
not contain a second implementation. The static parity auditor additionally
verifies one registered renderer/fixture path.

## Tokens, CSS, Runtime And Performance

Public customization reuses existing surface, text, accent, boundary, focus,
typography, radius and spacing tokens. The component-private contract owns
chart geometry, series treatment, scroll thresholds and table measure.
Canonical CSS uses logical properties, non-scaling SVG strokes, tabular
numerals, bounded overflow, focus-visible outlines and forced-color rules.

| Surface | Raw | Gzip level 9 | Result |
| --- | ---: | ---: | --- |
| R6 CSS slice | `4,663 B` | `1,162 B` | component evidence |
| Ceramics CSS | `36,881 B` | `5,345 B` | pass; `82 B` below `5,427 B` ceiling |
| Neutral Firing Schedule model | `5,930 B` | `1,610 B` | bounded pure helper |
| Neutral Web component CSS | `540,123 B` | `72,660 B` | pre-existing documented global gap |
| Shared enhancement runtime | `117,741 B` | `22,807 B` | pre-existing documented global gap; R6 adds no code |

The model has no DOM dependency, listeners, observers, timers, animation,
network request, persistence or equipment connection. It is copied source-
identically only to the neutral Web target. React remains a docs-site renderer,
not part of the base implementation.

## Cross-Target Translation

| Target | Result / boundary |
| --- | --- |
| Neutral Web | Pure model plus native SVG and canonical Data Table renderer implemented. |
| Shopify | CSS projection validates; Liquid/schema waits for approved records, validation, safety/editor rules, sample bounds and first consumer. |
| Webflow | CSS is source-identical; target code must map verified structured records, not arbitrary formatted CMS facts. |
| React/Angular | Thin controlled renderer over the neutral model; no parallel planned dataset or equipment state. |
| Figma | Future target models view/unit/lifecycle, chart/table anatomy and special modes; generic existing nodes are not approval evidence. |
| SwiftUI/Compose/future | Native chart and table/list share the same normalized program while telemetry/controller transport remains outside R6. |

## Automated And Browser Verification

Focused gates passed:

- `npm run validate:contracts` (`183` contracts);
- `npm run validate:studio` (`183` definitions, `1,030` semantic properties,
  `1,658` public token references);
- docs-site TypeScript type-check;
- `npm run validate:adapter:web` (`183` components, `19` CSS sources);
- `npm run validate:adapter:shopify` (`183` components, known maturity warnings
  only);
- source-identical Webflow/Shopify Ceramics CSS and neutral Web model;
- pure neutral-model assertions;
- performance audit with seven documented and zero undocumented gaps;
- one-session browser structure, state, responsive, stress, contrast,
  forced-color, reduced-motion and exact-parity probes;
- `npm run evidence:cleanup` and `npm run evidence:assert-clean`.

Browser evidence lives under `output/playwright/refinement-batch-164/`; the
superseded visual is preserved under Batch 115. One headless Chromium session,
one tab and a pre-existing user-owned server were used sequentially. The
session closed, the server remained untouched and the cleanup gate passed. No
command rebuilt `site/dist`.

## Remaining Risks And Human Gates

1. Approve the production program/observation record owner, schema, versions,
   provenance, applicability, invalidation and localization.
2. Approve maximum segment/sample counts, update cadence, interpolation and
   actual-segment correlation rules per target.
3. Establish technical and safety review, warnings and equipment-specific
   instructions outside this informative component.
4. Define the first Shopify consumer, records, editor validation, permissions,
   preview states, relationships and migrations.
5. Decide whether print/export, offline snapshots, timestamps and audit history
   are future target recipes.
6. Remove the internal `firing-info` slug and legacy aliases before the public
   v1 contract freezes.
7. Review and approve the current chart/table hierarchy, scroll strategy, line
   treatment, summary density, color/tokens and special-mode visuals.
8. Provide explicit human stability approval. Until then, R6 remains `pilot`.
