import { relations } from "drizzle-orm";
import { index, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, uuidPrimaryKey } from "@/lib/db/schema/common";

export const analyticsSessions = pgTable(
  "analytics_sessions",
  {
    id: uuidPrimaryKey,
    sessionKey: text("session_key").notNull(),
    userAgent: text("user_agent"),
    referrer: text("referrer"),
    country: text("country"),
    createdAt,
  },
  (table) => [index("idx_analytics_sessions_session_key").on(table.sessionKey)],
);

export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: uuidPrimaryKey,
    sessionId: uuid("session_id").references(() => analyticsSessions.id, {
      onDelete: "set null",
    }),
    eventName: text("event_name").notNull(),
    path: text("path").notNull(),
    metadata: jsonb("metadata"),
    createdAt,
  },
  (table) => [
    index("idx_analytics_events_event_name").on(table.eventName),
    index("idx_analytics_events_created_at").on(table.createdAt),
    index("idx_analytics_events_path").on(table.path),
    index("idx_analytics_events_session_id").on(table.sessionId),
  ],
);

export const analyticsSessionsRelations = relations(
  analyticsSessions,
  ({ many }) => ({
    events: many(analyticsEvents),
  }),
);

export const analyticsEventsRelations = relations(
  analyticsEvents,
  ({ one }) => ({
    session: one(analyticsSessions, {
      fields: [analyticsEvents.sessionId],
      references: [analyticsSessions.id],
    }),
  }),
);

export type AnalyticsSession = typeof analyticsSessions.$inferSelect;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type NewAnalyticsEvent = typeof analyticsEvents.$inferInsert;
