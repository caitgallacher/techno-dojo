-- ============================================================================
-- SEED: transitions (20 moments) — structured metadata
-- Families verified from Notion TECHNO DOJO / Transitions / PRACTICES (each page's "Family:").
-- prompt_text + closing_line are intentionally LEFT NULL here and loaded separately
-- (long-form content from the Prompt Texts + Closing lines pages — load programmatically
-- to avoid hand-transcription errors on 40 text blocks).
-- Safe to re-run: upserts on slug.
-- ============================================================================
insert into public.transitions (slug, name, arrival_state_family, is_schedulable, display_order) values
  ('coming-home',              'Coming Home',              'Open',       true,  1),
  ('first-move',               'First Move',               'Steady',     true,  2),
  ('second-half-motivational', 'Second Half (Motivational)','Steady',    true,  3),
  ('second-half-grounded',     'Second Half (Grounded)',   'Steady',     true,  4),
  ('resting',                  'Resting',                  'Quiet',      true,  5),
  ('between-calls',            'Between Calls',            'Composure',  true,  6),
  ('logging-back-on',          'Logging Back On',          'Steady',     true,  7),
  ('enjoying-my-evening',      'Enjoying My Evening',      'Open',       true,  8),
  ('into-the-making',          'Into the Making',          'Steady',     true,  9),   -- was "Composure/Steady" (CREATIVE variant) — picked Steady, CONFIRM
  ('locking-in',               'Locking In',               'Steady',     true,  10),  -- was "Composure/Steady" (ANALYTICAL variant) — picked Steady, CONFIRM
  ('into-the-room',            'Into the Room',            'Composure',  true,  11),
  ('before-a-hard-conversation','Before a Hard Conversation','Composure', true,  12),
  ('with-my-partner',          'With My Partner',          'Open',       true,  13),
  ('with-my-kids',             'With My Kids',             'Open',       true,  14),
  ('with-friends',             'With Friends',             'Open',       true,  15),
  ('with-colleagues',          'With Colleagues',          'Steady',     true,  16),
  ('just-for-me',              'Just for Me',              'Open',       true,  17),
  ('a-day-off',                'A Day Off',                'Open',       true,  18),
  ('before-a-meal',            'Before a Meal',            'Open',       true,  19),
  ('after-a-setback',          'After a Setback',          'Unexpected', false, 20)   -- pull-based / on-demand
on conflict (slug) do update set
  name = excluded.name,
  arrival_state_family = excluded.arrival_state_family,
  is_schedulable = excluded.is_schedulable,
  display_order = excluded.display_order;
