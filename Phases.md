# Phases.md — Execution Plan Source of Truth
**Status:** Draft — Gate 0. Version 0.1. Last verified: 2026-09-12 (Asia/Calcutta).

## Master Schedule
| Window | Dates | Focus |
|---|---|---|
| Day 1 | 12 Sep 2026 | Requirements, documentation, official sources, architecture, project foundation, first deployed vertical slice |
| Day 2 | 13 Sep 2026 | Complete guided journey, grounded answers, escalation, language handling, anonymised logging, reminder integration |
| Day 3 | 14 Sep 2026 | Full verification, accessibility, privacy, security, deployment, required tests, **feature freeze** |
| Hardening | 15–19 Sep 2026 | Validation, real-user testing, corrections, rehearsal, submission prep |
| Submission | 20 Sep 2026 | Final submission |

## Schedule Correction — Six-Day Build Plan (CEO-Approved Extension, 2026-09-14 12:28 Asia/Calcutta)
**The original 3-day build plan above has an approved 3-day extension.** The Master Schedule table above is preserved as-written (not rewritten) since it records what was planned as of 2026-09-12; it is now superseded by this correction for active status-reporting purposes. **The six-day plan is the active plan.** Today, 2026-09-14, is **Day 3 of 6**, not Day 3 of 3. Every CTO report's commercial-status block must state the schedule position as "Six-day plan status: Day X of 6 — <on-schedule/at-risk/blocked>", replacing the prior "Three-day plan" wording, effective immediately and for every future report. **Current truthful schedule statement: Day 3 of 6 — at risk**, because commercial completion is still 0% / 100% (no working end-user flow exists yet; only unconnected/partially-connected draft nodes). This correction does not retroactively rewrite any historical report already sent — per the CEO's explicit instruction, only this document and `MEMORY.MD` are updated to make the six-day schedule the active plan going forward.

**Note (added 2026-09-16 as part of the reconciliation below): the "Day X of 6" counter above was never updated past this 2026-09-14 entry, even as work continued on 2026-09-15 and 2026-09-16. Do not read the "Day 3 of 6" label above as the current position — see the Timeline Reconciliation section immediately below for the authoritative current status.**

## Timeline Reconciliation — 2026-09-16 (CEO instruction: "update everywhere, no confusion at all")

**New deadline: 2026-09-18 2026 (internal CEO deadline, supersedes prior internal planning dates; the external Hathcon submission deadline remains 2026-09-20 11:59 PM per `docs/SUBMISSION.md` and is unaffected).** From this point forward, this project is tracked by **calendar date**, not by an ambiguous "Day X of Y" counter — the day-counter above caused a real discrepancy (documented at Prior-agent claim not independently verified quality below) and is retired for status-reporting purposes.

**What caused the confusion (for the record, not to assign blame):** `Phases.md` (this file) was last substantively updated 2026-09-14 and still read "Day 3 of 6 — at risk, 0% complete." Separately, `README.md` and `MEMORY.MD` accumulated later entries (2026-09-14 through 2026-09-15) self-labeled "Day 4," "Day 5," and finally a commit titled "Day 6 Final Production Release," culminating in README.md claiming "100% Production Ready." Those two threads were never reconciled against each other or against `docs/TESTING.md`, which as of 2026-09-14 still stated no application tests had been run. Both threads are real (not fabricated) but were tracked in parallel without cross-checking.

**Reconciled status as of 2026-09-16, using the Truth Protocol taxonomy:**

