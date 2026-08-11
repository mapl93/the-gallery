# Component Dossier: Drawer

Status: `human-review-ready`

Target under review: Neutral Web modal side-panel composition with physical
left/right placement

Contract: `components/contracts/drawer.contract.json`

## Recommendation

Treat v1 Drawer as the same modal-dialog behavior contract as Modal with a
side-panel presentation and scroll partition, not a separate accessibility
pattern. Preserve the accepted physical right/default and left variants rather
than inferring logical placement semantics. Make content/name/dismiss composition
explicit, consume canonical Button and Close Button, and demonstrate complete
target-owned focus/dismissal behavior in the shared docs renderer without
inventing the unresolved global overlay coordinator.

## Purpose And Limits

- Presents a supporting task or detail panel while preserving visual context,
  with underlying content unavailable for the modal v1 mode.
- Useful for navigation, filters, cart summaries, notes, or compact workflows
  when those composed components supply their own domain state.
- It is not a permanent application sidebar, non-modal inspector, resize pane,
  swipe-navigation system, commerce store, search provider, or nested overlay.
- Drawer owns panel anatomy, physical placement, internal scroll/body/footer
  layout, and motion presentation. The target owns modality, lifecycle, focus,
  inertness, scroll locking, and global stacking/mutual exclusion.

## Pre-Refinement Gallery Baseline

- Registry `B3`; contract `0.2.0`, `pilot`: 6 anatomy parts, 2 variants, 1 size,
  7 states, 5 behaviors, 2 properties, and 19 public token references.
- `placement` and `open` are public; title/content/footer/dismiss composition and
  programmatic naming are implicit. Overlay has no `aria-hidden` mapping.
- The close action duplicates canonical Close Button geometry, colors, focus,
  and transition in Layout CSS, while the footer visually composes Button but
  neither dependency is registered.
- Panel width is hardcoded as `min(400px, 85vw)`, uses physical `left/right`, and
  has no safe-area, forced-colors, reduced-motion, long-title, or action-wrapping
  treatment. `z-overlay` and `z-modal` split wrapper/panel stacking.
- Shared Exhibit/Studio rendering is visually open, but focus remains outside,
  Escape does not close, Tab is not contained, focus does not restore, and
  backdrop click is not demonstrated. The panel is an `aside` with dialog role.
- Two real desktop before captures preserve the current Exhibit/Studio baseline
  under `output/playwright/refinement-batch-13/before/`.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Side placement does not change dialog modality, naming, focus containment, Escape, visible dismissal, or restoration requirements. | Reuse Modal behavior rather than inventing Drawer semantics. |
