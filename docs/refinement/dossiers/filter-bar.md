# Component Dossier: Filter Bar

Status: `human-review-ready`

## Identity And Scope

- Registry id: `L7`
- Public slug: `filter-bar`
- Public selector: `.filter-bar`
- Category: Blog
- Contract: `components/contracts/filter-bar.contract.json`
- Canonical CSS: `components/css/blog.css`
- Dependencies: canonical Segmented Control and Checkbox
- Status: implementation candidate / `pilot`

ADR 0229 performs the accepted pre-v1 migration from Category Nav to Filter
Bar. The old name, slug and selectors are removed rather than retained as
aliases.

Filter Bar is a compact horizontal choice composition for filtering content
shown below it. It is intentionally narrower than Filter Panel: it has one
short option set, no facet groups, disclosure hierarchy, active Tag summary,
Drawer translation, sort control or Apply/Cancel workflow.

It is not page navigation, tabs, a menu, a view toggle or a generic toolbar.

## Purpose, Use Cases And Limits

Use Filter Bar when:

- one concise set of stable values filters an associated result surface;
- changes commit immediately;
- the consumer needs explicit Single or Multiple selection;
- the control must fit intrinsically above content; and
- a capable target will make the committed state linkable through its own URL
  query policy.

Do not use it for:

- category or tag destinations that load pages;
- hierarchical or multi-group facets;
- sort plus filter toolbars;
- content panels requiring tab semantics;
- binary presentation switching already owned by View Toggle;
- deferred Apply/Cancel state; or
- target-owned loading, error, empty, count, pagination or result markup.

## Repository Baseline

The old L7 implementation was an overflow-hidden visual rail of direct anchors
with optional counts, `.category-nav__item--active` and
`aria-current="page"`. Its contract explicitly allowed either destinations or
controls, so semantics, events, state ownership and URL behavior could not be
certified. Exhibit and Studio authored separate link fixtures.

Preserved before evidence:

- `output/playwright/parity/blog/category-nav-exhibit-mobile.png`;
- `output/playwright/parity/blog/category-nav-exhibit-desktop.png`;
- `output/playwright/parity/blog/category-nav-studio-mobile.png`; and
- `output/playwright/parity/blog/category-nav-studio-desktop.png`.

The former raw `4px`, `6px`, `14px`, fractional body-size calculations, hidden
scrollbar, visual active class and duplicate focus/transition rules have been
removed from L7.

