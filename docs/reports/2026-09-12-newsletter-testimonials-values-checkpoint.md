# Newsletter and Testimonials visual values checkpoint

Date: 2026-09-12. Baseline: `0bf99b0`. ADR 0384.

Newsletter: 10 roles / 27 public values. Testimonials: 17 roles / 39 public
values. Shared spacing/type/color/radius roles stay canonical; child components
retain their own controls. Testimonials' unused layout-container declaration
is removed from its inventory, not from the global token catalogue.

Evidence in `output/playwright/newsletter-testimonials-values/`: fresh CLI
consumer/provenance, old CSS, fixture/harness, result.json and inspected images.

- 20 cases, 440 element comparisons over five widths (320–1800px) and both
  themes preserve geometry, typography, colors, borders/radii and spacing.
- Newsletter content maximum 640px and independent content/form gaps 64/16px
  apply through inherited tokens. The composed field and Button are both 46px
  high with equal bottom edges in the tested horizontal form.
- Testimonials wide-column override gives two 552px tracks at 1200px; independent
  card padding/gap/author gap measure 32/8/24px. Existing responsive defaults
  remain one/two/three columns based on container width.
- Enlarging type while retaining small absolute leading respects the existing
  relative heading/quote floors. Both components fit a 240px RTL parent.
- Studio edits/reset pass. Native empty email blocks submission and shows no
  invented outcome; valid local submission produces only the documented
  "Preview only: no subscription was sent." response. No real subscription.
- Clearing Testimonials' title produces a neutral div without a heading.
  Exhibit exposes the same width/column roles. No record service or runtime added.

Source/target builds, catalogue, docs/contracts/Studio and component/refinement/
performance audits pass. Existing Shopify asset advisories remain. Final owned
resource gate passes; temporary public fixture removed. No site/dist, hosted
upload, publication or stable promotion. Full target integration, screen-reader
coverage and owner certification remain separate from these bounded checks.
