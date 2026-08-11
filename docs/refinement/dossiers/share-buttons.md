# Component Dossier: Share Actions

Status: `human-review-ready`

Target under review: refined Neutral Web Share Actions composition with
target-owned provider/native/clipboard behavior

Contract: `components/contracts/share-buttons.contract.json`

## Recommendation

Define L9 as one passive, fail-closed, named group of target-supplied share
actions. Require a non-empty localized group label and one or more non-empty
actions. Compose every visible action from canonical Button: native Web Share
and copy are native `button type="button"` actions; provider/email destinations
are native anchors with Button presentation, real `href`, and target-owned
`target`/`rel` policy. Keep each visible label explicit; reserve Icon Button for
a separately approved icon-only density, never as an implicit L9 default.

L9 owns the accepted semantic built-in action-id catalogue, but it does not
render that catalogue by default and does not own URL templates, current-page discovery,
canonical URL selection, share title/text, permissions, capability detection,
Clipboard/Web Share calls, async state, analytics, popup/window policy, result
feedback, fallback UI, or target data. A target enhancement owns those facts
and composes canonical Button busy/disabled semantics plus a pre-existing
status region whenever visible success/failure text is updated without moving
focus. The neutral root owns layout and grouping only, with zero runtime.

The accepted canonical-family decision is:

1. Keep registry-backed `.share-buttons` as L9's canonical root.
2. Expose semantic `inline` and `stacked` layout variants. Remove public
   `sticky`; the pre-v1 name falsely promises host behavior and needs no
   permanent alias.
3. Remove L9 ownership from unregistered `.share`, `.share__label`,
   `.share__btn`, and `.share--sticky`. Either deprecate/migrate that legacy
   family or register a separate host-level Share Rail if fixed viewport
   placement remains a real product need.
4. Keep all sticky/fixed placement, safe areas, header/footer collision,
   reading-surface relationship, z-index, mobile relocation, focus visibility,
   print behavior, and viewport/container policy in the consuming layout or
   separate Share Rail.

The owner accepted this direction as `L9-A`. The ordered action composition may
use `native`, `copy`, `email`, `whatsapp`, `facebook`, `x`, `pinterest`,
`linkedin`, `telegram`, `reddit`, `instagram`, `threads`, and `tiktok` semantic
ids plus arbitrary custom actions. The current target must omit any selected id
it cannot truthfully execute. Instagram and TikTok remain target-capability
actions rather than generic browser URL promises. Contract remains `pilot`;
final visuals, real Web/Shopify consumers, current provider mappings,
L9-specific Figma evidence and explicit human review remain open.

## Purpose And Limits

- Groups related ways to share one target-supplied resource, such as native
  system sharing, copying its canonical URL, email, or approved provider links.
- Communicates the relationship and purpose of multiple actions through one
  concise localized group name while every action keeps its own visible name.
- Provides intrinsic inline wrapping or stacked layout and delegates action
  appearance/states to canonical Button.
- Is not a Toolbar, menu, share chooser, provider registry, URL builder,
  canonical/SEO resolver, popup manager, Clipboard abstraction, permission
  service, toast/status system, analytics tracker, fixed rail, article layout,
  social metadata generator, Open Graph/Twitter Card implementation, or native
  application bridge.
- Does not infer the resource from `document.location`, `document.title`, route
  state, DOM metadata, Shopify globals, a React router, or a Figma frame.
- Does not promise that Web Share, clipboard write, popup/provider URLs, files,
  or every payload member are supported by every browser/target.
- Does not expose provider enablement, provider order, icons, URLs, payload,
  fallback strategy, pending/error state, status text, target/rel, share count,
  tracking parameters, layout gap, fixed offset, z-index, breakpoint, Button
  variant/size, or icon size as root semantic properties.

## Current Gallery Baseline

- Registry `L9`, Blog, review order `123`, dependency depth zero, phase 6,
  contract status `pilot`, two variants `inline` and `sticky`, no dependencies.
- ADR 0079 intentionally maps only registry-backed `.share-buttons` while
  leaving the canonical-family and behavior-owner decisions unresolved.
