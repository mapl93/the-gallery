# Owner Decision Responses

Status: `owner-decisions-recorded`

Started: 2026-07-19

Completed: 2026-07-20

Coverage: 67 component decisions represented by 66 packet response records;
combined records resolve identity or shared-boundary questions together. One
additional live global certification rule was accepted during component review.

This ledger records the owner's component-refinement decisions one point at a
time. The four decision packets remain the immutable proposal and evidence
source; this file records the selected direction, the owner's wording, and any
conditions that later ADR and implementation work must preserve.

Approval here authorizes an implementation candidate only. It is not final
visual approval and does not promote a component to `stable`.

## Responses

### 01. H7 — Pin Input / OTP

- Status: `accepted`
- Selected direction: `H7-B`
- Owner note: Each cell must be a real, independently clickable and focusable
  native input, matching the segmented Pin Input experience the owner prefers.
- Accepted boundary: retain multiple character owners; provide bounded typing,
  deletion, logical-arrow, paste and progressive autofill distribution; expose
  validation for the complete group; define a segment naming/submission
  convention; and do not add a mirrored hidden full-code owner.
- Approval scope: implementation candidate only; not final visual approval or
  promotion to `stable`.

### 02. G1 + S1 — Hero Identity

- Status: `accepted`
- Selected identity: `G1-A`
- Owner note: Keep one public Hero and merge the useful functionality of the
  existing `hero` and `hero-section` implementations. Include complete parallax
  and slideshow capabilities in the unified v1 Hero rather than deferring them.
- Accepted direction: retain the consumer-facing `hero` identity and current
  Shopify adapter, while adopting `hero-section`'s refined anatomy, semantic
  composition and container-responsive layout profiles.
- Required capability expansion: replace the current empty parallax hook and
  presentation-only slideshow lane with certifiable behavior, reduced-motion
  handling and cross-target mappings.
- Slideshow autoplay: optional and disabled by default. When enabled, expose a
  visible pause/play control, pause rotation while focus is within the slideshow
  and while it is hovered, and suppress automatic rotation when reduced motion
  is requested. User interaction must not cause an implicit automatic restart.
- Slideshow looping: circular by default and configurable through a semantic
  `loop` property. Previous from the first slide selects the last and next from
  the last selects the first; implement this through logical state changes and
  never by cloning slides in the DOM.
- Slideshow navigation: previous/next controls and pagination indicators are
  both visible by default. Expose the semantic options `both`, `arrows`, and
  `indicators`; direct touch scrolling remains available as a supplementary
  interaction. Keyboard operation belongs to the focused controls and scroll
  viewport, without root-wide arrow interception.
- Slideshow timing: the default autoplay interval is six seconds and remains
  configurable. The interval is active only when autoplay is enabled.
- Owner-requested timing feedback: expose a visible filling bar synchronized to
  the active slide. It resets after navigation, freezes for every autoplay pause,
  does no background work while the document is hidden, and is suppressed with
  autoplay under reduced motion.
- Timing-feedback presentation: use one current-slide progress bar, separate
  from the pagination indicators. Keep the bar visual rather than announcing
  continuously changing percentages to assistive technology; the slideshow's
  named controls, current-slide state and polite position status remain the
  accessible sources of truth.
- Approval scope: implementation candidate only; not final visual approval or
  promotion to `stable`.

### 03. G4 + B9 — Popup / Popover Identity

- Status: `accepted`
- Selected direction: consolidate G4 into canonical B9 Popover and
  migrate/deprecate the duplicate `popup` identity before v1.
- Owner correction: G4 must not behave as a centered Marketing Modal. It should
  reveal a non-modal floating content surface anchored to the element that
  triggered it, following the interaction model shown in the supplied shadcn/ui
  Popover reference.
- Repository consequence: this intended behavior already belongs to canonical
  B9 Popover, whose contract owns trigger relationship, anchored floating
  content, open state, light dismissal, Escape and natural non-modal focus.
  G4 must therefore consume B9 as a profile or migrate into it; it must not
  retain a duplicate overlay, positioning or visibility lifecycle.
- Accepted boundary: B9 owns the explicit trigger relationship, anchored
  positioning service, non-modal open/dismiss/focus lifecycle and arbitrary
  concise content. Do not preserve a second G4 overlay, positioning or
  visibility implementation and do not keep a permanent alias.
- Marketing campaigns that genuinely require page-level modality remain valid
  compositions of canonical Modal. Document Marketing Popover and Campaign
  Modal as recipes when useful; recipes do not become duplicate components.
- Approval scope: implementation candidate and pre-v1 migration only; not final
  visual approval or promotion to `stable`.

### 04. G7 — Countdown Timer

- Status: `accepted`
- Selected direction: `G7-B`, a real deadline-driven countdown runtime.
- Owner rationale: a Countdown is expected to count toward a specific future
  date rather than merely project externally calculated segments.
- Accepted technical direction: require one unambiguous absolute deadline with
  timezone information; derive remaining time from the current clock instead of
  decrementing a stored counter; suspend unnecessary background ticks while the
  document is hidden and recompute from the deadline when it becomes visible;
  and keep the neutral contract independent of React, Shopify and other targets.
- Runtime boundary: the component owns remaining-time calculation, drift-safe
  scheduling and the transition to expired. Commercial consequences such as
  redirecting, disabling purchase, changing a price or ending a promotion remain
  target-owned reactions.
- Expired presentation: clamp every rendered segment to zero and keep the
  component visible by default. Countdown does not infer whether the deadline
  represents a launch, an expiring offer or another domain event, so it owns no
  default expired message, replacement or disappearance behavior.
- Expired output: expose derived `running | expired` state and a single expiry
  transition notification through target-appropriate adapters. Consumers may
  use that state to retain the zero display, hide the component, replace it with
  contextual content or perform their own domain action without making those
  reactions Countdown properties.
- Displayed units: expose an ordered semantic selection from `days`, `hours`,
  `minutes`, and `seconds`, with all four enabled by default. Selected units
  remain structurally stable and display explicit zero values rather than
  collapsing automatically; consumers may select combinations such as
  hours/minutes or minutes/seconds.
- Accessibility/runtime guardrails: keep the visible and accessible remaining
  phrase localized, do not announce every second as a live update, announce the
  expired transition at most once when appropriate, and avoid a continuous
  background loop when the selected smallest unit does not require it.
- Approval scope: implementation candidate only; not final visual approval or
  promotion to `stable`.

### 05. G9 — Consent Manager

- Status: `accepted`
- Selected direction: `G9-A`, rename the ambiguous Cookie Consent identity to
  a controlled Consent Manager composition.
- Accepted composition: the initial non-modal surface exposes localized title,
  description, a real policy Link and explicit Accept, Reject and Customize
  requests with equal decision access. Detailed preferences compose canonical
  Modal and canonical choice controls rather than implementing another overlay
  or another field family.
- Ownership boundary: the target exclusively owns jurisdiction, legal copy,
  consent categories and values, provider integration, persistence, resource
  blocking, withdrawal, errors and audit evidence. The neutral component emits
  requests and projects target state; it never claims compliance or reads and
  writes cookies/storage itself.
- Identity migration: use `Consent Manager` as the public component name and
  retain `cookie-consent` only as a documented pre-v1 migration, not a second
  implementation.
- Initial-surface placement: render in normal document flow and let the owning
  page/layout decide whether a target-specific fixed or sticky placement is
  required. Consent Manager exposes no viewport-placement property and does not
  independently own safe-area, header, stacking or page-obstruction policy.
- Closed state: omit the initial surface and preferences Modal from interaction
  when target state says the decision surface is closed; do not retain a merely
  transparent focusable copy.
- Approval scope: implementation candidate only; not legal approval, final
  visual approval or promotion to `stable`.

### 06. C2 + G11 — Announcement Bar Identity

- Status: `accepted`
- Selected direction: merge C2 Announcement Bar and G11 Announcement Extended
  into one canonical public `Announcement Bar`; migrate/deprecate the duplicate
  G11 identity before v1 and retain no permanent alias.
- Content modes: expose one exclusive `static | countdown | rotating` mode.
  Static owns one stable message and optional Link; Countdown composes canonical
  G7; Rotating composes the accepted canonical Carousel rotation service.
- Dismissal: `dismissible` is an orthogonal controlled capability available to
  every content mode, not a fourth mode. It composes canonical Close Button,
  emits a dismiss request and owns no eligibility, persistence or automatic
  reappearance policy.
- Composition constraint: Countdown and Rotating cannot be active together in
  v1. Dependencies retain their own state, runtime, semantics and target
  mappings rather than being copied into Announcement Bar.
- Compact Countdown: select canonical `inline` presentation inside Announcement
  Bar. Preserve the configured unit set and tabular values; use intrinsic and
  container-responsive reflow so constrained layouts wrap into additional rows
  instead of hiding units, overflowing or scaling the component.
- Rotating autoplay: optional and disabled by default, preserving the accepted
  canonical rotation policy. When enabled, default to the accepted six-second
  interval, expose pause/play, pause for focus/hover/hidden-document conditions,
  suppress rotation under reduced motion, and never restart implicitly after
  user interaction.
- Rotating navigation: expose compact canonical previous/next Icon Buttons plus
  a visible current/total counter such as `2/3`; do not add pagination dots.
  Add the canonical pause/play control only while autoplay is enabled. Preserve
  direct touch scrolling where supported and focused-control/viewport keyboard
  behavior without root-wide arrow interception.
- Rotating timing feedback: do not render a timing/progress bar. Keep the
  compact Announcement height and use the conditional pause/play control as the
  visible indication that autoplay is active.
- Approval scope: implementation candidate and pre-v1 identity migration only;
  not final visual approval or promotion to `stable`.

### 07. L4 — Reading Progress

- Status: `accepted`
- Selected meaning: decorative article-position indicator (`L4-A` semantics),
  not task completion.
- Semantic boundary: the indicator communicates how far the viewport has moved
  through the defined article range. It does not claim that content was read,
  understood or completed and therefore remains `aria-hidden`; headings,
  landmarks and Table of Contents remain the accessible navigation model.
- Measurement API: support mutually exclusive `controlled` and `automatic`
  paths. Controlled receives one bounded `0..100` value. Automatic requires an
  explicit target article association and lets each target adapter calculate
  the same normalized article-relative position; it never guesses the first
  article or mixes an automatic result with a supplied value.
- Automatic runtime: attach work only while an automatic instance exists,
  coalesce visual updates to the target's rendering cadence, recompute after
  relevant geometry changes and perform no continuous polling. Targets without
  scroll measurement use the controlled path.
- Placement: the owning page/layout controls fixed, sticky, safe-area, Header
  offset, stacking and in-flow placement. Reading Progress exposes no viewport
  placement property and remains usable in any of those hosts.
- Approval scope: implementation candidate only; not final visual approval or
  promotion to `stable`.

### 08. L7 + E3 — Filter Surface Identity

- Status: `accepted`
- Selected semantic direction: redefine L7 from navigation to in-place filtering
  (`L7-B`). It must not render a `nav`, destination links or
  `aria-current="page"`; selection composes the appropriate canonical choice
  control semantics.
- URL requirement: capable Web and Shopify targets must reflect committed
  category selection in a target-owned query parameter so the filtered state is
  linkable, reloadable and synchronized with Back/Forward history. The neutral
  contract exposes selected value(s) and change/commit requests but does not
  hardcode a parameter name, router or serialization format for non-Web targets.
- Owner correction: E3 and L7 both filter an associated result surface; their
  stable distinction is presentation and composition rather than a Collection
  versus Category data domain. E3 is the full multi-group/faceted side panel for
  adjacent content. L7 is the compact horizontal list/bar for filtering content
  presented below it.
- Accepted public identities: rename L7 to `Filter Bar` and E3 to `Filter Panel`.
  They share canonical choice controls and target-owned query/result lifecycle
  but retain separate anatomy, density and adaptive-surface contracts. Do not
  preserve Category/Collection names as permanent aliases.
