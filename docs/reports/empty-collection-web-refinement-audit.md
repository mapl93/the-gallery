# Empty Collection Web Refinement Audit

Date: 2026-07-20

Component: `E7` / `empty-collection`

Contract: `components/contracts/empty-collection.contract.json` `0.4.0`

ADRs: [0219 Empty Collection As Canonical Empty State Profile](../decisions/0219-empty-collection-as-canonical-empty-state-profile.md),
[0236 Contextual Empty State Heading Ownership](../decisions/0236-contextual-empty-state-heading-ownership.md)
and [0249 Empty Collection Target-Owned Lifecycle Profile](../decisions/0249-empty-collection-target-owned-lifecycle-profile.md)

Dossier: [Empty Collection State](../refinement/dossiers/empty-collection.md)

Status: `human-review-ready`; contract remains `pilot`; no stability
promotion was made.

## Verdict

E7 is technically reconciled for Neutral Web as a zero-visual-delta Collection
profile over canonical Empty State, Button and Link. Owner-selected E7-A keeps
cause outside the public API and assigns truthful content, result replacement,
recovery, status and focus to the owning target; ADR 0236 assigns heading rank to
the host. The implementation is ready for human review while real-target data
distinction, Shopify integration and final visual/Figma approval remain evidence
gates.

| Certification area | Result | Evidence |
| --- | --- | --- |
| Anatomy and optional parts | pass | Canonical root/title plus independently optional message, decorative icon and one Button-or-Link action; blank title omits the complete profile. |
| Public API | pass | Required `title`; optional `message`, `icon`, `action`; no cause, action sub-API, heading, visual or lifecycle leakage. |
| Canonical composition | pass | Direct `empty-state`, `button`, `link` dependencies; no duplicated title/message/action markup system. |
| Semantics and accessibility | pass | Ordinary content root, contextual H2 in docs, hidden decorative icon, no false role/live/focus, one truthful native action. |
| Interaction | pass | Button pointer, Space and Enter produce native clicks; Link probe preserves native Enter navigation semantics. |
| Responsive/content resilience | pass | Four paired viewports, direct 200/320/520/720px hosts, unbroken/localized copy, RTL, text spacing and effective 200% zoom. |
| Themes and special modes | pass technically | Strong light/dark contrast, visible 2px forced-color focus and zero reduced-motion animation. |
| Exhibit/Studio parity | pass | Identical normalized DOM and non-geometric style hashes from one renderer and fixture. |
| Tokens/runtime/assets | pass | Zero E7 public visual tokens, one private-free containment rule, zero runtime and zero component-owned assets. |
| Web/Webflow | pass | Generated Web adapter validates; copied Collection CSS is source-identical. |
| Shopify | planned honestly | E7-A fixes the ownership boundary, but source-inventory versus filtered/search zero, truthful recovery and the complete section lifecycle still need target evidence. |
| Performance | pass | Current Collection family is `2,366 B gzip / 2,560 B`, leaving `194 B`; E7 itself remains `101 B gzip` and adds zero runtime. |
| Human review | ready | Canonical Empty State artwork in collection context, real target integration, Figma evidence and explicit stability approval remain human gates. |

## Baseline Findings

The baseline was visually recognizable but implemented a second Empty State:

- a local `section`, hardcoded H2, title/message/icon classes and CTA system
  duplicated canonical Empty State and Button;
- blank title still produced an empty shell and heading;
- independent `ctaLabel` and `href` values admitted incomplete combinations and
  silently invented `#all-works`;
- fixture copy said “Clear filters” while the element navigated as a link;
- local viewport sizing, physical dimensions, raw literals, focus and motion
  bypassed canonical dependencies;
- a docs H2 divider leaked into the candidate because E7 typography was
  incomplete; and
- Shopify rendered only an empty product list, with no accepted cause or
  recovery lifecycle.

Preserved before evidence lives at:

