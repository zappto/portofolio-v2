import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import {
  contactPurposeEnum,
  createdAt,
  uuidPrimaryKey,
} from "@/lib/db/schema/common";
import { profiles } from "@/lib/db/schema/profile";

export const contactMessages = pgTable(
  "contact_messages",
  {
    id: uuidPrimaryKey,
    profileId: uuid("profile_id").references(() => profiles.id, {
      onDelete: "set null",
    }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    subject: text("subject").notNull(),
    purpose: contactPurposeEnum("purpose").notNull().default("general"),
    message: text("message").notNull(),
    readAt: timestamp("read_at", { withTimezone: true }),
    createdAt,
  },
  (table) => [
    index("idx_contact_messages_created_at").on(table.createdAt),
    index("idx_contact_messages_profile_id").on(table.profileId),
  ],
);

export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;
