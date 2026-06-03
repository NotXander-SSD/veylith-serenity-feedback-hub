
CREATE TABLE public.beta_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tester_name TEXT,
  email TEXT,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  device TEXT NOT NULL,
  had_bugs BOOLEAN NOT NULL DEFAULT false,
  bug_description TEXT,
  liked_most TEXT,
  improvements TEXT,
  other_comments TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.beta_feedback TO anon, authenticated;
GRANT ALL ON public.beta_feedback TO service_role;

ALTER TABLE public.beta_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
ON public.beta_feedback
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
