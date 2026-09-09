# 0301. Variant And State Intersection Reconciliation

Status: Accepted

Date: 2026-09-08

## Context

The owner approved continuing audit finding 7 under the global ADR 0274 rule.
Input and Textarea already used independent axes; other contracts and Studio
renderers still exposed combinations or changed validation when state changed.

## Decision

- Merge Error/Success/Warning + Focus into generic Focus in Checkbox, Radio,
  Switch, Tags Input, Star Input, Number Input and Quantity Selector.
- Preserve all existing selectors as coverage under the generic state. Keep
  native validation behavior and variant-specific CSS intact.
- Remove redundant Star Input Error/Success/Warning states; those remain variants.
- Merge Filled + Hover in Icon Button, Subtle/Nav + Hover in Link, Left + Open
  and resting placement in Drawer, Range + Focus in Slider and featured-item
  hover in Mega Menu into their corresponding independent state.
- Studio's generic focus resolves styling from the selected variant. Choosing
  state no longer changes that variant; Tags Input Empty/Default also preserve
  the selected validation variant and the separately authored invalid property.
- Tags Input keeps a simulated focus ring driven by the current variant while
  the inspector receives real keyboard focus; changing the variant does not
  silently clear the selected preview state.
- Reject variant-prefixed interaction names in contract validation. The check
  targets known interaction suffixes; it does not reject a legitimate anatomy
  name merely because it shares letters with a variant.

## Boundaries

These are corrections to contract inventories and documentation controls, not
new runtime states or CSS classes. Public web selectors remain compatible.
Consumers of the old contract state names must compose Variant + State instead.
The affected pilot contract versions advance to record the changed public
inventory; package/release versioning policy is unchanged. No component changes maturity or receives automatic human certification.
Other structural/lifecycle state descriptions still require component-specific
review; a passing naming check is not a complete semantics audit.
