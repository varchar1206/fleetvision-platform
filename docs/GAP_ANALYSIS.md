# FleetVision 365 Gap Analysis

# Missing Documentation

## Authentication Documentation

Current documentation does not fully define:

- User roles.
- Login process.
- Cognito or alternative auth provider setup.
- Route protection.
- Model-level authorization rules.
- Tenant/organization ownership model.

Recommended future document:

```text
docs/AUTHORIZATION_PLAN.md
```

## AWS SMS Documentation

Need detailed future documentation for:

- AWS End User Messaging SMS setup.
- Origination identity.
- Two-way SMS setup.
- Inbound SMS routing.
- Lambda handler.
- Message matching format.
- Driver reply syntax.
- Error handling.
- Cost controls.

Recommended future document:

```text
docs/AWS_SMS_PLAN.md
```

## AWS SES Documentation

Need documentation for:

- Verified sender/domain.
- Sandbox vs production SES.
- Bounce/complaint handling.
- Email templates.
- Provider message ID updates.

Recommended future document:

```text
docs/AWS_SES_PLAN.md
```

## Data Model Documentation

Need generated/curated documentation of all Amplify models.

Recommended future document:

```text
docs/DATA_MODEL.md
```

Should include:

- Every model.
- Every field.
- Required/optional status.
- Expected values.
- Relationships.
- Indexing needs.

## Route Map Documentation

Need a route map showing old routes, V2 routes, and intended migration path.

Recommended future document:

```text
docs/ROUTES.md
```

## Test Script Documentation

Need a list of scripts and when to use them.

Recommended future document:

```text
docs/SCRIPTS.md
```

# Architectural Risks

## Public API Key Authorization

Current model authorization uses public API key access. This is acceptable for early development but high risk for production.

Risk:

- Unauthorized users may access or mutate data if app/API details are exposed.

Mitigation:

- Move to Cognito-based auth.
- Add role-based authorization.
- Add owner/group/tenant rules.

## Mixed Legacy and V2 Layouts

Both legacy top-nav layouts and V2 shell coexist.

Risk:

- Inconsistent user experience.
- Duplicate navigation logic.
- Harder route maintenance.

Mitigation:

- Validate V2 shell.
- Migrate pages one at a time.
- Keep legacy routes until V2 pages are stable.

## HashRouter Workaround

HashRouter solved deployed routing issues.

Risk:

- URLs include `#/`, which may be less polished.
- Some integrations may need route awareness.

Mitigation:

- Keep HashRouter short-term.
- Revisit BrowserRouter only after Amplify rewrite behavior is fully understood.

## Large JavaScript Bundle

Build warns that chunks exceed 500 kB.

Risk:

- Slower mobile load.
- Poor performance as app grows.

Mitigation:

- Add route-level lazy loading.
- Use dynamic imports.
- Consider code splitting by major portal.

## Communication Provider Not Connected

SMS/email workflows are simulated only.

Risk:

- Future provider integration may reveal unhandled failure modes.

Mitigation:

- Keep provider logic behind service functions.
- Add provider status fields.
- Add failure/retry handling.

## No Formal Relationship Indexing

Current relationships are logical through `loadId` strings.

Risk:

- Querying by loadId may become inefficient.
- Relationship logic may duplicate across pages.

Mitigation:

- Add indexes or Amplify relationships when needed.
- Create service/helper functions for common queries.

## Production SMS Costs and Compliance

SMS can incur cost and may have compliance requirements.

Risk:

- Unexpected spend.
- Message deliverability issues.
- Regulatory/compliance problems.

Mitigation:

- Add SMS usage limits.
- Log all outbound/inbound messages.
- Confirm opt-in/consent model.
- Use test numbers before production.

# Areas Where Conversation History Is Unclear

Some early project details may not be fully captured because the conversation became very large. Areas that should be verified from repository/code:

- Exact full schema of every Amplify model.
- Exact implementation of every ETA utility.
- Exact current state of Broker pages.
- Exact current state of Carrier page.
- Exact current state of Driver page.
- Exact CSS duplication remaining in App.css vs V2 styles.
- Exact status of all prior commits before the current context window.
- Exact mobile rendering behavior after HashRouter deployment.

# Information That Should Be Documented Before Starting a New Conversation

Before a new AI-assisted development session, ensure these are committed and available in GitHub:

```text
docs/PROJECT_CONTEXT.md
docs/ARCHITECTURE.md
docs/DEVELOPMENT_LOG.md
docs/CURRENT_SPRINT.md
docs/AI_CONTEXT.md
```

Recommended additional future docs:

```text
docs/DATA_MODEL.md
docs/ROUTES.md
docs/SCRIPTS.md
docs/AWS_SMS_PLAN.md
docs/AWS_SES_PLAN.md
docs/AUTHORIZATION_PLAN.md
```

# Immediate Documentation Gaps to Close Next

1. Add docs folder with current five documentation files.
2. Add DATA_MODEL.md generated from `amplify/data/resource.ts`.
3. Add SCRIPTS.md listing test/seed scripts and examples.
4. Add ROUTES.md documenting HashRouter route paths.

# Recommended Risk Reduction Steps

## Short Term

- Commit the documentation package.
- Add Communication Details Panel.
- Add LoadCommunicationHistory component.
- Keep using simulation before AWS integration.

## Medium Term

- Add SES integration first.
- Add SMS outbound second.
- Add inbound SMS third.
- Add retry/error handling.

## Long Term

- Add authentication.
- Add role-based access.
- Add code splitting.
- Add GPS/geofence.
- Add production monitoring/logging.

