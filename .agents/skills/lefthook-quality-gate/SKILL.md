---
name: lefthook-quality-gate
description: Standards and maintenance workflows for the domain-wide Lefthook git hooks and security scanning pipeline.
---

# Lefthook Quality & Security Gate Protocol

## Overview
This skill governs the local pre-commit, commit-msg, and pre-push quality and security gates installed across all three repositories (`aficionado-app`, `aficionado-web`, `aficionado-backend`).

## Gate Definitions

### 1. `pre-commit` Hook
- **`secret-scan` ([`security-scan.sh`](file:///Users/devastatingdebater/dev/work/aficionado/aficionado-web/scripts/security-scan.sh)):** Checks staged files for unencrypted private key headers, live Stripe secret keys, OpenAI project keys, and forbidden file extensions (`.env`, `.key`, `.pem`, `.p12`).
- **`gitleaks-scan` ([`gitleaks-scan.sh`](file:///Users/devastatingdebater/dev/work/aficionado/aficionado-web/scripts/gitleaks-scan.sh)):** Audits entropy and credential patterns via Gitleaks.
- **`check-branch` ([`check-branch.sh`](file:///Users/devastatingdebater/dev/work/aficionado/aficionado-web/scripts/check-branch.sh)):** Validates branch prefix matches `feat/`, `fix/`, `chore/`, `refactor/`, `docs/`, or `style/`.
- **Linter / Formatter:**
  - Web: `npx biome check --write {staged_files}` & `npx oxlint {staged_files}`
  - Backend: `npx biome check --write {staged_files}`
  - App: `swift build` & `swift test`

### 2. `commit-msg` Hook
- **`conventional-commit`:** Enforces standard Conventional Commits regex:
  `^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9_-]+\))?: .+`

### 3. `pre-push` Hook
- Executes full unit and component test suites (`npm run test` / `swift test`).
- Audits critical dependency vulnerabilities (`npm audit --audit-level=critical`).
- Verifies license compliance against restrictive GPL/AGPL licenses.

## Troubleshooting & Reinstallation
If hooks are ever bypassed or lost:
```bash
bun run prepare   # or npx lefthook install
```
