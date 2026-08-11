# Material Library Web Refinement Audit

Date: 2026-08-11

Evidence batch: 110; decision reconciliation: 159

Component: R1 `material-library`

Status: ready for explicit human review; remains `pilot`

## Outcome

Material Library is now a passive target-owned reference collection with valid
conditional root semantics, a native list of complete named material articles,
context-aware media and canonical passive Tag composition. Exhibit and Studio
consume one renderer and fixture; layout responds to the actual host width;
neutral runtime remains zero; and Mobile, Tablet, Desktop, XL plus special-mode
evidence passes.

Owner decisions 54 and 55 now close the neutral identity: R1-A is passive, and
targets own record provenance, revisions, localization, rights, applicability,
measurements and claim review. The component does not define a ceramics schema,
technical vocabulary, safety/sourcing authority, material-product relationship,
navigation, selection, search, filtering or target service. The contract stays
`pilot`; human review is required before any stability promotion.

## Decision Reconciliation

- `R1-A` confirms the existing optional introduction plus required native
  unordered collection of complete named material articles.
- Media, classification, description and canonical passive Tags remain
  optional target-authored record parts. Names and complete text carry meaning.
- R1 exposes no interactive mode. A future linked catalogue, selector,
  comparison or filtering system requires a separate accepted contract.
- R0 prevents neutral inference of taxonomy, safety, sustainability, food
  contact, authenticity, availability or technical equivalence.

## Certification Summary

| Area | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive material reference collection only; not a CMS schema, selector, catalogue, query, safety authority or data lifecycle. |
| Anatomy and composition | pass | Conditional section/div, optional intro, native `ul > li > article`, required names, optional media/type/description, canonical passive Tags. |
| Required/optional content | pass | Missing materials produces zero roots; title/subtitle and all per-card supporting parts omit independently. |
| States and modes | pass for neutral scope | Passive default only; card hover leaves its border unchanged; no R1 value, event, focus, loading/error or selection state. |
| Tokens and CSS | pass | Existing semantic tokens, logical geometry, intrinsic auto-fit grid, private measures, no viewport component query or site-only R1 override. |
| Accessibility | pass | Named section when titled, generic div otherwise, native list/articles, visible article names, accurate image alternatives, textual identity and no ARIA grid/listbox behavior. |
| Responsive/content resilience | pass | Four paired natural viewports plus `200/320/430/680px`, minimal card, RTL, long/unbroken, effective 200% type and user text spacing with zero overflow. |
| Runtime/performance | pass for R1/Ceramics | Zero neutral R1 runtime; Ceramics remains `1,050 B` under its family ceiling; neutral runtime is byte-identical. |
| Exhibit/Studio parity | pass | Exact DOM hash `ee24aa92` and computed-style hash `d9536440` at the same `620px` container. |
| Targets | Web implemented; others bounded | Web, Webflow and Shopify CSS projections validate; target-native Shopify content/editor implementation remains planned. |
| Human review | required | Final visuals, production record/media proof, Shopify consumer and R1-specific design evidence remain; neutral architecture is resolved. |

## Anatomy, API, And Behavior

The `0.2.0` target-agnostic contract exposes three semantic properties:

| Property | Type | Requirement | Behavior |
| --- | --- | --- | --- |
| `title` | string | optional | Visible contextual heading; a non-empty value selects named native-section semantics. |
| `subtitle` | string | optional | Visible supporting introduction; omitted independently. |
| `materials` | slot | required non-empty | Target-owned native Material Card collection; absence omits the complete root and implies no CMS record shape. |

The verified default fixture contains:

- one native `SECTION`, no explicit role/tabindex, correctly named by its
  visible H2 through `aria-labelledby`;
- one direct native `UL` with no explicit role and three direct `LI` items;
- exactly one direct native `ARTICLE.material-card` in every item, named by its
  visible material heading (`Stoneware 03`, `Porcelain 01`, `Terracotta 07`);
- three complete `1800x2700` editorial images with context-accurate non-empty
  alternatives and loaded natural width;
- three native property lists and four canonical Tags with required
  `.tag__label` content and zero remove actions;
- zero grid/listbox/option roles, focusable descendants, live regions or
  scripts inside R1.

When the title is blank, the same valid collection becomes a generic `DIV`,
emits no `aria-labelledby`, omits the title and uses a neutral introductory
`DIV`. Removing subtitle too omits the intro wrapper. Removing the required
materials composition produces zero R1 roots.

