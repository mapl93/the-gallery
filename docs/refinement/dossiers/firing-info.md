# Component Dossier: Firing Schedule

Status: `human-review-ready`

Date: 2026-08-11

Registry: `R6` / internal migration slug `firing-info`

Dependency order: 131, phase 6 (Composed components), depth 1 through canonical Data Table

## Recommendation

Implement the owner-selected R6 as one specific controlled Firing Schedule, not
an arbitrary kiln-facts card. A required temperature-over-real-time ramp chart
and required canonical Data Table must derive from the same normalized planned
program. Optional controlled observations may show an actual curve and
segment-correlated summaries without becoming a connection to equipment.

Use one finite starting Celsius temperature and an ordered non-empty collection
of stable segments. Each segment supplies `segmentId`, positive Celsius/hour
rate or `full`, target Celsius temperature, and non-negative hold seconds. A
full-rate segment requires a reviewed estimated ramp duration; otherwise a
truthful real-time axis is impossible and the complete schedule fails closed.

Expose only the semantic decisions accepted in owner decision 60:
`startingTemperatureCelsius`, `segments`, optional `actualSamples`, optional
`actualSummaries`, controlled `view`, `displayUnit`, `actualStatus`, and optional
contextual `title`. Keep chart dimensions, tick count, plot margins, line width,
dash pattern, colors, scroll threshold, table density, and point rendering
private. Keep R6 `pilot` until explicit human review.

## Purpose And Limits

- Presents a technically reviewed firing program through synchronized visual
  and tabular views.
- Shows heating, holding, full-rate estimated ramps, and controlled cooling on
  a real accumulated-time axis.
- May present planned, actual, or both curves and truthfully label observed data
  as collecting or complete.
- Converts normalized Celsius values to Fahrenheit for presentation without
  changing source records or accepting a duplicate unit dataset.
- Gives each planned segment exactly one canonical Data Table row and may append
  correlated observed duration, reached temperature, and deviation.
- Does not enter proprietary controller programs or encode one manufacturer's
  segment-count/program-slot limits.
- Does not connect to a kiln, sensor, controller, network endpoint, database,
  poller, alerting service, or persistence layer.
- Does not validate material maturity, firing safety, equipment limits,
  schedule suitability, provenance, or technical approval.
- Does not animate sample-by-sample progress or create one keyboard focus stop
  per raw observation.
- Does not expose equal-width schematic segments, raw SVG coordinates, tick
  count, chart dimensions, line treatment, table columns, or responsive
  thresholds as public configuration.

## Accepted Source Facts

- The repository remains the design-system source of truth; Figma is evidence
  and a future target.
- Owner decision 60 supersedes ADR 0206's passive fact-list direction.
- Public identity is Firing Schedule with canonical selector
  `.firing-schedule`; `firing-info` slug and legacy name/root/title classes are
  temporary pre-v1 migration facts.
- Canonical Data Table already owns native table semantics, caption, focusable
  responsive overflow, focus presentation, and target mappings.
- One normalized Celsius/seconds program is authoritative for every planned
  point and row. Planned chart coordinates are derived, never independently
  supplied.
- Optional actual samples and summaries are controlled target data; the
  component never connects to equipment.
- No accepted source defines a production schedule repository, safety policy,
  sample cadence/limit, provenance format, Shopify record, print/export policy,
  or R6-specific Figma visual.

## Previous Candidate And Owner Correction

The Batch 115 candidate rendered optional title plus required arbitrary
`dl > div > dt + dd` facts with zero runtime. Its semantic integrity,
conditional landmark, wrapping, RTL, contrast, container response, and
Exhibit/Studio parity were sound for that different identity, but it could not
express the required schedule table, real-time chart, planned/actual comparison,
normalized units, collecting lifecycle, or full-rate exception.

Its preserved screenshots remain before evidence only. Owner decision 60 makes
the passive card's old performance and parity hashes inapplicable as final R6
evidence.

