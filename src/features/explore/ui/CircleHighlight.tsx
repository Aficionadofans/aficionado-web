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
        className="trend-card-hover border-white/10 cursor-pointer animate-fade-in-up overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60" 
        style={{ animationDelay: `${(index + 5) * 100}ms`, animationFillMode: 'forwards' }}
      >
        <CardContent className="p-5 relative">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-base font-extrabold text-white truncate group-hover:text-primary transition-colors tracking-tight">
              {circle.name}
            </h3>
            <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/25 px-2.5 py-0.5 rounded-full shrink-0">
              <Users className="w-3 h-3" /> Community
            </span>
          </div>
          <p className="text-xs text-muted-foreground/90 line-clamp-2 leading-relaxed">
            {circle.description || 'A vibrant community circle for like-minded aficionados.'}
          </p>
          <div className="mt-4 pt-3 border-t border-white/8 flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-white transition-colors">
            <span>Explore Circle</span>
            <ArrowRight className="w-3.5 h-3.5 text-primary transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

