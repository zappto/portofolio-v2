import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const contentStatusEnum = pgEnum("content_status", [
  "draft",
  "published",
  "archived",
]);

export const localeEnum = pgEnum("locale", ["id", "en"]);

export const skillLevelEnum = pgEnum("skill_level", [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
]);

export const employmentTypeEnum = pgEnum("employment_type", [
  "full_time",
  "part_time",
  "internship",
  "freelance",
  "organization",
  "education",
]);

export const contactPurposeEnum = pgEnum("contact_purpose", [
  "job_opportunity",
  "freelance_project",
  "collaboration",
  "general",
]);

export const uuidPrimaryKey = uuid("id").primaryKey().defaultRandom();

export const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();

export const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow();

export const sortOrder = integer("sort_order").notNull().default(0);

export const featured = boolean("featured").notNull().default(false);

export const contentJsonId = jsonb("content_json_id");
export const contentJsonEn = jsonb("content_json_en");
