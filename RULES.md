# RULES.md — Non-Negotiable Execution & Compliance Source of Truth
**Status:** Draft — Gate 0. Version 0.1. Last verified: 2026-09-12.

## 1. Hathcon Compliance Matrix
Source: https://build-for-good-two.vercel.app/#start (sections: "How to use these templates", "Setup — 30 minutes", "Five prompting rules", "Rules, judging, submission", "Project 14: Disability certificate guide"). Content captured via direct page reading on 2026-09-12; exact pixel-level text of a few small labels on the Project 14 detail card was not fully legible and is marked ⚠ below.

| # | Source section | Exact/paraphrased requirement | M/R/O | Planned implementation | Verification evidence | Status | Unresolved conflict |
|---|---|---|---|---|---|---|---|
| 1 | Rules/Judging | One person, one project, one track — no teams | Mandatory | Mukesh Saxena sole entrant. **Corrected 2026-09-13 (see §1a):** "Those Who Served & Access" is a project-idea **domain** (a theme grouping 7 of the 28 ideas, including Project 14), not one of the three actual **tracks**. The three real tracks are **AI Automation**, **AI Agent**, and **Product Build** (`Project_Disability_certificate_guide/Project_details.docx`, "Pick One of Three Tracks"). This project must declare exactly one of those three tracks — not yet declared; see §1a for the unresolved conflict this creates with the current hybrid Telegram+website design. | Governance section of this doc + `docs/SUBMISSION.md` | **Track not yet declared — see §1a, flagged not resolved** | **Unresolved — see §1a** |
| 2 | Rules/Judging | Pick one, not ten — small and finished beats large and unfinished | Mandatory | Scope locked to `PRD.md` §17 Non-Goals; no speculative features | `Phases.md` gate reviews | Planned | None |
| 3 | Rules/Judging | It must run live — real input, real output, on review day | Mandatory | Deployed vertical slice, Gate 1 | Live URL test, `docs/TESTING.md` | Not started | None |
| 4 | Rules/Judging | Slides alone score zero on the biggest criterion; record a backup video anyway | Mandatory | Backup demo video planned Day 3 | `docs/SUBMISSION.md` video checklist | Not started | None |
| 5 | Rules/Judging | Dummy data only — no real names, phone numbers, addresses, health details | Mandatory | All demo/test data fictional; enforced in `docs/TESTING.md` test-data policy | Manual review of demo script | Planned | None |
| 6 | Rules/Judging | Human in the loop — nothing built may hand out a final health, financial, or legal-rights decision; a human approves; penalty −10 if violated | Mandatory | Product never states eligibility/approval; visible human-approval copy (`design.md`) | Copy review + `docs/TESTING.md` grounding tests | Planned | None |
| 7 | Rules/Judging | Free tools are enough to win; ₹0 Emergent trial allowed for Track 3; no paid subscription required | Mandatory (unless CEO approves otherwise) | Stack picks free-tier services only (`Architecture.md` §1, §25) | `docs/OPERATIONS.md` external-service list | Planned | None |
| 8 | Rules/Judging | **Corrected 2026-09-13, verified against `Project_details.docx`:** submit by 20 September 2026, 11:59 PM (firm) — a Google Drive folder (Problem & Solution Explainer 1–3pp, Screen Recording, optional Project Files) plus a Google Form (email/phone, project title/track, the 3 questions, Drive link, confirmation checkbox). The previously recorded "next Sunday... one-pager (problem, who helped test, build summary, three tests, limitations, next phase)" and "Route B Claude-Project fallback" (row 26) do not appear anywhere in the verified source document and are removed as unsupported — see `MEMORY.MD` correction entry. | Mandatory | Final submission = 20 Sep 2026, 11:59 PM — matches source document exactly, no CEO-vs-Hathcon date conflict to reconcile | `docs/SUBMISSION.md` | Not started | None |
| 9 | Judging weights | **Corrected 2026-09-13, verified directly against `Project_details.docx`:** Problem Framing **25**, AI Leverage **30**, Practical Usefulness **20**, Execution Quality **15**, Clarity of Explanation **10** (= 100). Bonus **+5** (built with/tested by a real NGO or affected person, named in the video). Penalty **−10** (real personal data in the demo). Penalty **−10** (final health/money/legal decision without human approval). The previously recorded "40% real-world usefulness / 25% demo / 20% pitch / 15% sustainability" breakdown did **not** match this source and has been replaced — see `MEMORY.MD` for the correction entry. | Mandatory (scored) | Currently **no interview evidence exists** for the +5 bonus | `docs/SUBMISSION.md` "who was consulted" | ⚠ Gap — see Missing Evidence below | **Unresolved: no real user/NGO consultation has occurred; do not fabricate this evidence** |
| 10 | Judging weights | Practical Usefulness (20) and Execution Quality (15) — does it work end-to-end and quantifiably save time/cost/effort for the named user | Mandatory (scored) | Deployed slice, Gate 1–2 | `docs/TESTING.md` | Not started | None |
| 11 | Submission | Video: the source document itself is internally inconsistent on length — the Drive-folder section calls it "3 to 5 minutes," the dedicated Video Recording section calls it "5 to 10 minutes." **Both figures disclosed honestly; treat 10 minutes as the hard ceiling** ("Common mistakes: going over 10 minutes"). No exact-second pitch timing template (the previously recorded "0:20/0:40/2:20/2:45/3:00" breakdown) appears anywhere in the source document and has been removed as unsupported — see `MEMORY.MD` correction entry. | Mandatory | Script/structure per the source's own "Structure" list (intro → problem → live walkthrough → where AI does the heavy lifting → impact line) | `docs/SUBMISSION.md` | Not started | None |
| 12 | Judging weights | Clarity of Explanation (10) — crisp, not rambling; AI Leverage (30) — "could this be built without AI? If yes, you lose points" | Mandatory (scored) | Video structure + AI-step framing in `docs/SUBMISSION.md` | Peer walkthrough test | Not started | None |
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
| 26 | Project 14 | **Removed 2026-09-13 as unsupported.** No "Route B" / 20-minute Claude-Project fallback mechanism appears anywhere in `Project_Disability_certificate_guide/Project_details.docx` (the verified official handbook). This row previously cited a fallback path that cannot be traced to any actual Hathcon rule; it must not be relied upon as a submission-path option going forward. If a genuine fallback is needed (e.g., the build slips), it must be one of the source document's own actual paths — e.g., submitting a partial/documented-honestly build via the same Google Drive + Google Form mechanism — not an invented "Route B." | N/A — row retracted | N/A | `MEMORY.MD` correction entry | **Retracted** | None — a fabricated rule cannot create a compliance conflict; removing it is the correction |
| 27 | CEO addendum | "Production-grade" quality (not a literal hackathon term) — reliability, security, accessibility, maintainability, without scope growth | Mandatory (CEO requirement, additive) | Applied throughout all docs | `docs/TESTING.md`, `docs/OPERATIONS.md` | Planned | None |

