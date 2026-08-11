# Maker's Mark Web Refinement Audit

Date: 2026-08-11

Registry: R9 `makers-mark`

Result: ready for explicit human stability review; remains `pilot`

## Decision And Scope

Owner decision 63 and ADR 0209 define Maker's Mark as a maker-attribution group,
not a maker record or authenticity protocol. A non-empty visible `artist` is
required. `stamp`, `studio`, `year`, and `href` are optional.

A real non-empty `href` wraps only the complete visible identity in one native
canonical Link. Without it, the identity remains ordinary text. The root, stamp,
studio, and year remain passive and the whole bordered surface never becomes a
link. The target owns records, destinations, rights, relationships,
localization, profile lifecycle, and every substantiated claim.

## Certification Summary

| Gate | Result |
| --- | --- |
| Identity and dependencies | Registry, contract, MDX, renderer, Studio, CSS, and canonical Link dependency agree. |
| Anatomy and omission | Required artist fails closed; href, stamp, studio, and year omit independently. |
| Semantics | Generic non-landmark root; ordinary visible identity; optional native Link only. |
| Accessibility | Native keyboard/focus, contextual stamp alternatives, AA contrast, forced colors, reduced motion, RTL, 200% text, and spacing pass. |
| Responsive | Eight natural captures and four intrinsic widths retain complete content and zero overflow. |
| Runtime | R9 owns no JavaScript, listener, observer, timer, request, or persistence. |
| Parity | Exact normalized Exhibit/Studio DOM and internal-style hashes match. |
| Targets | Neutral Web implemented; other adapters have explicit record/service boundaries. |
| Performance | R9 and fixed Ceramics family budgets pass. |
| Stability | Human review is still mandatory; contract remains `pilot`. |

## Implemented Anatomy And API

The `0.3.0` contract exposes only:

| Property | Type | Requirement | Web mapping |
| --- | --- | --- | --- |
| `artist` | string | required non-empty | `.makers-mark__artist` visible content |
| `href` | string | optional | `href` on `.link.makers-mark__artist-link` |
| `stamp` | slot | optional | `.makers-mark__stamp` target media |
| `studio` | string | optional | `.makers-mark__studio` visible content |
| `year` | string | optional | `.makers-mark__year` visible content |

Blank artist returns no root. Blank href removes the Link without removing the
name. Optional wrappers do not remain empty. Native Link activation is the only
interaction; controlled/uncontrolled state is not applicable.

## Semantics And Accessibility

The verified root is a generic `DIV` without role, accessible name, landmark,
`tabindex`, live region, or component script. Targets may choose a more specific
outer element only when host document context proves it. Artist/studio/year are
ordinary visible text with automatic direction; R9 does not misuse `cite`,
`address`, image roles, or verification semantics.

The fixture MG stamp is assistive-hidden because adjacent “Maria Garcia” text is
the identity source. Real target marks follow native image/graphic rules:
informative content receives an equivalent alternative; redundant content uses
a null alternative or assistive hiding.

The linked fixture has exactly one focusable. Enter activates it exactly once.
Removing `href` leaves the complete name and zero focusables. Forced colors
preserves the surface/stamp boundaries, system Link color, and a visible focused
outline. Reduced motion finds no active R9 parts.

Measured contrast:

| Content | Light | Dark |
| --- | ---: | ---: |
| Maker Link | `5.88:1` | `9.95:1` |
| Studio text | `7.81:1` | `12.09:1` |

## Responsive And Content Evidence

Mobile, Tablet, Desktop, and XL pass in both Exhibit and Studio. Every natural
capture contains the same destination, one canonical Link, and zero root or
document overflow.

| Direct root | Height | Overflow |
| ---: | ---: | ---: |
| `160px` | `262px` | 0 |
| `240px` | `134px` | 0 |
| `320px` | `114px` | 0 |
| `420px` | `114px` | 0 |

Localized RTL text at `200px`, effective 200% text, and user text spacing retain
zero overflow. Source order remains stable and response is based on the
component's inline size rather than the viewport.

## Tokens, CSS, Runtime, And Performance

Canonical CSS consumes existing semantic border, text, Link, typography,
spacing, and radius tokens. Measure, stamp geometry, compact gaps, and alignment
threshold remain private. The only R9 Link rule inherits the maker-name font;
canonical Link owns decoration, color, focus, and activation.

- R9 CSS: `2,025 B` raw / `647 B` gzip level 9;
- R9 SHA-256: `9fdc6a4d7d8069a8b547fb8f44254de42193b2d3935f516fb37db3c64efcc9b6`;
- Ceramics CSS: `5,349 B` gzip / `5,427 B` ceiling, `78 B` headroom;
- R9 owned neutral runtime: `0 B`;
- shared runtime: `22,807 B` gzip, an already documented global overage;
- neutral Web component CSS: `72,664 B` gzip, also tracked by the global budget audit.

## Exhibit And Studio Parity

`MakersMarkArtwork`, its builder, and one fixture are the registered path for
both modes. At normalized `420px`:

- DOM hash `b46b7e17` matches;
- internal-style hash `a7ca058e` matches;
- one canonical Link exists in each mode;
- root overflow is zero in each mode.

## Cross-Target Boundary

| Target | Result / boundary |
| --- | --- |
| Neutral Web | Implemented generic group, strict omission, optional native canonical Link, logical CSS, and zero R9 JavaScript. |
| Shopify Storefront | CSS projection is source-aligned; an approved vendor/metafield/metaobject and product relationship are still target decisions. |
| Shopify Admin | May compose Polaris Avatar for an approved record; stamp anatomy remains distinct. |
| Webflow | CMS supplies complete strings/media/destination and contextual alternatives. |
| React/Angular | Thin property/slot projection; router or native destination stays target-owned. |
| Figma | Future target models optional parts, linked/unlinked, long/RTL, and narrow/wide states. |
| Native/future | Passive image/text group with one optional platform Link on the visible identity. |

No Liquid schema, maker record, vendor inference, profile service, authenticity
protocol, or target lifecycle was invented.

## Browser Evidence

`output/playwright/refinement-batch-167/` contains executable probes, eight
natural after captures, special-mode captures, normalized parity, and
`evidence-summary.json`. The prior passive state in Batch 118 is retained as
before evidence.

One headless Chromium session named `gallery-refinement`, one tab, and one
pre-existing user-owned server were used sequentially. The browser closed, the
server was preserved, and `evidence:assert-clean` passed. No command rebuilt
`site/dist`.

## Remaining Human Gates

- approve record meanings, ownership, rights, relationships, and multi-maker policy;
- approve real stamp assets and alternatives;
- define any separately substantiated authenticity/provenance protocol;
- select the first Shopify source and destination mapping;
- approve final visuals and R9-specific Figma evidence;
- perform explicit human stability review.

Automated readiness does not authorize promotion to `stable`.
