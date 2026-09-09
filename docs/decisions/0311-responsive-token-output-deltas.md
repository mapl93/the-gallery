# 0311. Responsive Token Output Deltas

Status: Accepted

Date: 2026-09-09

Owner direction: use the existing media queries to emit only values that change
by breakpoint. This implements the output optimization proposed in ADR 0310 and
supersedes ADR 0011 only where it required a full catalogue in every viewport.

## Decision

Keep source tokens, public names, aliases, units, modes, selectors and breakpoints
unchanged. `scripts/build-web-tokens.js` retains a complete base in each of the
three existing scopes: Light, system Dark and explicit Dark. Within each scope,
the 768px, 1024px and 1440px queries contain only declarations whose authored
expressions differ from the preceding viewport matrix. Empty responsive blocks
are omitted. This is not a switch to container queries or a new density model.

Compare expressions, not resolved numbers. Two aliases resolving to the same
default can react differently when a consumer customizes their referenced values.
A value that returns to its mobile expression after changing at tablet must be
emitted again. Compare against the preceding viewport, not always the base.
Descriptions do not constitute responsive value changes.

Complete theme bases retain aliases on each theme boundary. Custom properties
are inherited after variable substitution; removing declarations across theme
scopes can change nested-theme and override behavior. See the
[CSS Custom Properties specification](https://www.w3.org/TR/css-variables-1/#defining-variables).
Only redundancy between viewport matrices within the same scope is removed.

The small source-declaration helper rejects duplicate declarations, unsupported
line shapes, empty matrices and different property inventories across viewports.
It preserves values, units, expressions and importance. It is intentionally scoped
to the compiler's one-declaration-per-line output, not a general CSS optimizer.

Shopify receives the optimized Web output through its existing wrapper. No
canonical source values, contracts, components, brand settings, publishing model
or hosted theme are changed. Existing copy-and-own installations are not updated
automatically; consumers adopt the generated file through the normal protected
CLI/update workflow and retain their local overrides.

## Evidence and acceptance

Compared with the pushed baseline `dbac7f8`, all 911 custom-property names remain.
Each theme scope now contains 911 base declarations followed by 15, 38 and 14
responsive declarations. There are 2,934 declarations instead of 10,932. The
Input label-gap token and its alias each occur three times instead of twelve.

Acceptance is equivalent observable CSS and a measured size reduction. There is
no arbitrary byte ceiling. The checkpoint report records:

- Eight helper regression tests, source/legacy parity, canonical catalogue,
  motion, Web/Shopify token and adapter validations, brand defaults, docs and CLI
  copy-and-own protections.
- Chromium comparison against the original generated CSS, covering 911 variables
  on 23 elements, all viewport boundaries, themes and nested theme islands,
  consumer overrides, focused/default fields, validation variants and dynamic
  viewport/theme/override updates.
- Local Shopify-wrapper comparison and representative brand CSS derived from
  the existing snippet; this does not execute Shopify Liquid or its editor.
- Reduced motion, forced colors, print and RTL equivalence, plus actual Studio
  spacing customization and Contact composition geometry checks.
- Closed owned browser resources and preserved pre-existing server.

See `docs/reports/2026-09-09-responsive-token-checkpoint.md`. This is output
equivalence evidence, not cross-browser certification, an accessibility audit or
a hosted-store performance benchmark. No component becomes stable automatically.
