# Component Dossier: Care Instructions

Status: `human-review-ready`

Date: 2026-08-11

Registry: `R4` / `care-instructions`

Dependency order: 129, phase 6 (Composed components), depth 0

## Recommendation

Keep Care Instructions as passive, text-first guidance, not a checklist,
choice list, alert, validation summary, status group, or interactive task list.
Exhibit and Studio should render one shared target-authored unordered list whose
direct items each contain a required instruction label, optional explanatory
detail, and an optional decorative supporting icon. The neutral component owns
document semantics and layout only; the target content authority owns every
care statement, qualification, locale, revision, and product association.

Use `ul.care-instructions__list > li.care-item` because the records form a
related collection but their order is not inherently sequential. Preserve the
existing `.care-instructions__grid` selector as a compatibility alias on the
same native list rather than maintaining a second wrapper. Because the visual
markers are removed, retain native list semantics explicitly with
`role="list"` for current Safari/VoiceOver behavior. Use a named native
`section` only when the optional visible title exists; otherwise use a generic
`div`. Omit the complete root when no valid items remain.

Owner decision 58 confirms the accepted root treatments `default`, `do`, and
`dont`. They change
supporting icon color only and never create state, validation, urgency, or an
accessible meaning by themselves. Every instruction must remain complete in
visible text; recommended or discouraged intent must be clear from the authored
heading and item wording, not inferred from green/red or an icon. Preserve the
legacy `.care-item--do` and `.care-item--dont` hooks as CSS compatibility facts,
not as a new mixed-record public API.

Each instance represents one homogeneous neutral, recommended, or avoid set.
Compose separate canonical instances for recommended and avoid guidance instead
of adding per-item tone. Stable public values remain `default | do | dont`,
while targets may display friendlier localized vocabulary such as
Recommended/Avoid. Legal or safety warnings remain separately reviewed rich
content or canonical Alert and are never inferred from care tone.

Keep contract version `0.2.0` and status `pilot`. Keep the public API to
optional `title`, required `items`, and `variant`. Do not expose icon choice,
icon size, column count, minimum card width, breakpoint, alignment, padding,
gap, border, radius, heading rank, or item schema as root properties. Do not
promote R4 to `stable` without explicit human review.

## Purpose And Limits

- Groups concise product- or material-specific care guidance into a scannable
  passive collection.
- Keeps each instruction understandable from visible text without icon, color,
  item position, hover, or interaction.
- May add optional explanatory detail and a redundant decorative icon.
- May visually emphasize a homogeneous set as recommended or discouraged when
  the authored copy already communicates that meaning.
- Does not let users mark work complete, select preferences, confirm reading,
  dismiss guidance, acknowledge risk, or update product state.
- Does not replace an alert, warning disclosure, legal notice, safety data
  sheet, warranty, product specification, maintenance log, or workflow.
- Does not define which care claims are valid for ceramics, textiles, food
  contact, appliances, finishes, attachments, restorations, or other products.
- Does not define standardized care symbols, certification marks, regulatory
  language, translations, revision history, or proof of consumer receipt.
- Does not expose purely compositional choices such as grid tracks, icon
  catalogue, local measure, alignment, padding, border, or responsive threshold.

## Accepted Source Facts

- The repository is the source of truth; Figma supplies evidence and remains a
  future target.
- ADR 0083 accepts the registry-backed Default, Do, and Don't root treatments,
  preserves legacy item-level hooks, and requires icons/color to support rather
  than replace text.
- The contract exposes optional `title`, required target-owned `items`, and
  optional `variant`, has no canonical dependencies, and remains `pilot`.
- The current MDX requires a text label per item and allows optional description
  and supporting icon.
- The component goal requires Exhibit and Studio to share one renderer, fixture,
  canonical CSS, and implementation.
- Owner decision 58 assigns records, applicability, localization and review to
  the target/R0 boundary, rejects mixed per-item tone, preserves stable variant
  values, permits friendlier target-visible vocabulary and keeps legal/safety
  warnings in separately reviewed rich content or canonical Alert.

