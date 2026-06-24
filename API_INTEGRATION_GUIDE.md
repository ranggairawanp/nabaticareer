# Nabati Career Microapp — API Integration Guide

**Version 1.0 | One HCMS Product Team | June 2026**
For IT Nabati: backend integration and production deployment.

---

## Overview

This package runs on mock data by default (`USE_MOCK = true`). To connect to production backend:

1. Update `API_CONFIG` in `nabati_career_data.js`
2. Implement the endpoints documented below
3. Configure CORS and JWT auth as specified

---

## Step 1 — Configuration

In `nabati_career_data.js`, update:

```js
var API_CONFIG = {
  BASE_URL: 'https://api.nabatigroup.com/hcms/v1',    // confirm URL with IT
  USE_MOCK: false,                                      // set to false for production
  VERSION: '1.0.0',
  OFFER_LETTER_URL: 'https://api.nabatigroup.com/hcms/v1/offer-letter'
};
```

---

## Step 2 — Auth

All recruiter and admin endpoints require Bearer token in the Authorization header.

**Frontend implementation (already in place):**
```js
function _authHeaders() {
  var token = sessionStorage.getItem('nabati_auth_token');
  return token ? { 'Authorization': 'Bearer ' + token } : {};
}
```

**Backend must provide:**
- Login endpoint that returns JWT token
- Token stored by frontend in `sessionStorage` key: `nabati_auth_token`
- Token format: standard JWT Bearer
- Refresh strategy: if token expiry < 8 hours, implement refresh endpoint

---

## Step 3 — CORS

Backend must allow requests from the career site domain:

```
Access-Control-Allow-Origin: https://careers.nabatigroup.com
Access-Control-Allow-Methods: GET, POST, PATCH, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Step 4 — Endpoints

### AUTH

| Method | Endpoint | Request | Response |
|---|---|---|---|
| POST | `/auth/email` | `{ email, password }` | `{ token, user: { id, name, email, role } }` |
| POST | `/auth/google` | `{ code }` (OAuth code) | `{ token, user }` |
| POST | `/auth/linkedin` | `{ code }` (OAuth code) | `{ token, user, linkedin_profile }` |

**OAuth redirect URIs:**
- Google: `https://careers.nabatigroup.com/auth.html?provider=google`
- LinkedIn: `https://careers.nabatigroup.com/auth.html?provider=linkedin`
- LinkedIn scopes required: `r_liteprofile`, `r_emailaddress`, `r_basicprofile`

---

### CANDIDATE-FACING (public, no auth required)

#### GET `/careers/jobs`
List open job positions.

Query parameters:
```
status=open          (default)
country=ID           (ISO country code)
category=tech        (sales|tech|mfg|scm|corp|hc)
level=Officer        (Staff|Officer|Supervisor|Manager|Senior Manager)
q=engineer           (free text search)
```

Response:
```json
{
  "data": [
    {
      "id": "JOB-2026-001",
      "title": "Sales Supervisor",
      "department": "Sales and Distribution",
      "category": "sales",
      "location": "Bandung, Indonesia",
      "country": "ID",
      "level": "Supervisor",
      "grade": "4B",
      "type": "Full-time",
      "posted": "2026-06-15",
      "deadline": "2026-07-15",
      "status": "open",
      "headcount": 3,
      "summary": "...",
      "responsibilities": ["...", "..."],
      "qualifications": ["...", "..."],
      "recruiter_id": "REC-002",
      "mpn_id": "MPN-2026-0087"
    }
  ],
  "total": 10
}
```

#### GET `/careers/jobs/:id`
Single job detail. Response: same job object as above.

#### POST `/careers/applications`
Submit FLK application. **Auth not required** (public endpoint).

