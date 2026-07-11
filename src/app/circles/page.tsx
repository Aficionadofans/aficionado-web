import { createClient } from "@/shared/lib/supabase/server";
import { CircleCard } from "@/features/circles/ui/CircleCard";
import { EmptyState } from "@/features/circles/ui/EmptyState";

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
            <CircleCard key={circle.id} circle={circle} index={index} />
          ))
        ) : (
          <p className="text-muted-foreground">You haven't joined any circles yet.</p>
        )}

        <EmptyState />
      </div>
    </div>
  );
}
