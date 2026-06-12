import { motion } from "framer-motion";
import { Layers, Gauge, ClipboardCheck } from "lucide-react";
import { pipelineCandidates, type PipelineCandidate } from "../data/problems";

const statusMeta: Record<
  PipelineCandidate["status"],
  { icon: typeof Layers; tint: string }
> = {
  Clustering: { icon: Layers, tint: "bg-black/[0.05] text-ink-soft" },
  Scoring: { icon: Gauge, tint: "bg-[#eaf0ff] text-[#1b4fc2]" },
  "Needs review": {
    icon: ClipboardCheck,
    tint: "bg-[#fbf2dd] text-[#8a5e00]",
  },
};

function thresholdLabel(c: PipelineCandidate) {
  if (c.signalCount < 3) return "1 complaint → ignored";
  if (c.signalCount < 5) return "3 complaints → weak signal";
  return "5+ complaints → publish candidate";
}

export function PipelineQueue() {
  return (
    <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-lg">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              In the pipeline
            </h2>
            <p className="mt-1.5 text-[14.5px] text-ink-soft">
              Candidates we're still gathering proof on. They publish only when
              the cluster crosses the threshold. Quality over quantity.
            </p>
          </div>
          <span className="rounded-full border border-line px-3 py-1.5 text-[12.5px] font-medium text-ink-soft">
            Not published yet
          </span>
        </div>

        <div className="mt-6 divide-y divide-line/70">
          {pipelineCandidates.map((c, i) => {
            const meta = statusMeta[c.status];
            const Icon = meta.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-wrap items-center justify-between gap-3 py-4"
              >
                <div className="min-w-0">
                  <p className="text-[14.5px] font-medium text-ink">
                    {c.title}
                  </p>
                  <p className="mt-0.5 text-[12.5px] text-ink-muted">
                    {c.industry} · {c.clusters} clusters · {c.signalCount}{" "}
                    signals · {thresholdLabel(c)}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ${meta.tint}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {c.status}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
