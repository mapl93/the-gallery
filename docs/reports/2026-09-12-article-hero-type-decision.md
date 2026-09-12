# Article Hero narrow-container typography decision

Date: 2026-09-12. Source head: `74681b5`.

Status: owner choice pending. This report and the local A/B comparison do not
change canonical typography, contracts, tokens, Studio or Shopify output.

## Observed behavior

Article Hero chooses typography from viewport Display roles even when its
parent is narrow. The existing 40rem container threshold switches layout and
padding, but not title metrics. A 300px root at an 1800px viewport retains
64/72px title metrics. Its 268px text column wraps “decisions” across lines.
The source avoids overflow with word-breaking; geometry passing is not proof
of a suitable reading hierarchy in this composition.

This is a more substantial visual/portability decision than Article Card's
optional 2px leading difference, which ADR 0373 preserved without blocking.
AGENTS.md reserves changes to owner-facing aesthetics/direction for owner
confirmation. The requested choice here is how Article Hero should behave in
narrow embeddings, not a new platform, viewport mode or performance ceiling.

## Measured alternatives

Same content, image, serif family stack and 700 weight; 1800px viewport:

| Option | Root width | Title width | Font / leading | Title height |
| --- | --- | --- | --- | --- |
| A: compact H2 metrics | 300px | 268px | 38 / 46px | 184px |
| B: current Display | 300px | 268px | 64 / 72px | 504px |

A uses existing H2 size/leading below the current 40rem layout threshold;
Display remains at wider component widths. At 852px root, both probes use
64/72px with identical 360px title height in the split text track. B preserves
today's deliberate oversized title at every component width. Neither option
changes the heading element/rank, family, weight, tracking or target content.
Both can remain editable through public token roles.

Recommendation: A for narrower embeddings. This is a design recommendation,
not a claimed WCAG failure or a technical requirement. No canonical change to
these metrics is made before the owner selects the behavior.

## Evidence and acceptance

Ignored `output/playwright/article-hero-type/` contains installed CLI provenance
copied from the current consumer, exact fixture, browser-only CSS, result JSON,
runner logs and `options.png`; screenshot inspected. Four option/width samples.
One browser/tab/server, cleanup/resource gate/process scan clean, owned public
fixture removed. No uploads, production calls or source-generator changes.

After selection: map the chosen compact/wide metric roles into contract/Studio
and shared Exhibit without adding a source mode. Check full/split/text variants,
with and without media, narrow and wide containers at multiple viewport sizes,
inheritance/customization/reset, and no unintended family/weight change.
Continue Article Body and remaining editorial coverage after this checkpoint.
