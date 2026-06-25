# FleetVision Platform Domain

The platform domain contains shared capabilities used by both internal workspaces and customer portals.

## Purpose

Platform services should not belong directly to the workspace domain or portal domain. They provide reusable infrastructure for authentication, configuration, integrations, storage, communications, logging, auditing, and telemetry.

## Domain Boundaries

- `src/portal` owns customer-facing portal experience.
- `src/layouts/v2` and workspace pages own internal operational workspaces.
- `src/platform` owns shared platform services.

## Planned Platform Areas

- auth
- configuration
- integrations
- storage
- communications
- logging
- auditing
- telemetry

## Phase 5 Direction

Phase 5 — Identity & Platform Services will build on this domain.

Planned work includes:

1. Identity provider abstraction
2. Cognito adapter
3. Organization resolution
4. Role and permission mapping
5. Integration registry
6. AWS Secrets Manager / Parameter Store usage
7. S3 storage for logos, avatars, and documents
8. Email and SMS communication services
9. FMCSA and external API integrations
