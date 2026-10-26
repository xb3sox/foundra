# Foundra

> Real problems. Real proof.

Foundra is a problem-discovery board for founders. It surfaces problems people already complain about — forum threads, reviews, job posts — scores the pain, and gives you a room to validate one before you build.

## Why it matters

- Most "startup ideas" are guesses with no demand behind them
- Founders waste months on problems nobody will pay to fix
- Foundra starts from problems people already complain about, with the receipts attached

## What's inside

- Problem board with search, industry and signal-strength filters
- Signal badges, proof cards, and score breakdowns on every listing
- Flagship problems link to **live, public sources** (real Reddit threads, Capterra reviews, the QuickBooks 2025 Late Payments Report)
- Three positions on every problem: feel the pain, can build it, know the market
- A validation room per problem: take a position, work a checklist, see the first solution to test, line up a first interview

## How problems are found

We collect where people already vent (forums, reviews, job posts), cluster the same pain together, and score it by repetition, clarity, workarounds, signs people pay, and urgency. Listen → Cluster → Score. There is no automated scraper or AI pipeline behind the demo data — the dataset is hand-curated, and the strongest problems link straight to the public source so you can check them yourself.

## Status

Shipped frontend with a curated dataset (11 problems). Positions and room
progress persist locally (localStorage). Single-player today: you can discover,
take a position, and validate. **Co-founder matching and messaging between
real users is roadmap, not a current feature** — the people shown in rooms are
illustrative. No live scraping, accounts, or problem submissions yet.

## Quick start

```bash
npm install
npm run dev        # local dev server
npm run typecheck  # strict TypeScript gate
npm test           # vitest suite
npm run build      # chunked production build (deployed to Vercel)
npm run build:single  # single-file HTML artifact for sharing
```

## Live

https://foundra-vert.vercel.app

## Stack

React 19, TypeScript, Vite 7, Tailwind CSS 4, shadcn/ui (Radix), Framer Motion, sonner, custom history-API router

## Engineering and operations

Start with the [product operating model](docs/GITHUB_DELIVERY_PLAN.md) for the
GitHub-native issue workflow, agent-ready templates, quality gates, and AI
authority boundaries. Also see [CONTRIBUTING.md](CONTRIBUTING.md),
[SECURITY.md](SECURITY.md), [AGENTS.md](AGENTS.md), and
[operations and rollback](docs/OPERATIONS.md).
Reviewed project-local agent skills and their provenance are in `.agents/`.
Historical audit and remediation notes in `docs/` are snapshots, not current
status.