## Standards And Mature-System Research

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| [WAI-ARIA APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | A radio group allows one checked option; Tab enters/leaves the group and arrow keys move/check within it. | Single mode composes the canonical native radio-backed Segmented Control rather than inventing pressed buttons or tabs. |
| [WAI-ARIA APG Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) | Checkboxes represent independent binary choices and Space toggles the focused option. | Multiple mode composes canonical native Checkboxes with one group legend. |
| [WHATWG URL Standard](https://url.spec.whatwg.org/#urlsearchparams) | `URLSearchParams` provides ordered query entries and repeated names. | Capable Web targets can serialize multiple values without a neutral delimiter convention. The target chooses the key. |
| [WHATWG History API](https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-history-interface) | Session history supports same-document `pushState`, `replaceState` and `popstate`. | The consuming target synchronizes Back/Forward and chooses push versus replace; Filter Bar does not hardcode policy. |
| [Radix Radio Group](https://www.radix-ui.com/primitives/docs/components/radio-group) | Mature controlled/uncontrolled APIs expose value/defaultValue, value changes, name, orientation and disabled state while preserving radio keyboard behavior. | L7 follows the controlled value/change boundary but reuses Gallery's canonical control instead of importing Radix markup or runtime. |
| [Shopify storefront filtering](https://shopify.dev/docs/storefronts/themes/navigation-search/filtering) | Shopify represents storefront filters through URL parameters and distinguishes group combination rules. | Shopify can map approved filter records and query state, but its parameter schema and section-rendering lifecycle remain target-owned. |
| Open UI component research | No accepted generic Filter Bar primitive unifies selection, URL and results. | Use stable platform choice semantics and keep result/query orchestration outside the primitive composition. |

There is consensus on the native selection models and target-owned URL/results
boundary. Standards do not choose The Gallery's visual density, option
taxonomy, query key, result announcement copy or target request architecture.

## Accepted Direction

Owner decisions recorded in `docs/refinement/owner-decision-responses.md`:

- L7 is filtering, not navigation.
- Public identity is Filter Bar; E3 becomes Filter Panel.
- Single and Multiple are explicit semantic modes.
- Single composes Radio or Segmented Control; Multiple composes Checkbox.
- One controlled selected-value collection is authoritative.
- Changes commit immediately.
- Capable Web and Shopify targets reflect committed values in target-owned query
  parameters and synchronize reload plus Back/Forward.
- Targets own results, cancellation, pending/error/empty states,
  announcements, focus, pagination reset and history policy.
- This is an implementation candidate, not visual approval or stability
  promotion.

## Anatomy And Canonical Composition

### Shared boundary

| Part | Required | Semantics | Owner |
| --- | --- | --- | --- |
| Root | yes | native `fieldset.filter-bar` | Filter Bar |
| Legend | yes | visible native `legend` | target label + canonical control |
| Options | yes | ordered visual control row | Filter Bar + canonical child |
| Choice | at least two | canonical radio segment or Checkbox | canonical child |
| Name/value/checked | yes per input | native form-control attributes/properties | target data + canonical child |

### Single

The root is also `.segmented.filter-bar.filter-bar--single`. Canonical
Segmented Control owns `fieldset`, legend, same-name radio inputs, visible
labels, mutual exclusion, Tab/Arrow/Space behavior, checkedness, focus,
disabled state and reset/form semantics.

### Multiple

The root is `.filter-bar.filter-bar--multiple`. Its options container repeats
`.filter-bar__choice.checkbox`; each record is a canonical Checkbox with the
contextual `.filter-bar__input` and `.filter-bar__label` hooks. Checkbox owns
native independent checkedness, Space activation, focus, disabled state and
forced-color behavior.

No extra role, hidden input, active class or duplicate keyboard handler exists.

## State, Mode And Content Matrix

| Dimension | Contract |
| --- | --- |
| Single empty | Valid controlled state with no checked radio. |
| Single selected | Exactly one valid option value is checked. More supplied values normalize to the first valid option in authored order. |
| Multiple empty | Valid; all Checkboxes unchecked. Associated result meaning remains target-owned. |
| Multiple selected | Zero or more valid option values checked independently and returned in authored option order. |
| Unknown selected value | Ignored; it never creates hidden or orphan state. |
| Duplicate option value | Later duplicate is ignored; stable unique values are required. |
| Blank label/name | Complete component omitted. |
| Fewer than two valid options | Complete component omitted as ineffective/ambiguous. |
| Disabled group | Native fieldset disables every choice. |
| Disabled option | Canonical child exposes unavailable state while other choices remain usable. |
| Hover | Canonical child behavior plus contextual Multiple boundary emphasis. |
| Keyboard focus | Canonical child visible focus; no root or wrapper tab stop. |
| Long/localized label | Complete text wraps within each choice; no truncation or internal overflow. The bar also wraps complete choices. |
| Many options | Wraps from available container; taxonomy scale remains a product constraint and may indicate Filter Panel instead. |
| Empty results | Not a Filter Bar state; target renders truthful result Empty State. |
| Pending/error | Not Filter Bar states; target preserves the committed controls while exposing status and recovery. |
| RTL | Native source order and logical layout; no physical left/right state. |
| Reduced motion | Canonical controls remove transitions; L7 adds no motion. |
| Forced colors | Canonical controls and contextual selected boundary remain perceivable through system colors/outlines. |

There is one intrinsic size. Mobile, Tablet, Desktop and XL are evidence
contexts, not component variants.

## Public API

| Property | Type | Requirement | Meaning |
| --- | --- | --- | --- |
| `mode` | `single | multiple` | optional, default `single` | Selects mutually exclusive radio composition or independent Checkbox composition. |
| `label` | string | required, non-empty | Visible localized group legend. |
| `name` | string | required, non-empty | Native control name selected by the target; a Web target may choose to reuse it as its query key. |
| `options` | ordered record collection | required, min two valid | Each record contains stable unique value, complete localized label and optional disabled state. |
| `selectedValues` | `string[]` | required, empty allowed | One authoritative controlled selection projected to native checked state. |
| `disabled` | boolean | optional, default false | Disables the complete native fieldset. |
| `describedBy` | id-reference string | optional | Associates persistent target-authored guidance. |
| selected-values change | complete `string[]` | adapter callback/native `change` | Requests controlled state reconciliation. |
| commit request | complete `string[]` | immediate | Requests target URL/result synchronization. |

`string-list` is an accepted contract-schema property type. Its `collection`
mapping describes repeated controlled checked projection without serializing
values as text or treating them as arbitrary visual content.

Do not expose query key defaults, delimiter, router, request client,
push/replace, result markup, result count, pending/error/empty copy,
announcement strategy, pagination, taxonomy source, maximum items, wrapping,
gap, padding, radius, border or focus geometry as L7 semantic properties.

## Controlled And Uncontrolled Strategy

The reusable renderer is controlled. It receives `selectedValues` and emits the
complete next collection; it does not retain a second source of truth.

Static HTML may author native `checked` attributes as the initial projection,
and a plain form may observe native changes. Stateful adapters bind live checked
properties to `selectedValues`. A target can choose its own higher-level
uncontrolled wrapper, but that wrapper is not the base contract and must still
emit/synchronize one collection.

## Query And Result Lifecycle

Filter Bar does not navigate. A capable target handles a commit by:

1. validating the complete selected-value collection;
2. serializing it under a target-selected query key;
3. choosing `pushState`, `replaceState` or its router equivalent;
4. resetting incompatible pagination;
5. cancelling or ignoring stale work;
6. rendering pending, result, error or truthful empty composition;
7. announcing a concise result update when appropriate; and
8. restoring selected values when query state changes through reload or
   Back/Forward.

The docs target demonstrates repeated `topic` entries with History API state.
`topic` and its fixture records are examples, not component defaults.

## Token And Hardcoded-Value Audit

Direct Filter Bar CSS uses only existing public tokens:

- border: `--color-border-subtle`, `--color-border-default`;
- selected surface: `--color-surface-statement`;
- text: `--color-text-primary`;
- radius: `--radius-full`;
- spacing/touch: `--tg-space-stack-xs`, `--tg-space-stack-sm`,
  `--space-layout-touch-target`, `--space-input-label-size`; and
- typography: `--font-family-body`, `--typo-body-sm-line-height`,
  `--tg-font-weight-medium`.

Private `--_filter-bar-*` values translate those existing decisions into local
composition. Canonical Segmented Control and Checkbox retain their own private
variables and public token declarations. No new public component token was
created.

The previous raw gaps/padding, fractional font sizes, opacity-based count text,
hidden scrollbar and L7-specific focus/transition duplication are gone.

## Responsive, Localization And Extreme Content

- Root and options use intrinsic inline-size containment and flex wrapping.
- Single overrides only Segmented Control's narrow vertical stack so the filter
  remains a horizontal wrapping bar at narrow containers.
- Multiple choices wrap as complete touch targets; labels may wrap internally
  for long or unbroken content and never truncate.
- A blank required string or insufficient valid option set fails closed.
- Unknown/duplicate values cannot create page overflow or orphan controls.
- Long translated labels, unbroken strings, effective 200% type, RTL and the
  four natural viewports pass with zero root or document overflow in final
  evidence. A 200px-container policy remains a final visual/product question.
- A product that needs many groups, hierarchical disclosure or a constrained
  Drawer uses Filter Panel instead of growing Filter Bar into a second product.

## Accessibility Audit

- Native `fieldset`/`legend` provides one visible accessible group name.
- Native radio and Checkbox semantics are used without redundant ARIA roles.
- Single preserves the canonical radio keyboard model; Multiple preserves
  independent Checkbox Tab/Space behavior.
- Every option has complete visible text. No icon, count or color is the sole
  accessible name.
- Checkedness is authoritative; selected surfaces and system outlines provide
  non-color evidence.
- Group disabledness is native. Individual disabledness remains option-owned.
- No live region belongs inside Filter Bar. The result owner announces actual
  result changes and distinguishes empty, error and pending.
- No filter control is a link, `aria-current`, tab, menu item or pressed action.

## Runtime And Performance

The neutral component adds zero JavaScript runtime, global listener, observer,
timer, request, storage, router or analytics dependency. Native controls emit
events; adapters and consumers own query/results behavior.

Exhibit and Studio use one `FilterBarArtwork` and the same canonical
`SegmentedControlArtwork` / `CheckboxArtwork`. The docs target simulation is
bounded to its renderer and does not modify shared `components/js/theme.js`.

Performance measurements and family/total budget reconciliation are recorded in
the component report after generated adapters are rebuilt.

## Target Translation

- **Neutral Web:** native fieldset/radios/Checkboxes, repeated names/values,
  checked projection and native change. Consumer owns History/query/results.
- **Shopify:** planned mapping from approved target filter records into the same
  controls plus query/section-result synchronization. No Shopify schema or
  first consumer is assumed.
- **React/Angular:** thin controlled `options`, `selectedValues`, change and
  commit callbacks; no mirrored store.
- **Figma:** static Single/Multiple compositions and selected, disabled, focus,
  narrow/wide states. Generic registered nodes are not L7 visual approval.
- **SwiftUI/Compose:** native exclusive selection or independent toggles bound
  to the same stable string list; host navigation owns linkable state.

## Exhibit / Studio Parity

The registered `BlogStudio` renderer now routes both Exhibit and Studio to the
same `FilterBarArtwork`, fixture option records, controlled selection, query
simulation, canonical child components and CSS. The MDX preview is a static
fallback only.

Final evidence must confirm exact normalized DOM and same-container computed
style parity across both surfaces, not merely visual similarity.

## Risks And Remaining Human Review

- The Figma references are generic historical frames, not approved Filter Bar
  artwork.
- Final density, selected surface, border, typography, wrapping balance and
  placement relative to results require human visual review.
- A real Web consumer must approve query key/serialization, history policy,
  result status/announcement/focus and pagination behavior.
- A real Shopify consumer and data mapping remain target integration work.
- Counts/icons and a large taxonomy are intentionally absent rather than
  inferred.
- Automated evidence cannot promote the `pilot` contract to `stable`.

## Certification Direction

The contract/docs/Studio/adapters, controlled Single/Multiple and Back/Forward
behavior, fail-closed invalid input, keyboard and special modes, natural
viewports, exact Exhibit/Studio parity, documented performance gaps and clean
evidence lifecycle have passed. The candidate is ready for human stability
review; it remains `pilot` pending explicit approval.