The browser-projected minimal-card stress case contains one named article and
omits media, type, description and property list. It remains `58px` tall at a
`320px` root with zero overflow. Renderer source applies the same omission rules
before emitting each optional part.

R1 owns no controlled/uncontrolled value, event, destination, selection, sort,
filter, search, request, result, page, focus manager or status region. Target
children retain their own contracts if future product decisions compose them.

## Passive Collection And Data Boundary

The unordered collection communicates related records whose display order does
not currently change document meaning. The target still preserves authored
source order. If future research makes sequence meaningful, the target must
accept ordered semantics rather than silently styling `ul` as ordinal data.

The neutral component owns no material object shape. Targets own:

- record source, identity, localization, revision and publication lifecycle;
- taxonomy, aliases, grouping, ordering and material-product relationships;
- technical values, units, rounding, provenance and freshness;
- safety, food-contact, sourcing, sustainability, certification and legal claims;
- media type, crop, ratio, alt/decorative classification, dimensions, loading,
  decoding, fallback and rights;
- any destination, disclosure, selection, compare, filter, search, pagination,
  empty/loading/error state and analytics.

ADR 0201 records the passive boundary. A future interactive card must compose a
truthful canonical Link/control; R1 does not infer whole-card activation.

## Accessibility And Interaction

All three articles resolve their accessible names to visible headings inside
the article. Text remains the source of material identity and facts; imagery
and Tag shape/color are supplementary. Property labels are real list items,
not an unlabeled visual flex cluster.

The root has zero focusable descendants in default, dark and forced-colors
evidence. Hover leaves the passive card boundary byte-for-byte unchanged
(`rgb(229, 229, 229)`). There is no R1 keyboard model because there is no R1
interaction. Forced colors preserves `1px solid` card and Tag boundaries, and
reduced-motion inspection finds zero active R1 motion parts.

Measured text contrast ratios:

| Mode | Title/name | Subtitle/type/description | Tag |
| --- | ---: | ---: | ---: |
| Light | `17.93:1` | `7.81:1` | `7.17:1` |
| Dark | `17.18:1` | `12.09:1` | `10.21:1` |

## Responsive And Extreme Content

Natural Mobile, Tablet, Desktop and XL captures pass for Exhibit and Studio.
At `390px` the collection uses one column; wider actual hosts use two columns
when the private minimum measure permits. Every natural case has zero root,
part and document overflow.

Forced `200/320/430/680px` roots resolve to `1/1/1/2` columns with card widths
`168/288/398/316px`. Long localized RTL and unbroken content at `200px`,
effective 200% text at `320px`, and user text spacing at `320px` grow the cards
without clipping, clamping or overflow.

The padding parity correction uses
`min(--space-layout-container, --space-layout-grid-gap)`. This prevents the
same R1 width from inheriting different `cqi`-resolved container padding in
Exhibit and Studio while preserving existing semantic spacing tokens.

## Tokens, CSS, And Composition

R1 owns public token references for:

- text/boundary: `--color-text-primary`, `--color-text-secondary`,
  `--color-border-subtle`;
- typography: heading/body families, H2/body/small/caption sizes and line
  heights, and accepted semantic weights;
- geometry: `--radius-lg`, container, section, grid and element spacing.

Passive hover removed `--color-border-default`, transition and easing from R1.
Canonical Tag owns its surface, border, radius, type and forced-color rules, so
R1 no longer claims `--radius-full` or duplicates pill CSS.

Physical width/height/padding/margins and raw rhythm values were replaced with
logical geometry, token-derived private composition variables and complete
wrapping. Native collection/property lists are visually reset without removing
semantics. Card minimum measure, media block size, internal padding and type
tracking remain private because consumers do not coordinate them cross-target.

`MaterialLibraryArtwork` plus `buildMaterialLibraryFixture` is the single R1
runtime path for Exhibit and Studio. `TagArtwork` is shared with Tag's own
Studio. React and editorial fixture media remain docs-consumer concerns; base
contract/CSS have no framework or asset dependency.

## Exhibit And Studio Parity

At a forced `620px` root width:

- normalized DOM hash: `ee24aa92` in Exhibit and Studio;
- computed-style hash: `d9536440` in both;
- serialized subtree length: `3,178` characters in both;
- grid: two `286px` columns across a `588px` content width in both;
- root, widest part and document overflow: zero in both.

