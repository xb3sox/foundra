import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Users } from "lucide-react";
import { getProblem } from "../data/problems";
import { useRouter } from "../lib/router";
import { useLiveCounts } from "../lib/store";
import { SignalBadge } from "../components/ui/SignalBadge";
import { ProofSection } from "../components/problem/ProofSection";
import { FirstVersionSection } from "../components/problem/FirstVersionSection";
import { PeopleSection } from "../components/problem/PeopleSection";
import { CommitmentActions } from "../components/CommitmentActions";
import { SignalEvidence } from "../components/SignalEvidence";
import { CommitmentModal } from "../components/modals/CommitmentModal";
import type { CommitmentType } from "../types";

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line/70 pt-10">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/[0.05] text-[12px] font-semibold tabular-nums text-ink-soft">
          {n}
        </span>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function ProblemDetail({ id }: { id: string }) {
  const problem = getProblem(id);
  const { navigate } = useRouter();
  const counts = useLiveCounts(problem);
  const [active, setActive] = useState<CommitmentType | null>(null);

  if (!problem) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <h1 className="text-2xl font-semibold">Problem not found</h1>
        <button
          onClick={() => navigate("/")}
          className="mt-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 font-medium text-accent-ink"
        >
          Back to problems
        </button>
      </div>
    );
  }

  const fv = problem.firstVersion;

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <button
        onClick={() => navigate("/")}
        className="inline-flex cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 items-center gap-1.5 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Today's problems
      </button>

      {/* Top */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[12px] font-medium uppercase tracking-wide text-ink-muted">
            {problem.industry}
          </span>
          <SignalBadge signal={problem.signal} score={problem.score} />
        </div>
        <h1 className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-tight text-ink text-balance sm:text-[40px]">
          {problem.title}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
          {problem.summary}
        </p>

        <div className="mt-5 flex items-center gap-1.5 text-[13px] font-medium text-ink-muted tabular-nums">
          <span className="text-ink-soft">{counts.feel}</span> have this problem
          <span className="text-line">·</span>
          <span className="text-ink-soft">{counts.build}</span> can build this
          <span className="text-line">·</span>
          <span className="text-ink-soft">{counts.know}</span> know this market
        </div>

        <div className="mt-6">
          <CommitmentActions
            problem={problem}
            onCommit={(t) => setActive(t)}
          />
        </div>

        <div className="mt-7">
          <SignalEvidence pipeline={problem.pipeline} />
        </div>
      </motion.div>

      <div className="mt-12 space-y-10">
        {/* 1 Problem */}
        <Section n={1} title="The problem">
          <p className="text-[15px] leading-relaxed text-ink-soft">
            {problem.problemDetail}
          </p>
        </Section>

        {/* 2 Who has it */}
        <Section n={2} title="Who has it">
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <div className="flex items-center gap-2 text-[13px] font-medium text-ink-muted">
              <Users className="h-4 w-4" />
              Who has it
            </div>
            <p className="mt-2 text-[15px] font-medium text-ink">
              {problem.whoFeels}
            </p>
          </div>
        </Section>

        {/* 3 Proof */}
        <Section n={3} title="Proof">
          <ProofSection problem={problem} />
        </Section>

        {/* 4 Today's workaround */}
        <Section n={4} title="Today's workaround">
          <p className="text-[15px] leading-relaxed text-ink-soft">
            {problem.whatTheyDoToday}
          </p>
        </Section>

        {/* 5 Why tools fail */}
        <Section n={5} title="Why tools fail">
          <p className="text-[15px] leading-relaxed text-ink-soft">
            {problem.whyToolsFail}
          </p>
        </Section>

        {/* 6 First solution */}
        <Section n={6} title="First solution">
          <FirstVersionSection fv={fv} />
        </Section>

        {/* 7 People interested */}
        <Section n={7} title="People interested">
          <PeopleSection problem={problem} counts={counts} />
        </Section>

        {/* 8 Next step */}
        <section className="rounded-3xl border border-line bg-surface p-7 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-[12px] font-semibold tabular-nums text-accent-ink">
              8
            </span>
            <h2 className="text-xl font-semibold tracking-tight">Next step</h2>
          </div>
          <p className="mt-2 text-[15px] text-ink-soft">
            Pick your action, then join the Problem Room.
          </p>
          <div className="mt-5">
            <CommitmentActions
              problem={problem}
              onCommit={(t) => setActive(t)}
            />
          </div>
        </section>
      </div>

      <CommitmentModal
        type={active}
        problem={problem}
        open={!!active}
        onClose={() => setActive(null)}
      />
    </div>
  );
}
