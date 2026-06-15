# Deploying the Talent Acquisition package

Two static pages, one origin. The candidate site is the public landing page at
the root. The admin console lives at its own path. Both share one origin, so the
live link between them (job publishing, application pipeline, stage
notifications) works automatically.

## What lands where

- Visiting the root shows the candidate career site (`index.html`). This is
  intended: it is the public front door for applicants.
- The recruiter console is at `/admin` (or `/admin.html`). It is not linked from
  the public site. Reach it by typing the path. So a candidate never lands on
  the admin by accident, and a recruiter just opens the `/admin` URL.

## Option A: Vercel (fastest)

1. Push the `nabati-career` folder to a GitHub repo, or use Vercel drag and drop
   to import the folder directly.
2. In Vercel, choose New Project and import it.
3. Framework Preset: Other. Build Command: leave empty. Output: the folder that
   contains `index.html`.
4. If you kept the files inside a `nabati-career` subfolder, set the Vercel Root
   Directory to `nabati-career` so `index.html` is the deploy root.
5. Deploy. The included `vercel.json` enables clean URLs, so:
   - Candidate: `https://<project>.vercel.app/`
   - Admin: `https://<project>.vercel.app/admin`
6. Open both in two tabs to confirm the live link.

## Option B: GitHub Pages

1. Push the folder contents to a repo.
2. Settings, then Pages, then Source: deploy from branch, `main`, root.
3. URLs:
   - Candidate: `https://<user>.github.io/<repo>/`
   - Admin: `https://<user>.github.io/<repo>/admin.html`
   GitHub Pages does not strip `.html`, so use `admin.html` there.

## If /admin returns 404

The 404 means Vercel did not find a file at that path. Check in this order:

1. Open `/admin.html` (with the extension). If that works, only the clean route
   is missing: make sure `vercel.json` sits in the same folder as `index.html`
   at the deploy root, then redeploy.
2. If `/admin.html` also 404s, then `admin.html` is not at the deploy root.
   Confirm `index.html` and `admin.html` are side by side in the deployed
   directory. If your repo keeps them inside a `nabati-career` subfolder, set
   the Vercel Root Directory to `nabati-career`.
3. The included `vercel.json` uses a rewrite so `/admin` serves `admin.html`.
   Any change to `vercel.json` only takes effect after a new deploy.

## Same-origin note

The two pages exchange state through browser storage scoped to the origin.
Because `index.html` and `admin.html` are deployed together, they are always on
the same origin and the live link needs no configuration. Keep them in one
project and one deployment. Do not split the admin into a separate project.

## Demo reminder

The admin sign in (`admin` / `nabatiHC-123!`) is a front end gate for the
prototype only. Replace it with real authentication and access control before
any real use. See `HANDOVER.md`.