Request payload (FLK data model):
```json
{
  "job_id": "JOB-2026-001",
  "consent_pdp": true,
  "consent_sensitive": true,
  "consent_data": true,
  "consent_pool": false,
  "consent_alerts": false,
  "personal": {
    "full_name": "...", "nickname": "...", "dob": "1995-03-15",
    "pob": "Bandung", "gender": "Male / Pria", "religion": "Islam",
    "citizenship": "Indonesia", "phone": "+62-812-...",
    "email": "kandidat@email.com", "linkedin_id": "...",
    "height": "170", "weight": "65",
    "address_id": "...", "city_id": "Bandung", "district_id": "...",
    "kelurahan_id": "...", "postal_id": "40232",
    "address_current": "...", "city_current": "...",
    "district_current": "...", "kelurahan_current": "...",
    "postal_current": "...",
    "ktp_number": "3273...", "ktp_place": "Bandung",
    "ktp_valid_from": "2020-01-01", "ktp_valid_to": "2030-01-01",
    "sim_number": "...", "npwp_number": "..."
  },
  "marital_status": "Single", "marriage_year": "",
  "family": [
    { "relation": "Ayah (Father)", "name": "...", "gender": "M",
      "dob": "1965-01-01", "education": "S1", "occupation": "...", "company": "..." }
  ],
  "edu_formal": [
    { "type": "D4/S1", "school": "Universitas Padjadjaran", "major": "Manajemen",
      "year_start": "2014", "year_end": "2018", "gpa": "3.75" }
  ],
  "edu_nonformal": [
    { "name": "...", "institution": "...", "year": "2022", "cert": "Yes", "level": "National" }
  ],
  "organizations": [
    { "name": "BEM Universitas", "year": "2016-2018", "position": "Ketua" }
  ],
  "hobbies": "Reading, badminton",
  "languages": [{ "lang": "English", "level": "Good / Baik" }],
  "computer_skills": [{ "program": "Microsoft Excel", "level": "Good / Baik" }],
  "experiences": [
    {
      "company": "PT XYZ", "industry": "FMCG",
      "address": "Jl. Sudirman No.1, Jakarta | (021) 555-1234",
      "period_start": "2018-07", "period_end": "2023-12",
      "position": "Sales Supervisor", "supervisor": "Budi Santoso, Manager",
      "initiatives": "Led 20% revenue growth in Q3 2022...",
      "salary_net": "8000000", "salary_gross": "10000000",
      "benefits": "BPJS, makan, transport",
      "reference_name": "Budi Santoso", "reference_pos": "Sales Manager",
      "reference_hp": "+62-812-...", "reason_leaving": "Career growth"
    }
  ],
  "org_n2_name": "...", "org_n2_position": "VP Sales",
  "org_n1_name": "...", "org_n1_position": "Regional Manager",
  "org_peers": [{ "name": "...", "position": "..." }],
  "org_reports": [{ "name": "...", "position": "..." }],
  "expected_salary": "Rp 12,000,000 - 15,000,000",
  "expected_benefits": "BPJS Kesehatan, makan siang, transport",
  "available_date": "2026-08-01",
  "prev_applied": false, "prev_applied_when": "", "prev_applied_pos": "",
  "knows_employee": false, "employee_name": "", "employee_relation": "",
  "about_nabati": "Nabati adalah perusahaan FMCG...",
  "health_history": "-",
  "vehicle": "Mobil",
  "criminal_record": false,
  "self_description": "Saya adalah...",
  "psych_test_history": "Pernah ikut psikotes di XYZ tahun 2020",
  "cv_uploaded": true, "cv_filename": "CV_Nama_Kandidat.pdf",
  "cv_url": "https://storage.nabatigroup.com/cv/..."
}
```

Response:
```json
{
  "data": {
    "id": "CAND-2026-XXXXX",
    "job_id": "JOB-2026-001",
    "applied_at": "2026-06-24T10:00:00Z",
    "stage": "submitted",
    "flk_complete": true
  }
}
```

---

### FILE UPLOAD (CV)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/careers/upload/cv` | Upload CV file. Returns storage URL. |