## Current Gallery Baseline

- The shared Ceramics renderer keeps a local fixture and local markup inside
  `CeramicsStudio.tsx`; R4 has no independently reusable artwork/fixture boundary.
- The root is always a `section` but has no `aria-labelledby`. Its optional H2
  therefore neither names the section explicitly nor changes the untitled root
  into a more appropriate generic container.
- The repeated collection is a generic `div` grid and each record is another
  generic `div`. The visual relationship is not exposed as a native list.
- Required `items` can be disabled through the generic Studio slot toggle even
  though an empty component has no defined useful result.
- Labels and descriptions are `span` elements. They visually wrap, but have no
  paragraph defaults/reset and no structural collection context.
- The default fixture uses three Lucide icons hidden from assistive technology,
  which correctly avoids redundant announcements, but the records and markup
  are duplicated in the category renderer.
- Root Do/Don't and legacy item modifiers only recolor icons. Current text does
  not rely on that color, but the component has no executable guarantee that a
  consumer will author a homogeneous or explicit set.
- CSS uses hardcoded `24/16/8/36/1px`, physical padding/margin/width/height,
  raw `600/500` weights, calculated `0.875x/0.75x` body sizes, and no explicit
  line-height, long-text containment, private composition variables, named
  container, or forced-color boundary.
- The `0.75x` description resolves to approximately 12px in the default scale,
  making explanatory care copy unnecessarily small.
- Canonical auto-fill layout is intrinsically responsive, but Studio adds a
  separate `max-width: 440px` override and fixture margin/width correction.
  Exhibit and Studio therefore do not rely solely on the canonical component.
- Existing visual references show a restrained bordered panel, serif title,
  divider, three centered icon/text records on Desktop, and one vertical column
  on Mobile. They support the current quiet editorial direction but do not
  approve Tablet/XL, long/localized content, untitled/empty sets, all variants,
  dark/forced colors, text spacing, or intrinsic hosts.
- Existing before evidence contains only paired Exhibit/Studio Desktop and
  Mobile captures under `output/playwright/parity/ceramics/`.
- Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
  and inspector `1020:480`. Direct inspection in the current program found a
  generic Button detail and Studio shell, not R4-specific anatomy or visual
  approval.
- Baseline R4 CSS slice is `1,204 B` raw / `509 B` gzip, SHA-256
  `f2aac3c8f69bc850ddc2c476a9013c07fca7796973f9c3da815227de639644c3`.
  Ceramics CSS is `28,079 B` raw / `4,521 B` gzip against the permanent
  `5,427 B` family ceiling. Neutral Web component CSS is `517,911 B` raw /
  `70,002 B` gzip. Shared runtime is `53,811 B` raw / `10,565 B` gzip. R4 owns
  no neutral listener, state, observer, timer, request, or script.

