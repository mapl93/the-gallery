# 0117. Native Product Form And Target-Owned Purchase Lifecycle

Status: Accepted

Date: 2026-07-14

Decision update: ADR 0241 resolves the previously open purchase strategy,
coordinator, supplementary-scope and Quantity-policy questions through D5-A.

## Context

Product Form was documented as a composition of Variant Selector, Quantity
Selector, and Button, but its contract omitted Quantity and most native form
lifecycle. Studio duplicated Quantity markup, kept its numeric state outside the
named form data, and had no resolved merchandise identifier, activated submitter,
pending state, or feedback boundary. The MDX fallback omitted Quantity and added
an undeclared Wishlist action. Shopify put `.product-form` on an inner `div`,
duplicated the Price owned by Product Info, used a stale Button class and initial
variant id, and ignored variant quantity rules.

HTML forms already own named successful controls, constraint validation,
activated submitters, FormData, submit, formdata, and reset. Shopify's product
form tag provides the target-native submission boundary and supports either
ordinary navigation or locale-aware Cart Ajax interception. Shopify option data
can also represent an option combination with no current purchasable variant,
so merchandise resolution cannot be inferred by neutral layout code.

ADR 0097 assigns generic form values and validity to native child controls. ADR
0115 assigns one canonical Price to Product Info. ADR 0116 assigns cross-group
option resolution, variant id, availability, Price/media/inventory/URL, selling
plan, submit state, and one update status to a parent product coordinator.

## Decision

- On neutral Web, `.product-form` is the real native `form`, not an inner layout
  wrapper. Targets supply its action, method, named purchase data, and service.
- Product Form composes canonical Variant Selector, Quantity Selector, and one
  primary Button. It does not duplicate their markup, value owners, validity,
  keyboard behavior, state CSS, or public APIs.
- Variant Selector and Quantity Selector are optional compositions. Targets omit
  meaningless options and decide whether one-of-one products omit or fix
  Quantity. Product Form does not invent that commercial policy.
- One target product coordinator maps current option groups to one purchasable
  merchandise identifier before enabling or submitting. It also synchronizes
  availability, quantity rules, selling plan, Price, media, inventory, URL, and
  any product update status. Product Form owns no variant database or mirrored
  form-value object.
- Named child controls and the explicit named submitter remain the submission
  data owners. Static Web keeps authored defaults and native reset. Framework
  targets may control each canonical child through that child's contract.
- Unavailable and pending are distinct. Unavailable disables the native
  submitter and requires a visible explanation when adjacent option content is
  insufficient. Pending maps to canonical Button busy plus disabled semantics,
  preserves the visible label, and blocks repeat activation.
- `.product-form__message` is optional target feedback placement. The target owns
  localized content, tone, insertion, role, announcement, focus, retry, recovery,
  and removal timing. Neutral Product Form adds no live region by default.
- Product Form does not render Price. Product Info remains the one canonical
  price surface in the accepted main-product composition.
- Accelerated checkout, selling plans, line-item properties, gift-recipient
  fields, custom uploads, subscriptions, preorders, inventory policy, and Cart
  Drawer integration are explicit product/target decisions, not a generic slot.
- Layout is intrinsic and container-driven: token-based vertical rhythm, a
  wrapping action row, no viewport breakpoint, no reordered DOM, and no neutral
  Product Form runtime.
- Studio exposes only the two canonical composition slots, submit label,
  unavailable, pending, and optional target feedback. Exhibit and Studio use the
  same ProductStudio renderer, fixture, and extracted Quantity artwork.
- Shopify places the class on `{% form 'product' %}`, renders canonical option
  and quantity snippets, maps initial variant quantity rules, uses a synchronized-
  by-target hidden `name="id"`, removes duplicate Price, and uses the named
  canonical Button submitter. Its adapter remains `planned` until one controller
  proves live merchandise synchronization and the chosen purchase lifecycle.
- The Shopify adapter inventory recognizes literal `class:` arguments on Liquid
  form tags as real target class evidence rather than requiring a false inner
  HTML wrapper.
- The contract remains `pilot`. Automated, adapter, and visual evidence prepares
  the candidate for owner/target decisions but does not promote it to `stable`.

## Performance

Product Form adds no neutral listener, observer, request, timer, service, asset,
or JavaScript byte. Deterministic level-9 gzip after refinement measures:

- Product CSS: `5,311 B / 5.2 KiB`, leaving `13 B`; net `+5 B` from Batch 31.
- Neutral Web component CSS: `65,423 B / 64 KiB`, leaving `113 B`; net `-18 B`
  from Batch 31 after shortening legacy section comments while adding the form
  layout contract.
- Shared neutral runtime: `10,501 B / 8 KiB`, the existing explicit cumulative
  `2,309 B` exception. Product Form adds `0 B`.

No ceiling is reset. Product CSS is effectively exhausted and later Product
family work must simplify existing source before adding new presentation.

## Consequences

- Neutral navigation and target Ajax can consume the same valid form and
  FormData instead of maintaining parallel data paths.
- Quantity, merchandise id, and activated submitter are now observable in form
  submission; reset restores one coherent default selection.
- Product Form cannot accidentally announce or render a second Price or product
  update status, but the parent target must implement the missing coordinator.
- ADR 0241 and the implemented Shopify coordinator now make the native target
  form behavior-ready; live-store evidence remains a release gate rather than a
  neutral contract blocker.
- Human review still must approve the visual direction for spacing, action,
  feedback, unavailable, pending, and narrow layouts.
