# College Management System (CMS) — Project Overview

## 1. Project Introduction

The College Management System (CMS) is a web-based application designed to provide students with a centralized platform to access college-related services, academic resources, attendance information, and campus events.

The project is developed collaboratively by five student teams using a common technology stack, shared design standards, and a single GitHub repository.

## 2. Project Objectives

- Provide a centralized platform for college-related services.
- Make academic resources easily accessible.
- Allow students to view attendance information.
- Help students discover and participate in college events.
- Provide a consistent and responsive user interface.
- Practice real-world software engineering, teamwork, Git, testing, and integration.

## 3. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js with Vite |
| Styling | Tailwind CSS |
| Backend | Django (Python) |
| Database | MySQL with the Django ORM |
| Version Control | Git and GitHub |
| API Communication | REST API using JSON |
| Testing | Vitest, React Testing Library, and Django's test framework |
| Collaboration | GitHub Issues, Pull Requests, and Project Board |

All teams must follow the approved technology stack. Any proposed exception must be discussed with the project head before implementation.

## 4. Project Modules and Team Ownership

### Team 1 — Authentication

Responsibilities:
- Login and logout.
- User registration, if required by the approved requirements.
- Authentication and session/token management.
- User roles and permissions.
- Protected routes and authentication middleware.

### Team 2 — Dashboard and Navigation

Responsibilities:
- Main dashboard interface.
- Sidebar and global navigation.
- Shared application layout.
- Dashboard cards and module entry points.
- Reusable UI components, in coordination with the project head.

### Team 3 — Attendance

Responsibilities:
- Attendance information and records.
- Attendance summaries and reports.
- Attendance-related API endpoints.
- Validation and access control for attendance data.

### Team 4 — Library

Responsibilities:
- E-books, previous-year question papers (PYQs), and study resources.
- Resource listing and search.
- Resource details and download/access functionality.
- Library-related API endpoints.

### Team 5 — Events

Responsibilities:
- College event listings and details.
- Event schedules and status.
- Student event registration and participation.
- Event-related API endpoints.

The exact features of each module must follow the approved Software Requirements Specification (SRS).

## 5. Project Head Responsibilities

The project head is responsible for:

- Defining and maintaining the overall architecture.
- Coordinating all five teams and their team leads.
- Establishing coding, API, database, and design standards.
- Resolving cross-team dependencies and conflicts.
- Reviewing important architectural changes.
- Ensuring regular integration and testing.
- Monitoring project progress and managing releases.

Team leads are responsible for assigning tasks, helping team members, reporting blockers, and ensuring that their modules follow the common standards.

## 6. Collaboration Principles

1. All teams work from the same GitHub repository.
2. Every team follows the approved architecture and design system.
3. Teams must agree on API contracts before implementing dependent features.
4. Each team owns its assigned module and maintains clear boundaries.
5. Developers work on feature branches instead of committing directly to `main`.
6. Changes are submitted through Pull Requests and reviewed before merging.
7. Shared components and configuration are changed only through the agreed review process.
8. Every module must be tested with the integrated application.
9. Important technical decisions and changes must be documented.
10. No team should wait until the end of the project to integrate its code.

## 7. Definition of Project Success

The project will be considered successful when:

- All approved modules work within one application.
- The React frontend communicates correctly with the Django REST API.
- Data is stored and retrieved correctly from MySQL through Django's ORM.
- Authentication and authorization work as specified.
- The interface follows the shared design system.
- Critical user workflows pass integration testing.
- The application can be set up using the documented instructions.
- The repository contains maintainable code and up-to-date documentation.

## 8. Scope and Change Management

The first release focuses on Authentication, Dashboard and Navigation, Attendance, Library, and Events.

New features or major changes to the approved scope must be discussed with the project head. Changes that affect other teams require agreement on the relevant interfaces and documentation before implementation.

## 9. Source of Truth

The following documents define the project's working standards:

- `docs/02-SRS.md` — approved requirements.
- `docs/03-ARCHITECTURE.md` — application architecture.
- `docs/04-DESIGN-SYSTEM.md` — visual and UI standards.
- `docs/05-API-CONTRACTS.md` — API specifications.
- `docs/06-DATABASE-SCHEMA.md` — database structure.
- `docs/07-GIT-WORKFLOW.md` — Git collaboration process.
- `docs/08-TEAM-RESPONSIBILITIES.md` — team ownership.
- `docs/09-SETUP-GUIDE.md` — development environment setup.
- `docs/10-DEFINITION-OF-DONE.md` — completion criteria.

When documentation conflicts, the project head must coordinate the relevant owners and update the affected documents. Developers must not independently invent conflicting standards.
