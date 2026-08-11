# Component Dossier: Urgency Indicators

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify truth-source and future-target
boundaries

Contract: `components/contracts/urgency.contract.json`

## Recommendation

Keep G8 as a passive, text-complete commercial signal with an explicitly
selected claim type. The neutral component should render one concise target-
supplied message plus an optional decorative cue. It should have no default
claim, generated count, threshold, live-region role, focus behavior, animation,
timer, listener, observer, request, analytics or verification runtime.

Refine the existing Low Stock, Selling Fast, Viewers and Recent Sale classes as
semantic claim types, not interactive states or feedback severities. Require a
non-empty message and a valid explicit type; omit the whole root when either is
invalid. Keep every cue decorative because the complete meaning must remain in
visible text.

Remove the infinite pulse. WCAG treats automatically blinking content lasting
more than five seconds as requiring a pause/stop/hide mechanism unless it is
essential. A decorative marketing dot or flame is not essential and should not
force a control into this otherwise passive component. Reduced-motion handling
alone does not make the continuously animated default conforming.

ADR 0252 accepts all four types and their qualification boundaries. Do not add
a Shopify target until that adapter documents and proves its concrete source,
threshold/window, selected-variant/market scope where applicable, freshness,
privacy and omission behavior. A reusable snippet that accepts arbitrary
merchant copy without evidence would make the adapter easier to ship while
weakening the actual v1 goal.

## Purpose And Limits

- Presents one short commercial signal related to the current product, variant,
  offer or transaction context.
- Owns a passive text/cue composition and one explicitly selected claim type.
- Requires visible wording that communicates the complete claim without color,
  icon or motion.
- May be authored initially by a target or updated by a target when verified
  source data changes.
- Does not infer Low Stock from a universal threshold or aggregate unrelated
  variants/locations.
- Does not calculate sales velocity, current viewers, recent-sale recency,
  scarcity, popularity, conversion probability or customer-specific urgency.
- Does not verify, cache, refresh, poll, subscribe to or announce target data.
- Does not own evidence, qualification, jurisdiction, disclosure, consent,
  privacy, personalization, experiments or analytics.
- Does not own a product link, purchase action, countdown, toast, alert, badge,
  stock control or inventory service.
- Does not create an interruption, keyboard stop or live announcement simply
  because the word “urgency” appears in its name.

## Current Repository Baseline

- Registry identity `G8`, category `marketing`, dependency depth `0` and review
  order `90`; no canonical dependencies.
- Contract `0.2.0`, `pilot`: passive root, generated Low Stock cue, optional
  Selling Fast SVG and Viewers emphasis; four claim variants; one default state,
  one animated state; required `message` and required `variant` properties.
- ADR 0081 already requires the semantic variant property so the registry's
  technical `default` marker cannot become a runtime claim default.
- `renderUrgency()` nevertheless falls back to `low-stock` when the value is
  absent. It also renders the message without trimming or validating it, so an
  empty root remains possible.
- The renderer supplies a decorative Flame for Selling Fast, Eye for Viewers and
  Clock for Recent Sale, while Low Stock relies on a generated pseudo-element.
  Contract anatomy describes only some of these cases and exposes a `strong`
  Viewers selector that the string-only renderer cannot produce.
- Canonical CSS treats Selling Fast as feedback Error, even though it is not a
  system failure. Current Polaris guidance reserves critical treatment for
  statuses requiring urgent action, not generic promotional pressure.
- Low Stock and Selling Fast animate forever at `1.5s`; reduced-motion removes
  the animation only when the user has already expressed that preference.
- The root uses hardcoded `6px` gap, derived `87.5%` Body size, hardcoded weight
  `600`, physical `max-width` and generic `svg` descendant selectors. It lacks a
  complete family/size/line-height typography profile and a named message part.
- Existing long-text hardening uses `overflow-wrap:anywhere`, but cue alignment,
  direct-container behavior, large/localized content and 200% text are not
  evidenced.
- The shared site fixture says `Sample inventory: 3 pieces remain`; it is clearly
  documentary in surrounding copy but still looks like a real stock claim when
  isolated. “Example” should remain visibly part of the fixture.
- Studio's Appearance panel lists the Error token first even while the active
  Low Stock preview uses Warning; the metadata therefore does not accurately
  explain the rendered treatment.
