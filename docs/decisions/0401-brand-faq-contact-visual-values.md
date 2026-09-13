# ADR 0401: Brand Story, FAQ and Contact Visual Values

Status: Accepted

Date: 2026-09-13

Expose Brand Story's two existing graphic-signature bounds, FAQ's five measure/
inset/header-gap values and Contact Section's five measure/column/inset/focus
values. Keep current shared spacing, typography, default layout and dependencies.

Brand Story's signature slot already permits graphic media. A site-only checkbox
uses the shared Checkbox renderer to switch between the existing default text
and an explicitly illustrative SVG fixture. It is not a contract property, new
brand asset or prescribed signature. Reset returns to text. This allows its
existing image/SVG bounds to be exercised in Studio instead of exposing controls
that appear ineffective against a text-only fixture.

FAQ still composes Accordion, Contact composes its existing form controls, and
Brand Story composes Image with Text. Service endpoints, validation/submission
policy, records and signature assets remain target-owned. Contracts/Studio feed
Exhibit and generated Web/Shopify follow source. No target certification.
