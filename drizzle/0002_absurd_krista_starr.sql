CREATE TYPE "public"."skill_priority" AS ENUM('primary', 'secondary', 'supporting', 'learning');--> statement-breakpoint
ALTER TABLE "skills" RENAME COLUMN "description_id" TO "short_description_id";--> statement-breakpoint
ALTER TABLE "skills" RENAME COLUMN "description_en" TO "short_description_en";--> statement-breakpoint
ALTER TABLE "skills" ALTER COLUMN "level" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "skills" ALTER COLUMN "level" SET DEFAULT 'working_knowledge'::text;--> statement-breakpoint
UPDATE "skills"
SET "level" = CASE "level"
	WHEN 'beginner' THEN 'exploring'
	WHEN 'intermediate' THEN 'working_knowledge'
	WHEN 'advanced' THEN 'production_ready'
	WHEN 'expert' THEN 'core_strength'
	ELSE "level"
END;--> statement-breakpoint
DROP TYPE "public"."skill_level";--> statement-breakpoint
CREATE TYPE "public"."skill_level" AS ENUM('exploring', 'working_knowledge', 'production_ready', 'core_strength');--> statement-breakpoint
ALTER TABLE "skills" ALTER COLUMN "level" SET DEFAULT 'working_knowledge'::"public"."skill_level";--> statement-breakpoint
ALTER TABLE "skills" ALTER COLUMN "level" SET DATA TYPE "public"."skill_level" USING "level"::"public"."skill_level";--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "priority" "skill_priority" DEFAULT 'supporting' NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "long_description_id" text;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "long_description_en" text;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "years_of_experience" text;--> statement-breakpoint
CREATE INDEX "idx_skills_priority" ON "skills" USING btree ("priority");
