#!/bin/bash
# Third-party Secret Scanning via Gitleaks

if ! command -v gitleaks &> /dev/null; then
    echo "gitleaks could not be found. Attempting to install via Homebrew..."
    if command -v brew &> /dev/null; then
        brew install gitleaks
    else
        echo "❌ Homebrew is not installed. Please install gitleaks manually: https://github.com/zricethezav/gitleaks"
        exit 1
    fi
fi

echo "Running Gitleaks scan on staged files..."
gitleaks protect --staged --verbose
