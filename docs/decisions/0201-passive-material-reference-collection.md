# 0201. Passive Material Reference Collection

Status: Accepted

Date: 2026-07-17

Owner confirmation: 2026-08-11, decision 55 (`R1-A`)

## Context

R1 Material Library already exposed optional introductory copy, a required
target-owned materials slot and a Tag dependency. Its runtime nevertheless used
a generic grid, emitted an invalid named section when the optional title was
blank, copied partial Tag styling and gave passive cards hover/motion treatment.
Exhibit and Studio also lacked a reusable R1 artwork/fixture boundary.

The repository does not define a ceramics data schema, record source,
interaction model, Shopify consumer or R1-specific approved visual reference.
ADR 0083 explicitly keeps those decisions target-owned.

## Decision

- Owner decision 55 confirms this direction as `R1-A`. R1 remains passive in
  its neutral identity; navigation, selection, filtering and comparison are not
  optional modes of this component.
- R1 is a passive reference collection, not a resource manager, selector,
  filter, navigation surface, comparison tool or product catalogue.
- With a non-empty title the root is a native section labelled by that visible
  contextual heading. Without a title it is a generic div and emits no
  `aria-labelledby`.
- The required non-empty collection uses `ul > li > article`. Each complete
  material article requires a non-empty visible name and is explicitly named by
  that heading.
- Media, classification, description and property labels remain optional.
  Targets decide whether each image is informative or decorative and supply the
  corresponding `alt` value.
- Property labels use a native list of canonical passive Tag instances. R1 does
  not duplicate Tag styling or expose its remove action.
- Passive cards have no hover, focus, selection, destination, event or motion
  state. Future interaction must compose a truthful canonical control after its
  product contract is accepted.
- Exhibit and Studio use one `MaterialLibraryArtwork`, one fixture and the same
  canonical CSS. The docs-only Tag leaf is shared with Tag's own Studio.
- The R1 root API remains optional `title`, optional `subtitle` and required
  non-empty `materials`. Record schemas and compositional dimensions do not
  become public properties.
- R1 remains `pilot`; automated evidence cannot promote it to `stable`.

## Consequences

- Native collection and article semantics remain useful across targets without
  introducing an ARIA grid/listbox keyboard model.
- An untitled composition stays valid without creating an unnamed thematic
  landmark or broken label reference.
- Tag owns its visual/accessibility contract and future Tag fixes propagate to
  R1 automatically.
- Neutral runtime remains zero and intrinsic response no longer depends on a
  viewport breakpoint or Studio-only grid/media override.
- R0 owner decision 54 makes provenance, revisions, localization, rights,
  applicability, measurement and review of factual/commercial claims target
  responsibilities. R1 preserves authoritative source order without inferring
  taxonomy, claim truth or technical equivalence.
- Real record mapping, media art direction and rights, Shopify consumer/schema,
  final visuals and human approval remain target evidence gates. R1 interaction
  identity is resolved as passive.
