<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Aficionado Web Agent Guidelines

When working on the Aficionado Web project, all agents MUST follow these core guidelines:

1. **Next.js 16 Proxy Convention**: Never use `src/middleware.ts`. It is deprecated. All route protection and Supabase session management happens in `src/proxy.ts`.
2. **Liquid Glass Aesthetic & Animations**: The app uses a highly customized "Liquid Glass" theme.
   - Use the `@utility liquid-glass` and `@utility liquid-glass-hover` tailwind classes for cards and containers instead of standard bg colors.
   - The global layout uses fixed, dynamically pulsating ambient glowing orbs in the background to provide vibrant colors for the glass to blur. Do not remove them.
   - Always implement micro-animations for interactivity: use `animate-fade-in-up` for staggered content mounting, and include tactile hover states for buttons.
3. **Package Manager**: Use `bun` exclusively for installing dependencies and running scripts. Do not use npm or yarn.
4. **Finite Navigation**: Do not add infinite scrolling. The app strictly enforces finite feeds and content limits to promote digital well-being.
5. **Supabase SSR**: Always use the provided helper clients (`src/utils/supabase/server.ts` and `client.ts`) for database queries. Never fetch directly from the client without the helper.
6. **Vercel Environments**: The app depends on Vercel environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`). Ensure you run builds locally using `bun run build` to verify typings before pushing.
