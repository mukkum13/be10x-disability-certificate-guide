# Google Sheets Field-Mapping Artifact — `UDID_Guide_Logs`
**Status:** Sheet created 2026-09-12 (this session, via connected Google Drive tool). No n8n node yet connects to it. Written up 2026-09-12 20:20:00 Asia/Calcutta.

## Sheet Identity
- **Title:** `UDID_Guide_Logs`
- **File ID:** `1cZPdkPI3jyPHN8nRjFwKJDzq-sREsCi4GuzhR9k630M`
- **URL:** `https://docs.google.com/spreadsheets/d/1cZPdkPI3jyPHN8nRjFwKJDzq-sREsCi4GuzhR9k630M/edit`
- **Owner:** `mukku.m13@gmail.com`

## Row 1 — Exact Headers (verified by read-back after creation)
**Revised 2026-09-12 20:45:00 Asia/Calcutta after independent review (`REVIEW-FINDINGS.md` items 5 and 9) — see notes below each changed column.**

| Column | Header | Type | Source of truth |
|---|---|---|---|
| A | `timestamp` | ISO 8601 or equivalent, Asia/Calcutta | `PRD.md` FR-8 |
| B | `state` | **Closed-choice value** (selected from the Node 3 state/UT inline-keyboard list, per Q1) — no longer free text | `PRD.md` FR-8, FR-1 Q1; `n8n-build-manifest.md` Node 3 |
| C | `disability_type` | **Closed-choice value** (selected from the Node 3 RPwD-Act-category inline-keyboard list, per Q2) — no longer free text | `PRD.md` FR-8, FR-1 Q2; `n8n-build-manifest.md` Node 3 |
| D | `stage` | Enum: which point in the flow the log entry represents (`"guidance-given"`, `"fail-safe-given"`, `"escalation-given"`) | `PRD.md` FR-8 |
| E | `next_reminder` | Free text or blank — **the reminder OFFER text at the time it was made**, not a later "accepted" state (a Sheets append-only row cannot observe a later acceptance without an update step this skeleton does not yet build — see `REVIEW-FINDINGS.md` item 9); never a claim of scheduled/delivered reminder unless independently verified (`PRD.md` §11) | `PRD.md` FR-8, §11 |
| F | `language` | Closed-choice value (selected from Node 3's supported-language list, per Q5) | `PRD.md` FR-8, FR-1 Q5 |

**Why B and C changed from free text to closed-choice:** the original free-text design let a user's raw answer (which could contain an embedded address, phone number, or health narrative) flow straight into these columns. Constraining Q1/Q2 to inline-keyboard selection in `n8n-build-manifest.md` Node 3 removes that channel structurally, rather than relying on a filter to catch it after the fact.

## Fields That Must NEVER Appear in Any Row (hard prohibition, per `RULES.md` §8 and CEO directive item 5)
- chat ID (Telegram or website session identifier)
- name
- phone number
- postal address
- Aadhaar number or any government ID number
- free-text health/medical narrative
- API keys, tokens, or any credential material
- applicant relationship (self/other) or UDID registration status — these are used to drive the conversation but are **not** among the six approved log fields; they must not be added as extra columns without a CEO-approved change to `PRD.md` FR-8 first

## Mapping From Workflow to Sheet (via Node 6.5's whitelist, then Node 7, per `n8n-build-manifest.md`)
```
timestamp        ← workflow run timestamp (Asia/Calcutta)
state             ← session_state.answers.stateDistrict (closed-choice selection, state portion only)
disability_type   ← session_state.answers.disabilityType (closed-choice selection)
stage             ← "guidance-given" | "fail-safe-given" | "escalation-given" (set by whichever branch — Node 5/5b pass, Node 6, or Node 6b — completes)
next_reminder     ← the Node 9 reminder-OFFER text, logged at guidance-generation time (blank if the guidance/fail-safe/escalation branch has no reminder step, e.g. escalation and fail-safe paths)
language          ← session_state.answers.language (closed-choice selection)
```
**Node 6.5 (new — see `n8n-build-manifest.md`) sits directly before this mapping and explicitly constructs an item with only these six keys, dropping the session key (chat ID/sessionId) and everything else by construction.**

## Verification Performed This Session
1. Sheet created via the connected Google Drive tool (`create_file`, `application/vnd.google-apps.spreadsheet`).
2. Content independently read back via `download_file_content` (CSV export) and base64-decoded: confirmed exact string `timestamp,state,disability_type,stage,next_reminder,language` in row 1, no other rows present.
3. No n8n node has been connected to this Sheet yet — this mapping is a specification for the future Node 7 build, not a live integration.
