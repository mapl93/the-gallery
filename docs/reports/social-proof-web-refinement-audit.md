# Social Proof Notifications Web Refinement Audit

Status: `human-review-ready`; contract remains `pilot`

Component: G10 Social Proof Notifications (`social-proof`, review order `92`)

Date: 2026-07-16

Owner-decision reconciliation: 2026-07-21, ADR 0253

## Outcome

G10 is now a passive commercial-activity profile of canonical Toast rather than
a second toast implementation. The neutral component presents one trimmed,
target-verified and privacy-approved statement with optional relevant media,
optional target-formatted time and optional canonical dismissal. It does not
create facts, query commercial data, announce marketing content by default or
own viewport placement, queueing, timing, persistence or provider behavior.

ADR 0253 accepts G10-A as the v1 passive Toast profile and assigns truth,
source, freshness, privacy, provider and appearance lifecycle to the target.
Shopify v1 omits G10 until that provider/source and policy are certified. The
component is ready for human visual/stability review, remains `pilot`, and was
not promoted to `stable`.

## Certification Rubric Result

| Area | Result | Evidence / remaining decision |
| --- | --- | --- |
| Purpose and limits | reconciled | One passive truthful statement; no event synthesis, provider, persistence, timing or viewport ownership. |
| Anatomy | reconciled | Required canonical Toast root/content/message; optional G10 media/time and canonical Close Button. |
| States and variants | reconciled at base | Valid/blank, visible/hidden, media/time/dismiss present/absent and narrow composition pass. Target queue/timing/source states remain external. |
| Public API | reconciled | Required trimmed `message`; optional `time`, `image`, `imageAlt`; paired dismiss action/label; controlled visibility. |
| Controlled/uncontrolled | reconciled | Presentation is controlled; the neutral profile creates no provider, timer, storage, network or inferred commercial state. |
| Canonical dependencies | reconciled | Registry and contract depend on Toast, which composes Button and Close Button; duplicate surface/lifecycle/close styling was removed. |
| Tokens/hardcoded values | reconciled | G10 retains only profile text, caption, media radius and derived private media geometry; Toast owns surface, measure, rhythm, shadow, motion and focus. |
| Responsive/content | pass | Four paired viewports plus direct `200–800px`, short, long, unbroken, localized RTL and effective-200% evidence are contained. |
| Accessibility | pass for passive base | No default live region or focus movement; strict omission; named canonical dismissal; focus, contrast, forced colors and reduced motion pass. Target removal/queue focus policy remains external. |
| Runtime/performance | bounded | G10 CSS fell to `581 B` gzip, Marketing remains under ceiling, and G10 adds zero neutral runtime/provider/network work. |
| Target translation | explicit | Neutral Web implemented; Shopify and future adapters remain planned until truthful source/privacy/provider architecture exists. |
| Exhibit/Studio parity | exact | Same renderer/fixture, normalized DOM hash `390bc1c6`, and identical equal-width root screenshot hash. |
| Human review | ready for review | V1 identity and neutral ownership are accepted; provider proof, production placement and final visual reference remain gates. |

## Implemented Refinement

### Canonical composition

- Registry dependency changed from none to `toast`.
- Contract advanced from `0.2.0` to `0.3.0` and now requires
  `.toast.toast--info.social-proof` composition.
- Root uses canonical Toast content, message and visibility classes.
- Optional dismissal uses `.close-btn.toast__close.social-proof__close` and the
  canonical Close Button icon contract.
- G10 no longer owns fixed physical placement, z-index, root surface, width,
  padding, shadow, visibility transition or close geometry/focus treatment.
- The only profile-specific responsive rule uses the Toast container: at a
  private `18rem` threshold, media remains in the first row and content spans
  the second row. The normal Toast measure remains side by side.

### Semantic and content rules

- A blank or whitespace-only message omits the complete item.
- Blank time text omits the time part.
- Dismissal renders only when the action is enabled and its localized label is
  non-empty; no English fallback is synthesized.
- Static/default Social Proof exposes no `status`, `alert` or `aria-live`
  semantics and never moves focus when presented.
- Hidden Studio state unmounts the item. Canonical Toast hidden mapping remains
  available for target-controlled mounted state.
- The documentation fixture is explicit example content and pairs the claimed
  Celadon Study with relevant product media rather than an unrelated studio
  photograph.

### Studio ownership

- Exhibit and Studio continue to use the registered `MarketingStudio` renderer
  and one fixture.