- Filter Bar selection: expose an explicit semantic `single | multiple` mode.
  Single composes canonical Radio or Segmented Control and constrains the
  selected-value collection to at most one value. Multiple composes canonical
  Checkbox. Both expose one coherent controlled selected-values projection and
  change request; no visually hidden duplicate input owner is introduced.
- Filter Bar commit: immediate only. Every accepted choice change emits a query
  change request; capable Web/Shopify targets synchronize query parameters and
  results while owning cancellation, pending/error/empty status, result
  announcements, focus, pagination reset and push-versus-replace history policy.
- Filter Panel adaptive surface: render as an adjacent multi-group panel when
  its owning container has sufficient width and compose the same canonical form
  and state inside canonical Drawer when constrained. Do not render duplicate
  desktop/mobile control trees or use viewport width as the sole switch.
- Filter Panel commit: expose explicit `immediate | manual` policy with
  `immediate` as the default. Manual mode owns a draft selection projection plus
  canonical Apply/Cancel actions; Apply requests the committed query change and
  Cancel restores the last committed values without modifying the URL.
- Approval scope: implementation candidates and pre-v1 identity migrations only;
  not final visual approval or promotion to `stable`.

### 09. L9 — Share Actions

- Status: `accepted`
- Selected direction: `L9-A`, one canonical named Share Actions group using the
  registry-backed `.share-buttons` family. Migrate/delete the duplicate `.share`
  family and do not preserve two permanent CSS/public identities.
- Composition: require a non-empty localized group label and at least one
  canonical Button or anchor Button action. Expose semantic `inline | stacked`
  layout; fixed/sticky placement, safe areas and page offsets belong to the
  owning layout or a separately justified Share Rail, not this group.
- Interaction boundary: keep ordinary Button/Link keyboard behavior and do not
  introduce toolbar/roving-focus semantics.
- Action model: hybrid. Accept a curated set of semantic built-in action IDs and
  arbitrary target-supplied custom Button/Link actions in one ordered group.
  Consumers explicitly choose and order actions; the component never renders
  every built-in action by default.
- Provider boundary: target adapters resolve provider URLs, payload encoding,
  capability checks, popup/window policy, Native Share, Clipboard permission,
  pending/true success/error feedback, analytics and security. The neutral
  contract owns the action identity/composition but does not fake success or
  make unavailable capabilities focusable.
- Built-in v1 catalogue: `native`, `copy`, `email`, `whatsapp`, `facebook`, `x`,
  `pinterest`, `linkedin`, `telegram`, `reddit`, `instagram`, `threads`, and
  `tiktok`, plus arbitrary custom actions.
- Capability tiers: direct URL/intent actions may render when their current
  adapter mapping is valid. Instagram and TikTok are target-capability actions:
  adapters expose them only when an official mobile/SDK/app flow is configured;
  a generic Web share sheet remains the `native` action and must not be branded
  as a guaranteed Instagram or TikTok destination. Threads may use its verified
  Web intent or an official target API as appropriate.
- Unavailable action policy: omit the selected action completely when the
  current adapter cannot truthfully perform it. Do not render a disabled dead
  control and do not silently replace a branded provider action with Native
  Share or Copy; consumers may include those as separate explicit actions.
- Approval scope: implementation candidate only; provider mappings must be
  revalidated against current official interfaces, and this is not final visual
  approval or promotion to `stable`.

### 10. S18 — Marquee

- Status: `accepted`
- Selected direction: `S18-A`, one shared progressive Marquee supporting both a
  readable static presentation and genuine seamless continuous motion.
- Content ownership: keep one authoritative ordered native list. Any copies
  required for visual continuity are bounded implementation details,
  `aria-hidden`, non-interactive and never become a second semantic data source.
- Motion controls: automatic motion composes one canonical Pause/Resume Button;
  pointer hover pauses temporarily, focus entry leaves motion paused until an
  explicit resume, and reduced motion/no-JavaScript/failed enhancement always
  preserve the readable static list.
- Documentation correction: the current Studio fixture is invalid evidence
  because site-only CSS disables animation and wraps four unexplained words.
  Exhibit must deliberately demonstrate real Auto mode, while Studio exposes
  the accepted properties through the exact same renderer/fixture and retains a
  usable Static mode.
- Default presentation: `auto`. A newly composed Marquee moves by default when
  enhancement succeeds, but reduced motion always derives the readable Static
  presentation and the consumer may explicitly select `static`.
- Direction: expose logical `forward | reverse`, defaulting to `forward`.
  Forward reveals subsequent items from inline-end and moves the track toward
  inline-start, so physical motion adapts automatically to writing direction;
  do not expose left/right as the cross-target semantic API.
- Pace: expose semantic `slow | default | fast`, defaulting to `default`.
  Adapters translate the preset into a distance-normalized visual velocity so
  content collections of different lengths do not move at inconsistent speeds.
  Raw duration, gap, clone count, travel distance and animation iteration remain
  private implementation details rather than public properties.
- Approval scope: implementation candidate only; exact visual velocities and
  artwork remain subject to human review and no `stable` promotion is implied.

### 11. S12 — Logo Bar

- Status: `accepted`
- Selected direction: `S12-B`, expose `static | marquee` presentations and
  compose the accepted canonical S18 Marquee enhancement rather than duplicate
  its motion lifecycle.
- Default: Logo Bar defaults to `static` even though standalone Marquee defaults
  to Auto. Selecting Logo Bar `marquee` explicitly enables Marquee's accepted
  logical direction, semantic pace, Pause/Resume, focus/hover suspension,
  reduced-motion and static-fallback behavior.
- Content ownership: preserve one authoritative native list in target-authored
  order. Each mark remains target-classified as informative, decorative or a
  real native Link. Motion copies are bounded, `aria-hidden` and non-interactive;
  linked copies never create duplicate focus stops.
- Boundary: assets, truthful alternative text, destinations, claims and brand
  usage remain target-owned. Exact mark dimensions, gap, color/muted treatment,
  wrapping and artwork remain pending human visual review rather than becoming
  assumed public API.
- Approval scope: implementation candidate only; not final brand/artwork
  approval or promotion to `stable`.

### 12. S17 — Before / After

- Status: `accepted`
- Selected direction: `S17-A`, an interactive image comparison composed from
  canonical Slider rather than a custom visual drag engine.
- Value ownership: one native `input[type="range"]` is the sole value, focus,
  pointer, touch, keyboard, form and reset owner. Its horizontal `0..100` value,
  default `50` and step `1` drive the clipped media layer and visual divider;
  controlled/uncontrolled adapters wrap that same owner without a mirrored
  hidden value.
- Composition: require one non-empty localized comparison label and both Before
  and After media; omit the root when either required medium is invalid. Visible
  state labels/description remain optional target content.
- Behavior: logical direction follows writing mode, native keyboard behavior is
  preserved, and no animation, polling, per-frame JavaScript or independent
  layout loop is introduced.
- Approval scope: implementation candidate only; media treatment, divider and
  handle artwork remain subject to human visual review and no `stable` promotion
  is implied.

### 13. A22 — Progress

- Status: `accepted`
- Selected direction: `A22-A`, separate compact visible value content from the
  complete localized accessible value description.
- API boundary: determinate Bar and Circle may expose a compact `displayValue`
  for visible presentation and an independent `valueText` mapping to
  `aria-valuetext`. Neither property is truncated, responsively scaled or used
  as an implicit fallback for the other.
- Circle constraint: fixed Circle interior accepts only intentionally compact
  visible content such as `72%`; full contextual meaning remains available to
  assistive technology without forcing that sentence into the artwork.
- Indeterminate remains Bar-only and omits determinate numeric/value text.
- Approval scope: implementation candidate only; not final visual approval or
  promotion to `stable`.

### 14. A11 + V2 — Passive Rating Identity

- Status: `accepted`
- Selected direction: `A11-A`, consolidate both passive displays into one
  canonical public `Rating` identity and migrate/deprecate `star-rating` before
  v1 without a permanent alias.
- Accepted scope: target-supplied half-step value, required complete localized
  accessible label, `default | lg` presentation and optional passive localized
  review count. The display remains non-interactive and runtime-free.
- Interactive separation: Star Input remains the separate canonical native
  radio-group control for submitting a rating; Rating never becomes focusable or
  selectable merely because it displays stars.
- Target ownership: provider-scale normalization, rounding, missing/zero policy,
  aggregate synchronization, structured data and an optional adjacent review
  count Link remain outside the neutral display.
- Approval scope: implementation candidate and pre-v1 migration only; not final
  visual approval or promotion to `stable`.

### 15. A13 — Empty State

- Status: `accepted`
- Selected direction: `A13-A`, retain required title content while the owning
  page, panel, dialog or section selects the contextually correct native heading
  element.
- API boundary: do not expose heading rank as a visual Studio control or a
  target-agnostic design property. Adapters/slots preserve the heading semantic
  supplied by the host without coupling typography to `h1`/`h2`/`h3`.
- Do not demote the required title to ordinary text. The optional recovery
  action remains one canonical Button-or-Link composition slot.
- Approval scope: implementation candidate only; not final visual approval or
  promotion to `stable`.

### 16. A15 — Avatar

- Status: `accepted`
- Selected direction: `A15-A`, explicit target-resolved image-or-initials
  composition.
- Content boundary: the target supplies either context-appropriate native image
  markup or pre-derived one/two-grapheme initials. Image loading/failure,
  responsive sources, CDN transformation, name parsing and fallback selection
  remain target-owned; Avatar exposes no second hidden fallback owner or
  loading/error runtime.
- Sizing: every accepted 32/40/56/80px Avatar size uses an intentional discrete
  semantic typography step rather than inheriting one fixed pixel text size.
- Approval scope: implementation candidate only; exact cropping, border and
  artwork remain subject to human visual review and no `stable` promotion is
  implied.

### 17. D1 — Product Card

- Status: `accepted`
- Selected direction: `D1-A`, expose the bounded semantic media-ratio options
  `square | portrait`, with `square` as the default.
- Consistency: Product Grid, sliders, recommendations and other consumers use
  the same Product Card ratio property. Do not expose arbitrary numeric ratios
  that fragment alignment across composed surfaces.
- Target ownership: image sources, focal point, missing-media fallback,
  responsive delivery and loading priority remain outside the neutral card; v1
  does not encode Web URLs or Shopify image objects in the source contract.
- Approval scope: implementation candidate only; the current repository artwork
  remains provisional pending explicit human visual review and no `stable`
  promotion is implied.

### 18. D2 — Product Gallery

- Status: `accepted`
- Selected direction: `D2-C`, full rich-media Product Gallery scope for v1
  rather than the proposed image-only pilot.
- Required media coverage: support a neutral discriminated collection of
  `image`, hosted `video`, `external-video`, and `model` items. AR is an
  adapter-reported capability/action associated with eligible models, not a
  fabricated universal media type. Shopify maps its current `product.media`
  records and native media/model filters; neutral source never embeds Shopify
  objects or Liquid-specific URLs.
- State ownership: exactly one stable media id is current. The product
  coordinator owns collection data, variant-to-media synchronization and
  controlled current-id updates; target adapters may offer an uncontrolled
  initial id over the same state but must not run a second DOM enhancer.
- Native media boundary: video keeps native/provider controls and playback
  lifecycle; model/AR keeps its platform viewer, capability and fallback; image
  keeps complete alt/responsive delivery. Thumbnails expose media-type badges
  and remain named canonical Buttons.
- Required capability expansion: implement and certify swipe, rich-media
  selection, zoom/detail viewing and Shopify parity rather than reporting the
  current image-only adapter as target-ready.
- Image detail: expose semantic `imageDetail: lightbox | none`, defaulting to
  `lightbox` for the full product experience. In that mode, activating the
  featured image opens canonical Lightbox, which synchronizes the same current
  media id and owns wide navigation, direct swipe, bounded zoom/pan, modal
  focus, dismissal and restoration. `none` makes the featured image passive for
  already-modal compositions such as Quick View. Product Gallery never
  implements a second inline image zoom engine or renderer.
