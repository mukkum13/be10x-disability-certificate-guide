# docs/SUBMISSION.md — Submission Truth
**Status:** Draft — Gate 1. Nothing below is final; fields are placeholders until Gate 4. No consultation or testing evidence is claimed until it genuinely occurs (root instructions: "Do not invent consultation or testing evidence").
**Last updated:** 2026-09-13 (Asia/Calcutta) — **substantially rewritten** after deep analysis of `Project_Disability_certificate_guide/Project_details.docx` (the actual Be10x "Build for Good" participant handbook, extracted and read in full 2026-09-13). The previous version of this file described a submission mechanism (a single "Working Website URL," a "Backup URL," an exact-second 3-minute pitch timing) that does not match this source document and has been corrected — see `MEMORY.MD` for the correction entry and `RULES.md` §1a for a related track/domain conflict this same review surfaced.

**Deadline reconciliation (2026-09-16, CEO instruction):** a new **internal CEO deadline of 2026-09-18** has been set (see `Phases.md` §"Timeline Reconciliation"). This is separate from and earlier than the external Hathcon submission deadline below (2026-09-20 11:59 PM, unaffected). Treat 2026-09-18 as the internal target for having the product, evidence, and submission materials ready, with the two remaining days as buffer before the firm external deadline.

**Mandatory timestamp rule (CEO decision, 2026-09-12 13:46:24 Asia/Calcutta):** every entry filled into this file at Gate 4 must carry exact `YYYY-MM-DD HH:mm:ss Asia/Calcutta` timestamps for when the underlying activity (test, video recording, consultation) actually occurred.

**Active risk tracked here (CEO instruction, 2026-09-12 13:46:24 Asia/Calcutta):** no real user/NGO consultation has occurred as of this update. A hard deadline of **2026-09-19 18:00:00 Asia/Calcutta** has been set to secure genuine consultation evidence (tracked as task `CONSULT-1` in `Phases.md`) — relevant to the **+5 bonus** (see `RULES.md` §1 row 9, corrected weights), not a base scoring category. This will be disclosed honestly at submission regardless of outcome.

**Deadline (verified against source document):** 20 September 2026, 11:59 PM — firm. "Extremely unlikely" to be extended.

