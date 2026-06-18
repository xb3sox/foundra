import { motion } from "framer-motion";
import {
  ShieldCheck,
  Layers,
  Radar,
  MessageCircle,
  Star,
  Briefcase,
  Hash,
  AtSign,
  FileText,
} from "lucide-react";
import type { PipelineMeta, ProofStrength, SourcePlatform } from "../types";
import { cn } from "../utils/cn";
import { Card } from "./ui/card";

const platformIcon: Record<SourcePlatform, typeof Star> = {
  Reddit: MessageCircle,
  "Product reviews": Star,
  Upwork: Briefcase,
  Fiverr: Briefcase,
  Forum: Hash,
  Social: AtSign,
  Report: FileText,
};

const confidenceStyle: Record<ProofStrength, string> = {
  Strong: "bg-accent-soft text-accent-ink",
  Medium: "bg-[#fbf2dd] text-[#8a5e00]",
  Weak: "bg-black/[0.05] text-ink-soft",
};

/**
 * Trust block. Makes the sourcing legible: how many public signals,
 * which sources, how many clusters were merged, and confidence.
 * "No problem without proof."
 */
export function SignalEvidence({
  pipeline,
  variant = "full",
}: {
  pipeline: PipelineMeta;
  variant?: "full" | "compact";
}) {
  if (variant === "compact") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[11.5px] font-medium text-ink-soft">
        <Radar className="h-3.5 w-3.5 text-accent" />
        Based on {pipeline.signalCount} public signals
      </span>
    );
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
            <ShieldCheck className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-[15px] font-semibold tracking-tight">
              Based on {pipeline.signalCount} public signals
            </p>
            <p className="text-[12.5px] text-ink-muted">
              Updated {pipeline.lastUpdated.toLowerCase()} · sourced from public
              complaints
            </p>
          </div>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11.5px] font-semibold",
            confidenceStyle[pipeline.confidence]
          )}
        >
          {pipeline.confidence} confidence
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[12.5px] text-ink-soft">
        <Layers className="h-3.5 w-3.5 text-ink-muted" />
        {pipeline.clusters} complaint clusters merged into one problem
      </div>

      <div className="mt-4 space-y-2.5">
        {pipeline.sources.map((s, i) => {
          const Icon = platformIcon[s.platform];
          const max = Math.max(...pipeline.sources.map((x) => x.count));
          return (
            <div key={s.platform} className="flex items-center gap-3">
              <span className="flex w-32 shrink-0 items-center gap-1.5 text-[12.5px] text-ink-soft">
                <Icon className="h-3.5 w-3.5 text-ink-muted" />
                {s.platform}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(s.count / max) * 100}%` }}
                  transition={{ delay: i * 0.06, duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full bg-accent"
                />
              </div>
              <span className="w-6 text-right text-[12.5px] font-semibold tabular-nums text-ink">
                {s.count}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
