# Component Dossier: Review

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/review.contract.json`

## Owner Update: Review Identity (2026-08-25)

Owner decision 82 and ADR 0285 rename Review Card to Review because this is a
self-contained domain component, not merely a Card surface. Contract `0.5.0`,
registry, canonical `.review*` classes, Exhibit, Studio, dossiers, reports, and
generated adapters use the new identity. Review deliberately does not depend on
Card and remains `pilot`. Historical statements below about earlier contract
versions or an unresolved Rating identity are superseded by ADRs 0235 and 0285.

## ADR 0235 Canonical Rating Update (2026-07-20)

The owner has resolved the former A11/V2 identity question. Review contract
`0.5.0` now declares and composes canonical A11 Rating; V2 Star Rating is
deprecated and owns no selector, renderer, fixture, or adapter. The final
migration probe renders `.review .rating[data-rating="4.5"]` and zero
legacy `.star-rating*` selectors. Any later reference in this historical dossier
to V2 as the dependency or to an open A11/V2 decision is superseded by ADR 0235.
The existing Review visual, interaction, provider, and human-review
findings remain otherwise valid.

## Recommendation

Refine Review as one self-contained native `article` whose source order is
reviewer metadata, one required canonical Rating, optional contextual
title, required body, optional photo list, optional helpfulness request and an
optional ordinary reply group. Keep all review records, truth claims,
formatting, moderation and persistence target-owned.

Add a separate optional machine-readable `dateTime` value instead of trying to
parse the visible localized date. Make `photosLabel` the localized name of the
optional native photo list. Associate a visible helpfulness count with its
button as a description without turning the count into a live region. In the
shared docs renderer, use a decorative avatar when the adjacent author text
already conveys the same identity, use a contextual `h3`, and remove the
unnecessary complementary landmark from the directly associated reply.

The helpfulness button remains a native pressed button. The static neutral Web
contract projects authored state and emits native activation; Studio may own a
local demonstration state, while framework/provider targets may control state
and reconcile persistence. Photo activation remains target-owned and passive by
default. Review does not select a provider, lightbox, structured-data
vocabulary, heading API or rating identity.

This refinement can be prepared for human review without resolving the open
provider and A11/V2 rating-identity questions. Visual hierarchy, density,
thumbnail treatment, helpfulness presentation and reply tone remain candidates
for explicit human approval. The contract stays `pilot`.

## Purpose And Limits

- Present exactly one target-supplied review as an independently meaningful
  content item.
- Preserve readable reviewer attribution, date, rating, title and body in a
  logical source order.
- Compose the canonical passive Star Rating; never duplicate its shape logic or
  use Star Input for display.
- Optionally present reviewer media, a truthful verification statement, photos,
  one helpfulness request/count pair and one associated reply.
- Remain useful when optional regions, icons, media, CSS or provider behavior
  are absent.
- Do not fetch, calculate, format, authenticate, moderate, verify, persist,
  deduplicate, optimistically update or announce review data.
- Do not own photo enlargement, navigation, downloads, focus management or
  lightbox behavior.
- Do not expose avatar size, thumbnail size, internal gaps, reply padding, icon
  source or hover treatment as public semantic API.

## Current Gallery Baseline

- Registry identity: `V4`, `review`, category `reviews`, dependency
  `star-rating`, review order 151.
- Contract: `0.2.0`, `pilot`; 18 anatomy parts, 13 properties, one variant, one
  size, six states, three behavior rules and 19 public token references.
- ADR 0085 already fixes review/provider data boundaries and allows one local
  `aria-pressed` helpfulness state while leaving persistence target-owned.
- ADR 0133 refines V2 Star Rating but leaves its identity relative to A11 Rating
  unresolved. Review can compose the current canonical dependency without
  settling that separate architecture decision.
- The shared `ReviewsStudio` renderer serves Exhibit and Studio, but its title
  is `h2` while the MDX fallback uses `h3`; the contract correctly says heading
  level follows the surrounding document.
- The visible date uses `<time>` without `datetime`, so localized display text
  cannot be safely exposed to machines.
- The avatar repeats the adjacent author identity with an invented scene
  description. The photo group is a labelled generic `div`, and the helpfulness
  count is not associated with the button in the shared renderer.
- The directly associated reply is an unnamed `aside`, which introduces a
  complementary landmark even though the content is part of the review.
- The MDX Star Rating still uses removed `is-filled` markup instead of the
  canonical `data-state` outline/fill anatomy.
- Canonical CSS is structurally responsive and includes touch target, focus,
  hover, disabled, forced-colors and reduced-motion treatment. Its heading and
  body typography still depend partly on host defaults and two line heights are
  hardcoded.
- Baseline Reviews CSS is `3,724 B` deterministic gzip against the permanent
  `3.7 KiB` (`3,788 B`) family ceiling. Shared runtime is `10,501 B`; Review has no
  neutral component listener of its own.
- Eight paired baseline screenshots cover Exhibit and Studio at Mobile, Tablet,
  Desktop and XL under `output/playwright/refinement-batch-50/before/`.
- Figma nodes `943:7` and `1020:480` are generic Studio shell and inspector
  references, not approved Review artwork. No visual value may be promoted
  from them.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML `article`](https://html.spec.whatwg.org/multipage/sections.html#the-article-element) | `article` represents a complete, independently reusable composition; the standard explicitly includes user-submitted comments as examples. | One review record is a native article. A contextual title may name it, but the neutral visual class cannot mandate one heading rank. |
| [HTML `time`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element) | `datetime` carries the machine-readable value independently from visible content. | Expose optional `dateTime`; never derive it from a localized `date` string. |
| [APG Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | Native buttons activate with Enter/Space; a toggle exposes `aria-pressed` and keeps a stable label when state changes. | Keep one stable helpfulness label, native activation and boolean pressed state. |
| [Open UI Press Button explainer](https://open-ui.org/components/press-button.explainer/) | The proposed press button addresses persistent two-state button semantics; current interoperable authoring still relies on button plus pressed state. | Use native `button` + `aria-pressed`; do not depend on a proposed element or add custom keyboard handling. |
| [Radix Toggle](https://www.radix-ui.com/primitives/docs/components/toggle) | A two-state button exposes `pressed`, `defaultPressed`, change, disabled and native Enter/Space behavior. | Document controlled and uncontrolled target mappings, but keep persistence outside the neutral component. |
| [Polaris Button](https://shopify.dev/docs/api/app-home/web-components/actions/button) | Polaris separates action label, disabled, loading, visual emphasis and click behavior; asynchronous policy remains consumer logic. | Review owns a low-emphasis native request surface, not authentication, loading or provider confirmation. |
| [Shopify theme app extensions](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/configuration) | Shopify identifies product reviews and star ratings as dynamic-source app-block use cases and requires app blocks to adapt to their section. | Keep Shopify CSS-ready/planned and provider-owned; do not invent theme Liquid review records or settings. |
| [WCAG Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | Pointer targets should provide at least a 24 by 24 CSS-pixel area or qualifying spacing. | Preserve the existing 44px Gallery touch-target token for helpfulness and any target-supplied photo action. |
| [WCAG Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) | Visible focus needs sufficient area and contrast; a solid 2px perimeter is the simplest conforming shape. | Keep the 2px focused perimeter and verify it in light, dark and forced colors. |

## Reference Comparison

| Concern | Gallery baseline | Mature/standards signal | Recommended Gallery direction |
| --- | --- | --- | --- |
| Record semantics | Native article | HTML explicitly supports independently reusable comments | Preserve one article per review. |
| Heading | Contract contextual; Studio `h2`; MDX `h3` | Heading rank comes from document hierarchy | Keep the neutral class element-agnostic; use contextual `h3` in this docs target. |
| Date | Visible localized string only | `time[datetime]` separates display and machine value | Add optional `dateTime`; no parsing. |
| Avatar | Repeated, invented scene description | Adjacent author text already supplies identity | Decorative empty alt for this fixture; target slot owns informative alternatives. |
| Photos | Generic labelled group | Repeated related items are a native list | Labelled `ul` with `li` items; passive images by default. |
| Helpful action | Native pressed button, local Studio toggle | APG/Radix support stable labels and controlled/uncontrolled state | Preserve native button and explicit state ownership; associate count as description. |
| Reply | Unnamed `aside` landmark | Direct reply is not tangential content | Ordinary grouped content with visible source label; no extra landmark. |
| Rating | Canonical renderer but stale MDX fallback | Composition should reuse one canonical implementation | Keep dependency on Star Rating and update fallback to `data-state` anatomy. |
| Shopify | Copied CSS, no Liquid | Official guidance assigns reviews to dynamic app blocks | Keep provider app-block boundary; validate generated CSS only. |

## Anatomy And Composition

| Part | Required | Recommended semantic owner |
| --- | --- | --- |
| Root | yes | `article.review`; `aria-labelledby` only when a contextual title is present. |
| Header | yes | Native `header` containing target-supplied reviewer metadata. |
| Avatar | no | Target-owned media slot; decorative when adjacent text fully conveys identity. |
| Author | yes | Visible ordinary text; do not misuse `cite` for a person. |
| Date | no | Visible `time`; optional independent `datetime` value. |
| Verified status | no | Readable target-authored text; decorative icon may reinforce but never replace it. |
| Star Rating | yes | One canonical passive Star Rating with its truthful accessible label. |
| Title | no | Native contextual heading chosen by the target; visual class is element-agnostic. |
| Body | yes | Ordinary review prose. Empty body is invalid for this contract. |
| Photos | no | Localized `ul`; repeated `li` contains passive media or a target-supplied native action. |
| Actions | no | Ordinary grouping for the helpfulness request and supplied count. |
| Helpful button | no | Native `button type="button"` with stable label, boolean `aria-pressed`, optional disabled and conditional count description. |
| Helpful count | no | Visible target-formatted descriptive text; never calculated or live by default. |
| Reply | no | Ordinary grouped reply content, not a complementary landmark. |

## Variants, States And Modes

| Dimension | Values | Ownership |
| --- | --- | --- |
| Variant/size | `default` | One reviewed visual candidate; no source-backed alternatives. |
| Content | title/date/avatar/verification/photos/action/count/reply present or absent | Derived from optional content, not visual variants. |
| Helpfulness | unpressed, pressed, disabled, hover, focus-visible | Authored/projected state plus target request handling. |
| Photos | passive, target link, target button | Target decides action and destination; Review supplies no lightbox. |
| Width | intrinsic wrap plus horizontal photo containment | Derived from the containing inline size, not viewport labels. |
| Theme/input | light, dark, forced colors, reduced motion, coarse/fine pointer | Token, media-query and native behavior projection. |
| Direction/content | LTR, RTL, short, long, localized, unbroken, empty optional regions | Logical layout and target content. |

## Public API Recommendation

| Property | Type | Requirement | Direction |
| --- | --- | --- | --- |
| `author` | string | required | Preserve visible target-supplied attribution. |
| `date` | string | optional | Preserve localized visible date. |
| `dateTime` | string | optional | Add independent machine-readable time value; emit only with visible date. |
| `avatar` | slot | optional | Preserve target media and alternative-text ownership. |
| `verifiedStatus` | slot | optional | Preserve readable target-owned truth statement. |
| `rating` | Star Rating slot | required | Preserve canonical composition. |
| `title` | string | optional | Preserve content; native heading rank remains target-owned. |
| `body` | string | required | Preserve required review prose. |
| `photos` | slot | optional | Preserve repeated target-owned items and action boundary. |
| `photosLabel` | string | required when photos exist | Add localized native-list name; schema cannot express the conditional requirement. |
| `helpfulLabel` | string | optional | Stable visible native-button label. |
| `helpfulPressed` | boolean | optional, false | Current projected pressed state; no persistence claim. |
| `helpfulDisabled` | boolean | optional, false | Native unavailability. |
| `helpfulCount` | string | optional | Supplied descriptive text associated when button also exists. |
| `reply` | slot | optional | Preserve target-owned reply label/body composition. |

Do not add provider IDs, verification booleans, avatar URL/size, rating values
duplicated from Star Rating, photo arrays, lightbox events, moderation state,
loading/success/error, analytics, count calculation or heading rank.

## Controlled And Uncontrolled State

- Static neutral Web authoring supplies `aria-pressed` and listens to the native
  bubbling click. The CSS does not mutate state.
- The Studio fixture may toggle local state solely to demonstrate both visual
  states; it does not claim persistence or update the supplied count.
- Framework targets may use controlled `pressed + onPressedChange/request` when
  provider truth, optimistic rollback or authentication matters.
- An uncontrolled initial state may be acceptable for a local-only experience,
  but the target must reconcile server truth deliberately.
- Disabled suppresses native activation. Count changes are target data and are
  not automatically announced as confirmed updates.

## Token And Literal Audit

- Public semantic references: primary/secondary text, success verification,
  subtle/default/focus borders, secondary surface, Button-action accent,
  full/small/medium radii, element rhythm, touch target, caption/body/body-small
  and H3 typography, micro transition, hover opacity and disabled opacity.
- Private composition: 40px avatar, 80px photos, 12px header rhythm, 8px rating
  and photo gaps, 16px optional-region rhythm, 4px inline icon/button gaps, 6px
  reply-label gap and flexible metadata basis.
- Native/semantic literals: 1px separators/borders and 2px focus perimeter.
- Replace hardcoded body/reply line heights with accepted typography tokens and
  make title appearance independent from the contextual heading element.
- Expose no Review-specific custom property solely to eliminate a literal.

## Accessibility And Interaction

- One article owns one review; optional title labels it without inventing an
  author-derived accessible name when title is absent.
- One Star Rating owns the accessible rating value. Individual stars remain
  decorative.
- Date display and machine value remain independently truthful.
- Verification meaning survives unavailable icon/color.
- Informative photos need useful alternatives; decorative/redundant images use
  empty alternatives. A labelled native list communicates the collection.
- Helpful uses native Enter/Space/click, stable visible text, boolean pressed,
  native disabled, visible focus and conditional count description.
- The count is not a status/live region because persistence and synchronization
  are outside the component.
- Reply text stays in article reading order without adding an unnamed landmark.
- Reduced motion removes decorative action/photo transitions. Forced colors
  preserves focus and pressed distinction.

## Responsive And Content Test Matrix

- Mobile `390 x 844`, Tablet `768 x 1024`, Desktop `1280 x 800`, XL
  `1600 x 1000`, each in Exhibit and Studio.
- Narrow `220px` host and wide containers independent of the page viewport.
- Title omitted; all optional regions omitted; each optional region alone; full
  composition.
- Short, long, empty optional, localized, unbroken author/title/body/count/reply
  content; one and many photos; missing avatar/media.
- Helpful unpressed, pressed, keyboard focus and disabled; activation emits the
  native event and does not mutate count.
- Passive photo plus target-supplied link/button focus model.
- LTR, RTL, 200% root type scale, light, dark, forced colors, normal and reduced
  motion.
- Verify no document overflow, duplicate accessible rating, unnecessary
  landmark, component-owned request, observer, timer, asset or layout read.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Neutral Web | Native article/header/time/list/button plus canonical Star Rating and generated CSS. | Implemented candidate; static state/request wiring remains target code. |
| Shopify | Provider theme app block supplies truthful records, locale strings, actions and responsive section behavior; Gallery CSS may style compatible markup. | CSS-ready/planned. Do not add provider-free review Liquid. |
| Webflow | Copy canonical CSS and author semantic markup/data through the target CMS/integration. | Generated CSS path; provider behavior remains external. |
| React / Angular | Same tree with controlled or initial pressed state and native event mapping. | Contract-ready; no certified adapter. |
| Figma | Expose content visibility, pressed/disabled state and reviewed public tokens; annotate contextual heading and provider data. | Planned; current references are generic only. |
| SwiftUI / Compose | Native self-contained content, labelled rating, optional media list and accessible toggle action. | Conceptual; target owns data/persistence/localization. |

## Risks And Open Questions

| Risk/question | Status | Required action |
| --- | --- | --- |
| A11 Rating versus V2 Star Rating identity was unresolved. | resolved | ADR 0235 makes A11 Rating canonical; Review composes it directly. |
| Provider, authentication, verification, moderation and helpfulness persistence are unresolved. | target boundary | Choose per integration/app block before target implementation. |
| Photo activation/lightbox ownership is unresolved. | target/product boundary | Keep passive; add native action only with explicit destination/overlay owner. |
| Structured review data vocabulary is not accepted. | architecture/SEO boundary | Decide separately; do not add schema.org attributes during visual refinement. |
| No component-specific Figma artwork exists. | human visual gap | Approve browser candidate before creating target artwork. |
| Reviews CSS has only 7 B post-refinement headroom. | performance risk | Keep later Review refinements bounded and do not raise the family ceiling silently. |
| Global Web CSS/runtime exceed provisional ceilings. | program gap | Preserve explicit exceptions and attribute zero neutral runtime to Review. |

## Readiness Boundary

Technical readiness requires reconciled contract, renderer, Studio metadata,
MDX fallback, generated target CSS, four-view evidence, interaction/accessibility
probes, performance measurement and validation reports. It does not approve the
visual candidate, provider policy, rating identity, Figma artwork or `stable`
status.

## Refinement Evidence

- Contract `0.5.0`, ADRs 0135, 0235, and 0285, Studio metadata, shared renderer and MDX now agree
  on the article/time/list/button/reply semantics and provider boundary.
- After normalizing per-mount React IDs, Exhibit and Studio root DOM is identical
  at Mobile, Tablet, Desktop and XL with SHA-256
  `32e5dadb78b71d64735f1efec1f1bd779a7e82675ed67f91e0090ffc60eeaee4`.
- The full fixture exposes `article` + contextual `h3`, `datetime=2026-07-08`,
  decorative avatar, one named `ul` with three `li` items, one described native
  pressed button and no `aside`.
- Enter, Space and pointer click emit three native click events and alternate
  `aria-pressed`; the supplied count remains unchanged. Disabled is native,
  retains state and resolves to `0.5` opacity.
- The helpfulness target is `95.39 x 44px`; keyboard modality produces a solid
  `2px` focus outline with `2px` offset. Hover no longer masks pressed color,
  border or semibold weight.
- The minimal composition removes every optional node and article label while
  preserving required Star Rating/body content. A `220px` RTL host at 200% type
  scale remains `220/220px`; the document remains `390/390px`. Photo overflow is
  contained by its own `220/256px` scroller.
- Reduced motion resolves helpfulness transition to `none` / `0s`. Dark mode,
  forced colors and pressed/focus/disabled evidence are captured beside eight
  final viewport images in `output/playwright/refinement-batch-50/final/`.
- Deterministic gzip is `3,781 B / 3,788 B` for Reviews CSS,
  `68,119 B / 65,536 B` for complete Neutral Web component CSS and `10,565 B /
  8,192 B` for shared runtime. Review adds zero neutral component runtime.
- Canonical, Shopify and Webflow Reviews CSS are byte-identical. Official
  Shopify artifact `review-batch-50`, revision 2, passes without inventing
  a provider Liquid implementation.

## Readiness Decision

Ready for explicit human review; remains `pilot`. Human approval must cover the
visual candidate and the listed open target/architecture boundaries before any
stability promotion.
