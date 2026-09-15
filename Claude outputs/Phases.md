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
| D1.1 | Gate 1 | Source-document collection: UDID process, Maharashtra procedure, Maharashtra certifying-hospital/medical-board info, pilot district social-welfare-office source, State Commissioner escalation source | CTO | `docs/SOURCES.md` | app code | Gate 0 conditional approval (2026-09-12 13:46:24) | Gate 0 approved | ≥1 "Reviewed" source per candidate area | Manual review vs. official portals | `docs/SOURCES.md` SRC-001, SRC-002 | **In Progress — now the top priority (CEO directive, 2026-09-12 16:05:00 Asia/Calcutta),** since neither the Telegram nor the website channel can return grounded guidance without a Reviewed source (`Architecture.md` §28.5). Started 2026-09-12 13:48:00, last updated 2026-09-12 15:35:00 Asia/Calcutta. SRC-001 (UDID process, national) and SRC-002 (Maharashtra State Commissioner escalation) Reviewed. Checked `depwd.maharashtra.gov.in` (15:20–15:35) — it only links to `swavlambancard.gov.in`, does not itself state the procedure; not registered as Reviewed. Maharashtra state procedure, district hospital/medical-board list, and pilot district welfare office remain Not Reviewed (open gap, disclosed in `docs/SOURCES.md`). Next deadline: before D1.4/D1.3a may return real (non-fail-safe) guidance. |
| D1.2 | Gate 1 | Frontend shell via **Lovable** (primary, authorised by Product Owner), scoped strictly to `RULES.md` §24 (layout/shell/states only, no logic, no credentials, dummy content only); Emergent only after a recorded 30-min Lovable failure | **Partially Complete — deprioritized, not abandoned** | `/app` (post-integration) | root Markdown files, backend `/functions` | D1.0 approved | Repo scaffolding needed | Skeleton renders 5 placeholder questions, passes `design.md` Generated-Frontend Review Checklists, integrated via `RULES.md` §24 Integration Gate | Manual browser check + full Integration Gate checklist | Screenshot + deployed URL + Integration Gate record in `MEMORY.MD` | **Partially Complete, deprioritized 2026-09-12 16:05:00 Asia/Calcutta per CEO directive** (`Architecture.md` §28.2 item 4): the built-and-verified "UDID Guide Shell" (`MEMORY.MD` Entry 013) remains valid; no further Lovable credits/OAuth action until the Telegram-first vertical slice (D1.3a) is specified — done. A temporary private Lovable→GitHub export repo is pending the Product Owner's own OAuth action (`MEMORY.MD` Entry 018) for later inspection/migration, not urgent. |
| D1.3 | Gate 1 | Backend function: session-state machine for 5-question flow (no LLM yet, stub answers) | **Reframed — see D1.3a** | `/functions/guide.*` | frontend files owned by D1.2 once merged | D1.2 | Skeleton exists | State machine advances Q1→Q5 correctly | Unit test: 5 sequential calls | Test run log in `MEMORY.MD` | **Reframed 2026-09-12 16:05:00 Asia/Calcutta:** the "backend function" is now concretely the shared n8n workflow specified in D1.3a below, not a Claude-Code-authored function — this uses the CEO-approved tools (n8n + Gemini) directly, which may also relieve part of the multi-AI blocker (`Architecture.md` §28.4). |
| D1.3a | Gate 1 | **Telegram-first vertical slice** (CEO directive, 2026-09-12 16:05:00 Asia/Calcutta): build the shared n8n workflow per `Architecture.md` §28.3 — Telegram Trigger → 5-question state → Gemini grounded answer or fail-safe → Google Sheets log → Telegram response; then point the website's backend call at the same workflow | CTO, using n8n/Gemini/Telegram/Sheets (CEO-approved tools, not Claude-authored app logic) | n8n workflow export, `docs/SOURCES.md` | — | D1.0 approved; Telegram bot + n8n account already available (Product Owner: "telegram is logged on to your own browser") | Telegram bot token available via n8n credentials; ≥1 Reviewed source for real-guidance testing | Five-question flow runs live in Telegram end-to-end; returns real guidance for any Reviewed-source case and the fixed fail-safe otherwise; 2-minute test reminder fires via Telegram; website calls the identical workflow | The 3 mandatory Hathcon test cases (`docs/TESTING.md`) run against Telegram directly | n8n workflow export + Telegram transcript + Sheets log rows in `docs/TESTING.md`/`MEMORY.MD` | **Not started.** Specification complete as of this entry (`Architecture.md` §28.3); implementation blocked on D1.1 (no Reviewed source yet for real, non-fail-safe guidance) and on this session locating/confirming n8n workflow-authoring access (not yet attempted this session). |
| D1.4 | Gate 1 | Wire LLM (Gemini, per CEO-approved stack) call + grounding for the ≥1 reviewed source from D1.1 | TBD (Codex/Antigravity if resolved, else per CEO direction) | `/functions/guide.*`, prompt file | — | D1.1, D1.3 | ≥1 reviewed source + working state machine | Numbered, source-grounded answer returned for the pilot state, scoped to what SRC-001/SRC-002 actually support | Hathcon Test 1 (Maharashtra/locomotor/unregistered) | Recorded transcript in `docs/TESTING.md` | Not started — blocked behind D1.3 |
| D1.5 | Gate 1 | Deploy vertical slice to free-tier host | TBD | deployment config only | app source | D1.4 | Working local slice | Public URL loads and completes one full 5-question run | Live browser test from a second device | URL + screen recording | Not started — blocked behind D1.4 |
| D1.6 | Gate 0 | Record Day 1 evidence, update `MEMORY.MD`, report Gate 1 status to CEO | CTO | `MEMORY.MD` | — | D1.1–D1.5 | Day 1 tasks attempted | Worklog entries present for every task above | — | `MEMORY.MD` | **In Progress** — this update itself (2026-09-12 13:56:30 Asia/Calcutta) is part of D1.6; will continue as D1.2–D1.5 unblock |
| GH-1 | Cross-cutting | Attach/push project to `https://github.com/mukkum13/be10x-disability-certificate-guide` | CTO (blocked — see status) | — | any other GitHub repo on the account | CEO authorisation (2026-09-12 14:11:18 / 14:22:56) | Repo URL confirmed by CEO | Repo verified reachable, current branch pushed, remote hash confirmed matching local | `git ls-remote`/API check + push output | `MEMORY.MD` Entries 010–011 | **Verified locally — GitHub synchronisation blocked**, as of 2026-09-12 14:23:20 Asia/Calcutta. This cloud session's GitHub proxy returns HTTP 403 "GitHub access to this repository is not enabled for this session" with no `add_repo` tool available here to attach it. Local `device_bash` (would allow pushing via the Product Owner's own machine credentials) failed 4 consecutive times ("Workspace unavailable"). **No phase may be marked `Completed` until this resolves.** Next deadline: retry when either channel recovers; no fixed date set by CEO. |
| CONSULT-1 | Cross-cutting | Secure genuine consultation evidence (real person or NGO) for the "real-world usefulness" judging criterion | Product Owner (CTO to assist with outreach drafting if asked) | `docs/SUBMISSION.md` "Who Was Consulted" | — | none | CEO decision to pursue consultation (2026-09-12 13:46:24) | Real, honestly-documented conversation evidence recorded, or the gap is explicitly accepted and disclosed | N/A (external activity) | `docs/SUBMISSION.md` | **Not started.** Started at: — . Last updated: 2026-09-12 13:56:30 Asia/Calcutta (task created). Completed/blocked at: — . Current status: Open, tracked as an active submission risk per CEO instruction. **Next deadline: 2026-09-19 18:00:00 Asia/Calcutta (hard CEO deadline).** Evidence location: `docs/SUBMISSION.md` once obtained. |

