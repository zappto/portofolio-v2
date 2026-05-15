import { count, eq, isNull } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  analyticsEvents,
  caseStudies,
  contactMessages,
  guestbookEntries,
  guestbookStatuses,
  posts,
  projects,
} from "@/lib/db/schema";

async function safeCount(query: Promise<Array<{ count: number }>>) {
  try {
    const rows = await query;
    return rows[0]?.count ?? 0;
  } catch {
    return 0;
  }
}

export async function getAdminDashboardSummary() {
  const [
    totalProjects,
    totalPosts,
    totalCaseStudies,
    draftProjects,
    draftPosts,
    draftCaseStudies,
    contactMessagesCount,
    guestbookPendingCount,
    resumeDownloads,
    pageViews,
  ] = await Promise.all([
    safeCount(db.select({ count: count() }).from(projects)),
    safeCount(db.select({ count: count() }).from(posts)),
    safeCount(db.select({ count: count() }).from(caseStudies)),
    safeCount(
      db.select({ count: count() }).from(projects).where(eq(projects.status, "draft")),
    ),
    safeCount(db.select({ count: count() }).from(posts).where(eq(posts.status, "draft"))),
    safeCount(
      db
        .select({ count: count() })
        .from(caseStudies)
        .where(eq(caseStudies.status, "draft")),
    ),
    safeCount(db.select({ count: count() }).from(contactMessages)),
    safeCount(
      db
        .select({ count: count() })
        .from(guestbookEntries)
        .leftJoin(
          guestbookStatuses,
          eq(guestbookEntries.statusId, guestbookStatuses.id),
        )
        .where(eq(guestbookStatuses.name, "pending")),
    ),
    safeCount(
      db
        .select({ count: count() })
        .from(analyticsEvents)
        .where(eq(analyticsEvents.eventName, "resume_download")),
    ),
    safeCount(
      db
        .select({ count: count() })
        .from(analyticsEvents)
        .where(eq(analyticsEvents.eventName, "page_view")),
    ),
  ]);

  return {
    totalProjects,
    totalPosts,
    totalCaseStudies,
    draftCount: draftProjects + draftPosts + draftCaseStudies,
    contactMessagesCount,
    guestbookPendingCount,
    resumeDownloads,
    pageViews,
  };
}

export async function getAdminContentRows() {
  try {
    const [projectRows, postRows, caseStudyRows, messageRows] = await Promise.all([
      db
        .select({
          id: projects.id,
          title: projects.titleId,
          type: projects.projectType,
          status: projects.status,
          updatedAt: projects.updatedAt,
        })
        .from(projects)
        .limit(5),
      db
        .select({
          id: posts.id,
          title: posts.titleId,
          type: posts.status,
          status: posts.status,
          updatedAt: posts.updatedAt,
        })
        .from(posts)
        .limit(5),
      db
        .select({
          id: caseStudies.id,
          title: caseStudies.titleId,
          type: caseStudies.clientOrContext,
          status: caseStudies.status,
          updatedAt: caseStudies.updatedAt,
        })
        .from(caseStudies)
        .limit(5),
      db
        .select({
          id: contactMessages.id,
          title: contactMessages.subject,
          type: contactMessages.purpose,
          status: contactMessages.readAt,
          updatedAt: contactMessages.createdAt,
        })
        .from(contactMessages)
        .where(isNull(contactMessages.readAt))
        .limit(5),
    ]);

    const mappedProjects = projectRows.map((row) => ({
      id: row.id,
      title: row.title,
      module: "Projects",
      status: row.status,
      owner: row.type,
      updatedAt: row.updatedAt.toISOString(),
    }));
    const mappedPosts = postRows.map((row) => ({
      id: row.id,
      title: row.title,
      module: "Blog",
      status: row.status,
      owner: "Editorial",
      updatedAt: row.updatedAt.toISOString(),
    }));
    const mappedCaseStudies = caseStudyRows.map((row) => ({
      id: row.id,
      title: row.title,
      module: "Case Studies",
      status: row.status,
      owner: row.type ?? "Process",
      updatedAt: row.updatedAt.toISOString(),
    }));
    const mappedMessages = messageRows.map((row) => ({
      id: row.id,
      title: row.title,
      module: "Messages",
      status: row.status ? "read" : "unread",
      owner: row.type,
      updatedAt: row.updatedAt.toISOString(),
    }));

    return [
      ...mappedProjects,
      ...mappedPosts,
      ...mappedCaseStudies,
      ...mappedMessages,
    ];
  } catch {
    return [];
  }
}
