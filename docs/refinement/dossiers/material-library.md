# Component Dossier: Material Library

Status: `human-review-ready`

Date: 2026-07-17

Registry: `R1` / `material-library`

Dependency order: 126, phase 6 (Composed components), depth 1

## Accepted Direction

Owner decisions 54 and 55 confirm R1-A as a passive, target-owned reference
collection rather than a resource
manager, filter, selector or commerce catalogue. The neutral component should
own one optional contextual introduction plus one required non-empty collection
slot. When a visible title exists the root is a named native `section`; without
a title it is a generic `div`, because HTML does not support an unnamed
section merely for styling.

Represent the material collection as `ul > li > article`. Each record is a
self-contained named material summary with a required visible name and optional
informative/decorative media, classification, description and canonical Tag
composition. The unordered list communicates a related collection without
claiming that order affects meaning. Target source order remains authoritative;
if a target has a meaningful sequence, it may supply an ordered list through
its adapter while preserving the same card anatomy.

Remove passive-card hover/motion, the duplicate property-pill styling and the
site-only grid/media override. Extract one `MaterialLibraryArtwork` and fixture
for Exhibit and Studio, and a reusable `TagArtwork` leaf so R1 consumes Tag's
canonical DOM rather than copying a partial look.

Keep `title`, `subtitle` and `materials` as the complete R1 API. Do not expose a
material record schema, card count, column count, media ratio, padding, radius,
classification vocabulary, technical property model, selection, filtering,
sorting or navigation until the owner accepts those product/architecture
contracts. Advance the candidate implementation but retain contract version
`0.2.0`, status `pilot` and explicit human-review requirement.

## Purpose And Limits

- Presents a scannable collection of target-authored material references.
- Supports a visible contextual title and plain-language introduction.
- Gives each material a durable textual identity independent of color, texture
  or media availability.
- May present a target classification, prose description and passive canonical
  Tags as supporting metadata.
- Does not define a clay/glaze/material taxonomy, unit system, safety facts,
  sourcing claims, certification, availability, price, product compatibility or
  technical-data schema.
- Does not fetch, filter, sort, search, select, compare, paginate, navigate,
  disclose, edit or persist material records.
- Does not imply that a complete card is interactive. A future target Link or
  action must be composed explicitly with a truthful destination/behavior.
- Does not expose heading rank, collection semantics, card columns, minimum
  measure, media block size, body padding or gaps as semantic public props.

## Accepted Source Facts

- The repository is the source of truth; Figma remains evidence/future target.
- ADR 0083 accepts a header, responsive collection, complete Material Card
  anatomy and optional Tag composition while leaving all records and schemas
  target-owned.
- Registry R1 declares canonical Tag as its only dependency.
- The contract exposes optional `title`/`subtitle` and a required target-owned
  `materials` slot; it remains `pilot`.
- The refinement goal requires composed components to consume canonical
  dependencies and Exhibit/Studio to share renderer, fixture and implementation.
- No accepted decision authorizes a new Shopify section, content schema,
  interaction state or public component-token layer.

## Current Gallery Baseline

- Contract `0.2.0` describes a generic grid but not native list/items, valid
  title-absent root semantics, non-empty slot behavior, article naming, media
  dimensions/loading ownership, passive-card behavior or zero runtime.
- The renderer always emits `section[aria-labelledby]`, even when the optional
  title is removed. That produces a dangling accessible-name relationship.
- `.material-library__grid` is a generic `div`; repeated cards have no native
  collection/list relation.
- Cards are native `article`, but are not explicitly named from their visible
  heading and invalid/blank records are not filtered.
- Property labels are raw `span.material-card__tag` instances. They omit
  `.tag__label` and duplicate Tag padding, border, radius, color and type.
- A passive card changes border on hover and ships transition/easing tokens,
  suggesting clickability even though R1 exposes no destination or event.
- The source uses raw physical `padding`, `margin-bottom`, width/height and
  values `32/16/12/8/6/4/2px`, plus type calculations and uppercase tracking.
- The grid is already intrinsically narrow-safe, but R1 also participates in a
  viewport media query for padding. Studio then overrides the canonical card
  minimum measure and media height, so the docs candidate is not the target CSS
  projection alone.
- The first two fixture images plausibly illustrate ceramic material outcomes;
  the third shows an artist rather than a terracotta swatch. Current alt text
  inaccurately calls every editorial image a clay-body sample.
- MDX static source has two cards and generic role-images while the shared
  Exhibit/Studio runtime displays three image cards. The visible modes currently
  share the outer Ceramics Studio renderer, but R1 has no independently reusable
  artwork/fixture boundary.
