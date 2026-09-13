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
{ "type": "unsupported", "message": "<exact fail-safe text — see docs/automation/D1.3a-workflow-spec.md §5, the single authoritative source for this string; do not restate a different wording here>" }
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
- **Retracted 2026-09-13:** no "Route B" Claude Project shortcut exists in the verified source document (`Project_Disability_certificate_guide/Project_details.docx`); this line previously referenced a fallback that cannot be traced to any actual Hathcon rule. See `RULES.md` §1a for the real, still-open question this same document review surfaced: which of the three actual tracks (AI Automation / AI Agent / Product Build) this project declares.

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

## 29. Reviewed-Source Retrieval — NOT "production RAG" or self-learning AI (CEO Decision, 2026-09-13; environment check same date; corrected 2026-09-13 for runtime file-access reality)

### 29.1 Purpose and scope
Make the Gemini response retrieve only the relevant, human-reviewed excerpts from `docs/SOURCES.md` (SRC-001–SRC-005) instead of sending the full 5-source corpus on every call. **This is not autonomous learning, web crawling, self-training, a broad AI agent, applicant-data storage, or "production RAG"** — the CEO has explicitly directed this feature be called **"reviewed-source retrieval"** throughout, precisely to avoid overstating it. It is a narrow retrieval-before-generation step over a small, static, human-curated corpus.

### 29.2 Environment finding (checked 2026-09-13, this session, read-only inspection of the Product Owner's n8n instance)
- **`Simple Vector Store` node: available** (4 actions — "Get ranked documents from vector store," "Add documents to vector store," "Retrieve documents for Chain/Tool as Vector Store," "Retrieve documents for AI Agent as Tool").
- **No embeddings node of any kind is installed** — searches for "Embeddings Google Gemini" and the bare term "Embeddings" both returned zero results ("We didn't make that... yet").
- **Consequence:** a true embeddings → vector-store → similarity-search RAG pipeline **cannot be built natively in this n8n instance** without adding a new external embeddings API call (e.g., via an HTTP Request node), which the CEO's own boundary (§29.3 below) restricts. Even if `Simple Vector Store` were used with, say, a manually-computed embedding, that node is in-memory only and does **not** persist across a workflow restart — it would not be production-grade persistent RAG regardless.

### 29.3 Adopted design: deterministic rule-based retrieval (the "smallest no-cost compliant alternative")
Because true vector RAG is not buildable here, and because the entire corpus is 5 short, static, curated excerpts (not a large or growing document set), retrieval is implemented **deterministically**, not via embeddings similarity:
1. **Canonical ingestion path:** `docs/automation/rag-corpus/sources.json` — a hand-authored, version-controlled JSON file (in the GitHub repository) containing, per source: `source_id`, `issuing_authority`, `official_url`, `review_status`, `retrieval_date`, `geography`, `allowed_claims`, `excerpt_text`, `limitations`, `match_tags`, plus a top-level `_corpus_version` stamp. This file is manually re-synced whenever `docs/SOURCES.md` changes — it is not auto-generated, and no automated crawler or ingestion job writes to it.
2. **Runtime mirror — corrected 2026-09-13:** a **hosted n8n instance cannot read `sources.json` from GitHub/the local workspace at runtime.** The live retrieval step instead reads from an n8n **Data Table** named `UDID_Reviewed_Sources` (§29.5), which is a manually-imported, read-only mirror of the same 5 rows. `sources.json` remains the canonical, version-controlled source of truth; the Data Table is a runtime copy that must be re-imported by hand whenever the canonical file changes (§29.5 reconciliation procedure).
3. **Retrieval path (n8n):** `n8n-build-manifest.md` "Node 4.5 — Reviewed-Source Retrieval" queries the `UDID_Reviewed_Sources` Data Table (a "Get Row(s)" / filter operation, not a vector search) and deterministically filters rows whose `match_tags`/`geography` match the user's stated state/district/disability-type and the kind of question being asked (state-level portal guidance vs. escalation vs. national process). This is a plain filter/lookup, not a similarity search — for 5 rows, that is both sufficient and far more auditable than embedding-based retrieval would be.
4. **What reaches Gemini:** only the matched rows' `excerpt_text` (plus their `source_id` for internal traceability) — never the full corpus, never unmatched rows, never raw `docs/SOURCES.md` prose beyond what's already mirrored into the curated Data Table.
5. **Fallback behaviour:** if the filter step matches zero rows, the Data Table read itself fails (connection/permissions/empty-table error), the Data Table's `corpus_version` column doesn't match the canonical `sources.json`'s `_corpus_version` (stale mirror), or the user's question requires a district-specific hospital/medical-board/welfare-office fact that no row's `allowed_claims` supports, the retrieval node routes directly to the existing fixed fail-safe (`D1.3a-workflow-spec.md` §5) — Gemini is never invoked with an empty, stale, or forced-guess context. This reuses the branch structure already in `n8n-build-manifest.md` Node 4/5/6, with Node 4.5 sitting between Node 4 and Node 5.
6. **Privacy boundary:** both `sources.json` and the `UDID_Reviewed_Sources` Data Table are static, CTO/Product-Owner-authored content. No node in this design ever **writes** to the Data Table at runtime — only the one-time/per-update manual import writes to it. Applicant messages, Telegram chat IDs, Google Sheet rows, reminders, or any free text are never ingested into either the canonical file or the Data Table — there is no ingestion pipeline for user data at all.

