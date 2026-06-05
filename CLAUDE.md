@AGENTS.md

# Commands
- Install deps: `bun install`
- Dev server: `bun dev`
- Build: `bun run build`
- Deploy to Vercel manually: `bunx vercel --prod`

# Architecture Rules
- Use Next.js App Router conventions.
- Do NOT use `middleware.ts`, it is deprecated in Next.js 16. Use `src/proxy.ts` instead.
- For Supabase Server Actions, always use `createClient()` from `src/utils/supabase/server.ts`.
- ALWAYS use `bun` for package management and running scripts (e.g., `bun install`, `bun run dev`, `bun run build`). Do not use npm or yarn.
- Components in `src/components/` and `src/app/` should use Tailwind v4 utility classes.
- Prioritize the `liquid-glass` and `liquid-glass-hover` classes for cards and panels.
- Emphasize micro-animations: Use `animate-fade-in-up` with staggered inline delays for mounting lists/feeds, and ensure buttons and interactive elements have tactile hover transformations (`hover:-translate-y-0.5`, `active:scale-95`).
