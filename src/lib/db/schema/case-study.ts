import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import {
  contentJsonEn,
  contentJsonId,
  contentStatusEnum,
  createdAt,
  featured,
  sortOrder,
  updatedAt,
  uuidPrimaryKey,
} from "@/lib/db/schema/common";
import { technologies } from "@/lib/db/schema/technology";

export const caseStudies = pgTable(
  "case_studies",
  {
    id: uuidPrimaryKey,
    slug: text("slug").notNull(),
    titleId: text("title_id").notNull(),
    titleEn: text("title_en").notNull(),
    excerptId: text("excerpt_id"),
    excerptEn: text("excerpt_en"),
    contentJsonId,
    contentJsonEn,
    contentHtmlId: text("content_html_id"),
    contentHtmlEn: text("content_html_en"),
    coverImageUrl: text("cover_image_url"),
    clientOrContext: text("client_or_context"),
    role: text("role"),
    status: contentStatusEnum("status").notNull().default("draft"),
    featured,
    seoTitleId: text("seo_title_id"),
    seoTitleEn: text("seo_title_en"),
    seoDescriptionId: text("seo_description_id"),
    seoDescriptionEn: text("seo_description_en"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt,
    updatedAt,
  },
  (table) => [
    uniqueIndex("idx_case_studies_slug").on(table.slug),
    index("idx_case_studies_status").on(table.status),
    index("idx_case_studies_featured").on(table.featured),
  ],
);

export const caseStudyImages = pgTable(
  "case_study_images",
  {
    id: uuidPrimaryKey,
    caseStudyId: uuid("case_study_id")
      .notNull()
      .references(() => caseStudies.id, { onDelete: "cascade" }),
    imageUrl: text("image_url").notNull(),
    altId: text("alt_id"),
    altEn: text("alt_en"),
    captionId: text("caption_id"),
    captionEn: text("caption_en"),
    sortOrder,
    createdAt,
  },
  (table) => [
    index("idx_case_study_images_case_study_id").on(table.caseStudyId),
  ],
);

export const caseStudyTechnologies = pgTable(
  "case_study_technologies",
  {
    id: uuidPrimaryKey,
    caseStudyId: uuid("case_study_id")
      .notNull()
      .references(() => caseStudies.id, { onDelete: "cascade" }),
    technologyId: uuid("technology_id")
      .notNull()
      .references(() => technologies.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("idx_case_study_technologies_unique").on(
      table.caseStudyId,
      table.technologyId,
    ),
    index("idx_case_study_technologies_case_study_id").on(table.caseStudyId),
    index("idx_case_study_technologies_technology_id").on(table.technologyId),
  ],
);

export const caseStudiesRelations = relations(caseStudies, ({ many }) => ({
  images: many(caseStudyImages),
  technologies: many(caseStudyTechnologies),
}));

export const caseStudyImagesRelations = relations(
  caseStudyImages,
  ({ one }) => ({
    caseStudy: one(caseStudies, {
      fields: [caseStudyImages.caseStudyId],
      references: [caseStudies.id],
    }),
  }),
);

export const caseStudyTechnologiesRelations = relations(
  caseStudyTechnologies,
  ({ one }) => ({
    caseStudy: one(caseStudies, {
      fields: [caseStudyTechnologies.caseStudyId],
      references: [caseStudies.id],
    }),
    technology: one(technologies, {
      fields: [caseStudyTechnologies.technologyId],
      references: [technologies.id],
    }),
  }),
);

export type CaseStudy = typeof caseStudies.$inferSelect;
export type NewCaseStudy = typeof caseStudies.$inferInsert;
