import { relations } from "drizzle-orm";
import { index, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import {
  contentStatusEnum,
  createdAt,
  updatedAt,
  uuidPrimaryKey,
} from "@/lib/db/schema/common";
import { technologies } from "@/lib/db/schema/technology";

export const playgroundItems = pgTable(
  "playground_items",
  {
    id: uuidPrimaryKey,
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    componentKey: text("component_key").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    category: text("category").notNull(),
    status: contentStatusEnum("status").notNull().default("draft"),
    complexity: text("complexity"),
    createdAt,
    updatedAt,
  },
  (table) => [
    uniqueIndex("idx_playground_items_slug").on(table.slug),
    index("idx_playground_items_status").on(table.status),
  ],
);

export const playgroundTechnologies = pgTable(
  "playground_technologies",
  {
    id: uuidPrimaryKey,
    playgroundItemId: uuid("playground_item_id")
      .notNull()
      .references(() => playgroundItems.id, { onDelete: "cascade" }),
    technologyId: uuid("technology_id")
      .notNull()
      .references(() => technologies.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("idx_playground_technologies_unique").on(
      table.playgroundItemId,
      table.technologyId,
    ),
    index("idx_playground_technologies_playground_item_id").on(
      table.playgroundItemId,
    ),
    index("idx_playground_technologies_technology_id").on(table.technologyId),
  ],
);

export const playgroundItemsRelations = relations(
  playgroundItems,
  ({ many }) => ({
    technologies: many(playgroundTechnologies),
  }),
);

export const playgroundTechnologiesRelations = relations(
  playgroundTechnologies,
  ({ one }) => ({
    playgroundItem: one(playgroundItems, {
      fields: [playgroundTechnologies.playgroundItemId],
      references: [playgroundItems.id],
    }),
    technology: one(technologies, {
      fields: [playgroundTechnologies.technologyId],
      references: [technologies.id],
    }),
  }),
);

export type PlaygroundItem = typeof playgroundItems.$inferSelect;
export type NewPlaygroundItem = typeof playgroundItems.$inferInsert;
