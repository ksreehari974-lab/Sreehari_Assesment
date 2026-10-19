# Pull Request Templates

Use these as starting points and edit them to match the actual code change. Never claim tests passed unless you ran them.

## PR 1 — Bug fix

**Title:** `fix: validate task input and handle invalid storage`

### Problem
Describe the actual bug or edge case and how it can be reproduced.

### Change
- Explain the fix.
- Explain why it is safe.

### Validation
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Manually tested the affected flow

### Codzee review
Record the findings after Codzee has reviewed this PR.

---

## PR 2 — Feature

**Title:** `feat: improve task search and status filtering`

### Goal
Describe the user problem this change solves.

### Change
- Describe the new behavior.
- Describe empty-state and edge-case behavior.

### Validation
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Manually tested combined filters and no-results state

### Codzee review
Record the findings after Codzee has reviewed this PR.

---

## PR 3 — Tests / quality

**Title:** `test: cover task lifecycle and edge cases`

### Goal
Describe the untested behavior or risk.

### Change
- List tests added or code quality changes made.
- Mention any bug fixed based on the tests.

### Validation
- [ ] `npm test`
- [ ] `npm run build`

### Codzee review
Record the findings after Codzee has reviewed this PR.
