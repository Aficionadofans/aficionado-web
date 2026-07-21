import { Hash, Star, Compass } from "lucide-react";
import { createClient } from "@/shared/lib/supabase/server";
import { DiscoverySearch } from "@/features/explore/ui/DiscoverySearch";
import { CuratorCard } from "@/features/explore/ui/CuratorCard";
import { CircleHighlight } from "@/features/explore/ui/CircleHighlight";
import { CreatorSpotlight } from "@/features/explore/ui/CreatorSpotlight";
import { SectionHeader } from "@/shared/ui/core";
import { RevealSection } from "@/shared/ui/motion/RevealSection";
import Link from "next/link";

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
    <div className="relative min-h-[100dvh] bg-background overflow-hidden pb-20 md:pb-12">
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-bio-teal/10 blur-[120px] mix-blend-screen animate-breathe-calm"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px] mix-blend-screen animate-breathe-calm" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-3xl px-4 py-8 mx-auto lg:py-12">
        <header className="mb-8 animate-fade-in-up">
          <div className="clipcut-pill inline-flex items-center gap-2 px-3 py-1 mb-3">
            <Star className="w-3.5 h-3.5 fill-primary" />
            <span>Curated Daily</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-off-white drop-shadow-md">Daily Discovery</h1>
          <p className="mt-2 text-muted-foreground text-sm font-medium text-pretty max-w-md leading-relaxed">
            A finite, high-signal selection for today. No infinite scroll — by design.
          </p>
        </header>

        <DiscoverySearch />

        <div>
          <section aria-label="Today&apos;s Featured Voices">
            <SectionHeader
              variant="editorial"
              number="01"
              label="FEATURED VOICES"
              title="Today's Voices"
              icon={<Star className="w-5 h-5" />}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredCreators && featuredCreators.length > 0 ? (
                featuredCreators.map((creator, index) => (
                  <RevealSection key={creator.id} delay={index * 80}>
                    <CuratorCard creator={creator} index={index} />
                  </RevealSection>
                ))
              ) : (
                <div className="col-span-2 p-6 rounded-2xl trend-card text-center">
                  <p className="text-muted-foreground text-sm font-medium">No creators featured today. Check back tomorrow!</p>
                </div>
              )}
            </div>
          </section>

          <hr className="section-divider my-8" />

          <section aria-label="Featured Community Circles">
            <SectionHeader
              variant="editorial"
              number="02"
              label="COMMUNITY HUBS"
              title="Featured Circles"
              icon={<Hash className="w-5 h-5" />}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeCircles && activeCircles.length > 0 ? (
                activeCircles.map((circle, index) => (
                  <RevealSection key={circle.id} delay={index * 80}>
                    <CircleHighlight circle={circle} index={index} />
                  </RevealSection>
                ))
              ) : (
                <div className="col-span-2 p-6 rounded-2xl trend-card text-center">
                  <p className="text-muted-foreground text-sm font-medium">No active circles found right now.</p>
                </div>
              )}
            </div>
          </section>

          <hr className="section-divider my-8" />

          <CreatorSpotlight spotlights={creatorSpotlights || []} />

          <hr className="section-divider my-8" />

          {/* Anti-Dopamine Stopper */}
          <div className="pt-12 pb-8 text-center animate-fade-in-up">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto rounded-full mb-6"></div>
            <div className="liquid-glass p-8 rounded-3xl border border-white/10 max-w-lg mx-auto relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <Compass className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-off-white mb-2 tracking-wide">You&apos;re all caught up for today!</h3>
              <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed text-pretty">
                That&apos;s everything in today&apos;s digest. We limit daily content to help protect your attention and focus.
              </p>
              <Link 
                href="/home" 
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-xs sm:text-sm tracking-wide hover:bg-primary-hover transition-all shadow-[0_0_20px_rgba(0,212,200,0.3)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <span>Return to Feed</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

