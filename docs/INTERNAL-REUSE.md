# Path to internal reuse

This careers blueprint is also a template for an internal opportunity
marketplace inside One HCMS, where employees discover internal roles, projects,
and mobility paths. The structure was chosen with that reuse in mind.

## What carries over directly
- The job posting schema. An internal role is the same shape as an external one,
  with a flag for internal visibility and an eligibility note.
- The application lifecycle and the candidate guidance panel. An internal
  applicant moves through the same stages and sees the same clear next step.
- The bilingual content model, the design system, and the embedded fonts.

## What changes for internal
- Identity. The public login becomes the employee single sign on, and the
  candidate becomes a known worker with a global person identity. Profile data
  is read from the worker record rather than typed.
- Visibility. Internal roles can be scoped by entity, business unit, country, or
  grade. The same country filter generalizes to an organization filter.
- Governance. Manager awareness and approval enter the flow, decided by the
  structure based authority model, not by a fixed name.
- Residency. Personal data stays within its zone. The export seam already keeps
  the candidate site free of any permanent global identity view.

## Suggested next building blocks
- A worker facing entry point that reuses `index.html` with SSO and worker data.
- An internal eligibility rule layer on top of the job schema.
- A manager view that surfaces team members who applied, within authority.