- Contract `0.1.0` exposes `variant` and required `actions`, but no accessible
  group label, no fail-closed behavior, no canonical dependencies, one generic
  root part, one default state, and an empty token inventory.
- Canonical CSS contains two overlapping root families:
  - `.share-buttons` is a flex/wrap/gap layout; inline aligns actions and sticky
    changes them to a column without positioning;
  - `.share` repeats the layout and owns `.share__label`, `.share__btn`, hover,
    focus, icon dimensions, reduced motion, fixed left/mid-viewport placement,
    z-index, and a viewport media query that moves only `.share--sticky` back
    into flow.
- `.share__btn` duplicates canonical Button/Icon Button surface, border, focus,
  touch, icon and transition behavior. `.share-buttons .btn svg` also reaches
  into a canonical child and hardcodes `18px` icon dimensions.
- `.share--sticky` is unsafe as reusable component placement: fixed `left:24px`,
  `top:50%`, transform, z-index, viewport query and no safe-area/header/footer/
  focus/print/RTL host integration. `.share-buttons--sticky` does not implement
  the behavior its public name suggests.
- Studio renders a generic unlabelled `div.share-buttons` and three visible
  outline small Buttons: “Copy link”, “Email”, and “Share”. All three are
  buttons with intercepted fixture clicks; Email is not a destination and the
  actions have no real provider/native/clipboard behavior or feedback.
- Static MDX instead renders `role="group" aria-label="Share this article"`
  with two raw unclassed buttons. Its semantics, content and canonical
  composition differ from runtime Exhibit/Studio.
- Runtime Exhibit and Studio share broad `BlogStudio`, but L9 has no dedicated
  shared artwork/fixture boundary and the group itself has no required-content
  omission.
- Studio-only CSS centers the fixture and applies `fit-content` to the sticky
  variant. It does not reproduce fixed legacy placement, which further shows
  that “sticky” lacks one cross-surface meaning.
- Baseline screenshots exist at
  `output/playwright/parity/blog/share-buttons-{exhibit,studio}-{desktop,mobile}.png`:
  - Exhibit desktop SHA-256
    `3ca4f77e2912224ad64703a514ccfb45c5fa7d67e79739b882db0a89e4f07be6`;
  - Exhibit mobile SHA-256
    `5ea23352484377fe2d3befec947e861937e06844c4b714b0b6543099e514afaa`;
  - Studio desktop SHA-256
    `d9ac17ac7bd7db0bfa971b294f00b5f73c924cb00494b0b6ceb226e9f2f557b5`;
  - Studio mobile SHA-256
    `2ce74410921c4692afa8bd7730be75b52684e8e0cfa5376926bd776a6e68ebd9`.
- The three short Buttons fit at the captured mobile width and their visible
  labels are clearer than icon-only controls, but the evidence does not cover
  group naming, true links/actions, long/localized/RTL labels, empty actions,
  stacked mode, zoom/text spacing, dark/forced colors, async feedback, native
  behavior, fallback, popup security, or sticky host collision.
- Current deterministic L9 slice is `1,501 B` raw / `626 B` gzip, SHA-256
  `838b5dd423956e9038ae59c27b953540bdf4318ab2fbfa7861a9cd8ff8a53c48`.
  Blog CSS is `31,977 B` raw / `5,486 B` gzip against the fixed `5,529 B`
  ceiling. Neutral Web component CSS is `514,386 B` raw / `69,082 B` gzip;
  shared runtime is `53,811 B` raw / `10,501 B` gzip. L9 adds no canonical JS.
- Shopify and Webflow receive copied CSS. Shopify has no L9 Liquid, schema,
  data mapping, localized labels, action enhancement, feedback or consumer.

