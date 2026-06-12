import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "subtle";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-[#000] border border-ink",
  secondary:
    "bg-surface text-ink border border-line hover:border-ink/30 hover:bg-[#fbfaf7]",
  ghost: "bg-transparent text-ink-soft hover:text-ink hover:bg-black/[0.04]",
  subtle:
    "bg-accent-soft text-accent-ink border border-transparent hover:bg-[#daeee4]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px] rounded-[10px] gap-1.5",
  md: "h-11 px-5 text-sm rounded-xl gap-2",
  lg: "h-12 px-6 text-[15px] rounded-xl gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "inline-flex select-none items-center justify-center font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
