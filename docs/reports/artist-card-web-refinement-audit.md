# Artist Card Web Refinement Audit

Status: ready for human review; remains `pilot`

Date: 2026-07-14

Component: Artist Card (`F6a`)

## Outcome

Artist Card is reconciled as a passive artist summary with optional target-owned
portrait, canonical Flat Card and Badge, required name, omitted-empty metadata, conditional
native-root interaction hooks and zero neutral runtime. Contract, registry,
canonical CSS, MDX, shared Exhibit/Studio renderer, Studio metadata, generated
Web/Shopify outputs, dossier, ADR and browser evidence agree.

The component is `human-review-ready` but remains `pilot`. Human review must
approve the visual candidate and decide whether v1 is always passive, always a
full-card link or target-selectable through native markup. Canonical Flat Card
composition is accepted by owner decision 82; Shopify artist modeling remains
an explicit target boundary.

## Research And Decision

- Native HTML supplies the passive `article`, native link/button activation and
  context-dependent image alternative-text rules. No ARIA widget is necessary.
- WAI image guidance distinguishes informative portraits from decorative or
  redundant images. WCAG requires visible contrasting focus on an interactive
  root.
- Open UI does not converge on one universal Card anatomy or whole-card
  interaction model. Radix keeps Card passive unless consumers delegate to a
  native element.
- Shopify supports efficient responsive output from target image data but does
  not define a universal artist record, route or merchant editor model.
- Direct Figma inspection of file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
  and inspector `1020:480` found only the generic Button Studio prototype, not
  Artist Card artwork or states.

ADRs 0129 and 0285 record the safe boundary: passive default, conditional native
link/button hooks, canonical Flat Card and Badge composition, target-owned media
and Shopify data, exact shared renderer and zero neutral runtime.

## Contract And Implementation Result

- Contract `0.3.0` remains `pilot`: eight anatomy parts, one variant/size,
  four states, five behaviors, six semantic properties, seventeen public tokens
  and Card plus Badge dependencies.
- The shared root is a passive `article` with zero focusable descendants.
  `a[href].artist-card` and `button.artist-card` are optional target mappings,
  not public neutral properties.
- Passive cards receive no pointer, hover scale or root outline. Enabled native
  roots receive fine-pointer image scale and visible focus. Native disabled
  buttons cannot take focus, do not move and show an unavailable cursor.
- `.badge.artist-card__badge` replaces duplicated label padding, typography,
  colors and radius. Artist Card owns only the logical overlay inset.
- Portrait, Badge and every metadata line are optional. The renderer omits
  absent parts rather than retaining empty paragraphs.
- Complete heading/body/caption typography, logical properties, image block
  sizing and robust wrapping now live in canonical CSS. The docs-only paragraph
  reset is removed.
- The MDX fallback uses decorative preview media without a transparent image
  that falsely claims a meaningful portrait.
- Studio exposes the six semantic properties, hides Badge while portrait is
  absent and removes Badge-owned visual token controls.
- Neutral Web embeds the canonical component CSS once. Shopify's Storytelling
  and Primitives copies are byte-identical and pass official validation; Liquid
  and artist data remain deliberately planned.

## Dependency Contrast Correction

Composing Badge exposed a prior dark-theme accessibility gap: its 55% semantic
feedback-color mix produced small-text ratios of only `3.62:1–4.01:1` across
dark variants. The correction belongs in Badge, not in an Artist Card override.
The canonical Badge mix now retains 10% semantic color with primary text.

- Light Info/Success/Warning/Error resolve to at least `13.15:1`.
- Dark Info/Success/Warning/Error resolve to `5.92:1`, `4.92:1`,
  `4.58:1` and `5.64:1`.
- Forced colors remains Canvas/CanvasText with a system-color boundary.
- Badge remains `pilot`; no component was promoted to `stable`.

## Browser Evidence

### Parity And Responsive Layout

- Mobile (`390x844`), Tablet (`768x1024`), Desktop (`1440x1000`) and XL
  (`1920x1080`) produce exact initial Exhibit/Studio `outerHTML` parity.
- The site fixture remains `280px` wide. Candidate height is `522.33px` on
  Mobile/Tablet and `537.31px` on Desktop/XL; portrait ratio remains `0.75`.
- All four candidates expose zero focusable descendants, zero empty optional
  metadata, zero card overflow and zero page overflow.
- Isolated `180/220/280/480px` hosts fill their containers, preserve `3:4`
  media and have matching client/scroll widths. At the `320px` reflow shell the
  site candidate is `240px` and does not overflow.

### Semantics, Optional Content And Interaction Hooks

- The default root is `ARTICLE`, has `tabIndex -1`, cursor `auto`, no
  outline and no portrait transform before or during hover.
