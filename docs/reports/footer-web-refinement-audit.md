# Footer Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Footer is now a body-scoped native page-footer contract with one or more labelled
target-owned navigation groups, optional ordinary brand context, optional
metadata, semantic type roles, wrap-safe touch targets, and a container-responsive
stacked/wide composition. It adds no CMS or service assumptions.

No visual approval, Shopify section-group decision, or `stable` promotion is
implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Page-shell closing content; newsletter, social, legal CMS, locale, consent, apps, and merchant inventory remain targets. |
| Anatomy and composition | pass | Native Footer/grid, optional ordinary brand/copy, one-or-more labelled nav/list/link groups, optional metadata. |
| Variants, sizes, states | pass | One treatment; narrow/wide container modes; default/hover/focus, dark, reduced-motion, and forced-colors states. |
| Public API and ownership | pass | Required `linkGroups`, optional `brand` and `metadata`; no component state, synthetic event, CMS, or service owner. |
| Tokens and visual system | pass | Twenty existing public references; column ratio, 48rem threshold, weights, and local geometry remain private. |
| Accessibility and motion | pass | Native body-level semantics, no redundant role, visible-heading nav names, lists/links, focus, reduced motion, forced colors. |
| Responsive/content resilience | pass | Footer container query, 960px wide proof, 390px localized/unbroken stress, logical geometry, and no root overflow. |
| Runtime and assets | pass | `0 B` neutral Footer runtime; no listener, observer, request, timer, asset, or continuous read. |
| Cross-target translation | pass | Neutral composition is separated from Shopify section groups/services and future target adapters. |
| Documentation and verification | pass | Dossier, ADR 0101, one renderer/fixture, real before/after evidence, adapters, and this report. |

## Contract And Browser Evidence

- Contract `0.3.0`: 11 anatomy parts, 1 variant, 1 size, 4 states,
  4 behaviors, 3 properties, and 20 public token references.
- The shared renderer emits optional brand context as ordinary `div` content and
  three `nav` groups whose accessible names resolve from unique visible heading
  IDs. No redundant `role="contentinfo"` or duplicate brand-region landmark is
  present. Production body-level placement supplies content-info semantics.
- Default editorial canvases remain below 48rem and correctly stack. A
  supplemental `960px` Footer host produces exact `320px 160px 160px 160px`
  columns with equal client/scroll width, proving the query follows Footer width
  rather than the outer viewport.
- At a 390px viewport, the Footer is `358/358px` client/scroll width and its grid
  is `326/326px` after long localized copy, a long group heading, unbroken link
  text, and long metadata. Content grows vertically without inline clipping.
- Light contrast is `16.44:1` for headings and `7.17:1` for copy, links, and
  metadata on the secondary surface. Settled hover is `16.44:1` with the accent
  reserved for underline; dark hover/heading is `14.50:1` and secondary text is
  `10.21:1`.
- Reduced motion computes `0s`; forced colors restores system link colors and
  visible dividers. Native focus is visibly retained.
- Eight canonical captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL.
  Wide-container, localized extreme, dark, forced-colors, reduced-motion, and
  focus captures supplement two real desktop before captures.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native body-level Footer with labelled nav/list/link groups and optional ordinary content. | CSS/docs composition evidenced; placement/content remain consumer owned. |
| Shopify | Brand copy and merchant menu blocks mapped to canonical classes. | Semantic/static mapping validates; mandatory section-group architecture and services remain planned. |
| React / Angular | Record/slot composition rendering native landmarks, lists, and links. | Strategy documented; adapter not certified. |
| Figma | Brand/group/link/metadata anatomy and stacked/wide modes. | Studio validates; no landmark, CMS, or service ownership. |
| SwiftUI / Compose | Native bottom content/navigation when semantically equivalent. | Conceptual mapping only; DOM contentinfo does not map directly. |

## Performance And Risks

- Footer adds no neutral JS. Batch 16 Global CSS is the documented
  `4,028 B / 3.7 KiB` exception (`239 B` over); shared runtime remains the
  unchanged `10,321 B` exception; complete Web CSS is `61,781 B / 64 KiB`.
- Human review must approve secondary surface, serif headings, 48rem threshold,
  2:1 column ratio, section/grid spacing, touch rhythm, dividers, sub-footer
  alignment, link underline/focus, and long-content vertical rhythm.
- Required merchant group inventory, social/payment/newsletter/locale/legal/
  consent content, Shopify section groups, extra-group behavior, and target
  content governance remain explicit ADR 0086/Open Questions work.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, accessibility/landmark/
contrast/container/RTL/content/overflow/special-media probes, four-viewport
visual evidence plus a wide host, TypeScript, structural/parity/static-preview/
refinement audits, temporary docs build, deterministic performance, diff checks,
and `site/dist` verification are included in Batch 16.
