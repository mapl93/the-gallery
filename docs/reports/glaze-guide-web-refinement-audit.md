# Glaze Guide Web Refinement Audit

Date: 2026-08-11

Evidence batch: 111; decision reconciliation: 160

Component: R2 `glaze-guide`

Status: ready for explicit human review; remains `pilot`

## Outcome

Glaze Guide is now a passive target-owned reference collection with valid
conditional root semantics, a native list of complete sample figures, textual
identity independent of color, and optional explicitly featured reference
detail. Exhibit and Studio consume one renderer and fixture; layout responds to
the actual host width; neutral runtime is zero; and Mobile, Tablet, Desktop, XL
plus special-mode evidence passes.

Owner decisions 54 and 56 confirm `R2-A` as the permanent neutral identity. The
component no longer simulates a selected glaze through local React state,
click handlers or `button[aria-selected]` inside a list. It does not decide
whether R2 itself is a product choice, filter or navigation surface. Purchasable
selection composes canonical Radio or Variant Selector outside R2 and the
product target owns its complete eligibility/state/validation contract.

R0 assigns glaze records, formulas, claims, rights and applicability to targets.
Real media/record proof, Shopify mapping and final visuals remain target/human
gates. The contract stays `pilot`; human review is required before promotion.

## Certification Summary

| Area | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive glaze reference only; not a data schema, choice control, product mapper, chemistry/safety authority, filter or service. |
| Anatomy and composition | pass | Conditional section/div, native `ul > li > figure > figcaption`, visible names/codes, optional named article/media/native `dl`. |
| Required/optional content | pass | Missing required samples produces zero roots; title, code, detail, media and fact groups omit independently. |
| States and modes | pass for neutral scope | Passive default only; hover and click leave DOM/border unchanged; no neutral value, focus, selection, announcement or synchronization. |
| Tokens and CSS | pass | Existing semantic tokens, logical geometry, intrinsic auto-fit grids, private measures, no R2 viewport query or Studio-only layout override. |
| Accessibility | pass | Named section when titled, generic div otherwise, native collection/figures/article/dl, visible identity, useful visual/media alternatives and no incomplete widget roles. |
| Responsive/content resilience | pass | Four paired natural viewports plus `200/320/430/680px`, minimal sample, RTL, long/unbroken, effective 200% type and user spacing with zero overflow. |
| Runtime/performance | pass for R2/Ceramics | Zero neutral R2 runtime; Ceramics remains `948 B` below its family ceiling; neutral runtime is byte-identical. |
| Exhibit/Studio parity | pass | Exact DOM hash `99c2136c` and computed-style hash `8576dafe` at the same `620px` host. |
| Targets | Web implemented; others bounded | Web, Webflow and Shopify CSS projections validate; target-native Shopify records/editor/product-option implementation remains planned. |
| Human review | required | Production records/claims/media, Shopify mapping, final visuals and R2-specific design evidence remain; passive identity is resolved. |

## Anatomy, API, And Behavior

The `0.2.0` target-agnostic contract exposes three semantic properties:

| Property | Type | Requirement | Behavior |
| --- | --- | --- | --- |
| `title` | string | optional | Visible contextual heading; a non-empty value selects named native-section semantics. |
| `swatches` | slot | required non-empty | Target-owned native passive sample collection; absence omits the complete root and implies no record/widget shape. |
| `detail` | slot | optional | Explicitly featured/reference passive article; no selected relationship or synchronization implied. |

The verified default fixture contains:

- one native `SECTION`, no explicit role/tabindex, correctly named by its
  visible H2 through `aria-labelledby`;
- one direct native `UL` with no explicit role and three direct `LI` items;
- exactly one direct passive `FIGURE.glaze-swatch` in every item, each with a
  native `FIGCAPTION`, visible name and target-formatted code;
- three sample surfaces exposed as images with non-empty appearance names, so
  hue is not the only description;
- one direct native `ARTICLE.glaze-detail`, named by `Ash white reference`;
- one complete `1800x2700` editorial image with a truthful non-empty alternative
  and loaded natural width;
- one native `DL` with three direct grouping `DIV`s, each containing exactly
  one `DT` and one `DD`;
- zero grid/listbox/option/radiogroup/radio roles, selection attributes,
  focusable descendants, live regions or scripts inside R2.

When title is blank, the valid collection becomes a generic `DIV`, emits no
`aria-labelledby`, and omits header/title. Removing optional detail keeps the
samples and produces no blank detail reservation. Removing required samples
produces zero R2 roots.

