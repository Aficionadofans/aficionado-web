import { Card, CardContent } from "@/shared/ui/core/card";
import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CircleHighlightProps {
  circle: {
    id: string;
    name: string;
    description: string | null;
  };
  index: number;
}

export function CircleHighlight({ circle, index }: CircleHighlightProps) {
  return (
    <Link href={`/communities`}>
      <Card 
        className="liquid-glass-hover border-white/10 cursor-pointer animate-fade-in-up overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-emerald/60" 
        style={{ animationDelay: `${(index + 5) * 100}ms`, animationFillMode: 'forwards' }}
      >
        <CardContent className="p-4 sm:p-5 relative">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-sm sm:text-base font-bold text-off-white truncate group-hover:text-bio-emerald transition-colors">
              {circle.name}
            </h3>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-bio-emerald bg-bio-emerald/10 border border-bio-emerald/20 px-2 py-0.5 rounded-full shrink-0">
              <Users className="w-3 h-3" /> Circle
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {circle.description || 'A vibrant community circle for like-minded aficionados.'}
          </p>
          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-muted-foreground group-hover:text-off-white transition-colors">
            <span>Explore Circle</span>
            <ArrowRight className="w-3.5 h-3.5 text-bio-emerald transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

