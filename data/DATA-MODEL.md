# Data model

Two shapes power the package. Both are bilingual, expressed as a pair of strings
ordered Indonesian first, English second.

## Job

```
{
  "id": "NAB-DA-2213",            // stable identifier, prefix NAB
  "t":  ["Judul", "Title"],        // role title
  "cat": "tech",                   // sales | mfg | scm | corp | tech
  "country": "PH",                 // ISO like code, see country list
  "city": ["Kota", "City"],
  "type": "full",                  // full | part | contract | intern
  "lvl": "entry",                  // entry | mid | senior | exec
  "date": "2026-06-05",            // posting date, ISO
  "sum": ["Ringkasan", "Summary"],
  "resp": [["Tugas", "Duty"]],     // responsibilities, list of pairs
  "qual": [["Syarat", "Req"]],     // qualifications, list of pairs
  "status": "published"            // published | draft  (admin only)
}
```

The candidate site consumes only published jobs and ignores the status field.
`jobs.sample.json` shows the exported, candidate ready form.

## Application

```
{
  "<application number>": {
    "role":  ["Posisi", "Role"],
    "email": "person@example.com",
    "when":  "10 Jun 2026",
    "stage": 1,                    // 0 received, 1 review, 2 interview, 3 decision, -1 withdrawn
    "outcome": "offer",            // offer | not_selected  (only at stage 3)
    "interview": {
      "date": "18 Jun 2026",
      "time": "10:00 WIB",
      "start": "20260618T100000",  // machine time for calendar export
      "mode": ["Daring", "Online"]
    },
    "docs": [["KTP", "National ID"]],   // requested documents
    "interviewConfirmed": true,         // set by the candidate
    "docsSubmitted": true               // set by the candidate
  }
}
```

Fields the recruiter writes: stage, outcome, interview, docs. Fields the
candidate writes: the application itself, interviewConfirmed, docsSubmitted.
This separation is the contract that keeps both surfaces honest.

## Reference lists
- Category: sales, mfg, scm, corp, tech
- Country: ID, CN, MY, IN, TH, PH, VN, KH, MM
- Type: full, part, contract, intern
- Level: entry, mid, senior, exec