Request: `multipart/form-data` with field `file`.
Accepted types: `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
Max size: 10MB (recommended)

Response:
```json
{
  "data": {
    "url": "https://storage.nabatigroup.com/cv/CAND-2026-XXXXX.pdf",
    "filename": "CV_Nama_Kandidat.pdf",
    "size_bytes": 245678
  }
}
```

---

### RECRUITER-FACING (requires auth)

#### GET `/ta/candidates`
List candidates in pipeline.

Query parameters:
```
job_id=JOB-2026-001
stage=ta_iv_scheduled
recruiter_id=REC-003
q=diandra
page=1
per_page=50
```

Response:
```json
{
  "data": [
    {
      "id": "CAND-2026-00350",
      "name": "Diandra Kusuma",
      "email": "diandra.k@email.com",
      "phone": "+62-812-...",
      "location": "Jakarta",
      "education": "S1 Teknik Informatika, UI",
      "exp_years": 5,
      "last_role": "Senior Product Manager, Tokopedia",
      "stage": "ta_iv_scheduled",
      "score_fit": 91,
      "flk_complete": true,
      "job_id": "JOB-2026-007",
      "recruiter_id": "REC-003",
      "source": "LinkedIn",
      "expected_salary": "Rp 22,000,000 - 28,000,000",
      "available_date": "2026-08-01",
      "applied_at": "2026-06-16T09:00:00Z",
      "notes": "..."
    }
  ],
  "total": 11,
  "page": 1,
  "per_page": 50
}
```

#### PATCH `/ta/candidates/:id/stage`
Update candidate pipeline stage and add recruiter notes.

Request:
```json
{
  "stage": "assessment_sent",
  "notes": "Scheduled psikotes for 28 June via Talentlytica."
}
```

Response:
```json
{
  "data": { "id": "CAND-2026-00350", "stage": "assessment_sent", "updated_at": "..." }
}
```

**Valid stage values (25 total):**

| Stage ID | Label | Phase |
|---|---|---|
| `submitted` | Application Submitted | apply |
| `under_review` | Under Review | apply |
| `ta_iv_scheduled` | TA Interview Scheduled | interview |
| `ta_iv_done` | TA Interview Done | interview |
| `assessment_sent` | Assessment Link Sent | assess |
| `assessment_done` | Assessment Completed | assess |
| `business_case` | Business Case Assigned | assess |
| `user_iv_scheduled` | User Interview Scheduled | interview |
| `user_iv_done` | User Interview Done | interview |
| `doc_collection` | Document Collection | offer |
| `reference_check` | Reference Check | offer |
| `offering_prep` | Offering Preparation | offer |
| `mcu_process` | MCU In Process | offer |
| `mcu_sent` | MCU Letter Sent | offer |
| `ol_reviewed` | Offering Letter Reviewed | offer |
| `ol_sent` | Offering Letter Sent | offer |
| `accepted` | Accepted | close |
| `onboarding` | Onboarding | close |
| `closed` | Application Closed | end |
| `not_passed_screening` | Not Passed - Screening | end |
| `not_passed_ta_iv` | Not Passed - TA Interview | end |
| `not_passed_assess` | Not Passed - Assessment | end |
| `not_passed_user_iv` | Not Passed - User Interview | end |
| `offer_declined` | Offer Declined | end |
| `withdrawn` | Withdrawn | end |

---

### OFFERING LETTER AUTOMATION

#### POST `/ta/candidates/:id/offer-letter` (via OFFER_LETTER_URL)
Trigger generation of Offering Letter via OL Automation microapp.

Request:
```json
{
  "candidate_id": "CAND-2026-00350",
  "job_id": "JOB-2026-007",
  "expected_salary": "Rp 22,000,000 - 28,000,000",
  "recruiter_id": "REC-003"
}
```

Response:
```json
{
  "data": {
    "id": "OL-2026-0042",
    "status": "draft",
    "preview_url": "https://...",
    "generated_at": "2026-06-24T10:30:00Z"
  }
}
```

This endpoint is separate from BASE_URL and configured via `API_CONFIG.OFFER_LETTER_URL`.

---

### ADMIN-FACING (requires auth)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/jobs` | List all jobs (including drafts) |
| POST | `/admin/jobs` | Create new job posting |
| PATCH | `/admin/jobs/:id` | Update job posting fields |
| PATCH | `/admin/jobs/:id/status` | Publish or unpublish: `{ "status": "open" \| "draft" }` |

---

## localStorage Keys

The frontend uses these localStorage keys for candidate-facing features:

| Key | Contents | Scope |
|---|---|---|
| `nabati_candidate_profile` | Saved FLK profile for one-time-fill | Candidate browser |
| `nabati_applications` | Submitted application records | Candidate browser |
| `nabati_session` | Session state | Candidate browser |
| `linkedin_parsed` | LinkedIn profile parsed data | Candidate browser, session |

**Note:** These keys store candidate data client-side. For production, the submitted application data must be persisted server-side via POST `/careers/applications`. Client-side storage is only used for UX (pre-fill, status display).

---

## Security Notes

1. **Sensitive data in localStorage:** The FLK form temporarily stores candidate data (including KTP, NPWP, health history) in localStorage during form fill. This data is cleared after successful submission. For shared-device environments (kiosk, public computer), consider adding session timeout and explicit clear on tab close.

2. **PDP Consent records:** The 5 consent flags (`consent_pdp`, `consent_sensitive`, `consent_data`, `consent_pool`, `consent_alerts`) are submitted as part of the application payload and must be stored server-side as the official consent record. Client-side boolean alone is not sufficient for compliance.

3. **JWT refresh:** If token expiry is less than 8 hours, implement token refresh logic. Current frontend does not have refresh; user will need to re-login after expiry.

4. **CSRF:** POST endpoints should implement CSRF protection (e.g., CSRF token in response header, validated on POST).

---

## Contact

One HCMS Product Team
one-hcms@nabatigroup.com
Nabati Group | Bandung, Indonesia
