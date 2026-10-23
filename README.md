# 🎓 College CMS — Campus Management System

A centralized College Management System (CMS) designed to simplify academic activities, student services, and campus event management through a single web platform.

The project is developed collaboratively by five teams using **React** for the frontend, **Django** for the backend, and **MySQL** for the database.

---

## 📌 1. Project Objectives

- Provide secure authentication and role-based access.
- Offer a centralized dashboard for navigating college services.
- Manage student attendance records.
- Provide a digital library for e-books, previous-year question papers (PYQs), and academic resources.
- Display college events and allow students to register or participate.
- Maintain a modular, scalable, and maintainable codebase.
- Enable all teams to develop independently and integrate their work through GitHub.

## 🛠️ 2. Technology Stack

| Technology | Purpose |
|---|---|
| React.js with Vite | Frontend user interface and development/build tooling |
| Django | Backend application and REST API |
| Django ORM | Relational data access and schema migrations |
| MySQL | Relational database |
| Git and GitHub | Version control and collaboration |
| Approved Django authentication mechanism | Authentication |
| Tailwind CSS | Styling and responsive UI |
| Django test framework and Vitest/React Testing Library | Backend and frontend testing |

**Important:** The project lead must approve any change to the agreed technology stack before implementation.

## 👥 3. Team Structure and Responsibilities

The project is divided into five teams. Each team is responsible for its assigned module, testing, documentation, and integration.

### Team 1 — Authentication

**Objective:** Implement secure user authentication and access control.

Responsibilities:
- Registration and login.
- Logout and session/token handling.
- Password hashing and validation.
- Django authentication and permission checks on protected API operations.
- Role-based authorization for student, faculty, and administrator accounts, as approved by the project lead.
- Frontend login, registration, and authentication-related screens.
- Error handling and authentication testing.

Deliverables:
- Authentication UI.
- Authentication APIs.
- Django user model and migrations.
- Authentication documentation and test cases.

### Team 2 — Dashboard and Navigation

**Objective:** Build the central dashboard through which users access CMS modules.

Responsibilities:
- Main dashboard UI.
- Navigation menu, sidebar, header, and user profile section.
- Module navigation for Attendance, Library, and Events.
- Responsive layout for desktop, tablet, and mobile.
- Display relevant information based on the logged-in user's role.
- Integrate module links and approved dashboard summary APIs.

Deliverables:
- Reusable layout components.
- Dashboard pages.
- Navigation system.
- Responsive UI and integration documentation.

**Dependency:** Coordinate with the Authentication team for user identity, role information, and protected routes.

### Team 3 — Attendance Management

**Objective:** Provide a centralized attendance management module.

Responsibilities:
- Attendance records and database schema.
- Attendance creation and retrieval.
- Student attendance history.
- Subject-wise or date-wise attendance views, as approved in the requirements.
- Authorized faculty/admin attendance operations.
- Attendance summaries and percentage calculations.
- Validation, error handling, and API testing.

Deliverables:
- Attendance UI.
- Attendance APIs.
- Attendance database models.
- Test cases and API documentation.

### Team 4 — Digital Library

**Objective:** Create a digital repository of academic resources.

Responsibilities:
- List and browse e-books, PYQs, notes, and other approved resources.
- Search and filter academic resources.
- Resource metadata management.
- Authorized resource upload and management, if included in the approved requirements.
- Resource download or viewing functionality.
- Validation, error handling, and API testing.

Deliverables:
- Library interface.
- Resource APIs and database models.
- Search/filter functionality.
- Resource management documentation and tests.

### Team 5 — Events Management

**Objective:** Provide college event discovery and participation functionality.

Responsibilities:
- Display upcoming and past events.
- Event detail pages.
- Event creation and management for authorized users.
- Student event registration or participation.
- Prevent duplicate registrations.
- Registration status and capacity handling, if required.
- Event validation, error handling, and API testing.

Deliverables:
- Event listing and details UI.
- Event and registration APIs.
- Database models.
- API documentation and test cases.

### Project Lead Responsibilities

The project lead coordinates all five teams and is responsible for:

