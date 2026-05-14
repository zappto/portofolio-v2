import { relations } from "drizzle-orm";
import {
  index,
  integer,
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
  updatedAt,
  uuidPrimaryKey,
} from "@/lib/db/schema/common";

export const postCategories = pgTable(
  "post_categories",
  {
    id: uuidPrimaryKey,
    nameId: text("name_id").notNull(),
    nameEn: text("name_en").notNull(),
    slug: text("slug").notNull(),
    descriptionId: text("description_id"),
    descriptionEn: text("description_en"),
    createdAt,
    updatedAt,
  },
  (table) => [uniqueIndex("idx_post_categories_slug").on(table.slug)],
);

export const posts = pgTable(
  "posts",
  {
    id: uuidPrimaryKey,
    categoryId: uuid("category_id").references(() => postCategories.id, {
      onDelete: "set null",
    }),
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
    readingTime: integer("reading_time").notNull().default(1),
    seoTitleId: text("seo_title_id"),
    seoTitleEn: text("seo_title_en"),
    seoDescriptionId: text("seo_description_id"),
    seoDescriptionEn: text("seo_description_en"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt,
    updatedAt,
  },
  (table) => [
    uniqueIndex("idx_posts_slug").on(table.slug),
    index("idx_posts_status").on(table.status),
    index("idx_posts_category_id").on(table.categoryId),
  ],
);

export const postCategoriesRelations = relations(
  postCategories,
  ({ many }) => ({
    posts: many(posts),
  }),
);

export const postsRelations = relations(posts, ({ one }) => ({
  category: one(postCategories, {
    fields: [posts.categoryId],
    references: [postCategories.id],
  }),
}));

export type PostCategory = typeof postCategories.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
