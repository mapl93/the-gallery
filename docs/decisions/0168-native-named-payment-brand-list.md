# ADR 0168: Native named payment-brand list

- Status: Accepted
- Date: 2026-07-16
- Components: Payment Icons (`G6`)
- Certification status: Human-review-ready when its automated and visual evidence passes; contract remains `pilot` until explicit human approval

## Context

Payment Icons rendered a passive `div role=list` whose anonymous list items
contained generic site-drawn tiles labelled as Visa, Mastercard and American
Express. The contract exposed a boolean `small` workaround but no item/mark
parts, native list, empty-root rule or list-label property. Disabling its
required icon slot left an empty named list.

Canonical CSS reduced every image/SVG to half opacity, forced grayscale, and
restored its treatment on pointer hover. This weakened default legibility,
overrode target brand artwork and made passive information look actionable.
The transition existed only to support that invalid state.

HTML supplies stable unordered-list semantics. WAI image guidance requires a
brief text alternative for informative images and equivalent wording for logos
that convey text. APG and Open UI define no Payment Icons widget. Radix's
Accessible Icon likewise requires a label for a meaningful icon. Shopify
separates an individual named Payment Icon from layout, exposes current accepted
types through `shop.enabled_payment_types`, and generates official SVG output
with `payment_type_svg_tag`.

The registered Figma reference is the generic Button/Studio shell and supplies
no G6-specific evidence. Existing screenshots remain implementation baseline,
not owner approval of brands, density, spacing or placement.

## Decision

1. Payment Icons is a passive native unordered list of one or more recognized,
   target-supplied payment-method marks.
2. Web maps the root to `ul.payment-icons[role=list]`, each item to
   `li.payment-icons__item`, and each mark to `.payment-icons__mark`.
3. Every valid mark is informative and requires a brief recognized method name:
   non-empty `alt` for raster images, named image semantics for inline SVG, or
   the target-native accessibility equivalent.
4. Unnamed or invalid marks/items are omitted. The complete root is omitted
   when no valid item remains.
5. The public semantic properties are required `icons`, `size` (`default` or
   `sm`), and optional localized `accessibleLabel`. The label is used only when
   surrounding visible context does not already identify the methods.
6. The previous `small` boolean is replaced before v1 by the shared semantic
   size-enum pattern. Exact `1.5rem` and `1.125rem` mark geometry is private.
7. Canonical CSS does not grayscale, recolor, reduce opacity, reveal on hover,
   or animate target brand marks.
8. The collection wraps intrinsically from its content box and uses logical
   sizing. It has no viewport query or Studio-only layout repair.
9. The base owns no brand enum, logo asset, CDN, provider, region, currency,
   eligibility, ordering, licensing, brand rules, availability claim,
   interaction, focus, keyboard behavior, events, controlled state, live
   region, analytics, network work or runtime.
10. Studio and Exhibit use one canonical renderer and fixture. The site fixture
    uses clearly named `Example` placeholders rather than fake production brand
    art; those placeholders are not component defaults or target assets.
11. Shopify provides a dedicated zero-JavaScript snippet. It consumes supplied
    current types or `shop.enabled_payment_types`, emits official
    `payment_type_svg_tag` marks, and supplies a localized list label.
12. Placement in a footer, product, cart or checkout surface remains a target
    composition decision and is not added by this ADR.

## API and target boundary

The root API intentionally excludes count, maximum count, columns, alignment,
gap, wrapping switch, grayscale, opacity, hover, transition, brand color, SVG
path, asset URL, provider, region, currency, selected/active state, saved-card
data, loading, error, events and analytics. These are private layout details,
target commerce/brand facts, or responsibilities of a different component.

React and Angular receive current target items/components. Shopify derives
contextual accepted types. Webflow/CMS targets render current native list data.
Figma and native targets use their approved asset/accessibility models. The
target-agnostic source remains independent of all those runtimes.

## Accessibility and responsive requirements

- Preserve native list/list-item semantics and source order. `role=list` only
  safeguards list exposure after marker removal; it is not a widget role.
- Expose one accessible payment-method name per informative mark, with no
  unnamed item or hover-only identification.
- Add no focus stops, link/button semantics, keyboard commands, live regions,
  motion, or controlled/uncontrolled state.
- Permit one through many mixed-aspect-ratio marks to wrap without clipping,
  overlap, visual reordering or horizontal overflow.
- Preserve accessible names in forced colors. Brand artwork may preserve
  essential target treatment or adapt through a target-native mechanism.
- Reduced motion causes no change because G6 authors no motion.

## Token and performance decision

The existing `--space-layout-element-gap` token supplies collection spacing
through a private quarter-step calculation. Mark dimensions remain private
outcomes of the semantic size property. No new public token or token layer is
created.

G6 remains markup/CSS only and adds zero neutral JavaScript, listeners, timers,
observers, requests or component-owned assets. Its refined CSS and the Marketing
family must remain inside the permanent family budget; the ceiling is not
raised for this decision.

## Evidence considered

- HTML unordered-list and list-item semantics:
  <https://html.spec.whatwg.org/dev/grouping-content.html>
- WAI image concepts and text-alternative guidance:
  <https://www.w3.org/WAI/tutorials/images/>
- WAI-ARIA APG pattern inventory:
  <https://www.w3.org/WAI/ARIA/apg/patterns/>
- Open UI component matrix:
  <https://open-ui.org/research/component-matrix/>
- Radix Accessible Icon:
  <https://www.radix-ui.com/primitives/docs/utilities/accessible-icon>
- Shopify Checkout Payment Icon:
  <https://shopify.dev/docs/api/checkout-ui-extensions/2025-10/web-components/media-and-visuals/payment-icon>
- Shopify `shop.enabled_payment_types`:
  <https://shopify.dev/docs/api/liquid/objects/shop#shop-enabled_payment_types>
- Shopify `payment_type_svg_tag`:
  <https://shopify.dev/docs/api/liquid/filters/payment_type_svg_tag>

## Consequences

- Consumers get a narrow cross-target contract instead of a stale universal
  brand catalogue.
- Native semantics, accessible names and strict omission are now testable across
  Exhibit, Studio and Shopify.
- Removing brand suppression improves default legibility and avoids false
  interactivity while reducing CSS/motion work.
- Default/Small geometry, gap, alignment, wrapping, maximum recommended count,
  production asset sources, per-brand rules, fixture reference and placement
  remain explicit human/product boundaries.
- Automated success can promote G6 only to `human-review-ready` in the matrix.
  The source contract remains `pilot` until explicit owner review.
