# FleetVision 365 Architecture

# System Architecture

FleetVision 365 is a React + AWS Amplify application organized around transportation operations workflows. The current system uses a React/Vite frontend, Amplify Data models, a generated TypeScript client, and AWS Amplify Hosting for deployment.

The system is being built in layers:

```text
User Interface
    ↓
Page Components
    ↓
Reusable Components
    ↓
Service Layer
    ↓
Amplify Data Client
    ↓
Amplify Backend / Data Models
    ↓
AWS Managed Data Store
```

For future communication and live tracking features, the target architecture is:

```text
FleetVision UI
    ↓
Communication Service Layer
    ↓
Backend Function / Lambda
    ↓
AWS End User Messaging SMS / Amazon SES
    ↓
Inbound Event Handler
    ↓
CommunicationLog + LoadEvent + Load Updates
```

## Major Domains

```text
FleetVision 365
├── Dispatch / Shipper Operations
├── Broker Operations
├── Carrier Operations
├── Driver Operations
├── ETA Engine
├── Communication Center
├── Location Master
├── GPS / Tracking
├── Exceptions
├── Performance
├── Notifications
├── Developer Tools
└── Mobile Testing
```

# Frontend Architecture

## Frameworks and Libraries

- React.
- TypeScript.
- Vite.
- React Router using HashRouter.
- AWS Amplify generated data client.
- Lucide React icons.
- CSS files with centralized design tokens.

## Routing Structure

The app currently uses `HashRouter` in `src/App.tsx`.

This decision was made after the deployed Amplify/custom domain site showed blank screens on deep links. Hash routing avoids server-side rewrite problems by keeping client routes after `#`.

Working live routes include:

```text
https://www.fleetvision365.com/
https://www.fleetvision365.com/#/v2
https://www.fleetvision365.com/#/communications
https://www.fleetvision365.com/#/driver-attestation-test
```

Known route groups:

```text
/                         Shipper dashboard
/planning                 Planning
/tender-queue             Tender queue
/active-loads             Active loads
/completed-loads          Completed loads
/exceptions               Exceptions
/performance              Performance
/notifications            Notification center
/events                   Load event history
/gps                      Location tracking
/locations                Location master
/communications           Communication log
/driver-attestation-test  Simulated driver SMS attestation test
/developer                Developer portal
/mobile                   Mobile portal
/broker                   Broker dashboard
/broker/tenders           Broker tender queue
/broker/carrier-assignments Carrier assignments
/broker/active-loads      Broker active loads
/broker/exceptions        Broker exceptions
/broker/documents         Broker documents
/broker/performance       Broker performance
/carrier                  Carrier load board
/driver                   Driver load board
/v2                       V2 shell test home
/v2/developer             Developer portal inside V2 shell
/v2/planning              Planning page inside V2 shell
```

## Layouts

Current layouts:

```text
src/layouts/
├── ShipperLayout.tsx
├── BrokerLayout.tsx
└── v2/
    └── AppShellV2.tsx
```

### Legacy Layouts

The shipper and broker layouts use top navigation tabs. These remain functional but are expected to be gradually replaced or wrapped by V2 shell routes.

### V2 Shell

The V2 shell is the preferred future architecture. It includes:

- Top bar.
- Hamburger button.
- Drawer sidebar.
- Sidebar hidden by default.
- Expandable navigation groups.
- Icons.
- Full-width workspace.
- Design tokens and reusable layout CSS.

```text
AppShellV2
├── NavigationDrawer
│   ├── Workspace group
│   ├── Dispatch group
│   ├── Partner Portals group
│   └── Visibility group
├── HamburgerButton
└── Outlet
```

## Component Hierarchy

Representative hierarchy:

```text
App
├── HashRouter
│   └── Routes
│       ├── ShipperLayout
│       │   ├── ShipperDashboard
│       │   ├── Planning
│       │   ├── TenderQueue
│       │   ├── ActiveLoads
│       │   └── ...
│       ├── BrokerLayout
│       │   ├── BrokerDashboard
│       │   ├── BrokerTenderQueue
│       │   └── ...
│       ├── AppShellV2
│       │   ├── V2Home
│       │   ├── V2DeveloperPortal
│       │   └── Planning
│       ├── DeveloperPortal
│       ├── MobilePortal
│       ├── CommunicationLogPage
│       └── DriverAttestationTestPage
```

## State Management

Current state management:

- React local state via `useState`.
- Data load lifecycle via `useEffect`.
- No Redux/Zustand/Context state architecture currently.

Pattern example:

```ts
const [loads, setLoads] = useState<LoadRecord[]>([]);
const [isLoading, setIsLoading] = useState(true);

async function loadRecords() {
  setIsLoading(true);
  const result = await client.models.Load.list();
  setLoads(result.data);
  setIsLoading(false);
}

useEffect(() => {
  loadRecords();
}, []);
```

## Hooks

Current code primarily uses React built-in hooks:

- `useState`.
- `useEffect`.

No custom hook convention has been established yet. Future candidates:

- `useLoads`.
- `useCommunicationLogs`.
- `useEtaSummary`.
- `useLocations`.

