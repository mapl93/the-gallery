# Refinement Batch 163 — Dimensions Decision Reconciliation

Date: 2026-08-11

Component: R5 `dimensions`

Result: ready for explicit human review; remains `pilot`

## Accepted Direction

Owner decision 59 confirms that neutral R5 receives complete target-formatted
measurement sets and performs no conversion. One native description list is
authoritative. An optional canonical radio-backed Segmented Control selects a
complete set, which the target replaces atomically. Precision, rounding,
locale, tolerance, available unit sets and preference persistence remain
target-owned. Optional media may clarify measurements but never replace their
complete visible names and values.

## Reconciliation Result

The existing `0.2.0` pilot already implements the accepted direction:

- generic root with required native `dl > div > dt + dd > bdi` composition;
- optional truthful figure with fully redundant assistive-hidden annotations;
- optional canonical Segmented Control with one native radio value;
- independently authored complete fixture sets and atomic target replacement;
- no parsing, conversion, rounding, localization, persistence or R5 live region;
- one renderer and fixture shared by Exhibit and Studio;
- intrinsic one/two-region response, narrow row stacking and strict omission.

No renderer, contract, Studio control or CSS change was necessary. ADR 0205,
the dossier, permanent report, open questions and progress matrix now record
the accepted ownership boundary.

## Existing Evidence Reused

The current R5 CSS slice is byte-identical to Batch 114:

`f8ac4ef1602dcffae486c8e847343aa05396b5ea6555d25c2028e8a064523ad5`

Batch 114 already proves four paired natural viewports, exact same-host
DOM/style parity, native radio keyboard/change behavior, full-set replacement,
visual/control/measurement omission, one record, localized qualified values,
RTL/unbroken content, direct `200/320/430/680px` roots, effective 200% text,
user spacing, AA light/dark contrast, forced colors, reduced motion, zero
overflow and zero console/page errors. Representative desktop, localized and
dark captures were visually re-inspected. No browser rerun was needed.

## Current Performance And Targets

- R5 CSS: `3,671 B` raw / `996 B` gzip level 9, exact Batch 114 SHA;
- Ceramics CSS: `34,028 B` raw / `4,858 B` gzip against `5,427 B`, leaving
  `569 B` headroom;
- R5 neutral runtime/assets/listeners/observers/timers/requests: zero;
- Webflow and Shopify Ceramics CSS: source-identical;
- native Shopify R5 remains planned.

No managed browser or server was started for this reconciliation. The
pre-existing user-owned Gallery server was not touched, `site/dist` is
unchanged and lifecycle cleanliness remains an explicit final gate.

## Remaining Gates

- first production proof for complete formatted-set mapping, provenance and
  stale/error fallback;
- approved quantity inventory, qualification and announcement policy;
- production media/annotation truth, rights and active-set correspondence;
- first Shopify consumer/editor mapping;
- final visual review or R5-specific design evidence;
- explicit human stability review.

No `stable` promotion is authorized.