- Maintaining the project roadmap and requirements.
- Assigning issues and milestones.
- Approving shared architecture and API contracts.
- Reviewing pull requests and resolving cross-team conflicts.
- Managing integration and release branches.
- Monitoring progress, testing, and final delivery.
- Ensuring all teams follow the same code standards.

---

## 🌿 4. GitHub Collaboration Workflow

**Rule: Never push unfinished work directly to `main`.**

All contributions must go through feature branches and pull requests.

### Branch naming convention

| Branch | Purpose |
|---|---|
| `main` | Stable, approved code |
| `develop` | Integrated development code |
| `feature/auth-login` | Authentication feature |
| `feature/dashboard-ui` | Dashboard feature |
| `feature/attendance-api` | Attendance API |
| `feature/library-search` | Library search |
| `feature/events-registration` | Event registration |
| `fix/login-validation` | Bug fixes |
| `docs/api-documentation` | Documentation changes |

Use descriptive names and replace the examples with your actual task.

### Step-by-step workflow

**Step 1 — Clone the repository**

```bash
git clone <REPOSITORY_URL>
cd <REPOSITORY_FOLDER>
```

Replace the placeholders with the actual repository URL and folder name.

**Step 2 — Configure Git identity**

```bash
git config user.name "Your Name"
git config user.email "your-email@example.com"
```

**Step 3 — Get the latest development code**

```bash
git switch develop
git pull origin develop
```

**Step 4 — Create a feature branch**

```bash
git switch -c feature/your-module-your-task
```

Example:

```bash
git switch -c feature/library-search
```

**Step 5 — Implement and test your task**

- Work only on your assigned task.
- Follow the agreed folder structure and coding conventions.
- Test your changes locally.
- Do not commit passwords, API keys, `.env` files, or generated dependencies.

**Step 6 — Commit your changes**

```bash
git add .
git commit -m "feat(library): add resource search"
```

**Step 7 — Push your feature branch**

```bash
git push -u origin feature/library-search
```

**Step 8 — Open a Pull Request**

Open a PR on GitHub with:

- Base branch: `develop`
- Compare branch: your feature branch
- A clear description of the changes.
- The related issue number.
- Testing evidence and screenshots where applicable.

**Step 9 — Review and merge**

The designated reviewer checks the implementation, tests, API compatibility, and code quality. Fix requested changes before merging.

Delete the feature branch after merging if it is no longer needed.

### Keep your branch updated

Before opening or updating a PR:

```bash
git fetch origin
git merge origin/develop
```

Resolve any conflicts, run tests, and push the updated branch.

**Avoid force-pushing shared branches.** Never rewrite the history of `main` or `develop`.

---

## 🧩 5. Project Folder Structure

Use a common structure so all teams can integrate their modules without conflicting with one another.

```text
college-cms/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       │   ├── auth/
│       │   ├── dashboard/
│       │   ├── attendance/
│       │   ├── library/
│       │   └── events/
│       ├── routes/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── manage.py
│   ├── config/
│   │   ├── settings.py
│   │   └── urls.py
│   └── apps/
│       ├── auth/
│       ├── attendance/
│       ├── library/
│       └── events/
│
├── docs/                  # Project standards and module contracts
│
├── .gitignore
├── README.md
└── package.json
```

Each Django app should keep its models, migrations, serializers, views, URLs, and tests together.

For example:

```text
server/apps/library/
├── models.py
├── serializers.py
├── views.py
├── urls.py
└── tests.py
```

Teams must not independently create duplicate shared components, authentication middleware, database connections, or global configurations. Shared changes require coordination with the project lead.

The structure is the target convention for the Django backend. Any change must be discussed and documented before teams adopt it.

---

## 🔌 6. API Development and Integration Rules

The frontend and backend teams must agree on API contracts before parallel development begins.

### API conventions

- Base path: `/api/v1`
- Use RESTful HTTP methods.
- Return JSON responses unless the endpoint serves a file.
- Use consistent HTTP status codes.
- Validate all incoming data on the server.
- Protect restricted endpoints with authentication and authorization.
- Keep business logic out of React components.
- Follow and update `docs/05-API-CONTRACTS.md` for endpoint changes.

