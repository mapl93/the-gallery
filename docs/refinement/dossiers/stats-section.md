# Component Dossier: Stats Counter

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation

Contract: `components/contracts/stats-section.contract.json`

## Recommendation

Keep Stats Counter as a passive, container-responsive context section that
arranges one required unordered set of canonical Stat instances beneath an
optional visible title. S11 should own only the conditional section landmark,
neutral section rhythm, title, list reset, and repeated-item layout. Canonical
Stat remains the sole owner of value, label, optional comparison, direction,
typography, number features, and metric-internal spacing.

Render a native `section` named by a non-empty visible title; otherwise render a
generic `div`. Render metrics as `ul > li` because their authored order does not
change their meaning, and apply `.stat-group`, `.stat`, `.stat__value`, and
`.stat__label` to consume the canonical dependency. Omit the complete component
when the required metric composition is absent. Do not preserve the current
`data-animate` hook: it has no JavaScript implementation, exposes no complete
count-up contract, and misleadingly implies behavior that neither the neutral
source nor an adapter owns.

Targets supply already formatted value and label strings, ordering, freshness,
comparison context, loading/error/empty policy, and any update announcement.
Static metrics are not live regions. A target that refreshes a value may choose
an appropriate polite announcement based on user relevance, but must not
announce every intermediate animation frame or make count-up a section default.

No alignment, column count, count-up duration, breakpoint, numerical value,
formatter, polling interval, live mode, or metric typography property belongs
on S11. Human review must approve the final title-to-grid rhythm, maximum
measure, responsive track balance, centered hierarchy, and metric density before
stability promotion.

## Purpose And Limits

- Summarizes a small, comparable set of factual metrics in a page section.
- Supports institutional facts, cumulative outcomes, service scale, collection
  totals, milestones, and similarly concise target-owned facts.
- Gives each metric a visible value and label, with any unit or scope needed to
  understand it without relying on color or animation.
- Does not become a dashboard, chart, table, KPI target, progress indicator,
  meter, ticker, leaderboard, analytics client, number formatter, data-fetching
  surface, or generic Stat replacement.
- Does not calculate, validate, poll, sort, aggregate, animate, or announce data.
- Does not infer that mathematical movement is positive or negative for the
  business; optional comparison remains canonical Stat and target content.
- Data source, freshness, localization, unit, precision, comparison period,
  loading, empty, error, retry, and live-update policy are target-owned.

## Current Gallery Baseline

- Registry identity `S11`, category `sections`, selector `.stats-section`, no
  dependency, dependency depth `0`, and review order `171`.
- Contract `0.2.0`, `pilot`: root/title/grid/item/number/label anatomy; optional
  `title`, required `metrics`; target data ownership plus an incomplete
  `.stats-section__number[data-animate]` behavior hook; Web CSS implemented and
  Shopify planned.
- CSS duplicates the canonical Stat value/label presentation, uses physical
  section padding, hardcodes `140/32/24/4px` and `1.2s`, contains an empty item
  rule, uses incomplete typography declarations, and transitions `all`.
- The CSS comment claims JavaScript animates values from zero, but the shared
  runtime contains no Stats Counter implementation or call site.
- The docs preview uses `div[role=list] > div[role=listitem]`; Studio uses plain
  `div` elements with no list semantics. Neither renderer composes `.stat`.
- Studio always renders an unnamed native `section`, leaves the title without an
  id, and can leave a presentational shell when required metrics are disabled.
- Exhibit and Studio already resolve the same `SectionsStudio` renderer and
  fixture. Their baseline normalized roots are exactly equal at `575` characters
  with FNV-1a `c68cc210`, but they share the same incomplete DOM.
- Baseline DOM contains one `SECTION`, no `aria-labelledby`, a `DIV` grid, three
  `DIV` items, no list roles, no `.stat` roots, no animation hooks, and no
  focusable descendants.
- Direct roots remain within their assigned width, but the physical inset leaves
  only a `124.8px` grid box inside a `200px` root while declaring a `140px`
  minimum track. At `320px` the grid is one column; at `520px` it becomes two;
  at `900/1120px` it renders three populated tracks plus empty auto-fit tracks.
- Before evidence is under
  `output/playwright/batch70-stats-section/before/` for Exhibit/Studio at Mobile,
  Tablet, Desktop, and XL, plus direct-root evidence.
