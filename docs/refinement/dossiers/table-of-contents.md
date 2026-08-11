# Component Dossier: Table of Contents

Status: `human-review-ready`

Target reviewed: Neutral Web same-document navigation, Shopify structured
article-source boundary, and future controlled target adapters

Contract: `components/contracts/table-of-contents.contract.json` (`0.3.0`)

Accepted decisions: owner response 49, ADR 0196, and ADR 0270

## Recommendation And Accepted Direction

Define L5 as one passive, always-named native `nav` rendered from target-supplied
ordered nested heading records. Every record requires a stable unique `id`, a
complete localized `label`, and optional `children`; the adapter composes them as
native ordered/nested lists and canonical Links to matching same-document
headings. Invalid, blank, or duplicate required records fail the renderer closed.

Expose optional controlled `currentSectionId`. A valid match alone receives
`aria-current="location"`; blank or unmatched state marks no Link. Capable
targets may derive the id from the same bounded reading-state service used by
Reading Progress, but L5 never creates another parser, observer, listener,
polling loop, or store.

Expose semantic `placement: sticky | flow`, defaulting to `sticky`. Sticky is a
preference that becomes bounded sticky positioning only in a sufficiently wide
and tall viewport. Narrow, zoomed, short, or target-incompatible contexts remain
in normal flow. The target owns real fixed-header/safe-area offset, containing
layout, collisions, and focus-not-obscured proof.

This direction is implemented and evidenced. L5 is ready for human visual
review, remains `pilot`, and is not automatically `stable`.

## Purpose, Uses, And Limits

- Gives readers an overview of one long structured document and direct native
  navigation to its major sections and subsections.
- Applies when the document has stable headings and destinations; omit it for
  short, unstructured, or effectively infinite content.
- Is not site navigation, a category filter, menu, tree, tabs, breadcrumbs,
  related content, article pagination, or Reading Progress.
- Does not own the page/article, heading rank, source trust, CMS schema,
  localization, route, fixed header, safe area, section scroll margin, focus
  policy, history, analytics, or SEO.
- Does not parse rich HTML, infer heading importance, generate/mutate ids,
  repair duplicate ids, rewrite content, smooth-scroll, relocate focus, or
  announce continuous position changes.
- Adds zero L5-owned JavaScript, assets, listeners, observers, timers, requests,
  layout reads, or motion.

## Repository Baseline And Refinement Delta

The first L5 refinement established a required named `nav`, actual nested
ordered lists, canonical Links, optional truthful `aria-current="location"`,
logical CSS, one shared renderer/fixture, and zero runtime. It still exposed
`variant: default | sticky`, defaulted to flow, accepted an opaque item slot,
and left Shopify data, current-state API, and shared reading-state ownership as
open decisions.

The accepted reconciliation now:

- replaces `variant` with `placement: sticky | flow`, default `sticky`;
- validates target-owned records recursively and fails closed for blank or
  duplicate identifiers, blank labels, or malformed children;
- encodes record ids into native same-document fragment Links;
- exposes optional controlled `currentSectionId` on the root and projects one
  matching `aria-current="location"` Link;
- safely degrades sticky to flow in narrow and short viewports while bounding
  tall sticky content to available dynamic viewport height;
- preserves the last Link's native focus visibility and internal reachability
  in a viewport-taller list;
- keeps the real header/safe-area offset as a private adapter integration fact;
- uses the same records, renderer, API values, CSS, and canonical Link
  implementation in Exhibit and Studio;
- records Shopify's structured-source/preprocessing requirement as an accepted
  data-availability gate rather than an unresolved neutral architecture choice.

## Standards And Mature-System Evidence

