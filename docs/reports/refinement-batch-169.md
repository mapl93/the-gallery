# Refinement Batch 169 — Comparison Table

Date: 2026-08-11

Component: Comparison Table (`S13`)

Outcome: `human-review-ready`; no stability promotion

## Delivered

- Reconciled owner decision 66 into ADR 0272.
- Added passive/selectable interaction with controlled single Radio and
  multiple Checkbox modes.
- Added explicit independent canonical Link/Button actions and claim/emphasis
  separation.
- Preserved canonical Data Table table, caption, header, overflow, focus, and
  density ownership.
- Selected and documented the Shopify metaobject-backed finite architecture,
  including the unresolved exact target-bound and Theme Store profile gates.
- Eliminated page-level propagation of table overflow with S13-local layout
  containment while preserving complete wrapper scroll.
- Regenerated Web, Webflow, and Shopify CSS projections.
- Captured eight natural viewports plus functional, direct-width, localized RTL,
  extreme, effective 200% text, dark, forced-color, reduced-motion, focus, and
  exact parity evidence in one bounded Playwright session.

## Evidence Highlights

- Native Radio ArrowRight: Satin → Gloss; Studio controlled id → `gloss`.
- Multiple Space interaction: `satin, gloss` → `satin, gloss, raw` →
  `satin, raw`.
- CTA activation leaves Gloss selected while Satin remains highlighted with the
  explicit “Gallery choice” claim.
- Direct 200/320/520/900/1120 px roots and all natural viewports have zero root
  and document overflow; only the table wrapper scrolls when required.
- Equal-container Exhibit/Studio parity: DOM `9974b588`, style `300d6c6d`.
- Sections family: 6,829 B gzip under the 6,861 B ceiling; S13 runtime 0 B.
- Browser console/page errors: zero.
- Resource gate: clean; one headless session, one tab, pre-existing server
  preserved.

## Remaining Human/Target Work

- Human visual and stability approval.
- Exact Shopify target bounds and adapter implementation/evidence.
- Corrected S13-specific Figma evidence.

No contract was promoted to `stable`.