- **Live verified (tested directly by the CTO session, 2026-09-16, against the live n8n workflow via Telegram):**
  - D1.3a (Telegram-first vertical slice): five-question guided flow works end-to-end, no repeats/skips, across a fresh session.
  - D1.4 (grounded LLM answer): final answer is correctly grounded in SRC-001–SRC-005, includes the required closing disclosure line, and correctly incorporates earlier answers (state/district, disability type).
  - D2.1 (escalation flow): Node 1b's escalation-keyword interrupt correctly routes to the fixed-text fallback response on a real off-script/sensitive message.
  - D2.2 (named-language output): live-verified mid-conversation language switch (English → Hinglish) with the bot correctly continuing in the requested language.
  - Two delivery-reliability defects found and fixed this session: session-key cross-test contamination (fixed via `_v2` session-key salt) and Telegram "can't parse entities" send failures on long grounded answers (fixed by stripping Markdown before send; also removed the "sent automatically with n8n" attribution footer per CEO instruction).

- **Prior-agent claim, not yet independently verified by this CTO session (exists in the repo/MEMORY.MD, needs a fresh verification pass before being called "done"):**
  - D1.2 / Web UI: `index.html`, `app.js`, `styles.css` exist (~1,200 lines total, non-trivial) per the "Day 6" commit, but have not been opened/tested by this session.
  - D2.3 (anonymised logging): MEMORY.MD's "Day 4.4" entry claims a Google Sheets telemetry node was attached; not independently confirmed live.
  - D3.1–D3.3 (accessibility, security/privacy, prompt-injection fail-safe review): MEMORY.MD's "Day 5" entry self-reports "100% Compliance" on a security/cross-channel audit; this was self-graded by the same session that performed it, with no independent reviewer pass recorded per `RULES.md` §14.

- **Not started / no evidence found:**
  - D2.4 (reminder module via Telegram — draft or real delivery).
  - D2.5 (human-in-the-loop / disclosure copy shown on every completed answer in the web UI specifically — the Telegram bot's own closing line is live-verified, but the web UI's copy has not been checked).
  - D3.4 (automated test suite), D3.5 (clean-environment reproducibility check), D3.6 (final deployment/health check).
  - CONSULT-1 (real user/NGO consultation) — hard deadline 2026-09-19, unaffected by today's reconciliation.
  - Submission-day checklist items (demo video, explainer doc, Google Form) — not started.

**Effective immediately, every CTO status report states position as a calendar date against the 2026-09-18 deadline (e.g., "2026-09-16, 2 days to internal deadline"), not a day-counter.** The "Day 3 of 6" framing above is retired but left in place unedited, per the same non-rewrite policy the CEO set on 2026-09-14 — historical entries are not retroactively rewritten, only superseded going forward.

## Autonomous Submission-Readiness Pass — 2026-09-17 (CEO-Authorized)

CEO authorized an autonomous pass to complete the largest safe, high-value part of the remaining project before the 2026-09-19 deadline. Completed this pass: `docs/SUBMISSION.md` Q1–Q3/What Was Built/Known Failures finalized (evidence-based); `docs/submission_evidence.md` (claim-to-evidence map) and `docs/live_demo_runbook.md` (procedure-only, not executed) created; secret scan and doc-link resolution checks run (clean); web UI re-tested locally for accessibility labels, offline disclosure, XSS-safety, and source-honest fallback content (no defects found — prior fixes already effective); this file, `README.md`, and `MEMORY.MD` updated to align with verified evidence. No workflow, credential, or source changed. Full detail in `MEMORY.MD` Entry 063.

**Explicitly not done in this pass (CEO decisions already made / boundaries respected):** no web backend rebuild, no Google Sheets logging, no reminder module (D2.4) — all deferred by CEO decision; workflow `gXPlaislJyNuqJSd` left unpublished; no outreach performed; nothing pushed to any remote.

## Available CLI Agents (enumerated, not invented) — UPDATED 2026-09-12 13:56:00 Asia/Calcutta per CEO Multi-AI Mandate
**Standing instruction, to be issued before every coding task, delegation, review, or test assignment (CEO decision 2026-09-12 13:46:24 Asia/Calcutta):** *"Use /multi-ai-framework and use as less Claude Code as possible. Use Codex and Antigravity to their fullest capabilities under the already selected models."*

