# Roles and access

This blueprint covers the candidate journey and the recruiter and admin journey.
It is designed to slot under the One HCMS authority model rather than invent a
new one. Below is the working set for this surface.

## Candidate (public)
- Browse and search published roles, filter by country, category, level, type.
- Apply, with a reusable profile for faster repeat applications.
- Track every application, see the current stage and the final decision.
- Confirm interview attendance, download a calendar file, submit requested
  documents, and manage saved roles and an inbox of notifications.

## Recruiter
- Create, edit, publish, and unpublish job descriptions.
- Move applicants through the pipeline and record the decision.
- Schedule interviews and request documents.

## Talent acquisition admin
- Everything a recruiter can do.
- Export the published job set for the platform and import a job set.

## Notes for platform integration
- The demo login is a placeholder. Replace it with the One HCMS identity
  provider and bind the actions above to the real authority and delegation
  model, where the approver is decided by structure rather than a fixed name.
- Decisions that affect a person are never automated. A human records the
  outcome, consistent with the platform stance on adverse actions.
- No demographic attribute is ever used as a ranking or scoring input.
