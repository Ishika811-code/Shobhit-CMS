# College CMS — API Contracts

## 1. Purpose

This document defines the API conventions, endpoints, request formats, response formats, and integration rules for the College Management System (CMS).

All frontend and backend teams must follow these contracts.

**Important:** These are the initial agreed API specifications. An endpoint is not implemented merely because it appears in this document.

## 2. API Standards

- API style: REST.
- Data format: JSON.
- Base path: `/api/v1`.
- Naming: lowercase nouns; use plural nouns for resource-list endpoints.
- HTTP methods: GET, POST, PATCH, and DELETE as appropriate.
- Dates: ISO 8601 format.
- IDs: integer primary keys unless an endpoint explicitly documents another type.
- Content type: `application/json` for JSON request bodies.
- All protected endpoints require authentication.
- The backend is responsible for validating inputs and enforcing permissions.

Example endpoint:

`GET /api/v1/events`

## 3. Standard Success Response

Use the following structure for successful JSON responses:

```json
{
  "success": true,
  "data": {
    "message": "Operation completed successfully"
  }
}
```

The `data` field contains the result appropriate to the endpoint. It can be an object, an array, or a paginated result.

Example event list:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "College Tech Fest",
      "date": "2026-11-10T09:00:00.000Z",
      "status": "upcoming"
    }
  ]
}
```

## 4. Standard Error Response

All API errors must use this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The provided data is invalid",
    "details": []
  }
}
```

The `details` field may contain field-level validation errors. Use an empty array when no additional details are available.

Common HTTP status codes:

| Status | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Resource created |
| 204 | Request successful with no response body |
| 400 | Invalid request |
| 401 | Authentication required or invalid |
| 403 | Authenticated user lacks permission |
| 404 | Resource not found |
| 409 | Resource conflict, such as duplicate registration |
| 422 | Valid request structure but invalid business data, if used consistently |
| 429 | Too many requests |
| 500 | Unexpected server error |

Do not expose stack traces, database errors, passwords, tokens, or secrets in production responses.

## 5. Authentication API

Owner: Authentication team.

### 5.1 Login

`POST /api/v1/auth/login`

Request:

```json
{
  "email": "student@example.com",
  "password": "example-password"
}
```

The response and authentication mechanism must be finalized before implementation.

If using a secure cookie-based session, the server should set the session cookie and return appropriate user information. If using bearer tokens, document token issuance, expiration, refresh, and storage rules before implementation.

Never return password hashes.

### 5.2 Current User

`GET /api/v1/auth/me`

Authentication: Required.

Example response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Example Student",
      "email": "student@example.com",
      "role": "student"
    }
  }
}
```

### 5.3 Logout

`POST /api/v1/auth/logout`

Authentication: Required.

The backend must invalidate the session or token according to the approved authentication design.

Registration, password recovery, and other authentication endpoints must be added only after their requirements and security behavior are agreed upon.

## 6. Attendance API

Owner: Attendance team.

### 6.1 List Attendance Records

`GET /api/v1/attendance`

Authentication: Required.

Possible query parameters:
- `from`: starting date.
- `to`: ending date.
- `page`: page number.
- `limit`: records per page.

The returned records must be restricted to those the authenticated user is authorized to access.

### 6.2 Get Attendance Record

`GET /api/v1/attendance/:id`

Authentication: Required.

The backend must verify that the user is allowed to view the requested record.

### 6.3 Attendance Summary

`GET /api/v1/attendance/summary`

Authentication: Required.

The response should provide the attendance summary appropriate to the user's permissions and the approved SRS.

Creating or modifying attendance records requires a separately defined permission model and contract.

## 7. Library API

Owner: Library team.

### 7.1 List Resources

`GET /api/v1/library/resources`

Authentication: Required.

Possible query parameters:
- `q`: search query.
- `type`: resource type, such as ebook or pyq.
- `page`: page number.
- `limit`: records per page.

### 7.2 Get Resource Details

`GET /api/v1/library/resources/:id`

Authentication: Required.

The backend must check resource visibility and access permissions.

### 7.3 Access or Download a Resource

`GET /api/v1/library/resources/:id/download`

Authentication: Required.

The implementation must verify access rights before returning a file or issuing an authorized download URL.

Do not expose private storage credentials or unrestricted storage locations.

## 8. Events API

Owner: Events team.

### 8.1 List Events

`GET /api/v1/events`

Authentication: Required unless the approved SRS permits public event listings.

Possible query parameters:
- `q`: search query.
- `status`: event status.
- `page`: page number.
- `limit`: records per page.

### 8.2 Get Event Details

`GET /api/v1/events/:id`

Authentication: Required unless public event access is approved.

### 8.3 Register for an Event

`POST /api/v1/events/:id/registrations`

Authentication: Required.

Request body:

```json
{}
```

The backend identifies the student from the authenticated identity rather than trusting a client-supplied student ID.

The backend must prevent duplicate registrations and enforce event capacity and registration deadlines if those rules apply.

Expected outcomes include:
- 201: Registration created.
- 401: Authentication required.
- 404: Event not found.
- 409: Duplicate registration or a relevant registration conflict.
- 422: Registration is not permitted under the event's business rules, if adopted by the team.

The exact response body and registration-status model must be finalized before implementation.

## 9. Pagination Convention

For endpoints that return large collections, use pagination consistently.

Example query:

`GET /api/v1/events?page=1&limit=10`

Proposed response:

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 0,
      "totalPages": 0
    }
  }
}
```

Apply a server-side maximum limit. The default and maximum page sizes must be configured consistently.

## 10. API Ownership

| API group | Owner |
|---|---|
| `/api/v1/auth/*` | Authentication team |
| `/api/v1/attendance/*` | Attendance team |
| `/api/v1/library/*` | Library team |
| `/api/v1/events/*` | Events team |
| Shared response/error conventions | Project head and module leads |

The Dashboard team consumes the APIs it needs. It should not create duplicate backend endpoints for features owned by other teams.

## 11. Frontend Integration Rules

- Use one shared API client.
- Read the base URL from environment configuration.
- Do not hardcode localhost URLs in individual components.
- Handle loading, empty, success, and error states.
- Do not assume every response is successful.
- Follow the approved authentication mechanism.
- Use mock responses only when they match the documented contracts.
- Keep secrets and privileged operations on the backend.

## 12. Backend Implementation Rules

Each module must:
- Validate request parameters and body fields.
- Enforce authentication and authorization.
- Return the agreed response and error formats.
- Use Django REST Framework serializers, permissions, and shared exception handling when DRF is adopted.
- Avoid exposing internal database details.
- Test successful and failure scenarios.
- Document any new or changed endpoint.

## 13. Contract Change Procedure

Before changing an API contract:

1. The owning team documents the proposed change.
2. The team identifies affected frontend and backend consumers.
3. The affected team leads review the proposal.
4. The project head approves cross-module or breaking changes.
5. The documentation is updated.
6. Implementation and tests are updated together.
7. The change is merged only after the relevant checks pass.

Do not silently rename response fields, change status codes, or modify authentication requirements.

## 14. Contract Status

This document establishes initial conventions and proposed endpoints. Before implementation, the relevant team leads must confirm the exact request and response schemas, permissions, and business rules.

For larger APIs, maintain an OpenAPI specification so endpoints can be reviewed and tested consistently.

