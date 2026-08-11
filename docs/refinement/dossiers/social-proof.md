# Component Dossier: Social Proof Notifications

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify truth/provider and future-target
boundaries

Contract: `components/contracts/social-proof.contract.json`

## Recommendation

Retain G10 as a discoverable **Social Proof profile of canonical Toast**, not as
a second notification primitive. The profile may present one current,
target-verified and privacy-approved commercial activity statement with optional
supporting media, optional time text and optional canonical dismissal. It must
consume Toast's surface, semantic hidden state, content region and Close Button
composition instead of re-owning fixed placement, shadow, transition, visibility
or close behavior.

Social proof is non-critical marketing content. The profile therefore has no
default live-region role and never moves focus. A target may not turn repeated
commercial events into assertive announcements. Queueing, deduplication,
frequency, placement, duration, pause/resume, Escape, persistence and removal
remain the same target viewport/service responsibilities already accepted for
canonical Toast.

The target is solely responsible for event truth, source, qualification,
freshness, expiry, privacy, anonymisation/consent, localization, publication,
provider calls and analytics. The base must not synthesize names, locations,
products, timestamps or purchases and must omit blank content rather than fall
back to a claim.

ADR 0253 accepts this profile as G10-A and rejects the recipe-only or persistent
list alternatives for v1. Commercial source/privacy policy and target adapter
proof remain target responsibilities, while the neutral component is eligible
for human review and remains `pilot`.

## Purpose And Limits

Purpose:

- Present one concise, self-contained, truthful commercial activity statement.
- Optionally pair the statement with relevant media and target-formatted time.
- Optionally allow explicit dismissal through canonical Close Button.
- Reuse canonical Toast presentation and target viewport/lifecycle ownership.
- Remain usable as static content when no live insertion/queue exists.

Hard limits:

- Does not create, infer, randomize or replay purchase/activity facts.
- Does not query orders, customers, analytics, inventory or visitor activity.
- Does not decide whether a person, location or order may be disclosed.
- Does not anonymize, pseudonymize or obtain consent.
- Does not format relative time, determine freshness or expire stale claims.
- Does not own a toast provider, portal, viewport, queue, timer, cadence,
  deduplication, persistence, swipe, Escape or focus shortcut.
- Does not announce marketing content by default or move keyboard focus.
- Does not duplicate Toast, Close Button, Button, Link, Status or Alert.
- Does not make a product/navigation action implicit by making the root
  clickable.
- Does not force a web purchase-notification model onto native targets.

## Current Repository Baseline

- Registry identity `G10`, Marketing category, dependency depth `1`, review
  order `92`; its refined contract declares canonical Toast.
- Registry description is “Someone just bought...” notification toast at the
  physical bottom-left.
- Contract `0.2.0`, `pilot` declares a passive dismissible notification with
  truthful target data, but its root independently owns viewport position,
  visibility and notification surface.
- Public properties are required `message`, optional `time`, `image`,
  `imageAlt`, `dismissAction`, `dismissLabel` and `visible=false`.
- Canonical CSS duplicates Toast surface, shadow, radius, width, transition,
  hidden/visible transform and close-button geometry/focus treatment.
- The root is fixed to physical `bottom/left`, uses `--z-toast`, and hides only
  with `translateX(-120%)`. A transform does not guarantee that the optional
  close button leaves keyboard or accessibility availability.
- Studio conditionally unmounts the component when `visible=false`, masking the
  weaker contract/CSS hidden lifecycle.
- The renderer always uses `role=status`, `aria-live=polite` and
  `aria-atomic=true`, including the initially visible static fixture. This makes
  commercial background content a default live region even though the contract
  says live announcement is conditional.
- Studio falls back to hardcoded English `Dismiss notification` when a supplied
  dismiss label is blank. The public property therefore does not fully own the
  accessible name.
- Required `message` is not trimmed or validated. Empty text can retain a live
  root, image, time and close action.
- Optional `time`, `imageAlt` and `dismissLabel` are not trimmed. Time is a
  generic span with no accepted freshness/absolute-time policy.
- The renderer uses an artist-at-work photo while the fixture claims a purchase
  of “Celadon Study”; the media does not substantiate or accurately depict the
  stated product.
- The fixture says `Sample purchase`, reducing but not eliminating the risk that
  screenshots are mistaken for actual provider evidence. It uses `Recently`,
  which has no source timestamp or expiry.
- Canonical type uses derived `87.5%` and `75%` body sizes without complete
  semantic line-height/family profiles.
