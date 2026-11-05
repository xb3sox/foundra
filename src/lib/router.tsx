import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface RouterContextValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function currentPath() {
  return window.location.pathname || "/";
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    // Legacy shim: the app used hash routing (#/problems/x) before launch,
    // so previously shared links still resolve to clean URLs - both on
    // first load and when a hash link is followed within the open app.
    const applyHashShim = () => {
      const target = resolveHashShim(window.location.hash);
      if (!target) return;
      window.history.replaceState({}, "", target);
      setPath(target);
    };
    applyHashShim();

    const onPopState = () => {
      setPath(currentPath());
      scrollToTop();
    };
    window.addEventListener("popstate", onPopState);
    window.addEventListener("hashchange", applyHashShim);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", applyHashShim);
    };
  }, []);

  const navigate = (to: string) => {
    if (to === window.location.pathname) return;
    window.history.pushState({}, "", to);
    setPath(to);
    scrollToTop();
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used within RouterProvider");
  return ctx;
}

/**
 * Security: Validates that legacy hash targets (#/path) represent safe,
 * internal single-slash absolute paths before passing to history.replaceState.
 * Rejects protocol-relative paths (//evil.com), backslashes (/\\evil.com),
 * and control characters to prevent cross-origin history pollution or navigation errors.
 */
export function resolveHashShim(hash: string): string | null {
  if (!hash.startsWith("#/")) return null;
  // eslint-disable-next-line no-control-regex
  if (/[\s\x00-\x1F\x7F]/.test(hash)) return null;
  const clean = hash.slice(1);
  if (!clean.startsWith("/") || clean.startsWith("//") || clean.includes("\\")) {
    return null;
  }
  return clean;
}

export function matchRoute(
  path: string
): { name: string; params: Record<string, string> } {
  if (path === "/" || path === "") return { name: "home", params: {} };
  const problemMatch = path.match(/^\/problems\/([^/]+)$/);
  if (problemMatch) return { name: "problem", params: { id: problemMatch[1] } };
  const roomMatch = path.match(/^\/rooms\/([^/]+)$/);
  if (roomMatch) return { name: "room", params: { id: roomMatch[1] } };
  return { name: "notfound", params: {} };
}