- Rich media detail: hosted/external video and model items retain their
  type-native playback/viewer/fullscreen controls in the featured frame rather
  than being treated as zoomable images. Eligible model AR remains an explicit
  adapter capability/action.
- Collection looping: expose semantic `loop`, disabled by default. Finite mode
  disables previous/next at the real collection boundaries; enabled mode wraps
  logical state from last to first and first to last without cloning semantic
  media records or focusable controls.
- Collection autoplay: do not advance automatically between media items. Every
  collection change is an intentional user action, independently of the
  playback lifecycle owned by an already selected video or model.
- Rich-media activation: selection only changes the featured item. Hosted and
  external videos retain a poster and require an explicit Play action; models
  retain a preview and require an explicit View in 3D action. Changing the
  current item pauses and releases the previous playback/viewer lifecycle.
  Eligible AR always requires its own explicit action. Selection never starts
  playback, downloads an interactive model or launches AR implicitly.
- Approval scope: implementation candidate only; rich-media target parity and
  final visual behavior still require evidence and explicit human review, and
  no `stable` promotion is implied.

### 19. D3 — Product Info

- Status: `accepted`
- Selected direction: `D3-A`, selected-variant projection under one product
  coordinator. Product Info remains a passive presentation component and does
  not independently resolve product or variant state.
- Before variant resolution: Price may present the target-formatted product
  range and the remaining fields expose only truthful product-level data.
- After variant resolution: Price, SKU, inventory and availability project the
  exact selected variant. The same page or Quick View coordinator atomically
  synchronizes dependent media, URL and structured data and owns at most one
  localized update status.
- Content boundary: rich description remains target-sanitized content. Target
  editor composition, including Shopify theme blocks or app-block compatibility,
  does not enter the neutral component API.
- Approval scope: implementation candidate only; final visual behavior and
  target integration require evidence and explicit human review, and no
  `stable` promotion is implied.

### 20. D4 — Variant Selector

- Status: `accepted`
- Selected direction: `D4-A`, inspectable commercial unavailability. Sold-out
  values remain selectable so the product coordinator can explain their state,
  project their truthful product information or offer a separate Back In Stock
  flow; selection never makes unavailable merchandise purchasable.
- Disabled boundary: nonexistent combinations and genuinely unusable values use
  native `disabled`. The public contract preserves this distinction instead of
  collapsing sold-out and structurally invalid states into one boolean.
- State coordination: one product coordinator owns combination resolution and
  every dependent surface. Variant Selector emits semantic selection requests
  and does not independently reconcile Price, media, availability or Product
  Form state.
- Accessible presentation: the legend visibly includes the selected value and
  every swatch retains a complete accessible label; color or a tooltip alone
  never carries the option name.
- Approval scope: implementation candidate only; high-variant target behavior,
  final visuals and integration require evidence and explicit human review, and
  no `stable` promotion is implied.

### 21. D5 — Product Form

- Status: `accepted`
- Selected direction: `D5-A`, a native submission baseline with optional
  target-owned Ajax enhancement. The real form and its FormData remain complete
  and functional without JavaScript.
- Progressive enhancement: a capable target may intercept the same submission
  to update Cart Drawer, sections or cart count without a page navigation. That
  adapter owns pending, error, retry, focus, announcements and rollback; it must
  not create a parallel submission path.
- Product coordination: the shared product coordinator owns the resolved
  merchandise id and dependent product state. Product Form consumes that state
  and preserves native submission semantics.
- Scope boundary: accelerated checkout and generic supplementary-field slots do
  not enter the neutral v1 contract. Selling plans, personalization, uploads,
  gifts and preorder flows require separately accepted canonical compositions.
  A target may omit Quantity or fix it to one where the merchandise requires it.
- Approval scope: implementation candidate only; final visuals and target Ajax
  integrations require evidence and explicit human review, and no `stable`
  promotion is implied.

### 22. D7 — Size Chart

- Status: `accepted`
- Selected direction: `D7-A`, target-authored complete measurement tables in
  canonical Modal. Targets supply localized values, units, headers and notes;
  neutral source performs no conversion, rounding or fit calculation.
- Presentation: preserve the centered Modal profile at every Web viewport for
  exact mode parity instead of silently replacing it with Sheet on narrow
  containers. Inline charts remain a separate host composition.
- Canonical composition: reuse Modal, Data Table and, where multiple complete
  charts need selection, optional Segmented Control. Very large matrices require
  a different target presentation rather than virtualization or structural
  mutation inside this component.
- Shopify mapping: reference a product-associated metaobject containing complete
  chart records and notes, using a bounded merchant-vertical schema rather than
  a universal apparel, footwear and object conversion engine.
- Approval scope: implementation candidate only; target authoring schema and
  final visual review remain required, and no `stable` promotion is implied.

### 23. D8 — Back In Stock

- Status: `accepted`
- Selected direction: `D8-A`, a target-integrated request bound to the exact
  selected variant and current market. The neutral contract carries this
  context without naming or requiring a particular app, vendor or backend.
- Availability meaning: notification eligibility begins only when the connected
  inventory authority confirms that the variant is purchasable under that
  market's policy. Preorder, backorder, incoming and reserved states are not
  silently treated as back in stock.
- Responsibility boundary: Back In Stock owns the form presentation and
  submitting, success and retryable-error states. The target integration owns
  persistence, verification, idempotency, abuse limits, retention, delivery,
  retry and unsubscribe behavior.
- Consent boundary: service-notification consent remains separate from marketing
  consent and is not inferred from it in either direction.
- Confirmed state: retain the form in place but disable resubmission and show a
  truthful adjacent confirmation, preserving focus and context.
- Approval scope: implementation candidate only; choosing and certifying each
  target integration remains required, and no `stable` promotion is implied.

### 24. D9 — Store Pickup

- Status: `accepted`
- Selected direction: `D9-C`, expand the current passive availability snapshot
  into an interactive location-search and selection surface. The accepted scope
  must therefore no longer be described or certified as availability-only.
- Accepted identity split: rename D9 to `Pickup Location Selector`, scoped to
  finding and choosing an eligible pickup location for the current product,
  variant and market. Add a separate canonical `Store Locator` for general
  branch discovery without requiring product context.
- Inventory consequence: this explicit architecture decision expands the
  canonical registry from 183 to 184 components. Both components must compose
  existing canonical controls and share target-owned location/search services
  without copying state coordinators or provider-specific data models.
- Approval scope: identity split and semantic direction accepted; implementation,
  target-provider evidence and final human visual review remain required, and no
  `stable` promotion is implied.

#### 24.1 Store Locator action boundary

- Status: `accepted`
- Selected direction: general Store Locator is discovery-only. It supports
  searching and inspecting target-supplied branches, hours, services, contact
  details and an explicit target-owned directions action.
- Excluded actions: it neither chooses a pickup location for a transaction nor
  stores a temporary or account-level preferred store. Those stateful commerce
  responsibilities do not enter its public contract.

#### 24.2 Pickup selection commitment

- Status: `accepted`
- Selected meaning: choosing a location records pickup intent for the current
  product, variant and market. Pickup Location Selector emits the selected
  stable location id to the shared product/fulfilment coordinator.
- Reservation boundary: selection alone never reserves inventory or promises
  fulfilment. The owning target confirms availability and any reservation in
  Product Form, Cart or Checkout and must surface rejection or stale-state
  recovery truthfully.

#### 24.3 List and map capability

- Status: `accepted`
- Selected direction: the searchable location list is the required complete
  interaction surface for both Pickup Location Selector and Store Locator.
- Optional map: capable targets may add a synchronized map as a progressive
  presentation. Map selection and list selection project the same current
  location id and information; the map never becomes the sole route to any
  result, detail or action.
- Provider boundary: geocoding, map tiles, credentials, attribution, loading,
  failures and usage limits remain target-owned. A missing or failed map leaves
  the complete list workflow available.

#### 24.4 Geolocation permission

- Status: `accepted`
- Selected direction: request location only after an explicit localized “Use my
  location” action. Opening either component never triggers a permission prompt.
- Fallback: manual search by target-supported address, city, region or postal
  code remains available regardless of geolocation support, denial, timeout or
  error. The target owns permission APIs, geocoding and privacy disclosure.

### 25. D10 — Subscription Option

- Status: `accepted`
- Selected direction: `D10-A`, one named purchase-options Fieldset containing a
  one-time Radio and one Radio for every eligible recurring allocation or
  selling-plan choice.
- Default: one-time purchase is selected initially when it exists.
  Subscription-only merchandise omits that nonexistent option and must still
  expose at least two meaningful choices or use a simpler non-Radio
  presentation.
- Copy requirements: each recurring choice explicitly identifies checkout
  charge, per-delivery amount and cadence. Savings appear only from a verified,
  localized target calculation; terms remain visible target-authored content
  and selected detail stays inline for v1.
- Target ownership: the product coordinator owns plan groups, eligibility,
  payload conversion and clearing stale selections. Shopify maps its native
  selling-plan allocations without introducing them into neutral source data.
- Approval scope: implementation candidate only; target selling-plan evidence
  and final human visual review remain required, and no `stable` promotion is
  implied.

### 26. E5 — View Toggle

- Status: `accepted`
- Selected direction: `E5-B`, compose canonical Segmented Control with the fixed
  mutually exclusive identities `grid` and `list` rather than two independently
  tabbable pressed Buttons.
- Interaction: the group is one Tab stop and uses logical arrow navigation
  between options. One target-owned `activeView` projects atomically to the
  selected segment and associated result presentation.
- Visual direction: use one joined control with icon and visible text for each
  segment and an unambiguous active surface, following the owner-provided visual
  reference without treating its exact colors, dimensions or styling as final
  visual approval.
- Availability/default: omit the component when only one real layout exists.
  Grid is the neutral initial value unless a target explicitly supplies a
  merchant, URL or account preference.
- Target ownership: neutral source stores no preference and emits no result
  announcement. The result coordinator preserves filters, sort and pagination
  and owns any useful localized status update.
- Approval scope: implementation candidate only; final artwork and target
  integration require explicit human review, and no `stable` promotion is
  implied.

### 27. E6 — Collection Promo

- Status: `accepted`
- Selected direction: `E6-A`, a first-party editorial promotion rendered as one
  passive article inside a real Collection Grid item, with one optional explicit
  canonical Link CTA.
- Interaction: the title, media and card surface remain passive. A CTA renders
  only from a complete target-supplied label and destination pair; the component
  never fabricates a whole-card link or nested interactive surface.
- Grid coordination: the target owns eligible collection pages, insertion index
  and frequency. A two-track span is available only when the parent grid has at
  least two coherent tracks, and promo insertion never alters product pagination
  or product counts.
- Scope boundary: sponsored or paid promotions are excluded from neutral v1.
  Heading rank and destination metadata remain target-owned.
- Approval scope: implementation candidate only; editorial artwork, insertion
  behavior and target mapping require evidence and explicit human review, and
  no `stable` promotion is implied.

### 28. E7 — Empty Collection

- Status: `accepted`
- Selected direction: `E7-A`, retain a distinct Collection-domain profile that
  composes canonical Empty State with zero intentional visual divergence.
- Content: the target supplies truthful resolved-empty title/body content and
  at most one optional canonical Button or Link recovery action. Heading rank
  remains host-owned under the accepted Empty State decision.
- Cause boundary: do not expose a public cause enum. Empty source inventory,
  filtered or searched zero results and merchandising exclusion remain target
  lifecycle facts expressed through truthful content and available recovery.
- Result coordination: the target atomically owns Grid, Pagination and filter
  visibility, URL/history, focus and any pre-existing localized result status.
  Empty Collection creates no automatic live region.
- Approval scope: implementation candidate only; source-data distinction,
  target mapping and final human visual review remain required, and no `stable`
  promotion is implied.

### 29. G2 — Newsletter

- Status: `accepted`
- Selected direction: `G2-A`, a thin title, copy and optional privacy-note
  composition around canonical native Form, Input and Button, with a single
  optional placement for target-confirmed response content.