## Standards And Mature-System Evidence

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| [HTML `ul`/`li`](https://html.spec.whatwg.org/dev/grouping-content.html#the-ul-element) | `ul` represents a list whose order does not materially change meaning; its list items are direct `li` children. | Use one native unordered list for related care records. Do not imply a required sequence merely because CSS lays items left to right. |
| [HTML `section`](https://html.spec.whatwg.org/dev/sections.html#the-section-element) | A section is a thematic document grouping, typically with a heading, and is not a generic styling container. | Emit a section only with a visible title; use a generic root when untitled. |
| [WCAG 1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | Visual list/group relationships must be programmatically determinable; native `ul`, `ol`, and `dl` are identified techniques. | Replace the generic repeated div grid with native list/list-item semantics. |
| [WCAG 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color) | Information conveyed by color must also be available without color, commonly through text or another cue. | Do/Don't icon colors are supporting presentation only; visible authored copy must carry the recommendation or prohibition. |
| [WAI Decorative Images](https://www.w3.org/WAI/tutorials/images/decorative/) | An image that repeats adjacent text or adds no information should be ignored by assistive technology to avoid audible clutter. | Keep redundant care icons `aria-hidden`; if an icon ever carries unique meaning, the target must supply a real text equivalent instead. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG documents widgets such as Checkbox, Listbox and Alert but has no passive care-instructions widget. | Use native document semantics, zero keyboard model and no widget state. A checklist or alert would be a different composed component. |
| [Open UI List research](https://open-ui.org/components/list.research/) | Lists may contain compound content such as icons and multiple text regions; selection is a separate optional concept. | Compound care items fit a passive list; icon/detail richness does not require selection behavior. |
| [Polaris List](https://polaris-react.shopify.com/components/lists/list) | Polaris renders related passive content as native `ul/li`, distinguishes bullet versus numbered order, and recommends consistent, concise phrasing. | A future Shopify projection can use native unordered-list semantics while preserving richer target-owned item content. |
| [Polaris Description List](https://polaris-react.shopify.com/components/lists/description-list) | `dl/dt/dd` is for terms paired with definitions and explanatory reference content. | R4 actions plus details are instructions, not vocabulary terms, so unordered list items are the better default. |
| [Radix Accessible Icon](https://www.radix-ui.com/primitives/docs/utilities/accessible-icon) | Radix adds a label when an icon itself carries meaning; its API does not define care guidance or a passive list. | Do not import a Radix widget contract. R4 icons repeat visible text and remain decorative; unique meaning belongs in text. |

Consensus exists on native list structure, complete visible text, separating
passive content from interactive choices, and not relying on color or redundant
icons. There is no consensus that care guidance needs a special ARIA role, that
`do`/`dont` is a universal record schema, that mixed tones belong in one group,
or that a visual symbol is valid across product categories or jurisdictions.

## Matches, Differences, And Direction

- ADR 0083 and the three-property contract already define a bounded passive
  direction; implementation should make that direction semantic and testable.
- Preserve the quiet bordered panel and centered scannable records from current
  references, while replacing generic wrappers with `ul/li`.
- Keep optional icons redundant and hidden from assistive technology. Do not add
  accessible icon labels that duplicate adjacent visible labels.
- Keep root variants visual and homogeneous. Do not expose item tone or mixed
  grouping; compose separate R4 instances for recommended and avoid sets.
- Replace undersized calculated text and raw weights with the existing body,
  body-small, heading and weight tokens.
- Remove the Studio-only narrow correction; intrinsic canonical grid sizing
  should produce the same component behavior in every consumer.
- Use a cautious fixture about following piece-specific guidance rather than
  asserting that every ceramic object is dishwasher-, microwave-, food-, heat-,
  or impact-safe.

## Candidate Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes when items valid | named `section.care-instructions` with title; otherwise `div.care-instructions` | R4 | No alert, widget or status role. |
| Header/title | no | `header` plus contextual heading | R4/target | Visible title names section; target owns rank. |
| Collection | yes | `ul.care-instructions__list.care-instructions__grid[role=list]` | R4 | Direct items; visual markers suppressed without losing list exposure. |
| Item | repeated | `li.care-item` | R4 | One complete instruction; no interactive state. |
| Icon | no | decorative target icon with `aria-hidden=true` | target/Studio | Supports scanning; never sole meaning or canonical icon name. |
| Label | per item | paragraph/phrasing content | target | Non-empty, concise and complete without icon/color. |
| Description | no | paragraph/content slot | target | Practical qualification or detail; no clamp. |

## Variant, Size, State, And Mode Matrix

| Dimension | Candidate direction |
| --- | --- |
| `default` | Neutral icon color; text carries complete guidance. |
| `do` | Success-family supporting icon color for a homogeneous recommended set; no semantic state. |
| `dont` | Error-family supporting icon color for a homogeneous discouraged set; no alert/error state. |
| Titled/untitled | Named native section versus generic root; no dangling label or unnamed landmark. |
| Missing/invalid items | Omit root when no complete records; omit incomplete peers. |
| Icon absent/present | Text geometry remains complete; no blank icon reservation when absent. |
| Description absent/present | Required label remains readable; no empty detail node. |
| One/many | One or more direct list items; no arbitrary minimum record count. |
| Wide host | Intrinsic multi-column grid based on available component width. |
| Narrow host | One column without consumer- or Studio-owned media query. |
| Hover/focus/keyboard | None owned by passive R4; interactive descendants require another accepted composition. |
| Long/localized/RTL | Logical geometry and full wrapping; visual order follows DOM/grid order. |
| 200% text/user spacing | Items and root grow without clipping, overlap or truncated guidance. |
| Dark/forced colors | Text and boundary remain perceivable; variant color is not required for meaning. |
| Reduced motion | R4 owns no motion or transition. |

## Public API And Runtime Direction

| Property | Type | Requirement | Direction |
| --- | --- | --- | --- |
| `title` | string | optional | Visible contextual heading; controls section versus generic root semantics. |
| `items` | slot | required non-empty | Target-owned instruction labels, optional details and optional decorative icons. |
| `variant` | enum | optional, default `default` | `default`, `do`, or `dont` visual treatment for one homogeneous set. |

No controlled/uncontrolled strategy applies. R4 owns no checked, selected,
acknowledged, dismissed, completed, current, error, warning, event, focus,
navigation, announcement, request, timer, or persistence state. If consumers
need acknowledgement or choices, they should compose canonical Checkbox, Radio,
Button, Alert, Form or another behavior-specific component under a separately
accepted contract.

Do not expose item records, mixed tone, icon source/name, icon size, columns,
minimum width, breakpoint, alignment, text alignment, gap, padding, border,
radius, heading rank, truncation, legal status, revision, locale, or product
schema as R4 root properties.

## Token And CSS Direction

- Keep public semantic text, border, feedback-color, heading/body typography,
  radius and layout-spacing tokens that canonical R4 actually consumes.
- Use body-small with a complete line-height for descriptions instead of a raw
  75% scale. Use an existing medium/semibold token for labels/title.
- Keep icon size and local half-gap as private composition variables; create no
  public R4 token layer.
- Reset native list margin/padding/markers while retaining list exposure in DOM.
- Use logical properties, `min-inline-size: 0`, `overflow-wrap: anywhere`, and
  intrinsic `minmax(min(...), 1fr)` grid tracks.
- Let canonical CSS own all responsive behavior and remove R4 layout/margin
  overrides from Studio.
- Add a forced-color boundary fallback; use no hover, focus, animation,
  transition, pointer cursor, or interactive styling.

## Target Translation

| Target | Direction |
| --- | --- |
| Neutral Web | Conditional section/div, native `ul/li`, complete visible text, optional decorative icons, intrinsic CSS grid, zero R4 JavaScript. |
| Shopify | Planned. Compose target-native section, unordered-list/list-item, heading, text and icon/image primitives only after product metafield/metaobject schema, content authority, localization and first consumer are approved. |
| Webflow | Preserve CMS-authored records in a native unordered list; content owners validate item-specific claims and translations. |
| React/Angular | Thin passive renderer receives semantic children/records; target data layer owns content, claims and icon rendering. |
| Figma | Future component models optional title, repeated item, optional icon/detail, three root treatments and intrinsic column modes; current generic nodes are not R4 approval. |
| SwiftUI/Compose/future | Use native grouped/list content with visible complete guidance; keep acknowledgement or task completion separate. |

## Evidence And Validation Plan

- Preserve the four current Desktop/Mobile parity captures as before evidence.
- Capture paired Exhibit/Studio Mobile, Tablet, Desktop and XL with one managed
  Gallery server, one explicit headless Chromium Playwright session and one tab,
  sequentially.
- Verify exact normalized DOM and computed-style parity at one forced host width.
- Verify conditional section/div, direct `ul/li`, `role=list`, decorative icons,
  heading relationship, full text, zero widget roles/focusables/listeners, and
  invalid-record filtering.
- Verify all root variants, title absent, items absent, one item, icon absent,
  description absent and mixed optional anatomy.
- Exercise `200/320/430/680px` hosts, long/localized/unbroken content, RTL,
  effective 200% text and user text spacing.
- Measure overflow, text/border contrast, light/dark, forced-color boundaries,
  reduced motion, console/page errors, scripts/listeners and runtime work.
- Validate contracts, Studio, docs, static previews, generated Web/Shopify
  adapters, Exhibit/Studio parity, component/refinement audits, JSON, diff
  hygiene, target copy parity and a production build outside `site/dist`.

## Risks And Remaining Human Gates

1. The first production target must prove R0-owned care records, product
   applicability, editorial/safety/legal review, revision history,
   localization, recalls and consumer association.
2. Production icons still need an approved decorative/symbol/pictogram policy,
   catalogue, license, fallback and cross-target mapping.
3. Statements needing qualifications, dates, provenance, regulatory disclosure,
   warnings or acknowledgement must prove their separate reviewed composition.
4. Shopify remains planned until a first surface, product data source, block
   limits/order, locale, merchant validation and migration are approved.
5. The current centered grid, `8.75rem` private track, sparse/text-heavy
   behavior and target-visible vocabulary require explicit human visual review
   or R4-specific design evidence.

These are production-target and human stability gates, not unresolved neutral
API decisions. Decision 58 resolves grouping, stable values, visible vocabulary
freedom and the safety boundary sufficiently for human review.

## Current Gallery Result

- `CareInstructionsArtwork` and `buildCareInstructionsFixture` are now the one
  renderer and fixture consumed by Exhibit and Studio. The category renderer no
  longer duplicates R4 records or markup.
- A titled component emits a native `section` labelled by its visible H2. An
  untitled valid component emits a generic `div`; no valid items emits no root.
- The repeated structure is one direct
  `ul.care-instructions__list.care-instructions__grid[role=list]` with direct
  `li.care-item` children. Every fixture item has complete visible text and its
  redundant icon is hidden from assistive technology.
- Default, Do and Don't alter only decorative icon color. Browser inspection
  finds no widget roles, state attributes, focusable descendants, live regions,
  scripts, hover mutation, click mutation or neutral runtime.
- Canonical CSS now owns an intrinsic `1 / 2 / 3` column response. Verified
  direct widths are `200px -> 1`, `320px -> 1`, `430px -> 2` and `680px -> 3`
  visible tracks, all with zero root, part and document overflow. Studio owns no
  R4 breakpoint or layout correction.
- Paired natural evidence covers Exhibit and Studio at Mobile, Tablet, Desktop
  and XL. The same normalized `620px` host produces identical DOM hash
  `917feb46`, identical style hash `d3ccb922`, `618px` roots, `586px` lists and
  three tracks in both consumers.
- One-item/label-only, untitled, empty, Default/Do/Don't, RTL with unbroken text
  at `200px`, effective 200% text, user spacing, dark/reduced-motion and forced
  colors pass. Light text contrast is `17.93:1` / `7.81:1`; dark is `17.18:1`
  / `12.09:1` for primary/supporting copy.
- The R4 CSS slice remains byte-identical to Batch 113 at `2,445 B` raw /
  `776 B` gzip level 9, SHA-256
  `cea7e4ba66645710a5ef7077ff19b9846f6fa5750c298246bc686c9d9589b697`.
  Current Ceramics CSS is `34,028 B` raw / `4,858 B` gzip, leaving `569 B`
  under the `5,427 B` family ceiling after later R-family refinements. R4
  contributes zero runtime.
- Webflow and Shopify Ceramics CSS projections are source-identical. Shopify
  remains CSS-ready/planned because no product care schema, content authority,
  locale/editor policy or first consumer is approved.
- Evidence and executable probes live under
  `output/playwright/refinement-batch-113/`; the permanent audit is
  `docs/reports/care-instructions-web-refinement-audit.md`; ADR 0204 records the
  semantic direction.

R4 is technically refined within its passive neutral scope and decision 58
resolves its remaining semantic direction. Production proof and explicit human
approval remain pending. It therefore stays `pilot`, is not `stable`, and is
marked ready for human stability review.
