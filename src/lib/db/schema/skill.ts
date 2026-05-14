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
    level: skillLevelEnum("level").notNull().default("intermediate"),
    proficiency: integer("proficiency"),
    iconUrl: text("icon_url"),
    descriptionId: text("description_id"),
    descriptionEn: text("description_en"),
    featured,
    sortOrder,
    createdAt,
    updatedAt,
  },
  (table) => [
    uniqueIndex("idx_skills_slug").on(table.slug),
    index("idx_skills_featured").on(table.featured),
    index("idx_skills_category").on(table.category),
  ],
);

export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