**Day 1 exit / Gate 1 criteria:** deployed website loads; five questions work; dummy input accepted; source-grounded numbered guidance appears for the pilot state; missing-knowledge case fails safely (returns fail-safe message, not a guess).

**Note added 2026-09-12 13:56:30 Asia/Calcutta:** All "Agent A"/"Agent B"/"Agent C" owner labels in the Day 2 and Day 3 tables below were written before the CEO's Multi-AI Development Rule and are provisional placeholders only — no task in Day 2/Day 3 may be assigned to a Claude-family agent (`general-purpose`/`claude`) for implementation without the same Blocked treatment as D1.2/D1.3, until the CEO resolves the Codex/Antigravity availability gap. `Explore`/`Plan` remain usable for the review-only rows (D3.1–D3.3, D3.5). This note will be replaced with corrected owner columns once the CEO responds.

## Day 2 — 13 September 2026

| Task ID | Phase | Description | Owner | Owned files | Must not touch | Dependency | Entry criteria | Exit criteria | Required tests | Evidence | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| D2.1 | Gate 2 | Escalation flow ("stuck") wired to verified route | Agent A | `/functions/guide.*` (escalation module) | logging module (D2.3) | Gate 1 verified | Gate 1 passed | Hathcon Test 2 passes | "I am stuck at the hospital" → correct route | `docs/TESTING.md` | Not started |
| D2.2 | Gate 2 | Named-language output (at least English + one more named language) | Agent A | prompt/response formatter | — | D2.1 | Gate 1 passed | Response matches user-named language, short sentences | Manual bilingual test | Transcript | Not started |
| D2.3 | Gate 2 | Anonymised logging (6 fields only) | Agent B | `/functions/log.*` | guide.* core logic | Gate 1 passed | none | Log store shows only whitelisted fields, nothing else | Inspect log store after a test run | Screenshot/export of log row | Not started |
| D2.4 | Gate 2 | Reminder module via Telegram (CEO-approved channel, decided 2026-09-12 13:46:24 Asia/Calcutta): draft-only mode + real integration with delivery verification | Agent B | `/functions/reminder.*` | — | D2.3 | Telegram bot set up | Draft text always shown; a real 2-minute test reminder arrives via Telegram | Hathcon Test 3 | Delivery screenshot/log timestamp | Not started — channel decided; implementation still behind the D1.2/D1.3 multi-AI blocker |
| D2.5 | Gate 2 | Human-in-the-loop + disclosure copy finalized in UI | Agent A | frontend copy | — | D2.1–D2.2 | none | Disclosure and closing line appear on every completed guidance response | Manual review | Screenshot | Not started |
| D2.6 | Gate 0 | Update `MEMORY.MD`, `docs/TESTING.md` with Day 2 evidence; report Gate 2 status to CEO | CTO | `MEMORY.MD`, `docs/TESTING.md` | — | D2.1–D2.5 | Day 2 tasks attempted | Entries present | — | `MEMORY.MD` | Not started |