## Standards And External Research

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Standard: button](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element) | Native button represents an action and carries built-in activation/disabled semantics. | Web Share/copy triggers are canonical native Buttons, not anchors or generic divs. |
| [WAI-ARIA APG Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | Buttons trigger actions, require accessible names, and normally retain focus when an in-context action completes. | Visible localized action labels remain stable; result feedback does not need arbitrary focus movement. |
| [Gallery Link contract](../../../components/contracts/link.contract.json) and [APG Link](https://www.w3.org/WAI/ARIA/apg/patterns/link/) | Links identify and navigate to resources. | Provider/email destinations use real anchors; Web Share and copy use buttons. |
| [WAI-ARIA 1.2 `group`](https://www.w3.org/TR/wai-aria-1.2/#group) and [WAI grouping guidance](https://www.w3.org/WAI/tutorials/forms/grouping/) | `group` communicates related content without creating a landmark/composite widget; labelled examples use `aria-labelledby`/`aria-label`. | A concise named `role="group"` can give the controls shared “share” context without menu/toolbar behavior. |
| [APG Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) | Toolbar is intended for three or more controls and requires one-tab-stop roving arrow-key navigation. | Do not apply toolbar semantics to an ordinary share group unless the owner explicitly accepts that keyboard model and product identity. |
| [W3C Web Share API](https://www.w3.org/TR/web-share/) | `navigator.share()` is secure-context, requires transient activation, is governed by `web-share` Permissions Policy, accepts validated target-supplied data, may reject/cancel, and delegates targets to user agent/OS. | Web Share is a target enhancement on a native Button. Capability/payload/error/cancel policy cannot be neutral CSS or a provider list. |
| [W3C Clipboard API](https://www.w3.org/TR/clipboard-apis/#dom-clipboard-writetext) | `writeText()` is permission/security controlled and returns a rejecting Promise. Clipboard modification has security risks. | Copy is a target-owned Button action with truthful success/failure handling and a selectable/navigable fallback where required. |
| [WCAG 2.2 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | Visible in-context success/failure text added without focus movement must be programmatically exposed, while unnecessary live regions can become chatty. | When a target shows “Copied” or failure, pre-render its accepted status container and update only after the real result; L9 does not fabricate success. |
| [WCAG 2.2 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) and [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | Targets need at least 24px or qualifying spacing, and ordinary content must reflow at 320 CSS pixels. | Continue Gallery's stronger 44px Button target and intrinsic wrapping/stacking without viewport-fixed collision. |
| [Open UI Button research](https://open-ui.org/components/button/) | Mature systems converge on button root/content/icon anatomy; there is no standardized Share Buttons component. | Compose Button; do not invent a share role, provider schema, or browser-like chooser. |
| [Open UI Toolbar explainer](https://open-ui.org/components/toolbar.explainer/) | Proposed toolbar element bundles toolbar role plus arrow-key behavior for command sets. | It reinforces that “toolbar” is a behavioral commitment, not a visual synonym for a row of Buttons. |
| [Open UI future invokers](https://open-ui.org/components/future-invokers.explainer/) | Future ideas mention declarative `copy-text` and `share`, but they are exploratory rather than interoperable current primitives. | Keep current target behavior on standards APIs and native controls; do not base v1 on future commands. |
| [Radix Toolbar](https://www.radix-ui.com/primitives/docs/components/toolbar) | Root/Button/Link composition includes orientation and full keyboard navigation. | Radix demonstrates semantic leaf composition, but its Toolbar root is too strong unless L9 accepts roving focus. |
| [Radix Icon Button](https://www.radix-ui.com/themes/docs/components/icon-button) | Icon-only controls strongly require `aria-label`/`aria-labelledby`. | The visible-label baseline is preferable; any future icon-only profile must explicitly compose named Icon Button. |
| [Polaris Button Group](https://polaris-react.shopify.com/components/actions/button-group) | Related actions are grouped for spacing; too many actions create indecision; icon-only groups are bounded and small-screen behavior matters. | L9 should remain a finite target-curated action group, not expose every provider or force no-wrap. |
| [Shopify Share API](https://shopify.dev/docs/api/app-home/apis/device-and-platform-integration/share-api) | Shopify surfaces can intercept `navigator.share()` differently; file support varies by target. | Shopify/App Bridge behavior is a target adapter concern, proving why neutral runtime must not assume browser behavior. |
| [Shopify Clipboard Item](https://shopify.dev/docs/api/customer-account-ui-extensions/latest/web-components/actions/clipboard-item) | Target-native copy pairs a visible trigger with a behavior element and emits copy/copyerror for feedback. | Future Shopify projections can map canonical action semantics to target-native primitives without coupling neutral source. |
| [Shopify Dawn share snippet](https://github.com/Shopify/dawn/blob/main/snippets/share-button.liquid) and [enhancement](https://github.com/Shopify/dawn/blob/main/assets/share.js) | Dawn progressively chooses Web Share when present or a labelled readonly URL/copy/status fallback. | Useful target evidence, not source code or The Gallery identity. It supports explicit progressive enhancement and truthful fallback ownership. |
| [Telegram Sharing Button](https://core.telegram.org/widgets/share) | Telegram currently documents an editable URL/text Web share destination and permits custom UI. | `telegram` may be a direct destination when the target encodes current official parameters; the neutral group still owns no template. |
| [Pinterest Save Button](https://developers.pinterest.com/docs/web-features/buttons/) | Pinterest's official Web integration depends on its current add-on attributes/script, canonical URL, media and brand guidance. | `pinterest` is target-resolved and content-capability dependent, not a timeless generic URL baked into L9. |
| [LinkedIn Share Plugin/API](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/plugins/share-plugin) | LinkedIn documents an official plugin, while API posting requires authentication and permission. | `linkedin` is a semantic request; each adapter selects and verifies the supported official flow. |
| [TikTok Share Kit](https://developers.tiktok.com/products/share-kit) | TikTok's current Share Kit is a mobile app content-sharing integration; its former Web Share Video API is deprecated. | `tiktok` must be omitted from a generic Web group unless a verified target-specific SDK/app flow exists. |

### Consensus And Differences

- HTML, APG, Open UI, Radix and Polaris converge on composing named native
  Button/Link leaves rather than creating provider-specific pseudo-controls.
- Web Share and Clipboard are asynchronous capability/permission surfaces, not
  CSS variants. They require target-owned payload, activation and real result
  handling.
- Polaris Button Group matches the recommended ordinary Tab model. APG/Radix
  Toolbar instead require roving arrow-key focus; that is not justified by the
  current simple content-sharing purpose.
- Shopify targets vary substantially: a storefront can use Web APIs and Liquid,
  App Home uses an intercepted native share surface, Customer Account offers a
  Clipboard Item, and Dawn ships a disclosure fallback. One neutral behavioral
  implementation would be false portability.
- Systems do not agree on provider inventory, visible versus icon-only labels,
  inline versus menu/chooser, or fallback. Those are target/product decisions.
- Revalidation on 2026-07-20 found Telegram, Pinterest, LinkedIn and TikTok
  official flows with materially different requirements. The former X Web
  Intent documentation redirects to the general X developer overview, and Meta
  developer pages rate-limited automated access. Therefore no provider URL or
  capability is frozen into neutral source; adapters must verify official
  interfaces when implementing a consumer.

## Visual Reference Analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
and inspector `1020:480`. All Studio definitions currently share these generic
nodes. Prior direct Figma inspection in this refinement program confirmed that
they show the Button component-detail shell and Button controls, not an L9
share group, inline/rail context, provider treatment, responsive relocation,
async feedback, or special-mode appearance.

The repository baseline is therefore only a visual candidate:

- strengths: visible text labels, familiar outline Button composition, clear
  icon-plus-label order, compact finite set, and inline wrapping capability;
- weaknesses: no group label in runtime, no provider/action distinction, no
  actual result states, “Share” uses a link glyph instead of a clearly approved
  share icon, three short English labels nearly fill mobile width, and sticky
  is not evidenced at all;
- no owner-provided reference approves the outline/small Button choices, icon
  set, gap, provider order, label copy, inline/stacked behavior, rail placement,
  feedback treatment, or dark/forced-color appearance.

Do not treat the generic Button Figma nodes as approval of L9. The chosen
canonical group and target action profile need page-context visuals across
Mobile, Tablet, Desktop and XL.

## Recommended Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | generic container with `role="group"` | L9 | Omitted for blank label or empty actions. Not a landmark or Toolbar. |
| Group label | yes | `aria-label` or `aria-labelledby` | target/L9 | Concise localized resource context such as “Share this article”; visible label is a separate owner choice. |
| Actions | yes | target slot | target | One or more complete named canonical controls. |
| Native share action | optional | canonical Button / native button | target | Direct transient-activation handler; absent when unsupported by approved target policy. |
| Copy action | optional | canonical Button / native button | target | Attempts real target-supplied URL copy; does not fake success. |
| Provider/email destination | optional | native anchor with Button presentation | target | Real encoded href plus target/rel/privacy policy. |
| Icon | optional | canonical Button icon slot | target | Decorative when visible label supplies the name; icon source is target-specific. |
| Feedback | conditional | pre-existing visible/polite status or target feedback pattern | target | Updates after true success/failure; not an always-on L9 live region. |
| Sticky/rail host | no | surrounding layout or separate registered component | host | Owns position, collisions, safe areas, z-index, relocation and print. |

Do not add `menu`, `menubar`, `toolbar`, `listbox`, `tablist`, `radiogroup`,
`aria-pressed`, `aria-current`, `aria-expanded`, selection, or roving tabindex to
ordinary independent share actions.

## Variant, State, Size, And Mode Matrix

- Neutral root: valid named group; invalid blank label; invalid empty actions.
- Layout: `inline` wrapping row; `stacked` column. “Sticky” is not a semantic
  L9 state and is removed without a permanent alias before v1.
- Action type: native share Button; copy Button; provider/email anchor Button;
  optional target-specific fallback/disclosure outside neutral group ownership.
- Action visual states: resting, hover, active, keyboard focus, disabled,
  pending/busy where truthful. Canonical Button owns every visual/activation
  state; provider anchors retain link semantics.
- Async result: native share success, user cancellation, unsupported payload,
  policy denial/error; clipboard success, permission/error, selectable/link
  fallback. Target owns state and localized feedback.
- Capability: Web Share available/unavailable; Clipboard available/unavailable;
  target bridge present/absent; provider action enabled/omitted.
- Size: action sizing is canonical Button configuration, not L9 root size.
  Gallery evidence should retain at least 44px targets.
- Responsive: inline wraps from available container width; stacked remains
  intrinsic. Host rail may relocate/omit only through a separately approved
  layout policy with an equivalent in-flow action path.
- Direction/localization: LTR/RTL, long action labels, long group name, encoded
  URLs, local provider names and icon order. No truncation that removes purpose.
- Visual modes: light, dark, forced colors, reduced motion, effective 200%
  text, user text spacing, Mobile/Tablet/Desktop/XL and direct 200/320px
  containers.

## Public API Direction

Accepted semantic surface for the implementation candidate:

- `label` - required non-empty localized accessible group name.
- `actions` - required non-empty target-owned canonical Button/anchor Button
  composition, including any conditional feedback owned by those actions.
- `variant` - optional `inline | stacked`; `inline` default.

Potential alternative if human review requires a visible group heading:

- one `visibleLabel` property or a labelled content slot plus `aria-labelledby`,
  with the required `label` fallback. Do not expose both unless the distinction
  is demonstrated across targets and can be validated without incoherent names.

The actions slot accepts the curated semantic ids or arbitrary custom canonical
actions in target-selected order. The ids are adapter requests, not automatic
rendering, provider URLs, support claims or visual defaults. Do not expose provider order, provider icon names, current
URL/title discovery, share payload object, popup target, clipboard strategy,
capability flags, result store, feedback copy, analytics, Button visual props,
orientation ARIA, toolbar navigation, sticky offset, z-index, breakpoint,
safe-area, page position, gap, or icon size on the L9 root.

L9 has no neutral controlled/uncontrolled value. Targets own ephemeral async
pending/result state; canonical Button represents truthful busy/disabled state.
Targets should not preserve a “shared” or “copied” toggle value after the
one-shot action, and cancellation is not automatically an error announcement.

## Token And CSS Direction

After the canonical-family decision:

- `.share-buttons` should own only logical intrinsic group layout using existing
  semantic spacing, containment and response tokens;
- canonical Button should own action surface, text, border, radius, focus,
  hover/active/disabled/busy, touch target, icon geometry and motion tokens;
- remove `.share-buttons .btn svg` child intrusion and let Button's public icon
  slot/size contract render its own icon;
- remove or migrate `.share__btn` duplicate visual rules and their token
  references; do not retain two Button implementations;
- remove fixed positioning and viewport query from L9. A separate Share Rail or
  host layout may use its own accepted placement/safe-area/stacking tokens;
- replace hardcoded `8px` group gap with the accepted semantic stack/gap token,
  keep component-private micro geometry private, and introduce no L9 token
  layer without a stable cross-target customization need;
- use logical properties and complete wrapping; do not no-wrap, horizontally
  crop, clamp, or hide labels merely to preserve a row.

The refined L9 slice should not exceed its current `626 B` gzip observation and
should reduce enough duplicate legacy CSS to preserve Blog's fixed `5,529 B`
ceiling. Neutral runtime remains `0`; target enhancement is budgeted separately
and must clean up any listeners/feedback timers it owns.

## Cross-Target Translation Direction

- Neutral Web: named fail-closed group plus canonical native Button/anchor
  Button composition, intrinsic layout and zero component runtime.
- Browser target enhancement: direct user-activated `navigator.share()` and
  `navigator.clipboard.writeText()` only after capability/policy checks, using
  explicitly supplied payload and truthful Promise result handling.
- Shopify theme: target-native Liquid supplies canonical resource URL/title,
  localized labels and selected actions. A small target enhancement may choose
  Web Share or an accessible copy/provider fallback. Section/block schema and
  first consumer remain open.
- Shopify App Home/POS: map native share to the platform Share API/App Bridge
  behavior rather than copying storefront assumptions.
- Shopify Customer Account: a copy action can map to target Clipboard Item plus
  its copy/copyerror events while retaining the neutral visible action intent.
- React/Angular: thin group renderer; action handlers and async state live in
  target integrations/hooks/services, not the base contract.
- Figma: group/label plus canonical Button instances and state/mode examples;
  no runtime/provider API encoded as variants.
- SwiftUI/Compose: semantic action group using native ShareLink/share sheet and
  clipboard APIs where available, with platform result/fallback behavior; do not
  pretend browser provider URLs are cross-platform source.

## Exhibit And Studio Parity Result

One `ShareActionsArtwork` now receives the required label, validated non-empty
action records and semantic layout. Exhibit and Studio use that renderer and
the same explicit hybrid fixture; the MDX preview is a matching static fallback.
The runtime group is named, Email is a real anchor, operations are native
buttons, and the docs target announces Clipboard success only after the Promise
resolves. Exact root DOM and equal-container computed-style parity pass.

Final evidence covers inline, stacked, capability omission, blank-label and
zero-action omission, keyboard focus/activation, target status, four paired
natural viewports, long/localized/RTL/unbroken/effective-200% content, dark,
forced colors and reduced motion. Site CSS sizes only the stage; canonical
Button and L9 source retain their respective ownership boundaries.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| `.share-buttons` and `.share` overlap with different semantics/behavior. | accepted migration | Keep registry-backed `.share-buttons`; delete `.share`. Register a separate Share Rail only through a future decision. | accepted `L9-A` |
| Public `sticky` modifier only stacks, while legacy `.share--sticky` fixes to viewport. | accepted migration | Replace with `stacked`; host/separate rail owns sticky placement. | accepted `L9-A` |
| Runtime group had no accessible name or required-content omission. | resolved | Required label/actions and fail-closed named role=group are implemented. | L9 candidate |
| Raw/duplicate controls bypassed canonical ownership. | resolved | Canonical Button dependency, truthful native button/anchor roots and no child icon override. | L9 candidate |
| Provider/native/copy behavior and feedback were unresolved. | target boundary resolved | Neutral group is runtime-free; target owns payload, capability, APIs and truthful status. Concrete consumers remain open. | ADR 0230 / targets |
| Fixed legacy rail had unsafe viewport assumptions. | resolved for L9 | Fixed rules deleted; host or separate Share Rail requires its own decision/evidence. | ADR 0230 |
| Fixture used three buttons regardless of semantics. | resolved | Capability-filtered native/copy Buttons plus real email/custom anchors; no simulated success. | docs target |
| Shopify has CSS only. | target blocker | Define first consumer/actions/schema/data/enhancement/fallback after neutral boundary. | owner/Shopify target |
| Generic Figma refs provide no L9 direction. | visual blocker | Obtain/approve page-context inline/stacked or rail visuals and feedback states. | owner |

## Considered Alternatives

### A. Canonical Share Actions Group (recommended)

Use `.share-buttons` for a named inline/stacked group; canonical Buttons/anchor
Buttons are supplied by targets; zero neutral runtime. Migrate legacy `.share`.
If fixed placement is needed, register a separate Share Rail/layout consumer.

Advantages: matches registry/contract, preserves platform neutrality, removes
duplicate control CSS, supports every target, and keeps async/security truth
where data and APIs exist. Cost: target adapters must supply action behavior and
the legacy family needs a deliberate migration.

### B. One First-Class Share Action

Redefine L9 as one Button that opens native Web Share when supported and a
target-owned fallback disclosure otherwise, similar in boundary to Dawn.

Advantages: smaller visible choice set and native target chooser. Cost: this is
a product/API rewrite, capability/fallback behavior becomes central, provider
links no longer fit naturally, and non-browser targets require distinct native
implementations. It needs explicit owner approval.

### C. Canonical Share Rail

Keep fixed/sticky placement as L9's identity and make inline use a separate
composition.

Advantages: preserves the legacy visual intention. Cost: placement is page
layout rather than reusable action-group semantics; safe areas, collisions,
header/footer, reading surface, mobile relocation, print and focus visibility
become mandatory API/evidence. This is not recommended as the neutral base.

### D. Keep Both Families

Document `.share-buttons` and `.share` as two L9 implementations.

This avoids migration work but permanently duplicates control markup, tokens,
focus/motion behavior, variant meaning and target translation. It contradicts
canonical component consumption and is not recommended.

## Final Evidence And Validation

The final candidate validates:

- contract/registry/Studio/MDX agreement and one canonical family;
- shared fail-closed named group renderer and exact Exhibit/Studio normalized
  DOM/computed-style parity;
- truthful native button versus anchor Button semantics and canonical
  dependency/child-state ownership;
- inline and stacked response in direct 200/320/620/1120px containers;
- empty actions, blank label, one/multiple actions, long/localized/RTL/unbroken,
  effective 200-percent text, text spacing and extreme provider names;
- Button rest/hover/active/focus/disabled/busy, light/dark contrast, forced
  colors, reduced motion and at least 44px targets;
- target Web Share success/cancel/error/unsupported and Clipboard
  success/failure/fallback only if a target implementation is in scope;
- pre-existing truthful result status, retained focus and no duplicate/chatty
  announcements when target feedback is present;
- popup/new-context target/rel security for provider destinations;
- host/separate rail collision, safe-area, mobile relocation, print and
  focus-not-obscured behavior if sticky placement is retained;
- source-identical target CSS, neutral/Shopify adapter validation and target
  runtime cleanup;
- deterministic L9/Blog/Web/runtime budgets and production build outside
  `site/dist`;
- Mobile, Tablet, Desktop and XL before/after images through one bounded server,
  one `gallery-refinement` headless Chromium session and one tab, followed by
  cleanup and `evidence:assert-clean`.

## Risks And Open Questions

1. Does result feedback remain inside each target action composition, or should
   L9 expose one optional pre-existing status slot shared by copy/share actions?
2. Which provider/email destinations are commercially approved, who owns URL
   templates/encoding/canonical URL/target/rel/privacy/analytics, and what
   fallback is required when native APIs are unavailable?
3. Which Shopify surface is first: theme article/product, App Home/POS, Customer
   Account, or another target? Which native adapter primitive and editor schema
   apply there?
4. What Button variant/size, visible versus icon-only labels, icon source,
   action order/count, gap, inline/stacked response, rail placement, feedback,
   and Mobile-through-XL light/dark/forced-color visuals are owner-approved?
5. Where is the L9-specific Figma reference?

## Readiness Decision

Ready for human review under accepted decision `L9-A`. The canonical
`.share-buttons` family, inline/stacked layouts, curated-plus-custom action
model, omission of unavailable actions, provider boundary, canonical Button
composition, shared Exhibit/Studio renderer, responsive/special-mode evidence
and separate host/Share Rail placement are reconciled. Real Web/Shopify
consumers, current provider mappings, final visuals, L9-specific Figma evidence
and explicit human stability review remain open. Contract stays `pilot`; no
`stable` promotion is authorized.
