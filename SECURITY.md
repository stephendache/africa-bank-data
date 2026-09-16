# Security Policy

## Supported Versions

Africa Bank Data is an evolving, pre-1.0 open dataset with starter tooling.
Security fixes are applied to the latest state of the `main` branch only.
We do not backport fixes to older commits or tags.

| Version         | Supported |
| --------------- | --------- |
| `main` (latest) | ✅        |
| older commits   | ❌        |

## Reporting a Vulnerability

Please report security issues privately — do not open a public issue for
anything sensitive.

- Preferred: GitHub **Private vulnerability reporting** for this repo
  (Security → "Report a vulnerability").
- Alternative: email paulstephenedache@gmail.com with the details below.

Please include:

- a description of the issue and its impact,
- steps to reproduce or a proof of concept,
- affected files, endpoints, or data records,
- any suggested remediation.

### What to expect

- Acknowledgement within 3 business days.
- An initial assessment and severity triage within 7 business days.
- Progress updates until resolution, and credit in the fix/advisory if you want it.
- Coordinated disclosure: we aim to release a fix within 90 days and ask that
  you keep the report private until then.

## Scope

In scope:

- Code vulnerabilities in the starter API (`api/`), the JS SDK (`packages/js-sdk/`),
  and the scripts (`scripts/`) — e.g. path traversal, denial of service,
  ReDoS, or prototype pollution.
- Vulnerabilities in declared dependencies (currently `express`).
- Accidental exposure of secrets or credentials in the repository history.

Out of scope:

- The starter API and SDK are reference implementations, not hardened
  production services. Running them publicly without adding authentication,
  rate limiting, and transport security is the operator's responsibility.
- Vulnerabilities in third-party bank websites or systems referenced by the data.

## Data integrity and abuse

Because this project is a bank directory, incorrect or malicious data can cause
real financial harm. Report the following through the **private** channel above,
not a public issue:

- a record whose `website` or `support_email` points to a phishing or
  impersonation domain,
- a `code`, `ussd`, or other field that could misroute payments,
- any entry that appears deliberately falsified.

Routine, non-sensitive corrections (a typo, an outdated URL) can go through a
normal issue or pull request as described in CONTRIBUTING.md.

## Safe harbor

We support good-faith security research. When acting in good faith under this
policy, you may investigate and report issues without fear of legal action.
Please avoid privacy violations, data destruction, service disruption, and any
testing against real third-party banking systems.
