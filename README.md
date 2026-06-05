# Aficionado Web

Aficionado Web is the Next.js 16 client for the Aficionado Wellness App ecosystem. Built with a focus on an anti-addiction design philosophy (no infinite scrolling) and an elegant, premium "Liquid Glass" aesthetic.

## Architecture & Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4, custom `@utility liquid-glass`
- **Icons**: Lucide React
- **Backend/Auth**: Supabase SSR
- **Deployment**: Vercel

## Key Design Principles
1. **Liquid Glass Aesthetic**: Utilizing dynamic, pulsating background glowing orbs mixed with `backdrop-filter: blur(32px)` to create a premium, translucent glass effect over vibrant background colors. We use `@utility liquid-glass` and `@utility liquid-glass-hover` to achieve deep shadow and lifted hover states.
2. **Micro-Animations**: All lists and cards use staggered fade-in animations (`animate-fade-in-up`), and hover states provide subtle scaling or translating effects for a highly interactive, tactile feel.
3. **Finite Navigation**: Core sections (`/home`, `/explore`, `/create`, `/circles`, `/progress`) have fixed endpoints. There is no infinite scrolling, reducing mindless engagement.
4. **Responsive**: A dedicated bottom bar for mobile and a side rail for desktop screens with animated active states.

## Local Development

```bash
# Install dependencies using bun
bun install

# Run the development server
bun dev
```

### Environment Variables
You will need a `.env.local` file placed at the root of the web project with the following Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Deployment
This project is configured for seamless deployment on Vercel. Pushing to the `main` branch on GitHub automatically triggers a production deployment.

## Next.js 16 Caveats
- The `middleware.ts` file convention is deprecated in Next.js 16. Use `src/proxy.ts` for all route interception and Supabase auth session management.
