import { useState } from "react";
import { toast } from "sonner";
import { useStore } from "../../lib/store";
import { Button } from "../ui/button";

const prompts = [
  "What do you do today?",
  "What is the most annoying part?",
  "What would make this worth paying for?",
  "What should the first solution include?",
  "What should builders avoid?",
];

export function RoomPrompts({ problemId }: { problemId: string }) {
  const { addActivity } = useStore();
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handlePromptSave = (i: number) => {
    if (!answers[i]?.trim()) return;
    addActivity(problemId, "You answered a shaping prompt");
    toast("Answer saved.", {
      description: "Thanks — this shapes the first solution.",
    });
    setAnswers((a) => ({ ...a, [i]: "" }));
  };

  return (
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
  );
}
