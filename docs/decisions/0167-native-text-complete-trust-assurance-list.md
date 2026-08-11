# ADR 0167: Native text-complete trust assurance list

- Status: Accepted
- Date: 2026-07-16
- Components: Trust Badges (`G5`)
- Certification status: Human-review-ready when its automated and visual evidence passes; contract remains `pilot` until explicit human approval

## Context

Trust Badges already rendered passive assurances as a wrapping `ul`/`li` row,
but the contract did not require native list anatomy, non-empty text, root
omission, target claim ownership, intrinsic responsive behavior, or a zero-
runtime boundary. The Studio fixture hardcoded an English accessible label not
present in the public contract, and disabling its required items exposed an
empty list. Anonymous icon and text children prevented stable cross-target part
mapping. Typography, gaps, padding, and icon geometry were mostly hardcoded.

The industry phrase “trust badge” does not establish a standardized widget.
HTML supplies the durable list semantics. WAI guidance supports hiding a visual
whose meaning is already fully communicated by adjacent text. Open UI and Radix
Badge research concern individual labels, counts, or status-like presentation,
not a collection of commercial assurances. Shopify's component inventory also
separates Badge, Icon, Payment Icon, Unordered List, and layout primitives.

Commercial wording creates a distinct ownership boundary. FTC advertising
guidance requires express and implied material claims to be truthful,
non-deceptive, and supported by evidence. A component can require auditable
visible wording, but its icon, color, placement, or API cannot certify a claim.

The registered Figma reference is the generic Button/Studio shell and provides
no owner-approved Trust Badges visual direction. Current screenshots are an
implementation baseline only. No aesthetic decision is inferred from them.

## Decision

1. Trust Badges is a passive native unordered list of one or more independent
   target-supplied commercial assurance statements.
2. Every valid item requires non-empty visible `.trust-badge__text` that
   communicates its complete meaning without color or visual support.
3. `.trust-badge__icon` is optional and always decorative. SVGs use
   `aria-hidden="true"`; target images use empty alt text.
4. Blank or icon-only records are omitted. The complete root is omitted when no
   valid visible statement remains.
5. The public semantic properties are `variant`, required `items`, and optional
   `accessibleLabel`. The label is localized and used only when surrounding
   visible context does not already identify the list.
6. Default uses the semantic Body Small profile. Compact uses the semantic
   Caption profile and reduced private gaps. Both wrap intrinsically from the
   root's available inline size without viewport queries or visual reordering.
7. The component owns no focus, keyboard commands, controls, widget roles, live
   region, motion, events, controlled state, analytics, network work, or neutral
   runtime.
8. Targets own claim truth, evidence, qualification, localization,
   jurisdiction, publication, updates, and any related policy destination.
9. Trust Badges does not compose canonical Badge. Badge is one compact status
   or metadata label; adding its live/status API and pill visual would distort
   an assurance list.
10. Trust Badges remains distinct from Shipping Info. Trust Badges is a compact
    row of one short string per item. Shipping Info is a section-scale list with
    a required label and optional supporting service/policy text and media.
11. Payment brands belong to Payment Icons. Issued records and verification
    destinations belong to Certificate or a target-owned composition.
12. Studio and Exhibit render the same canonical renderer and fixture. Fixture
    wording is explicitly marked “Example” and does not become a component
    default or Gallery guarantee.
13. Shopify exposes a section with variant, optional accessible list label, and
    repeatable statement blocks with optional decorative target images. Presets
    contain blank blocks rather than invented claims. Empty statements/root are
    omitted and no component JavaScript is shipped.

## API and composition boundary

Public API intentionally excludes count, columns, alignment, gaps, padding,
icon name, icon size, icon color, asset URL, guarantee type, verified state,
evidence, expiry, jurisdiction, policy URL, loading, error, line clamp,
breakpoint, event, and analytics. These are private composition, target content
governance, or responsibilities of another canonical component.

Web targets map the root to `ul.trust-badges[role=list]`, items to
`li.trust-badge`, the decorative visual to `.trust-badge__icon`, and visible
wording to `.trust-badge__text`. React and Angular consume current children or
records; Shopify consumes editor blocks; Figma and native targets translate the
same semantic decisions into their own content models. There is no controlled/
uncontrolled strategy because the component owns no changing state.

## Accessibility and responsive requirements

- Preserve native `ul`/`li` semantics and source order. Explicit `role=list` is
  a list-marker-removal safeguard, not a custom widget role.
- Do not expose duplicate icon names, interactive descendants, focus stops,
  status/live roles, or custom keyboard behavior.
- Long localized, Arabic RTL, unbroken, and effectively 200% text must wrap
  without clipping, overlap, horizontal overflow, or hidden qualification.
- Forced-colors presentation must retain readable statement text. The optional
  decorative visual may map to a system color or disappear without loss.
- Reduced motion causes no change because the component authors no motion.

## Token and performance decision

Existing semantic text, success/accent, Body Small, Caption, and element-gap
tokens are sufficient. Root/item gaps are private calculations. The `1.25rem`
decorative visual geometry remains a private compositional value; it does not
justify a new public token or size property.

The component must remain CSS/markup only: zero neutral JavaScript, handlers,
timers, observers, listeners, requests, or component-owned assets. Its refined
G5 CSS and the Marketing family must stay inside the permanent family budget;
the budget is not raised to accommodate this decision.

## Evidence considered

- HTML unordered-list and list-item semantics:
  <https://html.spec.whatwg.org/dev/grouping-content.html>
- WAI decorative image guidance:
  <https://www.w3.org/WAI/tutorials/images/decorative/>
- WAI ACT decorative-content exposure rule:
  <https://www.w3.org/WAI/standards-guidelines/act/rules/46ca7f/>
- FTC advertising principles and evidentiary obligations:
  <https://www.ftc.gov/business-guidance/advertising-marketing/advertising-marketing-basics>
  and
  <https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business>
- Open UI Badge research:
  <https://open-ui.org/components/badge.research/>
- Radix Themes Badge:
  <https://www.radix-ui.com/themes/docs/components/badge>
- Shopify checkout component inventory:
  <https://shopify.dev/docs/api/checkout-ui-extensions/latest/web-components>

No APG interaction pattern applies because the component is passive document
content rather than a widget.

## Consequences

- Consumers get a narrow, stable, cross-target semantic contract rather than an
  icon catalogue or unbounded claim model.
- Empty and icon-only output is structurally prevented in the first-party
  renderer and Shopify adapter.
- Default/Compact remain reviewable visual proposals, not owner-approved
  aesthetics. Success-green decorative icons, centered wrapping, type density,
  exact spacing, and sample content remain explicit human-review boundaries.
- Automated success can promote the component only to `human-review-ready` in
  the refinement matrix. The source contract remains `pilot` until the owner
  explicitly reviews and approves stability.
