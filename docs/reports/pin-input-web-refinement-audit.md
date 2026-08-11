# Pin Input / OTP Web Refinement Audit

Component: `H7` / `pin-input`

Dossier: [Pin Input / OTP](../refinement/dossiers/pin-input.md)

Status: `ready-for-human-review`; contract remains `pilot`.

## Verdict

H7 now implements the owner-approved independent-cell architecture. The six
visible cells in the shared fixture are six real native inputs: each is directly
clickable, focusable, validatable, resettable and submitted. They share one
non-empty name and no hidden or mirrored full-code input exists.

The Web enhancer coordinates numeric typing, empty Backspace, logical LTR/RTL
arrows, paste/multi-character autofill distribution, filled state, completion
and reset across those same inputs. It never submits, verifies, requests,
redirects, starts a timer or announces completion. Exhibit and Studio render the
same canonical implementation and fixture; Studio controls only documented
semantic properties.

## Contract And Implementation Result

- Contract `0.4.0`: six anatomy parts, four validation variants, one public
  size, six states, seven behavior requirements, ten semantic properties and
  twenty-five public token references.
- Canonical dependency: Field Wrapper owns label, required marker, description
  and feedback; Pin Input owns segment grouping and character coordination.
- Public properties: `label`, `variant`, `name`, `required`, `disabled`,
  `readOnly`, `invalid`, `describedBy`, `description` and `feedback`.
- Values remain native/uncontrolled on static Web. Stateful targets may project
  one ordered controlled collection onto the same inputs.
- Numeric v1 preserves leading zeroes through text inputs. Length is derived
  from authored real segments, avoiding a public property/DOM mismatch.
- CSS covers hover, focus-visible, filled/complete, disabled, read-only,
  Error/Success/Warning, reduced motion, forced colors and named-container
  compression.

## Automated Validation

| Gate | Result |
| --- | --- |
| Contract validation | `183/183`, pass |
| Studio validation | `183` definitions / `902` semantic properties, pass |
| Docs and registry validation | `183/183`, pass; known external-asset warnings only |
| TypeScript | `tsc -p site/tsconfig.json --noEmit`, pass |
| Neutral Web adapter | `183` components / `19` CSS sources, pass |
| Shopify adapter | `183` components / `83` target-ready / `55` Liquid / `32/32` schema, pass with unrelated baseline maturity warnings |
| Component certification | `183/183` automated, zero structural gaps |
| Exhibit/Studio parity | `183/183` structurally shared, zero gaps |

## Interaction And Visual Evidence

Evidence directory:
`output/playwright/refinement-forms/pin-input-0222/`.

- Eight final paired screenshots cover Exhibit and Studio at mobile, tablet,
  desktop and XL.
- One additional mobile screenshot covers a long localized Spanish label and
  description with no page overflow.
- All six cells exposed localized positional names and the same
  `verificationCode` form name; hidden input count was zero.
- Direct third-cell focus succeeded; numeric input advanced to cell four;
  alphabetic input was removed.
- Pasting `123456` filled the six cells, set `data-complete=true`, and serialized
  as `['1','2','3','4','5','6']`; joining returned `123456`.
- Reset emptied every cell and restored `data-complete=false`.
- RTL ArrowLeft moved index 2 to 3 and ArrowRight moved index 3 to 2.
- At 280px, client and scroll widths both equalled 280px; cells compressed to
  44x52 with a 6px gap and wrapped to two rows.
- The final browser phase reported zero console errors and warnings.
- The single `gallery-refinement` browser and single managed port-4173 server
  were closed; `evidence:assert-clean` passed.

## Performance

Deterministic level-9 measurements after the implementation:

| Surface | Raw | Gzip | SHA-256 |
| --- | ---: | ---: | --- |
| H7 CSS slice | `3,927 B` | `974 B` | `eb57b520644b8d580082da44f88725e2f19f9d11926748307df969ea6b43b613` |
| Forms family | `80,660 B` | `9,799 B` | `0f277f23407d3be9d95c07ec0d482f87badd3cbe94f1f923c8df213e65028182` |
| Neutral Web components | `515,946 B` | `69,176 B` | `6ae8c7893137dd81101fb25902753079513d74358667272d96d21f277111a8bc` |
| Shared runtime | `56,311 B` | `11,099 B` | `2e2a5fe44c1fa0bc6e2f9ea72a7462fccf1590eebbd2b5d4c5ecafb05b426800` |

The permanent budget audit still reports six documented gaps and zero
undocumented gaps. Relevant current overages are Forms at `9,803 / 6,554 B`
and shared runtime at `11,097 / 8,192 B` under the audit's CLI-gzip method.
These are explicit program risks, not budget increases. H7 adds no asset,
network client, timer or per-instance observer.

## Cross-Target Boundary

Web is implemented through canonical CSS/runtime. Generated Web and Shopify
copies are source-identical after regeneration. Shopify remains planned until a
real target flow owns Liquid context, endpoint, localized messages and server
verification; copying CSS/runtime is not falsely labeled target-native OTP
support. React and future targets must keep the real segment inputs and ordered
collection ownership from ADR 0222.

## Remaining Human Gate

Human review is required for geometry, narrow wrapping, typography, filled and
validation borders, focus hierarchy and device-level SMS AutoFill. The
component was not promoted to `stable`.
