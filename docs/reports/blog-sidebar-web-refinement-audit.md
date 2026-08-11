# Blog Sidebar Web Refinement Audit

Date: 2026-08-11

Batch: 156

Component: L8 `blog-sidebar`

Status: human-review-ready; owner decision 51 implemented; alias migration,
target placement, visual review and explicit stability approval remain pending

## Outcome

Blog Sidebar is now one passive, fail-closed, named complementary container for
target-authored semantic sections. Neutral Web renders a native `aside` only
when both its localized label and section composition are non-empty. Recent,
category, archive, and topic destinations use native lists and canonical Link;
the invalid Tag-on-anchor composition is removed. Exhibit and Studio use one
shared renderer and fixture, CSS is intrinsic/logical, neutral runtime remains
zero, and four-viewpoint plus special-mode evidence passes.

Owner decision 51 now fixes the public Blog Sidebar name, canonical Topic-list
selectors, initial Recent Articles + Topics profile, target-owned
order/limits/headings and separate Search/Newsletter compositions. The contract
remains `pilot`; migration-alias removal, real page placement/editor exposure,
final visuals and explicit human review remain required before `stable`.

## Certification Summary

| Area | Result | Evidence |
| --- | --- | --- |
| Anatomy and composition | pass | Required named `aside`; two direct headed semantic sections in the fixture; native destination and topic lists; canonical Link dependency. |
| States and modes | pass for neutral scope | Passive default; canonical Link hover/focus; local topic hover; light/dark, forced colors and reduced motion verified. No root controlled/uncontrolled state applies. |
| Tokens and CSS | pass | Fifteen direct public token references, no invented token layer, logical dimensions/borders, intrinsic wrapping, private micro-geometry only. |
| Accessibility | pass | Named complementary landmark, native headings/lists/anchors, seven 44 px keyboard targets, visible 2 px focus, AA contrast, zero live regions. |
| Content resilience | pass | Missing label/sections, ordinary content, localized RTL, long/unbroken 200 px, effective 200% text and user text spacing verified. |
| Runtime/performance | pass for L8/Blog | Zero neutral runtime; L8 remains 25 B below its observation ceiling and Blog remains 381 B below its fixed ceiling. Existing global Web CSS/runtime gaps remain documented program debt. |
| Exhibit/Studio parity | pass | Exact normalized DOM hash `584f0721` and computed-style hash `58e4591a` at the same 620 px container. |
| Targets | Web and Shopify implemented | Web/Webflow/Shopify CSS validates; Shopify snippet maps explicit Blog Articles and Topics with host-owned headings/order/limits and no Search/Newsletter shortcut. |
| Human review | ready, pending | Public identity and module boundary are accepted. Alias removal, real target placement/editor exposure and final visual judgment remain pending. |

## Anatomy, API, And Behavior

The `0.3.0` contract exposes only two stable neutral semantic decisions:

| Property | Type | Requirement | Behavior |
| --- | --- | --- | --- |
| `label` | string | required | Blank trimmed value omits the complete root. |
| `sections` | slot | required | Empty semantic composition omits the complete root. Each module retains its own contract. |

The root owns no width, sticky mode, collapse, responsive visibility, search,
selection, loading, disabled, error, or controlled/uncontrolled value. The
section slot owns contextual heading elements/ranks and may compose canonical
modules. A search module retains search landmark, Form, field, Input, Button,
query/result/focus/announcement behavior. A removable filter module may compose
Tag. L8 does not turn either into root API.

Fixture anatomy was verified as:

- native `ASIDE`, useful `aria-label`, no explicit role or tabindex;
- two direct `SECTION` children with visible `H2` headings in this page context;
- two native `UL` lists and seven `LI` entries;
- seven native anchors with `href`, `dir="auto"`, `.link.link--subtle`, and the
  appropriate L8 presentation class;
- zero `.tag`, `.tag__label`, or `.tag__remove` instances;
- zero forms/controls, interactive root roles, internal live regions, or hidden
  root behavior.

The fixture's heading rank, strings, destinations and module count are evidence
content, not public defaults.

## Semantics, Interaction, And Accessibility

- Blank label produced zero `.blog-sidebar` roots. Studio disables the required
  sections control; the harness temporarily removed that test-only disabled
  flag, supplied the absent slot value, and the shared renderer again produced
  zero roots.
- Keyboard traversal reached all seven anchors in DOM order. Every target was
  44 px high and had a visible solid 2 px canonical focus outline.
- A cloned native fixture anchor without Studio interception navigated to
  `#recent-slower-tools`, proving native hash behavior and no L8 runtime need.
- Resting/hover contrast ratios were: light list `7.81`/`17.93`, light topic
  `7.17`/`16.89`, dark list `12.09`/`17.18`, and dark topic `10.21`/`7.00`.
  Every normal-text state exceeds WCAG AA.
- Reduced motion removed all descendant Link transitions; L8 has no animation.
  Forced colors retained a visible 2 px focus outline and system colors.
- Mobile, Tablet, Desktop and XL produced zero root, part, or document overflow
  in both Exhibit and Studio. Localized Arabic/RTL plus unbroken content at a
  forced 200 px container, effective 200% root type, and user text spacing also
  produced zero overflow.
