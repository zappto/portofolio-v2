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

export const projects = pgTable(
  "projects",
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
    status: contentStatusEnum("status").notNull().default("draft"),
    featured,
    projectType: text("project_type").notNull(),
    complexity: text("complexity"),
    startedAt: date("started_at"),
    completedAt: date("completed_at"),
    liveUrl: text("live_url"),
    repositoryUrl: text("repository_url"),
    seoTitleId: text("seo_title_id"),
    seoTitleEn: text("seo_title_en"),
    seoDescriptionId: text("seo_description_id"),
    seoDescriptionEn: text("seo_description_en"),
    publishedAt: date("published_at"),
    createdAt,
    updatedAt,
  },
  (table) => [
    uniqueIndex("idx_projects_slug").on(table.slug),
    index("idx_projects_status").on(table.status),
    index("idx_projects_featured").on(table.featured),
  ],
);

export const projectImages = pgTable(
  "project_images",
  {
    id: uuidPrimaryKey,
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    imageUrl: text("image_url").notNull(),
    altId: text("alt_id"),
    altEn: text("alt_en"),
    captionId: text("caption_id"),
    captionEn: text("caption_en"),
    sortOrder,
    createdAt,
  },
  (table) => [index("idx_project_images_project_id").on(table.projectId)],
);

export const projectTechnologies = pgTable(
  "project_technologies",
  {
    id: uuidPrimaryKey,
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    technologyId: uuid("technology_id")
      .notNull()
      .references(() => technologies.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("idx_project_technologies_unique").on(
      table.projectId,
      table.technologyId,
    ),
    index("idx_project_technologies_project_id").on(table.projectId),
    index("idx_project_technologies_technology_id").on(table.technologyId),
  ],
);

export const projectsRelations = relations(projects, ({ many }) => ({
  images: many(projectImages),
  technologies: many(projectTechnologies),
}));

export const projectImagesRelations = relations(projectImages, ({ one }) => ({
  project: one(projects, {
    fields: [projectImages.projectId],
    references: [projects.id],
  }),
}));

export const projectTechnologiesRelations = relations(
  projectTechnologies,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectTechnologies.projectId],
      references: [projects.id],
    }),
    technology: one(technologies, {
      fields: [projectTechnologies.technologyId],
      references: [technologies.id],
    }),
  }),
);

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ProjectImage = typeof projectImages.$inferSelect;
export type ProjectTechnology = typeof projectTechnologies.$inferSelect;
