# FleetVision 365 Development Log

This log summarizes major development milestones, design decisions, bug fixes, refactors, and lessons learned. It is intended to preserve project memory for future development sessions and AI coding assistants.

# Major Milestones

## Foundation: Transportation Operations Prototype

FleetVision began as a transportation visibility and execution platform focused on planning, dispatch, tendering, active load tracking, broker/carrier/driver workflows, and visibility tools.

Early structure included:

- Shipper layout.
- Broker layout.
- Planning page.
- Tender Queue.
- Active Loads.
- Completed Loads.
- Exceptions.
- Performance.
- Notifications.
- Events.
- GPS/Location Tracking.
- Location Master.
- Broker pages.
- Carrier load board.
- Driver load board.

The app uses React, TypeScript, Vite, AWS Amplify, Amplify Data models, and Amplify Hosting.

## Location Master Milestone

A Location Master domain was added to support store data management.

Completed:

- Location model.
- Location Master page.
- Location form/grid components.
- Location import tools.
- Location data includes store number, location name, address, commitment time, and one-way travel time.

Important decision:

- Location Master became the source for store timing fields used in Planning.

## Planning Store Integration Milestone

Planning was connected to Location Master.

Completed:

- Store dropdown populated from locations.
- Selected store panel shown in Planning.
- Load creation copies store-related fields from Location:
  - `storeName`.
  - `commitmentTime`.
  - `plannedTravelTime`.
- Planning table displays store name, commitment time, and travel time.

Important decision:

- Store timing data is copied onto the Load at creation time so each load preserves the planning state used at creation.

## Planner Override Tools Milestone

Planner override tools were added for selected loads.

Completed:

- Selected load IDs tracked.
- User can select one or multiple loads.
- User can update selected loads with:
  - dispatch time.
  - commitment time.
  - planned travel time.
- The user clarified that “bulk” was a figure of speech; the feature should be action-based rather than over-classified as bulk.

Important lesson:

- Use clear business terms and avoid imposing terminology the user did not intend.

## ETA Engine V1 Milestone

ETA utilities and UI display were built.

Completed:

- Travel time parsing utility.
- ETA calculation utility.
- ETA vs commitment comparison utility.
- ETA summary builder.
- ETA status count utility.
- ETA cell component.
- ETA status display.
- ETA color coding:
  - ON_TIME.
  - AT_RISK.
  - LATE.
  - UNKNOWN.
- ETA filters added to Active Loads.
- ETA filters added to Planning.

Important decision:

- Do not prematurely wire default +30 fallback into load creation. Default +30 is a fallback decision, not a load creation event.

## ETA Source Framework Milestone

ETA start source fields and source visibility were introduced.

Supported/target ETA sources:

```text
GEOFENCE_DEPARTURE
DRIVER_CHECK_IN
SMS_CHECK_IN
DEFAULT_30_MINUTES
PLANNED
```

Current proven operational source:

```text
SMS_CHECK_IN
```

Important decision:

- GPS/geofence and SMS should drive ETA source hierarchy later.
- Delivery, return-to-warehouse, and actual completion milestones are separate from ETA start and should be handled in a later Load Lifecycle Tracking phase.

## ETA Test Data Milestone

Seed scripts were used to create ETA test loads.

Completed:

- ETA seed script created.
- Duplicate seed data was generated initially.
- Script was revised to be idempotent by deleting previous seed records before creating new ones.

Lesson learned:

- Seed scripts should be idempotent to avoid duplicate test data.

## Dashboard and Active Loads Milestone

Dashboard and Active Loads were improved.

Completed:

- Daily Operations Dashboard.
- Daily Metrics.
- Daily Activity Grid.
- Active Loads grid.
- Active metrics.
- ETA shown in Active Loads.
- ETA source shown in Active Loads.
- Communication and ETA-related data became visible in operational pages.

## Developer Portal Milestone

A Developer Portal was added for quick testing.

Completed:

- `/developer` page.
- Quick links to dispatch, planning, active loads, broker, carrier, driver, notifications, events, GPS, locations, and mobile portal.
- Developer portal was later compacted because initial cards were too large.
- A developer-specific full-width override was added.

Important lesson:

- Developer tools should be compact launchpads, not dashboard-style pages.

## Mobile Portal Milestone

A separate Mobile Portal was added.

Completed:

- `/mobile` route.
- Large mobile-friendly buttons.
- Links to major workflows.

Important decision:

- Do not force all desktop pages to be mobile-friendly at once.
- Build mobile-specific views gradually.

## UI V2 Milestone

The user evaluated multiple UI design references. A V2 shell was created to support a more professional enterprise platform layout.

Completed:

