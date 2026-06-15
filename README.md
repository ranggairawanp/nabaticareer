# One HCMS - Nabati Career Site (Blueprint Package)

A self contained, production leaning blueprint for the Nabati Group careers
experience. It contains a candidate facing site and a recruiter facing admin
console that share one data contract. The package is structured so it can be
lifted into the internal One HCMS platform with minimal change.

## What is inside

```
nabati-career/
  index.html            Candidate facing career site (standalone)
  admin.html            Recruiter and admin console (standalone)
  data/
    jobs.sample.json     Sample published jobs in the shared schema
    DATA-MODEL.md        Field by field contract for jobs and applications
  docs/
    ARCHITECTURE.md      How the two surfaces connect and the data flow
    ROLES-AND-ACCESS.md  Personas and what each one can do
    INTERNAL-REUSE.md    Path to reuse this for internal One HCMS
  assets/
    brand/nabati-logo.png  Brand mark (red droplet plus wordmark)
    images/                Source photography used across the site
    README.md              Asset usage notes
```

## Run it

Both HTML files are standalone. Fonts and images are embedded, so they render
with no server and no internet, including the Design System v3 typefaces
(Bricolage Grotesque, Geist, Geist Mono). Open `index.html` or `admin.html`
directly in a browser.

For the two surfaces to share live data (applications, job postings) they must
sit on the same web origin, since they exchange state through the browser
storage of that origin. Serve the folder with any static server, for example
`python3 -m http.server`, then open the two files from that origin.

## Live deployment

The candidate site is the public front door and is served at the site root. The
admin console is a separate page at its own path and is not linked from the
public site. On a typical deploy:

- Candidate site: `https://<your-domain>/`
- Admin console: `https://<your-domain>/admin` (or `/admin.html`)

Both pages sit on the same origin, so the live link between them works with no
extra setup. A `vercel.json` is included for a clean `/admin` URL. Full steps
for Vercel and GitHub Pages are in `DEPLOY.md`.

## How the surfaces connect

The admin console is the source of truth for job postings and for the status of
every application. A recruiter creates and publishes jobs, then moves each
applicant through the pipeline, schedules interviews, and requests documents.
The candidate site reads that same state and shows the candidate exactly where
they stand and what to do next. See `docs/ARCHITECTURE.md`.

## Admin demo access

Username `admin`, password `nabatiHC-123!`. This is a prototype gate only and
must be replaced by the platform identity provider before any real use.

## Design system

White background, Nabati red #E1231B as the primary accent, charcoal #1F242C
for ink. Bricolage Grotesque for display, Geist for interface text, Geist Mono
for numbers and identifiers. All three are embedded as web fonts so the brand
look never depends on an external font service.
