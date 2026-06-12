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
    // so previously shared links still resolve to clean URLs.
    const hash = window.location.hash;
    if (hash.startsWith("#/")) {
      const clean = hash.slice(1);
      window.history.replaceState({}, "", clean);
      setPath(clean);
    }

    const onPopState = () => {
      setPath(currentPath());
      scrollToTop();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
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

export function matchRoute(
  path: string
): { name: string; params: Record<string, string> } {
  if (path === "/" || path === "") return { name: "home", params: {} };
  if (path === "/submit") return { name: "submit", params: {} };
  const problemMatch = path.match(/^\/problems\/([^/]+)$/);
  if (problemMatch) return { name: "problem", params: { id: problemMatch[1] } };
  const roomMatch = path.match(/^\/rooms\/([^/]+)$/);
  if (roomMatch) return { name: "room", params: { id: roomMatch[1] } };
  return { name: "notfound", params: {} };
}
