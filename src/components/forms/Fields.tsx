import { useState } from "react";
import { Check, Plus, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { FieldLabel as UiFieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

// Foundra chip skin layered over the shadcn Toggle defaults. The off/on
// states mirror the original hand-rolled chips (pill, line border, ink fill).
const chipBase =
  "h-auto min-w-0 cursor-pointer rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all hover:bg-surface aria-pressed:bg-surface";
const chipOff = "border-line bg-surface text-ink-soft hover:border-ink/30 hover:text-ink";

export function FieldLabel({
  index,
  children,
}: {
  index?: number;
  children: React.ReactNode;
}) {
  return (
    <UiFieldLabel className="mb-2 flex items-center gap-2 text-sm font-medium text-ink">
      {index != null && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/[0.06] text-[11px] font-semibold text-ink-soft tabular-nums">
          {index}
        </span>
      )}
      {children}
    </UiFieldLabel>
  );
}

export function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      // Ignore Radix's deselect (empty value) so a chosen chip stays chosen,
      // matching the original single-select chips.
      onValueChange={(v) => v && onChange(v)}
      className="flex w-full flex-wrap justify-start gap-2"
    >
      {options.map((opt) => (
        <ToggleGroupItem
          key={opt}
          value={opt}
          className={cn(
            chipBase,
            chipOff,
            "data-[state=on]:border-ink data-[state=on]:bg-ink data-[state=on]:text-white"
          )}
        >
          {opt}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Input
      className={cn(
        "h-auto w-full rounded-xl border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ink/40 focus-visible:ring-2 focus-visible:ring-accent/20",
        className
      )}
      {...props}
    />
  );
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Textarea
      className={cn(
        "w-full resize-none rounded-xl border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ink/40 focus-visible:ring-2 focus-visible:ring-accent/20",
        className
      )}
      {...props}
    />
  );
}

export interface MultiChipOption {
  label: string;
  icon: LucideIcon;
}

/**
 * Multi-select picker for questions where users naturally combine answers
 * (e.g. "What do you use today?" → WhatsApp + spreadsheet + paper).
 * Zero typing by default, with an optional "Something else" escape hatch.
 */
export function MultiChipGroup({
  options,
  value,
  onChange,
  allowOther = true,
  otherPlaceholder = "Something else…",
}: {
  options: MultiChipOption[];
  value: string[];
  onChange: (v: string[]) => void;
  allowOther?: boolean;
  otherPlaceholder?: string;
}) {
  const [showOther, setShowOther] = useState(false);
  const [other, setOther] = useState("");

  const commitOther = (text: string) => {
    setOther(text);
    // keep only one "other" entry, prefixed so config can detect it
    const withoutOther = value.filter((v) => !v.startsWith("Other: "));
    onChange(
      text.trim() ? [...withoutOther, `Other: ${text.trim()}`] : withoutOther
    );
  };

  // The "Other: …" entry lives outside the toggle group; keep it when the
  // group reports its own selection changes.
  const otherEntries = value.filter((v) => v.startsWith("Other: "));
  const groupValue = value.filter((v) => !v.startsWith("Other: "));

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ToggleGroup
        type="multiple"
        value={groupValue}
        onValueChange={(next) => onChange([...next, ...otherEntries])}
        className="flex w-fit flex-wrap justify-start gap-2"
      >
        {options.map((opt) => {
          const active = value.includes(opt.label);
          const Icon = opt.icon;
          return (
            <ToggleGroupItem
              key={opt.label}
              value={opt.label}
              className={cn(
                chipBase,
                chipOff,
                "group gap-1.5 px-3",
                "data-[state=on]:border-accent data-[state=on]:bg-accent-soft data-[state=on]:text-accent-ink"
              )}
            >
              <span className="relative flex h-4 w-4 items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  {active ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 28,
                      }}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="icon"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                    >
                      <Icon className="h-3.5 w-3.5 text-ink-muted group-hover:text-ink" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              {opt.label}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>

      {allowOther &&
        (showOther ? (
          <Input
            autoFocus
            value={other}
            onChange={(e) => commitOther(e.target.value)}
            onBlur={() => !other.trim() && setShowOther(false)}
            placeholder={otherPlaceholder}
            className="h-auto min-w-[140px] flex-1 rounded-full border-accent bg-surface px-3.5 py-2 text-[13px] text-ink placeholder:text-ink-muted focus-visible:ring-2 focus-visible:ring-accent/20"
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowOther(true)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-dashed border-line bg-surface px-3 py-2 text-[13px] font-medium text-ink-muted transition-colors hover:border-ink/30 hover:text-ink"
          >
            <Plus className="h-3.5 w-3.5" />
            Something else
          </button>
        ))}
    </div>
  );
}
