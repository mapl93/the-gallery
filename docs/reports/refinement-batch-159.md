# Refinement Batch 159 — Material Library Decision Reconciliation

Date: 2026-08-11

Component: R1 `material-library`

Result: ready for explicit human review; remains `pilot`

## Accepted Direction

Owner decisions 54 and 55 confirm `R1-A`: a passive target-owned material
reference collection with an optional introduction and one required native
unordered list of complete named material articles. Records may provide media,
classification, description and canonical passive Tags. Names and complete
authored text carry meaning; R1 infers no taxonomy or claim.

Navigation, selection, comparison and filtering are not variants or states of
R1. A future interactive catalogue or profile system requires its own accepted
destination, data and behavior contract. Targets own provenance, revisions,
localization, rights, applicability, measurements and claim review under R0.

## Reconciliation Result

The existing `0.2.0` pilot implementation already matches the decision:

- conditional named `section` or generic `div` root;
- required non-empty `ul > li > article` collection;
- complete visible material names and strict invalid-record omission;
- optional contextual media, classification, description and canonical passive
  Tag lists;
- no hover implication, focusability, interaction state or neutral runtime;
- one renderer and fixture shared by Exhibit and Studio;
- intrinsic logical layout with no viewport-owned component behavior.

No source behavior change or new browser session was necessary. The current R1
CSS slice retains SHA-256
`e33e96604bd15baae3f56c4a12335b8e78f860905efa7b2c3df33299073f3977`,
exactly matching the fully inspected Batch 110 evidence. That evidence includes
before/after captures, four paired natural viewports, conditional/minimal/RTL/
long/unbroken/effective-200%/text-spacing states, dark, forced colors, reduced
motion, exact DOM/style parity, zero overflow, AA contrast and zero console/page
errors. Its browser/server lifecycle remains closed and clean.

## Current Performance And Targets

- R1 CSS: `2,851 B` raw / `787 B` gzip, byte-identical to Batch 110;
- Ceramics CSS: `33,605 B` raw / `4,847 B` gzip against `5,427 B`, leaving
  `580 B` after subsequent R-family refinements;
- R1 neutral runtime/assets/listeners/observers/timers/requests: zero;
- Webflow and Shopify Ceramics CSS: source-identical;
- Shopify R1 remains planned until a real template, record source/editor schema,
  authoritative order, relationships and localization are approved.

## Remaining Gates

- production record provenance/localization/rights/applicability/claim proof;
- production media art direction, alternatives, loading/fallback and rights;
- first target-native Shopify consumer and editor mapping;
- owner approval of final visual hierarchy, density, media, tracks and modes;
- R1-specific design evidence or explicit approval of the repository render;
- explicit human stability review.

No `stable` promotion is authorized.
