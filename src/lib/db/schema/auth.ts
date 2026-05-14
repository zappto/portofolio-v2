import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createdAt, uuidPrimaryKey } from "@/lib/db/schema/common";

export const adminUsers = pgTable(
  "admin_users",
  {
    id: uuidPrimaryKey,
    userId: uuid("user_id").notNull().unique(),
    email: text("email").notNull().unique(),
    createdAt,
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
  },
  (table) => [
    index("idx_admin_users_user_id").on(table.userId),
    index("idx_admin_users_email").on(table.email),
  ],
);

export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
