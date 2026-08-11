# Grid / List View Toggle Web Refinement Audit

Status: `human-review-ready`

Date: 2026-07-20

Component: `E5` / `view-toggle`

Contract: `0.3.0` / `pilot`

ADR: [0247 View Toggle Native Segmented Control Profile](../decisions/0247-view-toggle-native-segmented-control-profile.md)

Dossier: [Grid / List View Toggle](../refinement/dossiers/view-toggle.md)

## Outcome

Owner-selected E5-B is implemented. View Toggle now composes canonical native
Segmented Control rather than two pressed Toggle Buttons. The fixed Grid and
List values are same-name Radios inside a visible Fieldset/Legend group, each
with a decorative icon and complete visible text.

Native Radio behavior supplies one Tab entry point, logical arrows, Space,
input/change, FormData, disabled propagation, and reset. Grid is the neutral
default. Neutral E5 stores no preference, mutates no results, emits no live
announcement, and adds zero runtime.

All E5 semantic, interaction, parity, responsive, contrast, special-mode,
adapter, and resource-lifecycle checks pass. The contract remains `pilot`; final
visual and target integration review is pending and no `stable` promotion is
claimed.

## Certification Summary

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Fixed presentation choice; results/preference lifecycle target-owned. |
| Accepted semantics | pass | E5-B native Segmented Control replaces pressed Buttons. |
| Anatomy | pass | Fieldset, visible Legend, two native Radios, labels, icons, visible text. |
| Public API | pass | Group label, field name, Grid/List labels, activeView, disabled. |
| Canonical composition | pass | Consumes Segmented Control renderer/classes/states; no parallel Toggle implementation. |
| Controlled/uncontrolled | pass | One checked/default or one controlled activeView value. |
| Accessibility/interaction | pass | One Tab entry, logical arrows, Space, events, FormData, reset, disabled. |
| Responsive/content | pass | Eight natural captures plus 200px localized RTL/text spacing. |
| Exhibit/Studio parity | pass | Exact DOM/style hashes and exact measured geometry. |
| Tokens/presentation | pass | Existing full-radius and icon spacing tokens; private fixture width only. |
| Runtime/performance | pass | E5 runtime 0; Collection has 194 B gzip headroom. |
| Web/Webflow | pass | Generated adapter validates and target copies are source-identical. |
| Shopify | planned honestly | Target section/result/default/editor/live-store proof pending. |
| Human review | pending | Final visuals, E5 Figma, and target integration remain explicit gates. |

## Baseline And Accepted Change

The historical candidate used a canonical Toggle Group profile with two
independently tabbable Buttons, opposing `aria-pressed` values, icon-only visible
content, and no native form value/reset. ADR 0217 recorded that candidate, but
the owner later selected E5-B.

ADR 0247 supersedes ADR 0217 and applies the accepted direction:

- one complete native Segmented Control group;
- fixed `grid` then `list` values;
- one Tab entry and logical arrow navigation;
- fixed icon plus visible localized text in both segments;
- clear active surface with checked Radio as sole state owner;
- Grid default unless a valid target preference is supplied;
- omission when only one real layout exists; and
- target ownership of results, URL/persistence, focus/scroll, analytics, and
  announcements.

## Implementation Result

`ViewToggleArtwork` delegates its fieldset, legend, items, inputs, labels,
checkedness, native events, disabled state, reset semantics, focus, forced
colors, and reduced motion to `SegmentedControlArtwork`. It supplies only the
fixed values, visible Grid/List content, decorative icons, and E5 classes.

`CollectionStudio` uses one exported `viewToggleFixture` for Exhibit and Studio.
Its surrounding form exists only to prove native form/reset behavior and has a
site-owned 24rem evidence width; neutral E5 fills whatever container a target
provides.

Required empty group/name/item labels fail closed. E5 exposes no arbitrary
options, icon names, orientation, validation variants, result selectors,
persistence keys, breakpoint, or component-specific runtime.

## Browser Evidence

Batch 131 used one managed server at `127.0.0.1:4173`, one named headless
Chromium session `gallery-refinement`, and one page navigated serially. The final
gate stopped all owned resources and confirmed port 4173 free.

Eight captures cover Exhibit and Studio at mobile `390x844`, tablet
`768x1024`, desktop `1440x1000`, and XL `1920x1200`. Root, stage, and document
horizontal overflow are zero in every combination; both targets remain at least
44px high.

| Measurement | Exhibit | Studio | Result |
| --- | --- | --- | --- |
| Normalized DOM hash | `3a11f50e` | `3a11f50e` | exact |
| Non-geometric style hash | `2f618385` | `2f618385` | exact |
| Desktop root | `384x70px` | `384x70px` | exact |
| Desktop segments | `188x44px` each | `188x44px` each | exact |
| Mobile root | `326x70px` | `326x70px` | exact |

Artifacts:

- `output/playwright/refinement-batch-131/final-evidence.js`;
- `output/playwright/refinement-batch-131/evidence-summary.json`;
- `output/playwright/refinement-batch-131/after/view-toggle/`; and
- `output/playwright/refinement-batch-131/special/`.

