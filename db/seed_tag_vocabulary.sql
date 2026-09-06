-- ============================================================================
-- SEED: tag_vocabulary (Coach tagging vocabulary, v1)
-- Run AFTER the main schema, in the Supabase SQL editor.
-- Safe to re-run: clears the table first (it's a controlled list, not user data).
-- `cluster` = semantic example phrases for the classifier (NOT keyword triggers).
-- `display_label` left null for now (brand-voice user-facing labels TBD at surfacing).
-- ============================================================================
delete from public.tag_vocabulary;

insert into public.tag_vocabulary (dimension, tag, cluster, meta) values
-- STATE (body / energy) · activation × pleasantness -------------------------------
('state','Energised','energetic, vibrant, alive, strong, awake, refreshed, charged, ready to move','high activation / good'),
('state','Wired','jittery, amped, keyed up, can''t switch off, over-caffeinated, racing heart, heart pounding','high activation / uncomfortable'),
('state','Tense','tight, clenched, braced, stiff, knotted, gripped, edgy, on edge, jaw/shoulders','activation held in the body'),
('state','Restless','fidgety, antsy, can''t sit still, can''t land, agitated, wound up','activation / unsettled'),
('state','Settled','grounded, steady, calm body, relaxed, centred, at ease, even, loose','low activation / good'),
('state','Heavy','sluggish, weighed down, dense, leaden, achy, sore, stiff-tired','low activation / physical'),
('state','Depleted','drained, exhausted, fatigued, burned out, empty tank, wiped, spent','low activation / energy gone'),
('state','Flat','numb, blank, muted, hollow, nothing, disconnected','low activation / disconnected'),

-- EMOTION (named feeling) · valence × arousal ------------------------------------
('emotion','Anxious','worried, nervous, on edge, dread','high arousal / unpleasant'),
('emotion','Stressed','pressured, overloaded, stretched thin, under the gun','high arousal / unpleasant'),
('emotion','Frustrated','annoyed, irritated, blocked, fed up','high arousal / unpleasant'),
('emotion','Overwhelmed','swamped, drowning, too much, can''t cope','high arousal / unpleasant'),
('emotion','Excited','energised, eager, buzzing (good), pumped','high arousal / pleasant'),
('emotion','Motivated','driven, fired up, determined, ready','high arousal / pleasant'),
('emotion','Joyful','happy, elated, light, delighted','high arousal / pleasant'),
('emotion','Calm','at ease, peaceful, relaxed, serene','low arousal / pleasant'),
('emotion','Content','satisfied, okay, fine, settled','low arousal / pleasant'),
('emotion','Grateful','thankful, appreciative, lucky','low arousal / pleasant'),
('emotion','Sad','down, low, blue, tearful','low arousal / unpleasant'),
('emotion','Tired','exhausted, depleted, worn out, done','low arousal / unpleasant'),
('emotion','Lonely','isolated, disconnected, unseen','low arousal / unpleasant'),
('emotion','Discouraged','defeated, deflated, resigned, flat hope','low arousal / unpleasant'),

-- THEME (life domain) · domain-pure ----------------------------------------------
('theme','Work / study','job, career, deadlines, boss, workload, studies','domain'),
('theme','Money','finances, bills, income, spending, debt, budget','domain'),
('theme','Partner / dating','partner, marriage, relationship, dating, spouse','domain'),
('theme','Family / parenting','kids, parents, siblings, family, parenting, school run','domain'),
('theme','Friends / social','friends, social life, community, social plans','domain'),
('theme','Health / body','illness, pain, symptoms, fitness, body, doctor','domain'),
('theme','Sleep','insomnia, waking, bedtime, tired from sleep','domain'),
('theme','Home / life admin','house, chores, logistics, errands, admin','domain'),
('theme','Identity / self','who I am, self-worth, confidence, self-image','domain'),
('theme','Goals / growth / purpose','ambition, direction, meaning, learning, growth','domain'),
('theme','Leisure / rest','downtime, hobbies, recovery, play, time off','domain'),
('theme','Other','catch-all for unmatched entries; review to grow the vocabulary','domain'),

-- COGNITIVE PROCESS (the mental operation) · FLAGSHIP ----------------------------
('cognitive_process','Mental looping','can''t stop thinking about it, keep replaying it, going in circles, stuck in my head','sticky'),
('cognitive_process','Self-criticism','I messed up, should''ve done better, what''s wrong with me, not good enough','sticky'),
('cognitive_process','Threat amplification','this''ll be a disaster, what if it all goes wrong, worst case, I''m screwed','sticky'),
('cognitive_process','Control / certainty-seeking','I need to know, need to make sure, can''t relax until, need it figured out','sticky'),
('cognitive_process','Avoidance','don''t want to deal with it, putting it off, dreading it, distracting myself','sticky'),
('cognitive_process','External evaluation','what will they think, everyone else is ahead, don''t want to disappoint them','sticky'),
('cognitive_process','Rigid expectations','I should be further ahead, have to get it right, no excuse, need to be productive','sticky'),
('cognitive_process','Problem-solving','what can I do, next step is, I could try, here''s the plan','constructive'),
('cognitive_process','Perspective-shifting','maybe another way to look at it, might not mean, in the bigger picture','constructive'),
('cognitive_process','Acceptance','it is what it is, can''t change that, letting myself feel it, don''t need to fix this now','constructive'),
('cognitive_process','Reflective noticing','I notice I always, interesting that I, maybe this is a pattern','constructive'),
('cognitive_process','Self-support','I did my best, makes sense I feel this way, give myself grace, I can handle this','constructive'),
('cognitive_process','Meaning / values','what actually matters here, I want to be someone who, this is bigger than, I learned','constructive'),

-- TEMPORAL (orientation of the thought) -----------------------------------------
('temporal','Past','replaying, remembering, regret, when they said, I should have','orientation'),
('temporal','Present','right now, currently, in this moment','orientation'),
('temporal','Future','what if, upcoming, anticipation, when I, waiting for','orientation'),

-- CONTEXT / SITUATION (the circumstance) ----------------------------------------
('context','Conflict','argument, tension, disagreement, confrontation, fell out','situation'),
('context','Uncertainty','not knowing, unclear, up in the air, waiting to hear','situation'),
('context','Decision point','a choice to make, weighing options, at a crossroads, torn','situation'),
('context','Deadline / pressure','time pressure, due, crunch, running out of time','situation'),
('context','Mistake / setback','messed up, went wrong, failed, dropped the ball, setback','situation'),
('context','Transition / change','new phase, ending, starting, moving, upheaval','situation'),
('context','Loss','loss, grief, goodbye, missing someone','situation');
