# ADR 0410: Reviews Studio Canonical Fidelity

Status: Accepted

Date: 2026-09-13

Remove old Studio rules that resized Star Input labels/indicators at 380px,
replaced File Upload padding at 520px, and stacked Review Toolbar before its
canonical 30rem container boundary. Keep Studio canvas layout and illustrative
icon/media assets site-owned. Remove redundant image sizing, fieldset resets
and the Studio-only empty Review Form status suppression. Star Input's native
legend padding reset belongs in canonical CSS so copied markup and Studio agree.

No new tokens, variants, viewport modes or interaction are introduced. Existing
public customization remains authoritative at narrow sizes; native semantics,
shared touch target and runtime stay intact. Regenerate Web/Shopify and retain
pilot maturity. Consumers adopt explicitly.