**Missing Evidence (flagged, not fabricated):** the **+5 bonus** for NGO/affected-person involvement currently has zero supporting evidence — this is a bonus, not a base scoring category, per the corrected weights above (row 9). This is still worth pursuing given the size of the rest of the rubric (Problem Framing 25 + AI Leverage 30 + Practical Usefulness 20 depend heavily on being able to name a specific real user/scenario, even without a literal recorded conversation). Recommendation to CEO: either (a) conduct at least one real conversation with an affected person or disability-support NGO before 19 Sep for the +5 bonus and stronger Problem Framing evidence, or (b) accept the bonus gap and rely on a sharply specific (named district/user-type) problem framing instead. This decision is logged as **Pending CEO Decision #1**.

## 1a. Track vs. Domain Conflict (flagged 2026-09-13, verified against `Project_Disability_certificate_guide/Project_details.docx`)
- **Finding:** the source document's "Pick One of Three Tracks" section defines exactly three tracks — **AI Automation** (a workflow that runs itself, e.g. n8n/Make/Sheets), **AI Agent** (reads, decides, and acts — e.g. n8n/Gemini/Telegram), and **Product Build** (a working website/app a real person can open, e.g. Emergent/Lovable) — and states plainly: *"One person, one project, one track."* Separately, the document's "28 Ideas, by Domain" section groups project ideas into **thematic domains** (🌊 Disaster & Civic Life, 🎖 Those Who Served & Access, 🧓 Elders/Orphans & Literacy, 🐾 Animals/Earth & Livelihood) — Project 14 ("Disability certificate guide") sits in the "🎖 Those Who Served & Access" **domain**, which is a theme, not a track.
- **Prior error:** this project's earlier documentation (this file, row 1) recorded "Those Who Served & Access" as if it were the declared *track*, which is not what the source document means by "track" at all.
- **Current design tension:** the hybrid architecture (`Architecture.md` §28 — Telegram-first via n8n/Gemini **and** a mandatory public website via Lovable) spans what the source document treats as two different tracks (AI Agent/Automation for the Telegram+n8n path, Product Build for the website). The "one person, one project, one track" rule is stated as mandatory, not optional.
- **Not resolved unilaterally, per this project's own conflict-handling rule (§2 below):** this is logged as **Pending CEO Decision #2** — the CEO/Product Owner must choose one of:
  (a) declare **AI Agent** or **AI Automation** as the single track, treat the website as a non-scored bonus/demo convenience only, and de-emphasize it in the submission narrative;
  (b) declare **Product Build** as the single track and treat the Telegram/n8n path as a supporting implementation detail of that product, not a separately-scored track element;
  (c) accept the risk of presenting a hybrid and clearly pick one track for the Google Form's "track" field while still building both channels, disclosing the choice honestly in Q3 of the submission form.
  No implementation decision has been changed as a result of this finding — it is reported, not silently resolved.
