import { motion } from "framer-motion";
import {
  MessageSquare,
  MessagesSquare,
  Star,
  Briefcase,
  Workflow,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import type { ProofItem, ProofSourceType, ProofStrength } from "../../types";
import { cn } from "../../utils/cn";
import { toSafeHref } from "../../utils/url";
import { Badge } from "../ui/badge";

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
  const href = toSafeHref(proof.url);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-card"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-soft">
          <Icon className="h-4 w-4 text-ink-muted" />
          {proof.source}
        </span>
        <Badge className={cn("border-transparent", strengthStyle[proof.strength])}>
          {proof.strength}
        </Badge>
      </div>
      <p className="mt-3 text-[14px] leading-relaxed text-ink line-clamp-4">
        “{proof.text}”
      </p>
      <div className="mt-auto flex items-center gap-x-2 border-t border-line/70 pt-3 text-[11.5px] text-ink-muted">
        <span className="shrink-0 font-medium text-ink-soft">
          {proof.platform}
        </span>
        <span className="shrink-0 text-line">·</span>
        <span className="min-w-0 truncate">{proof.origin}</span>
        <span className="shrink-0 text-line">·</span>
        <span className="shrink-0">{proof.date}</span>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex shrink-0 items-center gap-0.5 rounded font-medium text-accent-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            View source
            <ArrowUpRight className="h-3 w-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
