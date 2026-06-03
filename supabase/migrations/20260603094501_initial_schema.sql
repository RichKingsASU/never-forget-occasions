-- =============================================================================
-- NFO / MomentAI — Initial Schema
-- Migration: 20260603094501_initial_schema.sql
--
-- Layers:
--   1. Occasion trigger engine  → profiles, contacts, occasions
--   2. AI creation studio       → subjects, templates, generation_jobs,
--                                  media_assets, token_ledger
--   3. Delivery & share         → orders, order_items, deliveries, shares
--
-- Design rules:
--   • uuid PKs via gen_random_uuid()
--   • timestamptz created_at/updated_at with defaults
--   • Explicit ON DELETE behaviour on every FK
--   • Index on every FK + every high-cardinality lookup column
--   • RLS enabled on every table; owner policies keyed on auth.uid()
--   • token_ledger is APPEND-ONLY: no UPDATE/DELETE policies
--   • Subscriptions/billing deferred to a second migration
-- =============================================================================

-- ---------------------------------------------------------------------------
-- ENUMS
-- ---------------------------------------------------------------------------

create type public.job_status as enum ('queued', 'running', 'succeeded', 'failed');
create type public.subject_kind as enum ('person', 'pet');
create type public.asset_kind as enum ('image', 'video', 'reference');
create type public.ledger_reason as enum ('purchase', 'grant', 'job_debit', 'job_refund');

-- ---------------------------------------------------------------------------
-- LAYER 1 — OCCASION ENGINE
-- ---------------------------------------------------------------------------

-- profiles
-- One row per auth user. Auto-created by handle_new_user trigger below.
create table public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  display_name  text,
  timezone      text not null default 'UTC',
  default_tone  text not null default 'Warm',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- contacts
create table public.contacts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  name        text not null,
  relationship text,
  email       text,
  phone       text,
  birthday    date,
  notes       text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index contacts_user_id_idx on public.contacts (user_id);

