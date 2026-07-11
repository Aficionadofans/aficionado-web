import { ShieldCheck, Target, Calendar, Trophy } from "lucide-react";

interface StatCardsProps {
  totalCheckIns: number;
  resilienceScore: number;
}

export function StatCards({ totalCheckIns, resilienceScore }: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="liquid-glass p-4 text-center group hover:bg-white/5 transition-all">
        <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
        <div className="text-2xl font-bold text-off-white">{resilienceScore}</div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Resilience</div>
      </div>
      
      <div className="liquid-glass p-4 text-center group hover:bg-white/5 transition-all">
        <Target className="w-6 h-6 text-secondary-foreground/60 mx-auto mb-2 group-hover:scale-110 transition-transform" />
        <div className="text-2xl font-bold text-off-white">{totalCheckIns > 0 ? 'Active' : 'New'}</div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Status</div>
      </div>

      <div className="liquid-glass p-4 text-center group hover:bg-white/5 transition-all">
        <Calendar className="w-6 h-6 text-muted-foreground mx-auto mb-2 group-hover:scale-110 transition-transform" />
        <div className="text-2xl font-bold text-off-white">{totalCheckIns}</div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Check-ins</div>
      </div>

      <div className="liquid-glass p-4 text-center group hover:bg-white/5 transition-all">
        <Trophy className="w-6 h-6 text-primary mx-auto mb-2 opacity-80 group-hover:scale-110 transition-transform" />
        <div className="text-2xl font-bold text-off-white">{Math.floor(totalCheckIns / 7)}</div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Badges</div>
      </div>
    </div>
  );
}
