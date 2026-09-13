# docs/SUBMISSION.md — Submission Truth
**Status:** Draft — Gate 1. Nothing below is final; fields are placeholders until Gate 4. No consultation or testing evidence is claimed until it genuinely occurs (root instructions: "Do not invent consultation or testing evidence").
**Last updated:** 2026-09-13 (Asia/Calcutta) — **substantially rewritten** after deep analysis of `Project_Disability_certificate_guide/Project_details.docx` (the actual Be10x "Build for Good" participant handbook, extracted and read in full 2026-09-13). The previous version of this file described a submission mechanism (a single "Working Website URL," a "Backup URL," an exact-second 3-minute pitch timing) that does not match this source document and has been corrected — see `MEMORY.MD` for the correction entry and `RULES.md` §1a for a related track/domain conflict this same review surfaced.

**Mandatory timestamp rule (CEO decision, 2026-09-12 13:46:24 Asia/Calcutta):** every entry filled into this file at Gate 4 must carry exact `YYYY-MM-DD HH:mm:ss Asia/Calcutta` timestamps for when the underlying activity (test, video recording, consultation) actually occurred.

**Active risk tracked here (CEO instruction, 2026-09-12 13:46:24 Asia/Calcutta):** no real user/NGO consultation has occurred as of this update. A hard deadline of **2026-09-19 18:00:00 Asia/Calcutta** has been set to secure genuine consultation evidence (tracked as task `CONSULT-1` in `Phases.md`) — relevant to the **+5 bonus** (see `RULES.md` §1 row 9, corrected weights), not a base scoring category. This will be disclosed honestly at submission regardless of outcome.

**Deadline (verified against source document):** 20 September 2026, 11:59 PM — firm. "Extremely unlikely" to be extended.

**Track (unresolved — see `RULES.md` §1a, Pending CEO Decision #2):** the Google Form requires selecting exactly one of **AI Automation / AI Agent / Product Build**. Not yet declared for this project. "Those Who Served & Access" is the project's *domain* (theme), not the track field on the form.

## The Actual Submission Mechanism (per `Project_details.docx`, verified 2026-09-13)
Two pieces, both mandatory:

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

## Draft Answers to the 3 Form Questions (to be finalized at Gate 4, not yet submitted)
- **Q1:** _To be finalized once the vertical slice exists and a concrete quantified example (e.g., "X hours become Y minutes") can be honestly stated._
- **Q2:** A person with a disability, or their family member/caregiver, applying for a disability certificate/UDID in Maharashtra (per `PRD.md` §2) — not yet narrowed to a single named community/ward per the source document's guidance to be as specific as "ASHA workers covering 3 villages in rural Maharashtra."
- **Q3:** _To be finalized — must name the exact AI step (Gemini grounded-response), the specific reviewed sources it's restricted to (SRC-001–SRC-005), and why a non-AI/rule-based version would fall short (varying state procedures, natural-language follow-up questions)._

## Who Was Consulted
**None yet, as of 2026-09-13.** This is disclosed honestly rather than fabricated (root instructions explicitly forbid inventing consultation evidence; the source document's own FAQ states real personal data / fabricated evidence risks a 10-point penalty and possible disqualification). See `RULES.md` §1 row 9 and `MEMORY.MD` Pending CEO Decision #1 for the plan to close or knowingly accept this gap before 19 Sep 2026.

## What Was Built
_To be completed at Gate 4 once the vertical slice exists._

## Three Required Tests & Evidence (Hathcon-mandatory test cases, per `docs/TESTING.md`)
1. Maharashtra / locomotor / not registered → _pending_
2. "Stuck at hospital" → _pending_
3. Two-minute reminder delivery → _pending_

(Full detail and pass/fail evidence in `docs/TESTING.md` once tests run.)

## Known Failures
_To be completed honestly at Gate 4 — whatever does not work will be disclosed here, per the mandatory "explain known failures honestly" constraint._

## Next Step
_To be completed at Gate 4._

## Who Can Operate It After the Event
Mukesh Saxena (Product Owner), following `README.md` and `docs/OPERATIONS.md` non-technical handover procedure.

## LinkedIn Post (encouraged, per source document — not scored, but "recruiters search for this stuff")
Not yet drafted. Source document's suggested structure: short intro naming the hackathon, the specific problem solved (one sentence), what was built and the tools used, one challenge + one thing learned, a screenshot/demo link, and the tag `@Be10X`.

## Final Mandatory Checklist (verbatim source document's "7 non-negotiables")
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
**Not ready.** Gate 0 (documentation) only, now including this corrected submission-mechanics rewrite. Awaiting CEO approval to begin Gate 1's remaining build work, and awaiting the track decision (`RULES.md` §1a) before this file's Q3/track answers can be finalized.
