# Component Dossier: Modal

Status: `human-review-ready`

Target under review: Neutral Web modal dialog surface with target-owned overlay
behavior

Contract: `components/contracts/modal.contract.json`

## Recommendation

Keep Modal as a target-agnostic dialog contract whose consuming target owns
focus entry/containment/restoration, inert background, Escape/outside dismissal,
scroll locking, and lifecycle, as already accepted by ADR 0070. Strengthen the
neutral contract around required named content and canonical Button/Close Button
composition. The docs target should demonstrate the full behavior in one shared
Exhibit/Studio renderer. A production Web adapter may map the contract to native
`<dialog>.showModal()` when its portal/top-layer constraints allow, but this
refinement must not silently make that target choice the canonical source model.

## Purpose And Limits

- Moves the user into one focused, temporary task or decision while the
  underlying context is unavailable.
- Appropriate for concise confirmations, short forms, important details, and
  reversible focused workflows. Alert Dialog remains the stronger semantic
  pattern when immediate attention and a response are mandatory.
- It is not a generic card, tooltip, navigation replacement, multi-step flow,
  route, request state machine, or global overlay coordinator.
- Modal owns dialog anatomy and presentation. Canonical Button/Close Button own
  actions. The target owns open state, trigger relationships, focus, inertness,
  scroll locking, stacking/mutual exclusion, and dismissal policy.

## Pre-Refinement Gallery Baseline

- Registry `B2`; contract `0.3.0`, `pilot`: 6 anatomy parts, 1 variant, 1 size,
  3 states, 4 behaviors, 1 property, and 18 public token references.
- Only `open` is public. The title is optional in anatomy despite the contract
  requiring a programmatic name; required content, dismiss/action composition,
  accessible label/description, and canonical dependencies are implicit.
- CSS uses a fixed wrapper/backdrop and centered panel with hardcoded `560px`,
  `85vh`, `16px` entrance distance, and `8px` footer gap. Footer actions do not
  wrap, viewport height uses `vh`, and no forced-colors/reduced-motion treatment
  exists in this component family.
- Studio/Exhibit start visually open and share the same renderer, but focus
  remains on `body`, Escape does not close, Tab is not contained, background is
  not inert, focus is not restored, and backdrop dismissal is not demonstrated.
- The visible fixture correctly composes canonical Button and Close Button, but
  the registry/contract declare no dependencies. Closed state unmounts the
  dialog and reveals a site trigger.
