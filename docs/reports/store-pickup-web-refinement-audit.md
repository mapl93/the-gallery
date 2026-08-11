# Store Pickup Availability Web Refinement Audit

> Historical migration evidence only. ADR 0244 removes this passive identity;
> current evidence lives in the Pickup Location Selector and Store Locator
> audits.

Status: `refined-decision-needed`

Date: 2026-07-18

Component: `D9` / `store-pickup`

Contract: `0.2.0` / `pilot`

ADR: [0215 Canonical Store Pickup Accordion And Target Availability Snapshot](../decisions/0215-canonical-store-pickup-accordion-and-target-availability-snapshot.md)

Dossier: [Store Pickup Availability](../refinement/dossiers/store-pickup.md)

## Outcome

Store Pickup Availability is technically refined as a thin product-context
profile over one canonical Accordion item. It owns the pickup summary
composition, a native location list, readable record hierarchy and optional
decorative status-media treatment. Accordion owns the heading, native Button,
stable relationships, expansion state, hidden panel, focus, indicator and
motion. One shared renderer and initial fixture serve Exhibit and Studio.

The neutral candidate renders a target-supplied snapshot and deliberately does
not define inventory truth, merchandise identity, provider requests, location
ordering, loading/error policy, asynchronous status, store selection or maps.
Every valid record has visible identity and readable availability; color and
icons are reinforcement only. The base adds zero D9-specific runtime.

Automated, interaction and visual technical gates pass. D9 remains `pilot`, is
not `stable` and is not ready for stability review because snapshot scope,
provider semantics, ordering, update/status lifecycle, Shopify architecture,
long-list/selection direction, final visuals and D9-specific owner evidence are
open product or target decisions.

## Certification Summary

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass with target decisions pending | Current-merchandise pickup snapshot only; not inventory, selection, checkout, locator, map or reservation infrastructure. |
| Anatomy and required slots | pass | One Accordion item plus one required native location-list composition; optional summary/status media and record details omit cleanly. |
| Public API | pass | `toggleLabel`, required `locations` and `expanded`; no provider or universal location schema leaks into the base. |
| Canonical composition | pass | D9 consumes canonical Accordion instead of duplicating trigger, focus, indicator, visibility and motion. |
| Controlled/uncontrolled strategy | pass | One logical expanded owner; stateful targets may add controlled/change or uncontrolled-default conveniences. |
| Semantics and accessibility | pass for docs target | H3 with one Button child, stable IDs, synchronized `aria-expanded`/`hidden`, native list, text-complete statuses and no unnecessary region/live region. |
| Interaction | pass | Click, Enter and Space synchronize state, retain trigger focus and exclude hidden descendants from Tab order. |
| Responsive/content resilience | pass | Eight paired viewports; direct 200/320/520/720px hosts; one/eight records; RTL, 200% text, user spacing and extreme unbroken content. |
| Exhibit/Studio parity | pass | Exact normalized DOM and non-geometric computed-style hashes from one renderer/fixture; host width differs only 4px. |
| Tokens and presentation | pass | Semantic public tokens plus one private rhythm variable; hardcoded lengths are bounded private structural/compositional values. |
| Runtime/performance | pass for fixed Product ceiling | Zero D9 runtime; D9 retains its 589 B gzip baseline and Product has 467 B headroom. |
| Neutral Web/Webflow | pass | Generated adapter validates and Product CSS copies are byte-identical. |
| Shopify | planned honestly | CSS projection validates; no Liquid/provider/variant coordinator/editor or live-store readiness is fabricated. |
| Human review | required | Provider, lifecycle, selection/long-list, Shopify, visual and Figma decisions remain explicit. |

## Baseline Findings

The pre-refinement candidate mixed D9 purpose with duplicated infrastructure:

- `.store-pickup` repeated `aria-expanded` already owned by the trigger;
- a local Button, chevron, focus rule, transition and CSS `display` toggle
  duplicated canonical Accordion behavior;
- the trigger was not the only child of a contextual heading;
- location records were generic `div`s rather than a native list;
- available/unavailable selectors described visual states without a public
  location composition;
- only `toggleLabel` and `expanded` were exposed, so the defining fixture data
  remained implicit inside Product Studio;
- Studio hardcoded one local renderer and two records instead of an extracted
  shared D9 boundary;
- physical properties, raw pixel spacing, raw weight and fallback token values
  obscured logical layout and token ownership; and
