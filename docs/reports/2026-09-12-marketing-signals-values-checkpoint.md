# Marketing signals visual values checkpoint

Date: 2026-09-12. Baseline: `ddbce99`. ADR 0385.

| Component | New source roles | Public values |
| --- | ---: | ---: |
| Trust Badges | 9 | 19 |
| Payment Icons | 3 | 4 |
| Countdown | 9 | 23 |
| Urgency | 4 | 13 |

Evidence in `output/playwright/marketing-signals-values/`: fresh CLI slice and
install record, previous CSS, fixtures/harness/result.json and inspected images.

- 110 cases / 1380 element comparisons preserve geometry, type, colors, spacing,
  radii, filter and opacity across five widths, two themes, two Trust densities,
  two Payment sizes, three Countdown presentations and four Urgency types.
- Trust icon 30px, item gap 8px and row gap 64px apply independently. Payment mark
  height 40px preserves its 48:28 artwork ratio, informative name, full opacity
  and no filter. These are named example marks, not production brand assets.
- Countdown card padding 32/16px and label gap 16px apply. A real scheduled
  running-to-expired transition leaves all selected values zero and emits one
  expiration event. No commercial reaction is installed.
- Urgency cue/dot measure 24/10px; warning share zero resolves to the normal text
  role. No claim computation or service is introduced.
- All samples fit a 240px RTL parent. Studio edits/reset and Exhibit exposure of
  the new controls pass for all four components; screenshots inspected.

The fixture was corrected to test distinct Default and Compact Trust Badges
instead of copying the MDX Compact modifier into both samples. Canonical source
needed no corresponding correction. Every evidence attempt closed resources;
final resource/process gates are clean and the temporary public fixture is gone.

Source/target builds, catalogue, validate:docs and component/refinement/performance
checks pass. Existing Shopify asset advisories remain. No hosted upload, real
subscription/purchase action, site/dist or stable promotion. Target claim truth,
official payment artwork/data and hosted behavior remain separate verification.

Follow-up discovered during inspection: some older Marketing Studio color groups
list multiple roles but its static active-token mapping chooses only the first.
The new controls above each name one role. A separate checkpoint will reconcile
those existing groups without changing token values or component styles.
