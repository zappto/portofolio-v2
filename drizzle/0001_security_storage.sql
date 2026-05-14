CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    COALESCE((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
    OR EXISTS (
      SELECT 1
      FROM public.admin_users
      WHERE revoked_at IS NULL
        AND (
          user_id = auth.uid()
          OR lower(email) = lower(COALESCE(auth.jwt() ->> 'email', ''))
        )
    );
$$;
--> statement-breakpoint
INSERT INTO public.guestbook_statuses (id, name)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'pending'),
  ('00000000-0000-0000-0000-000000000002', 'approved'),
  ('00000000-0000-0000-0000-000000000003', 'rejected')
ON CONFLICT (name) DO NOTHING;
--> statement-breakpoint
ALTER TABLE public.guestbook_entries
ALTER COLUMN status_id SET DEFAULT '00000000-0000-0000-0000-000000000001';
--> statement-breakpoint
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.experience_technologies ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.post_categories ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.case_study_images ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.case_study_technologies ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.playground_items ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.playground_technologies ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.guestbook_statuses ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.guestbook_entries ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE POLICY "Public can read profile" ON public.profiles
FOR SELECT USING (true);
--> statement-breakpoint
CREATE POLICY "Public can read active resumes" ON public.resumes
FOR SELECT USING (is_active = true);
--> statement-breakpoint
CREATE POLICY "Public can read published projects" ON public.projects
FOR SELECT USING (status = 'published');
--> statement-breakpoint
CREATE POLICY "Public can read images of published projects" ON public.project_images
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = project_images.project_id
      AND projects.status = 'published'
  )
);
--> statement-breakpoint
CREATE POLICY "Public can read technologies" ON public.technologies
FOR SELECT USING (true);
--> statement-breakpoint
CREATE POLICY "Public can read published project technologies" ON public.project_technologies
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = project_technologies.project_id
      AND projects.status = 'published'
  )
);
--> statement-breakpoint
CREATE POLICY "Public can read skills" ON public.skills
FOR SELECT USING (true);
--> statement-breakpoint
CREATE POLICY "Public can read experiences" ON public.experiences
FOR SELECT USING (true);
--> statement-breakpoint
CREATE POLICY "Public can read experience technologies" ON public.experience_technologies
FOR SELECT USING (true);
--> statement-breakpoint
CREATE POLICY "Public can read post categories" ON public.post_categories
FOR SELECT USING (true);
--> statement-breakpoint
CREATE POLICY "Public can read published posts" ON public.posts
FOR SELECT USING (status = 'published');
--> statement-breakpoint
CREATE POLICY "Public can read published case studies" ON public.case_studies
FOR SELECT USING (status = 'published');
--> statement-breakpoint
CREATE POLICY "Public can read images of published case studies" ON public.case_study_images
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.case_studies
    WHERE case_studies.id = case_study_images.case_study_id
      AND case_studies.status = 'published'
  )
);
--> statement-breakpoint
CREATE POLICY "Public can read published case study technologies" ON public.case_study_technologies
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.case_studies
    WHERE case_studies.id = case_study_technologies.case_study_id
      AND case_studies.status = 'published'
  )
);
--> statement-breakpoint
CREATE POLICY "Public can read published playground items" ON public.playground_items
FOR SELECT USING (status = 'published');
--> statement-breakpoint
CREATE POLICY "Public can read published playground technologies" ON public.playground_technologies
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.playground_items
    WHERE playground_items.id = playground_technologies.playground_item_id
      AND playground_items.status = 'published'
  )
);
--> statement-breakpoint
CREATE POLICY "Public can create contact messages" ON public.contact_messages
FOR INSERT WITH CHECK (true);
--> statement-breakpoint
CREATE POLICY "Public can read guestbook statuses" ON public.guestbook_statuses
FOR SELECT USING (true);
--> statement-breakpoint
CREATE POLICY "Public can create pending guestbook entries" ON public.guestbook_entries
FOR INSERT WITH CHECK (status_id = '00000000-0000-0000-0000-000000000001');
--> statement-breakpoint
CREATE POLICY "Public can read approved guestbook entries" ON public.guestbook_entries
FOR SELECT USING (status_id = '00000000-0000-0000-0000-000000000002');
--> statement-breakpoint
CREATE POLICY "Public can create analytics sessions" ON public.analytics_sessions
FOR INSERT WITH CHECK (true);
--> statement-breakpoint
CREATE POLICY "Public can create analytics events" ON public.analytics_events
FOR INSERT WITH CHECK (true);
--> statement-breakpoint
CREATE POLICY "Admins can manage admin users" ON public.admin_users
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage profiles" ON public.profiles
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage resumes" ON public.resumes
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage projects" ON public.projects
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage project images" ON public.project_images
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage technologies" ON public.technologies
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage project technologies" ON public.project_technologies
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage skills" ON public.skills
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage experiences" ON public.experiences
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage experience technologies" ON public.experience_technologies
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage post categories" ON public.post_categories
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage posts" ON public.posts
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage case studies" ON public.case_studies
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage case study images" ON public.case_study_images
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage case study technologies" ON public.case_study_technologies
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage playground items" ON public.playground_items
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage playground technologies" ON public.playground_technologies
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can read contact messages" ON public.contact_messages
FOR SELECT USING (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can update contact messages" ON public.contact_messages
FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can manage guestbook statuses" ON public.guestbook_statuses
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can moderate guestbook entries" ON public.guestbook_entries
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can read analytics sessions" ON public.analytics_sessions
FOR SELECT USING (public.is_admin());
--> statement-breakpoint
CREATE POLICY "Admins can read analytics events" ON public.analytics_events
FOR SELECT USING (public.is_admin());
--> statement-breakpoint
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('avatars', 'avatars', true),
  ('projects', 'projects', true),
  ('blogs', 'blogs', true),
  ('case-studies', 'case-studies', true),
  ('playground', 'playground', true),
  ('resumes', 'resumes', true),
  ('general', 'general', true)
ON CONFLICT (id) DO UPDATE SET public = excluded.public;
--> statement-breakpoint
CREATE POLICY "Public can read portfolio storage objects" ON storage.objects
FOR SELECT USING (
  bucket_id IN ('avatars', 'projects', 'blogs', 'case-studies', 'playground', 'resumes', 'general')
);
--> statement-breakpoint
CREATE POLICY "Admins can upload portfolio storage objects" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id IN ('avatars', 'projects', 'blogs', 'case-studies', 'playground', 'resumes', 'general')
  AND public.is_admin()
);
--> statement-breakpoint
CREATE POLICY "Admins can update portfolio storage objects" ON storage.objects
FOR UPDATE USING (
  bucket_id IN ('avatars', 'projects', 'blogs', 'case-studies', 'playground', 'resumes', 'general')
  AND public.is_admin()
) WITH CHECK (
  bucket_id IN ('avatars', 'projects', 'blogs', 'case-studies', 'playground', 'resumes', 'general')
  AND public.is_admin()
);
--> statement-breakpoint
CREATE POLICY "Admins can delete portfolio storage objects" ON storage.objects
FOR DELETE USING (
  bucket_id IN ('avatars', 'projects', 'blogs', 'case-studies', 'playground', 'resumes', 'general')
  AND public.is_admin()
);
