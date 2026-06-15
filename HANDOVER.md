# One HCMS Talent Acquisition - Handover Summary

A one-page brief for product and engineering. This package is a functional, standalone prototype: two HTML files plus supporting docs. No backend, no build step, no dependencies. Open the files in a browser and they run.

## Files

| File | Role |
| --- | --- |
| `index.html` | Candidate-facing career site (job search, detail, apply, status, account). |
| `admin.html` | Recruiter Admin Console (dashboard, jobs CRUD, applications pipeline). |
| `data/jobs.sample.json` | Sample published-jobs payload in candidate schema. |
| `data/DATA-MODEL.md` | Job and application field reference. |
| `docs/ARCHITECTURE.md` | Rendering model, state, file structure. |
| `docs/ROLES-AND-ACCESS.md` | Personas and access notes. |
| `docs/INTERNAL-REUSE.md` | How to reuse the patterns internally. |
| `assets/` | Brand logo and imagery. |

Both HTML files embed their own fonts (Bricolage Grotesque, Geist, Geist Mono) and the Nabati logo as data URIs, so they work fully offline.

## Access

Admin Console sign-in: user `admin`, password `nabatiHC-123!`. This is a client-side demo gate only (stored as `nabAdminAuth`), not real authentication. The candidate site needs no login.

## How to run

Serve both files from the same origin (same host and path), for example a simple static server, then open each in its own browser tab. The two apps talk to each other through shared browser storage, which is scoped per origin. Opening the two files from different folders or as raw `file://` paths can isolate their storage in some browsers and break the live link.

## Data flow

The two apps share state through the browser. There is no server in between.

1. Jobs (admin to site). The recruiter manages jobs in the admin store (`nabAdminJobs`). On any change (save, delete, publish toggle) the admin writes the published set to `nabPublishedJobs` and the full managed-id list to `nabJobIndex`. The site merges these over its built-in seed: jobs the admin manages are driven by the admin, demo jobs the admin does not touch stay visible. Draft jobs never reach the site.
2. Applications (site to admin). When a candidate applies, the site writes the application to `nabApps` and saves the candidate profile to `nabCandidate`. The admin reads `nabApps` directly. Applications not yet opened by a recruiter are counted as new (tracked in `nabAdminSeen`) and shown with a nav badge, a dashboard KPI, and a New tag on the row. Opening an application marks it seen.
3. Notifications (admin to candidate). When the recruiter changes stage, sets an outcome, or schedules an interview, the admin appends a bilingual message to `nabInbox`. The candidate sees it in the account inbox with an unread badge, and tapping it opens the matching application status.

Real-time: both apps listen for storage changes. With the site and admin open side by side on the same origin, a change in one tab updates the other without a manual refresh.

## localStorage keys

| Key | Written by | Read by | Purpose |
| --- | --- | --- | --- |
| `nabPublishedJobs` | admin | site | Published jobs in candidate schema. |
| `nabJobIndex` | admin | site | All admin-managed job ids (for merge and hide). |
| `nabApps` | site, admin | site, admin | Applications, keyed by application number. |
| `nabInbox` | site, admin | site | Candidate inbox messages. |
| `nabAdminSeen` | admin | admin | Application ids a recruiter has opened. |
| `nabAdminJobs` | admin | admin | Admin source list of jobs (with status). |
| `nabAdminAuth` | admin | admin | Demo sign-in flag. |
| `nabAdminLang` | admin | admin | Admin language. |
| `nabCandidate` | site | site | Demo candidate profile. |
| `nabSavedJobs` | site | site | Saved jobs. |
| `nabDraft_<jobId>` | site | site | Per-job application draft. |
| `nabInbox`, `nabLang`, `nabAiNudge` | site | site | Inbox, language, AI nudge state. |

## Demo limitations

- Single browser, single origin. State lives in the visitor's browser, not on a server, so it is per-device and resets if storage is cleared. It is not a multi-user backend.
- The admin sign-in is a front-end gate for demo flow only and provides no security.
- The candidate inbox is not keyed by email, so in the demo all notifications surface for the active candidate.
- HC AI in the prototype is scripted guidance, not a live model call.
- Job ids generated in the admin are random and for demo use.

## Suggested next steps for the build team

- Replace shared browser storage with API endpoints (jobs, applications, notifications) keeping the same field shapes, so the front-end logic carries over with minimal change.
- Add real authentication and role scoping for the admin surface, aligned with `docs/ROLES-AND-ACCESS.md`.
- Key the candidate inbox and applications to an identity so notifications are per-person.
- Move HC AI from scripted prompts to a governed service, with human-in-the-loop kept before any adverse action.
