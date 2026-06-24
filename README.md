# Nabati Career Microapp

**One HCMS — Talent Acquisition Module**
Static web application for Nabati Group career site, FLK digital application form, and TA console.

> Version 1.0 | June 2026 | Ready for handover to IT Nabati

---

## Package Contents

| File | Purpose | Users |
|---|---|---|
| `index.html` | Public career site — job listings, search, apply | External candidates |
| `auth.html` | Sign-up / Login (Google, LinkedIn, email) | All users |
| `apply.html` | FLK digital form — 6-step, 90+ fields, UU PDP consent | Candidates |
| `recruiter.html` | Recruiter & TA Manager console — pipeline, kanban, dashboard | TA team |
| `admin.html` | Admin dashboard — job management, funnel, team performance | Career admin |
| `nabati_career_data.js` | Shared data layer + API stubs | Loaded by all pages |
| `API_INTEGRATION_GUIDE.md` | IT handover guide — all endpoints, payload, response format | IT team |
| `vercel.json` | Deploy config — security headers, clean URLs | DevOps |

---

## Quick Start

No build step required. Open `index.html` in any browser.

For demo credentials (TA Console):
- Ratna Suminar (TA Manager): select from persona dropdown in recruiter.html
- Stella Sondjaja (TA Asst. Manager): same
- Syifa Ramadhani (TA Specialist): same
- Madyasti Putri (TA Specialist): same

---

## Deploy

### Vercel (recommended for demo)
```
git push to GitHub -> import repo in Vercel -> auto-deploys
```

### GitHub Pages
```
Settings -> Pages -> Deploy from branch (main, / root)
```

### Nabati IT (production)
```bash
# Nginx
cp -r . /var/www/nabati-careers/

# Apache
cp -r . /var/www/html/nabati-careers/
```

---

## Connect to Backend

**Current state: running on mock data (USE_MOCK = true)**

To connect to Nabati HCMS backend, edit `nabati_career_data.js`:

```js
var API_CONFIG = {
  BASE_URL: 'https://api.nabatigroup.com/hcms/v1',  // confirm with IT
  USE_MOCK: false,                                    // set to false for production
  OFFER_LETTER_URL: 'https://api.nabatigroup.com/hcms/v1/offer-letter'
};
```

Full endpoint documentation in `API_INTEGRATION_GUIDE.md`.

---

## Key Features

### Career Site (index.html)
- 18 open positions across 10 departments and 15+ countries
- Bilingual ID/EN toggle
- Search by function, division, or skill
- Category filter + level filter
- Anti-scam banner (Nabati never charges recruitment fees)
- TASTE values employer brand section
- LinkedIn OAuth import + Google OAuth

### FLK Digital Form (apply.html)
- 6 steps: CV & Profile, Personal Info, Education & Family, Skills & Experience, Role Details, Review
- Follows exact FLK section order: I -> II.A -> II.B -> III -> IV -> V -> VI -> VII -> VIII -> IX -> X -> XI
- UU PDP No. 27/2022 compliant: 5 separate consents (3 required, 2 optional)
- One-time fill: profile saved after first application, pre-filled on subsequent applies
- LinkedIn profile parsing to pre-fill form

### Recruiter Console (recruiter.html)
- Dual persona: TA Manager (dashboard + all pipeline) vs Recruiter Specialist (own pipeline only)
- 25 pipeline stages matching Nabati TA Business Process (Current TA KSNI BP)
- Kanban board with 12 active stages
- TA Manager dashboard: 6 stat cards, recruitment funnel, applicants-per-position chart, stage distribution, team performance with conversion rates
- Candidate drawer: stage update, notes, Generate Offer Letter button (triggers OL Automation microapp)

### Admin Dashboard (admin.html)
- Recruitment funnel overview
- Stage distribution
- Team performance table
- Job posting management (publish/draft/assign recruiter)
- Link to TA Console

---

## Pipeline Stages (25 total)

**Active (18):**
`submitted` -> `under_review` -> `ta_iv_scheduled` -> `ta_iv_done` -> `assessment_sent` -> `assessment_done` -> `business_case` -> `user_iv_scheduled` -> `user_iv_done` -> `doc_collection` -> `reference_check` -> `offering_prep` -> `mcu_process` -> `mcu_sent` -> `ol_reviewed` -> `ol_sent` -> `accepted` -> `onboarding`

**Terminal (7):**
`closed` | `not_passed_screening` | `not_passed_ta_iv` | `not_passed_assess` | `not_passed_user_iv` | `offer_declined` | `withdrawn`

---

## Pre-Go-Live Checklist (IT)

- [ ] `privacy@nabatigroup.com` active and monitored (required for UU PDP compliance)
- [ ] Offering Letter Automation endpoint URL confirmed for staging + production
- [ ] JWT auth: token endpoint, expiry policy, CORS domain confirmed
- [ ] File upload endpoint (S3/GCS) for CV submissions
- [ ] BASE_URL confirmed for staging and production environments

See `API_INTEGRATION_GUIDE.md` for full technical specification.

---

## Architecture Notes

- Pure static HTML/CSS/JS — zero framework, zero build dependency
- All pages load `nabati_career_data.js` which provides API functions and mock data
- Auth token stored in `sessionStorage` under key `nabati_auth_token`
- `_authHeaders()` auto-injects `Authorization: Bearer {token}` on all authenticated requests
- Candidate application data temporarily stored in `localStorage` during form fill
- `USE_MOCK = true` uses local mock data; `USE_MOCK = false` calls real API endpoints

---

## Known Limitations (v1.0)

- File upload is simulated (no actual S3/GCS call) — requires backend endpoint
- Auth is mocked (no real OAuth flow) — requires integration with Nabati auth service
- No pagination on candidate list (client-side filter) — suitable for demo, needs server-side pagination for production scale
- No real-time notifications — recruiter must refresh to see new applicants
- index.html (~1.4MB) includes base64 hero image — replace with CDN URL for production

---

## Contact

Product Owner: One HCMS Product Team
Email: one-hcms@nabatigroup.com
Nabati Group | Bandung, Indonesia
