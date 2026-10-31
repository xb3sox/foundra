import { useEffect } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { RouterProvider, matchRoute, useRouter } from "./lib/router";
import { getProblem } from "./data/problems";
import { StoreProvider } from "./lib/store";
import { StorageNotice } from "./components/StorageNotice";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
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

const DEFAULT_TITLE = "Foundra · Real problems worth building.";

function routeTitle(route: ReturnType<typeof matchRoute>): string {
  if (route.name === "problem" || route.name === "room") {
    const problem = getProblem(route.params.id);
    if (!problem) return "Not found · Foundra";
    return route.name === "room"
      ? `Room: ${problem.title} · Foundra`
      : `${problem.title} · Foundra`;
  }
  if (route.name === "notfound") return "Not found · Foundra";
  return DEFAULT_TITLE;
}

function Routes() {
  const { path } = useRouter();
  const route = matchRoute(path);

  useEffect(() => {
    // route is derived synchronously from path, so [path] is the correct dep.
    document.title = routeTitle(route);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <MotionConfig reducedMotion="user">
      <RouterProvider>
        <StoreProvider>
          <TooltipProvider>
            <div className="flex min-h-screen flex-col">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:border focus:border-line focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white focus:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                Skip to main content
              </a>
              <Header />
              <StorageNotice />
              <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
                <ErrorBoundary>
                  <Routes />
                </ErrorBoundary>
              </main>
              <Footer />
            </div>
            <Toaster />
          </TooltipProvider>
        </StoreProvider>
      </RouterProvider>
    </MotionConfig>
  );
}