**Environment check (2026-09-12 13:46:24–13:56:00 Asia/Calcutta, full detail in `MEMORY.MD` Entry 006):** `/multi-ai-framework` skill, Codex, and Antigravity were checked via `Skill`, `ToolSearch`, `SearchSkills`, `SearchPlugins`, and `ListAgents` — **none are available in this session.** This is reported as a Blocked condition, not silently worked around.

As of this session, the Agent tool exposes only these types:
- **general-purpose** — full tool access; the only realistic implementer agent available, but its use for implementation is now a CEO-Blocked item pending direction (see below), not a default choice.
- **claude** — full tool access (catch-all); same status as general-purpose.
- **Explore** — read-only search; usable for independent verification/location tasks (does not touch the multi-AI mandate, since it is not implementation).
- **Plan** — planning/architecture only, no file writes; usable for design review (not implementation).
- **claude-code-guide**, **statusline-setup** — not relevant to this project's tasks.

**Conclusion: no Codex or Antigravity capability exists in this environment.** Only Claude-family agents (`general-purpose`, `claude`) can write implementation code here, which directly conflicts with the CEO's "use as little Claude Code as possible" mandate. **D1.2 and D1.3 (both implementation tasks) are marked Blocked** until the CEO either (a) approves a disclosed exception allowing Claude to implement them this cycle, or (b) supplies Codex/Antigravity output from elsewhere for this session to integrate and verify, or (c) pauses implementation. `Explore` and `Plan` remain usable now for read-only research/review tasks (e.g., D1.1 source verification, later accessibility/security review), since those do not conflict with the mandate.

## Role Assignment (Gate 1 onward)
| Role | Agent | Combines |
|---|---|---|
| Documentation & requirements developer | CTO (this session) | — |
| Full-stack website developer | `general-purpose` (Agent A) | frontend + backend |
| Grounded-AI & knowledge developer | `general-purpose` (Agent A), sequential after foundation | grounding layer, source ingestion |
| Reminder & logging integration developer | `claude` (Agent B) | reminder module + anonymised logger |
| QA / accessibility / privacy reviewer | `Explore` or `Plan` (Agent C) | independent verification only, no implementation |
| Deployment & handover developer | `claude` (Agent B) | after Agent A's slice is verified |

File ownership is split so Agent A and Agent B never edit the same file concurrently (see task table below).

---

## Day 1 — 12 September 2026

