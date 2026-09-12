# ADR 0376: Prose and Article Body Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Apply the owner's broad visual-token requirement (ADR 0293) to the existing
Prose foundation and its Article Body consumer, refining ADR 0269's earlier
private visual-value boundary. Foundations still owns Prose; Blog owns article
extensions. Prose is not a new registry component, platform or token layer.

24 roles under `component.prose` and 18 under `component.article-body` expose
measures, independent spacing factors, relative code/drop-cap metrics, borders,
focus, links, media proportions, callout tint and icon sizing. Appropriate
values reference existing dimensions/colors; factors multiply system spacing
roles at consumption so inherited responsive bases remain editable. Existing
component-specific rem/em measures remain explicit defaults, not invented
universal primitives. Article Body exposes 80 public values including shared
foundation typography and colors. Studio and Exhibit share this inventory.

The existing medium flow rule was overridden by the generic margin reset;
callout paragraph spacing and pull-quote overrides also lost specificity.
Restore those declared rules. Preserve the attribution's observed 8px compact
spacing as its initial public value rather than introducing the formerly
ineffective larger value. Native authored ul/ol regain disc/decimal markers
inside Prose; the global component reset previously hid both. Canonical child
components remain outside these rules through prose-excluded.

Validation follows the already-required `.prose` anatomy into the delimited
Foundations source. It does not authorize unrelated foundation tokens or add
a synthetic registry dependency. Three regression tests cover explicit versus
optional composition, transitive dependency and missing source boundaries.
They run with `validate:contracts`.

Web/Shopify projections regenerate; native content trust, semantics, target
ownership, no parser/runtime, migration aliases and pilot maturity remain.
Consumer adoption and hosted certification stay separate.

## Evidence

`docs/reports/2026-09-12-article-body-values-checkpoint.md`.
