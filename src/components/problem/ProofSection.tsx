import { SignalBadge } from "../ui/SignalBadge";
import { ProofCard } from "../cards/ProofCard";
import { ScoreBreakdown } from "../cards/ScoreBreakdown";
import { Card } from "../ui/card";
import type { Problem } from "../../types";

export function ProofSection({ problem }: { problem: Problem }) {
  return (
    <>
      <p className="mb-4 text-[13px] text-ink-muted">
        Public complaints behind this problem. Each shows where it came from
        and how strong it is. The linked ones are live, so you can open the
        source and read it yourself.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {problem.proof.map((p, i) => (
          <ProofCard
            key={`${p.platform}-${p.origin}-${p.date}`}
            proof={p}
            index={i}
          />
        ))}
      </div>

      {/* Signal */}
      <Card className="mt-5 p-6">
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
      </Card>
    </>
  );
}
