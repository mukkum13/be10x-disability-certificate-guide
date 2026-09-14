# n8n Node-by-Node Build Manifest — D1.3a Telegram-First Vertical Slice
**Status:** Design manifest, partially built in n8n. Written 2026-09-12 20:20:00 Asia/Calcutta; revised 2026-09-12 20:45:00 Asia/Calcutta after independent Codex + Antigravity review (see `REVIEW-FINDINGS.md`); **status corrected 2026-09-13 17:34 Asia/Calcutta** — as of this update, Node 1 (Telegram Trigger), Node 1b (Escalation-Keyword Interrupt, 4 conditions configured), and Node 4.5 (Reviewed-Source Retrieval, Data Table selected) exist as unconnected/unpublished draft nodes on the canvas; `UDID_Reviewed_Sources` Data Table exists with 5 reviewed rows. All other nodes below remain design-only. Nothing is connected end-to-end, executed, published, or activated.
**Purpose:** Give a human (Product Owner) or a future authenticated-browser session everything needed to build the workflow by hand in n8n, node by node, without inventing behaviour not already specified in `PRD.md`/`RULES.md`/`Architecture.md`.

Each node entry below states: purpose, input/output contract, approved data fields, prohibited data fields, branch conditions (where relevant), failure behaviour, source-grounding rule (where relevant), and required unpublished/disabled state.

---

## Node 1 — Telegram Trigger
- **Purpose:** Entry point; fires on an incoming message to the bot.
- **Input:** Telegram update object (message text, chat ID, message ID, timestamp).
- **Output:** Passes chat ID, message text, and timestamp downstream.
- **Approved data fields carried forward:** chat ID (in-flight routing key only, never persisted to Sheets), message text, timestamp.
- **Prohibited data fields:** none collected at this stage beyond what Telegram's platform itself provides.
- **Branch conditions:** none (single entry point) — but every message, regardless of conversation stage, is first checked by Node 1b before anything else.
- **Failure behaviour:** if the trigger cannot parse an update, no downstream node executes.
- **Source-grounding rule:** N/A.
- **Unpublished/disabled state requirement:** node must exist in the workflow but the workflow itself must remain unpublished/inactive until CEO-authorized activation.

