# Dimensions visual-controls checkpoint

Date: 2026-09-12

Decision: ADR 0358. Nineteen source roles; 36 public values.

Fresh CLI consumer installs Dimensions with canonical Segmented Control.
Canonical source, contract, registry, Studio and shared Exhibit reference expose
visual geometry, annotation anatomy and measurement row controls. Term weight
is independent from Button; inherited annotation/list weights are explicit.

## Local evidence

- 424 element comparisons at 320/600/900/1200, light/dark, with/without visual:
  geometry within 0.02 CSS px; font/color/padding/border/radius unchanged.
- Custom visual 400px square with 3px border; annotations have 8/16px padding,
  6px gap, 2px border, 15px top/25px bottom/12px logical-end insets; marker is
  10 × 3px. Table top rule 2px, row padding 12px, row rule 3px, term 327.59375px
  of a 566px row after a 20px gap and 0.6 share.
- Setting Button weight to 100 and host weight to 900 keeps terms at 600 and
  values at 400. Narrow RTL rows stack with an editable 8px gap and fit the host;
  forced-color visual boundary remains solid.
- Studio 24rem maximum/ratio 1 yields a 384px square. Native unit radio changes
  the complete preformatted list and annotation set to inches; ArrowLeft returns
  to cm. This verifies the target fixture, not a conversion function in Dimensions.
  Visual/control omission, reset and Exhibit token reference pass.
- Screenshot inspected. Evidence: ignored `output/playwright/dimensions-values/`.
  Public temporary fixture removed. Single browser/server closed, resource gate
  clean and no remaining test processes.

Source/Web/Shopify builds and adapter validation, docs/contracts/Studio/CLI,
source catalogue and structural certification/refinement/performance inventories
pass. Catalogue: 1,173 paths, 9,384 compiler comparisons. Maturity unchanged:
5 stable, 173 pilot, 4 deprecated. Existing Shopify advisory performance overages
remain; no hosted Shopify certification or upload.

No new runtime, Figma, source modes, tools installed, site/dist or stable
promotion. Production measurements/media and unit semantics remain target-owned;
no full screen-reader/contrast matrix is claimed. Copy-and-own consumers adopt
CSS/tokens explicitly; intentional Button-token overrides on measurement terms
must move to the new shared-weight reference scoped to Dimensions.
