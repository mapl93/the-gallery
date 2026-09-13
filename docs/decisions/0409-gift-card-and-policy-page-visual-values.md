# ADR 0409: Gift Card and Policy Page Visual Values

Status: Accepted

Date: 2026-09-13

Expose 18 Gift Card roles for measures, ratio, code tracking, borders, QR frame,
paired theme-aware card text/scrim and wide column proportions. The initial
0.9fr/1.1fr distribution becomes a 45% share of available width after the gap,
retaining the card-column minimum and existing container boundary. Existing 700/
600 weights use shared bold/semibold tokens. Expose twelve Policy Page roles for
measure, anchor offset, quote/rule/underline/focus treatment and independent em-based
contents/body-list insets. Preserve current typography families and palettes.

Policy Studio's body link now demonstrates the existing native document treatment;
explicit Link composition retains its own API. An optional site-only extended
fixture demonstrates code/pre/table styles, resets off and does not enter the
neutral contract. Remove Policy's unused surface-primary public entry; retain the
global alias. Card-only inverse overrides migrate explicitly to its card text role.

Legal wording, gift-card balances/issuance, real QR media, redemption and copy
behavior remain target-owned. Public contracts feed Studio/Exhibit and generated
Web/Shopify; copied consumers adopt explicitly. No source-format, platform or
maturity change.
