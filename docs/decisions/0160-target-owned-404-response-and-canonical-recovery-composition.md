# 0160. Target-Owned 404 Response And Canonical Recovery Composition

> Update (2026-07-20): ADR 0236 resolves Empty State heading ownership. A
> standalone 404 host supplies H1; the Shopify adapter now does so explicitly.

Status: Accepted

Date: 2026-07-16

## Context

P1 404 Page is a missing-resource page composition. Its initial neutral source
restyled field, action and link behavior, emitted a second `main` in the docs,
used cancelled fragment destinations and allowed target search/routes/data to
appear like component capabilities. Shopify already owns a real 404 JSON
template but its section only renders a generic Empty State.

RFC 9110 assigns the 404 response to the origin, HTML assigns the dominant
document content to one visible main landmark, and WAI/WCAG require meaningful
heading, landmark and link semantics. Open UI has no interoperable 404 widget;
Polaris models the page as a restrained Empty State and Radix composition keeps
accessible leaf behavior with its primitive owner.

ADR 0084 already assigns search, routes and suggested records to the target.
ADR 0112 keeps Empty State passive, permits an element-agnostic title class and
defers universal heading-rank ownership; it explicitly records Shopify's fixed
H3 as an unresolved adapter gap.

## Decision

- P1 is a target-agnostic missing-resource composition, not an HTTP response,
  cache policy, router error boundary, service-error screen, search service,
  recommendation engine or analytics owner.
- A valid composition requires non-empty `heading` and `message` plus at least
  one useful recovery path across search, recovery destinations or suggested
  destinations. Invalid required composition is omitted.
- The seven-property API remains optional decorative `illustration`, optional
  visible `code`, required `heading`, required `message`, optional `search`,
  optional `recoveryLinks` and optional `suggestions`.
- The explanatory core composes canonical Empty State. Search composes
  canonical Input and Button. Primary and additional destinations compose
  canonical Button or Link. P1 owns only their arrangement and relationships.
- Decorative illustration is hidden from accessibility. The optional visible
  code is also assistive-technology-hidden because the required textual heading
  communicates the state.
- Exhibit and Studio render one shared labelled contextual `section` inside the
  documentation main. Standalone targets place P1 in the one document-level
  main they already own; the neutral contract does not emit or configure that
  landmark.
- Heading rank remains contextual and target-owned under ADR 0112's recommended
  translation. This ADR does not add `headingLevel` or close the universal
  heading-ownership question. Shopify preserves the existing Empty State H3
  until that owner decision changes.
- Search uses a named native form, visible canonical Input label, native
  `type="search"`, query `name`, associated message and visible canonical submit
  Button. Endpoint, request, results and feedback lifecycle remain target-owned.
- Recovery and suggestion destinations use real native anchors with canonical
  Link or navigation-Button styling. Suggestions use a labelled native list.
- P1 uses logical properties and a named inline-size container. Viewport rules,
  site-only P1 geometry and duplicate dependency focus/hover/motion CSS are
  removed.
- P1 adds zero neutral runtime, asset, listener, observer, timer, request,
  router or formatter. The permanent Pages + Coming Soon ceiling remains
  `5.3 KiB` (`5,427 B`) gzip.
- Contract version advances to `0.3.0` and remains `pilot`. Automated evidence
  may prepare human review but cannot approve visual values, heading ownership
  or stability.

## Target Translation

- Neutral Web uses a contextual labelled section, native form/list/navigation
  semantics and canonical Empty State/Input/Button/Link dependencies.
- Shopify keeps `templates/404.json`, the layout-owned main and platform-owned
  HTTP behavior. `main-404` maps P1 classes, localized target copy and platform
  routes/search while retaining the known Empty State H3 gap.
- Webflow consumes source-identical P1 CSS. React and Angular are thin native
  wrappers; Figma is a visual target; SwiftUI and Compose use native unavailable
  content, search and navigation controls.

## Open Human Boundary

This decision does not approve final alignment, hierarchy, code scale,
illustration, measures, spacing, primary-action emphasis, search arrangement,
suggestion treatment, copy, destinations, search/recommendation services,
Shopify heading rank, a universal heading API, corrected Figma evidence or
stability.

## Consequences

- The missing-page composition no longer duplicates canonical component
  behavior or introduces invalid docs landmarks.
- HTTP, router, search, record and analytics lifecycles remain with each target.
- Native destinations and forms can be validated independently from P1 layout.
- Shopify can expose its real 404 template for cross-target review without this
  batch silently resolving the deferred heading architecture.
