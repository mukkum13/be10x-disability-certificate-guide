// Minimal, zero-dependency regression suite for the offline web UI
// (index.html / app.js / styles.css).
//
// Uses only Node's built-in test runner (`node:test`) and `fs` — no
// npm dependencies, no browser, no jsdom. This is deliberately a
// "minimal reproducible static test," not a full browser test harness.
//
// Honest limits (see docs/submission_evidence.md for the manual
// browser-driven checks that cover what this suite cannot):
//   - Does not render the page in a real DOM/browser.
//   - Does not exercise click/keyboard navigation, focus movement,
//     or ARIA live-region announcements at runtime.
//   - Does not perform a full HTML/JS parse; source checks use
//     targeted string/regex matching against known code shapes, so a
//     sufficiently different rewrite of app.js could evade a check
//     that was written against the current structure.
//
// Run with: node --test tests/

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const stylesCss = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');

describe('escapeHtml() behavioral safety (real execution, not just a text search)', () => {
  // Extract the actual escapeHtml function body from app.js and execute
  // it for real, so this test would fail if the shipped implementation
  // were ever weakened, even if the function name stayed the same.
  const match = appJs.match(/function escapeHtml\(value\) \{[\s\S]*?\n    \}/);
  assert.ok(match, 'escapeHtml() function must exist in app.js');
  const escapeHtml = new Function('value', match[0].replace(/^function escapeHtml\(value\) \{/, '').replace(/\}$/, ''));

  test('escapes <script> tags', () => {
    const out = escapeHtml('<script>alert(1)</script>');
    assert.ok(!out.includes('<script>'), `expected no raw <script> tag, got: ${out}`);
    assert.equal(out, '&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  test('escapes img onerror payloads', () => {
    const out = escapeHtml('<img src=x onerror=alert(1)>');
    assert.ok(!out.includes('<img'), `expected no raw <img> tag, got: ${out}`);
  });

  test('escapes quotes and ampersands', () => {
    const out = escapeHtml(`"quoted" & 'single' & <tag>`);
    assert.ok(!/["'<>]/.test(out.replace(/&(amp|lt|gt|quot|#39);/g, '')), `unescaped char survived: ${out}`);
  });

  test('handles null/undefined safely (no "null"/"undefined" string leak)', () => {
    assert.equal(escapeHtml(null), '');
    assert.equal(escapeHtml(undefined), '');
  });
});

describe('Dynamic content interpolation uses escapeHtml()', () => {
  test('renderResults() wraps every data.* interpolation in escapeHtml()', () => {
    const fnMatch = appJs.match(/function renderResults\([\s\S]*?\n    \}/);
    assert.ok(fnMatch, 'renderResults() must exist');
    const body = fnMatch[0];
    // Every `${data.xxx}` or `${payload.xxx}` interpolation must either
    // be wrapped in escapeHtml(...) directly, or (for array fields) be
    // a `.map(item => ...escapeHtml(item)...)` call that escapes each
    // element individually -- a raw ${data.foo} with neither shape
    // would be a real regression.
    const candidates = [...body.matchAll(/\$\{(?!escapeHtml\()(data|payload)\.[a-zA-Z_]+/g)];
    const unsafe = candidates.filter(m => {
      // Look at the ~120 chars following the match for a `.map(` whose
      // callback body itself calls escapeHtml(...) -- that is the safe,
      // per-element-escaped shape used for array fields like next_steps.
      const tail = body.slice(m.index, m.index + 160);
      const isSafeMap = /\.map\([^)]*escapeHtml\(/.test(tail);
      return !isSafeMap;
    });
    assert.deepEqual(unsafe.map(m => m[0]), [], 'found unescaped data.*/payload.* interpolation(s) in renderResults()');
  });

  test('sendChatMessage()/appendMessage() escape the bot reply and user text', () => {
    const chatFn = appJs.match(/typingEl\.innerHTML = `<strong>\$\{escapeHtml\(label\)\}:<\/strong> \$\{escapeHtml\(botReply\)\}`;/);
    assert.ok(chatFn, 'bot reply must be inserted via escapeHtml(botReply)');
    const appendFn = appJs.match(/msgDiv\.innerHTML = sender === 'user' \? `<strong>You:<\/strong> \$\{escapeHtml\(text\)\}` : `<strong>Sugamya Assistant:<\/strong> \$\{escapeHtml\(text\)\}`;/);
    assert.ok(appendFn, 'appendMessage() must escape both user and assistant text');
  });
});

describe('Offline disclosure is present and consistent', () => {
  test('index.html discloses offline/reference status in the chat section', () => {
    assert.match(indexHtml, /This assistant is not currently connected to a live AI backend/);
    assert.match(indexHtml, /Offline Reference Content/);
  });

  test('index.html footer discloses no live AI/grounding backend', () => {
    assert.match(indexHtml, /not currently generated by a live AI\/grounding backend/);
  });

  test('app.js badge defaults to offline labeling, only flips to live when isLive is true', () => {
    assert.match(appJs, /groundedBadge\.textContent = 'Offline Reference Content';/);
    assert.match(appJs, /groundedBadge\.textContent = 'Live Grounded Response';/);
    // The offline branch must be the `else` of an `if (isLive)` check --
    // i.e. offline is the default/fallback state, not an opt-in label.
    assert.match(appJs, /if \(isLive\) \{\s*groundedBadge\.textContent = 'Live Grounded Response';[\s\S]*?\} else \{\s*groundedBadge\.textContent = 'Offline Reference Content';/);
  });

  test('chat offline label appears when isLive is false', () => {
    assert.match(appJs, /const label = isLive \? 'Sugamya Assistant' : 'Sugamya Assistant \(Offline Reference — not a live AI response\)';/);
  });
});

describe('Previously-removed unsupported claims stay absent (source-honesty regression guard)', () => {
  const forbiddenInAppJs = [
    /pan-India/i,
    /100% Official Source Grounded/,
    /\b40%\s*(disability|benchmark)/i, // an invented eligibility percentage removed 2026-09-17
  ];
  for (const pattern of forbiddenInAppJs) {
    test(`app.js does not reintroduce: ${pattern}`, () => {
      assert.doesNotMatch(appJs, pattern);
    });
  }

  const forbiddenInIndexHtml = [
    /pan-India/i,
    /1800-11-1250/, // an unsourced toll-free number removed 2026-09-17
  ];
  for (const pattern of forbiddenInIndexHtml) {
    test(`index.html does not reintroduce: ${pattern}`, () => {
      assert.doesNotMatch(indexHtml, pattern);
    });
  }
});

describe('Accessibility regression guards', () => {
  test('spinner animation respects prefers-reduced-motion', () => {
    assert.match(stylesCss, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.spinner\s*\{\s*animation:\s*none;/);
  });

  test('skip link exists', () => {
    assert.match(indexHtml, /class="skip-link"/);
  });

  test('wizard progress bar has ARIA progressbar role and live-updated valuetext', () => {
    assert.match(indexHtml, /role="progressbar"/);
    assert.match(appJs, /progressBar\.setAttribute\('aria-valuetext'/);
  });
});
