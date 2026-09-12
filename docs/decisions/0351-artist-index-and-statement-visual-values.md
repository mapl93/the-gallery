# 0351. Artist Index And Statement Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Twenty-four scoped source roles complete 39 Artist Index and 36 Artist Statement
public values under ADR 0293. This extends the visual candidates in ADRs
0128/0131 without inventing artist data, filtering, activation or signature proof.

Artist Index exposes all three result counts (1/2/3 initially), introduction
measure (60ch), header rhythm, inset cap and the existing optional filter-hook
gap, padding, border and focus. The 27rem/44rem content-box queries select a
private active count for one Grid formula. Positive integer counts have a lower
bound of one and no invented neutral maximum. Introduction weight explicitly
uses the existing body-default semantic role. Its registry inventory is
reconciled with the contract using the existing transition category.

The Artist Index Studio fixture still omits filters; its optional slot displays
the existing explanatory placeholder, not a synthetic filter lifecycle. Filter
token controls describe existing public CSS hooks and require a target-owned
composition to become visible. The MDX Artist Card example now composes
`card card--flat` like the shared renderer. A consumer choosing Artist Card
installs it explicitly; Index retains no mandatory record-component dependency.

Artist Statement exposes narrative measure, portrait ratio/stacked cap, wide
portrait share, signature image cap, editorial tracking, inset cap, quotation
rule/inset, paragraph rhythm and sticky offset. Rem/ch/em values preserve
their local font relationships. The quote border remains the maximum of a pixel
minimum and relative rem thickness (2px/0.125rem initially), with both roles
named explicitly. Quote/signature weight uses the existing regular role.

Wide portrait share starts at one third of the width remaining after the
section gap; narrative receives the remainder. The container split threshold,
media-presence modifier, sticky mode and source order remain unchanged. The
Studio-only 24px/16px section padding override is removed so the same canonical
tokens drive the consumer and Customize. Exhibition Page's separate rule is
preserved. The transparent Statement MDX placeholder receives empty alt.

Both components remain pilot. There are no new semantic properties, source
modes, target data schemas, dependencies or runtime code. Copied consumers
explicitly adopt CSS/tokens and registry/contract/Studio metadata as applicable.

## Acceptance

Compare full/plain compositions at four widths in both themes, allowing at
most 0.02 CSS px for fractional-track rounding. Exercise count bands, ch
measure, optional filter CSS hooks, native focus/disabled state, RTL, relative
border floor, actual sticky scroll, image cap, split ratio and missing portrait.
Verify Studio editing/reset, canonical section padding and Exhibit. Validate
source/catalogue, contracts, registry, docs, CLI and adapters. Every evidence
phase closes its browser/server and verifies zero test processes.