The browser-projected minimal stress case contains one `LI > FIGURE` with visual
and visible name but no code/detail. It remains complete at a `320px` root with
zero overflow. Renderer source filters incomplete key/name/visual records before
emitting the collection.

## Passive Boundary And Future Selection

Default R2 owns no controlled/uncontrolled value, event, selected index,
destination, focus manager, request, result, form field, persistence or live
region. Hover leaves the sample boundary unchanged at
`rgb(229, 229, 229)`; clicking the passive figure changes neither DOM nor
selection count.

ADR 0202 records the passive neutral renderer. ADR 0083's legacy
`.glaze-swatch[aria-selected="true"]` rule remains a target projection hook,
not a neutral state contract.

When a product offers mutually exclusive glaze choice, a separate target
composition uses canonical Radio/native radios or Variant Selector and defines:

- visible group label plus native `name` and stable option values;
- `checked`/`defaultChecked`, controlled/uncontrolled ownership and change event;
- disabled, required, validation and form-submission behavior;
- native/APG Space and arrow-key behavior plus visible focus;
- mapping from selected value to detail, missing-record behavior, announcements
  when necessary, persistence and analytics.

A listbox is a separate alternative only when the intended product is truly an
option-list widget and implements named listbox/options, managed focus and its
complete selection keyboard model. No current evidence authorizes either mode.

## Accessibility

The visible sample name is always present and remains authoritative even when a
visual appearance label or code is supplied. The fixture visual descriptions
identify appearance; the editorial detail alternative describes the actual
photograph rather than calling it a glaze test tile.

The optional detail article resolves its accessible name to a visible heading.
Every fact remains a native complete term/value pair. There are no fake buttons,
ARIA list roles, option roles, selected attributes, tab stops or live updates.

Measured text contrast ratios:

| Mode | Title/name/detail heading/term | Code/detail value |
| --- | ---: | ---: |
| Light | `17.93:1` | `7.81:1` |
| Dark | `17.18:1` | `12.09:1` |

Forced colors preserves `1px solid` sample/detail boundaries and zero
focusables. Reduced-motion inspection finds zero active R2 motion parts.

## Responsive And Extreme Content

Natural Mobile, Tablet, Desktop and XL captures pass for Exhibit and Studio.
The intrinsic sample collection uses two columns in the `358px` Mobile host,
three in the natural Desktop Exhibit host, and up to four in wider Tablet/XL
hosts. Detail stacks on narrow hosts and retains its existing two-part Desktop
presentation when its private minimum fits. Every natural case has zero root,
part and document overflow.

Forced `200/320/430/680px` roots resolve to `1/1/2/3` sample columns with grid
widths `168/288/398/648px`. Long localized RTL and unbroken content at `200px`,
effective 200% text at `320px`, and user text spacing at `320px` grow content
without clipping, clamping or overflow.

Candidate evidence initially found `3px` natural and `16px` RTL overflow in the
detail fact grid at `200px`, because a fixed term column left the value with
0–11px. Each semantic fact group now stacks its term/value internally. The
final extreme case has zero part overflow and preserves every character.

## Tokens, CSS, And Composition

R2 owns public token references for:

- text/boundary: primary/secondary text, subtle/default/focus boundaries and the
  preserved target selected-boundary token;
- typography: heading/body families, H2/H3/body-small/caption sizes, line
  heights and accepted semantic weights;
- geometry: full/sample, detail-image and detail-container radii plus container,
  section, grid, element and target touch spacing.

Transitions/easing and passive transform were removed. Pointer, hover and focus
rules are scoped to explicitly interactive target roots; the passive figure
does not consume them. The selected color remains only because ADR 0083 keeps
the target hook.

Physical geometry and raw rhythm values were replaced with logical properties,
token-derived private composition values and complete wrapping. Sample minimum,
detail minimum (`13rem`), detail padding and local text gaps remain private
because consumers do not coordinate them cross-target. Native list, figure and
description-list defaults are visually reset without removing semantics.

`GlazeGuideArtwork` plus `buildGlazeGuideFixture` is the single R2 runtime path
for Exhibit and Studio. React and fixture gradients/editorial media remain docs
consumer concerns; base contract/CSS have no framework or asset dependency.

## Exhibit And Studio Parity

At a forced `620px` root width:

- normalized DOM hash: `99c2136c` in Exhibit and Studio;
- computed-style hash: `8576dafe` in both;
- serialized subtree length: `2,467` characters in both;
- sample grid: three `174.66–174.67px` columns across `588px` in both;
- detail: `588px × 445.5px` in both;
- root, widest part and document overflow: zero in both.

