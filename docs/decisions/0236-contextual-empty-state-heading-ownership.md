# ADR 0236: Contextual Empty State Heading Ownership

- Status: Accepted
- Date: 2026-07-20
- Decision owner: The Gallery owner
- Applies to: A13 Empty State and every canonical Empty State composition
- Supersedes the heading deferral in: ADR 0112

## Context

Empty State has required non-empty title content and a visual title class whose
typography is independent of native heading defaults. The same component is
used as a page-level absence, inside a section, in a cart dialog, and within
other composed surfaces. One fixed rank cannot represent all those document
outlines.

ADR 0112 deliberately deferred whether heading rank should remain contextual,
become a cross-target `headingLevel` property, or move outside the component.
The owner selected `A13-A`: the host supplies the contextually correct native
heading while Empty State retains required heading content.

## Decision

1. `title` remains required non-empty Empty State content and must be rendered
   as a native `h1` through `h6` appropriate to the owning page, panel, dialog,
   or section.
2. Heading rank is host composition context. It is not a target-agnostic
   component property, visual variant, token, or Studio control.
3. `.empty-state__title` remains element-agnostic and fully owns presentation so
   changing the native rank does not change the visual candidate.
4. Renderers and target adapters that generate markup require the host to
   supply a constrained heading element. Missing or unsupported elements fail
   closed rather than demoting the title to ordinary text or inventing a rank.
5. The docs renderer makes the heading element an explicit required
   composition argument. The canonical component page uses H2 beneath its H1;
   nested consumers choose their own contextual level.
6. The Shopify snippet accepts required adapter-only `heading_tag`, validates
   `h1` through `h6`, and renders no root for invalid required composition.
   Main cart and 404 use H1; cart drawer uses H3 beneath its H2 dialog title.
7. The heading element does not enter the contract property list or Studio
   metadata. Future React, Angular, Figma, SwiftUI, and Compose targets preserve
   native contextual heading/header semantics through their host composition.
8. The optional recovery action remains one canonical Button-or-Link slot.
   Empty State stays passive and owns no lifecycle, announcement, focus, or
   action behavior.

## Consequences

- Full-page, section, panel, and dialog consumers can preserve a truthful
  document outline without forking Empty State CSS or visual anatomy.
- Consumers cannot use Studio to choose heading rank as appearance.
- The former fixed-H3 Shopify gap is removed from the three repository-owned
  placements.
- Existing responsive, accessibility, action, token, and zero-runtime evidence
  remains valid because the visual class is unchanged.
- Empty State is prepared for human visual/stability review but remains `pilot`;
  this decision is not visual approval or permission to promote it to `stable`.
