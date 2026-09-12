# Hero visual values checkpoint

Date: 2026-09-12. Baseline: `e691ca1`. ADR 0382.

## Delivered

35 source roles; 58 public values. Canonical CSS, contract, registry, Studio,
Exhibit documentation and generated Web/Shopify targets are aligned. Existing
values are preserved, including the pre-existing dark on-media pairing awaiting
the separate owner decision below. This is not complete Hero certification.

## Evidence

`output/playwright/hero-values/` retains a fresh CLI dependency slice/install
record, old source CSS, fixture, harness, result.json and inspected screenshots.

- 60 cases: full, split, text-only, fullscreen, absent media and slideshow;
  320/600/900/1200/1800px; Light/Dark. 500 element comparisons preserve default
  geometry, typography, colors, padding, gaps and control positions. Color
  values are normalized to RGBA because equivalent CSS serializations differ.
- Inherited .3 split media share yields 360/840px columns at 1200px. Setting a
  low minimum does not cap intrinsic content (the measured split remains 520px).
- Content maximum 800px, independent content/action gaps 64/16px, and red/.5
  scrim overrides apply. Full height bounds 900px produce a 900px inner region.
- Parallax scale 1.3 produces 1170px media over 900px, within subpixel tolerance.
  Reduced motion removes transformation; forced colors remove the media scrim.
- Installed runtime accepts Enter on Next, updates the status to slide 2 of 3,
  retains three real slides, and hides progress with reduced motion. Progress
  height .25 of the shared base yields 8px. No remote actions were invoked.
- A 240px RTL split parent fits. Studio gap/tracking editing and reset pass;
  Exhibit exposes the same content-width token. Screenshot inspected.

The harness was corrected to avoid comparing active theme transitions and to
allow subpixel layout precision. These are measurement corrections, not source
behavior changes. Every evidence phase closed its browser/server; final cleanup,
resource gate and owned-process scan are clean. Temporary public fixture removed.

Source/adapter builds, canonical catalogue (1573 paths, 12584 comparisons),
validate:docs and component/refinement/performance audits pass. Two existing
Shopify asset advisories remain; passing inventory is not target certification.
No site/dist churn, hosted Shopify upload, stable promotion or font installation.

## Pending: dark on-media palette

See `docs/reports/2026-09-12-hero-media-contrast-decision.md`. The value pass
preserves this existing issue and makes the scrim tint editable; it does not
silently choose a new aesthetic. Independent token overrides remain possible.
