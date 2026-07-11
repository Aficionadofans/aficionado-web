import { Card, CardContent } from "@/shared/ui/core/card";

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
    <Card 
      className="liquid-glass-hover border-white/10 cursor-pointer animate-fade-in-up opacity-0 overflow-hidden group" 
      style={{ animationDelay: `${(index + 5) * 100}ms`, animationFillMode: 'forwards' }}
    >
      <CardContent className="p-5">
        <h3 className="text-base font-medium text-off-white truncate mb-1 group-hover:text-primary transition-colors">{circle.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{circle.description || 'A community circle.'}</p>
      </CardContent>
    </Card>
  );
}