- Lifecycle boundary: neutral source defines no universal pending, success,
  error, retry, duplicate or provider state machine. The target owns consent,
  persistence, submission, confirmed outcomes, retry and any associated focus
  or announcement behavior.
- Native baseline: capable targets preserve real form submission. Shopify v1
  maps its native customer form and server-confirmed errors or success rather
  than simulating a provider-independent result.
- Documentation truth: Exhibit and Studio fixtures explicitly state that no
  subscription is sent and never present fixture feedback as a confirmed result.
- Approval scope: implementation candidate only; provider integration, final
  visual behavior and explicit human review remain required, and no `stable`
  promotion is implied.

### 30. G8 — Urgency

- Status: `accepted`
- Selected direction: `G8-B`, retain all four claim types in v1: `low-stock`,
  `selling-fast`, `viewers` and `recent-sale`.
- Truthfulness gate: every rendered claim requires target-supplied proof,
  freshness, privacy and qualification policy appropriate to that claim. No
  fixture, random value, untracked inventory or unverified marketing copy may
  reach a production target mapping.
- Motion/announcement boundary: remove the infinite pulse. Urgency remains a
  passive, non-live presentation and never repeatedly announces changing
  activity or scarcity.
- Approval scope: four-type semantic direction accepted; implementation,
  adapter evidence and final human review remain required, and no `stable`
  promotion is implied.

#### 30.1 Claim qualification ownership

- Status: `accepted`
- Selected direction: the target supplies an already qualified claim type,
  complete localized text and explicit validity/freshness boundary. Neutral
  source presents that result and never ingests raw inventory, sales, audience
  or order metrics to calculate urgency.
- Adapter certification: each production adapter must document its authoritative
  source, qualification rule, refresh/expiry policy and privacy treatment. An
  absent, expired, stale or unverifiable qualification omits the component.

#### 30.2 Low-stock meaning

- Status: `accepted`
- Selected meaning: `low-stock` refers only to purchasable tracked inventory for
  the exact selected variant in the current market. It never presents an
  aggregate across variants as if it applied to the current selection.
- Qualification: the commerce target owns the merchant-approved threshold and
  supplies complete localized text. Untracked, ineligible, stale or unavailable
  inventory omits the claim.

#### 30.3 Selling-fast evidence

- Status: `accepted`
- Selected evidence: `selling-fast` requires target-verified velocity of valid,
  confirmed purchases across a documented recent window and qualification
  threshold. Cart, checkout, favorite, visit or other engagement activity alone
  cannot substantiate this claim.
- Integrity: target qualification excludes tests, cancellations and other
  invalidated transactions according to its documented commerce policy. The
  localized claim explicitly distinguishes product-level from selected-variant
  scope.

#### 30.4 Viewers evidence and presentation

- Status: `accepted`
- Selected presentation: `viewers` uses a target-qualified approximate bucket,
  such as “More than 20 people are viewing this product,” rather than an exact
  continuously changing count.
- Evidence/privacy: the bucket derives from distinct active product sessions in
  a documented short window and renders only above a target-defined privacy
  minimum. It exposes no person, account or location data; expired or
  insufficient aggregates omit the claim.
- Runtime: the target may replace the complete passive claim at a bounded
  cadence, but neutral source performs no polling and creates no live
  announcement for count changes.

#### 30.5 Recent-sale evidence and privacy

- Status: `accepted`
- Selected presentation: `recent-sale` is a general anonymous statement such as
  “This product was purchased recently.” It includes no purchaser identity,
  location or relative-time counter.
- Evidence: the target qualifies the claim from a valid confirmed purchase in a
  documented freshness window. Expired, test, cancelled or otherwise
  invalidated transactions omit it.

### 31. G10 — Social Proof

- Status: `accepted`
- Selected direction: `G10-A`, retain Social Proof as a passive profile of
  canonical Toast that presents at most one verified, current and
  privacy-approved activity statement.
- Optional content: the target may supply relevant media or target-authored time
  copy and canonical dismissal. The component invents no person, location,
  product, timestamp or activity detail.
- Lifecycle boundary: neutral source defines no live role by default, queue,
  automatic timing or feed runtime. The target owns truth, qualification,
  anonymisation or consent, freshness, expiry, placement and appearance
  lifecycle.
- Duplication boundary: a target must not present the same recent-sale claim
  simultaneously through inline Urgency and floating Social Proof.
- Shopify boundary: omit G10 from Shopify v1 until a verified provider or
  authoritative data source and its privacy policy are selected and certified.
- Approval scope: implementation candidate only; provider evidence, placement
  and final human visual review remain required, and no `stable` promotion is
  implied.

### 32. K1 — Cart Page

- Status: `accepted`
- Empty-state decision: Cart Page represents only a populated cart and requires
  a title, a non-empty canonical Cart Line Item collection and canonical Cart
  Summary. When the final line is removed, the target atomically replaces K1
  with the separate canonical Cart Empty composition; K1 exposes no empty slot
  or empty mode.
- Snapshot ownership: the target owns the coherent cart snapshot, mutations,
  pending/error/status lifecycle, focus after removal, count, checkout
  navigation and any Shopify section refresh. Continue Shopping renders only
  from a complete real Link.
- Summary placement: expose the semantic neutral property
  `summaryPlacement: flow | sticky`; Web, Shopify and future capable targets must
  implement and certify both presentations over the same canonical Cart Summary
  and cart snapshot.
- Sticky safety: the sticky mapping must own header/safe-area offset, bounded
  available height, collision behavior and focus-not-obscured handling. It must
  fall back truthfully when a target cannot meet those requirements rather than
  obscuring content or controls.
- Default placement: `sticky`. Consumers may explicitly choose `flow`; the
  target must degrade the default to flow whenever it cannot satisfy the sticky
  safety requirements.
- Approval scope: semantic direction accepted; implementation, responsive
  evidence and final human visual review remain required, and no `stable`
  promotion is implied.

### 33. K8 — Quick View

- Status: `accepted`
- Selected direction: `K8-A`, a focused canonical Modal product profile
  composing canonical Product Gallery, Price, optional Product Form and one
  complete real Link to full product details.
- State ownership: one target product coordinator owns loading, selected
  variant, availability, commerce submission and feedback. Modal exclusively
  owns focus containment, inertness, dismissal and trigger restoration; Quick
  View creates no parallel product state.
- Accepted-decision update: inherit the owner's D2 full rich-media Gallery scope
  and D5 native-form/Ajax boundary, superseding the packet's stale image-only
  wording. A target opens Quick View only from a complete coordinated product
  snapshot and otherwise omits it.
- Image-detail composition: configure the same canonical Product Gallery with
  `imageDetail: none` inside Quick View. Image selection, direct swipe, hosted or
  external video and model interaction remain available, but the featured image
  is passive and creates no nested or transferred overlay. The full-details Link
  leads to the default `imageDetail: lightbox` product experience.
- Approval scope: semantic direction accepted; implementation, complete product
  snapshot evidence and final human visual review remain required, and no
  `stable` promotion is implied.

### 34. K9 — Sticky Add To Cart

- Status: `accepted`
- Selected direction: `K9-A`, a target-controlled secondary submitter that is
  available only while the primary Product Form action is no longer usefully
  visible and the resolved product state is purchasable.
- Canonical submission: its Button uses native `form` association to submit the
  existing Product Form. K9 creates no second form, merchandise selection,
  variant state or commerce mutation path.
- Runtime ownership: the target owns primary-action visibility observation,
  purchasability, pending/result feedback, analytics and focus. Neutral source
  adds no observer or autonomous visibility runtime.
- Hidden/safe presentation: when unavailable, K9 is omitted or natively
  unavailable. A fixed target mapping reserves safe-area/content space and
  cannot cover focused controls.
- Approval scope: implementation candidate only; real Product Form integration,
  responsive evidence and final human visual review remain required, and no
  `stable` promotion is implied.

### 35. K11 — Gift Wrap

- Status: `accepted`
- Selected direction: `K11-A`, one order-level sellable gift-wrap line backed by
  a dedicated target product or variant with quantity one.
- Price/accounting truth: the line and its target-supplied Price, including a
  truthful zero price when applicable, remain explicit in cart totals, checkout,
  tax, refunds and fulfilment rather than being hidden in an attribute.
- Neutral interaction: Gift Wrap composes one native Checkbox and optional
  canonical Price and emits only checkedness. The target owns eligibility, line
  identity, idempotency, discounts, shipping/tax policy, mutation, mixed carts
  and error recovery.
- Authoritative state: after every mutation the target reconciles Checkbox state
  from the coherent cart snapshot; optimistic presentation never becomes a
  parallel source of truth.
- Approval scope: implementation candidate only; target merchandise mapping,
  cart evidence and final human visual review remain required, and no `stable`
  promotion is implied.

### 36. U0 — Account Family Boundary

- Status: `accepted`
- Selected direction: `U0-A`, targets exclusively own identity and account
  services. Neutral Account components remain passive shells or canonical
  Form/control compositions and never authenticate, authorize, fetch protected
  customer data, persist changes, select routes or invent account status.
- Shopify v1: map account candidates through the current Customer Account API
  and extension model. Classic customer Liquid, when explicitly maintained,
  remains a separately versioned compatibility adapter rather than shared
  source architecture.
- Cross-target requirement: every Account component consumes target-confirmed
  state and complete localized content while credentials, sessions, protected
  operations, routing, policy and analytics remain outside neutral source.
- Approval scope: family architecture accepted; every component and target
  integration still requires its own evidence and explicit human review, and no
  `stable` promotion is implied.

### 37. U1 — Authentication Entry

- Status: `accepted`
- Selected direction: `U1-A`, one passive authentication shell requiring a
  target-authored title and one canonical Form composition.
- Flow boundary: sign-in, registration, MFA, passkeys and provider handoff are
  separate target routes or flows, not public visual variants of U1. Neutral
  source assumes no credential type, provider, required field or endpoint.
- Target ownership: the target owns credentials, session, generic feedback,
  rate limiting, redirects and analytics under the accepted U0 boundary.
- Approval scope: implementation candidate only; each real authentication flow,
  final artwork and explicit human review remain required, and no `stable`
  promotion is implied.

### 38. U2 — Password Reset

- Status: `accepted`
- Selected direction: `U2-A`, target-controlled mutually exclusive request and
  confirmed compositions rather than a neutral success boolean or transition
  machine.
- Request composition: canonical Form, Input and Button remain available during
  initial submission and for truthful field/global error correction or retry.
- Confirmed composition: only after a provider-confirmed response, the target
  replaces the request form with canonical Alert. It moves focus to the Alert
  heading or status only when replacement would otherwise strand the user.
- Security/target boundary: the target owns generic anti-enumeration copy,
  provider lifecycle, rate limiting and delivery under U0; neutral source never
  reveals whether an account exists.
- Approval scope: implementation candidate only; provider behavior, focus
  evidence and final human visual review remain required, and no `stable`
  promotion is implied.

### 39. U3 — Account Dashboard

- Status: `accepted`
- Selected direction: retain canonical Account Dashboard as a target-agnostic
  labelled navigation overview while allowing truthful target-native handoff
  when a platform owns an account surface that cannot render it.
- Canonical composition: one labelled section contains a native list of
  canonical Card/Link destinations and optional canonical account actions. The
  target supplies greeting, routes, counts, authorization and personalization;
  U3 owns no data fetching or navigation runtime.
- Adapter policy: targets that control their account UI project authorized data
  and routes through the canonical component. When Shopify or another platform
  fully owns a non-replaceable screen, its adapter uses that native experience,
  documents the limitation and does not claim visual or functional parity.
- Availability: the inability of one target to render U3 does not remove the
  canonical component needed by neutral Web, framework and future targets.
- Approval scope: semantic direction accepted; controlled-surface integration,
  native-handoff documentation and final human visual review remain required,
  and no `stable` promotion is implied.

### 40. U4 — Order History

- Status: `accepted`
- Selected direction: `U4-A`, a passive list of target-formatted authoritative
  order summaries rather than a universal order/status record schema.