**Track (unresolved — see `RULES.md` §1a, Pending CEO Decision #2):** the Google Form requires selecting exactly one of **AI Automation / AI Agent / Product Build**. Not yet declared for this project. "Those Who Served & Access" is the project's *domain* (theme), not the track field on the form.

## The Actual Submission Mechanism (per `Project_details.docx`, verified 2026-09-13)
**Unresolved source inconsistency (flagged 2026-09-13, not silently resolved):** the source document's own section heading reads *"The Submission Has Three Pieces"* ("Miss any one of them and your submission is incomplete"), but the body under that heading names only **two** items — "A Google Drive folder with a simple structure" and "A submitted Google Form" — before moving on ("Let's go through each."). No third piece is named anywhere in the section. This is recorded as a genuine inconsistency in the source document itself, not resolved by assuming a missing third item or silently treating it as "two pieces." Both described pieces are detailed below; if a third, unnamed piece exists, it has not been identified from this source.

### Piece 1 — A Google Drive folder
Named `"[Your Name] – Build for Good Submission"`, shared with **General access = "Anyone with the link," role = Viewer**, and tested in an incognito window before submitting (the document calls this "the #1 failure point"). Contains:
1. **Problem & Solution Explainer (mandatory):** a single PDF, Word doc, or short deck, 1–3 pages — problem on top, who it helps, solution below, a small diagram if available.
2. **Screen Recording (mandatory):** the demo video (see Video section below) — real input going in, real output coming out, in one take.
3. **Project Files (optional but recommended):** n8n workflow export (JSON), a copy of the Google Sheet with dummy data, a link to the live site if one was built, screenshots.

### Piece 2 — A Google Form
Fields: email and phone number; project title and track (Automation / Agent / Product); the 3 main questions (below); the Drive folder link; a confirmation checkbox, then Submit. **No confirmation email is sent** — "Your response has been recorded" on screen is the only confirmation; screenshot it.

**The 3 Main Questions (answer these directly, not paraphrased):**
- **Q1. What real problem are you solving?** Be specific. Name the user. Describe the pain. Quantify if possible.
- **Q2. Who is the problem for?** A specific community, profession, or situation — narrow is fine.
- **Q3. How does your solution use AI?** Describe the AI step, the tool/model, and why a non-AI version would fall short.

## Video Recording
**Length:** the source document states two different figures in two different sections — "3 to 5 minutes" (Drive-folder section) and "5 to 10 minutes" (dedicated Video Recording section). Both are recorded here honestly rather than silently picking one; **treat 10 minutes as the hard ceiling** ("going over 10 minutes" is explicitly listed as a common mistake). Camera on strongly recommended. Language: English or Hindi.

**Structure (per the source document, not an invented exact-second breakdown):**
1. Quick intro (name, background, one line)
2. The problem (who has it, what it costs them today)
3. Walk through the solution end to end — live, on real (dummy) input
4. Where AI is doing the heavy lifting
5. The impact line (e.g., "this turns 4 hours into 3 minutes")

**Common mistakes to avoid (verbatim from source):** going over 10 minutes; explaining the tool instead of showing the solution; reading from a script robotically; skipping the impact line; using real names/phone numbers/health details (dummy data only); not rehearsing once before recording.

## Website Hosting (only if a website is built)
Must be live on the public internet — localhost doesn't count. Lovable/Emergent publish with one click; free alternatives (Netlify, Vercel, GitHub Pages) also work. No domain purchase needed. Test by sending the link to someone on a different network.

## Problem Statement (this project)
Applying for a disability certificate and UDID card in India spans specific hospitals, state-varying forms, and sequential follow-ups with no centralized guidance; many applicants abandon the process midway.

## Answers to the 3 Form Questions (finalized 2026-09-17, evidence-based — see `docs/submission_evidence.md` for the full claim-to-evidence map)

- **Q1. What real problem are you solving?** Applying for a Disability Certificate or UDID (Unique Disability ID) card in India means navigating a multi-step process — online portal registration, referral to a medical authority, document submission, assessment, and issuance — with no single point of plain-language guidance. Applicants and their families frequently don't know which medical authority to approach, what documents are required, or where to escalate if the process stalls (e.g., "I am stuck at the hospital"). Sugamya Sahayak is a Telegram-based guide, **live-verified working** (five-question guided flow, source-grounded final answer, escalation routing, mid-conversation language switch — all tested directly against the live workflow on 2026-09-16, and used successfully by a real trial contact on 2026-09-17), that gives step-by-step guidance grounded only in officially reviewed government sources. **Honest disclosure:** we have not run a controlled before/after study, so we do not claim a quantified time-savings figure (e.g., "X hours become Y minutes") — that would require broader user testing we have not conducted.
- **Q2. Who is the problem for?** A person with a disability, or their family member/caregiver, applying for a Disability Certificate or UDID card — currently with genuinely verified guidance coverage for the national UDID process plus Maharashtra state-level escalation contacts (per `docs/SOURCES.md`, SRC-001–SRC-005); district-level hospital/medical-board detail is an acknowledged gap, not fabricated. One real social worker in this category — someone who supports clients/families through this process — tried the live Telegram bot on 2026-09-17 and reported, in informal written feedback exchanged through the bot itself, that it worked and expressed satisfaction. **This is genuine informal trial feedback from one contact, not a completed independent review** (`docs/independent_review_checklist.md` remains open for a genuinely independent reviewer).
- **Q3. How does your solution use AI?** The core AI step is a Google Gemini-based grounded-response agent (Node 5, "Grounded Response Agent," in the live n8n workflow `gXPlaislJyNuqJSd`), restricted to only the five sources reviewed and registered in `docs/SOURCES.md` (SRC-001–SRC-005) — it does not answer outside them, and the workflow routes to a fixed fail-safe response (Node 6b) for off-script, sensitive, or unsupported-location input instead of guessing. A non-AI, fixed rule-based flow would fall short here because applicants ask follow-up questions in their own words and can switch languages mid-conversation (live-verified English→Hinglish switch, 2026-09-16) — a decision tree cannot parse free-form natural language input or distinguish a genuine escalation request from a routine question the way the AI agent plus the keyword-interrupt node do together.

## Who Was Consulted
**None yet, as of 2026-09-13.** This is disclosed honestly rather than fabricated — that requirement comes from this project's own root instructions/`RULES.md`, **not from the handbook**. **Correction (2026-09-13):** the earlier version of this line falsely attributed a "10-point penalty ... for fabricated evidence" to the source document's FAQ. The handbook's actual −10 penalties are for (a) real personal data in the demo and (b) an unapproved final health/money/legal decision — it does **not** separately state a penalty for fabricated consultation evidence. That prohibition is this project's own discipline, not a quoted Hathcon rule, and must not be presented as one. See `RULES.md` §1 row 9 and `MEMORY.MD` Pending CEO Decision #1 for the plan to close or knowingly accept the consultation gap before 19 Sep 2026.

**Outreach status update (2026-09-17):** A consultation request was sent by the CEO/Product Owner to a social-worker contact via WhatsApp on 2026-09-17 at 3:28 PM IST. No name or phone number is recorded here, per privacy preference. **Status: awaiting response.** No consultation has occurred yet, and no feedback, approval, or independent review has been received. This entry will be updated once (and only once) a reply or conversation actually occurs.

**Controlled trial feedback (2026-09-17):** The social-worker contact tried the Telegram bot directly and provided written feedback through the bot itself at approximately 3:53 PM IST on 2026-09-17, during a controlled, CEO-authorized temporary publish of workflow `gXPlaislJyNuqJSd` (published and unpublished the same day; live-verified unpublished immediately after the trial). Feedback summary: the contact stated the bot worked and expressed satisfaction/appreciation. No name, phone number, chat ID, or other identifying detail is recorded here. **This is informal written trial feedback exchanged through the bot, not a completed independent-review checklist** — `docs/independent_review_checklist.md` remains unfilled and still requires a genuinely independent reviewer separate from this contact.

## What Was Built (finalized 2026-09-17, evidence-based)
- **Telegram bot (primary verified product channel):** n8n workflow `gXPlaislJyNuqJSd` ("My workflow 2") — 8 nodes (Telegram Trigger → Normalize Telegram Update → Escalation-Keyword Interrupt → [true] Escalation Response / [false] Grounded Response Agent with Google Gemini Chat Model + Window Buffer Memory sub-nodes → Output Delivery). **Live-verified** end-to-end: five-question guided flow, source-grounded final answer, escalation fallback, mid-conversation language switch (2026-09-16); one real informal trial by a social-worker contact (2026-09-17). Public link: `https://t.me/MUKKUM13_BOT`. The workflow is kept **unpublished** between authorized, controlled tests, per standing safety procedure.
- **Web UI (offline reference content, not the primary verified channel):** `index.html`/`app.js`/`styles.css` — a genuinely accessible (WCAG-oriented: skip link, ARIA live regions, high-contrast/font-size toggles, `prefers-reduced-motion` respected, all dynamic content HTML-escaped before insertion) 5-step wizard and chat panel. Its guidance is **pre-written local reference content**, honestly and visibly labeled "Offline Reference Content" throughout the UI — it is not connected to a live AI/grounding backend, and does not claim to be.
- **Reviewed source registry:** `docs/SOURCES.md`, 5 Reviewed sources (SRC-001–SRC-005) covering the national UDID process and Maharashtra state-level escalation; every factual claim in both channels traces to one of these.

## Three Required Tests & Evidence (Hathcon-mandatory test cases, per `docs/TESTING.md`)
1. Maharashtra / locomotor / not registered → **PASS** (n8n execution #18, 2026-09-16 17:21:33 — numbered, source-grounded answer, correct closing disclosure)
2. "Stuck at hospital" (escalation) → **PASS** (n8n execution #21, 2026-09-16 17:33:12 — escalation-keyword interrupt fired, routed to fixed fallback)
3. Two-minute reminder delivery → **Not implemented.** The reminder module (D2.4) was explicitly deferred by CEO decision; no draft or real reminder delivery exists. Disclosed honestly rather than fabricated.

(Full detail in `docs/TESTING.md`; full claim-to-evidence map in `docs/submission_evidence.md`.)

## Known Failures (finalized 2026-09-17, disclosed honestly)
- The web UI's backend endpoint (`https://n8n.mukkubuilds.com/webhook/disability-guide`) returns HTTP 404 — no such webhook node exists in the live workflow. The web UI is therefore offline reference content only, not a live AI channel, and is labeled as such everywhere in the UI. This is a deliberate, disclosed scope decision (CEO instruction, 2026-09-17), not a hidden bug.
- Anonymised Google Sheets logging (FR-8) does not exist in the live workflow. Deferred by explicit CEO decision.
- The Telegram reminder module (FR-7/D2.4) has not been built in any form (not even draft-only mode).
- Guidance coverage is limited to the national UDID process and Maharashtra state-level escalation; no district-level hospital/medical-board source has been found and Reviewed, so district-specific questions correctly fail safe rather than guess.
- No automated test suite exists (no `package.json`/test runner in this repository); verification to date has been manual/live, not CI-automated.
- Exactly one informal trial contact (a social worker) has used the live bot and given positive written feedback; this is not a completed independent review — `docs/independent_review_checklist.md` remains open.
- No clean-environment ("fresh clone") reproducibility check has been performed.

## Next Step
Submission material (this file, `docs/submission_evidence.md`, `docs/live_demo_runbook.md`) is now evidence-based and ready for CEO review. Remaining before actual submission: CEO decision on whether to pursue a second, genuinely independent reviewer for `docs/independent_review_checklist.md`; recording the demo video; assembling the Google Drive folder; and submitting the Google Form (see `Phases.md` "20 September 2026 — Submission Day Checklist").

## Who Can Operate It After the Event
Mukesh Saxena (Product Owner), following `README.md` and `docs/OPERATIONS.md` non-technical handover procedure.

## LinkedIn Post (encouraged, per source document — not scored, but "recruiters search for this stuff")
Not yet drafted. Source document's suggested structure: short intro naming the hackathon, the specific problem solved (one sentence), what was built and the tools used, one challenge + one thing learned, a screenshot/demo link, and the tag `@Be10X`.

## Final Mandatory Checklist
**Unresolved source inconsistency (flagged 2026-09-13, not silently resolved):** the source document labels this section *"The 7 non-negotiables. Screenshot this:"* but visibly lists only **six** checkbox items beneath that heading (quoted below in full, none omitted or merged). No seventh item appears anywhere near this list in the document. Recorded as a genuine inconsistency in the source, not corrected by inventing a seventh item or silently renumbering it as six.
- [ ] Video recording (5–10 min, in the folder)
- [ ] Problem & solution document (in the folder)
- [ ] Drive folder shared as "Anyone with link → Viewer" and tested in incognito
- [ ] Google Form submitted with the Drive link inside
- [ ] Dummy data everywhere — no real names, numbers, addresses, or health details
- [ ] Hosted website link (only if a website is built)

## This Project's Additional Internal Checklist (beyond the hackathon's own minimum)
- [ ] Working Telegram and/or website link included in the Drive folder's Project Files
- [ ] Three required Hathcon-style tests (`docs/TESTING.md`) passed with recorded evidence
- [ ] Known limitations disclosed honestly
- [ ] No medical/legal/financial final decision made anywhere in the product
- [ ] Track field on the Google Form matches whatever the CEO decides in `RULES.md` §1a Pending CEO Decision #2
- [ ] CEO has accepted the consolidated evidence

## Submission Status
**Updated 2026-09-17 (autonomous submission-readiness pass, CEO-authorized).** Submission material (Q1–Q3, What Was Built, Known Failures, Next Step) is now finalized and evidence-based, using only proven Telegram live-test results, n8n execution IDs, `docs/SOURCES.md`, the web UI's offline-labeled state, and the privacy-preserving social-worker trial record. **Still open before actual submission:** track field on the Google Form (`RULES.md` §1a, Pending CEO Decision #2), demo video, Google Drive folder assembly, Google Form submission, and a decision on whether to pursue a second, genuinely independent reviewer. See `docs/submission_evidence.md` for the full claim-to-evidence map and `docs/live_demo_runbook.md` for the controlled-demonstration procedure if the CEO authorizes a live demo recording.

**Prior status (2026-09-13, superseded by the above):** `docs/SOURCES.md` had 5 Reviewed sources; the reviewed-source-retrieval design was documented; workflow build was still in progress with nodes unconnected. Preserved here for history, not current.
