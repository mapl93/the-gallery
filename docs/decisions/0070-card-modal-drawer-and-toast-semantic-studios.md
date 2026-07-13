# 0070. Card, Modal, Drawer, And Toast Semantic Studios

Status: Accepted

Date: 2026-07-12

## Context

Card, Modal, Drawer, and Toast had validated structural contracts and canonical
CSS, but their contracts did not yet expose reviewed semantic properties for
Studio. Their MDX pages also predated the five-section Exhibit structure.

## Decision

- Card exposes only its existing visual `variant`. Media, body content,
  metadata, semantic element choice, and actions remain consumer-owned
  composition.
- Modal exposes only `open`. Neutral web maps that property to the inverse
  `aria-hidden` value on the overlay. Focus trapping, restoration, dismissal,
  and content composition remain target behavior.
- Drawer exposes `placement` and `open`. Placement maps to the existing variant
  class; open composes `.is-open` on both overlay and drawer.
- Toast exposes title, required message, variant, optional icon, optional
  dismiss action and label, live-announcement priority, and visibility.
- Static markup does not receive live-region semantics by default. Studio uses
  a polite announcement as fixture content for its dynamically presented toast.
- Studio starts Modal, Drawer, and Toast visible so the component is the first
  artifact shown. Closing reveals a site-owned trigger without changing the
  component contract default.
- Studio renderers use canonical component CSS. Site-only fixture content,
  Lucide icons, and overlay containment are not promoted to target contracts.
- No new public component tokens are introduced. Studio exposes only existing
  contract-declared semantic tokens.

## Consequences

- Four additional components have validated semantic property coverage and
  interactive Studios.
- Card avoids an artificial content API while still exposing its real visual
  customization surface.
- Modal and Drawer remain explicit about the boundary between CSS state and
  target-owned accessible behavior.
- All four contracts remain `pilot` until owner review and the applicable
  neutral-web certification gates are complete.
