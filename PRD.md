# PRD.md — Product Requirements Document
**Project:** Disability Certificate & UDID Guide (Be10x Build for Good — Project 14, "Those Who Served & Access" track)
**Status:** Draft — Gate 0 (Documentation Baseline)
**Version:** 0.1
**Owner:** CTO (AI), under Product Owner Mukesh Saxena
**Last verified date:** 2026-09-12 (Asia/Calcutta)

---

## 1. Problem Statement
Applying for an Indian disability certificate and a UDID (Unique Disability ID) card requires navigating a process that varies by state and district: specific empanelled hospitals/medical boards, different forms, and sequential follow-up steps. There is no single, plain-language, state-aware guide. Many applicants abandon the process midway because they do not know what to do next, what to carry, or where to escalate when stuck.

## 2. Target User (named category)
- **Primary:** A person with a disability, or their family member/caregiver, who is starting or midway through applying for a disability certificate and/or UDID card in India.
- **Secondary:** A caregiver applying on behalf of someone else (parent, spouse, adult child).
- No real named individual has been interviewed for Version 1. This is an **assumption**, not a verified consultation — see `docs/SOURCES.md` and Section 15 (Known Assumptions).

## 3. Real-World Scenario (per hackathon "finished thing" example)
> "I need a disability certificate for my son, locomotor disability, in Maharashtra." The guide walks her through the numbered steps from UDID registration to the medical board appointment, and offers a reminder for the next step and a "Stuck?" escalation path.

