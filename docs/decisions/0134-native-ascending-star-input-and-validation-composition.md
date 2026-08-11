# 0134. Native Ascending Star Input And Validation Composition

Status: Accepted

Date: 2026-07-15

## Context

V3 Star Input entered component refinement as the Review family's interactive
integer rating control. ADR 0085 already selected five native named radios,
native validation and form behavior, a visible group label, and a strict
one-through-five value boundary. The candidate nevertheless used
`direction: rtl` on the fieldset as a sibling-selector implementation trick.
Its DOM order was `1, 2, 3, 4, 5`, while the visual positions were reversed.
That made visual order disagree with source order and made arrow direction hard
to reason about in both LTR and RTL documents.

The fieldset was also an inline flex container whose legend participated beside
the radio labels. Choice names existed only as English `aria-label` attributes,
and selected and unselected stars used the same solid shape with different
colors. Star Input exposed no Error, Success, or Warning family even though ADRs
0049 through 0051 require symmetric validation treatment for every value-entry
field before stability review.

## Decision

- V3 remains a native `fieldset` with one visible `legend`, exactly five native
  `input[type="radio"]` controls sharing one non-empty `name`, and integer values
  from one through five.
- A required `.star-input__choices` row separates fieldset caption layout from
  choice layout. DOM, visual, and keyboard order are all ascending `1..5`.
- The choices row is deliberately LTR even inside an RTL document because it is
  a quantitative low-to-high scale. The localized legend and choice text retain
  document language direction. CSS direction reversal is not an ordering tool.
- Every label includes required localized `.star-input__label-text` content such
  as `1 star` or `5 stars`. The decorative icon is hidden from assistive
  technology. CSS-disabled output therefore retains readable choice content.
- Unselected choices use a complete outline. The checked choice and all lower
  values use solid fill; fine-pointer preview may add fills but never removes the
  committed checked projection.
- `default`, `error`, `success`, and `warning` are validation variants independent
  from checked value. Each variant covers legend, empty and filled indicators,
  hover, and focused outer ring.
- Error alone sets `aria-invalid="true"`. Error, Success, and Warning require
  visible associated feedback through `aria-describedby`; validation does not
  rely on color or the checked state.
- Group-level unavailability maps to the native `disabled` attribute on the
  fieldset. Native required remains on the named radio group.
- Static Web establishes optional default checkedness and delegates live state,
  arrow movement, mutual exclusion, constraint validation, reset, and form data
  to the browser. A framework adapter may instead own one controlled group value
  plus `change`; it must not control five independent booleans.
- The semantic API is `label`, `name`, optional `value`, `variant`, `required`,
  `disabled`, and `describedBy`. Choice icon source, SVG path, icon size, star
  count, gap, selector strategy, provider, transport, persistence, moderation,
  and normalization remain private or target-owned.
- Exhibit and Studio continue to mount the same `ReviewsStudio` renderer and
  fixture. Lucide remains a site-only icon source.
- Contract version advances to `0.3.0` and remains `pilot`.

## External Evidence

- The WAI-ARIA APG rating example defines one rating as a radio group, expects
  Tab to enter the checked or first item, Space to check, and arrow keys to move
  and check the next or previous radio.
- The HTML Standard defines radio mutual exclusion by form owner, tree, and
  shared non-empty name; it also defines group-level required validity and
  input/change events.
- The HTML Standard defines `legend` as the fieldset caption and fieldset
  `disabled` as disabling descendant form controls outside the first legend.
- Open UI radio research treats the radio group, not a standalone radio, as the
  component boundary.
- Radix Radio Group exposes controlled and uncontrolled values, name, required,
  disabled, direction, and full keyboard navigation. Polaris Choice List exposes
  one selected-value collection, a native form name, group disabled state,
  labels, validation feedback, and controlled/default-selected paths.

These sources support the native group and lifecycle boundary. They do not
authorize copying framework anatomy, introducing a review provider, or making
direction, star count, scale, and icon path public options.

## Performance

Star Input adds no neutral component listener, observer, timer, formatter,
request, layout read, animation, asset, or JavaScript. Reviews CSS is `3,724 B`
gzip against the permanent `3.7 KiB` family ceiling, leaving `64 B`.

The complete Neutral Web component CSS remains over its unchanged `64 KiB`
program ceiling at `67,376 B`, and the shared runtime retains its existing
`10,501 B / 8 KiB` exception. This decision does not increase either ceiling.

## Target Boundary

- Neutral Web is implemented by native markup and canonical CSS.
- Shopify and Webflow consume generated Reviews CSS. A future Shopify form may
  render the same radios, but provider data, localization, authentication,
  endpoint, consent, errors, reset, and post-submit behavior remain target-owned.
- React and Angular must choose one controlled value or one uncontrolled default.
- Figma should represent group label, five choice values, validation families,
  checked, hover, focus, and disabled states. Current registered references are
  generic Component Detail and Inspector frames, not component artwork.
- SwiftUI and Compose map to native exclusive selection with one labelled group.

## Open Human Boundary

This decision does not approve the filled color, outline weight, 28px star
inside the 44px target, label spacing, focus thickness, validation palette,
hover preview, or composed Review Form hierarchy. Those remain visual review
items. It also does not choose a review provider, submission workflow,
localization catalogue, non-five-point scale, half-step input, clear-after-select
behavior, or component-specific Figma artwork.

## Consequences

- Source, visual, and native keyboard order agree.
- Each choice keeps a real localized accessible name without duplicating an
  English-only `aria-label`.
- Outline versus fill survives color loss and forced colors.
- Validation meets the accepted field-family rule without treating selection as
  validity.
- The group remains functional without component JavaScript and keeps native
  form semantics available to every target.
- The component is prepared for human review but cannot become `stable` without
  explicit human approval.