The static MDX documents the same native classes/anatomy. Visible Exhibit and
Studio use the shared renderer and fixture, not separate arrays or behavior.

## Cross-Target Translation

| Target | Result / boundary |
| --- | --- |
| Neutral Web | Implemented with conditional native section/div, `ul/li/figure/figcaption`, optional named article/media/dl, intrinsic Ceramics CSS and zero R2 JavaScript. |
| Shopify | CSS projection validates. Passive Liquid/schema remains planned until source/editor/claims/localization/consumer approval; product-option selection composes Shopify/native product controls outside R2. |
| Webflow | Copied Ceramics CSS is source-identical; CMS mapping must preserve collection/figure/text/media/fact semantics. |
| React/Angular | Thin passive renderer accepts semantic children/slots; future selector composes canonical Radio and declares value/event ownership. |
| Figma | Future work separates passive reference from selectable-control variants; generic registered Button/Studio nodes are not R2 approval. |
| SwiftUI/Compose/future | Use native passive collections for references or native single-choice controls for an approved selector; never port button-plus-selected ARIA literally. |

No target adapter API appears in canonical R2 source, and no Shopify Liquid,
record schema, product mapping or runtime was invented.

## Automated And Browser Verification

Passing structural gates before/following implementation:

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run audit:previews:static`
- `npm run build:components`
- `npm run build:adapter:web:components`
- `npm run build:adapter:shopify:components` (known repository maturity warnings only)
- `npm run audit:exhibit-studio` (`183/183` structurally shared; interaction coverage `183/183`)
- `npm run audit:components` (`183/183` automated pass; no stability promotion)
- `npm run audit:refinement` (`183` dossiers; `174` ready for human review after reconciliation)
- production Vite build to `/tmp/the-gallery-site-batch-111-final`
- `npm run evidence:cleanup`
- `npm run evidence:assert-clean`

No command writes `site/dist`.

Evidence under `output/playwright/refinement-batch-111/` contains four before
images, eight paired natural after images, eight special after images, the
executable probe and `evidence-summary.json`.

The first evidence attempt stopped after a Reset automation action did not
return. It was explicitly terminated; the browser/server were closed; cleanup
and assert-clean passed before retry. Fresh navigations replaced Reset. Candidate
evidence then exposed the real extreme fact-grid overflow and was closed before
source correction. The final short phases used one fixed-port server, one
explicit headless Chromium session, one tab and sequential navigation. Final
`evidence:assert-clean` passes.

## Performance

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| R2 CSS slice | `2,666 B` raw / `915 B` gzip | `4,066 B` raw / `1,009 B` gzip | observation baseline | source SHA remains byte-identical to evidence batch 111 |
| Ceramics CSS | `25,812 B` raw / `4,407 B` gzip | `33,605 B` raw / `4,847 B` gzip | `5,427 B` | pass; `580 B` headroom after later R-family work |
| Neutral Web component CSS | `515,644 B` raw / `69,807 B` gzip | `536,847 B` raw / `72,913 B` gzip | `65,536 B` | documented global program gap; not attributed to R2 |
| Shared neutral runtime | `53,811 B` raw / `10,565 B` gzip | `117,741 B` raw / `23,003 B` gzip | `8,192 B` | documented global program gap; R2 remains zero-runtime |
| R2 listeners/observers/timers/requests | local React selection/click fixture | `0` neutral/component runtime | zero-runtime boundary | pass |

Final SHA-256 values:

- R2 slice: `2980c7e8d73776044adfb4ba746b81ea4412fa6d7e15ac496c6f5eb4f1ca767e`
- Ceramics CSS: `9b79292f5fc0c5ab6026980609f9309dc2e1ccd7d990cdf675a6fe56fb64249c`
- Neutral Web component CSS: `32d498e400d20e1717561773e3a323ac264f62ed497abe020ac9e3e18979a854`
- shared runtime: `0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`

Webflow and Shopify Ceramics CSS copies are source-identical.

## Remaining Human And Target Gates

1. Production records must prove provenance, localization, revisions,
   compatibility, formulas/firing facts and reviewed safety/food-contact claims.
2. Production sample media needs certified color management, visual identity,
   crop, alternatives, fallback and disclosure.
3. Shopify passive content mapping remains planned; purchasable selection is a
   separate product-control composition outside R2.
4. Final alignment, sample geometry, tracks, spacing, featured detail and
   responsive visuals require owner review.
5. R2-specific design evidence or explicit repository-render approval remains.

R2-A is ready for human stability review, not `stable`.
