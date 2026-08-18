#!/bin/bash
# Enforce Branch Naming Convention

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
VALID_BRANCH_REGEX="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\/[a-zA-Z0-9_-]+)+$"

if [[ "$BRANCH_NAME" == "main" || "$BRANCH_NAME" == "master" ]]; then
  echo "❌ Direct commits to main/master are not allowed. Please create a feature or fix branch and open a PR."
  exit 1
fi

if ! [[ $BRANCH_NAME =~ $VALID_BRANCH_REGEX ]]; then
  echo "❌ Invalid branch name: $BRANCH_NAME"
  echo "Branch names must follow conventional naming (e.g., feat/add-login, fix/bug-123)"
  exit 1
fi

echo "✅ Branch name $BRANCH_NAME is valid."
