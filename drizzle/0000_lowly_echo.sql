CREATE EXTENSION IF NOT EXISTS "pgcrypto";--> statement-breakpoint
CREATE TYPE "public"."contact_purpose" AS ENUM('job_opportunity', 'freelance_project', 'collaboration', 'general');--> statement-breakpoint
CREATE TYPE "public"."content_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."employment_type" AS ENUM('full_time', 'part_time', 'internship', 'freelance', 'organization', 'education');--> statement-breakpoint
CREATE TYPE "public"."locale" AS ENUM('id', 'en');--> statement-breakpoint
CREATE TYPE "public"."skill_level" AS ENUM('beginner', 'intermediate', 'advanced', 'expert');--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"revoked_at" timestamp with time zone,
	CONSTRAINT "admin_users_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "analytics_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid,
	"event_name" text NOT NULL,
	"path" text NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "analytics_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_key" text NOT NULL,
	"user_agent" text,
	"referrer" text,
	"country" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "case_studies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title_id" text NOT NULL,
	"title_en" text NOT NULL,
	"excerpt_id" text,
	"excerpt_en" text,
	"content_json_id" jsonb,
	"content_json_en" jsonb,
	"content_html_id" text,
	"content_html_en" text,
	"cover_image_url" text,
	"client_or_context" text,
	"role" text,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"seo_title_id" text,
	"seo_title_en" text,
	"seo_description_id" text,
	"seo_description_en" text,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "case_study_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_study_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"alt_id" text,
	"alt_en" text,
	"caption_id" text,
	"caption_en" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "case_study_technologies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_study_id" uuid NOT NULL,
	"technology_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text NOT NULL,
	"purpose" "contact_purpose" DEFAULT 'general' NOT NULL,
	"message" text NOT NULL,
	"read_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experience_technologies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"experience_id" uuid NOT NULL,
	"technology_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company" text NOT NULL,
	"role_id" text NOT NULL,
	"role_en" text NOT NULL,
	"employment_type" "employment_type" NOT NULL,
	"location" text,
	"start_date" date NOT NULL,
	"end_date" date,
	"description_id" text,
	"description_en" text,
	"logo_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guestbook_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"message" text NOT NULL,
	"website_url" text,
	"status_id" uuid NOT NULL,
	"approved_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guestbook_statuses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "playground_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"component_key" text NOT NULL,
	"thumbnail_url" text,
	"category" text NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"complexity" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "playground_technologies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"playground_item_id" uuid NOT NULL,
	"technology_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name_id" text NOT NULL,
	"name_en" text NOT NULL,
	"slug" text NOT NULL,
	"description_id" text,
	"description_en" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid,
	"slug" text NOT NULL,
	"title_id" text NOT NULL,
	"title_en" text NOT NULL,
	"excerpt_id" text,
	"excerpt_en" text,
	"content_json_id" jsonb,
	"content_json_en" jsonb,
	"content_html_id" text,
	"content_html_en" text,
	"cover_image_url" text,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"reading_time" integer DEFAULT 1 NOT NULL,
	"seo_title_id" text,
	"seo_title_en" text,
	"seo_description_id" text,
	"seo_description_en" text,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"username" text NOT NULL,
	"headline_id" text,
	"headline_en" text,
	"bio_id" text,
	"bio_en" text,
	"avatar_url" text,
	"email" text NOT NULL,
	"location" text,
	"github_url" text,
	"linkedin_url" text,
	"website_url" text,
	"availability_status" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "project_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"alt_id" text,
	"alt_en" text,
	"caption_id" text,
	"caption_en" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_technologies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"technology_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title_id" text NOT NULL,
	"title_en" text NOT NULL,
	"excerpt_id" text,
	"excerpt_en" text,
	"content_json_id" jsonb,
	"content_json_en" jsonb,
	"content_html_id" text,
	"content_html_en" text,
	"cover_image_url" text,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"project_type" text NOT NULL,
	"complexity" text,
	"started_at" date,
	"completed_at" date,
	"live_url" text,
	"repository_url" text,
	"seo_title_id" text,
	"seo_title_en" text,
	"seo_description_id" text,
	"seo_description_en" text,
	"published_at" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resumes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"file_url" text NOT NULL,
	"version" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"uploaded_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"category" text NOT NULL,
	"level" "skill_level" DEFAULT 'intermediate' NOT NULL,
	"proficiency" integer,
	"icon_url" text,
	"description_id" text,
	"description_en" text,
	"featured" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "technologies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"icon_url" text,
	"category" text NOT NULL,
	"color" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "technologies_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_session_id_analytics_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."analytics_sessions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_study_images" ADD CONSTRAINT "case_study_images_case_study_id_case_studies_id_fk" FOREIGN KEY ("case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_study_technologies" ADD CONSTRAINT "case_study_technologies_case_study_id_case_studies_id_fk" FOREIGN KEY ("case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_study_technologies" ADD CONSTRAINT "case_study_technologies_technology_id_technologies_id_fk" FOREIGN KEY ("technology_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contact_messages" ADD CONSTRAINT "contact_messages_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_technologies" ADD CONSTRAINT "experience_technologies_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_technologies" ADD CONSTRAINT "experience_technologies_technology_id_technologies_id_fk" FOREIGN KEY ("technology_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guestbook_entries" ADD CONSTRAINT "guestbook_entries_status_id_guestbook_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."guestbook_statuses"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playground_technologies" ADD CONSTRAINT "playground_technologies_playground_item_id_playground_items_id_fk" FOREIGN KEY ("playground_item_id") REFERENCES "public"."playground_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playground_technologies" ADD CONSTRAINT "playground_technologies_technology_id_technologies_id_fk" FOREIGN KEY ("technology_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_post_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_technologies" ADD CONSTRAINT "project_technologies_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_technologies" ADD CONSTRAINT "project_technologies_technology_id_technologies_id_fk" FOREIGN KEY ("technology_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_admin_users_user_id" ON "admin_users" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_admin_users_email" ON "admin_users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_analytics_events_event_name" ON "analytics_events" USING btree ("event_name");--> statement-breakpoint
