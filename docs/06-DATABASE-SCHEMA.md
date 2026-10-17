# College CMS — Database Schema

## 1. Purpose

This document defines the initial MongoDB database design for the College Management System (CMS).

It establishes:
- Collections and their ownership.
- Document fields and data types.
- Relationships between collections.
- Validation and indexing rules.
- Shared data ownership across teams.

The schema must remain consistent with the approved SRS and API contracts.

**Status:** Initial proposed schema. Team leads must review it before implementation.

## 2. Database Technology

- Database: MongoDB
- ODM: Mongoose
- Database design: Document-oriented
- Primary document identifier: MongoDB ObjectId
- Date storage: BSON Date
- Schema validation: Mongoose validation and appropriate database constraints

Use environment variables for database connection configuration. Never commit credentials or production connection strings to GitHub.

## 3. Collection Ownership

| Collection | Owner | Purpose |
|---|---|---|
| `users` | Authentication team | User identities and account status |
| `attendanceRecords` | Attendance team | Attendance records |
| `libraryResources` | Library team | E-books, PYQs, and academic resources |
| `events` | Events team | College event information |
| `eventRegistrations` | Events team | Student registrations for events |

The Dashboard team primarily consumes data through APIs. It should not create duplicate collections for data owned by other modules.

## 4. Users Collection

**Owner:** Authentication team.

Collection: `users`

Purpose: Store the identity and account information shared across the application.

### Proposed fields

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Yes | Unique user identifier |
| `name` | String | Yes | User's display name |
| `email` | String | Yes | Unique normalized email |
| `passwordHash` | String | Depends | Password hash if local password authentication is used |
| `role` | String | Yes | `student`, `faculty`, or `admin` |
| `status` | String | Yes | `active` or `disabled` |
| `createdAt` | Date | Yes | Creation timestamp |
| `updatedAt` | Date | Yes | Last modification timestamp |

### Rules

- Normalize email addresses before storing them.
- Enforce email uniqueness with a database unique index.
- Never store plaintext passwords.
- Never return `passwordHash` in API responses.
- Validate roles on the backend.
- A user ID is not proof of permission.
- The authentication team owns changes to this schema.

If college IDs, departments, semesters, or other profile attributes are required, add them after confirming the SRS.

## 5. Attendance Records Collection

**Owner:** Attendance team.

Collection: `attendanceRecords`

Purpose: Store attendance information for the approved attendance workflow.

### Proposed fields

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Yes | Unique attendance record identifier |
| `studentId` | ObjectId | Yes | Reference to `users._id` |
| `courseCode` | String | Yes | Identifier for the course or subject |
| `date` | Date | Yes | Date of the attendance session |
| `status` | String | Yes | `present`, `absent`, or `late`, if supported |
| `markedBy` | ObjectId | Depends | Reference to the faculty user who recorded attendance |
| `createdAt` | Date | Yes | Creation timestamp |
| `updatedAt` | Date | Yes | Last modification timestamp |

### Rules

- `studentId` must refer to an authorized student.
- `markedBy` must refer to an authorized user when attendance is marked by faculty.
- Only authorized users may create or modify attendance records.
- Prevent duplicate records for the same student, course, and session.
- Define what constitutes an attendance session before choosing the final uniqueness rule.

**Important:** If the college supports multiple classes for the same subject on the same day, introduce a separate `attendanceSessions` collection. Then attendance records should reference a session ID instead of relying on the date alone.

## 6. Library Resources Collection

**Owner:** Library team.

Collection: `libraryResources`

Purpose: Store metadata for academic resources.

### Proposed fields

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Yes | Unique resource identifier |
| `title` | String | Yes | Resource title |
| `description` | String | No | Resource description |
| `type` | String | Yes | `ebook` or `pyq`, subject to approved resource types |
| `subject` | String | No | Related subject |
| `courseCode` | String | No | Related course |
| `fileUrl` | String | Depends | Authorized file location or storage key |
| `uploadedBy` | ObjectId | Yes | Reference to the uploading user |
| `visibility` | String | Yes | Approved access policy |
| `createdAt` | Date | Yes | Creation timestamp |
| `updatedAt` | Date | Yes | Last modification timestamp |

### Rules

- Validate resource types and visibility values.
- Restrict uploads and deletion to authorized users.
- Do not store large files directly in ordinary resource documents unless that storage approach has been explicitly approved.
- Use controlled file storage and authorized downloads for private resources.
- Validate file type and size on the server.
- A `fileUrl` must not expose credentials or provide unintended public access.

The final schema must reflect whether students can upload resources or only administrators and faculty can do so.

## 7. Events Collection

**Owner:** Events team.

Collection: `events`

Purpose: Store college events and their registration rules.

