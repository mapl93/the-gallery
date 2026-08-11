# 0208. Commission Form Native Composition Boundary

Status: Accepted

Date: 2026-07-18

Owner confirmation: decision 62 (`R8-A`), 2026-08-11

## Context

R8 Commission Form was already defined as introduction/layout composition over
canonical Input, Textarea, File Upload and Button, with the commercial workflow
left to targets. Its runtime fixture nevertheless duplicated dependency markup,
omitted native names/required/email behavior, manually cleared React state,
rendered no canonical file status and disagreed with the MDX fallback.

Canonical CSS also hardcoded physical measure/spacing and restyled File Upload
internals while Studio owned separate upload and narrow-action layout. The
repository has no approved universal commission record, consent/privacy model,
submission service, file policy/transport, Shopify integration or R8-specific
Figma evidence.

HTML already provides native form, named-control, constraint-validation,
FormData, submitter, FileList and reset behavior. Canonical Gallery controls own
their visible labels, values, descriptions, validation, focus and disabled/busy
states.

## Decision

- R8 remains a commission-intake composition profile, not a field schema,
  validation system, file service or workflow engine.
- Required non-empty field composition is the viability gate. Missing fields
  omit the complete R8 root; optional title, intro, reference upload and actions
  cannot create an empty form shell.
- A standalone Web target uses one real native form with stable named controls
  and explicit button types. A consumer already inside a form uses a non-form
  host and never nests forms.
- Canonical Input, Textarea, File Upload and Button retain their full contracts.
  R8 adds no parallel validation, upload, disabled, pending, success or error
  state.
- One native file input is the sole FileList owner. `accept` remains a picker
  hint; file validation, scanning, transport, storage, deletion and failure
  handling remain target responsibilities.
- The docs fixture uses sample name, email, request and optional reference fields
  only to demonstrate native behavior. These fields, labels and requirements are
  not public R8 API or commercial defaults.
- The local fixture may derive controlled text values and selected filenames for
  evidence, but preserves native required/type/name/autocomplete, FormData,
  submitter and reset. Its result explicitly says nothing was submitted or
  uploaded.
- `FileUploadArtwork` is the shared docs renderer for the File Upload pilot and
  R8 composition. `CommissionFormArtwork` and one fixture are the registered
  Exhibit/Studio path; the MDX fallback remains structurally aligned.
- R8 CSS owns only bounded measure, introduction rhythm, slot spacing and
  container-responsive action layout. Dependency internals and their special
  states remain canonical.
- Target field inventory, consent/privacy, business validation, submission,
  response/focus, notifications, abuse protection and downstream workflow stay
  outside the R8 contract.
- The target owns the Form root and submission lifecycle. A standalone consumer
  wraps R8 in canonical Form/native semantics; an embedded consumer reuses its
  owning Form and never creates nested form markup. R8 therefore remains an
  embeddable composition profile rather than requiring a second Form root.
- R8 remains `pilot`; automated evidence cannot promote it to `stable`.

## Consequences

- Exhibit and Studio exercise one truthful local form without presenting a fake
  backend result or duplicating dependency components.
- Native labels, names, required/type constraints, submitter, FormData, FileList
  and reset can be inspected directly.
- Empty required composition fails closed and optional regions omit cleanly.
- Source CSS, rather than Studio/viewport overrides, owns the component's narrow
  response while preserving logical source/tab order.
- Shopify storefront contact, Polaris Admin forms, Webflow integrations and
  other targets can translate to their native form systems after their data,
  consent, file and result policies are approved.
- Commission schema, privacy/retention, upload service, target submission,
  Shopify mapping, final visuals, R8-specific Figma evidence and explicit human
  approval remain open questions.