- Existing baseline screenshots cover only Desktop and Mobile at
  `output/playwright/parity/ceramics/material-library-*`. They do not verify
  Tablet, XL, missing title/materials, one card, long/localized/RTL/unbroken
  content, 200% text, user spacing, dark, forced colors, reduced motion, native
  collection semantics, exact same-container parity or runtime work.
- Shopify, Webflow and neutral Web receive copied/generated Ceramics CSS.
  Shopify has no R1 Liquid, schema, data/editor mapping or template consumer.
- Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
  and inspector `1020:480`. Prior direct inspection confirms generic Button
  detail/Studio shell nodes, not R1 material cards or approved visuals.
- Baseline R1 CSS slice is `1,955 B` raw / `672 B` gzip, SHA-256
  `f4c578d2891b92704382bb1bb551bffbe376ff828edc41d5f2407c7366482d1d`.
  Ceramics CSS is `25,031 B` raw / `4,201 B` gzip against its permanent
  `5,427 B` family ceiling. Neutral Web component CSS is `514,863 B` raw /
  `69,074 B` gzip. Shared runtime is `53,811 B` raw / `10,501 B` gzip. R1 owns
  no neutral listener, observer, timer, request or asset.

## Standards And Mature-System Evidence

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| [HTML `section`](https://html.spec.whatwg.org/multipage/sections.html#the-section-element) | A section is a thematic grouping, typically with a heading, and not a generic styling wrapper. | Emit a named section only when title exists; otherwise use a neutral container. |
| [HTML `article`](https://html.spec.whatwg.org/multipage/sections.html#the-article-element) | Article represents a complete/self-contained composition that is independently reusable. | A complete material record with its own name is a valid article; incomplete records are omitted. |
| [HTML `ul`/`li`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element) | `ul` represents related items where changing order does not materially change meaning; direct `li` children establish the list relation. | Use a native unordered collection rather than a generic CSS grid. Target source order is still preserved. |
| [HTML image alternative rules](https://html.spec.whatwg.org/multipage/embedded-content.html#alt) and [WAI Images](https://www.w3.org/WAI/tutorials/images/) | Non-empty alt replaces key image information; `alt=""` is correct for decorative/redundant media; the decision depends on context. | Require the target to classify each supplied media item. Fixture alternatives must describe the actual editorial image, not claim a raw clay sample. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG standardizes interactive widgets; it has no passive Card or Material Library pattern. | Prefer native document/list semantics and add no grid/listbox keyboard model or ARIA role. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Surveyed systems do not converge on one Card anatomy. | Keep R1's material-specific structure in its contract; do not invent a universal interactive Card API. |
| [Radix Themes Card](https://www.radix-ui.com/themes/docs/components/card) and [Radix Aspect Ratio](https://www.radix-ui.com/primitives/docs/components/aspect-ratio) | Card groups related content; Aspect Ratio constrains supplied media but does not define record semantics or data. Radix primitives emphasize composing existing leaves. | Keep record semantics native and media size compositional/private; consume Gallery Tag rather than clone it. |
| [Polaris list guidance](https://polaris-react.shopify.com/components/lists/list) | Native list output is appropriate for related content; interactive resource lists are specifically for finding/navigating objects. | R1 remains passive `ul/li`; do not adopt Resource List selection/navigation behavior without a target decision. |
| [Polaris Card layout](https://polaris-react.shopify.com/patterns/card-layout) | Cards group content with scannable title/body hierarchy; repeated objects should remain a list, not be implied only by card sections. | Keep clear names/body grouping inside a real collection. |
| [Shopify Web Components](https://shopify.dev/docs/api/app-home/web-components) | Shopify separates Section, Grid, Image and passive classification primitives and uses query containers for data lifecycle. | A future Shopify adapter composes target-native structure and data/editor choices; neutral R1 does not absorb query state. |

Consensus exists on visible record names, native collection/document semantics,
context-dependent image alternatives, passive metadata and composition. There
is no standard or mature-system consensus on a ceramics schema, which
properties are Tags versus term/value data, whether records navigate, sorting,
filters, columns, media art direction or Shopify content ownership.

## Matches, Differences, And Direction

- ADR 0083 and the current three-property API already establish the correct
  target-data boundary. Refinement should make it executable, not add records.
- Existing `article` cards match HTML's self-contained-content intent once each
  is complete and named. The generic grid differs from native collection
  guidance and should become `ul > li > article`.
- R1's `tag` dependency is correct, but the implementation currently copies a
  small pill. Canonical Tag composition resolves the mismatch without exposing
  removal state in this passive use.
- Current hover is the only R1 interaction-like state and has no behavior. It
  should disappear rather than become a clickable-card assumption.
- Optional title is an accepted contract fact. Conditional section/div output
  preserves it without an invalid unnamed landmark.
- The target may later replace passive Tags with term/value technical facts,
  but doing so now would assume a ceramics schema. The candidate only proves
  passive classification labels.

## Candidate Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes when materials valid | `section.material-library[aria-labelledby]` with title; otherwise `div.material-library` | R1 | Omit entirely with absent/non-renderable materials. No explicit role. |
| Header | no | `header` when title exists; otherwise neutral `div` for subtitle-only intro | R1/target | Omit when title and subtitle are blank. |
| Title | no | contextual heading with target-unique ID | target | Enables section semantics; target chooses contextual rank. |
| Subtitle | no | `p.material-library__subtitle` | target | Plain-language scope/intro; not an accessible-description requirement. |
| Collection | yes | `ul.material-library__grid` | R1/target | At least one complete material item; target order preserved. |
| Item | repeated | `li.material-library__item` | R1 | One direct Material Card. |
| Card | per item | named `article.material-card` | R1/target | Requires stable key and non-empty visible name. Passive by default. |
| Media | no | target `img`/media slot | target | Informative alt or decorative `alt=""`; dimensions/loading/decoding are target responsibilities. |
| Body | yes | `div.material-card__body` | R1 | Textual record content. |
| Name | yes | contextual heading, article label source | target | Non-empty; target chooses rank. |
| Type | no | `p.material-card__type` | target | One target-authored classification, not an enum. |
| Description | no | `p.material-card__description` | target | Plain-language prose, complete and unclamped. |
| Properties | no | `ul.material-card__properties` | R1/target | Omit when no non-empty labels. |
| Property item | repeated | `li.material-card__property` containing canonical passive Tag | R1 + Tag | No remove action or whole-card activation. |

## Variant, Size, State, And Mode Matrix

| Dimension | Candidate direction |
| --- | --- |
| Default | Passive material reference collection; no root variant or size. |
| Titled | Named native section. |
| Untitled | Generic container; no dangling `aria-labelledby`. |
| Subtitle only | Generic root with neutral introductory wrapper. |
| Missing/empty materials | Omit complete R1 root. |
| Invalid material | Omit record with blank key/name; root remains only if another valid record exists. |
| One/many | One or more native list items; target order retained. |
| Media present/absent | Card remains complete with textual identity; no blank media reservation. |
| Type/description/properties absent | Corresponding DOM is omitted; name remains required. |
| Hover/focus/selection | No R1 state. Canonical child Links/actions would own states only if a future target supplies them. |
| Narrow container | Auto-fit intrinsic grid collapses to one column from actual host width. |
| Long/localized/RTL | Logical flow and complete wrapping; no clamp or fixed inline width. |
| 200% text/user spacing | Cards grow; media and text do not overlap or clip. |
| Dark/forced colors | Semantic borders/text and canonical Tag adapt; media does not carry the only identifier. |
| Reduced motion | R1 owns no motion. |

## Public API And Runtime Direction

| Property | Type | Requirement | Direction |
| --- | --- | --- | --- |
| `title` | string | optional | Visible contextual heading; controls section versus generic root semantics. |
| `subtitle` | string | optional | Visible supporting introduction. |
| `materials` | slot | required non-null/non-empty | Target-owned native material-card collection; no record schema implied. |

No controlled/uncontrolled strategy applies to R1. It owns no value, event,
selection, focus, request or persistence. A future target-provided Link, filter,
search or selector remains a separately composed canonical contract.

Do not expose material records, schema fields, columns, card count, type enum,
technical properties, media ratio, loading mode, card action, selected material,
sort, filter, pagination, heading rank, padding, gap, radius or minimum measure
as R1 root properties.

## Token And CSS Direction

- Keep R1-owned public tokens for border, text, heading/body typography, card
  radius and section/grid/element spacing.
- Remove `--color-border-default`, transition/easing and `--radius-full` from R1
  ownership when passive hover and duplicate Tag styling are removed. Tag owns
  its own surface, border, radius, type and forced-color behavior.
- Replace physical width/height/padding/margin properties with logical geometry.
- Use existing semantic tokens or proportional private composition variables for
  the current header/body/property rhythm; add no public Material token layer.
- Reset native collection/property lists visually while preserving semantics.
- Keep card minimum measure and media block size private implementation details.
- Remove the viewport padding rule and Studio-only R1 grid/media override; the
  canonical component must respond to its host in every consumer.

## Target Translation

| Target | Direction |
| --- | --- |
| Neutral Web | Native conditional section/div, `ul/li/article`, semantic media, canonical passive Tag composition and zero R1 JavaScript. |
| Shopify | Planned target-native section/block only after content source, schema/editor settings, material-to-product relationship, limits/order and first template consumer are approved. CSS alone remains projection, not maturity. |
| Webflow | Preserve native list/article structure and target-authored CMS mapping; no interaction implied. |
| React/Angular | Thin renderer accepts semantic children/slots; data/query layers own records and lifecycle. |
| Figma | Future component models optional header, repeated material cards, optional media/type/description/Tags and intrinsic columns; generic registered nodes are not visual approval. |
| SwiftUI/Compose/future | Use native lazy collection/card/text/image/chip equivalents; record schemas and adaptive layout remain target-native. |

## Evidence And Validation Plan

- Preserve the four current Desktop/Mobile parity captures as before evidence.
- Capture paired Exhibit/Studio Mobile, Tablet, Desktop and XL with one managed
  server, one explicit headless Chromium session and one tab, sequentially.
- Verify exact normalized DOM and computed-style parity at one forced container.
- Verify conditional section/div output, title relationship, native `ul/li`, one
  named article per item, informative image alternatives and canonical Tags.
- Verify missing materials, missing title, one item and optional-part omission.
- Exercise `200/320/430/680px` host widths, long/localized/unbroken strings,
  RTL, effective 200% text and user text spacing.
- Measure light/dark text and border contrast, forced-color boundaries, reduced
  motion, focusable descendants, overflow, console/page errors and runtime work.
- Validate contracts, Studio, docs, static previews, generated Web/Shopify
  adapters, Exhibit/Studio parity, component/refinement audits, JSON, diff
  hygiene and a production build outside `site/dist`.

## Risks And Remaining Gates

1. The first production target must prove actual record provenance, revision,
   localization, rights, applicability, measurements and claim review under the
   accepted R0 boundary.
2. Production media still needs a certified raw-sample, fired-outcome or
   editorial art direction plus crop, alt, loading, fallback and rights policy.
3. A Shopify consumer remains planned until its template, source, editor schema,
   limits, authoritative order, relationships and localization are approved.
4. Final section padding, heading, card density, media size, tracks, boundary
   treatment and Mobile/Tablet/Desktop/XL visuals require owner review.
5. R1-specific Figma evidence or explicit approval of the repository render is
   still required.

These are target and human-review gates, not unresolved neutral architecture.
R1-A is ready for review but cannot become `stable` without explicit approval.

## Current Gallery Result

- R1 now emits a named native `section` only when its optional visible title is
  present. Untitled and subtitle-only compositions use a generic `div` without
  `aria-labelledby`; absent required materials omit the complete root.
- The collection is a native `ul` with direct `li` items and one direct named
  native `article` per complete material. Blank keys/names are filtered before
  rendering.
- Each article retains textual identity and may independently omit media, type,
  description or property labels. Fixture images now carry dimensions and
  alternatives describing the actual editorial image rather than claiming raw
  clay samples.
- Property labels are native lists of canonical passive `TagArtwork` instances
  with `.tag__label` and no remove actions. Tag's own Studio now consumes the
  same leaf renderer.
- `MaterialLibraryArtwork` and `buildMaterialLibraryFixture` are the single R1
  implementation and fixture consumed in both Exhibit and Studio.
- Canonical CSS uses logical geometry, intrinsic auto-fit tracks, semantic
  spacing/type tokens, complete wrapping and visually reset native lists. The
  duplicate property-pill rules, passive hover/transition, viewport padding
  rule and Studio-only R1 grid/media overrides are removed.
- A final same-container correction constrains R1 padding with the existing grid
  gap so contextual `cqi` token resolution cannot make Exhibit and Studio differ
  at the same root width.
- At `620px`, both modes produce DOM hash `ee24aa92`, computed-style hash
  `d9536440`, subtree length `3,178`, two `286px` columns and zero root, part or
  document overflow.
- Mobile, Tablet, Desktop and XL pass in both modes. `200/320/430/680px` hosts,
  one minimal card, untitled/no-introduction, long localized RTL/unbroken text,
  effective 200% type, user spacing, light/dark, forced colors and reduced
  motion also pass without clipping, errors or focusable descendants.
- Light text contrast ranges from `7.17:1` to `17.93:1`; dark ranges from
  `10.21:1` to `17.18:1`. Forced colors preserves `1px` card and Tag boundaries.
- Final R1 CSS is `2,851 B` raw / `786 B` gzip. Ceramics CSS is `25,812 B` raw /
  `4,377 B` gzip, leaving `1,050 B` below its permanent `5,427 B` ceiling.
  Shared neutral runtime is byte-identical and R1 remains zero-runtime.
- Web is implemented; Webflow and Shopify Ceramics CSS copies are source
  identical. Shopify R1 remains planned because source, editor schema,
  relationship, ordering/limit, localization and first consumer are open.
- Evidence is retained under `output/playwright/refinement-batch-110/`; ADR 0201
  records the neutral boundary and the audit is
  `docs/reports/material-library-web-refinement-audit.md`.

R1-A is refined and prepared for explicit human visual/stability review. It
remains `pilot` and was not promoted to `stable`.
