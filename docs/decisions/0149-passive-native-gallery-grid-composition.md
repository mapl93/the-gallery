# 0149. Passive Native Gallery Grid Composition

Status: Accepted

Date: 2026-07-15

## Context

S5 Gallery Grid presents a finite set of target-owned media in registered
`grid` and `masonry` variants. ADR 0082 already accepts an optional title, a
required ordered `items` slot, both registered variants, and target-owned
activation. It does not define a neutral image record, Lightbox lifecycle, or
component runtime.

The implementation nevertheless rendered every root as an unnamed `section`,
used generic wrappers, and made every passive image item focusable without a
name or action. Canonical, viewport and Studio CSS competed over columns,
heights and crop. A hover/focus scale implied activation. Shopify had copied
CSS but no target-native Liquid, schema, data or editor projection.

HTML list and section semantics, WAI image guidance, CSS Grid and
Fragmentation, the current CSS Grid masonry draft, Open UI research, and the
accepted repository contracts establish a safe neutral boundary. They do not
resolve S5's eventual product overlap with the existing caption-oriented
Masonry Gallery component.

## Decision

- Gallery Grid is a passive finite media-list composition. It does not imply
  selection, navigation, Lightbox behavior, commerce, drag reordering,
  pagination, infinite loading, virtualization, or two-dimensional APG Grid
  interaction.
- The optional non-empty title names a native `section` through
  `aria-labelledby`. An untitled composition uses a generic `div` rather than
  an unnamed thematic section.
- At least one complete target-owned item is required. Missing required items
  omits the root instead of emitting an empty section.
- The canonical fixture uses native `ul`/`li` semantics. Source order remains
  authoritative in both variants; S5 adds no `grid`, `row`, or `gridcell` ARIA
  roles, roving tabindex, CSS order, or dense visual packing.
- Items are target-owned slot content under ADR 0082. S5 does not introduce a
  neutral item record, Card dependency, image source, alternative-text
  shortcut, caption, focal point, loading policy, destination, heading level,
  editor object, or analytics event.
- Passive items have no tabindex, pointer cursor, hover/focus zoom, event, or
  implied activation. A target may compose a native link or button only after
  choosing real activation semantics. That descendant owns its accessible
  name, keyboard behavior, focus, result and lifecycle; S5 supplies only the
  shared visible focus geometry.
- `grid` remains the default registered variant. Its initial `4 / 5` crop,
  one-to-four tracks and `22rem`/`40rem`/`60rem` component thresholds are
  private visual candidates, not public API or approved identity.
- `masonry` remains a registered variant and uses source-flow CSS columns,
  intact items and natural media proportions. Its initial maximum-three
  `13rem` columns are private candidates. Experimental native masonry, runtime
  packing and visual reorder are not used.
- S5 and the existing Masonry Gallery remain separate current source facts.
  Masonry Gallery owns storytelling captions and richer artwork anatomy.
  Owner/architecture review must decide whether S5 retains, narrows or later
  delegates its masonry presentation before either identity is stabilized.
- One named component container owns responsive behavior. Studio- and
  viewport-specific S5 column/height rules are removed. The component responds
  to its own inline size using logical properties and existing semantic tokens.
- S5 has no controlled/uncontrolled store, listener, observer, timer, request,
  layout measurement, custom element, animation, transition, or neutral
  runtime. Target-provided media delivery and interaction remain target-owned.
- Exhibit and Studio use the exact Sections renderer, fixture, validity rule,
  native DOM and canonical CSS. Site CSS may contain the preview but cannot
  select S5 columns, crop, heights or variant behavior.
- Shopify owns a dedicated addable Section Adapter. Optional title/variant map
  to section settings; reorderable image blocks require a selected image and
  explicit informative or decorative semantics. Shopify image objects,
  responsive candidates, editor attributes and schema do not expand the
  neutral API.
- The contract remains `pilot`. Automated evidence may prepare S5 for human
  review but cannot approve its visual candidates or promote it to `stable`.

## Consequences

- Neutral Web gains truthful root/list semantics, strict omission, zero passive
  focus stops, visible focus for legitimate native descendants, intrinsic
  container response, stable source order and zero component runtime.
- Grid and Masonry now express distinct current presentations without exposing
  low-level columns, ratios, gaps or thresholds as cross-target properties.
- Shopify can be certified across Liquid, schema, data, behavior, template
  composition, editor preview and localization while the neutral contract
  stays platform-independent.
- Source-flow columns are visually column-major. If human review requires
  row-major natural-ratio masonry, a different stable layout technology or an
  explicit identity decision is required.
- Human review must approve crop, density, thresholds, masonry width/count,
  radius, rhythm, media hierarchy, the three-property neutral API and the
  S5/Masonry Gallery boundary before stability.
- Component-specific Figma evidence follows browser visual approval. The
  current shared Studio shell reference is traceability, not S5 aesthetic
  approval.
