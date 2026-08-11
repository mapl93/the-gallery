# ADR 0229: Filter Bar Controlled Choice And Query Boundary

- Status: Accepted
- Date: 2026-07-20
- Supersedes the unresolved L7 navigation direction in ADR 0079
- Related: ADR 0056, ADR 0057 and `docs/refinement/owner-decision-responses.md`

## Context

L7 was publicly named Category Nav but mixed destination links, a visual active
class, `aria-current=page`, optional counts and an unresolved possibility of
filtering in place. Those are incompatible semantic products. The owner chose
in-place filtering, renamed L7 to Filter Bar, and distinguished it from the
full multi-group Filter Panel by compact horizontal composition rather than by
Category versus Collection data vocabulary.

The accepted direction also requires Single and Multiple selection, one
controlled selected-value projection, immediate commitment and target-owned URL
query synchronization without freezing Web routing concepts into every target.

## Decision

- The pre-v1 public identity is `Filter Bar` / `filter-bar` / `.filter-bar`.
  `Category Nav`, `category-nav` and `.category-nav*` are removed rather than
  retained as aliases.
- Filter Bar is one native fieldset with a visible legend. It never renders a
  navigation landmark, destination links, `aria-current`, tabs, menu roles or a
  toolbar selection model.
- `mode` is exclusively `single | multiple`. Single composes the canonical
  radio-backed Segmented Control and accepts at most one selected value.
  Multiple composes independent canonical Checkboxes and accepts zero or more.
- `selectedValues` is one required controlled ordered list of stable option
  values. The base filters unknown values, preserves option order and never
  creates hidden duplicate inputs or a mirrored uncontrolled store.
- The component requires a non-empty visible label, a non-empty native name and
  at least two valid unique option records. Invalid content fails closed.
- Every accepted native change produces the complete next selected-value list
  and an immediate commit request. There is no draft, Apply or Cancel state.
- Capable targets own the query key, serialization, push-versus-replace policy,
  History/Back/Forward synchronization, requests, stale cancellation, results,
  pending/error/empty presentation, announcements, focus, pagination reset,
  analytics and persistence.
- The component remains `pilot`; the decision does not approve final visuals or
  promote stability.

## String-list Semantic Property

The component-contract schema adds the semantic type `string-list` and the
target mapping kind `collection`. This represents a controlled collection of
stable string identifiers without serializing it into a delimited string or
misrepresenting state as arbitrary visual slot content.

Studio adds a read-only collection projection. Consumers change the values by
using the actual canonical controls in the shared artwork; the inspector does
not invent fixture options as component defaults. This schema capability is
available to later reviewed contracts only when a real ordered string
collection is part of their accepted semantic API.

## Responsive And Visual Composition

The bar has one intrinsic size. Options flow horizontally and wrap from the
available component container instead of switching from viewport breakpoints.
Single retains the canonical Segmented Control surface. Multiple adds only the
compact Filter Bar wrapper around canonical Checkboxes; Checkbox checkedness,
focus and keyboard behavior remain canonical.

Spacing, border, selected surface, radius and wrapping are private composition
or existing public tokens. Counts, icons, edge fades, scroll buttons, maximum
items and a query-parameter name are not public defaults.

## Target Translation

- Neutral Web renders native named controls and exposes native change plus
  controlled callback adapters. A consuming Web application performs query and
  History synchronization.
- The docs target demonstrates repeated query values and Back/Forward through
  the same Exhibit/Studio renderer; this is target fixture behavior, not neutral
  runtime policy.
- Shopify maps approved filter records to canonical controls and updates the
  selected query plus section results. Its concrete data source and first
  consumer remain target integration work.
- React and Angular accept `options` and `selectedValues` arrays and emit the
  complete next array.
- Figma represents both choice compositions and static states, not URL behavior.
- Native targets map the same controlled list to native exclusive or independent
  choice controls while their navigation layer owns linkable state.

## Performance

Neutral component runtime remains zero. Filtering, routing, requests and result
rendering are consumer work and must not enter the shared component enhancer.
The CSS reuses canonical Segmented Control and Checkbox behavior rather than
duplicating keyboard or focus code.

## Consequences

- L7 no longer duplicates navigation or current-page semantics.
- Filter Bar and Filter Panel can share target query state while retaining
  different anatomy and adaptive surfaces.
- Contract consumers gain an explicit controlled string-list primitive without
  committing to a framework or URL format.
- Final surface, typography, density and target-specific query integrations
  remain human/target review items.

## Evidence Considered

- <https://www.w3.org/WAI/ARIA/apg/patterns/radio/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/>
- <https://url.spec.whatwg.org/#urlsearchparams>
- <https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-history-interface>
- <https://www.radix-ui.com/primitives/docs/components/radio-group>
- <https://shopify.dev/docs/storefronts/themes/navigation-search/filtering>