### Proposed fields

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Yes | Unique event identifier |
| `title` | String | Yes | Event name |
| `description` | String | Yes | Event details |
| `venue` | String | Depends | Event location |
| `startAt` | Date | Yes | Event start time |
| `endAt` | Date | Yes | Event end time |
| `registrationDeadline` | Date | Depends | Last permitted registration time |
| `capacity` | Number | Depends | Maximum participants |
| `status` | String | Yes | `draft`, `upcoming`, `ongoing`, `completed`, or `cancelled` |
| `createdBy` | ObjectId | Yes | Reference to the creator |
| `createdAt` | Date | Yes | Creation timestamp |
| `updatedAt` | Date | Yes | Last modification timestamp |

### Rules

- `endAt` must be later than `startAt`.
- Capacity must be a positive integer when specified.
- The backend must enforce registration deadlines and capacity.
- Only authorized users may create, update, or cancel events.
- Do not rely only on the event status stored in the database; registration eligibility must also consider the current time and other business rules.

## 8. Event Registrations Collection

**Owner:** Events team.

Collection: `eventRegistrations`

Purpose: Track which students register for which events.

### Proposed fields

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Yes | Unique registration identifier |
| `eventId` | ObjectId | Yes | Reference to `events._id` |
| `studentId` | ObjectId | Yes | Reference to `users._id` |
| `status` | String | Yes | `registered`, `cancelled`, or another approved status |
| `registeredAt` | Date | Yes | Registration timestamp |
| `updatedAt` | Date | Yes | Last modification timestamp |

### Rules

- The event and student must exist.
- Only authorized students can register themselves.
- Prevent duplicate active registrations for the same event and student.
- Enforce capacity and registration deadlines on the backend.
- Define whether cancellation frees a place and whether re-registration is allowed.
- Concurrent registration requests must not exceed event capacity.

A unique compound index on `{ eventId, studentId }` is appropriate if one registration document is retained per student per event, including cancelled registrations. If the application permits multiple historical registration records, use a different explicitly designed constraint.

## 9. Relationships Between Collections

```text
users
 ├── attendanceRecords.studentId
 ├── attendanceRecords.markedBy
 ├── libraryResources.uploadedBy
 ├── events.createdBy
 └── eventRegistrations.studentId

events
 └── eventRegistrations.eventId
```

These relationships use ObjectId references.

MongoDB references do not automatically guarantee that the referenced document exists. The backend must validate references and handle deletion or deactivation according to the approved business rules.

## 10. Indexing Strategy

Create indexes based on actual queries and uniqueness requirements.

| Collection | Proposed index | Purpose |
|---|---|---|
| `users` | Unique `email` | Prevent duplicate accounts |
| `attendanceRecords` | `{ studentId: 1, date: -1 }` | Retrieve student attendance by date |
| `attendanceRecords` | `{ courseCode: 1, date: 1 }` | Retrieve course attendance |
| `libraryResources` | `{ type: 1, createdAt: -1 }` | Filter and list resources |
| `events` | `{ status: 1, startAt: 1 }` | Retrieve events by status and start time |
| `eventRegistrations` | Unique `{ eventId: 1, studentId: 1 }` | Prevent duplicate registrations |

These are initial suggestions. Review query patterns before adding indexes. For attendance uniqueness, use the actual session identifier if attendance sessions are modeled separately.

A normal index on a text field does not automatically provide efficient full-text search. Choose the search approach based on the expected search requirements.

## 11. Data Validation Standards

- Validate required fields and allowed values using Mongoose schemas.
- Validate IDs before querying by them.
- Reject invalid dates and impossible time ranges.
- Enforce numeric limits such as positive event capacity.
- Normalize values used for uniqueness.
- Never trust role, student ID, or permission fields supplied by a client.
- Use appropriate unique indexes for data-integrity constraints.
- Return validation failures using the shared API error format.

Application-level checks alone are not sufficient for uniqueness under concurrent requests. Use database constraints where applicable.

## 12. Database Ownership and Collaboration

1. Each team owns its assigned collections and Mongoose models.
2. Shared user identity fields are controlled by the Authentication team.
3. Other teams reference the user ID instead of redefining the user model.
4. Changes to shared fields must be discussed with affected teams.
5. Schema changes that affect API consumers must update the API contracts.
6. Every schema change must be reviewed, tested, and documented.
7. Do not use production data in development without explicit authorization and appropriate safeguards.

## 13. Environment Configuration

Example `.env.example` entry:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/college_cms
```

This is a local development example. Production environments must use appropriately secured connection details.

The real `.env` file must be excluded from Git.

## 14. Schema Change Procedure

Before changing a collection:

1. Document the proposed change and its purpose.
2. Identify affected endpoints, modules, and existing data.
3. Get approval from the collection owner and affected teams.
4. Update this document and the relevant API contracts.
5. Implement schema validation and required indexes.
6. Test both valid and invalid data.
7. Provide a migration or backfill plan if existing records are affected.
8. Merge only after review and successful tests.

## 15. Finalization Checklist

Before implementing these schemas, confirm:

- The roles and profile fields required by the SRS.
- Whether attendance needs a separate session model.
- Who can upload library resources.
- Whether library files are public or restricted.
- Event capacity, cancellation, and re-registration rules.
- The authentication mechanism and shared user identity model.

The final schema must reflect approved requirements rather than assumptions in this initial proposal.
