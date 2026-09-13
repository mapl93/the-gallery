# Gift Card / Policy Page visual-value checkpoint

Date: 2026-09-13. Baseline: `671fbc9`. ADR 0409.

Thirty public roles expose existing values. Cloned current Studio markup, retained
styles and removed docs classes compare old/new canonical CSS across five widths
and two themes: 20 cases / 770 element comparisons. Geometry/type/borders preserve
defaults; narrow RTL client/scroll widths both equal 288px. This is not a fresh CLI
install or a before/after comparison of the previous Policy fixture markup.

Actual Studio tests Gift Card ratio, QR frame, code border, text color and wide
column share in a temporarily widened browser fixture: 1088px layout with 32px gap
resolves 633.594/422.406px at a 60% share. Policy tests independent em list insets,
quote border, native-link underline, optional table/pre borders and fixture Reset.
Matching Exhibit controls pass; Gift Card screenshot inspected. Evidence resides
in `output/playwright/gift-policy-values/`. Browser/server resources closed.

Web/Shopify generation, catalogue, docs/contracts/Studio, TypeScript and audit
inventories pass. No clipboard writes, real QR validation, card issuance/redemption,
legal-policy validation, arbitrary-brand contrast certification, hosted Shopify,
site/dist rebuild, deployment or stable promotion.
