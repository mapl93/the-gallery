# Cart Page Web Refinement Audit

Status: `human-review-ready`

Date: 2026-07-21

Component: `K1` / `cart-page`

Contract: `0.3.0` / `pilot`

ADRs: [0212 Named Populated Cart Page And Target Lifecycle Boundary](../decisions/0212-named-populated-cart-page-and-target-lifecycle-boundary.md),
[0254 Cart Page Configurable Safe Summary Placement](../decisions/0254-cart-page-configurable-safe-summary-placement.md)

Dossier: [Cart Page](../refinement/dossiers/cart-page.md)

## Outcome

Cart Page is technically refined as a named populated-cart composition over
canonical Cart Line Item and Cart Summary. It is no longer an unnamed
viewport-driven grid with target-specific copies. The shared renderer requires
a visible title and both canonical dependency slots, emits optional count
snapshot text, and renders Continue Shopping only from a complete label/href
pair.

Canonical CSS owns the header, focus treatment, intrinsic one/two-column layout
and both accepted summary presentations. `summaryPlacement` defaults to sticky
and explicit flow maps to one modifier; narrow or short contexts degrade to
flow without changing DOM order. Studio no longer overrides K1 geometry.
Shopify maps real cart data, localized plural count, a real collection route
and an editor placement choice into the same anatomy without restoring its old
parallel layout or hardcoded `top: 100px` fork.

The owner accepted K1-A: populated-only, canonical Cart Empty as the mutually
exclusive target branch, target-owned commerce lifecycle, and configurable
sticky/flow placement with a safe fallback. Automated structure,
accessibility, interaction, responsive containment, Exhibit/Studio parity and
generated target gates pass. K1 is ready for explicit human review, not
`stable`; final visuals, Shopify production behavior and target-specific design
evidence remain pending.

## Certification Summary

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Owner-accepted populated snapshot composition only; no neutral store, calculator, mutation client, status coordinator, checkout router or empty-state machine. |
| Anatomy and required slots | pass | Named native section, native header, required title/layout/items/line list/summary, optional count and complete optional link. |
| Public API | pass | Seven stable semantic properties, including `summaryPlacement: sticky | flow`; no grid, offset, breakpoint, raw commerce or provider API. |
| Canonical composition | pass | Shared renderer consumes canonical Cart Line Item and Cart Summary subtrees without copied behavior. |
| State ownership | pass | Neutral K1 is stateless; local docs target proves one coherent quantity/count/total replacement. |
| Semantics and accessibility | pass | Native region/heading/list/link/description-list/Button structure, logical order, valid names and visible focus. |
| Responsive/content resilience | pass | Eight natural captures, six direct widths, localized RTL, extreme text, effective 200% and user spacing. |
| Exhibit/Studio parity | pass | One renderer/fixture; exact normalized DOM and internal-style hashes. |
| Tokens and presentation | pass | Complete semantic token inventory, private responsive/sticky safety geometry, no public internal geometry, hardcoded page padding or universal offset. |
| Runtime/performance | pass | Zero K1 neutral script; Cart family remains under its permanent ceiling. |
| Web targets | pass | Web adapter validates; Webflow and Shopify Cart CSS are byte-identical with source. |
| Shopify | valid source, runtime proof pending | Liquid and locale schema expose both placements; native/live/editor/Ajax and focus-safety behavior remain planned. |
| Human review | ready and required | Semantic architecture is accepted; final sticky/flow visuals, Shopify, Figma and stability approval remain explicit. |

## Baseline Findings

The baseline mixed page structure, layout and target policy:

- `.cart-page` was an unnamed section in MDX and an unnamed `div` in
  Shopify.
- `.cart-page__items` used another unnamed section and incorrectly contained
  the K1 header.
- Required dependency slots could be disabled, leaving an incomplete page.
- Studio converted a missing continue destination into `#collection`.
- Root columns came from a viewport media query while Studio and Shopify
  independently replaced them.
- Root page padding and a physical header margin made K1 compete with target
  containers.
- Title/count typography was incomplete and focus used local geometry.
- Shopify placed its H1 outside K1, omitted count/continue context and added
  `position: sticky; top: 100px` without an accepted obstruction policy.
- The four baseline screenshots showed visible Exhibit/Studio geometry
  divergence and did not prove direct container response or special modes.

Preserved before evidence:

