# Pagination Web Refinement Audit

Status: ready for human review; remains `pilot`

Date: 2026-07-14

Component: Pagination (`E4`)

## Outcome

Pagination is reconciled as a passive, URL-first navigation landmark with a
native list, canonical destination Links, exactly one non-interactive current
page, passive hidden ellipses, omitted boundary destinations, intrinsic wrapping
and no neutral runtime. Contract, registry, canonical CSS, MDX, shared
Exhibit/Studio renderer, Studio metadata, Shopify Liquid/locales, generated Web
and Shopify adapters, dossier, ADR, open questions and evidence agree.

The component is `human-review-ready` but remains `pilot`. No stability promotion
is inferred. Human review must approve the repository visual candidate,
especially the two-row narrow treatment.

## Research And Decision

- WAI navigation/list/current-page guidance and the W3C design-system example
  support a named navigation landmark, native grouping and one current item.
- APG Link guidance supports native `a[href]`; its keyboard guidance supports
  removing an inferable unavailable destination from sequential focus.
- Open UI has no standardized Pagination element and Radix has no Pagination
  primitive, so no ARIA composite role, roving focus or React runtime is added.
- Polaris demonstrates URL/callback and availability ownership at the target;
  its admin button and platform-specific infinite-scroll policies are not copied.
- Shopify `paginate`/`part` and Dawn demonstrate source-backed URL, page-window,
  current and localization data. Gallery keeps its own non-link current item and
  visual identity.
- Direct Figma inspection of file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and
  inspector `1020:480` found the generic Studio/Button pilot, not Pagination
  artwork. No density, icon, current, ellipsis or responsive decision was
  inferred from it.

ADR 0122 records the accepted safe boundary. Target lifecycle and future
presentation questions remain explicit in `docs/OPEN-QUESTIONS.md` without
blocking human visual review of the finite URL-first baseline.

## Contract And Implementation Result

- Contract `0.2.0` remains `pilot`: six anatomy parts, one variant, one size,
  three Pagination-owned states, eight behaviors, three properties, nine
  public tokens and Link as the one canonical dependency.
- Required structure is `nav.pagination > ul.pagination__list >
  li.pagination__item`. One item contains exactly one available Link, current
  span or ellipsis.
- Every destination composes `a.link.link--subtle.pagination__link[href]`.
  Canonical Link owns native activation, focus, transition and reduced motion;
  Pagination owns page-control geometry and the hover surface.
- One `span.pagination__current[aria-current=page]` is non-focusable and
  non-interactive. It is not a self-link, button or disabled pseudo-link.
- Previous is absent on page one and next is absent on page ten in the fixture.
  The obsolete `aria-disabled` and `pointer-events` rule is removed.
- Ellipsis list items and spans use `aria-hidden="true"`, remain visible, and
  never become links or focus targets.
- `label`, `currentPage`, and required `pageItems` remain the public API. Total
  pages, window algorithm, compact mode, URL scheme, requests, status, history,
  scroll, focus and announcements remain target-owned.
- The shared fixture uses ten total pages, begins at page five and derives a
  finite first/current-neighbor/last window with ellipses. This algorithm and
  click interception are docs evidence only.
- The list wraps inside its actual container without a viewport breakpoint,
  hidden item or order change. Directional SVGs mirror through `scale: -1 1` in
  RTL.
- Pagination-owned transition/easing, focus and hover-text duplication are
  removed. Link owns focus/motion/hover text; this also preserves the exhausted
  CSS budget.
- Shopify now maps `paginate.previous`, `paginate.parts`, current, ellipsis and
  `paginate.next` to the same list anatomy, real URLs and localized numeric-page
  names. The contract and generated maturity model report `implemented`,
  `section-adapter`, `ready: true`.

## Browser Evidence

### Parity And Viewports

- Mobile (`390x844`), Tablet (`768x960`), Desktop (`1440x1000`) and XL
  (`1920x1080`) produce exact initial Exhibit/Studio outerHTML parity at `1,791`
  characters.
- Every initial render contains one named navigation, one native list, nine DOM
  items, six real links, one current span and two hidden ellipses. Playwright's
  role query exposes seven list items because the two ellipsis items are absent
  from the accessibility tree.
- No viewport produces page-level horizontal overflow. Exhibit root widths are
  `311/657/516/520px`; Studio roots are `326/657/628/688px`.
