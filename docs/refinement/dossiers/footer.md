# Component Dossier: Footer

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify section boundary audit

Contract: `components/contracts/footer.contract.json`

## Recommendation

Keep Footer as one page-shell closing region with required target-owned content
groups and optional metadata. Use a native body-scoped `footer` without redundant
`role="contentinfo"`; organize each destination group as a native list inside a
navigation labelled by its visible heading. Preserve the existing brand-plus-three-
group visual direction, but make its layout respond to Footer's own width and keep
extra/long groups contained rather than defining a CMS schema in neutral source.

Do not decide newsletter, social network, locale/country selection, consent,
legal revision, merchant block inventory, or Shopify section-group architecture
inside the component. Those remain target/product boundaries under ADR 0086.

## Purpose And Limits

- Closes the site shell with secondary discovery routes, brand/context copy, and
  optional legal, location, locale, copyright, or service metadata.
- Useful once per page document after primary content; body-scoped use supplies
  the page's `contentinfo` landmark.
- Not an application FooterHelp callout, newsletter form, legal CMS, consent
  manager, social provider, localization controller, or generic card footer.
- The target owns group records/order, destinations, external-link behavior,
  translated copy, legal truth, locale controls, social services, and revisions.
- At least one meaningful content/link group is required. Empty groups are omitted;
  optional metadata is omitted when absent.

## Gallery Baseline Before This Batch

- Registry `C3`, Global, no dependencies; contract `0.2.0`, `pilot`.
- Canonical CSS switches to four columns from the outer viewport at 768px, so an
  embedded narrow Footer can receive an inappropriate desktop layout.
- Heading/link/metadata typography mixes semantic body size with calculated
  `0.875` and `0.75` scales. Links have focus but hover uses the light-theme
  accent as text and do not expose a canonical BEM link part or touch target.
- The renderer labels each navigation with `aria-label` while also showing the
  same heading instead of using `aria-labelledby`. It has no canonical group,
  brand, copy, metadata-item, or metadata-link parts.
- Shopify adds redundant `role="contentinfo"`, unlabelled menu groups, physical
  inline styles, a non-heading brand span, and a static footer section directly
  in `theme.liquid`. Current Theme Store guidance requires header/footer section
  groups; changing that publishing architecture remains explicit target work.
- The owner Studio reference is the shared generic frame. It supports retaining
  the quiet secondary surface, serif headings, divided sub-footer, and restrained
  columns, not choosing services or a new CMS inventory.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI contentinfo landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/contentinfo.html) | A page normally has one top-level contentinfo landmark; body-scoped `footer` supplies it, while nested footers do not. | Use native Footer once at page-shell level and do not add redundant role in Shopify. |