- `output/playwright/refinement-batch-121/before/cart-page-exhibit-mobile.png`
- `output/playwright/refinement-batch-121/before/cart-page-exhibit-desktop.png`
- `output/playwright/refinement-batch-121/before/cart-page-studio-mobile.png`
- `output/playwright/refinement-batch-121/before/cart-page-studio-desktop.png`

## Research And Direction

No cross-platform Cart Page widget or ARIA interaction model exists:

- [WHATWG section semantics](https://html.spec.whatwg.org/dev/sections.html#the-section-element)
  support a heading-labelled thematic section and neutral `div` layout
  wrappers.
- [WCAG status-message guidance](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
  supports one complete target-owned announcement for important no-focus
  changes, not multiple competing live totals.
- [WAI form notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
  place success, error and focus behavior in the complete workflow.
- [Open UI](https://open-ui.org/research/component-matrix/) and
  [Radix](https://www.radix-ui.com/primitives/docs/overview/introduction) expose
  no Cart Page primitive.
- [Polaris web components](https://shopify.dev/docs/api/app-home-ui-extension/latest/web-components)
  provide generic layout, action and status building blocks rather than a
  neutral cart store.
- [Shopify's cart template](https://shopify.dev/docs/storefronts/themes/architecture/templates/cart)
  and [Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements#cart-page-requirements)
  require real line data, quantity/removal, totals, discounts, notes, checkout,
  empty handling and coherent refresh. Those obligations belong to the target
  adapter and service.

The convergent direction is therefore native document semantics, canonical
dependency composition and target-owned commerce truth. ADR 0212 records that
boundary without deciding Cart Empty consolidation, sticky behavior or a
production mutation architecture.

## Shared Renderer And Fixture

`site/src/components/studio/CartPageArtwork.tsx` owns the shared docs shell:

- trims title, count, link label and destination;
- returns no root for a blank title or missing line/summary composition;
- generates a target-unique title association;
- renders native `section`, `header`, contextual heading, `p > bdi` count,
  ordinary link and neutral layout wrappers;
- exposes no state, calculations, formatter, observer or service; and
- receives canonical dependency nodes rather than recreating them.

`CartStudio` supplies the same fixture to Exhibit and Studio. Required slots
are visible but disabled. The fixture's local target coordinator demonstrates
one confirmed quantity update by replacing the dependency quantity, visible
count and summary rows from the same local state. That demonstration does not
move commerce arithmetic into K1's contract or neutral runtime.

## Anatomy And API

| Part | Requirement | Semantic owner |
| --- | --- | --- |
| `.cart-page` | required | K1 native named section and inline-size container |
| `.cart-page__header` | required | K1 native header |
| `.cart-page__title` | required/non-empty | target content/rank plus K1 section name |
| `.cart-page__count` | optional | target-localized coherent snapshot |
| `.cart-page__continue` | optional/complete | target destination plus native K1 link |
| `.cart-page__layout` | required/private | K1 neutral intrinsic layout |
| `.cart-page__items` | required | neutral wrapper |
| `.cart-lines > .cart-line` | required/non-empty | canonical Cart Line Item collection |
| `.cart-page__summary` | required | neutral wrapper |
| `.cart-summary` | required/complete | canonical Cart Summary |

Public properties:

- `title`: required visible name; target chooses heading rank.
- `count`: optional localized snapshot text, not a calculation input or live
  region by default.
- `continueLabel` and `continueHref`: optional complete pair.
- `lineItems`: required non-empty canonical collection.
- `summary`: required canonical summary from the same target state.
- `summaryPlacement`: optional semantic `sticky | flow`, default `sticky`; it
  changes presentation only and degrades safely when the target or available
  space cannot satisfy the sticky contract.

K1 intentionally does not expose raw records, prices, currency, arithmetic,
discounts, tax, shipping, loading/error state, mutation endpoints, checkout
URL, status copy, columns, summary width, breakpoint, sticky offset, page
padding, heading rank or provider objects.

## State And Mode Verification

| State or mode | Result |
| --- | --- |
| Default | Named populated cart, one canonical line, one canonical summary and complete optional context. |
| Blank title | Complete K1 renderer omitted. |
| Count blank | Count node omitted without a placeholder. |
| Continue destination blank | Link omitted; no invented fallback URL. |
| Required lineItems/summary | Controls checked and disabled in Studio. |
| Continue focus | Native link focused with solid `2px` outline and `3px` offset. |
| Target fixture update | Quantity `1 -> 2`, count `1 item -> 2 items`, total `$120 -> $240`; zero automatic live regions. |
| Default sticky | Wide/tall capable context keeps the canonical summary sticky within the cart layout and available viewport height. |
| Explicit flow | `.cart-page--summary-flow` keeps the identical summary in logical flow at every size. |
| Sticky fallback | Narrow component or short viewport computes normal flow without DOM reordering or runtime. |
| Direct `280/560/895px` | One layout track and zero component overflow. |
| Direct `896/1000/1200px` | Two layout tracks and zero component overflow. |
| RTL/localized | Logical RTL direction and zero component overflow. |
| Extreme/unbroken | `280px` root grows vertically without visible horizontal overflow. |
| Effective 200% text | Root and visible descendants remain internally bounded. |
| User text spacing | Root and visible descendants remain bounded. |
| Dark | Title, count and link remain above `4.5:1`. |
| Forced colors | Native system link color and visible focus outline remain. |
| Reduced motion | Zero active K1/dependency animation or transition parts. |

## Accessibility Results

The final accessibility tree exposes:

- one region named “Your cart” from its visible H2 in docs context;
- one paragraph “1 item”;
- one native “Continue shopping” link;
- one native list and list item with product link, contextual quantity group,
  remove/save Buttons and text-complete prices;
- one region “Order summary” with native term/definition rows;
- canonical Checkout and Express checkout Buttons; and
- zero automatic status/alert/live regions in the static state.

The root has no custom role, `aria-label`, tab stop or script. The title id
exists and matches `aria-labelledby`. Items and summary wrappers are neutral
`DIV` elements, so K1 does not add unnamed or duplicate landmarks.

Measured contrast:

| Part | Light | Dark |
| --- | ---: | ---: |
| Title | `17.93:1` | `17.18:1` |
| Count | `7.81:1` | `12.09:1` |
| Continue link | `5.88:1` | `9.95:1` |

## Container Response And Visual Evidence

The root establishes `container: cart-page / inline-size`. Only
`.cart-page__layout` responds. The private threshold is `56rem`:

- `895px`: one computed track;
- `896px`: `480px 384px`;
- `1000px`: `584px 384px`;
- `1200px`: `784px 384px`.

Natural paired captures exist for Exhibit and Studio at `390x844`,
`768x1024`, `1440x1000` and `1920x1080`. The site artwork frames remain
narrower than the private threshold, so they truthfully show the one-column
state. A direct isolated `1000px` screenshot shows the two-column state using
the same live Studio node and canonical CSS.

After and special evidence:

- `output/playwright/refinement-batch-121/after/`
- `output/playwright/refinement-batch-121/special/studio-wide.png`
- `output/playwright/refinement-batch-121/special/studio-dark.png`
- `output/playwright/refinement-batch-121/special/studio-forced-colors.png`
- `output/playwright/refinement-batch-121/special/studio-rtl.png`
- `output/playwright/refinement-batch-121/special/studio-extreme.png`
- `output/playwright/refinement-batch-121/special/studio-text-200.png`
- `output/playwright/refinement-batch-121/special/studio-text-spacing.png`
- `output/playwright/refinement-batch-138/after/`
- `output/playwright/refinement-batch-138/special/studio-sticky-wide.png`
- `output/playwright/refinement-batch-138/special/studio-flow-wide.png`
- `output/playwright/refinement-batch-138/special/studio-sticky-long-focus.png`

Batch 138's `final-evidence.js` and `evidence-summary.json` record the accepted
placement certification: eight paired captures, zero overflow/errors, sticky
default, explicit flow, short/narrow fallback, a bounded `2,897px` tall summary
with focused Checkout visible after internal scroll, and clean resources.

## Exhibit And Studio Parity

Both modes mount `CartPageArtwork` with the same fixture and canonical
dependency renderers. With the root normalized to `1000px`, batch 138 records:

- normalized default-tree hash: Exhibit `f6099acc`, Studio `f6099acc`;
- identical classless sticky default and canonical dependency subtrees; and
- one source renderer plus canonical CSS, with no Studio placement override.

Natural frame sizes differ because Studio reserves inspector space, but all
eight captures have zero root, visible-descendant and document overflow. The
session used one headless Chromium browser, one page and the fixed managed
server. Console/page error arrays are empty. Cleanup and
`evidence:assert-clean` passed with port `4173` free.

## CSS, Tokens And Performance

K1's public token audit matches every canonical variable it consumes:

- color: primary, secondary, accent and focus;
- spacing: element gap and grid gap;
- typography: H2 weight/size/line/family and body
  weight/size/line/family.

The summary width, `56rem` width threshold, `36rem` height guard, available
height calculation and default safe-area offset remain private implementation
geometry. Page gutters and real target chrome offsets remain target-owned.

| Artifact | Raw | Gzip | SHA-256 |
| --- | ---: | ---: | --- |
| K1 CSS slice | `2,537 B` | `814 B` | `6dbdf4285389a2c28adde0bc6c2f5a6fb814e869e7652df14ba733e6048275be` |
| Cart family source | `17,085 B` | `3,047 B` | `c2a93f2603708a33d43d16da7168f6fa6215b0f9ba95c0b7b60c518c7fcaff51` |
| Web components | `535,579 B` | `71,905 B` | `196daeebd0c1e875d534b6809bc5bfbc422a46441e47f056f81dd3a4b4d2cc7e` |
| Web runtime | `117,741 B` | `22,836 B` | `0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b` |

The permanent performance audit measures the complete Cart family at
`3,057 / 3,072 B`, with `15 B` headroom. K1 adds zero neutral JavaScript, listener, observer,
request, timer, state store, layout read, motion or asset. Source, Webflow and
Shopify Cart CSS are byte-identical.

## Shopify Projection

`main-cart.liquid` now:

- branches to Cart Empty outside K1 when `cart.empty?`;
- wraps the populated branch in Shopify's native cart form;
- places localized H1, plural count and real Continue Shopping link inside the
  named K1 root;
- maps `cart.items` into canonical line snippets;
- maps real summary facts and checkout into the canonical summary snippet;
- exposes an editor sticky/flow choice, defaults to sticky, and maps the owned
  Gallery Header plus safe-area offset into the canonical private hook;
- keeps Cart Note, explicit update and Discount Field outside K1; and
- removes all parallel inline grid and sticky CSS.

The Shopify Liquid skill validator reports `VALID` for:

- `sections/main-cart.liquid`;
- `locales/en.default.schema.json`; and
- `locales/es.schema.json`.

Adapter validation also passes, but the contract remains `planned` because
native/Ajax mutation choice, section refresh, line errors, focus, status,
empty transition, Theme Editor behavior, accelerated checkout and live-store
proof are not yet certified.

## Automated Validation

Passing gates:

- JSON parse for contract, Studio definition, registry and locales;
- `npm run validate:contracts`: 183 contracts;
- `npm run validate:studio`: 183 definitions, 1,019 semantic properties;
- `npm run validate:docs`: 183 registry components and 183 MDX pages;
- Web token/source/compatibility validation;
- Web adapter build/validation: 183 components, 19 CSS sources;
- Shopify token and adapter validation: 183 components, 90 target-ready
  components, 59 dedicated Liquid templates, 34/34 schema-ready and 17 CSS
  assets;
- Shopify skill validation: three edited files valid;
- component readiness: 183/183 automated pass, 1 stable, 178 pilot and 4
  deprecated contracts;
- refinement audit: 183 components, 219 edges, 183 dossiers and 152
  human-review-ready;
- Exhibit/Studio audit: 183 structurally shared, 181 visually reviewed, 134
  interaction-reviewed plus 47 not applicable and 2 pending;
- static preview audit: 254 previews, zero errors;
- TypeScript `--noEmit`;
- external Vite build to
  `/tmp/the-gallery-site-k1-batch-138`: 2,507 modules; and
- `git diff --check`, CSS-copy identity and clean evidence-resource gate.

`site/dist` was not rebuilt or modified.

## Risks And Open Questions

Semantic architecture is resolved by the owner and ADR 0254. Remaining human
and target evidence:

- approve final sticky/flow hierarchy, motionless behavior, proportions and
  narrow/short/zoom fallback;
- choose native navigation versus Ajax mutation per target;
- define pending/error/rollback/retry, post-removal focus, empty transition,
  status wording/cadence and cross-surface synchronization;
- approve title/count/link hierarchy, one/two-column threshold, track ratio,
  summary measure, density and target gutter relationship;
- prove Shopify editor, live-store, selling-plan, unit-price, discount, tax,
  note, checkout and accelerated-payment behavior;
- supply K1-specific Figma/reference artwork and real content extremes; and
- explicitly approve stability.

K1 therefore remains `pilot`, is `human-review-ready`, and is not promoted to
`stable`.