- `AppShellV2`.
- Top bar.
- Hamburger button.
- Drawer sidebar.
- Sidebar hidden by default.
- Full-width workspace.
- Navigation groups.
- Icons.
- Expandable groups.
- Drawer hover polish.

Important design decision:

- The user preferred hamburger/drawer navigation always available, with sidebar hidden by default to maximize screen workspace.
- Desktop should not permanently consume horizontal space with a fixed sidebar.

## Design System Milestone

Design tokens and reusable style files were created.

Completed:

```text
src/config/navigation.ts
src/styles/tokens.css
src/styles/buttons.css
src/styles/layout-v2.css
```

Important decision:

- Separate button labels/routes from button appearance and behavior.
- Future color, spacing, typography, and shadow changes should be made through tokens.
- Reusable styles reduce future maintenance burden.

## Navigation Config Milestone

Navigation was centralized in `src/config/navigation.ts`.

Completed groups:

- Workspace.
- Dispatch.
- Partner Portals.
- Visibility.

Important decision:

- Labels can be changed without touching route control logic or styling.
- Icons are configured through navigation metadata.

## Lucide Icon Milestone

Lucide React was installed and icons were wired into NavigationDrawer.

Completed:

- Icons added to navigation items.
- Icons rendered in drawer links.
- Icon alignment styling added.

## Expandable Navigation Milestone

Navigation groups became expandable.

Completed:

- `openGroups` state in NavigationDrawer.
- Toggle groups with chevron icons.
- Default open groups include Workspace and Dispatch.

## V2 Route Migration Milestone

A limited V2 route migration began.

Completed:

- `/v2` shell route.
- `/v2/developer` route.
- `/v2/planning` route.

Decision:

- Pause migrating more pages into V2 until real visual testing confirms the shell feels right.

## Production Blank Screen Bug

After deploying the custom domain, the site displayed a blank screen.

Symptoms:

- Browser showed module script MIME type errors.
- Deep routes like `/v2` returned routing issues.
- Initial suspicion included rewrite rules, missing assets, and Vite base path.

Diagnostics performed:

- Tested custom domain root.
- Tested custom domain asset URLs.
- Tested Amplify root.
- Tested Amplify assets.
- Confirmed JS assets served with correct content type.
- Confirmed local dev server worked.

Resolution:

- Switched from BrowserRouter to HashRouter.

Verified working live routes:

```text
https://www.fleetvision365.com/
https://www.fleetvision365.com/#/v2
https://www.fleetvision365.com/#/communications
https://www.fleetvision365.com/#/driver-attestation-test
```

Lesson learned:

- For Amplify/custom-domain hosting, HashRouter is a practical short-term fix for client-side routing problems.

## CommunicationLog Model Milestone

The communication foundation was added.

Completed:

- CommunicationLog model in Amplify data resource.
- Amplify outputs regenerated.
- Model verified with `scripts/checkModels.mjs`.

Fields include:

- loadId.
- direction.
- channel.
- recipientName.
- recipientContact.
- subject.
- message.
- status.
- provider.
- providerMessageId.
- relatedEventType.
- receivedAt.
- sentAt.
- createdAt.

Important decision:

- CommunicationLog is separate from Notification.
- CommunicationLog is the audit trail for inbound/outbound SMS and email records tied to loads.

## Communication Log Page Milestone

A Communication Log page was added.

Completed:

- `/communications` route.
- CommunicationLog records listed.
- Filters added:
  - channel.
  - direction.
  - status.
- Metrics added:
  - total messages.
  - SMS.
  - email.
  - inbound.
  - outbound.
  - pending.

## Communication Service Layer Milestone

A service layer was created for communication logic.

Completed:

```text
src/services/communications/
├── createCommunicationLog.ts
├── sendSmsForLoad.ts
├── sendEmailForLoad.ts
└── processDriverAttestation.ts
```

Important decision:

- UI pages should not directly own AWS communication logic.
- Pages should call services.
- Services can later be connected to AWS SMS/SES without rewriting page code.

## SMS and Email Placeholder Services Milestone

Placeholder communication services were created.

Completed:

- `sendSmsForLoad` creates a pending outbound SMS CommunicationLog record.
- `sendEmailForLoad` creates a pending outbound email CommunicationLog record.

Important decision:

- Do not connect AWS SMS/SES until the data flow and UI are proven with simulation.

## Communication Test Data Milestone

A seed script was added for CommunicationLog test records.

Completed:

- `scripts/seedCommunicationTestData.mjs`.
- Creates examples of:
  - SMS PENDING.
  - SMS SENT.
  - SMS RECEIVED.
  - EMAIL SENT.
  - EMAIL PENDING.

