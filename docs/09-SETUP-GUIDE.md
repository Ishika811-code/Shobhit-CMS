# College CMS — Setup Guide

## 1. Prerequisites

Install the following tools:

- **Node.js:** LTS version
- **npm:** Included with Node.js
- **Git:** For version control
- **MongoDB:** Local installation or MongoDB Atlas account
- **VS Code:** Recommended editor

Verify installation:

```bash
node -v
npm -v
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

The project will use this structure:

```text
college-cms/
├── client/          # React frontend
├── server/          # Node.js + Express backend
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

Once the Express application has been initialized inside `server/`:

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/college_cms
```

Then start the backend using the script configured in `server/package.json`, for example:

```bash
npm run dev
```

The exact command depends on the backend scripts configured by the team.

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

- **Dependencies missing:** Run `npm install` in the relevant folder.
- **MongoDB connection failed:** Check that MongoDB is running and `MONGODB_URI` is correct.
- **Port already in use:** Stop the other process or configure a different port.
- **Merge conflicts:** Resolve them carefully, then test your changes.
- **Missing scripts:** Check `package.json` before running commands.

## 10. Important Rules

- Do not commit `node_modules/`, `.env`, or build output.
- Do not change shared APIs or database schemas without team discussion.
- Keep your branch updated with `main`.
- Test before opening a pull request.
- Ask your team lead if setup instructions are incomplete.