**Day 2 exit / Gate 2 criteria:** escalation flow, named-language output, anonymised log, reminder (draft or verified), and human-in-the-loop messaging all demonstrated with evidence.

## Day 3 — 14 September 2026 (Feature Freeze Day)

| Task ID | Phase | Description | Owner | Owned files | Must not touch | Dependency | Entry criteria | Exit criteria | Required tests | Evidence | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| D3.1 | Gate 3 | Accessibility pass against `design.md` acceptance criteria | Agent C (Explore/Plan, read-only review) | none (review only) | all app files | Gate 2 passed | none | No blocking accessibility failures | Manual keyboard/contrast/screen-reader spot check | `docs/TESTING.md` accessibility section | Not started |
| D3.2 | Gate 3 | Security & privacy pass (secrets, input validation, rate limits, no PII retained) | Agent C (review) | none | all app files | Gate 2 passed | none | No secret in source; no prohibited data retained | Manual code + log inspection | `docs/TESTING.md` security section | Not started |
| D3.3 | Gate 3 | Prompt-injection & unsupported-location fail-safe tests | Agent C (review) | none | — | Gate 2 passed | none | System resists prompt injection; unsupported input fails safely | Adversarial test prompts | `docs/TESTING.md` | Not started |
| D3.4 | Gate 3 | Automated test suite (unit + integration) authored and passing | Agent A/B jointly (non-overlapping files) | `/tests` | — | Gate 2 passed | none | All tests green | CI or manual run log | `docs/TESTING.md` | Not started |
| D3.5 | Gate 3 | Clean-environment setup verification (`README.md` reproducibility) | Agent C (review) | none | — | D3.4 | none | A fresh clone + README steps reach a running app | Manual clean-room run | `docs/OPERATIONS.md` | Not started |
| D3.6 | Gate 3 | Final deployment, health check, feature freeze declared | Agent B | deployment config | — | D3.1–D3.5 pass | none | Production URL stable; `/health` returns OK | Health check output | `MEMORY.MD` deployment entry | Not started |
| D3.7 | Gate 0 | Consolidate all evidence, freeze features, report Gate 3 status to CEO | CTO | `MEMORY.MD`, `RULES.md` (status columns) | — | D3.1–D3.6 | Day 3 tasks attempted | Feature freeze confirmed in `MEMORY.MD` | — | `MEMORY.MD` | Not started |