## Standards And Mature-System Evidence

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| [WAI complex images curriculum](https://www.w3.org/WAI/curricula/content-author-modules/images/) | Charts need a short identification plus equivalent detailed text or alternative data visualization. | Give the SVG a concise name/summary and retain the canonical Data Table as the detailed representation. |
| [WAI SVG image tips](https://www.w3.org/WAI/tutorials/images/tips/) | Inline SVG can use a `title` referenced by `aria-labelledby` to improve text-alternative support. | Explicitly associate non-empty SVG `title` and `desc`; do not rely on implicit browser mapping. |
| [WAI ACT named SVG rule](https://www.w3.org/WAI/standards-guidelines/act/rules/7d6734/) | An SVG with explicit `img` role must have a non-empty accessible name; support for `title`/`desc` alone is inconsistent. | Use `role="img"` plus explicit `aria-labelledby` to both title and description. |
| [SVG 2 structure](https://www.w3.org/TR/SVG/struct.html) | User agents expose selected `title` and `desc` through accessible name/description computation. | Keep one atomic informative SVG and provide complete localized title/description text. |
| [HTML tables](https://html.spec.whatwg.org/dev/tables.html) | Native table structure expresses row/column relationships. | Preserve canonical Data Table rather than an ARIA grid for passive schedule data. |
| [Open UI Table](https://open-ui.org/components/table/) | Static tables are not interactive widgets; their cells are not selectable/focusable. | Keep only the overflow owner focusable; segment cells and raw samples are not focus targets. |
| [Shopify Polaris Table](https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/table) | Polaris provides structured rows/columns and responsive list/table presentation. | A future Shopify adapter can map verified rows to native target Table while the chart remains a separate target-native visualization. |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) | Radix concentrates on common interactive ARIA patterns and provides no canonical chart/data-table primitive. | Do not import a stateful primitive or duplicate behavior; use native SVG plus canonical Gallery Data Table. |

Consensus supports native table relationships, an accessible chart summary,
non-color series differentiation, and keeping raw samples out of focus order.
No standard or mature-system reference defines a ceramics firing schema,
controller contract, safe schedule, sample cadence, or target visual language.

## Anatomy And Composition

| Part | Required | Semantic form | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes for valid program | named `section` with title or generic `div` | R6/target | `.firing-schedule`; migration root alias is temporary. |
| Header/title | no | contextual heading | target | Non-empty title names a section; rank follows document context. |
| Summary | yes | visible paragraph | R6/model | Start, planned duration and actual lifecycle. |
| Chart | yes | native `figure` | R6 | Never optional or independently sourced. |
| Chart scroll | yes | named focusable overflow owner | R6 | Preserves legible axes at narrow widths. |
| Plot | yes | `svg[role=img]` + `title` + `desc` | R6/target | Atomic graphic; localized summary. |
| Legend | yes | native list | R6 | Text plus dashed/solid treatment; no color-only meaning. |
| Caption | yes | visible `figcaption` | R6/model | Concise summary, not every raw sample. |
| Table wrapper/root | yes | canonical Data Table | dependency | Caption and native scope relationships. |
| Segment row | repeated | one `tr` per planned segment | R6/model | Stable `segmentId`; raw samples never rows. |
| Actual summary columns | conditional | `td` in matching planned row | target/R6 | Only with actual view and correlated summary. |

## State, Variant, Size And Mode Matrix

| Dimension | Accepted behavior |
| --- | --- |
| Planned only | Required derived planned curve and planned table columns. |
| Actual | Available only with valid observations; table still identifies the planned segments and may append actual summaries. |
| Both | Planned dashed and actual solid curves, both named in visible legend. |
| Unset view | `both` when actual exists; otherwise `planned`. |
| Actual unavailable | Requested `actual`/`both` resolves safely to `planned`; no empty legend/curve. |
| Collecting | Partial observed series labelled collecting; no per-sample announcement. |
| Complete | Supplied observed series labelled complete. |
| Celsius | Normalized source presentation and default. |
| Fahrenheit | Complete conversion of table, axes, summary, legend, and deviations from normalized source. |
| Full-rate | Requires positive estimated ramp duration and visible estimated label. |
| Controlled cooling | Positive rate magnitude plus lower target creates negative chart slope. |
| Invalid program | Duplicate/missing id, invalid rate/target/hold, missing full-rate estimate, or empty segments omits complete root. |
| Invalid observations | Actual series becomes unavailable; valid planned schedule remains. |
| Narrow | Chart and table keep readable internal measures within named horizontal scroll owners; document does not overflow. |
| Wide | Scroll owners fit naturally without changing program semantics. |
| Long/localized/RTL | Text wraps; numeric/bidirectional values remain coherent; table scroll preserves columns. |
| Dark/forced colors | Axes, boundaries, series, legend, table, and focus remain perceivable. |
| Reduced motion | No curve or sample animation; controlled updates replace data without transition. |

## Public API And Controlled Ownership

| Property | Type | Requirement | Meaning |
| --- | --- | --- | --- |
| `title` | string | optional | Contextual heading; non-empty value selects named-section semantics. |
| `startingTemperatureCelsius` | number | required | Finite normalized planned start. |
| `segments` | structured slot | required non-empty | Stable program records with rate/full estimate, target °C, and hold seconds. |
| `actualSamples` | structured slot | optional | Strictly increasing controlled elapsed-second/°C observations. |
| `actualSummaries` | structured slot | optional | Reviewed duration/reached/deviation records correlated by `segmentId`. |
| `view` | enum | optional controlled | `planned | actual | both`; default derives from actual availability. |
| `displayUnit` | enum | optional | `celsius | fahrenheit`; default Celsius. |
| `actualStatus` | enum | optional | `collecting | complete`; ignored without observations. |

The target owns source replacement, provenance, localization, cadence, storage,
and any external run-status announcement. The component owns deterministic
projection and safe view fallback. There is no uncontrolled equipment/session
store, network request, timer, observer, polling loop, or sample animation.

## Tokens, CSS And Private Geometry

Public customization uses existing primary/secondary surfaces, primary/
secondary/accent text, subtle/focus boundaries, h4/body-small/caption type,
medium/large radii, and element spacing. Canonical Data Table retains its own
public tokens.

Chart minimum readable width, plot inset, viewBox, tick count, grid thickness,
line width, dash pattern, legend sample length, and table minimum measure are
private. CSS uses logical properties, bounded overflow, focus-visible outlines,
non-scaling strokes, tabular numerals, full wrapping, and forced-color
overrides. It contains no transition or animation.

## Cross-Target Translation

| Target | Direction |
| --- | --- |
| Neutral Web | `components/js/firing-schedule.js` derives the normalized model; native SVG and canonical Data Table render the result with canonical CSS. |
| Shopify | Planned until approved schedule/observation records, validation, provenance, safety/editor rules, sample limits, localization, and first consumer exist. |
| Webflow | Target code maps verified structured records to the neutral model; a collection of formatted CMS strings cannot generate the chart truthfully. |
| React/Angular | Thin renderer consumes the neutral model and controlled props; it must not create a second planned series or equipment connection. |
| Figma | Future component covers view/unit/lifecycle, chart/table anatomy, narrow scroll, extremes, themes, forced colors, print, and legacy removal. |
| SwiftUI/Compose/future | Platform-native chart and table/list share one normalized model; controller or telemetry transport remains outside the component. |

## Evidence And Validation Result

- Batch 115 preserves the superseded passive-card screenshots as before
  evidence; Batch 164 records the final chart-and-table implementation.
- Exhibit and Studio use the same `FiringScheduleArtwork` and fixture. Eight
  paired natural captures contain the same four rows, eight both-mode columns,
  two curves and two named scroll focus owners with no root or document
  overflow.
- Normalized same-host evidence produces equal DOM hash `16c77db5` and style
  hash `3b242ce7` at a `760px` root.
- Planned, actual, both, auto fallback, collecting, complete, Celsius,
  Fahrenheit, missing actual summaries and unavailable actual observations pass.
  Required segments remain a disabled required Studio slot; the neutral model
  separately rejects empty programs and full-rate segments without estimates.
- The chart exposes explicit SVG name and description, visible caption and
  text/line-style legend. The canonical table preserves caption and scoped row/
  column headers. Seven raw observations produce neither rows nor focus stops.
- Light text contrast is at least `7.17:1`; dark text contrast is at least
  `10.21:1`. Planned/actual line contrast is `17.93:1`/`3.56:1` in light and
  `17.18:1`/`7.92:1` in dark. Forced colors preserves unfilled dashed/solid
  curves, a thicker actual curve, boundaries and a visible focus outline.
- Direct `240/390/720px` roots, long RTL, localized Fahrenheit, effective 200%
  text, user spacing and print preserve the complete component through its two
  intentional internal scroll owners with zero root/document overflow.
- Reduced motion finds zero active motion. Browser console and page errors are
  empty.
- Webflow and Shopify Ceramics CSS and the neutral Web model are source-
  identical projections. Contract, Studio, TypeScript and both adapter
  validators pass without rebuilding `site/dist`.
- R6 CSS is `4,663 B` raw / `1,162 B` gzip. Ceramics CSS is `5,345 B` gzip
  against the fixed `5,427 B` ceiling, leaving `82 B`. The `1,610 B` gzip
  neutral model has no listeners, timers, observers, network or equipment
  connection. Global Web CSS/runtime gaps remain previously documented.
- One headless Chromium session, one tab and one pre-existing user-owned server
  were used sequentially. The session closed, the server was preserved and the
  resource-cleanliness gate passed.

## Risks And Open Questions

1. Which production service owns reviewed normalized programs, applicability,
   versions, provenance, localization, audit, and invalidation?
2. Which maximum segment/sample counts and controlled update cadence are safe
   for Web, Shopify, Webflow, mobile, and future native targets?
3. Which technical/safety reviewers approve schedules and explanatory content,
   and which warnings or equipment instructions must compose separately?
4. May a target interpolate or summarize raw observations, and which source
   defines actual segment boundaries and deviations?
5. What are the first Shopify record shape, editor validation, preview states,
   product/material/batch relationships, permissions, and migrations?
6. Are export, print, offline snapshots, timezone/run timestamps, and audit
   provenance part of a future target recipe rather than R6?
7. When will the internal `firing-info` slug and legacy root/title selectors be
   removed before the public contract freezes?
8. Does explicit human review approve the current chart/table hierarchy,
   scroll strategy, line treatment, summary density, and extreme modes, or is
   R6-specific design evidence required first?

Owner decision 60 and Batch 164 resolve the semantic, implementation and
evidence direction. R6 is ready for explicit human review while production
schema, safety, target and visual gates above remain visible. It stays `pilot`
and cannot become `stable` without that review.