-- occasions
create table public.occasions (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade,
  contact_id     uuid not null references public.contacts (id) on delete cascade,
  type           text not null,
  date           date not null,
  recurring      boolean not null default false,
  reminder_days  int not null default 7,
  status         text not null default 'upcoming',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index occasions_user_id_idx    on public.occasions (user_id);
create index occasions_contact_id_idx on public.occasions (contact_id);
create index occasions_date_idx       on public.occasions (date);

-- ---------------------------------------------------------------------------
-- LAYER 2 — AI CREATION STUDIO
-- Note: subjects references media_assets (forward FK resolved below via ALTER)
-- ---------------------------------------------------------------------------

-- media_assets  (declared before generation_jobs / subjects to satisfy FKs)
-- job_id is nullable here; generation_jobs will back-reference this table.
-- We handle the circular dependency with an ALTER TABLE after both tables exist.
create table public.media_assets (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  job_id        uuid,   -- FK added after generation_jobs is created (see below)
  storage_path  text not null,
  kind          public.asset_kind not null default 'image',
  status        text not null default 'pending',
  created_at    timestamptz not null default now()
);
create index media_assets_user_id_idx on public.media_assets (user_id);
create index media_assets_job_id_idx  on public.media_assets (job_id);

-- subjects  (the likeness a user inserts into scenes)
-- reference_asset_id FK resolved after media_assets exists
create table public.subjects (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users (id) on delete cascade,
  name                text not null,
  kind                public.subject_kind not null default 'person',
  reference_asset_id  uuid references public.media_assets (id) on delete set null,
  created_at          timestamptz not null default now()
);
create index subjects_user_id_idx on public.subjects (user_id);

-- templates
create table public.templates (
  id            uuid primary key default gen_random_uuid(),
  creator_id    uuid references auth.users (id) on delete set null,
  title         text not null,
  description   text,
  scene_prompt  text not null,
  aesthetic     text,
  is_public     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index templates_creator_id_idx on public.templates (creator_id);
create index templates_is_public_idx  on public.templates (is_public) where is_public = true;

-- generation_jobs
create table public.generation_jobs (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users (id) on delete cascade,
  template_id     uuid references public.templates (id) on delete set null,
  subject_id      uuid references public.subjects (id) on delete set null,
  status          public.job_status not null default 'queued',
  token_cost      int not null default 0,
  output_asset_id uuid references public.media_assets (id) on delete set null,
  error           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index generation_jobs_user_id_idx     on public.generation_jobs (user_id);
create index generation_jobs_status_idx      on public.generation_jobs (status);
create index generation_jobs_template_id_idx on public.generation_jobs (template_id);

-- Resolve circular FK: media_assets.job_id → generation_jobs
alter table public.media_assets
  add constraint media_assets_job_id_fkey
  foreign key (job_id) references public.generation_jobs (id) on delete set null;

-- token_ledger (APPEND-ONLY — see RLS section)
-- Balance = SUM(delta) per user. Negative delta = debit. Positive = credit.
-- A job writes job_debit on submission; on failure write a job_refund row.
-- Never UPDATE or DELETE rows; there are intentionally no UPDATE/DELETE policies.
create table public.token_ledger (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  delta       int not null,
  reason      public.ledger_reason not null,
  job_id      uuid references public.generation_jobs (id) on delete set null,
  created_at  timestamptz not null default now()
);
create index token_ledger_user_id_idx on public.token_ledger (user_id);
create index token_ledger_job_id_idx  on public.token_ledger (job_id);

-- ---------------------------------------------------------------------------
-- LAYER 3 — DELIVERY & SHARE
-- ---------------------------------------------------------------------------

-- orders
create table public.orders (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references auth.users (id) on delete cascade,
  status                text not null default 'placed',
  recipient_contact_id  uuid references public.contacts (id) on delete set null,
  channel               text,
  total_cents           int not null default 0,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);
create index orders_user_id_idx    on public.orders (user_id);
create index orders_status_idx     on public.orders (status);
create index orders_contact_id_idx on public.orders (recipient_contact_id);

-- order_items
create table public.order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders (id) on delete cascade,
  asset_id    uuid references public.media_assets (id) on delete set null,
  label       text not null,
  qty         int not null default 1,
  price_cents int not null default 0
);
create index order_items_order_id_idx on public.order_items (order_id);

-- deliveries
create table public.deliveries (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references public.orders (id) on delete cascade,
  status        text not null default 'pending',
  tracking      text,
  delivered_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index deliveries_order_id_idx on public.deliveries (order_id);

-- shares
-- NOTE: Public read of shared media is intentionally NOT granted here on
-- media_assets. Public access to a shared asset should be handled via a
-- Supabase Edge Function that validates the slug + expiry and returns a
-- signed storage URL. Do not add a blanket public SELECT policy on media_assets.
create table public.shares (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  asset_id    uuid not null references public.media_assets (id) on delete cascade,
  slug        text not null unique,
  is_public   boolean not null default true,
  expires_at  timestamptz,
  created_at  timestamptz not null default now()
);
create index shares_user_id_idx on public.shares (user_id);
create index shares_slug_idx    on public.shares (slug);

-- ---------------------------------------------------------------------------
-- AUTO-UPDATED updated_at TRIGGER (reused across tables)
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger set_contacts_updated_at
  before update on public.contacts
  for each row execute function public.set_updated_at();

create trigger set_occasions_updated_at
  before update on public.occasions
  for each row execute function public.set_updated_at();

create trigger set_templates_updated_at
  before update on public.templates
  for each row execute function public.set_updated_at();

create trigger set_generation_jobs_updated_at
  before update on public.generation_jobs
  for each row execute function public.set_updated_at();

create trigger set_orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

create trigger set_deliveries_updated_at
  before update on public.deliveries
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- AUTO-CREATE PROFILE ON SIGNUP
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------

-- Enable RLS on every table
alter table public.profiles        enable row level security;
alter table public.contacts        enable row level security;
alter table public.occasions       enable row level security;
alter table public.subjects        enable row level security;
alter table public.templates       enable row level security;
alter table public.generation_jobs enable row level security;
alter table public.media_assets    enable row level security;
alter table public.token_ledger    enable row level security;
alter table public.orders          enable row level security;
alter table public.order_items     enable row level security;
alter table public.deliveries      enable row level security;
alter table public.shares          enable row level security;

-- ── profiles ────────────────────────────────────────────────────────────────
create policy "profiles: owner select"
  on public.profiles for select using (id = auth.uid());

create policy "profiles: owner insert"
  on public.profiles for insert with check (id = auth.uid());

create policy "profiles: owner update"
  on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

-- ── contacts ─────────────────────────────────────────────────────────────────
create policy "contacts: owner select"
  on public.contacts for select using (user_id = auth.uid());

create policy "contacts: owner insert"
  on public.contacts for insert with check (user_id = auth.uid());

create policy "contacts: owner update"
  on public.contacts for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "contacts: owner delete"
  on public.contacts for delete using (user_id = auth.uid());

-- ── occasions ────────────────────────────────────────────────────────────────
create policy "occasions: owner select"
  on public.occasions for select using (user_id = auth.uid());

create policy "occasions: owner insert"
  on public.occasions for insert with check (user_id = auth.uid());

create policy "occasions: owner update"
  on public.occasions for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "occasions: owner delete"
  on public.occasions for delete using (user_id = auth.uid());

-- ── subjects ─────────────────────────────────────────────────────────────────
create policy "subjects: owner select"
  on public.subjects for select using (user_id = auth.uid());

create policy "subjects: owner insert"
  on public.subjects for insert with check (user_id = auth.uid());

create policy "subjects: owner update"
  on public.subjects for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "subjects: owner delete"
  on public.subjects for delete using (user_id = auth.uid());

-- ── templates ────────────────────────────────────────────────────────────────
-- Owner: full CRUD where creator_id = auth.uid()
create policy "templates: owner select"
  on public.templates for select using (creator_id = auth.uid());

create policy "templates: owner insert"
  on public.templates for insert with check (creator_id = auth.uid());

create policy "templates: owner update"
  on public.templates for update using (creator_id = auth.uid()) with check (creator_id = auth.uid());

create policy "templates: owner delete"
  on public.templates for delete using (creator_id = auth.uid());

-- Public read for published templates (any authenticated user can browse)
create policy "templates: public read"
  on public.templates for select using (is_public = true);

-- ── generation_jobs ───────────────────────────────────────────────────────────
create policy "generation_jobs: owner select"
  on public.generation_jobs for select using (user_id = auth.uid());

create policy "generation_jobs: owner insert"
  on public.generation_jobs for insert with check (user_id = auth.uid());

create policy "generation_jobs: owner update"
  on public.generation_jobs for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "generation_jobs: owner delete"
  on public.generation_jobs for delete using (user_id = auth.uid());

-- ── media_assets ─────────────────────────────────────────────────────────────
-- NOTE: No public read policy. Public access to shared assets is handled
-- exclusively via Edge Function + signed URL (see shares table / comment above).
create policy "media_assets: owner select"
  on public.media_assets for select using (user_id = auth.uid());

create policy "media_assets: owner insert"
  on public.media_assets for insert with check (user_id = auth.uid());

create policy "media_assets: owner update"
  on public.media_assets for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "media_assets: owner delete"
  on public.media_assets for delete using (user_id = auth.uid());

-- ── token_ledger (APPEND-ONLY) ────────────────────────────────────────────────
-- INSERT and SELECT only. No UPDATE or DELETE policies — intentional.
create policy "token_ledger: owner select"
  on public.token_ledger for select using (user_id = auth.uid());

create policy "token_ledger: owner insert"
  on public.token_ledger for insert with check (user_id = auth.uid());

-- ── orders ───────────────────────────────────────────────────────────────────
create policy "orders: owner select"
  on public.orders for select using (user_id = auth.uid());

create policy "orders: owner insert"
  on public.orders for insert with check (user_id = auth.uid());

create policy "orders: owner update"
  on public.orders for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "orders: owner delete"
  on public.orders for delete using (user_id = auth.uid());

-- ── order_items ───────────────────────────────────────────────────────────────
-- Access scoped through parent order ownership
create policy "order_items: owner select"
  on public.order_items for select using (
    exists (select 1 from public.orders o where o.id = order_items.order_id and o.user_id = auth.uid())
  );

create policy "order_items: owner insert"
  on public.order_items for insert with check (
    exists (select 1 from public.orders o where o.id = order_items.order_id and o.user_id = auth.uid())
  );

create policy "order_items: owner update"
  on public.order_items for update using (
    exists (select 1 from public.orders o where o.id = order_items.order_id and o.user_id = auth.uid())
  );

create policy "order_items: owner delete"
  on public.order_items for delete using (
    exists (select 1 from public.orders o where o.id = order_items.order_id and o.user_id = auth.uid())
  );

-- ── deliveries ────────────────────────────────────────────────────────────────
create policy "deliveries: owner select"
  on public.deliveries for select using (
    exists (select 1 from public.orders o where o.id = deliveries.order_id and o.user_id = auth.uid())
  );

create policy "deliveries: owner insert"
  on public.deliveries for insert with check (
    exists (select 1 from public.orders o where o.id = deliveries.order_id and o.user_id = auth.uid())
  );

create policy "deliveries: owner update"
  on public.deliveries for update using (
    exists (select 1 from public.orders o where o.id = deliveries.order_id and o.user_id = auth.uid())
  );

create policy "deliveries: owner delete"
  on public.deliveries for delete using (
    exists (select 1 from public.orders o where o.id = deliveries.order_id and o.user_id = auth.uid())
  );

-- ── shares ────────────────────────────────────────────────────────────────────
-- Owner-scoped CRUD. Public read of the underlying asset is NOT opened here —
-- see the comment on the shares table above. A future Edge Function will
-- validate slug + expiry and return a signed storage URL.
create policy "shares: owner select"
  on public.shares for select using (user_id = auth.uid());

create policy "shares: owner insert"
  on public.shares for insert with check (user_id = auth.uid());

create policy "shares: owner update"
  on public.shares for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "shares: owner delete"
  on public.shares for delete using (user_id = auth.uid());
