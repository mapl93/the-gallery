# Component Dossier: Trust Badges

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation and future-target boundary

Contract: `components/contracts/trust-badges.contract.json`

## Recommendation

Keep G5 as a passive native list of short, text-complete, target-supplied
commercial assurances. Every valid item requires one non-empty visible
statement. One optional visual may reinforce that statement but is always
decorative; color or iconography can never carry the assurance by itself.

Retain Default and Compact as presentation density choices. Use semantic Body
Small typography for Default and Caption typography for Compact, intrinsic
flex wrapping, logical gaps and no component runtime. Add an optional
`accessibleLabel` so a target can name the list when surrounding visible context
does not already do so. Omit invalid empty items and omit the entire root when no
valid statement remains.

G5 should not compose canonical Badge. Gallery Badge is a bounded status or
metadata label with Info/Success/Warning/Error variants and optional live
announcement. “Trust badge” is an industry name for an assurance statement;
rendering each item as Badge would add false status semantics and pill styling.

G5 also remains distinct from Shipping Info. Trust Badges contains only one
brief assurance string per item in an inline/wrapping row. Shipping Info is a
section-scale list whose items require a label and may add supporting policy or
service text and larger media. This selection rule avoids duplicate consumer
outputs while preserving two useful content densities.

## Purpose And Limits

- Summarizes a small set of independent commercial assurances near a product,
  cart, checkout or relevant campaign context.
- Requires every meaning to be visible as text and understandable without
  icon, color or layout.
- Owns native list/item anatomy, optional decorative visual placement,
  Default/Compact density and intrinsic wrapping.
- May be named with an optional localized accessible label when the surrounding
  context does not already identify the collection.
- Does not verify a guarantee, certification, security control, delivery time,
  insurance, return policy, origin, sustainability, compliance or payment
  capability.
- Does not retrieve policies, observe inventory, track shipping, inspect
  checkout security, validate evidence, localize legal claims or choose which
  statements are material in a jurisdiction.
- Does not own links, tooltips, disclosure text, policy detail, live status,
  interaction, focus, events, controlled state, analytics or runtime.
- Is not canonical Badge, Shipping Info, Payment Icons, Status, Alert, Tag or a
  certification-mark registry.

## Current Repository Baseline

- Registry identity `G5`, category `marketing`, dependency depth `0` and review
  order `88`; no dependencies.
- Contract `0.2.0`, `pilot`: root/badge/icon anatomy, Default/Compact variants,
  one size/state, two behaviors, `variant` plus required `items`, and three
  public token references.
- The summary already defines passive factual statements and decorative icons,
  but native `ul`/`li`, strict valid-item/root omission, text anatomy, target
  claim ownership, responsive behavior and zero-runtime boundary are implicit.
- The renderer and MDX correctly use native `ul`/`li`, readable text and hidden
  Lucide/SVG icons. The required Studio items control can nevertheless produce
  an empty `ul` because the renderer does not guard invalid composition.
- The fixture hardcodes `aria-label="Purchase assurances"`, but the contract
  exposes no semantic label property. Future targets would have to copy this
  English fixture string or diverge.
- Renderer items lack explicit icon/text part classes. Contract targets only
  direct SVG and cannot describe target images, future-target visuals or text
  containment independently.
- CSS suppresses no list defaults itself and relies on surrounding reset. Native
  list exposure after marker removal is not explicit.
- Default and Compact derive `14px` and `12px` from `--typo-body-size` through
  numeric multiplication. Neither has body family, semantic weight or line
  height; text-only enlargement can therefore inherit an absolute line height.
- Root gaps/padding (`16/24px`), item gap (`8px`) and icon geometry (`20px`) are
  hardcoded physical values without classification. Flex wrapping is already
  intrinsic and needs no viewport query.
- Item text can wrap, but the anonymous flex child has no explicit
  `min-inline-size: 0`; long unbroken localized content needs a named containment
  part.
- Icons always use the success color. That is a visual convention, not proof
  that a claim is true, current or verified.
