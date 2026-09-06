-- ============================================================================
-- TECHNO DOJO — Supabase schema (V1)
-- Run this once in the Supabase SQL editor on a fresh project.
-- Builds all 16 tables, their constraints, indexes, and row-level security.
--
-- Notes:
--  * Personal data tables are owner-only via RLS (a user can only touch their
--    own rows). Catalogue tables are read-only to logged-in users. Internal
--    tables (review_flags, stripe_events, cohort_codes) have NO client access —
--    only your server (service role) can read/write them.
--  * `public.users` is a PROFILE table linked to Supabase Auth. Auth owns the
--    password; a trigger auto-creates the profile row on signup.
--  * Enumerated fields use CHECK constraints (easy to extend later — e.g. adding
--    a new tag dimension is a one-line change, unlike Postgres ENUM types).
-- ============================================================================

create extension if not exists pgcrypto;   -- for gen_random_uuid()

-- ============================================================================
-- SECTION 1 — CATALOGUE + CORE TABLES (no user dependency first)
-- ============================================================================

-- 1. users (profile linked to auth.users) --------------------------------------
create table public.users (
  id                          uuid primary key references auth.users(id) on delete cascade,
  name                        text,
  email                       text unique,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now(),
  timezone                    text,                       -- IANA zone, refreshed from device on each app open
  is_founding_member          boolean not null default false,
  is_cohort_member            boolean not null default false,
  cohort_expires_at           timestamptz,
  subscription_status         text not null default 'free'
                                check (subscription_status in ('free','active','cancelled','expired')),
  subscription_tier           text
                                check (subscription_tier in ('monthly','three_month','annual','founding')),
  stripe_customer_id          text,
  stripe_subscription_id      text,
  mode_preference             text not null default 'dark'
                                check (mode_preference in ('dark','light')),
  debrief_reminder_frequency  text not null default 'none'
                                check (debrief_reminder_frequency in ('daily','few_times','weekly','surprise','none')),
  coach_ai_enabled            boolean not null default true,   -- false = Local mode (no AI at all)
  ai_disclosure_accepted_at   timestamptz,   -- must be set before first transcription / Coach
  terms_accepted_at           timestamptz,
  mailerlite_synced           boolean not null default false
);

-- 2. transitions (the 20 moments) ---------------------------------------------
create table public.transitions (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text unique not null,
  name                  text not null,
  description           text,
  arrival_state_family  text not null
                          check (arrival_state_family in ('Open','Composure','Steady','Quiet','Unexpected')),
  is_schedulable        boolean not null default true,   -- Unexpected/pull-only = false
  is_active             boolean not null default true,
  display_order         integer,
  prompt_text           text,   -- Read-mode text; ends on the closing line
  closing_line          text    -- shown on the audio-complete screen
);

-- 3. practices (audio files under each transition) -----------------------------
create table public.practices (
  id                uuid primary key default gen_random_uuid(),
  transition_id     uuid not null references public.transitions(id) on delete cascade,
  guidance_level    text not null check (guidance_level in ('full','light','cue')),
  audio_url         text,          -- Bunny.net, token-authenticated
  duration_seconds  integer,       -- PLACEHOLDER until recorded; fill before launch
  unique (transition_id, guidance_level)
);

-- 4. experiment_library (Coach experiment bank) --------------------------------
create table public.experiment_library (
  id             uuid primary key default gen_random_uuid(),
  stage          integer not null check (stage between 1 and 5),  -- V1 seeds Stage 1
  title          text,
  prompt_text    text not null,
  display_order  integer,
  is_active      boolean not null default true
);

-- 5. debrief_prompts (Shake bank + buckets) ------------------------------------
create table public.debrief_prompts (
  id         uuid primary key default gen_random_uuid(),
  text       text not null,
  bucket     text,          -- one of the nine Shake buckets (the prompt category)
  is_active  boolean not null default true
);

-- 6. tag_vocabulary (editable controlled tag list) -----------------------------
create table public.tag_vocabulary (
  id             uuid primary key default gen_random_uuid(),
  dimension      text not null
                   check (dimension in ('state','emotion','theme','cognitive_process','temporal','context')),
  tag            text not null,
  display_label  text,     -- brand-voice user-facing label (esp. cognitive_process)
  cluster        text,     -- semantic EXAMPLE phrases for the classifier (not keyword triggers)
  meta           text,     -- e.g. emotion quadrant / state activation / sticky-vs-constructive
  is_active      boolean not null default true,
  unique (dimension, tag)
);

-- 7. founding_member_spots (single-row config; used count is derived) ----------
create table public.founding_member_spots (
  id           uuid primary key default gen_random_uuid(),
  total_spots  integer not null default 100
);

-- 8. stripe_events (webhook idempotency) ---------------------------------------
create table public.stripe_events (
  id               uuid primary key default gen_random_uuid(),
  stripe_event_id  text unique not null,
  type             text,
  processed_at     timestamptz not null default now()
);

