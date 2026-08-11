# Component Dossier: Filter Panel

Status: `human-review-ready`

Target reviewed: Neutral Web, first-party React docs target and Shopify

Contract: `components/contracts/filter-panel.contract.json`

Decision: ADR 0250

## Recommendation

Use Filter Panel as a domain-neutral faceted filtering composition: one named
native GET form, one control tree and one committed-value projection. Render the
same surface beside results when the component container is coherent and inside
canonical modal Drawer when constrained. Expose `immediate | manual`
commitment, with Immediate default. Keep groups always visible in v1 and keep
sort/result count in the owning result composition.

The target remains the source of truth for facet discovery, selected values,
query keys, URL/history, requests, results, status, focus, pagination reset and
analytics. Filter Panel owns only coherent form anatomy, adaptive placement and
the bounded Drawer lifecycle. This preserves a platform-independent base while
making Web and Shopify fully linkable and progressively enhanceable.

## Purpose, Uses And Limits

- Narrows any associated finite result set through target-supplied faceted
  criteria; the identity is not limited to Shopify collections.
- Typical contexts are storefront collection/search pages, catalogues, archives
  and result compositions with multiple groups.
- Checkbox owns independent values, Radio owns exclusive values, Input owns a
  real bounded range, Tag owns optional committed-value removal, Button owns
  trigger/apply/cancel and Drawer owns constrained modal presentation.
- Collection Grid, lists or another target result composition stay outside the
  form so Product Forms and other nested consumer forms remain valid.
- Saved views, free-text result search, sort, result count, filtering algorithms,
  request transport, virtualization and data persistence are outside E3.
- Filter Bar is the compact horizontal sibling component; it is not an alias or
  responsive rendering of Filter Panel.

## Source Baseline And Accepted Correction

The Batch 36 baseline used public identity `filters` / Collection Filters. It
had a native technical core after initial refinement, but the wide sidebar was
viewport-driven, every group disappeared on Mobile, no narrow replacement
existed, commitment was unresolved, Shopify exposed no available facet form and
the target contract remained incomplete.

Owner decision 08 and ADR 0250 resolve those blockers:

- migrate directly to `filter-panel`, `.filter-panel` and Filter Panel;
- one form/control tree, never separate desktop/mobile trees;
- private component-width switch at `40rem`;
- adjacent non-modal panel when wide, canonical modal Drawer when constrained;
- `immediate | manual`, with Immediate default;
- Manual draft plus Apply/Cancel; Cancel restores committed state without URL;
- always-visible v1 groups; and
- target-owned query/result lifecycle with sort/count outside E3.

No permanent compatibility alias is retained because the goal is pre-v1 and the
owner explicitly accepted the identity migration.

## Research Evidence