### Example API endpoints

| Module | Method | Endpoint | Purpose |
|---|---|---|---|
| Authentication | POST | `/api/v1/auth/login` | Log in |
| Authentication | POST | `/api/v1/auth/logout` | Log out |
| Attendance | GET | `/api/v1/attendance` | Retrieve authorized attendance records |
| Attendance | POST | `/api/v1/attendance` | Create attendance records |
| Library | GET | `/api/v1/library/resources` | List or search resources |
| Library | GET | `/api/v1/library/resources/:id` | Retrieve a resource |
| Events | GET | `/api/v1/events` | List events |
| Events | POST | `/api/v1/events` | Create an event, subject to authorization |
| Events | POST | `/api/v1/events/:id/registrations` | Register for an event |

These endpoints are proposed examples. The canonical endpoint details, permissions, and payloads are in `docs/05-API-CONTRACTS.md`; update that document with the affected teams before implementation.

### Standard response format

Success:

```json
{
  "success": true,
  "data": []
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": []
  }
}
```

Use appropriate status codes such as `200`, `201`, `400`, `401`, `403`, `404`, and `500`. Do not expose internal stack traces or sensitive details to clients.

### API coordination procedure

1. The module team proposes endpoint specifications.
2. The project lead and affected teams review them.
3. The contract is documented and approved.
4. Frontend and backend work can proceed in parallel using agreed mock responses.
5. The module team tests its APIs using Postman or automated tests.
6. The frontend integrates the verified contract.
7. The teams perform an integration test before the module is marked complete.

---

## 🎨 7. UI and Code Standards

The agreed design theme is **black, white, and purple shades**.

### UI rules

- Maintain consistent typography, spacing, borders, and component behavior.
- Use reusable buttons, inputs, cards, modals, and navigation components.
- Support mobile, tablet, and desktop layouts.
- Include loading, empty, error, and success states.
- Ensure forms have labels and meaningful validation messages.
- Keep module-specific styles separate and avoid unnecessary global CSS overrides.

### React standards

- Use functional components and React hooks.
- Use meaningful component and variable names.
- Separate API requests from presentation logic.
- Reuse common components instead of copying code.
- Avoid committing unused files and debug statements.

### Backend standards

- Keep Django models, serializers, views, URLs, and tests organized by application.
- Use Django's request/response and exception-handling conventions consistently.
- Validate incoming data in serializers/forms and enforce permissions on the backend.
- Apply least-privilege access control.
- Never trust frontend validation alone.
- Use Django's password hashing and authentication APIs; never store plaintext passwords.
- Keep secrets in environment variables.

### Naming conventions

| Item | Convention | Example |
|---|---|---|
| React components | PascalCase | `EventCard.jsx` |
| JavaScript functions | camelCase | `getAttendance()` |
| Variables | camelCase | `studentName` |
| Python functions and variables | snake_case | `get_attendance()` |
| Constants | UPPER_SNAKE_CASE when appropriate | `API_BASE_URL` |
| Database models | Consistent PascalCase | `LibraryResource` |
| Branches | lowercase with hyphens | `feature/event-list` |
| Commits | Conventional Commit style | `feat(events): add event list` |

---

## 🔐 8. Environment Setup and Security

### Prerequisites

Install a compatible version of:

- Python and pip, for the selected Django release.
- Node.js and npm, for the React/Vite frontend.
- MySQL Server.
- Git.
- A code editor such as VS Code.
- Postman or another API testing tool, if useful for API development.

### Environment variables

Each team must use local environment files rather than hardcoding secrets.

Example backend `.env.example` (variable names must match Django settings):

```dotenv
DJANGO_SECRET_KEY=replace-me-locally
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=college_cms
DB_USER=college_cms_user
DB_PASSWORD=replace-me-locally
DB_HOST=127.0.0.1
DB_PORT=3306
```

Example frontend `.env.example`:

