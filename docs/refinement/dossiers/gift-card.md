# Component Dossier: Gift Card Page

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify issued-gift-card template mapping and
future-target translation

Contract: `components/contracts/gift-card.contract.json`

## Recommendation

Certify Gift Card as an issued-card credential and recovery composition, not as
a product-purchase form, redemption engine, account balance service, wallet
provider, print service or commerce database. Require a non-empty issuer,
target-formatted remaining balance, visible page heading, use instructions and
redeemable code. Keep the artwork media optional while retaining a coherent
textual card surface when no image is supplied.

Compose the copy action and every target-owned action from canonical Button.
Keep the code selectable independently of clipboard support and give the copy
action a visible label. Pre-render an empty polite status container before a
target updates copy feedback. Keep optional target details, QR media and form
composition explicit slots; they do not grant the neutral component ownership
of data freshness, purchase, redemption, wallet, print or lookup behavior.

Preserve the optional form boundary accepted by ADR 0084, but make it absent
from the default fixture because no neutral workflow has been approved. When a
target supplies the slot, it must compose canonical Input and Button, use a
named native field, preserve constraint validation and provide truthful result
handling. Whether that slot remains in the stable v1 API is a human architecture
decision, not something this batch infers.

Use a labelled contextual `section` in Exhibit and Studio so the documentation
site keeps its single `main`. Standalone Web and target templates place the
composition in their one document-level main. Use a named inline-size container
for a stacked-to-split editorial layout and remove the parallel Studio-only
responsive implementation.

Implement Shopify as a target-native `gift_card.liquid` template, because the
platform supplies a real `gift_card` object and requires a non-JSON template.
Map current balance, code, active/expired/disabled state, expiration, issuer,
QR identifier and Apple Wallet URL from Shopify without promoting those Liquid
fields to neutral runtime or a universal commerce store.

## Purpose And Limits

- Presents an already-issued gift card, its issuer, remaining value, use
  instructions and redeemable code.
- Supports optional decorative media, target-formatted details, clipboard
  assistance, QR media, target actions and an explicitly target-owned form.
- Owns visual hierarchy, source order, intrinsic responsive layout and the
  relationships between its supplied regions.
- Canonical Button owns action and navigation-button appearance, native
  semantics, focus, disabled/busy states and motion. Canonical Input owns field
  labels, value, validation, messages and controlled/uncontrolled translation.
- The issuing target owns balance freshness, enablement, expiration,
  localization, currency formatting, redemption, purchase, account
  association, wallet passes, printing, QR payload and service responses.
- It is not the gift-card product purchase form, a checkout payment field, an
  account card list, a generic coupon, a loyalty balance, a stored-value ledger
  or a QR generator.

## Pre-Refinement Gallery Baseline

- Registry `P2`, category `pages`, no dependencies; contract `0.2.0`, `pilot`;
  sixteen anatomy parts, seven states, three behaviors, eleven properties and
  22 public tokens.
- The required `visual`, `amount`, `heading` and `code` do not gate rendering;
  empty required values still leave an invalid shell.
- The shared renderer emits `<main class="gift-card">` inside the docs site's
  existing `main`, producing a nested visible main landmark.
- Copy and target actions duplicate Button dimensions, color, border, focus,
  hover, touch and transition CSS instead of composing `.btn`. Copy is an
  icon-only full-width row at common Studio widths, despite having enough room
  for a visible label.
- `Browse works` points to `#browse` and cancels native navigation. `Print`
  invokes a browser side effect as if it were a neutral default capability.
- The QR fixture is a Lucide glyph with `role="img"`; it neither encodes the
  supplied card nor provides visible purpose text.
- The default fixture enables a generic form whose field has no `name`, is not
  required, opts out of native validation and does not identify a real workflow.
- Copy and form status regions are mounted only after feedback exists, weakening
  the established status-message pattern that expects the live container before
  the update.
- The visual image is announced as a vase even though it is decorative card art
  and all gift-card information appears separately in text.
- CSS contains physical properties, literal spacing, raw white/black/scrim
  values, a viewport breakpoint and duplicated Studio container overrides.
- Exhibit and Studio already share `PagesStudio`, but their common output
  preserves the semantic, navigation and composition defects.
