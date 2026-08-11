# Reading Progress Web Refinement Audit

Status: `human-review-ready`

Component: L4 Reading Progress (`reading-progress`)

Date: 2026-07-20

Decision: ADR 0228

## Outcome

The owner-selected decorative identity and dual source model are implemented in
canonical source. Reading Progress now supports exclusive Controlled and
Automatic modes without claiming task completion. Automatic requires an
explicit article source; the host owns placement. Exhibit and Studio use one
renderer/fixture and Neutral Web owns one bounded measurement service.

All final browser and structural checks pass. The contract stays `pilot`
because human visual review and a first Shopify article integration are pending.

## Certification Rubric

| Area | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Supplemental article-position cue; no reading/completion claim. |
| Anatomy | pass | One passive root/track and required fill; placement wrapper is host-owned. |
| Modes/states | pass | Controlled/Automatic, valid, invalid, unavailable, dynamic and 0/50/100 states. |
| Public API | pass | Four semantic properties; geometry details and placement remain private. |
| State ownership | pass | Target supplies Controlled value or explicit Automatic sources; no uncontrolled store/event. |
| Canonical dependencies | pass | No dependency or duplicated Progress/Scrollbar behavior. |
| Accessibility | pass | Always `aria-hidden`, non-focusable, non-live and input-passive; native article navigation remains. |
| Runtime/cleanup | pass | Shared source listeners, frame coalescing, bounded observation and complete last-instance cleanup. |
| Responsive/content | pass | Eight-view matrix plus dynamic, short, invalid, RTL, 200%, dark, forced colors and reduced motion. |
| Exhibit/Studio parity | pass | One `ReadingProgressArtwork`/fixture; normalized DOM exactly equal. |
| Target translation | pass as documented | Web implemented; Shopify and future native/framework targets mapped truthfully. |
| Human review | pending | No stable promotion. |

## Source Reconciliation

- `components/contracts/reading-progress.contract.json` -> `0.2.0`, four
  semantic properties, decorative behavior and implemented Web adapter.
- `registry.json` -> Controlled/Automatic variants and corrected purpose.
- `components/css/blog.css` -> intrinsic track, private transform scale,
  logical RTL origin and forced-colors mapping.
- `components/js/theme.js` -> explicit-source reading-state service and cleanup.
- `site/src/components/studio/ReadingProgressArtwork.tsx` and `BlogStudio.tsx`
  -> shared renderer, fixture and controlled/automatic preview.
- `site/src/content/studio/reading-progress.studio.json` -> conditional semantic
  controls and one public color token.
- `site/src/content/components/reading-progress.mdx` -> consumer guidance,
  runtime behavior and target boundary.
- ADR 0228 -> accepted identity, source formula, placement and performance risk.

## Certified Runtime Assertions

1. Controlled `-20`, `140` and invalid input projected to `0`, `100` and hidden
   `invalid`; a valid `44` restored directly.
2. Embedded Automatic produced `0`, `50.08` and `99.96` from top/middle/bottom.
3. Document-viewport Automatic produced `0.05`, `50.05` and `100`.
4. Adding dynamic article content changed the same scroll position from
   `99.96` to `46.03`; removal restored `99.96`.
5. Missing article and missing scroll-root associations hid as `invalid` with
   no stale `data-value`.
6. A short article hid as `unavailable` and restored after usable geometry
   returned.
7. Root remained `aria-hidden=true` with no role, tabindex or live attribute.
8. Root computed `position: static`; fixed/sticky placement is not embedded.
9. Controlled projection attached no scroll/resize/observer lifecycle; removing
   the final Automatic root pruned all source and geometry work.
10. The run used one tab and reported zero console errors and zero warnings.

## Browser Evidence

Artifacts: `output/playwright/refinement-blog/reading-progress-0228/`.

- Final matrix: `exhibit-{mobile,tablet,desktop,xl}.png` and
  `studio-{mobile,tablet,desktop,xl}.png`.
- State evidence: `studio-controlled-zero.png`,
  `studio-controlled-full.png`, `studio-automatic-middle.png` and
  `studio-invalid-source.png`.
- Special modes: `studio-dark.png`, `studio-forced-colors.png`,
  `studio-rtl-reduced-motion.png` and `studio-text-200-mobile.png`.
- Before evidence remains under `output/playwright/parity/blog/`.

All eight paired viewport combinations had zero document, root and fixture
overflow. The default normalized canonical DOM was exactly equal in Exhibit and
Studio (`303` characters). RTL moved transform origin to the logical start edge;
reduced motion computed zero transition duration; forced colors used the system
highlight color. Visual inspection found no clipping or unexpected global fixed
layer.

The final cleanup left port `4173` free, the managed server stopped and
`gallery-refinement` closed.

## Performance Snapshot

| Surface | Current gzip | Fixed ceiling | Result |
| --- | ---: | ---: | --- |
| Blog CSS | `5,610 B` | `5,529 B` | documented `81 B` gap; `+107 B` from pre-L4 |
| Shared runtime | `17,569 B` | `8,192 B` | documented program gap; `+1,490 B` |
| Neutral component CSS | `69,690 B` | `65,536 B` | documented program gap; `+213 B` |

Ceilings were not raised. The accepted service performs no polling, request,
asset, cookie, storage or analytics work and is designed for reuse by future
article-position consumers.

## Target Translation

| Target | Result |
| --- | --- |
| Neutral Web | Controlled and explicit Automatic source association implemented. |
| Shopify storefront | Presentation/runtime copied; target-specific article owner, schema/editor lifecycle and placement remain planned. |
| React / Angular | Thin values or explicit refs over the same state formula; no competing store. |
| Figma | Static Controlled values only. |
| SwiftUI / Compose | Native geometry or controlled value with decorative identity and host placement. |

## Remaining Human Review

- Approve/revise thickness, accent, track treatment and article/Header placement.
- Review the cue at 0, middle and full in a real page, including dark/RTL/zoom.
- Select the first Shopify article/template source and editor lifecycle.
- Decide later service reuse for automatic Table of Contents current location.
- Address the documented performance gaps without raising ceilings by default.

No `stable` promotion is authorized. `site/dist` remains untouched.
