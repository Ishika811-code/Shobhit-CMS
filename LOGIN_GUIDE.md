# Shobhit University Portal Login

The frontend now opens on a branded sign-in page. Choose Student, Faculty, or Admin, enter a university ID/email and a non-empty password, and select Sign in. The selected portal dashboard opens. Use the profile menu and Sign out to return to the login page.

## Important authentication limitation
This is a frontend demonstration only. It does not validate credentials, create secure sessions, or protect university data. Any non-empty ID and password will enter the selected portal. Do not use real student or staff credentials. Before deployment, connect the form to the Django REST API, validate credentials server-side, enforce role and campus permissions, use secure token/session handling, and implement password reset and MFA policies.

## Run
```powershell
npm.cmd install
npm.cmd run dev
```