- The fixture portrait has empty alt because the repository image is decorative
  evidence, not an authoritative portrait of the fictional artist.
- Turning portrait off and emptying medium/location/piece count produces no
  portrait, Badge or metadata nodes. Studio removes the dependent Badge control.
- A synthetic native `a[href]` is sequentially focusable, receives a `2px`
  outline with `2px` offset, activates exactly once on Enter, contains no
  nested interactive descendants and reaches the private `1.03` fine-pointer
  image scale.
- A synthetic disabled native button cannot become active, receives no outline
  or transform and resolves to cursor `not-allowed`.

### Content, Themes, Reflow And Preferences

- A repeated unbroken Arabic name plus localized medium/location/count remains
  inside a `280px` card with no internal or page overflow. RTL places Badge
  exactly `12px` from logical inline start.
- Light name/metadata contrast is `17.93:1 / 7.81:1`; dark is
  `17.18:1 / 12.09:1`. Canonical Badge contrast passes in both themes.
- Forced colors resolves native-root focus to system Highlight and Badge to
  Canvas/CanvasText. Reduced motion resolves transition to `0s` and transform
  to `none`.
- Eight before images, eight final viewport images and seven special-state
  images live under `output/playwright/refinement-batch-44/`.
- The final component console reports zero errors and zero warnings.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Passive article, optional media/canonical Badge, required name, optional metadata and conditional native-root hooks. | Implemented, generated and validated; no component runtime. |
| Shopify | Exact canonical CSS, future responsive `image_tag`, canonical Badge and optional native link. | `css-ready`, `ready: false`; Liquid/data/destination/schema intentionally planned. Official CSS validation passes. |
| Webflow | Canonical target-agnostic CSS copy and target-authored semantic markup. | Generated component path remains available. |
| React / Angular | Passive children by default; adapter may delegate to a native link/button without adding neutral state. | Planned; no framework callback in the base contract. |
| Figma | Portrait/no portrait, Badge/no Badge, metadata combinations, passive/native annotations, themes and localized extremes. | Planned; registered reference is unrelated Button artwork. |
| SwiftUI / Compose | Passive semantic group or native navigation/action container with target-owned image loading. | Conceptual; navigation and media stay target-owned. |

## Performance And Risks

- Artist Card adds `0 B` runtime, listener, observer, timer, request, or asset.
- Owner decision 82 makes Card a truthful dependency. Because the current
  copy-and-own adapter closes dependencies at CSS-file granularity, the largest
  Storytelling install slice now includes `layout.css` and measures `25,072 B`
  against the fixed `21,504 B` ceiling: a documented `3,568 B` required gap.
- The ceiling is not raised and the dependency is not hidden. Closing this gap
  requires finer-grained component CSS packaging or another accepted modular
  output change; removing canonical Card composition would contradict the owner
  decision.
- Complete neutral CSS and shared runtime remain diagnostic aggregate
  measurements and are not reclassified as Artist Card-owned bytes.
- Human review must approve portrait ratio/crop/radius, Badge inset, name/
  metadata hierarchy, rhythm, focus geometry and native-root motion.
- Owner/product/architecture must decide final activation policy. The visual
  shell now composes canonical Flat Card by owner decision 82.
- Shopify remains a documented target gap until an artist record/editor/route
  and responsive-media policy are accepted.

All ceilings remain unchanged. The overages are explicit program gaps rather
than silently raised budgets.

## Validation

Registry/docs, source tokens, 182 contracts, 182 Studio definitions, neutral
Web, Shopify and copied platform CSS, official Shopify validation, structural
certification, static Preview audit, Exhibit/Studio audit, exact four-viewport
DOM parity, passive/native/disabled probes, optional omission, isolated
containers, narrow reflow, localized RTL extremes, light/dark contrast, all
Badge variants, forced colors, reduced motion, deterministic gzip,
source/generated identity, global refinement audit, temporary site build
outside `site/dist`, diff checks, final console inspection and explicit
`site/dist` cleanliness comprise Batch 44.

`site/dist` was not rebuilt or modified.

## Remaining Human Review

- Approve or revise `3:4` crop, medium radius, Badge inset, heading/metadata
  typography and vertical rhythm.
- Approve or remove the private `1.03` native-root motion and approve focus
  geometry.
- Decide always-passive, always-linked or target-selectable native activation.
- Reconfirm the accepted canonical Flat Card composition in live Artist Card review.
- Define Shopify artist data/editor/route/responsive-media ownership before
  dedicated Liquid.
- Confirm that ratio, crop, density, size, destination, activation, events and
  image URL remain outside the v1 neutral API.
- Do not promote the contract to `stable` without explicit human approval.
