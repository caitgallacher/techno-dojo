# Techno Dojo — App Build (context for Claude Code)

You are helping build the **Techno Dojo** app. The founder, Cait, is non-technical and learning.
Explain plainly. Challenge ideas directly — she wants honest pushback, not validation.
Build screen-by-screen and confirm major UX calls with her before implementing. Durable
decisions get written to the Notion "DEV Notes" hub, not left in chat.

## Golden rules (read first)
- **Source of truth = Notion "DEV Notes"** and its child pages (every table spec + every decision):
  https://app.notion.com/p/3d03ffdf36908003beb1f26048c9961e  — when unsure, check there.
- **Brand voice (non-negotiable):** no em-dashes; Canadian English (-ise/-our); short declarative
  sentences; never use "wellness", "optimize", "balance", "self-care", "high performers". Tagline
  "Go hard. Stay whole." Test copy against a 10-year-old intelligibility standard.
- **Listen/engagement tracking is a hard launch gate.** Every audio play AND every Read-mode open
  logs to `practice_events`. Nothing ships without it.
- **All science claims hedged with "can" + peer-reviewed citation.** No deficit framing.

## What this is
A Progressive Web App for Techno Dojo's Transition Practices product: short (60–90s) guided audio
practices delivered at threshold moments in a high-achieving person's day (before home, between
calls, before sleep). Nervous-system training brand, positioned against wellness culture. It tracks
reflections and surfaces Coach insights weekly. Target: **Nov 15 2026 soft launch, 100 founding members.**

## Stack & where things live
- **Frontend:** Next.js on **Netlify**. Repo: `github.com/caitgallacher/techno-dojo`. App URL: **app.thetechnodojo.com** (subdomain; marketing site stays on thetechnodojo.com).
- **DB + Auth + voice storage:** **Supabase — LIVE.** Schema already deployed (`techno_dojo_schema.sql` in repo). Email/password auth ON, confirm-email ON. Auth trigger auto-creates the `public.users` profile row on signup.
- **Practice audio:** **Bunny.net** (token-authenticated — paid content, no hotlinking). **Voice notes:** Supabase private `voice-notes` bucket (10 MB limit, `audio/*` only).
- **Transcription:** OpenAI `gpt-4o-transcribe` (server-side). **Coach AI + tagging:** Anthropic Claude API (server-side).
- **Email:** MailerLite (group `188720136122795593`). **Payments:** Stripe, **all prices in EUR**.

## Critical constraints (the landmines)
- **Supabase "auto-expose new tables" is OFF.** Any NEW table needs explicit Postgres grants — follow the pattern in `techno_dojo_schema.sql` Section 4b. RLS is enabled on all tables.
- **Secret keys are server-side ONLY** (Netlify env vars): Supabase `service_role`, OpenAI, Anthropic, Stripe, MailerLite, Bunny. The client gets ONLY the Supabase anon/publishable key.
- **Audio format:** detect the device-supported mimeType at record time (`MediaRecorder.isTypeSupported`). iPhone (iOS 14.5–18.3) = mp4/AAC only; iOS 18.4+ + Android/desktop = WebM. Never hardcode; upload whatever the device produced (OpenAI + the bucket accept both).
- **iOS PWA:** push works only after Add-to-Home-Screen; notifications are sent from a server job (VAPID), not scheduled locally. Put the install nudge at reminder setup. Refresh `users.timezone` from the device on every app open; store `reminder_time` as local wall-clock.
- **Two AI vendors (OpenAI + Anthropic) must be disclosed in the privacy policy before first use.** Local mode (`users.coach_ai_enabled = false`) = NO transcription, NO Coach; voice stored as audio only, `response_text` null.
- **Pricing (EUR):** monthly €24.99, three-month €59.99 (auto-rolls to monthly via Stripe subscription schedule), annual €199.99, founding €99.99/yr **forever price** (grandfathered, 100 spots, atomic reservation to prevent overselling; forfeit on cancel). Paywall anchors Annual + Founding. Cohort codes = full payment bypass (`cohort_codes` table). Survey "first month free" = a **Stripe promo code** (100% off once, monthly plan only) — NOT a cohort code.

## Build order (core loop first — from the founder's brief)
1. Scaffold Next.js + supabase-js; PWA manifest + service worker (cache onboarding + active practice audio for offline); deploy to app.thetechnodojo.com.
2. **Auth** — account create / login.
3. **Paywall + Stripe** — founding mechanic, cohort-code bypass + Stripe promo code, EUR tiers.
4. **Transition setup + reminders** — push; reminder toggle default ON but must secure permission + add-to-home-screen at that moment.
5. **Home + Practice screen** — reusable audio player (play/pause, progress bar only, no download, works offline once loaded; 3s pause then closing line). Read mode (shows `transitions.prompt_text`, highlight final line). Both log to `practice_events`.
6. **Debrief** — modes: Status (3 fixed Qs → `status_body/emotion/theme`), Free Flow, Shake (uses `debrief_prompts`). Voice → Supabase private bucket → OpenAI transcription → `response_text`.
7. **Coach** — weekly (rolling 7 days, `locked_until`); Claude "mirror, not analyst" reflection; tagging into `tag_vocabulary` (6 dimensions); salience/co-occurrence surfacing (flagship = one cognitive-process across many themes); `coach_ai_enabled` toggle; parallel distress classifier → `review_flags`.
8. **Your Dojo** (on-demand Unexpected practices), **Profile/settings**, **Additional Resources** support page.
Core loop = account → paywall → setup → practice → debrief. Ship that perfectly before Coach/Your Dojo.

## Design reference
`Techno_Dojo_Screens_dc.html` (every screen, dark + light). Fonts: Bebas Neue (headlines), Montserrat
(DOJO wordmark), DM Sans 300 (body), Space Mono (labels). Colours: Obsidian #0C0C0A, Bone #F2EDE4,
Clay #C4622D, Gold #B89050, Forest #2E3D28, Light Stone #9A9A92 (secondary text on dark). Dark is
default; Welcome + Practice screens are ALWAYS dark regardless of preference.

## Data model (16 tables, live)
Per-table specs are in Notion (DEV Notes → "DB: *" pages). Cross-cutting rules (RLS per table, GDPR
deletion cascade, enum/CHECK values, indexes) are in **Build Spec: Security, Access & Data Integrity**:
https://app.notion.com/p/3d23ffdf369081c2aa43f22cbb8ba3c1
Coach tag vocabulary (seeded): https://app.notion.com/p/3d23ffdf3690817aa59fcf150e404195

## Early data tasks
- Run `seed_tag_vocabulary.sql` (validated; 57 rows across 6 dimensions).
- **Seed transitions (20):** compile from Notion `TECHNO DOJO / Transitions / PRACTICES` (each child page
  states its Family + arrival state). `prompt_text` from the Prompt Texts page, `closing_line` from the
  Closing lines page (reconcile names across pages). `is_schedulable = false` for the Unexpected family.
  Then `practices` rows: `audio_url` placeholders until recorded; `duration_seconds` after editing.
- **Seed `experiment_library` Stage 1** from the Weekly Experiments page.

## Files in this repo
- `db/techno_dojo_schema.sql` — the full deployed schema (16 tables, RLS, grants, trigger, seed of founding_member_spots=100).
- `db/seed_tag_vocabulary.sql` — Coach tagging vocabulary.
- `db/seed_transitions.sql` — the 20 transition moments (structured metadata; `prompt_text`/`closing_line` loaded separately).
