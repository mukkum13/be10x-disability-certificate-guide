# Architecture.md — Technical Architecture Source of Truth
**Status:** Draft — Gate 0. Version 0.1. Last verified: 2026-09-12.

## 1. Selected Stack & Rationale — **DECIDED by CEO 2026-09-12 13:46:24 Asia/Calcutta; UPDATED to hybrid channel model 2026-09-12 16:05:00 Asia/Calcutta**
The CEO approved the Gate 1 minimum production stack and explicitly rejected the custom Claude-API architecture previously proposed by the CTO. This section is updated to match; see `MEMORY.MD` Entry 003 for the decision record.
- **Telegram:** A **required primary operational entrypoint**, matching the official Project 14 template exactly — `Telegram → n8n → Gemini/grounded workflow → Google Sheets (anonymised log) → Telegram response`. It must run the actual five-question guide flow end-to-end, not just reminders.
- **Website:** Remains **mandatory** as the public-accessible web interface the Product Owner separately required. It calls the same shared workflow/grounding rules as Telegram — it is not a second product and must never duplicate or contradict Telegram's logic (see §28).
- **AI model:** Google Gemini (CEO-approved; not Claude API for the production path).
- **Orchestration:** n8n (workflow orchestration layer, per the hackathon's own recipe) — the single shared workflow both channels call into.
- **Log store:** Google Sheets (six-field anonymised log) — one shared log for both channels.
- **Grounding store:** The reviewed documents in `docs/SOURCES.md`, supplied as context to the Gemini call via n8n (direct context injection; no vector DB needed at this scale).
- **Hosting:** Free tier throughout (n8n Cloud trial + free-tier website hosting), per `RULES.md` §1 row 15. No paid Lovable/Emergent upgrade is required or planned.

Rationale: the hackathon explicitly rewards "small and fully working" over "large and unfinished," free tools, and non-technical operability. The hybrid keeps the project on the Project 14 recipe while satisfying the Product Owner's separate website requirement — both backed by one non-duplicated workflow.

## 2. System Context — updated to hybrid channel model, 2026-09-12 16:05:00 Asia/Calcutta
```
[Telegram User] --message--> [Telegram Bot Trigger] ----\
                                                           \
[Website User] --HTTPS--> [Static Frontend] --API call--> [n8n: Shared Guide Workflow]
                                                           /        |            \
                                                          /   [Gemini + Reviewed  \
                                                         /     Source Docs as      \
                                                        /      context (grounding)] \
                                                       /                             v
                                            [Google Sheets: one shared          [Response back to
                                             anonymised log, both channels]      originating channel:
                                                                                 Telegram message OR
                                                                                 website JSON payload]
```
Both entrypoints call the **same** n8n workflow, the same grounding rules, and the same fail-safe/escalation/closing-line logic. Neither channel has its own separate copy of the guide logic — see §28.

## 3. Application Components
1. **Question Flow Controller** — tracks which of the 5 questions are answered (session state), enforces one-at-a-time ordering, prevents re-asking.
2. **Grounding/Retrieval Layer** — selects the relevant reviewed document(s) for the given state/district/disability type; if none match, triggers fail-safe response.
3. **LLM Call Wrapper** — assembles system prompt + grounded context + conversation state; calls LLM; parses structured output.
4. **Response Formatter** — enforces numbered-step format, mandatory closing line, and language requested.
5. **Escalation Handler** — detects "stuck" signal; returns verified escalation route or fail-safe message.
6. **Reminder Module** — drafts reminder text always; sends a real reminder only via a verified integration, and only reports success after delivery confirmation.
7. **Anonymised Logger** — writes only the 6 permitted fields (Section PRD §14) to the log store.
8. **Safety/Disclosure Banner** — persistent UI copy per PRD §15/§9 (FR-9).

## 4. Repository & Folder Structure (proposed)
```
/                     canonical Markdown docs (PRD.md, Architecture.md, RULES.md, Phases.md, design.md, MEMORY.MD, README.md)
/docs                 SOURCES.md, TESTING.md, OPERATIONS.md, SUBMISSION.md
/app or /web           frontend source (created at Gate 1, not before)
/functions or /server  backend function(s)
/knowledge             reviewed source documents (PDF/text) referenced by docs/SOURCES.md
```
No application code exists yet — this structure is proposed for Gate 1.

## 5. Website Request/Response Flow
1. Browser loads static frontend; initializes empty session state.
2. Frontend posts current session state + latest user answer to `/guide` backend endpoint.
3. Backend validates input, updates session state, determines next unanswered question or (if all 5 answered) triggers grounded-answer generation.
4. Backend returns either "next question" or "numbered guidance" payload.
5. Frontend renders the response; logs nothing itself (server does).

## 6. Five-Question Session-State Flow
State machine with 6 states: Q1→Q2→Q3→Q4→Q5→ANSWERED. Each transition requires a non-empty answer for the current question. "Stuck" input is handled as an interrupt from any state, returning to the same state afterward.

## 7. AI Grounding & Retrieval Flow
1. Match user's state/district + disability type against `docs/SOURCES.md` registry.
2. If a reviewed source exists: inject its extracted facts into the LLM context window; instruct the LLM to answer only from that context.
3. If no reviewed source exists: skip the LLM call for the factual content and return the fixed fail-safe message (do not let the LLM guess).

## 8. Official Knowledge Ingestion Process
1. A human (Product Owner) or an assigned agent locates an official document (state UDID/social welfare department portal, gazette notification, or the national UDID portal).
2. Document is saved under `/knowledge`, dated, and registered in `docs/SOURCES.md` with all required fields (see that file's schema).
3. Reviewer (Product Owner or CTO) marks review status before the document can be used in production answers.
4. Only "Reviewed" status documents are wired into the grounding layer.

## 9. Answer Traceability
Every generated guidance response must be traceable to one or more `docs/SOURCES.md` entries. The backend should log (internally, not in the anonymised user log) which source IDs were used for a given answer, to support audit and the "cite or identify the official source" production requirement.

## 10. Reminder Workflow
1. At end of guidance, backend drafts reminder text for the next step.
2. If reminder integration is connected: collect exact date/time/timezone from user; create reminder via the channel's API; confirm creation; on the scheduled time, verify actual delivery for Hathcon Test 3.
3. If no integration: present the draft text and state plainly it has not been scheduled.

## 11. Anonymised Logging Workflow
On completion of the 5-question flow (or when guidance is returned), append one row: timestamp (server time), state, disability_type, current_stage, next_reminder (date/text or "none"), language. No other field is written. No raw user message text is persisted.

## 12. API Contracts (proposed, Gate 1)
`POST /guide`
Request: `{ sessionId, answers: {state?, district?, disabilityType?, applicantRelationship?, udidRegistered?, language?}, message?: string }`
Response: `{ type: "question" | "guidance" | "escalation" | "unsupported", nextQuestion?: string, steps?: [{do, where, carry, next}], closingLine?: string, sourceIds?: [string] }`

## 13. Data Schemas
**Log row:** `{ timestamp: ISO8601, state: string, disability_type: string, stage: string, next_reminder: string|null, language: string }`
**Source registry entry:** see `docs/SOURCES.md` schema.

## 14. Validation Boundaries
- All user free-text input is length-capped and stripped of anything resembling PII patterns (phone numbers, emails) before logging (never before display, since the user needs to see their own input).
- State/district/disability-type/language values are validated against a controlled list where possible.

## 15. Trust Boundaries
- Browser (untrusted) → Backend (trust boundary: validate everything).
- Backend → LLM (semi-trusted: LLM output is checked against grounding before being shown as "verified" fact; never expose system prompt to the LLM's own output back to the user).
- Backend → Log store (only the 6 whitelisted fields cross this boundary).

## 16. Secret Management
LLM API keys and any reminder-channel tokens live in server-side environment variables only, never in frontend code or committed files. `.env.example` lists variable names without values (see `README.md`).

## 17. Privacy Controls
No name, phone, address, ID number, or free-text health narrative is stored anywhere beyond the single session's active memory. Anonymised log is the only persistent record.

## 18. Error & Fallback Behaviour
- LLM/API failure → user sees a plain "something went wrong, please try again or contact [district office info if known]" message; no fabricated content.
- Missing/contradictory source → explicit "this could not be verified" message pointing to the UDID portal / district office (never silent guessing).
- Reminder-channel failure → user is told the reminder could not be confirmed; no false "scheduled" claim.

## 19. Rate-Limiting Strategy
Simple per-session/per-IP request throttling at the backend function layer (exact numbers to be set at Gate 1 based on the chosen host's free-tier limits).

## 20. Accessibility Implications
Server responses must not assume any particular rendering; frontend is responsible for accessible markup (see `design.md`). Numbered-step JSON structure aids screen-reader-friendly rendering (ordered list semantics).

## 21. Deployment Topology
Single static frontend + single backend function, both on free-tier hosts. No database server to manage (Google Sheet or flat store). No containers required at this scale.

## 22. Health & Readiness Checks
A `/health` endpoint (or equivalent) confirming the backend can reach the LLM API and the log store, for use in `docs/OPERATIONS.md` runbook.

## 23. Backup & Recovery Approach
Source documents and Markdown docs are backed up via the connected local folder (K:\Be10x_Disability_certificate_guide) and can additionally be committed to a git remote once one is designated. The Google Sheet (if used) is itself an exportable backup of the log.

## 24. Observability
Minimal: request counts, error counts, and which source IDs were used, logged server-side only (not in the user-facing anonymised log). Appropriate for a 3-day hackathon project — no heavyweight APM.

## 25. External Services & Free-Tier Limits
- LLM provider free tier (rate-limited — do not test in a loop, per hackathon warning).
- n8n Cloud trial (time-limited from activation) if used.
- Telegram Bot API (free, unlimited per hackathon guide) if used for reminders.
- Hosting free tier (function/request caps apply — exact limits to confirm at Gate 1 once host is chosen).

## 25a. Safe Integration Plan for Generated Frontend Code (Lovable primary / Emergent fallback) — added 2026-09-12 13:56:00 Asia/Calcutta per CEO Addendum
This is the CTO-prepared artifact requested under the CEO's "parallel work allocation" (the "Codex/assigned development capability prepares... safe integration plan" item), produced directly by Claude as documentation/specification work rather than implementation code.
1. Frontend is generated externally (Lovable, or Emergent only after a recorded 30-minute Lovable failure) against the scope boundary in `RULES.md` §24 — layout/shell/states/accessibility only, no business logic, no credentials.
2. Exported code lands in a working directory outside the git-tracked history first, so it can be diffed before it ever touches the repository.
3. CTO (Claude) reviews: dependency list (remove anything unused or unnecessary), presence of any hard-coded secret/API key/token (must be none — Lovable is never given credentials per `RULES.md` §24), any accidental real personal/health data in placeholder content (must be dummy data only), and whether any of the "must not" scope items leaked in (medical/legal claims, accounts, payments, dashboards).
4. CTO cross-checks UI copy word-for-word against `PRD.md` (response format, disclosure text FR-9, closing line FR-6) and `design.md` (accessibility/contrast/labels) and `RULES.md` (dummy-data, non-goals).
5. Only after steps 3–4 pass is the code copied into the git-tracked repository structure (`/app` or `/web` per §4) and committed, following the five-condition "committed" rule (`RULES.md` §16).
6. The state-machine and grounding logic (§6–§7 below) are wired in as a separate, later step — Lovable/Emergent output supplies presentation only; it does not supply the question-flow logic or the grounding/answer logic, which remain backend concerns owned by whichever capability (Codex, or Claude as a disclosed exception) is authorised to implement them.

## 25b. API Contract (refined) — CTO-prepared specification, 2026-09-12 13:56:00 Asia/Calcutta
This refines §12 into an implementation-ready contract so a frontend (Lovable-generated) and a backend (built separately) can be developed in parallel against a shared interface, without either side needing to guess the other's internals.

`POST /api/guide`
```
Request:
{
  "sessionId": "string (client-generated UUID, no PII)",
  "action": "answer" | "stuck" | "reset",
  "questionId": "state_district" | "disability_type" | "applicant_relationship" | "udid_registered" | "language" | null,
  "answerText": "string | null"
}

Response (one of):
{ "type": "question", "questionId": "...", "promptText": "...", "questionNumber": 1-5, "totalQuestions": 5 }
{ "type": "guidance", "steps": [ { "stepNumber": 1, "doText": "...", "whereText": "...", "carryText": "...", "nextText": "..." } ], "sourceIds": ["SRC-001","SRC-002"], "closingLine": "You are doing the right thing. Take it one step at a time.", "reminderOffer": { "mode": "draft" | "real", "draftText": "..." } }
{ "type": "escalation", "routeText": "...", "sourceIds": ["SRC-002"] }
{ "type": "unsupported", "message": "This could not be verified. Please check the official UDID portal (swavlambancard.gov.in) or your district social welfare office." }
{ "type": "error", "message": "Something went wrong. Please try again." }
```
Contract rules binding on both frontend and backend: (a) the frontend never sends or stores anything beyond `sessionId`/`action`/`questionId`/`answerText` — no name/phone/address; (b) every `guidance` response MUST include `sourceIds` (`RULES.md` §5 traceability); (c) the frontend must render `closingLine` verbatim and never let it be omitted or altered; (d) an `unsupported` response must render as a distinct, clearly-styled state, never merged visually with a real `guidance` response.

## 25c. Five-Question State Machine — Formal Specification, 2026-09-12 13:56:00 Asia/Calcutta
States: `Q1_STATE_DISTRICT → Q2_DISABILITY_TYPE → Q3_APPLICANT_RELATIONSHIP → Q4_UDID_REGISTERED → Q5_LANGUAGE → ANSWERED`.
Transition rule: from state `Qn`, a non-empty `answerText` moves the session to `Q(n+1)`; an empty/invalid answer keeps the session at `Qn` and re-prompts (does not count as "re-asking" an already-answered question — FR-1 is about not re-asking *answered* questions, not about re-prompting an unanswered one). From `ANSWERED`, no further question is asked; only `guidance`/`escalation`/`unsupported` responses are returned. The `stuck` action is accepted from any state and returns an `escalation` response without changing the underlying question state (the user resumes exactly where they left off afterward). The `reset` action returns the session to `Q1_STATE_DISTRICT` and discards in-memory answers (nothing to discard from the anonymised log, since raw answers are never logged — only the derived FR-8 fields at completion).

## 26. Architecture Decisions & Rejected Alternatives
- **Rejected:** vector database / RAG pipeline — unnecessary complexity for a handful of reviewed documents; direct context injection is smaller and more auditable.
- **Rejected:** user accounts / persistent per-user history — explicit non-goal (privacy + scope).
- **Rejected:** multi-service microarchitecture — a single backend function is sufficient and easier to secure/operate in 3 days.
- **Open:** Claude API vs Gemini API vs n8n-orchestrated flow — CEO decision needed (see report).
- **Open:** custom website vs. hackathon's "Route B" Claude Project shortcut as the primary submission vs. fallback — CEO decision needed.

## 27. Known Limitations
- No document-upload or dynamic ingestion pipeline; sources are manually reviewed and registered.
- Coverage is limited to whatever states/districts get reviewed sources within the 3-day window.
- Reminder delivery verification (Hathcon Test 3) depends on which channel, if any, is approved and wired up in Gate 2.

## 28. Hybrid Channel Architecture — Telegram Primary Entrypoint + Website Public Interface (CEO Decision, 2026-09-12 16:05:00 Asia/Calcutta)

### 28.1 Background
The Project 14 template specifies Telegram as the primary Trigger, while the Product Owner requires a website. This was resolved as a hybrid, not an either/or (`MEMORY.MD` Entries 019–020).

### 28.2 Binding decision
1. **One shared workflow, not two products.** Five questions, reviewed-source-only numbered guidance, the "could not verify" fail-safe, escalation, disclosure, human-in-the-loop language, and reminder behaviour are defined **once**, in the n8n workflow, and consumed by both channels.
2. **Telegram is a required primary operational entrypoint**, matching the official template. It must demonstrate the actual five-question guide flow — **not reminder delivery alone**.
3. **The website remains mandatory** as the Product Owner's required public interface. It calls the same n8n workflow (or an equivalent backend function wrapping identical logic) and must not contain its own separate copy of the grounding rules, fail-safe text, or escalation route.
4. **Lovable-built website shell** remains allowed, but is not the immediate critical path.

### 28.3 Smallest Telegram-first vertical slice
1. Telegram Trigger receives a message from the test user.
2. The workflow tracks which of the 5 questions are answered for that Telegram chat ID; no other identifying data is stored.
3. Gemini asks the next unanswered question one at a time.
4. Once all are answered: when a Reviewed source supports the case, Gemini gets only those facts and returns numbered guidance; otherwise the workflow returns the fixed fail-safe without factual generation.
5. A stuck message interrupts any state and returns only a verified escalation route.
6. Google Sheets appends only the approved anonymised fields.
7. A real two-minute test reminder is delivered back through the same Telegram chat.
8. The website invokes identical workflow logic and must return substantively identical guidance.

### 28.4 Source gaps
No Maharashtra-specific procedure, pilot certifying-hospital/medical-board list, or pilot district welfare-office source is Reviewed yet. Until sufficient official sources are reviewed, the factual guidance step must use the fixed fail-safe.
