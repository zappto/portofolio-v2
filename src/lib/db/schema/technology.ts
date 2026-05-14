import { relations } from "drizzle-orm";
import { index, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, updatedAt, uuidPrimaryKey } from "@/lib/db/schema/common";
import { caseStudyTechnologies } from "@/lib/db/schema/case-study";
import { experienceTechnologies } from "@/lib/db/schema/experience";
import { playgroundTechnologies } from "@/lib/db/schema/playground";
import { projectTechnologies } from "@/lib/db/schema/project";

export const technologies = pgTable(
  "technologies",
  {
    id: uuidPrimaryKey,
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    iconUrl: text("icon_url"),
    category: text("category").notNull(),
    color: text("color"),
    createdAt,
    updatedAt,
  },
  (table) => [index("idx_technologies_slug").on(table.slug)],
);

export const technologiesRelations = relations(technologies, ({ many }) => ({
  projectTechnologies: many(projectTechnologies),
  experienceTechnologies: many(experienceTechnologies),
  caseStudyTechnologies: many(caseStudyTechnologies),
  playgroundTechnologies: many(playgroundTechnologies),
}));

export type Technology = typeof technologies.$inferSelect;
export type NewTechnology = typeof technologies.$inferInsert;
