# Filter Bar Web Refinement Audit

Status: refined implementation candidate; Web/Shopify consumer, final visual,
Figma and explicit human stability review required; remains `pilot`

Date: 2026-07-20

Component: Filter Bar (`L7`, dependency order `122`)

Dossier: [Filter Bar](../refinement/dossiers/filter-bar.md)

## Outcome

The accepted candidate replaces the ambiguous Category Nav with one controlled,
in-place Filter Bar. Single composes the canonical radio-backed Segmented
Control; Multiple composes canonical Checkboxes. One selected-value list is
authoritative and every accepted change requests immediate target query/result
commitment.

There is no Category Nav alias, anchor, `aria-current`, tab/menu role, active
class, duplicate hidden input, custom selection role or neutral query/router
runtime. Exhibit and Studio use the same `FilterBarArtwork`, option fixture and
canonical children.

## Refinement Rubric

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | One concise in-place result filter; not navigation, tabs, a menu, view toggle, facet panel or deferred workflow. |
| Anatomy and composition | pass | Fail-closed native fieldset/legend; ordered options; canonical Segmented Control in Single and Checkbox in Multiple. |
| Modes, states and content | pass | Single/Multiple, empty, selected, disabled, invalid input, long/localized/unbroken, RTL, reduced motion and forced colors covered. |
| Public API | pass | Seven semantic properties plus complete-selection change/commit events; no router, query policy, results, pagination or layout internals exposed. |
| Controlled strategy | pass | One `string-list` projection; unknown values ignored, authored order retained and Single clamps to at most one. |
| Dependencies | pass | Canonical radio-backed Segmented Control and Checkbox own native behavior, focus and checked projection. |
| Tokens and values | pass | Existing semantic tokens plus private `--_filter-bar-*` composition; no new public token or hardcoded public geometry. |
| Accessibility | pass for neutral base | Visible native group name, native controls, Arrow-key Single, Space Multiple, native disabledness, no redundant role or component live region. |
| Responsive/content | pass | Eight natural Exhibit/Studio viewport captures and localized, unbroken and effective-200% stress have zero root/document overflow. |
| Runtime/performance | pass for L7 boundary | Zero neutral runtime; only CSS changes. Existing aggregate Web/family budget gaps remain program debt and are reported separately. |
| Cross-target translation | pass for boundary | Neutral Web target is implemented; Web/Shopify consumers own query/history/results lifecycles. No consumer is invented. |
| Exhibit/Studio parity | exact | Same canonical renderer/fixture; exact root `outerHTML` and same computed style at equal state/container. |
| Human review | required | Final art direction, concrete Web and Shopify query consumers, L7-specific Figma evidence and explicit stability approval remain open. |

## Certified Contract

- Public identity is `filter-bar` / `.filter-bar`; the pre-v1 Category Nav
  slug, selectors and copied target artifacts are removed.
- Required inputs are a visible non-empty label, non-empty native name, at
  least two valid ordered options and controlled `selectedValues`.
- `mode="single"` normalizes to zero or one valid value and composes the
  canonical same-name radio Segmented Control.
- `mode="multiple"` preserves zero or more valid values in authored option
  order and composes canonical Checkboxes.
- Blank label/name or fewer than two valid options omits the entire component.
  Duplicate options are de-duplicated and unknown selected values are ignored.
- Every accepted interaction emits the complete next selection twice at the
  adapter boundary: selection change and immediate commit request.
- The consumer owns query key and encoding, push/replace policy, Back/Forward,
  data work, cancellation, result status/announcement, pagination, focus and
  analytics.

The contract and Studio definition advance to `0.2.0` and remain `pilot`.
`string-list` plus `collection` mapping is now the validated schema vocabulary
for a stable ordered collection projected onto repeated checked controls.

## Accessibility And Interaction Evidence

- The final root is one native `FIELDSET` with one visible `LEGEND`; there are
  no `nav`, anchors, `aria-current`, tablist, menu or live-region descendants.
- Single renders four native radios with at most one checked. Arrow Right moved
  checkedness and focus from the first option to `materials`, emitted the
  complete controlled selection and updated the target-owned query fixture.
- Multiple renders four native Checkboxes. Space on the focused `process`
  Checkbox added it independently and emitted ordered repeated query values.
- Group disabledness made all four inputs disabled. Empty required label and
  empty name each produced zero component roots.
- Empty selection serializes in the docs target as `?topic=`. Reload preserves
  that empty selection distinctly from an absent parameter, which restores the
  fixture default.
- Single selection survived reload; Back restored `materials`; Forward restored
  `process`. All states kept the controlled inspector projection synchronized.
- Forced colors retains a system outline and boundary on selected choices.
  Reduced motion reports `0s` transition duration. RTL, Arabic localization,
  an unbroken Spanish label and effective 200% type all have zero component and
  document overflow.
