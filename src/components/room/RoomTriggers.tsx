import { Check, Sparkles, Target } from "lucide-react";

export function RoomTriggers({
  counts,
}: {
  counts: { feel: number; build: number; know: number };
}) {
  return (
    <>
      {/* Smart triggers */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          {
            done: counts.feel >= 5,
            now: counts.feel,
            need: 5,
            label: "Problem confirmed",
            sub: "5 people have this",
          },
          {
            done: counts.build >= 2,
            now: counts.build,
            need: 2,
            label: "Build interest confirmed",
            sub: "2 builders on board",
          },
          {
            done: counts.know >= 1,
            now: counts.know,
            need: 1,
            label: "Market validated",
            sub: "1 market expert",
          },
        ].map((t) => (
          <div
            key={t.label}
            className={`rounded-2xl border p-4 shadow-card transition-colors ${
              t.done
                ? "border-accent/40 bg-accent-soft"
                : "border-line bg-surface"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  t.done ? "bg-accent text-white" : "bg-black/[0.06] text-ink-muted"
                }`}
              >
                {t.done ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                ) : (
                  <Target className="h-3.5 w-3.5" />
                )}
              </span>
              <span
                className={`text-[13.5px] font-semibold ${
                  t.done ? "text-accent-ink" : "text-ink"
                }`}
              >
                {t.label}
              </span>
            </div>
            <p className="mt-1.5 pl-8 text-[12px] text-ink-muted tabular-nums">
              {Math.min(t.now, t.need)}/{t.need} · {t.sub}
            </p>
          </div>
        ))}
      </div>

      {(counts.feel >= 5 && counts.build >= 2 && counts.know >= 1) && (
        <div className="mt-3 flex items-center gap-2 rounded-2xl border border-accent/40 bg-accent-soft px-4 py-3 text-[13px] font-medium text-accent-ink">
          <Sparkles className="h-4 w-4" />
          All thresholds met — this Problem Room is active. Time to talk to
          people and start the first solution.
        </div>
      )}
    </>
  );
}
