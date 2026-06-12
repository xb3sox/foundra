import { useState } from "react";
import { Check, Plus, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export function FieldLabel({
  index,
  children,
}: {
  index?: number;
  children: React.ReactNode;
}) {
  return (
    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-ink">
      {index != null && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/[0.06] text-[11px] font-semibold text-ink-soft tabular-nums">
          {index}
        </span>
      )}
      {children}
    </label>
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
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "cursor-pointer rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all",
              active
                ? "border-ink bg-ink text-white"
                : "border-line bg-surface text-ink-soft hover:border-ink/30 hover:text-ink"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted transition-colors focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-accent/20",
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
    <textarea
      className={cn(
        "w-full resize-none rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted transition-colors focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-accent/20",
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

  const toggle = (label: string) => {
    onChange(
      value.includes(label)
        ? value.filter((v) => v !== label)
        : [...value, label]
    );
  };

  const commitOther = (text: string) => {
    setOther(text);
    // keep only one "other" entry, prefixed so config can detect it
    const withoutOther = value.filter((v) => !v.startsWith("Other: "));
    onChange(text.trim() ? [...withoutOther, `Other: ${text.trim()}`] : withoutOther);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value.includes(opt.label);
        const Icon = opt.icon;
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => toggle(opt.label)}
            aria-pressed={active}
            className={cn(
              "group inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-2 text-[13px] font-medium transition-all",
              active
                ? "border-accent bg-accent-soft text-accent-ink"
                : "border-line bg-surface text-ink-soft hover:border-ink/30 hover:text-ink"
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
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
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
          </button>
        );
      })}

      {allowOther &&
        (showOther ? (
          <input
            autoFocus
            value={other}
            onChange={(e) => commitOther(e.target.value)}
            onBlur={() => !other.trim() && setShowOther(false)}
            placeholder={otherPlaceholder}
            className="min-w-[140px] flex-1 rounded-full border border-accent bg-surface px-3.5 py-2 text-[13px] text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/20"
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
