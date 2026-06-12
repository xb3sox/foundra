import { motion } from "framer-motion";
import type { ScoreDimension } from "../../types";

export function ScoreBreakdown({
  dimensions,
}: {
  dimensions: ScoreDimension[];
}) {
  return (
    <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {dimensions.map((d, i) => (
        <div key={d.name}>
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-medium text-ink-soft">{d.name}</span>
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
      ))}
    </div>
  );
}