- Studio exposes semantic content, optional parts, dismissal and visibility.
- Duplicate Toast surface, shadow, focus and root-radius controls were removed;
  Studio retains only G10-owned profile text, media radius and complete time
  caption controls.

## Before / After Evidence

Before evidence remains under:

- `output/playwright/parity/marketing/social-proof-exhibit-mobile.png`
- `output/playwright/parity/marketing/social-proof-studio-mobile.png`
- `output/playwright/parity/marketing/social-proof-exhibit-desktop.png`
- `output/playwright/parity/marketing/social-proof-studio-desktop.png`

Final paired evidence is under
`output/playwright/batch93-social-proof/after/` for Mobile, Tablet, Desktop and
XL in both Exhibit and Studio. Structured measurements are in
`output/playwright/batch93-social-proof/after/measurements.json`.

| Viewport | Exhibit root | Studio root | Result |
| --- | ---: | ---: | --- |
| Mobile `390×844` | `326×157px`, narrow row | `326×157px`, narrow row | contained |
| Tablet `768×1024` | `380×97px` | `380×97px` | contained |
| Desktop `1440×1000` | `380×130px` | `380×130px` | contained |
| XL `1920×1200` | `380×130px` | `380×130px` | contained |

The Desktop/XL height difference from Tablet is site-stage font/token context,
not different component markup. At every viewport, Exhibit and Studio computed
to the same root size within that viewport and remained inside their stage.

Normalized root DOM is exactly equal (`805` characters, FNV-1a `390bc1c6`).
Equal-width root captures are byte-identical with SHA-256
`af3a131f1aa5d9414653d224e39a5ca133733dc52bcdc047d6ca48bb2c71d24e`.

## Interaction And Omission Evidence

- Initial valid fixture: one visible root, `aria-hidden="false"`, one focusable
  canonical Close Button and zero live-region roles/attributes.
- Close Button keyboard focus: visible `2px` solid outline with `2px` offset.
- Dismissal: root count changes from `1` to `0`; the site-owned “Show
  notification” launcher appears; reopening restores one root.
- The docs fixture leaves focus on `body` after removing the focused close
  control. This is acceptable only for site staging; a target Toast provider
  that removes queued items owns safe subsequent focus/queue behavior.
- Whitespace message: root count `0`.
- Blank dismiss label: root remains, close count `0`.
- Image disabled, blank time and dismissal disabled: each optional part omits
  independently without invalid markup.
- Controlled visibility off: root count `0`; restoring the control returns the
  complete fixture.

## Responsive And Extreme Content Evidence

The profile was measured directly at `200`, `240`, `320`, `380`, `520` and
`800px`. Every root had equal client and scroll width. At `200–320px`, the
container rule gives content `150–270px` instead of the original unusable
`22px` text column. At `380px` and above, canonical side-by-side composition is
preserved.

- Short content at `200px`: `198px` client/scroll width, `134px` height.
- Long Spanish at `200–800px`: contained at every width.
- Long unbroken string at `200px`: `198px` client/scroll width and no horizontal
  overflow.
- Arabic RTL at `320px`: computed `rtl`, `318px` client/scroll width.
- Effective 200% text at `320px`: message `28/40px`, time `24/32px`, narrow
  second-row composition and no horizontal overflow.

The component expands vertically for extreme content rather than truncating or
creating horizontal scroll. Target Toast viewports must still avoid obscuring
other page controls when content becomes tall.

## Accessibility Evidence

- Static/default root has no `role=status`, `role=alert` or `aria-live`.
- Required meaning remains in visible text; image and time never carry the only
  claim.
- Optional image alt is target-supplied and may be empty when the image is
  decorative.
- Close is a native Button with a non-empty localized accessible name.
- Light contrast: message `17.93:1`, time `7.81:1`.
- Dark contrast: message `17.18:1`, time `12.09:1`.
- Forced colors resolves border, message, time and close to system color.
- Reduced motion resolves Toast transition duration to `0s`, transition
  property to `none` and transform to `none`.
- Final browser evidence recorded zero console errors and zero warnings.

Repeated or auto-updating marketing activity is not certified by this base.
Any target feed must provide durable pause/stop/hide or frequency control when
required, prevent announcement flooding and follow its accepted queue/removal
focus policy.

## Token And Runtime Audit

Public G10 customization is limited to stable profile decisions:

