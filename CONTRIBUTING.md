# Contributing

## Workflow

1. Open an issue for a bug or proposed change when discussion would help.
2. Create a focused branch and make the smallest relevant change.
3. Keep the static web UI offline by default, preserve its disclosures, and do not add secrets or unsupported claims.
4. Use dummy data only. Never commit applicant names, phone numbers, addresses, health details, credentials, or tokens.
5. Run `node --test tests/webui-regression.test.mjs` before opening a pull request.
6. Open a pull request against `main` with a concise description of the change and validation performed.

The project has no package manifest or build step. The tracked UI is plain HTML, CSS, and JavaScript; edit those files directly and use a static file server for manual browser checks.