- The complete browser phase used one headless Playwright session named
  `gallery-refinement`, one tab and one managed server. Final cleanup reports
  the URL unresponsive, port 4173 free, server stopped and browser closed.

## Responsive And Visual Evidence

Eight final natural viewport captures:

- `output/playwright/refinement-blog/filter-bar-0229/filter-bar-exhibit-mobile.png`
- `output/playwright/refinement-blog/filter-bar-0229/filter-bar-exhibit-tablet.png`
- `output/playwright/refinement-blog/filter-bar-0229/filter-bar-exhibit-desktop.png`
- `output/playwright/refinement-blog/filter-bar-0229/filter-bar-exhibit-xl.png`
- `output/playwright/refinement-blog/filter-bar-0229/filter-bar-studio-mobile.png`
- `output/playwright/refinement-blog/filter-bar-0229/filter-bar-studio-tablet.png`
- `output/playwright/refinement-blog/filter-bar-0229/filter-bar-studio-desktop.png`
- `output/playwright/refinement-blog/filter-bar-0229/filter-bar-studio-xl.png`

Special-state captures:

- `filter-bar-multiple-desktop.png`
- `filter-bar-dark.png`
- `filter-bar-forced-colors.png`
- `filter-bar-localized-rtl-reduced-motion.png`
- `filter-bar-extreme-unbroken-mobile.png`
- `filter-bar-200-percent-mobile.png`

Every natural viewport reported zero root and document inline overflow. The
first extreme-content pass exposed internal overflow from a one-line Multiple
label. Canonical CSS now permits normal/anywhere wrapping; the repeated final
probe reports zero overflow. This is a corrected finding, not waived evidence.

## Query And Target Boundary

The docs target deliberately demonstrates repeated ordered query entries such
as `?topic=materials&topic=process`; `topic`, the values and the use of History
API are fixtures rather than Filter Bar defaults. Targets may choose their own
key, encoding and history policy while preserving one controlled selection and
Back/Forward synchronization.

Neutral Web validates the semantic/CSS contract and adds no JavaScript. Shopify
receives the generated canonical CSS and contract metadata, but a real
storefront filter data mapping, URL parameter policy and section-rendering
consumer remain required before target readiness can be claimed.

## Automated Verification

- `npm run validate:contracts`: 183 contracts pass.
- `npm run validate:studio`: 183 definitions, 971 semantic properties, 1,626
  public token references and 30 icon choices pass.
- `npm run validate:docs`: passes with only documented program warnings.
- `npx --prefix site tsc --noEmit -p site/tsconfig.json`: passes.
- `npm run validate:adapter:web`: 183 components and 19 CSS sources pass.
- `npm run validate:adapter:shopify`: 183 components, 84 target-ready, 57
  dedicated Liquid templates and 34/34 schema-ready surfaces pass with the
  pre-existing maturity warnings.
- `git diff --check`: passes.
- `site/dist` was not rebuilt.

## Performance

L7 adds no listener, observer, timer, request, asset or shared neutral runtime.

| Surface | Final gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Neutral Web component CSS | `69,883 B` | `65,536 B` | documented program gap: `4,347 B` |
| Shared neutral runtime | `17,569 B` | `8,192 B` | documented program gap: `9,377 B`; L7 delta is zero |
| Blog family CSS | `5,787 B` | `5,529 B` | documented family gap: `258 B` |
| L7 listeners/observers/timers/requests/assets | `0` | zero-runtime boundary | pass |

The final global audit records 18 surfaces: 10 pass and eight documented gaps,
with zero undocumented gaps. Forms, Layout, Global, Blog, Storytelling and
Marketing remain above their fixed family ceilings. These debts are neither
hidden nor attributed to this zero-runtime composition.

## Risks And Open Decisions

1. Approve final Single/Multiple density, selected surface, radius, wrapping and
   placement against real content and the owner's visual references.
2. Implement and review the first Web consumer, including query encoding,
   history, cancellation, result status, pagination and announcement policy.
3. Implement and review the first Shopify filter source, parameter mapping and
   section-rendering lifecycle.
4. Supply L7-specific Figma/reference evidence; registered generic nodes are
   not visual approval.
5. Decide a product taxonomy ceiling or guidance for when consumers must move
   from Filter Bar to Filter Panel.
6. Existing aggregate CSS/runtime and family budget gaps remain program debt.

## Readiness Decision

`ready-for-human-review`. The neutral semantic, composition, accessibility,
responsive, controlled-state, query boundary, adapter projection, exact
Exhibit/Studio parity and evidence gates are complete. Final visuals, concrete
Web/Shopify consumers, Figma evidence and explicit human approval remain open.
The contract stays `pilot`; no `stable` promotion was made.
