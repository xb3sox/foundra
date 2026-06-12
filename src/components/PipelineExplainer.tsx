import { motion } from "framer-motion";
import {
  Radar,
  ScanText,
  Layers,
  Gauge,
  LayoutTemplate,
  Send,
} from "lucide-react";

const steps = [
  {
    icon: Radar,
    title: "Sources",
    body: "Reddit, 1–3★ reviews, Upwork & Fiverr posts, forums, social.",
  },
  {
    icon: ScanText,
    title: "Extract",
    body: "Who has it, what's painful, how often, today's workaround.",
  },
  {
    icon: Layers,
    title: "Cluster",
    body: "Group similar complaints. 5+ becomes a publish candidate.",
  },
  {
    icon: Gauge,
    title: "Score",
    body: "Repetition, clarity, workaround, payment signs, urgency.",
  },
  {
    icon: LayoutTemplate,
    title: "Structure",
    body: "Clean problem with proof, signal, and people counts.",
  },
  {
    icon: Send,
    title: "Publish",
    body: "Only strong, proven problems reach today's three.",
  },
];

export function PipelineExplainer() {
  return (
    <section id="how-it-works" className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
      <div className="max-w-2xl">
        <span className="text-[12.5px] font-semibold uppercase tracking-wide text-accent-ink">
          How Foundra works
        </span>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[28px]">
          Foundra doesn't invent ideas. It reveals real pain.
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          We continuously read real complaints, extract the pattern, cluster
          it, and score it. Only problems with proof get published.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="relative rounded-2xl border border-line bg-surface p-5 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-[12px] font-semibold tabular-nums text-ink-muted">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-3 text-[15px] font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
