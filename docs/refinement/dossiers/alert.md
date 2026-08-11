# Component Dossier: Alert / Banner

Status: `human-review-ready`

Target reviewed: Neutral Web and canonical Close Button composition

Contract: `components/contracts/alert.contract.json`

## Recommendation

Retain Alert as inline visible feedback with required message, optional title/icon/
Close Button, four semantic variants, and explicit `none | polite | assertive`
announcement timing. Keep static content unannounced; map dynamic polite to
`status` and urgent assertive to `alert`; never use ARIA `banner` for this visual
component. Add content resilience, replace the fractional message size with the
existing semantic body-small tokens, and stop masking an empty dismiss label.
Use a private theme-aware semantic accent derivation and present the resulting
visual formula for human approval rather than adding a public token.

## Purpose And Limits

- Communicates one concise informational, successful, warning, or error message
  without interrupting the current task.
- Visible text carries meaning; variant color and optional icon reinforce it.
- Optional dismissal composes the canonical Close Button; the consumer owns
  removal, persistence, animation, focus, and any follow-up announcement.
- It is not an Alert Dialog, toast queue, validation summary, global ARIA banner
  landmark, modal confirmation, or automatically expiring message.

## Current Gallery Baseline

- Registry identity: `A21`, primitive, dependency `close-button`.
- Contract: `0.3.0`, `pilot`; six anatomy parts, four variants, one size/state,
  four behaviors, seven properties, and 13 public tokens.
- Default Studio composition has decorative Check icon, optional title, required
  message, and canonical `.close-btn.alert__dismiss`.
- `announcement=none` emits no role/live attributes; Polite emits
  `role="status" aria-live="polite"`; Assertive emits
  `role="alert" aria-live="assertive"`.
- Studio renders an empty supplied dismiss label verbatim, exposing invalid
  conditional composition.
- At `390px`, unbroken title/message make a `326px` alert scroll to `397px` and
  expand the document to `430px`.
- Message type uses the existing semantic body-small size and line-height tokens.
- Light Info/Error accents exceed `3:1`; decorative Success (`2.35:1`) and
  Warning (`2.02:1`) icons against their tinted surfaces do not. Text contrast
  remains at least `7.04:1`; all dark accents exceed `5.84:1`.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Alert pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) | Alert is a brief important dynamically rendered message, does not move focus, should not disappear too quickly, and uses `role="alert"`. | Assertive is only for urgent dynamic messages; no keyboard pattern belongs to the root. |
| [WCAG 2.2 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages) | Dynamic outcomes/status can use `role="status"`; suggestions/errors may use alert/live regions; non-time-sensitive assertive use is discouraged. | Explicit `none/polite/assertive` timing is preferable to inferring urgency solely from color variant. |
| [APG Alert Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) | Alert Dialog interrupts workflow and manages focus like a modal dialog. | Interactive confirmations belong to Alert Dialog/Modal, not this primitive. |
| [Shopify Banner](https://shopify.dev/docs/api/app-home/web-components/feedback-and-status-indicators/banner) | Supports semantic tones, heading/body, dismiss event/controlled hidden state, actions, wrapping, and contextual placement. | Gallery's smaller title/message/icon/Close boundary aligns; actions, hidden lifecycle, queueing, and persistence remain consumer composition. |

Open UI does not currently define a standalone alert/banner anatomy that changes
the WAI-ARIA live-region boundary.

## Anatomy And Composition

| Part | Required | Semantic choice | Owner |
| --- | --- | --- | --- |
| Root | yes | neutral container, `status`, or `alert` | Alert timing property |
| Icon | no | decorative | Icon slot; Studio-only Lucide fixture |
| Content | yes | text wrapper | Alert |
| Title | no | consumer text, no fixed heading level | Consumer/target |
| Message | yes | visible explanatory text | Consumer |
| Dismiss | no | canonical Close Button | Close Button + consumer removal |

If dismissal is present, `dismissLabel` becomes conditionally required even
though the schema expresses both fields independently.

## Variant, State, And Mode Matrix

- Variants: Info, Success, Warning, Error.
- One visible state; dismissal/removal is consumer state, not an Alert class.
- Anatomy combinations: message only; title + message; icon + message; dismiss +
  message; all optional parts; each variant and announcement priority.
- Modes: light/dark, forced colors, reduced motion inherited from Close Button,
  short/long/empty/localized/unbroken text, LTR/RTL, narrow/wide container,
  static/dynamically inserted, dismissible/non-dismissible.

## Public API And Ownership

The accepted seven properties remain coherent. `announcement` is orthogonal to
visual variant because urgency depends on timing/context. `dismissAction` is an
optional Close Button slot and `dismissLabel` names it; do not replace them with
a generic boolean that hides canonical composition. The component has no internal
controlled/uncontrolled state; consumers decide whether/when to remove it.

## Token And Hardcoded Audit

- Public colors: neutral surfaces/text/border plus four semantic feedback families.
- Public radius and body typography; body-small size/line-height should replace
  the current fractional calculation and be added to the manifest/contract.
- `12px/16px` padding, `12px` gap, `20px` icon, `1px` alignment correction,
  `2px` title/message gap, `600` title weight, and `8%` tint are private visual
  composition, not arbitrary public controls.
- Component JS: zero. Optional dismiss behavior belongs to the consumer; Close
  Button contributes only native activation.

## Findings And Direction

| Finding | Severity | Direction | Owner |
| --- | --- | --- | --- |
| Long/unbroken text created page overflow. | resolved | Title/message wrap; `390px` document and `324px` alert no longer overflow. | implementation |
| Studio invented a dismiss name when empty. | resolved | Supplied empty value renders as `aria-label=""`. | implementation |
| Fractional message type duplicated existing body-small tokens. | resolved | Semantic `14/20px` body-small tokens are public and rendered. | implementation |
| Light Success/Warning decorative accents were below `3:1`. | review input | Private theme-aware mix now yields `3.71:1` and `3.26:1`; formula awaits visual approval. | owner / aesthetic-accessibility |
| `Banner` could be misread as ARIA banner landmark. | medium | Explicitly document that no `role="banner"` mapping exists. | documentation |
| No component-specific owner visual reference exists. | review input | Approve repository render or supply reference. | owner |

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Container + optional live role, semantic variant classes, Close Button composition. | Content, contrast, live timing, dismissal, focus, and four-viewport evidence complete. |
| Shopify | Liquid banner markup, copied CSS, Close Button, target-owned removal/persistence. | Implemented; target evidence pending. |
| React / Angular | Consumer-controlled presence; announcement props and optional Close child. | Contract-ready; no certified adapter. |
| Figma | Variant, optional anatomy, and announcement annotation. | Component-specific reference absent. |
| SwiftUI / Compose | Inline semantic feedback; platform announcement only for dynamic context. | Conceptual mapping only. |

## Refinement Evidence

- Exhibit/Studio root markup is byte-identical (`870` tested bytes).
- Eight canonical screenshots cover four viewports in both docs modes; eight
  theme/variant images cover every semantic family.
- Static/Polite/Assertive mappings pass and never emit the ARIA banner landmark.
- Extreme alert `scrollWidth` fell from `397px` to `324px`; document width fell
  from `430px` to `390px`.
- Every light/dark semantic accent now exceeds `3:1`; text remains at least
  `7.05:1`. Canonical dismiss focus remains visible in forced colors.
- Full report: `docs/reports/alert-web-refinement-audit.md`.

## Readiness Decision

Ready for human review; remains `pilot`. Visual approval of the private semantic
accent formula, tint, typography, and spacing is pending. No `stable` promotion
is authorized.
