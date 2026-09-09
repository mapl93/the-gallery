# 0305. Form Infrastructure Visual Customization

Status: Accepted

Date: 2026-09-09

## Context

The next family under ADR 0293 is Field Wrapper, Fieldset and Form. Their native
ownership remains correct, but layout dimensions and some type/border decisions
were still private constants. Field Wrapper also added Input's bottom margin to
its own gap, and Studio discarded authored feedback in the Default variant.

## Decision

- Add 30 decisions in the existing component token layer: three for Field
  Wrapper's optional feedback icon, eight for Fieldset, and nineteen for Form.
  Defaults alias existing dimensions and font weights wherever possible.
- Field Wrapper reuses Input's separate public label/message gaps and label
  weight. Each gap defaults to 4px. The composed `.field__control` has no exterior
  margin; the wrapper owns internal spacing and the parent owns exterior spacing.
  Description and current feedback each have their own preceding message gap.
- Input retains its complete-field renderer. The site's shared Field Wrapper
  renderer accepts a canonical control without a second label or message owner.
  Callers supply native required/invalid state and matching description ids.
- Field Wrapper's optional icon exposes size, text gap and optical top offset.
  Its fixed passive artwork remains site-owned. Neutral feedback is visible;
  selecting Default does not prohibit an authored message. Empty feedback is
  absent in every variant. Required-marker anatomy now describes ADR 0295's
  independent public color instead of the superseded inherited label color.
- Fieldset exposes border width, inner padding, legend inset and weight, and
  separate description/control gaps for normal and compact containers. The
  existing 320px compact threshold remains a structural query. No viewport mode
  is introduced: the group's own available width determines which gap applies.
- Form exposes block, section, row and action gaps; section/action separator
  padding and width; heading weight and proportional line heights; summary
  padding, border width, background opacity, heading/list/item spacing and link
  underline geometry. Shared colors, family, type sizes, radius and focus geometry
  remain shared public roles. Section and summary headings intentionally share
  the Form title-weight decision (600 by default).
- Preserve the native container thresholds: row columns activate at 640px and
  actions stack at 399px. Column count is semantic layout intent, not a token.
  No order, submission lifecycle, validation schema or disabled owner changes.
- Studio references the contract API; Exhibit derives its control reference from
  those same definitions. Required Form content cannot be toggled off. No
  component changes maturity.
- The Form Studio fixture can use up to 768px so the native 640px column query is
  demonstrable on a wide screen. This is a site fixture measure, not a component
  token. Contact composition is excluded from documentation heading styles so
  its canonical heading tokens, separators and margins reach the actual consumer.

## Remaining implementation decisions

Fieldset and Form are transparent grouping/layout surfaces, not cards. They add
no independent surface or elevation. Width containment, grid/flex, native legend
behavior, wrapping, inherited current color, native list markers, solid borders,
zero margins, icon non-shrinking and forced-colors system values remain private.

Field Wrapper's validation text uses 55% feedback color mixed with primary text.
Form uses the same 55% text and 70% border mixes. Its background uses the feedback
color at a public opacity of 0.08 against transparency. These swatches customize
inputs to the documented derivation, not separate exact final colors. Review
contrast on the actual underlying surface after brand overrides. The 1.25 section
and 1.5 summary heading line heights are unitless source numbers and scale with
font size; existing message line heights remain the shared fixed type roles.

## Compatibility and acceptance

All new outputs remain generated from source for Web and Shopify. Existing token
aliases remain defined. Field Wrapper no longer consumes
`--space-input-margin-bottom` for its uniform gap; copied consumers overriding
that token specifically for wrapper spacing must move that override to
`--space-input-label-gap` / `--space-input-message-gap` when they adopt this
checkpoint. Existing markup must put `.field__control` on the canonical child
root. This corrects double spacing while keeping standalone Input's bottom
margin. Defaults of Fieldset and Form remain unchanged.

Verify actual editor overrides, reset, optional descriptions/feedback, semantic
associations, native group disabling and submission exclusion, long text, narrow
containers, dark appearance, RTL, focus and error links. The contact composition
uses the wrapper for Name, Fieldset for reply preferences and Form's linked error
summary. It deduplicates same-name radio failures, keeps the first-invalid focus
policy, and focuses the enhanced Select trigger when its summary link is used.
It remains a local preview with no submission to a service.

Web/Shopify build checks and browser evidence do not certify arbitrary override
combinations, all catalogue consumers, or a hosted Shopify release. Delivery
scope remains Web → Shopify under ADR 0303.
