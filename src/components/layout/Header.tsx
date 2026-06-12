import { useRouter } from "../../lib/router";
import { Button } from "../ui/button";

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-ink">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-ink">
        Foundra
      </span>
    </span>
  );
}

export function Header() {
  const { navigate } = useRouter();
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer transition-opacity hover:opacity-80"
          aria-label="Foundra home"
        >
          <Logo />
        </button>
        <nav className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate("/")}
            className="hidden cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:inline-block"
          >
            Problems
          </button>
          <Button size="sm" onClick={() => navigate("/")}>
            Explore problems
          </Button>
        </nav>
      </div>
    </header>
  );
}