- `output/playwright/parity/collection/empty-collection-exhibit-mobile.png`;
- `output/playwright/parity/collection/empty-collection-exhibit-desktop.png`;
- `output/playwright/parity/collection/empty-collection-studio-mobile.png`; and
- `output/playwright/parity/collection/empty-collection-studio-desktop.png`.

Baseline deterministic level-9 performance was:

| Artifact | Raw | Gzip | SHA-256 |
| --- | ---: | ---: | --- |
| E7 slice | `1,541 B` | `509 B` | `6f0528c873759728694f66d5a62b383adeec6c0c991be2f4e3031c089eb62534` |
| Collection family | `10,927 B` | `2,509 B` | `e3fd510d96748fb4570c434585ca7bb4b7eb43ce77b19bc1aa76c8bf55ac4d8b` |
| Neutral Web components | `516,207 B` | `69,155 B` | `16d104aa4360f854e213eec3a043df12f003fdb9fbd44c6e88e3c7d18619b63b` |
| Shared runtime | `53,811 B` | `10,501 B` | `1e682941301520ac5a172a0b9724dc3c9f0a0bca11f042b713fec2b60375e24a` |

## Research And Direction

The dossier compares WCAG status-message and WAI heading guidance, Open UI,
Radix, Shopify POS EmptyState and collection/filter facts, Atlassian and Carbon.
Sources converge on concise title, optional guidance, truthful Button-versus-Link
recovery, replacement of stale results and target-owned dynamic announcements.
They do not establish a universal cause model, filter-retention policy, focus
destination, heading rank, Shopify section lifecycle or Gallery visual treatment.

ADR 0219 therefore keeps E7 as a named Collection lifecycle profile rather than
a new widget or visual component. ADR 0249 makes that direction final for
neutral v1: no cause enum, zero visual divergence, and target-owned replacement,
action, URL/history, status, focus and data truth.

## Shared Renderer And API

`EmptyCollectionArtwork` delegates to `EmptyStateArtwork` and only adds the
`.empty-collection` context hook. `CollectionStudio` supplies one shared fixture
to Exhibit and Studio: site-only PackageSearch artwork, truthful text and a
native canonical Button command. The MDX fallback matches the same canonical
class composition and separately documents a real Link navigation candidate.

The target-agnostic API is deliberately narrow:

| Property | Type | Requirement | Ownership |
| --- | --- | --- | --- |
| `title` | string | required non-empty | truthful visible absence; target selects contextual heading |
| `message` | string | optional | concise explanation or next step |
| `icon` | slot | optional | decorative/text-redundant canonical Empty State visual |
| `action` | slot | optional | one canonical Button command or Link navigation |

Cause/reason, result count, loading/error, heading rank, action kind/label/href/
callback, status, focus, analytics, icon name, size and visual tokens remain
outside E7. E7 has no controlled/uncontrolled state.

## Semantics, Interaction And Composition Evidence

The final DOM is ordinary `.empty-state.empty-collection` content with one
contextual `h2`, optional paragraph, hidden decorative icon and one native
`button type="button"`. The root has no role, `tabindex`, `aria-live`,
`aria-atomic` or `aria-busy`, and no old `.empty-collection__*` anatomy remains.

Pointer, Space and Enter produce three native Button clicks while focus remains
on the Button. A separate canonical Link composition has one real `href`, one
focus stop and one Enter activation. Title-only collapses to one heading; the
full fixture contains exactly one of each optional part; a blank title produces
zero E7 roots.

Dynamic no-results announcements are intentionally not proven by a local live
region: the accepted contract requires a pre-existing target Status owner only
when an in-place change qualifies. Target tests must prove atomic stale-result
replacement, filter retention/removal and deliberate post-action focus once the
product architecture is accepted.

## Responsive, Accessibility And Visual Evidence

Paired component and viewport screenshots cover Mobile `390x844`, Tablet
`768x1024`, Desktop `1440x1000` and XL `1920x1080` in Exhibit and Studio. Direct
hosts at 200, 320, 520 and 720px report zero horizontal overflow or escaped
descendants. An indivisible 65-character title wraps at 200px. Arabic RTL with
enhanced text spacing remains contained, and effective 200% zoom produces a
640px visual box from a 320px host without internal overflow.

