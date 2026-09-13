# ADR 0395: Navigation Overlay Visual Values

Status: Accepted

Date: 2026-09-12

Expose seven Mobile Menu roles for link padding, separator, weight, underline and
focus. Expose nineteen Search Overlay roles for panel, scrim, viewport inset,
field, results, typography and focus. Expose three Cart Drawer summary roles for
row/column gaps and total weight. Existing geometry and shared dependencies remain.
Dimensions and weights reference existing system primitives where available;
component-specific rem measures and relative spacing factors keep their defaults.

Search's dynamic top inset is a unitless viewport share multiplied by 100dvh,
clamped between existing element gap and an editable rem maximum. The source
format is unchanged. CSS structural containment, focus behavior, forced colors,
provider data and target services remain distinct from public visual values.

Studio no longer overrides Search's outer/panel padding or title line height
with fixed demonstration values. Its bounded overlay positioning and panel
height remain preview containment. Mobile Menu and Cart Drawer still compose
Drawer and their existing child components.

Contracts, registry and Studio metadata expose these roles to both Customize and
Exhibit. Generated Web/Shopify outputs carry them. Adoption by existing copies is
explicit; no hosted service verification or stable promotion is implied.
