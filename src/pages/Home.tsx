import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Hammer, Compass, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ProblemBoard } from "../components/board/ProblemBoard";
import { scrollToSection } from "../lib/scroll";
import { CommitmentModal } from "../components/modals/CommitmentModal";
import { PipelineExplainer } from "../components/PipelineExplainer";
import { HeroReceipts } from "../components/HeroReceipts";
import type { CommitmentType, Problem } from "../types";

const roles = [
  {
    icon: Heart,
    title: "I have this problem",
    body: "People who live with the problem.",
  },
  {
    icon: Hammer,
    title: "I can build this",
    body: "People who can build a solution.",
  },
  {
    icon: Compass,
    title: "I know this market",
    body: "People who know the market.",
  },
];

export function Home() {
  const [active, setActive] = useState<{
    problem: Problem;
    type: CommitmentType;
  } | null>(null);

  const handleCommit = useCallback((problem: Problem, type: CommitmentType) => {
    setActive({ problem, type });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-4 pt-16 sm:px-8 sm:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium text-ink-soft">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            Real complaints. Receipts attached.
          </div>
          <h1 className="mt-6 text-[40px] font-semibold leading-[1.05] tracking-tight text-ink text-balance sm:text-[58px]">
            Real problems. Real proof.
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
            Pain people already complain about. With the receipts, the score,
            and a room to validate it.
          </p>
          <p className="mt-3 max-w-xl text-[14px] text-ink-muted">
            We collect where people already vent (forums, reviews, job posts),
            cluster the same pain, and score it. The strongest problems link
            straight to the source.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => scrollToSection("today")}>
              Explore problems
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => scrollToSection("how-it-works")}
            >
              How it works
            </Button>
          </div>
        </motion.div>
        <HeroReceipts />
        </div>
      </section>

      {/* Problem board: today's three + the rest, with search and filters */}
      <ProblemBoard onCommit={handleCommit} />

      {/* Three roles */}
      <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <Card className="rounded-3xl p-7 sm:p-9">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Foundra connects three roles
          </h2>
          <p className="mt-1.5 max-w-lg text-[15px] text-ink-soft">
            Start with real problems. Build with the people who have them.
          </p>
          <div className="mt-7 grid gap-5 sm:grid-cols-3">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.title}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[16px] font-semibold tracking-tight">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">
                    {r.body}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      {/* How it works */}
      <PipelineExplainer />

      {/* Final principle */}
      <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[15px] font-medium text-ink-soft">
          {["3 problems.", "3 positions.", "1 room to validate."].map((t, i) => (
            <span key={t} className="inline-flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-accent" />}
              <span className="text-ink">{t}</span>
            </span>
          ))}
        </div>
      </section>

      {active && (
        <CommitmentModal
          type={active.type}
          problem={active.problem}
          open={!!active}
          onClose={() => setActive(null)}
        />
      )}
    </div>
  );
}