- Item anatomy: each item contains one descriptive canonical Link, native
  `time`, canonical Badge with readable target-authored status and a formatted
  total. Financial and fulfilment states remain distinct target facts projected
  into truthful localized content.
- Lifecycle boundary: pagination, loading, empty/error compositions and
  authentication expiry belong to the owning account surface under U0. U4
  fetches no orders and invents no normalized status enum.
- Approval scope: implementation candidate only; protected-data integration,
  state-copy evidence and final human visual review remain required, and no
  `stable` promotion is implied.

### 41. U5 — Order Detail

- Status: `accepted`
- Selected direction: `U5-A`, a passive composition of the target's
  authoritative order using target-owned metadata, tracking and line-item slots.
- Tracking: compose canonical Steps only when the provider supplies a trustworthy
  ordered milestone model. Otherwise render ordinary target-authored status
  content and never infer or normalize a universal tracking-stage enum.
- Purchased items: reuse canonical Cart Line Item presentation in an explicitly
  read-only profile with no quantity mutation, removal or cart command.
- Target boundary: protected loading, authorization, provider links, errors and
  account-session lifecycle remain with the owning surface under U0.
- Approval scope: implementation candidate only; provider tracking evidence,
  read-only composition and final human visual review remain required, and no
  `stable` promotion is implied.

### 42. U6 — Address Book

- Status: `accepted`
- Selected direction: `U6-A`, an authoritative native list with explicit
  target-owned actions and protected deletion.
- Actions: Add and Edit use canonical actions. Delete requires target
  confirmation or an equivalent guaranteed undo path; Set Default renders only
  when the target supports it. At most one address is target-confirmed as the
  default.
- Mutation lifecycle: records remain present and ordered until authoritative
  confirmation. The target owns pending/error status and deliberate focus
  restoration after confirmation, cancellation, undo or failure.
- Approval scope: implementation candidate only; protected mutation integration,
  focus evidence and final human visual review remain required, and no `stable`
  promotion is implied.

### 43. U7 — Address Form

- Status: `accepted`
- Selected direction: `U7-A`, formally compose canonical Form while keeping the
  complete address field schema target-owned.
- Target schema: each target supplies locale-specific field inventory, order,
  names, autocomplete purposes, requiredness, validation and mutation. Neutral
  source owns native form composition and container-responsive layout only.
- Actions/errors: Submit is explicit. Optional Cancel is target navigation or
  close composition and never implies form reset. Server/custom errors map to
  canonical field messages plus a useful error summary when needed.
- Approval scope: implementation candidate only; localized schema coverage,
  protected mutation evidence and final human visual review remain required,
  and no `stable` promotion is implied.

### 44. U8 — Wishlist

- Status: `accepted`
- Selected direction: `U8-C`, hybrid persistence with an anonymous local-device
  wishlist and an authenticated account wishlist that are explicitly reconciled
  after sign-in.
- Presentation: Wishlist remains one target-controlled canonical Product Card
  list. Per-card Remove is a canonical command, not a pressed Save toggle; the
  target confirms removal, updates count/empty state, places focus deliberately
  and offers undo when feasible.
- Service boundary: neutral source stores nothing. Web, Shopify or another
  target must provide the local persistence, authenticated service, identity,
  synchronization, failure and privacy lifecycle before exposing the hybrid
  feature.
- Approval scope: hybrid semantic direction accepted; secure persistence,
  synchronization evidence and final human visual review remain required, and
  no `stable` promotion is implied.

#### 44.1 Sign-in merge and cleanup

- Status: `accepted`
- Selected direction: union the anonymous and authenticated wishlists without
  duplicates using the accepted stable saved-item identity. Neither source wins
  by destructive replacement.
- Confirmation boundary: the authenticated service performs an idempotent merge
  and returns the authoritative result. Local anonymous records are cleared only
  after confirmed success; failure preserves them intact for truthful retry.

#### 44.2 Saved-item identity

- Status: `accepted`
- Selected identity: every Wishlist record represents one exact target variant
  or merchandise selection, not only its parent product. The stable variant id
  is the merge/deduplication key and the parent product id remains available for
  navigation and presentation.
- Presentation consequence: multiple variants of the same product may coexist
  as distinct Product Card records. Each card must visibly and accessibly name
  the saved option selection rather than relying on image or color alone.
- Unavailable records: retain the exact saved record with a truthful localized
  sold-out or no-longer-available state. The user may open the parent product,
  choose another variant or explicitly remove it; the target never silently
  deletes it or converts it into a product-level favorite.

### 45. U9 — Account Settings

- Status: `accepted`
- Selected direction: `U9-A`, a documented mixture by section based on each
  setting's truthful commitment lifecycle.
- Explicit-save sections: profile-like edits compose canonical Form and submit
  deliberately. The target owns dirty state, validation, pending/error/conflict,
  authentication expiry and confirmed feedback.
- Immediate sections: effects that truly apply at activation compose canonical
  Switch and remain outside any global Save action. U9 never presents an
  immediate control whose state is only provisional until unrelated submission.
- Policy boundary: marketing and notification consent remain separate
  policy-backed controls and records rather than generic booleans. Platform-hosted
  settings are linked or omitted instead of copied into a false neutral flow.
- Approval scope: implementation candidate only; setting inventory, protected
  mutation evidence and final human visual review remain required, and no
  `stable` promotion is implied.

### 46. L1 — Article Card

- Status: `accepted`
- Linked anatomy: one native Link contains the article media and title as one
  destination. Passive category metadata and any future conflicting interactive
  descendants remain outside that Link; no whole-card JavaScript delegation is
  permitted.
- Loading boundary: canonical Skeleton is an external loading composition that
  is replaced by Article Card when authoritative article data is ready. Article
  Card exposes no loading variant, busy lifecycle or internal Skeleton markup.
- Metadata: category remains a passive canonical Badge and all metadata remains
  target-formatted.
- Card composition: Article Card composes canonical Card and exposes its semantic
  `default | flat | elevated` surface variants, with `default` initially
  selected. Border, shadow, radius, color and hover details remain owned by Card
  and tokens rather than duplicated as Article Card properties. Article Card's
  own layout/profile variant remains an independent axis.
- Excerpt fitting: expose `excerptLines: none | 2 | 3 | 4`, defaulting to `none`.
  `none` renders the complete supplied excerpt; numeric values apply an explicit
  visual line clamp without mutating the target's source content.
- Approval scope: semantic direction accepted; canonical composition,
  localization/extreme-content evidence and final human visual review remain
  required, and no `stable` promotion is implied.

### 47. L2 — Article Hero

- Status: `accepted`
- Selected direction: `L2-A`, retain `full`, `split` and `text-only` with one
  mandatory safe no-media fallback.
- Missing media: `full` and `split` collapse to readable normal-flow content;
  required title and metadata remain visible and do not retain inverse colors,
  overlay assumptions or spacing that depended on an image.
- Target ownership: the host supplies heading rank, crop/focal point, loading
  priority, category and author Links, metadata inventory/order and localized
  duration policy. The neutral root remains unframed.
- Approval scope: implementation candidate only; crop, contrast, missing-media
  and final human visual review remain required, and no `stable` promotion is
  implied.

### 48. L3 — Article Body / Prose

- Status: `accepted`
- Selected direction: `L3-B`, move canonical `.prose` selector ownership from
  Article Body into Foundations. L3 becomes an explicit consumer/extension and
  Foundations must not coexist with a second Article Body implementation of the
  same selector.
- Prose identity: Foundations exposes `.prose` as a reusable public style
  contract, not a registry component. Article Body remains L3 and explicitly
  consumes and extends that contract with article-specific composition; the
  canonical inventory therefore remains at 184 after the accepted Store Locator
  addition.
- Embedded composition: Article Body may host canonical Product Card and Price
  islands inside an explicit Prose-excluded wrapper. The islands keep their own
  contracts and are never restyled or reimplemented as authored rich text.
- Full-bleed boundary: genuinely full-bleed media belongs to the host layout
  outside `.prose`; foundational Prose does not reset itself into a page-layout
  engine.
- Callouts/migration: passive authored callouts remain ordinary content; targets
  compose canonical Alert only when timing or importance requires it. Legacy
  pull-quote/callout aliases remain for one pre-v1 migration cycle and are
  removed before the public v1 contract freezes.
- Approval scope: semantic direction accepted; source migration, embed evidence
  and final human visual review remain required, and no `stable` promotion is
  implied.

### 49. L5 — Table Of Contents

- Status: `accepted`
- Data ownership: the target supplies ordered nested heading records whose
  canonical Links resolve to stable unique fragment ids. Neutral source neither
  parses rich HTML nor generates or mutates heading ids at runtime.
- Shopify boundary: expose L5 only when the article source supplies structured
  heading records or a verified preprocessing step; arbitrary merchant HTML is
  never parsed by the neutral component.
- Placement: expose `placement: flow | sticky`, defaulting to `sticky`. Every
  capable target implements both over the same canonical content and degrades
  sticky to flow when it cannot satisfy header/safe-area offset, available
  height, collision and focus-not-obscured requirements.
- Approval scope: semantic direction accepted; implementation, reading-service
  integration, responsive evidence and final human visual review remain
  required, and no `stable` promotion is implied.

#### 49.1 Current-section tracking

- Status: `accepted`
- Selected direction: optional target-controlled tracking through one stable
  `currentSectionId`. The matching canonical Link maps
  `aria-current="location"`; static targets omit current state without changing
  list or Link semantics.
- Runtime ownership: capable targets derive current section through the shared
  reading-state service also consumed by Reading Progress. L5 adds no second
  observer, scroll polling or independent heading parser.

### 50. L6 — Author Card

- Status: `accepted`
- Selected direction: `L6-A`, one passive person composition with a neutral
  `div` root and host-owned semantic context.
- Host context: the article composition chooses an appropriate `footer`,
  `aside`, contact-only `address`, contextual heading rank and complete author
  profile Link. L6 never claims those page relationships by itself.
- Presentation: retain `full` and `compact`. Multiple authors render as a
  host-owned collection of canonical Author Cards, not a hidden multi-author
  mode or record schema inside L6.
- Privacy/content: public email is omitted by default. Social and homepage
  destinations render only when explicitly target-supplied and approved;
  Shopify may map approved public author name, biography and avatar facts.
- Approval scope: implementation candidate only; host semantics, privacy review
  and final human visual review remain required, and no `stable` promotion is
  implied.

### 51. L8 — Blog Sidebar

- Status: `accepted`
- Public identity: use `Blog Sidebar`; retain legacy “Blog Sidebar / Tag Cloud”
  selector/name aliases for migration only and remove them before the public v1
  contract freezes.
- Anatomy: one named native `aside` contains target-composed modules. The initial
  v1 profile supports Recent Articles and Topics as native Link lists; navigation
  topics do not compose passive Tag.
- Optional modules: Search renders only when a real target search owner supplies
  the complete form/result lifecycle. Newsletter and Search remain separate
  canonical or target compositions rather than root booleans.
- Composition ownership: module order, limits and headings are target page data,
  not fixed L8 root properties.
- Approval scope: implementation candidate only; alias migration, real module
  integration and final human visual review remain required, and no `stable`
  promotion is implied.

### 52. L10 — Related Articles

- Status: `accepted`
- Recommendation source: the target supplies an explicitly curated ordered set
  of at most three canonical Article Cards. It excludes the current article and
  duplicates and preserves curator order; no tag fallback or personalized
  ranking is inferred in v1.
- Empty behavior: omit the complete section when no truthful curated references
  exist rather than rendering an empty recommendation shell.
- Article composition: place L10 after primary article content and before
  Comments. The host may position Author Card and Share Actions around that
  boundary without changing L10.
- Article Navigation boundary: do not register Previous/Next Article Navigation
  in v1. It remains a future canonical component or explicit target composition;
  legacy `.article-nav` is never interpreted as L10.
- Approval scope: semantic direction accepted; curated-data mapping and final
  human visual review remain required, and no `stable` promotion is implied.

### 53. L11 — Comments

