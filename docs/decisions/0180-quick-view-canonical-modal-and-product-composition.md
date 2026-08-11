# 0180. Quick View Canonical Modal And Product Composition

Status: Accepted

Partially superseded by ADR 0255 for the accepted full rich-media Gallery,
`imageDetail="none"`, complete-snapshot, and target-coordinator boundaries.

Date: 2026-07-17

## Context

Quick View declares Modal, Product Gallery and Product Form dependencies, but
its canonical CSS and shared docs renderer currently produce a static card-like
section. The output has no Modal overlay, dismiss action or lifecycle; it uses a
raw image instead of Product Gallery, duplicates Price markup that is absent
from the contract, and renders Product Form as a non-form wrapper. Its optional
full-details action also duplicates Link styling and invents a fallback URL.

ADRs 0026 and 0077 already define Quick View as a composed product-purchase
surface. ADR 0114 assigns media selection and rich-media scope to Product
Gallery and its target. ADR 0117 assigns native submission and variant/purchase
coordination to Product Form and a parent target coordinator. Modal's accepted
contract requires a visible title, named close action and target-owned complete
modal lifecycle.

## Decision

- Quick View is a domain profile of canonical Modal, not a standalone card or a
  new ARIA widget. Its product title is the required visible Modal title and
  supplies the dialog accessible name.
- The open composition uses canonical Modal overlay, root, header, title, close
  and body classes. The target owns trigger relationships, native versus custom
  dialog mapping, focus, inertness, Escape/backdrop policy, scroll locking,
  portal/top-layer, exit completion and restoration.
- The body contains one required canonical Product Gallery and one required
  canonical target-formatted Price. Product Form is an optional canonical native
  form composition. The optional complete-product destination uses canonical
  Link. Add Price and Link as direct registry/contract dependencies.
- Stable K8 properties are required non-empty `title`, required localized
  `dismissLabel`, optional semantic `open`, required `gallery`, optional
  `vendor`, required `price`, optional concise `description`, optional
  `productForm`, and the coherent optional `fullLinkLabel`/`href` pair.
- A Quick View must provide Product Form, the complete-product Link, or both.
  One-sided Link pairs and blank required title omit invalid output rather than
  producing an empty heading or synthetic destination.
- Media, selected options, merchandise id, availability, Price, inventory,
  quantity rules, selling plans, request/result state, cart refresh, status,
  analytics and URL synchronization belong to one target product coordinator.
  K8 owns no mirrored product or form state.
- Internal columns respond to a named component container. Maximum width,
  breakpoint, gaps, media/info ratio, chrome and vendor treatment remain private
  compositional values. K8 adds no independent public visual token.
- The neutral runtime budget is zero. Framework and commerce targets may expose
  controlled/uncontrolled open state and native lifecycle facilities without
  adding React, Shopify or portal mechanics to canonical source.
- The docs target extracts and shares Modal, Product Gallery and Product Form
  artwork so standalone and composed previews do not duplicate markup or
  behavior. Site-only fixtures and state do not become component defaults.
- Shopify may provide a product-context Liquid snippet that composes canonical
  target snippets, but remains not target-ready until invocation, product
  loading, rich/high-variant synchronization and purchase lifecycle are proven.
- Quick View remains `pilot`. ADR 0255 resolves the inherited rich-media and
  complete-snapshot architecture; automated evidence may make it ready for
  human review, but explicit visual and target review remain required.

## Consequences

- Exhibit and Studio can demonstrate a real named modal workflow with one
  renderer and fixture instead of a static product card.
- K8 delegates media, price, form and navigation presentation to canonical
  dependencies and removes duplicated CSS/markup.
- A target cannot claim Quick View readiness from CSS or static Liquid alone;
  modality and coordinated commerce behavior remain measurable maturity gates.
- Product-specific content stays semantic and target formatted while geometry
  and implementation mechanics remain private or adapter-owned.
- Mobile full-screen/sheet direction, production target proof, supplementary
  fields and visual identity remain explicit human or target review items.
  Rich-media scope and the complete-snapshot loading boundary are resolved by
  ADR 0255.
