# Review Web Refinement Audit

Status: Technically refined; ready for human review; remains `pilot`

Date: 2026-07-15

## 2026-08-25 Identity Update

Owner decision 82 and ADR 0285 rename Review Card to Review because its complete
review record, Rating, media, helpfulness, and reply behavior are not a generic
Card variant. Contract `0.5.0`, registry, `.review*` CSS, Exhibit, Studio,
dossier, report, and generated adapters use the new identity. Review remains
`pilot` and deliberately has no Card dependency.

## ADR 0235 Update (2026-07-20)

Review contract `0.5.0` now depends on canonical A11 Rating. V2 Star Rating
is deprecated and has no implementation. The final composed browser probe finds
`.rating[data-rating="4.5"]`, a matching localized image label, and zero legacy
selectors. Historical references below to a required V2 child or unresolved
A11/V2 identity are superseded; the original Review interaction,
responsive, provider, and visual-review evidence remains valid.

## Outcome

V4 Review now presents one target-supplied review as a self-contained
native article with truthful optional time semantics, one required canonical
Rating, contextual title ownership, a localized native photo list, a
described pressed helpfulness button and an associated reply without an
unnecessary landmark. The shared renderer, contract, Studio metadata and MDX
fallback now describe the same anatomy.

Provider records, verification, moderation, localization, authentication,
helpfulness persistence/count synchronization and photo activation remain
target-owned. The neutral Web component adds no JavaScript; Studio's local
toggle only demonstrates the candidate state. Shopify remains provider app-block
territory and receives generated CSS without placeholder review Liquid.

The result is prepared for explicit human review, not stable. Visual approval,
component-specific Figma artwork, A11/V2 Rating identity and provider policy are
still open.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | One independently meaningful supplied review; no provider, aggregation, verification, moderation, formatting, persistence, lightbox or structured-data ownership. |
| Anatomy and composition | pass | Article, header, author, canonical Star Rating and body are required; date/title/avatar/verification/photos/action/count/reply are explicit optional regions. |
| Variants, states and modes | pass | Default composition plus unpressed/pressed/hover/focus/disabled action states, optional content, intrinsic width, themes, RTL, forced colors and reduced motion. |
| Public API | pass | `dateTime` and `photosLabel` add stable cross-target semantics; provider IDs, heading rank, media geometry and private gaps remain out. |
| Controlled/uncontrolled | pass | Static Web projects authored state; Studio demonstrates local state; framework/provider targets may control request reconciliation and persistence. |
| Canonical dependencies | pass | One required V2 Star Rating renderer is reused; no star markup, Button runtime, Lightbox or provider behavior is duplicated. |
| Tokens and visual system | pass | Complete existing H3/body/supporting/caption typography and semantic color/radius/spacing/motion tokens; hardcoded geometry remains private and audited. |
| Accessibility and motion | pass | Contextual article label, truthful time, decorative avatar, named photo list, stable pressed label, count description, native disabled/focus and no reply landmark/live count. |
| Responsive/content resilience | pass | Four viewports, 220px host, 200% type, long/unbroken Arabic RTL, minimal content and internal photo scrolling produce no root/document overflow. |
| Runtime and assets | pass | Zero neutral Review listener, observer, timer, formatter, request, layout read or asset; site-only media/Lucide remain fixtures. |
| Cross-target translation | pass | Web implemented; Shopify/Webflow CSS regenerated; provider app block and future native/framework mappings are documented. |
| Exhibit/Studio parity | pass | One `ReviewsStudio` renderer and fixture; normalized root DOM is identical in both modes at four viewports. |
| Human readiness | pass | Dossier, ADR, contract, docs, generated targets, evidence, performance, interaction and release gates are complete; status stays `pilot`. |

## Contract And Browser Evidence

- Contract advances from `0.2.0` to `0.3.0` and records article labeling,
  independent `date`/`dateTime`, conditional `photosLabel`, state ownership,
  count description, photo activation and reply association.
- The full fixture emits one `article`, contextual `h3`,
  `datetime="2026-07-08"`, empty avatar alternative, one `ul` named `Review
  photos`, three `li` items, one Star Rating image role, and zero `aside` nodes.
- The helpfulness button's `aria-describedby` exactly resolves to the visible
  count id. The count is ordinary text with no status or live-region role.
- Enter sets pressed true, Space returns false and pointer click sets true. Three
  native click events are observed; the supplied count remains unchanged.
- Native disabled prevents the programmatic click from changing pressed state,
  resolves to `cursor: not-allowed` and uses `0.5` opacity.
- The target is `95.39 x 44px`. Keyboard modality yields a solid `2px` outline
  and `2px` offset. The pressed state keeps color, border and semibold weight
  even while hovered; the former hover masking defect is removed.
- Light primary/secondary/pressed text contrast is `17.93:1`, `7.81:1` and
  `10.37:1`. Dark primary and pressed text are white/near-white on `rgb(23, 23,
  23)`, at least `17.18:1`; secondary text is `rgb(212, 212, 212)`.
- Reduced motion reports `transition-property: none` and `0s`. Forced-colors
  mode exposes the pressed system treatment and the normal keyboard-focus
  evidence retains the required perimeter.
