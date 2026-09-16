# docs/OPERATIONS.md — Production Operation Runbook
**Status:** Draft — Gate 1. To be filled in with real values once Gate 1 deployment exists.
**Last updated:** 2026-09-12 13:57:00 Asia/Calcutta.

**Mandatory timestamp rule (CEO decision, 2026-09-12 13:46:24 Asia/Calcutta):** every deployment, health-check, failure, and recovery event recorded here must include exact `YYYY-MM-DD HH:mm:ss Asia/Calcutta` timestamps (Started at / Completed or blocked at / Evidence location at minimum).

## Deployment Runbook (planned)
1. Confirm all environment variables are set in the host's dashboard (never in source).
2. Deploy backend function to the chosen free-tier host.
3. Deploy static frontend to the chosen free-tier host.
4. Hit `/health` and confirm OK before announcing the URL as live.
5. Record the deployment URL and timestamp in `MEMORY.MD`.

## Configuration Checklist (planned)
- [ ] `LLM_API_KEY` set
- [ ] `LLM_PROVIDER` set
- [ ] `LOG_STORE_CONFIG` set and store reachable
- [ ] `REMINDER_CHANNEL_TOKEN` set (only if real reminders enabled)
- [ ] Rate limits configured
- [ ] `/health` endpoint responding

## Secret-Handling Procedure
Secrets live only in the hosting platform's environment-variable store. `.env` is git-ignored and never committed. `.env.example` lists variable names only (no values). No secret appears in `MEMORY.MD`, chat logs, or screenshots.

## Health Checks (planned)
`/health` verifies: LLM API reachable, log store reachable, (if enabled) reminder channel reachable. Returns a simple OK/degraded/down status — no internal details exposed publicly.

## Monitoring
Minimal, appropriate to a 3-day hackathon project: request counts and error counts logged server-side (not user-facing), reviewed manually before submission day.

## Common Failures & Recovery Steps (to expand with real incidents)
| Failure | Recovery |
|---|---|
| LLM API rate limit hit | Wait for reset; do not loop-retry (per hackathon warning); show safe fallback message to users in the meantime |
| Log store unreachable | Guidance still returned to user; log write retried/queued; failure noted in `MEMORY.MD` |
| Reminder channel unreachable | Fall back to draft-only reminder text; disclose to user |
| Deployment host outage | Redeploy from last known-good commit; verify `/health` before re-announcing URL |

## Rollback Process
Redeploy the previous known-good commit/version from the git history (once git is initialised at Gate 1); record the rollback in `MEMORY.MD` with reason and evidence.

## External-Service Limits
See `Architecture.md` §25 — LLM free-tier daily limits, n8n trial time window (if used), hosting free-tier request caps, Telegram Bot API (unlimited, free) if used.

## GitHub Synchronisation Status (updated 2026-09-16 as part of the documentation-wide reconciliation)
**Superseded — the 2026-09-12 blocker below no longer applies.** Repository-verified: `git log` shows multiple commits already pushed to the authorised remote (`https://github.com/mukkum13/be10x-disability-certificate-guide`), including the 2026-09-15 "Day 6 Final Production Release" commit and two follow-up commits. The original 403/proxy blockage described below was resolved at some point between 2026-09-12 and 2026-09-15 (exact resolution timestamp not found in `MEMORY.MD`); this section is left below for historical record only.

**Original entry (2026-09-12 14:23:20 Asia/Calcutta, now historical):** "Verified locally — GitHub synchronisation blocked." Authorised remote: `https://github.com/mukkum13/be10x-disability-certificate-guide`. This cloud session's GitHub proxy returns HTTP 403 ("GitHub access to this repository is not enabled for this session"); no in-session tool exists to attach the repo. Local push via the user's own machine is also currently blocked (`device_bash` unavailable). See `MEMORY.MD` Entries 010–011.

## Backup Procedure
Canonical docs and knowledge sources are backed up via the connected local folder `K:\Be10x_Disability_certificate_guide`; application code should additionally be pushed to a git remote once designated (Gate 1). The log store (e.g., Google Sheet) is itself exportable as a backup.

## Dependency-Update Approach
Given the 3-day window, dependencies are pinned at Gate 1 and not upgraded mid-build except to fix a blocking bug; post-hackathon updates are the operator's responsibility (see below).

## Non-Technical Handover Procedure (to finalize at Gate 3)
1. Share the working URL and this repository's `README.md`.
2. Walk the new operator through one full demo run using dummy data.
3. Show them where the log store lives and what the 6 fields mean.
4. Show them how to check `/health`.
5. Give them the escalation contact (Product Owner) for anything beyond routine operation.

## Post-Hackathon Operator Responsibilities
- Periodically re-verify that reviewed sources in `docs/SOURCES.md` have not been superseded.
- Rotate/replace API keys if a provider's free tier changes terms.
- Decide whether to expand geography coverage (requires new sources to be reviewed first — never expand coverage without a reviewed source).