- No Shopify `templates/gift_card.liquid` exists. The adapter is CSS-only and
  cannot map the platform gift-card object, QR, wallet or copy behavior.
- Deterministic baseline is `1,099 B` gzip for the P2 slice, `2,656 B` for the
  complete Pages stylesheet, `67,099 B` for Neutral Web component CSS and
  `10,501 B` for shared neutral runtime. P2 contributes no neutral JavaScript.

Before evidence is stored in
`output/playwright/refinement/gift-card/before/`: paired Mobile and Desktop
Exhibit/Studio captures. The single browser/server phase was closed
immediately; port `4173` and owned processes were empty afterward.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Standard: `main`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element) | A document has one dominant visible main content region. | Exhibit/Studio use a contextual labelled section; standalone targets own the document main. |
| [HTML Standard: forms](https://html.spec.whatwg.org/multipage/forms.html) | Native buttons, fields, labels, submission and constraint validation carry established semantics. | Optional workflow composition keeps native form behavior and canonical Input/Button ownership. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines Button and landmark patterns but no gift-card widget. | Use native document content and canonical controls; do not invent a `giftcard` role or keyboard model. |
| [WCAG status-message failure F103](https://www.w3.org/WAI/WCAG22/Techniques/failures/F103.html) and [ARIA22](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA22) | An action result that does not move focus needs a programmatically determinable status container present before the update. | Render an empty polite status node before copy/form feedback and update its text truthfully. |
| [Clipboard API](https://w3c.github.io/clipboard-apis/#dom-clipboard-writetext) | `writeText()` is permission-controlled and may reject; clipboard access is not a guaranteed styling feature. | Keep the code selectable, attempt copy only after activation and announce success or selection fallback. |
| [Shopify gift-card template](https://shopify.dev/docs/storefronts/themes/architecture/templates/gift-card-liquid) | Issued cards use a dedicated Liquid template, `gift_card` object, QR support and optional wallet pass; the template cannot be JSON. | Add a target-native Liquid document and keep its platform object/runtime out of the neutral source. |
| [Shopify `gift_card` object](https://shopify.dev/docs/api/liquid/objects/gift_card) | Shopify supplies balance, code, enabled/expired state, expiration, QR identifier, pass URL and recipient data. | Map those fields in Shopify; neutral properties remain supplied/formatted content rather than calculations. |
| [Shopify Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements#gift-card-page-requirements) | A Theme Store gift-card page supports Apple Wallet and shows code, a minimum 120px QR, and logo or shop name. | Shopify target must implement all four requirements even though QR/wallet are optional neutral slots. |
| [Shopify Skeleton gift-card template](https://github.com/Shopify/skeleton-theme/blob/main/templates/gift_card.liquid) | Shopify's approved theme foundation renders balance, state, expiration, issuer, instructions, code and wallet conditionally. | Use it as platform evidence, not source code or visual identity; retain The Gallery markup and tokens. |
| [Polaris Button](https://polaris-react.shopify.com/components/actions/button) | Actions use buttons, navigation uses links/anchor-backed Buttons, and visible labels are preferred over icon-only names. | Copy uses a visible canonical Button; target destinations keep native anchors with Button presentation. |
| [Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition) | Composite features pass behavior to accessible leaf components rather than recreating their DOM/state styling. | P2 arranges Button/Input leaves and removes duplicate action/field behavior. |

Open UI has no gift-card component or interoperable issued-value credential.
Its absence supports ordinary document semantics and target-owned commerce data;
it does not justify a custom role, universal ledger API or framework store.

### Mature-system comparison

- HTML, WAI, Polaris and Radix converge on native controls with clear names and
  primitive composition. The current raw copy/action styles diverge from that
  model.
- Shopify distinguishes an issued-card page from the product form that sells a
  gift card. The current generic P2 form blurs those surfaces unless it remains
  an explicit target slot with no neutral default.
- Shopify exposes real platform data for balance, lifecycle, QR and wallet. The
  neutral component can accept equivalent supplied content without calculating
  or refreshing it.
- No mature source defines a universal balance-check, redeem, purchase, wallet
  or print action for every target. Those capabilities remain explicit target
  decisions.

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
and inspector `1020:480`. All 183 Studio definitions currently share those
same identifiers. Prior direct inspection in this refinement program confirmed
that the frame is the generic Button component-detail shell and the inspector
contains Button controls. There is no Gift Card composition, issued-value
state, QR/wallet treatment, responsive state or P2-specific token to compare.
The repository candidate is therefore the visual proposal for human review;
no P2 aesthetic approval is inferred from generic Button evidence.

## Recommended Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | contextual labelled `section`; hosted by standalone target main | P2 / target | Omitted when any required string is empty. |
| Layout | yes | generic composition container | P2 | Stacked or split strictly by component width. |
| Card surface | yes | generic visual summary | P2 | Exists with or without optional background media. |
| Visual media | no | decorative image/media | target | Empty alt; issuer and balance remain real text. |
| Issuer | yes | visible text | target | Identifies who issued the card; not hidden in image alt. |
| Balance | yes | target-formatted visible text | target | No arithmetic or currency inference. |
| Content | yes | generic flow | P2 | Contains heading, instructions, code and optional regions. |
| Heading | yes | contextual heading | target | Rank follows host hierarchy. |
| Instructions | yes | paragraph | target | Explains use without claiming unsupported workflows. |
| Code group | yes | labelled generic region | P2 | Keeps code, copy action and status together. |
| Code | yes | native `code` text | target | Selectable even when copy is absent or fails. |
| Copy action | no | canonical Button | Button / target | Visible label; target owns Clipboard attempt. |
| Copy status | conditional | pre-existing polite status | target | Empty before activation; text changes after result. |
| Details | no | semantic target slot | target | May contain status, expiration, initial value or recipient message. |
| Actions | no | grouped canonical Buttons/anchor Buttons | Button / target | No neutral purchase/redemption/wallet/print default. |
| QR | no | figure with decorative code graphic and visible caption | target | Human-readable code remains equivalent path. |
| Form | no | named native form with Input/Button | target | Existing pilot slot; no neutral default workflow. |

## Variant, State, Size, And Mode Matrix

- Variant/size: one issued-card editorial profile. Card ratio, split ratio,
  measures, gaps and thresholds remain private visual composition.
- Required content: non-empty issuer, balance, heading, instructions, code label
  and code.
  Invalid required content omits the renderer.
- Visual: media absent (tokenized surface) or present as decorative background;
  issuer and balance remain visible text in both cases.
- Copy: absent; available/resting; pointer hover/active; keyboard focus; success;
  permission/failure selection fallback. Button owns visual states.
- Details: absent or target-composed status/expiration/recipient/initial-value
  facts; no P2 state calculation.
- Actions: absent or one/multiple native Button compositions. Navigation uses
  anchors; actions use buttons.
- QR: absent or target-supplied figure with at least 120px rendered code where
  the target requires it and visible purpose text.
- Form: absent by default; when present, native empty/valid/invalid submission,
  Input states, Button states and truthful target result behavior.
- Responsive: intrinsic single-column, then split visual/content at the named
  container threshold. Code/action and action groups wrap or stack without
  viewport queries or Studio overrides.
- Content: short, long, empty optional, localized, RTL, unbroken code/labels,
  zero-decimal/long currency strings and effective 200% type.
- Modes: light, dark, forced colors, reduced motion, keyboard, touch, screen
  reader and no-hover. P2 adds no authored motion.

## Public API And State Ownership

The refined `0.3.0` pilot exposes twelve semantic properties:

- `visual` - optional decorative background-media slot.
- `issuer` - required non-empty visible issuer name.
- `balance` - required target-formatted remaining balance string.
- `heading` - required non-empty contextual heading.
- `instructions` - required non-empty use guidance.
- `codeLabel` - required non-empty visible code label.
- `code` - required non-empty visible/selectable redeemable code.
- `copyLabel` - optional visible label enabling a target-owned copy Button.
- `details` - optional supplied semantic facts/status slot.
- `actions` - optional target-owned canonical Button composition.
- `qr` - optional target-supplied QR figure and purpose text.
- `form` - optional target-owned native Input/Button composition retained from
  ADR 0084 pending human architecture review.

The stable review must decide whether the existing generic `form` slot remains.
The recommended issued-card core is the first eleven properties through `qr`;
`form` remains a pilot-only compatibility boundary and is not a default.

Do not expose numeric amount calculation, currency conversion, balance
freshness, lifecycle booleans, account/customer objects, QR payload, wallet
provider, print implementation, endpoint, pending/error store, clipboard API,
layout alignment, measures, ratios, gaps, breakpoints or dependency variants.

P2 has no neutral controlled/uncontrolled store. The target supplies immutable
render content or refreshes it through its own data lifecycle. Clipboard result
and optional form values live in the target adapter; framework form adapters may
bind Input in controlled or uncontrolled form without adding a P2 value store.

## Token And Value Audit

- Keep only page-owned surface, border, primary/secondary/inverse text,
  display/heading/body/caption typography, visual radius/shadow and semantic
  section/component spacing tokens used by P2 composition.
- Remove Button background/text/border/focus/touch/transition/easing tokens
  from P2; canonical Button owns them. Remove Input tokens for the same reason.
- Replace raw `white`, black scrim, pixel spacing and physical dimensions with
  semantic tokens and logical properties. Use the existing scrim opacity token
  through a private color-mix value, held solid beneath the complete text area
  before fading so arbitrary target media cannot remove text contrast.
- Keep card/content measures, aspect ratio, split ratio, code tracking and
  container thresholds as `--_` private properties. They are compositional and
  not stable target API.
- P2 adds no neutral animation, transition, asset, listener, observer, timer,
  request or formatter. Shopify-specific QR/copy/print work remains isolated to
  its target asset.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Neutral Web | Contextual labelled section, native code/status/form markup, canonical Button/Input, target-supplied data. | Implemented, generated, validated and browser-evidenced with zero neutral runtime. |
| Shopify | Dedicated non-JSON `gift_card.liquid`, `gift_card` object, QR identifier, pass URL, code, balance, state, expiration and shop identity. | Implemented with target-only QR/copy/print runtime, localized EN/ES and scoped zero-offense Theme Check. |
| Webflow | Source-identical Pages CSS; project supplies real issued-card content and actions. | Generated and SHA-256-identical to canonical Pages CSS. |
| React / Angular | Thin semantic wrapper plus optional target clipboard/form callbacks; no ledger/store. | Planned. |
| Figma | Approved visual surface with required issuer/balance/code and optional regions composed from canonical instances. | Planned; registered nodes are generic Button evidence. |
| SwiftUI / Compose | Native issued-card view, selectable/copyable text and platform wallet/QR actions when supported. | Planned; target owns data and capabilities. |

## Open Decisions And Human Review

- Approve or revise split/stack composition, card ratio/crop/scrim, typography,
  code treatment, QR placement, measures, spacing and action hierarchy.
- Approve issuer, balance, heading, instructions and code as the required core.
- Decide whether the existing generic `form` slot remains in stable v1 or is
  removed until a specific balance/redemption/purchase workflow is accepted.
- Decide which optional detail facts deserve dedicated future properties rather
  than remaining target-composed content.
- Confirm that copy is the only safe neutral interaction and that wallet,
  print, shop navigation, redemption, purchase and balance lookup remain
  target-owned capabilities.
- Supply P2-specific Figma/reference artwork and final target copy.
- Keep contract `pilot`; no automated or technical result promotes stability.

## Refinement Outcome

The canonical contract, registry, CSS, shared Exhibit/Studio renderer, Studio
metadata, MDX, Neutral Web, Webflow and Shopify target now implement the
recommended direction. Required-string omission, optional-slot omission,
native copy success/fallback, real navigation, pilot-form native constraints,
direct `200/320/520/1120px` containment, four viewports, Arabic RTL/long/
unbroken content, effective 200% type, light/dark, forced colors, reduced
motion and exact normalized Exhibit/Studio DOM parity pass.

Paired before evidence is in `output/playwright/refinement/gift-card/before/`.
Thirteen after captures are in
`output/playwright/refinement/gift-card/after/`. The detailed result and human
queue are recorded in `docs/reports/gift-card-web-refinement-audit.md` and ADR
0161. P2 remains `pilot` pending explicit human review.