## Services

Service layer currently exists for communications:

```text
src/services/communications/
├── createCommunicationLog.ts
├── sendSmsForLoad.ts
├── sendEmailForLoad.ts
└── processDriverAttestation.ts
```

Purpose:

- Keep business workflows out of UI pages.
- Provide a future insertion point for AWS SMS/SES.
- Keep communication workflows independently testable.

## Utilities

ETA utilities live in:

```text
src/utils/eta/
```

Known ETA utility concepts:

- Travel time parsing.
- ETA calculation.
- Compare ETA to commitment.
- Build ETA summary.
- Get ETA status counts.
- Default ETA start helper was discussed but should not be prematurely wired into load creation.

# Backend Architecture

## Current Backend

The backend is Amplify Gen 2 data models. The app accesses models through the generated client.

Model definitions live in:

```text
amplify/data/resource.ts
```

Amplify outputs are generated into:

```text
amplify_outputs.json
```

Generation command used:

```bash
npx ampx generate outputs --app-id d15jwy9jbf4pv5 --branch main
```

## Planned Backend Functions

Future backend services should be introduced as small functions/modules:

```text
Outbound SMS function
Outbound Email function
Inbound SMS handler
ETA recalculation function
Notification dispatcher
Geofence processor
```

## API Structure

Current API access pattern:

```ts
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();
```

Common operations:

```ts
client.models.Load.list();
client.models.Load.create({...});
client.models.Load.update({...});
client.models.LoadEvent.create({...});
client.models.CommunicationLog.create({...});
```

## Controllers

There are no formal controller files yet. Page components and service files perform orchestration.

Future controller/function boundaries should be introduced when AWS Lambda/API logic is added.

## Services

Communication services are the first explicit service layer.

### createCommunicationLog

Creates a CommunicationLog record.

### sendSmsForLoad

Currently placeholder only. It creates an outbound SMS CommunicationLog record with `status = PENDING` and provider `AWS_END_USER_MESSAGING_SMS`.

### sendEmailForLoad

Currently placeholder only. It creates an outbound EMAIL CommunicationLog record with `status = PENDING` and provider `AWS_SES`.

### processDriverAttestation

Simulates processing inbound SMS replies and currently:

- Normalizes the message.
- Maps messages to event types.
- Creates CommunicationLog.
- Creates LoadEvent.
- Updates Load status.
- For ENROUTE, sets:
  - `etaStartTime`.
  - `etaStartSource = SMS_CHECK_IN`.

Supported simulated messages:

```text
ENROUTE → SMS_ENROUTE → IN_TRANSIT + SMS_CHECK_IN
ARRIVED → SMS_ARRIVED → ARRIVED_AT_DELIVERY
DELAYED → SMS_DELAYED → event only
```

# Database Architecture

## Important Entities

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

The central operational entity. Known fields include:

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
createdAt
updatedAt
```

Important statuses used:

```text
DRAFT
PUBLISHED
READY_TO_TENDER
TENDERED
ACCEPTED
ASSIGNED_TO_CARRIER
CARRIER_ACCEPTED
ASSIGNED_TO_DRIVER
DISPATCHED
IN_TRANSIT
ARRIVED_AT_DELIVERY
DELIVERED
```

## Location

Used as a master source for store planning data.

Known fields include:

```text
storeNumber
locationName
streetAddress
city
state
commitmentTime
oneWayTravelTime
```

Planning uses Location data to populate Load fields:

```text
storeName ← locationName
commitmentTime ← commitmentTime
plannedTravelTime ← oneWayTravelTime
```

## LoadEvent

Audit trail of load activity.

Known fields include:

```text
id
loadId
eventType
eventTime
eventSource
userId
notes
delayPhase
delayReason
delayMinutes
updatedEta
dockNumber
trailerNumber
latitude
longitude
createdAt
updatedAt
```

Used by driver attestation simulation:

```text
SMS_ENROUTE
SMS_ARRIVED
SMS_DELAYED
DRIVER_SMS_ATTESTATION
```

## CommunicationLog

Tracks outbound and inbound communication tied to a load.

Fields:

```text
id
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
updatedAt
```

Expected values:

```text
direction: INBOUND | OUTBOUND
channel: SMS | EMAIL
status: PENDING | SENT | RECEIVED | FAILED
provider: AWS_END_USER_MESSAGING_SMS | AWS_SES | SIMULATED_SMS
```

## Notification

Used for platform notifications. Separate from CommunicationLog.

Known fields:

```text
loadId
eventType
audience
title
message
channel
status
createdAt
readAt
```

## LoadException

Tracks operational exceptions.

Known fields include:

```text
loadId
exceptionType
priority
status
delayPhase
```

## Relationships

Current relationships are primarily logical through `loadId` string fields rather than enforced relational joins.

```text
Load
├── LoadEvent[] by loadId
├── CommunicationLog[] by loadId
├── Notification[] by loadId
└── LoadException[] by loadId
```

Potential future model improvements:

- Define formal Amplify relationships if needed.
- Add indexes by `loadId`, `status`, `dispatchDate`, and `channel` for efficient querying.
- Add organization/tenant ownership fields.

# Authentication Flow

## Current Login Process

No full login process has been finalized in the current project context.

Development currently relies on Amplify public API key authorization in model definitions.

## Current Authorization Process

Many models use:

```ts
.authorization((allow) => [allow.publicApiKey()])
```

This is not production-ready.

## Protected Routes

Protected routes are not implemented yet.

Future protected route requirements:

```text
Shipper users → shipper/dispatch pages
Broker users → broker portal
Carrier users → carrier portal
Driver users → driver portal
Admin users → admin/configuration pages
Developer users → developer/test pages
```

## Future Authentication Architecture

Recommended future stack:

```text
AWS Cognito
    ↓