CREATE INDEX "idx_analytics_events_created_at" ON "analytics_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_analytics_events_path" ON "analytics_events" USING btree ("path");--> statement-breakpoint
CREATE INDEX "idx_analytics_events_session_id" ON "analytics_events" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "idx_analytics_sessions_session_key" ON "analytics_sessions" USING btree ("session_key");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_case_studies_slug" ON "case_studies" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_case_studies_status" ON "case_studies" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_case_studies_featured" ON "case_studies" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "idx_case_study_images_case_study_id" ON "case_study_images" USING btree ("case_study_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_case_study_technologies_unique" ON "case_study_technologies" USING btree ("case_study_id","technology_id");--> statement-breakpoint
CREATE INDEX "idx_case_study_technologies_case_study_id" ON "case_study_technologies" USING btree ("case_study_id");--> statement-breakpoint
CREATE INDEX "idx_case_study_technologies_technology_id" ON "case_study_technologies" USING btree ("technology_id");--> statement-breakpoint
CREATE INDEX "idx_contact_messages_created_at" ON "contact_messages" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_contact_messages_profile_id" ON "contact_messages" USING btree ("profile_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_experience_technologies_unique" ON "experience_technologies" USING btree ("experience_id","technology_id");--> statement-breakpoint
CREATE INDEX "idx_experience_technologies_experience_id" ON "experience_technologies" USING btree ("experience_id");--> statement-breakpoint
CREATE INDEX "idx_experience_technologies_technology_id" ON "experience_technologies" USING btree ("technology_id");--> statement-breakpoint
CREATE INDEX "idx_experiences_sort_order" ON "experiences" USING btree ("sort_order");--> statement-breakpoint
CREATE INDEX "idx_guestbook_entries_status_id" ON "guestbook_entries" USING btree ("status_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_guestbook_statuses_name" ON "guestbook_statuses" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_playground_items_slug" ON "playground_items" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_playground_items_status" ON "playground_items" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_playground_technologies_unique" ON "playground_technologies" USING btree ("playground_item_id","technology_id");--> statement-breakpoint
CREATE INDEX "idx_playground_technologies_playground_item_id" ON "playground_technologies" USING btree ("playground_item_id");--> statement-breakpoint
CREATE INDEX "idx_playground_technologies_technology_id" ON "playground_technologies" USING btree ("technology_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_post_categories_slug" ON "post_categories" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_posts_slug" ON "posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_posts_status" ON "posts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_posts_category_id" ON "posts" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "idx_project_images_project_id" ON "project_images" USING btree ("project_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_project_technologies_unique" ON "project_technologies" USING btree ("project_id","technology_id");--> statement-breakpoint
CREATE INDEX "idx_project_technologies_project_id" ON "project_technologies" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_project_technologies_technology_id" ON "project_technologies" USING btree ("technology_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_projects_slug" ON "projects" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_projects_status" ON "projects" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_projects_featured" ON "projects" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "idx_resumes_profile_locale" ON "resumes" USING btree ("profile_id","locale");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_skills_slug" ON "skills" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_skills_featured" ON "skills" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "idx_skills_category" ON "skills" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_technologies_slug" ON "technologies" USING btree ("slug");
