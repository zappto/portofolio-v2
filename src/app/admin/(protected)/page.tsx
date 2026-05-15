import {
  BarChart3,
  BookOpenText,
  BriefcaseBusiness,
  Download,
  FileText,
  FolderKanban,
  Inbox,
  MessageSquareWarning,
} from "lucide-react";
import { AdminSummaryCard } from "@/features/admin/dashboard/admin-summary-card";
import {
  getAdminContentRows,
  getAdminDashboardSummary,
} from "@/features/admin/dashboard/data";
import { AdminEditorPattern } from "@/features/admin/editor/admin-editor-pattern";
import { AdminFormPattern } from "@/features/admin/form/admin-form-pattern";
import { AdminDataTable, type AdminTableRow } from "@/features/admin/table/admin-data-table";
import { AdminUploadPattern } from "@/features/admin/upload/admin-upload-pattern";

export const dynamic = "force-dynamic";

const fallbackRows: AdminTableRow[] = [
  {
    id: "sample-project",
    title: "Portfolio CMS Foundation",
    module: "Projects",
    status: "draft",
    owner: "Web App",
    updatedAt: "2026-05-15T00:00:00.000Z",
  },
  {
    id: "sample-post",
    title: "Making a portfolio feel like a product",
    module: "Blog",
    status: "published",
    owner: "Editorial",
    updatedAt: "2026-05-14T00:00:00.000Z",
  },
  {
    id: "sample-case-study",
    title: "Professional Design Token Kit",
    module: "Case Studies",
    status: "archived",
    owner: "UI System",
    updatedAt: "2026-05-13T00:00:00.000Z",
  },
];

export default async function AdminPage() {
  const [summary, contentRows] = await Promise.all([
    getAdminDashboardSummary(),
    getAdminContentRows(),
  ]);
  const rows = contentRows.length ? contentRows : fallbackRows;

  return (
    <div className="flex flex-col gap-8">
      <section className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-ui-label text-muted-foreground">Admin CMS Core</p>
          <h1 className="mt-3 text-4xl">Dashboard</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Professional admin foundation for content operations: metrics, table
            pattern, validated forms, editor, and media upload.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
          Public bundle remains separate from editor and admin-only UI.
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminSummaryCard
          label="Total projects"
          value={summary.totalProjects}
          hint="Project records in CMS"
          icon={FolderKanban}
        />
        <AdminSummaryCard
          label="Total posts"
          value={summary.totalPosts}
          hint="Blog post records"
          icon={BookOpenText}
        />
        <AdminSummaryCard
          label="Case studies"
          value={summary.totalCaseStudies}
          hint="Case study records"
          icon={BriefcaseBusiness}
        />
        <AdminSummaryCard
          label="Draft count"
          value={summary.draftCount}
          hint="Draft projects, posts, and case studies"
          icon={FileText}
        />
        <AdminSummaryCard
          label="Contact messages"
          value={summary.contactMessagesCount}
          hint="Messages received"
          icon={Inbox}
        />
        <AdminSummaryCard
          label="Guestbook pending"
          value={summary.guestbookPendingCount}
          hint="Entries awaiting approval"
          icon={MessageSquareWarning}
        />
        <AdminSummaryCard
          label="Resume downloads"
          value={summary.resumeDownloads}
          hint="Tracked download events"
          icon={Download}
        />
        <AdminSummaryCard
          label="Page views"
          value={summary.pageViews}
          hint="Basic analytics summary"
          icon={BarChart3}
        />
      </section>

      <AdminDataTable rows={rows} />

      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminFormPattern />
        <AdminUploadPattern />
      </div>

      <AdminEditorPattern />
    </div>
  );
}
