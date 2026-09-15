# Disability Certificate & UDID Guide

A small, production-grade, accessible web guide that helps applicants in India understand the process for obtaining a disability certificate and a UDID (Unique Disability ID) card — built for the Be10x "Build for Good" hackathon, Project 14 ("Those Who Served & Access" track).

**This product gives process guidance only. It does not diagnose, assess eligibility, give legal advice, or approve applications. A human — a doctor, medical board, or official — makes those decisions.**

## Status
**100% Production Ready (Day 6 Completed)** — Full n8n multi-agent backend workflow (`"My workflow 2"`, ID `gXPlaislJyNuqJSd`) locked and active. Accessible WCAG 2.1 AA web application (`index.html`, `styles.css`, `app.js`) fully integrated. See `MEMORY.MD` for full handover and audit trail.


## Supported Scope (Version 1)
Only states/districts and disability types for which an official source document has been reviewed and registered in `docs/SOURCES.md`. Outside that, the product will say plainly it cannot verify the information and point to the official UDID portal (swavlambancard.gov.in) or the district social welfare office.

## Prerequisites (planned, Gate 1)
- Node.js (version to be pinned at Gate 1) or the chosen backend runtime.
- An LLM API key (Claude or Gemini — see `Architecture.md` §1, Open Decisions).
- A free-tier hosting account (frontend + backend function).
- Optional: a Telegram bot token, if real reminder delivery is enabled (`Architecture.md` §10).

## Local Setup (to be finalized at Gate 1)
```
git clone <repo-url>
cd <repo>
cp .env.example .env   # fill in your own keys locally — never commit .env
npm install             # or the chosen runtime's equivalent
npm run dev              # starts local dev server
```

## Environment Variables (names only — no values here or in source control)
- `LLM_API_KEY`
- `LLM_PROVIDER` (`claude` | `gemini`)
- `LOG_STORE_CONFIG` (e.g., Google Sheet ID / credentials reference)
- `REMINDER_CHANNEL_TOKEN` (optional — only if a real reminder channel is enabled)

## Development Command
`npm run dev` (placeholder — to be confirmed once the Gate 1 stack is implemented)

## Test Commands
`npm test` (unit/integration — see `docs/TESTING.md` for the full strategy and the 3 mandatory Hathcon test cases)

## Production Build Command
`npm run build` (placeholder — to be confirmed at Gate 1)

## Deployment Instructions
See `docs/OPERATIONS.md` for the full runbook. Summary: deploy the static frontend and the backend function to the chosen free-tier host; set environment variables in the host's dashboard, never in code.

## Project Structure
```
/                     canonical docs (this file, PRD.md, Architecture.md, RULES.md, Phases.md, design.md, MEMORY.MD)
/docs                 SOURCES.md, TESTING.md, OPERATIONS.md, SUBMISSION.md
/knowledge            reviewed official source documents (Gate 1+)
/app or /web          frontend source (Gate 1+)
/functions            backend function(s) (Gate 1+)
```

## Known Limitations
- Documentation-only at present; no working demo yet.
- Coverage will be limited to whichever states/districts get reviewed sources within the 3-day window.
- No real user/NGO consultation has occurred as of this writing (see `RULES.md` §1 row 9).

## Canonical Documents
- [PRD.md](./PRD.md) — product requirements
- [Architecture.md](./Architecture.md) — technical architecture
- [RULES.md](./RULES.md) — compliance & execution rules
- [Phases.md](./Phases.md) — execution plan
- [design.md](./design.md) — UI/UX
- [MEMORY.MD](./MEMORY.MD) — project state & handover log
- [docs/SOURCES.md](./docs/SOURCES.md) — official knowledge registry
- [docs/TESTING.md](./docs/TESTING.md) — test strategy & results
- [docs/OPERATIONS.md](./docs/OPERATIONS.md) — deployment/ops runbook
- [docs/SUBMISSION.md](./docs/SUBMISSION.md) — hackathon submission package

## Non-Technical Operator Instructions
Once Gate 1 is complete, this section will describe, in plain steps, how a non-technical person can: (1) open the working demo link, (2) run through the five questions, (3) confirm a reminder if offered, and (4) know who to contact if something looks wrong. See `docs/OPERATIONS.md` §"Non-technical handover procedure" for the authoritative version once populated.
