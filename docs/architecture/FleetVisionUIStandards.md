# FleetVision 365 UI Standards

## Purpose

FleetVision uses controlled UI inputs to maintain clean, consistent business data across workspaces and portals.

## Selector Standards

| Field Type | Control |
|---|---|
| Category | Single-select searchable dropdown |
| Store | Searchable dropdown single-select or multi-select for bulk workflows |
| Warehouse | Single-select searchable dropdown |
| Carrier | Searchable dropdown |
| Equipment | Searchable dropdown |
| Driver | Searchable dropdown |
| Date | Date picker |
| Time | Time picker |
| Weight | Numeric input |
| Temperature | Auto-filled numeric field, editable only if overrides are allowed |
| Commitment Time | Auto-filled time picker, editable only if overrides are allowed |
| Status | Read-only badge |
| Notes | Multi-line text area |

## Category Selector

Data source: CategoryRuleService.

Selecting a category loads commodity, temperature, commitment time, default BOL notes, required fields, and special instructions.

## Store Selector

Data source: LocationService.

Bulk build supports search, multi-select, Select All, and Clear Selection.

Individual load build uses single-select search.

## Rule

Avoid free-text fields when master data exists.
