# Architecture

Foundra is a static, client-only React SPA. No backend, no runtime secrets, no network calls — user data never leaves the browser.

## Stack
- React 19 + Vite 7 + TypeScript (strict) + Tailwind CSS 4 (`@tailwindcss/vite`)
- shadcn-style primitives vendored in `src/components/ui/`; `shadcn` CLI dep removed (compat CSS inlined in `src/styles/shadcn-compat.css`)
- Radix (via ui primitives), Framer Motion, sonner (toasts)
- Custom history-API router: `src/lib/router.tsx` (hash-free paths; no router library)
- Vitest + Testing Library
- Deployed on Vercel (`vercel.json`: headers/CSP, rewrites)

## Boundaries & data flow
```
index.html → src/main.tsx
  → App: RouterProvider + StoreProvider
      Routes (matchRoute on path):
        /            → Board (Hero, FilterBar, ProblemCard grid)
        /problem/:id → Problem detail
        /room/:id    → Validation room (progress steps)
      StoreProvider → localStorage (positions + room progress ONLY)
```
- Product content is authored statically in `src/data/problems/` (single source of problem data).
- User state persists only in `localStorage` via `src/lib/store.tsx`. Nothing is sent anywhere.
- Pure logic kept out of components and unit-tested: `filter-problems.ts`, `router.tsx`, `store.tsx`.

## Key modules
| Path | Role |
|---|---|
| `src/App.tsx` | Composition root: providers, route switch, titles |
| `src/lib/router.tsx` | History-API routing (navigate, matchRoute) |
| `src/lib/store.tsx` | Positions/room-progress context, localStorage-backed |
| `src/lib/filter-problems.ts` | Board search/filter logic |
| `src/data/problems/` | Curated dataset |
| `src/components/{board,cards,room,problem,modals,layout,forms}` | Feature UI |
| `src/components/ui/` | Low-level primitives; `cn()` ONLY in `src/utils/cn.ts` |
| `src/components/ErrorBoundary.tsx` | Top-level crash containment |

## Decisions
- **Static-first:** content in code, reviewed via PRs — simplest reliable "CMS".
- **No router/state libraries:** app has 3 routes and one context; custom router is smaller and fully tested. Revisit if routes > ~8.
- **`vite-plugin-singlefile`** powers `npm run build:single` (self-contained HTML for sharing); default `build` stays chunked for Vercel.
- **Dark-mode CSS** kept as standard scaffold, not activated pending product decision.

## Extension points
- New problem: add `src/data/problems/<id>.ts`, register in `index.ts` (no component changes).
- New page: add case to `matchRoute` + component under `src/components/`, wire in `App.tsx` Routes.
- CI gates mirror local commands exactly (`.github/workflows/ci.yml`).