- Studio's four-option segmented control wraps labels awkwardly at narrow
  inspector widths. That is site presentation metadata, not evidence that the
  component itself overflows.
- Exhibit and Studio already use the same registered `MarketingStudio` renderer
  and fixture. Existing parity reports pass at Mobile/Desktop with zero
  focusable descendants.
- Existing screenshots under
  `output/playwright/parity/marketing/urgency-*.png` cover only Low Stock,
  Mobile and Desktop. They do not cover all types, Tablet/XL, dark, forced
  colors, long/localized content or motion.
- Shopify has copied Marketing CSS only. Its manifest reports `css-ready`, no
  Liquid/schema/data mapping, and behavior owned by a missing Shopify adapter.
- Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame
  `943:7` and inspector `1020:480`. These are the generic Button/Studio pilot,
  not G8-specific color, icon, copy, alignment, placement or state evidence.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML `strong`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-strong-element) | `strong` communicates strong importance, seriousness or urgency for selected content. | Native text can express importance when the target's wording requires it; G8 should not manufacture emphasis around a plain-string API or make decorative cues semantic. |
| [WAI-ARIA `status`](https://www.w3.org/TR/wai-aria-1.2/#status) | `status` is a polite, atomic live region for advisory changes and should not receive focus because its content changed. | Static/present-at-load G8 needs no role. A target may announce a meaningful verified update separately, but a live region is not a default presentation feature. |
| [WAI-ARIA `alert`](https://www.w3.org/TR/wai-aria-1.2/#alert) and [APG Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) | Alert is assertive, important and usually time-sensitive; frequent interruptions and auto-disappearing alerts harm usability. | Marketing scarcity/social-proof copy is not automatically an Alert. Keep G8 passive and non-interruptive. |
| [WCAG 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color) | Meaning cannot be conveyed by color alone. | The complete claim stays in visible text; tone and cue only reinforce it. |
| [WCAG 1.4.3 Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) | Normal text requires sufficient text/background contrast. | Mixed Warning/primary and neutral text must be measured in light/dark; colored micro-cues cannot rescue low-contrast wording. |
| [WCAG 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | Automatically blinking content lasting more than five seconds needs a stop/pause/hide mechanism unless essential. | Remove the infinite pulse instead of adding unnecessary controls/runtime to a passive message. |
| [APG pattern inventory](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG has Alert but no Urgency Indicator widget. | No keyboard, focus or live pattern applies to a static commercial signal. |
| [Open UI catalogue](https://open-ui.org/) | Current research/proposals include Badge and common controls but no Urgency/Scarcity component. | There is no platform consensus for claim types, thresholds, data sources or freshness. |
| [Radix Primitives catalogue](https://www.radix-ui.com/primitives/docs/overview/introduction) | Radix has no Urgency/Scarcity primitive. | Do not import React behavior or infer controlled/uncontrolled state; ordinary target content is sufficient. |
| [Polaris Badge migration](https://shopify.dev/docs/apps/build/customer-accounts/migrate-to-web-components/badge) | Polaris demonstrates a compact `Low stock` Badge and separates tone, color and optional icon. | A Shopify UI may map a proven low-stock status to Badge, but G8 remains a text-complete storefront composition rather than consuming canonical Badge or copying target APIs. |
| [Polaris Badge guidance](https://shopify.dev/docs/api/customer-account-ui-extensions/latest/web-components/feedback-and-status-indicators/badge) | Badges stay short, attach to an object and reserve critical/warning attention for statuses requiring action. | G8 must remain contextual, concise and avoid treating “selling fast” as an Error condition. |
| [Shopify Liquid `variant`](https://shopify.dev/docs/api/liquid/objects/variant) | Liquid exposes availability, tracking, inventory policy and inventory quantity; when inventory is not tracked, quantity can mean items sold. | Low Stock requires checking tracking/policy and the selected variant, not blindly comparing a number. Threshold and update policy remain owner/target decisions. |
| [Shopify Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements) | Themes must not mislead with fake urgency, including fictitious stock levels or viewer activity. | No arbitrary claim preset or unverified merchant-only snippet can be called target-ready. |

The references converge on passive, contextual, text-complete presentation and
target-owned truth. They do not define universal low-stock thresholds, sales
velocity, viewer counting, recency windows or source freshness.

## Mature-System Comparison

- HTML provides the only stable semantic primitive needed: ordinary paragraph
  text, with optional `strong` only when a target intentionally marks the
  important portion.
- ARIA Alert/Status roles describe dynamic announcements, not a visual style or
  a truth model. Applying them by default would turn promotional copy into an
  unnecessary interruption.
- Open UI and Radix have no analogous behavior primitive. Their absence argues
  against a neutral runtime, not against a small Gallery presentation contract.
- Polaris Badge is object-attached, terse status metadata. G8 permits a complete
  sentence and belongs near product content, so canonical Gallery Badge remains
  a separate selection rule.
- Shopify storefront Liquid can substantiate a narrow Low Stock case only when
  inventory is tracked and the selected variant/policy/threshold are handled.
  It cannot natively substantiate current viewers, sales velocity or recent
  purchase claims without an external authoritative source.

## Owner Reference Analysis

The registered Figma nodes validate the generic Exhibit/Studio shell only. They
do not approve G8's Warning/Error/neutral palette, cue icons, dot size, type,
weight, line height, spacing, alignment, placement, wrapping, motion or four
claim types.

The baseline screenshots show one small amber Low Stock line. The cue is subtle
and the wording is readable, but the captures cannot answer:

1. whether Warning is the desired family for Low Stock/Selling Fast;
2. whether every claim type gets a decorative cue and which visual language;
3. whether the message should be Body Small semibold or another complete type
   profile;
4. whether placement is under price, variant selection, purchase controls or
   another object; and
5. how all four accepted types should differ visually without manufacturing
   pressure beyond their complete text.

These remain human/product review boundaries after technical refinement.

## Anatomy And Canonical Composition

| Part | Required | Semantic element | Owner | Direction |
| --- | --- | --- | --- | --- |
| Root | yes | `p.urgency` | G8 + target | One valid, passive contextual statement; omit when type/message is invalid. |
| Cue | no | `.urgency__cue[aria-hidden=true]` | G8/target presentation | Decorative dot/icon only; stable named part, never a source of meaning or motion. |
| Message | yes | `.urgency__message` | target | Non-empty visible, localized, text-complete claim. |

Do not create separate anatomy for every icon or let a generic descendant SVG
selector become the public contract. No Alert, Status, Badge, Button, Link or
Tooltip dependency is required.

## Claim, State, Mode And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Claim type | Required explicit `low-stock`, `selling-fast`, `viewers` or `recent-sale`; no runtime fallback. |
| Low Stock | Warning-family presentation; target proves purchasable tracked inventory for the exact selected variant/current market and owns threshold/policy. |
| Selling Fast | Warning-family signal backed only by verified valid confirmed-purchase velocity in a documented window; not engagement or Error feedback. |
| Viewers | Neutral approximate bucket from distinct active product sessions in a documented short window above a privacy minimum; never an exact live count. |
| Recent Sale | Neutral anonymous general statement backed by a valid confirmed purchase in a documented freshness window; no identity, location or relative-time counter. |
| Required content | Non-empty visible self-contained message plus valid type. |
| Empty/invalid | Trim message; omit complete root for blank text or unknown/missing type. |
| Cue | Optional, decorative and type-appropriate; omitted without loss of meaning. |
| Interaction | None; no focus, pointer, keyboard, dismissal or event. |
| Controlled/uncontrolled | Not applicable; target supplies current content/type. Dynamic data lifecycle is outside the component. |
| Live announcement | None by default. A target may announce a meaningful verified change through a separate context-owned policy. |
| Motion | None. No pulse, transition or reduced-motion exception needed. |
| Theme | Text and cue use semantic Warning/primary/secondary tokens with measured contrast. |
| Forced colors | Visible text remains; decorative cue may adapt/disappear without information loss. |
| Responsive | Inline-size intrinsic wrapping from the component container; no viewport query. |
| Localization | Full message supplied by target; no concatenated count/unit grammar in the base. |
| Extreme content | Long/localized/unbroken/RTL/effective-200% text wraps without clipping or separating cue from its first line. |

## Public API And Ownership

Expose only:

- `message` — required non-empty visible target-supplied claim; and
- `variant` — required explicit semantic claim type backed by current target
  evidence.

The cue is a private/target visual part, not an icon-name public property.
Targets can map an approved visual without coupling the base to Lucide, Polaris,
Shopify or a native symbol library.

Do not expose `count`, `threshold`, `viewerCount`, `salesVelocity`, `soldAt`,
`recencyWindow`, `inventoryQuantity`, `inventoryPolicy`, `tracked`, `verified`,
`source`, `sourceTimestamp`, `refreshInterval`, `polling`, `live`, `announce`,
`tone`, `color`, `icon`, `pulse`, `duration`, `gap`, `fontWeight`, `placement`,
`loading`, `error`, `event` or `analytics`. They are target data/policy,
private presentation, or responsibilities of another component/service.

G8 has no controlled/uncontrolled strategy because it owns no mutable state. A
React/Angular target receives current props. Shopify renders current target data.
If content changes after render, the target owns refresh and announcement policy.

## Canonical Selection Rules

| Component | Selection rule |
| --- | --- |
| Urgency Indicators | One current target-backed commercial signal expressed as a complete sentence. |
| Badge | Compact status/metadata label attached to an object; not a full promotional claim. |
| Alert / Banner | Important dynamic/system message; may require live announcement and broader surface. |
| Social Proof Notification | Transient overlay-like purchase activity with visibility/dismissal lifecycle. |
| Countdown | Current remaining-time projection with separate deadline/expiry ownership. |
| Stock/availability control | Commerce data/service and purchase eligibility; not G8 presentation. |

No canonical dependency is justified. If G8 is placed inside Product Info or
Product Form, those compositions own placement and current variant data.

## Token And Hardcoded-Value Audit

| Current fact | Direction |
| --- | --- |
| `gap: 6px` | Map through existing element-gap token into a private ratio; do not expose gap. |
| `calc(body * .875)` | Replace with complete semantic Body Small size/line-height/family. |
| `font-weight: 600` | Use existing semantic semibold token inside the complete shorthand. |
| Physical `max-width` | Replace with logical `max-inline-size` and named message containment. |
| `6px` generated dot | Keep equivalent private rem geometry on the named cue; no public size token. |
| Generic `svg` width/height `16px` | Scope logical `1rem` geometry under `.urgency__cue`; target asset remains decorative. |
| Error color for Selling Fast | Remove Error feedback semantics; map to Warning-family presentation pending owner visual review. |
| Warning/Error 55% mixes | Keep the existing proven contrast-oriented mixing direction as private color composition; verify both themes. |
| `1.5s` infinite pulse/keyframes | Remove entirely. |
| Reduced-motion G8 exceptions | Remove because G8 authors no motion. |

No new token or token layer is needed. Cue geometry, internal gap, mix ratio and
alignment remain private.

## Responsive, Content And Accessibility Test Plan

- Paired Exhibit/Studio Mobile `390x844`, Tablet `768x1024`, Desktop
  `1440x1000` and XL `1920x1200` captures from one renderer/fixture.
- Direct roots at `96`, `120`, `160`, `240`, `320`, `520` and `800px` with
  client/scroll equality and descendants contained.
- Every claim type; message with/without cue; invalid type; blank/whitespace
  message; root omission.
- Short, long, localized, Arabic RTL, unbroken token and effective-200% text.
- Verify native `p` semantics, complete visible text, hidden cue, zero focusable
  descendants, zero live regions and zero accessible icon duplication.
- Light/dark contrast for each claim text; forced colors; reduced motion reports
  no animation or transition in any preference.
- Confirm no hover/focus/pointer visual state and no event handlers.
- Exact normalized Exhibit/Studio root DOM, computed typography/color/geometry
  and equal-width opaque-canvas visual parity.
- Source/generated CSS identity across canonical, Webflow and Shopify.
- DOM/runtime inspection: zero G8 listener, timer, observer, request, layout read,
  client, bundled asset or neutral JavaScript selector.

## Performance Budget

- Baseline G8 CSS slice is `1,134 B` raw / `510 B` deterministic gzip.
- The current whole-program snapshot places Marketing at `4,782 / 4,198 B`
  gzip and Neutral Web CSS at `71,754 / 65,536 B`; both documented later-program
  gaps are separate from G8's historical refinement delta.
- Shared runtime is currently `22,807 / 8,192 B`; G8 still contributes `0 B`.
- G8 contributes zero neutral JavaScript/runtime/assets today.

Refinement must remove the pulse/keyframes before adding named anatomy and
complete typography, remain under the Marketing ceiling, and preserve zero
neutral runtime. No target adapter may add polling merely to make a demo feel
live.

## Target Translation

| Target | Translation | Status/boundary |
| --- | --- | --- |
| Neutral Web | Conditional native paragraph with named hidden cue and message; explicit claim class; zero runtime/live role. | Implementable now. |
| Shopify | Low Stock may consume qualified tracked current-variant/current-market inventory; other types require a verified app/backend source under ADR 0252. | Planned until concrete source, policy, refresh/expiry, privacy and omission proof exists. |
| React / Angular | Thin conditional wrapper around current `message` + `variant`; target data/state owns changes. | Planned; no base framework dependency. |
| Webflow / Framer | CMS/integration supplies current approved message/type; static editor copy cannot masquerade as live data. | Conceptual. |
| Figma | Static named visual examples only, clearly labelled as examples; no counts, verification or live behavior. | Planned; G8-specific reference missing. |
| SwiftUI / Compose | Native passive Text/HStack-style composition with decorative symbol and target-owned data lifecycle. | Planned. |

## Accepted Policy And Adapter Gates

ADR 0252 retains all four types and defines their evidence semantics. A
production adapter must now document and prove its concrete authoritative
source, numeric threshold or time window, selected-variant/current-market scope
where applicable, qualification, bounded refresh/expiry, privacy minimum,
invalid/stale omission and placement. Neutral G8 consumes only the already
qualified type and complete localized message.

These requirements must not be replaced with arbitrary theme settings, fixed
demo counts, resetting clocks or generic `verified` booleans. Adapter proof and
human visual approval remain gates, but the neutral architecture is no longer
open.

## Certification Exit Criteria

- Contract, registry, CSS, renderer, MDX and Studio metadata agree on required
  explicit claim type, non-empty message, cue/message anatomy and zero motion.
- Invalid/blank output omits the complete root; no runtime Low Stock fallback.
- Text alone communicates the claim; cue is hidden and no live/focus/keyboard
  semantics are added.
- All four claim types, direct containers, localization, 200%, themes, forced
  colors and reduced motion pass.
- Exhibit and Studio share exact renderer/fixture DOM and equal-width visual
  evidence across four viewports.
- G8 adds zero neutral runtime; current family/global gaps remain documented
  separately and this reconciliation adds no CSS.
- Web/Webflow/Shopify copied CSS is source-identical; Shopify remains planned
  until target-specific proof satisfies ADR 0252.
- Automated gates pass. G8 remains `pilot` and enters the human-review queue;
  no `stable` claim is made before explicit review.

## Risks And Open Questions

- A truthful count can become misleading when stale, aggregated across the wrong
  variant/location or shown after backorder policy changes.
- `inventory_quantity` has different meaning when tracking is disabled, so a
  numeric comparison alone is unsafe.
- Viewer and recent-sale claims can create privacy, localization and stale-data
  risks beyond the visual component.
- Error/critical red and continuous pulse can manufacture pressure beyond the
  actual content.
- A live role on every data refresh can interrupt screen-reader users with
  promotional changes.
- Long qualification/disclosure text may mean the use case needs Product Info
  content rather than a compact G8 line.
- Generic Figma references and one Low Stock screenshot cannot approve the
  complete visual family.
- Marketing is currently over its fixed family ceiling because of later
  program work; ADR 0252 adds no CSS and does not raise that ceiling.

No generated `site/dist` output is part of this refinement.

## Owner-Decision Reconciliation

Completed on 2026-07-21 without changing G8 DOM, CSS, renderer or runtime:

- G8-B corrects the packet/coverage record and retains all four already
  implemented and evidenced types.
- ADR 0252 records exact target qualification boundaries for Low Stock,
  Selling Fast, Viewers and Recent Sale.
- Existing Batch 87 evidence already covers all four types, strict omission,
  direct containers, localized/extreme content, contrast, forced colors,
  reduced motion and exact Exhibit/Studio parity.
- Shopify remains honestly planned until a real production adapter proves the
  accepted source and lifecycle requirements.

The component is `human-review-ready` and remains `pilot`. Final visual
treatment, production adapter proof and corrected G8-specific design evidence
remain required before any `stable` promotion.