| Source | Evidence | Gallery direction |
| --- | --- | --- |
| [HTML forms](https://html.spec.whatwg.org/multipage/forms.html) | Native GET forms, successful names/values, fieldset/legend, change, submit, reset and FormData already define the baseline. | Preserve one real form instead of inventing a filter role or hidden value owner. |
| [WAI form grouping](https://www.w3.org/WAI/tutorials/forms/grouping/) | Related choices need a concise group name; fieldset plus first legend supplies it. | Every v1 facet group is a native labelled group. |
| [APG modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Modal presentation requires a name, contained focus, Escape, background exclusion and logical focus return. | Constrained presentation composes canonical Drawer lifecycle; wide presentation removes modal semantics. |
| [Open UI components](https://open-ui.org/components/) | There is no standardized storefront Filter widget. | Do not claim a custom `filter` role or browser-standard adaptive shell. |
| [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog), [Checkbox](https://www.radix-ui.com/primitives/docs/components/checkbox) | Surface open state and choice state are separable controlled/uncontrolled concerns. | Drawer lifecycle must not become a second selected-value store. |
| [Polaris Filters](https://polaris-react.shopify.com/components/selection-and-input/filters) | Consumers own query/value state while the system composes labelled controls. | Keep target data and result orchestration outside neutral E3. |
| [Shopify storefront filtering](https://shopify.dev/docs/storefronts/themes/navigation-search/filtering/storefront-filtering) | Merchant-configured facets map to URL parameters and pagination must reset. | Shopify owns real keys, values, URL/history and results. |
| [Shopify `filter`](https://shopify.dev/docs/api/liquid/objects/filter) and [`filter_value`](https://shopify.dev/docs/api/liquid/objects/filter_value) | Liquid exposes boolean/list/price types, counts, parameter names, price bounds and add/remove URLs. | Main Collection branches on real types and maps canonical controls rather than fixture data. |

Studio references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and
inspector `1020:480`. The inspected nodes show the generic Studio shell/Button
pilot, not Filter Panel artwork. They remain traceability evidence only; the
repository candidate requires human approval for width, density, surface,
divider, hierarchy and Drawer treatment.

## Anatomy And Composition

| Part | Required | Semantic/profile mapping | Ownership |
| --- | --- | --- | --- |
| Root | yes | neutral `.filter-panel`, named inline-size container | E3 adaptive boundary |
| Trigger | yes | canonical Button, available only in Drawer mode | Drawer activation |
| Active list/items | optional | native `ul/li`, each item composes canonical Tag | committed target values/removal request |
| Layout | yes | surface plus sibling results | E3 adjacency only |
| Overlay | yes | canonical Drawer overlay, active only while modal | Drawer |
| Surface | yes | one canonical Drawer root; non-modal in wide mode | shared form host |
| Header/title/close | yes | visible heading and canonical Close Button | surface naming/dismissal |
| Form | yes | one named native `form[method=get]` | current form values/submission |
| Body | yes | scrollable in Drawer, intrinsic in panel | group host |
| Groups | optional/repeated | fieldset, first legend, canonical choices | target facet data |
| Price range | optional | two canonical bounded numeric Inputs | source-backed price facet |
| Footer | Manual only | canonical Cancel and submit Button | draft lifecycle |
| Results | yes | target composition outside the form | query/result owner |

The surface may change presentation but never moves selected values into a
parallel hidden form. Result content is a sibling of the form at every width.

## State, Variant And Mode Matrix

| Dimension | Supported v1 values | Rule |
| --- | --- | --- |
| Commit | `immediate` (default), `manual` | Immediate change is committed; Manual edits draft until Apply. |
| Surface | panel, Drawer closed, Drawer open | Derived from root container width, not public visual API. |
| Selection | none, one, many, disabled/unavailable | Canonical child controls own semantics. |
| Active projection | absent, one, many | Committed values only; draft values never masquerade as applied. |
| Groups | zero, one, many | Always visible within the active surface; no collapse state. |
| Data type | boolean, list, bounded price range | Target data mapping, not a neutral facet-schema property. |
| Result lifecycle | idle, pending, success, empty, error | Entirely target-owned and kept truthful during replacement. |
| Theme/media | light, dark, forced colors, reduced motion | Canonical dependencies preserve focus/contrast/motion. |
| Direction/content | LTR, RTL, localized, long/unbroken, 200% | Logical layout and intrinsic wrapping; no text clipping. |

## Public API And State Ownership

- `commitMode`: optional enum `immediate | manual`, default Immediate.
- `label`: required visible localized surface title and form name.
- `formAction`: required real GET destination.
- `triggerLabel`, `dismissLabel`: required localized Drawer actions.
- `applyLabel`, `cancelLabel`: required by adapters only in Manual mode.
- `activeFiltersLabel`: optional list name when committed values exist.
- `activeFilters`: optional canonical Tag-item composition.
- `filterGroups`: optional fieldset/control composition.
- `results`: required associated target result composition.

Native Web is uncontrolled from authored checked/value state and emits normal
input/change/reset/formdata/submit. The neutral enhancer emits
`tg:filter-panel-change-request`, `tg:filter-panel-commit-request`,
`tg:filter-panel-cancel-request`, `tg:filter-panel-open-change` and
`tg:filter-panel-surface-change` without mutating query/history/results.
Framework targets may control committed values and, in Manual mode only, one
draft projection. They must not introduce a hidden second owner.

## Tokens, Variables And Hardcoded Values

Public customization remains bounded to existing semantic decisions:

- color: `--color-border-subtle`, `--color-text-primary`;
- spacing: `--space-layout-grid-gap`, `--space-layout-element-gap`; and
- typography: `--typo-body-size`.

Private composition uses `--_filter-panel-inline-size: 15rem`, a `40rem`
container threshold and fractional derivations of the accepted element gap.
These are not target-stable semantic choices and remain private. Drawer width,
overlay, motion, focus and z-index come from canonical Drawer; Checkbox, Radio,
Input, Tag and Button retain their own tokens. There are no component assets,
target URLs, request constants or data values in CSS.

## Accessibility And Interaction

- The visible title names both the native form and constrained dialog.
- Drawer mode exposes one `aria-haspopup="dialog"` trigger, `aria-expanded`,
  `role="dialog"`, `aria-modal="true"`, contextual close name, Escape/backdrop
  dismissal, contained Tab/Shift+Tab, result inertness, scroll lock and trigger
  restoration.
- Panel mode removes role/aria-modal, keeps the surface in flow and makes trigger
  and close controls unavailable.
- Native fieldset/legend and canonical named controls retain browser keyboard,
  disabled, reset and serialization behavior. There are no menu/listbox/grid
  roles on ordinary form choices.
- Manual Cancel restores committed controls; Apply submits/commits one draft.
- Active Tag removal uses a contextual native action. The capable target owns
  surviving focus and any useful result-status message after reconciliation.
- Target result replacement must not leave focus inside stale result DOM and
  must expose only one meaningful localized status owner.

## Responsive, Content And Runtime

`ResizeObserver` reads only the Filter Panel root. At `>= 640px` it projects the
one surface as an adjacent panel; below it projects the same surface as Drawer.
Mutation cleanup disconnects observers for removed roots. A mounted root has
bounded listeners for trigger/close/backdrop/keyboard/form/cancel and no timer,
storage, request, formatter or asset. The native form remains usable without JS.

Required evidence covers direct hosts at 320, 520, 639, 640 and 760 CSS pixels;
Mobile, Tablet, Desktop and XL page contexts; no groups, many groups, disabled
values, price range, long/localized/unbroken labels, RTL, text-spacing and 200%
zoom; immediate and manual state; light/dark, forced colors and reduced motion.

## Cross-Target Translation

| Target | Mapping | Status |
| --- | --- | --- |
| Web | canonical HTML/CSS/JS; one GET form; container-derived panel/Drawer; lifecycle events | implemented/generated/validated |
| Shopify | Main Collection `collection.filters`, native names/values/counts, boolean/list/price controls, removal URLs, native GET, editor commit setting | implemented/adapter-ready; live theme review remains human/target evidence |
| React docs target | one controlled renderer with committed/draft state and canonical Drawer lifecycle | implemented; Exhibit/Studio shared |
| Angular | same form/value/event contract with framework-managed committed/draft projection | planned |
| Figma | Panel/Drawer and Immediate/Manual properties after visual approval | planned |
| SwiftUI / Compose | one selection model in adjacent inspector or modal sheet based on local navigation/container | conceptual |

## Performance And Risks

- Collection family remains within its fixed `2.5 KiB` gzip ceiling after
  removing obsolete swatch-only CSS and simplifying non-semantic comments/rules.
- The required adaptive lifecycle adds shared runtime; ADR 0250 documents this
  contribution to the pre-existing global runtime gap without raising a ceiling.
- Main residual risks are visual approval, live Shopify section replacement and
  history behavior, extreme merchant facet counts, optional future swatch/image
  data policy and absence of component-specific Figma artwork.
- A future async result coordinator must remain target-native; moving fetch,
  history or live-region behavior into neutral Filter Panel would violate the
  accepted boundary.

## Readiness

The semantic, responsive, interaction, target and documentation blockers are
reconciled. Filter Panel is ready for explicit human visual/stability review but
remains `pilot`. Human review must approve the adjacent width/threshold, surface,
divider and spacing hierarchy, Drawer geometry/motion, localized wrapping and
live target behavior before any `stable` promotion.