- Browser evidence reported zero console warnings/errors and zero page errors.

## CSS And Token Audit

L8 directly consumes:

- color: `--color-border-subtle`, `--color-surface-secondary`,
  `--color-surface-statement`, `--color-text-primary`;
- typography: `--font-family-heading`, `--tg-font-weight-semibold`,
  `--typo-body-size`, `--typo-body-line-height`, `--typo-body-sm-size`,
  `--typo-body-sm-line-height`;
- spacing: `--space-layout-element-gap`, `--space-layout-touch-target`,
  `--tg-space-stack-sm`, `--tg-space-stack-xs`;
- radius: `--radius-full`.

Canonical Link owns its own text, accent, focus, transition, easing, reduced-
motion, forced-color, and wrapping tokens. L8 no longer duplicates them. The
remaining `0.05em` title tracking and `4px 10px` topic-link inset are private
composition details, not public API. Physical min/max dimensions, duplicate
focus rules, duplicate Link color/motion, fractional body sizing, empty rules,
and Tag markup were removed. Legacy `.tag-cloud` names remain a documented
compatibility hook for a native topic-destination list.

## Cross-Target Translation

- Neutral Web: implemented through target-agnostic contract, canonical Blog CSS,
  native HTML and zero component runtime.
- Shopify: source-identical CSS plus `snippets/blog-sidebar.liquid` implement
  the accepted Recent Articles + Topics profile from one explicit Blog source.
  The host supplies the accessible label, contextual heading element, localized
  headings, module order and bounded limits; it may exclude the current
  article. Search and Newsletter stay separate compositions. First real
  template placement, editor exposure and current-route policy remain
  target-owned.
- React/Angular: thin renderers should map `label` plus semantic child sections
  without owning provider queries or inventing per-module props.
- Figma: a component may represent stacked section anatomy and Link states, but
  registered nodes are generic evidence and no L8-specific design is approved.
- SwiftUI/Compose/future targets: use a complementary/group container only when
  truthful in target semantics, preserve headed grouped destinations, and keep
  search/filter modules independently composed.

No platform dependency was introduced into the neutral base.

## Automated And Browser Verification

Passing gates:

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run build:components`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify` (known repository maturity warnings only)
- `npm run audit:previews:static`
- `npm run audit:exhibit-studio`
- `npm run audit:refinement`
- TypeScript `--noEmit`
- production Vite build to
  `/private/tmp/the-gallery-site-batch-156-final`
- `npm run evidence:cleanup`
- `npm run evidence:assert-clean`

The production build did not write `site/dist`. Webflow and Shopify Blog CSS
copies exactly match canonical source SHA-256
`b4af7671421f7077eb21a2876a951e0c7f2d0bf52ff414bac26f1057c47bc01b`.

Evidence is retained under
`output/playwright/refinement-batch-156/`: eight paired natural viewport
captures, six special/state captures, the executable probe, hashes and
`results.json`. One pre-existing responsive server, one explicit headless
Chromium session `gallery-refinement`, and one tab were used. The final gate
confirms the managed server stopped, the session closed and the user-owned
server preserved.

## Performance

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| L8 CSS slice | `1,995 B` raw / `669 B` gzip | `1,908 B` raw / `644 B` gzip | `669 B` observation ceiling | pass; `-87 B` raw / `-25 B` gzip |
| Blog CSS | `32,233 B` raw / `5,496 B` gzip | `28,804 B` raw / `5,148 B` audited gzip | `5,529 B` | pass; `381 B` headroom |
| Neutral Web component CSS | current program snapshot | `534,910 B` raw / `71,944 B` audited gzip | `65,536 B` | documented global gap `6,408 B`; not owned by L8 |
| Shared neutral runtime | current program snapshot | `117,741 B` raw / `22,807 B` audited gzip | `8,192 B` | documented global gap `14,615 B`; L8 adds zero runtime |
| L8 listeners/observers/timers/requests/assets | `0` | `0` | zero-runtime boundary | pass |

Final SHA-256 values:

- L8 slice: `51c99e6f8f14833ac406da4ab73abeea12a59b4f9a8dd9541f06e6b2172f962c`
- Blog CSS: `d4fcfd437644d0a0b770feabd440751d6a4771fa720611046d1e37f36a11522d`
- Neutral Web component CSS: `a4a353c4b47373fb2e4ffc0d53645fb9cc255265818f9f013fcc5c4056570a5d`
- shared runtime: `0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`

## Risks And Open Questions

1. Remove `.tag-cloud*` after copied consumers migrate and before the public v1
   contract freezes.
2. Select the first real Web/Shopify placement, contextual heading rank,
   localized records, current-route policy and editor exposure.
3. Approve sidebar width/placement, mobile order, title case/tracking,
   separators, topic treatment and final light/dark/forced-color visuals.
4. Supply L8-specific design evidence or approve the repository render as the
   current visual source.
5. Complete explicit human stability review; automated evidence does not
   promote the `pilot` contract.

L8 is prepared for human review, not for automatic stability promotion.