- The minimal composition omits title/date/avatar/verification/photos/actions/
  reply and the article label while retaining required rating and body nodes.
- In a `220px` RTL host with 200% root type and long/unbroken Arabic content,
  Review is `220/220px` and the document is `390/390px`. The deliberate
  photo scroller is `220/256px` and does not expand its parent.
- Normalized Exhibit/Studio `outerHTML` is identical at Mobile, Tablet, Desktop
  and XL with SHA-256
  `32e5dadb78b71d64735f1efec1f1bd779a7e82675ed67f91e0090ffc60eeaee4`.
  Per-mount React IDs remain unique and are the only raw-string difference.

## External And Figma Evidence

- WHATWG supports `article` for independently reusable content including
  user-submitted comments and `time[datetime]` for an independent machine value.
- APG Button and Open UI Press Button evidence supports native Enter/Space,
  stable labels and explicit pressed state without custom keyboard handling.
- Radix Toggle separates `pressed`, `defaultPressed`, change and disabled,
  reinforcing the documented controlled/uncontrolled target boundary.
- Polaris Button separates visible action, disabled/loading/emphasis and click;
  provider workflows remain consumer logic.
- Shopify recommends dynamic-source app blocks for product reviews and star
  ratings and requires them to adapt to their section. No theme-owned review
  records or settings were invented.
- Figma nodes `943:7` and `1020:480` remain generic Studio shell/inspector
  frames, not approved Review artwork. No visual value was promoted.

The full source comparison and links are recorded in
`docs/refinement/dossiers/review.md`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native article/header/time/list/button, contextual title and canonical Star Rating. | Implemented, generated and browser-evidenced with zero component JS. |
| Shopify | Dynamic-source provider theme app block plus generated Gallery Reviews CSS. | CSS-ready/planned; official CSS artifact `review-batch-50` revision 2 passes. |
| Webflow | Byte-identical canonical Reviews CSS plus CMS/provider-authored semantic markup. | Generated path available; provider behavior remains external. |
| React / Angular | Same tree with controlled pressed/request or explicit initial state. | Contract-ready; persistence/rollback/reset are target responsibilities. |
| Figma | Content presence, pressed/disabled states and reviewed public tokens. | Planned; component artwork absent. |
| SwiftUI / Compose | Self-contained review content, accessible rating/media collection and native toggle action. | Conceptual; data and localization remain target-owned. |

Canonical `components/css/reviews.css`, Shopify `assets/reviews.css` and Webflow
`reviews.css` are byte-identical. Shopify remains at 56 target-ready components,
28 dedicated Liquid templates and 19/19 schema-ready components. Review
correctly adds no dedicated provider-free Liquid file.

## Performance And Risks

| Surface | Deterministic gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Reviews CSS | `3,781 B` | `3.7 KiB` (`3,788 B`) | pass (`7 B` remaining; `+57 B` from the recorded Batch 49 snapshot) |
| Shared neutral runtime | `10,565 B` | `8 KiB` (`8,192 B`) | existing exception (`2,373 B` over; Review adds `0 B`) |
| Neutral Web components CSS | `68,119 B` | `64 KiB` (`65,536 B`) | current program gap (`2,583 B` over; the full regeneration includes accumulated worktree drift) |

- Human review must approve title/reviewer hierarchy, density, photo size/crop/
  scroll treatment, helpfulness emphasis, reply surface and separator.
- V2 Star Rating remains a technically refined dependency whose identity
  relative to A11 Rating needs owner architecture input.
- Provider, review schema, scale, structured data, verification, moderation,
  localization, authentication, persistence and analytics remain target choices.
- Photo action/lightbox ownership remains open and passive by default.
- No component-specific Figma artwork exists.
- Reviews CSS has only `7 B` family headroom. Later review-family work must
  preserve the ceiling or explicitly justify an architecture-level change.
- Complete Web CSS/runtime overages remain visible program gaps rather than
  budget increases.

## Validation

Registry/docs, source tokens, 182 contracts, 182 Studio definitions, Neutral
Web, Shopify and copied CSS, mandatory Shopify research and official artifact
`review-batch-50` revision 2, canonical static preview markup,
article/time/list/button semantics, native activation/disabled/focus/hover,
four-viewport normalized parity, optional/minimal content, RTL/narrow/200%
containment, dark/forced colors/reduced motion, deterministic gzip,
source/generated identity, TypeScript, a temporary Vite build outside
`site/dist`, structural/static/parity/refinement audits, diff checks and zero
browser errors comprise Batch 50.

`site/dist` was not rebuilt or modified.

## Human Review Queue

1. Approve or revise title/reviewer hierarchy, body measure, photo treatment,
   helpfulness emphasis, reply surface and separator.
2. Confirm the current optional-part inventory and whether helpfulness remains a
   reversible pressed request for v1.
3. Select provider/data/moderation/persistence and photo-activation policies per
   target before implementing Shopify or framework adapters.
4. Create component-specific Figma artwork only after browser approval.
6. Keep the contract `pilot` until explicit human stability approval.
