# design.md — UI/UX Source of Truth
**Status:** Draft — Gate 0. Version 0.1. Last verified: 2026-09-12.

## Design Principles
Dignity, clarity, trust, and accessibility over visual novelty. No unnecessary animation. The user may be stressed, unfamiliar with bureaucracy, or using a low-end device with a slow connection — every design choice should reduce cognitive load, not add to it.

## Target-User Accessibility Needs
- May have low digital literacy — avoid jargon, use plain language.
- May be using a screen reader (visual or other disabilities) or a caregiver may be reading aloud.
- May be on a low-end Android phone with a small screen and patchy data connection.
- May not read English fluently — language selection must be genuine and early.
- May be emotionally stressed by the bureaucratic process — tone must stay calm, encouraging, non-judgmental.

## Information Architecture
Single-page, linear flow: Landing/disclosure → Q1 → Q2 → Q3 → Q4 → Q5 → Guidance result → (optional) Reminder → (optional) Escalation → Closing line.

## Page Inventory
1. Landing / disclosure screen
2. Question screen (reused 5×, one question at a time)
3. Guidance result screen (numbered steps)
4. Escalation screen ("I'm stuck")
5. Reminder confirmation / draft screen
6. Error / unsupported-location screen

## End-to-End User Flow
Landing (disclosure banner + "Start") → Q1 (state & district) → Q2 (disability type) → Q3 (self/other) → Q4 (UDID registration status) → Q5 (language) → Guidance result (numbered steps + sources note) → closing line → reminder offer → optional "I'm stuck" escalation available at any point via a persistent, clearly labeled control.

## Mobile-First Responsive Behaviour
Design at 360px width first; single-column layout; large tap targets (≥44px); no horizontal scrolling; guidance steps stack vertically; text reflows without truncation.

## Typography
System font stack for fast load and broad script support (Devanagari, Latin, etc.) — e.g., `-apple-system, "Noto Sans", "Noto Sans Devanagari", sans-serif`. Base size ≥16px for body text to aid readability; headings clearly larger; line-height ≥1.5.

## Colour System
Calm, low-saturation palette: a single primary accent colour for actions/links, neutral greys for text/background, one clear "warning/unsupported" colour (amber, not red-alarming), one "success/guidance" colour. Exact hex values to be finalized at Gate 1 with the `dataviz`/design-system approach — not fashion-driven, must pass contrast checks below.

## Contrast Requirements
All text/background pairs meet WCAG 2.1 AA: ≥4.5:1 for normal text, ≥3:1 for large text and UI component boundaries.

## Spacing System
8px base unit; consistent vertical rhythm between question blocks, steps, and buttons; generous whitespace to reduce visual crowding for anxious users.

## Component Specifications
- **Buttons/form controls:** large, high-contrast, one primary action per screen; text labels never icon-only.
- **Question-by-question interaction:** one question visible at a time; previous answers shown as a compact, non-editable-inline summary (edit requires explicit "change" action, not silent overwrite) — never re-asks an answered question per PRD FR-1.
- **Progress indication:** simple "Question X of 5" text + a lightweight progress bar; no percentage claims about the overall process (only about the intake form).
- **Guidance-result presentation:** numbered list; each item shows What to do / Where / What to carry / What happens next as labeled sub-lines, not a single run-on paragraph.
- **Source/verification display:** a small, honest note under the guidance ("Based on: [source title]") linking to `docs/SOURCES.md`-registered document; if unsupported, a clearly styled "could not verify" notice instead of guidance.
- **Reminder interface:** a single clear choice — "Set a reminder text" (draft) vs., only if integration exists, "Send me a real reminder" with explicit date/time/timezone fields.
- **Escalation interface:** a persistent, always-visible "I'm stuck" link/button, not buried in a menu.
- **States:** loading (skeleton/spinner with plain "Getting your answer…" text), empty (never shown blank — always has a next-action prompt), success (guidance shown), warning (unsupported/could-not-verify), failure (service error — retry option + no fabricated content), error-recovery (clear "try again" or "go back one question" path).

