# intent.md — Foundra

Owner: product lead · Status: approved · Last updated: 2026-10-22

## Purpose
Foundra is a problem-discovery board for founders: surface real, evidenced problems (forum threads, reviews, job posts), score the pain, and give a room to validate one before building. Tagline: "Real problems. Real proof."

## Users
- Solo founders / technical builders deciding what to work on
- Domain experts who want to signal "I know this market"
- Not yet: teams, agencies, non-founders

## Desired outcomes
1. A visitor finds a credible, sourced problem in < 2 minutes
2. A returning user keeps positions + validation progress across sessions (localStorage)
3. Every flagship claim is checkable via a live public source link

## Constraints
- Frontend-only MVP; no backend, accounts, scraping, or AI pipeline (README states this explicitly)
- Deployed to Vercel as static build; single-file HTML artifact for sharing
- Hand-curated dataset (11 problems); illustrative people in rooms — matching/messaging is roadmap
- No third-party analytics or tracking

## Non-goals
- Co-founder matching, messaging, live scraping, paid tiers, dark-mode theming UI, i18n

## Success measures
- Leading: board→detail click rate, detail→position take rate, return-visit rate (manual/product feedback until analytics exists)
- Lagging: users reporting a validated problem interview; word-of-mouth shares of single-file export

## Feedback loop
Incidents, breached controls (e.g. privacy expectations), and validated user feedback open or update an issue referencing this file; changes here re-enter lifecycle at spec.md → plan.md.