- Status: `accepted`
- Thread depth: render native ordered lists with at most two visible levels.
  Provider replies deeper than level two are flattened into the second level in
  authoritative order and receive an explicit localized reply-to label naming
  their parent context.
- Target boundary: replies require a target-authenticated composer and
  moderation lifecycle. A target such as Shopify with a flat native model may
  omit reply actions and nesting without fabricating unsupported relationships.
- Target lifecycle: the target owns sanitization, permissions, moderation,
  pending/result feedback, focus restoration, authoritative count and pagination
  truth.
- Approval scope: semantic direction accepted; authenticated provider behavior,
  moderation, reaction evidence and final human visual review remain required,
  and no `stable` promotion is implied.

#### 53.1 Valid-empty discussion

- Status: `accepted`
- Selected direction: a valid discussion with zero records composes canonical
  Empty State with truthful target-authored copy and an optional participation
  action only when an authenticated composer is actually available.
- Distinction: loading, provider error, moderation lock and unavailable comments
  are not empty and use their own target-owned page compositions.

#### 53.2 Ordering and pagination

- Status: `accepted`
- Default order: oldest first, preserving chronological discussion and reply
  context. A target may offer another verified order through canonical Select
  while projecting one authoritative ordered record set.
- Collection boundary: use finite numbered Pagination for long discussions.
  Infinite Feed semantics, unbounded insertion and neutral runtime sorting are
  excluded from v1.

#### 53.3 Configurable reactions

- Status: `accepted`
- Selected direction: v1 accepts a target-configured ordered reaction set with
  zero, one or multiple definitions per comment. Examples such as Like, Useful,
  Like/Dislike or other target vocabulary are content/configuration, not fixed
  neutral variants.
- Controlled records: Comments receives one ordered reaction array. Each item
  supplies a stable id, complete localized accessible label, target-owned
  optional icon, optional authoritative count, selected state and availability.
  An empty array omits the complete reaction surface.
- Interaction: reaction actions compose canonical Toggle Button behavior and
  emit requests; the target owns authentication, permissions, persistence,
  pending/error reconciliation, abuse policy and analytics.
- Selection policy: neutral source exposes no separate `single | multiple`
  property. After an action the target returns the complete authoritative array;
  it can preserve independent selections or atomically deselect other items for
  mutually exclusive vocabularies such as Like/Dislike. The required label
  always provides the accessible name; optional icon/count never replace it.

### 54. R0 — Ceramics Family Boundary

- Status: `accepted`
- Selected direction: every R-family component presents target-owned records.
  The target owns provenance, revisions, localization, rights, applicability,
  measurement and review of each factual or commercial claim.
- Neutral boundary: The Gallery creates no universal ceramics CMS schema and
  never infers safety, sustainability, food contact, authenticity, scarcity,
  availability or technical equivalence.
- Shopify boundary: R-family implementations remain `planned` until an approved
  first consumer and record mapping exist. Metaobject/metafield projection is a
  target option and never becomes the neutral source language.
- Approval scope: family architecture accepted; every record type, target
  mapping and visual implementation still requires its own evidence and human
  review, and no `stable` promotion is implied.

### 55. R1 — Material Library

- Status: `accepted`
- Selected direction: `R1-A`, a passive reference collection with one optional
  introduction and a required native unordered list of named material articles.
- Record anatomy: target records may supply media, classification, description
  and canonical passive Tags. Names and complete authored text carry meaning;
  the component creates no inferred taxonomy or claims.
- Interaction boundary: R1 owns no selection, filtering, comparison or
  navigation. A future interactive catalogue or linked profile system requires
  separately accepted destination, data and behavior contracts.
- Approval scope: implementation candidate only; curated record mapping, rights
  review and final human visual review remain required, and no `stable`
  promotion is implied.

### 56. R2 — Glaze Guide

- Status: `accepted`
- Selected direction: `R2-A`, a passive named sample collection with optional
  featured detail. Featured presentation never creates selected option state.
- Durable identity: every sample retains a complete visible target-supplied name
  independent of color, image or visual swatch; records and claims follow R0.
- Commerce boundary: when a glaze is a purchasable option, the product target
  composes canonical Radio or Variant Selector outside R2 and owns eligibility,
  availability, validation and selected-variant synchronization.
- Approval scope: implementation candidate only; real sample records, color/media
  evidence and final human visual review remain required, and no `stable`
  promotion is implied.

### 57. R3 — Technique Explainer

- Status: `accepted`
- Selected direction: retain a passive native ordered editorial sequence with a
  small stable step core and target-composed extensible details rather than a
  fixed universal ceramics process schema.
- Stable baseline: native list order remains authoritative and visible decimal
  ordinals remain derived presentation. The richer record introduces no current
  step, completion, navigation or Carousel/Stepper runtime.
- R0 boundary: all technical and safety content is target-authored, localized,
  reviewed and scoped for applicability; The Gallery performs no safety or
  process inference.
- Step record: `name` and `description` are required. Optional `details` and
  `media` slots let the target compose applicable materials, duration,
  temperature, tools, typed media or other reviewed content without converting
  every possible field into neutral API.
- Safety boundary: warnings and precautions remain a separate reviewed rich
  content or canonical Alert composition, never an arbitrary untyped detail.
- Studio/adapter consequence: target-specific details do not receive invented
  Studio controls or neutral field mappings; each target owns their structure,
  localization and accessibility inside the bounded slots.
- Approval scope: semantic direction accepted; slot constraints, target records
  and final human visual review remain required, and no `stable` promotion is
  implied.

### 58. R4 — Care Instructions

- Status: `accepted`
- Grouping: each instance is one passive native unordered list with a homogeneous
  neutral, recommended or avoid tone. A do/don't composition uses separate
  canonical instances rather than mixed per-item state.
- Meaning: every item carries complete visible localized guidance; supporting
  color or icon never provides “recommended” or “avoid” meaning by itself.
- Safety boundary: legal or safety warnings compose separately through reviewed
  rich content or canonical Alert and are never inferred from a care tone.
- Public variants: preserve `default | do | dont` for contract compatibility.
  Targets may author friendlier visible vocabulary such as Recommended/Avoid
  without changing the stable semantic values.
- Approval scope: semantic direction accepted; content review, localization and
  final human visual review remain required, and no `stable` promotion is
  implied.

### 59. R5 — Dimensions

- Status: `accepted`
- Selected direction: `R5-A`, present target-formatted complete measurement
  sets and perform no neutral conversion.
- Anatomy: one native description list presents the active coherent values. An
  optional unit choice composes canonical Segmented Control with native Radio
  semantics; selecting it swaps the entire preformatted set atomically.
- Target ownership: precision, rounding, locale, tolerance, available unit sets
  and preference persistence remain target-owned. R5 never mixes converted and
  supplied values.
- Diagram boundary: optional target media may supplement but never replace the
  complete visible named measurements.
- Approval scope: implementation candidate only; unit-set mapping, extreme-value
  evidence and final human visual review remain required, and no `stable`
  promotion is implied.

### 60. R6 — Kiln / Firing Info

- Status: `accepted`
- Selected direction: replace the passive arbitrary fact-list proposal with one
  specific target-supplied firing-schedule component whose table and
  temperature-over-time ramp chart are both required presentations of the same
  ordered program.
- Program baseline: model an ordered sequence of firing segments capable of
  expressing heating or controlled-cooling rate, target temperature and hold
  duration. Do not encode one manufacturer's segment-count limit, controller
  program slots or proprietary operating commands.
- Truth/safety boundary: the target owns the technically reviewed schedule,
  units, applicability, provenance and safety content under R0. The component is
  informative and never programs, starts or controls a kiln.
- Public identity: rename the component to `Firing Schedule`; retain Kiln /
  Firing Info naming/selectors only through the pre-v1 migration and remove them
  before the public contract freezes.
- Graph scale: the horizontal axis represents real accumulated program time.
  Ramp and hold widths correspond to their durations and line slope represents
  programmed temperature change over time; no equal-width schematic mode is
  exposed.
- Series scope: accept a planned program series and an optional actual observed
  temperature series. Expose `view: planned | actual | both` so a consumer can
  present either curve or compare them; `actual` is unavailable when no observed
  data exists.
- Default view: select `both` when valid actual data accompanies the required
  planned program and otherwise select `planned`. Consumers may explicitly
  choose another available view.
- Required table: one canonical Data Table row represents each planned segment.
  Planned columns expose the program values; optional target-correlated actual
  summary columns expose observed duration, reached temperature and deviation
  for the same stable `segmentId` according to the selected view. Raw observed
  samples draw the actual curve and never become thousands of table rows.
- Planned source model: require one starting temperature and an ordered segment
  array whose stable records contain rate, target temperature and hold duration.
  Neutral source derives accumulated planned time and chart points from that
  single program instead of accepting a second target-drawn planned series.
- Full-rate exception: a segment whose controller semantics are unbounded/full
  power must include a target-reviewed estimated ramp duration so it can be
  placed on the real-time axis and labelled as estimated; otherwise the schedule
  is invalid for this component.
- Numeric units: normalize planned temperatures/rates and actual samples to
  Celsius-based numeric values and elapsed seconds. `displayUnit: celsius |
  fahrenheit` converts and formats the complete table, axes, legend and tooltips
  from that one source; targets never supply duplicate unit datasets.
- Unit default: `displayUnit` defaults to `celsius`; consumers may explicitly
  select `fahrenheit` without mutating the normalized schedule or observed
  samples.
- Runtime boundary: Firing Schedule remains a controlled visualization. The
  target supplies and may replace actual timestamped samples; neutral source
  never connects to a controller, polls a sensor or claims that planned and
  observed curves are equivalent.
- Actual lifecycle: accept `actualStatus: collecting | complete`. A collecting
  series may be partial and is labelled truthfully; target updates replace the
  controlled sample array at a bounded cadence. The component never announces
  each sample, and the target may provide one concise run-status update.
- Accessible visualization: render the chart as an informative SVG/image with a
  complete localized accessible name and concise summary of visible series,
  range and relevant deviations. The Data Table is the primary detailed value
  representation; individual raw samples never enter sequential keyboard focus.
- Visual encoding: Planned and Actual differ through explicit legend and line
  treatment in addition to color. Axes remain named; hover/focus tooltips are
  supplementary and contain no otherwise unavailable information. Motion is
  unnecessary and no sample-by-sample animation is introduced.
- Approval scope: semantic direction accepted; schema validation, chart
  implementation, live/complete sample evidence, safety review and final human
  visual review remain required, and no `stable` promotion is implied.

### 61. R7 — Workshop Listing

- Status: `accepted`
- Interaction scope: discovery-only workshop summaries. R7 does not book,
  reserve, waitlist, authenticate or take payment; registration navigates
  through a complete real Link to a separately certified target flow.
- Record baseline: each native article may present target-formatted schedule,
  media, level/format and description. A full workshop may retain a useful
  details Link rather than becoming a dead or misleading card.
- Target boundary: an event source owns timezone, recurrence, capacity,
  freshness and any money facts before a target exposes the listing.
- Commercial summary: canonical Price and passive availability Badge are
  optional. They render only from current target-formatted money and capacity
  facts and never initiate or imply a reservation.
- Approval scope: semantic direction accepted; event-source integration,
  freshness evidence and final human visual review remain required, and no
  `stable` promotion is implied.

### 62. R8 — Commission Form

- Status: `accepted`
- Selected direction: `R8-A`, an embeddable commission-intake composition whose
  target owns the Form root and submission lifecycle.
- Anatomy: retain required canonical fields slot plus optional title, guidance,
  File Upload and Button actions. A standalone consumer wraps R8 in canonical
  Form/native semantics; an embedded consumer reuses its owning Form and never
  creates invalid nesting.
- Schema/provider boundary: neutral source defines no universal commission
  fields, customer record, consent schema or submission provider. The target
  owns validation, privacy, retention, response policy and confirmed outcomes.
- Upload boundary: render reference File Upload only with a verified secure
  app/backend path; omit it when the available target form cannot receive and
  retain files safely.
