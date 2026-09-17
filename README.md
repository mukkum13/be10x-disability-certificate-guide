# Disability Certificate & UDID Guide

A small, production-grade, accessible web guide that helps applicants in India understand the process for obtaining a disability certificate and a UDID (Unique Disability ID) card — built for the Be10x "Build for Good" hackathon, Project 14 ("Those Who Served & Access" track).

**This product gives process guidance only. It does not diagnose, assess eligibility, give legal advice, or approve applications. A human — a doctor, medical board, or official — makes those decisions.**

## Status
**Updated 2026-09-17 — internal deadline 2026-09-18, external Hathcon deadline 2026-09-20. See `Phases.md` §"Autonomous Submission-Readiness Pass" and `docs/submission_evidence.md` for the full, source-labeled status.** In short:
- **Live verified (Telegram backend, primary verified product channel):** the n8n workflow (`"My workflow 2"`, ID `gXPlaislJyNuqJSd`) runs the full five-question guided flow, gives a grounded/source-cited final answer, routes correctly to the escalation fallback on sensitive input, switches language mid-conversation, and delivers cleanly to Telegram — tested 2026-09-16, and used successfully by a real informal trial contact (a social worker) on 2026-09-17. Public link: `https://t.me/MUKKUM13_BOT`. The workflow is kept **unpublished** between authorized, controlled tests.
- **Live verified, offline reference content by design (web UI):** the WCAG-oriented web UI (`index.html`, `styles.css`, `app.js`) is genuinely accessible and honestly labeled "Offline Reference Content" throughout — it is not connected to a live AI/grounding backend (`https://n8n.mukkubuilds.com/webhook/disability-guide` returns HTTP 404) and does not claim to be. All dynamic content is HTML-escaped before display (confirmed XSS-safe via local testing, 2026-09-17); `prefers-reduced-motion` is respected. This is a disclosed, deliberate scope decision, not a hidden defect — see `Phases.md` D1.2/D2.5.
- **Live verified ABSENT:** anonymised Google Sheets logging and the Telegram reminder module (D2.4) do not exist — both explicitly deferred by CEO decision.
- **One informal trial, not an independent review:** a social-worker contact tried the live Telegram bot on 2026-09-17 and gave positive written feedback through the bot itself (privacy-preserving record in `docs/SUBMISSION.md`). This is genuine consultation evidence, but `docs/independent_review_checklist.md` remains open for a separate, genuinely independent reviewer.
This replaces the prior "100% Production Ready (Day 6 Completed)" line, which overstated verification status relative to `Phases.md` and `docs/TESTING.md` at the time it was written.


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
- Coverage is limited to whichever states/districts have reviewed sources registered in `docs/SOURCES.md` (currently national UDID process + Maharashtra state-level escalation; see SRC-001–SRC-005). District-level hospital/medical-board detail is an open, disclosed gap.
- No Google Sheets logging or reminder module (D2.4) exists — both explicitly deferred by CEO decision, not hidden failures.
- No automated test suite exists in this repository; verification to date is manual/live (n8n execution inspection, local browser testing).
- Exactly one informal trial contact (a social worker) has used the live Telegram bot and given positive feedback (2026-09-17) — see `docs/SUBMISSION.md`. This is not a completed independent review; `docs/independent_review_checklist.md` remains open.
- Deadline reconciliation: internal CEO deadline is 2026-09-18; CONSULT-1 hard deadline is 2026-09-19 18:00; the external Hathcon submission deadline remains 2026-09-20 11:59 PM per `docs/SUBMISSION.md`.

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
- [docs/submission_evidence.md](./docs/submission_evidence.md) — every submission claim mapped to exact evidence
- [docs/live_demo_runbook.md](./docs/live_demo_runbook.md) — procedure for a future authorized controlled demonstration
- [docs/independent_review_checklist.md](./docs/independent_review_checklist.md) — unfilled checklist awaiting a genuinely independent reviewer

## Non-Technical Operator Instructions
Once Gate 1 is complete, this section will describe, in plain steps, how a non-technical person can: (1) open the working demo link, (2) run through the five questions, (3) confirm a reminder if offered, and (4) know who to contact if something looks wrong. See `docs/OPERATIONS.md` §"Non-technical handover procedure" for the authoritative version once populated.
