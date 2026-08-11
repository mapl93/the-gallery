# Review Pagination Refinement Dossier

Status: `human-review-ready`

Date: 2026-07-15

Registry: `V9` / `review-pagination`

Dependency order: 156, phase 6 (Composed components), refined depth 2

## Purpose

Review Pagination moves among discrete pages of one bounded review result set.
Its contextual value is the review-specific navigation name and its placement
beside review results. It does not need a second page-navigation implementation.

The target owns review-provider data, total pages, the finite page window, real
URLs or cursor translation, requests, loading, errors, result replacement,
history, scrolling, focus, announcements, analytics and prefetch. Infinite
loading, load more and cursor-only navigation are different product modes, not
variants inferred by this component.

## Accepted Source Facts

- ADR 0085 keeps every review pagination strategy and result lifecycle
  target-owned.
- ADR 0122 already defines canonical Pagination as a named native `nav` with a
  `ul`/`li` sequence, canonical Link destinations, one non-interactive current
  page, passive ellipses, omitted boundaries and intrinsic wrapping.
- The component-refinement goal requires composed components to consume
  canonical components rather than duplicate markup or behavior.
- The repository is the source of truth; Figma is evidence and a future target.
- Exhibit and Studio must mount one renderer and one initial fixture.
- Review Pagination remains `pilot` until explicit human approval.

## Baseline Audit

- Contract `0.2.0`, registry and docs declare no dependency even though
  canonical Pagination already solves the same bounded numbered-navigation job.
- Review Pagination defines a parallel `.review-pagination__btn` API, thirteen
  public tokens and about seventy lines of independent visual CSS.
- The shared fixture renders six native buttons, no links and no real URLs. The
  current page is an activatable focus stop rather than canonical Pagination's
  non-interactive current indicator.
- Previous and next remain disabled or active controls instead of following the
  accepted boundary-omission rule.
- The four-page fixture always appends `...` but provides no final-page
  destination, so the omission marker has no coherent page window.
- At the initial Mobile Exhibit root, `scrollWidth` is `329px` while
  `clientWidth` is `326px`; the first and last controls visibly clip into the
  horizontal containment edges.
- Exhibit and Studio do share one `ReviewsStudio` renderer and initial fixture,
  but that renderer duplicates the already reviewed `CollectionStudio`
  Pagination renderer.
- Eight paired baseline images cover Mobile, Tablet, Desktop and XL under
  `output/playwright/refinement-batch-55/before/`.
- Reviews CSS is `3,717 B` deterministic gzip against the `3,788 B` family
  ceiling. Canonical Collection CSS is `2,253 B`; complete Web component CSS is
  `67,335 B` against the existing `65,536 B` program ceiling.

## Standards And Mature-System Evidence

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| WAI navigation structure | Native navigation is commonly represented as a list and each navigation landmark needs a distinguishing name when several exist. | Use the already accepted canonical Pagination `nav > ul > li` anatomy and a review-specific label. |
| WAI ARIA26 / ARIA | `aria-current="page"` identifies one current item in a related set; authors should mark only one. | Reuse the canonical one-current-page invariant. |
| WAI native-link guidance | Native `a[href]` preserves navigation, Enter activation, browser history and modified activation. | Available pages stay real canonical Links; docs-only interception may demonstrate controlled target behavior. |
| W3C Design System Pagination | Uses a named navigation landmark, native list, page destinations, ellipses and one current page. | Confirms the canonical anatomy; linked versus non-linked current remains the already accepted Gallery choice. |
| Open UI component matrix | Pagination is a cross-system name but there is no standardized browser Pagination primitive or behavior contract. | Do not invent a review-specific element, ARIA role, keyboard model or state protocol. |
| Radix Primitives | Radix publishes behavior-heavy primitives but no Pagination primitive. | Native list/link composition is sufficient; no second React primitive is justified. |
| Polaris historical Pagination | Exposes previous/next URLs or callbacks and availability at the consuming target. The React package is now deprecated in favor of web components. | Treat it as evidence for target ownership, not a neutral visual or runtime source. |
| Shopify Liquid `paginate` | Supplies current page, pages, previous, next and ordered parts, with independent query keys where necessary. | A selected review provider may map its pagination data into canonical Pagination without a new CSS/DOM contract. |

