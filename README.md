# Foundra

> Real problems worth building.

Foundra is a problem-discovery marketplace for founders who want evidence, not AI hallucinations. Every listing ships with proof — forum threads, reviews, job posts — plus a pain score and a room to collaborate.

## Why it matters

- Most "startup ideas" are invented demand with no signal
- Founders waste months on problems nobody will pay to fix
- Foundra surfaces problems people already complain about, with receipts attached

## What's inside

- Problem board with search, industry and signal-strength filters
- Signal badges, proof cards, and score breakdowns on every listing
- Three commitment roles: feel the pain, can build it, know the market
- Pipeline explainer: signals → clustering → scoring → collaboration rooms
- Rich seed dataset for a deep demo without a backend

## Live

https://foundra-vert.vercel.app

## Quick start

```bash
npm install
npm run dev        # local dev server
npm run typecheck  # strict TypeScript gate
npm test           # vitest suite
npm run build      # chunked production build (deployed to Vercel)
npm run build:single  # single-file HTML artifact for sharing
```

## Stack

React 19, TypeScript, Vite 7, Tailwind CSS 4, shadcn/ui (Radix), Framer Motion, sonner, custom history-API router

## Status

Shipped frontend with seeded problem data (11 published problems). Commitments
and room activity persist locally (localStorage) — no live scraping, user
accounts, or problem submissions yet (submission flow removed until a real
backend lands). Deployed on Vercel as a static SPA with clean URLs.
