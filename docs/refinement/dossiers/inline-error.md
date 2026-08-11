# Component Dossier: Inline Error

Status: `human-review-ready`

Target reviewed: Neutral Web field-level validation message

Contract: `components/contracts/inline-error.contract.json`

## Recommendation

Keep Inline Error as a text-first message associated with one invalid control.
Require a message node, allow one decorative icon, and make announcement policy
explicit. Default to no live-region role: an error already present in the DOM is
discoverable through the invalid control's `aria-describedby`. Use `polite` for
routine dynamic feedback and `assertive` only for genuinely urgent insertion;
the target owns timing and live-region lifecycle.

## Purpose And Limits

- Explains what is wrong with one field and, when known, how to correct it.
- Supports an optional icon but never relies on icon or color alone.
- It is not an error summary, toast, alert dialog, validation engine, or form
  focus manager.
- The invalid control owns `aria-invalid="true"` and the reference to this
  message; Inline Error does not mutate the control.
- Success and warning feedback remain Field Wrapper messages, not variants here.

## Pre-Refinement Gallery Baseline

- Registry `H12`; contract `0.2.0`, `pilot`: two anatomy parts, one variant,
  one size, one state, three behaviors, three properties, and four public token
  references.
- The visible message has no dedicated anatomy selector; property content maps
  to the root, while both canonical surfaces render a nested span.
- `announcement` defaults to `polite`, so a static error is always a status
  region and may be announced redundantly during initial rendering/navigation.
- Exhibit and Studio use similar visual content but do not share exact markup.
- Long/localized text, empty message rejection, dark/forced colors, and narrow
  container resilience are not certified.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [WCAG 3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) | Automatically detected errors must identify the item and describe the error in text; placement is not prescribed. | Require useful visible text and do not rely on tone/icon alone. |
| [WAI user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | Inline feedback should be concise, associated with `aria-describedby`, and live regions are useful for dynamically changing feedback. | Keep field association mandatory and announcement conditional on timing. |
| [ARIA19](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA19) | Reliable live-region errors use a container present before content is injected; `aria-atomic` can ensure the complete message is read. | Announcement lifecycle belongs to the consuming target, not CSS or hidden base runtime. |
| [WCAG 4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages) | Programmatically identify status messages, but avoid unnecessary chatty live regions; the criterion does not require creating new messages. | Default static Inline Error to `none`; expose deliberate polite/assertive modes. |
| [React Aria useField](https://react-aria.adobe.com/useField) | Field errors are associated with their controls together with labels and descriptions. | Keep Inline Error composable under Field Wrapper and id association adapter-owned. |

## Recommended Ownership And API Direction

- Required anatomy: root and visible message node.
- Optional anatomy: decorative icon with `aria-hidden="true"` and
  `focusable="false"` where relevant.
- Public concepts: `message`, optional `icon`, and `announcement` with `none`,
  `polite`, or `assertive`; default `none`.
- The invalid control owns its state and `aria-describedby` reference. The
  consumer owns stable ids and decides when a live region exists or changes.
- Static messages need no runtime. Dynamic targets may update the existing
  message container according to their validation strategy.

## Alternatives And Non-Decisions

1. Always using `role="alert"` would interrupt routine entry and can duplicate
   information when focus moves to the invalid field.
2. Always using `role="status"` can still create redundant announcements and is
   not necessary for server-rendered/static errors.
3. Setting `aria-invalid` on the message is semantically incorrect; it belongs
   on the control.
4. Error summary linking/focus, validation timing, localization, and message
   generation remain Form/target responsibilities.

## Implemented Result

- Contract `0.3.0` now defines 3 anatomy parts, 1 variant, 1 size, 3 announcement
  states, 3 behaviors, 3 semantic properties, and 6 existing public token
  references. The required message node and `none` default are explicit.
- The renderer produces a text-first message and optional passive icon. `none`
  emits no live attributes; `polite` maps to status/polite/atomic; `assertive`
  maps to alert/assertive/atomic. No JavaScript mutates a control or schedules an
  announcement.
- Canonical CSS owns full-width containment, accepted message typography,
  resilient wrapping, icon alignment, and forced-colors fallback. Exhibit and
  Studio now share exact markup and fixture content.

## Browser, Content, And Performance Evidence

- Exhibit and Studio stage markup is byte-identical at 513 characters. Eight
  canonical after captures cover Mobile through XL; dark, Polite, and extreme
  RTL captures supplement two desktop before baselines.
- Default output has no role, `aria-live`, or `aria-atomic`. Polite resolves to
  `role=status`, `aria-live=polite`, `aria-atomic=true`; Assertive resolves to
  `role=alert`, `aria-live=assertive`, `aria-atomic=true`; returning to None
  removes all three. The icon is accessibility-hidden and the message is a
  dedicated required node.
- A `326px` long Arabic message wraps to three lines with `overflow-wrap:anywhere`
  and zero root/stage overflow. Error text measures `7.26:1` on the light error
  surface and `10.03:1` in dark mode; forced colors maps text/icon to system
  colors.
- Component runtime remains `0 B`. ADR 0096 records the shared CSS delta; no
  asset, timer, observer, focus work, or request is introduced.

## Cross-Target Translation

- Web/Shopify associate a stable message id from the invalid control and select
  announcement timing in the target validation lifecycle. Dedicated Liquid
  validation/schema/editor behavior remains target work.
- React/Angular compose generated ids and live semantics without delegating
  control validity to Inline Error. Figma maps visible message/icon/announcement
  state for review only. Native mobile targets use their platform error text and
  accessibility announcement APIs according to timing.

## Current Risks And Human Questions

1. Human review is needed for error surface, text/icon contrast, padding, icon
   alignment, and long-message wrapping.
2. No Inline Error-specific owner visual reference is registered.
3. Live-region support varies by browser/assistive-technology pair; target user
   testing remains necessary for dynamic validation flows.

## Readiness Decision

Ready for explicit human visual and semantic review. Message/announcement
semantics, shared rendering, content resilience, contrast, special media,
adapters, and performance evidence are complete. The contract remains `pilot`;
no `stable` promotion is implied.
