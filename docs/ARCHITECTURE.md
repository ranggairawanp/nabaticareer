# Architecture

## Two surfaces, one contract

The package ships two browser surfaces that never duplicate logic for the data
they share.

1. Candidate site (`index.html`). Public. Lists published roles, lets a person
   apply, tracks their applications, and guides them on the next step.
2. Admin console (`admin.html`). Internal. Manages job postings and drives every
   application through its lifecycle.

Both read and write two stores, keyed in browser storage on the shared origin.

- Jobs store. Owned by the admin. The candidate site consumes only published
  jobs. The admin can export the published set as JSON for the platform to
  ingest, and import a JSON set back.
- Applications store. Written from both sides. The candidate creates an
  application and later confirms attendance or uploads requested documents. The
  recruiter advances the stage, records the decision, schedules interviews, and
  requests documents.

## The application lifecycle

Stages are received, under review, interview, decision, plus a withdrawn state.
At the decision stage the outcome is either an offer or not selected. When a
recruiter sets any of these, the candidate side immediately reflects it through
a single guidance panel that explains the current step and the action expected,
if any.

Interview scheduling carries a machine readable start time so the candidate can
download a calendar file. Document requests carry a list the candidate can act
on. None of this exposes a numeric score of the person, by design.

## Why state, not a database, in the prototype

A prototype that runs with no backend keeps the feedback loop fast and lets
stakeholders click through the full journey. The data contract in
`data/DATA-MODEL.md` is written so the same shapes map cleanly onto platform
tables and an API when the prototype graduates. The export and import of jobs as
JSON is the seam where the platform takes over.

## Internationalization

Every label exists in Indonesian and English and switches live. Content authored
in the admin, such as a job description, is captured in both languages so the
candidate site can present either without a translation step.
