import {
  index,
  integer,
  pgTable,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import {
  createdAt,
  featured,
  skillPriorityEnum,
  skillLevelEnum,
  sortOrder,
  updatedAt,
  uuidPrimaryKey,
} from "@/lib/db/schema/common";

export const skills = pgTable(
  "skills",
  {
    id: uuidPrimaryKey,
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    category: text("category").notNull(),
    level: skillLevelEnum("level").notNull().default("working_knowledge"),
    priority: skillPriorityEnum("priority").notNull().default("supporting"),
    proficiency: integer("proficiency"),
    iconUrl: text("icon_url"),
    shortDescriptionId: text("short_description_id"),
    shortDescriptionEn: text("short_description_en"),
    longDescriptionId: text("long_description_id"),
    longDescriptionEn: text("long_description_en"),
    yearsOfExperience: text("years_of_experience"),
    featured,
    sortOrder,
    createdAt,
    updatedAt,
  },
  (table) => [
    uniqueIndex("idx_skills_slug").on(table.slug),
    index("idx_skills_featured").on(table.featured),
    index("idx_skills_category").on(table.category),
    index("idx_skills_priority").on(table.priority),
  ],
);

export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
