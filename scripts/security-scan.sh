#!/usr/bin/env bash

# ──────────────────────────────────────────────────────────────
# Security Scanner Script for Aficionado Git Hooks (Enterprise Prod)
# Scans staged files for sensitive keys, credentials, and forbidden file extensions.
# ──────────────────────────────────────────────────────────────

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# 1. Check for forbidden file names staged in git
FORBIDDEN_FILES=$(git diff --cached --name-only | grep -E '\.env$|\.env\.local$|\.env\.production$|\.pem$|\.key$|\.p12$|\.p8$|id_rsa|id_ed25519' || true)

if [ -n "$FORBIDDEN_FILES" ]; then
    echo -e "${RED}❌ Security Audit Failed: The following forbidden sensitive files are staged for commit:${NC}"
    echo "$FORBIDDEN_FILES"
    ERRORS=$((ERRORS + 1))
fi

# 2. Check staged file contents for exposed secret key patterns (excluding non-code/docs)
STAGED_FILES=$(git diff --cached --name-only --diff-filter=d | grep -v -E '\.png$|\.jpg$|\.jpeg$|\.pdf$|\.resolved$|\.md$|package-lock\.json$|bun\.lock$|\.build/|scripts/security-scan\.sh' || true)

if [ -n "$STAGED_FILES" ]; then
    # Scan for private keys
    if git diff --cached -S "BEGIN PRIVATE KEY" -S "BEGIN RSA PRIVATE KEY" -S "BEGIN EC PRIVATE KEY" -- $STAGED_FILES | grep -q -E 'BEGIN (RSA |EC )?PRIVATE KEY'; then
        echo -e "${RED}❌ Security Audit Failed: Found unencrypted Private Key block in staged files!${NC}"
        ERRORS=$((ERRORS + 1))
    fi

    # Scan for Stripe live secret keys & webhook secrets (actual tokens)
    if git diff --cached -G "sk_live_[0-9a-zA-Z]{20,}|rk_live_[0-9a-zA-Z]{20,}|whsec_[0-9a-zA-Z]{20,}" -- $STAGED_FILES | grep -q -E 'sk_live_[0-9a-zA-Z]{20,}|rk_live_[0-9a-zA-Z]{20,}|whsec_[0-9a-zA-Z]{20,}'; then
        echo -e "${RED}❌ Security Audit Failed: Found live Stripe secret or webhook key in staged files!${NC}"
        ERRORS=$((ERRORS + 1))
    fi

    # Scan for OpenAI API keys
    if git diff --cached -G "sk-proj-[0-9a-zA-Z_-]{20,}|sk-admin-[0-9a-zA-Z_-]{20,}" -- $STAGED_FILES | grep -q -E 'sk-proj-[0-9a-zA-Z_-]{20,}|sk-admin-[0-9a-zA-Z_-]{20,}'; then
        echo -e "${RED}❌ Security Audit Failed: Found hardcoded OpenAI API key in staged files!${NC}"
        ERRORS=$((ERRORS + 1))
    fi

    # Scan for AWS access keys
    if git diff --cached -G "(AKIA|ASIA)[0-9A-Z]{16}" -- $STAGED_FILES | grep -q -E '(AKIA|ASIA)[0-9A-Z]{16}'; then
        echo -e "${RED}❌ Security Audit Failed: Found hardcoded AWS Access Key in staged files!${NC}"
        ERRORS=$((ERRORS + 1))
    fi

    # Scan for GitHub Personal Access Tokens
    if git diff --cached -G "ghp_[0-9a-zA-Z]{36}|github_pat_[0-9a-zA-Z_]{82}" -- $STAGED_FILES | grep -q -E 'ghp_[0-9a-zA-Z]{36}|github_pat_[0-9a-zA-Z_]{82}'; then
        echo -e "${RED}❌ Security Audit Failed: Found hardcoded GitHub token in staged files!${NC}"
        ERRORS=$((ERRORS + 1))
    fi

    # Scan for Resend API keys
    if git diff --cached -G "re_[0-9a-zA-Z_]{20,}" -- $STAGED_FILES | grep -q -E 're_[0-9a-zA-Z_]{20,}'; then
        echo -e "${RED}❌ Security Audit Failed: Found hardcoded Resend API key in staged files!${NC}"
        ERRORS=$((ERRORS + 1))
    fi
fi

if [ "$ERRORS" -gt 0 ]; then
    echo -e "${RED}FAILED: Please remove exposed credentials or unstage sensitive files before committing.${NC}"
    exit 1
fi

echo -e "${GREEN}🔒 Security scan passed: No exposed credentials or forbidden files detected.${NC}"
exit 0
