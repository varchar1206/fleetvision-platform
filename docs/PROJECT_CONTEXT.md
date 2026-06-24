# FleetVision 365 - Project Context

## Project Overview

FleetVision 365 is a transportation visibility and execution platform designed to manage the full operational lifecycle of planned loads, tendering, carrier assignment, dispatch visibility, ETA monitoring, driver attestations, communication logs, exceptions, GPS/location tracking, and future automated SMS/email workflows.

The current application is being built as a modular web platform with separate workflow areas for dispatch/shipper users, brokers, carriers, drivers, system visibility tools, developer testing, and mobile testing. The platform is evolving from a page-based prototype into a scalable operations platform with a reusable UI framework, centralized navigation configuration, design tokens, service layers, and test scripts.

## Purpose of the Application

FleetVision 365 exists to provide a unified workspace for transportation operations. Its purpose is to help dispatchers, brokers, carriers, and drivers coordinate load execution while keeping an audit trail of operational events and communications.

Primary goals include:

- Plan loads using store/location data.
- Auto-fill load timing fields from the Location Master.
- Track planned dispatch, commitment, travel, ETA, and status.
- Support shipper/dispatch tendering and active load workflows.
- Support broker, carrier, and driver role workflows.
- Track ETA risk using planned and operational start sources.
- Support communication associated with a load through SMS and email.
- Allow simulated SMS attestation before real AWS SMS integration.
- Eventually support live GPS, geofence, SMS, email, and automated ETA exception management.

## Target Users

Primary target users:

- Shipper / Dispatch operations users.
- Brokers managing tender queues and carrier assignments.
- Carriers accepting and managing load execution.
- Drivers receiving load instructions, checking in, and providing status attestations.
- Internal developers and testers validating platform workflows.

Future users may include:

- Store managers receiving ETA or late-load notifications.
- Admin users managing platform configuration.
- Customers or stakeholders viewing limited load visibility.

## Primary Functionality

Current and planned functional areas include:

- Daily Operations Dashboard.
- Planning screen.
- Location Master.
- Store timing auto-fill.
- Load creation, editing, publishing, tendering, and deletion.
- Selected-load planning time updates.
- Tender queue.
- Active loads.
- Completed loads.
- Exceptions.
- Performance metrics.
- Notifications.
- Event history.
- GPS/location tracking placeholder.
- Broker portal.
- Carrier load board.
- Driver load board.
- Developer portal.
- Mobile portal.
- UI V2 shell with hamburger drawer navigation.
- ETA utilities, ETA status, ETA filters, ETA color coding.
- CommunicationLog model and page.
- SMS/email communication service placeholders.
- Driver SMS attestation simulation.

# Technology Stack

## Frontend

- React.
- TypeScript.
- Vite.
- React Router.
- CSS modules through standard CSS files imported by App.css.
- Lucide React icons.
- AWS Amplify generated client for data access.

## Backend

- AWS Amplify Gen 2 backend.
- Amplify Data models defined in `amplify/data/resource.ts`.
- Generated client from `aws-amplify/data`.
- Future Lambda/API functions planned for outbound SMS/email and inbound SMS processing.

## Database

The data layer is managed through Amplify Data. The underlying implementation is AWS-managed, likely AppSync/DynamoDB based on Amplify Gen 2 patterns.

Current known models include:

- Load.
- DispatchWindow.
- Trip.
- LoadEvent.
- Notification.
- CommunicationLog.
- LoadException.
- Broker.
- Carrier.
- Driver.
- DriverLocation.
- Location.

## Authentication and Authorization

Current development authorization uses public API key authorization in the Amplify data models. This is acceptable for early prototype/testing but is not production-ready.

Future authentication should include:

- User authentication through AWS Cognito or equivalent.
- Role-based access control for Shipper, Broker, Carrier, Driver, Admin, and Developer roles.
- Protected routes by role.
- Restricted model access by user role and organization.

## External Services

Planned AWS services:

- AWS End User Messaging SMS for SMS sending and two-way inbound SMS replies.
- Amazon SES for email sending.
- AWS Lambda for outbound communication processing and inbound SMS webhook processing.
- AWS Amplify Hosting for deployment.
- Route 53/custom domain integration for `fleetvision365.com`.

Current external services/libraries:

- AWS Amplify.
- React Router.
- Lucide React.
- Vite.

## APIs

Current API access is through the generated Amplify Data client:

```ts
const client = generateClient<Schema>();
```

Common model operations:

```ts
client.models.Load.list();
client.models.Load.create({...});
client.models.Load.update({...});
client.models.CommunicationLog.create({...});
client.models.LoadEvent.create({...});
```

Future APIs should include:

