# 0036. Site-Owned Studio Presentation Metadata

Status: Accepted

Date: 2026-07-11

## Context

ADR 0034 established that component contracts own semantic capabilities while the
documentation site's Studio mode owns how those facts are grouped, ordered, and
rendered as controls. Button now has ten reviewed semantic properties and a Figma
Studio inspector approved as the presentation reference.

Putting control labels, sections, and layout into the target-agnostic component
contract would make a documentation-site decision part of every adapter. Copying
property options, defaults, target mappings, or token values into site metadata
would create a second source of truth.

## Decision

Studio presentation definitions live under:

```text
site/src/content/studio/<slug>.studio.json
```

`site/src/content/studio/studio.schema.json` describes the file shape, and
`scripts/validate-studio-metadata.js` validates each definition against its
canonical component contract.

A Studio definition may own only:

- Section grouping and order.
- Control order, labels, and presentation kind.
- Presentation-only option labels.
- Conditional control visibility.
- References to semantic property names, contract states, and public tokens.
- References to an independently accepted site-owned icon catalogue.
- A Figma design reference for traceability.

A Studio definition must not copy or redefine:

- Semantic property types or defaults.
- Enum values or canonical component states.
- Target mappings, selectors, classes, or attributes.
- Token values.
- Component behavior.

Enum options are resolved from the referenced property. State options are resolved
from `contract.states`. Token controls reference exact public token names or a
validated pattern over one public contract token category.

Every semantic property in a component with Studio metadata must be referenced
exactly once. Unknown properties, private tokens, empty token patterns, duplicate
bindings, and omitted semantic properties fail validation.

### Button Pilot

The Button definition follows the approved Figma frame `943:7` and inspector
`1020:480` in file `k3axoTaF87g17fBRgJ0PMY`:

- `Content`: label and icon composition.
- `Presentation`: type, size, state, and conditional loading position.
- `Layout`: padding, gap, minimum height, radius, and full width.
- `Appearance`: fill, text, and border token families.

The single Icons control composes `leadingIcon`, `trailingIcon`, and `iconOnly`.
The State control reads canonical contract states and binds the `disabled` and
`busy` semantic properties. `loadingPosition` appears only while `busy` is true.
`fullWidth` remains in Layout because it is a reviewed contract capability even
though the default-state Figma screenshot does not show that row.

The icon catalogue was intentionally deferred by this decision. ADR 0037 now
establishes Lucide as a site-only catalogue without changing Button semantics.

The first runtime implementation lives in `site/src/components/studio/`:

- `StudioInspector.tsx` renders metadata-driven controls.
- `ButtonStudio.tsx` renders the canonical web Button and applies contract mappings.
- `index.ts` registers component-specific Studio renderers without putting renderer
  choices into the target-agnostic contract.

The inspector reuses the public Input, Select, Switch, and Segmented Control CSS
contracts already loaded by the docs site. The initial neutral fixture has been
replaced by validated Lucide selectors under ADR 0037; those selections remain
preview content rather than Gallery component defaults.

## Consequences

- The docs site can build Studio controls without changing component contracts.
- A Figma redesign can change presentation metadata without changing component
  semantics.
- A contract change cannot silently leave Studio stale once metadata exists.
- Figma remains a target and design reference, not the repository source of truth.
- Rendering remains site product code and may evolve independently from the
  target-agnostic contract.
- The rendered Button Studio and its browser evidence were approved on 2026-07-11;
  Button is now `stable` for neutral web.
