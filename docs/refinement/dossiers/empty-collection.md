# Component Dossier: Empty Collection State

Status: `human-review-ready`

Owner decision E7-A is recorded in
[ADR 0249](../../decisions/0249-empty-collection-target-owned-lifecycle-profile.md).
E7 remains a named, zero-visual-delta canonical Empty State profile; ADR 0236
assigns contextual heading rank to the host. Cause, recovery, result replacement,
status and focus are target lifecycle facts rather than E7 properties.

Date: 2026-07-20

Registry: `E7` / `empty-collection`

Dependency order: 143, phase 6 (Composed components), current depth 0;
recommended direct dependencies `empty-state`, `button` and `link`

## Recommendation

Keep E7 as the Collection-domain profile for a target-authoritatively resolved
empty result area, but consume canonical Empty State instead of maintaining a
second title/message/icon/action implementation. The Web root should layer
`.empty-collection` on `.empty-state`; canonical Empty State must own centered
composition, decorative icon, title/message typography, content resilience and
the optional action slot.

Align the public API with the canonical semantic surface: required non-empty
`title`, optional concise `message`, optional decorative `icon` and one optional
`action` slot. The action composes canonical Button for a command such as a
client-side filter reset, or canonical Link when recovery is navigation to a
real URL. E7 must not invent a destination, style a local CTA or expose a
command as a misleading anchor.

E7's distinct value is domain lifecycle, not presentation. The owning
collection target decides whether the condition means a genuinely empty
collection, zero filtered/search results or another truthful resolved absence;
atomically replaces stale Grid/Pagination content; retains or removes filter
controls as appropriate; owns localized status announcements and focus after a
dynamic transition; and supplies the action. E7-A permanently keeps `reason`
outside the public API. Do not add an automatic live role, query parser, result
store or default recovery policy.

Under ADR 0236, E7 passes the host's appropriate target-context heading element
to the canonical renderer without exposing a visual Studio control or assuming
one universal rank.

## Purpose, Use Cases And Limits

### Purpose

- Replace the collection results region after the target has resolved that no
  products or works can be shown.
- Explain the truthful collection-specific absence with required visible title
  and optional concise guidance.
- Offer at most one honest recovery action through canonical Button or Link.
- Preserve ordinary document semantics, contextual heading structure and a
  predictable path out of a dead end.

### In scope

- genuinely empty collection inventory;
- no results after a filter/search/sort request when the target can classify the
  result truthfully;
- static server-rendered absence and dynamic target-controlled replacement;
- optional decorative icon, message and one canonical action; and
- target-owned dynamic status/focus policy.

### Out of scope

- loading, skeleton, progress, fetch error, permissions, offline or unavailable
  service diagnosis;
- product data, filters, query parsing, sorting, pagination, result count,
  collection eligibility or inventory truth;
- local controlled/uncontrolled state, focus movement, live-region ownership,
  analytics or persistence;
- multiple local actions, onboarding, recommendations or marketing content;
- a local E7 CTA design, icon library/API, meaningful illustration alt contract,
  heading-level control or responsive breakpoint; and
- Shopify empty/no-results policy until target behavior and copy are accepted.

## Accepted Repository Facts

- ADR 0064 accepts canonical Empty State as required title plus optional
  message, decorative icon and one composed Button-or-Link action.
- ADR 0112 makes Empty State passive, target-controlled, container-resilient and
  zero-runtime while explicitly deferring contextual heading-rank ownership.
- ADR 0076 says Empty Collection uses the primary action family and keeps its
  icon optional/passive; it does not require independent action markup.
- ADR 0120 assigns empty recovery to E7 and keeps Collection Grid responsible
  only for the ordered native Product Card list.
- Canonical Empty State already implements complete title/body typography,
  semantic spacing, container-safe inline padding, long-content wrapping,
  decorative icon policy and one canonical action slot.
- Cart Empty is an accepted repository precedent: a domain hook layers on
  `.empty-state`, consumes canonical anatomy and carries only `min-inline-size`
  in its family CSS.
