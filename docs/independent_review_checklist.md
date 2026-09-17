# Independent Review Checklist — Sugamya Sahayak

**Status: CHECKLIST ONLY. No review has been performed or self-certified against this checklist by the build team (Claude/CTO).**

This checklist is for a reviewer who was **not** part of building this project to independently verify claims made about it. Do not treat any row as complete until an actual independent reviewer has filled it in with their own name, date, and evidence.

Related: `Phases.md`, `RULES.md` §14 (independent review requirement), `docs/SOURCES.md`, `docs/TESTING.md`.

## How to use this checklist

For each row: perform the check yourself (do not take the build team's word for it), record Pass/Fail, link or describe the evidence you personally observed, and sign with your name and date. "Notes" is for caveats, partial passes, or anything that needs follow-up.

| # | Area | Check | Pass/Fail | Evidence link/description | Reviewer name | Date | Notes |
|---|------|-------|-----------|---------------------------|---------------|------|-------|
| 1 | Accessibility | Full 5-step wizard is operable via keyboard only (no mouse) | | | | | |
| 2 | Accessibility | Screen reader (e.g., NVDA/VoiceOver) announces form labels, errors, and results correctly | | | | | |
| 3 | Accessibility | `prefers-reduced-motion` is respected (spinner/animations disable) | | | | | |
| 4 | Accessibility | Color contrast meets WCAG AA on all visible text/buttons | | | | | |
| 5 | Security — XSS | Enter `<b>test</b>`, `<img src=x onerror=alert(1)>`, and `<script>alert(1)</script>` into every free-text input (wizard fields, chat box); confirm all render as literal text, never execute | | | | | |
| 6 | Security — XSS | Inspect `app.js` source for any remaining unescaped `innerHTML` assignment of dynamic/user-controlled data | | | | | |
| 7 | Security — secrets | Search the repository (including git history) for hardcoded API keys, tokens, or credentials | | | | | |
| 8 | Security — secrets | Confirm `.env.example` contains only placeholders, never real values | | | | | |
| 9 | Privacy | Confirm no user-entered wizard/chat data is transmitted to any third party or logged anywhere without disclosure | | | | | |
| 10 | Source-grounding | For every factual claim visible in the web UI (authority, documents, eligibility, fee, helpline, portal, process steps), locate its exact source in `docs/SOURCES.md` and confirm the source text actually supports the claim as worded | | | | | |
| 11 | Source-grounding | Confirm no claim implies more certainty/coverage than the cited source states (e.g., no invented percentages, named hospitals, or phone numbers not in a Reviewed source) | | | | | |
| 12 | Offline-label honesty | Confirm every UI surface (badge, chat, wizard results, footer) accurately discloses that responses are offline/reference content, not live AI or a live backend | | | | | |
| 13 | Offline-label honesty | Attempt to find any residual wording implying "live," "grounded," "AI-processed," or "100%" that is not true of the current build | | | | | |
| 14 | Telegram workflow controls | Independently verify the live publish/unpublish state of workflow `gXPlaislJyNuqJSd` directly in the n8n UI (do not trust a written report) | | | | | |
| 15 | Telegram workflow controls | If published, confirm who authorized publishing and that a controlled-test instruction exists | | | | | |
| 16 | Credential secrecy | Confirm the reviewer was not given, and did not need, any production credential to complete this checklist | | | | | |
| 17 | Evidence verification | Pick at least 3 claims from any prior status report (e.g., a CTO Report) and independently reproduce the evidence (don't just read the report's claim of evidence) | | | | | |
| 18 | Evidence verification | Confirm git commit IDs cited in reports actually exist and contain the described diff (`git show <hash>`) | | | | | |

## Sign-off

This checklist is considered complete only when every row has a reviewer name, date, and Pass/Fail — not when the build team fills it in on the reviewer's behalf.

**Reviewer (independent, not part of the build):** _______________________
**Date completed:** _______________________
**Overall verdict:** _______________________