- `sendSmsForLoad` backend function.
- `sendEmailForLoad` backend function.
- inbound SMS handler function.
- ETA recalculation service endpoint/function.
- notification dispatcher function.

## Deployment Strategy

Current deployment:

- Source code pushed to GitHub main branch.
- AWS Amplify Hosting builds and deploys from GitHub.
- Custom domain `fleetvision365.com` and `www.fleetvision365.com` connected to Amplify.
- HashRouter is currently used to avoid browser-route/deep-link issues on Amplify/custom domain.

Important routing decision:

- The application was changed from `BrowserRouter` to `HashRouter` after deployed deep links and custom-domain routes produced blank pages caused by module script loading/routing behavior.
- Verified working live routes include:
  - `https://www.fleetvision365.com/`
  - `https://www.fleetvision365.com/#/v2`
  - `https://www.fleetvision365.com/#/communications`
  - `https://www.fleetvision365.com/#/driver-attestation-test`

## Development Workflow

Preferred workflow:

1. Make small, focused changes.
2. Run `npm run build`.
3. Commit with a clear message.
4. Push to GitHub.
5. Let Amplify deploy.
6. Test live route if needed.

The user prefers:

- Short terminal commands that can be copied and pasted.
- Small patches instead of large rewrites.
- Small files and modular code instead of 500-1000 line files.
- Clear checkpoints.
- Avoiding unnecessary health checks after every small commit because deployment/build costs can add up.
- Health check scripts are useful for maintenance and release validation, not every push.

# Current Status

## Completed Features

### Location and Planning Foundation

- Location Master model and page.
- Location import tools.
- Location grid/form support.
- Planning store dropdown connected to locations.
- Selected store details displayed in Planning.
- Store data auto-filled onto loads:
  - storeName.
  - commitmentTime.
  - plannedTravelTime.
- Planning table displays store timing fields.
- Selected load planning time update tools.
- Ability to update dispatch time, commitment time, and travel time for selected loads.

### Load Planning and Operations

- Load creation.
- Load edit/delete.
- Bulk/selected actions for loads.
- Publish selected loads.
- Send selected loads to tender queue.
- Delete selected draft loads.
- Total planned cost metrics.
- Search/filter support in Planning.
- ETA filters added to Planning and Active Loads.

### ETA V1

- ETA utility functions.
- ETA summary builder.
- ETA comparison to commitment.
- ETA status counts.
- ETA color coding.
- ETA filters:
  - All.
  - On Time.
  - At Risk.
  - Late.
  - Unknown.
- ETA source visibility.
- Driver check-in/SMS check-in framework started.
- `etaStartSource = SMS_CHECK_IN` proven through simulated attestation flow.

### Dashboard and Active Loads

- Daily Operations Dashboard.
- Daily Metrics.
- Daily Activity Grid.
- Active Loads page.
- Active Load metrics.
- Active Load grid.
- ETA display in Active Loads.
- ETA source display in Active Loads.

### UI V2 Foundation

- V2 app shell.
- Top bar.
- Hamburger button.
- Drawer sidebar.
- Sidebar hidden by default.
- Full-width workspace.
- Navigation config in `src/config/navigation.ts`.
- Design tokens in `src/styles/tokens.css`.
- Reusable button styles in `src/styles/buttons.css`.
- V2 layout CSS in `src/styles/layout-v2.css`.
- Navigation components:
  - `HamburgerButton.tsx`.
  - `NavigationDrawer.tsx`.
- Lucide icons added.
- Expandable navigation groups.
- Drawer hover polish.
- V2 developer portal page.
- V2 Planning route added for testing.
- HashRouter adopted for Amplify/custom-domain route stability.

### Developer and Mobile Portals

- Developer Portal.
- Mobile Portal.
- `/mobile` route provides large button access for mobile testing.
- `/developer` route provides developer quick links.
- `/v2/developer` added to test Developer Portal inside the V2 shell.

### Communication Framework

- CommunicationLog model added.
- Amplify outputs regenerated.
- Communication Log page added.
- Communication Log filters:
  - channel.
  - direction.
  - status.
- Communication metrics:
  - total messages.
  - SMS.
  - email.
  - inbound.
  - outbound.
  - pending.
- Service layer created:
  - `createCommunicationLog.ts`.
  - `sendSmsForLoad.ts` placeholder.
  - `sendEmailForLoad.ts` placeholder.
  - `processDriverAttestation.ts`.
- Communication test seed script.
- Driver attestation test page.
- Terminal test script for end-to-end driver attestation flow.

### Driver Attestation Simulation

Proven end-to-end simulated flow:

