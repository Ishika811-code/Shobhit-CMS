# Shobhit University Gangoh CMS - Frontend

This is a responsive React/Vite frontend prototype for the multi-campus university management system.

## Run on Windows PowerShell

```powershell
npm.cmd install
npm.cmd run dev
```

Open the localhost URL printed by Vite.

## Included frontend workspaces

Dashboard, Admissions, Students, Faculty & Staff, Departments, Courses & Subjects, Timetable, Attendance, Examinations, Results & Grades, Assignments, Fees & Payments, Scholarships, Library, Hostel, Transport, Campus & Rooms, HR & Payroll, Leave Management, Placement & Careers, Health Centre, Announcements, Messages, Reports & Analytics, and Settings.

The portal has Student, Faculty and Admin preview roles, campus selector, responsive navigation, module search, record tables, local preview record creation, and CSV export. Added records are saved in this browser's localStorage.

## Important: frontend preview versus a live university system

The included records are sample data. Role switching is a preview feature, not secure authentication. Local browser storage is not a shared database. CSV export is client-side. No live university records, real payments, attendance devices, push notifications, or official workflows are connected by this frontend alone.

To make this a live university system, connect it to the Django REST API and PostgreSQL backend, implement server-side authorization and campus-level access, add real authentication (preferably university SSO/MFA), and integrate approved payment, email/SMS/push, LMS, library, and other institutional services. Test with anonymized data before migration. Do not use sample credentials or sample figures as official records.
