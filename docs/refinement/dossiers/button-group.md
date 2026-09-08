# Component Dossier: Button Group

Status: `human-review-ready`

Target reviewed: Neutral Web and canonical Button composition

Contract: `components/contracts/button-group.contract.json`

## Recommendation

Retain Button Group as a structural `role="group"` that composes complete
canonical Button children in normal Tab order. Do not turn it into a Toolbar,
selection control, or source of child state. Preserve Default and Full as the
accepted layout variants. Reconcile physical corner rules with RTL, test
full-width extreme content and focus overlap, and expose invalid empty group
labels instead of inventing a Studio fallback.

## Purpose And Limits

- Groups related independent actions into one visual and semantic set.
- Default keeps content width; Full distributes available container width.
- The root owns joined borders, outer corners, distribution, and group context.
- Button owns every child label, variant, size, disabled/busy state, semantics,
  event, and focus behavior.
- Button Group does not own selection, pressed/current values, arrow-key
  navigation, roving tabindex, overflow menus, action prioritization, or
  responsive stacking.

## Current Gallery Baseline

- Registry identity: `A16`, primitive, dependency `button`.
- Contract: `0.3.0`, `pilot`; two anatomy parts, two variants, one inherited
  size, one state, three behavior rules, two properties, and one public token.
- ADR 0062 accepts required `groupLabel` and Default/Full only.
- Canonical CSS joins child borders on logical inline edges, restores logical
  outer radii, and raises the focused Button above adjacent borders.
- Full distributes equal width and wraps localized or indivisible labels without
  page-level overflow; Default remains intrinsic.
- Studio composes between one and eight canonical outline Buttons in its
  bounded documentation fixture. The reviewer can change the fixture count and
  every visible Button label while the supplied required group label continues
  to render verbatim, including an invalid empty value.
- The design reference is the generic Button pilot frame, not a Button
  Group-specific owner reference.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) | Toolbar is a composite widget with one Tab stop and arrow/Home/End navigation; APG recommends it only for groups of at least three controls. | Gallery Button Group is not Toolbar because it intentionally preserves every child in normal Tab order. |
| [WAI-ARIA `group` role](https://www.w3.org/TR/wai-aria/#group) | Group creates a logical set that is not intended for page-summary navigation. | `role="group"` plus a useful name matches the accepted structural purpose. |
| [Shopify Polaris Button group](https://shopify.dev/docs/api/app-home/web-components/actions/button-group) | Groups related actions, supports a label and connected/spaced layouts, and leaves action hierarchy to child buttons. | Gallery's smaller connected-group API remains valid; gap, slots, and priority are not inferred. |
| [Radix Toolbar](https://www.radix-ui.com/primitives/docs/components/toolbar) | Adds orientation, looping, and roving focus when toolbar semantics are intended. | Those behaviors belong in a distinct Toolbar contract, not Button Group. |

Open UI does not define an independent generic Button Group primitive. Native
Button behavior and ARIA structural grouping are controlling evidence.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | `role="group"` | Button Group | Label explains why the actions belong together. |
| Button child | one or more | native `button` or accepted Button link host | Button | Keeps its own accessible name, state, and event. |

Zero children is invalid composition. Mixed Button visual variants are allowed
by child ownership but require human visual review inside joined borders.

## Variant, State, And Mode Matrix

- Variants: Default content-width and Full distributed width.
- Size: inherited from each Button; the group adds no density.
- Root state: Default only. Full is a layout variant, not a state, under the
  global variant/state orthogonality rule in ADR 0274.
- Child states: the complete accepted Button matrix, including focus-visible,
  disabled, busy, and reduced motion.
- Modes: LTR/RTL, light/dark, forced colors, short/long/localized/unbroken labels,
  narrow/wide containers, one/two/many children.
- No controlled/uncontrolled value or group event.

## Public API And Ownership

`groupLabel` and `variant` remain the complete public semantic surface. The group
does not expose child arrays, labels, priority, disabled state, or activation.
`aria-labelledby` remains a valid authored alternative at a raw target level,
but the accepted cross-target property is the direct group label.

Studio's Button count and per-button label fields are explicitly fixture
controls. They exercise consumer-owned Button composition without becoming
Button Group properties or target mappings (ADR 0291).

## Token And Value Audit

- Public: `--radius-md` only.
- `-1px` border overlap and zeroed inner radii are private layout geometry.
- Border, color, typography, spacing, motion, and focus tokens come from Button.
- Component JS, listener, observer, timer, and asset cost should remain zero.

## Accessibility And Interaction

Every child remains independently tabbable and activates through native Enter or
Space. Arrow keys must not be captured. The root needs a useful accessible name
and must not imply selection. Focus-visible outlines must escape adjacent border
overlap in normal and forced-colors modes.

## Responsive And Content Audit

Test Full at the four required containers with short, localized, and indivisible
labels. Joined buttons should not create page overflow, but automatic wrapping or
stacking cannot be added without an accepted layout decision because it changes
corner and reading-order behavior. Default remains intentionally intrinsic.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Named `role="group"` plus canonical Button children. | RTL/content/focus evidence pending. |
| Shopify | Liquid wrapper plus copied Button classes. | CSS implemented; target visual evidence pending. |
| React / Angular | Structural wrapper around consumer Button children. | Contract-ready; no certified adapter. |
| Figma | Group label metadata plus joined Default/Full layout. | Component-specific reference absent. |
| SwiftUI / Compose | Accessibility group/container plus independent child actions. | Conceptual mapping only. |

## Findings And Direction

| Finding | Severity | Direction | Owner |
| --- | --- | --- | --- |
| First/last radii used physical left/right corners. | resolved | Logical inline-start/end corners and overlap verified in RTL. | implementation |
| Full retained child overflow under extreme labels. | resolved | Equal shares, `min-width: 0`, and resilient wrapping keep the document at viewport width. | implementation |
| Studio invented a group label when the required property was empty. | resolved | Supplied values render verbatim and empty remains visibly invalid. | implementation |
| Studio fixed the child composition to three labels. | resolved | Add bounded fixture controls for one to eight canonical Button children and every visible label without changing the public contract. | owner, ADR 0291 |
| Automatic stacked/wrapped layout has no accepted contract. | decision-needed if required | Keep current variants; present a separate responsive-layout proposal only with owner demand. | owner / architecture |
| No component-specific visual reference exists. | review input | Approve repository render or supply reference. | owner |

## Readiness Decision

Ready for human review; remains `pilot`. RTL, extreme content, normal group
keyboard behavior, forced colors, reduced motion inherited from Button,
Exhibit/Studio parity, four viewports, performance, and Web/Shopify adapter
validation are recorded in `docs/reports/button-group-web-refinement-audit.md`.
Human approval remains required for the visual treatment and Full wrapping.
