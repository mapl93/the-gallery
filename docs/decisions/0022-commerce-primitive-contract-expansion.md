# 0022. Commerce Primitive Contract Expansion

Status: Accepted Initial Implementation

Date: 2026-05-24

## Context

The form family now has contract coverage, but product, cart, collection, global, and account components depend on primitives that were still only described by CSS, MDX, and registry metadata.

Before writing product and commerce contracts, the reusable primitive dependencies should become formal contracts.

The pass also found a few implementation/documentation mismatches:

- `badge--info` was documented, but the CSS has no `.badge--info`; the info badge is the default `.badge`.
- Price exposes a sale modifier in CSS, but the registry did not list a sale variant.
- Skeleton and Divider expose multiple CSS modifiers, but the registry did not list those variants.
- Quantity Selector uses typography tokens in CSS, but the registry did not list them.

## Decision

Add ten more validated component contracts:

```text
components/contracts/badge.contract.json
components/contracts/tag.contract.json
components/contracts/price.contract.json
components/contracts/quantity-selector.contract.json
components/contracts/rating.contract.json
components/contracts/skeleton.contract.json
components/contracts/empty-state.contract.json
components/contracts/divider.contract.json
components/contracts/avatar.contract.json
components/contracts/breadcrumb.contract.json
```

Also align registry metadata and MDX API references for these components.

## Contract Notes

Badge captures:

- Default info styling with no modifier class.
- Success, warning, and error variants.
- Non-interactive status semantics.

Tag captures:

- Removable chip anatomy.
- Keyboard-accessible remove behavior.

Price captures:

- Current, compare-at, and unit price anatomy.
- Default and on-sale variants.
- Target-owned locale, currency, and money formatting.

Quantity Selector captures:

- Increment/decrement buttons and native number input.
- Hidden browser spin button.
- Min, max, step, disabled, and inventory synchronization behavior.

Rating captures:

- Read-only star display.
- Filled and half-star states.
- Review count and accessible rating label requirements.

Skeleton captures:

- Shimmer loading placeholder.
- Text, title, image, button, and circle shape variants.
- Loading announcement and reduced-motion guidance.

Empty State captures:

- Icon, title, message, and optional action composition.
- Empty-context guidance distinct from loading states.

Divider captures:

- Default, decorative, and section variants.
- Semantic separator guidance.

Avatar captures:

- Image or initials fallback.
- Small, default, large, and extra-large sizes.
- Identity and image alternative text requirements.

Breadcrumb captures:

- Navigation trail anatomy.
- Link hover and current-page states.
- Navigation landmark, aria-current, and separator semantics.

## Consequences

- The contract layer now validates forty-seven components.
- Product and cart contracts can now reference Badge, Tag, Price, Quantity Selector, Rating, Empty State, Avatar, and Breadcrumb as formal dependencies.
- Registry metadata now reflects the CSS API more accurately for Price, Skeleton, Divider, and Quantity Selector.
- Badge documentation no longer advertises the nonexistent `.badge--info` class.

## Follow-Up Work

- Continue contract expansion into the remaining primitive controls.
- Continue contract expansion into product and commerce components once their primitive dependencies are covered.
- Start target-specific adapter guidance that uses contract metadata, especially for Shopify and React.
