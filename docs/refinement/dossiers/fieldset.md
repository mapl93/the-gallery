# Component Dossier: Fieldset

Status: `human-review-ready`

Target reviewed: Neutral Web native grouped-field container

Contract: `components/contracts/fieldset.contract.json`

## Recommendation

Preserve a native `fieldset` whose first child is a concise, visible `legend`,
followed by an optional associated group description and a required controls
slot. Native `disabled` owns descendant control unavailability. Fieldset is a
semantic form grouping primitive, not a decorative card, generic section, or
validation engine.

## Purpose And Limits

- Groups related radios, checkboxes, or fields under one programmatic caption.
- Disambiguates repeated labels in related address or information groups.
- It is not for unrelated content or border-only presentation.
- It does not own the value, names, validity, or controlled state of descendants.
- Nested control layout is authored through canonical child components.

## Pre-Refinement Gallery Baseline

- Registry `H11`; contract `0.2.0`, `pilot`: three anatomy parts, one variant,
  one size, two states, two behaviors, four properties, and six token references.
- The required grouped-control content is absent from anatomy/properties, while
  both Exhibit and Studio rely on site-only option wrappers.
- `.fieldset` imposes a hardcoded external bottom margin and has no width,
  narrow-container, disabled presentation, forced-colors, or long legend/
  description resilience.
- Exhibit and Studio render the same example content but not the same canonical
  markup/classes.
- Native disabled propagation and form exclusion have not been browser-probed.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML fieldset](https://html.spec.whatwg.org/multipage/form-elements.html#the-fieldset-element) | `disabled` disables descendant controls except those inside the first legend. | Keep a native root and do not simulate group disabling in JavaScript. |
| [WAI grouping controls](https://www.w3.org/WAI/tutorials/forms/grouping/) | `fieldset` groups related controls and `legend` acts as the group heading; concise legends accommodate varied screen-reader repetition. | Require a visible, concise first legend and self-explanatory child labels. |
| [WAI H71](https://www.w3.org/WAI/WCAG21/Techniques/html/H71) | Fieldset/legend supplies descriptions for groups of controls, especially where grouping context is needed. | Use it for semantic grouping, not every visually adjacent set. |
| [MDN fieldset](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset) | Fieldset has implicit `group`; disabled descendants are not editable, focusable, or submitted, with the first-legend exception. | Document form consequences and test the canonical fixture. |
| [Polaris Choice List](https://polaris-site-prod-kit.shopify.prod.shopifyapps.com/components/selection-and-input/choice-list) | A mature grouped choice API exposes a title, choices, group disabled state, name, and error. | Gallery supplies the semantic grouping primitive while canonical Radio/Checkbox own choices. |

## Recommended Ownership And API Direction

- Required anatomy: native root, first visible legend, and controls/content slot.
- Optional anatomy: group description referenced by `aria-describedby`.
- Public concepts: `legend`, required `content` slot, `description`, `disabled`,
  and `describedBy`.
- Native descendants own names, values, required/invalid state, events, and
  reset. Native fieldset `disabled` owns propagation and form exclusion.
- Parent composition owns exterior spacing; Fieldset owns border, padding, and
  internal flow only.
- No JavaScript is required.

## Alternatives And Non-Decisions

1. `role="group"` plus `aria-labelledby` is a fallback for targets without a
   native fieldset, not the preferred Web adapter.
2. A generic bordered Box would lose group and legend semantics.
3. Validation variants, collapsibility, optional legend hiding, columns, and
   nested layout controls are not part of the accepted Fieldset contract.
4. The HTML `form` and `name` attributes are not promoted because they are not
   stable cross-target consumer decisions for this component.

## Implemented Result

- Contract `0.3.0` now defines 4 anatomy parts, 1 variant, 1 size, 3 states,
  3 behaviors, 5 semantic properties, and 10 existing public token references.
  The required canonical content slot and native disabled consequences are
  explicit.
- Canonical CSS owns internal border/padding/flow, long legend and description
  wrapping, disabled presentation, container-aware spacing, and forced-colors
  fallback. The former external bottom margin is removed.
- Exhibit and Studio share one native fixture and compose canonical Radio for
  the three choices. The required content slot is visible and locked in Studio;
  Fieldset itself remains generic and adds no Radio dependency or runtime.

## Browser, Content, And Performance Evidence

- Exhibit and Studio stage markup is byte-identical at 737 characters. Eight
  canonical after captures cover Mobile through XL; dark disabled and extreme
  RTL captures supplement two desktop before baselines.
- The rendered fieldset exposes one group named by `Delivery preference`, three
  canonical same-name radios, and a `520px` desktop/`326px` mobile surface.
  Selecting `pickup` emits one input/change pair and submits that value; reset
  restores `standard`. Native disabled propagation disables/excludes all
  descendants while preserving the HTML first-legend exception.
- Long localized legend, description, and option labels produce zero root/stage
  overflow. Legend text measures `17.93:1` light and `17.18:1` dark; secondary
  description text measures `7.81:1` light and `12.09:1` dark. Forced colors
  preserves the group boundary and legend.
- Component runtime remains `0 B`. ADR 0096 records the shared CSS delta; no
  asset, observer, timer, or request is introduced.

## Cross-Target Translation

- Neutral Web and Shopify use native fieldset/first legend and canonical child
  controls; Shopify Liquid/schema/data/editor composition remains target work.
- React and Angular forward native disabled and compose child controls without
  mirroring their state. Figma maps legend/content/description and presentation
  states only. SwiftUI and Compose map to native semantic groups/sections while
  child controls retain value ownership.

## Current Risks And Human Questions

1. Human review is needed for border strength, padding, legend interruption of
   the border, description spacing, disabled opacity, and narrow layout.
2. No Fieldset-specific owner visual reference is registered.
3. Controls inside the first legend remain enabled by HTML design; consumers
   should not place operable controls there unless they intend that exception.

## Readiness Decision

Ready for explicit human visual and semantic review. Native grouping/disabled
behavior, canonical child composition, shared rendering, content resilience,
contrast, special media, adapters, and performance evidence are complete. The
contract remains `pilot`; no `stable` promotion is implied.