- Deterministic level-9 baseline gzip is Sections `6,859 B`, generated neutral
  Web component CSS `67,140 B`, and shared runtime `10,501 B`. Sections has a
  permanent `6,861 B` ceiling and only `2 B` headroom; S11 runtime budget is
  exactly `0 B`.
- The Studio design reference is incorrect: frame `943:7` is titled “Button” and
  inspector `1020:480` exposes Button label, icon, type, size, state, padding,
  gap, height, radius, and fill controls. It is not S11 aesthetic evidence.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML section](https://html.spec.whatwg.org/dev/sections.html#the-section-element) | `section` represents a thematic grouping, typically with a heading, and is not a generic styling wrapper. | Use a named section only when title is present; otherwise use a generic `div`. |
| [HTML unordered list](https://html.spec.whatwg.org/dev/grouping-content.html#the-ul-element) | `ul` represents list items whose order is not materially meaningful; its items are native `li` children. | Repeated comparable metrics use `ul > li` rather than ARIA-emulated lists or unrelated divs. |
| [WAI-ARIA `aria-live`](https://www.w3.org/TR/wai-aria-1.2/#aria-live) | Live-region updates are `off` by default; `polite` is announced at a graceful opportunity and `assertive` is reserved for imperative interruption. | Static metrics receive no live region. Targets opt into update announcements only when genuinely useful. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) | The cross-system inventory catalogs lists and interactive controls but defines no interoperable Stats Counter widget. | Treat S11 as semantic content composition, not a new platform widget/state model. |
| [Radix Primitives inventory](https://www.radix-ui.com/primitives/docs/overview/introduction) | Radix focuses on shared interactive patterns and lists no Stat/Stats primitive. | There is no headless interaction runtime to reproduce; native semantics and canonical Gallery composition are sufficient. |
| [Polaris data visualization guidance](https://polaris-react.shopify.com/design/data-visualizations#display-metrics) | A display metric is a single quantified value; units belong close to the number, scope should identify the timeline, and comparison may be supplied when useful. | Require concise contextual labels and target-formatted values; optional comparison remains child Stat, not S11 calculation. |
| [Shopify section/block objects](https://shopify.dev/docs/api/liquid/objects/section) | Sections expose target-owned blocks; block settings and editor attributes belong to each repeated block. | Shopify maps each metric record to one editor block with `block.shopify_attributes`. |

APG defines range and interactive patterns such as Meter and Progressbar, not a
passive repeated-metric section. S11 therefore requires no widget role, focus,
keyboard model, or controlled/uncontrolled state.

## Anatomy And Canonical Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | titled `section.stats-section`; otherwise `div.stats-section` | Stats Counter / target | Titled root is named by its visible heading. |
| Inner | yes | `.stats-section__inner` | Stats Counter | Owns maximum measure and container-safe inline inset. |
| Title | no | contextual heading `.stats-section__title` | Stats Counter / target | Target-unique id names the titled section. |
| Grid | yes | `ul.stats-section__grid.stat-group` | Stats Counter + Stat Group | Native unordered metric list; layout order equals source order. |
| Item | yes, repeated | `li.stats-section__item.stat` | target + Stat | Parent owns repeated placement; Stat owns metric anatomy. |
| Value | yes per item | `.stat__value` | Stat / target | Already formatted string including needed sign/unit. |
| Label | yes per item | `.stat__label` | Stat / target | Concise visible context paired with the value. |
| Change | no per item | `.stat__change[data-direction]` | Stat / target | Optional canonical comparison; not an S11 property. |

## Variant, State, Mode, And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Presentation | One intrinsic title-plus-list layout; no S11 variant modifier. |
| Titled | Native named section with visible heading. |
| Untitled | Generic div; the list remains natively exposed. |
| Metrics present | One or more complete canonical Stat items. |
| Metrics absent or invalid | Omit the complete component; do not render an empty shell/list. |
| Value/label/change/direction | Inherited from canonical Stat; S11 does not mirror child state. |
| Static | Default and only neutral behavior; no live region or animation. |
| Updating target | Target atomically replaces formatted content and separately chooses announcement policy. |
| Loading/empty/error/stale | Target-owned composition; never inferred from zero or an empty string. |
| Controlled/uncontrolled | Not applicable to S11; framework targets own data sources and child rendering. |
| Theme/forced colors | Semantic tokens inherited through title and canonical Stat. |
| Reduced motion | S11 authors no motion; no count-up hook exists. |
| RTL | Logical spacing and source order; target-formatted strings retain locale direction. |
| Responsive | Component-container width, not viewport or Studio-only overrides. |

Unsupported combinations include an unnamed native section, ARIA-emulated list,
incomplete metric, duplicated `.stats-section__number`/`__label` visuals,
`data-animate`, automatic polling, per-frame announcements, numerical parsing,
S11-owned comparison direction, hidden essential units, color-only meaning,
visual/source-order divergence, or a viewport-only breakpoint.

## Public API And Ownership

- `title` — optional trimmed visible string; when present it creates and names a
  thematic section. Target chooses contextual heading rank and unique id.
- `metrics` — required target-owned list composition. Every record supplies a
  complete canonical Stat with required formatted value and label; optional
  comparison remains Stat API.
- S11 exposes no raw number, formatter, locale, currency, unit, precision,
  notation, sign, label style, direction, sentiment, count-up, duration, delay,
  easing, viewport trigger, polling, loading, error, stale, announcement,
  alignment, column count, breakpoint, minimum width, or child type property.
- S11 has no events and no controlled/uncontrolled strategy. Targets own data and
  update lifecycle; Stat owns its passive presentation contract.

## Token And Value Direction

- S11-owned public tokens cover title color/type and section/title-grid spacing.
  Canonical Stat public tokens remain declared and configured on the dependency,
  not re-exported as parallel S11 controls.
- Use existing `--space-layout-section-gap`, `--space-layout-grid-gap`,
  `--space-layout-element-gap`, `--color-text-primary`, heading family/weight,
  and H2 size/line-height tokens.
- Root maximum measure, container-relative inset, responsive track minimum,
  centered alignment, list reset zeroes, and intrinsic auto-fit behavior remain
  private composition details.
- Remove `--easing-default`, H1/body metric tokens, and duplicated metric colors
  from S11 because they belong to Stat or the deleted false animation hook.
- Do not expose Stat OpenType switches, internal gap, value weight, comparison
  direction, or group minimum through Stats Counter.

## Responsive And Performance

- Test direct roots at `200`, `320`, `520`, `900`, and `1120px`, plus docs
  Mobile, Tablet, Desktop, and XL.
- Require `scrollWidth === clientWidth`, non-zero list tracks, complete value/
  label wrapping, stable source/read order, and no viewport or Studio-owned S11
  layout rule.
- Test one, two, three, many, long, localized, empty, and extreme metric records.
- Neutral S11 runtime budget is exactly `0 B`: no listener, observer, request,
  timer, layout read, number parser, custom element, hydration, or asset.
- Shopify uses Liquid blocks and canonical CSS with zero S11 JavaScript.
- Sections remains capped at `6,861 B` deterministic gzip. S11 must recover
  family space by deleting duplicated metric and animation CSS rather than
  raising the ceiling.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Conditional section/div, native list, canonical Stat classes, target-formatted strings, zero runtime. | Implemented, generated, validated, and browser-evidenced. |
| Shopify | Addable localized section; optional title; repeated metric blocks with value/label and editor attributes; no script. | Implemented and target-ready; official validation passes. |
| Webflow | Canonical CSS plus native list markup and target-owned content/data. | CSS copy regenerated and source-identical; target markup/data remain native. |
| React / Angular | Thin context wrapper mapping records to canonical Stat children; target data lifecycle. | Planned. |
| Figma | Optional title plus repeated canonical Stat instances and responsive examples; no animation prototype implied. | Planned; current trace points to Button and must be replaced by owner evidence. |
| SwiftUI / Compose | Native collection/group with localized formatted text and platform accessibility grouping. | Planned. |

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| S11 duplicates canonical Stat markup and presentation. | high | Add dependency `stat`; compose its root/value/label and remove duplicate child CSS. | accepted architecture / implementation |
| Studio emits an unnamed section and no native list. | high | Conditional section/div plus `aria-labelledby` and `ul > li`. | standards / implementation |
| Required metrics can be disabled while the shell persists. | medium | Omit the complete component when required composition is missing. | implementation |
| `data-animate` promises absent behavior and transitions `all`. | high | Delete the hook, comment, token, and reduced-motion exception. | standards / implementation |
| Physical padding constrains narrow roots and declared track minimum. | medium | Move inline inset to a container-relative inner wrapper and use capped intrinsic tracks. | implementation |
| S11 re-exposes child metric typography/colors in Studio. | medium | Limit S11 controls to title/section decisions; keep Stat appearance dependency-owned. | accepted architecture / implementation |
| Shopify has CSS only and no metric data mapping. | high | Add localized Liquid section with metric blocks and editor attributes. | target adapter |
| Figma traceability resolves to Button rather than S11. | review risk | Do not infer aesthetic direction; request a corrected owner node for final visual review. | owner |

## Open Questions And Human Review

- Owner evidence is still required for S11-specific Figma traceability and final
  visual comparison; the current Button frame is invalid evidence.
- Human review should explicitly approve title hierarchy, title-to-list spacing,
  maximum measure, track minimum, density at 1/2/3/many metrics, value/label
  alignment, and long localized content before `stable`.
- Whether a future product needs animated count-up is a separate behavior and
  accessibility decision. It must not be inferred from this passive v1 contract.
- Component remains `pilot`; automated readiness is not stability promotion.

## Final Implementation And Evidence

- Registry and contract now declare canonical `stat` dependency; contract
  `0.3.0` retains `pilot` and limits S11 API to optional `title` plus required
  `metrics` composition.
- `StatArtwork` is the one reusable canonical site renderer for Stat anatomy.
  Stats Counter and the standalone Stat surface consume it, while
  `SectionsStudio` remains the exact shared Exhibit/Studio renderer and fixture.
- Titled output is `section[aria-labelledby]`; clearing the real Studio Title
  control produces a titleless `div` with the native list intact. Required
  metrics cannot be disabled in Studio, and target adapters omit incomplete
  compositions.
- Final DOM is `section > .stats-section__inner > h2 + ul > li.stat`; three
  metrics yield three values and three labels, with zero live regions, focusable
  descendants, animation hooks, timers, observers, requests, or S11 assets.
- Exhibit and Studio normalize to exactly `1,194` characters and FNV-1a
  `bd10f6ad`. At a controlled `420px` root both measure `420x321px`, with a
  `356px` inner, `32px` block padding, two `170px` tracks, and `16px` gap.
- Direct `200/320/520/900/1120px` roots retain equal assigned/scroll widths.
  Their inner measures are `136/256/456/810/960px`; block spacing is capped at
  `32/32/36.4/63/64px` and remains component-container-owned.
- Seven records remain contained at `320px` and `1120px`; long Arabic RTL,
  effective 200% typography, optional-title omission, light/dark themes and
  forced colors all remain within the root.
- Light primary/secondary contrast is `17.93:1` / `7.81:1`; dark is
  `17.18:1` / `12.09:1`. Forced colors resolves all essential text to system
  `CanvasText`; S11 authors no motion under either preference.
- Final console reports zero errors and zero warnings. Before/after and stress
  evidence lives under `output/playwright/batch70-stats-section/`.
- Sections CSS falls from `6,859 B` to `6,788 B` deterministic gzip, leaving
  `73 B` below its permanent `6,861 B` ceiling. Generated Web component CSS
  falls from `67,140 B` to `67,047 B`; shared runtime remains `10,501 B`, so S11
  contributes exactly `0 B` runtime.
- Canonical, Shopify, and Webflow Sections CSS are SHA-256-identical at
  `feca9d9717674ad2b93e6df3c869154ad4c2501865ace042c69b4d1312d0e6b4`.
- Shopify is `implemented`, `ready: true`, with Liquid, schema, data, behavior,
  template composition and editor-preview layers ready. Official validation
  passes all four files for artifact `stats-section-s11-batch70`, revision 3.
- The supplied Figma nodes still resolve to Button. That mismatch remains an
  explicit owner-evidence gap and was not converted into an aesthetic decision.

## Readiness

`ready for human review`: neutral composition, cross-target projection,
responsive containment, semantics, accessibility, performance, parity and
documentation are complete for review. Contract remains `pilot`; no `stable`
promotion was made.
