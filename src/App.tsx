import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RouterProvider, matchRoute, useRouter } from "./lib/router";
import { getProblem } from "./data/problems";
import { StoreProvider } from "./lib/store";
import { Toaster } from "./components/ui/sonner";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { ProblemDetail } from "./pages/ProblemDetail";
import { Room } from "./pages/Room";
import { Button } from "./components/ui/button";

function NotFound() {
  const { navigate } = useRouter();
  return (
    <div className="mx-auto max-w-xl px-5 py-28 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-ink-soft">
        That page doesn't exist. Let's get you back to real problems.
      </p>
      <Button className="mt-6" onClick={() => navigate("/")}>
        Back to problems
      </Button>
    </div>
  );
}

const DEFAULT_TITLE = "Foundra — Real problems worth building.";

function routeTitle(route: ReturnType<typeof matchRoute>): string {
  if (route.name === "problem" || route.name === "room") {
    const problem = getProblem(route.params.id);
    if (!problem) return "Not found — Foundra";
    return route.name === "room"
      ? `Room: ${problem.title} — Foundra`
      : `${problem.title} — Foundra`;
  }
  if (route.name === "notfound") return "Not found — Foundra";
  return DEFAULT_TITLE;
}

function Routes() {
  const { path } = useRouter();
  const route = matchRoute(path);

  useEffect(() => {
    document.title = routeTitle(route);
  }, [path]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={path}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        {route.name === "home" && <Home />}
        {route.name === "problem" && <ProblemDetail id={route.params.id} />}
        {route.name === "room" && <Room id={route.params.id} />}
        {route.name === "notfound" && <NotFound />}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <StoreProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <ErrorBoundary>
              <Routes />
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
        <Toaster />
      </StoreProvider>
    </RouterProvider>
  );
}
