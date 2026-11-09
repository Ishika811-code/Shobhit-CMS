# Shobhit University CMS — production foundation

This repository now contains the existing React portal UI plus a self-hosted backend foundation, PostgreSQL/Redis deployment scaffold, and an Expo Android/iOS app shell. It is designed around the requirements supplied: 5,000–15,000 students, 1,000+ faculty/staff, multiple campuses, web + Android + iOS, university-owned hosting, and replacement of an existing ERP/CMS.

## Important release status
This is a **production-oriented foundation, not a certified production-ready university ERP**. Do not load live student data or expose it publicly until the university's IT/security team completes the deployment checklist, threat modelling, penetration testing, data migration validation, disaster recovery test, push provider setup, and UAT sign-off. The legacy React UI still contains prototype/demo flows and must be connected to the API and its sample login behavior removed before launch.

## Architecture
- Web: React 18 + Vite + Tailwind (existing portal UI, to be migrated screen-by-screen to API-backed workflows).
- API: Django + Django REST Framework + JWT.
- Database: PostgreSQL 16, relational and transaction-safe.
- Cache/queue foundation: Redis (Celery worker and scheduled jobs must be configured for async jobs).
- Mobile: Expo React Native app shell for Android and iOS.
- Hosting: Docker Compose for a private university server; put a university-managed reverse proxy/WAF and TLS in front of the API. Do not expose PostgreSQL or Redis to the public internet.

## Backend local setup
1. Install Docker Engine / Docker Desktop.
2. Copy `.env.example` to `.env`; generate unique secrets and set a strong database password. Never commit `.env`.
3. Run `docker compose up --build -d`.
4. Create the first superuser: `docker compose exec api python manage.py createsuperuser`.
5. Apply migrations: `docker compose exec api python manage.py makemigrations core && docker compose exec api python manage.py migrate`.
6. Create campuses, accounts, classes, faculty assignments and student enrolments in the protected Django admin. Use university-approved identity records only.

API routes (JWT bearer token required):
- `POST /api/v1/auth/token/` and `POST /api/v1/auth/refresh/`
- `GET /api/v1/campuses/`
- `POST /api/v1/attendance/mark/` (faculty must be assigned to the class; all students must be enrolled; transaction and audit record created)
- `GET /api/v1/attendance/me/`
- `GET /api/v1/notifications/me/`
- `POST /api/v1/notifications/<id>/read/`

Attendance payload example:
```json
{
  "class_id": 12,
  "subject_code": "CSE301",
  "subject_name": "Database Systems",
  "session_date": "2026-11-09",
  "period": "3",
  "records": [
    {"student_id": 204, "status": "PRESENT"},
    {"student_id": 205, "status": "ABSENT"}
  ]
}
```

The attendance API creates an in-app notification per student and an audit event in the same database transaction. Actual remote push delivery is intentionally not faked: configure the university's approved FCM/APNs provider, device-token registration endpoint, background delivery worker, retries, dead-letter handling and delivery receipts before claiming push alerts are live. The mobile shell includes notification permission handling, but the device registration route and provider worker are still to be implemented.

## Multi-campus and security model
- Every user can be assigned a campus. Campus administrators and faculty are restricted to their own campus/class by the API.
- Roles are server-side fields; frontend role selection is not authorization.
- JWT access tokens are short-lived. Add refresh-token revocation/blacklisting, MFA, SSO/LDAP/AD integration, login throttling, password reset, account lifecycle and privileged-access approval before production.
- Audit events are created for attendance writes. Extend immutable audit coverage to all sensitive modules and export logs to the university SIEM.
- Do not store card data. Use a PCI-compliant payment gateway and store provider transaction references only.

## Mobile setup
1. Install Node.js LTS and Expo tooling.
2. In `mobile/`, run `npm install` then `npx expo start`.
3. Set `API_URL` in `mobile/App.js` to the university's HTTPS API domain.
4. Configure real Android package signing, iOS bundle provisioning, APNs credentials and Firebase/Expo push credentials. Current mobile file is a starter shell, not a store-ready application.

## Required implementation phases before go-live
1. **Discovery and governance:** obtain existing ERP database schema, API/export formats, campus/org hierarchy, official academic regulations, roles, approval matrices, retention schedule, privacy notice, and signed module requirements.
2. **Master data & identity:** campuses, schools, departments, programmes, academic years, terms, courses, rooms, people, SSO, MFA and role/attribute-based permissions.
3. **Student lifecycle:** enquiry, application, document verification, admission, enrolment, registration, progression, withdrawal, alumni.
4. **Academic operations:** curriculum, sections, faculty workload, timetable, room allocation, attendance policies, leave/condonation, LMS, assignments and advising.
5. **Examinations:** exam forms, seating, invigilation, marks entry, moderation, result approval, transcripts, revaluation, backlog and degree audit.
6. **Finance:** fee rules, scholarships, concessions, invoices, receipts, gateway integration, refunds, reconciliation, accounting export and approvals.
7. **Campus services:** library, hostel, transport, inventory, HR/payroll, placements, grievances, events and certificates.
8. **Regulatory & analytics:** configurable NAAC/NBA/UGC/AICTE reporting as applicable, evidence repository, statutory registers and role-restricted dashboards.
9. **Migration:** profile old data, deduplicate, map IDs, dry-run imports, reconcile counts and financial totals, obtain registrar/finance sign-off, and preserve a rollback path.
10. **Operations:** HA database, encrypted backups, off-site copy, restore drills, monitoring, alerting, vulnerability scans, patching, incident response, DR RPO/RTO, load testing and UAT.

## Scale and capacity
The target of 1,000+ employees and 5,000–15,000 students is reasonable for a properly sized relational application, but infrastructure sizing must be based on concurrent-user, peak registration, exam-result and attendance load tests. Start with a university-managed Linux VM cluster, separate DB storage, redundant app instances and tested backups; do not treat this single-node Compose file as high availability.

## Compliance and sign-off
Have the university's legal/privacy/security and academic offices validate applicable Indian data protection obligations, record retention, consent/notice, student/guardian communication, accessibility, payment and statutory reporting requirements. Do not assume every accreditation/reporting framework applies; confirm with the institution.
