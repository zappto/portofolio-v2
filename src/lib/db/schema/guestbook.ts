import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { createdAt, uuidPrimaryKey } from "@/lib/db/schema/common";

export const guestbookStatuses = pgTable(
  "guestbook_statuses",
  {
    id: uuidPrimaryKey,
    name: text("name").notNull(),
  },
  (table) => [uniqueIndex("idx_guestbook_statuses_name").on(table.name)],
);

export const guestbookEntries = pgTable(
  "guestbook_entries",
  {
    id: uuidPrimaryKey,
    name: text("name").notNull(),
    message: text("message").notNull(),
    websiteUrl: text("website_url"),
    statusId: uuid("status_id")
      .notNull()
      .references(() => guestbookStatuses.id, { onDelete: "restrict" }),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    createdAt,
  },
  (table) => [index("idx_guestbook_entries_status_id").on(table.statusId)],
);

export const guestbookStatusesRelations = relations(
  guestbookStatuses,
  ({ many }) => ({
    entries: many(guestbookEntries),
  }),
);

export const guestbookEntriesRelations = relations(
  guestbookEntries,
  ({ one }) => ({
    status: one(guestbookStatuses, {
      fields: [guestbookEntries.statusId],
      references: [guestbookStatuses.id],
    }),
  }),
);

export type GuestbookStatus = typeof guestbookStatuses.$inferSelect;
export type GuestbookEntry = typeof guestbookEntries.$inferSelect;
export type NewGuestbookEntry = typeof guestbookEntries.$inferInsert;
