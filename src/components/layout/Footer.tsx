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
          <a
            href="mailto:hello@foundra.app"
            className="text-ink-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            hello@foundra.app
          </a>
          <span className="text-ink-soft/70">
            Signals stay on your device.
          </span>
        </div>
      </div>
    </footer>
  );
}
