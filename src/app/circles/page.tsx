import { Users, Lock } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default async function CirclesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch circles the user is a member of
  const { data: memberships } = await supabase
    .from('circle_members')
    .select(`
      circles (
        id,
        name,
        description
      )
    `)
    .eq('user_id', user?.id);

  const myCircles = memberships?.map(m => m.circles) || [];

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto lg:py-12">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-off-white animate-fade-in-up">Circles</h1>
          <p className="mt-2 text-muted-foreground animate-fade-in-up" style={{ animationDelay: '100ms' }}>Your private accountability groups.</p>
        </div>
        <button className="px-5 py-2.5 text-sm font-semibold transition-all duration-300 bg-white/10 text-off-white rounded-full hover:bg-white/20 hover:shadow-[0_4px_15px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 active:scale-95 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Create Circle
        </button>
      </header>

      <div className="space-y-5">
        {myCircles.length > 0 ? (
          myCircles.map((circle: any, index: number) => (
            <Card key={circle.id} className="liquid-glass-hover border-white/10 group cursor-pointer animate-fade-in-up opacity-0 overflow-hidden" style={{ animationDelay: `${(index + 3) * 100}ms`, animationFillMode: 'forwards' }}>
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-deep-plum to-[#1A0F1D] flex items-center justify-center border border-white/10 shadow-inner">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-off-white flex items-center gap-2 mb-1">
                      {circle.name} <Lock className="w-3 h-3 text-muted-foreground" />
                    </h3>
                    <Badge variant="secondary" className="bg-white/5 text-muted-foreground hover:bg-white/10 border-white/10 font-normal">Active circle</Badge>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  <Avatar className="w-8 h-8 border-2 border-[#121212]">
                    <AvatarFallback className="bg-charcoal"></AvatarFallback>
                  </Avatar>
                  <Avatar className="w-8 h-8 border-2 border-[#121212]">
                    <AvatarFallback className="bg-charcoal"></AvatarFallback>
                  </Avatar>
                  <Avatar className="w-8 h-8 border-2 border-[#121212]">
                    <AvatarFallback className="bg-charcoal text-[10px] text-muted-foreground">+2</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">You haven't joined any circles yet.</p>
        )}

        <div className="p-6 border border-dashed border-white/20 rounded-2xl text-center mt-8">
          <p className="text-muted-foreground mb-4">Looking for more support?</p>
          <button className="text-primary font-medium hover:underline">
            Browse public circles
          </button>
        </div>
      </div>
    </div>
  );
}