## Node 1b — Escalation-Keyword Interrupt (checked before question routing)
*Added in this revision — resolves REVIEW-FINDINGS.md item 10 (Codex #7 / Antigravity §3.2): Hathcon Test 2 ("I am stuck at the hospital") had no handling anywhere in the original 10-node design.*
- **Purpose:** Detect an "I'm stuck" (or equivalent) signal on **every** incoming message, regardless of which question the session is currently on, and divert to the escalation branch instead of feeding the text into question-routing.
- **Input:** Raw message text (Node 1 output).
- **Output:** Boolean branch signal: `escalation` (→ Node 6b) or `normal` (→ Node 2).
- **Approved data fields:** message text (matched against a keyword list, not stored).
- **Prohibited data fields:** none new.
- **Branch conditions (starting keyword set — not assumed complete, see `REVIEW-FINDINGS.md` open items):** case-insensitive match on "stuck", "help", "problem", "not working", "stuck at the hospital", or equivalent phrasing the Product Owner adds after real-user testing.
- **Failure behaviour:** if uncertain, default to `normal` routing (this is a keyword safety net, not a substitute for the user explicitly answering the five questions) — but a false negative here is lower-risk than a false positive that would interrupt normal question flow.
- **Source-grounding rule:** N/A.
- **Unpublished/disabled state requirement:** same as Node 1.
- **Current build status (truthful, verified 2026-09-13 17:29 Asia/Calcutta):** this node **exists** in the Product Owner's n8n workflow (`Sln6CeMzfuO1ezru`), renamed "Node 1b — Escalation-Keyword Interrupt," connected between the Telegram Trigger and open. It is configured with **Must Match = Any Condition (OR)** and exactly four conditions — `{{ $json.message.text }}` `contains` `stuck` / `help` / `problem` / `not working`, each case-insensitive (this node type has no operator literally named "Contains (Case-Insensitive)"; case-insensitivity is achieved via `contains` plus the node-wide "Ignore Case" option, left at its default `true`). Confirmed **persistent as an unpublished draft** across a full editor reload. Both `true` and `false` output branches remain unconnected to any downstream node. No credential entered; nothing executed, published, or activated.

## Node 2 — Ephemeral Session State (chat-ID-keyed, Telegram path) / sessionId-keyed (website path)
*Session-store design finalized 2026-09-13 17:34 Asia/Calcutta — CEO Decision "session-state design correction before further n8n build." Superseded the earlier "implementation choice left to the build step" wording after the D1.3b capability check found no node literally named "Data Store" or "Simple Memory" available in this n8n instance's general search (see `MEMORY.MD` Entry 030).*
- **Purpose:** Track which of the five questions have been answered for this conversation, and their answers, for the duration of the conversation only.
- **Input:** chat ID (Telegram) or sessionId (website, via Node 10), current message/selection.
- **Output:** Updated session object: `{ sessionKey, answers: { stateDistrict, disabilityType, relationship, udidStatus, language }, currentQuestionIndex }`.
- **Approved data fields:** the session key (chat ID or sessionId, lookup-only, never forwarded to Node 6.5/7), the five answer fields, current question index.
- **Prohibited data fields:** name, phone number, postal address, Aadhaar/ID numbers, free-text health narrative, any field not in the five-question list.
- **Branch conditions:** if `currentQuestionIndex < 5`, route to "ask next question" (Node 3); if `= 5`, route to grounding check (Node 4).
- **Failure behaviour:** if session state is lost/expired mid-conversation, restart the five-question sequence from Q1.
- **Source-grounding rule:** N/A.
- **Implementation — a separate, temporary n8n Data Table (CEO-decided, not an AI Agent "Simple Memory" sub-node and not workflow static data):**
  - **Exact table name:** `UDID_Guide_Sessions` — a distinct Data Table from `UDID_Reviewed_Sources`; never the same table, never Google Sheets, never workflow static data, never the reviewed-source corpus.
  - **Permitted columns only:** `session_key`, `current_question_index`, `state_district`, `disability_type`, `applicant_relationship`, `udid_status`, `language`, `updated_at`, `expires_at`.
  - **`session_key`** exists solely for Telegram routing/state lookup (typically derived from chat ID) — it is a lookup key, not applicant-identifying data by itself, and must never be treated as a place to also store name/phone/address/Aadhaar/free-text health narrative/source-corpus content/Google Sheet data/credentials/raw message text.
  - **Hard boundary (unchanged from the original Node 2 design, now reinforced structurally):** neither `session_key` nor any raw answer in this table is ever forwarded to Google Sheets (Node 7) or to `UDID_Reviewed_Sources` (Node 4.5) — Node 6.5's field whitelist remains the sole gate before Sheets, and it does not include `session_key`.
  - **Lifecycle:** the session row is deleted once the final response/reminder flow for that conversation completes. An **expired-session cleanup path** (a scheduled/triggered node checking `expires_at` against current time and deleting stale rows) must exist before this table is relied upon in a live flow — not yet built; specified here only.
  - **Build status (truthful, verified 2026-09-14 11:18 Asia/Calcutta):** `UDID_Guide_Sessions` **exists** in the Product Owner's n8n instance (ID `X8Xhx2Qwvs4R0Tx9`), with all 9 approved custom string columns and the expected n8n defaults (`id`, `createdAt`, `updatedAt`), and **zero rows**. **No node reads or writes it yet** — no credential entered; nothing executed, published, or activated. Node-level build against this table remains pending separate CEO authorization.

## Node 3 — Five-Question Routing / Ask-Next-Question
*Revised in this revision — resolves REVIEW-FINDINGS.md item 5 (Codex #4 / Antigravity §2.1): Q1 and Q2 changed from free text to closed-choice selection, removing the free-text PII/health-narrative channel structurally rather than filtering it after the fact.*
- **Purpose:** Send the next unanswered question, in fixed order, and never re-ask an answered one.
- **Input:** Session state (Node 2 output).
- **Output:** Telegram message (or website prompt) containing the next question; updated session state once the user's reply is captured.
- **Question format (per `PRD.md` §9, in this exact order):**
  1. State & district — **closed-choice**: Telegram inline keyboard listing India's states/UTs; a second keyboard for that state's districts. No free-text entry accepted for this question.
  2. Disability type — **closed-choice**: inline keyboard listing the 21 disability categories recognized under the RPwD Act, 2016 (the same categories `docs/SOURCES.md` SRC-001 references as the national scheme's scope). No free-text entry accepted.
  3. Applicant relationship (self/other) — closed-choice: two buttons.
  4. UDID registration status — closed-choice: three buttons (yes / no / not sure).
  5. Preferred language — closed-choice: buttons for the languages the product currently supports (at minimum English; additional languages only once `design.md`/`Architecture.md` confirm they are supported — do not silently expand language coverage here).
- **Approved data fields:** the selected button value for whichever question is next.
- **Prohibited data fields:** no free-text capture for any of the five questions in this revision — this is the structural fix, not merely a policy statement.
- **Branch conditions:** exact question/keyboard selected by `currentQuestionIndex` (0→Q1 … 4→Q5).
- **Failure behaviour:** if the user sends free text instead of using the keyboard, re-send the same question with the keyboard rather than accepting or storing the free text.
- **Source-grounding rule:** N/A — fixed questions, not grounded content.
- **Unpublished/disabled state requirement:** same as Node 1.

## Node 4 — Grounding Check (branch point)
*Revised in this revision — resolves REVIEW-FINDINGS.md item 3 (Codex #9 / Antigravity §1.3): clarifies that naming a district in Q1 is always fine; only a request for a district-specific *fact* (hospital/medical-board/welfare-office identity) triggers fail-safe.*
- **Purpose:** Decide whether the guidance the user needs can be fully answered from Reviewed sources, or whether it requires an unreviewed district-specific fact.
- **Input:** Completed answers (state & district, disability type).
- **Output:** Boolean branch signal: `grounded` (route to Node 5) or `not-grounded` (route to Node 6).
- **Clarified rule (this is the core fix):**
  - Collecting a district answer at Q1 is always valid and never itself triggers fail-safe.
  - The branch decision is based on **what kind of guidance is about to be generated**, not on whether a district was named:
    - `grounded`: national UDID process steps (SRC-001), Maharashtra state-level escalation contact (SRC-002), national application-document categories (SRC-003), Maharashtra DEPwD portal pointer + pan-India validity (SRC-004), official UDID portal application/tracking/medical-authority-lookup instruction (SRC-005) — i.e., guidance that directs the user to the correct official lookup/portal/office, without naming a specific hospital, medical board, or district welfare office.
    - `not-grounded`: any case where the only way to answer would require naming a **specific** Maharashtra district hospital, medical board, or welfare-office contact — none of which is Reviewed. This is independent of whether the user is in Maharashtra, Pune, or any other district; it depends on the specificity of the fact requested, not the district name itself.
- **Failure behaviour:** if uncertain whether a request needs a district-specific fact, default to `not-grounded` (fail-safe), never to `grounded`.
- **Source-grounding rule:** this node must reference `docs/SOURCES.md`'s current Reviewed-source list at build/run time, not a hardcoded snapshot.
- **Unpublished/disabled state requirement:** same as Node 1.

## Node 4.5 — Reviewed-Source Retrieval (new — CEO-approved, corrected 2026-09-13 for runtime file-access reality)
*Added per CEO Decision "Minimal RAG layer approved," 2026-09-13; corrected the same day when the CEO identified that a hosted n8n workflow cannot read `sources.json` from GitHub at runtime. Called "reviewed-source retrieval" — never "production RAG" or "self-learning AI." See `Architecture.md` §29 (§29.5 especially) for the full design.*
- **Purpose:** Given a `grounded` signal from Node 4, select only the specific Reviewed-source rows relevant to the user's question (rather than sending all 5 to Gemini on every call).
- **Input:** User's state/district/disability-type/question-intent; a query against the n8n **Data Table** `UDID_Reviewed_Sources` (a manually-imported runtime mirror of `docs/automation/rag-corpus/sources.json` — see `Architecture.md` §29.5 for schema and import procedure). **This node does NOT read any file from GitHub/the local workspace** — that was the original design's error, corrected here.
- **Output:** A small list of matched rows (each with `source_id`, `excerpt_text`, `official_url`) to pass to Node 5; or an explicit empty-match/failure signal.
- **Approved data fields:** the Data Table's own columns (all already public/non-secret, mirroring `sources.json`); the user's state/district/disability-type/question-intent (used only to filter rows, not stored here).
- **Prohibited data fields:** this node must never write to `UDID_Reviewed_Sources` — read-only "Get Row(s)" queries only. No applicant free text, chat ID, or session key is ever added to the Data Table.
- **Branch conditions:** if one or more rows match **and** every matched row's `corpus_version` column equals the value this workflow is configured to expect (see reconciliation procedure, `Architecture.md` §29.5) → proceed to Node 5 with only those rows' `excerpt_text`/`source_id`. If **zero** rows match, the Data Table query itself errors, or any matched row's `corpus_version` is stale/mismatched → route directly to Node 6 (fixed fail-safe), bypassing Node 5 entirely.
- **Failure behaviour:** on any Data Table read error, empty result, or version mismatch, treat as failure and route to Node 6 — never fall back to sending an unfiltered/full set as a "safe default" (reintroduces the precision problem this node exists to solve), and never let Gemini answer without any excerpts.
- **Source-grounding rule:** this **is** the grounding-enforcement point for retrieval; matching logic is a plain tag/field filter (comma-split `match_tags` column, per `Architecture.md` §29.5), not similarity search — deliberate, given this n8n instance has no embeddings node installed (verified 2026-09-13) and the corpus is only 5 rows.
- **Unpublished/disabled state requirement:** same as Node 1.
- **Current build status (truthful, verified 2026-09-13 17:29 Asia/Calcutta):** the `UDID_Reviewed_Sources` Data Table **exists** and contains all **5** reviewed rows (SRC-001–SRC-005), matching the canonical `sources.json` corpus. This node **exists** on the canvas (renamed "Node 4.5 — Reviewed-Source Retrieval"), has `UDID_Reviewed_Sources` selected as its Data Table, but remains **unconnected** to any other node and has **no filter conditions configured** (a temporary condition was added only to inspect available column types/operators, then removed — confirmed reverted to "Currently no items exist"). No credential entered; nothing executed, published, or activated.

## Node 5 — Gemini Grounded-Response Branch
*Revised in this revision — resolves REVIEW-FINDINGS.md item 2 (Codex #2 / Antigravity §1.2): the "what/where/carry/next" schema is no longer mandatory-for-all-four when a source doesn't cover one part.*
- **Purpose:** Produce numbered guidance using only the matched excerpt text Node 4.5 retrieved.
- **Input:** User's five answers; the specific matched-entry `excerpt_text`/`source_id` list from Node 4.5 (not the full SRC-001–SRC-005 corpus on every call — only the entries Node 4.5 selected as relevant).
- **Output:** FR-9 disclosure sentence, then numbered guidance text (only the what/where/carry/next parts actually supported by the matched excerpts — omitting a part rather than inventing it), then the source_id(s) actually used (for internal traceability/Node 5b verification, not shown to the end user as raw IDs), ending with the mandatory closing line.
- **Approved data fields:** the five answers; the matched excerpts' text and source_ids (already public/non-secret).
- **Prohibited data fields:** no free-text user input reaches this node at all in this revision (Node 3 no longer accepts free text), which also reduces prompt-injection surface.
- **Branch conditions:** N/A (terminal content-generation branch, but see Node 5b immediately after).
- **Failure behaviour:** if the Gemini call errors or times out, fall back to the fixed fail-safe text (Node 6), never a raw error message.
- **Source-grounding rule:** the prompt must instruct the model to use **only** the provided SRC-001–SRC-005 excerpts — see `gemini-prompt.md`.
- **Unpublished/disabled state requirement:** the Gemini credential/API-key selector must remain **empty** at this build stage.

## Node 5b — Post-Generation Guardrail Check (new in this revision)
*Added to resolve REVIEW-FINDINGS.md item 1 (Codex #1 / Antigravity §1.1): nothing previously checked Gemini's output before it reached the user.*
- **Purpose:** A deterministic (non-LLM) check on Node 5's output before it is delivered, catching an obvious hallucination the prompt instructions failed to prevent.
- **Input:** Node 5's generated text; the list of proper nouns/URLs actually present in the SRC-001–SRC-005 excerpts supplied to Node 5.
- **Output:** `pass` (→ Node 6.5/Node 8) or `fail` (→ Node 6, fail-safe).
- **Approved data fields:** generated text, source excerpt text (both already non-secret).
- **Prohibited data fields:** none new.
- **Branch conditions:** flag `fail` if the generated text contains a capitalized multi-word noun phrase that does not appear in the supplied excerpts and is not a generic term (e.g., "Sassoon General Hospital" would fail if not present in SRC-001–SRC-005; "the official UDID portal" would pass, since that phrase is itself in the sources).
- **Failure behaviour:** on `fail`, discard Node 5's output entirely and use Node 6's fixed fail-safe text instead — never show the user a partially-hallucinated answer.
- **Source-grounding rule:** this node **is** a grounding-enforcement point, not just a rule reference.
- **Unpublished/disabled state requirement:** same as Node 1. **Build-time note:** the exact matching logic (regex/entity-list check vs. a second constrained LLM call) is left to build time — this manifest specifies the requirement and its position in the flow, not a finished algorithm.

## Node 6 — Fixed Fail-Safe Branch
*Revised in this revision — resolves REVIEW-FINDINGS.md items 4 and 12 (Codex #3 / Antigravity §3.4): the optional translation call is removed, and the exact text is now pointed at a single canonical source instead of being restated with variations.*
- **Purpose:** Return the exact fail-safe message — see `D1.3a-workflow-spec.md` §5 for the single authoritative (CEO-pending-approval) text. **Do not restate or paraphrase that text in any other file; reference it by pointer.**
- **Input:** Session state (for the FR-9 disclosure prefix only).
- **Output:** FR-9 disclosure sentence + the fixed fail-safe text from `D1.3a-workflow-spec.md` §5, verbatim, in English only for this skeleton (see `REVIEW-FINDINGS.md` item 4 — multi-language fail-safe is an open item, not solved with an on-the-fly LLM translation call, which would reintroduce exactly the risk this branch exists to prevent).
- **Approved data fields:** none beyond the static text.
- **Prohibited data fields:** none.
- **Branch conditions:** entered from Node 4's `not-grounded` path, Node 5b's `fail` path, or Node 5's error path.
- **Failure behaviour:** this branch has no further failure path.
- **Source-grounding rule:** this branch must **never** call Gemini or any LLM — static text only, by construction.
- **Unpublished/disabled state requirement:** same as Node 1.

## Node 6b — Escalation Response (new in this revision)
*Added to resolve REVIEW-FINDINGS.md item 10.*
- **Purpose:** Respond to an escalation signal (Node 1b) with the verified escalation route.
- **Input:** Session state (for language/stage context only).
- **Output:** FR-9 disclosure + the verified escalation route text, sourced only from SRC-002 (Maharashtra State Commissioner for Persons with Disabilities contact) — i.e., "district social welfare office → State Commissioner for Persons with Disabilities," worded per `PRD.md` FR-5, with the exact SRC-002 contact details. Ends with the mandatory closing line.
- **Approved data fields:** SRC-002's already-Reviewed contact details (office name, address, phone, email — all already public/non-secret).
- **Prohibited data fields:** none.
- **Branch conditions:** entered only from Node 1b's `escalation` path.
- **Failure behaviour:** if the user's state is not Maharashtra (no escalation source Reviewed for other states), fall back to Node 6's fixed fail-safe instead of guessing an escalation route.
- **Source-grounding rule:** SRC-002 only; must never invent an escalation contact for an unreviewed state.
- **Unpublished/disabled state requirement:** same as Node 1.

## Node 6.5 — Field Whitelist (Set/Edit Fields) — new in this revision
*Added to resolve REVIEW-FINDINGS.md item 6 (Antigravity §2.2): nothing previously enforced, by construction, that only six fields reach the Sheet.*
- **Purpose:** Immediately before logging, explicitly construct a new item containing **only** the six approved fields, discarding everything else (including the session key/chat ID) by construction rather than by convention.
- **Input:** Whatever fields are present after Node 5/5b/6/6b (may include session key, raw answers, generated text).
- **Output:** An item with exactly these six keys: `timestamp, state, disability_type, stage, next_reminder, language`.
- **Approved data fields:** the six listed above.
- **Prohibited data fields:** everything else — this node's entire purpose is to drop it, explicitly (an n8n "Edit Fields / Set" node in "keep only set fields" mode, not "merge" mode).
- **Branch conditions:** N/A.
- **Failure behaviour:** if a required field is missing, log an empty string for that field rather than omitting the column or blocking the append.
- **Source-grounding rule:** N/A.
- **Unpublished/disabled state requirement:** same as Node 1.

## Node 7 — Google Sheets Append-Row (now non-blocking / parallel to Node 8)
*Revised in this revision — resolves REVIEW-FINDINGS.md item 8 (Codex #8 / Antigravity §3.6): logging no longer sits inline before the user-facing response.*
- **Purpose:** Log exactly six anonymised fields per completed interaction.
- **Input:** Node 6.5's whitelisted six-field item.
- **Output:** Appended row in `UDID_Guide_Logs` (see `sheets-field-mapping.md`).
- **Approved data fields:** `timestamp, state, disability_type, stage, next_reminder, language`.
- **Prohibited data fields:** everything Node 6.5 already dropped — chat ID, name, phone, address, Aadhaar, free-text health data, API keys, credentials.
- **Branch conditions:** runs in parallel with Node 8 (both fire from the same point after Node 5/5b/6/6b complete), not serially before it.
- **Failure behaviour:** if the Sheets append fails, this must not affect Node 8 at all, since the two are parallel branches, not a sequential chain — this is now a structural guarantee, not a documented intention.
- **Source-grounding rule:** N/A.
- **Unpublished/disabled state requirement:** Google Sheets credential/OAuth selector must remain **empty** at this build stage.

## Node 8 — Telegram Response
- **Purpose:** Send the numbered guidance (Node 5, post-5b-pass), fail-safe text (Node 6), or escalation text (Node 6b) back to the user.
- **Input:** Generated text from Node 5 (post-guardrail), Node 6, or Node 6b.
- **Output:** Telegram message to the originating chat ID.
- **Approved data fields:** response text; chat ID (delivery routing only, not logged — enforced structurally by Node 6.5 sitting only in the Node 7 branch, never the Node 8 branch).
- **Prohibited data fields:** none new.
- **Branch conditions:** fires immediately once Node 5/5b, Node 6, or Node 6b produces output — no longer waits on Node 7.
- **Failure behaviour:** if Telegram delivery fails, no retry loop that could spam the user.
- **Source-grounding rule:** N/A — delivers already-grounded, already-fail-safe, or already-escalation text; must not alter content.
- **Unpublished/disabled state requirement:** Telegram bot-token credential selector must remain **empty** at this build stage.

## Node 9 — Wait / Reminder-Offer Branch
*Revised in this revision — resolves REVIEW-FINDINGS.md item 9 (Codex implicit / Antigravity §3.1): `next_reminder` now logs what was offered, at the time it was offered, not a later "accepted" state the append-row node could never observe.*
- **Purpose:** After a configurable interval (two minutes for the demo/test case), send a next-step reminder **offer** message.
- **Input:** Session state (current stage), user's language.
- **Output:** A draft/offer reminder message, per `PRD.md` §11 — draft-only until delivery is independently verified per Hathcon Test 3. **The offer text itself is what gets logged in `next_reminder` (Node 6.5), at guidance-generation time — not a later acceptance state.**
- **Approved data fields:** stage, language, the offer text.
- **Prohibited data fields:** none new.
- **Branch conditions:** fires after Node 8, on the guidance path only (not after Node 6b escalation, and not after Node 6 fail-safe, unless the Product Owner decides otherwise later).
- **Failure behaviour:** if the wait node's timer fails to fire, no reminder is sent — never misreport this as "reminder scheduled."
- **Source-grounding rule:** N/A.
- **Unpublished/disabled state requirement:** same as Node 1; must not be tested live until CEO authorizes Hathcon Test 3.

## Node 10 — Webhook / Shared-Workflow Entrypoint (reserved for the future website)
*Revised in this revision — resolves REVIEW-FINDINGS.md item 13 (Antigravity §3.3): added the missing response node and clarified the session-key difference.*
- **Purpose:** Provide a second entry point into the identical logic (Nodes 2–9), so the website consumes the same workflow rather than a duplicate copy, per `Architecture.md` §28.
- **Input:** HTTP POST from the (not-yet-built) website frontend, carrying a `sessionId` (a website-generated UUID, **not** a Telegram chat ID) plus the current turn's answer.
- **Output:** Same numbered guidance / fail-safe / escalation text as the Telegram path, returned via an explicit **Respond-to-Webhook** node (not previously specified) as an HTTP response.
- **Approved data fields:** same five-question answers as the Telegram path; `sessionId` as the website's session key (analogous role to chat ID, same prohibition on reaching Node 6.5/7).
- **Prohibited data fields:** same prohibited list as Node 6.5, plus no website session cookie/identifier written to the Sheet.
- **Branch conditions:** shares Nodes 2–9's branch logic; only the entry/exit transport differs (HTTP vs. Telegram), and Node 8's Telegram-specific delivery is replaced by the Respond-to-Webhook node for this path.
- **Failure behaviour:** same as Node 5/6/6b/8 — safe fixed message, never a raw error.
- **Source-grounding rule:** identical to Node 4/5/6/6b — no separate or looser grounding rule for the website path.
- **Unpublished/disabled state requirement:** webhook node may exist in the canvas as a reserved/disabled entry point; must not be exposed publicly until the website itself is built and this workflow is fully reviewed and CEO-approved for activation.

---

## Cross-Cutting Requirements (apply to every node above)
1. **No credential selector may be filled in** at this build stage (Nodes 1, 5, 7, 8, 10).
2. **The workflow must remain unpublished/inactive** in n8n's toggle at all times during this phase.
3. **No node may be executed, tested, or "pinned" with live data** during this phase.
4. **No new source of truth is introduced** — every grounding decision traces back to `docs/SOURCES.md`; every fixed-message decision traces back to `D1.3a-workflow-spec.md` §5 (fail-safe) or `PRD.md`/`RULES.md` (everything else).
5. **Every finding in `REVIEW-FINDINGS.md` marked "Resolved" is reflected in this manifest; items marked "Disclosed, not resolved" or "Still-open" remain genuinely open — this manifest does not silently claim completeness it does not have.**
