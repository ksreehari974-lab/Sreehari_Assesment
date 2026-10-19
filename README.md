# TaskFlow — Angular Task Management App

TaskFlow is a small, responsive Angular + TypeScript application created as a practical code-review evaluation project. It includes CRUD operations, search, status filters, priority, due dates, local persistence, validation, and unit tests.

## Requirements

- Node.js 20.11+ (recommended for Angular 19)
- npm
- Git
- GitHub account
- Codzee account connected to GitHub

## Run locally

```bash
npm install
npm start
```

Open the local URL printed by Angular CLI (usually `http://localhost:4200`).

Run tests:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

## Features

- Create, edit, and delete tasks
- Required title validation and whitespace trimming
- Search by task title or description
- Filter by Pending, In Progress, and Completed
- Priority and optional due date
- Local browser storage with graceful recovery from malformed or unavailable storage
- Responsive layout and accessible labels
- Unit tests for task creation, validation, updating, deletion, and persistence

> This demo uses browser localStorage, not a remote database. Tasks are stored in the current browser profile.

## Suggested PR plan

Create a separate branch and PR for each step. Do not combine all work into one PR.

### PR 1 — `fix: validate task input and handle invalid storage`
Scope:
- Review title validation and error handling.
- Test whitespace-only titles and malformed localStorage.
- Add/fix tests if you find a defect.
- Include before/after behavior in the PR description.

### PR 2 — `feat: add task search and status filters`
Scope:
- Review the search and status filter implementation.
- Add tests for case-insensitive search, description search, combined filters, and no-results state.
- Make any real improvements you identify.

### PR 3 — `test: cover task lifecycle and edge cases`
Scope:
- Expand unit test coverage for update, delete, status changes, and storage recovery.
- Fix any bugs exposed by tests.
- Report test command and results in the PR description.

The starter project already contains some of these capabilities as a baseline. Make a distinct, reviewed code change in each PR (for example, add missing tests, fix an issue, or improve a behavior); do not open PRs that merely restate existing functionality.

## Recommended Git workflow

```bash
git checkout -b fix/task-validation
# make and test changes
git add .
git commit -m "fix: improve task validation"
git push -u origin fix/task-validation
```

Open a PR on GitHub. Repeat with new branch names for the other PRs. If you are working in your own repository, the base branch is usually `main`.

## Codzee evaluation notes

After Codzee reviews each PR, record:
- PR URL and the change reviewed
- Review comments that were correct and why
- Incorrect or irrelevant comments, with evidence
- Bugs or edge cases missed, with reproduction steps
- Whether suggestions were actionable and prioritized
- Any confusing behavior or setup problems
- Specific product improvements you recommend

Keep feedback evidence-based. Do not claim a review found or missed an issue unless you observed it.

## Submission checklist

- [ ] Repository is public
- [ ] Codzee is installed and has access to the repository
- [ ] At least 3 meaningful PRs exist
- [ ] Each PR has a clear title, scope, and test evidence
- [ ] Codzee feedback has been reviewed and documented
- [ ] Repository and feedback are submitted through the form supplied by the recruiter

## Limitations / future improvements

- No backend or authentication; browser localStorage is used for demo persistence.
- Seed data is created when local storage is empty or invalid.
- Useful next steps include adding an API-backed repository service, pagination, keyboard shortcuts, and broader component tests.
