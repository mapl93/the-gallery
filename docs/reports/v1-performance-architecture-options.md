# v1 Performance Architecture Options

Status: `accepted-option-3-and-implemented`

Date: 2026-08-11

This report preserves the evidence and alternatives presented before the owner
decision. The component candidates were already 183/183 human-review-ready;
the decision outcome and implementation are recorded below and in ADR 0273.

## Facts At Decision Time

The fixed audit measures the complete neutral adapter and broad canonical CSS
family files:

| Surface | Current gzip | v1 ceiling | Overage |
| --- | ---: | ---: | ---: |
| Complete neutral component CSS | 72,723 B | 65,536 B | 7,187 B |
| Shared progressive-enhancement runtime | 22,807 B | 8,192 B | 14,615 B |
| Forms family | 9,803 B | 6,554 B | 3,249 B |
| Layout / overlays family | 7,174 B | 4,915 B | 2,259 B |
| Global family | 4,856 B | 3,789 B | 1,067 B |
| Storytelling family | 4,777 B | 4,301 B | 476 B |
| Marketing family | 4,782 B | 4,198 B | 584 B |

All seven overages are documented and zero are unexplained, but
`npm run audit:refinement:performance` correctly exits with status 1 because a
documented overage is not a passing ceiling.

## Why Simple Cleanup Is Insufficient

`components/js/theme.js` is one 117,741-byte source with 3,053 lines and about
22.8 KB gzip. It currently combines all progressive-enhancement behavior and
boots all enhancers from one file. Approximate standalone gzip measurements of
the principal logical blocks are:

| Logical block | Approximate standalone gzip |
| --- | ---: |
| Countdown and scheduler | 4,227 B |
| Carousel rotation, Hero and Announcement | 3,120 B |
| Date Picker | 3,097 B |
| Select | 3,029 B |
| Product Gallery | 2,991 B |
| Combobox | 2,089 B |
| Reading Progress | 1,842 B |
| Filter Panel | 1,524 B |
| Bootstrap / mutation observation | 1,362 B |
| Marquee | 1,338 B |
| Slider / Range | 1,252 B |
| Pin Input | 1,178 B |
| Quantity / Number Input | 1,097 B |
| Remaining smaller blocks combined | about 2,602 B |

Standalone values do not add directly to the whole-file gzip result because
compression dictionaries are shared. They do show that no individual enhancer
needs the current 22.8 KB payload and that reaching 8 KB without removing
behavior would require structural delivery changes rather than whitespace or
comment removal.

CSS has the same distribution tension. Registry entries point to broad family
files, and the current CLI copies each unique family file required by the chosen
components. Installing one Forms component can therefore copy the complete
9.8 KB gzip Forms file; installing one Layout component can copy the complete
7.2 KB Layout file. The copy-and-own product vision is component-oriented, but
the current delivery unit is often family-oriented.

## Option 1 — Preserve Every Existing Ceiling

Reduce or restructure source until all seven current ceilings pass.

Likely work:

- split shared runtime into independently installable enhancer modules and load
  only modules needed by the installed component graph;
- split or deterministically extract component CSS while retaining shared
  canonical foundations and dependency order;
- remove verified duplicate rules/helpers after source-identity and browser
  regression evidence;
- keep the complete adapter aggregate under 64 KB and any full-runtime entry
  under 8 KB, even though most consumers do not install all 183 components.

Advantages:

- preserves the meaning of every accepted v1 ceiling;
- creates the strongest aggregate regression guard;
- does not authorize a larger default payload.

Costs and risks:

- this is a substantial distribution refactor, not a small optimization pass;
- the 8 KB full-runtime limit may force removal or target relocation of accepted
  neutral behaviors even after modularization;
- CSS extraction can duplicate shared rules or make copy-and-own edits harder if
  the generated/source ownership boundary is not designed carefully;
- all adapters, CLI installation, docs loading and browser evidence must be
  recertified.

## Option 2 — Accept Current Aggregate Exceptions

Record one owner-approved ADR that accepts the seven current overages for v1,
either as exact exceptions or as revised ceilings with explicit headroom.

Advantages:

- fastest route to close the program;
- preserves current source and target behavior;
- avoids a late architectural refactor before human visual review.

Costs and risks:

- the neutral adapter and Shopify shared runtime continue shipping behavior for
  components a page may not use;
- raising ceilings to current values can normalize accumulated growth instead of
  solving distribution;
- the decision weakens the current performance rubric unless the exception is
  explicitly time-bounded and assigned follow-up work.

This option should not be implied by `gapEvidence`; it requires explicit owner
acceptance.

## Option 3 — Align Budgets With Copy-And-Own Distribution

Treat the installed dependency slice as the primary v1 performance unit:

- component or dependency-slice CSS;
- enhancer modules required by that component graph;
- shared foundations/tokens loaded once;
- target-specific runtime only where the target requires it.

Keep the full 183-component CSS and full runtime totals visible as aggregate
diagnostics, but do not use the docs/all-components bundle as the only consumer
release gate. Add explicit ceilings for common install profiles and for each
enhancer/module. The Web adapter, Shopify layout and CLI must then load/copy the
correct dependency-derived files.

Advantages:

- matches the owner-stated shadcn-style copy-and-own model;
- consumers pay primarily for components they install;
- each measured runtime block is already below the current 8 KB ceiling when
  considered independently;
- future targets can map the same dependency graph to native delivery units.

Costs and risks:

- requires an ADR defining canonical CSS/JS module ownership and shared-helper
  deduplication;
- requires implementation in registry metadata, Web/Shopify adapter generation,
  load order and CLI installation;
- needs new combination budgets so many individually small modules cannot create
  an unbounded page payload;
- the complete aggregate must remain reported to prevent modularization from
  hiding total maintenance cost.

## Recommendation

Select **Option 3**, then keep the existing aggregate measurements as visible
diagnostics during the migration. It best matches The Gallery's existing
copy-and-own product direction and explains why one component should not
necessarily carry every family rule and every enhancer.

The owner accepted Option 3. ADR 0273 records the resulting architecture, and
the Web/Shopify adapters, CLI, validators, and executable performance budget now
measure dependency-closed install slices while retaining the complete bundles as
diagnostics.

## Owner Decision

Option 3 was selected explicitly on 2026-08-11. It does not accept the aggregate
overages as invisible exceptions: they remain in the generated performance
report under diagnostic enforcement. Required v1 gates now cover the token
target, loader, core, each individual enhancer, and the worst real install slice
in every component family.
