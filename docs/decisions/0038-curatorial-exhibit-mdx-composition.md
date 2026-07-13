# 0038. Curatorial Exhibit MDX Composition

Status: Accepted

Date: 2026-07-11

## Context

The component detail pages historically rendered canonical MDX as a conventional
technical document: header metadata, preview toolbars, every example, and the full
contract summary in one vertical stream. The approved Exhibit mockup in Figma frame
`932:924` instead treats one component instance as the artwork and its documentation
as a compact curatorial record.

The canonical MDX files must remain the content source. Rewriting 183 pages into a
second Exhibit-specific format would create duplicate ownership and make the visual
redesign expensive to maintain.

## Decision

`site/src/components/ExhibitDocument.tsx` is the site-owned presentation wrapper
for canonical component MDX. It groups existing heading content into five possible
Exhibit sections:

- `Overview` from Overview.
- `Presentation` from presentation, variants, sizes, states, and other visual or
  behavioral examples.
- `Guidelines` from usage guidance.
- `Accessibility` from accessibility guidance.
- `Specification` from references, API reference, anatomy, dependencies, and a
  compact contract identity record.

Sections with no remaining content are omitted from the index. The wrapper promotes
the first canonical `Preview` to the artwork pedestal and does not render additional
previews inside the information cards. Their source remains in MDX for audit history
and future Studio reconciliation.

The desktop composition uses a compact sticky index, a fixed-width specification
column, and a sticky artwork pedestal that can accommodate small or wide components.
On narrow viewports, the index becomes horizontal, the artwork precedes the
specification cards, and all tracks remain within the viewport.

The existing global sidebar remains unchanged. Replacing it with the approved
full-screen menu is a separate design and implementation decision.

## Consequences

- Exhibit presents exactly one canonical component instance instead of a wall of
  variants.
- The 183 MDX pages remain canonical and require no Exhibit-specific duplication.
- Studio remains the interactive customization surface as contracts are reviewed.
- Contract source is still visible through a compact reference record without
  restoring the previous full technical wall.
- Heading conventions are now part of docs presentation behavior and should remain
  covered by `npm run validate:docs`.
