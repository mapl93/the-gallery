# Refinement Batch 70 — Stats Counter

Status: Complete for human review; no stability promotion

Date: 2026-07-15

Component: Stats Counter (`S11`, dependency order `171`)

## Outcome

Batch 70 refines Stats Counter from an unnamed, duplicated and behavior-implying
shell into a passive conditional section/div with one native unordered list of
canonical Stat instances. It owns section context and intrinsic placement only;
targets own metric content and lifecycle, while Stat owns value/label/comparison
presentation.

The same renderer/fixture serves Exhibit and Studio with exact normalized DOM.
Web, Webflow and Shopify outputs are synchronized. Shopify adds a localized
target-native section with reorderable metric blocks, editor attributes,
complete omission and no target JavaScript.

## Delivered

- Permanent Stats Counter dossier and human-review audit.
- ADR 0154 for passive semantics, canonical Stat composition and update boundary.
- Contract `0.3.0`, registry dependency/description and reduced Studio controls.
- Shared `StatArtwork` child renderer plus exact Exhibit/Studio S11 renderer.
- Native conditional section/div, `ul > li.stat` composition and canonical MDX.
- Intrinsic Sections CSS; duplicate metric styles and false count-up hook removed.
- Localized Shopify section plus schema translations and metric block mapping.
- Nine before and fifteen after captures across paired viewports, controlled
  parity, direct roots, omission, themes, forced colors, RTL/many and 200% type.
- Regenerated Web, Webflow and Shopify outputs and global progress reports.

## Verification Summary

- All 183 registry components, contracts, Studio definitions and MDX pages
  validate; static preview and shared-surface audits pass.
- Stats Counter Exhibit/Studio DOM is exactly equal after generated-id
  normalization (`1,194` characters, FNV-1a `bd10f6ad`).
- Direct roots at `200–1120px`, seven records, Arabic RTL/extreme content and
  effective 200% type contain without inline overflow.
- S11 contains zero focus targets, live regions, animation hooks or runtime;
  final console has zero errors/warnings.
- Official Shopify validation passed four files for
  `stats-section-s11-batch70`, revision 3.
- Tracked `site/dist` remains untouched.

## Budgets

| Surface | Final | Ceiling | Result |
| --- | ---: | ---: | --- |
| Sections CSS | `6,788 B` gzip | `6,861 B` | pass; `73 B` remaining |
| Neutral Web component CSS | `67,047 B` gzip | `65,536 B` | existing program gap `1,511 B` |
| Shared neutral runtime | `10,501 B` gzip | `8,192 B` | existing program gap; Stats Counter delta `0 B` |

Canonical, Webflow and Shopify Sections CSS share SHA-256
`feca9d9717674ad2b93e6df3c869154ad4c2501865ace042c69b4d1312d0e6b4`.

## Program Position

After the Stats Counter override and regenerated audit, 98 of 183 components
are ready for human review. Stats Counter remains `pilot`; aesthetic approval,
passive v1 confirmation and corrected component-specific Figma evidence remain
in the explicit human queue.
