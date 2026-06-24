# FleetVision 365 Current Sprint

# Current Objective

Build out the Communication Center and simulated driver SMS attestation workflow before connecting real AWS SMS/email services.

The immediate goal is to preserve the current stable foundation, then continue communication workflow development in small, modular phases.

Current strategic objective:

```text
Communication Center
    ↓
Driver Attestation Simulation
    ↓
Load Communication History
    ↓
Outbound SMS/Email Simulation
    ↓
Broker/Driver Flow Completion
    ↓
AWS SMS + SES Integration
```

# Current Tasks

## Task 1 - Communication Details Panel

Add a selectable details panel to `CommunicationLogPage.tsx`.

Desired behavior:

- User clicks a CommunicationLog row.
- Details panel appears.
- Details include:
  - Load ID.
  - Direction.
  - Channel.
  - Recipient.
  - Contact.
  - Status.
  - Provider.
  - Related event type.
  - Subject.
  - Full message body.
  - Created date.
- User can close the panel.

This was proposed but not yet run at the stopping point.

## Task 2 - Load Communication History

Create a reusable component to show communications for one load.

Suggested file:

```text
src/components/communications/LoadCommunicationHistory.tsx
```

Purpose:

- Given a `loadId`, display all CommunicationLog records for that load.
- Later embed this in Planning, Active Loads, Broker pages, Driver pages, or Load Details.

## Task 3 - Outbound SMS/Email Simulation from a Load

Create a test UI or action that calls:

```text
sendSmsForLoad
sendEmailForLoad
```

Current behavior:

- These service functions only create CommunicationLog records with status `PENDING`.

Goal:

- Allow user to simulate outbound messages before AWS SMS/SES integration.

## Task 4 - Broker Notification Simulation

Simulate broker notification tied to a load.

Expected record:

```text
CommunicationLog
channel = EMAIL
recipient = broker
relatedEventType = LOAD_TENDER or ETA_ALERT
status = PENDING/SENT simulation
```

## Task 5 - Driver Notification Simulation

Simulate driver SMS request tied to a load.

Expected record:

```text
CommunicationLog
channel = SMS
direction = OUTBOUND
relatedEventType = DRIVER_CHECK_IN_REQUEST
status = PENDING
```

Driver then responds through simulated attestation:

```text
ENROUTE
ARRIVED
DELAYED
```

# Blockers

## No current code blocker

As of the latest session:

- Build was passing.
- Live site loaded after HashRouter fix.
- CommunicationLog model exists.
- Driver attestation terminal test worked.

## External Integration Blockers

Real AWS communication is not connected yet.

Blocked until decisions/setup are completed for:

- AWS End User Messaging SMS origination identity/phone number/sender configuration.
- Two-way SMS inbound routing.
- Lambda/webhook design.
- Amazon SES verified sender/domain.
- Email sending policy and sandbox/production access.

## Authentication Blocker

Production security is not ready because public API key authorization is currently used.

Before production use:

- Add authentication.
- Add role authorization.
- Protect routes and models.

# Known Problems

## Large Bundle Warning

`npm run build` succeeds but Vite warns that some chunks are larger than 500 kB.

Future fix:

- Add code splitting/dynamic imports.
- Consider route-level lazy loading.

## HashRouter URLs

Routes now use hash URLs:

```text
https://www.fleetvision365.com/#/v2
```

This is acceptable short-term. It solved blank-screen/deep-link issues with Amplify/custom domain.

Future consideration:

- Return to BrowserRouter only if Amplify rewrite/static asset behavior is fully stable.

## Mobile Experience Not Complete

Mobile Portal exists, but real pages still need mobile-specific card layouts.

Recommended future approach:

- Do not force large desktop tables into mobile.
- Build mobile-specific views for key workflows.

## V2 Migration Incomplete

V2 shell exists, but most operational pages still use legacy layouts/routes.

Current V2 routes:

```text
/v2
/v2/developer
/v2/planning
```

Migration should pause until V2 is visually tested.

## Authentication Not Production-Ready

Public API key authorization is still used in model definitions.

## AWS SMS/Email Not Connected

Communication service functions are placeholders and simulations.

# Next Development Steps

## Step 1 - Resume Safely

Run:

```bash
git status --short
npm run build
```

Confirm clean state and passing build.

## Step 2 - Add Communication Details Panel

Apply the details-panel patch to `CommunicationLogPage.tsx`.

Commit:

```bash
git add .
git commit -m "Add communication message details panel"
git push
```

## Step 3 - Add Load Communication History Component

Create reusable component:

```text
src/components/communications/LoadCommunicationHistory.tsx
```

Expected props:

```ts
type Props = {
  loadId: string;
};
```

Expected behavior:

- List CommunicationLog records matching loadId.
- Show direction, channel, status, event type, createdAt.

## Step 4 - Add Outbound Communication Test Page or Panel

Possible page:

```text
/communication-test
```

or extend:

```text
/driver-attestation-test
```

Purpose:

- Simulate outbound SMS.
- Simulate outbound email.
- Then simulate inbound driver reply.

## Step 5 - Broker/Driver Portal Workflow Support

Before real AWS SMS:

- Ensure broker dashboard/page can see relevant communication status.
- Ensure driver page can show assigned load and simulated check-in actions.

## Step 6 - AWS SES Integration

Recommended before SMS because email setup may be simpler.

Tasks:

- Verify sender/domain in SES.
- Create backend function for email.
- Update `sendEmailForLoad` to call backend provider.
- Store providerMessageId and status.

## Step 7 - AWS End User Messaging SMS Integration

Tasks:

- Configure AWS SMS sending.
- Configure two-way inbound replies.
- Add inbound handler.
- Match reply to load.
- Call `processDriverAttestation`.

# Recommended Priority Order

```text
1. Communication Details Panel
2. Load Communication History Component
3. Outbound SMS/Email Simulation
4. Driver/Broker Page Workflow Completion
5. Amazon SES Email Integration
6. AWS End User Messaging SMS Outbound Integration
7. AWS Inbound SMS Handler
8. SMS Reply to Load Matching
9. ETA Source Hierarchy Finalization
10. GPS/Geofence Integration
11. Actual Delivery / Return to Warehouse Lifecycle Tracking
12. Production Authentication and Role Authorization
13. Code Splitting / Performance Cleanup
```

# Current Definition of Done for This Sprint

This sprint can be considered complete when:

```text
✓ CommunicationLog records can be viewed
✓ CommunicationLog records can be filtered
✓ CommunicationLog details can be viewed
✓ A load-specific communication history can be shown
✓ Outbound SMS/email can be simulated from a load
✓ Inbound driver SMS attestation can update Load + ETA source
✓ Broker/Driver pages can participate in simulated communication cycle
```

# Do Not Start Yet

Avoid these until the communication simulation loop is complete:

```text
- Real AWS SMS setup
- Geofence implementation
- Actual delivery/warehouse lifecycle timestamps
- Large UI migration of all pages into V2
- Full authentication overhaul
```

