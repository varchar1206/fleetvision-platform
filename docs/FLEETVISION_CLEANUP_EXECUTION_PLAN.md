# FleetVision Cleanup Execution Plan

Branch:
cleanup/v2-shell-standardization

Reference Checkpoint:
Fix root layout and establish WorkspaceShellV2

## Purpose

Provide a rollback reference and execution roadmap for FleetVision V2 standardization.

---

## Phase 1 — Navigation Standardization

Goal:
Prevent users from accidentally leaving V2 workspaces.

Convert navigation paths:

Legacy:
- /
- /planning
- /tender-queue
- /active-loads
- /completed-loads
- /exceptions
- /performance
- /notifications
- /communications/actions

Target:
- /v2/dispatch
- /v2/dispatch/planning
- /v2/dispatch/tender-queue
- /v2/dispatch/active-loads
- /v2/dispatch/completed-loads
- /v2/dispatch/exceptions
- /v2/dispatch/performance
- /v2/dispatch/notifications
- /v2/dispatch/communication-actions

Result:
Users remain inside Dispatch Workspace.

---

## Phase 2 — Dispatch Workspace Standardization

Convert Dispatch to WorkspaceShellV2.

Workspace Pages:
- Dashboard
- Planning
- Tender Queue
- Active Loads
- Completed Loads
- Exceptions
- Performance

Visibility Components:
- Notifications
- Communication Log
- Communication Actions
- Driver Attestation Test
- Event History
- GPS Tracking
- Location Master

Goal:
All dispatch operational tools live under Dispatch Workspace.

---

## Phase 3 — Developer Workspace Standardization

Convert:
- Communication Monitor
- Automation Center
- Event Processor
- Geofence Simulator
- Delivery Diagnostics

to WorkspaceShellV2.

---

## Phase 4 — Broker Workspace Standardization

Convert:
- Broker Dashboard
- Tender Queue
- Carrier Assignment
- Active Loads
- Exceptions
- Documents
- Performance

to WorkspaceShellV2.

---

## Phase 5 — Carrier Workspace

Build:
- Carrier Dashboard
- Carrier Load Board
- Dispatch Operations
- Driver Assignment
- Carrier Performance

using WorkspaceShellV2.

---

## Phase 6 — Driver Workspace

Build:
- Driver Dashboard
- Assigned Loads
- Check Calls
- Arrival/Departure Events
- POD Submission
- Messaging

using WorkspaceShellV2.

---

## Phase 7 — Legacy Retirement

Remove:
- ShipperLayout
- BrokerLayout
- Legacy navigation
- Duplicate routing
- Duplicate CSS

Retain redirects only.

---

## Rollback Reference

Branch:
cleanup/v2-shell-standardization

Checkpoint Commit:
Checkpoint communication platform and V2 developer tools

Purpose:
Return point if workspace migration introduces routing or rendering failures.

---

## Success Criteria

All workspaces use:
- WorkspaceShellV2
- Workspace Launcher
- Navigation Drawer
- Hamburger Menu
- Common Header

No operational page should require a legacy route.
