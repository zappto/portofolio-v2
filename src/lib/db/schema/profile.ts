import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { contactMessages } from "@/lib/db/schema/contact";
import { createdAt, updatedAt, uuidPrimaryKey } from "@/lib/db/schema/common";
import { resumes } from "@/lib/db/schema/resume";

export const profiles = pgTable("profiles", {
  id: uuidPrimaryKey,
  fullName: text("full_name").notNull(),
  username: text("username").notNull().unique(),
  headlineId: text("headline_id"),
  headlineEn: text("headline_en"),
  bioId: text("bio_id"),
  bioEn: text("bio_en"),
  avatarUrl: text("avatar_url"),
  email: text("email").notNull(),
  location: text("location"),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  websiteUrl: text("website_url"),
  availabilityStatus: text("availability_status"),
  createdAt,
  updatedAt,
});

export const profilesRelations = relations(profiles, ({ many }) => ({
  resumes: many(resumes),
  contactMessages: many(contactMessages),
}));

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