- Approval scope: implementation candidate only; real provider integration,
  privacy evidence and final human visual review remain required, and no
  `stable` promotion is implied.

### 63. R9 — Maker's Mark

- Status: `accepted`
- Claim boundary: passive attribution only. Require complete visible maker
  identity and allow target-supplied optional stamp media, studio text and
  formatted year; R9 makes no authenticity, provenance or authority claim.
- Context: the generic root remains neutral. Its host supplies contextual
  `aside`, contact-only `address` or other page relationship; stamp alternative
  text depends on whether it adds information or repeats the adjacent identity.
- Maker profile: accept one optional canonical Link on the complete visible
  maker identity when the target supplies a valid destination. Stamp, studio and
  year remain passive; missing destination leaves a complete attribution and no
  empty or scripted Link.
- Approval scope: semantic direction accepted; identity records, link/media
  evidence and final human visual review remain required, and no `stable`
  promotion is implied.

### 64. R10 — Edition / Numbering

- Status: `accepted`
- Selected direction: `R10-A`, one passive target-formatted edition statement
  whose label, number and total remain opaque localized strings.
- Claim boundary: neutral source does not parse or compare the strings, derive
  scarcity, validate numeric relationships, claim authenticity or infer
  inventory. Those facts remain target-owned under R0.
- Component identity: keep structured edition metadata separate from canonical
  Badge because it is neither status nor classification; a target may compose a
  separately justified Badge without changing R10.
- Approval scope: implementation candidate only; real edition records, claim
  review and final human visual review remain required, and no `stable`
  promotion is implied.

### 65. R11 — Certificate Details

- Status: `accepted-for-removal`
- Selected direction: `R11-B`, remove the duplicate Ceramics Certificate Details
  registry component before v1 and migrate every consumer directly to canonical
  Certificate.
- Migration boundary: preserve no permanent R11 profile, selector alias, second
  DOM/CSS implementation or ceramics-specific proof schema. Fixtures map only
  their truthful target content into Certificate's existing details and optional
  descriptive verification Link.
- Inventory consequence: the accepted Store Locator addition increased the
  inventory from 183 to 184; removing R11 returns the intended v1 canonical
  inventory to 183 components. Foundational Prose added no registry identity.
- Approval scope: identity removal accepted; consumer migration, generated
  inventory reconciliation and explicit human review remain required, and no
  surviving component is promoted to `stable` by this decision.

### 66. S13 — Comparison Table

- Status: `accepted`
- Shopify matrix: use a metaobject-backed variable finite matrix rather than the
  proposed two-column editor profile. Repeated target records define comparable
  column identities and aligned row criteria/values.
- Terminology: columns represent compared alternatives such as products, plans,
  finishes, services or collections; “offering” does not imply a discount or
  sale claim.
- Canonical composition: Data Table remains the sole native table,
  header-association, overflow and focus owner. S13 owns optional section title,
  measure and comparison emphasis only.
- Bounds: neutral source hardcodes no two-alternative limit, but every target
  must enforce and document a finite editorial/performance bound and preserve
  complete horizontal scrolling rather than hiding essential columns.
- Interaction direction: add a target-controlled selectable-alternative
  capability using canonical choice controls and actions; S13 may no longer be
  certified as passive-only.
- Interaction modes: expose `interaction: passive | selectable`. Both modes use
  the same target matrix and canonical Data Table; selectable progressively adds
  explicit choice controls without converting ordinary cells into grid widgets.
- Interaction default: `passive`; consumers opt explicitly into `selectable`
  only when a real target selection and action lifecycle exists.
- Selection cardinality: selectable mode exposes `selectionMode: single |
  multiple`. Single composes one native Radio group across alternatives;
  multiple composes independent canonical Checkboxes. Ordinary comparison cells
  remain passive in both modes.
- Selection default: `single`; consumers request `multiple` explicitly.
- Per-alternative actions: each target matrix column may supply one optional
  complete canonical Link or Button CTA. Activation acts on that explicit
  alternative immediately; the target owns navigation or mutation, pending,
  error, feedback and any coordinated selection change. S13 creates no universal
  Form or submission endpoint.
- Controlled selection: selected alternative id(s) and updates remain
  target-owned. A column CTA does not silently infer selection state, and missing
  action content leaves a complete selectable or passive comparison.
- Claims/emphasis: highlighted columns remain visual emphasis only.
  Recommended, savings, best value or other claims require explicit visible
  target-authored text and an approved qualification policy.
- Approval scope: semantic direction accepted; metaobject schema, interaction,
  responsive table evidence and final human visual review remain required, and
  no `stable` promotion is implied.

### 67. Global — Variant And State Orthogonality

- Status: `accepted`
- Owner note: do not mix states with variants; they are separate dimensions and
  this applies to every component.
- Contract boundary: a state inventory does not encode a selected variant in
  names such as `warningFocusVisible`. Studio combines Variant Warning with
  State Focus and neither control mutates the other.
- Implementation boundary: variant-aware focus, hover, open, selected, or other
  combined CSS selectors remain valid implementation details and evidence; they
  do not create additional contract states.
- Rollout: apply the rule to Select now and reconcile the remaining pilots only
  when each reaches its individual human-review turn. No mixed-axis component
  may be promoted to `stable`.
- ADR: `docs/decisions/0274-variant-state-orthogonality.md`.

### 68. A3 — Select Required Indicator

- Status: `accepted`
- Owner note: turning Required on or off must have a visible effect; show an
  asterisk beside the label and center it with the text instead of placing it in
  the conventional raised position.
- Semantic boundary: native `required` remains the sole constraint-validation
  authority and the enhanced trigger mirrors it with `aria-required`; the
  asterisk is decorative and does not enter the accessible label.
- Visual direction: use the existing label-marker convention with a Select
  optical alignment adjustment and the current label color, including its active
  validation variant.
- Visual result: accepted. After seeing the centered marker in Select, the owner
  said the Required treatment looked excellent and requested it across all
  required-capable fields.
- Approval scope: the marker treatment is approved and globalized by decision
  69; Select remains `pilot` until the owner explicitly approves the complete
  component as stable.

### 69. Global — Required Field Indicator Standard

- Status: `accepted`
- Owner note: apply the centered Select required asterisk to every field that
  exposes Required so the visual treatment is standardized.
- Visual direction: one decorative `*`, optically centered with the visible
  label, legend, or primary field instruction; it inherits the text color and
  is not raised like a superscript.
- Semantic boundary: native `required`, native validity, or explicit
  `aria-required` remains authoritative. The marker is excluded from accessible
  names and does not make a field required by itself.
- Group boundary: named choice groups display the marker once on their legend,
  never on every option. Checkbox and Switch keep it on their single label.
- Composition boundary: controls without an owned visible label use Field
  Wrapper or Fieldset composition; accessible-name-only targets do not invent a
  visible label solely for the marker.
- Rollout: the canonical CSS, contracts, Studio fixtures, composite examples,
  and target projections are reconciled together under ADR 0275. No component
  is promoted to `stable`; each still requires its individual human approval.
- ADR: `docs/decisions/0275-required-field-indicator-standard.md`.

### 70. A3 — Select Final Stability Approval

- Status: `accepted`
- Owner approval: after live interaction in Studio and review in Light and Dark,
  the owner explicitly answered yes to promoting the complete Select and asked
  to continue with the next component.
- Accepted surface: the progressively enhanced single-choice popup, native
  fallback and form ownership, Default/Error/Success/Warning presentation,
  independent Variant and State controls, keyboard and dismissal behavior,
  responsive popup sizing, and the centered Required marker.
- Deferred motion: popup entrance and exit animation remains a future
  cross-target motion decision. The owner already recorded it as non-blocking
  for v1; no React-only dependency is introduced.
- Result: Select contract status changes from `pilot` to `stable` on
  2026-08-12. No other component is promoted by this approval.

### 71. D1 — Product Card Hierarchy And Quick Look

- Status: `accepted`
- Owner reference: use the supplied product-grid screenshot as visual
  inspiration rather than literal target markup.
- Hierarchy: artist/vendor and piece name form the close identity pair;
  description and Price occupy visibly separated spacing tiers.
- Description: use realistic longer copy, keep the complete string in the DOM,
  and visually show no more than two lines with automatic ellipsis.
- Action: replace Quick Add with a persistent Quick Look request. Quick View may
  compose add-to-cart through Product Form, but Product Card does not mutate the
  cart directly.
- Surface: remove whole-card hover translation and shadow growth. Optional media
  replacement/scale remains independent image behavior.
- Typography: Product Card uses one UI sans/body family; no editorial serif is
  mixed into this catalog surface.
- Approval scope: these directions are accepted for implementation and live
  review. Product Card remains `pilot` until the owner sees the result and
  explicitly approves the complete component as stable.
- ADR: `docs/decisions/0276-product-card-hierarchy-description-and-quick-look.md`.

### 72. Global — Interface Numerals And Editorial Serif Boundary

- Status: `accepted`
- Owner note: remove the crossed/slashed zero from every number presented by the
  design system; the treatment is no longer desired.
- Numeric boundary: Price and Stat were the only canonical components exposing
  the OpenType `zero` switch. The property, Studio control, data attributes, and
  adapter parameters are removed, and canonical CSS fixes `zero` off.
- Typeface boundary: catalog, commerce, control, and other interface surfaces
  use the UI body family. Serif is reserved for explicitly editorial article or
  prose composition.
- Rollout: Product Card is reconciled now. Other pilots adopt the typeface rule
  during their individual review so the systemic decision does not promote or
  silently redesign unrelated components.
- Approval scope: Price and Stat remain `pilot`; this global decision changes
  their public API but does not constitute visual stability approval.
- ADR: `docs/decisions/0277-interface-numerals-and-editorial-serif-boundary.md`.

### 73. D1 — Product Card Quick Look Placement And Width

- Status: `accepted`
- Owner follow-up: restore Quick Look to its earlier placement over the product
  image while preserving the new compact width instead of the former fill-width
  treatment.
- Interaction: reveal the overlay on fine-pointer hover or focus-within and keep
  it visible when hover is unavailable so the action remains discoverable and
  keyboard/touch accessible.
- API boundary: this changes presentation and state behavior only. Quick Look
  still requests target-owned Quick View and remains separate from cart mutation.
- Approval scope: the follow-up is accepted for implementation and live review.
  Product Card remains `pilot` until the owner explicitly approves the complete
  component as stable.
- ADR: `docs/decisions/0278-product-card-quick-look-overlay-width.md`.

### 74. D1 — Product Card Artist, Price, And Quick Look Alignment

- Status: `accepted`
- Artist: expose a reversible visibility control so the optional artist name can
  be hidden without deleting its configured text.
- Price: make canonical Price required and always visible outside the optional
  footer; the footer may contain only an explicitly composed secondary action.
- Alignment: align the Quick Look Button with the logical start edge of the text
  and Price columns below it.
- Target boundary: Shopify maps the same artist visibility and required Price
  anatomy; Price formatting remains owned by canonical Price.
- Approval scope: these changes are accepted for implementation and renewed live
  review. Product Card remains `pilot` until the owner explicitly approves the
  complete component as stable.
- ADR: `docs/decisions/0279-product-card-artist-price-and-overlay-alignment.md`.

### 75. D1 — Product Card Unified Compact Inset

- Status: `accepted`
- Alignment: use the `New` Badge's `12px` inset as the shared lateral spacing
  for Badge, text, required Price, Quick Look, and optional footer actions.
- Lower edge: use the same compact value below Quick Look and below the final
  Price or optional footer action instead of the previous wider system gap.
- Hierarchy: retain the accepted vertical spacing between artist, title,
  description, and Price; this decision changes the outer content inset only.
- API boundary: the value remains private to Product Card composition. Remove
  the no-longer-effective public spacing reference rather than inventing a new
  component token.
- Approval scope: accepted for implementation and renewed live review. Product
  Card remains `pilot` until the owner explicitly approves the complete result.
- ADR: `docs/decisions/0280-product-card-unified-content-inset.md`.

### 76. D1 — Product Card Final Stability Approval

