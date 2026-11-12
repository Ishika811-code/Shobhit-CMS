# College Management System — Architecture

## 1. Purpose

This document describes the application boundaries and integration standards for the College Management System (CMS). The approved stack is React with Vite, Django, and MySQL.

## 2. System Overview

```text
Browser
  React + Vite client
	  | HTTPS, versioned JSON REST API
	  v
  Django application
	  | Django ORM
	  v
  MySQL database
```

The browser must not connect directly to MySQL. Django owns business rules, authentication, authorization, validation, and persistence. The React client owns presentation, navigation, and user interaction; it must not be treated as a security boundary.

## 3. Repository Boundaries

```text
repository/
├── client/                 # React + Vite frontend
├── server/                 # Django backend
│   ├── manage.py
│   ├── config/             # Django settings and root URL configuration
│   └── apps/               # Authentication and domain applications
├── docs/
└── README.md
```

This is the target layout for the Django migration. Keep the existing repository organization where practical, and make `server/` the Django project. Each Django app should own its models, serializers, views, URLs, and tests for one domain. Shared configuration and integration code belongs to the designated backend owner.

## 4. Frontend

- React components and pages are organized by shared layout and feature/module.
- Vite is used for local development and production asset builds.
- A shared API client reads its base URL from environment configuration.
- Components handle loading, empty, success, and error states and do not contain database or authorization logic.
- Protected-route behavior improves navigation but does not replace backend permission checks.

## 5. Backend

- Django is the application framework and owns the versioned API under `/api/v1`.
- Django REST Framework is the recommended API toolkit for serializers, API views/viewsets, permissions, pagination, and browsable API support. Confirm the dependency and conventions as part of backend initialization.
- Django apps are divided by domain: authentication, attendance, library, events, and dashboard/shared functionality as needed.
- Business logic belongs in the relevant app/service layer, not in frontend code or database-specific client queries.
- Django settings must separate development and production concerns and load secrets from environment variables.
- Configure trusted hosts, CORS, CSRF, allowed origins, and HTTPS behavior for the actual deployment. Do not disable security protections as a general fix for integration errors.

## 6. Database and Persistence

- MySQL is the system of record.
- Django models define application data and relationships; Django migrations are the versioned schema-change mechanism.
- Foreign keys, unique constraints, checks, and indexes should enforce appropriate data-integrity rules in MySQL as well as application validation.
- Use transactions for operations that must remain atomic, such as event registration with capacity enforcement.
- The frontend and API expose stable identifiers without exposing database internals.

## 7. API and Authentication

- API conventions and payloads are defined in `05-API-CONTRACTS.md`.
- Use JSON for ordinary API requests and responses and ISO 8601 for date/time values.
- The authentication mechanism must be selected and documented before implementation. For browser clients, prefer a server-managed secure session with appropriate CSRF protection unless the team approves a documented token design.
- The backend authenticates each request and checks object- and action-level permissions.
- Never trust a client-provided role, owner ID, or student ID to authorize access.

## 8. Testing and Quality

- Frontend: Vitest and React Testing Library for component and client behavior.
- Backend: Django's test framework for models, API behavior, permissions, and integration with MySQL-compatible behavior; use the project's chosen test runner consistently.
- Integration tests verify client/API contracts and important end-to-end workflows.
- CI should install dependencies, run relevant tests, and build the frontend. Backend checks should include Django system checks and migration consistency checks.

## 9. Environment and Deployment

- Keep secrets in environment variables; commit only safe placeholders in `.env.example`.
- Configure the MySQL database, Django secret key, debug setting, allowed hosts, frontend API URL, and permitted browser origins per environment.
- Production deployment serves built frontend assets and the Django application through an approved hosting/reverse-proxy setup over HTTPS.
- Do not use development servers or debug settings as production services.

## 10. Architecture Changes

Changes to framework choices, shared API behavior, authentication, database relationships, or app boundaries require review by the project head and affected module leads. Update this document and dependent API/schema/setup documents in the same change.
