# Component Dossier: Shipping Info

Status: `human-review-ready`

Target reviewed: Neutral Web with Webflow and Shopify translation

Contract: `components/contracts/shipping-info.contract.json`

## Recommendation

Keep Shipping Info as a passive, finite collection of short service or policy
facts. Render the collection as a native unordered list because the facts form
a meaningful group but their order does not change their meaning. Each valid
item requires one visible label, may add supporting text, and may include one
decorative visual. The visible label and text must carry the complete claim;
the visual never becomes the only source of meaning.

Do not turn S14 into a shipping calculator, delivery estimate, tracking status,
returns workflow, guarantee badge, payment-security assertion, policy source,
or generic icon catalogue. Targets own the factual claim, localization,
eligibility, destinations, policy freshness, and any native links to fuller
information. S14 owns only the list layout and the visual hierarchy inside each
fact.

Keep the public API at one required `items` composition slot. A structured item
array, icon-name enum, column count, alignment, maximum measure, breakpoint,
and item count would expose target/editor or private layout details that are not
stable across Web, Shopify, Figma, and native targets. The neutral component has
no events or controlled/uncontrolled state.

For Shopify, implement a merchant-editable Section Adapter with reorderable
item blocks containing a required visible label, optional supporting text, and
an optional decorative image. Omit blocks without labels and omit the complete
section when no valid blocks remain. The adapter must not extend the shared
Shopify icon snippet or import the Studio-only Lucide catalogue.

Human review should approve the final maximum measure, responsive track
threshold, section inset/rhythm, icon size, label/text scale, center alignment,
and fixture claims. The contract remains `pilot`; automated evidence must not
promote it to `stable`.

## Purpose And Limits

- Summarizes a small set of fulfillment, returns, authenticity, packing,
  transit, payment, care, or service facts near a product or commerce context.
- Supports concise labels and optional supporting statements whose truth can be
  verified by the target.
- Supports a decorative icon or small image as a scanning cue when adjacent
  text already conveys the complete meaning.
- May contain target-owned native links inside composed item content when a
  full policy or service page is useful.
- Does not calculate rates, dates, taxes, duties, availability, eligibility,
  insurance, returns windows, guarantees, or payment security.
- Does not track a shipment, reveal live status, accept input, perform an
  action, or own commerce mutations.
- Does not define a universal service taxonomy or fixed icon library.
- Does not imply that a statement is true merely because it uses a reassuring
  icon. Claims, legal language, freshness, locale, and destination rules remain
  target-owned.

## Current Gallery Baseline

- Registry identity `S14`, category `sections`, selector `.shipping-info`, no
  registered dependencies, dependency depth `0`, and review order `174`.
- Contract `0.2.0`, `pilot`: root/item/icon/label/text anatomy, required `items`
  slot, neutral Web CSS implemented, Shopify planned.
- Canonical CSS uses a `200px` minimum track, `24px` grid gap, `8px` item gap,
  `40px` icon, `960px` maximum width, numeric weight `600`, and calculated
  `0.875` supporting type scale.
- The live renderer always emits an unnamed native `section`, even though the
  component has no title property or other accessible section name.
- The live root and children are generic `div` elements. The group and repeated
  facts therefore have no native list semantics.
- Studio renders label and description as generic `div` elements and leaves an
  empty shell when the required `items` slot is disabled.
- The MDX fallback differs from the live renderer: it uses a labelled section,
  article items, paragraph text, different facts, and different inline SVGs.
  Exhibit currently replaces that fallback with the registered Studio renderer,
  so the visible paired surfaces still share one implementation.
- Exhibit and Studio baseline outer HTML are exactly equal at `2,123`
  characters with FNV-1a `24332454`. Both surfaces share the same unnamed
  section and generic-item defects.
- At the docs Mobile viewport the root is `358px` wide and `423.95px` high; at
  Tablet it is `736px` by `229.41px`. Layout context changes Desktop/XL widths,
  but Exhibit and Studio markup remains identical.