References:

- <https://www.w3.org/WAI/tutorials/menus/structure/>
- <https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA26>
- <https://www.w3.org/WAI/ARIA/apg/patterns/link/>
- <https://design-system.w3.org/components/pagination.html>
- <https://open-ui.org/research/component-matrix/>
- <https://www.radix-ui.com/primitives/docs/overview/introduction>
- <https://github.com/Shopify/polaris-react>
- <https://shopify.dev/docs/api/liquid/objects/paginate>

## Owner Visual References

Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
and inspector `1020:480`. Direct read-only inspection confirms that both nodes
remain the generic Button component-detail shell and Studio inspector. They do
not contain Review Pagination artwork and cannot determine density, page
window, current treatment, ellipsis, directional icons or wrapping.

## Convergence And Differences

Consensus:

- Review Pagination is ordinary page navigation, not a composite widget;
- one specifically named navigation landmark contains a native item list;
- available destinations use native links and normal Tab/Enter behavior;
- exactly one item is current and ellipses are passive;
- the target supplies a finite page window and owns every result lifecycle;
- review context does not justify duplicate CSS, tokens, state or runtime;
- layout must contain and wrap from its actual host without hidden items.

Differences that remain target, provider or product decisions:

- numbered, cursor, load-more, infinite or provider-managed strategy;
- page size, total count, window algorithm, labels and URL/query format;
- server navigation versus in-place interception;
- loading, empty, failure, result announcement, scroll and focus policy;
- provider, authentication, moderation, analytics and prefetch;
- final Figma and target-native presentation.

## Recommended Direction

Convert Review Pagination into a contextual profile of canonical Pagination.
Add `pagination` as its sole dependency; layer `.review-pagination` on the same
`nav.pagination` root; use the canonical list, item, Link, current and ellipsis
classes; and remove every duplicated review-pagination child style.

Align the semantic API with canonical Pagination: `label`, `currentPage` and
`pageItems`. Review Pagination adds no visual token or event API of its own.
Consumers customize appearance through Pagination and provide review-specific
items/results through the target coordinator.

Extract the docs-only Pagination renderer into one shared artwork component so
the canonical Collection page and Review Pagination exercise the same DOM,
window fixture, boundary omission and controlled target projection. The
Review-specific wrapper may add truthful local feedback, but no neutral runtime.

Do not preserve the obsolete `.review-pagination__btn`, disabled-button or
horizontal-scroll API as a compatibility shim. The repo is pre-v1, the existing
contract is incorrect, and two active implementations would perpetuate the
source-of-truth conflict.

## Alternatives Requiring A Decision

1. **Provider-owned cursor or load-more controls.** Requires a selected provider,
   API shape, result lifecycle and target-specific UI; it is not Pagination.
2. **Infinite review loading.** Requires explicit accessibility, history,
   recovery, performance and footer-reachability decisions.
3. **A compact previous/next-only variant.** Requires human/product evidence
   for when page numbers disappear and how position is communicated.
4. **Self-linked current page.** Standards permit it, but changing Gallery's
   accepted non-interactive current-page decision requires a new rationale.

The current repo does not authorize any of these alternatives.

## Candidate Anatomy

| Part | Required | Semantics | Ownership |
| --- | --- | --- | --- |
| Root profile | yes | `nav.pagination.review-pagination` with a specific label | Review Pagination + Pagination |
| List | yes | canonical `ul.pagination__list` | Pagination |
| Item | yes/repeated | canonical `li.pagination__item` | Pagination / target |
| Destination | optional/repeated | canonical `a.link.pagination__link[href]` | Link / target |
| Current | exactly one | non-interactive `span.pagination__current[aria-current=page]` | Pagination / target |
| Ellipsis | optional | hidden passive `span.pagination__ellipsis` | Pagination / target |
| Review results/status | no | deliberately outside navigation | provider / target |

