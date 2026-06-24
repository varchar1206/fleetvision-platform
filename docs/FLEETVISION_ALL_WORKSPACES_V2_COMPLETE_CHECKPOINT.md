# FleetVision All Workspaces V2 Complete Checkpoint

Date: 2026-06-24

## Milestone

All major FleetVision workspaces have been moved to the V2 workspace architecture using `WorkspaceShellV2`.

## Completed V2 Workspaces

- Dispatch Workspace
- Developer Workspace
- Broker Workspace
- Carrier Workspace
- Driver Workspace

## Architecture Pattern

FleetVision now follows this structure:

Workspace Launcher
→ WorkspaceShellV2
→ Workspace Home
→ Functional Pages

## Confirmed Workspace Routes

Dispatch:
- /v2/dispatch
- /v2/dispatch/dashboard
- /v2/dispatch/planning
- /v2/dispatch/tender-queue
- /v2/dispatch/active-loads
- /v2/dispatch/completed-loads
- /v2/dispatch/exceptions
- /v2/dispatch/performance
- /v2/dispatch/notifications
- /v2/dispatch/communication-log
- /v2/dispatch/communication-actions
- /v2/dispatch/driver-attestation-test
- /v2/dispatch/events
- /v2/dispatch/gps
- /v2/dispatch/locations

Developer:
- /v2/developer
- /v2/developer/communication-monitor
- /v2/developer/automation-center
- /v2/developer/event-processor
- /v2/developer/geofence-simulator
- /v2/developer/delivery-diagnostics

Broker:
- /v2/broker
- /v2/broker/dashboard
- /v2/broker/tenders
- /v2/broker/carrier-assignments
- /v2/broker/active-loads
- /v2/broker/exceptions
- /v2/broker/documents
- /v2/broker/performance

Carrier:
- /v2/carrier
- /v2/carrier/dashboard
- /v2/carrier/load-board
- /v2/carrier/driver-assignments
- /v2/carrier/active-loads
- /v2/carrier/exceptions
- /v2/carrier/performance

Driver:
- /v2/driver
- /v2/driver/dashboard
- /v2/driver/load-board
- /v2/driver/check-calls
- /v2/driver/events
- /v2/driver/messages

## Legacy Retirement Strategy

Option A selected:

Keep legacy URLs temporarily as redirects instead of deleting them immediately.

Legacy paths should redirect as follows:

- / → /v2/dispatch
- /planning → /v2/dispatch/planning
- /tender-queue → /v2/dispatch/tender-queue
- /active-loads → /v2/dispatch/active-loads
- /completed-loads → /v2/dispatch/completed-loads
- /exceptions → /v2/dispatch/exceptions
- /performance → /v2/dispatch/performance
- /notifications → /v2/dispatch/notifications
- /communications → /v2/dispatch/communication-log
- /communications/actions → /v2/dispatch/communication-actions
- /driver-attestation-test → /v2/dispatch/driver-attestation-test
- /events → /v2/dispatch/events
- /gps → /v2/dispatch/gps
- /locations → /v2/dispatch/locations
- /broker → /v2/broker
- /broker/* → /v2/broker/*
- /carrier → /v2/carrier
- /driver → /v2/driver
- /mobile → /v2/driver

## Legacy Files Still Present

- src/layouts/ShipperLayout.tsx
- src/layouts/BrokerLayout.tsx
- src/layouts/v2/BrokerShellV2.tsx

These should not be deleted until redirect testing is complete.

## Next Phase

Implement legacy route redirects, test old URLs, then remove unused legacy layouts after confirming no hidden dependency remains.

## Success Criteria

- All old URLs safely redirect into V2
- No user lands on legacy layout
- WorkspaceShellV2 remains the only active shell for operational workspaces
- Legacy layouts are removable after validation