- Exhibit and Studio currently share `CollectionStudio`, but E7 remains an
  inline duplicate rather than an extracted profile renderer over
  `EmptyStateArtwork`.
- Lucide is site-only. `PackageSearch` is fixture artwork, not a neutral icon
  name or dependency.
- No contract may become `stable` without explicit human review.

## Baseline Audit

### Current anatomy and semantics

- The shared docs branch renders a `section.empty-collection`, optional hidden
  Lucide icon, hardcoded `h2`, optional paragraph and optional anchor.
- Blank required heading still produces an empty H2 and visible shell.
- CTA label alone invents `#all-works`; destination alone has no effect.
- The fixture says “Clear filters” but uses an anchor to another destination,
  conflating a command with navigation.
- The root has no widget role/live region/focus, which is correct for a static
  resolved state; dynamic announcement ownership is only loosely mentioned in
  MDX and absent from the contract.
- Icon passivity is correct in Studio but absent from the MDX default fixture,
  which omits the icon entirely.
- E7 duplicates all visual anatomy instead of layering on canonical Empty State
  and Button/Link.

### CSS and visual findings

- E7 repeats Empty State's center alignment, section padding, 64px icon, title
  and body typography, text measures, optional spacing and action treatment.
- The local action recreates Button padding, font, weight, colors, border,
  radius, cursor, transition, hover and a `4px` zero-offset focus outline.
- Physical width/height/margins and `64px 24px`, `16px`, `8px`, `400px`, `24px`,
  `6px`, `12px 28px`, `600` and `4px` literals bypass the canonical composition.
- Heading family/size are incomplete; line height and weight inherit. The docs
  shell's H2 rule leaks a horizontal divider into the candidate screenshot.
- There is no explicit logical zero-min/wrapping contract for the local action
  or localized unbroken content.
- Mobile/Desktop baseline screenshots look intentionally sparse and coherent,
  but they visually reproduce A13 with a local primary button rather than
  establish a distinct E7 design language.
- The registered Figma nodes `943:7` and `1020:480` are generic Studio/Button
  references, not E7-specific owner artwork.

### API and target gaps

- `heading`/`text` duplicate canonical `title`/`message` naming.
- Independent optional `ctaLabel` and `href` admit incoherent pairs and only
  support navigation even though “Clear filters” may be a command.
- The contract lacks resolved-state truth, canonical composition, atomic result
  replacement, target Status/focus ownership and no-loading/error boundaries.
- Shopify's `main-collection.liquid` always renders an empty native list when
  `collection.products` is empty. It has no E7 markup, locale strings or policy
  distinguishing empty inventory from filtered no-results.
- Shopify exposes `collection.products_count` for the current view and active
  storefront filters can produce no-results pages, but those facts do not choose
  copy, recovery, filter retention, pagination replacement or focus policy.

### Baseline performance

| Artifact | Raw | Gzip | SHA-256 |
| --- | ---: | ---: | --- |
| E7 slice | `1,541 B` | `509 B` | `6f0528c873759728694f66d5a62b383adeec6c0c991be2f4e3031c089eb62534` |
| Collection family | `10,927 B` | `2,509 B` | `e3fd510d96748fb4570c434585ca7bb4b7eb43ce77b19bc1aa76c8bf55ac4d8b` |
| Primitives family | `75,332 B` | `10,575 B` | `b16a0e2f6ed16a0d30ce55b5f668395f328f2886d1c0a59e0c392593ae1c01a7` |
| Neutral Web components | `516,207 B` | `69,155 B` | `16d104aa4360f854e213eec3a043df12f003fdb9fbd44c6e88e3c7d18619b63b` |
| Shared runtime | `53,811 B` | `10,501 B` | `1e682941301520ac5a172a0b9724dc3c9f0a0bca11f042b713fec2b60375e24a` |

Collection has only `51 B` below its `2,560 B` gzip family ceiling. E7 must
remove its duplicate local CSS and reuse existing primitives rather than seek a
budget exception. Neutral runtime must remain `0 B` for E7.

