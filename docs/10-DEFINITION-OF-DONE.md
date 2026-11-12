# College Management System — Definition of Done

## 1. Purpose

Work is complete only when it is implemented, verified, reviewed, and integrated with the React, Django, and MySQL application. A feature that runs only on one developer's machine is not done.

## 2. Feature Acceptance

- The change meets its approved issue and acceptance criteria.
- User-facing behavior follows the SRS and shared design system.
- Loading, empty, success, validation, and failure states are handled where applicable.
- Responsive and accessible behavior is checked for the affected workflow.

## 3. Frontend Requirements

- React code follows the existing client structure and shared component conventions.
- API calls use the shared client and configured API base URL; no endpoint secrets or duplicated localhost URLs are introduced.
- Protected UI behavior does not substitute for backend authorization.
- Relevant Vitest and React Testing Library tests pass, and the production Vite build succeeds.

## 4. Backend Requirements

- Django code follows the app ownership and API conventions.
- Inputs are validated and authentication/authorization are enforced server-side.
- API success and error responses match `05-API-CONTRACTS.md`.
- Relevant Django tests pass, including permission and failure cases.
- Django system checks pass; model changes include reviewed migrations, and migration state is consistent.
- MySQL constraints and transaction behavior are used where required for integrity and concurrency.
- Secrets, debug settings, and internal error details are not exposed.

## 5. Data and API Changes

- Schema changes update Django models and migrations and include a data migration/backfill plan when existing data is affected.
- API changes update the contract and notify all affected consumers.
- Database operations and API responses are tested with realistic data and relevant boundary cases.
- No production credentials or real personal data are committed to the repository or test fixtures.

## 6. Review and Integration

- Changes are committed on a task branch and submitted through a pull request.
- The pull request describes the change, verification performed, and any migration/configuration requirements.
- Required reviewers approve; review feedback is resolved.
- Relevant automated checks pass and the change integrates with the current application.
- Documentation is updated when setup, architecture, API, schema, or team workflow changes.

## 7. Release Readiness

- Required environment variables are documented with safe example values.
- Production settings, database migration steps, and deployment assumptions are documented for operational changes.
- No known critical defects remain in the changed workflow.
- The project head or designated release owner confirms cross-module integration.