The static MDX source now documents the same native classes/anatomy. Visible
Exhibit/Studio use the shared renderer and fixture, not separate record arrays.

## Cross-Target Translation

| Target | Result / boundary |
| --- | --- |
| Neutral Web | Implemented with conditional native section/div, `ul/li/article`, contextual media, canonical passive Tag composition, intrinsic Ceramics CSS and zero R1 JavaScript. |
| Shopify | CSS projection validates. Target-native Liquid/schema remains planned until source, editor fields, relationship, order/limits, localization, empty state and first template consumer are approved. |
| Webflow | Copied Ceramics CSS is source-identical; CMS mapping must preserve list/article/text/media semantics. |
| React/Angular | Thin renderer accepts semantic children/slots; data/query/interaction layers remain application-owned. |
| Figma | Future component models optional context and repeatable cards with optional parts; generic registered Button/Studio nodes are not R1 approval. |
| SwiftUI/Compose/future | Use native lazy collection, card, text, image and chip equivalents while keeping records and adaptive layout target-native. |

No target adapter API appears in canonical R1 source, and no Shopify Liquid or
content schema was invented.

## Automated And Browser Verification

Passing final gates:

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run audit:previews:static`
- `npm run build:components`
- `npm run build:adapter:web:components`
- `npm run build:adapter:shopify:components` (known repository maturity warnings only)
- `npm run audit:exhibit-studio`
- `npm run audit:components` (`183/183` automated pass; no stability promotion)
- `npm run audit:refinement` (`183` dossiers; `173` ready for human review after reconciliation)
- production Vite build to `/tmp/the-gallery-site-batch-110-final`
- `npm run evidence:cleanup`
- `npm run evidence:assert-clean`

No command writes `site/dist`. Evidence under
`output/playwright/refinement-batch-110/` includes four before images, eight
paired natural after images, seven special after images, the executable probe
and `evidence-summary.json`.

The initial probe aborted on an ambiguous test selector; cleanup immediately
closed its one browser/server. A subsequent bounded candidate phase exposed the
real `cqi` padding parity drift and was also closed before source correction.
The final fresh phase used one fixed-port server, one explicit headless Chromium
session `gallery-refinement`, one tab and sequential navigation, then closed all
resources. Final `evidence:assert-clean` passes.

## Performance

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| R1 CSS slice | `1,955 B` raw / `672 B` gzip | `2,851 B` raw / `787 B` gzip | observation baseline | source SHA remains byte-identical to evidence batch 110 |
| Ceramics CSS | `25,031 B` raw / `4,201 B` gzip | `33,605 B` raw / `4,847 B` gzip | `5,427 B` | pass; `580 B` headroom after later R-family work |
| Neutral Web component CSS | `514,863 B` raw / `69,074 B` gzip | `536,847 B` raw / `72,913 B` gzip | `65,536 B` | documented global program gap; not attributed to R1 |
| Shared neutral runtime | `53,811 B` raw / `10,501 B` gzip | `117,741 B` raw / `23,003 B` gzip | `8,192 B` | documented global program gap; R1 remains zero-runtime |
| R1 listeners/observers/timers/requests | `0` | `0` | zero-runtime boundary | pass |

Final SHA-256 values:

- R1 slice: `e33e96604bd15baae3f56c4a12335b8e78f860905efa7b2c3df33299073f3977`
- Ceramics CSS: `9b79292f5fc0c5ab6026980609f9309dc2e1ccd7d990cdf675a6fe56fb64249c`
- Neutral Web component CSS: `32d498e400d20e1717561773e3a323ac264f62ed497abe020ac9e3e18979a854`
- shared runtime: `0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`

Webflow and Shopify Ceramics CSS copies are source-identical.

## Remaining Human And Target Gates

1. The first production target must prove actual records, provenance,
   localization, revisions, rights, applicability, measurements and claim
   review under R0.
2. Production media needs a certified raw/fired/editorial direction plus crop,
   alt, loading, fallback and rights policy.
3. Shopify remains planned until a concrete template, source/editor mapping,
   limits, authoritative order, relationships and localization are approved.
4. Final spacing, type, density, media size, tracks, boundaries and
   Mobile/Tablet/Desktop/XL visuals require owner review.
5. R1-specific design evidence or explicit approval of the repository render
   remains required.

R1-A is ready for human stability review, not `stable`.