| [HTML dialog element](https://html.spec.whatwg.org/multipage/interactive-elements.html?elementdef-dialog=) | A modal dialog can be styled as a sheet while the browser owns top-layer/inert behavior. | Native dialog is a Web target option, not a cross-target source requirement. |
| [Open UI Popup research](https://open-ui.org/components/popup.research/) | Persistent focused tasks belong to Dialog rather than light-dismiss transient popups. | Keep Drawer modal/persistent until deliberately dismissed. |
| [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) | Dialog parts and controlled/uncontrolled lifecycle support sheet-style compositions. | Share semantic content/dismiss boundaries with Modal; keep side geometry in presentation. |
| [Shopify Checkout Sheet](https://shopify.dev/docs/api/checkout-ui-extensions/latest/web-components/overlays/sheet) | Shopify applies Dialog semantics, heading/accessible label, scrollable content, fixed actions/dismiss control, one-at-a-time guidance, and bounded host geometry. | Keep header/body/footer partition, clear actions, one surface, and target-owned sizing/lifecycle. |

## Recommended Anatomy, States, And API

- Required: backdrop, dialog root, visible title, scrollable content, and named
  canonical dismiss action. Optional: header wrapper, footer/action region, and
  additional canonical controls.
- Preserve `default` as physical right and `left` as physical left because that
  is the accepted API. Do not silently reinterpret them as logical end/start in
  RTL; targets choose placement deliberately.
- Add required `title`, required `content`, required `dismissAction`, required
  `dismissLabel`, optional `footer`, plus existing `placement` and `open`.
  Geometry, swipe, safe-area values, and scroll position remain private/target.
- Register Button and Close Button dependencies. Keep `.drawer__close` only as a
  Drawer placement hook if needed; canonical `.close-btn` owns interaction style.
- States include closed/open, physical placement, focus-within, body overflow,
  long content, reduced motion, and target pending/disabled content states.

## Behavior And Accessibility Direction

- For v1, open Drawer is modal: outside content is inert, focus enters an
  appropriate descendant, Tab is contained, Escape requests close, a visible
  dismiss action exists, and focus returns to the invoker.
- Title supplies the accessible name; description association follows Modal's
  short-versus-structured-content guidance.
- Header/footer remain visible while only body scrolls. Focused content must not
  be obscured by fixed actions. Overscroll should not leak into the page target.
- Backdrop dismissal is target policy. The docs target may demonstrate it, but
  the contract does not freeze a boolean or allow a required response to vanish.
- Mobile Menu and Cart Drawer compose this behavior; they do not duplicate focus,
  open state, or overlay lifecycle in their domain contracts.

## Responsive, Tokens, And Performance

- Keep a readable maximum width on wide screens and safe full available width on
  narrow containers; use dynamic block size, logical internal padding, long text
  containment, and no source-order changes. Physical placement remains explicit.
- Drawer owns surface, divider, title type/color, shadow, overlay, transition,
  spacing, and z-layer tokens. Canonical Close Button owns its focus, hover,
  radius, and control colors; removing duplicate close styles funds the bounded
  and special-media rules within the Layout family budget.
- Batch 13 starts with Layout CSS at `4,390 B` gzip (`525 B` below `4.8 KiB`),
  shared runtime at `10,335 B`, and Web component CSS at `60,456 B`.

## Cross-Target Direction

- Web: native dialog styled as a side sheet is preferred when target top-layer
  architecture permits; otherwise prove equivalent modal behavior.
- Shopify: host Sheet/Modal where available; theme Drawer composition and target
  JS own navigation/cart/filter state and overlay lifecycle.
- React/Angular: adapter open/defaultOpen and portal mechanics wrap the same
  title/content/footer/dismiss/placement semantics.
- Figma: physical placement, open/closed, overflow regions, content/actions, and
  tokens only; no focus or state ownership.
- SwiftUI/Compose: map to native sheet/drawer surfaces while preserving modal
  task, physical placement intent where supported, and dismiss path.

## Alternatives And Non-Decisions

1. Renaming placement to start/end could improve logical composition but would
   change an accepted physical API and visual intent; it requires product review.
2. Non-modal/persistent drawers need different focus, inertness, and navigation
   behavior and are not smuggled into v1 through a `modal` toggle.
3. Swipe-to-close, snap points, draggable handles, resizable width, and responsive
   conversion between bottom/side sheets remain target/product decisions.
4. A shared global overlay runtime is still open. The docs renderer demonstrates
   behavior without deciding that repo-wide architecture.

## Certification Evidence

- Exhibit and Studio share byte-identical canonical inner markup (`963`
  characters), one fixture, locked required slots, and Button/Close composition.
- Browser evidence proves Close initial focus, Tab/Shift+Tab containment,
  Escape/backdrop restoration, optional footer omission, physical left/right,
  and fixed header/footer around a localized scrolling body.
- Eight canonical images cover both views at Mobile/Tablet/Desktop/XL; physical
  left, long localized narrow content, RTL, dark, forced colors/reduced motion,
  and minimal composition supplement two real before captures.
- Zero sampled overflow, `17.93:1`/`17.18:1` light/dark title/focus contrast,
  `0 B` neutral runtime, adapters, and CSS measurements are recorded in
  `docs/reports/drawer-web-refinement-audit.md`.

## Current Risks And Human Questions

1. Human review must approve physical placement, width, backdrop, shadow, header/
   body/footer spacing, close target, action hierarchy, and narrow full-width edge.
2. No Drawer-specific owner visual reference is registered.
3. Target assistive-technology testing remains necessary for native versus
   custom dialog mappings and nested application focus contexts.
4. Non-modal mode, logical placement, bottom sheets, and global overlay runtime
   remain deliberately unresolved.

## Readiness Decision

Human-review-ready. The contract remains `pilot`; explicit visual, semantic,
and production-target approval is still required before any `stable` promotion.