| Source | Evidence | The Gallery direction |
| --- | --- | --- |
| [HTML `nav`](https://html.spec.whatwg.org/dev/sections.html#the-nav-element) | `nav` represents major links to pages or parts within a page. | Use one native named navigation landmark; no redundant role. |
| [WAI G64](https://www.w3.org/WAI/WCAG22/Techniques/general/G64) | A TOC reflects document hierarchy/order and links to corresponding sections. | Require matching labels, nested order, and unique fragment destinations. |
| [WAI content structure](https://www.w3.org/WAI/tutorials/page-structure/content/) | Native lists and nested lists expose sequence and hierarchy. | Use real nested `ol/li`; indentation alone is insufficient. |
| [WAI-ARIA `aria-current`](https://www.w3.org/TR/wai-aria-1.2/#aria-current) | `location` identifies one current location in a related set. | Project exactly one controlled match; blank/unmatched state marks none. |
| [APG Link](https://www.w3.org/WAI/ARIA/apg/patterns/link/) | Native `a[href]` provides expected Tab, Enter, and navigation behavior. | Compose canonical Link; add no menu/tree keyboard model. |
| [WCAG Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | Author-created sticky content must not entirely hide focused content. | Bound tall sticky content, preserve focus reachability, and require target offset/collision proof. |
| [WCAG Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | Ordinary content should reflow without two-dimensional page scrolling. | Use logical nesting, complete wrapping, and narrow/zoom evidence. |
| [USWDS In-page Navigation](https://designsystem.digital.gov/components/in-page-navigation/) | Demonstrates structured page navigation, optional sticky layout, and current-section tracking. | Reuse the user need but keep parser/observer/threshold/offset details target-owned. |
| [Open UI components](https://open-ui.org/components/) | No standalone TOC widget model exists. | Prefer native document semantics over a custom widget contract. |
| [Radix Navigation Menu](https://www.radix-ui.com/primitives/docs/components/navigation-menu) | Navigation Menu targets site/application disclosure navigation. | Do not import popup, roving-focus, or menu semantics into L5. |
| [Polaris Navigation](https://polaris-react.shopify.com/components/navigation/navigation) | Polaris Navigation models application destinations and current pages. | Keep article locations distinct from application/page navigation APIs. |
| [Shopify Article](https://shopify.dev/docs/api/storefront/latest/objects/Article) | Article exposes formatted content but no heading-index/id relationship. | Require structured article records or verified atomic preprocessing; never parse arbitrary merchant HTML in L5. |

The consensus is native named document navigation with stable heading
relationships. No standard supports a universal TOC parser, observer threshold,
sticky header offset, or menu-like interaction API.

## Anatomy And Composition

| Part | Required | Semantic mapping | Owner |
| --- | --- | --- | --- |
| Root | yes | native `nav.toc` with accessible label | L5 naming/presentation + target label |
| Visible title | no | neutral `.toc__title` text | target content/rank context + L5 style |
| Root list | yes | native `ol.toc__list` | target order + L5 structure |
| Item | yes | native `li.toc__item` | one valid record |
| Nested list | no | `ol.toc__list` inside parent item | target children hierarchy |
| Link | yes/item | `a.link.link--nav.toc__link[href]` | canonical Link + record id/label |
| Current location | no | one `aria-current="location"` Link | controlled target state |
| Sticky surface | no | same root with `.toc--sticky` | L5 safe base + host integration |

Canonical dependency is Link. L5 owns list/card geometry, current-location
decoration, and the bounded sticky preference only; Link owns anchor semantics,
hover, focus, wrapping, transitions, and reduced-motion behavior.

## Variant, Size, State, And Content Matrix

| Dimension | Certified behavior |
| --- | --- |
| Sticky default | `.toc--sticky`; sticky at capable wide/tall viewport, bounded internal block overflow. |
| Flow | Same DOM/content/state without sticky class or positioning. |
| Narrow/zoomed/short | Sticky class may remain as the requested value but computed positioning degrades to `static`. |
| Current match | Exactly one matching Link receives `aria-current="location"` and root serializes the valid controlled id. |
| Current blank/unmatched | No current Link and no serialized false controlled state. |
| Empty/invalid/duplicate records | Complete root omitted. |
| Empty title | Named root/list retained; title node omitted. |
| Empty label | Complete root omitted. |
| One/many/deep records | Structurally valid native list; actual rendering policy stays target-owned. |
| Long/localized/unbroken/RTL | Complete labels, logical nesting, and zero root/document overflow at 200px. |
| Effective 200% / text spacing | Zero root, Link, and document overflow at 320px. |
| Tall sticky list | Internal scroll reaches and fully exposes the focused final Link; page Tab order remains native. |
| Light/dark/forced colors | AA text plus non-color current and visible focus cues. |
| Reduced motion | Canonical Link transitions resolve to zero; L5 has no animation. |

There is one intrinsic size. Breakpoint, viewport threshold, safe offset, maximum
height, nested inset, current-border width, gaps, and scroll treatment are
private validated composition/integration values, not public properties.

## Public API And State Ownership

| Property | Type/default | Ownership |
| --- | --- | --- |
| `label` | required string | Localized accessible landmark name; blank omits root. |
| `title` | optional string | Visible title; contextual heading rank stays host-owned. |
| `items` | required record collection/slot | Target-owned ordered nested records with unique id, label, and children. |
| `currentSectionId` | optional string / empty | Controlled target state; valid match projects one current location. |
| `placement` | `sticky | flow` / `sticky` | Semantic placement request; incapable targets degrade to flow. |

L5 has controlled-only optional current state and no uncontrolled mode. A static
target omits the value. A capable target may derive it from the same service as
Reading Progress; L5 does not subscribe, observe, or calculate independently.

## Token, Value, Runtime, And Asset Audit

- Public tokens cover semantic border/text/accent colors, heading/body-small
  typography, radius, touch target, and stack/layout spacing already defined by
  the system.
- Private `--_toc-current-border-width` owns the non-color current cue.
- Private `--_toc-sticky-offset` provides a safe-area-aware fallback; a target
  adapter with fixed chrome may replace it privately.
- `48rem` width and `36rem` height are private safety thresholds. `2px` current
  border is private presentation. None becomes a Studio/public API control.
- L5 adds no icon, media, SVG, font, request, JavaScript, listener, observer,
  timer, state store, layout measurement, or animation.

## Accessibility, Interaction, And Responsive Requirements

- Always name the native `nav`; omit invalid required composition.
- Preserve native ordered/nested lists and canonical fragment Links in document
  order. Do not add menu, tree, disclosure, selected, expanded, arrow-key, or
  roving-focus semantics.
- Ensure each record fragment resolves to exactly one matching heading supplied
  by the same target source.
- Keep zero or one `aria-current="location"` from controlled target truth and
  reinforce it with logical border plus stronger weight.
- Preserve Link Tab/Enter behavior, 2px focus indication, forced colors, and
  reduced motion. Do not announce scroll changes live.
- Keep complete text at 200px RTL, effective 200% and user text spacing.
- In sticky mode, bound tall content, preserve internal keyboard scrolling,
  keep focused Links visible, allow navigation before/after the component, and
  fall back to flow when fixed chrome, collision, or available height is unsafe.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Neutral Web | Native named `nav`, nested `ol/li`, canonical Links, controlled id projection, safely degrading sticky/flow CSS, zero L5 runtime. | implemented and evidenced |
| Shopify Liquid | Article owner passes structured records with matching content ids or consumes verified atomic preprocessing; maps placement and optional shared current state. | planned / CSS-ready until a truthful article source exists |
| Hydrogen / headless | Query/build layer emits article HTML and record tree together; one reading-state service may drive L4/L5. | contract-ready; first consumer pending |
| React / Angular | Thin controlled renderer over records; router/page service owns ids and current state. | planned; shared docs renderer proves mapping |
| Webflow / Framer | CMS/build integration must expose a heading tree and stable ids before enabling L5. | copied CSS ready; data pipeline pending |
| Figma | Flow/sticky, nested, long/localized, current/static, and tall-list states. | planned; historical generic nodes are not approval |
| SwiftUI / Compose | Native same-view destinations/list hierarchy; scroll container owns current state and sticky capability. | translation documented; native adapter pending |

Shopify's planned status is truthful: copied CSS is not target readiness and
`article.content` alone is not a structured heading record source.

## Exhibit And Studio Parity

- Renderer: `site/src/components/studio/TableOfContentsArtwork.tsx`.
- Fixture: exported `tableOfContentsFixtureItems` records shared by both
  surfaces.
- Both use the same default `placement`, `currentSectionId`, canonical CSS, Link
  classes, state projection, and invalid-data behavior.
- Studio metadata owns control grouping and token presentation only.
- Site CSS constrains preview width but does not recreate L5 visuals or
  behavior.
- At 400px, normalized DOM hashes match `3c0e99de`; selected computed-style
  hashes match `4bf82dfe`.

## Evidence And Validation

Batch 154 verifies:

- eight captures: Exhibit and Studio at Mobile, Tablet, Desktop, and XL;
- one native named `NAV`, two ordered lists with real nesting, four canonical
  unique fragment Links, exactly one initial controlled current location, and
  zero custom widget/live-region semantics;
- fail-closed blank label, empty records, blank record, duplicate id, invalid
  fragment-prefixed id, and required Studio item states;
- optional title omission, nested controlled match, blank state, and unmatched
  state;
- desktop/tablet sticky, explicit flow, mobile fallback, short-viewport
  fallback, and internally scrolling viewport-taller sticky content;
- native four-Link Tab sequence, visible 2px focus, native fragment hash and
  matching target;
- deep localized/unbroken RTL at 200px, effective 200% at 320px, text spacing,
  dark, forced colors, and reduced motion;
- zero root/Link/document overflow, console warnings/errors, and page errors;
- one browser page, closed owned session, preserved pre-existing server, and
  clean resource gate.

Machine results and screenshots are in
`output/playwright/refinement-batch-154/`. Historical before captures remain in
`output/playwright/refinement-batch-105/before/`.

Validation includes registry/docs, 183 contracts, 183 Studio definitions,
TypeScript `--noEmit`, Web/Shopify adapter validation, generated-copy identity,
static preview and structural audits, temporary production build outside
`site/dist`, deterministic performance, and browser evidence.

## Performance

| Surface | Current | Ceiling | Result |
| --- | ---: | ---: | --- |
| L5 CSS slice | `2,025 B` raw / `750 B` gzip | component observation | bounded; `0 B` runtime |
| Blog family | `5,130 B` gzip | `5,529 B` | pass; `399 B` headroom |
| Neutral component CSS | `71,925 B` gzip | `65,536 B` | existing documented gap `6,389 B` |
| Shared runtime | `22,807 B` gzip | `8,192 B` | existing documented gap; L5 delta `0 B` |

L5 SHA-256:
`748ff838c71471c43e59ee6684bc8bb92922578e96497d09a6d1f4a96b049df8`.
Blog SHA-256:
`bb1a4ab914c1f07cbd00f182ca1a44d3b8c12149f89bec5bf13b1546f3e1d9ea`.
Neutral component CSS SHA-256:
`a2186c279799159abcae60066a90718f4a86f85046434e653a45de586ee7c687`.
Runtime SHA-256:
`0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`.

The performance audit reports 18 surfaces, 11 pass, and seven documented
program gaps with zero undocumented gaps. L5 stays within Blog's fixed ceiling
and does not change shared runtime.

## Risks And Questions For Human Review

1. Confirm the retained border/radius, title/link typography, rhythm, marker
   suppression, nested inset, and current-location treatment.
2. Review sticky and flow in a real article column with the actual Header and
   safe-area offset, including a viewport-taller localized list.
3. Confirm whether the first real target will supply static `currentSectionId`
   or integrate L4/L5 through its shared reading-state service.
4. Supply or approve L5-specific page-context Figma evidence; registered nodes
   are historical generic shells and were not treated as visual authority.
5. Shopify remains blocked from target readiness until an article source or
   verified preprocessing pipeline supplies records and matching heading ids.
6. Neutral Web CSS and shared runtime retain existing documented program budget
   gaps unrelated to L5.

These are explicit human/target integration gates, not unresolved neutral API
or architecture decisions.

## Readiness Decision

`human-review-ready`. Purpose, anatomy, record validation, controlled state,
placement, canonical composition, semantics, accessibility, responsive behavior,
extreme content, performance, cross-target translation, Exhibit/Studio parity,
and evidence are complete. Contract stays `pilot`; explicit human review is
required before any `stable` promotion.