## State And Mode Matrix

| Mode/state | Neutral expectation |
| --- | --- |
| One page | Owning target omits Review Pagination. |
| First page | Previous is omitted; current and Next remain coherent. |
| Middle page | Both directions, finite page window and one current item. |
| Last page | Next is omitted; Previous and current remain coherent. |
| Available destination | Real `href`, canonical Link hover/focus and native activation. |
| Current | One non-focusable, non-activatable current indicator. |
| Ellipsis | Visible omission glyph, absent from the accessibility tree. |
| In-place target | Same URLs may be intercepted; target owns request, history, results, status, focus and scroll. |
| Narrow/zoom/localized | Canonical finite list wraps without hidden items or root overflow. |
| RTL | Logical order and labels remain target-owned; directional icons mirror canonically. |
| Reduced motion / forced colors | Inherited from canonical Pagination and Link. |

## Public API And State Ownership

- `label`: required localized review-navigation name.
- `currentPage`: required positive projection matching the one current item.
- `pageItems`: required finite target-supplied canonical item composition.

Static Web and Shopify use URL/rendered results as source of truth. Framework
targets may control `currentPage`, but Review Pagination must not retain a second
internal value. It emits no synthetic event and adds no total-pages or window
algorithm property.

## Token And Runtime Audit

- Review Pagination should expose no visual token of its own.
- Canonical Pagination owns page geometry, current/ellipsis treatment, wrapping
  and its existing public tokens; Link owns destination focus and activation.
- Removing the duplicated V9 CSS should reduce Reviews-family and total Web CSS.
- The profile adds no listener, observer, request, formatter, state store,
  layout read, focus manager, animation or asset.
- Studio-controlled state and local feedback remain documentation-only evidence.

## Responsive And Content Evidence

- Paired Exhibit/Studio screenshots pass at 390, 768, 1440 and 1920px.
- Initial root DOM is byte-identical in both modes, with SHA-256
  `2b6fc0374f33485fa87ec9e680aec461e78da000b890b14f747706b45eb4ca17`.
- First, middle and last states expose coherent real destinations, exactly one
  non-interactive current page and omitted unavailable boundaries.
- Native Tab order excludes the current page. Focus has a `2px` outline with a
  `2px` offset, and docs-only interception preserves real `href` values.
- A 320px localized candidate, a five-digit destination and 200% zoom all
  contain exactly with no root or document overflow.
- RTL mirrors directional icons through canonical Pagination CSS. Light/dark,
  forced colors and reduced motion pass; transitions and animations resolve to
  `0s` under reduced motion.
- Review Pagination contributes no child CSS, visual token, asset or neutral
  runtime. Source and generated adapter CSS are byte-identical.
- Eighteen final and eight before screenshots live under
  `output/playwright/refinement-batch-55/`.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Canonical Pagination classes plus `.review-pagination` context hook and target-supplied URLs/results. | Safe to implement now. |
| Shopify | Selected review provider maps its page model to canonical Pagination or supplies its own app block. | Planned; provider decision missing. |
| React / Angular | Canonical Pagination adapter with review-specific label/items and one target result coordinator. | Planned. |
| Figma | Instance/profile of canonical Pagination with review naming and first/middle/last examples. | Planned; current reference is unrelated. |
| SwiftUI / Compose | Target-native finite page navigation with equivalent current/destination meaning. | Conceptual. |

## Human Review Boundary

Human review must approve reusing the canonical Pagination visual candidate in
the review context: density, current emphasis, wrapping, ellipsis rhythm,
directional icons and absence of a compact or provider-specific variant.
Provider and lifecycle choices remain open. No `stable` promotion is permitted
without explicit approval.
