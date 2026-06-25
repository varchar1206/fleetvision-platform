# FleetVision 365 – Next Session Handoff: Client Portal Redesign Goal

## Current Milestone Status

Phase 4 Portal Administration was completed and committed.

Current major milestone commit:

`02d1a0c – Complete Phase 4 portal administration milestone`

The project now has:

- V2 operational workspaces
- Client portal foundation
- Portal administration
- Organization management
- Organization roles
- Business relationships
- Driver management
- Onboarding Center
- DocumentRecord framework
- Demo seed framework

An uploaded ZIP/checkpoint package should be used as the reference source for previous architecture decisions, completed milestones, and project history.

## New Goal for Next Session

The next design/build goal is to separate the internal workspace experience from the client-facing portal experience.

The existing workspaces should remain as-is.

The new client portals should be redesigned to feel like real customer portals, not workspace launchers.

## Key Decision

Keep:

- WorkspaceShellV2
- Dispatch Workspace
- Broker Workspace
- Carrier Workspace
- Driver Workspace
- Developer Workspace

Build new:

- PortalShellV2
- Shipper Portal
- Broker Client Portal
- Carrier Client Portal
- Driver Client Portal

## Important Distinction

### Internal Workspaces

These are internal/operations-focused and should stay card/module based:

- `/v2/dispatch`
- `/v2/broker`
- `/v2/carrier`
- `/v2/driver`
- `/v2/developer`

### Client-Facing Portals

These should become dashboard-first customer experiences:

- `/portal/shipper`
- `/portal/broker`
- `/portal/carrier`
- `/portal/driver`

A client portal should not feel like a card launcher.

It should open directly to a dashboard with persistent left-side navigation.

## Desired Client Portal Experience

Each portal should have:

- Persistent left side panel
- Dashboard as the default landing page
- Dashboard link in the side panel
- Company logo area
- User avatar/profile area
- Notifications shortcut
- Company profile
- User profile
- Relationships / partners
- Documents
- Settings

## PortalShellV2 Goal

Create a new shell:

`src/layouts/portal/PortalShellV2.tsx`

This shell should be visually distinct from WorkspaceShellV2.

Recommended visual direction:

- Dark left sidebar
- FleetVision 365 logo/brand at top
- Portal title section
- Grouped navigation sections
- Main content dashboard area
- Top bar with user avatar/profile area
- Customer-facing feel similar to SaaS portals

## Desired Portal Navigation

### Shipper Portal

- Dashboard
- Create Load
- My Loads
- Tracking
- Brokers
- Carriers
- Documents
- Messages
- Company Profile
- Users & Roles
- Onboarding Center
- Settings

### Broker Portal

- Dashboard
- Tender Queue
- Carrier Assignments
- Active Loads
- Carrier Network
- Documents
- Messages
- Performance
- Company Profile
- Users & Roles
- Onboarding Center
- Settings

### Carrier Portal

- Dashboard
- Load Board
- Active Loads
- Driver Assignments
- Drivers
- Documents
- Safety & Compliance
- Performance
- Company Profile
- Users & Roles
- Onboarding Center
- Settings

### Driver Portal

- Dashboard
- Today's Loads
- Load History
- Messages
- Documents
- Profile
- Settings

## Main Navigation Requirement

The main application navigation currently has a Partner Portals section.

This section should include quick master-reference links to both:

### Workspaces

- Broker Workspace → `/v2/broker`
- Carrier Workspace → `/v2/carrier`
- Driver Workspace → `/v2/driver`

### Client Portals

- Shipper Portal → `/portal/shipper`
- Broker Portal → `/portal/broker`
- Carrier Portal → `/portal/carrier`
- Driver Portal → `/portal/driver`

The goal is that the main view provides fast access to both operational workspaces and customer-facing portals.

## Important Build Instruction

Do not remove the existing workspace routes.

Do not redesign WorkspaceShellV2.

Instead, introduce a separate PortalShellV2 and migrate the current portal pages into the new shell.

The existing pages can be reused:

- ClientPortalHome
- CompanyProfilePage
- UserProfilePage
- RelationshipsPage
- DocumentsPage

But the visual experience should be dashboard-first and sidebar-driven.

## Suggested Build Order

1. Create `PortalShellV2`
2. Add portal navigation config
3. Add portal dashboard pages
4. Update `/portal/shipper`, `/portal/broker`, `/portal/carrier`, `/portal/driver` routes to use PortalShellV2
5. Add Dashboard link to each portal sidebar
6. Add Company/Profile/Documents/Relationships links to each portal sidebar
7. Add portal links to the main Partner Portals navigation section
8. Build/test
9. Commit milestone

## Success Criteria

The next session is successful when:

- Workspaces remain unchanged
- Client portals open to dashboards
- Client portals use a left-side navigation panel
- Portal sidebar includes Dashboard
- Portal sidebar includes role-specific functions
- Main Partner Portals navigation includes both workspace and portal links
- Build passes
- Git status is clean after commit

## Reminder for Next Chat

Reference the uploaded ZIP/checkpoint package before making architectural decisions. It contains the milestone documents and should be treated as the historical record of the project direction.
