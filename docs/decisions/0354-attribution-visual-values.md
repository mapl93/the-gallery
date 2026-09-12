# 0354. Attribution Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Under ADR 0293, Maker's Mark and Edition / Numbering expose six component
source roles each. Maker's Mark publishes maximum width, stamp size, stamp/info
gap factor, text-gap factor, surface-padding factor and border thickness.
Edition publishes outer gap, count gap, block/inline padding factors, label
tracking and border thickness. Both borders alias dimension.1. Edition's count
factor initially aliases its outer factor in the source; public overrides can
edit each independently. All spacing factors retain the shared element-gap
basis, including Edition's existing 0.3333/0.5833 factors without rounding churn.

The respective inventories have 22 and 20 public values. Registry gains the
missing inventories; Studio adds every previously unexposed shared type role.
Edition's two text colors use a token-pair control so both are editable. Exhibit
uses the same metadata. No new semantic content, state, dependency or runtime
is introduced. Maker's Mark retains canonical Link and its existing 20rem stamp
alignment query; Edition remains a native passive statement, distinct from Badge.

The semantic boundaries of ADRs 0209/0210 remain intact: the target owns factual
attribution, destination, edition notation and record validity. These visual
controls do not define Shopify data/editor mapping or promote either pilot.
The generated Web and Shopify copies are refreshed; copy-and-own consumers
adopt their token/CSS changes explicitly.

## Evidence

See `docs/reports/2026-09-12-attribution-checkpoint.md` for an installed-consumer
comparison, independent customization, native Link, omission, reset, forced
colors and shared Exhibit inventory checks. No browser/server survives the phase.
