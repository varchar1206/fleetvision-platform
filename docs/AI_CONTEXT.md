# FleetVision 365 AI Context

Use this document to quickly onboard a new AI coding assistant to the FleetVision 365 project.

# Project Summary

FleetVision 365 is a transportation visibility and execution platform being built with React, TypeScript, Vite, and AWS Amplify. The platform manages load planning, dispatch visibility, tendering, active loads, ETA tracking, communication logs, driver SMS attestations, broker/carrier/driver workflows, GPS/location tracking, and future AWS SMS/email integrations.

The user prefers small, safe, copy/paste terminal patches and strongly dislikes large monolithic files or broad risky rewrites. Development should proceed in small phases with frequent `npm run build` checks and clear git commits.

# Tech Stack

## Frontend

- React.
- TypeScript.
- Vite.
- React Router using HashRouter.
- Lucide React icons.
- Standard CSS files.
- Central design tokens.

## Backend/Data

- AWS Amplify Gen 2.
- Amplify Data models in `amplify/data/resource.ts`.
- Generated client from `aws-amplify/data`.
- `amplify_outputs.json` generated with `npx ampx generate outputs`.

## Deployment

- GitHub main branch.
- AWS Amplify Hosting.
- Custom domain: `fleetvision365.com` / `www.fleetvision365.com`.
- HashRouter is currently required for stable deployed routing.

## Planned Services

- AWS End User Messaging SMS.
- Amazon SES.
- AWS Lambda for outbound/inbound communication processing.
- Future GPS/geofence processing.

# Current Architecture

## Important Folders

```text
src/
├── components/
│   ├── active/
│   ├── dashboard/
│   ├── locations/
│   ├── navigation/
│   └── planning/
├── config/
│   └── navigation.ts
├── layouts/
│   ├── ShipperLayout.tsx
│   ├── BrokerLayout.tsx
│   └── v2/
│       └── AppShellV2.tsx
├── pages/
│   ├── broker/
│   ├── carrier/
│   ├── communications/
│   ├── developer/
│   ├── driver/
│   ├── events/
│   ├── gps/
│   ├── locations/
│   ├── mobile/
│   ├── notifications/
│   ├── shipper/
│   └── v2/
├── services/
│   └── communications/
├── styles/
│   ├── tokens.css
│   ├── buttons.css
│   └── layout-v2.css
└── utils/
    └── eta/
```

## V2 UI Architecture

V2 shell is the future UI direction.

Current V2 pieces:

```text
src/layouts/v2/AppShellV2.tsx
src/components/navigation/HamburgerButton.tsx
src/components/navigation/NavigationDrawer.tsx
src/config/navigation.ts
src/styles/tokens.css
src/styles/buttons.css
src/styles/layout-v2.css
```

V2 behavior:

- Top bar.
- Hamburger button.
- Drawer sidebar hidden by default.
- Expandable grouped navigation.
- Icons from Lucide React.
- Full-width workspace.

The user wants maximum screen space, so do not default desktop to permanent sidebar unless explicitly requested.

## Routing

App uses `HashRouter`.

Live route format:

```text
https://www.fleetvision365.com/#/v2
```

Do not switch back to BrowserRouter without solving Amplify deep-link hosting issues.

Known routes:

```text
/
/planning
/tender-queue
/active-loads
/completed-loads
/exceptions
/performance
/notifications
/events
/gps
/locations
/communications
/driver-attestation-test
/developer
/mobile
/broker
/carrier
/driver
/v2
/v2/developer
/v2/planning
```

# Current Data Models

Known Amplify models:

```text
Load
DispatchWindow
Trip
LoadEvent
Notification
CommunicationLog
LoadException
Broker
Carrier
Driver
DriverLocation
Location
```

## Load

Central load record. Important fields:

```text
id
storeNumber
storeName
commitmentTime
plannedTravelTime
etaStartTime
etaStartSource
estimatedArrivalTime
etaStatus
dispatchDate
dispatchWindow
activityType
equipmentType
brokerName
carrierName
tripId
rate
status
bolStatus
createdBy
notes
```

## CommunicationLog

Communication audit trail for SMS/email.

Fields:

```text
loadId
direction
channel
recipientName
recipientContact
subject
message
status
provider
providerMessageId
relatedEventType
receivedAt
sentAt
createdAt
```

## LoadEvent

Operational event audit trail tied to loadId.

# Completed Features

## ETA V1

Completed:

- ETA utilities.
- ETA status comparison.
- ETA summary.
- ETA color coding.
- ETA filters in Planning and Active Loads.
- ETA source display.
- SMS_CHECK_IN source proven through simulation.

## Planning and Location