**Day 3 exit / Gate 3 criteria:** automated tests, accessibility, privacy, security controls, failure recovery, clean setup, production deployment, and known-limitations documentation all verified.

## 15–19 September 2026 — Validation & Rehearsal
- Real-user or NGO consultation attempt (addresses Pending CEO Decision #1 in `RULES.md`) — if one occurs, capture evidence honestly in `docs/SUBMISSION.md`; if not, disclose the gap honestly rather than fabricate it.
- Fix issues found during validation.
- Rehearse the 3-minute pitch against the exact timing structure (0:20/0:40/2:20/2:45/3:00).
- Prepare backup demonstration video.
- Draft the one-page submission report.

## 20 September 2026 — Submission Day Checklist
- [ ] Working URL confirmed live
- [ ] Backup video recorded and stored
- [ ] One-page report finalized (`docs/SUBMISSION.md`)
- [ ] Three required Hathcon tests re-run same-day with fresh evidence
- [ ] Known failures honestly disclosed
- [ ] Non-technical operator instructions confirmed workable
- [ ] `MEMORY.MD` reflects exact final state
- [ ] CEO final acceptance recorded

## Risks & Rollback
| Risk | Rollback / Recovery |
|---|---|
| Official source documents cannot be found/reviewed in time | Fall back to the single most-documented state (e.g., Maharashtra, per hackathon example); disclose limited coverage honestly; never fabricate coverage |
| Custom website build slips past Day 3 | Fall back to Hathcon "Route B" Claude Project submission (RULES.md row 26) as a documented, honest fallback — not a silent scope cut |
| Reminder channel cannot be verified to deliver | Ship draft-only reminder text; disclose as a known limitation (does not violate FR-7, which explicitly allows draft-only mode) |
| Real user/NGO consultation not obtained | Disclose honestly in `docs/SUBMISSION.md`; do not claim consultation that did not happen |
| Two agents collide on a file | File-ownership table above is authoritative; CTO reassigns immediately on detection and logs it in `MEMORY.MD` |

## CEO Approval Gates
- **Before Gate 1:** CEO must approve this documentation baseline and the Open Decisions in `Architecture.md` §26 / `RULES.md` §1 row 15 (stack choice) and the Pending CEO Decision #1 (real-user consultation vs. accepted scoring risk).
- **Before Gate 2:** CEO confirms reminder-channel choice (or accepts draft-only mode).
- **Before Gate 4:** CEO accepts consolidated evidence for submission.