-- ============================================================================
-- SECTION 2 — USER-OWNED + DEPENDENT TABLES
-- ============================================================================

-- 9. user_transitions (each person's setup per transition) ---------------------
create table public.user_transitions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.users(id) on delete cascade,
  transition_id   uuid not null references public.transitions(id) on delete cascade,
  guidance_level  text not null check (guidance_level in ('full','light','cue','none')), -- none = notify-only
  reminder_time   time,
  reminder_days   integer[],     -- 0-6
  delivery_method text not null default 'push' check (delivery_method in ('push','none')),
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (user_id, transition_id)
);

-- 10. debrief_entries (reflections) -------------------------------------------
create table public.debrief_entries (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.users(id) on delete cascade,
  mode            text not null check (mode in ('shake','freeflow','status')),
  prompt_used     text,          -- free-text (freeflow=null); for Shake prefer prompt_id
  prompt_id       uuid references public.debrief_prompts(id) on delete set null,
  response_text   text,          -- typed / transcription (freeflow+shake). Null for status + local-mode voice
  audio_url       text,          -- private per-user Supabase Storage
  status_body     text,          -- Status Q1
  status_emotion  text,          -- Status Q2
  status_theme    text,          -- Status Q3
  created_at      timestamptz not null default now()
);

-- 11. coach_sessions (weekly Coach) -------------------------------------------
create table public.coach_sessions (
  id                       uuid primary key default gen_random_uuid(),
  user_id                  uuid not null references public.users(id) on delete cascade,
  film_review_q1           text,
  film_review_q2           text,
  self_reflection          text,   -- "What are you noticing about yourself?" (everyone)
  ai_reflection            text,   -- nullable; empty in Local mode
  experiment_id            uuid references public.experiment_library(id) on delete set null,
  experiment_completed_at  timestamptz,
  commitment_text          text,
  created_at               timestamptz not null default now(),
  locked_until             timestamptz    -- next session unlock = created_at + 7 days
);

-- 12. cohort_codes (discount-code bypass) -------------------------------------
create table public.cohort_codes (
  id               uuid primary key default gen_random_uuid(),
  code             text unique not null,
  created_at       timestamptz not null default now(),
  expires_at       timestamptz,     -- redemption deadline
  used_by_user_id  uuid references public.users(id) on delete set null, -- code stays consumed
  used_at          timestamptz
);

-- 13. practice_events (listen/read engagement — NON-NEGOTIABLE tracking) -------
create table public.practice_events (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references public.users(id) on delete cascade,
  transition_id  uuid references public.transitions(id) on delete set null,
  practice_id    uuid references public.practices(id) on delete set null,  -- null for Read mode
  guidance_level text check (guidance_level in ('full','light','cue')),    -- null for Read mode
  event_type     text not null
                   check (event_type in ('started','progress_25','progress_50','progress_75',
                                         'completed','read_opened','read_completed')),
  created_at     timestamptz not null default now()
);

-- 14. review_flags (safety review queue) --------------------------------------
create table public.review_flags (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.users(id) on delete cascade,
  source_type      text not null check (source_type in ('debrief','coach')),
  source_id        uuid not null,   -- polymorphic (soft) reference; app validates
  flag_type        text,
  severity         text not null check (severity in ('elevated','crisis')),
  classifier_note  text,
  review_status    text not null default 'new'
                     check (review_status in ('new','in_review','actioned','dismissed')),
  reviewed_at      timestamptz,
  created_at       timestamptz not null default now()
);

-- 15. push_subscriptions (Web Push per device) --------------------------------
create table public.push_subscriptions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.users(id) on delete cascade,
  endpoint      text unique not null,
  p256dh        text not null,
  auth          text not null,
  user_agent    text,
  created_at    timestamptz not null default now(),
  last_seen_at  timestamptz
);

-- 16. entry_tags (applied tags — the pattern engine) --------------------------
create table public.entry_tags (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references public.users(id) on delete cascade,
  debrief_entry_id  uuid not null references public.debrief_entries(id) on delete cascade,
  dimension         text not null
                      check (dimension in ('state','emotion','theme','cognitive_process','temporal','context')),
  tag               text not null,
  source_field      text check (source_field in ('status_body','status_emotion','status_theme','response_text')),
  confidence        real,
  created_at        timestamptz not null default now()
);

