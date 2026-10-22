# College CMS — Setup Guide

## 1. Prerequisites

Install the following tools:

- **Python:** A version supported by the selected Django release.
- **pip:** Python package installer.
- **Node.js and npm:** Required for the React/Vite frontend.
- **MySQL Server:** A locally installed instance or an approved development database.
- **Git:** For version control.
- **VS Code:** Recommended editor.

Verify installation:

```bash
python --version
python -m pip --version
node --version
npm --version
mysql --version
git --version
```

## 2. Clone the Repository

```bash
git clone <REPOSITORY_URL>
cd college-cms
```

Replace `<REPOSITORY_URL>` with the actual GitHub repository URL.

## 3. Create Your Feature Branch

```bash
git switch main
git pull origin main
git switch -c feature/your-task
```

Follow the naming rules in `07-GIT-WORKFLOW.md`.

## 4. Project Structure

The target structure is:

```text
college-cms/
├── client/          # React frontend
├── server/          # Django backend
│   ├── manage.py
│   ├── config/
│   └── apps/
├── docs/            # Project documentation
├── .gitignore
└── README.md
```

Do not create duplicate frontend or backend projects. Coordinate before changing the shared structure.

## 5. Frontend Setup

Once the React application has been initialized inside `client/`:

```bash
cd client
npm install
npm run dev
```

Open the local URL shown in your terminal.

## 6. Backend Setup

Create and activate a virtual environment, then install the backend dependencies from the requirements file maintained by the Django team:

```bash
cd server
python -m venv .venv
```

On Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

On macOS/Linux:

```bash
source .venv/bin/activate
python -m pip install -r requirements.txt
```

Create a MySQL database and a least-privilege development user. Configure `server/.env` using the project's Django settings, for example:

```env
DJANGO_SECRET_KEY=replace-with-a-local-development-value
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=college_cms
DB_USER=college_cms_user
DB_PASSWORD=replace-with-local-password
DB_HOST=127.0.0.1
DB_PORT=3306
```

The exact variable names must match the settings implementation. Do not commit this file. Apply migrations and create a local admin account:

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The development API will be available at the address printed by Django, commonly `http://127.0.0.1:8000/`.

## 7. Environment Variables

- Keep secrets and credentials in `.env`.
- Never commit `.env` to GitHub.
- Commit `.env.example` with placeholder values instead.
- Use your own local database credentials.
- Ask the backend lead if required variables are missing.

## 8. Team Collaboration

Before starting work:

1. Pull the latest changes from `main`.
2. Read `01-PROJECT-OVERVIEW.md`.
3. Read `08-TEAM-RESPONSIBILITIES.md`.
4. Check `05-API-CONTRACTS.md` and `06-DATABASE-SCHEMA.md` where relevant.
5. Work only on your assigned module and feature branch.
6. Test your changes and open a pull request.

## 9. Troubleshooting

- **Frontend dependencies missing:** Run `npm install` inside `client/`.
- **Python dependencies missing:** Activate the virtual environment and install the backend requirements.
- **MySQL connection failed:** Check that MySQL is running, the database/user exist, and the database environment variables match Django settings.
- **Migration errors:** Check the configured database, review pending migrations with `python manage.py showmigrations`, and coordinate schema changes with the owning team.
- **Port already in use:** Stop the other process or configure a different port.
- **Merge conflicts:** Resolve them carefully, then test your changes.
- **Missing frontend scripts:** Check `client/package.json` before running commands.
- **Django command not found:** Confirm the virtual environment is active and dependencies are installed.

## 10. Important Rules

- Do not commit `node_modules/`, `.env`, or build output.
- Do not change shared APIs or database schemas without team discussion.
- Keep your branch updated with `main`.
- Test before opening a pull request.
- Ask your team lead if setup instructions are incomplete.