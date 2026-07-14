# CWE-798 (Use of Hard-coded Credentials) Remediation Progress

**Session ID**: `c0d92196-b74e-45bf-9f35-72950516d290`  
**Branch**: `modernize/java-20260704212907`  
**Language**: Java + Next.js  
**Started**: 2026-07-05  

## General

| Field | Value |
|-------|-------|
| Previous branch (HEAD) | `modernize/java-20260704212907` |
| Current branch | `modernize/java-20260704212907` (coordinator pre-created) |

## Progress

- [✅] Migration Plan Generated ([plan-c0d92196.md](./plan-c0d92196.md))
- [✅] Version Control Setup (branch already active: `modernize/java-20260704212907`)
- Code Migration
    - [⌛️] `f1-dashboard/src/main/java/com/example/f1_dashboard/impl/F1ScheduleImpl.java` — remove commented-out credential block
    - [ ] `f1-dashboard/src/main/resources/application.properties` — add explicit `f1.api.key=${F1_API_KEY}` mapping
    - [ ] `f1-dashboard/src/main/resources/application.properties.example` — create operator template (tracked in git)
    - [ ] `f1-dashboard/.gitignore` — strengthen to also exclude `application-*.properties`
    - [ ] `docker-compose.yml` — add `F1_API_KEY` env var placeholder for backend service
    - [ ] `render.yaml` — add `F1_API_KEY` secret env var for backend service
- Validation & Fixing
    - [ ] Build Environment Setup
    - [ ] Build and Fix (up to 10 rounds)
    - [ ] CVE Check
    - [ ] Consistency Check
    - [ ] Test Fix
    - [ ] Completeness Check
    - [ ] Build Validation
- [ ] Final Summary ([summary-c0d92196.md](./summary-c0d92196.md))
    - [ ] Final Code Commit
    - [ ] Migration Summary Generation

## Issues Log

_No issues recorded yet._
