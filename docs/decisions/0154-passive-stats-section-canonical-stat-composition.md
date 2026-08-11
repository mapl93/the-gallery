# 0154. Passive Stats Section And Canonical Stat Composition

Status: Accepted

Date: 2026-07-15

## Context

S11 Stats Counter is intended to present a small set of target-owned metrics
beneath an optional contextual title. Its initial contract already left value
formatting, ordering, updates, and announcements to targets, but the source CSS
and fixtures duplicated canonical Stat value/label markup and typography.

The implementation also retained a `data-animate` selector and a comment that
claimed JavaScript animated values from zero. No such neutral runtime exists,
and the hook did not define source values, timing, observation, formatting,
reduced-motion output, update semantics, or announcement policy. Studio always
emitted an unnamed `section`, could leave a shell without required metrics, and
did not expose the repeated facts as a native list.

HTML section and list semantics, WAI-ARIA live-region policy, accepted ADR 0063
for Stat, and the layered source/contract/adapter architecture establish the
required boundary without a new interaction model.

## Decision

- Stats Counter is a passive, finite set of target-owned comparable metrics. It
  is not a dashboard, chart, Meter, Progress, ticker, formatter, data client, or
  live-update controller.
- The visible title is optional. A non-empty title names a native `section`
  through `aria-labelledby`; an untitled composition uses a generic `div` and
  does not add an unnamed section.
- At least one complete metric is required. Missing required metrics omits the
  root rather than emitting an empty shell or list.
- The canonical Web composition uses `ul` and `li` because reordering the
  parallel facts does not materially change their meaning. Targets may choose a
  different native semantic grouping only when their content requires it.
- Every item composes canonical Stat classes and behavior. S11 owns the list
  placement wrapper; Stat remains the sole owner of formatted value, visible
  label, optional change, direction metadata, number features, typography, and
  metric-internal spacing.
- Exhibit and Studio use one shared Stats renderer and one reusable StatArtwork
  renderer. Composite fixtures do not maintain parallel copies of canonical
  Stat DOM or defaults.
- The neutral contract receives already formatted strings through target-owned
  Stat compositions. It does not add raw numeric values, locale, formatter,
  precision, units, comparison logic, or business sentiment.
- Static metrics are not live regions. Targets that update values own freshness,
  atomic replacement, error/loading/empty policy, and whether a user-relevant
  change merits a separate polite announcement. Intermediate count-up frames
  must not be announced.
- The incomplete `data-animate` hook, transition, easing token, CSS comment, and
  reduced-motion exception are removed. A future count-up request requires its
  own product, motion, formatting, and accessibility decision.
- One component container and intrinsic native-list grid own responsive
  composition. Source order never changes. Narrow containment uses logical,
  container-relative spacing rather than physical viewport assumptions.
- Complete title typography and layout spacing use existing public tokens.
  Track minimum, maximum measure, centered alignment, list reset, structural
  zeroes, and intrinsic grid behavior remain private visual candidates.
- S11 has no controlled/uncontrolled store, focus model, keyboard behavior,
  listener, observer, request, timer, layout read, authored motion, asset, or
  neutral runtime.
- Shopify owns a dedicated addable Section Adapter whose reorderable blocks map
  target metric records and expose editor attributes. It emits canonical Stat
  classes and no component JavaScript.
- The contract remains `pilot`. Automated evidence can prepare S11 for human
  review but cannot approve visual candidates or promote it to `stable`.

## Consequences

- Neutral Web gains truthful conditional section semantics, native list
  relationships, canonical dependency reuse, strict invalid omission, intrinsic
  container response, and zero component runtime.
- Stat fixes and semantic refinements flow into Stats Counter without duplicated
  child markup or CSS ownership.
- Removing the false count-up hook reduces runtime ambiguity, motion risk, and
  Sections-family CSS rather than expanding a nearly exhausted byte budget.
- Shopify can be evaluated through Liquid, schema, data, editor-preview,
  localization, and template-composition layers without leaking Shopify objects
  into the neutral API.
- Human review must approve the maximum measure, title rhythm, responsive track
  minimum, one/two/three/many-item density, centered hierarchy, and long
  localized content before stability.
- The current Figma trace resolves to Button and is not S11 aesthetic evidence;
  component-specific owner evidence remains an explicit review dependency.
