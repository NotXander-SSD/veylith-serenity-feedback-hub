ALTER TABLE public.beta_feedback RENAME COLUMN tester_name TO name;
ALTER TABLE public.beta_feedback RENAME COLUMN rating TO star_rating;
ALTER TABLE public.beta_feedback RENAME COLUMN had_bugs TO has_bug;