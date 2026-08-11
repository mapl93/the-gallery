# 0206. Passive Target-Authored Firing Facts

Status: Superseded by ADR 0271

Date: 2026-07-18

Superseded: 2026-08-11 by owner decision 60. The accepted public direction is
the specific chart-and-table Firing Schedule recorded in ADR 0271, not this
passive arbitrary fact surface.

## Context

R6 Kiln / Firing Info exposed optional title and required target-owned details,
but Exhibit and Studio rendered separate fixtures and different section
semantics. Exhibit used Technique, Temperature, Cone and Atmosphere; Studio used
Clay body, Bisque, Glaze and Atmosphere. Both formatted Celsius examples as `C`
without the degree sign, and Studio emitted an unnamed section or empty shell
when optional title or required details were removed.

The existing native description-list direction is correct, but the contract did
not define strict omission, conditional section semantics, direction isolation,
passivity, zero runtime or contextual heading rank. Canonical CSS also used
hardcoded physical values and a viewport breakpoint, while Studio owned
R6-specific padding.

The HTML Standard already supplies the required name/value semantics. BIPM
specifies the symbol `°C` and spacing of numbers from units. Orton documents that
pyrometric cones represent time-temperature heatwork and that their endpoint
depends on heating rate, holds and conditions. The repository has no approved
universal firing schema, validation service, Shopify record, safety policy or
R6-specific Figma evidence.

## Decision

- Neutral R6 is a passive target-authored technical-fact surface. It does not
  define, fetch, validate, calculate, convert, infer, localize or persist firing
  data.
- Required details render as one native `dl`. Each valid direct group is a
  `div` with one non-empty `dt` and one `dd > bdi` complete formatted value.
  Invalid and duplicate-key peers omit; no valid peers omit the complete root.
- A non-empty optional title selects a native `section` named with
  `aria-labelledby` by its visible contextual heading. Without a title, R6 uses
  a generic `div` and emits no empty header or dangling label.
- Heading rank remains target context rather than a visual variant. The docs
  renderer accepts contextual `h2`-`h6` projection without adding a public
  styling control.
- Values arrive as opaque complete strings including units and qualifiers.
  Example Celsius values use a visible space and `°C`; R6 never concatenates or
  repairs units.
- Cone, temperature, rate, hold, atmosphere and schedule may coexist only as
  independently accurate target records with sufficient qualification. R6 does
  not imply a universal cone-to-temperature equivalence.
- `FiringInfoArtwork` and `buildFiringInfoFixture` are the single Exhibit/Studio
  renderer and fixture path. The sample record is editorial evidence, not a
  product schema or component default.
- Canonical CSS owns the quiet secondary card, header boundary, native list
  reset, logical term/value grid, container-driven narrow stacking, complete
  wrapping, tabular numerals and forced-color boundary. Studio no longer owns
  R6 padding or anatomy.
- The public semantic properties remain optional `title` and required
  non-empty `details`. Field keys, raw numbers, unit/cone enums, conversion,
  schedule segments, provenance schema, order, alignment, columns, padding and
  breakpoint stay outside the API.
- R6 owns no controlled/uncontrolled value, widget role, focus, keyboard,
  event, live region, request, observer, timer, persistence, animation or
  neutral JavaScript.
- R6 remains `pilot`; automated evidence cannot promote it to `stable`.

## Consequences

- Exhibit and Studio share exact semantic structure and sample content.
- A useful one-record or untitled surface remains possible while empty required
  data cannot produce a misleading shell.
- Technical values remain readable across mixed direction, localization, text
  enlargement and missing CSS without adding ARIA or runtime.
- Responsive behavior follows the component's actual inline size instead of
  viewport or docs mode.
- The sample can demonstrate correct unit typography without choosing the
  future storage or formatting architecture.
- Record owner/schema/inventory, technical review/provenance, unit and
  localization policy, cone/rate/hold qualification, safety/content boundary,
  richer schedules/actions, Shopify mapping, final visuals, R6-specific Figma
  evidence and human approval remain explicit open questions.
