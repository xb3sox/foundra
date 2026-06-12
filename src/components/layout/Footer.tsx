import { toast } from "sonner";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-ink">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="text-[17px] font-semibold tracking-tight">
              Foundra
            </span>
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            Real problems worth building.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <button
            onClick={() =>
              toast("Privacy", {
                description: "We keep your signals to ourselves.",
              })
            }
            className="cursor-pointer text-ink-soft transition-colors hover:text-ink"
          >
            Privacy
          </button>
          <button
            onClick={() =>
              toast("Contact", {
                description: "Reach the team at hello@foundra.app",
              })
            }
            className="cursor-pointer text-ink-soft transition-colors hover:text-ink"
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
}
