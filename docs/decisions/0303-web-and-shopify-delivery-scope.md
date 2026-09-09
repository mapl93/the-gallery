# 0303. Web And Shopify Delivery Scope

Status: Accepted by owner

Date: 2026-09-08

## Decision

The delivery plan ends at Shopify: complete the base Web system, then complete
the Shopify integration. Figma is removed from scope, not queued as a later
phase. Do not schedule its pilot expansion, synchronization, feedback,
publication, packaging or certification.

The repository remains canonical. Existing Figma exports, pilot files and dated
ADRs remain historical evidence; they are not maintained deliverables and do not
block Web or Shopify work. No remote design file is deleted by this decision.
Other platform ideas in older architecture documents are outside this plan.

Studio design references become optional historical metadata. Their absence is
not a validation or readiness failure. Visual acceptance uses the actual Web
components and compositions; human review remains required for stable status.
This supersedes earlier backlog requests for Figma artwork as acceptance evidence.

Strict DTCG export remains outside the current delivery scope. No canonical
token-format or release/versioning policy is changed.

Remove the unused planned Figma adapter from all 182 contracts and the registry.
Contract versions record this metadata change; no implemented Web/Shopify API or
component maturity changes as a consequence. The three choice-control versions
also record their expanded token API in ADR 0304.
