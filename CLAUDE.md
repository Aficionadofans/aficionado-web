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
- Components in `src/components/` should use Tailwind v4 utility classes and prioritize the `liquid-glass` class for panels.
