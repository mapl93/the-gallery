# 0037. Studio Lucide Icon Catalogue

Status: Accepted

Date: 2026-07-11

Amended by: ADR 0048 for Select's canonical ChevronDown and Check indicators.

## Context

Button exposes independent leading and trailing icon slots, but component
contracts intentionally do not define icon identities. Studio needs a recognizable
way to choose content for those slots without making the documentation site the
owner of Button semantics or adding an icon dependency to every target adapter.

The repository had no accepted icon source. A neutral geometric fixture was used
while the source decision remained open.

## Decision

Lucide is the canonical icon source for Studio controls.

`lucide-react` is a dependency of `site/` only. Component contracts, canonical CSS,
the neutral web adapter, Shopify, and future target adapters remain icon-library
agnostic. Their public API continues to expose slots rather than Lucide names.

Studio uses a reviewed, expandable projection of Lucide action icons at:

```text
site/src/content/studio/catalogues/lucide.icon-catalogue.json
```

The catalogue records its package version and user-facing labels. Component Studio
metadata references the catalogue source and may provide presentation-only defaults
for each slot. These defaults are preview choices, not component defaults.

The renderer uses named Lucide imports for the projected icons. It does not import
the entire icon namespace or generate a chunk for every Lucide icon. This keeps the
site bundle bounded while allowing the projection to expand independently.

`scripts/validate-studio-metadata.js` verifies that:

- The catalogue package is declared and its recorded version matches the lockfile.
- Catalogue icon names are unique and well formed.
- Studio metadata references a known catalogue.
- Leading and trailing preview defaults exist in that catalogue.

## Consequences

- Studio users receive familiar icon choices with compact visual selectors.
- The same component can still receive any icon implementation in consumer code.
- Adding a Lucide choice is a site presentation change, not a contract revision.
- Replacing Lucide in Studio requires a new accepted decision and does not change
  component semantics automatically.
- Figma remains a design reference and target, not the icon source of truth.
