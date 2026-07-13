# 0075. Product Commerce Semantic Studios

Status: Accepted

Date: 2026-07-12

## Context

The Product family had canonical CSS and conservative contracts, but its docs
still mixed legacy examples, incomplete semantic properties, and static previews.
The family also exposed three interactive treatments that used the orange
statement surface for selected or primary actions, despite the accepted neutral
interaction direction.

The Product review covers Product Card, Product Gallery, Product Info, Variant
Selector, Product Form, Product Slider, Size Chart, Back in Stock Alert, Store
Pickup Availability, and Subscription Option.

## Decision

- Each Product component has a semantic Studio definition and renders its
  canonical classes instead of a parallel visual approximation.
- Studio sample copy, media, prices, and icons remain site-owned fixture data.
  They are not contract defaults or target-agnostic API.
- Product media fixtures use a valid transparent image element over a local
  Studio-only visual surface so image anatomy and alt text remain testable
  without external assets.
- Selected size pills, active Size Chart units, and Back in Stock's primary
  submit action consume the primary button token family. The orange statement
  surface remains available for editorial roles.
- Product Form demonstrates the real Variant Selector and Quantity Selector
  dependencies. Fixture labels belong to the dependency preview and do not
  become Product Form properties.
- Back in Stock and Subscription Option expose `default`, `error`, `success`,
  and `warning` validation families for their value-entry controls. Hover and
  focus preserve the active validation family.
- Store Pickup is a synchronized disclosure: root state, trigger
  `aria-expanded`, and content visibility change together.
- Size Chart Studio contains its open overlay within the preview stage while
  preserving dialog semantics and a close/reopen path.
- Product Slider remains horizontally scrollable in the constrained Studio
  stage; the Studio fixture uses readable item widths rather than compressing
  four cards to the desktop viewport breakpoint.
- Product docs retain the Exhibit five-section composition: Overview,
  Presentation, Usage Guidelines, Accessibility, and References.
- Product contracts remain `pilot` until owner-led human review. Passing
  automated validation and browser QA is necessary but does not promote them
  to `stable`.

## Consequences

- Product Studio can be used for rapid semantic and token iteration without
  inventing a second component API.
- Interactive controls use the neutral primary family consistently while the
  editorial statement palette keeps its intended role.
- Product form dependencies are visually honest and can be tested as composed
  controls.
- Web and Shopify adapter outputs must be regenerated after canonical Product
  CSS or contract changes.
- The same family review gate can now be applied to Collection, Cart, and
  Account components.
