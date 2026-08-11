# Component Refinement Batch 13

Status: Modal, Drawer, and Toast complete for human review

Date: 2026-07-13

Components: Modal, Drawer, Toast

## Outcome

All three components are prepared for explicit human stability review. Their
research dossiers, semantic contracts, canonical dependency composition,
responsive/special-media CSS, shared Exhibit/Studio renderer, target boundaries,
generated adapters, real before/after evidence, and browser behavior are
reconciled.

Modal and Drawer now share one modal-dialog obligation without introducing a
global overlay runtime. Toast is one passive flow-sized item without embedding a
provider, queue, timer, or viewport. No contract moved to `stable`; Button remains
the only historically approved component. `site/dist` was not rebuilt or
modified.

## Research And Decision

- HTML, WAI-ARIA/APG, Open UI, Radix, and Shopify evidence establishes required
  dialog naming/dismissal/focus obligations, side-sheet equivalence, passive
  Toast semantics, safe actions, and target-owned services.
- ADR 0098 refines ADR 0070's narrow property limits while preserving its target
  lifecycle boundary. It records required Modal/Drawer composition, canonical
  dependencies, Toast item ownership, live-content isolation, and performance.
- The open global overlay coordinator and Toast provider/queue policies remain
  unresolved rather than being inferred in the neutral runtime.

## Browser Evidence Summary

- Modal and Drawer demonstrate content-appropriate initial focus, forward and
  reverse Tab containment, Escape, backdrop request, reopen, and logical focus
  restoration in the bounded docs target.
- Long localized content keeps fixed header/footer regions and scrolls only the
  body. Drawer physical left/right, Modal optional description/actions, and
  required locked composition were probed directly.
- Toast never steals focus on appearance; actions are excluded from the live
  string; None/Polite/Assertive and Error/Polite independence are verified;
  optional-minimal, hidden, long, RTL, and narrow container states pass.
- All three have byte-identical Exhibit/Studio canonical inner markup and zero
  sampled stage/inner/root horizontal overflow. Twenty-four canonical captures
  cover 3 components × Exhibit/Studio × Mobile/Tablet/Desktop/XL. Sixteen
  supplemental after images cover dark, forced colors/reduced motion, physical
  placement, minimal options, localized long/scroll, 320px, and RTL. Six real
  desktop before images preserve the live pre-refinement baseline.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Layout CSS | `4,639 B` | `4.8 KiB` | pass (`276 B` headroom) |
| Shared neutral runtime | `10,335 B` | `8 KiB` | existing documented exception; unchanged |
| Batch 13 runtime delta | `0 B` | `0 B` passive/target-owned | pass |
| Neutral Web components CSS | `60,664 B` | `64 KiB` | pass (`4,872 B` headroom) |

Deterministic level-9 gzip measurement shows `249 B` Layout CSS and `208 B`
complete Web bundle growth from the Batch 13 start. No timer, queue, observer,
provider, global listener, portal, network request, asset, or value mirror is
added to neutral output.

## Validation

- Registry/docs, DTCG source, all 183 contracts, and all 183 Studio definitions.
- Neutral Web and Shopify adapter generation/validation.
- Structural certification, Exhibit/Studio parity, static preview and global
  refinement audits, temporary full docs build, TypeScript, syntax/diff checks,
  deterministic gzip, and explicit `site/dist` verification.
- Real-browser focus/keyboard/dismissal/restoration/placement/scroll/optional/
  live-region/container/RTL/contrast/forced-color/reduced-motion/overflow probes
  and four-viewport visual evidence.

## Remaining Human Risks And Open Input

1. Modal needs approval of backdrop, width, radius/shadow, chrome/body spacing,
   title scale, inherited 32px Close target, focus ring, and action hierarchy.
2. Drawer needs approval of physical placement, width/mobile edge, backdrop,
   section spacing, close target, and footer action treatment.
3. Toast needs approval of feedback accents, title/message hierarchy, action/
   dismiss layout, width/shadow/radius, close target, and eventual target edge.
4. No component-specific owner visual references are registered; accept the
   repository renders or provide replacement evidence.
5. Production native-dialog/custom focus behavior and dynamic queued Toast
   announcements still require target/device assistive-technology testing.
6. Global overlay mutual exclusion/scroll-lock/stacking and Toast provider queue/
   timing/pause/deduplication/swipe remain open target architecture.
7. Pin Input still requires the owner choice between one full-code native input
   with derived cells and the accepted multiple-input model.

## Program Progress

After applying the three readiness overrides, the regenerated matrix should show
183 components, 100 dependency edges, 40 dossiers, and 37 components ready for
human review. Only Button is human-approved. Work can continue around Pin Input
until a dependent component requires its unresolved value-owner architecture.
