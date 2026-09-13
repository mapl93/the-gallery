# ADR 0394: Header and Footer Visual Values

Status: Accepted

Date: 2026-09-12

Expose sixteen Header roles for current height, borders, logo imagery, navigation,
action spacing, badge geometry/type and focus. Expose fourteen Footer roles for
headings, copy measure, focus, rules, bottom spacing and responsive columns.
Dimensions and weights alias existing primitives where available. Keep existing
rem/ch measures and the 5px/11px badge values; no new primitive scale entries.

Footer's existing wide 2fr/1fr/1fr/1fr arrangement is expressed as a first-track
share of available track space (0.4), plus three equal secondary columns, after
subtracting their gaps. Compact columns default to one. This preserves the
first-track hierarchy regardless of which target-owned slot occupies it.
It avoids CSS-fr units in the source format and does not duplicate token catalogs.
The CSS repeat count minimum is one, with no neutral upper ceiling; proportional
share clamps to 0–1. The existing 48rem container threshold is unchanged.

No action-priority, disclosure, route, service or content decision is inferred.
Header narrow-screen action selection remains target-owned under ADR 0100.
Studio and Exhibit expose source roles; Web/Shopify outputs are regenerated.
Copy-and-own adoption stays explicit; no target certification or stable promotion.
