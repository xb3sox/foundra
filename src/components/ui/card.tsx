import * as React from "react"

import { cn } from "@/utils/cn"

// Foundra surface primitive. Owns radius + border + base shadow in one place
// so the warm-cream card look stays consistent and tunable from here.
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-2xl border border-line bg-surface text-ink shadow-card",
        className
      )}
      {...props}
    />
  )
}

export { Card }