Role claims / groups
    ↓
Route guards
    ↓
Model authorization rules
    ↓
Tenant/org filtering
```

# Data Flow

## Load Creation Flow

```text
User selects store in Planning
    ↓
Planning finds selected Location
    ↓
Load.create
    ↓
storeName, commitmentTime, plannedTravelTime are copied from Location
    ↓
Load status = DRAFT
    ↓
Planning list reloads
```

## Selected Load Time Update Flow

```text
User selects one or more loads
    ↓
User enters dispatch/commitment/travel override
    ↓
client.models.Load.update for each selected load
    ↓
Loads reload
```

## ETA Display Flow

```text
Load dispatchDate / dispatchWindow / plannedTravelTime / commitmentTime / etaStartTime
    ↓
buildEtaSummary
    ↓
estimatedArrivalTime + etaStatus
    ↓
PlanningEtaCell displays status
    ↓
Color class applied
```

## Communication Log Flow

```text
Communication action or seed script
    ↓
createCommunicationLog service or direct model create
    ↓
CommunicationLog record stored
    ↓
CommunicationLogPage loads records
    ↓
Metrics and filters display records
```

## Simulated Driver Attestation Flow

```text
DriverAttestationTestPage or terminal script
    ↓
processDriverAttestation / testDriverAttestationFlow
    ↓
Normalize message
    ↓
Create CommunicationLog
    ↓
Create LoadEvent
    ↓
Update Load status
    ↓
If ENROUTE:
      etaStartTime = now
      etaStartSource = SMS_CHECK_IN
```

## Future AWS SMS Flow

```text
Dispatcher sends SMS request for load
    ↓
sendSmsForLoad service
    ↓
Backend Lambda calls AWS End User Messaging SMS
    ↓
CommunicationLog status updated to SENT
    ↓
Driver replies ENROUTE / ARRIVED / DELAYED
    ↓
Inbound SMS handler receives reply
    ↓
Match phone/reply/load token to Load
    ↓
processDriverAttestation
    ↓
LoadEvent + CommunicationLog + Load update
```

## Future Email Flow

```text
System sends broker/carrier/store email
    ↓
sendEmailForLoad service
    ↓
Backend Lambda calls Amazon SES
    ↓
CommunicationLog updated with providerMessageId and SENT/FAILED
```

# Architecture Diagrams

## High-Level Platform

```text
                 ┌─────────────────────┐
                 │   FleetVision UI     │
                 │ React + Vite + TS    │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Amplify Data Client  │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Amplify Backend      │
                 │ Data Models          │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ AWS Managed Storage  │
                 └─────────────────────┘
```

## Communication Architecture

```text
Outbound Request
    ↓
sendSmsForLoad / sendEmailForLoad
    ↓
CommunicationLog PENDING
    ↓
Future AWS provider call
    ↓
CommunicationLog SENT / FAILED
```

```text
Inbound SMS Reply
    ↓
Inbound SMS Handler
    ↓
processDriverAttestation
    ↓
CommunicationLog RECEIVED
    ↓
LoadEvent created
    ↓
Load updated
    ↓
ETA source updated
```

## V2 UI Architecture

```text
AppShellV2
├── Header
│   └── HamburgerButton
├── NavigationDrawer
│   ├── Workspace
│   ├── Dispatch
│   ├── Partner Portals
│   └── Visibility
└── Content Outlet
```

# Deployment Architecture

```text
GitHub main branch
    ↓
AWS Amplify Hosting
    ↓
Vite production build
    ↓
CloudFront/S3 hosting
    ↓
Custom domain fleetvision365.com
```

HashRouter is currently used to stabilize routing:

```text
https://www.fleetvision365.com/#/v2
```

# Operational Scripts

Known scripts:

```text
scripts/checkModels.mjs
scripts/seedEtaTestData.mjs
scripts/seedCommunicationTestData.mjs
scripts/testDriverAttestationFlow.mjs
scripts/ui-health-check.sh
```

Purpose:

- `checkModels.mjs` verifies available Amplify models.
- `seedEtaTestData.mjs` creates/reset ETA test loads.
- `seedCommunicationTestData.mjs` creates sample CommunicationLog records.
- `testDriverAttestationFlow.mjs` tests simulated inbound SMS workflow end-to-end.
- `ui-health-check.sh` is for maintenance/release checks, not every commit.

