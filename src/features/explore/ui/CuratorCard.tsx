import { UserCircle2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/core/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/core/avatar";
import Link from "next/link";

interface CuratorCardProps {
  creator: {
    id: string;
    avatar_url: string | null;
    ai_tone: string | null;
    bio: string | null;
  };
  index: number;
}

export function CuratorCard({ creator, index }: CuratorCardProps) {
  const titleName = creator.ai_tone || 'Featured Aficionado';
  const bioText = creator.bio || 'Curating intentional content daily.';

  return (
    <Link href={`/creator`}>
      <Card 
        className="trend-card-hover border-white/10 cursor-pointer overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 hover:shadow-[0_0_24px_rgba(0,212,200,0.35)]"
      >
        <CardContent className="p-5 flex items-center gap-4 relative">
          <div className="relative">
            <Avatar className="w-12 h-12 border border-white/20 shadow-[0_0_16px_rgba(0,212,200,0.25)] transition-transform duration-300 group-hover:scale-105">
              <AvatarImage src={creator.avatar_url || ''} alt={titleName} />
              <AvatarFallback className="bg-white/10">
                <UserCircle2 className="w-6 h-6 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-bio-emerald border-2 border-[#0A0A0C] shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/25">
                Verified Creator
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white truncate group-hover:text-primary transition-colors tracking-tight">
              {titleName}
            </h3>
            <p className="text-xs text-muted-foreground/90 truncate leading-relaxed">
              {bioText}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-primary transition-all duration-300 flex-shrink-0" />
        </CardContent>
      </Card>
    </Link>
  );
}

