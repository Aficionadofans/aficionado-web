import { createClient } from "@/utils/supabase/server";
import { StatCards } from "@/components/progress/StatCards";
import { KintsugiTimeline } from "@/components/progress/KintsugiTimeline";

export default async function ProgressPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch all check-ins for the user
  const { data: checkIns } = await supabase
    .from('check_ins')
    .select('created_at')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  const totalCheckIns = checkIns?.length || 0;
  
  // Calculate resilience score (base it on total check-ins and recent consistency)
  const resilienceScore = totalCheckIns * 10 + 50; 

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto lg:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-off-white">Wellness Cockpit</h1>
        <p className="mt-2 text-muted-foreground">Track your journey and celebrate milestones.</p>
      </header>

      <StatCards totalCheckIns={totalCheckIns} resilienceScore={resilienceScore} />

      <KintsugiTimeline checkIns={checkIns || []} />
    </div>
  );
}