```dotenv
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Create local `.env` files from the examples and fill in the values supplied through the approved project setup.

**Never commit real credentials.** Add `.env`, `client/.env`, `server/.env`, `node_modules/`, and build output directories to `.gitignore` as appropriate.

Frontend environment variables are exposed to users in the browser. Never put private keys, database credentials, or signing secrets in frontend variables.

### Install dependencies

```bash
cd client
npm install
```

The current runnable API scaffold in `server/` uses Express, MongoDB, and JWT. This differs from the planned Django/MySQL architecture described above; the following commands run the current scaffold.

In a separate terminal, install the server dependencies and create a local environment file:

```powershell
cd server
npm install
Copy-Item .env.example .env
```

Set `MONGODB_URI` to a reachable MongoDB database. Replace the example `JWT_SECRET` with a securely generated random value of at least 32 characters. Start the API with:

```powershell
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd client
npm run dev
```

The Vite development server proxies `/api` requests to `http://localhost:5000`. Login requires an existing active MongoDB user with a bcrypt-hashed `passwordHash`; account provisioning is intentionally not exposed as a public API. Use the URL printed by Vite. Do not commit `.env` files or real credentials.

---

## 🧪 9. Testing and Quality Assurance

Every team must test its module before requesting a merge.

Minimum requirements:

- Test normal and invalid inputs.
- Verify loading, empty, success, and error states.
- Check API response codes and response formats.
- Verify authentication and role permissions where relevant.
- Test database operations and edge cases.
- Confirm the module works with the current `develop` branch.
- Fix critical bugs before marking an issue complete.

The integration process should cover:

1. Authentication and protected routes.
2. Dashboard navigation between modules.
3. Attendance access and data retrieval.
4. Library search and resource access.
5. Event listing and registration.
6. Cross-module errors and unauthorized access.
7. Responsive layouts and the agreed browser targets.

Do not mark a feature complete merely because the page renders. Its required behavior must work and be tested.

---

## 📝 10. GitHub Issues and Project Tracking

All work should be tracked through GitHub Issues and Projects.

Create a separate issue for each meaningful task or bug.

### Issue template

```text
Title: [MODULE] Short task description

Objective:
What needs to be implemented?

Requirements:
- Requirement 1
- Requirement 2

Acceptance Criteria:
- [ ] Required behavior works
- [ ] Validation and error handling are implemented
- [ ] Tests pass
- [ ] Documentation is updated

Dependencies:
Related issues, APIs, or other teams.

Assigned Team:
Team name

Assigned Developer:
GitHub username
```

### Issue labels

- `team:auth`
- `team:dashboard`
- `team:attendance`
- `team:library`
- `team:events`
- `type:feature`
- `type:bug`
- `type:documentation`
- `priority:high`
- `priority:medium`
- `priority:low`
- `status:blocked`

Assign one accountable developer to each issue, even when multiple people contribute.

Use milestones for project phases such as setup, module development, integration, testing, and final release.

---

## 🔀 11. Pull Request Rules

Before merging a pull request, confirm:

- [ ] The PR targets `develop`, unless explicitly approved otherwise.
- [ ] The change is linked to a GitHub Issue.
- [ ] The implementation follows the agreed architecture.
- [ ] No credentials or private data are committed.
- [ ] Tests have been run and relevant checks pass.
- [ ] API contracts and documentation are updated where needed.
- [ ] Conflicts with the latest `develop` branch are resolved.
- [ ] At least one designated reviewer has approved the change.
- [ ] The PR does not include unrelated changes.

Enable GitHub branch protection or repository rulesets for `main` and, where appropriate, `develop`. Require pull requests, passing checks, and review approval according to the project's team size and GitHub plan.

Only authorized maintainers should merge approved pull requests into shared branches.

---

## 🤝 12. Rules for Collaboration Between Teams

