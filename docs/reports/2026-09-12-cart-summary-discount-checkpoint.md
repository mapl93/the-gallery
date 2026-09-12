# Cart Summary / Discount Field checkpoint

Date: 2026-09-12. Decision: ADR 0365. Parent: `9c20416`.

Twenty-two roles expand Summary/Discount profiles to 26/25 public values.

## Evidence

- Fresh CLI install and subsequent unmodified-consumer CSS update.
- 248 element comparisons preserve initial geometry/font/color/spacing/border
  across two fixtures, four widths (320/600/900/1200px) and Light/Dark.
- Summary independent gap/padding 10/15px, rows/row gap 8/12px, total top
  margin/padding 4/14px, divider 3px and title/total weights 400/600 apply.
  Narrow RTL fits. Express provider internals are not styled.
- Discount panel gap/padding 12/14px, form gap 16px, code list gap 8px,
  action gap 10px, horizontal padding 6px, border 3px and weight 400 apply.
  Native summary focus and Space close/reopen pass.
- Error screenshot demonstrated Apply aligned with message bottom. The subgrid
  correction makes both field/button bottoms 128px (delta 0) in the customized
  installed consumer; Studio's real INVALID error also measures delta 0.
- Studio padding controls, local rejection/application/removal of STUDIO15,
  reset and Exhibit inventory pass. Removal focus returns after its scheduled
  animation frame; the first immediate assertion ran before that frame and was
  corrected in the harness without changing runtime.
- Final error screenshot inspected. Browser/server resource gates and process
  scans pass after every phase. Owned temporary public fixture removed.
- Generated Web/Shopify adapters, source and docs validations pass.

Ignored evidence: `output/playwright/cart-summary-values/` includes CLI
provenance, before CSS, harness/results and error-before/error-after screenshots.

## Limits

Chromium verification does not establish cross-browser or screen-reader
certification. Unsupported-subgrid stack is specified by CSS but not separately
run in a browser lacking subgrid. No live discount eligibility, monetary truth,
provider checkout, hosted Shopify editor or store mutation was tested. Components
remain pilot; generated Shopify CSS is not a target delivery certificate.
