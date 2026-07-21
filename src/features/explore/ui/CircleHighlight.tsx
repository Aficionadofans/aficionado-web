import { Users } from "lucide-react";
import Link from "next/link";

interface CircleHighlightProps {
  circle: {
    id: string;
    name: string;
    description: string | null;
    member_count?: number | null;
  };
  index: number;
}

export function CircleHighlight({ circle }: CircleHighlightProps) {
  const memberCount = circle.member_count ?? null;

  return (
    <Link href="/communities" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-[1.25rem]">
      <div className="clipcut-card-hover flex flex-col gap-3 p-6 h-full cursor-pointer">
        {/* Circle name — Syne font */}
        <h3
          className="text-base font-bold text-white leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {circle.name}
        </h3>

        {/* Member count — smaller stat-counter style */}
        {memberCount !== null && (
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-primary shrink-0" />
            <span
              className="text-2xl font-bold text-primary tabular-nums"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {memberCount.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              members
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {circle.description || "A vibrant community circle for like-minded aficionados."}
        </p>

        {/* Join CTA — teal clipcut-pill */}
        <button
          type="button"
          className="clipcut-pill self-start text-xs font-bold uppercase tracking-[0.05em] px-4 py-1.5 rounded-full"
        >
          Join
        </button>
      </div>
    </Link>
  );
}
