# FleetVision Business Domain

The business domain contains FleetVision's core business concepts and rules.

## Purpose

The business domain sits between the platform domain and the application experiences.

- Platform answers: Who is this user?
- Business answers: What organization, role, relationships, and permissions does this user have?
- Portal and workspace answer: How should that experience be displayed?

## Domain Boundaries

- `src/platform` owns shared infrastructure such as identity, configuration, integrations, storage, communications, logging, auditing, and telemetry.
- `src/business` owns business entities and business rules.
- `src/portal` owns the customer-facing portal experience.
- `src/layouts/v2` and workspace pages own internal operational workspaces.

## Planned Business Areas

- organizations
- users
- relationships
- permissions
- loads
- drivers
- documents

## Phase 5 Direction

The identity pipeline should resolve authenticated identities into business concepts before building portal or workspace sessions.

Planned flow:

1. Authentication provider verifies identity.
2. Business domain resolves the user profile.
3. Business domain resolves organization membership.
4. Business domain resolves organization role.
5. Business domain resolves effective permissions.
6. Portal or workspace session is built from the resolved business context.
