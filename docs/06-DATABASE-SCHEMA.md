# College CMS — Database Schema

## 1. Purpose

This document defines the proposed relational data model for the College Management System (CMS), including table ownership, relationships, constraints, indexing, and schema-change procedures.

**Status:** Initial proposal. Confirm details against the approved SRS and Django implementation before production use.

## 2. Database Technology

- Database: MySQL
- ORM and schema evolution: Django ORM and Django migrations
- Primary keys: Django's configured integer primary key type (normally `BigAutoField`)
- Date/time storage: timezone-aware Django `DateTimeField` values; use UTC in storage and ISO 8601 with timezone in API responses
- Character encoding: `utf8mb4`
- Integrity: enforce relationships and uniqueness in MySQL constraints as well as validating requests in Django

Configure the database through environment variables. Never commit database passwords, private connection strings, or production data.

## 3. Application and Table Ownership

| Django app/table | Owner | Purpose |
|---|---|---|
| `auth_user` or approved custom user table | Authentication team | User identity, login, and account status |
| `attendance_record` | Attendance team | Attendance by student and session/course |
| `library_resource` | Library team | Resource metadata and controlled file references |
| `event` | Events team | Event information and registration rules |
| `event_registration` | Events team | Student participation records |

Use Django's built-in user model or an approved custom user model. If a custom model is required, decide and configure `AUTH_USER_MODEL` before the first migration. Other apps reference the configured user model with Django relations; they must not create a parallel identity table.

## 4. Users

**Owner:** Authentication team. Django model: configured user model, optionally extended through a profile model when appropriate.

Recommended application fields:

| Field | Django type | Rules |
|---|---|---|
| `id` | `BigAutoField` | Primary key |
| `name` | `CharField` or standard first/last name fields | Required display identity |
| `email` | `EmailField` | Normalized and unique if email is the login identifier |
| `password` | Django authentication field | Managed and hashed by Django authentication; never store raw passwords |
| `role` | approved choices or Django Groups/Permissions | Enforced by backend authorization |
| `is_active` | Django authentication field | Disabled users cannot authenticate |
| `created_at`, `updated_at` | `DateTimeField` | Audit timestamps where required |

Do not return password fields or authentication secrets from APIs. Confirm whether role is represented by Django groups/permissions or a constrained role field; avoid duplicating both without a clear purpose.

## 5. Attendance Records

**Owner:** Attendance team. Django model: `AttendanceRecord`.

| Field | Django type | Rules |
|---|---|---|
| `id` | `BigAutoField` | Primary key |
| `student` | `ForeignKey` to configured user model | Required; use an explicit related name |
| `course_code` | `CharField` or relation to an approved course model | Required |
| `session` | `ForeignKey` to an attendance-session model, if sessions are modeled | Recommended when multiple classes may occur per course/day |
| `date` | `DateField` or `DateTimeField` | Required if session model is not used |
| `status` | constrained choices | For example present, absent, or late if approved |
| `marked_by` | nullable `ForeignKey` to configured user model | Set when the workflow records the faculty member |
| `created_at`, `updated_at` | `DateTimeField` | Audit timestamps |

Define the attendance session concept before enforcing uniqueness. Add a database unique constraint for one record per student/session (or the approved equivalent). Restrict reads and writes by authenticated identity and permission.

## 6. Library Resources

**Owner:** Library team. Django model: `LibraryResource`.

| Field | Django type | Rules |
|---|---|---|
| `id` | `BigAutoField` | Primary key |
| `title` | `CharField` | Required |
| `description` | `TextField` | Optional |
| `type` | constrained choices | For example ebook or pyq, subject to approved resource types |
| `subject`, `course_code` | optional `CharField` or approved foreign keys | Filterable metadata |
| `file` or `storage_key` | approved storage reference | Do not store large file contents in ordinary relational columns by default |
| `uploaded_by` | `ForeignKey` to configured user model | Required where uploads are tracked |
| `visibility` | constrained choices | Enforced by API permissions |
| `created_at`, `updated_at` | `DateTimeField` | Audit timestamps |

Keep file storage separate from MySQL unless explicitly approved. Validate type and size and authorize every download. Never expose storage credentials or unrestricted private file locations.

## 7. Events

**Owner:** Events team. Django model: `Event`.