- A direct `200px` root has `238px` scroll width because the `200px` grid track
  plus inline padding cannot shrink. `320px` contains one track, `520px` yields
  two tracks, and wider available contexts yield three. The narrow overflow is
  a component defect.
- The component has zero focusable descendants, no listener, no authored
  animation, and no neutral runtime. The only console error is the docs site's
  unrelated missing favicon before refresh; subsequent browser checks report no
  component error or warning.
- Baseline evidence lives under
  `output/playwright/batch73-shipping-info/before/` for Exhibit and Studio at
  Mobile, Tablet, Desktop, and XL.
- Deterministic prior-batch gzip is Sections `6,836 B`, generated neutral Web
  component CSS `67,167 B`, and shared runtime `10,501 B`. Sections has a
  permanent `6,861 B` ceiling and only `25 B` headroom; S14 runtime budget is
  exactly `0 B`.
- The Studio design trace is invalid for S14: frame `943:7` is the Button
  component-detail pilot and inspector `1020:480` exposes Button controls.
  Evidence is stored under
  `output/playwright/batch73-shipping-info/figma/`.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML grouping content](https://html.spec.whatwg.org/dev/grouping-content.html) | `ul` represents a list whose item order is not materially significant; direct children are `li`. | Use one native unordered list and preserve authored source order without claiming numbered sequence semantics. |
| [Open UI List research](https://open-ui.org/components/list.research/) | List items may contain compound content including icons, images, and multiple text regions. | Keep each service fact as one compound list item; no custom widget role is needed. |
| [WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/) | Decorative images are ignored by assistive technology; informative images need an equivalent based on purpose and context. | Require visible text to carry the complete fact and keep S14 visuals decorative. |
| [WCAG 2.2 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | Non-text information needs an equivalent text alternative unless it is decorative. | Never rely on a truck, shield, package, or payment visual to assert the service. |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Text must meet contrast minimums, resize without loss, and reflow at narrow effective widths. | Use semantic text tokens, intrinsic tracks, long-text containment, and no viewport-only DOM changes. |
| [Polaris layout primitives](https://polaris-react.shopify.com/components/layout-and-structure) | Related content is composed with grid/stack primitives; responsive props change layout without changing content meaning. | Treat S14 as a layout composition over semantic items, not a new interactive primitive. |
| [Polaris Web Components inventory](https://shopify.dev/docs/api/app-home/web-components) | Grid, Stack, Unordered List, Icon, Heading, and Text remain separate composable responsibilities. | Do not flatten layout, list semantics, icon source, and text content into one large cross-target property schema. |
| [Radix composition guidance](https://www.radix-ui.com/primitives/docs/guides/composition) | Composition must preserve the appropriate native element; changing element type transfers accessibility responsibility. | The neutral renderer should use native `ul`/`li` directly rather than generic wrappers plus ARIA repair. |
| [Shopify block object](https://shopify.dev/docs/api/liquid/objects/block) | Repeated blocks expose merchant settings and `block.shopify_attributes` for editor identification and ordering. | Map the one-dimensional item slot to reorderable Shopify blocks without inventing a neutral structured schema. |

WAI-ARIA APG does not define a Shipping Info widget. No ARIA role, keyboard
model, focus management, or controlled state is warranted for this passive
content. Radix likewise offers behavior primitives rather than a corresponding
shipping-fact component; native list semantics and target composition are the
appropriate baseline.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root/list | yes | `ul.shipping-info` | Shipping Info / target | Meaningful unordered group; no landmark or accessible name required by default. |
| Item | one or more | `li.shipping-info__item` | target content, S14 layout | Invalid label-less records are omitted. |
| Visual | no | `.shipping-info__icon`, hidden/decorative | target visual | Studio may use Lucide only as site presentation; target contract does not name Lucide icons. |
| Label | yes per item | `p.shipping-info__label` | target | Short visible service/policy heading; complete enough to scan without visual. |
| Text | no | `p.shipping-info__text` | target | Supporting qualification; may contain target-owned native links in a composed implementation. |

S14 has no canonical component dependency. The repo has no target-agnostic Icon
component, and Icon Button is an interactive action rather than a visual source.
Adding either as a dependency would be incorrect. Native list elements are
platform semantics, not registry dependencies.

## Variant, State, Mode, And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Presentation | One centered, responsive, passive grid; no public layout variant. |
| One item | One track; no artificial empty columns. |
| Multiple items | Auto-fit tracks based on container space; source order unchanged. |
| Items absent | Omit the complete component; never render an empty list shell. |
| Label | Required non-empty visible string for every rendered record. |
| Supporting text | Optional; omission does not leave artificial spacing. |
| Visual | Optional and decorative because adjacent text owns all meaning. |
| Visual absent | Text remains complete; layout has no reserved empty icon slot. |
| Long/localized | Wrap naturally, preserve source order, and remain contained at narrow widths and 200% effective type. |
| RTL | Logical geometry; target locale controls text direction while authored item order is preserved. |
| Light/dark | Semantic text colors; no hardcoded theme color. |
| Forced colors | Text remains available; decorative visuals may adapt to current color without becoming semantic. |
| Reduced motion | No authored transition, animation, or motion state. |
| Target link | Native target-owned anchor inside composed copy; link semantics and destination stay target-owned. |
| Controlled/uncontrolled | Not applicable; no state, value, selection, or event. |

Unsupported combinations include an unnamed native section, generic div-only
items, icon-only claims, informative visuals without equivalent text, empty
root, hidden required text, focusable passive items, clickable whole cards
without a destination contract, ARIA list repair where native elements work,
merchant-selectable Lucide names in the neutral contract, viewport-reordered
items, fixed column-count API, live delivery data, or neutral JavaScript.

## Public API And Ownership

- `items` — required target-owned composition slot containing one or more valid
  facts. Every rendered fact has a non-empty label; text and decorative visual
  are optional.
- S14 exposes no title, heading rank, accessible label, item object, icon name,
  icon alternative, image source, item count, column count, alignment, gap,
  inset, maximum width, breakpoint, link, destination, shipping method, price,
  date, eligibility, guarantee, status, loading, error, or update property.
- Targets may map the slot to native framework children, CMS records, Shopify
  blocks, or native collections without changing the neutral parent contract.
- S14 emits no event and has no controlled/uncontrolled strategy. Links or
  other composed interactive descendants retain their own native/component
  contracts and must not make the passive parent focusable.

## Tokens And Values

| Concern | Direction |
| --- | --- |
| Text colors | Existing `--color-text-primary` and `--color-text-secondary`. |
| Label type | Existing body family/default size/default line-height plus semantic semibold source weight. |
| Supporting type | Existing body-small size/line-height/weight. |
| Section rhythm | Existing `--space-layout-section-gap`. |
| Container inset | Existing `--space-layout-container`, capped privately for very narrow containers. |
| Track gap | Existing `--space-layout-grid-gap`. |
| Item gap | Private compact rhythm; not a public cross-target control. |
| Private geometry | Maximum measure, track minimum, visual size, text measure, center alignment, zero list margins/padding, and intrinsic narrow inset. |

Replace numeric `600` with the existing semantic semibold source weight and
replace the calculated body ratio with the existing body-small typography
tokens. Do not publish `40px`, `200px`, `960px`, center alignment, track count,
or item gap as cross-target properties. Hardcoded structural zeroes remain
private implementation facts.

## Responsive, Content, Accessibility, And Performance Tests

- Test direct roots at `200`, `320`, `520`, `900`, and `1120px`, plus docs
  Mobile, Tablet, Desktop, and XL.
- Require `scrollWidth === clientWidth` for the root and every item at every
  tested width; no item track may exceed the available content box.
- Verify one/many records, missing optional text, missing optional visual,
  invalid blank label, disabled required slot, short/long/localized/RTL/extreme
  strings, effective 200% type, light/dark, forced colors, and reduced motion.
- Verify native list/listitem roles, exact item count, zero passive tab stops,
  decorative visual hiding, complete visible claims, and source/reading-order
  parity.
- Verify Exhibit and Studio exact normalized DOM equality from the same renderer
  and fixture, not only visual similarity.
- Neutral S14 runtime budget is exactly `0 B`: no listener, observer, timer,
  request, layout read, resize branch, custom element, hydration, or target
  asset.
- Sections remains capped at `6,861 B` deterministic gzip. S14 must fit inside
  the existing `25 B` headroom or recover bytes from its own obsolete rules;
  the ceiling must not be raised.
- Recommended content budget is concise: one short label and at most a few
  sentences per item. This is editorial guidance, not a truncation or item-count
  API.
- Shopify uses one Liquid loop and responsive image output only when a visual
  exists. It adds no component JavaScript, request, or editor-only runtime.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native `ul`/`li`, paragraph label/text, optional decorative visual, intrinsic CSS grid, zero runtime. | Implemented, generated, validated, and browser-evidenced. |
| Webflow | Canonical Sections CSS plus a native list collection and target-owned fact content. | CSS projection can be regenerated; CMS authoring remains target-native. |
| Shopify | Dedicated section with reorderable item blocks: label, text, optional decorative image, editor attributes, strict omission. | Implementable without a new product architecture or icon catalogue. |
| React / Angular | Thin list renderer over target children/records; native elements preserved. | Planned. |
| Figma | Repeated text-complete fact item with optional decorative visual and responsive layout annotation. | Planned; current trace points to Button and must be replaced. |
| SwiftUI / Compose | Native semantic list/group of passive text-complete facts; decorative image hidden from accessibility. | Planned; target accessibility review required. |

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Live root is an unnamed `section`. | must-fix | Use native `ul`; do not invent a title or label property. | accepted source/standards |
| Repeated records are generic `div` elements. | must-fix | Use native `li` items with visible paragraph content. | accepted source/standards |
| Required slot can leave an empty shell. | must-fix | Omit the complete root when no valid items exist. | contract |
| `200px` direct root horizontally overflows. | must-fix | Use an intrinsic track minimum capped by `100%` plus narrow logical inset. | implementation |
| Numeric weight and calculated type scale bypass semantic typography. | should-fix | Map to existing semibold and body-small tokens. | token source |
| MDX fallback and shared live renderer disagree. | should-fix | Update fallback to the same native semantic contract; paired modes continue sharing the live renderer. | docs |
| Icon semantics allow optional unique meaning. | should-fix | Require adjacent visible text to be complete and keep the visual decorative. | accessibility |
| Shopify is CSS-only. | cross-target gap | Add a localized block-based section with optional decorative image and zero runtime. | Shopify adapter |
| Figma nodes are the Button pilot. | human evidence gap | Replace with S14-specific owner reference before visual approval. | owner/design |
| Maximum measure, track threshold, alignment, rhythm, and fixture claims are not owner-approved. | human-review | Present the refined candidate without promoting stability. | owner/aesthetic/content |

## Open Human Review Queue

1. Approve or revise the centered `60rem` maximum measure and compact responsive
   track threshold.
2. Approve center alignment versus a left-aligned alternative for long or
   editorial service text.
3. Approve the section inset/rhythm, grid/item gap, `2.5rem` visual size,
   label weight, body-small supporting type, and supporting text measure.
4. Confirm that visuals remain optional and decorative in v1, with the complete
   meaning always in visible text.
5. Approve or replace the default delivery/inspection/insurance fixture claims;
   they are documentation examples, not product guarantees.
6. Supply or approve corrected S14-specific Figma evidence; current nodes show
   the Button pilot.
7. Confirm passive v1 scope. Calculators, estimates, live tracking, policy
   updates, and click-through card behavior remain separate target concerns.

## Refinement Result

Contract, source CSS, shared renderer, MDX, Studio metadata, localized Shopify
section, generated adapters, four-viewport evidence, direct `200–1120px`
containment, localized RTL/extreme content, effective 200% type, contrast,
special colors, optional-content composition, exact Exhibit/Studio DOM parity,
official target validation, reports, and program gates pass. Sections reaches
but does not exceed its permanent `6,861 B` gzip ceiling; S14 adds zero runtime.

S14 is `human-review-ready` and remains `pilot`. Only explicit human approval
may promote it to `stable`.
