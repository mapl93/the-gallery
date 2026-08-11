# Component Dossier: Search Overlay

Status: `human-review-ready`

Target reviewed: Neutral Web search composition with target-owned modal/search service

Contract: `components/contracts/search-overlay.contract.json`

## Recommendation

Keep Search Overlay as a named modal search surface with one visible title,
canonical named dismiss action, native search form/input, and optional target-
owned result/status content. `open` remains presentation state synchronized with
hidden semantics; the target owns the single controlled/uncontrolled lifecycle,
focus service and search data service.

Use ordinary linked result lists for the current v1. Do not apply combobox/
listbox semantics, `aria-activedescendant`, live announcements, provider,
debounce, ranking, or caching unless a target explicitly implements predictive
suggestion selection rather than navigable results.

## Purpose And Limits

- Gives site-wide search a focused temporary surface and displays truthful
  result/loading/empty/error content supplied by the target.
- Useful when search is invoked from the global shell and should temporarily
  obscure/inert the underlying page.
- Not Combobox, Command Palette, Search Results Page, provider client, request
  cache, analytics tracker, or generic Modal replacement.
- Target owns trigger, query source of truth, submit/request timing, cancellation,
  provider, ranking, records, prices/media, status text, announcements, navigation,
  persistence, route dismissal, and coordination with other overlays.
- Required: title, input label, dismiss action/label and native input. Results are
  optional; an empty result region is omitted or replaced by truthful status.

## Gallery Baseline Before This Batch

- Registry `C5`, Global, no dependencies; contract `0.2.0`, `pilot`.
- CSS has a full-screen fixed backdrop, centered box, hidden/open selectors,
  scrollable results and focus, but raw 80/96/600/400/48px geometry, no safe-area
  treatment, no results list/item/content parts, and calculated small price type.
- Contract exposes open/input label/query/placeholder/results but omits visible
  title, named dismiss action, modal dialog semantics, form/list anatomy, input
  focus state, loading/empty/error states, and controlled/uncontrolled strategy.
- Shared renderer uses a generic `section`, site-only bare close Button, a `div`
  instead of form, `aria-label` only on input, and links directly in a generic
  results container. It toggles visibility but does not focus the input, contain
  Tab, handle Escape or restore focus despite presenting a modal surface.
- Shopify nests a form inside a `div role="search"`, has no named dialog/dismiss
  action or hidden synchronization, and applies unconditional `aria-live="polite"`
  despite ADR 0086 leaving announcement cadence target-owned.
- The owner reference is generic. It supports the centered white search surface,
  darkened backdrop, strong field, linked media results and compact close action,
  not a provider/combobox API.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Modal dialogs are named, contain focus, receive initial focus, close with Escape, provide visible close and restore focus. | Require title/dismiss composition; target owns lifecycle implementation. |