Completed:

- Location Master.
- Store dropdown in Planning.
- Store timing auto-fill.
- Commitment/travel/dispatch override tools for selected loads.
- Planning table shows store timing fields.

## Communication Framework

Completed:

- CommunicationLog model.
- Communication Log page.
- Filters and metrics.
- Communication service layer:
  - `createCommunicationLog.ts`.
  - `sendSmsForLoad.ts`.
  - `sendEmailForLoad.ts`.
  - `processDriverAttestation.ts`.
- Communication seed script.
- Driver attestation test page.
- Terminal full-chain attestation test script.

## Driver Attestation Simulation

Proven working flow:

```text
ENROUTE
    ↓
CommunicationLog created
    ↓
LoadEvent created
    ↓
Load.status = IN_TRANSIT
    ↓
Load.etaStartSource = SMS_CHECK_IN
    ↓
Load.etaStartTime set
```

Script:

```text
scripts/testDriverAttestationFlow.mjs
```

Example command:

```bash
node scripts/testDriverAttestationFlow.mjs <loadId> ENROUTE
```

# Coding Standards

## User Preferences

The user prefers:

- Short, safe terminal commands.
- Small commits.
- Small files.
- Modular services/components.
- Avoiding large rewrites.
- Step-by-step phased development.
- Build checks with `npm run build` after changes.
- Health check scripts only for maintenance/release checks, not every commit.

## Code Style

- TypeScript.
- PascalCase for components.
- camelCase for service functions.
- Uppercase snake case for statuses and event types.
- Keep business logic in services when possible.
- Avoid putting AWS provider logic directly in UI pages.

## CSS Rules

- Use design tokens from `tokens.css`.
- Use button classes from `buttons.css`.
- Use layout rules from `layout-v2.css`.
- Avoid hardcoded colors/spacing where tokens exist.

# Current Sprint

Current objective:

```text
Complete Communication Center simulation workflow before real AWS SMS/SES integration.
```

Next best task:

```text
Add Communication Details Panel
```

Then:

```text
Load Communication History by loadId
Outbound SMS/email simulation from a load
Broker/Driver workflow completion
AWS SES integration
AWS End User Messaging SMS integration
```

# Important Rules

1. Do not wire default +30 ETA fallback into load creation. It is a fallback decision during ETA resolution, not a load creation event.
2. Do not build delivery/return-to-warehouse lifecycle now. That belongs to a later Load Lifecycle Tracking phase.
3. Do not connect AWS SMS before the simulated communication loop is complete.
4. Do not migrate all pages into V2 until the V2 shell is visually validated.
5. Do not run/commit health-check changes after every small feature; use health check for maintenance/release validation.
6. Keep terminal patches safe and copy/paste friendly.
7. Prefer new small files over large modifications.
8. If using custom domain routes, remember HashRouter is active.

# Known Issues

- Large Vite bundle warning during build.
- Public API key authorization is not production-ready.
- Real SMS/email providers are not connected.
- Carrier and Driver portals are incomplete.
- Mobile-specific real workflow pages are not complete.
- V2 migration is partial.
- Some legacy layout CSS and V2 CSS coexist.

# Current Priorities

Priority order:

```text
1. Communication Details Panel
2. Load Communication History Component
3. Outbound SMS/Email Simulation
4. Broker and Driver workflow completion
5. AWS SES Email Integration
6. AWS End User Messaging SMS Integration
7. Inbound SMS Handler
8. SMS Reply-to-Load Matching
9. ETA Source Hierarchy Finalization
10. GPS/Geofence Integration
11. Authentication and Role Authorization
12. Code Splitting / Performance Cleanup
```

# Helpful Commands

Check build:

```bash
npm run build
```

Check git state:

```bash
git status --short
```

Regenerate Amplify outputs:

```bash
npx ampx generate outputs --app-id d15jwy9jbf4pv5 --branch main
```

Check available models:

```bash
node scripts/checkModels.mjs
```

Seed communication test data:

```bash
node scripts/seedCommunicationTestData.mjs
```

Test driver attestation flow:

```bash
node scripts/testDriverAttestationFlow.mjs <loadId> ENROUTE
```

Commit pattern:

```bash
git add .
git commit -m "Clear short message"
git push
```

# Suggested Next Prompt for New AI Session

Use this prompt with a new AI assistant:

```text
I am continuing development on FleetVision 365. Read AI_CONTEXT.md first. We are currently working on the Communication Center. The next task is to add a Communication Details Panel to CommunicationLogPage.tsx, then create a LoadCommunicationHistory component. Keep changes small, give copy/paste terminal commands, and run npm run build after each change.
```