- CSS hardcodes `12/16/48/320px`, physical sizing/edges and a `100vw` formula.
  It has no container-responsive ownership because viewport positioning is
  embedded in the component.
- Exhibit and Studio use the same registered `MarketingStudio` renderer and
  initial fixture. Existing parity covers Mobile/Desktop and one close button,
  but not semantic hidden state, blank/invalid omission, static versus inserted
  announcement policy, direct containers, Tablet/XL, dark, forced colors,
  reduced motion, RTL or effective 200%.
- Existing screenshots under
  `output/playwright/parity/marketing/social-proof-*.png` show a clean white
  floating card with image, sentence, time and close action.
- Shopify is `css-ready` only: no Liquid, data mapping, event/provider source,
  lifecycle or editor evidence. Neutral runtime has no G10 selector.
- Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
  and inspector `1020:480`. These are generic Button/Studio pilot nodes, not a
  G10-specific surface, media, truth, placement or responsive reference.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA `status`](https://www.w3.org/TR/wai-aria-1.2/#status) | `status` communicates advisory information that is not important enough for `alert`; it is an atomic polite live region and should not receive focus. | Static/present-at-load social proof needs no live role. Dynamic commercial activity must not become a default or assertive announcement. |
| [APG Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) | Alerts are brief important dynamically rendered messages; frequent interruptions and automatic disappearance create usability risks. | Marketing social proof is not an Alert and should not interrupt or require focus. |
| [WCAG Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | Automatically updating content presented beside other content needs pause/stop/hide or update-frequency control; there is no five-second exception for auto-updating information. | A rotating/reappearing purchase feed needs a target-owned durable stop/hide/frequency policy, not only per-item close. |
| [HTML `hidden`](https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute) | Hidden content is not rendered when it is no longer relevant. | Transform-only hiding is insufficient; use Toast's semantic hidden mapping or unmount. |
| [Open UI Toast research](https://open-ui.org/components/toast.research/) | Toast is brief, non-critical, non-interruptive and often corner-positioned/timed; systems converge on Toast/Notification names. | G10 is a content profile of Toast rather than an independent primitive. |
| [Radix Toast](https://www.radix-ui.com/primitives/docs/components/toast) | Radix separates Provider, Viewport, Root, content, safe action and close; provider owns duration, pause and viewport. Background announcements should not clear the speech queue. | G10 should consume one item while targets own the provider. It should not copy React runtime or default background marketing announcements. |
| [Shopify App Home Toast API](https://shopify.dev/docs/api/app-home-ui-extension/latest/target-apis/utility-apis/toast-api) | Shopify's host Toast is short action feedback such as save/error/undo, with target-owned duration. | Shopify confirms Toast as infrastructure, not a source of purchase facts. G10 data/provider remains separate. |
| [Shopify Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements) | Themes may not mislead with false claims or include incomplete app-like features requiring API access. | A theme cannot ship fake/example purchase notifications or pretend Liquid/CSS provides an order feed. |
| [FTC dark-pattern report](https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf) | “False Activity Messages” are classified as deceptive social proof, including false claims about others' site activity or product interest. | Truth, source and freshness are mandatory target gates; a demo fixture is never production data. |
| [EDPB anonymisation/pseudonymisation](https://www.edpb.europa.eu/topics/ai-and-technology/anonymisationpseudonymisation_en) | Pseudonymised data remains linkable; truly anonymised data is unlinkable to an individual. | Hiding a surname is not automatically anonymous. The target needs an approved disclosure/anonymisation policy. |
| [ICO anonymisation effectiveness](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/anonymisation/how-do-we-ensure-anonymisation-is-effective/) | A person can be identifiable without a name; location and combinations of details can enable singling out/linkability. | Purchaser, location, product and recency combinations require target privacy review before publication. |

The sources converge on a generic Toast item/provider boundary and on truthful,
privacy-reviewed source data. They do not define a universal social-proof event,
safe identity granularity, freshness window, cadence, placement or visual style.

## Mature-System Comparison

- Canonical Gallery Toast already owns the complete passive item: surface,
  semantic visibility, content, optional safe Button action, canonical Close
  Button, visual tone and optional announcement priority. ADR 0098 leaves
  viewport, queue, timing, pause/resume and removal to targets.
- Open UI describes Toast/Notification as a brief non-critical message, not a
  commercial record or truth engine.
- Radix exposes Provider/Viewport/Root and lifecycle hooks. G10 currently copies
  Root/Viewport concerns into one CSS selector without a queue or focus policy.
- Polaris host Toast APIs focus on feedback from the current user's action, not
  public disclosure of another customer's purchase.
- No mature system reviewed treats purchaser/product/location/time synthesis as
  a visual-component responsibility.

## Owner Reference Analysis

Existing screenshots show consistent Exhibit/Studio geometry: white elevated
card, rounded media, two-line/three-line message, subdued time and an upper-end
close icon. The mobile card fits the stage without horizontal overflow.

The evidence does not approve the final component because:

1. the image depicts an artist rather than the stated purchased work;
2. the large empty grey stage overstates viewport placement and hides real-page
   overlap/stacking behavior;
3. the visual is indistinguishable from generic Toast while source duplicates
   Toast instead of composing it;
4. only physical bottom-left placement is shown;
5. no stacked, long/localized, RTL, image-absent, time-absent or persistent
   state is shown; and
6. registered Figma nodes are generic Button/Studio evidence.

Final media prominence, surface treatment, measure, physical/logical placement,
stacking, close prominence and G10-specific artwork require human approval after
canonical composition.

## Proposed Anatomy And Canonical Composition

| Part | Required | Semantic owner | Direction |
| --- | --- | --- | --- |
| Root | yes | canonical Toast + G10 profile | `.toast.toast--info.social-proof`; flow-sized item, no fixed viewport. |
| Media | no | G10 target content | Relevant image in first Toast grid column; informative alt only when it adds meaning. |
| Content | yes | canonical Toast | `.toast__content`; no live role by default. |
| Message | yes | G10 target content + Toast message | Trimmed self-contained text; blank omits complete root. |
| Time | no | G10 target content | Trimmed localized time text; source/freshness/expiry remain external. |
| Close | no | canonical Toast + Close Button | Render only with non-empty localized label; requests target dismissal. |
| Viewport/provider | no | target Toast service | Placement, queue, rate, duration, pause, Escape and removal. |

No standalone `.social-proof__close` button styling, surface, shadow, fixed
position, z-index or transition remains valid after composition.

## State, Mode And Content Matrix

| Dimension | Required direction/evidence |
| --- | --- |
| Validity | Non-empty trimmed message required; blank omits complete root. |
| Visibility | Controlled visible/hidden; target may mount/unmount; mapped hidden state uses Toast semantics. |
| Announcement | None for static/default G10. No assertive marketing mode. Any exceptional target announcement requires separate policy. |
| Media | Absent, decorative empty-alt, informative localized alt; broken/loading delivery target-owned. |
| Time | Absent, short/long localized relative text, absolute text; stale/invalid omission target-owned. |
| Dismissal | Absent or named canonical Close Button; blank label omits action. |
| Queue | One, multiple, duplicate, burst, stale and replay cases belong to target service. |
| Source | Verified purchase/event, unavailable, stale, withdrawn, privacy-disallowed and unsupported target. |
| Content | Short, long, empty, localized, Arabic RTL, unbroken product/location and effective 200%. |
| Theme/modes | Light/dark, forced colors and reduced motion inherited from Toast/profile CSS. |
| Placement | Site-owned evidence only; real target viewport prevents overlap and respects safe areas. |

## Public API And Ownership

Retain the smallest stable G10 surface:

- required `message`: complete target-authored and verified statement;
- optional `time`: target-formatted current text;
- optional `image` composition and `imageAlt`;
- optional paired `dismissAction` and non-empty localized `dismissLabel`; and
- controlled `visible=false` presentation, projected through canonical Toast
  visibility.

Do not expose purchaser name, city, product id, event type, timestamp parsing,
relative-time formatter, truth/verified flag, privacy/consent flag, source URL,
order API, provider, query, polling, refresh, queue, cadence, duration, delay,
repeat count, stacking, placement, z-index, motion distance, color, radius,
shadow, media pixels or close geometry. Those are target records/policy, Toast
services or private composition.

A `verified` boolean would be unsafe because the component cannot validate it.
Invalid/unavailable target data must omit the item before rendering.

## Canonical Selection Rules

| Component | Use when |
| --- | --- |
| Social Proof | One truthful privacy-approved commercial activity statement is intentionally surfaced. |
| Toast | Generic brief feedback/notification item; G10 composes this primitive. |
| Urgency | Passive contextual product claim such as verified low stock; not a floating event. |
| Testimonials | Durable quoted customer statement with attribution; not a recent activity event. |
| Alert/Banner | Important status, warning or required action; not promotional social proof. |
| Activity list/card | Persistent browsable record in document flow; not transient notification. |

## Token And Hardcoded-Value Audit

Current public tokens duplicate Toast responsibilities: surface, focus, radius,
shadow, transition/easing, z-index, viewport spacing and touch target. After
composition G10 should expose only tokens it directly owns, likely optional
media radius plus complete time typography if those cannot inherit existing
Toast profiles.

| Current detail | Refinement direction |
| --- | --- |
| Fixed physical `bottom/left` and `--z-toast` | Delete; target Toast viewport owns placement/stacking. |
| Surface, root radius and shadow | Delete from G10; canonical Toast owns them. |
| Transform/transition visibility | Delete; canonical Toast semantic state owns it. |
| Hardcoded `320px` width and `100vw` formula | Delete; Toast item and target viewport own measure/containment. |
| `12/16px` gap/padding | Delete; Toast owns rhythm. |
| `48px` media | Replace with a private value derived from existing touch/media semantics; do not expose pixels. |
| Derived `87.5%` message type | Use canonical Toast Body Small profile. |
| Derived `75%` time type | Use complete existing Caption profile. |
| Physical `top/right`, close color/focus/touch geometry | Delete; Close Button owns it. |
| Image `width/height` | Convert remaining profile geometry to logical inline/block size. |

No new token or token layer is justified.

## Responsive, Interaction And Accessibility Test Plan

- Paired Exhibit/Studio Mobile `390x844`, Tablet `768x1024`, Desktop
  `1440x1000` and XL `1920x1200` from one renderer/fixture.
- Direct flow containers `200`, `240`, `320`, `380`, `520` and `800px`; target
  viewport placement tested separately.
- Valid initial item, close/reopen docs fixture, hidden state, blank omission,
  no media, decorative/informative media, no time and no dismiss action.
- Short, long Spanish, Arabic RTL, unbroken product/location and effective 200%
  content.
- Default/static item exposes no live region, landmark or focus movement.
- Close uses canonical 44px target, visible focus, native button activation and
  a non-empty localized accessible name.
- Hidden root has zero pointer/accessibility/focus availability; unmounted target
  form is also valid.
- No color/image/time alone carries the claim; message is self-contained.
- Light/dark contrast, forced-colors boundaries and reduced-motion transition
  behavior inherit canonical Toast and are recomputed for profile media/time.
- Exact Exhibit/Studio normalized DOM, computed, interaction and equal-width
  opaque-pixel parity.
- Target service stress: duplicate/burst/stale events, one-at-a-time/stacking,
  dismissal persistence, hover/focus/window pause if timed, durable stop/hide or
  frequency control for automatic feeds, and no announcement flooding.
- Zero neutral network, order/customer access, timers, observers, layout reads,
  provider SDKs or bundled remote assets.

## Performance Budget

Current local level-9 gzip baseline:

- G10 CSS slice: `1,653 B` raw / `676 B` gzip.
- The current whole-program snapshot places Marketing at `4,782 / 4,198 B`
  gzip and Neutral Web CSS at `71,754 / 65,536 B`; both documented later-program
  gaps are separate from G10's historical refinement delta.
- Shared runtime is currently `22,807 / 8,192 B`; G10 still contributes `0 B`.
- G10 has zero neutral JavaScript selector/provider today.

Canonical Toast composition should substantially reduce G10 and Marketing CSS.
G10 retains a `0 B` neutral runtime/provider/network budget. Target adapters
must reuse an existing Toast service; a second queue/timer provider is not
acceptable.

## Target Translation

| Target | Translation | Status/boundary |
| --- | --- | --- |
| Neutral Web | G10 profile classes on canonical Toast; target-supplied verified content; no live role by default. | Refinement ready. |
| Shopify Theme Store | Theme CSS/Liquid alone has no cross-customer order feed and cannot ship false/example activity or incomplete app-like behavior. | Omitted from v1 until a verified provider/source and policy are selected and certified under ADR 0253. |
| Shopify App Home/admin | Host Toast API is action feedback, not storefront social proof; separate authorized data source required. | Target-specific, not direct G10 parity. |
| React / Angular | Thin profile renderer inside one application Toast provider; controlled item data/state. | Planned after neutral profile. |
| Webflow / Framer | Static/editor content cannot claim live purchases; use verified provider integration or omit. | Planned/target-owned. |
| Figma | Static Example-only states and visual anatomy; cannot prove truth, privacy, freshness or timing. | Planned; G10-specific reference missing. |
| SwiftUI / Compose | Native Snackbar/toast-like presentation only if platform policy permits the commercial event; no copied DOM/provider. | Planned/target-specific. |

## Accepted Policy And Target Proof

ADR 0253 retains the discoverable passive Toast profile and makes truth,
qualification, freshness/expiry, withdrawal, privacy/anonymisation or consent,
queue, rate, placement, timing, persistence and focus/removal lifecycle
target-owned. Shopify v1 omits G10 until a verified provider/source and that
complete policy are selected and certified.

Production evidence and final media prominence, time treatment, measure, Close
prominence, stacking, placement and corrected G10-specific design evidence
remain required. They must not be replaced with random fixtures,
merchant-authored `live` copy, a `verified` checkbox, local storage, simulated
timers or a Liquid order query.

## Certification Exit Criteria

- G10 consumes canonical Toast and Close Button without duplicated root/close
  presentation or lifecycle.
- Required message and paired dismiss label follow strict trim/omission rules.
- Static/default G10 has no live role, focus movement or artificial urgency.
- Hidden state is semantically unavailable through Toast mapping or unmount.
- Media/time are optional, relevant, localized and never the sole meaning.
- Exhibit and Studio share one renderer/fixture and show explicit example copy.
- Four viewport, direct-container, content, RTL, effective-200%, contrast,
  forced-colors, reduced-motion, hidden and interaction evidence passes.
- G10 adds zero neutral runtime; current family/global gaps remain documented
  separately and ADR 0253 adds no CSS.
- Selected target source/privacy/lifecycle architecture is explicit before that
  adapter is called ready.
- Automated gates pass; contract remains `pilot` and never becomes `stable`
  without explicit human review.

## Risks And Open Questions

- False or stale activity is deceptive even if the UI is accessible and visually
  polished.
- Product, location and recency combinations can identify a person without a
  full name.
- Repeated polite live announcements can distract, lag or create coercive
  pressure for screen-reader users.
- Per-item close does not necessarily stop a target feed from reappearing.
- A timed close can remove the only dismissal action while it is focused unless
  the target pauses correctly.
- Bottom-corner placement can overlap chat, cookie, cart and accessibility
  controls; G10 cannot solve global overlay coordination itself.
- Reusing an unrelated fixture image can falsely imply evidence for the stated
  purchase.
- Shopify theme code cannot safely infer other customers' purchase activity
  from standard current-visitor storefront events.
- Generic Figma nodes and current Mobile/Desktop captures cannot approve final
  G10 identity or target lifecycle.

## Refinement Result — 2026-07-16

The researched direction was implemented before ADR 0253 resolved the remaining
neutral identity and ownership decisions:

- contract `0.3.0` and the registry now declare canonical Toast composition;
- the profile consumes `.toast`, `.toast__content`, `.toast__message`,
  `.toast__close` and `.close-btn` instead of duplicating viewport placement,
  surface, measure, shadow, motion or Close Button treatment;
- strict trimmed-message and paired dismiss-label rules omit invalid roots or
  actions rather than synthesizing English fallback copy;
- static/default presentation has no live role and hidden Studio state unmounts
  the complete item;
- the explicit documentation fixture uses relevant product media and
  `Example only` / `Sample time` wording;
- a private `18rem` container threshold places media above content in narrow
  items while preserving canonical Toast layout at its normal measure;
- Exhibit and Studio render the same implementation and fixture with identical
  normalized DOM and identical equal-width root pixels;
- paired Mobile, Tablet, Desktop and XL evidence, direct `200–800px` content
  stress, long/localized/RTL/unbroken/effective-200% content, omission,
  dismissal, contrast, forced-colors and reduced-motion checks pass; and
- canonical, Webflow and Shopify CSS copies are byte-identical, while Shopify
  remains explicitly planned pending a truthful app/provider and privacy
  architecture.

Final level-9 gzip is `581 B` for the G10 slice, down from `676 B`. Marketing
CSS is `4,194 B` against its `4,198 B` ceiling. G10 still adds no neutral
runtime. The larger neutral Web CSS and shared-runtime ceilings remain existing
program gaps, not new G10 runtime ownership.

Evidence is recorded in
`output/playwright/batch93-social-proof/after/measurements.json`; the detailed
audit is `docs/reports/social-proof-web-refinement-audit.md`; and the accepted
boundaries are ADRs 0172 and 0253. `site/dist` was not rebuilt. G10 remains
`pilot`, is not `stable`, and is now `human-review-ready`; provider proof and
final visual approval remain required.
