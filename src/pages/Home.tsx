import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Hammer, Compass, ShieldCheck } from "lucide-react";
import { todaysProblems } from "../data/problems";
import { ProblemCard } from "../components/cards/ProblemCard";
import { Button } from "../components/ui/Button";
import { useRouter } from "../lib/router";
import { CommitmentModal } from "../components/modals/CommitmentModal";
import { PipelineExplainer } from "../components/PipelineExplainer";
import { PipelineQueue } from "../components/PipelineQueue";
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
  const { navigate } = useRouter();
  const [active, setActive] = useState<{
    problem: Problem;
    type: CommitmentType;
  } | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-4 pt-16 sm:px-8 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium text-ink-soft">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            Discovered from real signals. Never invented.
          </div>
          <h1 className="mt-6 text-[40px] font-semibold leading-[1.05] tracking-tight text-ink text-balance sm:text-[58px]">
            Find problems worth building.
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
            Real problems. Clear proof. People ready to help.
          </p>
          <p className="mt-3 max-w-xl text-[14px] text-ink-muted">
            Foundra reads real complaints, reviews, and job posts — then
            clusters and scores the pain. AI reveals patterns. It never makes
            them up.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("today")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore problems
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate("/submit")}>
              Submit problem
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Today's 3 problems */}
      <section id="today" className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-[28px]">
              Today's 3 problems
            </h2>
            <p className="mt-1.5 text-[15px] text-ink-soft">
              The three highest-signal problems from this week's pipeline. Open
              one, review the proof, pick your action.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {todaysProblems.map((problem, i) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              index={i}
              onCommit={(type) => setActive({ problem, type })}
            />
          ))}
        </div>
      </section>

      {/* Three roles */}
      <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <div className="rounded-3xl border border-line bg-surface p-8 shadow-card sm:p-12">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Foundra connects three roles
          </h2>
          <p className="mt-1.5 max-w-lg text-[15px] text-ink-soft">
            Start with real problems. Build with the people who have them.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
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
        </div>
      </section>

      {/* How it works */}
      <PipelineExplainer />

      {/* Pipeline queue */}
      <PipelineQueue />

      {/* Final principle */}
      <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[15px] font-medium text-ink-soft">
          {["3 problems.", "3 actions.", "1 room.", "1 brief."].map((t, i) => (
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