- Two real desktop before captures preserve the current Exhibit/Studio baseline
  under `output/playwright/refinement-batch-13/before/`.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML dialog element](https://html.spec.whatwg.org/multipage/interactive-elements.html?elementdef-dialog=) | `showModal()` establishes modal top-layer/inert/focus behavior; close/requestClose have defined events and return values. | Prefer native dialog in Web targets where compatible, without making DOM mechanics cross-target API. |
| [HTML invoker commands](https://html.spec.whatwg.org/multipage/form-elements.html) | Buttons can target dialogs with show-modal, request-close, and close commands in supporting browsers. | Treat invocation/dismissal as target mapping and progressive enhancement, not required component markup. |
| [WAI-ARIA APG Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Modal content is inert outside, Tab is contained, Escape closes, focus enters appropriately and returns logically, and a visible close action is strongly recommended. | Make all lifecycle requirements testable and keep initial focus content-aware. |
| [Open UI Dialog research](https://open-ui.org/components/dialog.research/) | Mature systems converge on Dialog/Modal naming, labels, variants, and width, while implementation differs. | Preserve semantic anatomy and avoid framework-specific state props. |
| [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) | Mature composition separates Root, Trigger, Portal, Overlay, Content, Title, Description, Close, controlled/uncontrolled state, and dismiss/focus callbacks. | Expose stable content/name/dismiss composition but leave portal and callback mechanics to targets. |
| [Shopify Checkout Modal](https://shopify.dev/docs/api/checkout-ui-extensions/latest/web-components/overlays/modal) | Shopify supplies heading/accessibility label, sizes, body, primary/secondary actions, host lifecycle, and discourages nesting/overuse. | Compose canonical actions, require a clear name, and keep host lifecycle target-owned. |

## Recommended Anatomy, States, And API

- Required: backdrop/overlay presentation, dialog root, visible title, content,
  and at least one named dismiss action. Optional: description association,
  header wrapper, footer/actions, and additional canonical controls.
- The current centered/default variant and one responsive size remain sufficient.
  Width, chrome/body padding, max block size, and scroll partition are private
  composition, not public size props in this batch.
- Add stable semantic properties for required `title`, required `content`,
  required `dismissAction`, required `dismissLabel`, optional `descriptionId`,
  optional `actions`, and existing `open`. Do not expose portal container,
  z-index, focus selector, transition distance, or arbitrary CSS geometry.
- Open/closed, opening/closing, focus-within, long-scroll, and reduced-motion are
  implementation states. Initial focus remains content-aware rather than a
  configurable string selector.
- Register canonical Button and Close Button dependencies. Consumers may use a
  footer cancel instead of the header X only if an equivalent visible dismiss
  path remains guaranteed.

## Behavior And Accessibility Direction

- Opening moves focus to an appropriate descendant: static title/content for
  long structured reading, first field for simple entry, least destructive
  action for irreversible confirmation, or primary action for simple progress.
- Tab/Shift+Tab remain inside while modal. Escape requests close. Closing returns
  focus to the invoker unless workflow continuity requires another logical node.
- A visible named dismiss action is always present. Backdrop/light-dismiss policy
  remains target-owned; the docs fixture may demonstrate it without freezing a
  universal public boolean.
- `aria-modal=true` is valid only when outside interaction is actually blocked.
  Use `aria-labelledby` for the visible title; use a description only when short
  enough to be announced as one string.
- Do not stack/nest Modal by default. Global mutual exclusion, body scroll lock,
  route changes, submit state, and async errors remain target services.

## Responsive, Tokens, And Performance

- Bound inline/block size against the owning viewport or preview container, use
  dynamic viewport units where appropriate, let body content scroll, wrap/footer
  actions safely, preserve source order, and handle long localized titles/body.
- Reuse existing surface, border, type, radius, shadow, overlay-opacity, spacing,
  transition, easing, and z-layer tokens. Keep width, distance, and chrome
  derivations private. Add no component-scoped public token.
- Batch 13 starts with Layout CSS at `4,390 B` gzip against the `4.8 KiB` ceiling,
  shared runtime at `10,335 B`, and Web component CSS at `60,456 B`. Target-owned
  docs behavior should not add neutral runtime; CSS changes share only `525 B`
  family headroom.

## Cross-Target Direction

- Web: prefer native `<dialog>` when target architecture permits top-layer use;
  a custom role-dialog implementation must prove equivalent modality/focus.
- Shopify: use the host Modal where available; theme Liquid composes the same
  content/actions while theme behavior owns focus and scroll lock.
- React/Angular: controlled/uncontrolled open state is adapter API, not neutral
  source; portal and lifecycle callbacks remain adapter facilities.
- Figma: map open/closed, title/body/actions, overflow and semantic tokens only.
- SwiftUI/Compose: map to native modal/sheet presentation while preserving name,
  dismiss path, focused task, and content boundaries.

## Alternatives And Non-Decisions

1. Mandating native `<dialog>` repo-wide would amend the accepted target-owned
   adapter boundary and can escape bounded documentation stages; it is a Web
   mapping recommendation, not a new canonical source requirement here.
2. A home-grown global focus-trap/portal/scroll-lock service would decide the
   open global overlay-runtime question. This batch demonstrates behavior in the
   docs target but does not introduce that shared architecture.
3. Non-modal dialogs, persistent inspectors, nested dialogs, size enums, and
   full-screen/mobile sheet switching need separate product review.
4. Backdrop dismissal is not universally appropriate for destructive or
   irreversible work, so it remains lifecycle policy instead of a default API.

## Certification Evidence

- Exhibit and Studio share byte-identical canonical inner markup (`1,058`
  characters), required slots, one fixture, and canonical Button/Close Button.
- Browser evidence proves Cancel initial focus, Tab/Shift+Tab containment,
  Escape/backdrop dismissal, reopen-safe restoration, label/description omission,
  optional actions, and required-slot locking in the bounded docs target.
- Eight canonical images cover both views at Mobile/Tablet/Desktop/XL; long
  localized body scroll, RTL, dark, forced colors/reduced motion, and minimal
  optional composition supplement two real before captures.
- Zero sampled horizontal overflow, `17.93:1`/`17.18:1` light/dark title and
  focus contrast, `0 B` neutral runtime, generated adapters, and deterministic
  CSS measurements are recorded in `docs/reports/modal-web-refinement-audit.md`.

## Current Risks And Human Questions

1. Human review must approve backdrop opacity, width, radius, shadow, chrome/body
   spacing, title scale, close target, action hierarchy, and narrow layout.
2. No component-specific owner visual reference is registered; the shared Studio
   reference is generic.
3. Native `<dialog>` versus custom/portal implementation remains target-owned;
   production adapters must certify the chosen path with assistive technology.
4. The global runtime that coordinates multiple overlays remains an explicit
   open architecture question and is not resolved by this component refinement.

## Readiness Decision

Human-review-ready. The contract remains `pilot`; explicit visual, semantic,
and production-target approval is still required before any `stable` promotion.
