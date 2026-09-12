# Shipping / Upsell checkpoint

Date: 2026-09-12. ADR 0366. Parent: `07a0628`.

Nineteen roles expand Free Shipping Bar/Upsell to 12/26 public values.

## Evidence

- Fresh CLI dependency-closed consumer. 136 element comparisons preserve defaults
  across two fixtures, 320/600/900/1200px and Light/Dark.
- Shipping gap/padding/border 12/16/3px apply independently.
- Upsell gap/padding/border 10/15/3px; heading padding/border 12/2px; list,
  item and info gaps 8/16/6px; text basis/minimum 160/80px; media/border 64/4px;
  heading/item weights 400/700 all match authored tokens.
- Narrow RTL and missing-media layouts fit. Native Link focus passes.
- Studio padding/rem media editing, reset, canonical named Progress range
  (65 of 100) and the local Add status pass. Exhibit lists the source controls.
- Customized narrow screenshot inspected; its static media block intentionally
  demonstrates the token background rather than claiming a product image.
- Generated adapters, source and docs validation pass. All browser phases use
  one headless browser/tab and close it plus the managed server. Resource gates
  and process scan pass; the owned public fixture is removed.

Ignored evidence: `output/playwright/shipping-upsell/` contains source comparison,
fixture, CLI provenance, harness, results and screenshot.

## Limits

No shipping eligibility, live cart/recommendation engine, hosted editor or
screen-reader certification. Progress semantics are sampled, not recertified.
Large authored measures may require consumer layout review. Pilot remains pilot;
copy adoption is explicit and no target is deployed.
