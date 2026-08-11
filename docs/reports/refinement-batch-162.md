# Refinement Batch 162 — Care Instructions Decision Reconciliation

Date: 2026-08-11

Component: R4 `care-instructions`

Result: ready for explicit human review; remains `pilot`

## Accepted Direction

Owner decision 58 confirms that every R4 instance is one passive native
unordered list with one homogeneous neutral, recommended, or avoid tone. A
Do/Don't presentation composes separate canonical instances rather than mixed
per-item tone or state.

Public semantic values remain `default | do | dont` for compatibility. Targets
may present friendlier localized visible vocabulary such as Recommended/Avoid.
Every item remains complete in visible text; supporting color and icons never
carry meaning alone. Legal or safety warnings use separately reviewed rich
content or canonical Alert and are never inferred from care tone.

## Reconciliation Result

The existing `0.2.0` pilot already implements the accepted direction:

- conditional named section or generic root;
- required non-empty native `ul[role=list] > li` collection;
- complete visible target-owned labels and optional practical descriptions;
- optional redundant assistive-hidden icons;
- homogeneous root-level Default, Do, and Don't treatments;
- no mixed item-tone API, checklist, acknowledgement, alert, state, focus,
  event or neutral runtime;
- one renderer/fixture shared by Exhibit and Studio;
- intrinsic 1/2/3-column layout and strict optional/invalid omission.

No renderer, contract, Studio control or CSS behavior change was necessary.
ADR 0204, MDX guidance, dossier, permanent report, open questions and progress
matrix now record the accepted vocabulary/grouping/safety boundary.

## Existing Evidence Reused

The current R4 CSS slice is byte-identical to Batch 113:

`cea7e4ba66645710a5ef7077ff19b9846f6fa5750c298246bc686c9d9589b697`

Batch 113 already contains before/after captures, four paired natural
viewports, untitled/empty/one-label-only cases, all three variants,
`200/320/430/680px` containers, localized RTL/unbroken content, effective 200%
text, user spacing, dark, forced colors, reduced motion, exact DOM/style parity,
zero overflow, AA contrast and zero console/page errors. Those captures were
visually re-inspected; no browser rerun was needed.

## Current Performance And Targets

- R4 CSS: `2,445 B` raw / `776 B` gzip level 9, exact Batch 113 SHA;
- Ceramics CSS: `34,028 B` raw / `4,858 B` gzip against `5,427 B`, leaving
  `569 B` after later R-family refinements;
- R4 neutral runtime/assets/listeners/observers/timers/requests: zero;
- Webflow and Shopify Ceramics CSS: source-identical;
- native Shopify R4 remains planned.

No managed browser or server was started for this reconciliation.
`npm run evidence:assert-clean` remains the lifecycle gate, and `site/dist` is
unchanged.

## Remaining Gates

- first production target proof for care records, applicability,
  editorial/safety/legal review, revisions, localization and recalls;
- production icon/symbol policy and licensing;
- proof for qualifications, regulatory disclosures, warnings and
  acknowledgement outside passive R4;
- first Shopify consumer/editor mapping;
- final visual review or R4-specific design evidence;
- explicit human stability review.

No `stable` promotion is authorized.
