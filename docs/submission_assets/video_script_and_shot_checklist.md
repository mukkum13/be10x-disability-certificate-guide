# Demo Video Script & Shot Checklist (Draft) — Sugamya Sahayak

**Status:** Script and checklist only. Nothing has been recorded, uploaded, or submitted. Recording, if it involves the live Telegram bot, requires the separate, CEO-authorized procedure in `docs/live_demo_runbook.md` (temporary publish → dummy-data tests → immediate unpublish).

**Length target:** 5–10 minutes (per `docs/SUBMISSION.md` §"Video Recording"; treat 10 minutes as the hard ceiling). Camera on strongly recommended. Language: English or Hindi.

---

## Script Outline

**1. Quick intro (~20–30s)**
- Name, one line of background.
- "This is Sugamya Sahayak, built for the Be10x Build for Good hackathon."

**2. The problem (~60–90s)**
- State the problem in one or two sentences (see `problem_solution_explainer.md`).
- Name who it's for.
- Be honest about scope: national process + Maharashtra state-level escalation today, not all of India.

**3. Live walkthrough (~2.5–4 min)** — the largest section
- Open the Telegram bot (`https://t.me/MUKKUM13_BOT`) during an authorized, controlled publish window.
- Answer the five questions with **dummy data only** (e.g., "Maharashtra", "Pune", "Locomotor disability", "For myself", "No").
- Show the grounded, numbered final answer and its closing disclosure line.
- Optionally, show one escalation example (a generic "I'm stuck" message) routing to the safe fallback.
- Optionally, demonstrate the reminder feature (now built and live-verified, D2.4): send the exact message `remind me`, then show the neutral reminder arriving after approximately two minutes. This can be shown as a real-time wait or trimmed in editing to stay within the length target — do not alter or fake the on-screen timestamps.
- **Do not** show or narrate: bot tokens, API keys, chat IDs, phone numbers, or the real social-worker trial conversation.

**4. Where AI does the heavy lifting (~45–60s)**
- Name the AI step: Google Gemini grounded-response agent, restricted to 5 reviewed sources.
- One sentence on why a fixed rule-based flow would fall short (natural-language follow-ups, language switching).

**5. The impact line / honest close (~20–30s)**
- State plainly what's proven and what isn't yet — no invented "X hours become Y minutes" figure (none has been measured).
- Optionally mention the one informal trial contact's positive feedback, correctly labeled as informal, not an independent review.

## Shot Checklist (tick before recording)
- [ ] Dummy data prepared in advance (no real names/phone numbers/health details).
- [ ] If demonstrating the reminder, plan the exact message `remind me` and account for the ~2-minute wait in the recording schedule.
- [ ] `docs/live_demo_runbook.md` Step 1 authorization obtained and workflow live-verified published, if the live bot will be shown.
- [ ] Screen recording software tested (audio + video sync) before the real take.
- [ ] One rehearsal run completed (per the source document's own advice: "not rehearsing once before recording" is a listed common mistake).
- [ ] Script reviewed so delivery doesn't sound robotic/read verbatim.
- [ ] After recording: `docs/live_demo_runbook.md` Step 5 (immediate unpublish) completed and live-verified, if the bot was published for this recording.
- [ ] Recording reviewed end-to-end for any accidentally-captured real data (chat ID, token, real conversation) before it is placed in the Drive folder.

## Common Mistakes to Avoid (verbatim from the source document, per `docs/SUBMISSION.md`)
Going over 10 minutes; explaining the tool instead of showing the solution; reading from a script robotically; skipping the impact line; using real names/phone numbers/health details; not rehearsing once before recording.
