# FleetVision 365 – Dispatch V2 Load Builder and Approval

The Load Builder is an operational dispatch module for creating, validating, and submitting loads for approval.

It does not approve loads, tender loads, or generate Bills of Lading.

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

The Load Builder must never expose Generate BOL.

Only approved loads may generate a BOL through DocumentService.

## Architecture Rule

Pages orchestrate workflows.
Workflows orchestrate services.
Services own business rules.
Components render data.