## Semantic And Interaction Result

- Root is native `FIELDSET`, visible Legend is `Collection view`, and the root
  has no redundant role, `aria-label`, or `aria-pressed`.
- Two same-name Radios expose only `grid` and `list`; Grid is initially checked.
- There are zero Buttons, pressed attributes, or authored Radio roles.
- Grid/List are visible text; both fixed icons are `aria-hidden`.
- ArrowRight selects and focuses List, emits native input/change, and produces
  only `collection-view=list` in FormData.
- Tab exits the group; Shift+Tab returns to the checked List Radio.
- Reset restores Grid. Disabled Fieldset propagation disables both choices and
  removes the value from FormData.
- Clearing the required group label removes the complete renderer.

## Accessibility And Special Modes

At a direct 200px host, long Arabic labels with RTL and user text spacing remain
two equal horizontal segments, wrap to `112px` target heights, and produce zero
root/stage/document overflow.

| Content | Light | Dark |
| --- | ---: | ---: |
| Legend | `17.93:1` | `17.18:1` |
| Selected text/icon | `17.93:1` | `17.18:1` |
| Unselected text/icon | `7.17:1` | `10.21:1` |

Reduced motion reports zero animations and `0s` transition durations. Forced
colors preserves selected Grid, actual keyboard `:focus-visible`, a 2px inner
indicator, a 4px outer ring, and readable system colors.

Visual inspection confirms the owner-directed joined pill, icon-plus-visible-
text options, clear selected surface, dark equivalent, and readable RTL extreme.
The first evidence pass exposed a `0px` shrink-to-fit fixture collapse; the final
site wrapper correction was rebuilt and the full evidence set recaptured before
certification.

## CSS, Tokens, And Performance

E5 CSS owns only equal distribution, full radius, icon geometry/gap, and
wrap-safe text. Canonical Segmented Control retains all behavioral states and
media accommodations. No new token layer or viewport breakpoint exists.

| Artifact | Baseline | Final | Result |
| --- | ---: | ---: | --- |
| E5 CSS slice | `1,428 B / 522 B gzip` | `1,296 B / 427 B gzip` | `95 B` gzip reclaimed |
| Collection family | historical `2,250 B gzip` | `2,366 B gzip` | `2,560 B` ceiling; `194 B` headroom |
| Neutral component CSS | historical `68,877 B gzip` | `71,558 B gzip` | existing documented global gap of `6,022 B` |
| Shared runtime | current program surface | `21,633 B gzip` | existing documented gap; E5 delta `0 B` |

Final SHA-256:

- E5 slice: `fd449252d6262d133ee8064fe27ef4112c3c397d41a04b85de9bbd0e4d06a778`;
- Collection CSS: `c620bbba92b0c3db86ccb3944b6ed1824edb5d3e8203ead95266ece032b947e0`;
- neutral Web components:
  `b0a670c989c0a43b2a4799f7918dc01e7bfeff8d87e42a6391b89a4d5c635399`;
- shared runtime:
  `e2380b1cc981da9e1a1c0ffbe503e10313c96ee653fa990203a45f6b0ef74fce`.

Collection CSS is byte-identical across canonical source, Shopify, and Webflow.
The global audit reports 18 surfaces, 10 pass, 8 documented gaps, and zero
undocumented gaps; no ceiling was raised.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Native Segmented Control Fieldset/Radios and fixed E5 content. | Implemented/evidenced. |
| Static Web/Webflow | Authored checked value and native change/form semantics. | CSS ready; result coordinator target-owned. |
| Shopify | Optional collection-section Radio profile and target result mapping. | Planned; localized Liquid/editor/coordinator/live-store proof pending. |
| React/Angular/Hydrogen | One controlled/default value over native Radios. | React docs target evidenced; distributable adapters pending. |
| Figma | Segmented Control profile with fixed content/states. | Planned; E5-specific artifact absent. |
| SwiftUI/Compose/future | Native segmented picker/single-choice equivalent. | Conceptual translation documented. |

## Validation Ledger

Passing gates include TypeScript no-emit, 183 contracts, 183 Studio definitions,
183 docs pages, refinement decision coverage, neutral Web adapter, Shopify
adapter with known maturity warnings, source-identical target CSS, bounded
browser evidence, and clean resource/diff gates.

The performance audit passes E5/Collection and records eight existing documented
program gaps with zero undocumented gaps. `site/dist` was not rebuilt or
modified.

## Human Review And Remaining Risks

Human review should approve Legend placement, overall width, radius, density,
icon geometry, selected surface, focus hierarchy, dark mode, localized wrapping,
and coarse-pointer treatment. E5-specific Figma and live target evidence remain
pending. Targets still own preference precedence, URL/history/storage/account,
result DOM, scroll/focus, analytics, and result announcements.

The semantic-model, Grid default, icon-plus-visible-text, and one-layout omission
decisions are settled.
