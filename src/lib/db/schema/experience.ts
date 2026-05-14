import { relations } from "drizzle-orm";
import {
  date,
  index,
  pgTable,
  text,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import {
  createdAt,
  employmentTypeEnum,
  sortOrder,
  updatedAt,
  uuidPrimaryKey,
} from "@/lib/db/schema/common";
import { technologies } from "@/lib/db/schema/technology";

export const experiences = pgTable(
  "experiences",
  {
    id: uuidPrimaryKey,
    company: text("company").notNull(),
    roleId: text("role_id").notNull(),
    roleEn: text("role_en").notNull(),
    employmentType: employmentTypeEnum("employment_type").notNull(),
    location: text("location"),
    startDate: date("start_date").notNull(),
    endDate: date("end_date"),
    descriptionId: text("description_id"),
    descriptionEn: text("description_en"),
    logoUrl: text("logo_url"),
    sortOrder,
    createdAt,
    updatedAt,
  },
  (table) => [index("idx_experiences_sort_order").on(table.sortOrder)],
);

export const experienceTechnologies = pgTable(
  "experience_technologies",
  {
    id: uuidPrimaryKey,
    experienceId: uuid("experience_id")
      .notNull()
      .references(() => experiences.id, { onDelete: "cascade" }),
    technologyId: uuid("technology_id")
      .notNull()
      .references(() => technologies.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("idx_experience_technologies_unique").on(
      table.experienceId,
      table.technologyId,
    ),
    index("idx_experience_technologies_experience_id").on(table.experienceId),
    index("idx_experience_technologies_technology_id").on(table.technologyId),
  ],
);

export const experiencesRelations = relations(experiences, ({ many }) => ({
  technologies: many(experienceTechnologies),
}));

export const experienceTechnologiesRelations = relations(
  experienceTechnologies,
  ({ one }) => ({
    experience: one(experiences, {
      fields: [experienceTechnologies.experienceId],
      references: [experiences.id],
    }),
    technology: one(technologies, {
      fields: [experienceTechnologies.technologyId],
      references: [technologies.id],
    }),
  }),
);

export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;