- **One positive confirmation from the same source:** the "One Skeleton, Many Projects" section explicitly groups Project 14 with the "scheme finder" skeleton (04, 08, 10, 14, 17, 19) described as *"documents in, five questions, answers only from the documents"* — this independently confirms the five-question, source-grounded design already built into `PRD.md`/`Architecture.md` is the officially intended shape for this project, regardless of how the track question above is resolved.

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
- **Hard-gate discipline:** the live Hathcon rules and every instruction in `MustFollowRules` are hard gates. A conflict must be marked Blocked and escalated, never resolved unilaterally.
- **Resolution — both channels, one shared workflow:** Telegram is a required primary operational entrypoint and the website remains the Product Owner's mandatory public interface. Full detail: `Architecture.md` §28.
- **No duplicate or contradictory logic.** The five questions, grounding rules, fail-safe text, escalation route, disclosure banner, human-in-the-loop language, and closing line are defined once and consumed identically by both channels.
- **Telegram must demonstrate the real guide flow**, not reminders alone.
- **No paid upgrade is required or planned.** Lovable export is not the immediate critical path; D1.1 source collection and the Telegram vertical slice take priority.

## 27. Reviewed-Source Retrieval Rules — NOT "production RAG" or self-learning AI (CEO Decision, 2026-09-13 Asia/Calcutta; corrected same day for runtime file-access reality)
- **Naming discipline.** This feature is called **"reviewed-source retrieval"** in every document, report, and conversation about it — never "production RAG," "AI learning," or "self-learning AI." It is a static, deterministic filter over 5 curated rows, not a general retrieval-augmented-generation system.
- **Reviewed-source-only corpus.** Both the canonical file (`docs/automation/rag-corpus/sources.json`) and its runtime mirror (the n8n Data Table `UDID_Reviewed_Sources`, `Architecture.md` §29.5) may contain only excerpts from documents already marked "Reviewed" in `docs/SOURCES.md`. No unreviewed URL, informal source, or general web content may be added to either at any time.
- **A hosted n8n workflow cannot read repository files at runtime.** The live retrieval node (`n8n-build-manifest.md` Node 4.5) must query the `UDID_Reviewed_Sources` Data Table, never attempt to fetch `sources.json` from GitHub or any local path at runtime. The Data Table is populated only via the manual import/reconciliation procedure in `Architecture.md` §29.5 — never by a live node writing to it.
- **No user/log data ingestion — ever.** Applicant messages, Telegram chat IDs, Google Sheet log rows, reminder text, free-text input, credentials, or any derivative of them must never be written into the canonical corpus file or the Data Table. There is no ingestion pipeline for such data by design (`Architecture.md` §29.3 item 6) — this is a structural absence, not a filter that could be bypassed. `docs/TESTING.md`'s "Data Table content audit" test exists specifically to verify this.
- **No unreviewed or stale retrieval.** If retrieval matches zero rows, the Data Table read fails, any matched row's `corpus_version` doesn't match the value the workflow is configured to expect, or the request needs a district-level hospital/medical-board/welfare-office fact not present in any Reviewed row's `allowed_claims`, the workflow must return the existing fixed fail-safe (`docs/automation/D1.3a-workflow-spec.md` §5) rather than let Gemini guess, generalize, or use stale data.
- **No new external infrastructure without a fresh CEO decision.** Retrieval must not silently grow into a paid vector database, a new SaaS integration, a web scraper, or an autonomous multi-step agent. The current design (`Architecture.md` §29) is deliberately a static, deterministic filter — not embeddings-based similarity search — because this n8n instance has no embeddings node installed (verified 2026-09-13) and the corpus is too small to need one regardless.
- **Manual re-sync discipline, two-hop.** `rag-corpus/sources.json` must be manually updated whenever `docs/SOURCES.md` changes (bumping `_corpus_version`), and the `UDID_Reviewed_Sources` Data Table must then be manually re-imported to match, with both steps timestamped in `MEMORY.MD`. There is no automated sync job at either hop, and claiming the two are in sync without checking is a documentation-accuracy violation (`RULES.md` §15 Evidence Requirements).
- **Current build status (truthful, verified 2026-09-13 17:29 Asia/Calcutta):** `UDID_Reviewed_Sources` **exists** and contains all 5 reviewed rows. Node 4.5 **exists**, has this Data Table selected, remains **unconnected**, and has **no filter conditions configured**. No credential entered; nothing executed, published, or activated.

