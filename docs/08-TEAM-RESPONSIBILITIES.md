# Team Responsibilities and Collaboration Rules

## 1. Purpose

This document defines ownership, responsibilities, deliverables, and collaboration rules for all five teams working on the College Management System (CMS).

Every team must follow the shared architecture, design system, API contracts, database conventions, and Git workflow.

## 2. Team Structure

### Team 1 — Authentication

**Primary responsibility:** Identity and access management.

Deliverables:
- Login and logout.
- Registration, if included in the approved SRS.
- Authentication/session or token handling.
- User identity and role management.
- Protected routes and backend authentication middleware.
- Authentication-related validation and tests.

Must coordinate with:
- Dashboard team for login state and protected navigation.
- All backend module owners for shared authentication middleware and authorization conventions.

Restrictions:
- Do not create separate authentication systems for individual modules.
- Do not expose passwords, secrets, or sensitive authentication data.
- Do not change shared authentication contracts without notifying affected teams.

### Team 2 — Dashboard and Navigation

**Primary responsibility:** The shared application shell and navigation experience.

Deliverables:
- Dashboard page.
- Global header and sidebar.
- Navigation links to all approved modules.
- Shared page layout and responsive behavior.
- Reusable UI components in coordination with the project head.
- Consistent loading, empty, and error states in shared UI.

Must coordinate with:
- Authentication team for protected routes and user information.
- Every module team for route registration and navigation requirements.

Restrictions:
- Do not duplicate business logic owned by other modules.
- Do not create independent copies of shared buttons, inputs, or layouts when approved components already exist.
- Do not change global design tokens without review.

### Team 3 — Attendance

**Primary responsibility:** Attendance-related functionality.

Deliverables:
- Attendance views and records.
- Attendance summaries and reports defined in the SRS.
- Attendance API URLs, Django views, services, and models.
- Input validation and authorization.
- Unit and integration tests for attendance features.

Must coordinate with:
- Authentication team for identity and permissions.
- Dashboard team for navigation and page layout.

Restrictions:
- Do not independently redefine the shared user identity model.
- Do not access or modify another module's database models without agreement.
- Do not invent API response formats that differ from the approved contract.

### Team 4 — Library

**Primary responsibility:** Academic resources and library functionality.

Deliverables:
- E-book and previous-year question paper listings.
- Resource search and filtering.
- Resource details and approved download/access functionality.
- Library API URLs, Django views, services, and models.
- Input validation and tests.

Must coordinate with:
- Authentication team for access rules.
- Dashboard team for shared UI and navigation.

Restrictions:
- Do not independently introduce a different backend framework.
- Do not expose restricted resources or sensitive file-storage credentials.
- Do not change shared API conventions without review.

### Team 5 — Events

**Primary responsibility:** College event discovery and participation.

Deliverables:
- Event listing and details.
- Event schedules and status.
- Student event registration and participation status.
- Event API URLs, Django views, services, and models.
- Validation, authorization, and tests.

Must coordinate with:
- Authentication team for user identity and permissions.
- Dashboard team for navigation and shared components.

Restrictions:
- Do not create a separate user identity system.
- Do not change shared API conventions without review.
- Do not assume event registration is complete without confirming the backend operation succeeded.

## 3. Project Head Responsibilities

The project head owns coordination across the whole application.

Responsibilities:
- Approve the architecture and technology stack.
- Maintain project-wide standards.
- Approve changes to shared contracts and interfaces.
- Coordinate cross-team dependencies.
- Review high-impact changes to shared code.
- Monitor tasks, blockers, testing, and integration.
- Resolve ownership disputes.
- Ensure documentation remains accurate.
- Coordinate release readiness.

The project head should delegate ordinary module-level implementation decisions to the relevant team leads.

## 4. Team Lead Responsibilities

Each team lead must:
- Divide module work into small, clearly defined tasks.
- Assign an owner to every task.
- Ensure team members understand the requirements.
- Track progress on the project board.
- Review internal code changes before requesting external review.
- Report blockers and dependencies early.
- Ensure code is tested and documented.
- Demonstrate working progress during weekly reviews.

## 5. Shared Code Ownership

The following resources require coordinated ownership:

| Resource | Responsible owner |
|---|---|
| Application architecture | Project head |
| Shared design tokens and UI components | Dashboard/UI owner, approved by project head |
| Authentication and authorization conventions | Authentication owner with project head oversight |
| Global frontend router | Dashboard/UI owner |
| Backend application entry point | Designated backend integration owner |
| Shared API response and error formats | Project head and module leads |
| Database connection and environment configuration | Designated backend integration owner |
| CI checks and branch protection | Project head or repository maintainer |
| Module-specific routes and data models | Relevant module team |

Only designated owners should approve changes to shared resources. Ownership must not prevent other students from contributing through reviewed pull requests.

## 6. Cross-Team Collaboration Rules

1. Discuss shared interface changes before implementation.
2. Record agreed decisions in the relevant documentation.
3. Notify every affected team when an API or schema changes.
4. Use mock data that matches the approved contract when a dependency is unfinished.
5. Avoid editing another team's module without prior coordination.
6. Keep pull requests small and focused.
7. Report integration blockers as soon as they appear.
8. Resolve disagreements through evidence, requirements, and documented decisions.

## 7. Task Ownership

Every task must have:
- A clear description.
- One directly responsible person.
- A team or module label.
- Acceptance criteria.
- Known dependencies.
- A linked issue or pull request when applicable.

Multiple students may contribute to one task, but one person must remain accountable for its completion.

## 8. Completion and Accountability

A team is not finished merely because its code runs on an individual laptop.

Its work must satisfy the acceptance criteria, pass relevant tests, be reviewed and merged, integrate with the common application, and follow the Definition of Done.

Each team lead is accountable for module readiness. The project head is accountable for overall system integration and release readiness.