-- ============================================================================
-- SECTION 3 — INDEXES (foreign keys + common query patterns + RLS owner cols)
-- ============================================================================
create index idx_user_transitions_user      on public.user_transitions (user_id, is_active);
create index idx_user_transitions_transition on public.user_transitions (transition_id);
create index idx_practices_transition        on public.practices (transition_id);
create index idx_debrief_entries_user_time   on public.debrief_entries (user_id, created_at);
create index idx_debrief_entries_prompt      on public.debrief_entries (prompt_id);
create index idx_coach_sessions_user_time    on public.coach_sessions (user_id, created_at);
create index idx_practice_events_user_time   on public.practice_events (user_id, created_at);
create index idx_practice_events_transition  on public.practice_events (transition_id);
create index idx_review_flags_status         on public.review_flags (review_status, created_at);
create index idx_review_flags_user           on public.review_flags (user_id);
create index idx_push_subscriptions_user     on public.push_subscriptions (user_id);
create index idx_entry_tags_user_time        on public.entry_tags (user_id, created_at);
create index idx_entry_tags_user_dim_tag     on public.entry_tags (user_id, dimension, tag);
create index idx_entry_tags_entry            on public.entry_tags (debrief_entry_id);

-- ============================================================================
-- SECTION 4 — ROW-LEVEL SECURITY
-- Enable on every table. Owner-only on personal data; read-only on catalogue;
-- no client policies on internal tables (service role bypasses RLS).
-- ============================================================================
alter table public.users                  enable row level security;
alter table public.transitions            enable row level security;
alter table public.practices              enable row level security;
alter table public.experiment_library     enable row level security;
alter table public.debrief_prompts        enable row level security;
alter table public.tag_vocabulary         enable row level security;
alter table public.founding_member_spots  enable row level security;
alter table public.stripe_events          enable row level security;
alter table public.user_transitions       enable row level security;
alter table public.debrief_entries        enable row level security;
alter table public.coach_sessions         enable row level security;
alter table public.cohort_codes           enable row level security;
alter table public.practice_events        enable row level security;
alter table public.review_flags           enable row level security;
alter table public.push_subscriptions     enable row level security;
alter table public.entry_tags             enable row level security;

-- users: owner reads/updates own profile row -----------------------------------
create policy users_select_own on public.users
  for select to authenticated using (auth.uid() = id);
create policy users_update_own on public.users
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- catalogue tables: read-only to logged-in users -------------------------------
create policy transitions_read        on public.transitions        for select to authenticated using (true);
create policy practices_read          on public.practices          for select to authenticated using (true);
create policy experiment_library_read on public.experiment_library for select to authenticated using (true);
create policy debrief_prompts_read    on public.debrief_prompts    for select to authenticated using (true);
create policy tag_vocabulary_read     on public.tag_vocabulary     for select to authenticated using (true);
create policy founding_spots_read     on public.founding_member_spots for select to authenticated using (true);

-- owner-only tables: full CRUD limited to the owner ----------------------------
create policy user_transitions_own on public.user_transitions
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy debrief_entries_own on public.debrief_entries
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy coach_sessions_own on public.coach_sessions
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy practice_events_own on public.practice_events
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy push_subscriptions_own on public.push_subscriptions
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy entry_tags_own on public.entry_tags
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- review_flags, stripe_events, cohort_codes: NO client policies.
-- RLS is enabled with zero policies => all client access denied. Only the
-- service role (your server) can read/write them. (cohort_codes is validated
-- and redeemed server-side.)

-- ============================================================================
-- SECTION 4b — DATA API GRANTS
-- Required because "Automatically expose new tables" is OFF: a table is invisible
-- to the app until it is granted. We grant the app (authenticated) only what it
-- needs, give the server (service_role) full access, and grant the three internal
-- tables to NOBODY but the server — so they never touch the client API surface.
-- RLS still filters every authenticated grant down to the user's own rows.
-- ============================================================================
grant usage on schema public to authenticated, service_role;

-- Server (your secret service_role key) can do everything, on every table:
grant all on all tables in schema public to service_role;

-- Logged-in users: READ the catalogue --------------------------------------------
grant select on
  public.transitions,
  public.practices,
  public.experiment_library,
  public.debrief_prompts,
  public.tag_vocabulary,
  public.founding_member_spots
to authenticated;

-- Logged-in users: READ + UPDATE only their own profile (RLS enforces "own") ------
grant select, update on public.users to authenticated;

-- Logged-in users: full CRUD on their own data (RLS enforces "own") --------------
grant select, insert, update, delete on
  public.user_transitions,
  public.debrief_entries,
  public.coach_sessions,
  public.practice_events,
  public.push_subscriptions,
  public.entry_tags
to authenticated;

-- review_flags, stripe_events, cohort_codes: intentionally granted to NO client
-- role. Only service_role (above) can reach them. This is the whole point.

-- ============================================================================
-- SECTION 5 — SIGNUP TRIGGER (auto-create the profile row on new auth user)
-- ============================================================================
create or replace function public.handle_new_user()
  returns trigger
  language plpgsql
  security definer set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- SECTION 6 — SEED
-- ============================================================================
insert into public.founding_member_spots (total_spots) values (100);

-- Catalogue seeds (transitions, practices, experiment_library Stage 1,
-- debrief_prompts, tag_vocabulary) are loaded separately from the Notion
-- source-of-truth pages once audio URLs, durations, and buckets are finalised.
