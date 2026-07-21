import { UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/core/avatar";

interface CuratorCardProps {
  creator: {
    id: string;
    avatar_url: string | null;
    ai_tone: string | null;
    bio: string | null;
  };
  index: number;
}

export function CuratorCard({ creator }: CuratorCardProps) {
  const displayName = creator.ai_tone || "Featured Aficionado";
  const bioText = creator.bio || "Curating intentional content daily.";

  return (
    <div className="clipcut-card-hover flex flex-col items-center text-center gap-4 p-6 cursor-pointer">
      {/* Creator avatar */}
      <Avatar className="w-16 h-16 border border-white/20 shadow-[0_0_16px_rgba(0,212,200,0.25)]">
        <AvatarImage src={creator.avatar_url || ""} alt={displayName} />
        <AvatarFallback className="bg-white/10">
          <UserCircle2 className="w-8 h-8 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>

      {/* Display name — Syne font-bold */}
      <h3
        className="text-base font-bold text-white leading-tight tracking-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {displayName}
      </h3>

      {/* Bio — 2-line clamp */}
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {bioText}
      </p>

      {/* Follow CTA — teal clipcut-pill */}
      <button
        type="button"
        className="clipcut-pill text-xs font-bold uppercase tracking-[0.05em] px-4 py-1.5 rounded-full"
      >
        Follow
      </button>
    </div>
  );
}
