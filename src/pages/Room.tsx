import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  FileText,
  UserPlus,
  Heart,
  Hammer,
  Compass,
  Sparkles,
  Lightbulb,
  Users,
  XOctagon,
  Megaphone,
  Tag,
  CalendarClock,
  Target,
} from "lucide-react";
import { toast } from "sonner";
import { getProblem } from "../data/problems";
import { useRouter } from "../lib/router";
import { useStore } from "../lib/store";
import { SignalBadge } from "../components/ui/SignalBadge";
import { SignalEvidence } from "../components/SignalEvidence";
import { Button } from "../components/ui/button";
import type { RoomStatus } from "../types";

const statusStyle: Record<RoomStatus, string> = {
  Proving: "bg-[#fbf2dd] text-[#8a5e00]",
  Building: "bg-accent-soft text-accent-ink",
  Paused: "bg-black/[0.05] text-ink-soft",
};

const prompts = [
  "What do you do today?",
  "What is the most annoying part?",
  "What would make this worth paying for?",
  "What should the first solution include?",
  "What should builders avoid?",
];

const roleIcon = {
  "Has this": Heart,
  Builder: Hammer,
  "Market Expert": Compass,
} as Record<string, typeof Heart>;

export function Room({ id }: { id: string }) {
  const problem = getProblem(id);
  const { navigate } = useRouter();
  const {
    state,
    toggleChecklist,
    addActivity,
    setBriefCreated,
    markConnected,
    getRoom,
  } = useStore();
  const [answers, setAnswers] = useState<Record<number, string>>({});

  if (!problem) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-2xl font-semibold">Room not found</h1>
        <button
          onClick={() => navigate("/")}
          className="mt-4 cursor-pointer font-medium text-accent-ink"
        >
          Back to problems
        </button>
      </div>
    );
  }

  const room = getRoom(problem.id);
  const baseChecklistMap = Object.fromEntries(
    problem.checklist.map((c) => [c.id, c.done])
  );
  const checklist = problem.checklist.map((c) => ({
    ...c,
    done: room?.checklist[c.id] ?? c.done,
  }));
  const doneCount = checklist.filter((c) => c.done).length;

  const extra = state.extraCounts[problem.id] ?? { feel: 0, build: 0, know: 0 };
  const counts = {
    feel: problem.counts.feel + extra.feel,
    build: problem.counts.build + extra.build,
    know: problem.counts.know + extra.know,
  };

  const activity = [...(room?.activity ?? []), ...problem.activity];
  const briefCreated = room?.briefCreated ?? false;
  const connected = room?.connected ?? [];
  const fv = problem.firstVersion;

  const handleCreateBrief = () => {
    setBriefCreated(problem.id);
    addActivity(problem.id, "First Brief generated");
    toast("Brief created.", {
      description: "A First Brief is ready in the room.",
    });
  };

  const handleRequestIntro = (name: string) => {
    markConnected(problem.id, name);
    addActivity(problem.id, `You requested an intro to ${name}`);
    toast("Intro requested.", {
      description: `We'll connect you with ${name}.`,
    });
  };

  const handleScheduleCall = (name: string) => {
    markConnected(problem.id, name);
    addActivity(problem.id, `You proposed a call with ${name}`);
    toast("Call proposed.", {
      description: `We'll help you find a time with ${name}.`,
    });
  };

  const handlePromptSave = (i: number) => {
    if (!answers[i]?.trim()) return;
    addActivity(problem.id, "You answered a shaping prompt");
    toast("Answer saved.", {
      description: "Thanks — this shapes the first solution.",
    });
    setAnswers((a) => ({ ...a, [i]: "" }));
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <button
        onClick={() => navigate(`/problems/${problem.id}`)}
        className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to problem
      </button>

      {/* Room header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[12px] font-medium uppercase tracking-wide text-ink-muted">
            Problem Room
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${statusStyle[problem.roomStatus]}`}
          >
            {problem.roomStatus}
          </span>
        </div>
        <h1 className="mt-3 text-[26px] font-semibold leading-tight tracking-tight text-balance sm:text-[32px]">
          {problem.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <SignalBadge signal={problem.signal} score={problem.score} />
          <span className="text-[13px] font-medium text-ink-muted tabular-nums">
            <span className="text-ink-soft">{counts.feel}</span> have this ·{" "}
            <span className="text-ink-soft">{counts.build}</span> can build ·{" "}
            <span className="text-ink-soft">{counts.know}</span> know this market
          </span>
        </div>
        <div className="mt-4">
          <SignalEvidence pipeline={problem.pipeline} variant="compact" />
        </div>
      </motion.div>

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

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="space-y-6">
          {/* Checklist */}
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-semibold tracking-tight">
                To prove
              </h2>
              <span className="text-[13px] font-medium text-ink-muted tabular-nums">
                {doneCount}/{checklist.length}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
              <motion.div
                className="h-full rounded-full bg-accent"
                animate={{ width: `${(doneCount / checklist.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
              />
            </div>
            <ul className="mt-4 space-y-1">
              {checklist.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() =>
                      toggleChecklist(problem.id, c.id, baseChecklistMap)
                    }
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-black/[0.025]"
                  >
                    <motion.span
                      animate={{
                        backgroundColor: c.done ? "#0a8f5b" : "rgba(0,0,0,0)",
                        borderColor: c.done ? "#0a8f5b" : "#e7e3da",
                      }}
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border"
                    >
                      <AnimatePresence>
                        {c.done && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check
                              className="h-3.5 w-3.5 text-white"
                              strokeWidth={3}
                            />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.span>
                    <span
                      className={`text-[14px] ${
                        c.done
                          ? "text-ink-muted line-through"
                          : "text-ink"
                      }`}
                    >
                      {c.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Shaping prompts */}
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <h2 className="text-[17px] font-semibold tracking-tight">
              Shape the first solution
            </h2>
            <p className="mt-1 text-[13px] text-ink-muted">
              A few simple prompts. No open comment wall.
            </p>
            <div className="mt-4 space-y-4">
              {prompts.map((p, i) => (
                <div key={i}>
                  <label className="mb-1.5 block text-[13.5px] font-medium text-ink">
                    {p}
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={answers[i] ?? ""}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [i]: e.target.value }))
                      }
                      placeholder="Type your answer…"
                      className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-ink-muted transition-colors focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handlePromptSave(i)}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* First version brief */}
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-semibold tracking-tight">
                First Brief
              </h2>
              {!briefCreated && (
                <Button size="sm" onClick={handleCreateBrief}>
                  <Sparkles className="h-3.5 w-3.5" />
                  Create Brief
                </Button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {briefCreated ? (
                <motion.div
                  key="brief"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 grid gap-3 sm:grid-cols-2"
                >
                  <BriefRow icon={Users} label="Who it is for" value={fv.forWho} />
                  <BriefRow icon={Lightbulb} label="Problem to solve" value={problem.pain} />
                  <BriefRow icon={Sparkles} label="First feature" value={fv.firstFeature} wide />
                  <BriefRow icon={XOctagon} label="What to avoid" value={fv.avoid} />
                  <BriefRow icon={Megaphone} label="How to find first users" value={fv.findUsers} />
                  <BriefRow icon={Tag} label="Pricing guess" value={fv.pricing} wide />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-xl border border-dashed border-line bg-bg/50 p-6 text-center"
                >
                  <FileText className="mx-auto h-6 w-6 text-ink-muted" />
                  <p className="mt-2 text-[14px] text-ink-soft">
                    No brief yet. Create one to turn the signals into a clear
                    first solution.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Side column */}
        <aside className="space-y-6">
          {/* People */}
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <h2 className="text-[15px] font-semibold tracking-tight">People</h2>
            <div className="mt-4 space-y-3">
              {problem.people.map((person) => {
                const Icon = roleIcon[person.role] ?? Heart;
                const isConnected = connected.includes(person.name);
                return (
                  <div
                    key={person.name}
                    className="rounded-xl border border-line p-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13.5px] font-semibold">
                          {person.name}
                        </p>
                        <p className="truncate text-[12px] text-ink-muted">
                          {person.role} · {person.detail}
                        </p>
                      </div>
                      {isConnected && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[10.5px] font-semibold text-accent-ink">
                          <Check className="h-3 w-3" strokeWidth={3} />
                          Connected
                        </span>
                      )}
                    </div>
                    {isConnected ? (
                      <button
                        onClick={() => handleScheduleCall(person.name)}
                        className="mt-2.5 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-ink py-2 text-[12.5px] font-medium text-white transition-colors hover:bg-black"
                      >
                        <CalendarClock className="h-3.5 w-3.5" />
                        Schedule call
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRequestIntro(person.name)}
                        className="mt-2.5 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-line py-2 text-[12.5px] font-medium text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
                      >
                        <UserPlus className="h-3.5 w-3.5" />
                        Request intro
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity log */}
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <h2 className="text-[15px] font-semibold tracking-tight">
              Recent activity
            </h2>
            <ul className="mt-4 space-y-3.5">
              {activity.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <div>
                    <p className="text-[13px] leading-snug text-ink">
                      {a.text}
                    </p>
                    <p className="text-[11.5px] text-ink-muted">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function BriefRow({
  icon: Icon,
  label,
  value,
  wide,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-line bg-bg/40 p-4 ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-[12px] font-medium text-ink-muted">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink">{value}</p>
    </div>
  );
}
