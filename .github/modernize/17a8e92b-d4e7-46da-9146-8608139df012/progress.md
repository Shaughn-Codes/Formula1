# CWE-789 Security Fix Progress

**Session ID**: 17a8e92b-d4e7-46da-9146-8608139df012  
**Task**: Scan and resolve CWE-789 (Memory Allocation with Excessive Size Value)  
**Branch**: `modernize/java-20260704212907`  
**Date**: 2026-07-04  

## Progress

- [✅] Migration Plan Generated
- [✅] Version Control Setup (branch: `modernize/java-20260704212907` — already checked out by coordinator)
- Code Migration
    - [⌛️] f1-dashboard/src/main/java/com/example/f1_dashboard/controller/F1NewsController.java
- Validation & Fixing
    - [⌛️] Build and Fix
    - [ ] CVE Check
    - [ ] Test Validation
    - [ ] Build Validation
- [ ] Final Summary

## Plan

### Vulnerability
CWE-789: The `@PathVariable` `limit` in `F1NewsController.getF1News()` is accepted without bounds validation and passed directly to `F1NewsImpl`, allowing an attacker to supply an arbitrarily large value (e.g., `9999999`) to force allocation of an excessively large array in memory.

### Fix
- Parse `limit` to `int` in `F1NewsController`
- Validate that the value is in range [1, 100]
- Return HTTP 400 if the value is out of range or not a valid integer
- Pass the validated value (as String) to the service layer

### Files Changed
- `f1-dashboard/src/main/java/com/example/f1_dashboard/controller/F1NewsController.java`
