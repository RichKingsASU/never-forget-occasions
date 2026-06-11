-- =============================================================================
-- NFO / MomentAI — Revoke client writes on entitlement & financial tables
-- Migration: 20260609120000_revoke_client_writes_entitlement_tables.sql
--
-- Context (security finding H-1):
--   The initial schema granted owner-scoped INSERT/UPDATE/DELETE on tables that
--   represent money or entitlements. Because the only RLS check is
--   `user_id = auth.uid()`, an authenticated user — using the public anon key
--   directly from the browser — could insert/update arbitrary values on their
--   own rows: self-grant tokens (token_ledger), create $0 / "placed" orders,
--   zero out generation_jobs.token_cost, or flip delivery status.
--
-- This migration makes these tables READ-ONLY from the client by dropping every
-- owner write policy (INSERT, UPDATE, DELETE). Owner SELECT policies are left
-- UNCHANGED, so users keep visibility into their own rows. With RLS enabled and
-- no write policy present, anon/authenticated writes are denied by default;
-- the service role (used server-side in Edge Functions / trusted tooling)
-- bypasses RLS and remains the only writer.
--
-- Intentionally NOT included here (Phase 1 work, separate branch):
--   • Replacement server-side write paths (RPCs / Edge Functions)
--   • Balance-integrity guards on token_ledger (negative balance / double-spend)
--
-- Safety: verified there is zero application code that writes to any of these
-- tables at the audited commit, so this change breaks no existing client flow.
-- =============================================================================

-- ── token_ledger (append-only ledger; only an INSERT policy existed) ──────────
drop policy if exists "token_ledger: owner insert" on public.token_ledger;

-- ── orders ────────────────────────────────────────────────────────────────────
drop policy if exists "orders: owner insert" on public.orders;
drop policy if exists "orders: owner update" on public.orders;
drop policy if exists "orders: owner delete" on public.orders;

-- ── order_items ───────────────────────────────────────────────────────────────
drop policy if exists "order_items: owner insert" on public.order_items;
drop policy if exists "order_items: owner update" on public.order_items;
drop policy if exists "order_items: owner delete" on public.order_items;

-- ── generation_jobs ───────────────────────────────────────────────────────────
drop policy if exists "generation_jobs: owner insert" on public.generation_jobs;
drop policy if exists "generation_jobs: owner update" on public.generation_jobs;
drop policy if exists "generation_jobs: owner delete" on public.generation_jobs;

-- ── deliveries ────────────────────────────────────────────────────────────────
drop policy if exists "deliveries: owner insert" on public.deliveries;
drop policy if exists "deliveries: owner update" on public.deliveries;
drop policy if exists "deliveries: owner delete" on public.deliveries;

-- Owner SELECT policies are intentionally retained on all five tables:
--   "token_ledger: owner select", "orders: owner select",
--   "order_items: owner select", "generation_jobs: owner select",
--   "deliveries: owner select".
-- RLS remains enabled; absence of a write policy = default-deny for client writes.