- Status: `accepted`
- Owner wording: after reviewing the compact inset live, the owner said
  "Listo pasemos al siguiente componente" in direct response to the explicit
  Product Card stability question.
- Approved baseline: close artist/title hierarchy, optional reversible artist,
  two-line description, always-visible Price, compact media-overlay Quick Look,
  stationary Card surface, UI body typography, ordinary zeroes, and the unified
  `12px` Badge/content/lower-edge inset in Light and Dark.
- Renderer boundary: Exhibit and Studio retain the same registered renderer,
  fixture, canonical classes, and implementation; Studio only adds inspection.
- Result: Product Card contract status changes from `pilot` to `stable` on
  2026-08-12. No other component is promoted by this approval.

### 77. A14 — Divider Parent-Owned Spacing And Purpose

- Status: `accepted`
- Owner observation: `Default` and `Section` looked identical because Section
  changed only external whitespace; `Meaning: Decorative | Structural` was also
  unclear because it intentionally changed no visual styling.
- Variant boundary: remove `Section`. Keep only `Default` and `Decorative` as
  visual styles.
- Layout boundary: Divider owns no external margin; its parent stack, grid, or
  region owns the space around it.
- Semantic boundary: preserve the public `semantics` property, but present it in
  Studio as `Purpose: Visual only | Semantic` and state explicitly
  that it changes accessibility exposure rather than appearance.
- Approval scope: accepted for implementation and renewed live review. Divider
  remains `pilot` until the owner explicitly approves the complete result.
- ADR: `docs/decisions/0281-divider-parent-owned-spacing-and-purpose.md`.

### 78. Studio Customize — Canonical Gallery Control Dogfooding

- Date: 2026-08-25.
- Status: `accepted`
- Owner observation: the Variant, Orientation, and Purpose selectors in
  Customize overlapped and did not appear to be the same controls being built
  by The Gallery.
- Root cause: `StudioInspector` rendered a site-owned `div` with selected
  Segmented Control class names, fixed its height to `28px`, and omitted the
  canonical fieldset, legend, and options wrapper. Canonical segment labels kept
  their `44px` minimum height and overflowed into adjacent rows.
- Decision: metadata-driven segmented selectors must render the shared
  `SegmentedControlArtwork` and its complete native radio anatomy. The common
  Studio row places one visible presentation label in its `64px` left column
  and the full-width option surface in the right column. The renderer's native
  legend remains the accessible group name but is visually hidden to avoid a
  duplicate label and native fieldset displacement. The surface uses the same
  `28px` editor height as Rule, Input, and Select controls.
- Scope: the shared fix applies to all `83` segmented selectors across `63`
  Customize panels. Sets of more than four choices use the compact Select
  presentation instead of compressing or stacking labels; no component contract
  status changes as a result.
- ADR: `docs/decisions/0282-studio-inspector-canonical-control-dogfooding.md`.

### 79. Studio — Preview Top Alignment

- Date: 2026-08-25.
- Status: `accepted`
- Owner observation: short component previews looked disconnected from
  Customize because the fixed-height stage centered them far below the top of
  the inspector card.
- Decision: in the desktop two-column Studio workspace, the component preview
  begins at the same vertical coordinate as Customize. The stage remains
  horizontally centered and keeps lateral and lower breathing room, but no
  longer adds a desktop top inset or centers content vertically.
- Scope: the alignment is Studio presentation only. It does not change a
  component renderer, fixture, contract, target adapter, Exhibit composition,
  or stability status. Overlay and viewport fixtures retain their explicit
  internal positioning behavior.
- ADR: `docs/decisions/0283-studio-preview-top-alignment.md`.

### 80. A14 — Divider Final Stability Approval

- Date: 2026-08-25.
- Status: `accepted`
- Owner wording: in direct response to “¿Apruebas ahora el Divider completo para
  promoverlo a `stable`?”, the owner answered “Perfecto, vamos con el siguiente
  componente.”
- Approved baseline: Default and Decorative visual styles; independent
  horizontal and vertical orientation; parent-owned external spacing; Visual
  only and Semantic purpose; native separator exposure; canonical compact
  Customize controls; and top-aligned Studio preview in Light and Dark.
- Renderer boundary: Exhibit and Studio retain the same registered renderer,
  fixture, canonical classes, and implementation. The inspector and preview
  alignment are site-owned presentation only.
- Result: Divider contract status changes from `pilot` to `stable` on
  2026-08-25. No other component is promoted by this approval.

### 81. B1 — Card Fine-Pointer Hover Treatment

- Date: 2026-08-25.
- Status: `accepted`
- Owner wording: after comparing Stationary, Shadow only, and Current, the
  owner answered “Me gusta el actual.”
- Decision: retain the current fine-pointer treatment. Default and Elevated
  lift by `2px` and advance their shadow; Flat remains stationary and
  shadowless; an optional media image may scale to `1.03`.
- Input and motion boundary: coarse/non-hover pointers keep the resting state;
  reduced-motion mode removes transitions and hover transforms. Hover remains
  decorative and does not create an interaction contract.
- Composition boundary: specialized components may override the base hover
  only through their own accepted decision. Product Card retains its approved
  stationary surface while still composing canonical Card.
- Approval scope: Hover is accepted. Card remains `pilot` until the complete
  component receives explicit stability approval.
- ADR: `docs/decisions/0284-card-fine-pointer-hover-treatment.md`.

### 82. Card Family — Canonical Base And Review Identity

- Date: 2026-08-25.
- Status: `accepted`
- Owner direction: specialized cards should share the canonical Card base;
  Review Card is too complex to be defined as merely a card and becomes Review.
- Composition: Author Card uses the default Card surface and canonical Flat for
  Compact; Artist Card uses canonical Flat; Product Card and Article Card keep
  their existing Card composition.
- Boundary: Review retains its self-contained article, Rating, photos,
  helpfulness, and reply contract without a Card dependency. Gift Card remains
  a commerce identity rather than a layout-card family member.
- Approval scope: apply the structural changes now, but keep every affected
  component at its current maturity until its own live review is complete.
- ADR: `docs/decisions/0285-card-family-composition-and-review-identity.md`.

### 83. B9/B10 — Consolidate Hover Card Into Popover

- Date: 2026-08-25.
- Status: `accepted`
- Owner direction: Hover Card and Popover represent the same floating-surface
  need; keep only Popover.
- Arrow: add a public option to show or hide the bubble “pico”, named
  `showArrow` in the target-agnostic contract and “Show arrow” in Studio.
- Migration: remove Hover Card from the active pre-v1 inventory rather than
  preserving a duplicate alias; current component count becomes 182.
- Approval scope: Popover remains `pilot`; final visuals and target activation,
  positioning, collision, and focus policy still require their own review.
- ADR: `docs/decisions/0286-hover-card-consolidation-into-popover.md`.

### 84. B1 — Card Editorial Fixture And Compact Inset

- Date: 2026-08-25.
- Status: `accepted`
- Owner observation: the CSS-drawn vessel did not read as the image placeholder
  used by the other component fixtures. The `32px` content inset and the full
  body-to-footer separation also made the text composition feel too loose.
- Fixture: the one renderer shared by Exhibit and Studio uses the existing
  licensed `textured-vase.jpg` site fixture with informative alternative text.
  Card still exposes no image-source property and production media stays owned
  by the consumer or target.
- Spacing: Card body and footer use the existing
  `--tg-space-component-xs` inset, currently `16px` in the reviewed desktop
  mode. This compacts both outer text padding and the description-to-footer
  separation without adding a density or arbitrary-padding property.
- Approval scope: these directions are accepted for implementation and renewed
  live review. Card remains `pilot` until the owner explicitly approves the
  complete refined component.
- ADR: `docs/decisions/0287-card-editorial-fixture-and-compact-inset.md`.

### 85. Global Studio — Numeric Units, Token Names, And Label Columns

- Date: 2026-08-25.
- Status: `accepted`
- Owner observation: Appearance fields accepted values that produced no
  visible result, token names leaked `//`, and the fixed label column wrapped
  ordinary field names too early.
- Numeric editing: a simple measurement or duration token accepts a number in
  the input while Studio displays its unit, such as `px` or `ms`, as a badge
  beside the token name. Studio combines them into a valid preview value; a
  malformed suffix cannot replace the last valid value.
- Composite boundary: multi-part CSS values such as shadows remain editable as
  complete text and do not receive a false single-unit badge.
- Naming: display labels remove technical custom-property and token-family
  prefixes before presenting the remaining hierarchy with `/`; raw identifiers
  remain available as titles.
- Layout: the complete Customize panel shares a label column sized to the
  widest visible label across all groups up to `128px`. Controls fill the
  remaining right column, and labels wrap only when they exceed that cap.
- Scope: this is a shared, site-owned Studio inspector rule. It applies to all
  Customize panels without changing component contracts, adapters, fixtures,
  or maturity status. Card remains `pilot`.
- ADR: `docs/decisions/0288-studio-inspector-numeric-units-token-names-and-label-columns.md`.

### 86. Global Studio — Structured Shadow Token Editing

- Date: 2026-08-25.
- Status: `accepted`
- Owner observation: raw box-shadow strings are not user friendly; Figma makes
  the anatomy understandable by separating the values into named controls.
- Decision: Studio renders shadow tokens as inline structured editors with X,
  Y, Blur, Spread, Color, and Opacity fields rather than requiring raw CSS.
- Input behavior: dimensional fields accept numbers and display their units;
  color has a picker and hexadecimal field; opacity is a percentage. Every
  valid edit is serialized to the same shadow custom property and reflected in
  the live preview.
- Safety: incomplete values keep the last valid preview. Blur cannot become
  negative, opacity is bounded from `0` to `100`, signed offsets and spread are
  retained, and reset restores the canonical theme value.
- Scope: the shared rule covers the current 22 shadow controls across 20 Studio
  definitions. It changes only the site-owned inspector, not source tokens,
  component contracts, adapters, Exhibit fixtures, or maturity. Card remains
  `pilot`.
- ADR: `docs/decisions/0289-studio-structured-shadow-token-editor.md`.

### 87. B1 — Card Final Stability Approval

- Date: 2026-08-25.
- Status: `accepted`
- Owner wording: after the editorial fixture, compact inset, and structured
  shadow controls were reviewed live, the owner said “Ok listo aprobado el
  componente, cual es el siguiente?”
- Approved baseline: retain Card as a passive compositional surface with
  Default, Flat, and Elevated variants; independent Default and Hover states;
  the accepted fine-pointer lift/media zoom; compact `16px` content inset; and
  the shared editorial fixture.
- Inspector and modes: the approval includes the structured Studio Appearance
  controls plus the reviewed Light/Dark, coarse-pointer, reduced-motion, forced
  colors, focus, and content-resilience behavior.
- Renderer boundary: Exhibit and Studio keep the same registered renderer,
  fixture, canonical classes, and implementation. Studio adds only its
  customization interface.
- Approval scope: promote only Card from `pilot` to `stable`. Product Card,
  Article Card, Author Card, Artist Card, Review, and other related components
  keep their independently recorded maturity.
- ADR: `docs/decisions/0290-card-final-stability-approval.md`.

### 88. A16 — Button Group Configurable Studio Fixture

- Date: 2026-08-26.
- Status: `accepted`
- Owner observation: Studio did not allow configuring either the number of
  buttons or the visible label of each Button.
- Decision: add a bounded Button Group documentation fixture with a Button count
  field and one editable text field per rendered child.
- Composition boundary: every rendered child remains a canonical Button. The
  fixture controls do not add `buttonCount`, `buttons`, or child-label properties
  to Button Group's public contract; consumer and target composition still own
  the real children.
- Parity: Exhibit and Studio retain the same registered renderer and initial
  three-button fixture. Interactive Studio changes are preview state, and Reset
  restores the shared initial fixture.
- Approval scope: the fixture controls are accepted for implementation and
  renewed live review. Button Group remains `pilot` until the complete component
  receives explicit stability approval.
- ADR: `docs/decisions/0291-button-group-configurable-studio-fixture.md`.
