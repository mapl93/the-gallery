# 0190. Native Address Form Shell And Target-Owned Mutation

Status: Accepted

Date: 2026-07-17

Refined by: ADR 0264

## Context

Address Form exposed the field and action composition regions accepted by ADR
0078, but its implementation did not preserve one canonical form composition.
Account Studio reimplemented Input and the enhanced Select trigger, listbox,
option state, keyboard behavior, and icons locally. MDX serialized another
form. Studio text fields had no submission names, so FormData omitted them; the
single-line street field and country autofill mappings also differed between
the two sources.

U7 responsive behavior was split across canonical CSS and Studio overrides.
The canonical root could never show its intended two-column rows because its
maximum width was below its own unnamed container-query threshold, while Studio
forced two columns and reversed action order at independent thresholds. The
always-present Studio live region and Cancel messaging were target/demo
lifecycle presented as internal anatomy.

HTML already defines native form submission, successful-control naming,
constraint validation, invalid events, labels, and autocomplete purposes. WAI
requires programmatically identified input purposes and textual error
identification. Open UI's Select direction keeps native Select as the semantic
and value source because custom replacements can reduce performance,
reliability, and accessibility. Address schemas and authenticated mutations
remain target-specific; current Shopify Customer API mutations return their own
address fields and field-addressable user errors.

## Decision

- U7 is a native `form.address-form` and responsive composition shell. It is not
  an address schema, locale formatter, validator, geocoder, authentication gate,
  customer API client, mutation coordinator, router, confirmation dialog, live
  region, or telemetry client.
- Stable semantic properties remain required `fields` composition and optional
  `actions` composition. Field inventory, labels, names, values, autocomplete,
  requiredness, validation, locale ordering, action labels, and lifecycle do not
  become root properties.
- The required slot contains the complete target-selected canonical Input and
  Select controls. Every successful control needs a visible explicit label,
  unique ID, stable non-empty name, and valid autocomplete purpose. The docs
  fixture is one example, not the neutral address model.
- Input and Select retain their public semantics, validation variants, focus,
  and controlled/uncontrolled behavior. Button retains activation, disabled,
  and busy behavior. U7 adds no parent widget role or keyboard handling.
- Native required constraint validation and explicit submit are preserved.
  Change, blur, and option selection do not auto-submit. Targets adding custom
  or server validation identify errors in text, associate them with child
  controls, and manage the first invalid focus or a useful error summary.
- Pending, success, failure, conflict, authentication expiry, cancellation,
  routing, focus recovery, announcements, analytics, and refresh are target
  composition outside U7. The docs site may intercept submit/cancel and announce
  honest demo feedback adjacent to the form.
- The root uses `container: address-form / inline-size`, logical sizing, and a
  private maximum measure. Optional rows use two intrinsic tracks and collapse
  to one according to their component container without changing DOM, reading,
  serialization, or focus order. U7 adds no viewport breakpoint.
- Maximum measure, row threshold, columns, and action alignment remain private.
  Only consumed semantic spacing tokens are public. U7 adds no local colors,
  borders, typography, icons, focus styles, forced-colors rules, motion, or
  neutral JavaScript.
- Exhibit and Studio use one docs-only `AddressFormArtwork`, one fixture state,
  one DOM, and one behavior. It composes shared canonical Input artwork and the
  native canonical Select base; MDX keeps only a matching static fallback.
- ADR 0264 resolves the dependency boundary: U7 is a canonical Form profile and
  keeps direct Input, Select, and Button dependencies for its target-composed
  fields and actions. Form root, section, row, action, and optional error-summary
  hooks are reused instead of maintaining a parallel form contract.
- ADR 0264 also defines optional Cancel as target navigation or close
  composition, never implicit reset, and maps custom/server failures to
  canonical field messages plus a useful Form error summary when needed.
- Shopify remains `planned`. Under ADRs 0258, 0260, and 0264, Shopify v1 uses
  hosted current-account Profile/Addresses as native handoff; controlled
  headless projection and separately versioned classic compatibility remain
  distinct profiles rather than unresolved alternatives.
- Registered Figma nodes remain traceability only because they resolve to the
  generic Button Studio shell, not U7 artwork or owner visual approval.
- Contract advances to `0.2.0` and remains `pilot`; automated evidence cannot
  promote it to `stable` without explicit human review.

## Consequences

- Address Form now preserves native submission and autofill semantics and has
  one runtime Exhibit/Studio implementation without a second Select widget.
- Targets can choose locale- and platform-specific fields without expanding the
  U7 API or coupling the neutral source to Shopify, React, Figma, SwiftUI, or
  Compose.
- Field validation and mutation errors stay with the controls and target models
  capable of explaining them; U7 cannot mask target failures behind generic
  success copy.
- Container response is deterministic at direct component widths and no longer
  depends on docs chrome or duplicate viewport/Studio rules.
- Human review still decides final max measure/spacing/row threshold, action
  alignment, localized schema examples, and corrected U7-specific design
  evidence. Live protected mutation, error-summary focus, and target lifecycle
  evidence remain integration work rather than neutral-source decisions.

## References

- <https://html.spec.whatwg.org/multipage/forms.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html>
- <https://www.w3.org/WAI/WCAG22/Techniques/html/H44>
- <https://www.w3.org/WAI/tutorials/forms/>
- <https://www.w3.org/WAI/tutorials/forms/notifications/>
- <https://open-ui.org/components/customizableselect/>
- <https://www.radix-ui.com/themes/docs/components/text-field>
- <https://www.radix-ui.com/themes/docs/components/select>
- <https://polaris-react.shopify.com/components/selection-and-input/text-field>
- <https://shopify.dev/docs/api/customer/latest/mutations/customerAddressCreate>