Measured contrast is:

| Mode | Title | Message | Button text |
| --- | ---: | ---: | ---: |
| Light | `17.93:1` | `7.81:1` | `10.37:1` |
| Dark | `17.18:1` | `12.09:1` | `15.21:1` |

Forced colors preserves a distinct `2px` focus outline on the canonical Button.
Reduced motion reports zero animated descendants. Visual inspection confirms the
heading divider leak is gone and the sparse centered candidate remains coherent
at mobile, desktop, dark, forced-color, RTL/text-spacing and 200% zoom states.
Center alignment, icon treatment, hierarchy, rhythm, measure and action prominence
remain owner-facing aesthetic decisions.

Normalized Exhibit and Studio hashes match exactly:

- DOM: `b5ec43fc33c94112d4989b36a3cfdcc5b26d726396abf8c3ff398e89b2b0f1fc`;
- non-geometric styles:
  `a3cdc98943ac096be4091ca88214211669cf1da26eeced047a7e0f9ae72acbb0`.

Final evidence and structured assertions live in
`output/playwright/refinement-batch-128/` with `failures: []`. The phase used one
managed server, one named headless Chromium session and one tab, then passed
`evidence:assert-clean` with no owned resource left running.

## Performance And Target Translation

Final deterministic level-9 gzip is:

| Artifact | Raw | Gzip | Delta gzip | SHA-256 |
| --- | ---: | ---: | ---: | --- |
| E7 slice | `168 B` | `101 B` | `-408 B` | `790a42783d78c6610dd73628b947820f6a911217dab64f73c4be54d4333213da` |
| Collection family | `9,554 B` | `2,302 B` | `-207 B` | `e3b659dccc6bbf82a6ef2b02217392cb4ff8847407bb8ff42c9609e40391e94f` |
| Neutral Web components | `514,834 B` | `69,013 B` | `-142 B` | `75fe522160071bbe0b166641f36fa6975415883b1b94baf246fde511bb2065b8` |
| Shared runtime | `53,811 B` | `10,501 B` | `0 B` | `1e682941301520ac5a172a0b9724dc3c9f0a0bca11f042b713fec2b60375e24a` |

At batch 128, Collection had `258 B` headroom below its unchanged `2,560 B`
family ceiling. After the later E5/E6 reconciliations in the same source family,
the current deterministic family measurement is `2,366 B` with `194 B` headroom
and SHA-256
`c620bbba92b0c3db86ccb3944b6ed1824edb5d3e8203ead95266ece032b947e0`.
Existing cumulative Web CSS/runtime exceptions remain program-level gaps; E7
still adds no runtime.

`components/css/collection.css`, Shopify's copied asset and Webflow's copied
asset are byte-identical at the final Collection hash. Neutral Web is
implemented. Shopify remains planned under E7-A until its owning section proves
source-inventory versus filtered/search truth, localized copy,
filter/Grid/Pagination replacement, Button-versus-Link recovery, URL/history,
status/focus and section-refresh behavior. Framework, native and Figma mappings
remain documented planned translations.

## Owner Decision Reconciliation And Verdict

E7-A resolves the neutral component decisions:

- E7 remains a named zero-visual-delta canonical Empty State profile;
- source inventory empty, filtered/search zero and merchandising exclusion stay
  target lifecycle facts rather than component variants;
- the target owns truthful copy, atomic result/control replacement, recovery,
  URL/history, status and focus;
- the root creates no automatic live region; and
- the host owns contextual heading rank.

Human review still covers real Web/Shopify data distinction and integration,
canonical visual treatment in collection context, E7-specific Figma evidence
and explicit stability approval.

Verdict: safe Neutral Web implementation, canonical composition, evidence,
performance and target boundaries are complete. E7 is `human-review-ready`,
remains `pilot`, is not `stable`, and no stability promotion is claimed.
