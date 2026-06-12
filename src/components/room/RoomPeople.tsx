import { Check, UserPlus, CalendarClock } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "../../lib/store";
import { getRoleIcon } from "../../lib/role-icons";
import type { Problem } from "../../types";

export function RoomPeople({ problem }: { problem: Problem }) {
  const { addActivity, markConnected, getRoom } = useStore();

  const connected = getRoom(problem.id)?.connected ?? [];

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

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
      <h2 className="text-[15px] font-semibold tracking-tight">People</h2>
      <div className="mt-4 space-y-3">
        {problem.people.map((person) => {
          const Icon = getRoleIcon(person.role);
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
                  className="mt-2.5 flex w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 items-center justify-center gap-1.5 rounded-lg bg-ink py-2 text-[12.5px] font-medium text-white transition-colors hover:bg-black"
                >
                  <CalendarClock className="h-3.5 w-3.5" />
                  Schedule call
                </button>
              ) : (
                <button
                  onClick={() => handleRequestIntro(person.name)}
                  className="mt-2.5 flex w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 items-center justify-center gap-1.5 rounded-lg border border-line py-2 text-[12.5px] font-medium text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
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
  );
}
