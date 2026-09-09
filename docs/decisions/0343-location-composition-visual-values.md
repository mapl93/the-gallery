# 0343. Location Composition Visual Values

Status: Accepted

Date: 2026-09-09

## Decision

Expose the shared Location Search anatomy already defined in ADR 0244 through
12 source roles for header/form/results/details spacing, result/map padding and
borders, status geometry and search heading weight. This names an existing shared
composition, not a new registry component or global token layer. Pickup and
Store Locator both expose these values and existing system typography/color roles.

Pickup adds selected-ring width and explicit choice-to-details gap/inline inset.
The latter two start at zero, preserving actual consumers. The old private
pickup-location-selector__result-details selector had no canonical consumer and
its Input icon estimate was not an active layout. Retire that selector and its
unused Input-icon inventory; consume the new values on actual shared details.
These values do not claim to follow Radio width automatically.

Store Locator adds action row/column/offset factors, results-heading size factor
and result-name weight. Defaults preserve existing CSS/browser heading values.
Body typography is explicit through existing system roles; description/address
inherit it. Canonical Input, Button, Radio and Link retain their own APIs.

The illustrative map's 10rem minimum belongs to Studio fixture CSS. Move its
class out of canonical product CSS rather than exporting a fake map-height token.
The real optional map slot exposes border/padding only. Providers own map engine,
height, tiles, pins, attribution and data. Search container threshold stays
unchanged; location data, requests, permission and intent are not visual tokens.
Both components remain pilot; Shopify provider work is still separate.

## Acceptance

Preserve initial geometry/type in both themes and compact/wide containers. Verify
all new values affect real anatomy, native pickup selection and manual search,
error/loading states, forced colors, RTL, optional map presentation, Studio/reset
and Exhibit references. Validate source/catalogue, contracts, Studio, docs, CLI,
TypeScript and regenerated Web/Shopify adapters without site/dist.
