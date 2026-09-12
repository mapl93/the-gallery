# ADR 0375: Article Hero Container Typography

- Status: Accepted
- Date: 2026-09-12
- Owners: The Gallery
- Refines: ADRs 0268 and 0374

The owner selected option A from the measured comparison in
`docs/reports/2026-09-12-article-hero-type-decision.md`.

Article Hero uses the existing H2 size and line-height roles below its existing
40rem container layout threshold, and Display size and line-height at or above
that threshold. Each role retains the system responsive values. This changes
visual metrics only: native heading rank, article family, Display weight and
tracking remain unchanged. There is no new source token, mode or breakpoint.

The two compact roles join the contract/registry inventory (42 public values).
Studio names compact and wide metrics explicitly; Exhibit derives its catalogue
from the same metadata. Root-level or inherited token overrides remain supported.

Acceptance evidence: 130 combinations of four viewports, both themes, five
variant/media cases and container widths including 639/640px. Metrics match the
appropriate roles with no root overflow; wide metrics and all family/weight/
tracking values match baseline. Independent inherited overrides, narrow RTL,
Studio edit/reset and Exhibit exposure pass. See the checkpoint report.

Web and Shopify CSS/manifests are regenerated. Existing consumer copies require
adoption; no hosted Shopify upload or stability promotion is inferred.
