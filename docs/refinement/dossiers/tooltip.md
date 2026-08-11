# Component Dossier: Tooltip

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/tooltip.contract.json`

## Recommendation

Replace the generated `aria-label` bubble with explicit, non-interactive
`.tooltip__content` referenced from one consumer-owned trigger through
`aria-describedby`. The target owns ids, optional delay, viewport collision,
Escape dismissal, and controlled/uncontrolled state; canonical CSS owns the
top-positioned visual treatment and hover/focus/open states. This corrects an
accessible-name regression and makes the content testable without introducing
a global Tooltip provider or framework runtime.

The component can become `human-review-ready` after this semantic migration,
four-viewport evidence, hover/focus/Escape tests, WCAG 1.4.13 checks, special
media checks, parity, and adapter validation. Placement alternatives and a
shared delay/provider remain non-blocking target questions.

## Purpose And Limits

- Supplies brief, supplementary context for a single visible trigger.
- Useful for icon meaning, a short definition, or an optional keyboard hint.
- It must never contain controls, links, required instructions, validation, or
  information needed to complete a task; use Popover, visible helper text, or
  Dialog for those cases.
- Focus remains on the trigger. Tooltip content never enters the tab order.
- Touch-only users may never receive hover content, so the information must be
  non-essential.
- Positioning collision, portals/top-layer use, delay coordination, and global
  mutual exclusion are target services, not neutral CSS responsibilities.

## Current Gallery Baseline

- Registry `B5`, Layout, no dependencies; contract `0.2.0`, `pilot`.
- Canonical CSS is `components/css/layout.css`; no shared JavaScript behavior.
- Contract anatomy is root plus generated `::before` bubble and `::after`
  arrow; one default variant, one default size, three states, three behaviors,
  one `label` property, and seven public token references.
- The web adapter renders `content: attr(aria-label)` on the trigger itself.
  That string replaces the trigger's accessible name instead of supplementing
  it, and generated content cannot carry `role="tooltip"` or an id relationship.
- CSS reveals only on root hover or `:focus-visible`; it has no Escape-dismissed
  state, no hoverable content node, no wrapping limit, and no reduced-motion or
  forced-colors rule.
- `DisclosureNavigationStudio` renders a canonical Button fixture and is shared
  by Exhibit and Studio, but it reproduces the same `aria-label` problem.
- Studio exposes only `label` and the existing visual tokens. Its design metadata
  points to the shared owner file/frame rather than a Tooltip-specific visual
  specimen, so current Gallery CSS is the visual baseline.
- The attempted live baseline capture failed before writing files. Six desktop
  baselines were therefore reconstructed from the pre-edit `HEAD` CSS/renderer
  and are explicitly labelled under
  `output/playwright/refinement-batch-14/before-reconstructed/`.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) | The content container uses `role="tooltip"`; the trigger references it with `aria-describedby`; focus stays on the trigger; Escape dismisses it. APG notes that the pattern is still work in progress. | Use explicit content and a description relationship; do not use tooltip text as the trigger name. Treat APG as strong direction, not a native platform guarantee. |
| [WCAG 2.2 Understanding 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) | Author-generated hover/focus content must be dismissible, hoverable, and persistent. | The content node must remain visible while itself hovered and support Escape without moving pointer or focus. |
| [Open UI Tooltip research](https://open-ui.org/components/tooltip.research/) | Mature systems converge on short text, hover/focus activation, non-interactive content, and one active contextual label. | Preserve a narrow text-only contract; do not promote rich content or nesting. |
| [Radix Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip) | Separates Provider, Root, Trigger, Portal, Content and Arrow, with controlled/uncontrolled state, delay, collision data, and constrained sizes. | Keep explicit trigger/content anatomy, but leave provider, portal, delay and collision to targets. |
| [Shopify Tooltip](https://shopify.dev/docs/api/app-home-ui-extension/latest/web-components/typography-and-content/tooltip) | Uses sibling Tooltip and trigger linked by `interestFor`, accepts short non-interactive content, activates on hover/focus, and warns that touch devices do not receive it. | Map the relationship to the host API rather than copying DOM; keep content supplementary. |

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | neutral wrapper | Tooltip | Positions one trigger and one content node. |
| Trigger | yes | consumer-owned focusable element | Consumer/target | Carries `aria-describedby`; Tooltip does not restyle it. |
| Content | yes | `role="tooltip"` | Tooltip | Short plain text with a stable target-owned id. |
| Arrow | no | decorative pseudo-element | Tooltip | Never announced and never receives events. |

No component dependency is registered because Button, Link, Text, or another
focusable consumer can be the trigger. Rich interactive floating content is a
Popover dependency decision, not Tooltip composition.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | `default` only. |
| Size | One compact content size; long text wraps within a private maximum. |
| Hidden | Content is not visible or interactive. |
| Hover | Trigger or content hover keeps it visible. |
| Focus | Focus within the trigger path keeps it visible. |
| Open | Optional `.is-open` target state supports controlled presentation/evidence. |
| Dismissed | Escape temporarily suppresses it until hover/focus leaves. |
| Touch | No hover assumption; content remains supplementary. |
| RTL | Centered placement and text direction inherit logically. |
| Reduced motion | Opacity transition is removed. |
| Forced colors | Surface boundary and text remain perceivable with system colors. |

## Public API And State Ownership

- `content` — required short string rendered in `.tooltip__content`.
- `trigger` — required slot containing exactly one focusable trigger.
- `open` — optional controlled presentation state mapped to `.is-open`; targets
  may instead own default/open state internally.
- Target-generated `id`/`aria-describedby` links are required implementation
  facts, not consumer prose properties.
- Events are target-owned `openChange`/dismiss equivalents. Escape dismisses;
  pointer leave and blur reset temporary dismissal. No click activation is
  introduced.
- Delay, placement, collision padding, portals, and provider coordination are
  intentionally not public v1 properties.
- Empty `content` is invalid: omit Tooltip entirely rather than render an empty
  described object.

## Token And Value Audit

- Public: statement surface, primary text, small radius, dropdown stacking,
  fast transition, default easing, body-small size/line height.
- Private: offset, inline maximum, padding, arrow geometry, and transform are
  compositional `--_` values or derived literals, not public customization API.
- Current `4px 10px`, `8px`, `5px`, `0.75` type scale, and `nowrap` are
  hardcoded. Direction: use the existing semantic typography/spacing source
  where meaningful and keep arrow geometry private.
- No image, font, observer, measurement, or layout-read asset is required.

## Visual And Content Audit

- Preserve the Gallery statement surface, primary text, small radius, and
  restrained fade; no new owner aesthetic is selected.
- Content must wrap rather than force viewport overflow, preserve localization,
  and remain readable with long words.
- Empty and rich/interactive content are unsupported. Extreme content is a
  robustness test, not an invitation to use paragraphs in production.
- The arrow is decorative and centered. Collision-aware side switching is a
  target enhancement, not simulated by neutral CSS.

## Accessibility And Interaction

- Trigger retains its own accessible name; content supplements it through
  `aria-describedby`.
- Content uses `role="tooltip"`, never receives focus, and contains no controls.
- Show on hover and focus; keep visible while pointer is over trigger or content;
  Escape dismisses without moving focus; blur/pointer exit closes normally.
- Verify name and description separately in the accessibility tree.
- Verify text/surface contrast in light and dark themes, a system-color boundary,
  zero transition under reduced motion, and no pointer-only essential content.

## Responsive And Performance

- Test Mobile 320, Tablet 768, Desktop 1440, and XL 1920, plus long localized
  text and RTL. Tooltip must not cause document overflow in the centered fixture.
- Neutral component runtime budget is `0 B`; local demo behavior does not ship as
  component runtime. Target Tooltip services receive a separate budget later.
- Batch 14 finishes at deterministic gzip sizes: Layout `5,144 B`, shared theme
  runtime `10,321 B`, and Web components bundle `60,996 B`. The Layout family
  exceeds its provisional `4.8 KiB` ceiling by `229 B`; ADR 0099 records the
  evidence-backed exception without changing the permanent ceiling.
- No per-frame work, observers, assets, or geometry reads are allowed in neutral
  CSS. Collision-capable targets may measure only while open.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Wrapper + focusable trigger + described Tooltip node; target behavior handles Escape and ids. | Canonical CSS and docs evidence implemented; production behavior remains target-owned. |
| Shopify | Map content and trigger relationship to host `s-tooltip`/`interestFor` where available; theme targets can use the neutral DOM contract. | Host-capability dependent. |
| React / Angular | Controlled/uncontrolled `open`, id relationship, delay/collision service, non-interactive content. | Planned. |
| Figma | Trigger/content anatomy plus hidden/open/focus/hover states; no timing simulation as semantic API. | Planned. |
| SwiftUI / Compose | Platform help/tooltip affordance where available; otherwise an anchored supplementary label with equivalent limits. | Planned. |

## Exhibit And Studio Parity

`DisclosureNavigationStudio` is the single Exhibit/Studio renderer and fixture.
It now renders explicit described content and local Escape/hover/focus evidence
without duplicating canonical visual CSS. Site-only classes center the fixture
but do not restyle the bubble.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| `aria-label` replaces the trigger name. | critical | Explicit content + `aria-describedby`. | implementation |
| Generated pseudo-content cannot carry Tooltip semantics. | high | Real content node with role and id. | implementation |
| Hover content is not independently hoverable or Escape-dismissible. | high | Shared root hover path and target dismissal state. | implementation |
| Long text is `nowrap` and collision-unaware. | medium | Wrap locally; document target collision service. | implementation/target |
| Placement/delay/provider API lacks an accepted product decision. | non-blocking | Keep v1 top/default and target-owned. | owner/architecture later |

## Evidence And Validation

- Before reconstruction: six desktop files under
  `output/playwright/refinement-batch-14/before-reconstructed/`; the report
  preserves why no contemporaneous live capture exists.
- After: eight canonical Exhibit/Studio × four-viewport captures plus focus,
  hover, hover-transfer, Escape, 320px localized wrapping, dark, forced-colors,
  and reduced-motion evidence under `output/playwright/refinement-batch-14/after/`.
- Validation covers docs, contracts, Studio, structural/preview/parity/refinement
  audits, Web/Shopify/Webflow outputs, TypeScript, a temporary docs build,
  deterministic performance, and `git diff --check`.

## Risks And Open Questions

1. A global provider/delay/skip-delay policy would be a new target service and is
   intentionally not selected here.
2. Viewport collision and alternative placements are not guaranteed by neutral
   CSS; targets with portals should implement them.
3. The stored Studio reference does not provide a Tooltip-specific owner visual;
   exact offset/width aesthetics still require human visual review.

## Readiness Decision

Ready for explicit human review; remains `pilot`. Human visual approval,
production provider/collision behavior, and real target assistive-technology
testing remain outstanding.