| [WAI search landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/search.html) | Native `search`/`role=search` groups search functionality; repeated landmarks need labels. | Use a native search form where useful, but avoid a superfluous landmark inside the already named modal. |
| [HTML search element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-search-element) | Search groups controls/content for searching; native form/input semantics remain available. | Preserve native submit/input behavior rather than inventing widget keys. |
| [Shopify predictive search UX](https://shopify.dev/docs/storefronts/themes/navigation-search/search/predictive-search-ux) | Focus field on invocation, keep mobile scrolling usable, limit useful results, darken background, and offer all-results navigation. | Align presentation and target obligations without hardcoding provider records or max count. |
| [Shopify theme accessibility](https://shopify.dev/docs/storefronts/themes/best-practices/accessibility) | Drawers/modals use dialog semantics, focus entry/containment, Escape/restoration and 44px close controls. | Shopify/docs target must implement the same modal obligations. |
| [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) | Separates overlay/content/title/close and controlled/uncontrolled open state with focus/Escape services. | Framework adapters may compose Dialog primitives; neutral source records semantics, not React APIs. |
| [WAI combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) | Combobox is an input whose popup enables choosing a value/suggestion with a specialized focus model. | Do not apply it to ordinary result links; predictive-selection mode needs its own accepted contract. |

Polaris' current component index has no storefront Search Overlay equivalent;
admin Top Bar/search patterns are a product boundary, not source API.

## Anatomy And Canonical Composition

| Part | Required | Semantic element | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | named modal dialog surface | Search Overlay/target | Open/hidden presentation boundary. |
| Box | yes | native `form` | Search Overlay/target | Search submission semantics. |
| Header | yes | neutral layout | Search Overlay | Title plus dismiss action. |
| Title | yes | context heading | target | Names dialog. |
| Dismiss | yes | canonical Close Button | dependency/target | Target connects lifecycle. |
| Label | yes | `label` | target | Names native input; may be visually hidden. |
| Input | yes | `input type="search"` | target | One query owner. |
| Results | no | neutral status/results region | target | Loading/empty/error/list content. |
| Result list/item | no | `ul > li` | target | Used when linked results exist. |
| Result | no | `a` | target | Native destination. |
| Media/content/title/meta | no | image/phrasing content | target | Minimal identifying record data. |

Recommended direct dependency: Close Button for the required named dismiss
action. Search Overlay does not depend on Combobox or duplicate Modal CSS; target
adapters may implement its modal lifecycle with native `dialog`, Radix Dialog,
Shopify theme runtime, or equivalent.

## State, Variant, Size, And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant/size | One full-screen overlay and bounded centered panel. |
| Visibility | closed (hidden/non-interactive) and open (named modal). |
| Input | empty, populated, placeholder, focus-visible. |
| Results | omitted, loading, empty, error, one/many linked results. |
| Result | default, fine-pointer hover, focus-visible. |
| Content | long query, long/localized/unbroken title/result/meta, missing/decorative/informative media. |
| RTL | logical panel/header/result layout and reading order. |
| Motion | open/close opacity only; no result animation; reduced motion removes transitions. |
| Forced colors | dialog/panel/input/result/focus boundaries remain visible. |

Predictive combobox, recent searches, categories, filters, voice search, infinite
results, pagination and provider-specific typeahead are unsupported v1 modes.

## Public API And State Ownership

- `open` — optional boolean, default false; synchronizes visible class and hidden
  semantics. One target owner controls it.
- `title` — required visible dialog title.
- `dismissLabel` — required accessible name for the composed Close Button.
- `inputLabel` — required input name, rendered by a native label.
- `query` — optional current input value; targets map controlled/uncontrolled value
  with one owner and native input/change/submit semantics.
- `placeholder` — optional hint, never the accessible name.
- `results` — optional target slot for status or linked-list content.
- Target adapters expose one lifecycle change channel (`open/defaultOpen/
  onOpenChange` or equivalent) and one query channel. Neutral CSS owns no events,
  request state or form submission.

## Token And Hardcoded-Value Audit

- Public: surface/text/focus colors, element spacing, panel/input/result radii,
  shadow, overlay opacity/z-index, title/body/body-small type and family,
  touch-target, transition/easing.
- Private: panel max measure, viewport/safe-area insets, maximum height, result
  media size/gap, focus geometry, and scroll partition. These remain composition,
  not consumer-facing properties.
- Replace calculated price type with body-small size/line height. Reuse canonical
  Close Button tokens transitively instead of duplicating close geometry.
- Search service runtime is target-owned. Base component adds no request, debounce,
  cache, observer, timer, polling, analytics or asset.

## Accessibility And Interaction

- Open state exposes a named `dialog` with `aria-modal="true"`; closed state is
  hidden/non-interactive and synchronized with `aria-hidden` or unmounting.
- Focus moves to the search input, Tab/Shift+Tab stay within the open surface,
  Escape/dismiss close it, and focus returns to the invoking control.
- Use native search input and form submission. Do not add arrow-key/listbox behavior
  to ordinary linked results.
- Results are native lists/links. Target status announcements are concise and
  policy-driven; no unconditional live region is part of base v1.
- Informative result images need alt text; decorative thumbnails are hidden.

## Responsive, Content, And Performance

- Test Mobile/Tablet/Desktop/XL, 320px, safe-area/narrow viewport, keyboard-induced
  visual viewport, empty/long query, 0/1/10+ results, long/localized/unbroken/RTL,
  missing images, dark, reduced motion and forced colors.
- Panel and results own vertical scrolling without page/root inline overflow; no
  fixed-height desktop assumption may trap mobile content.
- Global's Batch 16 result is a documented `4,028 B` exception against 3.7 KiB;
  total Web remains `61,781 B / 64 KiB` and no neutral service runtime is added.
  Existing docs-target focus behavior is evidence only.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Named modal, native form/search input, Close Button, list/link results, target lifecycle/service. | CSS and shared docs lifecycle are evidenced for human review. |
| Shopify | Search route/predictive endpoint plus dialog/form/result markup and theme runtime. | Semantic dialog/form/dismiss/hidden/no-live markup aligns; provider and lifecycle remain planned. |
| React / Angular | Controlled/uncontrolled open/query owners around Dialog/form/results. | Strategy documented; adapter not certified. |
| Figma | Overlay/box/header/title/close/input/result states and tokens. | Studio metadata exists; no focus/request ownership. |
| SwiftUI / Compose | Native modal search surface/results navigation. | Conceptual mapping only. |

## Exhibit And Studio Parity

The single `GlobalStudio` renderer and one fixture serve both modes. The shared
implementation is now a named modal with canonical Close Button, native form/
label/input, native result list/links, controlled fixture query and a docs-target
focus/Escape/restoration lifecycle. Site-only records/media remain fixtures.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Modal surface has no dialog/title/dismiss contract. | resolved | Title/dismiss semantics and Close Button dependency are required. | implementation |
| Shared renderer lacks focus/Escape/restoration and form/list anatomy. | resolved | Docs lifecycle and native form/list composition are shared. | implementation |
| Shopify adds unconditional live output and no hidden/dialog sync. | partially resolved | No-live semantic markup aligns; production service/lifecycle remains. | implementation/target |
| Query/results service ownership remains unresolved. | non-blocking for neutral composition | Preserve ADR 0086 boundary; do not add provider API. | owner/target later |
| Combobox versus linked results lacks consensus across search products. | non-blocking | Certify linked-list v1 only; require separate decision for predictive selection. | architecture later |

## Evidence And Validation

- Contemporary before: Exhibit and Studio desktop captures under
  `output/playwright/refinement-batch-16/before/`.
- Eight canonical after captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  localized extreme, dark, forced-colors, reduced-motion and focus evidence is
  under `output/playwright/refinement-batch-16/after/`.
- One named modal, matching native label/input IDs, `ul > li > a` results and zero
  live regions are present. Initial focus is the query; Shift+Tab reaches Close
  then wraps to the last result; Escape removes the dialog/restores the trigger;
  reopen returns to the query.
- A 390px localized/unbroken case keeps overlay `358/358px`, panel `326/326px`,
  title `238/238px`, result `210/210px`, and input `290/290px` client/scroll.
- Light title/result/price contrast is `17.93:1`/`17.93:1`/`7.81:1`; dark is
  `17.18:1`/`17.18:1`/`12.09:1`. Reduced motion is `0s`; forced colors and focus
  remain visible.
- Contracts, docs/Studio, Web/Shopify adapters, TypeScript, structural/parity/
  static/refinement audits, temporary build, performance and `site/dist`
  cleanliness pass in Batch 16.

## Risks And Open Questions

1. Provider, request timing, ranking, result types, status announcements and
   analytics remain target/product decisions.
2. Production native-dialog/portal/top-layer, overlay mutual exclusion, outside
   dismissal, scroll locking and route cleanup remain global architecture.
3. Panel size/placement, field scale, close treatment, result density/media,
   backdrop and motion need human visual approval.

## Readiness Decision

Search Overlay is prepared for explicit human stability review and remains
`pilot`. Backdrop/panel/field/result visuals and the target provider, status,
focus-inertness, global coordinator and route lifecycle still need human approval.
