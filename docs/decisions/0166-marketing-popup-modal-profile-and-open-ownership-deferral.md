# 0166. Marketing Popup Modal Profile And Open Ownership Deferral

Status: Accepted

Date: 2026-07-16

## Context

G4 Popup / Overlay entered refinement as a Marketing dialog with required
overlay/root/body/title, optional media and dismissal, and Default, Split and
Slide presentations. Its CSS independently implements a fixed backdrop,
surface, viewport bounds, visibility and motion even though B2 Modal already
owns the canonical dialog anatomy and target lifecycle boundary.

The current G4 contract exposes no `open` property. Instead, the overlay becomes
visible through `.popup-overlay[data-open]` while the Slide transform requires
`.popup--slide[data-open]`. The shared docs renderer always claims
`role="dialog"` and `aria-modal="true"` but only mounts and unmounts on click;
it does not demonstrate focus entry/containment/restoration, Escape or outside
inertness. It also allows the visible dismiss action to be removed.

ADR 0081 and `docs/OPEN-QUESTIONS.md` deliberately leave Popup email ownership
and the canonical `data-open` node unresolved. The v1 refinement principles now
also require composed components to consume canonical components rather than
duplicate markup or behavior. Selecting an independent lifecycle, folding G4
into Modal or treating Slide as a bottom Sheet/Drawer is therefore an owner
architecture decision, not a CSS cleanup.

## Decision

- G4 remains `pilot` at contract version `0.2.0` until the owner selects its
  identity, modality, open-state owner and Slide boundary.
- No contract, registry, renderer, canonical CSS, Studio metadata, Shopify
  adapter or generated target output changes in this decision.
- The recommended direction is to retain G4 as a discoverable Marketing Popup
  profile composed from canonical Modal. Modal would own overlay/root/header/
  body, open lifecycle, modality, focus, inertness, Escape, restoration, scroll
  partition and canonical Close Button. G4 would own optional media, concise
  campaign content, canonical actions and approved Default/Split arrangement.
- Email capture does not become a Popup property. A target may compose canonical
  Form, Input and Button inside accepted generic content; provider, consent,
  value, validation, request and response lifecycle remain target-owned.
- The recommended Slide disposition is deferment until the owner selects a
  Modal placement or a canonical Sheet/Drawer profile. ADR 0098 currently
  excludes bottom-sheet behavior from Drawer, and Shopify exposes Sheet as a
  distinct overlay.
- If the owner instead retains an independent generic Popup, the decision must
  define a complete modal/non-modal model, one open owner, closed semantic
  availability, focus/dismissal behavior and a strict consumer selection rule
  relative to Modal, Popover, Drawer, Toast and future Sheet.
- Deprecating G4 and publishing only a Modal recipe remains a supported third
  option, but requires an explicit pre-v1 registry/versioning migration.
- Existing Mobile/Desktop Exhibit and Studio captures remain before-only
  evidence. No new evidence server or browser is needed for this decision-only
  batch.
- No `stable` promotion or visual approval is implied.

## External Evidence

- The HTML Standard's `dialog.showModal()` establishes top-layer modality,
  focus processing and a close lifecycle rather than a visual show/hide toggle.
- WAI-ARIA APG requires an actual modal dialog to make outside content inert,
  move focus inside, contain Tab/Shift+Tab, close on Escape and restore focus
  logically; a visible close action is strongly recommended.
- Open UI treats Popup as a broad transient family whose semantics, focus,
  dismissal and modality vary, while its Dialog research shows mature-system
  convergence around Modal/Dialog identity.
- Radix composes Root, Trigger, Portal, Overlay, Content, Title, Description and
  Close under one Dialog lifecycle with controlled/uncontrolled adapter state.
- Shopify distinguishes Modal, Popover and Sheet. Its Modal owns heading, body,
  actions and host lifecycle; full focus is inappropriate for contextual
  Popover content.

These sources establish that G4's current modal fixture should not independently
approximate modality through CSS. They do not choose The Gallery's public
Marketing identity or Slide architecture.

## Performance

G4's current canonical CSS slice is `2,696 B` raw / `951 B` gzip. Marketing is
`4,146 B` gzip against its permanent `4,198 B` ceiling, leaving `52 B`.
Generated Neutral Web component CSS is `67,751 B`, retaining a program-level
`2,215 B` gap, and shared runtime is `10,501 B`, retaining its `2,309 B` gap.

G4 adds `0 B` neutral runtime today. A Modal-profile migration should remove
duplicated overlay/surface/close CSS before adding profile rules and preserve a
`0 B` neutral component-runtime delta. This decision changes no measured file.

## Open Owner Choice

Choose one identity:

1. retain G4 as a canonical Modal profile — recommended;
2. retain an explicitly independent generic Popup with a complete distinct
   lifecycle and consumer selection rule; or
3. deprecate G4 and publish a Modal composition recipe.

Then select:

- modal-only semantics or a complete modal/non-modal API;
- Slide deferment/removal, Modal placement or Sheet/Drawer ownership;
- required generic content/actions versus the current title/text-only API; and
- one open-state owner if Modal inheritance is rejected.

Final geometry, media behavior, typography, surface, action hierarchy, copy and
G4-specific Figma evidence remain separate human visual decisions.

## Target Boundary

- Neutral Web should map accepted G4 content through canonical Modal, preferring
  native `dialog.showModal()` where target architecture permits.
- Shopify has no G4 Liquid/schema/data/runtime adapter today. A target section,
  block or app-owned campaign surface requires explicit trigger, frequency,
  editor, consent and focus lifecycle before target-ready status.
- React and Angular may expose controlled/uncontrolled Modal conveniences, but
  G4 must not store a second open source.
- Figma maps only approved content/profile parts after component-specific visual
  evidence; campaign timing and services are not variants.
- SwiftUI and Compose use native modal/sheet facilities according to the chosen
  identity rather than copying DOM or CSS mechanics.

## Consequences

- The open architecture boundary remains visible instead of being hidden by a
  second focus trap, compatibility selector or duplicated adapter.
- G4 cannot be reported ready for human stability review yet.
- The dossier and audit provide a concrete migration/correction register for
  immediate implementation once the owner chooses.
- Work can continue to later components without repeating this research or
  blocking the entire refinement program.

## Follow-up

ADR 0224 supersedes this deferral. After reviewing the anchored Popover
reference, the owner selected deprecation of G4 into canonical B9 Popover rather
than the Modal-profile recommendation recorded here. Modal remains a valid
marketing recipe only when page-blocking semantics are actually required.
