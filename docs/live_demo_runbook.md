# Live Demo Runbook — Sugamya Sahayak Telegram Bot

**Status:** Procedure only. This runbook has not been executed as of this writing. The workflow `gXPlaislJyNuqJSd` is currently unpublished; nothing here authorizes publishing it — that requires a separate, explicit CEO authorization each time, per standing policy.

**Purpose:** a repeatable, low-risk procedure for recording a short live demonstration of the Telegram bot (e.g., for the Hathcon demo video), with the workflow published only for the minimum time needed and immediately unpublished afterward.

---

## Hard Rule (non-negotiable)

**Never reveal, screenshot, narrate, or leave visible in any recording:** bot tokens, API keys, credentials, chat IDs, phone numbers, or the private message content of any real user (including the social-worker trial contact). Use only dummy/fictional input during the demo. If a real prior conversation is visible in the n8n execution log or Telegram chat during screen-sharing, do not scroll to or expose it — navigate to a fresh execution or a blank chat view instead.

---

## Step 1 — Temporary Publish Authorization

1. Confirm the CEO has given **explicit, dated authorization** for this specific demo session (a general standing approval is not sufficient — see the CEO's own credential/publishing boundary).
2. Live-verify the current state via a **fresh page navigation** to `https://n8n.mukkubuilds.com/workflow/gXPlaislJyNuqJSd` (never assume state from a prior report).
3. Click **Publish**, confirm in the dialog, then **re-verify via a fresh page reload** that the button now reads "Published."
4. Confirm Node 1's production webhook still uses `n8n.mukkubuilds.com` (view-only; do not copy the full URL into any recording or shared screen).

## Step 2 — One Normal-Path Test

1. Using a dummy Telegram account (not a real applicant's), send a message to start the guided flow.
2. Answer the five questions with **dummy data only** — e.g., state "Maharashtra", district "Pune", disability type "Locomotor disability", "For myself", UDID status "No".
3. Confirm the bot returns a numbered, source-grounded answer with the closing disclosure line.
4. Capture visible proof: a screen recording or screenshot of the question-and-answer exchange in Telegram (dummy data only, no real chat ID visible in the recording frame if avoidable).

## Step 3 — One Escalation Test

1. In the same or a fresh dummy conversation, send an off-script/sensitive message designed to trigger the escalation-keyword interrupt (e.g., a message indicating the applicant is stuck or in distress, phrased generically — no real personal detail).
2. Confirm the bot routes to the fixed escalation fallback response (Node 6b), not the LLM path.
3. Capture visible proof: a screen recording or screenshot of this exchange.

## Step 3a — Optional Reminder Demonstration (proven feature, D2.4)

This step is optional and may be included in the same recording window as Steps 2–3, since the reminder feature is now built and live-verified (n8n execution #23, 2026-09-17). Do not open a separate publish window just for this — do it within the same controlled window as the rest of the demo.

1. In the same dummy conversation, send the exact case-insensitive text `remind me` (no other wording).
2. Wait approximately two minutes.
3. Confirm the neutral reminder text arrives in the same chat: "This is your requested reminder. You can continue your Disability Certificate/UDID guidance when ready."
4. Capture visible proof: a screen recording or screenshot showing the "remind me" message sent and the reminder arriving roughly two minutes later. If recording continuously, this can be shown as a real-time wait or trimmed for the final video (see script guidance) — do not fabricate a shorter delay by editing timestamps.
5. All Hard Rule privacy/no-secret restrictions above apply unchanged: no bot tokens, API keys, chat IDs, phone numbers, or other real user's conversation content.

## Step 4 — Visible Proof to Capture

- Screen recording (preferred) or screenshots showing:
  - The dummy question-and-answer flow (Step 2).
  - The escalation fallback firing (Step 3).
  - Optionally, the reminder demonstration (Step 3a), if included.
  - Optionally, the n8n execution list showing all executions succeeded (do not open execution detail panels that might expose earlier real conversation data).
- Do **not** capture: the credentials panel, the webhook URL in a zoomed/readable state, any node's raw JSON output, or any part of the interface showing the real social-worker trial's execution (#22) or its content.

## Step 5 — Immediate Unpublish

1. Immediately after capturing proof, open the version menu next to "Published" and select **Unpublish**.
2. Confirm in the dialog.
3. **Live-verify via a fresh page reload** that the button now reads an actionable "Publish" (i.e., confirmed unpublished) before ending the session.
4. Record the exact publish/unpublish timestamps in `MEMORY.MD` or the relevant CTO report, per standing practice — this runbook itself is not a substitute for that record.

---

## After the Demo

- Do not describe this recording as proof of a "production deployment" — the workflow reverts to unpublished immediately after. It demonstrates functionality, not a continuously-live public service.
- If any real data is accidentally captured on screen, do not include that portion of the recording in the final demo video; re-record the affected segment using dummy data only.
