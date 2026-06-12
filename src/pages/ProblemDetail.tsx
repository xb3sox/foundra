import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Hammer,
  Compass,
  Lightbulb,
  Users,
  XOctagon,
  Megaphone,
  Tag,
} from "lucide-react";
import { getProblem } from "../data/problems";
import { useRouter } from "../lib/router";
import { useStore } from "../lib/store";
import { SignalBadge } from "../components/ui/SignalBadge";
import { ProofCard } from "../components/cards/ProofCard";
import { ScoreBreakdown } from "../components/cards/ScoreBreakdown";
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

const roleIcon = {
  "Has this": Heart,
  Builder: Hammer,
  "Market Expert": Compass,
} as Record<string, typeof Heart>;

export function ProblemDetail({ id }: { id: string }) {
  const problem = getProblem(id);
  const { navigate } = useRouter();
  const { state } = useStore();
  const [active, setActive] = useState<CommitmentType | null>(null);

  if (!problem) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <h1 className="text-2xl font-semibold">Problem not found</h1>
        <button
          onClick={() => navigate("/")}
          className="mt-4 cursor-pointer font-medium text-accent-ink"
        >
          Back to problems
        </button>
      </div>
    );
  }

  const extra = state.extraCounts[problem.id] ?? { feel: 0, build: 0, know: 0 };
  const counts = {
    feel: problem.counts.feel + extra.feel,
    build: problem.counts.build + extra.build,
    know: problem.counts.know + extra.know,
  };
  const fv = problem.firstVersion;

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <button
        onClick={() => navigate("/")}
        className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
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
          <p className="mb-4 text-[13px] text-ink-muted">
            Real snippets pulled from public sources. Each shows where it came
            from and how strong it is. No invented data.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {problem.proof.map((p, i) => (
              <ProofCard key={i} proof={p} index={i} />
            ))}
          </div>

          {/* Signal */}
          <div className="mt-5 rounded-2xl border border-line bg-surface p-6 shadow-card">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium uppercase tracking-wide text-ink-muted">
                  Signal
                </span>
                <SignalBadge signal={problem.signal} score={problem.score} />
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-ink-muted">
                {problem.scoreReasons.map((r) => (
                  <span key={r} className="inline-flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <ScoreBreakdown dimensions={problem.scoreBreakdown} />
            </div>
          </div>
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
          <div className="grid gap-3 sm:grid-cols-2">
            <FvCard icon={Lightbulb} label="First feature" value={fv.firstFeature} wide />
            <FvCard icon={Users} label="Who it is for" value={fv.forWho} />
            <FvCard icon={XOctagon} label="What to avoid" value={fv.avoid} />
            <FvCard icon={Megaphone} label="How to find first users" value={fv.findUsers} />
            <FvCard icon={Tag} label="Pricing guess" value={fv.pricing} />
          </div>
        </Section>

        {/* 7 People interested */}
        <Section n={7} title="People interested">
          <div className="grid gap-3 sm:grid-cols-3">
            <PeopleStat icon={Heart} count={counts.feel} label="Have this problem" />
            <PeopleStat icon={Hammer} count={counts.build} label="Can build this" />
            <PeopleStat icon={Compass} count={counts.know} label="Market Experts" />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {problem.people.map((person) => {
              const Icon = roleIcon[person.role] ?? Heart;
              return (
                <div
                  key={person.name}
                  className="rounded-2xl border border-line bg-surface p-4 shadow-card"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[14px] font-semibold">
                      {person.name}
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] font-medium text-ink-muted">
                    {person.role}
                  </p>
                  <p className="text-[13px] text-ink-soft">{person.detail}</p>
                </div>
              );
            })}
          </div>
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

function FvCard({
  icon: Icon,
  label,
  value,
  wide,
}: {
  icon: typeof Lightbulb;
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface p-5 shadow-card ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-[12.5px] font-medium text-ink-muted">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="mt-2 text-[14px] leading-relaxed text-ink">{value}</p>
    </div>
  );
}

function PeopleStat({
  icon: Icon,
  count,
  label,
}: {
  icon: typeof Heart;
  count: number;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 text-center shadow-card">
      <Icon className="mx-auto h-4 w-4 text-accent" />
      <p className="mt-2 text-2xl font-semibold tabular-nums">{count}</p>
      <p className="text-[12.5px] text-ink-soft">{label}</p>
    </div>
  );
}
