# Publish TaskFlow to GitHub

1. Create a **public** repository on GitHub named `taskflow-task-management`.
2. Do not initialize it with a README if you plan to push this existing folder (this folder already has a README).
3. Extract this ZIP and open a terminal in the `TaskFlow` folder.
4. Run the commands below, replacing `YOUR-USERNAME` with your GitHub username:

```bash
git init
git add .
git commit -m "chore: add TaskFlow Angular starter"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/taskflow-task-management.git
git push -u origin main
```

5. Open Codzee, sign in with GitHub, install it for this repository, and confirm it can access pull requests.
6. Follow `README.md` and `PR_TEMPLATES.md` to make three separate, meaningful PRs.
7. Fill out `CODE_REVIEW_NOTES_TEMPLATE.md` based on Codzee's actual reviews.

## Important
The app folder is source code, not a hosted website. Run `npm install`, `npm test`, and `npm run build` before treating it as ready. The code has not been executed in this file-generation environment, so verify it locally and fix any environment-specific issues before pushing.
