# 0148. Passive Native Multicolumn List Composition

Status: Accepted

Date: 2026-07-15

## Context

S4 Multicolumn is intended to present a finite set of parallel benefits,
principles, capabilities, or service facts. Its accepted contract already made
the visible title optional and the target-owned `items` slot required, but the
implementation rendered every root as an unnamed `section`, used a generic
grid with `article` items, and allowed the required slot to disappear while an
empty root remained.

The canonical and Studio CSS also competed over column count and breakpoints.
Hardcoded typography and physical dimensions made that ownership harder to
audit. Shopify had copied component CSS but no target-native section, schema,
or merchant block model. HTML section/list semantics, WAI page-structure
guidance, Shopify blocks, and accepted ADR 0082 establish the relevant
boundaries without requiring a neutral item-record schema.

## Decision

- Multicolumn is a passive, finite set of target-owned parallel items. It does
  not imply chronology, selection, navigation, disclosure, carousel behavior,
  equal-height cards, or independently distributable articles.
- The visible title is optional. A non-empty title names a native `section`
  through `aria-labelledby`; an untitled composition uses a generic `div` and
  does not add an unnamed section or landmark.
- At least one meaningful item is required. Missing required items omits the
  root rather than emitting an empty composition.
- The target chooses the native list appropriate to the content. The canonical
  Gallery fixture uses `ul`/`li` because its items are parallel and their order
  does not change meaning. A target may use `ol` when order is meaningful, but
  process content should normally compose Process Timeline.
- Items remain target-owned slot content under ADR 0082. S4 does not introduce
  a neutral item record, Card dependency, link/action API, icon catalogue, media
  source, heading rank, or analytics event.
- Optional visuals retain native target semantics. The canonical fixture icons
  are decorative and hidden from the accessibility tree. Informative target
  media must supply an appropriate native alternative.
- One named component container and an intrinsic centered flex-wrap layout own
  responsive composition. Source order never changes. Studio- and
  viewport-owned S4 column rules are removed.
- The initial `12.5rem` item basis, `20rem` item maximum, `3rem` icon size, copy
  measure, narrow rhythm, and wide density are private visual candidates. They
  are not public cross-target configuration and require human review.
- Complete semantic typography, layout spacing, and foreground colors use
  existing public tokens. List reset, flex fractions, structural zeroes, and
  private dimensions remain implementation composition.
- S4 has no controlled/uncontrolled store, focus model, keyboard controller,
  live region, pointer handler, observer, timer, authored motion, or neutral
  runtime. Any interactive child remains target- or canonical-child-owned.
- Exhibit and Studio share the exact Sections renderer, fixture, validity rule,
  native DOM, initial state, and canonical CSS. Site CSS may contain the preview
  but does not select S4 columns.
- Shopify owns a dedicated addable Section Adapter whose reorderable blocks map
  the required target-owned slot. Merchant image, alternative/decorative
  classification, title, and rich text settings are target facts and do not
  automatically expand the neutral API.
- The contract remains `pilot`. Automated evidence can prepare S4 for human
  review but cannot approve its visual candidates or promote it to `stable`.

## Consequences

- Neutral Web gains truthful section/list semantics, strict invalid omission,
  intrinsic container response, stable source order, and zero component
  runtime.
- One, two, three, and many items center and wrap without site-specific column
  behavior, visual reordering, or empty auto-fill tracks.
- Shopify can be evaluated through Liquid, schema, data, template composition,
  editor-preview, and localization layers without leaking Shopify objects into
  the neutral contract.
- Chronological processes, linked cards, carousels, quantitative facts, and
  brand marks remain explicit canonical alternatives rather than implicit S4
  modes.
- Human review must approve the item basis/maximum, icon size, vertical rhythm,
  one/two/three-column balance, and final visual hierarchy before stability.
- Component-specific Figma evidence follows browser visual approval. The shared
  Studio shell nodes do not constitute S4 aesthetic approval.
