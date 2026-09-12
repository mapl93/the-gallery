# Maker's Mark and Edition / Numbering checkpoint

Date: 2026-09-12

Decision: ADR 0354. Twelve source roles; 22/20 public values respectively.

## Delivered

Maker's Mark exposes its measure, stamp, gap, text rhythm, padding and border.
Edition exposes separate designation/count and number/separator gaps, padding,
tracking and border. Initial factors and system border aliases preserve the
current design. The existing canonical Link dependency and stamp alignment query
remain; Studio now exposes all shared type roles and both Edition text colors.
Generated Web/Shopify assets follow canonical source; no Liquid or runtime changes.

## Evidence

- Fresh CLI install of both components includes canonical Link before Ceramics
  CSS, with provenance. 184 element comparisons at 320/600/900/1200 widths, both
  themes, complete/minimal Maker and neutral/limited Edition: geometry within
  0.02 CSS px, and font, padding, gap, border, radius, tracking and colors equal.
- Maker overrides: width 500px, stamp 72px, gap 12px, padding 30px, border 3px,
  text gap 6px. The canonical identity Link keeps visible keyboard focus.
  Narrow stamp alignment and RTL source geometry pass.
- Edition overrides: outer gap 15px, count gap 4px, padding 10px/30px, border
  3px and label tracking 2.4px. Native paragraph remains passive with no
  extra accessible label. Forced colors presents CanvasText/Canvas/border.
- Studio: 4rem stamp resolves to 64px; em tracking stays unit-preserving;
  text/gap controls work. Missing destination removes the Link, stamp omission
  removes the wrapper and blank required maker omits the root. Edition omits
  its slash when total is blank and omits its root when all content is blank.
  Reset restores both defaults. Exhibit displays the new token inventory.
- Custom screenshots visually inspected. Evidence is ignored under
  `output/playwright/attribution-values/`. Temporary public fixture removed;
  single browser/server closed; resource gate clean and no test processes remain.

## Validation and limits

Source/Web/Shopify adapter builds, docs/contracts/Studio/CLI validation,
canonical catalogue and structural certification/refinement/performance
inventories pass. Catalogue: 1,117 paths, 8,936 compiler comparisons. Maturity
stays 5 stable, 173 pilot and 4 deprecated. Target performance guidance remains
advisory where exceeded, with no claim of hosted performance certification.

This is visual API and local regression evidence, not authenticity/edition
record validation, screen-reader certification, Shopify data/editor delivery
or automatic consumer updates. Colors are preserved; no new contrast audit of
arbitrary consumer palettes is claimed. No Figma, hosted deployment, installation
of tools, source modes, site/dist or stable promotion.