- No G5 selector or behavior exists in neutral `components/js/theme.js`; the
  component correctly adds no runtime, asset or request.
- Shopify has copied Marketing CSS only. It has no Liquid, schema, data mapping,
  editor blocks or target-specific visuals; the contract correctly reports
  `planned`.
- Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame
  `943:7` and inspector `1020:480`. These are the generic Button/Studio shell,
  not G5 visual evidence.
- Existing before evidence covers Exhibit and Studio at Mobile and Desktop in
  `output/playwright/parity/marketing/trust-badges-*.png`.
- Current visual output is readable and compact, but its fixture claims,
  success-green icon convention, 12px Compact type, alignment, spacing and
  wrapping are repository proposals rather than owner approval.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML grouping content](https://html.spec.whatwg.org/dev/grouping-content.html) | `ul` represents a list whose item order is not materially significant and direct items are `li`. | Use one native unordered list and preserve authored/source order without adding a widget role. |
| [WAI decorative images](https://www.w3.org/WAI/tutorials/images/decorative/) | A visual whose information is already supplied by adjacent text should be ignored by assistive technology. | Require complete visible item text and keep redundant icons/images decorative. |
| [WAI ACT decorative exposure rule](https://www.w3.org/WAI/standards-guidelines/act/rules/46ca7f/) | Correctly marked decorative content is excluded from the accessibility tree. | Browser evidence must show no duplicate icon names while visible statements remain. |
| [FTC advertising basics](https://www.ftc.gov/business-guidance/advertising-marketing/advertising-marketing-basics) | Advertising claims must be truthful, non-deceptive, fair and evidence-based; specialized claims may have additional rules. | Targets own claim selection, evidence, qualification, localization and lifecycle. G5 must not synthesize or verify assurances. |
| [FTC advertising FAQ](https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business) | Both express and implied material claims require a reasonable evidentiary basis before publication. | Icon, color, placement and wording together may imply a claim; decorative presentation does not shift responsibility to the component. |
| [Open UI Badge research](https://open-ui.org/components/badge.research/) | Mature Badge concepts cover labels, counts, color, icons and status-like indicators; no Trust Badges collection pattern is defined. | Do not inherit status/count/live APIs or claim a standardized trust component. |
| [Radix Themes Badge](https://www.radix-ui.com/themes/docs/components/badge) | Badge is a styled `span` with size/variant/color/radius presentation. Radix Primitives supplies no Trust Badges collection. | G5 remains native list content; adopting a framework status pill would not improve semantics. |
| [Shopify checkout component inventory](https://shopify.dev/docs/api/checkout-ui-extensions/latest/web-components) | Polaris separates Badge status, Icon visuals, Payment Icon brand marks, Unordered List and layout containers. | Shopify targets compose text-complete assurance items from target primitives; payment brands and system status remain separate components. |

No APG interaction pattern applies. Trust Badges is passive document content,
not a widget, so it needs no custom role, focus model, live region or keyboard
commands.

## Mature-System Comparison

- HTML provides the stable collection model: `ul`/`li` with ordinary visible
  text and no interaction.
- WAI makes the icon boundary contextual. G5 deliberately narrows every visual
  to decorative because complete visible wording is required for commercial
  auditability.
- Open UI and Radix use Badge for individual labels/status-like presentation,
  not for a row of guarantees. They provide no reason to import Badge state or
  pill styling into G5.
- Polaris distinguishes status Badge, standardized Payment Icon, generic Icon,
  Unordered List and layout. That separation agrees with keeping G5 a thin
  list composition rather than an icon catalogue or payment-brand surface.
- FTC guidance reinforces target ownership of express and implied claims. The
  component can enforce visible text and honest fixture framing, but cannot
  certify truth.

## Owner Reference Analysis

The registered Figma frame/inspector belong to the generic Button Studio pilot.
They contain no G5 item density, icon language, wrapping, alignment, typography,
success color, Default/Compact comparison or product/cart placement. The four
existing PNGs are therefore implementation baseline, not visual approval.

They show a coherent compact row but leave these human questions open:

1. whether Default and Compact are visually distinct enough to remain public;
2. whether success green incorrectly implies verified/active status;
3. whether centered wrapping and a 12px Compact label are appropriate; and
4. whether the sample checkout/delivery/packaging statements reflect intended
   Gallery content or should remain explicitly marked examples.

## Anatomy And Canonical Composition

| Part | Required | Semantic element/role | Owner | Direction |
| --- | --- | --- | --- | --- |
| Root | yes | `ul.trust-badges[role=list]` | Trust Badges + target | One or more valid statements; optional localized accessible name; omit if empty. |
| Item | yes | `li.trust-badge` | Trust Badges + target | One independent target-supplied assurance; passive and non-focusable. |
| Visual | no | `.trust-badge__icon[aria-hidden=true]` or target equivalent | target | Decorative only; no icon-only item or accessible duplicate. |
| Text | yes | `.trust-badge__text` ordinary text | target | Non-empty and complete meaning; wraps without truncation. |

Explicit `role=list` preserves native list exposure in environments that may
drop it when CSS removes markers. It does not replace the native elements or
introduce a widget model.

## Variant, State, Size, Mode And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Presentation | Default Body Small density; Compact Caption density. |
| Required content | At least one item with a non-empty visible statement. |
| Optional content | Per-item decorative visual; root accessible label. |
| Empty/invalid | Omit blank items; omit complete root when zero valid items remain. |
| Interaction | None; links, controls or disclosures are different canonical compositions. |
| Controlled/uncontrolled | Not applicable; target supplies current claims as content. |
| Status/live | None; success color never creates status semantics or verification. |
| Theme | Semantic secondary text and decorative success/accent visual. |
| Forced colors | Visible text remains system-readable; decorative visual may map to CanvasText or disappear. |
| Reduced motion | No authored animation or transition. |
| RTL | Logical gaps, natural text direction and source order; no physical offsets. |
| Responsive | Intrinsic flex wrapping based on component content box; no viewport query. |
| Extreme content | Long localized and unbroken statements wrap; no clipping/truncation. |
| Text enlargement | Effective 200% type retains relative line-height floors and contained items. |

Invalid composition includes an empty native list, empty visible statement,
icon-only item, informative visual without text equivalent, interactive list
item, live/status role, hidden commercial qualification, or a component-
generated guarantee.

## Public API And Ownership

Expose three semantic decisions:

- `variant` — Default or Compact presentation density.
- `items` — required target-owned repeated composition of valid statement text
  plus an optional decorative visual.
- `accessibleLabel` — optional localized list name when surrounding visible
  context does not already identify the assurances.

Do not expose item count, columns, gap, alignment, padding, icon size, color,
icon name, asset URL, line clamp, breakpoint, guarantee type, verified state,
evidence, source, expiration, jurisdiction, policy URL, status, loading, error,
event or analytics. These are private composition, target content/governance or
different components.

G5 has no controlled/uncontrolled strategy. React/Angular receive current
children or records; Shopify receives editor blocks; Webflow/Figma/native
targets use their own content model. Dynamic claim changes are target-owned and
must not be announced merely because G5 exists.

## Relationship To Existing Components

| Component | Selection rule |
| --- | --- |
| Badge | One compact status/metadata label, optional live update; not a commercial assurance collection. |
| Shipping Info | Section-scale service/policy list with required item label plus optional supporting text/media. |
| Trust Badges | Small wrapping row/list of one-line, text-complete commercial assurances. |
| Payment Icons | Recognized payment method brand marks; does not claim security or acceptance beyond target data. |
| Certificate | Target-owned issued record and optional verification destination; not a marketing claim row. |

These distinctions are semantic and consumer-facing. Shared native list
patterns do not require G5 to compose a visually incompatible section-scale
component.

## Alternatives Considered

| Alternative | Assessment |
| --- | --- |
| Generic `div` row | Loses collection semantics; reject. |
| Canonical Badge children | Adds status/pill semantics and visuals that do not match assurance statements; reject. |
| Shipping Info Compact alias | Could reduce identities, but Shipping Info supports label+body/media section records while G5 deliberately permits only one brief string; keep the documented boundary. |
| Informative icon mode | Duplicates or fragments the commercial claim and creates cross-target icon/alt API; require complete text and keep visuals decorative. |
| Linkable/clickable item | Converts passive claims into navigation or disclosure; compose canonical Link/Button separately under a different contract. |
| `role=status` or live region | Static/current claims are not user notifications; reject. |
| Component verification flag | Presentation cannot establish truth, evidence or current validity; reject. |

## Token And Hardcoded-Value Audit

| Current fact | Direction |
| --- | --- |
| Secondary visible text | Existing semantic public token remains appropriate. |
| Success visual color | Existing token may remain a visual candidate; contract must state it never verifies the claim. |
| `calc(body * .875)` Default type | Replace with complete Body Small family/size/weight/line-height profile. |
| `calc(body * .75)` Compact type | Replace with complete Caption size/line-height while inheriting body family/weight. |
| Root `16/24px`, Compact `8/16px`, item `8px` gaps | Map to existing element-gap token and private derivations; do not expose geometry. |
| `16px` padding | Map to existing element-gap token. |
| `20px` icon | Keep as private `1.25rem` presentation value; no generic icon token or public size property is justified. |
| Anonymous text child | Add a named text part with `min-inline-size:0` and `overflow-wrap:anywhere`. |

No new token or token layer is required.

## Responsive, Content And Accessibility Test Plan

- Paired Mobile `390x844`, Tablet `768x1024`, Desktop `1280x900` and XL
  `1536x960` Exhibit/Studio captures.
- Direct roots at `200`, `240`, `320`, `520`, `700`, `900` and `1200px`, checking
  natural wrapping, client/scroll equality and source order.
- Default and Compact, one item, three items, no visual, no accessible label,
  empty required items and blank target records.
- Short, long Spanish/German, Arabic RTL, mixed scripts, long unbroken strings
  and effective 200% type.
- Native list/listitem accessibility tree, optional list name, no icon names,
  roles beyond `list`, focusable descendants or live regions.
- Light/dark contrast for text and decorative visual, forced colors and reduced
  motion.
- Exact normalized Exhibit/Studio DOM and computed-style parity.
- Shopify valid/blank blocks, Default/Compact class, optional decorative image,
  optional localized list name, editor attributes and empty-root omission.

## Performance Budget

- Current G5 CSS slice is `672 B` raw / `351 B` gzip.
- Marketing is `4,146 B` gzip against its permanent `4.1 KiB` (`4,198 B`)
  ceiling, leaving only `52 B` headroom.
- Generated Neutral Web component CSS is `67,751 B` gzip against `65,536 B`, a
  program-level `2,215 B` gap.
- Shared runtime is `10,501 B` gzip against `8,192 B`, a program-level `2,309 B`
  gap. G5 must add `0 B` runtime.
- G5 refinement must recover obsolete numeric rules and stay within the family
  ceiling. The ceiling is not raised for typography or anatomy completeness.
- No listener, observer, timer, request, formatter, custom element, asset or
  layout read belongs to neutral G5.

## Target Translation

- Neutral Web: native named-or-contextual list, valid passive items, decorative
  visuals, intrinsic wrapping and zero runtime.
- Shopify: dedicated reorderable block section with required statement,
  optional decorative image, Default/Compact selection, optional localized list
  name, strict omission, editor attributes and zero component script.
- Webflow: CMS/list collection with text-complete items and optional decorative
  visuals; target content governance verifies claims.
- React/Angular: thin native-list renderer; adapter records remain target-owned
  and do not mirror status or interaction.
- Figma: repeated text plus optional decorative visual, Default/Compact density
  and existing semantic tokens after G5-specific evidence exists.
- SwiftUI/Compose: native passive collection with decorative accessibility
  treatment and platform wrapping.

## Open Product And Human Boundary

This dossier intentionally does not approve:

- any checkout, delivery, packaging, returns, warranty, security,
  certification, origin, sustainability or insurance statement;
- claim evidence, qualifications, source, validity period, jurisdiction,
  localization, ordering, policy destinations or publication workflow;
- final item count, alignment, gaps, inset, visual size/style/color, Default/
  Compact distinction, type scale, wrapping, fixture copy or placement;
- an icon catalogue, certification mark registry or informative visual mode;
- component-specific Figma evidence; or
- promotion from `pilot` to `stable`.

These are target commercial/content responsibilities or human visual choices.
They do not block the narrow passive structural refinement.

## Certification Plan

1. Record native-list, text-complete claim, decorative-visual and target-truth
   ownership in an ADR.
2. Advance the contract, add text/item anatomy, strict omission and optional
   accessible label without adding interaction or claim state.
3. Keep Exhibit and Studio on one `MarketingStudio` renderer/fixture and align
   the MDX fallback.
4. Replace calculated typography and unclassified spacing with existing
   semantic tokens/private derivations while staying within Marketing budget.
5. Add a target-native Shopify block section with no default commercial claims.
6. Regenerate Web, Shopify and Webflow copied outputs required by source changes.
7. Capture four viewports, direct widths, optionals, localized/extreme/200%
   content, semantics, contrast and modes in one managed evidence phase.
8. Validate contracts, Studio, docs, adapters, parity, budgets, cleanup and
   unchanged `site/dist`.
9. Mark human-review-ready only after gates pass; keep `pilot` until explicit
   human stability approval.

## Implemented Result

Completed on 2026-07-16 without promoting the contract from `pilot`:

- Contract `0.3.0` now defines native root/item/icon/text anatomy, strict
  blank-item/root omission, text-complete items, optional localized list naming,
  intrinsic wrapping and target commercial-claim ownership.
- The shared `MarketingStudio` renderer returns no root without required items,
  keeps the slot checked/disabled, maps `accessibleLabel` directly, adds stable
  icon/text parts and marks every sample statement explicitly as an example.
- Exhibit and Studio retain one renderer, one fixture and one implementation.
  Their normalized root DOM shares SHA-256
  `3641477f05912f8b050e73c5d192b2b49108b21a6c14aba2f83ab7e1eae18ed1`;
  equal-width computed and opaque-pixel output is identical.
- Canonical CSS uses complete Body Small/Caption profiles, existing element-gap
  composition, logical containment and explicit text wrapping. G5 remains
  passive and adds no runtime.
- Shopify now has an addable localized section with variant and optional
  accessible-label settings, repeated non-empty statement blocks, optional
  decorative images, blank presets, editor attributes and strict empty-root
  omission. `shopify-maturity-v1` reports it ready.
- Default/Compact, Mobile/Tablet/Desktop/XL, direct `200–1200px` roots,
  minimal/no-label/no-icon content, localized/unbroken/Arabic RTL/effective-200%
  text, native accessibility tree, light/dark contrast, forced colors and
  reduced motion passed in one managed headless session.
- Direct roots have equal client/scroll dimensions and contained descendants.
  The accessibility snapshot exposes one list and three text-complete list
  items with no icon names, focusable descendants or live regions.
- Light/dark text contrast is `7.81:1` / `12.09:1`. Reduced-motion inspection
  reports no authored animation or transition.
- G5 CSS is `1,225 B` raw / `464 B` gzip. Marketing is `4,181 B` gzip against
  the unchanged `4,198 B` ceiling, leaving `17 B`; G5 adds `0 B` runtime.
- Canonical, Webflow and Shopify Marketing CSS share SHA-256
  `34ca10019b19c1fa188c070315017f88d6d6abe2d1759f4eca83cd24894b6b94`.
- ADR 0167 records the accepted semantic and target boundary. The certification
  report is `docs/reports/trust-badges-web-refinement-audit.md`; after evidence
  is under `output/playwright/batch85-trust-badges/after/`.
- Final alignment, gaps, inset, visual treatment/color, Default/Compact density,
  fixture wording, placement and corrected G5-specific owner reference remain
  explicitly pending human review.
