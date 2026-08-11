# Component Dossier: Grid / List View Toggle

Status: `human-review-ready`

Date: 2026-07-20

Registry: `E5` / `view-toggle`

Dependency order: 141, phase 6 (Composed components); direct dependency
`segmented-control`

Decision: owner-approved E5-B, recorded in
[ADR 0247](../../decisions/0247-view-toggle-native-segmented-control-profile.md)

## Direction

E5 is the fixed Grid/List profile over canonical native Segmented Control. It
contains exactly two same-name Radio values in stable order, `grid` then `list`,
with one visible Legend, one fixed decorative icon, and complete visible
localized text in each joined segment.

The browser owns one Tab entry point, logical arrow selection, Space,
input/change, FormData, disabled propagation, and reset. One checked Radio is the
only current-view owner. Static/uncontrolled targets author one initial checked
value; controlled adapters project one `activeView` and one callback.

Grid is the neutral default unless a target supplies a valid merchant, URL, or
account preference. E5 is omitted whenever only one real layout exists. The
target result coordinator owns applying the presentation, preserving result
state, and any URL, persistence, analytics, focus, scroll, or announcement
policy. Neutral E5 stores nothing and adds zero runtime.

The owner-provided reference establishes the joined pill, icon-plus-visible-text
options, and clear active surface. It does not approve exact final colors,
dimensions, typography, or focus treatment. E5 remains `pilot` pending explicit
human review.

## Purpose, Use Cases, And Limits

### Purpose

Let a person choose whether the same current collection results are presented
as a Grid or List without changing the result query or losing context.

### In scope

- one visible native Legend and exactly two same-name native Radios;
- fixed `grid` and `list` values in stable source order;
- fixed decorative Grid/List icons plus visible localized labels;
- Grid neutral default and one target-owned current value;
- one Tab entry point, native logical arrows, Space, events, FormData, disabled,
  and reset;
- one joined equal-width horizontal presentation with 44px minimum targets;
- narrow wrapping, effective 200% text, user text spacing, RTL, dark mode,
  reduced motion, and forced colors;
- one shared Exhibit/Studio renderer and fixture; and
- documented Web, Shopify, framework, Figma, and native-platform boundaries.

### Out of scope

- rendering or mutating collection results in neutral source;
- defining Grid/List card anatomy or layout CSS for a target;
- selecting a preference-source precedence beyond the neutral Grid default;
- URL/history, local storage, account/server persistence, or analytics;
- loading, error, retry, stale-result, or automatic announcement policy;
- moving focus or scroll after activation;
- variable item inventory, orientation, multiple selection, or icon choice;
- exact merchant/editor settings or Shopify section architecture; and
- stability promotion without explicit human review.

## Accepted Decisions

- E5-B replaces the previous pressed-Button model with canonical Segmented
  Control/native Radio semantics.
- The group is one Tab stop; logical arrows move focus and selection.
- Every segment has both a fixed icon and visible text.
- Grid is the neutral initial value unless a target supplies a valid preference.
- E5 is absent when only one meaningful layout exists.
- Result updates preserve filters, sort, pagination, and product identity.
- Neutral source stores no preference and creates no result live region.
- Target coordinators own result layout, URL/persistence, focus/scroll,
  analytics, asynchronous lifecycle, and any useful localized status.

## Baseline Audit

The historical candidate was two independently tabbable pressed Buttons:

- root `.toggle-group.view-toggle` used `role="group"` and two
  `.toggle.view-toggle__btn` controls;
- state was duplicated through two opposing `aria-pressed` values;
- icons were the only visible labels, while localized Grid/List strings existed
  only as accessible names;
- native arrows, FormData, and reset were absent;
- E5 duplicated joined Button geometry instead of consuming Segmented Control;
  and
- the technical implementation followed ADR 0217 even after the owner selected
  E5-B.

The historical E5 CSS slice measured `1,428 B` raw / `522 B` gzip. Preserved
before evidence is under `output/playwright/collection/` and
`output/playwright/parity/collection/`.

## Research And Comparison