- The finite nine-item window wraps to `92px` list height in Mobile and remains
  one row at Tablet (`44px`) and wide modes (`40px`). The target-size token
  resolves to `44px` on Mobile/Tablet and `40px` on Desktop/XL.

### State, Semantics, And Keyboard

- Page one renders five items, zero Previous links, one Next link, one current
  span, one hidden ellipsis and three real links. Sequential focus is exactly
  `Page 2 -> Page 10 -> Next page`.
- Page five renders both directions, pages 1/4/6/10, one current span and two
  ellipses. Activating Next changes the target fixture projection to page six.
- Page ten renders five items, one Previous link, zero Next links, one current
  span, one hidden ellipsis and three real links.
- Every destination has `href`, `tabIndex=0`, no `aria-disabled`, and a
  localized/contextual accessible name. The current span has `tabIndex=-1`, no
  synthetic role and exactly one `aria-current="page"`.
- Fixture input clamps below-range values to page one and above-range values to
  page ten. Single-page omission is source-verified by Shopify's
  `paginate.pages > 1` boundary and remains a target rendering requirement.

### Content, Themes, And Preferences

- A `311px` root with long French directional text, mixed Spanish/CJK landmark
  name and visible page `25000` wraps to `188px` without component or page
  overflow.
- Settled light-mode contrast is `7.81:1` for default Links, `16.44:1` on hover
  and `10.37:1` for the current page. Settled dark-mode contrast is `12.09:1`,
  `14.5:1` and `17.93:1` respectively.
- Forced colors retains a focused native Link with solid `2px` outline,
  `2px` offset and system link color.
- Reduced motion resolves canonical Link transition and animation durations to
  `0s`; Pagination adds no independent motion.
- RTL resolves the root to `direction: rtl`, both directional SVGs to
  `scale: -1 1`, and no root overflow.
- The final browser session reports zero console errors or warnings.

Four before images, eight viewport-after images and seven special-state images
live under `output/playwright/refinement-batch-37/`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Named native list navigation, canonical Links, one current span, hidden ellipses, target-supplied finite items/URLs, intrinsic wrap. | Implemented, generated and validated; no neutral runtime. |
| Shopify | `paginate`/`part` data, real URLs, localized names, boundary omission and collection template composition. | `implemented`, `section-adapter`, maturity `ready: true`; Liquid validation required in the final gate. |
| React / Angular | Server links or controlled projection plus one target-owned navigation/result coordinator. | Semantic direction documented; packages planned. |
| Figma | First/middle/last, short/long window, current, ellipsis, focus, one-/two-row candidates. | Planned; current registered reference is unrelated generic Button artwork. |
| SwiftUI / Compose | Equivalent target-native page navigation and current position; infinite loading remains a separate product mode. | Conceptual. |

## Performance And Risks

- Collection CSS is `2,253 B / 2.5 KiB`, leaving `307 B` and removing `4 B`
  from Batch 36 despite adding native list/wrap semantics.
- Complete neutral Web component CSS is `65,527 B / 64 KiB`, leaving `9 B` and
  removing `4 B` from Batch 36. The ceiling remains effectively exhausted.
- Shared neutral runtime is `10,492 B / 8 KiB`, the existing `2,300 B`
  exception. Pagination adds `0 B`.
- Human review must approve the two-row Mobile window, wide single-row density,
  `40/44px` target modes, `4px` gap, current surface, radius, ellipsis rhythm,
  directional icon style/recognizability/RTL, and the absence of a compact
  variant.
- Future cursor-only, load-more, infinite-scroll, compact-window, visible-label,
  self-linked-current, and client section-refresh modes require explicit target
  evidence and must not be inferred as neutral API.

## Validation

Registry/docs, DTCG/Web component-token compatibility, 183 contracts, 183 Studio
definitions, Neutral Web and Shopify adapter generation/validation, Shopify
Liquid validation, source/generated CSS identity, structural certification,
static Preview audit, exact Exhibit/Studio parity, four viewport modes,
first/middle/last navigation, keyboard order, hidden ellipses, localized/extreme
content, light/dark contrast, forced colors, reduced motion, RTL, deterministic
gzip, global refinement audit, temporary site build outside `site/dist`, diff
checks, console cleanliness and explicit `site/dist` cleanliness comprise Batch
37. `site/dist` is not rebuilt or modified.
