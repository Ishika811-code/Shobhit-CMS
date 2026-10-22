# Git Workflow — College CMS

## 1. Basic Rules
- All teams work in the same GitHub repository.
- Never commit directly to `main`.
- Create a separate branch for each task.
- Pull requests (PRs) are required before merging.
- Keep commits small and meaningful.

## 2. Branch Naming

Use these prefixes:

- `feature/` — New features
- `fix/` — Bug fixes
- `docs/` — Documentation

Examples:
- `feature/auth-login`
- `feature/library-search`
- `fix/attendance-validation`
- `docs/api-contracts`

## 3. Development Workflow

```bash
git switch main
git pull origin main
git switch -c feature/your-task

# Write and test your code
git add .
git commit -m "feat: describe your change"
git push -u origin feature/your-task
```

Open a Pull Request on GitHub targeting `main`.

## 4. Pull Request Rules
Before merging:
- Ensure the React/Vite frontend builds and its relevant tests pass.
- Ensure the Django system checks and relevant backend tests pass.
- Review Django migrations and confirm they apply cleanly when backend models change.
- Request a review from your team lead or designated reviewer.
- Resolve review comments.
- Confirm that shared code and API contracts remain compatible.

Only merge after approval and passing required checks.

## 5. Keeping Your Branch Updated

```bash
git switch main
git pull origin main
git switch feature/your-task
git merge main
```

Resolve conflicts carefully, test your changes, and push the updated branch.

## 6. Commit Message Convention

Use clear prefixes:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `refactor:` Code improvement
- `test:` Tests
- `chore:` Configuration or maintenance

Example: `feat: add event registration`

## 7. Responsibilities
- **Developers:** Write code, test, commit, and open PRs.
- **Team leads:** Review module changes.
- **Project head:** Review architectural and cross-team changes.

**Golden rule:** Keep `main` stable, communicate changes to shared code, and integrate frequently.