### 29.4 Explicit non-goals (per CEO boundary)
No new paid vector database, new SaaS account, web scraper, autonomous agent, or new credential. No embeddings API call added (which would itself require a new outbound HTTP call under a not-yet-approved usage pattern) — this design deliberately avoids needing one. Not self-learning: the corpus only changes when a human edits `docs/SOURCES.md`, then manually re-syncs `rag-corpus/sources.json`, then manually re-imports the `UDID_Reviewed_Sources` Data Table. **This feature is called "reviewed-source retrieval" in every document — never "production RAG" or "self-learning AI."**

### 29.5 Runtime Mirror — n8n Data Table `UDID_Reviewed_Sources` (added 2026-09-13, correcting the runtime-file-access gap)

**Schema (columns, all text/string type unless noted):**
| Column | Content | Notes |
|---|---|---|
| `source_id` | e.g. `SRC-001` | Primary lookup key |
| `issuing_authority` | exact text from `sources.json` | |
| `official_url` | exact URL | |
| `review_status` | always `Reviewed` for any row present here | a row must never exist here unless it is Reviewed in `docs/SOURCES.md` |
| `retrieval_date` | exact text from `sources.json` | |
| `geography` | e.g. `National`, `Maharashtra (state-level)` | |
| `excerpt_text` | the exact `excerpt_text` string from `sources.json` | this is what gets passed to Gemini |
| `limitations` | exact text from `sources.json` | |
| `match_tags` | comma-separated string, e.g. `maharashtra,escalation,state-commissioner,stuck` | Node 4.5's filter reads this as a simple comma-split, not JSON, since Data Table cells are flat strings |
| `corpus_version` | the exact value of `sources.json`'s `_corpus_version` at the time of import, e.g. `2026-09-13-v1` | **every row must carry the same value** — used as the staleness check in item 5 above |

**Five-row import procedure (manual, performed by the Product Owner in their n8n session — not by a live workflow node):**
1. In n8n, go to **Data tables** → **Create Data Table** → name it exactly `UDID_Reviewed_Sources`.
2. Add the 10 columns listed above, in any order, all as text-type columns.
3. For each of the 5 entries in the current `docs/automation/rag-corpus/sources.json` (`sources[0]` through `sources[4]`, i.e. SRC-001 through SRC-005), add one new row, copying each field's value verbatim, and set `corpus_version` to the file's current `_corpus_version` value (`2026-09-13-v1` as of this writing) on every row.
4. Confirm exactly 5 rows exist, no more, no fewer, and no additional columns beyond the 10 above.

