import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        clipcut: "bg-[#F43F5E]/15 text-[#FB7185] border border-[#F43F5E]/35 font-bold uppercase tracking-wider text-[10px] shadow-[0_0_12px_rgba(244,63,94,0.25)]",
        default: "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(0,212,200,0.2)]",
        secondary: "bg-secondary text-secondary-foreground border border-white/5",
        monetization: "bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/35 shadow-[0_0_12px_rgba(245,158,11,0.2)] font-bold uppercase tracking-wider text-[10px]",
        glass: "bg-white/5 backdrop-blur-md border border-white/10 text-foreground hover:bg-white/10",
        live: "bg-rose-500/15 text-rose-400 border border-rose-500/30 font-bold uppercase tracking-widest text-[10px] animate-pulse",
        destructive: "bg-destructive/10 text-destructive border border-destructive/20",
        outline: "border-border text-foreground hover:bg-muted",
        ghost: "hover:bg-muted hover:text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