| Field | Django type | Rules |
|---|---|---|
| `id` | `BigAutoField` | Primary key |
| `title` | `CharField` | Required |
| `description` | `TextField` | Required |
| `venue` | `CharField` | Optional if allowed by requirements |
| `start_at`, `end_at` | `DateTimeField` | Required; end must be later than start |
| `registration_deadline` | nullable `DateTimeField` | Optional rule |
| `capacity` | nullable positive integer | Must be positive when specified |
| `status` | constrained choices | For example draft, upcoming, ongoing, completed, cancelled |
| `created_by` | `ForeignKey` to configured user model | Required |
| `created_at`, `updated_at` | `DateTimeField` | Audit timestamps |

Validate event rules in Django and use database constraints for rules that can be expressed reliably by MySQL. Registration eligibility must consider the current time and permissions, not only a stored status value.

## 8. Event Registrations

**Owner:** Events team. Django model: `EventRegistration`.

| Field | Django type | Rules |
|---|---|---|
| `id` | `BigAutoField` | Primary key |
| `event` | `ForeignKey` to `Event` | Required |
| `student` | `ForeignKey` to configured user model | Required |
| `status` | constrained choices | For example registered or cancelled |
| `registered_at`, `updated_at` | `DateTimeField` | Audit timestamps |

Add a `UniqueConstraint` for `(event, student)` if one row is retained per student/event, including cancellations. Choose another explicit model if multiple registration history rows are required. Enforce capacity inside a database transaction with appropriate locking/consistency behavior so concurrent requests cannot overbook an event.

## 9. Relationships

```text
User
 ├── AttendanceRecord.student
 ├── AttendanceRecord.marked_by
 ├── LibraryResource.uploaded_by
 ├── Event.created_by
 └── EventRegistration.student

Event
 └── EventRegistration.event
```

Use Django `ForeignKey` fields and explicit `on_delete` behavior. Choose deletion policies deliberately; for records requiring history, prefer protected or nullable relationships over cascading deletion. Database foreign keys enforce referential integrity.

## 10. Constraints and Indexes

Add indexes based on measured query patterns and endpoint filters. Initial candidates:

| Table | Constraint/index | Purpose |
|---|---|---|
| User | unique normalized email, if used for login | Prevent duplicate accounts |
| AttendanceRecord | `(student_id, date)` or `(student_id, session_id)` | Retrieve a student's attendance |
| AttendanceRecord | `(course_code, date)` or session relation | Retrieve course attendance |
| LibraryResource | `(type, created_at)` | Filter and order resources |
| Event | `(status, start_at)` | List events by status and time |
| EventRegistration | unique `(event_id, student_id)` | Prevent duplicate active/retained registration |

Declare application-owned indexes and uniqueness via Django `Meta.constraints` and `Meta.indexes` so they are represented in migrations. Review query plans and avoid redundant indexes.

## 11. Validation and Data Integrity

- Validate field formats, allowed choices, and cross-field business rules in Django.
- Use database constraints for uniqueness, required relationships, and supported checks.
- Do not trust client-provided role, ownership, or permission fields.
- Use transactions for multi-step state changes and concurrent capacity checks.
- Return validation errors using the shared API error contract, without exposing SQL errors.
- Back up and migrate existing data before destructive schema changes.

## 12. Database Ownership and Collaboration

1. Each Django app owns its domain models and migrations.
2. The authentication app owns the shared user model and identity fields.
3. Other apps reference the configured user model instead of duplicating user data.
4. Changes to shared relations or fields require review from affected teams.
5. Schema changes that affect API consumers must update API contracts.
6. Every migration must be reviewed and tested against a MySQL-compatible environment.
7. Never use production personal data in development or tests without explicit authorization and safeguards.

## 13. Environment Configuration

Example `.env.example` values (placeholders only):

```dotenv
DB_NAME=college_cms
DB_USER=college_cms_user
DB_PASSWORD=change-me-locally
DB_HOST=127.0.0.1
DB_PORT=3306
```

The Django settings module should read these values without committing real credentials. Keep `.env` excluded from Git. Use separate least-privilege credentials per environment.

## 14. Schema Change Procedure

1. Document the change and affected modules, endpoints, and data.
2. Obtain approval from the owning team and affected consumers.
3. Update this document and API contracts as needed.
4. Modify Django models and generate a migration; review the migration operations.
5. Include a data migration or backfill plan when existing records require transformation.
6. Test migrations from both an empty database and the prior supported schema where practical.
7. Apply changes only through Django migrations; do not make undocumented manual production edits.

## 15. Finalization Checklist

Confirm the configured user model and role strategy, attendance session model and uniqueness rule, library file storage and visibility, event capacity/cancellation policy, MySQL version/engine settings, and any migration needed from existing data before production rollout.