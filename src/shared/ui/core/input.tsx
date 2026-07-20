import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-3.5 py-2 text-base transition-all duration-200 outline-none",
        "placeholder:text-muted-foreground/70 hover:border-white/20 hover:bg-white/[0.06]",
        "focus-visible:border-primary focus-visible:bg-white/[0.08] focus-visible:ring-3 focus-visible:ring-primary/25 focus-visible:shadow-[0_0_16px_rgba(0,212,200,0.15)]",
        "disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/30 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
