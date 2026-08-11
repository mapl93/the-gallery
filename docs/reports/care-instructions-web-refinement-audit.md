# Care Instructions Web Refinement Audit

Date: 2026-08-11

Batch: 113

Component: R4 `care-instructions`

Status: ready for explicit human review; remains `pilot`

## Outcome

Care Instructions is now a passive, target-authored native guidance list. A
titled instance is a named section, an untitled instance is a generic root, and
invalid or empty required items fail closed. Each instruction remains complete
in visible text; optional icons are redundant presentation; and Default, Do and
Don't alter only supporting icon color rather than creating false state.

Exhibit and Studio consume one renderer and fixture. Canonical CSS owns the
intrinsic one/two/three-column response, complete wrapping, semantic type and
special-color boundary. R4 has no controlled value, interaction model, focus
behavior, motion or runtime. Paired Mobile, Tablet, Desktop and XL evidence,
special modes and same-host parity pass.

Owner decision 58 confirms one homogeneous neutral, recommended, or avoid tone
per instance. Recommended and avoid guidance compose separate canonical R4
instances rather than mixed per-item tone. Stable values remain
`default | do | dont`; targets may display friendlier localized vocabulary such
as Recommended/Avoid. Legal or safety warnings use separately reviewed rich
content or canonical Alert and are never inferred from tone.

R4 does not define product-care truth, applicability, safety/legal review,
revision or recall lifecycle, standardized symbols, acknowledgement or Shopify
records. Those production-target proofs, final visual values, R4-specific
design evidence and explicit human review remain open. The contract stays
`pilot` and is not promoted to `stable`.

## Certification Summary

| Area | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive concise guidance only; not checklist, alert, choice, validation, disclosure or workflow. |
| Anatomy and composition | pass | Conditional section/div, direct `ul[role=list] > li`, optional decorative icon, required visible label and optional detail. |
| Required/optional content | pass | Blank title omits header and landmark; incomplete peers filter; no valid items emits no root. |
| States and modes | pass for neutral scope | Default/Do/Don't are visual root treatments only; no selected/checked/completed/error state or controlled strategy. |
| Tokens and CSS | pass | 19 existing public tokens, two private composition variables, logical geometry, named container and no Studio layout override. |
| Accessibility | pass | Native list relationship, complete visible wording, redundant icons hidden, no color-only meaning, widgets, focus or live regions. |
| Responsive/content resilience | pass | Four paired natural viewports plus `200/320/430/680px`, one item, RTL, unbroken, effective 200% and user spacing with zero overflow. |
| Runtime/performance | pass for R4/Ceramics | Zero R4 runtime; R4 CSS remains byte-identical to Batch 113; current Ceramics retains `569 B` gzip headroom. |
| Exhibit/Studio parity | pass | Shared renderer/fixture; exact normalized DOM/style hashes and geometry at `620px`. |
| Targets | Web implemented; others bounded | Web/Webflow/Shopify CSS projections validate; target-native Shopify records/editor remain planned. |
| Human review | required | Production content/review proof, symbols, first Shopify consumer, final visuals and R4-specific design evidence remain open. |

## Anatomy, API And Behavior

The `0.2.0` target-agnostic contract exposes three semantic properties:

| Property | Type | Requirement | Behavior |
| --- | --- | --- | --- |
| `title` | string | optional | Visible contextual heading; non-empty value selects a named native section. |
| `items` | slot | required non-empty | Target-owned complete care instructions with optional detail and redundant decorative support. |
| `variant` | enum | optional, default `default` | `default`, `do` or `dont` supporting treatment for one homogeneous group. |

The verified default fixture contains:

- one native `SECTION` with no explicit role/tabindex and a direct `HEADER > H2`
  relationship through `aria-labelledby`;
- one direct `UL` carrying `.care-instructions__list`, the compatibility class
  `.care-instructions__grid`, and `role="list"`;
- three direct native `LI.care-item` children;
- one redundant Lucide SVG inside an `aria-hidden="true"` wrapper per item;
- one required visible label paragraph and one optional explanation paragraph
  per full fixture item;
- zero widget roles, state attributes, focusables, live regions or scripts.

The shared cautious fixture says to follow the piece-specific care card,
confirm appliance use against the piece record and ask the maker before
abrasive, chemical or repair treatments. It intentionally makes no universal
dishwasher, microwave, food-contact, heat, impact or finish claim.

Blank title produces a generic `DIV` with no dangling label or header. Removing
required items produces zero R4 roots. The renderer filters blank keys or labels
and omits optional icons/descriptions without reserving empty geometry. Studio's
required items toggle remains checked and disabled.

