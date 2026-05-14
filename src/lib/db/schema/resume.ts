import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import {
  createdAt,
  localeEnum,
  updatedAt,
  uuidPrimaryKey,
} from "@/lib/db/schema/common";
import { profiles } from "@/lib/db/schema/profile";

export const resumes = pgTable(
  "resumes",
  {
    id: uuidPrimaryKey,
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    locale: localeEnum("locale").notNull(),
    fileUrl: text("file_url").notNull(),
    version: text("version").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    uploadedAt: timestamp("uploaded_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdAt,
    updatedAt,
  },
  (table) => [
    index("idx_resumes_profile_locale").on(table.profileId, table.locale),
  ],
);

export const resumesRelations = relations(resumes, ({ one }) => ({
  profile: one(profiles, {
    fields: [resumes.profileId],
    references: [profiles.id],
  }),
}));

export type Resume = typeof resumes.$inferSelect;
export type NewResume = typeof resumes.$inferInsert;