| Source | Relevant evidence | Direction for The Gallery |
| --- | --- | --- |
| [WAI-ARIA APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | Tab enters/exits a single-choice group; logical arrows move focus and selection; Space selects. | Use native Radio behavior instead of two Tab stops or custom keyboard code. |
| [Open UI Radio Button research](https://open-ui.org/components/radio-button.research/) | Radio is fundamentally a group concept; group label, required/disabled ownership, button-style presentation, icons, and at least two choices recur across systems. | Treat E5 as one complete group with two fixed values and visible labels. |
| [Radix Segmented Control](https://www.radix-ui.com/themes/docs/components/segmented-control) | Segmented Control switches among values/views through one Root and repeated value Items with joined visual variants. | Keep one value owner and joined presentation while retaining Gallery's native Radio contract. |
| [Shopify collection template](https://shopify.dev/docs/storefronts/themes/architecture/templates/collection) | The target collection template/section owns product listing composition. | Keep result DOM, editor settings, persistence, and Shopify runtime outside neutral E5. |

### Convergence

The evidence and owner reference converge on one mutually exclusive group, two
stable values, one current value, arrow navigation, visible text, a clear active
surface, and target ownership of result effects.

### Target-specific variation

Sources do not establish universal preference persistence, URL precedence,
announcement/focus policy, result DOM, Shopify editor settings, exact icon
geometry, pill radius, colors, or density. Those remain target/human review
boundaries rather than public E5 properties.

## Certified Anatomy

| Part | Required | Owner | Notes |
| --- | --- | --- | --- |
| Root | yes | Segmented Control + E5 | Native Fieldset carrying `.segmented.view-toggle`. |
| Legend | yes | Segmented Control + target | Visible localized group name. |
| Options | yes | Segmented Control + E5 | Joined surface with exactly two choices. |
| Item | two | Segmented Control | Label wrapper for Grid or List. |
| Input | two | native Radio | Same name; fixed `grid`/`list` values; sole state owner. |
| Label | two | Segmented Control | Visible 44px pointer/keyboard target. |
| Icon | two | E5/target adapter | Fixed redundant decoration, hidden from accessible naming. |
| Text | two | target | Complete visible localized Grid/List label. |

The shared renderer fails closed when group label, name, Grid label, or List
label is empty. The fixed two-option inventory cannot render a meaningless
single-choice group.

## Public API

| Property | Type | Requirement | Meaning |
| --- | --- | --- | --- |
| `groupLabel` | string | required | Visible localized Legend. |
| `name` | string | required | Native form name shared by both Radios. |
| `gridLabel` | string | required | Visible localized Grid text. |
| `listLabel` | string | required | Visible localized List text. |
| `activeView` | `grid \| list` | default `grid` | One current target-owned presentation value. |
| `disabled` | boolean | default `false` | Disables the complete native Fieldset. |

Fixed values and icons are component identity, not consumer configuration. E5
does not expose orientation, arbitrary options, icons, target size, radius,
colors, result selectors, persistence keys, breakpoints, animations, or
announcement policy.

### Controlled and uncontrolled translation

- Static/native markup authors exactly one initial `checked` Radio.
- Uncontrolled framework adapters may expose `defaultValue`, defaulting to Grid.
- Controlled adapters expose one `activeView` and one value-change callback.
- Both strategies preserve native input/change, FormData, disabled propagation,
  and reset.
- Invalid adapter values normalize at a validated boundary; they never create
  two checked values.

## State Matrix

| State | Projection | Expected result |
| --- | --- | --- |
| Grid selected | Grid Radio checked | Grid segment has active surface; one form value. |
| List selected | List Radio checked | List segment has active surface; focus follows arrow/click. |
| Hover | available segment label | Canonical Segmented hover only. |
| Focus visible | current native Radio | Canonical 4px outer + 2px inner hierarchy. |
| Disabled | Fieldset disabled | Both Radios unavailable and omitted from FormData. |
| Narrow/localized | long visible labels | Two horizontal equal segments grow vertically and wrap without clipping. |

There is one visual variant and one intrinsic size. Validation variants belong
to generic Segmented Control and are intentionally not re-exported by this
collection-view profile.

## CSS, Tokens, And Responsive Behavior

E5 owns only equal segment distribution, pill radius, icon size/gap, and
wrap-safe text. Canonical Segmented Control retains surface, selected, hover,
focus, disabled, minimum target, validation, reduced-motion, and forced-color
behavior.

The neutral component fills the inline size provided by its parent; the docs
fixture caps its own wrapper at 24rem. E5 uses existing `--radius-full`,
`--space-input-icon-size`, and `--space-input-icon-gap` tokens. It adds no
component-token layer, viewport breakpoint, layout read, or runtime.

Final metrics:

| Artifact | Actual | Budget/result |
| --- | ---: | --- |
| E5 CSS slice | `1,296 B` raw / `427 B` gzip | `95 B` gzip below baseline |
| Collection family | `2,366 B` gzip | `2,560 B` ceiling; `194 B` headroom |
| Neutral component CSS | `71,558 B` gzip | pre-existing documented global gap of `6,022 B` |
| Shared runtime | `21,633 B` gzip | pre-existing documented gap; E5 delta `0 B` |

Collection CSS is byte-identical in canonical source, Shopify, and Webflow
copies.

## Accessibility And Interaction Certification

- Final root is native `FIELDSET` with visible Legend `Collection view`.
- Exactly two same-name native Radios expose `grid` and `list`; Grid is checked
  initially.
- There are zero Buttons, `aria-pressed` attributes, or redundant Radio roles.
- Both options have visible Grid/List text and decorative `aria-hidden` icons.
- ArrowRight moves selection and focus to List, emits one input/change, and
  FormData contains only `collection-view=list`.
- Tab exits the group; Shift+Tab returns to the checked List Radio.
- Native reset restores Grid. Disabled Fieldset propagation disables both
  Radios and removes the value from FormData.
- Empty required group label omits the complete renderer.
- Normal target heights are 44px. At a direct 200px RTL host, long Arabic
  labels plus user text spacing remain horizontal, wrap to 112px targets, and
  produce zero root/stage/document overflow.
- Light contrast is `17.93:1` selected/Legend and `7.17:1` unselected; dark is
  `17.18:1` and `10.21:1` respectively. Icons inherit the same ratios.
- Reduced motion reports zero animations and `0s` transitions.
- Forced colors preserves checked Grid, keyboard focus, a 2px inner indicator,
  a 4px outer ring, and readable system colors.

## Exhibit, Studio, And Visual Evidence

Exhibit and Studio mount the same `ViewToggleArtwork`, `viewToggleFixture`, and
canonical `SegmentedControlArtwork` path through `CollectionStudio`.

- normalized DOM hashes: Exhibit/Studio `3a11f50e` exact;
- non-geometric style hashes: Exhibit/Studio `2f618385` exact;
- desktop geometry: `384x70px` on both, with two `188x44px` targets;
- mobile geometry: `326x70px` on both, with two `159x44px` targets; and
- console errors, page errors, and failures: none.

Eight final captures cover Exhibit and Studio at mobile, tablet, desktop, and
XL. Special captures cover dark/reduced motion, forced-color focus, and direct
200px localized RTL/text spacing:

- `output/playwright/refinement-batch-131/after/view-toggle/`;
- `output/playwright/refinement-batch-131/special/`; and
- `output/playwright/refinement-batch-131/evidence-summary.json`.

Visual inspection confirms the intended joined pill, Grid/List icons plus
visible text, white active surface over a quiet secondary track, clear dark-mode
equivalent, and readable wrapped RTL extreme. The evidence phase also caught and
corrected a docs-fixture shrink-to-fit width collapse before final capture.

## Cross-Target Translation

| Target | Translation | Certification result |
| --- | --- | --- |
| Neutral Web | Native Segmented Control Fieldset/Radios with fixed Grid/List content. | Implemented/evidenced; zero E5 runtime. |
| Static Web/Webflow | Authored checked value and native change/form behavior; parent owns results. | CSS ready; coordinator target-owned. |
| Shopify | Optional control in owning collection section; Liquid Radios and target result classes/settings. | Planned; localization/editor/coordinator/live-store proof pending. |
| React/Angular/Hydrogen | One controlled/uncontrolled value over native Radios. | React docs target evidenced; distributable adapters pending. |
| Figma | Canonical Segmented Control profile with Grid/List content and states. | Planned; E5-specific artifact/approval absent. |
| SwiftUI/Compose/future | Native segmented picker/single-choice equivalent. | Conceptual mapping documented. |

## Remaining Risks And Human Review

- Human review must approve Legend placement, control width, pill radius,
  density, icon geometry, selected surface, focus hierarchy, dark mode, narrow
  wrapping, and coarse-pointer treatment.
- E5-specific Figma evidence is still absent.
- Targets must settle preference precedence, URL/history/storage/account policy,
  result DOM, scroll/focus, analytics, and announcement behavior.
- Shopify still needs a target-native section/block/editor/runtime and live-store
  proof.

The pressed-Button versus Segmented Control semantic decision, Grid default,
visible icon-plus-text direction, and one-layout omission policy are accepted
and should not be reopened for later components.