| Task ID | Phase | Description | Owner | Owned files | Must not touch | Dependency | Entry criteria | Exit criteria | Required tests | Evidence | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| D1.0 | Gate 0 | Documentation baseline (this pass) | CTO | 11 canonical files | — | none | CEO instruction received | All 11 files created, internally consistent | Cross-doc contradiction review | `MEMORY.MD` Entry 001 (+ correction Entry 002) | **Completed** 2026-09-12 13:26:00 Asia/Calcutta; correction to "committed" language completed 2026-09-12 13:56:30 Asia/Calcutta |
| D1.1 | Gate 1 | Source-document collection: UDID process, Maharashtra procedure, Maharashtra certifying-hospital/medical-board info, pilot district social-welfare-office source, State Commissioner escalation source | CTO | `docs/SOURCES.md` | app code | Gate 0 conditional approval | Gate 0 approved | ≥1 "Reviewed" source per candidate area | Manual review vs. official portals | `docs/SOURCES.md` SRC-001–SRC-005 | **In Progress — partial coverage expanded 2026-09-12 19:50:48 Asia/Calcutta.** National rules, Maharashtra portal guidance, and official medical-authority lookup are Reviewed; district hospital/medical-board and district welfare-office gaps remain open. |
| D1.2 | Gate 1 | Frontend shell via Lovable, scoped strictly to UI only | **Partially Complete — deprioritized, not abandoned** | `/app` (post-integration) | root Markdown files, shared workflow | D1.0 approved | Repo scaffolding needed | Shell is integrated and passes its review gate | Manual browser check + integration gate checklist | Evidence in `MEMORY.MD` | **Live verified — real UI, but backend integration is broken (2026-09-16).** `index.html`/`app.js`/`styles.css` are genuine, non-trivial, accessible (semantic HTML, ARIA live regions, skip link, focus management, high-contrast/font-size toggles). **However `app.js` calls `https://n8n.mukkubuilds.com/webhook/disability-guide`, and a direct probe confirms this endpoint returns HTTP 404** — no generic Webhook-trigger node with that path exists in the live n8n workflow (which only has a Telegram Trigger). Every "grounded guidance" and "chat" response the web UI produces is therefore silently falling back to hardcoded local JS content (`generateGroundedFallbackResponse` and the static chat fallback strings), not real live Gemini/n8n grounding — contradicting Entry 054's "Live Gemini Chat Assistant sending and receiving grounded helpline message: PASSED" claim, which was almost certainly exercising the fallback path only. **This is a real, unresolved gap, not a documentation-only issue.** |
| D1.3 | Gate 1 | Shared workflow implementation | **Reframed — see D1.3a** | n8n workflow | frontend files | D1.1 | Reviewed-source coverage | Five questions advance correctly | End-to-end Telegram test | Workflow export and transcript | **Reframed 2026-09-12 16:05:00 Asia/Calcutta.** |
| D1.3a-RAG | Gate 1 | **Minimal retrieval-layer design/review gate** — document and CEO-review the reviewed-source-only retrieval design before any RAG-related n8n node is built | CTO | `Architecture.md` §29, `RULES.md` §27, `docs/automation/rag-corpus/sources.json`, `docs/automation/n8n-build-manifest.md` (Node 4.5), `docs/automation/gemini-prompt.md`, `docs/TESTING.md` | live n8n nodes | CEO RAG approval (2026-09-13) | Environment check (embeddings node availability) + documentation complete | Design review report accepted by CEO before any node is added/configured | N/A (documentation gate, no live test yet) | This gate's own CTO report | **Design accepted; Data Table built — 2026-09-13.** `UDID_Reviewed_Sources` Data Table exists with all 5 reviewed rows; Node 4.5 exists with this table selected, unconnected, no filter conditions configured. |
| D1.3a | Gate 1 | **Telegram-first vertical slice:** Telegram Trigger → escalation interrupt → five-question state → retrieval → grounded answer or fail-safe → Google Sheets log → Telegram response | CTO using n8n/Gemini/Telegram/Sheets | n8n workflow export, `docs/SOURCES.md` | — | D1.1, D1.3a-RAG | Telegram/n8n access and reviewed sources | Live Telegram guide flow; source-grounded response where supported; fixed fail-safe otherwise | Mandatory Telegram cases | Workflow export, transcript, log rows | **Live verified 2026-09-16.** Full five-question flow confirmed end-to-end via live Telegram testing (fresh `_v2`-salted session, no repeats/skips), source-grounded final answer confirmed correct against SRC-001–SRC-005, escalation fallback confirmed firing correctly on off-script input. Google Sheets logging portion not independently re-confirmed in this pass (see D2.3). See `Phases.md` Timeline Reconciliation (2026-09-16) for full detail. |
| D1.4 | Gate 1 | Wire LLM (Gemini, per CEO-approved stack) call + grounding for the reviewed sources from D1.1 | TBD (Codex/Antigravity if resolved, else per CEO direction) | `/functions/guide.*`, prompt file | — | D1.1, D1.3 | ≥1 reviewed source + working state machine | Numbered, source-grounded answer returned for the pilot state, scoped only to SRC-001–SRC-005 | Hathcon Test 1 (Maharashtra/locomotor/unregistered) | Recorded transcript in `docs/TESTING.md` | **Live verified 2026-09-16** — Maharashtra/Pune/locomotor-disability test case returned a correct, numbered, source-grounded answer citing SRC-001–SRC-005, with the required closing disclosure line. Full transcript available in n8n execution history (execution #17/#18); not yet copied into `docs/TESTING.md` — pending. |
| D1.5 | Gate 1 | Deploy vertical slice to free-tier host | TBD | deployment config only | app source | D1.4 | Working local slice | Public URL loads and completes one full 5-question run | Live browser test from a second device | URL + screen recording | Not started — blocked behind D1.4 |
| D1.6 | Gate 0 | Record Day 1 evidence, update `MEMORY.MD`, report Gate 1 status to CEO | CTO | `MEMORY.MD` | — | D1.1–D1.5 | Day 1 tasks attempted | Worklog entries present for every task above | — | `MEMORY.MD` | **In Progress** — this update itself (2026-09-12 13:56:30 Asia/Calcutta) is part of D1.6; will continue as D1.2–D1.5 unblock |
| GH-1 | Cross-cutting | Attach/push project to `https://github.com/mukkum13/be10x-disability-certificate-guide` | CTO (blocked — see status) | — | any other GitHub repo on the account | CEO authorisation (2026-09-12 14:11:18 / 14:22:56) | Repo URL confirmed by CEO | Repo verified reachable, current branch pushed, remote hash confirmed matching local | `git ls-remote`/API check + push output | `MEMORY.MD` Entries 010–011 | **Verified locally — GitHub synchronisation blocked**, as of 2026-09-12 14:23:20 Asia/Calcutta. This cloud session's GitHub proxy returns HTTP 403 "GitHub access to this repository is not enabled for this session" with no `add_repo` tool available here to attach it. Local `device_bash` (would allow pushing via the Product Owner's own machine credentials) failed 4 consecutive times ("Workspace unavailable"). **No phase may be marked `Completed` until this resolves.** Next deadline: retry when either channel recovers; no fixed date set by CEO. |
| CONSULT-1 | Cross-cutting | Secure genuine consultation evidence (real person or NGO) for the "real-world usefulness" judging criterion | Product Owner (CTO to assist with outreach drafting if asked) | `docs/SUBMISSION.md` "Who Was Consulted" | — | none | CEO decision to pursue consultation (2026-09-12 13:46:24) | Real, honestly-documented conversation evidence recorded, or the gap is explicitly accepted and disclosed | N/A (external activity) | `docs/SUBMISSION.md` | **Informal trial feedback obtained, 2026-09-17 — not a completed independent review.** CEO sent outreach to a social-worker contact via WhatsApp (2026-09-17 15:28 IST); the contact tried the live Telegram bot during a controlled, temporary publish and gave positive written feedback through the bot itself (~15:53 IST, n8n execution #22). Recorded privacy-preservingly in `docs/SUBMISSION.md` (no name/phone/chat ID). This satisfies the "genuine consultation evidence" bar honestly, but is explicitly distinguished from `docs/independent_review_checklist.md`, which remains open for a separate, genuinely independent reviewer. |

**Day 1 exit / Gate 1 criteria:** deployed website loads; five questions work; dummy input accepted; source-grounded numbered guidance appears for the pilot state; missing-knowledge case fails safely (returns fail-safe message, not a guess).

**Note added 2026-09-12 13:56:30 Asia/Calcutta:** All "Agent A"/"Agent B"/"Agent C" owner labels in the Day 2 and Day 3 tables below were written before the CEO's Multi-AI Development Rule and are provisional placeholders only — no task in Day 2/Day 3 may be assigned to a Claude-family agent (`general-purpose`/`claude`) for implementation without the same Blocked treatment as D1.2/D1.3, until the CEO resolves the Codex/Antigravity availability gap. `Explore`/`Plan` remain usable for the review-only rows (D3.1–D3.3, D3.5). This note will be replaced with corrected owner columns once the CEO responds.

## Day 2 — 13 September 2026

| Task ID | Phase | Description | Owner | Owned files | Must not touch | Dependency | Entry criteria | Exit criteria | Required tests | Evidence | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| D2.1 | Gate 2 | Escalation flow ("stuck") wired to verified route | Agent A | `/functions/guide.*` (escalation module) | logging module (D2.3) | Gate 1 verified | Gate 1 passed | Hathcon Test 2 passes | "I am stuck at the hospital" → correct route | `docs/TESTING.md` | **Live verified 2026-09-16** — a real (unscripted) off-script message asking to share another person's disability details correctly triggered Node 1b's escalation interrupt, routing to the fixed-text fallback (Node 6b) instead of the LLM path. Not yet copied into `docs/TESTING.md` — pending. |
| D2.2 | Gate 2 | Named-language output (at least English + one more named language) | Agent A | prompt/response formatter | — | D2.1 | Gate 1 passed | Response matches user-named language, short sentences | Manual bilingual test | Transcript | **Live verified 2026-09-16** — mid-conversation switch from English to Hinglish confirmed working; bot correctly continued responding in the requested language. Not yet copied into `docs/TESTING.md` — pending. |
| D2.3 | Gate 2 | Anonymised logging (6 fields only) | Agent B | `/functions/log.*` | guide.* core logic | Gate 1 passed | none | Log store shows only whitelisted fields, nothing else | Inspect log store after a test run | Screenshot/export of log row | **Accepted as blocked for this deadline — CEO decision, 2026-09-17.** Attempted 2026-09-17: checking for a pre-existing usable Google Sheets credential required opening n8n's credentials list, which this session's own tool-permission layer denied as "Credential Exploration." CEO reviewed and explicitly accepted this as blocked rather than pursue it further — **no further credential exploration, credential requests, or workarounds are to be attempted.** Limitation remains honestly disclosed in `README.md`/`docs/SUBMISSION.md`. |
| D2.4 | Gate 2 | Reminder module via Telegram (CEO-approved channel, decided 2026-09-12 13:46:24 Asia/Calcutta): draft-only mode + real integration with delivery verification | Agent B | `/functions/reminder.*` | — | D2.3 | Telegram bot set up | Draft text always shown; a real 2-minute test reminder arrives via Telegram | Hathcon Test 3 | Delivery screenshot/log timestamp | **Stopped by design, 2026-09-17 (regression-risk boundary).** This session's autonomous authorization required adding an explicit opt-in reminder node only if it did not risk the proven core flow, and to stop and document rather than proceed if it did. Building this safely requires adding new node(s) to the live 8-node workflow (`gXPlaislJyNuqJSd`) that intercept a "remind me" keyword ahead of/alongside the existing Node 1b escalation interrupt and Node 5 grounded-response path, then verifying no regression via a live publish/test/unpublish cycle — a change with real risk to the escalation-routing and grounded-response paths that are the product's only fully live-verified capability, and one this session judged should not be made unsupervised, in a single autonomous pass, without a tighter human-in-the-loop feedback cycle than is available here. **Current workflow preserved unchanged; this subtask stopped rather than risk the proven core flow.** Remains not started, pending explicit CEO go-ahead for a scoped, closely-supervised build-and-test session. |
| D2.5 | Gate 2 | Human-in-the-loop + disclosure copy finalized in UI | Agent A | frontend copy | — | D2.1–D2.2 | none | Disclosure and closing line appear on every completed guidance response | Manual review | Screenshot | **Fixed and live-verified, 2026-09-17.** The false `✓ 100% Official Source Grounded` badge flagged on 2026-09-16 has been corrected (commits `ae9fba9`, `ff3ff2c`): the badge now dynamically reads "Offline Reference Content" (or "Live Grounded Response" only if `isLive` is actually true) based on whether the fetch to the n8n backend actually succeeded. Locally re-tested 2026-09-17: badge, offline-notice banner, and offline-labeled chat replies correctly appear on every wizard/chat response given the backend is unreachable. The Telegram bot's closing disclosure line remains live-verified present on every completed answer (2026-09-16). |
| D2.6 | Gate 0 | Update `MEMORY.MD`, `docs/TESTING.md` with Day 2 evidence; report Gate 2 status to CEO | CTO | `MEMORY.MD`, `docs/TESTING.md` | — | D2.1–D2.5 | Day 2 tasks attempted | Entries present | — | `MEMORY.MD` | Not started |

**Day 2 exit / Gate 2 criteria:** escalation flow, named-language output, anonymised log, reminder (draft or verified), and human-in-the-loop messaging all demonstrated with evidence.

## Day 3 — 14 September 2026 (Feature Freeze Day)

| Task ID | Phase | Description | Owner | Owned files | Must not touch | Dependency | Entry criteria | Exit criteria | Required tests | Evidence | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| D3.1 | Gate 3 | Accessibility pass against `design.md` acceptance criteria | Agent C (Explore/Plan, read-only review) | none (review only) | all app files | Gate 2 passed | none | No blocking accessibility failures | Manual keyboard/contrast/screen-reader spot check | `docs/TESTING.md` accessibility section | **Partial code-level review done 2026-09-16/17 (static only — no live browser/axe/Lighthouse run yet).** `styles.css` has genuine accessibility infrastructure: CSS custom-property theming, a real high-contrast mode (`.theme-high-contrast`), dynamic font scaling (normal/large/xlarge), a visible `:focus-visible` ring (3px outline + offset, `!important`), and a working skip-link. No blocking issues found in static review. **Minor gap fixed 2026-09-16 (commit `1da7bfb`):** the `.spinner` loading-icon animation now has a `@media (prefers-reduced-motion: reduce) { .spinner { animation: none; } }` override, confirmed present in `styles.css` and re-verified 2026-09-17. Live keyboard-only and screen-reader testing, and an actual contrast-ratio audit (axe/Lighthouse), remain outstanding — a 2026-09-17 local pass confirmed the wizard is navigable via keyboard-equivalent controls and ARIA live announcements fire correctly, but this was not a formal screen-reader/axe run. |
| D3.2 | Gate 3 | Security & privacy pass (secrets, input validation, rate limits, no PII retained) | Agent C (review) | none | all app files | Gate 2 passed | none | No secret in source; no prohibited data retained | Manual code + log inspection | `docs/TESTING.md` security section | **Prior-agent claim, not independently verified** — same self-graded "Day 5" audit as D3.1; needs independent review. |
| D3.3 | Gate 3 | Prompt-injection & unsupported-location fail-safe tests | Agent C (review) | none | — | Gate 2 passed | none | System resists prompt injection; unsupported input fails safely | Adversarial test prompts | `docs/TESTING.md` | **Partially live verified** — the escalation-keyword fallback (D2.1) demonstrates one class of safe-fail behavior on sensitive input; deliberate prompt-injection adversarial testing has not been run. |
| D3.4 | Gate 3 | Automated test suite (unit + integration) authored and passing | Agent A/B jointly (non-overlapping files) | `/tests` | — | Gate 2 passed | none | All tests green | CI or manual run log | `docs/TESTING.md` | Not started — no evidence found in repo as of 2026-09-16. |
| D3.5 | Gate 3 | Clean-environment setup verification (`README.md` reproducibility) | Agent C (review) | none | — | D3.4 | none | A fresh clone + README steps reach a running app | Manual clean-room run | `docs/OPERATIONS.md` | Not started — `README.md` setup steps are still placeholders as of 2026-09-16. |
| D3.6 | Gate 3 | Final deployment, health check, feature freeze declared | Agent B | deployment config | — | D3.1–D3.5 pass | none | Production URL stable; `/health` returns OK | Health check output | `MEMORY.MD` deployment entry | Not started — the n8n workflow has been published/tested repeatedly during this session's testing but is unpublished by default between tests, per standing safety procedure; no permanent production activation decision has been made. |
| D3.7 | Gate 0 | Consolidate all evidence, freeze features, report Gate 3 status to CEO | CTO | `MEMORY.MD`, `RULES.md` (status columns) | — | D3.1–D3.6 | Day 3 tasks attempted | Feature freeze confirmed in `MEMORY.MD` | — | `MEMORY.MD` | Not started — blocked behind D3.1–D3.6. |

**Day 3 exit / Gate 3 criteria:** automated tests, accessibility, privacy, security controls, failure recovery, clean setup, production deployment, and known-limitations documentation all verified.

## 15–19 September 2026 — Validation & Rehearsal
- Real-user or NGO consultation attempt (addresses Pending CEO Decision #1 in `RULES.md`) — if one occurs, capture evidence honestly in `docs/SUBMISSION.md`; if not, disclose the gap honestly rather than fabricate it.
- Fix issues found during validation.
- Rehearse the demo video against the actual source-document structure (intro → problem → live walkthrough → where AI does the heavy lifting → impact line), 5–10 minutes, per `docs/SUBMISSION.md` (corrected 2026-09-13 — the previously recorded "0:20/0:40/2:20/2:45/3:00" 3-minute breakdown did not match `Project_details.docx` and was removed).
- Prepare the Problem & Solution Explainer (1–3 pages) for the Google Drive folder.
- Draft the Google Form's 3 answers (Q1/Q2/Q3) per `docs/SUBMISSION.md`.

## 20 September 2026 — Submission Day Checklist
**Corrected 2026-09-13 to match the actual two-piece mechanism in `Project_details.docx` (Google Drive folder + Google Form) — see `docs/SUBMISSION.md`.**
- [ ] Working Telegram and/or website link confirmed live (in Drive folder's Project Files)
- [ ] Demo video recorded (5–10 min per source document) and placed in the Drive folder
- [ ] Problem & Solution Explainer (1–3 pages) finalized and placed in the Drive folder
- [ ] Drive folder shared "Anyone with link → Viewer," tested in incognito
- [ ] Google Form submitted: email/phone, project title/track, Q1/Q2/Q3, Drive link, confirmation checkbox
- [ ] Three required Hathcon tests re-run same-day with fresh evidence
- [ ] Known failures honestly disclosed
- [ ] Non-technical operator instructions confirmed workable
- [ ] `MEMORY.MD` reflects exact final state
- [ ] CEO final acceptance recorded, including the track declared on the Google Form (`RULES.md` §1a)

## Risks & Rollback
| Risk | Rollback / Recovery |
|---|---|
| Official source documents cannot be found/reviewed in time | Fall back to the single most-documented state (e.g., Maharashtra, per hackathon example); disclose limited coverage honestly; never fabricate coverage |
| Custom website build slips past Day 3 | **Corrected 2026-09-13:** no "Route B Claude Project" fallback exists in the verified source document (removed, `RULES.md` row 26). The real fallback is simply submitting an honestly-documented partial build through the same Google Drive + Google Form mechanism, disclosing what does not work in the Problem & Solution Explainer and the video. |
| Reminder channel cannot be verified to deliver | Ship draft-only reminder text; disclose as a known limitation (does not violate FR-7, which explicitly allows draft-only mode) |
| Real user/NGO consultation not obtained | Disclose honestly in `docs/SUBMISSION.md`; do not claim consultation that did not happen |
| Two agents collide on a file | File-ownership table above is authoritative; CTO reassigns immediately on detection and logs it in `MEMORY.MD` |

## CEO Approval Gates
- **Before Gate 1:** CEO must approve this documentation baseline and the Open Decisions in `Architecture.md` §26 / `RULES.md` §1 row 15 (stack choice) and the Pending CEO Decision #1 (real-user consultation vs. accepted scoring risk).
- **Before Gate 2:** CEO confirms reminder-channel choice (or accepts draft-only mode).
- **Before Gate 4:** CEO accepts consolidated evidence for submission.
