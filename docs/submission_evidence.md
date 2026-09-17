# Submission Evidence Map — Sugamya Sahayak

**Status:** Evidence index. Every claim made in `docs/SUBMISSION.md` (and this project's README/Phases status lines) is mapped below to exact, checkable evidence. No claim here should be taken further than the evidence it cites actually supports.

**Public Telegram bot link:** `https://t.me/MUKKUM13_BOT`

---

## 1. Claim → Evidence Map

| # | Claim | Evidence type | Exact evidence |
|---|---|---|---|
| 1 | Telegram bot's five-question guided flow works end-to-end, no repeats/skips | n8n execution record | Executions #12–#18 (2026-09-16), live workflow `gXPlaislJyNuqJSd` |
| 2 | Maharashtra/locomotor/not-registered case returns a correct, numbered, source-grounded answer (Hathcon Test 1) | n8n execution record | Execution #18, 2026-09-16 17:21:33; cites SRC-001–SRC-005, includes required closing disclosure line |
| 3 | Escalation flow correctly routes off-script/sensitive input to fixed fallback (Hathcon Test 2 equivalent) | n8n execution record | Execution #21, 2026-09-16 17:33:12 (802ms — fast path confirms no LLM call made) |
| 4 | Mid-conversation language switch (English → Hinglish) works | n8n execution record | Execution #20, 2026-09-16 17:32:24 |
| 5 | Session isolation fix (no cross-test contamination) | n8n execution record | Executions #12–#21, `_v2` session-key salt |
| 6 | Telegram delivery reliability fix (Markdown-strip, no "can't parse entities" errors) | n8n execution record | Execution #17 (FAIL, pre-fix) → #18/#19 (PASS, post-fix) |
| 7 | Controlled social-worker trial: bot received a message and sent a response successfully | n8n execution record (read-only inspection) | Execution #22, 2026-09-17 15:53:26, Succeeded in 4.037s — Node 1 received 1 item, Node 6 (Output Delivery) sent 1 item |
| 8 | Social-worker contact gave informal positive written feedback through the bot | Product Owner assertion, privacy-preserving record | `docs/SUBMISSION.md` "Who Was Consulted" — Controlled trial feedback entry, 2026-09-17 ~3:53 PM IST |
| 9 | Workflow `gXPlaislJyNuqJSd` is currently unpublished | Live browser verification (fresh page reload) | This session's Playwright-driven n8n UI check, 2026-09-17 — "Publish" button actionable (not "Published"/disabled) |
| 10 | Node 1's production webhook uses `n8n.mukkubuilds.com` | Live browser verification | Production URL confirmed: `https://n8n.mukkubuilds.com/webhook/c7b826d2-9e1e-4639-97c9-1e32c8e68058/webhook` |
| 11 | Web UI is genuinely accessible (skip link, ARIA live regions, high-contrast/font toggles, keyboard-operable) | Source file + local browser test | `index.html`/`styles.css`/`app.js`; local Playwright test, 2026-09-17 (wizard navigable via button clicks, ARIA live announcements fire, high-contrast/font toggles present) |
| 12 | Web UI respects `prefers-reduced-motion` | Source file | `styles.css` — `@media (prefers-reduced-motion: reduce) { .spinner { animation: none; } }` |
| 13 | Web UI's dynamic content is XSS-safe (no script execution on malicious input) | Local browser test | 2026-09-17 local test: entered `<img src=x onerror=alert(1)><script>alert(2)</script>` in the wizard's free-text field and `<script>alert('xss')</script>` in the chat box — both rendered as literal escaped text, no dialog/execution, via `escapeHtml()` in `app.js` |
| 14 | Web UI honestly discloses it is offline reference content, not a live AI backend | Local browser test + source file | 2026-09-17 local test confirmed "Offline Reference Content" badge, offline-notice banner, and offline-labeled chat replies appear on every response; `index.html` footer and chat-section copy state the same |
| 15 | Web UI's backend webhook (`/webhook/disability-guide`) does not exist / returns 404 | Direct probe + live test | `MEMORY.MD` Entry 059 (2026-09-16 curl probe); reconfirmed 2026-09-17 local browser test (CORS/network failure on fetch, confirming no reachable endpoint) |
| 16 | No secrets/API keys are committed to the repository | Repository scan | `git ls-files \| grep -iE "\.env$\|\.env\.\|\.pem$\|\.key$\|credential\|secret"` → only `.env.example` (placeholders only); pattern scan for API-key-shaped strings (`AIzaSy`, `ghp_`, `xox[baprs]-`, PEM private-key headers, `sk-...`) → no matches, 2026-09-17 |
| 17 | `.env.example` contains only placeholders | Source file | `.env.example` — every value reads `your_production_..._here` or a non-secret config name |
| 18 | Every factual claim in the web UI's offline fallback content traces to a Reviewed source | Source file cross-reference | `app.js` `generateGroundedFallbackResponse()` — each field inline-commented with its exact `docs/SOURCES.md` source ID (SRC-001/SRC-002/SRC-003/SRC-005); no SRC-004 pan-India claim is present in the UI (verified absent, 2026-09-17) |
| 19 | Google Sheets anonymised logging does not exist in the live workflow | Live workflow inspection | `MEMORY.MD` Entry 058 (2026-09-16) — 8-node canvas inspection, no Google Sheets node present |
| 20 | Reminder module (D2.4) is built and live-verified | n8n execution record (read-only inspection) | Execution #23, 2026-09-17 20:23:26, Succeeded in 778ms — real Telegram delivery, `ok: true`, `message_id: 63`, delivered to the originating chat with the exact specified text. See `Phases.md` D2.4 row. |
| 21 | No automated test suite exists | Repository scan | `Glob` for `package.json`/`tests/**` in this repo, 2026-09-17 — none found |
| 22 | Independent review checklist exists but is not completed | Source file | `docs/independent_review_checklist.md` — all Pass/Fail/Reviewer/Date fields blank, header states "No review has been performed or self-certified" |
| 23 | Deadline for CONSULT-1 is 2026-09-19 18:00 IST | CEO decision record | `docs/SUBMISSION.md`, `Phases.md` CONSULT-1 row |

## 2. Screenshot / Video Needs (not yet captured — for the eventual demo video and Drive folder)

- Screen recording of the Telegram bot's five-question flow and grounded final answer (per `docs/SUBMISSION.md` Video Recording section — 5–10 min, dummy data only).
- Screenshot of the "Your response has been recorded" confirmation after the Google Form is actually submitted.
- Optional: screenshot of the web UI's offline-labeled wizard result, to show the honestly-disclosed reference-only channel alongside the live Telegram channel.

## 3. Do Not Claim (deferred/unproven — explicit boundary for anyone drafting submission copy)

- **Do not** claim a live, connected web backend. The web UI is offline reference content only (`/webhook/disability-guide` returns 404).
- **Do not** claim Google Sheets logging, anonymised or otherwise. The node does not exist in the live workflow.
- **Do not** claim the reminder feature works beyond what execution #23 shows: a single controlled test, exact-match "remind me" trigger, 2-minute delay, one recipient. Do not claim broader load-testing, multi-user testing, or production-traffic reliability for it.
- **Do not** claim an "independent review" occurred. Exactly one informal trial contact (a social worker) gave positive feedback through the bot; this is not `docs/independent_review_checklist.md` being completed by a genuine outside reviewer.
- **Do not** claim broad state/district coverage. Only the national UDID process and Maharashtra state-level escalation are Reviewed (`docs/SOURCES.md`); district-level hospital/medical-board detail is an open gap.
- **Do not** claim a quantified time-savings figure (e.g., "X hours become Y minutes"). No before/after timing study has been run.
- **Do not** claim production deployment or a stable, always-on public URL. The workflow is kept unpublished between authorized, controlled tests, per standing safety procedure — it is not continuously live.
- **Do not** claim an automated test suite exists. Verification to date is manual/live (n8n execution inspection, local browser testing), not CI-automated.
- **Do not** name a specific hospital, medical board, fee amount, or eligibility percentage anywhere — no Reviewed source states any of these.
