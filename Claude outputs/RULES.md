# RULES.md — Non-Negotiable Execution & Compliance Source of Truth
**Status:** Draft — Gate 0. Version 0.1. Last verified: 2026-09-12.

## 1. Hathcon Compliance Matrix
Source: https://build-for-good-two.vercel.app/#start (sections: "How to use these templates", "Setup — 30 minutes", "Five prompting rules", "Rules, judging, submission", "Project 14: Disability certificate guide"). Content captured via direct page reading on 2026-09-12; exact pixel-level text of a few small labels on the Project 14 detail card was not fully legible and is marked ⚠ below.

| # | Source section | Exact/paraphrased requirement | M/R/O | Planned implementation | Verification evidence | Status | Unresolved conflict |
|---|---|---|---|---|---|---|---|
| 1 | Rules/Judging | One person, one project, one track — no teams | Mandatory | Mukesh Saxena sole entrant; single track "Those Who Served & Access", Project 14 | Governance section of this doc + `docs/SUBMISSION.md` | Verified (by declaration) | None |
| 2 | Rules/Judging | Pick one, not ten — small and finished beats large and unfinished | Mandatory | Scope locked to `PRD.md` §17 Non-Goals; no speculative features | `Phases.md` gate reviews | Planned | None |
| 3 | Rules/Judging | It must run live — real input, real output, on review day | Mandatory | Deployed vertical slice, Gate 1 | Live URL test, `docs/TESTING.md` | Not started | None |
| 4 | Rules/Judging | Slides alone score zero on the biggest criterion; record a backup video anyway | Mandatory | Backup demo video planned Day 3 | `docs/SUBMISSION.md` video checklist | Not started | None |
| 5 | Rules/Judging | Dummy data only — no real names, phone numbers, addresses, health details | Mandatory | All demo/test data fictional; enforced in `docs/TESTING.md` test-data policy | Manual review of demo script | Planned | None |
| 6 | Rules/Judging | Human in the loop — nothing built may hand out a final health, financial, or legal-rights decision; a human approves; penalty −10 if violated | Mandatory | Product never states eligibility/approval; visible human-approval copy (`design.md`) | Copy review + `docs/TESTING.md` grounding tests | Planned | None |
| 7 | Rules/Judging | Free tools are enough to win; ₹0 Emergent trial allowed for Track 3; no paid subscription required | Mandatory (unless CEO approves otherwise) | Stack picks free-tier services only (`Architecture.md` §1, §25) | `docs/OPERATIONS.md` external-service list | Planned | None |
| 8 | Rules/Judging | Submit by next Sunday: working demo link, 3-minute video, one-pager (problem, who helped test, build summary, three tests, limitations, next phase) | Mandatory | Final submission = 20 Sep 2026 per CEO deadline (earlier than "next Sunday" from hackathon's own clock — CEO deadline governs) | `docs/SUBMISSION.md` | Not started | None — CEO date is equal-or-stricter, no conflict |
| 9 | Judging weights | 40% real-world usefulness (evidence = conversations with affected individuals/orgs) | Mandatory (scored) | Currently **no interview evidence exists** | `docs/SUBMISSION.md` "who was consulted" | ⚠ Gap — see Missing Evidence below | **Unresolved: no real user/NGO consultation has occurred; do not fabricate this evidence** |
| 10 | Judging weights | 25% working demo, live end-to-end | Mandatory (scored) | Deployed slice, Gate 1–2 | `docs/TESTING.md` | Not started | None |
| 11 | Judging weights | 20% three-minute pitch structure (0:20 problem, 0:40 beneficiary, 2:20 live demo, 2:45 honest limitations, 3:00 next step) | Mandatory (scored) | Script drafted Day 3 | `docs/SUBMISSION.md` pitch timing | Not started | None |
| 12 | Judging weights | 15% sustainability — free tools, non-technical operability, handover docs | Mandatory (scored) | `README.md` operator section, `docs/OPERATIONS.md` handover | Peer walkthrough test | Not started | None |
| 13 | Judging bonuses | +5 for NGO/affected-person involvement; bonus for 30s AI brand video | Optional | Not planned unless a real contact becomes available before submission | `docs/SUBMISSION.md` | Not planned | None |
| 14 | Judging penalties | −10 real personal data in demo; −10 medical/legal/financial decision without human approval | Mandatory constraint | Enforced via `RULES.md` dummy-data rule + human-in-loop copy | `docs/TESTING.md` | Planned | None |
| 15 | Setup | Telegram bot, Gemini API key, n8n Cloud trial, Google Sheet — "every project uses the first four" | Mandatory (CEO decision, 2026-09-12 13:46:24 Asia/Calcutta) | **DECIDED:** responsive website (primary UI) + Gemini + n8n + Telegram + Google Sheets. Custom Claude-API production architecture explicitly rejected by CEO. | `Architecture.md` §1, §26 (to be updated to reflect this decision) | Decided — Not yet implemented | Resolved: CEO chose the hackathon default recipe over the CTO's Claude-API preference; `Architecture.md` to be revised accordingly before D1.2 |
| 16 | Setup | Do not test the LLM in a loop — daily free-tier limits | Mandatory | Test plan in `docs/TESTING.md` caps manual retries | Dev log entries in `MEMORY.MD` | Planned | None |
| 17 | Prompting rules | 5 rules: give it a role; specify exact output shape; give one example; state prohibitions; name the language explicitly (not "local language") | Mandatory (for prompt design) | System prompt built to these 5 rules | `Architecture.md` §12 API contract + prompt file (Gate 1) | Planned | None |
| 18 | Project 14 | Ask ONE question at a time, fixed 5-question order | Mandatory | `PRD.md` §6 FR-1, §9 | `docs/TESTING.md` | Planned | None |
| 19 | Project 14 | Sourced responses exclusively from knowledge documents | Mandatory | `PRD.md` FR-2, `Architecture.md` §7 | `docs/SOURCES.md` traceability | Planned | None |
| 20 | Project 14 | Escalation pathway: district social welfare office → State Commissioner for Persons with Disabilities | Mandatory (only when source-supported per district-level instructions) | `PRD.md` FR-5/§12 | `docs/TESTING.md` Test 2 | Planned | None |
| 21 | Project 14 | Closing line: "You are doing the right thing. Take it one step at a time." | Mandatory (verbatim) | `PRD.md` FR-6 | `docs/TESTING.md` | Planned | None |
| 22 | Project 14 | Final message ensures human oversight of eligibility determinations | Mandatory | `PRD.md` §15 | copy review | Planned | None |
| 23 | Project 14 | Three mandatory test cases (Maharashtra/locomotor/unregistered; "stuck at hospital"; reminder arrives) | Mandatory | `docs/TESTING.md` §Required Hathcon Tests | Test run logs | Not started | None |
| 24 | Project 14 | No medical judgments — explain process only, never diagnose | Mandatory | `PRD.md` §non-goals, `RULES.md` §4 | copy + grounding review | Planned | None |
| 25 | Project 14 | One step per message; numbered sequences | Mandatory | `PRD.md` §10 Response Format | UI review | Planned | None |
| 26 | Project 14 | "Route B" 20-minute Claude-Project fallback is an accepted complete entry if recorded and submitted with the Project link | Optional (fallback path only) | Not the primary plan; CEO's production-grade custom website is the primary target; Route B is a documented fallback if Day 3 slips | `Phases.md` risk/rollback | Noted, not built | None — explicitly a fallback, does not weaken primary scope |
| 27 | CEO addendum | "Production-grade" quality (not a literal hackathon term) — reliability, security, accessibility, maintainability, without scope growth | Mandatory (CEO requirement, additive) | Applied throughout all docs | `docs/TESTING.md`, `docs/OPERATIONS.md` | Planned | None |

**Missing Evidence (flagged, not fabricated):** Judging weight #9 (40% real-world usefulness via named-person/NGO conversation) currently has zero supporting evidence. This is the single largest scoring risk. Recommendation to CEO: either (a) conduct at least one real conversation with an affected person or disability-support NGO before 19 Sep, or (b) accept scoring risk and rely on the strength of the working demo (25%) + pitch (20%) + sustainability (15%) instead. This decision is logged as **Pending CEO Decision #1**.

## 2. Instruction Priority & Conflict-Handling Rules
1. Legal requirements > safety requirements > explicit CEO/Product Owner instructions > Hathcon mandatory rules > Hathcon recommended practices > CTO/agent judgment calls.
2. If a Hathcon requirement conflicts with a CEO instruction, a legal requirement, a safety requirement, or another authoritative source: **stop the affected work only**, log the conflict in this file and in `MEMORY.MD`, and report to the CEO. Do not silently weaken, ignore, or reinterpret either side.
3. No requirement in root project instructions may be silently dropped for convenience; if something cannot be done, it must be marked "Blocked" with a reason, not omitted.

## 3. Product Boundaries
See `PRD.md` §17 (Non-Goals) and root instructions §5 (Explicit non-goals) — verbatim list carried there; not duplicated here to avoid drift. Cross-link only.

## 4. AI Grounding Rules
- Answers about process facts (hospitals, forms, fees, offices, timelines, eligibility) MUST come only from documents marked "Reviewed" in `docs/SOURCES.md`.
- The LLM must never be asked to guess or fill gaps in official-process facts.
- If no reviewed source covers the user's state/district/disability type, respond with the fixed fail-safe message (see `Architecture.md` §7, §18).

## 5. Hallucination Prevention Rules
- Never invent: hospital/medical-board names, office addresses/contacts, forms/documents, fees, appointment availability, processing times, eligibility or disability-percentage outcomes, or state/district-specific procedure not present in a reviewed source.
- Every guidance response must be traceable to specific source IDs (`Architecture.md` §9).
- Automated or manual spot-checks (per `docs/TESTING.md`) must confirm zero fabricated facts before Gate 2 sign-off.

## 6. Medical, Legal & Rights-Related Restrictions
No diagnosis, no medical advice, no disability-percentage or eligibility determination, no legal advice, no claim of official approval. The product explains process steps only. Visible disclosure required (`PRD.md` FR-9).

## 7. Dummy-Data Requirements
All demonstration inputs must be fictional. No real names, phone numbers, addresses, or health details in any demo, screenshot, video, or test fixture.

## 8. Personal-Data Prohibition
The system must not store: names, phone numbers, postal addresses, Aadhaar or other government ID numbers, uploaded documents, or free-text health narratives. Only the six anonymised log fields (`PRD.md` §14) may persist.

## 9. Security Requirements
- Secrets server-side only, via environment variables, never committed to any file or the connected local folder in plaintext.
- Validate and constrain all inputs server-side.
- Apply request rate limits.
- Do not expose system prompts, internal grounding documents' raw text, or backend implementation details to the end user or via error messages.

## 10. Accessibility Requirements
WCAG 2.1 AA practical target: keyboard operability, correct labels/roles, visible focus indicators, sufficient colour contrast, mobile-first responsive layout, plain/simple-language copy, and screen-reader-friendly numbered-step structure. Full spec in `design.md`.

## 11. Development Rules
- No application code before Gate 0 documentation baseline is complete and CEO-approved.
- No speculative feature may displace a mandatory feature (root instructions §4).
- Smallest stable architecture that meets requirements in 3 days (`Architecture.md` §1).

## 12. CLI-Agent Rules
- Every CLI agent must read `RULES.md` and `MEMORY.MD` before starting an assigned task.
- Agents report: work completed, files created/changed, tests executed, actual results, assumptions, risks, blockers, recommended next action (root instructions §1).
- Agent claims and generated files are not proof of completion; the CTO independently inspects source, runs tests, and checks runtime/deployed evidence before accepting work.
- Only the agent types actually available in this environment may be assigned (see CTO report / `Phases.md` — currently: `general-purpose` and `claude` as implementer agents; `Explore` and `Plan` as read-only research/planning agents; no agent count is invented).

## 13. File Ownership Rules
- One owner per file per task; no two agents modify the same file concurrently (see `Phases.md` task table for exact file ownership per phase).
- Canonical Markdown filenames are fixed exactly as listed in root instructions §6 — no duplicate-cased variants (e.g., never `Memory.md` or `memory.md` alongside `MEMORY.MD`).

## 14. Testing Requirements
See `docs/TESTING.md` for full strategy; at minimum, the 3 mandatory Hathcon tests (§1 row 23) must pass with recorded evidence before submission.

## 15. Evidence Requirements
No gate, task, or document status may be marked "Verified" or "Complete" without evidence recorded in `MEMORY.MD` and, where applicable, `docs/TESTING.md`. Distinguish Verified / Claimed / Planned / Assumed / Blocked / Failed explicitly.

## 16. Git & Change-Control Rules
- **Verified fact (as of 2026-09-12 13:46:24 Asia/Calcutta, CEO review time):** the project had no Git repository anywhere. A prior CTO report and `MEMORY.MD` Entry 001 incorrectly used the word "committed" to describe a plain file transfer (via `SendUserFile`/`device_commit_files`) — this was corrected in `MEMORY.MD` Entry 002.
- **A repository now exists in the cloud container** (`/home/claude/hackathon`), initialised 2026-09-12 13:47:19 Asia/Calcutta, with one verified commit `120c9fc3135a639e410bae8255ba96d3cf0a217a` (2026-09-12 13:47:35 Asia/Calcutta) — see `MEMORY.MD` Entry 004. **The user's local machine (`K:\Be10x_Disability_certificate_guide`) is still NOT git-tracked** because the local shell (`device_bash`) is currently unavailable; that folder remains a plain-file mirror until local shell access is restored or a shared remote is set up.
- **The word "committed" may be used ONLY when all five of these are true, in this order:**
  1. A Git repository exists (verified via `git rev-parse --is-inside-work-tree` or equivalent).
  2. The `git commit` command completed successfully (exit code / output checked).
  3. A real commit hash is recorded (from `git log` or the commit command's own output).
  4. `git status` has been checked (to confirm a clean tree / expected state).
  5. The commit hash is entered in `MEMORY.MD`.
  Any file transfer that does not meet all five conditions must be described as "written," "saved," or "mirrored" — never "committed."
- A `.gitignore` must exist and be committed **before** any implementation file is added (done 2026-09-12 13:47:35 Asia/Calcutta for the documentation baseline; must also cover the first application-code commit).
- Never commit secrets, `.env` values, credentials, tokens, or local logs containing user data — enforced via `.gitignore` (see repository root).
- Prefer small, reviewable commits per micro-phase, each tied to a `Phases.md` task ID.

## 22. Mandatory Timestamp Rule (CEO decision, 2026-09-12 13:46:24 Asia/Calcutta)
Every work step, agent task, phase transition, decision, test, deployment, failure, retry, correction, commit, and CTO report must record actual India time in the exact format `YYYY-MM-DD HH:mm:ss Asia/Calcutta`. Every task record must include: Started at, Last updated at, Completed or blocked at, Actual duration, Current status, Next deadline (with date and time), and Evidence location. Vague timing ("today," "later," "session start," "completed now") is prohibited without an exact timestamp alongside it. This applies to `MEMORY.MD`, `Phases.md`, `docs/TESTING.md`, `docs/OPERATIONS.md`, `docs/SUBMISSION.md`, every CLI-agent assignment and completion report, and every CTO report to the CEO.

## 23. Mandatory Multi-AI Development Rule (CEO decision, 2026-09-12 13:46:24 Asia/Calcutta)
Standing operating instruction (to be issued before every coding task, CLI-agent delegation, implementation review, and test assignment): *"Use /multi-ai-framework and use as less Claude Code as possible. Use Codex and Antigravity to their fullest capabilities under the already selected models."*
- Invoke `/multi-ai-framework` for each implementation cycle if available.
- Use Codex and Antigravity to their fullest available extent for architecture review, implementation, test generation, debugging, accessibility review, security/privacy review, deployment review, and documentation-consistency review.
- Claude remains CTO/integration owner: scope control, task decomposition, agent orchestration, integration, verification, documentation consistency, risk management, CEO reporting. Claude writes as little implementation code directly as possible.
- **Environment check performed 2026-09-12 13:46:24–13:56:00 Asia/Calcutta (`MEMORY.MD` Entry 006): none of `/multi-ai-framework`, Codex, or Antigravity are available in this session** (skill lookup, tool search, skill search, and plugin search all returned no match; no other agent session is reachable). Per this rule's own instruction, this is recorded honestly, the affected tasks (D1.2, D1.3) are marked **Blocked**, and the limitation is reported to the CEO before any substitution is attempted.
- No developer/agent may begin a task without first reading `RULES.md`, `MEMORY.MD`, their assigned task requirements, and the relevant source/test requirements.

## 17. Deployment Rules
Deploy only to free-tier hosting unless CEO approves otherwise. Every deployment event must be logged in `MEMORY.MD` with the resulting URL.

## 18. Documentation-Update Rules
When one canonical document changes in a way that affects another (e.g., a scope change in `PRD.md` affecting `Architecture.md` or `design.md`), update all affected documents in the same verified step (root instructions §8). Do not duplicate large content across files — cross-link instead.

## 19. Approval Gates
Gate 0 (documentation baseline) → **CEO approval required** → Gate 1 (vertical slice) → Gate 2 (integrations) → Gate 3 (production verification) → Gate 4 (submission readiness). See `Phases.md` for exact criteria.

## 20. Prohibited Actions
- Do not fabricate consultation, testing, or evidence in any document (root instructions, `docs/SUBMISSION.md` section).
- Do not build any item in the Explicit Non-Goals list without subsequent CEO approval.
- Do not skip a mandatory Markdown file or invent an additional one where a genuine requirement fits an existing canonical file.
- Do not mark a gate complete without recorded evidence.

## 24. AI Frontend Builder Rules — Lovable (primary) / Emergent (fallback) — CEO Addendum, 2026-09-12 13:53:53 Asia/Calcutta
- **Primary tool:** Lovable is the primary AI frontend builder, to reduce website-development time.
- **No simultaneous dual-generation:** Lovable and Emergent must never be used at the same time to generate the same product codebase.
- **Fallback trigger:** Emergent may be used only if Lovable cannot produce an exportable, accessible, responsive frontend within 30 minutes of active work. Before switching, the exact failure, timestamp, and reason must be recorded in `MEMORY.MD`.
- **Environment check (2026-09-12 13:53:53–13:54:30 Asia/Calcutta):** neither Lovable nor Emergent exists as an integrated tool, MCP connector, or plugin in this Claude Code session (`ToolSearch` and `SearchPlugins` both returned no match). Both are external web applications (lovable.dev, emergent.sh) reachable only via a connected browser and the Product Owner's own account. This session cannot originate a Lovable/Emergent build on its own initiative — see `Phases.md` D1.2 for the resulting task status and the options put to the CEO.
- **Lovable scope — may create ONLY:** responsive website layout; five-question UI shell; progress indicator; guidance-result layout; reminder input interface; source-attribution interface; escalation interface; disclaimer/safety content; loading/empty/warning/error states; keyboard-accessible components; mobile-responsive styling.
- **Lovable must NOT be used to:** invent disability-certificate procedures; generate unsupported medical/legal guidance; store real personal or health data; receive API keys, Telegram tokens, or Google credentials; replace Gemini, n8n, Telegram, or Google Sheets; add user accounts, payments, dashboards, social features, or unrelated functionality.
- **Integration Gate — before accepting any generated frontend code, in this order:**
  1. Export/synchronise it into the project Git repository.
  2. Review every generated dependency.
  3. Remove unused code and unnecessary packages.
  4. Confirm mobile responsiveness.
  5. Confirm keyboard navigation and visible focus.
  6. Confirm form labels and accessible error states.
  7. Confirm no secret or real data appears in the code.
  8. Confirm UI copy matches `PRD.md`, `RULES.md`, and `design.md`.
  9. Record test evidence and exact `Asia/Calcutta` timestamps.
  10. Commit only after verification (per the five-condition "committed" rule, §16 above).
- **Parallelism allowed:** the website frontend may be built in parallel with official-source collection (D1.1). **Grounded, location-specific guidance must remain disabled** until reviewed official sources are registered in `docs/SOURCES.md`, regardless of frontend progress.

## 25. GitHub Repository & Push Verification Rule (CEO Master Directive, 2026-09-12 14:11:18 Asia/Calcutta; repo decision 2026-09-12 14:12:01)
- **Authorised repository, and only this one:** a new private repo `be10x-disability-certificate-guide` under account `mukkum13`, expected remote `https://github.com/mukkum13/be10x-disability-certificate-guide.git`. Never push to, clone from, alter, or mix history with any other repo on that account (`PSIT_PROJECT_DRISHTI`, `KUNDALI_AI_SYSTEM`, `Gaurav_Classes`, `JARVIS_AI_SYSTEM`, `jyotish-ai-platform` are explicitly out of scope).
- **Creation safeguard:** the Product Owner creates the repo, or explicitly authorises a connected authenticated tool. **Attempted 2026-09-12 14:12:42 Asia/Calcutta with Product-Owner authorisation obtained first; blocked by this environment's own GitHub proxy** ("sessions are bound to their configured repositories") — an infrastructure limit, not a permissions problem. See `MEMORY.MD` Entry 010. **Current status: Verified locally — GitHub repository pending.**
- **"Committed" and "pushed" are separate claims.** A phase is only "Completed" once: the repo exists, a commit succeeds with a real hash, `git status` is clean, the hash is in `MEMORY.MD`, the commit is pushed, and the exact pushed hash is verified present on the remote branch. Until the repository exists, use the status "Verified locally — GitHub repository pending" and never claim a push occurred.
- **Never:** force-push, delete branches, rewrite history, expose secrets/tokens in code/commits/chat/Markdown/screenshots, or invent a repository URL.
- **Phase-sync procedure (after every completed phase):** update affected canonical docs → update `MEMORY.MD` with exact timestamps → run phase-required tests and record actual results → review `git diff`/`git status` → one phase-scoped commit → push → verify the remote branch contains the exact pushed hash → record repo URL, branch, commit hash/message/time, push time, test evidence, and verification result in `MEMORY.MD`, `Phases.md`, and `docs/TESTING.md`.

## 21. Definition of Acceptable Completion
A task, gate, or the project as a whole is "complete" only when: the relevant acceptance criteria in `PRD.md`/`Phases.md` are met, evidence is recorded in `MEMORY.MD` (and `docs/TESTING.md` where applicable), and — for gates — the CEO has explicitly approved moving to the next gate.

## 26. Hybrid Channel Compliance Rule (CEO Decision, 2026-09-12 16:05:00 Asia/Calcutta)
- **Hard-gate discipline:** the live Hathcon rules and every instruction in `MustFollowRules` (in the canonical repo/K: project) are treated as hard gates. If a requested or planned action conflicts with them, work stops on that item, it is marked Blocked, the conflict is explained in `MEMORY.MD`, and CEO/Product-Owner direction is awaited — never resolved unilaterally. (This rule itself exists because that discipline caught a real conflict — see `MEMORY.MD` Entry 019 — between the official Project 14 template's Telegram-first design and this project's earlier website-primary stack.)
- **Resolution — both channels mandatory, one shared workflow:** Telegram is a required primary operational entrypoint (matching the official template exactly) and the website remains mandatory as the Product Owner's required public interface. Full detail: `Architecture.md` §28.
- **No duplicate or contradictory logic.** The five questions, grounding rules, fail-safe text, escalation route, disclosure banner, human-in-the-loop language, and closing line are defined once (in the n8n workflow) and consumed identically by both channels. A website response and a Telegram response to the same input must never differ in substance.
- **Telegram must demonstrate the real guide flow**, not reminders alone — the official template's own three-minute-demo script (`MustFollowRules/page4.jpeg`) is: five questions live, a 2-minute reminder firing on stage, and who it was tested with.
- **No paid upgrade required or planned.** Per the official rules ("Free tiers are enough to win... No paid subscription is required"), the Lovable Pro-upgrade option raised in `MEMORY.MD` Entry 017 is not being pursued for this reason alone.
- **Lovable export is no longer the immediate critical path.** Per CEO instruction, no further Lovable credits are spent and no further OAuth action is taken on it until the shared Telegram-first vertical-slice specification is documented (done — `Architecture.md` §28.3) — after which D1.1 (source collection) and the Telegram vertical slice take priority.