```text
Driver SMS reply: ENROUTE
    ↓
CommunicationLog created
    ↓
LoadEvent created
    ↓
Load status updated to IN_TRANSIT
    ↓
etaStartSource updated to SMS_CHECK_IN
    ↓
etaStartTime set
```

## Features in Progress

- Communication Details Panel.
- Load Communication History by loadId.
- Outbound SMS/email simulation from a load.
- Broker portal completion.
- Driver portal completion.
- V2 shell validation on all real pages.

## Planned Features

- AWS End User Messaging SMS integration.
- Amazon SES integration.
- Inbound SMS Lambda/webhook handler.
- Match inbound SMS replies to loads.
- Automated ETA source hierarchy:
  1. GPS/geofence departure.
  2. Driver check-in.
  3. SMS check-in.
  4. Default +30 fallback.
- Map-based GPS tracking page.
- Geofence detection.
- Driver location tracking.
- Broker notifications.
- Carrier notifications.
- Driver notifications.
- Load communication history component.
- On-time delivery analytics.
- Actual arrival/delivery/return-to-warehouse lifecycle tracking in a later phase.
- Authentication/authorization hardening.
- Code splitting to reduce large bundle warning.

# Coding Standards

## Component Conventions

- Keep components small and focused.
- Avoid creating large 500-1000 line files.
- Prefer one page-level component plus smaller reusable child components.
- Shared navigation components belong in `src/components/navigation`.
- Shared planning components belong in `src/components/planning`.
- Shared active load components belong in `src/components/active`.
- Page-level route components belong in `src/pages/<domain>`.

## Naming Conventions

- React components use PascalCase.
- Service functions use camelCase.
- Model names use PascalCase.
- Files for components use PascalCase.
- Files for services use camelCase.
- Status strings use uppercase snake case where already established:
  - `DRAFT`.
  - `DISPATCHED`.
  - `IN_TRANSIT`.
  - `SMS_CHECK_IN`.
  - `ON_TIME`.
  - `AT_RISK`.
  - `LATE`.

## Folder Structure Conventions

Current important folders:

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

## State Management Rules

- Local component state with React `useState` is currently used.
- Data loading uses `useEffect` and Amplify generated client calls.
- No global state library has been introduced.
- Keep state close to the page/component that uses it unless a shared service is clearly needed.

## API Conventions

- Use Amplify generated client from `aws-amplify/data`.
- Keep direct model calls out of deeply nested UI components where possible.
- Prefer service wrappers for domain workflows such as communication and attestation.
- Service functions should be small and independently testable.

Example service pattern:

```ts
export async function sendSmsForLoad(input: SmsInput) {
  return createCommunicationLog({ ... });
}
```

## CSS and UI Standards

- Use design tokens from `src/styles/tokens.css`.
- Use reusable button classes from `src/styles/buttons.css`.
- Use V2 layout classes from `src/styles/layout-v2.css`.
- Avoid scattering hardcoded colors, spacing, shadows, and font sizes across components.
- Future visual changes should be made through tokens when possible.

# Known Issues

## Current Bugs / Issues

- Production custom-domain/browser routing originally caused blank screens on deep links. This was mitigated by switching to HashRouter.
- Large Vite bundle warning appears during build. Build succeeds, but future code splitting is recommended.
- Authentication is not production-ready; public API key authorization is being used.
- Real AWS SMS and SES are not yet connected.
- Carrier and Driver portals are not fully built.
- Mobile portal exists, but real workflow pages still need mobile-specific validation or mobile-first views.
- Some older top-navigation layouts still exist alongside V2 shell.

## Technical Debt

- App has both old layouts and V2 shell; migration plan is incomplete.
- Need consistent route strategy for old routes vs V2 routes now that HashRouter is active.
- Need environment-specific handling for test scripts and seed data.
- Need better production-grade auth and role access.
- Need model relationship definitions if future querying requires joins/relations.
- Need better error handling in services and pages.
- Need loading and empty-state UI standardization.

## Areas Needing Improvement

- Communication Details Panel.
- Load Communication History by loadId.
- Broker/Carrier/Driver pages.
- V2 visual polish and page migration.
- Mobile-first workflow pages.
- SMS/email backend functions.
- Inbound SMS matching logic.
- Geofence/GPS architecture.

# Current Priorities

Recommended next work:

1. Add Communication Details Panel.
2. Add Load Communication History by loadId.
3. Add outbound SMS/email simulation from a load.
4. Complete Driver and Broker dashboard/page flows enough to test full communication cycle.
5. Connect AWS SES for email.
6. Connect AWS End User Messaging SMS for SMS.
7. Add inbound SMS handler/Lambda.
8. Add SMS reply matching to load.
9. Continue V2 shell validation and migration.
10. Later: GPS/geofence integration.

