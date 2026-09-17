# Problem & Solution Explainer (Draft) — Sugamya Sahayak

**Status:** Draft, built only from evidence already verified elsewhere in this repository (`docs/SUBMISSION.md`, `docs/submission_evidence.md`, `docs/SOURCES.md`). Intended to become the 1–3 page PDF/doc required in the Google Drive folder (`docs/submission_assets/drive_folder_plan.md`) — not yet exported to PDF or placed in any folder.

---

## The Problem

Applying for a Disability Certificate or UDID (Unique Disability ID) card in India requires navigating a multi-step process: online portal registration, referral to a medical authority, document submission, assessment, and issuance. There is no single point of plain-language guidance — applicants and their families often don't know which medical authority to approach, what documents are required, or where to escalate if the process stalls.

**Who it's for:** a person with a disability, or their family member/caregiver, applying for a Disability Certificate or UDID card — with genuinely verified guidance coverage today for the national UDID process plus Maharashtra state-level escalation contacts (`docs/SOURCES.md`, SRC-001–SRC-005).

## The Solution

**Sugamya Sahayak** is a Telegram-based guide that asks five short questions (state/district, disability type, who it's for, UDID registration status, preferred language) and returns step-by-step guidance grounded only in officially reviewed government sources — never inventing a fact outside them, and safely deferring ("check the official portal") when a question falls outside verified coverage.

**Live-verified capabilities** (n8n workflow `gXPlaislJyNuqJSd`, tested 2026-09-16 and used by a real trial contact 2026-09-17):
- Five-question guided flow, no repeats or skips.
- Source-grounded final answer citing SRC-001–SRC-005, with a mandatory closing disclosure line.
- Escalation routing: off-script or sensitive input is caught by a keyword interrupt and routed to a fixed, safe fallback response instead of the AI.
- Mid-conversation language switching (live-verified English → Hinglish).

**Public link:** `https://t.me/MUKKUM13_BOT`

## Where AI Does the Heavy Lifting

The core AI step is a Google Gemini-based grounded-response agent (Node 5, "Grounded Response Agent"), restricted to the five sources reviewed and registered in `docs/SOURCES.md`. This differs from a fixed decision-tree because applicants ask follow-up questions in their own words and can switch languages mid-conversation — a rules table cannot parse free-form natural language input or distinguish a genuine escalation request from a routine question the way the AI agent plus the keyword-interrupt node do together.

## Honest Disclosure — What Is Not Yet Proven or Built
- No controlled before/after timing study exists — we do not claim a quantified time-savings figure.
- The web UI (`index.html`) is offline reference content only, honestly labeled throughout — it is not connected to a live AI backend.
- Google Sheets anonymised logging and the Telegram reminder feature are not built (deferred by explicit product decision).
- District-level hospital/medical-board detail is not yet covered — only the national process and Maharashtra state-level escalation are verified.
- Exactly one informal trial contact (a social worker) has used the live bot and given positive feedback; this is genuine consultation evidence but not a completed independent review.

*A small diagram (five-question flow → grounded answer / escalation fallback) can be added here once this explainer is laid out for PDF export — not created in this pass, since no diagramming tool output was requested.*