## Keyboard Navigation
All controls reachable and operable via Tab/Shift+Tab/Enter/Space; no keyboard traps; logical tab order matching visual order.

## Focus Treatment
Visible focus outline on every interactive element (never `outline: none` without an equally visible replacement); focus moves to the new question/result block when it appears, so screen-reader/keyboard users aren't stranded.

## Screen-Reader Labels
Every form control has a programmatic label; guidance steps use real ordered-list (`<ol><li>`) markup, not styled divs; live region announces when a new question or result appears.

## Simple-Language Standards
Short sentences (≤20 words where possible); no legal/medical jargon; one idea per sentence; numbered steps instead of nested clauses.

## Hindi, Marathi & Other Supported-Script Considerations
UI must render Devanagari script correctly (font stack above); text direction remains LTR; ensure line-height accommodates conjunct characters; language selection uses the language's own name (e.g., "हिंदी", "मराठी"), not only English labels, per the hackathon's "name the language, don't say 'local language'" prompting rule.

## Safety & Human-Approval Copy
Persistent, plainly worded disclosure (near the start and again with every guidance result): "This guide helps you understand the process. It does not diagnose, assess eligibility, give legal advice, or approve your application. A doctor, medical board, or official makes those decisions." Closing line on every completed guidance response, verbatim: "You are doing the right thing. Take it one step at a time."

## Error-Recovery Experience
Any failure (LLM, log, reminder) shows a calm, specific message and a concrete next action (retry, go back, or contact the district office if known) — never a raw technical error, never a fabricated fallback answer.

## Generated-Frontend Review Checklists (CTO-prepared, 2026-09-12 13:56:00 Asia/Calcutta, in place of unavailable Antigravity review capability — see `MEMORY.MD` Entry 006/008)
These are the concrete checklists against which any Lovable/Emergent-generated frontend must be scored before integration (`RULES.md` §24 Integration Gate). They exist as a specification now so that whoever performs the review (Claude, or a future connected reviewer capability) uses the same bar.

**Accessibility review:** semantic HTML (real `<button>`, `<label>`, `<ol>`, not styled `<div>`s); every input has a programmatic label; ARIA used only where native semantics are insufficient; live region announces new question/result; colour is never the only signal (e.g., error state also has text/icon); automated contrast check shows zero critical violations.

**Mobile viewport review:** renders correctly at 360px, 390px, and 768px widths with no horizontal scroll; tap targets ≥44px; text reflows without truncation or overlap; progress indicator and buttons remain visible without excessive scrolling.

**Keyboard-navigation review:** full flow completable using Tab/Shift+Tab/Enter/Space only; no keyboard trap; tab order matches visual order; focus visibly moves to the new question/result block when it appears; "I'm stuck" control is keyboard-reachable at every step.

**Error and loading-state review:** a loading state appears within a reasonable delay and never leaves the user on a blank screen; error state gives a specific, calm message and a concrete next action (retry / go back), never a raw stack trace or fabricated content; empty state (e.g., before the first question loads) always has a next-action prompt, never a blank page.

**Visual consistency review:** one consistent colour/typography/spacing system across all screens (landing, 5 question screens, guidance result, escalation, reminder, error) — no visually distinct "generated" screen that breaks the calm/dignified tone required by the Design Principles above; no decorative animation.

## Visual Acceptance Criteria
- [ ] All text/background pairs pass WCAG AA contrast.
- [ ] Fully keyboard-operable with visible focus at every step.
- [ ] Works at 360px width with no horizontal scroll.
- [ ] No animation beyond simple, purposeful transitions (e.g., a progress bar fill) — no decorative motion.
- [ ] Guidance steps use real semantic ordered-list markup.
- [ ] Disclosure and closing-line copy present exactly as specified.
- [ ] Devanagari-script languages render correctly on a representative mobile browser.