- primary and secondary semantic text colors;
- Body Small and Caption typography references;
- media radius;
- existing element-gap and touch-target inputs used to derive private media
  geometry.

Toast owns surface, border tone, radius, shadow, measure, padding, grid rhythm,
visibility, transition and focus composition. The `18rem` container threshold
is a private responsive implementation detail and is not public API.

G10 owns no JavaScript selector, timer, observer, storage, request, analytics,
provider SDK or remote asset in the neutral runtime.

## Performance Snapshot

| Surface | Before | Final | Ceiling / result |
| --- | ---: | ---: | --- |
| G10 CSS slice | `1,653 B` raw / `676 B` gzip | `1,367 B` raw / `581 B` gzip | `-286 B` raw / `-95 B` gzip |
| Marketing family CSS | `20,126 B` raw / `4,120 B` gzip | `19,840 B` raw / `4,194 B` gzip | Batch 93 pass; current later-program snapshot is `4,782 B` |
| Neutral Web component CSS | `67,759 B` gzip | `67,810 B` gzip | Batch 93 gap; current later-program snapshot is `71,754 B` |
| Shared runtime | `10,501 B` gzip | `10,501 B` gzip | G10 delta `0 B`; current later-program snapshot is `22,807 B` |
| G10 neutral runtime/provider/network | `0 B` | `0 B` | pass |

Whole-file gzip can rise while the edited raw slice falls because compression
matches change across the complete family bundle. The permanent Marketing gate
still passes. The global Web CSS/runtime gaps remain explicit program backlog;
G10 did not add runtime.

## Target Certification

### Neutral Web

Implemented as `css-composition` from the registry, contract, canonical Toast,
canonical Marketing CSS and shared renderer. The web adapter validates all 183
components.

### Webflow and Shopify CSS projection

Canonical, Webflow and Shopify Marketing CSS are byte-identical with SHA-256
`dd94da233f62b003d4821d0a79b3831d058baffcb579feaf15c7f39cd3aa24ec`.

### Shopify behavior and data

Shopify remains `planned` (`app-or-provider-composition`) and is omitted from
v1 under ADR 0253. Theme Liquid/CSS
does not supply an authoritative cross-customer order feed and must not ship
fake/example purchase notifications or an incomplete app-like feature. A ready
adapter requires a verified app/provider, authorized event source, event
qualification/freshness, privacy/anonymisation, localization, queue, timing,
placement, persistence and withdrawal policy. Otherwise Shopify omits G10.

### Future targets

React and Angular may provide thin renderers inside one target Toast provider.
Webflow, Framer, SwiftUI, Compose and Figma must translate the same passive
content/profile boundary without copying DOM or pretending static fixtures
prove commercial truth.

## Validation

- contract validation: 183 contracts;
- Studio validation: 183 definitions, 893 properties, 1,563 token references
  and 30 icon references;
- neutral Web adapter: 183 components and 19 CSS source files;
- Shopify adapter: 183 components, 77 target-ready components, 45 dedicated
  Liquid templates, 33/33 schema-ready and 17 CSS assets; existing unrelated
  contract-readiness warnings remain;
- static preview audit: 250 previews, zero errors, one existing warning and six
  informational findings;
- TypeScript no-emit check: pass;
- docs validation and refinement matrix audit: pass;
- canonical/Webflow/Shopify CSS identity: pass;
- `site/dist`: unchanged; and
- evidence resource gate: browser closed, managed server stopped, port `4173`
  free and session count zero.

## Human Review And Target Proof

1. Supply and approve a G10-specific visual/Figma reference, including media,
   measure, time, close prominence, placement and stacking treatment.
2. For each production target, prove the authoritative source, event
   qualification, freshness/expiry, stale/error withdrawal,
   privacy/anonymisation or consent, localization and publication policy.
3. Prove target Toast viewport/queue/deduplication/rate/timing/stop-hide/
   persistence/removal/focus behavior without adding a second G10 provider.
4. Keep Shopify v1 omitted unless its verified provider/source and policy pass
   that certification.
5. Ensure no target presents the same recent-sale fact simultaneously through
   G8 Urgency and G10 Social Proof.

## Readiness

`human-review-ready`: the neutral profile, canonical dependencies, strict
content rules, passive semantics, responsive behavior, Studio API, generated
CSS projections, evidence and owner-selected target boundary are reconciled.
The component remains `pilot`; provider proof and explicit visual/stability
review are still required before any `stable` promotion.
