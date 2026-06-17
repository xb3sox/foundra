import { cn } from "../../utils/cn";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

// Foundra chip skin layered over the shadcn Toggle defaults. The off/on
// states mirror the original hand-rolled chips (pill, line border, ink fill).
export const chipBase =
  "h-auto min-w-0 cursor-pointer rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all hover:bg-surface aria-pressed:bg-surface";
export const chipOff =
  "border-line bg-surface text-ink-soft hover:border-ink/30 hover:text-ink";

export function FieldLabel({
  index,
  children,
}: {
  index?: number;
  children: React.ReactNode;
}) {
  return (
    <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-ink">
      {index != null && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/[0.06] text-[11px] font-semibold text-ink-soft tabular-nums">
          {index}
        </span>
      )}
      {children}
    </Label>
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
