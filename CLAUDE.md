# CLAUDE.md

All shared instructions live in [AGENTS.md](AGENTS.md). Read it first; do not duplicate its content here.

Claude Code specifics:
- Use the TodoWrite tool for multi-step tasks; finish with all gates green (see AGENTS.md "Commands").
- Prefer the Edit tool over rewriting files; never regenerate `package-lock.json` wholesale.
- Before proposing UI/copy changes, flag them as requiring explicit human approval (AGENTS.md guardrails).