## Passive Boundary And Variants

R4 owns no value/default value, selected, checked, acknowledged, completed,
dismissed, current, error, warning, request, timer, persistence, announcement,
navigation or analytics state. Browser inspection records cursor `auto`; hover
and click leave markup/state unchanged.

Variant inspection resolves the same DOM/state model in all cases:

| Variant | Root class | Supporting icon color |
| --- | --- | --- |
| Default | `.care-instructions` | `rgb(82, 82, 82)` |
| Do | `.care-instructions--do` | `rgb(16, 185, 129)` |
| Don't | `.care-instructions--dont` | `rgb(239, 68, 68)` |

Visible authored copy must say what is recommended or discouraged. Color and
icon cannot carry unique meaning. Legacy `.care-item--do` and
`.care-item--dont` remain compatibility selectors, not a mixed-record API.

Decision 58 requires one homogeneous tone per instance. A combined Do/Don't
presentation uses separate canonical Care Instructions instances. Public
semantic values remain stable for target compatibility, while targets may use
friendlier localized visible labels. Legal or safety warnings remain separate
reviewed rich content or canonical Alert composition.

Acknowledgement, choices, warnings or task completion require separately
accepted composition with canonical Checkbox, Radio, Button, Alert, Form or
another truthful behavior component.

## Accessibility

Native unordered-list semantics expose the related collection even when CSS,
grid and icons are unavailable. `role="list"` preserves current list exposure
when visual markers are reset. Items remain understandable from text alone and
decorative icons are excluded from accessible names.

Measured text contrast:

| Mode | Title/label | Description |
| --- | ---: | ---: |
| Light | `17.93:1` | `7.81:1` |
| Dark | `17.18:1` | `12.09:1` |

Forced colors preserves `1px solid CanvasText` root/header boundaries and a
readable icon. There are zero focusable descendants. Reduced-motion inspection
finds zero active R4 motion parts.

## Responsive And Extreme Content

Natural Mobile, Tablet, Desktop and XL captures pass in Exhibit and Studio.
Mobile resolves one column. Tablet, Desktop and XL resolve three visible
columns in the tested hosts. All natural cases have zero root, part and document
overflow.

Forced direct roots resolve as follows:

| Root | Actual root | Columns | Height | Overflow |
| ---: | ---: | ---: | ---: | ---: |
| `200px` | `198px` | 1 | `734px` | 0 |
| `320px` | `318px` | 1 | `554px` | 0 |
| `430px` | `428px` | 2 | `446px` | 0 |
| `680px` | `678px` | 3 | `278px` | 0 |

The grid uses the actual component width rather than viewport or consumer mode.
Collapsed `0px` auto-fit tracks are excluded from the visible-column count.
One label-only item collapses to one complete row without empty icon/detail
space. Localized RTL plus unbroken text at `200px`, effective 200% text and user
text spacing at `320px` grow without clipping, overlap or overflow.

## Tokens, CSS And Composition

R4 consumes 19 reviewed public token references for primary/secondary text,
subtle border, feedback colors, heading/body typography, radius and layout
spacing. Private `--_care-icon-size` and `--_care-small-gap` coordinate local
composition only. The `8.75rem` minimum visual track and `1px` boundaries remain
implementation geometry, not semantic API.

Raw calculated type was replaced with body/body-small and accepted weight/line
height tokens. Physical geometry was replaced with logical properties,
`min-inline-size: 0`, `overflow-wrap: anywhere`, native list reset and a named
container. Studio's R4-specific margin/grid correction was removed.

`CareInstructionsArtwork` plus `buildCareInstructionsFixture` is the single
R4 rendering path used by Exhibit and Studio. React and Lucide remain docs-site
consumer concerns; neither appears in the target-agnostic contract or CSS.

## Exhibit And Studio Parity

The shared renderer serializes identical DOM from the same fixture. Natural
Mobile and Tablet geometry is exact across modes. Desktop and XL hosts differ by
workspace design, not component implementation.

An unnormalized diagnostic found only one host presentation difference: the
Studio docs wrapper resolves its existing `cqi` margin differently. With the
same public host tokens and a `620px` root, both modes produce:

- DOM hash `917feb46`;
- style hash `d3ccb922`;
- `618px` component root;
- `586px` native list;
- three visible tracks;
- zero overflow.

Static parity audit confirms one registered renderer and fixture rather than
separate Exhibit/Studio implementations.

## Cross-Target Translation

