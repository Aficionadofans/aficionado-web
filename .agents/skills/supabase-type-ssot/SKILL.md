---
name: supabase-type-ssot
description: >-
  Enforces Supabase as the Single Source of Truth (SSOT) for the TypeScript type system. Scans for inline UI interfaces, refactors them to derive from core database types using Pick and NonNullable, and verifies type safety.
---

# Supabase Type System SSOT Enforcer

## Overview
This skill ensures that UI components do not define duplicate, hardcoded inline interfaces (e.g., `interface Profile` or `interface Video`) that drift from the central Supabase database schema. It instructs the agent to systematically find these duplicate types, replace them with derived types from the canonical `src/shared/types/database.ts`, and run the TypeScript compiler to ensure strict type safety.

## Dependencies
- None. Relies on standard IDE capabilities (grep search, file editing) and a local TypeScript compiler.

## Quick Start
Trigger this skill by saying:
"Run the supabase-type-ssot skill to clean up our UI component types." or "Make sure that the type system is properly set up and Supabase is the single source of truth."

## Workflow

### 1. Identify Inline Types
- Search the codebase (specifically in `src/features/` and `src/app/`) for inline interface definitions using regex like `interface\s+(Profile|Post|Content|User|Video|Drop)\b`.
- Review the matched files to confirm if they are creating duplicate UI models instead of importing from the database schema.

### 2. Verify Canonical Schema
- Check `src/shared/types/database.ts` and `src/shared/types/supabase.ts` to ensure they contain all the latest table schemas and columns (e.g., if a new column was recently added).
- Update the canonical schema manually if a known recent database migration hasn't been synced.

### 3. Refactor Component Types
For each file containing duplicate types:
- **Remove** the inline interfaces.
- **Import** the corresponding base types from `src/shared/types/database.ts`.
- **Re-define** the UI types as composites using TypeScript utility types like `Pick`, `Omit`, and `NonNullable`.
  - *Example*: `type Drop = Pick<Post, 'id' | 'content'> & { creator: Profile['username'] }`
- **Fix Type Casts**: Ensure any type casting (e.g., `as string`) aligns with the exact property type in the database schema (e.g., `as Content['moderation_status']`).

### 4. Verify Type Safety
- Run the TypeScript compiler locally: `npx tsc --noEmit` (or `bun x tsc --noEmit` if using Bun).
- If the compiler reports errors, **automatically read the error logs, fix the type mismatches in the code, and re-run the compiler**.
- Repeat this self-correction loop until the compiler passes with 0 errors. Only ask the user for guidance if you are completely stuck in a loop.

## Rate Limiting
Not applicable (No external API calls).

## Common Mistakes
- **Failing to use Pick/Omit**: Directly using the full `Profile` type in a component's Props when the component only needs a subset. This causes TS errors when parent components don't fetch every single column from the database.
- **Missing Derived Fields**: Forgetting to map UI-specific fields (e.g., `hasUnread`) into the new composite type. Use intersection types (`& { hasUnread: boolean }`) for this.
- **Stopping at the first error**: Giving up when `tsc` throws an error instead of actively fixing the newly uncovered type mismatches.