1. **Do not change shared interfaces without communication.** This includes API response formats, route names, authentication behavior, database fields, and global UI components.
2. **Define dependencies early.** Teams must identify what they need from other teams before development begins.
3. **Use mock data when a dependency is unfinished.** Frontend development should not stop just because an API is not ready.
4. **Keep integration frequent.** Merge small, reviewed changes rather than combining weeks of work at once.
5. **Communicate blockers through GitHub Issues.** Tag the relevant team and project lead.
6. **Avoid editing another team's module without coordination.** Request the change or agree on shared ownership first.
7. **Document decisions.** Important architecture and API decisions belong in the repository.
8. **Resolve disagreements through evidence.** Use requirements, tests, security, maintainability, and integration cost to decide.
9. **Do not commit directly to shared branches.** All changes must follow the agreed review process.
10. **Keep the repository professional.** Write meaningful commit messages, maintain documentation, and remove obsolete code.

### When a task depends on another team

For example, the Dashboard team needs the Authentication team to provide user roles.

The teams should:

1. Agree on the required user object and authentication interface.
2. Document the interface.
3. Use a mock user object during early UI development.
4. Integrate when the authentication implementation is ready.
5. Test both modules together before closing dependent issues.

---

## 🚀 13. Development Phases

### Phase 1 — Project foundation
- Finalize SRS and acceptance criteria.
- Confirm repository structure and branch permissions.
- Configure frontend, backend, database, and environment templates.
- Establish design tokens and API conventions.

### Phase 2 — Independent module development
- Build the Authentication module.
- Build Dashboard and navigation.
- Build Attendance management.
- Build the Digital Library.
- Build Events management.

### Phase 3 — Integration
- Connect frontend pages to backend APIs.
- Integrate authentication and protected routes.
- Verify navigation, database operations, and permissions.
- Resolve cross-module conflicts.

### Phase 4 — Testing and stabilization
- Perform module and integration testing.
- Fix high-priority defects.
- Verify responsive behavior and security.
- Update the documentation.

### Phase 5 — Release
- Obtain project lead approval.
- Merge the tested release into `main`.
- Tag the release version.
- Prepare the project demonstration and final report.

---

## 📚 14. Documentation Requirements

Maintain these files as the project develops:

| File | Purpose |
|---|---|
| `README.md` | Project overview and collaboration instructions |
| `docs/01-PROJECT-OVERVIEW.md` | Scope, stack, and team ownership |
| `docs/02-SRS.md` | Software Requirements Specification |
| `docs/03-ARCHITECTURE.md` | React, Django, and MySQL architecture |
| `docs/04-DESIGN-SYSTEM.md` | Shared UI and accessibility standards |
| `docs/05-API-CONTRACTS.md` | API endpoints and request/response contracts |
| `docs/06-DATABASE-SCHEMA.md` | MySQL relational schema and migrations |
| `docs/07-GIT-WORKFLOW.md` | Branching and pull request rules |
| `docs/08-TEAM-RESPONSIBILITIES.md` | Team ownership and collaboration |
| `docs/09-SETUP-GUIDE.md` | Development environment setup |
| `docs/10-DEFINITION-OF-DONE.md` | Completion and verification criteria |

Each module team is responsible for updating the relevant API, schema, and testing documentation whenever its implementation changes.

---

## ✅ 15. Definition of Done

A task or module is considered complete only when:

- All agreed requirements are implemented.
- The implementation is tested.
- Input validation and error handling are present.
- Access control is verified where applicable.
- The frontend and backend work together according to the approved contract.
- Documentation is updated.
- The pull request is reviewed and merged.
- No known critical integration issue remains.

---

## 📣 16. Final Instructions for All Team Members

- Read this README before starting development.
- Work only on assigned tasks and communicate dependencies early.
- Keep your branch updated with `develop`.
- Make small, meaningful commits.
- Test before opening a pull request.
- Ask before modifying shared architecture or another team's module.
- Use GitHub Issues to track progress and blockers.
- Help other teams resolve integration issues professionally.
- Never upload secrets, private credentials, or sensitive student data.
- Prioritize a working, integrated system over isolated features.

**Our goal is one integrated College CMS, not five disconnected projects.**

All teams are accountable for the quality of their own modules and the successful integration of the complete system.

---

**Project:** College CMS  
**Architecture:** React + Django + MySQL
**Frontend:** React.js + Vite + Tailwind CSS
**Backend:** Django
**Database:** MySQL
**Collaboration:** Git + GitHub  
**Project Lead:** Repository maintainer  
