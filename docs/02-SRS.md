# College Management System — Software Requirements Specification

## 1. Purpose

This document defines the baseline functional and quality requirements for the College Management System (CMS). It is the source of truth for the first release and must be updated when approved scope changes.

## 2. Product Scope

The CMS is a responsive web application for students to access college services, attendance information, academic resources, and campus events. The first release includes authentication, dashboard/navigation, attendance, library, and events.

The system uses a React frontend, a Django backend, and a MySQL relational database. The frontend communicates with the backend through the documented JSON REST API. Detailed interfaces and data structures are defined in `03-ARCHITECTURE.md`, `05-API-CONTRACTS.md`, and `06-DATABASE-SCHEMA.md`.

## 3. User Roles

- **Student:** Access their own attendance information, browse available library resources, view events, and register for eligible events.
- **Faculty:** Access the faculty capabilities explicitly approved for the release, including attendance workflows where authorized.
- **Administrator:** Manage users and CMS content as authorized by the approved feature scope.

The backend is authoritative for identity, role, and permissions. A role or user identifier supplied by a client is never sufficient proof of access.

## 4. Functional Requirements

### 4.1 Authentication

- Users can sign in and sign out using the approved authentication design.
- The application can obtain the current authenticated user's identity and role.
- Protected pages and API operations require authentication.
- The backend rejects unauthorized access and does not expose password hashes or secrets.
- Registration and password recovery are out of scope unless separately approved.

### 4.2 Dashboard and Navigation

- Authenticated users can access a shared dashboard and navigate to the modules available to their role.
- Navigation and page content adapt to supported desktop and mobile viewports.
- The interface communicates loading, empty, success, and error states.

### 4.3 Attendance

- Authorized users can view attendance records and summaries permitted for their identity and role.
- Users can filter records by supported date range and course criteria.
- The backend enforces record-level access and prevents unauthorized modification.
- Attendance creation or editing is included only when the permission model and workflow are approved.

### 4.4 Library

- Users can browse and search library resources using supported filters.
- Users can view resource details and access or download resources they are authorized to use.
- The backend validates resource visibility and download permissions.

### 4.5 Events

- Users can browse events and view event details according to visibility rules.
- Authenticated students can register for eligible events.
- The backend prevents duplicate registrations and enforces registration deadlines and capacity when configured.
- Event creation and administration are limited to authorized users.

## 5. Non-Functional Requirements

- **Security:** Validate all input server-side, enforce authorization on every protected API operation, store passwords only as secure hashes, and keep secrets out of source control.
- **Data integrity:** Use MySQL constraints and Django model validation/migrations to maintain relational consistency.
- **Usability:** Provide consistent navigation, clear form feedback, and responsive layouts.
- **Accessibility:** Support keyboard operation, visible focus, semantic structure, labels for controls, and adequate text/background contrast.
- **Maintainability:** Keep frontend features and Django backend apps modular; document API or schema changes.
- **Reliability:** Handle expected API and database errors without exposing internal details.
- **Testability:** Cover important user flows, authorization rules, validation, and database behavior with automated tests.

## 6. Constraints and Assumptions

- The approved stack is React for the frontend, Django for the backend, and MySQL for persistence.
- The API is REST over HTTP(S), uses JSON for normal request and response bodies, and is versioned under `/api/v1`.
- Exact authentication mechanism, faculty/admin workflows, upload storage, and deployment environment require agreement before implementation.
- Requirements not listed here must not be assumed to be part of the first release.

## 7. Acceptance

A requirement is accepted when its user-visible behavior is demonstrable, its authorization and failure cases are handled, relevant automated tests pass, and its API/schema documentation matches the implementation.