| Target | Result / boundary |
| --- | --- |
| Neutral Web | Implemented with conditional section/div, native `ul/li`, complete text, optional decorative icons, intrinsic CSS grid and zero R4 JavaScript. |
| Shopify | CSS projection validates. Liquid/schema remains planned until source, applicability, editorial/safety/legal review, localization, blocks/limits and first consumer are approved. |
| Webflow | Ceramics CSS is source-identical; CMS records should map to native unordered items with target-owned claims. |
| React/Angular | Thin passive renderer accepts semantic records/children; data and icon layers own lifecycle and presentation. |
| Figma | Future component models optional title, repeated item, icon/detail options, three treatments and wide/narrow modes; generic registered nodes are not R4 approval. |
| SwiftUI/Compose/future | Use native grouped/list content and keep acknowledgement or task completion separate. |

No target API, content schema, legal status or runtime was invented in canonical
R4 source.

## Automated And Browser Verification

Passing structural/build gates during the R4 refinement:

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run audit:previews:static`
- `npm run build:components`
- `npm run build:adapter:web:components`
- `npm run build:adapter:shopify:components` (known maturity warnings only)
- production Vite candidate and final builds outside `site/dist` (`2473`
  modules in the final build)
- `npm run audit:exhibit-studio` (`183/183` shared visual paths and `183/183`
  interaction classifications)
- `npm run audit:components` (`183/183` automated certification gates; one
  human-approved stable component and `182` pilots)
- `npm run audit:refinement` (`168/183` dossiers and `116/183` ready for human
  stability review after R4)
- `npm run evidence:cleanup`
- `npm run evidence:assert-clean`

All final gates were rerun after this report and matrix entry; no command wrote
`site/dist`.

Evidence under `output/playwright/refinement-batch-113/` remains authoritative
because the current R4 slice is byte-identical. It contains four preserved
before images, eight paired natural after images, eight special after images,
executable probes and `evidence-summary.json`.

The original evidence lifecycle used one fixed-port managed server, one explicit
headless Chromium session, stable session `gallery-refinement` and one tab.
Exhibit, Studio, states and viewports were visited sequentially. Cleanup closed
the owned session and server; final URL is unresponsive, port is free and
`evidence:assert-clean` passes.

Decision reconciliation required no browser rerun: the current R4 SHA exactly
matches Batch 113, the existing captures were visually re-inspected, and the
current global resource gate reports no managed server or Playwright session.

## Performance

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| R4 CSS slice | `1,204 B` raw / `509 B` gzip | `2,445 B` raw / `776 B` gzip level 9 | observation baseline | current SHA remains exact to Batch 113 |
| Ceramics CSS | `28,079 B` raw / `4,521 B` gzip | `34,028 B` raw / `4,858 B` gzip | `5,427 B` | pass; `569 B` current headroom after later R-family refinements |
| Neutral Web component CSS | `517,911 B` raw / `70,002 B` gzip | `537,270 B` raw / `72,254 B` gzip | `65,536 B` | existing documented global gap |
| Shared neutral runtime | `53,811 B` raw / `10,565 B` gzip | `117,741 B` raw / `22,807 B` gzip | `8,192 B` | existing documented global gap; R4 delta `0 B` |
| R4 listeners/observers/timers/requests | `0` | `0` | zero-runtime boundary | pass |

Final SHA-256 values:

- R4 slice: `cea7e4ba66645710a5ef7077ff19b9846f6fa5750c298246bc686c9d9589b697`
- current Ceramics CSS: `6000262b493b7e08354914ec85ad4481999303f2cf6183e2a668c6a4018ab789`
- current Neutral Web component CSS: `60f96d00ec417e28130743564fde1d4fdffc983e1f84012520f47ad306062a3f`
- current shared runtime: `0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`

Webflow and Shopify Ceramics CSS copies are source-identical.

## Remaining Human And Target Gates

1. The first production target must prove R0-owned records, applicability,
   editorial/safety/legal review, revision, localization, recalls and consumer
   association.
2. Production icons need an approved decorative/symbol/pictogram policy,
   catalogue, license, fallback and target mapping.
3. Qualifications, dates, provenance, regulatory disclosure, warnings and
   acknowledgement must prove their separate reviewed composition.
4. Shopify needs a first surface, data source, blocks, limits/order, locale,
   merchant validation and migration.
5. The centered grid, private track, sparse/text-heavy behavior, target-visible
   vocabulary and final responsive visuals require explicit human review or
   R4-specific design evidence.

Care Instructions is prepared for that human stability review. It remains
`pilot`; no `stable` promotion is authorized.