Issue encountered:

- Initial run failed because `CommunicationLog` did not appear in generated outputs.

Fix:

- Regenerated Amplify outputs.
- Verified model list included `CommunicationLog`.
- Reran script successfully.

## Driver Attestation Simulation Milestone

Driver attestation simulation was built and proven.

Completed:

- `processDriverAttestation.ts`.
- `DriverAttestationTestPage.tsx`.
- `/driver-attestation-test` route.
- `scripts/testDriverAttestationFlow.mjs`.

Supported simulated messages:

```text
ENROUTE
ARRIVED
DELAYED
```

Proven full chain:

```text
ENROUTE
    ↓
CommunicationLog created
    ↓
LoadEvent created
    ↓
Load updated to IN_TRANSIT
    ↓
etaStartSource = SMS_CHECK_IN
    ↓
etaStartTime set
```

Important result:

- This is the core future AWS SMS workflow simulated successfully before adding AWS SMS.

# Important Design Decisions

## Keep Changes Small

The user strongly prefers:

- Small commits.
- Small files.
- Copy/paste terminal patches.
- Avoiding large risky rewrites.
- Phased development.

## Do Not Overbuild Prematurely

Several items were intentionally deferred:

- Actual arrival time.
- Actual delivery time.
- Return-to-warehouse tracking.
- Default +30 fallback wiring.
- GPS/geofence.
- Full SMS integration.

Reason:

- These belong to later phases after the ETA and communication foundation are stable.

## Use Simulation Before Real Integrations

For SMS/email:

- Build model.
- Build page.
- Build service placeholders.
- Build seed data.
- Build simulation.
- Prove flow.
- Then connect AWS.

This approach worked successfully for driver SMS attestation.

## Use HashRouter for Now

HashRouter was adopted to stabilize production routing with Amplify/custom domain.

Future cleanup may restore BrowserRouter if hosting rewrites are fully solved.

## Separate Configuration, Style, and Behavior

Implemented separation:

```text
navigation.ts      labels/routes/icons
buttons.css        button appearance
tokens.css         colors, typography, spacing, shadows
layout-v2.css      structure and layout behavior
```

# Significant Bug Fixes

## Duplicate ETA Seed Data

Problem:

- ETA seed script generated duplicates.

Resolution:

- Made seed script idempotent by deleting previous SEED records before recreating test loads.

## Planning Bulk/Selected Update Function Errors

Problem:

- Earlier attempts inserted functions outside component scope or used unintended naming.

Resolution:

- Repaired selected-load update logic and kept naming aligned with business intent.

## Deployment Blank Screen

Problem:

- Live site blank on custom domain/deep routes.

Resolution:

- Diagnosed asset and routing behavior.
- Switched to HashRouter.
- Verified working routes.

## CommunicationLog Missing in Generated Client

Problem:

- Script failed because `client.models.CommunicationLog` was undefined.

Resolution:

- Regenerated Amplify outputs.
- Verified model list included `CommunicationLog`.

## Attestation Partial Chain

Problem:

- CommunicationLog and LoadEvent were created, but initial manual script did not update Load.

Resolution:

- Direct update test confirmed Load.update worked.
- Created full `testDriverAttestationFlow.mjs` to validate complete chain.

# Refactoring Efforts

## UI Refactor

- Moved toward V2 shell instead of continuing to patch legacy layout.
- Introduced navigation components.
- Introduced design tokens.
- Introduced reusable button and layout CSS.

## Communication Refactor

- Created service layer for communications.
- Avoided embedding SMS/email logic directly into pages.

## Navigation Refactor

- Centralized navigation in `src/config/navigation.ts`.
- Added icons and groups to config.

# Lessons Learned

1. Seed scripts should be idempotent.
2. Simulate integration workflows before connecting real providers.
3. Health checks are useful for maintenance, not every commit.
4. Custom-domain/deep-link routing can create blank screens even when assets are valid.
5. HashRouter is a practical workaround for Amplify SPA hosting issues.
6. UI redesign should be phased, not done in one large CSS rewrite.
7. Developer/mobile portals are useful for testing without disrupting production routes.
8. CommunicationLog should be treated as an operational audit trail, separate from Notification.
9. Driver attestation is core to ETA source hierarchy and can be proven before geofence/SMS integration.
10. Keep project memory in Markdown files to make future AI-assisted sessions easier.

# Current Stopping Point

The latest stable point includes:

- Working live site using HashRouter.
- V2 shell foundation.
- ETA V1 complete.
- Communication framework mostly complete.
- Simulated driver attestation proven.

Next recommended task:

```text
Add Communication Details Panel
```

