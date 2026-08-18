#!/usr/bin/env bash

# Security Scanner Script for Aficionado Web Git Hooks
# Scans staged files for sensitive keys, credentials, and forbidden file extensions.

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# 1. Check for forbidden file names staged in git
FORBIDDEN_FILES=$(git diff --cached --name-only | grep -E '\.env$|\.env\.local$|\.env\.production$|\.pem$|\.key$|\.p12$|id_rsa|id_ed25519' || true)

if [ -n "$FORBIDDEN_FILES" ]; then
    echo -e "${RED}❌ Security Audit Failed: The following forbidden sensitive files are staged for commit:${NC}"
    echo "$FORBIDDEN_FILES"
    ERRORS=$((ERRORS + 1))
fi

# 2. Check staged file contents for exposed secret key patterns
STAGED_FILES=$(git diff --cached --name-only --diff-filter=d | grep -v -E '\.png$|\.jpg$|\.jpeg$|\.svg$|\.pdf$|package-lock\.json$|bun\.lock$|scripts/security-scan\.sh' || true)

if [ -n "$STAGED_FILES" ]; then
    # Scan for private keys
    if git diff --cached -S "BEGIN PRIVATE KEY" -- $STAGED_FILES | grep -q .; then
        echo -e "${RED}❌ Security Audit Failed: Found unencrypted Private Key block in staged files!${NC}"
        ERRORS=$((ERRORS + 1))
    fi

    # Scan for Stripe live secret keys
    if git diff --cached -S "sk_live_" -- $STAGED_FILES | grep -q .; then
        echo -e "${RED}❌ Security Audit Failed: Found live Stripe secret key (sk_live_...) in staged files!${NC}"
        ERRORS=$((ERRORS + 1))
    fi

    # Scan for OpenAI API keys
    if git diff --cached -S "sk-proj-" -- $STAGED_FILES | grep -q .; then
        echo -e "${RED}❌ Security Audit Failed: Found hardcoded OpenAI API key in staged files!${NC}"
        ERRORS=$((ERRORS + 1))
    fi
fi

if [ "$ERRORS" -gt 0 ]; then
    echo -e "${RED}FAILED: Please remove exposed credentials or unstage sensitive files before committing.${NC}"
    exit 1
fi

echo -e "${GREEN}🔒 Security scan passed: No exposed credentials or forbidden files detected.${NC}"
exit 0
