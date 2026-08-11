# 0205. Target-Formatted Dimensions And Canonical Unit Choice

Status: Accepted

Date: 2026-07-18

Owner confirmation: 2026-08-11, decision 59

## Context

R5 Dimensions Display exposed optional visual, required measurements and
optional unit-control slots, while ADR 0083 deliberately left the measurement
source and conversion model open. The docs renderer nevertheless held local
metric/imperial-like strings, switched them with local React state and rendered
two independent `aria-pressed` buttons. Studio and MDX disagreed on the group
role, and the pressed-button model did not provide native exclusive-choice
semantics or canonical radio keyboard behavior.

The textual `dl` was valid but did not fail closed when its required slot was
disabled. Site CSS owned the useful image crop, full opacity, root padding,
label surface and row grouping, while canonical CSS owned a faded image and raw
physical/calculated values. The visual was a product photograph with one
detached number rather than a clear explanation of where measurements applied.

The repository already has a canonical native radio-backed Segmented Control.
There is no approved universal dimension schema, numeric source, unit-system
inventory, conversion factor, precision, rounding, locale, tolerance,
measurement method, Shopify record or R5-specific Figma visual source.

## Decision

- Neutral R5 displays one active coherent set of complete target-formatted
  measurement strings. It does not parse, calculate, convert, round or localize
  them and does not define raw numeric or unit fields.
- The required measurement composition is one native `dl`. Each valid direct
  group is a `div` containing one non-empty `dt` and `dd`; the formatted value is
  isolated in `bdi`. Invalid peers are omitted and no valid groups omit the
  complete R5 root.
- The R5 root is a generic container, not an invented section landmark. Parent
  content may provide a contextual heading; each native name/value group is
  understandable independently.
- Optional visual content is a target-owned native figure. Informative media
  receives truthful alternative text. Fully duplicated visual annotations are
  hidden from assistive technology; exact values remain in the textual list.
- Optional unit choice composes canonical Segmented Control with visible
  legend, same-name native radios and exactly one checked value. R5 adds
  `segmented-control` as a dependency and removes its duplicate pressed-button
  selectors/state.
- Segmented Control or the target owns controlled/uncontrolled selected value,
  focus, keyboard, events and form behavior. The target coordinates that value
  with replacement of the complete formatted measurement and annotation set.
  R5 owns no second selected-unit state.
- The docs fixture contains two separately authored formatted sets solely to
  demonstrate target coordination. It is not a neutral conversion algorithm,
  product schema, precision rule or public default.
- The measurement list is not a live region by default. A target that has
  evidence for an announcement owns concise result feedback without repeating
  every value on each radio change.
- Canonical R5 CSS owns bounded 4:3 fixture containment, annotation surfaces,
  native list grouping, logical geometry, narrow row stacking, a wide optional
  two-region response and forced-color boundaries. Studio no longer owns R5
  anatomy or responsive behavior.
- `DimensionsArtwork`, `buildDimensionsFixture`,
  `DimensionsFixtureVisual` and the canonical `SegmentedControlArtwork` are the
  shared Exhibit/Studio implementation path.
- The public R5 properties remain `visual`, `measurements` and `unitControls`.
  Raw values, unit enum, conversion, precision, locale, tolerance, diagram
  coordinates, ratio, columns and breakpoint remain outside its API.
- R5 owns zero neutral runtime and remains `pilot`; automated evidence cannot
  promote it to `stable`.

## Consequences

- Text retains the authoritative quantity/value relationships when media,
  annotations, CSS or interaction are unavailable.
- Exclusive unit selection uses one canonical state model and native keyboard
  behavior instead of independent pressed booleans.
- Consumers can omit visual or unit choice while keeping a complete useful
  measurement list, and incomplete data cannot render a misleading shell.
- The docs target can exercise content replacement without silently choosing
  whether production systems store canonical quantities or formatted sets.
- Future Size Chart work can evaluate the same canonical unit-choice boundary
  without coupling R5 to a new global measurement service by assumption.
- Decision 59 confirms that every active presentation is one complete
  target-formatted set and that neutral R5 never converts or mixes converted
  and supplied values. Precision, rounding, locale, tolerance, available unit
  sets and preference persistence remain target responsibilities rather than
  unresolved neutral architecture.
- Production unit-set mapping and record provenance, quantity inventory,
  qualification rules, announcements, diagram policy, Shopify mapping, final
  visual values, R5-specific design evidence and human approval remain
  explicit target or review gates.
