# tests/ — Web UI Regression Suite

**What this is:** a minimal, zero-npm-dependency regression suite for the offline web UI (`index.html`, `app.js`, `styles.css`), using only Node's built-in test runner (`node:test`) and `fs`/`assert`.

**Run it:** `node --test tests/webui-regression.test.mjs` (requires Node.js 18+; tested against Node v22.23.2).

**Last run: 2026-09-17, Asia/Calcutta — 18/18 passed, 0 failed.**

```
# tests 18
# suites 5
# pass 18
# fail 0
# cancelled 0
# skipped 0
# todo 0
```

## What it covers
- `escapeHtml()` XSS-safety, by extracting the real function from `app.js` and executing it against `<script>`, `<img onerror=...>`, and quote/ampersand payloads (behavioral, not just a text search).
- Every dynamic `data.*`/`payload.*` value interpolated into `renderResults()`'s HTML is either wrapped in `escapeHtml(...)` directly or escaped per-element via `.map(item => ...escapeHtml(item)...)`.
- Chat message rendering (`appendMessage`, `sendChatMessage`) escapes both user and assistant text.
- Offline-disclosure copy is present in `index.html` and drives `app.js`'s badge/label logic (offline is the default; "live" only appears when `isLive` is actually true).
- Previously-removed unsupported claims (an invented toll-free number, an invented eligibility percentage, "100% Official Source Grounded") do not reappear in `app.js`/`index.html`.
- `prefers-reduced-motion`, the skip link, and the wizard's ARIA progressbar attributes are present.

## Honest limits
This is **not** a full browser test harness. It does not:
- Render the page in a real DOM or browser.
- Exercise click/keyboard navigation, focus movement, or ARIA live-region announcements at runtime.
- Fully parse HTML/JS — checks use targeted string/regex matching against the current code shape, so a sufficiently different rewrite of `app.js` could evade a check written against today's structure.

The manual, browser-driven checks that cover what this suite cannot (real click-through navigation, live ARIA announcements, actual rendered XSS-safety in a browser) are recorded in `docs/submission_evidence.md` (2026-09-17 local Playwright-driven session).

A full browser harness (Playwright/jsdom as an npm dependency) was deliberately not added here, per the instruction to avoid unnecessary infrastructure for a project with no existing `package.json` or build tooling.
