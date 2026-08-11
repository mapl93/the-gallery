# 0181. Sticky ATC External Product Form Submitter

Status: Accepted

Date: 2026-07-17

Partially superseded by ADR 0256 for target-controlled eligibility, one target
product coordinator, fixed-surface safety, and human-review readiness.

## Context

Sticky Add-to-Cart Bar declares Button and Price dependencies, but its canonical
renderer duplicates Price as raw text and uses a local `type="button"` that
changes to an inferred “Added” state on click. It has no relationship to the
main Product Form, selected merchandise, quantity, selling plan, availability,
constraint validation, pending state, target purchase result, or feedback.

The neutral CSS hides K9 only through translation, so consumer descendants may
remain focusable or exposed to assistive technology. Its internal layout uses
page-viewport queries and hardcoded geometry, while fixed placement can obscure
focused content or collide with other viewport-edge surfaces.

ADR 0117 establishes one native Product Form and one target product coordinator
as the purchase boundary. Native HTML permits a submit button outside a form to
associate with that form by stable id. WCAG requires author-created sticky
content not to completely obscure focused controls and recognizes scroll
padding or unfixing as relevant techniques.

## Decision

- K9 is a passive viewport-edge composition of canonical Price, Button, and the
  existing Product Form boundary. Add Product Form as a direct registry and
  contract dependency.
- On Web, the canonical K9 Button is `type="submit"` and uses a required stable
  `productFormId` as its native `form` owner. It preserves constraint validation,
  activated-submitter semantics, and FormData without duplicating a form or its
  controls.
- Stable properties are optional semantic `visible`, optional `image` and
  `imageAlt`, required non-empty `title`, optional canonical `price`, required
  non-empty `actionLabel`, required `productFormId`, optional
  `actionDisabled`, and optional `pending`.
- Price is a canonical slot, not a raw money string. The target supplies
  formatted Price content and one product coordinator synchronizes it with the
  main form's selected merchandise, quantity, selling plan, availability,
  media, URL, pending/result state, cart updates, feedback, and status.
- K9 owns no local added/success state, cart request, live region, feedback,
  retry, analytics, or mirrored selection. Pending maps to canonical Button busy
  plus disabled semantics and preserves the action label.
- The neutral root adds no landmark or widget role. When hidden on Web, the
  target applies `inert` and `aria-hidden="true"` while the CSS state preserves
  optional exit motion. The target owns transition completion or unmounting.
- Internal composition responds to a named component container. Geometry,
  threshold, image treatment, surface chrome, wrapping, and action width remain
  private pending human visual review. K9 exposes no independent visual token.
- The target owns the show/hide trigger, hysteresis, scroll padding, safe-area
  offsets, stacking, virtual-keyboard behavior, and collision management with
  Cookie Consent, Bottom Nav, Cart Drawer, chat, and other fixed surfaces.
- Neutral runtime remains zero. Targets may implement observation, product
  coordination, purchase requests, and result lifecycle without adding React,
  Shopify, or commerce state to canonical source.
- The docs target extracts one shared K9 artwork for Exhibit and Studio and
  demonstrates a real external Product Form submitter. Fixture form data and
  result feedback remain docs-target evidence, not K9 defaults or public API.
- Shopify may provide a product-context Liquid snippet associated with the
  existing product form, but it remains `planned` until visibility,
  option/quantity coordination, purchase lifecycle, safe-area/collision policy,
  invocation, and editor behavior are proven.
- K9 remains `pilot`. ADR 0256 later accepted the target-controlled eligibility
  and fixed-surface boundary, allowing the implementation candidate to enter
  human review without resolving final visual choices or promoting it to
  `stable`.

## Consequences

- The sticky action and the main Product Form share one native submission and
  data path instead of maintaining two purchase implementations.
- Canonical Price and Button retain their markup, formatting, focus, busy,
  disabled, and visual contracts inside K9.
- Hidden K9 content cannot remain accidentally interactive or accessibility
  visible in the reviewed Web mapping.
- Every target must prove fixed-content overlap and focus visibility; CSS-only
  presence or static Liquid cannot be called target-ready.
- ADR 0256 resolves visibility eligibility, coordinator ownership, and the safe
  fixed-surface obligation. Exact target observation mechanics, target purchase
  implementation, and final narrow/visual treatment remain target proof or
  human review rather than neutral API decisions.
