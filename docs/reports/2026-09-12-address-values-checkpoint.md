# Address Book / Form visual values checkpoint

Date: 2026-09-12. ADR 0371. Parent: `661f65a`.

14 source roles and 27/5 public values.

## Evidence

- Fresh dependency-closed CLI consumer; 540 element comparisons preserve
  geometry, fonts, colors, padding, margins, borders and radii across
  320/600/900/1200/1800px and Light/Dark.
- Book border 3px, padding 16/24px, postal gap 6px and Add minimum 220px apply;
  narrow RTL fits and screenshot was inspected.
- Form maximum 480px, field gap 32px and responsive single-column rows apply.
  Native FormData retains an edited field.
- Studio postal-line edits, contextual Edit demo feedback, width and reset pass.
  The width editor retains rem: 30 means 480px at the tested 16px root, and
  reset restores 35rem/560px. An initial test mistakenly entered 480 into that
  rem control; correcting the test value required no source change.
- Cancel preserves the entered draft; explicit Save reports five named fields
  and no persisted address. Exhibit lists the same public tokens.
- Source/Web/Shopify/docs/catalogue gates pass. One browser/tab/server per phase,
  cleanup/resource gate/process scan clean, owned public fixture removed.

Ignored evidence: `output/playwright/address-values/` has installed provenance,
old CSS, fixture/harness/results and screenshot.

## Limits

No address service, server validation, deletion/default reconciliation, hosted
account handoff, Shopify editor, screen-reader certification or deployment.
Native Select fallback is exercised in fixtures; this batch does not recertify
Select's full enhanced popup lifecycle. Pilots remain pilot.