- Shopify had only copied CSS with no target-native data/runtime evidence.

Preserved baseline screenshots are at:

- `output/playwright/refinement-batch-124/before/exhibit-mobile.png`;
- `output/playwright/refinement-batch-124/before/exhibit-desktop.png`; and
- `output/playwright/refinement-batch-124/before/studio-desktop.png`.

Baseline performance measured:

- D9 slice: `1,777 B` raw / `589 B` deterministic level-9 gzip;
- Product family: `29,764 B` raw / `4,805 B` gzip;
- neutral Web components: `517,968 B` raw / `69,349 B` gzip; and
- shared runtime: `53,811 B` raw / `10,501 B` gzip.

## Research And Direction

The dossier compares:

- [WAI-ARIA APG Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
  and [Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/);
- [Open UI Accordion research](https://open-ui.org/components/accordion.research/);
- [Radix Accordion](https://www.radix-ui.com/primitives/docs/components/accordion);
- Shopify's [pickup-availability theme guide](https://shopify.dev/docs/storefronts/themes/delivery-fulfillment/pickup-availability)
  and [StoreAvailability object](https://shopify.dev/docs/api/storefront/latest/objects/StoreAvailability);
- Shopify Customer Account [Disclosure](https://shopify.dev/docs/api/customer-account-ui-extensions/2025-07/ui-components/typography-and-content/disclosure); and
- WCAG 2.2 [Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html).

The sources converge on one visible disclosure control, synchronized content,
keyboard activation, readable per-location status and target ownership of live
availability data. They do not establish one cross-target record schema,
ordering, default-open policy, maximum count, map/selection treatment or update
announcement. Shopify availability is selected-variant data and may remain
available with zero on-hand quantity because transfers or overselling apply;
D9 therefore does not infer commerce truth from quantity.

ADR 0215 accepts the thin profile and retains those decisions explicitly at the
target/product boundary.

## Shared Renderer And Fixture

`StorePickupArtwork` is the one docs renderer for Exhibit and Studio. It:

- trims the required label and every candidate record's required text;
- fails closed when the id prefix, label or all valid records are missing;
- composes exactly one `AccordionArtwork` item with an H3 and no unnecessary
  panel region landmark;
- renders records as `ul`/`li` with required visible name and availability;
- omits details and hours without empty nodes;
- treats summary and status media as `aria-hidden` reinforcement;
- receives `expanded/onExpandedChange` from one target owner; and
- contains no provider, product model, request, timer, storage, observer,
  formatter, geolocation, map or component-specific runtime.

`ProductStudio` supplies one site-only two-record fixture and Lucide media. The
fixture demonstrates mixed availability and optional-field omission; it is not
a public default or production data schema. The MDX fallback uses the same
canonical class/anatomy contract, while the actual Exhibit and Studio artwork
mount the shared renderer detected by the parity audit.

## Anatomy And Public API

| Part | Requirement | Owner |
| --- | --- | --- |
| `.store-pickup.accordion` | required | D9 product-context root plus canonical Accordion group |
| `.accordion__item` | exactly one | Accordion |
| `.accordion__heading > .accordion__trigger` | required | Accordion plus target label |
| `.store-pickup__summary-icon` | optional | target fixture; decorative or redundant |
| `.accordion__icon` | optional | Accordion expansion indicator |
| `.accordion__panel[hidden]` | required | Accordion state/visibility |
| `.accordion__content` | required | Accordion flow wrapper |
| `ul.store-pickup__locations` | required | D9 plus complete target slot |
| `li.store-pickup__location` | one or more | target record composition |
| `.store-pickup__status-icon` | optional | decorative target media |
| `.store-pickup__location-name` | required per record | visible target identity |
| `.store-pickup__availability` | required per record | readable target status |
| `.store-pickup__details` | optional | readiness/address/distance/instructions/qualification |
| `.store-pickup__hours` | optional | localized hours or timing context |

Public properties:

- `toggleLabel`: required non-empty localized trigger label;
- `locations`: required complete target-owned native list slot; and
- `expanded`: optional target-owned disclosure state, default `false`.

D9 intentionally exposes no availability boolean, location ID, coordinates,
quantity, pickup-time enum, address/hours schema, distance, merchandise key,
endpoint, provider, loading/error/empty state, sort, maximum count, breakpoint,
icon name, color, focus, animation or panel geometry property.

## State And Interaction Verification

| State or mode | Result |
| --- | --- |
| Initial expanded fixture | Trigger `aria-expanded=true`; related panel visible; native list contains two valid records. |
| Click collapse | Trigger becomes false, panel receives `hidden`, computed display is `none`, focus remains on trigger. |
| Hidden descendant probe | A temporary focusable descendant is skipped by Tab while its panel is hidden. |
| Enter expand | State synchronizes to true and focus remains on the trigger. |
| Space collapse | State synchronizes to false and focus remains on the trigger. |
| Studio state control | Projects both contract states through the same renderer. |
| Required locations slot | Checked and disabled in Studio; consumers cannot remove required composition through presentation controls. |
| Blank required label | Complete D9 root fails closed. |
| Reset | Restores initial label, required slot and expanded fixture. |
| One record | Optional composition remains contained with no extra separator content. |
| Eight records | Long list remains structurally valid and horizontally contained; modal/locator direction remains a product decision. |

## Accessibility And Special Modes

The final DOM exposes one canonical Accordion item, one H3 whose only child is
the native Button, stable trigger/panel IDs, synchronized state and one native
location list. The modest panel has no unnecessary `region` landmark. There is
no root `aria-expanded`, parallel D9 disclosure class, `aria-live`, status or
alert region. Text carries complete availability meaning.

Measured text contrast:

| Part | Light | Dark |
| --- | ---: | ---: |
| Trigger | `17.93:1` | `17.18:1` |
| Location name | `17.93:1` | `17.18:1` |
| Availability | `7.81:1` | `12.09:1` |
| Details | `7.81:1` | `12.09:1` |
| Hours | `7.81:1` | `12.09:1` |

The decorative available icon measures `2.54:1` in light and `9.33:1` in dark;
it is not the status carrier, and adjacent readable text passes AA. Forced
colors maps both decorative status icons to the system color while preserving
the top boundary and a `2px` keyboard focus outline. Reduced motion reports
`0s` trigger/indicator transitions and no animation.

Localized RTL, effective 200% text, user text spacing, one/eight records and
extreme unbroken content at a direct 200px host all report zero root, stage and
document horizontal overflow.

## Responsive And Visual Evidence

Paired Exhibit/Studio captures exist at:

- Mobile: `390x844`;
- Tablet: `768x1024`;
- Desktop: `1440x1000`; and
- XL: `1920x1200`.

All eight natural captures have zero root, stage and document horizontal
overflow. Direct fixed hosts at 200, 320, 520 and 720px also report zero root,
trigger and list overflow. Additional evidence covers dark mode, forced colors,
RTL, effective 200% text, user spacing, one/eight records and extreme 200px
content:

- `output/playwright/refinement-batch-124/after/`;
- `output/playwright/refinement-batch-124/special/`; and
- `output/playwright/refinement-batch-124/evidence-summary.json`.

Visual inspection confirms a quiet product-divider treatment, clear trigger and
record hierarchy, stable mobile wrapping, correct RTL ordering, visible system
focus/boundaries and readable extreme-width behavior. Divider curvature,
density, icon weight, label hierarchy, expanded default and final record rhythm
remain human visual decisions rather than automated approval.

## Exhibit And Studio Parity

Both surfaces mount `StorePickupArtwork` through `ProductStudio` with the same
initial fixture:

- normalized DOM: Exhibit `912baa48`, Studio `912baa48`, length `2,768`;
- non-geometric computed styles: Exhibit `4ebc2cde`, Studio `4ebc2cde`;
- root geometry: Exhibit `516px`, Studio `520px`.

The 4px geometry difference comes from documentation-shell framing. DOM,
content, children, attributes and all measured non-geometric styles are exact.

The final phase used one managed Gallery server, one named headless Chromium
session and one page. Failure, console-error and page-error arrays are empty.
Cleanup and `evidence:assert-clean` passed with port 4173 free.

## CSS, Tokens And Performance

D9 consumes Accordion's trigger, focus, indicator, visibility, motion and
forced-color infrastructure. Its CSS retains only the top boundary, trigger
profile, summary/status-media boxes, native list reset, record flow, supporting
type hierarchy and one private spacing variable.

Public tokens cover border, primary text, success/disabled status media,
body-small/caption type and layout gap. Private values are bounded composition:
`1px` structural dividers, a `1.25em` icon box, `0.5`/`0.75` spacing derivations
and a `0.125em` internal text gap. They are not public semantic decisions. D9
uses no hardcoded color, font family, shadow, z-index, viewport breakpoint or
component-token layer.

| Artifact | Baseline | Final | Ceiling/result |
| --- | ---: | ---: | --- |
| D9 CSS slice | `1,777 B / 589 B gzip` | `1,903 B / 589 B gzip` | gzip unchanged; richer native-list anatomy |
| Product family CSS | `29,764 B / 4,805 B gzip` | `29,890 B / 4,857 B gzip` | `5,324 B`; pass with `467 B` headroom |
| Neutral Web component CSS | `517,968 B / 69,349 B gzip` | `518,094 B / 69,355 B gzip` | existing program gap; D9 batch `+6 B` |
| Shared runtime | `53,811 B / 10,501 B gzip` | unchanged | D9 delta `0 B` |

Measurements are metadata-free deterministic level-9 gzip. Final SHA-256:

- D9 slice:
  `ad6312618ab8bee0e25940ecd432fe672da490d9f3c95de12cd9fdd98e0511c4`;
- Product CSS:
  `dfab05b42063c4a3d46b329787c921517260fc7f0fe4f556af0838914f042fcc`;
- neutral Web components:
  `98c6da93fbe9805be1a4f8ecec8558742856b2cb44f5f8c2182a1956dece2e2b`;
- shared runtime:
  `1e682941301520ac5a172a0b9724dc3c9f0a0bca11f042b713fec2b60375e24a`.

Product source CSS is byte-identical to its Webflow and Shopify copies. D9 adds
no listener, observer, request, timer, cache, storage, formatter, geolocation,
map, layout read, custom element, asset or component-specific JavaScript.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | One canonical Accordion item plus native target location list; target owns live state/data. | Implemented and docs-target browser evidenced. |
| Static Web/Webflow | APG Button/hidden panel or accepted native-details translation; CMS supplies snapshot. | CSS ready; provider/refresh behavior not certified. |
| Shopify | Selected variant store availabilities supply records; section/container and coordinator replace snapshot. | Planned; no Liquid, variant lifecycle, localization, editor or live-store claim. |
| React/Angular/Hydrogen | Controlled/uncontrolled disclosure; product coordinator supplies current snapshot/update status. | Translation documented; no framework enters the base. |
| Figma | Collapsed/expanded plus mixed records and narrow wrapping through Accordion child instance. | Planned; registered generic nodes are not D9 approval. |
| SwiftUI/Compose/future | Native disclosure and list; application service supplies localized records. | Conceptual mapping only. |

## Validation Record

Passing gates include:

- `npm run validate:contracts` — 183 contracts;
- `npm run validate:studio` — 183 definitions, 895 semantic properties and
  1,616 public token references;
- `npm run validate:docs` — 183 registry components, pages and source CSS;
- site TypeScript `npx tsc --noEmit`;
- `npm run audit:previews:static` — 251 previews, zero errors;
- `npm run audit:exhibit-studio` — 183 structurally shared components;
- `npm run audit:components` — 183 automated passes;
- generated Web adapter validation;
- generated Shopify adapter validation with known maturity warnings only; and
- an external Vite build at
  `/tmp/the-gallery-site-store-pickup-final-20260718-2232`, outside `site/dist`.

`site/dist` was not rebuilt or modified.

## Risks And Open Decisions

1. Is the snapshot scoped to selected variant, product, market, selling plan,
   quantity, customer location permission or another record?
2. Which provider is authoritative, and how are transfer-backed, oversellable,
   preorderable, reserved, stale or partially known states named?
3. Which locations appear and how are they ordered?
4. Who owns loading, empty, partial, error, abort, retry, stale suppression,
   replacement and any dynamic status announcement?
5. Which supporting fields/actions are permitted: address, distance, hours,
   holiday closures, directions, phone, instructions or booking?
6. Does v1 remain an inline disclosure, or does verified long-list/selection
   scope require Modal, Drawer or a store locator?
7. Which targets use Button/hidden panel versus native `details/summary`?
8. Which Shopify section/container, selected-variant event, Liquid mapping,
   localization, editor behavior and live-store proof are intended?
9. The owner must approve divider curvature, density, hierarchy, icon treatment,
   record rhythm, expanded default and D9-specific Figma evidence before any
   stability review.
