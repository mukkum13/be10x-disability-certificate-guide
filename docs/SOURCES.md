# docs/SOURCES.md — Official Knowledge Registry
**Status:** In Progress — Gate 1, Task D1.1. Last updated: 2026-09-12 13:55:00 Asia/Calcutta.

Only documents listed here with Review Status = **Reviewed** may be used to ground production guidance answers (`RULES.md` §4). No entry may be marked Reviewed without an actual reviewer and date.

## Entry Schema
Source title | Issuing authority | URL | Geography | Subject covered | Retrieval date/time (Asia/Calcutta) | Effective/publication date | Review status | Reviewer | Extracted facts used | Limitations | Superseded-source status | Features/answers depending on this source

---

## Registered Sources

### SRC-001 — UDID Process Overview (NIEPID)
- **Issuing authority:** National Institute for Empowerment of Persons with Intellectual Disabilities (NIEPID), Dept. of Empowerment of Persons with Disabilities, Govt. of India
- **URL:** https://niepid.nic.in/en/unique-disability-id-udid/
- **Geography:** National
- **Subject covered:** UDID registration/application process overview
- **Retrieval date/time:** 2026-09-12 13:48:00 Asia/Calcutta
- **Effective/publication date:** Not stated on page
- **Review status:** Reviewed
- **Reviewer:** CTO (Claude session), 2026-09-12 13:52:00 Asia/Calcutta
- **Extracted facts used by the product:**
  - Registration/application portal is https://www.swavlambancard.gov.in/
  - Steps: (1) online registration on the portal, (2) submit application for Disability Certificate/UDID, (3) CMO Office/Medical Authority verifies and refers to designated Specialist/Medical Board for assessment, (4) certificate/card issued electronically upon completion
  - Applicant can track status, request renewal, and download/print the certificate/card via the portal
  - Aadhaar number is stated as mandatory for both children and adult applicants
- **Limitations:** Page does not detail state-specific hospital/medical-board assignment, exact document checklist, or fees. District-level specifics are NOT covered by this source and must not be inferred from it.
- **Superseded-source status:** Not superseded.
- **Features/answers depending on this source:** FR-2/FR-3 UDID-registration step of the numbered guidance path (national-level steps only).

### SRC-002 — Maharashtra State Commissioner for Persons with Disabilities (Escalation Contact)
- **Issuing authority:** Dept. of Social Justice & Special Assistance, Govt. of Maharashtra (cross-confirmed against the national Office of the Chief Commissioner for Persons with Disabilities registry)
- **URL:** https://depwd.maharashtra.gov.in/en/organization/commissionerate-for-persons-with-disabilities-maharashtra-state-pune/ (cross-checked against https://ccpd.nic.in/list-of-states-uts-commissioners/)
- **Geography:** Maharashtra (state-level)
- **Subject covered:** State-level escalation authority contact details for disability certificate/UDID grievances
- **Retrieval date/time:** 2026-09-12 13:49:00 Asia/Calcutta (both pages)
- **Effective/publication date:** Not stated on either page; contact details treated as current as of retrieval only
- **Review status:** Reviewed
- **Reviewer:** CTO (Claude session), 2026-09-12 13:53:00 Asia/Calcutta — cross-confirmed as the two independent official pages named the same officer, address, and phone numbers
- **Extracted facts used by the product:**
  - Office: Commissionerate for Persons with Disabilities, Maharashtra State
  - Address: 3, Church Road, Pune – 411001, Maharashtra
  - Phone: 020-2612 2061 / 020-2613 6845 / 020-2612 6471
  - Email: commissioner.disability@maharashtra.gov.in
- **Limitations:** Officeholder name and direct phone/email are subject to change; product must present this as "State Commissioner for Persons with Disabilities, Maharashtra — contact per depwd.maharashtra.gov.in" and should re-verify before each production release rather than treat it as permanently fixed. No confirmation yet that this is the exact escalation step reached *after* the district social welfare office (the intermediate district-level step, SRC-003, is still missing — see gap below).
- **Superseded-source status:** Not superseded (as of retrieval).
- **Features/answers depending on this source:** FR-5/PRD §12 escalation route — state-level tier only.

---

## Open Gaps (honestly disclosed — NOT fabricated, per RULES.md §5)

| Candidate needed | Status | Note |
|---|---|---|
| Maharashtra disability-certificate application procedure (state-specific steps/forms) | **Not Reviewed** | General/informal sources found (e.g., NGO explainer pages, an MS Society India PDF for Pune) but none yet meets the "official government source" bar; needs a direct Maharashtra Dept. of Social Justice & Special Assistance / DEPWD circular or GR (Government Resolution) |
| Maharashtra certifying-hospital / medical-board list (district-level) | **Not Reviewed** | No official district-by-district list located yet; this is required before the product can name *any* hospital and must not be guessed |
| Pilot district social-welfare-office contact (district tier, between applicant and the state Commissioner) | **Not Reviewed** | Not yet located; the `divyangkalyan.maharashtra.gov.in/directory/` page is a promising lead, not yet fetched/reviewed |

**Product behaviour until these are Reviewed:** any question naming a specific Maharashtra district, hospital, or the district-level (as opposed to state-level) escalation step MUST receive the fail-safe "could not verify — check the official UDID portal or your district social welfare office" response per `PRD.md` FR-10. The product may use SRC-001 (national UDID steps) and SRC-002 (state-level escalation) once implemented, but may not claim district-level coverage.
