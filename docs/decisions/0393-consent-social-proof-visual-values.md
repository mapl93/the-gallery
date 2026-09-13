# ADR 0393: Consent Manager and Social Proof Visual Values

Status: Accepted

Date: 2026-09-12

Expose Consent Manager's current measures through fourteen public component
roles: banner/content/action gaps and padding, content/action wrapping bases
and minima, banner border, preferences width/introduction gap, preference-row
spacing and separators. Factors retain the live shared element-gap base; explicit
rem measures preserve the existing layout. Border widths alias dimension.1.
The main banner gap can change independently of internal spacing.

Consent Manager retains its pre-v1 `cookie-consent` source/registry identifier
(ADR 0226), native equal-access actions, canonical Modal and Checkbox composition,
and target-owned consent categories, values, legal/provider policy and storage.
No additional overlay or service is introduced.

Social Proof adds media base size (initially the existing size.touch.minHeight
role), its existing responsive extra-size factor and timestamp gap. The base can
change independently of the shared touch minimum; the default extra contribution
remains 0.25 times the shared spacing base. Timestamp gap retains 0.125.

Its Studio image incorrectly carried a fixture class that imposed 48px, masking
canonical responsive sizing and any token edits. Render the actual canonical
image class and remove now-unreferenced fixture geometry/background styles.
The preview recovers canonical sizing rather than defining another default.

Contracts, registry, shared Studio/Exhibit metadata and generated targets expose
the values. Copy-and-own adoption remains explicit. Social Proof is still passive
and intentionally omitted from Shopify v1 under ADR 0253. No provider, fabricated
activity, consent persistence, new token layer or maturity promotion.