| [WAI landmark regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) | Repeated navigation landmarks need meaningful distinct names, preferably visible headings through `aria-labelledby`. | Label each link group from its rendered heading; avoid “navigation” in the label. |
| [HTML footer element](https://html.spec.whatwg.org/multipage/sections.html#the-footer-element) | Footer represents information about its nearest sectioning ancestor; body scope is site/page footer. | Keep neutral anatomy native and context-aware rather than forcing an ARIA role. |
| [Shopify section groups](https://shopify.dev/docs/storefronts/themes/architecture/section-groups) | Header/footer areas are merchant-reorderable section groups; Theme Store requirements mandate them. | Keep neutral groups target-owned and record the current static-section adapter as target maturity debt. |
| [Shopify theme test checklist](https://shopify.dev/docs/storefronts/themes/store/test-theme/checklist) | Footer testing includes the maximum/five columns, long menus, icons, text, and newsletter states where supported. | Stress extra groups and 10+ links without silently adding newsletter API. |
| [Polaris FooterHelp](https://polaris-react.shopify.com/components/navigation/footer-help) | FooterHelp is a compact app-context help link with alignment, not a site shell or navigation inventory. | Treat Polaris as an adjacent boundary, not an API to copy. |

Radix has no site Footer primitive; native document structure and target content
composition are sufficient.

## Anatomy And Composition

| Part | Required | Semantic element | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | body-scoped `footer` | Footer | Supplies contentinfo only in page-shell context. |
| Grid | yes | neutral layout container | Footer | Contains brand/content and navigation groups. |
| Group | yes | labelled `nav` | target | Repeated target-owned destination group. |
| Brand | no | neutral group | target | Brand copy, not a separate public service. |
| Heading | yes per group | context-appropriate heading | target | Labels each navigation through `aria-labelledby`. |
| Link list | yes per group | `ul > li` | target | Native destination inventory. |
| Link | yes per item | `a` | target | Descriptive destination, native behavior. |
| Copy | no | phrasing content | target | Brand/context prose. |
| Bottom | no | neutral metadata container | Footer | Optional sub-footer boundary. |
| Metadata item/link | no | text/native link | target | Legal, location, locale or service facts. |

Footer has no required component dependency. Newsletter, locale selectors,
consent controls, social icons, and app blocks compose target components when
accepted; they are not built into this neutral contract.

## State, Variant, Size, And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant/size | One quiet secondary-surface treatment and default spacing. |
| Link | default, hover accent indicator, focus-visible. |
| Layout | stacked below Footer-container 48rem; canonical wide columns at/above. |
| Content | one/three/five groups, empty optional group omitted, 10+ links, long/localized/unbroken copy and metadata. |
| RTL | logical padding, borders, alignment and source-order reading. |
| Reduced motion | link transition removed. |
| Forced colors | root/dividers, links and focus remain distinguishable. |

Newsletter, accordion/mobile collapse, locale selector, payment icons, social
icons, trust marks, theme blocks, app blocks, and sticky Footer are target
compositions rather than variants.

## Public API And State Ownership

- `linkGroups` — required target-owned slot for one or more labelled navigation
  groups.
- `brand` — optional target-owned brand heading and supporting context.
- `metadata` — optional slot for legal, locale, copyright, location, service, or
  brand metadata.
- Controlled/uncontrolled state does not apply. Native links own navigation;
  target-composed forms/selectors own their own state.
- Footer emits no synthetic event and owns no CMS, consent, legal, locale,
  newsletter, analytics, or social lifecycle.

## Token And Hardcoded-Value Audit

- Public direction: secondary surface, primary/secondary/accent/focus/border
  colors; section/container/grid/element spacing; heading/body/body-small/caption
  typography; touch target; transition/easing.
- Private: 1px dividers, 2px focus/underline geometry, current 48rem composition
  threshold, heading weight, and local gap calculations.
- Calculated body scales have been replaced by existing body-small and caption
  tokens.
- Keep accent as hover underline/border while primary/secondary text carries
  contrast, following the Batch 15 navigation precedent.
- Neutral runtime budget is `0 B`; no listener, observer, timer, request, asset,
  or continuous work is required.

## Accessibility And Interaction

- Use native body-scoped Footer once; do not duplicate `role="contentinfo"`.
- Label repeated navigation regions from visible headings with unique IDs.
- Preserve native Tab/Shift+Tab/Enter/link behavior and visible focus.
- Keep legal and locale information readable and current; Footer must not be the
  only route to critical support/account/safety actions.
- External target links own disclosure/new-window policy; icon-only metadata
  links require target-supplied accessible names.

## Responsive And Performance

- Test Mobile/Tablet/Desktop/XL plus 320px, one/three/five groups, 10+ links,
  missing metadata, long/unbroken/localized/RTL content, dark, reduced motion and
  forced colors.
- Footer belongs to Global's `3.7 KiB` gzip family ceiling and passive `0 B`
  component-runtime budget. Full Neutral Web remains capped at `64 KiB`.
- Container response must use Footer inline size. Extra groups may create rows but
  must not produce root/page inline overflow.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native Footer, labelled nav/list/link groups, optional brand and metadata. | CSS/renderer/browser evidence complete for human review. |
| Shopify | Merchant menu blocks, brand copy and metadata in Footer section/group. | Canonical markup/classes validate; section-group architecture, localization and services remain planned. |
| React / Angular | Target records/slots render native Footer/nav/list/link content. | Planned; no local state owner. |
| Figma | Root/grid/group/heading/link/metadata anatomy and stacked/wide modes. | Studio metadata exists; service behavior excluded. |
| SwiftUI / Compose | App-specific bottom content/navigation when semantically equivalent. | Conceptual only; site contentinfo does not map directly. |

## Exhibit And Studio Parity

The single `GlobalStudio` renderer and one initial fixture serve both modes with
the same optional brand, three visible-heading-labelled navigation groups,
metadata and canonical source. Editorial canvases correctly stack below 48rem;
a supplemental 960px host proves the same renderer's wide container mode.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Outer viewport controls Footer columns. | resolved | 48rem is now a Footer container query. | implementation |
| Group labels/parts and type roles are incomplete. | resolved | Canonical group/copy/link/meta parts and semantic type tokens are reconciled. | implementation |
| Accent hover may carry insufficient text contrast. | resolved | Primary text carries hover; accent is the underline. | implementation |
| Shopify markup contains redundant role and inline presentation. | partially resolved | Canonical classes/semantics are aligned; section-group publishing remains target debt. | implementation/target |
| Footer services/content requirements remain unresolved. | non-blocking for neutral shell | Keep outside v1 under ADR 0086. | owner/target later |

## Evidence And Validation

- Contemporary before: Exhibit and Studio desktop captures under
  `output/playwright/refinement-batch-16/before/`.
- Eight canonical after captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  wide-container, localized extreme, dark, forced-colors, reduced-motion and
  focus evidence is under `output/playwright/refinement-batch-16/after/`.
- A 960px host resolves to `320/160/160/160px` columns. At a 390px viewport,
  localized/unbroken stress keeps Footer `358/358px` and grid `326/326px`
  client/scroll width.
- Light heading/secondary contrast is `16.44:1`/`7.17:1`; settled hover is
  `16.44:1`; dark heading/secondary is `14.50:1`/`10.21:1`. Reduced motion is
  `0s`; forced colors and focus remain visible.
- Contracts, docs/Studio, Web/Shopify adapters, TypeScript, structural/parity/
  static/refinement audits, temporary build, performance and `site/dist`
  cleanliness pass in Batch 16. Global's new budget exception is explicit.

## Risks And Open Questions

1. Required groups, legal/social/locale/newsletter inventory and ordering remain
   target/owner decisions.
2. Shopify Theme Store requires footer section-group architecture; changing the
   publishing structure requires explicit target architecture work.
3. Surface, width threshold, type scale, column ratios, dividers, target height
   and sub-footer layout need human visual approval.

## Readiness Decision

Footer is prepared for explicit human stability review and remains `pilot`.
Surface, spacing, typography, 48rem threshold, column ratios, touch rhythm,
dividers, sub-footer layout and target content policy still need human approval.
