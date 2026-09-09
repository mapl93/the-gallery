# 0342. Size Chart And Back In Stock Values And Field Alignment

Status: Accepted

Date: 2026-09-09

## Decision

Size Chart exposes one notes paragraph gap factor, completing six profile values.
Its Modal, Data Table, Button and Segmented Control continue to own their APIs
under ADR 0242. No duplicate overlay width, table schema or conversion controls.

Back in Stock exposes nine source roles for section/form spacing, panel padding,
border width, minimum leading and status padding/accent width. Existing families,
weights, sizes, leading, surfaces and feedback colors remain aliases to system
roles. Effective body/heading leading is the larger of the existing line-height
role and its minimum; Studio labels distinguish both inputs. Section gap plus
additional form gap determines separation before the form.

The old wide-button offset estimated label height plus one quarter of the spacing
base, rather than consuming Input's actual label gap. Replace that estimate with
a shared CSS row for the real field/control and Button. Input keeps its complete
wrapper, label, field/control and message; row subgrid shares their actual heights
with the form without display:contents, duplicated labels or JS layout reads.
The 40rem container enhancement keeps DOM/tab order. The baseline stacks the
form when narrow or when row subgrid is unsupported. Input's own label/message
gap and label type remain the public values for its anatomy.

Remove Back in Stock's extra 520px Studio cap, which prevented its wide layout
from appearing even in a large preview. It now fills the existing product preview
container; its existing Studio workspace still bounds width. Reducing the public
padding factor to 0.5 makes the wide composition observable in that workspace.
Size Chart's shared fixture includes two notes paragraphs so its gap
control has an observable effect; fixture copy is not a component default.

Subgrid uses nested content in parent track sizing, per the
[CSS Grid Level 2 specification](https://www.w3.org/TR/css-grid-2/#subgrids).
This is implementation guidance, not a claim of testing every target browser.
No source modes or platform targets are added. Request states, provider truth,
consent and native validation remain unchanged. Both contracts stay pilot.

## Acceptance

Compare unchanged Size Chart and narrow notification defaults in both themes;
record wide notification alignment corrections separately. Verify custom gaps,
leading/borders/status values, one/multiline labels, supporting messages, RTL,
plain/icon fields and the stacked fallback. Check Studio/reset, authored unit
choice, modal keyboard lifecycle and notification preview states. Validate
source, contracts, Studio, docs, CLI and generated adapters.
