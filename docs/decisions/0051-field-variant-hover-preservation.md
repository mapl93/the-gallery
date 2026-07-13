# 0051. Field Variant Hover Preservation

Status: Accepted

Date: 2026-07-12

## Context

Input and Select used one generic hover rule that assigned the Default hover
border. On Error, Success, and Warning fields, that rule replaced the semantic
border with the neutral Default border while the label, message, and indicator
remained semantic. The result visually broke the active validation state during
pointer interaction.

## Decision

- Hover preserves the active validation color family for every value-entry
  field variant.
- Input and Select compose the hover border through the private
  `--_input-hover-border` custom property.
- Default maps the private property to the existing Default hover border token.
- Error, Success, and Warning map it to their existing semantic unfocused inner
  border tokens. No additional public hover tokens are introduced.
- The hover surface continues using the existing Default hover background unless
  a future accepted component decision introduces a semantic surface treatment.

## Consequences

- Pointer hover no longer makes a validation field appear neutral.
- Textarea, Password Input, and other fields that compose the canonical Input
  classes inherit the behavior without duplicate selectors.
- Remaining field implementations must preserve variant color during hover as a
  neutral-web certification requirement.
