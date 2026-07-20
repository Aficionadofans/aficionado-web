import { Hash, Star } from "lucide-react";
import { createClient } from "@/shared/lib/supabase/server";
import { DiscoverySearch } from "@/features/explore/ui/DiscoverySearch";
import { CuratorCard } from "@/features/explore/ui/CuratorCard";
import { CircleHighlight } from "@/features/explore/ui/CircleHighlight";
import { CreatorSpotlight } from "@/features/explore/ui/CreatorSpotlight";

export default async function ExplorePage() {
  const supabase = await createClient();

  // Fetch only a strictly curated, finite number of items
  const { data: featuredCreators } = await supabase
    .from('profiles')
    .select('id, avatar_url, ai_tone, bio')
    .limit(4); // Strictly limit to 4 per day

  const { data: activeCircles } = await supabase
    .from('circles')
    .select('id, name, description')
    .limit(4); // Strictly limit to 4 per day

  const { data: creatorSpotlights } = await supabase
    .from('creator_spotlights')
    .select('id, role, description, video_url, gradient, color')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return (
    <div className="relative min-h-[100dvh] bg-background overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-bio-teal/10 blur-[120px] mix-blend-screen animate-breathe-calm"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px] mix-blend-screen animate-breathe-calm" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-3xl px-4 py-8 mx-auto lg:py-12">
        <header className="mb-8 animate-fade-in-up">
          <p className="text-sm font-bold text-primary/90 uppercase tracking-widest mb-1 flex items-center gap-2">
            <Star className="w-3 h-3 fill-primary" /> Curated For You
          </p>
          <h1 className="text-4xl font-black tracking-tight text-off-white drop-shadow-md">Daily Discovery</h1>
          <p className="mt-3 text-muted-foreground text-sm font-medium text-pretty max-w-md leading-relaxed">
            A finite selection for today. No endless scrolling — by design. Quality over quantity.
          </p>
        </header>

        <DiscoverySearch />

        <div className="space-y-12">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full liquid-glass border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-off-white tracking-wide">Today's Voices</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {featuredCreators && featuredCreators.length > 0 ? (
                featuredCreators.map((creator, index) => (
                  <CuratorCard key={creator.id} creator={creator} index={index} />
                ))
              ) : (
                <p className="text-muted-foreground text-sm font-medium">No creators found today.</p>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full liquid-glass border-bio-emerald/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Hash className="w-5 h-5 text-bio-emerald" />
              </div>
              <h2 className="text-2xl font-bold text-off-white tracking-wide">Featured Circles</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {activeCircles && activeCircles.length > 0 ? (
                activeCircles.map((circle, index) => (
                  <CircleHighlight key={circle.id} circle={circle} index={index} />
                ))
              ) : (
                <p className="text-muted-foreground text-sm font-medium">No active circles found.</p>
              )}
            </div>
          </section>

          <CreatorSpotlight spotlights={creatorSpotlights || []} />
          
          {/* Anti-Dopamine Stopper */}
          <div className="pt-16 pb-12 text-center animate-fade-in-up" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto rounded-full mb-8"></div>
            <h3 className="text-xl font-bold text-off-white mb-3 tracking-wide">You're all caught up.</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8 leading-relaxed text-pretty">
              That's everything for today. We intentionally limit your feed to protect your mental health. Go outside, call a friend, or just breathe.
            </p>
            <a href="/home" className="inline-block px-6 py-2 rounded-full liquid-glass-hover text-sm text-primary font-medium tracking-wide">
              → Return to home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
