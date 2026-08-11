# Component Dossier: Accordion

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/accordion.contract.json`

## Recommendation

Keep Accordion as a vertical group of target-coordinated disclosure items, but
make each trigger an explicit heading child and make collapsed panels truly
hidden from rendering, focus, and assistive technology. Preserve per-item
`expanded` ownership and consumer-owned single/multiple coordination from ADR
0071; add required repeated-item composition and an item-disabled state without
freezing a framework value model.

The current grid-row close animation must not leave collapsed content operable.
The neutral baseline should prefer immediate `hidden` correctness; targets may
add measured entry/exit animation only if hidden/focus semantics remain correct.

## Purpose And Limits

- Organizes related, independently understandable sections into scannable
  headings whose content can be shown or hidden.
- Useful for FAQs, product details, and secondary information; unsuitable for
  mandatory steps, unrelated navigation destinations, or controls that need to
  stay simultaneously visible.
- One item owns heading, trigger, optional indicator, panel, and content.
- Page authors own heading rank and whether panel landmarks are helpful.
- Group single-open, multiple-open, and at-least-one-open policies remain target
  composition choices until a group-value API is explicitly accepted.
- Horizontal accordion is outside v1; Tabs or other navigation may be more
  appropriate depending on content semantics.

## Current Gallery Baseline

- Registry `B6`, Layout, no dependencies; contract `0.2.0`, `pilot`.
- Seven anatomy parts, one variant, one size, five states, three behaviors, one
  `expanded` property, and fourteen public token references.
- Trigger is a native Button with `aria-expanded`/`aria-controls`; panel has an id
  and optional `role="region"`/`aria-labelledby` in fixtures.
- The APG-required heading wrapper is absent from contract, MDX, and renderer.
- A collapsed panel remains in DOM and in the accessibility/focus trees because
  only `grid-template-rows: 0fr` changes. This is unsafe for panels containing
  links or controls.
- Padding `16px`, icon `20px`, weight `600`, and several layout values are
  hardcoded; content typography otherwise uses semantic tokens.
- Exhibit and Studio share `DisclosureNavigationStudio`; its three-item fixture
  allows independent multiple-open behavior and site-only Lucide indicator.
- Studio reference metadata points to the same generic owner frame as the other
  disclosure/navigation components, so current CSS is the visual baseline.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) | Each header Button is the only child of a heading; `aria-expanded` and `aria-controls` stay synchronized; Enter/Space activate; region is optional and should not proliferate. | Add heading anatomy, native Button, true panel visibility, and contextual region guidance. |
| [HTML details/summary](https://html.spec.whatwg.org/multipage/interactive-elements.html) | Native `details`/`summary` supplies disclosure behavior, `toggle`, and optional exclusive grouping through `name`; the standard warns exclusive groups can frustrate comparison. | Document a progressive native adapter option; do not change canonical classes or force exclusivity. |
| [Open UI Accordion research](https://open-ui.org/components/accordion.research/) | Systems differ among non-exclusive, exclusive, and exact-exclusive policies. | No consensus justifies a single implicit group policy; keep it explicit and target-owned for v1. |
| [Radix Accordion](https://www.radix-ui.com/primitives/docs/components/accordion) | Separates Root, Item, Header, Trigger, Content; supports controlled/uncontrolled value, single/multiple, collapsible, disabled, RTL and optional arrow navigation. | Match anatomy and disabled semantics, while deferring framework-shaped value/orientation APIs. |
| Existing Gallery FAQ composition | FAQ Section already consumes canonical Accordion classes but duplicates the same missing heading/hidden behavior. | Later consumer migration must compose the refined item contract rather than preserve stale markup. |

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | neutral group | Accordion | Contains one or more items. |
| Item | yes | neutral section wrapper | Accordion | Repeatable unit. |
| Heading | yes | contextual `h2`–`h6` or `role=heading` | Consumer/target | Contains only the trigger. |
| Trigger | yes | native `button` | Accordion/target | Owns expanded state and panel relationship. |
| Indicator | no | decorative | Consumer/Studio fixture | Lucide remains site-only. |
| Panel | yes | neutral container; optional `region` | Accordion/target | Hidden when collapsed; labelled when a region. |
| Content | yes | flow content | Consumer | May contain interactive descendants only while visible. |

No canonical component dependency is required. The native Button element is part
of the disclosure pattern, not the Gallery Button visual component.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant/size | One default vertical visual treatment and spacing. |
| Collapsed | Trigger `aria-expanded=false`; associated panel has `hidden`. |
| Expanded | Trigger `aria-expanded=true`; panel visible; indicator rotated. |
| Hover/focus | Pointer surface and visible inward focus ring. |
| Disabled item | Native disabled trigger; state cannot change. |
| Multiple-open | Existing fixture policy; consumer coordinates items independently. |
| Single/exact-exclusive | Valid target policy, not frozen as v1 contract property. |
| Region | Optional for structurally significant panels; avoid landmark proliferation. |
| RTL | Text and indicator use logical alignment; source order remains unchanged. |
| Reduced motion | Indicator/content transitions removed. |
| Forced colors | Group boundary, dividers, focus and expanded state remain visible. |

## Public API And State Ownership

- `items` — required repeated item slot containing heading/trigger/panel/content
  compositions.
- `expanded` — per-item controlled semantic state, default false.
- `disabled` — optional per-item disabled state, default false.
- Required target facts: unique trigger/panel ids, `aria-expanded`,
  `aria-controls`, `hidden`, and optional region labelling.
- Activation emits a target `expandedChange`/`toggle` equivalent. Native Buttons
  provide click, Enter, and Space; targets synchronize state and visibility.
- Framework adapters may expose `expanded/defaultExpanded/onExpandedChange` for
  an item or `value/defaultValue/onValueChange` for a coordinated group. Those
  language-specific shapes are translations, not neutral contract fields.
- Empty item collections are invalid; empty panel content should omit the item.
- Single/multiple and collapsible policy remain documented composition options,
  avoiding an incoherent v1 combination surface.

## Token And Value Audit

- Public: subtle border, primary/secondary surfaces, primary/secondary/disabled
  text, focus border, medium radius, fast/base motion, body typography, and
  element spacing.
- Private: indicator size, trigger block padding, focus offset, and divider width
  are compositional; keep them private/derived.
- Replace arbitrary `600` with the existing Gallery Button weight only if it is
  semantically the same decision; otherwise keep weight local rather than invent
  a public token. Heading hierarchy must not inherit browser margins.
- Hardcoded icon path belongs only to fixtures; canonical CSS styles the slot.

## Visual And Content Audit

- Preserve the bordered grouped surface, subtle dividers, primary trigger text,
  secondary content, and small indicator rotation.
- Long/localized headings wrap without overlapping the indicator. Content wraps,
  nested controls remain usable only while expanded, and extreme content must
  not create inline overflow.
- Heading rank is semantic context, not a visual size switch. Canonical trigger
  typography remains stable across heading elements.
- Empty items/panels are invalid; one-item Accordion remains valid but a simple
  Disclosure may be clearer to consumers.

## Accessibility And Interaction

- Native Button is the only child of the contextual heading.
- Trigger and panel ids are unique; `aria-expanded`, `aria-controls`, `hidden`,
  and optional `aria-labelledby` remain synchronized.
- Enter/Space work natively. Tab order includes every trigger and only focusable
  descendants of visible panels. Arrow/Home/End navigation is optional, so v1
  must not intercept those keys.
- If a target requires one open item, that expanded trigger may expose
  `aria-disabled=true`; the base contract does not imply this policy.
- Validate focus, contrast, forced colors, reduced motion, disabled semantics,
  long content, and nested-control removal from the collapsed tab order.

## Responsive And Performance

- Width follows its container. Test 320/768/1440/1920, long headings, nested
  content, empty rejection, localization, and RTL.
- Neutral runtime budget is `0 B`; native Button/details adapters or target-local
  state manage toggling. No observer or layout read is needed for the safe hidden
  baseline.
- Final Batch 14 measurement: Layout `5,144 B`, theme runtime `10,321 B`, and
  Web components bundle `60,996 B` deterministic gzip. The provisional Layout
  ceiling has a documented `229 B` exception in ADR 0099; neutral runtime delta
  remains `0 B`.
- Any target animation that measures content must do so only during state change,
  never continuously, and must keep the closed subtree inert/hidden.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | APG Button/heading/panel contract or native `details` adapter with the same visual classes. | CSS implemented after refinement; toggle remains target-owned. |
| Shopify | Liquid emits headings/buttons/panels or native details; target JS coordinates optional group policy. | Generated class adapter synchronized; target-native group behavior remains planned. |
| React / Angular | Item or group controlled/uncontrolled state with change event and stable ids. | Planned. |
| Figma | Root/item/header/trigger/content anatomy with collapsed/expanded/disabled states. | Planned. |
| SwiftUI / Compose | Disclosure group/item semantics with platform expansion state and contextual headings. | Planned. |

## Exhibit And Studio Parity

The shared renderer and three-item fixture now use the heading wrapper and
native `hidden` panel state in both views. The first-item `expanded`/`disabled`
controls demonstrate item state; other items remain interactive fixture content.
Lucide remains Studio-only and no site selector recreates Accordion visuals.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Trigger lacks required heading wrapper. | high | Add `.accordion__heading` and contextual heading markup. | implementation |
| Collapsed content remains in focus/accessibility trees. | critical | Synchronize native `hidden`; remove unsafe visual-only collapse. | implementation |
| Group policy has no consensus. | non-blocking | Preserve target-owned coordination; document adapter options. | architecture later |
| Disabled item state is absent. | medium | Add native disabled semantic state/property. | implementation |
| FAQ Section duplicated stale Accordion markup. | medium | Migrated its renderer/MDX and removed duplicate collapse CSS. | implemented dependency migration |

## Evidence And Validation

- Before reconstruction: desktop Exhibit/Studio files under
  `output/playwright/refinement-batch-14/before-reconstructed/`, derived from the
  pre-edit source because the attempted live capture wrote no files.
- After: eight canonical viewport captures plus collapsed/expanded, multiple,
  disabled, Enter/Space, native hidden, localized RTL 320px, dark,
  forced-colors/reduced-motion, overflow, and parity evidence under
  `output/playwright/refinement-batch-14/after/`.
- Validation covers docs/contracts/Studio, structural/preview/parity/refinement
  audits, synchronized Web/Shopify/Webflow outputs, TypeScript, temporary build,
  deterministic performance, and diff whitespace.

## Risks And Open Questions

1. Single/multiple/exact-exclusive group API remains an architecture decision;
   v1 item correctness does not depend on choosing it.
2. Removing the unsafe height animation is a deliberate accessibility tradeoff;
   a future target-safe animation contract may be evaluated separately.
3. Heading rank and region use depend on page context and cannot have universal
   defaults.
4. The generic stored owner frame does not settle alternative indicator or
   border aesthetics; human visual review remains required.

## Readiness Decision

Ready for explicit human review; remains `pilot`. Group policy, optional native
`details` translation, production target testing, and visual approval remain.
