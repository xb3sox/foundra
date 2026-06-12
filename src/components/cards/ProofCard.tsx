import { motion } from "framer-motion";
import {
  MessageSquare,
  MessagesSquare,
  Star,
  Briefcase,
  Workflow,
  FileText,
} from "lucide-react";
import type { ProofItem, ProofSourceType, ProofStrength } from "../../types";
import { cn } from "../../utils/cn";

const icons: Record<ProofSourceType, typeof Star> = {
  Interview: MessageSquare,
  "Forum complaint": MessagesSquare,
  Review: Star,
  "Job post": Briefcase,
  "Manual workflow": Workflow,
  "Expert note": FileText,
};

const strengthStyle: Record<ProofStrength, string> = {
  Strong: "bg-accent-soft text-accent-ink",
  Medium: "bg-[#fbf2dd] text-[#8a5e00]",
  Weak: "bg-black/[0.05] text-ink-soft",
};

export function ProofCard({ proof, index }: { proof: ProofItem; index: number }) {
  const Icon = icons[proof.source];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl border border-line bg-surface p-5 shadow-card"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-soft">
          <Icon className="h-4 w-4 text-ink-muted" />
          {proof.source}
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[11px] font-semibold",
            strengthStyle[proof.strength]
          )}
        >
          {proof.strength}
        </span>
      </div>
      <p className="mt-3 text-[14px] leading-relaxed text-ink">
        “{proof.text}”
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line/70 pt-3 text-[11.5px] text-ink-muted">
        <span className="font-medium text-ink-soft">{proof.platform}</span>
        <span className="text-line">·</span>
        <span>{proof.origin}</span>
        <span className="text-line">·</span>
        <span>{proof.date}</span>
      </div>
    </motion.div>
  );
}
