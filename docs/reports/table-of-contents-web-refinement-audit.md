# Table of Contents Web Refinement Audit

Status: Human-review-ready; remains `pilot`

Date: 2026-07-19

Component: Table of Contents (`L5`, dependency order `119`)

Accepted direction: owner response 49 and ADR 0270

## Outcome

Table of Contents is now one passive, fail-closed, always-named native
same-document navigation rendered from target-supplied ordered nested heading
records. It composes canonical Links, exposes optional controlled
`currentSectionId`, and exposes `placement: sticky | flow` with a safely
degrading sticky default.

The implementation validates stable unique record ids and non-empty labels,
preserves real nested ordered-list hierarchy, projects at most one truthful
`aria-current="location"`, and keeps static navigation complete when no current
section is supplied. L5 adds no parser, observer, listener, polling loop,
heading generator, state store, smooth scrolling, focus relocation, asset, or
runtime.

Exhibit and Studio use the same `TableOfContentsArtwork`, fixture records,
property values, canonical Link classes, CSS, and behavior. Contract and Studio
metadata advance to `0.3.0`; stability remains human-gated.

## Refinement Rubric

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Long-document overview and native fragment navigation only; no site menu, parser, page shell, or reading store. |
| Anatomy and composition | pass | Named native `nav`, optional neutral title, native nested `ol/li`, canonical Links from validated records. |
| Variants, sizes, and states | pass | One intrinsic size; sticky default, explicit flow, safe mobile/short fallback, controlled current/static/unmatched states. |
| Public API | pass | Required `label`/`items`; optional `title`/`currentSectionId`; semantic `placement`; no observer, offset, breakpoint, or visual internals. |
| Controlled/uncontrolled | pass | Optional current state is controlled-only; L5 has no uncontrolled mode or state store. |
| Tokens and values | pass | Existing semantic border/text/type/radius/spacing/touch tokens; private current border and safe sticky offset. |
| Accessibility | pass | Named landmark, real hierarchy, native fragment Links, zero/one location current, visible focus, forced colors, reflow, no custom widget/live semantics. |
| Sticky safety | pass for neutral base | Wide/tall sticky is bounded and internally scrollable; mobile/short/flow remain static; final real Header integration is target-owned. |
| Responsive/content | pass | Eight natural surfaces plus 200px RTL/unbroken, effective 200%, text spacing, and viewport-taller list have zero unintended overflow. |
| Runtime/performance | pass for L5/Blog | Zero L5 runtime; Blog stays 399 B below its fixed gzip ceiling. Existing program gaps remain documented. |
| Cross-target translation | pass / explicit target gate | Web implemented; Shopify requires structured records plus matching ids or verified preprocessing before exposure. |
| Exhibit/Studio parity | exact | Equal 400px DOM hash `3c0e99de` and selected-style hash `4bf82dfe`. |
| Human review | pending | Visual art direction, real article/Header context, first shared reading-state consumer, L5-specific Figma, and stability approval. |

## Certified Neutral Boundary

- Required data is a non-empty localized `label` plus one or more valid records.
  Every record has non-empty unique id, non-empty label, and optional valid
  children. Invalid required data omits the complete root.
- The shared renderer emits native `nav`, `ol`, `li`, and
  `a.link.link--nav.toc__link[href]`. It adds no redundant role/tabindex or
  menu/tree/disclosure semantics.
- Record order and nesting become actual list order and nesting. The target must
  supply headings with matching unique ids from the same source.
- Optional `currentSectionId` is controlled target truth. A valid match
  serializes the id on the root and gives exactly one Link
  `aria-current="location"`; blank or unmatched values mark none.
- A capable target may derive current id through the same reading-state service
  consumed by Reading Progress. L5 owns no second measurement mechanism.
- `placement` changes presentation only. Sticky and flow preserve identical DOM,
  source order, canonical Links, labels, and current state.
- Neutral sticky applies only at a sufficiently wide/tall viewport, uses a
  private safe-area-aware offset, bounds itself to remaining dynamic viewport
  height, and preserves focused-link reachability through internal scrolling.
- The target adapter still owns real fixed-header offset, containing layout,
  collision, section scroll margins, and final focus-not-obscured proof.

## Public API

| Property | Contract | Mapping |
| --- | --- | --- |
| `label` | required non-empty localized string | `aria-label` on native `nav`; blank omits root. |
| `title` | optional localized string | Visible neutral `.toc__title`; blank omits title only. |
| `items` | required ordered nested records | Nested lists and canonical Links; invalid/duplicate records omit root. |
| `currentSectionId` | optional controlled stable id | Root `data-current-section-id` plus one matching `aria-current="location"`; blank/unmatched marks none. |
| `placement` | `sticky | flow`, default `sticky` | `.toc--sticky` preference or classless explicit flow. |

No public property exposes heading selector, parser, observer threshold, polling,
breakpoint, header offset, maximum height, indentation, border width, scroll
behavior, focus policy, or animation.

## Visual, Accessibility, And Interaction Evidence

Batch 154 proves:

- one named `NAV`, two native ordered lists with the nested list inside its
  parent item, four canonical unique fragment Links, and four native focus stops;
- zero explicit widget role, root tabindex, live region, selected/expanded
  semantics, or hidden duplicate control;
