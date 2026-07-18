# Supabase Forensics Audit: Never Forget Occasions (NFO)
**Audit Date**: June 11, 2026  
**Auditor**: Database Auditor / Principal Software Engineer  
**Project ID / Reference**: `zmipvtryvnwrbzqnludu`  
**Production URL**: Missing / Prototype  

---

## 1. Schema Truth & Git Migrations
* **Status**: **EXISTS (in git)**  
* **Details**: Version-controlled migrations exist under `supabase/migrations/`:
  - `20260603094501_initial_schema.sql` (defines profiles, contacts, occasions, subjects, templates, generation_jobs, media_assets, token_ledger, orders, order_items, deliveries, and shares).

---

## 2. Supabase Cloud Connection & Project Status
* **Endpoint Checked**: `https://zmipvtryvnwrbzqnludu.supabase.co`
* **DNS Resolution Status**: **NXDOMAIN** (Name or service not known)
* **API Availability**: **MISSING** / Unreachable  

```bash
$ nslookup zmipvtryvnwrbzqnludu.supabase.co
Server:         127.0.0.53
Address:        127.0.0.53#53

** server can't find zmipvtryvnwrbzqnludu.supabase.co: NXDOMAIN
```

---

## 3. Audit Verdict (Honest Scoping Caveat)
As per the **Pre-launch caveat (honest scoping)** rules:
> *If NFO is still concept/prototype stage with no live Supabase project or deployed frontend, NFO-1 collapses in five minutes to "project EXISTS / MISSING" — and that answer is the audit. The rest of the pack waits until there's a system to audit.*

**Final Verdict**: **MISSING / PRE-LAUNCH PROTO-STAGE**  
The remote Supabase project is not currently provisioned or active in the cloud under the target project reference. The schema code exists in git, but there is no live cloud database instance running to execute further forensic queries (size, growth, active RLS policies, index scans, or pg_cron scheduler details).