## External Research

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| [WAI WCAG 4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | “No results returned” after an in-place user action can be a status message; the criterion does not require authors to create new status text for every static page. | Keep the visible E7 root ordinary. A pre-existing target Status owner announces qualifying dynamic transitions without moving focus or making every root live. |
| [WAI heading structure](https://www.w3.org/WAI/tutorials/page-structure/headings/) | Heading ranks communicate surrounding document structure. | Inherit A13's contextual heading boundary; do not fix rank in neutral E7 or expose it as visual Studio styling. |
| [Open UI components](https://open-ui.org/components/) | The component index defines no Empty State widget behavior or standardized anatomy. | E7 is ordinary semantic composition, not a custom ARIA widget or runtime primitive. |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) | Radix focuses on behavior-heavy accessible primitives and provides no Empty State primitive. | Consume native content and canonical Gallery actions; there is no headless widget state to copy. |
| [Shopify POS EmptyState](https://shopify.dev/docs/api/pos-ui-extensions/2026-01/web-components/layout-and-structure/emptystate) | Separates heading/subheading from graphic and Button-or-Link action slots. | Confirms slot composition. Gallery keeps one action and target-agnostic lifecycle rather than copying POS-specific secondary actions/icon inventory. |
| [Shopify collection Liquid object](https://shopify.dev/docs/api/liquid/objects/collection) | `products_count` is the count for the current collection view; filters and products are target data. | Shopify can detect zero current results, but the target still needs accepted policy to distinguish causes and choose replacement/recovery. |
| [Shopify storefront filtering](https://shopify.dev/docs/storefronts/themes/navigation-search/filtering/tag-filtering) | Active filters can legitimately create collection pages with no results. | Do not assume every zero view means empty inventory or hide filter recovery unconditionally. |
| [Atlassian Empty State](https://atlassian.design/components/empty-state) | Describes no data and the next useful action. | Supports concise domain copy and recovery without creating widget semantics. |
| [Carbon Empty States](https://v10.carbondesignsystem.com/patterns/empty-states-pattern/) | Distinguishes no-data and user-action/no-results cases; recommends replacement of stale underlying results and optional Button/Link recovery. | Target owns classification and replacement. E7 keeps one canonical action slot rather than semantic variants that imply policy. |

### Convergence

- required concise title plus optional explanation and recovery;
- empty content replaces the missing result region rather than coexisting with
  stale rows/cards/pagination;
- decorative visuals do not carry meaning;
- Button and Link are distinct action semantics;
- loading and errors are not silently treated as resolved empty results; and
- dynamic no-results feedback may need a target status announcement.

### Differences and non-consensus

- systems differ on one versus multiple actions, centered versus left-aligned
  presentation, illustration scale and first-use education;
- no standard chooses empty-inventory versus filtered-no-results copy;
- no source defines whether filters stay visible, how focus recovers, whether a
  navigation URL or in-place command clears filters, or how Shopify section
  refresh/history participates;
- no external system defines The Gallery's visual style; and
- ADR 0236 fixes heading rank as host-owned contextual native markup, outside
  E7 properties and Studio controls.

## Recommended Anatomy And API

| Part | Required | Candidate mapping | Owner |
| --- | --- | --- | --- |
| Root profile | yes | ordinary `.empty-state.empty-collection` | E7 context + canonical Empty State |
| Icon | no | `.empty-state__icon[aria-hidden="true"]` | canonical Empty State + target visual |
| Title | yes | contextual heading `.empty-state__title` | target document + canonical Empty State |
| Message | no | `.empty-state__message` paragraph | target copy + canonical Empty State |
| Action | no | one `.btn` or `.link` slot | canonical Button/Link + target behavior |
| Dynamic Status | outside | pre-existing target live region when required | collection coordinator |

| Property | Type | Requirement | Direction |
| --- | --- | --- | --- |
| `title` | string | required non-empty | Truthful visible collection-empty title; blank omits the full profile. |
| `message` | string | optional | Concise explanation/next step; blank omits the node. |
| `icon` | slot | optional | Decorative/text-redundant only; hidden from accessibility. |
| `action` | slot | optional | Exactly one canonical Button command or Link navigation. |

Do not expose cause/reason, loading, error, result count, heading level, action
kind/label/href/callback, focus destination, announcement, icon name, variant,
size, alignment, padding, measures, breakpoint or Shopify query details as E7
properties. The action slot already preserves target-native semantics without
copying dependency APIs.

## State And Behavior Matrix

| State or mode | Expected behavior |
| --- | --- |
| Resolved static absence | Ordinary content; no automatic live role or focus move. |
| Dynamic no-results | Target replaces stale results and emits a concise pre-existing Status update if it qualifies. |
| Genuine empty inventory | Target supplies truthful copy and optional navigation; no inferred filter-reset command. |
| Filtered/search no-results | Target may preserve relevant filter controls and supply Button command or real reset Link according to its architecture. |
| Loading/pending | Do not render E7; use canonical loading composition. |
| Error/permission/offline | Do not infer E7; target uses truthful error/permission pattern. |
| Full composition | Decorative icon, title, message and one action. |
| Optional omission | Title-only and any valid independent optional combination collapse through A13 spacing. |
| Missing title | Omit complete profile; never render an empty heading/shell. |
| Long/localized/unbroken | Canonical wrapping grows vertically without clipping. |
| RTL/zoom/text spacing | Logical order preserved; no horizontal overflow. |
| Light/dark/forced colors | Semantic A13 copy/icon and canonical action stay legible/focusable. |
| Reduced motion | E7 adds no motion; canonical action honors its own contract. |

## Controlled / Uncontrolled Strategy

E7 has no internal controlled/uncontrolled state. The collection target owns one
authoritative resolved-state projection and swaps Grid/Pagination/E7 as a single
composition decision. Button commands, Link navigation, URL/history, filter
values, focus and announcements remain in the target. E7 emits no synthetic
state event and stores nothing.

## Token, CSS And Runtime Direction

- E7 should reference no public visual tokens directly; canonical Empty State
  and Button/Link own them.
- Retain only a minimal `.empty-collection { min-inline-size: 0; }` domain hook,
  following Cart Empty precedent, and remove all duplicated E7 anatomy/action
  CSS.
- Use no E7 viewport/container query: A13 already responds to its actual
  container.
- E7 adds no listener, observer, timer, request, storage, analytics, layout read
  or component asset. Site fixture handlers are target proof only.
- Collection must remain below `2,560 B gzip`; the expected simplification
  should recover most of the baseline `509 B` E7 slice.

## Target Translation

- **Neutral Web:** `.empty-state.empty-collection`, canonical parts and one
  target-composed native Button or Link.
- **Shopify:** planned target profile in `main-collection.liquid`, selected from
  accepted current-view versus source-inventory/filter truth, localized copy,
  truthful reset/navigation, coherent Grid/Pagination/filter replacement and
  section-refresh/focus/status policy.
- **React/Angular/Hydrogen:** parent results controller selects the passive
  profile and supplies contextual heading/action; no E7 local state.
- **Webflow/Framer:** canonical classes and target-authored state/action; no
  copied E7 visual system.
- **Figma:** Empty State instance/profile with Collection semantic naming and
  optional slot presence after E7-specific owner review.
- **SwiftUI/Compose:** native content-unavailable/empty composition while the
  collection coordinator owns data, announcement and recovery semantics.

## Evidence Plan

1. Preserve existing Mobile/Desktop Exhibit/Studio screenshots as before proof.
2. Extract one `EmptyCollectionArtwork` that consumes `EmptyStateArtwork` and
   one shared E7 fixture.
3. Prove normalized DOM/non-geometric styles match between Exhibit and Studio.
4. Capture paired Mobile, Tablet, Desktop and XL default states.
5. Verify ordinary root, contextual heading, hidden icon, canonical action and
   absence of role/live/focus on E7 itself.
6. Test native Button pointer/Space/Enter behavior and a secondary Link
   composition without adding E7 event semantics.
7. Verify title-only, message/icon/action omission, blank-title failure, and one
   action maximum.
8. Test direct 200/320/520/720px hosts, localized/unbroken copy, RTL, text
   spacing and effective 200% zoom.
9. Measure light/dark copy and action contrast; inspect forced-color focus and
   reduced motion.
10. Assert E7-specific CSS/runtime duplication is absent and measure recovered
    Collection/Web bytes.
11. Regenerate copied CSS/adapters, validate all global gates and finish with a
    clean browser/server resource assertion.

## Risks And Open Questions

### Resolved owner policy

- E7 remains a named Collection profile with zero intentional divergence from
  canonical Empty State;
- no public cause enum is added; source inventory empty, filtered/search zero
  and merchandising exclusion remain target lifecycle facts;
- the target owns truthful copy, filter/sort visibility, atomic Grid/Pagination
  replacement, Button-or-Link recovery, URL/history, status and focus;
- E7 creates no automatic live region and a qualifying transition may update one
  pre-existing target Status owner; and
- the host owns contextual heading rank under ADR 0236.

Real-target source-data distinction and Shopify section integration remain
implementation evidence gates, not unresolved neutral E7 decisions.

### Human visual input required

- approve whether E7 exactly inherits A13 or needs a distinct domain treatment;
- approve center alignment, icon presence/tone/scale, title/message hierarchy,
  spacing, measure and action prominence;
- approve full-page versus embedded placement and narrow-container rhythm;
- provide or approve E7-specific Figma artwork and localized fixtures; and
- explicitly approve stability after reviewing complete evidence.

### Supported alternatives

1. **Recommended:** retain E7 as a zero-visual-delta Collection profile over
   canonical Empty State with one Button-or-Link action slot.
2. **Collapse E7:** remove the named component and document direct A13 use in
   collection targets. This changes registry/product architecture and requires
   explicit owner approval plus migration.
3. **Cause-specific variants:** add no-inventory/no-results semantics only after
   every target's truth source, copy, replacement, recovery, announcement and
   focus policies are accepted. Do not infer these from current fixture copy.

## Refinement Outcome

E7 is technically reconciled on Neutral Web as a Collection profile over
canonical Empty State. `EmptyCollectionArtwork` is the one profile renderer used
through the shared Exhibit/Studio `CollectionStudio` path. It trims the required
title through the canonical renderer, fails closed when it is blank, independently
omits message/icon/action, hides the decorative icon, and accepts one target-owned
canonical Button command or Link navigation without inventing a destination.

The old E7-specific title, message, icon and CTA implementation is removed.
`.empty-collection` now retains only logical zero-min containment while Empty
State owns layout, typography, wrapping and container response and Button/Link
own interaction, focus, forced colors and reduced motion. The final E7 slice is
`168 B` raw / `101 B gzip`, down `408 B gzip`; Collection is `2,302 B gzip`
against the unchanged `2,560 B` ceiling, leaving `258 B`. E7 adds no neutral
runtime and the shared runtime hash remains unchanged.

Final evidence has `failures: []` across four paired natural viewports, direct
200--720px hosts, title-only/full/blank-title states, one Button and one Link
composition, native pointer/Space/Enter behavior, localized unbroken content,
RTL plus text spacing, effective 200% zoom, light/dark AA contrast, forced-color
focus and zero reduced-motion animation. Exhibit and Studio have identical
normalized DOM and non-geometric style hashes. Visual inspection confirms the
baseline docs-heading divider no longer leaks into E7.

Web, Shopify and Webflow component projections are regenerated and Collection
CSS is source-identical where copied. Shopify remains honestly planned until
its owning collection section proves the accepted source-versus-current-view
distinction, truthful localized content/recovery, atomic result replacement and
section-refresh lifecycle. E7 remains `pilot`, is not `stable`, and is now ready
for explicit human visual, target and stability review.
