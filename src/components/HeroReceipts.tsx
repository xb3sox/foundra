import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { toSafeHref } from "../utils/url";

// Mirrors real flagship proof (see data/problems.ts) so the hero shows the
// product's actual asset: receipts you can open and read.
const receipts = [
  {
    source: "QuickBooks · 2025 report",
    text: "56% of small businesses are owed money from unpaid invoices.",
    origin: "Late Payments Report",
    url: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2025/",
    tilt: "-1.6deg",
  },
  {
    source: "r/freelance",
    text: "I hate chasing payments more than the actual work.",
    origin: "Reddit · 2 days ago",
    url: "https://www.reddit.com/r/freelance/",
    tilt: "1.1deg",
  },
  {
    source: "r/interiordesign",
    text: "I spend Friday afternoons collecting feedback from six chats.",
    origin: "Reddit · 3 days ago",
    url: "https://www.reddit.com/r/InteriorDesign/",
    tilt: "-0.7deg",
  },
];

export function HeroReceipts() {
  return (
    <div className="mx-auto mt-10 w-full max-w-sm space-y-3.5 lg:mx-0 lg:mt-0">
      {receipts.map((r, i) => {
        const href = toSafeHref(r.url);
        return (
          <motion.div
            key={r.source}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <div style={{ transform: `rotate(${r.tilt})` }}>
              <Card className="p-4 shadow-lift">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-semibold text-ink-soft">
                    {r.source}
                  </span>
                  <Badge className="border-transparent bg-accent-soft text-accent-ink">
                    Verified
                  </Badge>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink">
                  “{r.text}”
                </p>
                <div className="mt-2.5 flex items-center gap-1.5 border-t border-line/70 pt-2.5 text-[11px] text-ink-muted">
                  <span>{r.origin}</span>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-0.5 rounded font-medium text-accent-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                    >
                      View source
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </Card>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
