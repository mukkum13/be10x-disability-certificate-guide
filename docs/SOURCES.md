# docs/SOURCES.md — Official Knowledge Registry
**Status:** In Progress — Gate 1, Task D1.1. Last updated: 2026-09-12 19:50:48 Asia/Calcutta.

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

### SRC-003 — Rights of Persons with Disabilities (Amendment) Rules, 2024
- **Issuing authority:** Government of India, Ministry of Social Justice and Empowerment, Department of Empowerment of Persons with Disabilities
- **URL:** https://swavlambancard.gov.in/uploads/news/17398614454320241023621746570.pdf
- **Geography:** National, including Maharashtra
- **Subject covered:** Formal application route, supporting-document categories, and medical-authority assessment for disability certificate and UDID applications
- **Retrieval date/time:** 2026-09-12 19:50:48 Asia/Calcutta
- **Effective/publication date:** Rights of Persons with Disabilities (Amendment) Rules, 2024
- **Review status:** Reviewed
- **Reviewer:** CEO (Codex), 2026-09-12 19:50:48 Asia/Calcutta
- **Extracted facts used by the product:**
  - An applicant may submit the disability-certificate/UDID application through the UDID portal to the medical authority in their district of residence, or to the medical authority at a hospital where they are receiving or have received treatment related to the disability.
  - The application is accompanied by proof of identity, a recent photograph (not older than six months), proof of residence, and Aadhaar number or Aadhaar-enrolment number; when Aadhaar is used as identity proof and has the same residential address, separate address proof is not required.
  - The medical authority or other notified competent authority verifies the application information, assesses disability under applicable Central Government guidelines, and issues the certificate/UDID card where the requirements are met.
- **Limitations:** This is a national rule, not a Maharashtra district hospital list. It does not identify a particular medical authority, appointment availability, fees, local forms, or district welfare office. The product must never collect these documents or Aadhaar data; it may only tell users that the official rule lists these categories.
- **Superseded-source status:** Not superseded as of retrieval.
- **Features/answers depending on this source:** FR-2/FR-3 national application route, document-category guidance, and explanation of medical-authority assessment.

### SRC-004 — Maharashtra DEPwD UDID Service Page
- **Issuing authority:** Department of Empowerment of Persons with Disabilities, Government of Maharashtra
- **URL:** https://depwd.maharashtra.gov.in/en/service/disability-identity-card-to-person-with-disability/
- **Geography:** Maharashtra
- **Subject covered:** Maharashtra government entry point for UDID/disability-certificate services
- **Retrieval date/time:** 2026-09-12 19:50:48 Asia/Calcutta
- **Effective/publication date:** Not stated on page
- **Review status:** Reviewed
- **Reviewer:** CEO (Codex), 2026-09-12 19:50:48 Asia/Calcutta
- **Extracted facts used by the product:**
  - The page describes the UDID project as an avenue to obtain a UDID card or disability certificate and links users to the official UDID portal.
  - It identifies new UDID application, renewal of an existing certificate/card, and lost-card/certificate handling as portal services.
  - It states that the UDID card is valid pan-India.
- **Limitations:** The page is a Maharashtra government service entry point, not a state-specific procedural circular. It does not identify a district medical authority, hospital, medical board, local appointment process, or district welfare office; none may be inferred.
- **Superseded-source status:** Not superseded as of retrieval.
- **Features/answers depending on this source:** Maharashtra portal-direction guidance and pan-India validity statement only.

### SRC-005 — Official UDID Portal
- **Issuing authority:** Department of Empowerment of Persons with Disabilities, Ministry of Social Justice and Empowerment, Government of India
- **URL:** https://swavlambancard.gov.in/
- **Geography:** National, including Maharashtra
- **Subject covered:** Application, tracking, procedure access, and medical-authority lookup
- **Retrieval date/time:** 2026-09-12 19:50:48 Asia/Calcutta
- **Effective/publication date:** Page current at retrieval; portal itself displays updates independently
- **Review status:** Reviewed
- **Reviewer:** CEO (Codex), 2026-09-12 19:50:48 Asia/Calcutta
- **Extracted facts used by the product:**
  - The portal provides UDID application and application-tracking paths.
  - The portal states that application procedures/guidelines can be through online, camp, and CMO-office routes.
  - Its “Know your Medical Authority” feature requires the user to select state/UT and district to find the relevant medical authority.
- **Limitations:** Lookup output is dynamic and was not recorded for a pilot district. The product must direct the user to use the official lookup and must not name a hospital or authority until the specific result is independently verified and registered.
- **Superseded-source status:** Not superseded as of retrieval.
- **Features/answers depending on this source:** FR-3 official application/tracking direction and safe medical-authority lookup instruction.

---

## Open Gaps (honestly disclosed — NOT fabricated, per RULES.md §5)

| Candidate needed | Status | Note |
|---|---|---|
| Maharashtra disability-certificate application procedure (state-specific steps/forms) | **Not Reviewed** | General/informal sources found (e.g., NGO explainer pages, an MS Society India PDF for Pune) but none yet meets the "official government source" bar; needs a direct Maharashtra Dept. of Social Justice & Special Assistance / DEPWD circular or GR (Government Resolution) |
| Maharashtra certifying-hospital / medical-board list (district-level) | **Not Reviewed** | No official district-by-district list located yet; this is required before the product can name *any* hospital and must not be guessed |
| Pilot district social-welfare-office contact (district tier, between applicant and the state Commissioner) | **Not Reviewed** | Not yet located; the `divyangkalyan.maharashtra.gov.in/directory/` page is a promising lead, not yet fetched/reviewed |

**Product behaviour until these are Reviewed:** any question naming a specific Maharashtra district, hospital, or the district-level (as opposed to state-level) escalation step MUST receive the fail-safe "could not verify — check the official UDID portal or your district social welfare office" response per `PRD.md` FR-10. The product may use SRC-001 (national UDID steps) and SRC-002 (state-level escalation) once implemented, but may not claim district-level coverage.
