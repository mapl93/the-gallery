# 0291. Button Group Configurable Studio Fixture

Status: Accepted

Date: 2026-08-26

## Context

Button Group composes complete canonical Button children. ADR 0062 therefore
keeps child labels, variants, states, semantics, and activation owned by Button
and by the consuming composition. The accepted Button Group public surface is
limited to its accessible group label and Default or Full layout variant.

During live human review, the owner found that Studio always rendered three
fixed labels. This prevented the reviewer from exploring one, two, or many
buttons, localized content, and label length even though those are essential
composition cases. Turning that fixture data into Button Group properties would
misrepresent the target-agnostic contract.

## Decision

- Studio adds a site-owned Button count field and one editable label field for
  every Button rendered in the Button Group fixture.
- The documentation fixture is bounded to one through eight children so it can
  exercise one, two, and many-button layouts without creating an unbounded
  inspector surface. This bound is not a production Button Group limit.
- Increasing the count preserves existing labels and initializes new children
  as `Option N`. Decreasing the count removes trailing fixture children.
- Every preview child remains native Button markup with the complete canonical
  `.btn.btn--outline` implementation inside `.btn-group`.
- `groupLabel` remains the accessible name of the set and is independent from
  the visible labels of its children.
- The new fields are documentation-fixture controls only. They do not create
  `buttonCount`, `buttons`, or child-label properties, mappings, tokens, classes,
  adapter data, or component defaults.
- Exhibit and Studio keep the same registered renderer and initial three-button
  fixture. Studio changes only local preview state; Reset restores the shared
  initial fixture.

## Consequences

- Reviewers can directly evaluate Default and Full with realistic child counts
  and labels, including long and localized strings.
- The generic Studio inspector gains a renderer-supplied fixture-control slot
  scoped by an existing metadata group. Canonical contract controls continue to
  come from validated Studio metadata.
- The fixture fields reuse the canonical Input control styling already consumed
  by Studio rather than introducing a substitute editor control.
- Button Group remains `pilot` pending renewed visual review and explicit human
  stability approval.
