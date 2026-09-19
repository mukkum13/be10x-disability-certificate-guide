# Contributing

Thank you for helping improve the Disability Certificate & UDID Guide.

## Before making a change

- Read `README.md`, `RULES.md`, and the relevant document in `docs/`.
- Keep guidance limited to facts supported by reviewed sources in `docs/SOURCES.md`.
- Do not add or request real names, phone numbers, addresses, Aadhaar numbers, medical details, API keys, bot tokens, or other secrets. Use fictional test data.
- Preserve the product's offline-reference disclosure and its boundaries: it does not diagnose, decide eligibility, provide legal advice, or approve applications.

## Changes and pull requests

1. Make a focused change that matches the existing plain-language style.
2. Update directly related documentation when behavior or limitations change.
3. Run the smallest relevant check. For web UI changes, run:

   ```text
   node --test tests/webui-regression.test.mjs
   ```

4. Explain what changed, how it was checked, and any known limitations in the pull request.

Please do not include secrets or sensitive applicant data in commits, screenshots, issues, or pull requests.
