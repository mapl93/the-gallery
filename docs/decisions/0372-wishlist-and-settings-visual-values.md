# 0372. Wishlist And Settings Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Apply ADR 0293 to Wishlist/Settings: 15 source roles (8/7), public inventories
24/22. Preserve Wishlist's 14rem minimum, Settings' 35rem maximum, the 1px
separator, and existing system spacing. Independent factors expose padding,
header/section/content/control/grid relationships without flattening child APIs.

Wishlist's existing 10cqi inset cap is now a .1 public share of its own container,
independent from its responsive page-spacing factor. It remains an upper bound,
not another viewport catalogue or semantic columns property. Settings exposes
header-to-content and content-internal gaps separately. Its last section still
has no separator. Existing shared body/heading typography is effectively consumed.

Contracts, registry, Studio and shared Exhibit publish the same controls.
Product Card, Button, Empty State, Form, Input and Switch keep their contracts;
ADRs 0265/0266 own exact-variant persistence and per-section commitment. No
wishlist store, account save, consent model, new runtime, mode or platform.

Both targets regenerate. This completes Account's visual-value pass under
ADR 0293, not its live provider or accessibility certification. Copy adoption
remains explicit and pilot status unchanged.

## Evidence

`docs/reports/2026-09-12-wishlist-settings-values-checkpoint.md`.
