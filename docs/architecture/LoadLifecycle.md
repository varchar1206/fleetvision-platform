# FleetVision 365 Load Lifecycle

## Lifecycle

Planning
→ Load Builder
→ Pending Approval
→ Approval Queue
→ Approved
→ Generate BOL
→ Ready to Tender
→ Tender Queue
→ Active Loads
→ Completed Loads

## Core Rule

The Load Builder does not generate Bills of Lading.

Only Approved loads may generate a Bill of Lading through DocumentService.

## Services

- LocationService
- WarehouseService
- CategoryRuleService
- LoadService
- ValidationService
- ApprovalService
- DocumentService

## Statuses

- Draft
- Built
- PendingApproval
- Rejected
- Approved
- BolGenerated
- ReadyToTender
- Tendered
- Active
- Completed
- Cancelled