## 4. Product Objective — updated to hybrid channel model, 2026-09-12 16:05:00 Asia/Calcutta
**CEO decision (`MEMORY.MD` Entry 020, `Architecture.md` §28):** the product is one shared guide workflow reachable through two mandatory channels — **Telegram** (required primary operational entrypoint, matching the official Project 14 template) and a **public website** (the Product Owner's separate mandatory requirement). Both must run the identical five-question flow, grounding rules, fail-safe, and escalation logic — neither is a fallback or reminder-only channel for the other.

Deliver a small, fully working, production-grade guide, reachable via Telegram and a website, that:
1. Asks five fixed questions, one at a time.
2. Returns a numbered, source-grounded action path.
3. Offers an escalation route when the user is stuck.
4. Responds in the user's named language.
5. Offers (but does not falsely claim to schedule) a reminder for the next step.
6. Logs only anonymised, non-identifying usage data.
7. Never makes a medical, legal, or eligibility decision.

## 5. Supported Geography — Version 1
Limited strictly to states/districts and disability types for which an **official, reviewed source document** exists in `docs/SOURCES.md` at time of answering. For any other state/district/disability type, the product must say explicitly that it could not verify the information and direct the user to the official UDID portal (swavlambancard.gov.in) or their district social welfare office, per the Grounding Rules. No pan-India coverage is claimed.

## 6. Functional Requirements
| ID | Requirement |
|----|-------------|
| FR-1 | Ask one unanswered question at a time, in this fixed order: (1) state & district, (2) disability type, (3) applicant relationship (self/other), (4) UDID registration status, (5) preferred language. Never re-ask an answered question. |
| FR-2 | Ground every process answer only in documents reviewed and registered in `docs/SOURCES.md`. |
| FR-3 | Return a numbered path; each step states: what to do, where to do it, what to carry, what happens next. |
| FR-4 | Use short, simple sentences in the language the user named. |
| FR-5 | On "I'm stuck" (or equivalent), return the verified escalation route from Project Knowledge (district social welfare office → State Commissioner for Persons with Disabilities), only if and as supported by sources. |
| FR-6 | End every completed guidance response with: "You are doing the right thing. Take it one step at a time." |
| FR-7 | Offer a reminder for the next step. In Claude-only / no-integration mode, prepare reminder text but do not claim it was scheduled. If a real reminder integration is connected, obtain exact date, time, and timezone before creating it, and only report success after verifying delivery. |
| FR-8 | Maintain an anonymised usage log: timestamp, state, disability type, current stage, next reminder (if any), language. No names, phone numbers, addresses, or health details. |
| FR-9 | State clearly, before or alongside guidance, that the product gives process guidance only — not medical diagnosis, medical advice, disability assessment, eligibility determination, legal advice, or official approval. |
| FR-10 | Fail safely: when information is absent, outdated, contradictory, or unsupported, say exactly what could not be verified and point to the official UDID portal or district office. Never invent hospital names, addresses, forms, fees, appointment slots, processing times, or eligibility/percentage outcomes. |

## 7. Non-Functional Requirements
- **Accessibility:** WCAG 2.1 AA practical target — keyboard operable, labeled controls, visible focus, adequate contrast (see `design.md`).
- **Responsiveness:** mobile-first, works on common low-end Android browsers.
- **Privacy:** no personal or medical data retained beyond the anonymised log fields in FR-8.
- **Security:** secrets server-side only; input validation; rate limiting; no exposure of internal prompts/system messages.
- **Reliability:** graceful failure on AI, storage, or reminder-service outage — user sees a clear, safe message, never a raw error or a fabricated answer.
- **Maintainability:** smallest stable stack; documented setup reproducible from a clean environment.
- **Cost:** free-tier tools only unless the CEO (Product Owner) explicitly approves a paid tier.

## 8. User Journey (either channel — see `Architecture.md` §28 for why both must match exactly)
**Telegram (primary):** 1. User messages the bot. 2–6. Same five-question, guidance, reminder, and escalation flow as below, entirely inside the Telegram chat. 7. Anonymised log entry written containing only the FR-8 fields; the chat ID is used solely as an in-flight routing key during the conversation and is never included in the log entry itself, and never phone number or name either. *(Corrected 2026-09-12 20:45:00 Asia/Calcutta — the prior wording, "keyed to chat ID," contradicted RULES.md §8's personal-data prohibition; see `docs/automation/REVIEW-FINDINGS.md` item 7.)*
**Website (mandatory public interface):**
1. User opens the deployed URL.
2. Product asks Question 1 (state & district). User answers.
3. Product asks Questions 2–5 in order, one at a time, never repeating an answered question.
4. Product returns a numbered, grounded action path in the requested language, ending with the mandatory closing line.
5. Product offers a next-step reminder (text only, unless a verified integration exists).
6. If the user says they are stuck at any point, product returns the verified escalation route.
7. An anonymised log entry is written (FR-8 fields only).

## 9. The Five-Question Conversation (fixed order, one at a time)
1. State and district
2. Type of disability
3. Whether the application is for the user or someone else
4. Whether UDID portal registration is complete
5. Preferred response language

## 10. Response Format
Numbered list. Each numbered step contains: **what to do**, **where to do it**, **what to carry/prepare**, **what happens next**. Short sentences. Language = the one named by the user. Closing line is mandatory and verbatim: "You are doing the right thing. Take it one step at a time."

## 11. Reminder Requirement
- Claude-only mode: draft reminder text; explicitly tell the user no reminder has actually been scheduled.
- With a verified integration: collect exact date/time/timezone, create the reminder, and only report it as scheduled once delivery is verifiable (see Hathcon Test 3: a real message must arrive).
- Never claim delivery without verification.
- **2026-09-12 16:05:00 update:** the verified integration is concretely **Telegram** (n8n delay/wait node → Telegram message back to the same chat) per `Architecture.md` §28.3 item 7 — this is no longer an abstract "if connected" case.

## 12. Escalation Requirement
Triggered by user signaling they are stuck. Route: only what is supported by Project Knowledge documents — normally district social welfare office, then State Commissioner for Persons with Disabilities — stated only when a reviewed source confirms it for that state.

## 13. Local-Language Requirement
Respond in the language named by the user (e.g., Hindi, Marathi, English). Do not guess a "local language" generically — use the name the user gave (per hackathon Prompting Rule 5).

## 14. Anonymised Logging Requirement
Fields only: timestamp, state, disability type, current stage, next reminder, language. No name, phone, address, ID numbers, or free-text health/medical narrative may be stored.

## 15. Human-in-the-Loop Requirement
The product never makes a final medical, financial, legal, or eligibility decision. It drafts, sorts, reminds, and suggests. A human (the applicant, a doctor, a medical board, an official) approves or decides. This must be visible in the product copy (see `design.md` Safety and human-approval copy).

## 16. Acceptance Criteria
- All 10 functional requirements (FR-1…FR-10) demonstrably work in the deployed vertical slice.
- The three mandatory Hathcon test cases pass (see `docs/TESTING.md`).
- No fabricated hospital names, offices, forms, fees, timelines, or eligibility outcomes appear in any response.
- Escalation and reminder behavior match Sections 11–12 exactly.
- Anonymised log contains only the FR-8 fields — verified by inspection.

## 17. Non-Goals
User accounts, social/community features, general-purpose chatbot scope, payments, medical-record or Aadhaar storage, document-upload processing, diagnosis/percentage calculation, automatic eligibility decisions, unverified pan-India coverage, decorative animation, or duplicate implementations of the same feature. (Full list: `RULES.md` §5.)

## 18. Constraints
- One person, one project, one track (Hathcon rule).
- Free-tier tools only unless CEO approves otherwise.
- Three-day build window (12–14 Sep 2026 feature freeze), per `Phases.md`.
- Dummy data only in all demonstrations; no real names, phone numbers, addresses, or health details.

## 19. Dependencies
- Official UDID/state government source documents (see `docs/SOURCES.md` — **currently empty; this is a blocking dependency**).
- An LLM provider (Claude API or Gemini, free tier).
- A hosting/deployment target (free tier).
- Optionally: a reminder-delivery channel (Telegram bot, email, or equivalent) if Gate 2 reminder verification is to be attempted.

## 20. Known Assumptions
- No real user or organisation has been interviewed for this build; the **+5 bonus** for NGO/affected-person involvement (corrected weighting, `RULES.md` §1 row 9, verified against `Project_Disability_certificate_guide/Project_details.docx`) currently rests on the hackathon's own problem framing, not on direct consultation. This is flagged, not hidden.
- Version 1 will likely cover only one or two states/districts for which official sources can be sourced and reviewed within the 3-day window.
- **Corrected 2026-09-13:** no "Route B (Claude Project)" fallback mechanism exists in the verified source document; the earlier reference to it here has been removed. See `RULES.md` §1a for a separate, still-unresolved track-vs-domain question this same document review surfaced (the project must declare one of AI Automation / AI Agent / Product Build as its track).

## 21. Success Metrics
- Vertical slice deployed and reachable by a public URL (Gate 1).
- All 3 mandatory Hathcon tests pass with recorded evidence (Gate 2/4).
- Zero occurrences of fabricated fact in a fixed test-question set (tracked in `docs/TESTING.md`).
- A non-technical person (per `README.md` operator instructions) can run a demo unaided.

## 22. Definition of Done
See `RULES.md` §"Definition of acceptable completion" and root instruction Section 12 (Definition of Done) — this PRD is satisfied only when every item there is verified with evidence in `MEMORY.MD` and `docs/TESTING.md`.

## 23. Traceability to Hathcon Requirements
See `RULES.md` — Hathcon Compliance Matrix. Every FR above is mapped to at least one Hathcon rule/source line and one test in `docs/TESTING.md`.
