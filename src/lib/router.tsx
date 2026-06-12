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
  const hash = window.location.hash.replace(/^#/, "");
  return hash || "/";
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onHash = () => {
      setPath(currentPath());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (to: string) => {
    window.location.hash = to;
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
