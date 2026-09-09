# 0329. Toast And Tooltip Public Geometry And Centering

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with eight Toast and six Tooltip geometry tokens. Preserve the
accepted item/provider and description/trigger boundaries in ADRs 0098/0099.
Existing source values are defaults, not a new visual approval or arbitrary
cross-target limit. Both components remain pilot.

Toast exposes maximum width (380px), gap/padding factors (0.5/0.75), border width
(1px), entrance offset (16px), icon size/top offset (20px/2px), and title/message
gap (4px). Semibold is reused; family remains inherited. Studio exposes existing
motion roles, identifies the inactive unvarianted-border fallback, and shows icon
geometry with the optional icon. Its extra fixed width/minimum rules are removed;
Exhibit also uses the width token while keeping fixture-owned viewport placement.
The existing action-row container query consumes the same gap values.

Tooltip exposes maximum width (18rem), arrow depth (5px), trigger-gap factor (0.5),
block/inline padding factors (0.25/0.625), and total viewport-gutter factor (2).
Factors multiply the existing responsive spacing base. The CSS triangle has base
twice its depth; that geometry and its inherited surface color remain mechanical.
The invisible hover bridge follows the same gap rather than a second value.

The former Tooltip inset-inline-start:50% paired a logical origin with a physical
translateX(-50%). In RTL that moved the content/arrow away from the trigger's
center. Both now use left:50% with the same physical translation; centering is
symmetric and works for inherited or nested direction without extra style tokens.
This corrects RTL geometry while preserving LTR defaults.

Studio reserves the measured Tooltip content height plus its token-driven gap
above the trigger, so the floating content begins at the Customize top edge per
ADR 0283 instead of overlapping the page toolbar. A local ResizeObserver tracks
text/type/width changes and disconnects on unmount. The measured height is private
fixture data, not a token, extra mode or target placement service.

Full-page placement, collision avoidance, portals, Tooltip delay, Toast duration,
queue, rate, pause/resume, live-region lifecycle and data remain target services.
No duration token is mislabeled as display lifetime. Tooltip content remains
non-interactive and uses aria-describedby; its trigger keeps its own name. Social
Proof remains the passive verified-data profile and is omitted by Shopify v1 per
ADR 0253 until its provider/policy requirements are satisfied.

## Acceptance

Compare all four Toast variants and Tooltip LTR defaults across eight matrices.
Verify geometry/motion customizations, narrow action row, Tooltip pointer bridge,
RTL/nested-LTR centering, focus/Escape, forced colors and reduced motion. Verify
Studio/reset, Exhibit, Social Proof composition, and source/adapters/CLI metadata.
Local behavior evidence does not certify global services or remote target readiness.