## 27a. Session-State Data Table Rules — `UDID_Guide_Sessions` (CEO Decision, 2026-09-13 17:34 Asia/Calcutta)
- **Separate table, separate purpose.** Telegram session state (Node 2, `n8n-build-manifest.md`) must use its own n8n Data Table, `UDID_Guide_Sessions`, distinct from `UDID_Reviewed_Sources`. Never the same table; never Google Sheets; never workflow static data; never the reviewed-source corpus.
- **No AI Agent "Simple Memory" workaround.** Do not add an AI Agent node merely to expose a "Simple Memory" sub-node as a way to test or obtain session storage — the D1.3b capability check (`MEMORY.MD` Entry 030) found neither "Data Store" nor "Simple Memory" available from this n8n instance's general node search, and the CEO decided against that workaround.
- **Permitted columns only:** `session_key`, `current_question_index`, `state_district`, `disability_type`, `applicant_relationship`, `udid_status`, `language`, `updated_at`, `expires_at`. No other column may be added.
- **`session_key` is a lookup key only** — for Telegram routing/state lookup, typically derived from chat ID. It is never itself treated as, or expanded to carry, name/phone/address/Aadhaar/free-text health narrative/source-corpus content/Google Sheet data/credentials/raw message text.
- **Hard forwarding boundary.** Neither `session_key` nor any raw answer from this table may ever be forwarded to Google Sheets (Node 7) or to `UDID_Reviewed_Sources` (Node 4.5). Node 6.5's field whitelist remains the sole gate before Sheets and does not include `session_key`.
- **Lifecycle discipline.** The session row must be deleted once the final response/reminder flow for that conversation completes, and a separate expired-session cleanup path (checking `expires_at`) must exist before this table is relied upon in any live flow.
- **Current build status (truthful):** `UDID_Guide_Sessions` has **not** been created. This section is documentation-only pending separate CEO authorization to create the table and build the corresponding node(s).