- initial `currentSectionId="article-repetition"`, a nested match at
  `article-pressure`, and safe zero-current behavior for blank/unmatched ids;
- blank label, empty records, blank record, duplicate id, and `#`-prefixed id
  omit the root; blank optional title retains a named complete root;
- default wide/tall positioning is sticky with bounded `overflowY:auto`;
  explicit flow, mobile, and short viewport are static;
- a `1,516px` viewport-taller sticky list has `882px` available internal scroll;
  focusing its last Link scrolls to `882px` and leaves the Link fully visible;
- native Tab order follows all four Links with a `2px solid` focus outline;
  native fragment activation produces `#article-repetition` and finds the
  supplied matching heading;
- eight Exhibit/Studio viewport combinations have zero root, Link, and document
  overflow; 200px deep localized RTL/unbroken content, effective 200% at 320px,
  and text spacing also remain at zero overflow;
- light title/link/current contrast is `17.93:1`, `7.81:1`, and `5.88:1`;
  dark equivalents are `17.18:1`, `12.09:1`, and `9.95:1`;
- forced colors preserves system current border/color plus visible focus;
  reduced-motion Link durations are all `0s` and L5 has no animation;
- console warnings/errors and page errors are empty.

Screenshots and machine results are retained in
`output/playwright/refinement-batch-154/`. Historical before captures remain in
`output/playwright/refinement-batch-105/before/`.

## Cross-Target Result

- Neutral Web validates all 183 component contracts and contains the canonical
  Blog CSS, Link dependency, record/state/placement contract, and zero L5
  runtime.
- Webflow and Shopify Blog CSS copies are byte-identical to canonical source.
- Shopify remains intentionally `planned` / `css-ready`. Native Article content
  is formatted HTML, not a nested heading/id data model. A target may expose L5
  only when its article source supplies both records and matching ids, or when
  verified preprocessing emits both atomically.
- Shopify must not substitute an arbitrary menu, parse merchant HTML in neutral
  source/Liquid, invent independent ids, or create a second observer. Its first
  article owner maps placement and any shared L4/L5 reading state.
- React/Angular remain thin controlled renderers; Figma, SwiftUI, and Compose
  translations are documented without coupling the neutral contract to them.

## Automated Validation

- `npm run validate:docs`: pass; 183 registry components, contracts, Studio
  definitions, and MDX pages align.
- `npm run validate:contracts`: pass; 183 contracts.
- `npm run validate:studio`: pass; 183 definitions and 1,022 semantic
  properties.
- TypeScript `--noEmit`: pass.
- Neutral Web adapter: pass; 183 components and 19 CSS sources.
- Shopify adapter: pass; 183 components, 90 target-ready, 60 dedicated Liquid
  templates, and 34/34 schema-ready; existing unrelated warnings remain.
- Canonical Blog CSS equals Webflow and Shopify copies.
- Browser evidence: zero failures, one tab, session closed, pre-existing server
  preserved, and evidence resource gate clean.
- Tracked `site/dist` was not rebuilt.

Static preview, structural readiness, Exhibit/Studio program parity, temporary
production build, final diff/JSON validation, and matrix regeneration are
included in the batch closure below.

## Performance

| Surface | Current | Ceiling | Result |
| --- | ---: | ---: | --- |
| L5 CSS slice | `2,025 B` raw / `750 B` gzip | component observation | zero runtime |
| Blog CSS | `28,699 B` raw / `5,130 B` gzip | `5,529 B` | pass; `399 B` headroom |
| Neutral component CSS | `534,805 B` raw / `71,925 B` gzip | `65,536 B` | documented gap `6,389 B` |
| Shared runtime | `117,741 B` raw / `22,807 B` gzip | `8,192 B` | documented gap `14,615 B`; L5 delta `0 B` |

Final hashes:

- L5: `748ff838c71471c43e59ee6684bc8bb92922578e96497d09a6d1f4a96b049df8`
- Blog: `bb1a4ab914c1f07cbd00f182ca1a44d3b8c12149f89bec5bf13b1546f3e1d9ea`
- Neutral CSS: `a2186c279799159abcae60066a90718f4a86f85046434e653a45de586ee7c687`
- Runtime: `0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`

The performance program reports 18 surfaces, 11 pass, seven documented gaps,
and zero undocumented gaps. L5 remains inside its family budget and adds no
runtime.

## Risks And Human Review Gates

1. Approve retained surface, border/radius, title/link typography, rhythm,
   marker suppression, nested inset, and current-location treatment.
2. Validate sticky and flow inside the first real article layout with actual
   Header/safe-area offset and localized viewport-taller content.
3. Confirm the first target source of `currentSectionId`: static target state or
   the shared Reading Progress reading-state service.
4. Supply or approve L5-specific page-context Figma evidence; historical
   registered nodes are generic shells.
5. Shopify target readiness waits for structured article records and matching
   ids or verified preprocessing.
6. Existing global Neutral CSS/runtime budget gaps remain program debt unrelated
   to L5.

## Readiness Decision

`human-review-ready`. The accepted record model, controlled state, sticky/flow
placement, canonical Link composition, fail-closed behavior, semantics,
accessibility, responsive/extreme content, performance, cross-target
translation, exact Exhibit/Studio parity, and final evidence are complete.
Contract stays `pilot`; no `stable` promotion was made.