**Version/reconciliation verification (manual, since a live hosted workflow cannot diff against the git file itself):**
- Whenever `docs/SOURCES.md` changes and `sources.json` is updated by a git-connected session, that session must bump `_corpus_version` to a new value and record the change in `MEMORY.MD`.
- The Product Owner then manually re-imports/updates all 5 (or more, if sources were added) Data Table rows with the new `corpus_version` value, and records the exact re-import timestamp in `MEMORY.MD`.
- The live workflow's own check (Node 4.5) is limited to: "do all returned rows show the `corpus_version` I expect?" — where "expect" means a value the workflow is configured with (a Set node constant updated during the same manual reconciliation step). It is **not** a live cryptographic diff against the GitHub file — that is not possible from inside a hosted n8n workflow with no repository access, and this document does not claim otherwise.

**Test proving the Data Table holds no applicant data (added to `docs/TESTING.md`):** see the new "Data Table Content Audit" test — query all rows and columns from `UDID_Reviewed_Sources` and assert the column set is exactly the 10 listed above (no `chat_id`, `message`, `phone`, `address`, or any log-derived field), and that every `source_id` value is one of SRC-001–SRC-005 with `review_status = Reviewed`.

**Current build status (truthful, verified 2026-09-13 17:29 Asia/Calcutta):** `UDID_Reviewed_Sources` **exists** in the Product Owner's n8n instance and **contains all 5 reviewed rows**, matching the schema above. Node 4.5 **exists** on the canvas with this Data Table selected as its source, but remains **unconnected** to any other node and currently has **no filter conditions configured** (a temporary condition was added only to inspect the available column types/operators for `match_tags` and `geography`, then removed — the node reverted to "Currently no items exist"). No credential entered; nothing executed, published, or activated.

### 29.6 Session-State Data Table — `UDID_Guide_Sessions` (design specified 2026-09-13 17:34 Asia/Calcutta, CEO Decision — not yet built)
*Distinct from §29.5's `UDID_Reviewed_Sources`. This section exists because the D1.3b capability check (`MEMORY.MD` Entry 030) found no node literally named "Data Store" or "Simple Memory" available from this n8n instance's general node search, and the CEO decided against adding an AI Agent merely to expose "Simple Memory." The session store below is a separate, temporary n8n Data Table, built the same way `UDID_Reviewed_Sources` was.*

- **Purpose:** hold Node 2's ephemeral five-question session state (`n8n-build-manifest.md` Node 2), keyed for Telegram routing/state lookup only — replacing the earlier "implementation choice left to the build step" wording.
- **Exact table name:** `UDID_Guide_Sessions`.
- **Permitted columns only:** `session_key`, `current_question_index`, `state_district`, `disability_type`, `applicant_relationship`, `udid_status`, `language`, `updated_at`, `expires_at`. No other column is authorized.
- **`session_key` boundary:** exists solely for Telegram routing/state lookup (typically derived from chat ID). It is never forwarded to Google Sheets (Node 7) or to `UDID_Reviewed_Sources` (Node 4.5) — same hard boundary the original Node 2 design already required, now enforced by keeping this table entirely separate from both.
- **Explicitly prohibited in this table:** name, phone number, postal address, Aadhaar/ID numbers, free-text health narrative, any reviewed-source-corpus content, any Google Sheet data, any credential, and raw Telegram message text.
- **Never the same table as, and never merged into:** `UDID_Reviewed_Sources`, Google Sheets, or workflow static data.
- **Lifecycle:** delete the session row once the final response/reminder flow for that conversation completes. A separate expired-session cleanup path (checking `expires_at` against current time and deleting stale rows) must exist before this table is relied upon in a live flow.
- **Current build status (truthful):** `UDID_Guide_Sessions` has **not** been created. No node reads or writes it. This section is documentation-only pending separate CEO authorization to create the table and build the corresponding node(s).
