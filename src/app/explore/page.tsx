import { Search, Hash, Star, UserCircle2 } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ExplorePage() {
  const supabase = await createClient();

  // Fetch some public profiles (simulating 'featured creators')
  const { data: featuredCreators } = await supabase
    .from('profiles')
    .select('id, avatar_url, ai_tone, bio')
    .limit(5);

  // Fetch some public circles
  const { data: activeCircles } = await supabase
    .from('circles')
    .select('id, name, description')
    .limit(5);

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto lg:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-off-white">Explore</h1>
        <p className="mt-2 text-muted-foreground">Discover creators, rooms, and new challenges.</p>
      </header>

      <div className="relative mb-10">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
        <Input 
          type="text" 
          placeholder="Search categories..." 
          className="w-full pl-10 pr-4 py-6 bg-white/5 border-white/10 rounded-xl text-off-white placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:border-primary/50 focus-visible:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all duration-300"
        />
      </div>

      <div className="space-y-12">
        {/* Featured Creators Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-off-white">Featured Creators</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredCreators && featuredCreators.length > 0 ? (
              featuredCreators.map((creator, index) => (
                <Card key={creator.id} className="liquid-glass-hover border-white/10 cursor-pointer animate-fade-in-up opacity-0 overflow-hidden" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
                  <CardContent className="p-5 flex items-center gap-4">
                    <Avatar className="w-12 h-12 border border-white/10">
                      <AvatarImage src={creator.avatar_url || ''} alt="Avatar" />
                      <AvatarFallback className="bg-white/10">
                        <UserCircle2 className="w-6 h-6 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-off-white truncate">{creator.ai_tone || 'User'}</h3>
                      <p className="text-xs text-muted-foreground truncate">{creator.bio || 'Wellness Enthusiast'}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No creators found.</p>
            )}
          </div>
        </section>

        {/* Active Circles/Challenges Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Hash className="w-5 h-5 text-deep-plum" />
            <h2 className="text-xl font-semibold text-off-white">Active Circles</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeCircles && activeCircles.length > 0 ? (
              activeCircles.map((circle, index) => (
                <Card key={circle.id} className="liquid-glass-hover border-white/10 cursor-pointer animate-fade-in-up opacity-0 overflow-hidden" style={{ animationDelay: `${(index + 5) * 100}ms`, animationFillMode: 'forwards' }}>
                  <CardContent className="p-5">
                    <h3 className="text-base font-medium text-off-white truncate mb-1">{circle.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{circle.description || 'A community circle.'}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No active circles found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
