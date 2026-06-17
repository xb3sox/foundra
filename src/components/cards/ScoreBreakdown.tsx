import { motion } from "framer-motion";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import type { ScoreDimension } from "../../types";

// Plain-language meaning of each score dimension, surfaced on hover/focus so
// the numbers stop being unexplained.
const DIMENSION_HELP: Record<string, string> = {
  Repetition: "How often this exact complaint recurs across sources.",
  "Clarity of user": "How clearly we can name who actually has this problem.",
  "Workaround exists": "People already rig a manual fix, so the need is real.",
  "Signs of payment": "Evidence people already spend money to avoid this.",
  Urgency: "How painful it is right now, not someday.",
  "Build simplicity": "How small a first solution can be and still help.",
};

export function ScoreBreakdown({
  dimensions,
}: {
  dimensions: ScoreDimension[];
}) {
  return (
    <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {dimensions.map((d, i) => {
        const help = DIMENSION_HELP[d.name];
        return (
          <div key={d.name}>
            <div className="flex items-center justify-between text-[13px]">
              {help ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="cursor-help rounded font-medium text-ink-soft underline decoration-dotted decoration-line underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                    >
                      {d.name}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{help}</TooltipContent>
                </Tooltip>
              ) : (
                <span className="font-medium text-ink-soft">{d.name}</span>
              )}
              <span className="font-semibold tabular-nums text-ink">
                {d.value}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${d.value}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.7, ease: "easeOut" }}
                className="h-full rounded-full bg-accent"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
