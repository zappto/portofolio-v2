import { createClient } from "@supabase/supabase-js";
import postgres from "postgres";

type SeedRow = Record<string, unknown>;

const now = new Date("2026-05-15T00:00:00.000Z");

const id = {
  adminUser: "00000000-0000-4000-8000-000000000001",
  profile: "00000000-0000-4000-8000-000000000010",
  resumeId: "00000000-0000-4000-8000-000000000011",
  resumeEn: "00000000-0000-4000-8000-000000000012",

  techNext: "00000000-0000-4000-8000-000000000101",
  techReact: "00000000-0000-4000-8000-000000000102",
  techTypescript: "00000000-0000-4000-8000-000000000103",
  techTailwind: "00000000-0000-4000-8000-000000000104",
  techSupabase: "00000000-0000-4000-8000-000000000105",
  techDrizzle: "00000000-0000-4000-8000-000000000106",
  techTiptap: "00000000-0000-4000-8000-000000000107",
  techFramer: "00000000-0000-4000-8000-000000000108",

  skillReact: "00000000-0000-4000-8000-000000000201",
  skillNext: "00000000-0000-4000-8000-000000000202",
  skillTs: "00000000-0000-4000-8000-000000000203",
  skillTailwind: "00000000-0000-4000-8000-000000000204",
  skillArchitecture: "00000000-0000-4000-8000-000000000205",
  skillAccessibility: "00000000-0000-4000-8000-000000000206",
  skillPerformance: "00000000-0000-4000-8000-000000000207",
  skillTesting: "00000000-0000-4000-8000-000000000208",

  experienceFrontend: "00000000-0000-4000-8000-000000000301",
  experienceSystems: "00000000-0000-4000-8000-000000000302",

  projectPortfolio: "00000000-0000-4000-8000-000000000401",
  projectDesign: "00000000-0000-4000-8000-000000000402",
  projectContent: "00000000-0000-4000-8000-000000000403",
  projectImagePortfolio: "00000000-0000-4000-8000-000000000421",
  projectImageDesign: "00000000-0000-4000-8000-000000000422",

  categoryUi: "00000000-0000-4000-8000-000000000501",
  categoryNext: "00000000-0000-4000-8000-000000000502",
  postPortfolio: "00000000-0000-4000-8000-000000000511",
  postServer: "00000000-0000-4000-8000-000000000512",

  caseStudyDesign: "00000000-0000-4000-8000-000000000601",
  caseStudyContent: "00000000-0000-4000-8000-000000000602",
  caseStudyImageDesign: "00000000-0000-4000-8000-000000000621",

  playgroundMotion: "00000000-0000-4000-8000-000000000701",
  playgroundTheme: "00000000-0000-4000-8000-000000000702",

  guestPending: "00000000-0000-4000-8000-000000000801",
  guestApproved: "00000000-0000-4000-8000-000000000802",
  guestRejected: "00000000-0000-4000-8000-000000000803",
  guestEntry: "00000000-0000-4000-8000-000000000811",

  contactMessage: "00000000-0000-4000-8000-000000000901",
  session: "00000000-0000-4000-8000-000000001001",
  eventPageView: "00000000-0000-4000-8000-000000001011",
  eventResume: "00000000-0000-4000-8000-000000001012",
} as const;

const relationIds = {
  expFrontendNext: "00000000-0000-4000-8000-000000001101",
  expFrontendReact: "00000000-0000-4000-8000-000000001102",
  expSystemsTailwind: "00000000-0000-4000-8000-000000001103",
  expSystemsFramer: "00000000-0000-4000-8000-000000001104",
  projectPortfolioNext: "00000000-0000-4000-8000-000000001201",
  projectPortfolioSupabase: "00000000-0000-4000-8000-000000001202",
  projectPortfolioDrizzle: "00000000-0000-4000-8000-000000001203",
  projectDesignTailwind: "00000000-0000-4000-8000-000000001204",
  projectDesignReact: "00000000-0000-4000-8000-000000001205",
  projectContentTiptap: "00000000-0000-4000-8000-000000001206",
  caseDesignTailwind: "00000000-0000-4000-8000-000000001301",
  caseDesignReact: "00000000-0000-4000-8000-000000001302",
  caseContentTiptap: "00000000-0000-4000-8000-000000001303",
  playgroundMotionFramer: "00000000-0000-4000-8000-000000001401",
  playgroundThemeTailwind: "00000000-0000-4000-8000-000000001402",
} as const;

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required to seed the database.`);
  }

  return value;
}

function firstAdminEmail() {
  const email = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)[0];

  if (!email) {
    throw new Error("ADMIN_EMAILS must contain at least one email.");
  }

  return email;
}

async function ensureAdminAuthUser() {
  const email = firstAdminEmail();
  const password = process.env.ADMIN_PASSWORD?.trim();
  const url = requiredEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!password) {
    throw new Error("ADMIN_PASSWORD is required to seed the admin auth user.");
  }

  const supabase = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  const createResult = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role: "admin" },
  });

  if (createResult.error) {
    const listResult = await supabase.auth.admin.listUsers();
    if (listResult.error) {
      throw listResult.error;
    }

    const existingUser = listResult.data.users.find(
      (user) => user.email?.toLowerCase() === email,
    );

    if (!existingUser) {
      throw createResult.error;
    }

    await supabase.auth.admin.updateUserById(existingUser.id, {
      password,
      email_confirm: true,
      app_metadata: {
        ...existingUser.app_metadata,
        role: "admin",
      },
    });

    return { id: existingUser.id, email };
  }

  return { id: createResult.data.user.id, email };
}

async function upsert(
  sql: postgres.Sql,
  table: string,
  rows: SeedRow[],
  conflictColumns = ["id"],
) {
  if (!rows.length) {
    return;
  }

  console.log(`Seeding ${table} (${rows.length})...`);

  const columns = Object.keys(rows[0]);
  const quotedColumns = columns.map((column) => `"${column}"`).join(", ");
  const quotedConflictColumns = conflictColumns
    .map((column) => `"${column}"`)
    .join(", ");
  const values = rows.flatMap((row) => columns.map((column) => row[column]));
  const tuples = rows
    .map((_, rowIndex) => {
      const offset = rowIndex * columns.length;
      const placeholders = columns
        .map((_, columnIndex) => `$${offset + columnIndex + 1}`)
        .join(", ");
      return `(${placeholders})`;
    })
    .join(", ");
  const updates = columns
    .filter(
      (column) => column !== "created_at" && !conflictColumns.includes(column),
    )
    .map((column) => `"${column}" = excluded."${column}"`)
    .join(", ");

  await sql.unsafe(
    `
      insert into "${table}" (${quotedColumns})
      values ${tuples}
      on conflict (${quotedConflictColumns}) do update set ${updates || `"id" = excluded."id"`}
    `,
    values,
  );
}

async function main() {
  const adminUser = await ensureAdminAuthUser();
  const sql = postgres(requiredEnv("DATABASE_URL"), {
    max: 1,
    prepare: false,
  });

  try {
    await sql.begin(async (tx) => {
      await upsert(
        tx,
        "admin_users",
        [
          {
            id: id.adminUser,
            user_id: adminUser.id,
            email: adminUser.email,
            created_at: now,
            revoked_at: null,
          },
        ],
        ["user_id"],
      );

      await upsert(
        tx,
        "profiles",
        [
          {
            id: id.profile,
            full_name: "Frontend Engineer",
            username: "frontend-engineer",
            headline_id: "Frontend Engineer untuk produk web yang rapi dan cepat.",
            headline_en: "Frontend Engineer for polished and fast web products.",
            bio_id:
              "Saya membangun interface produk yang jelas, cepat, dan terasa matang dari sistem desain sampai detail interaksi.",
            bio_en:
              "I build product interfaces that feel clear, fast, and mature from design systems to interaction details.",
            avatar_url: "/avatar-placeholder.png",
            email: adminUser.email,
            location: "Indonesia, remote-friendly",
            github_url: "https://github.com",
            linkedin_url: "https://www.linkedin.com",
            website_url: "https://example.com",
            availability_status:
              "Available untuk role Frontend Engineer dan proyek UI engineering terpilih.",
            created_at: now,
            updated_at: now,
          },
        ],
        ["username"],
      );

      await upsert(
        tx,
        "technologies",
        [
          tech(id.techNext, "Next.js", "next-js", "Frontend", "#0A0A0A"),
          tech(id.techReact, "React", "react", "Frontend", "#2563EB"),
          tech(
            id.techTypescript,
            "TypeScript",
            "typescript",
            "Frontend",
            "#2563EB",
          ),
          tech(
            id.techTailwind,
            "Tailwind CSS",
            "tailwind-css",
            "Styling",
            "#0EA5E9",
          ),
          tech(id.techSupabase, "Supabase", "supabase", "Backend", "#16A34A"),
          tech(
            id.techDrizzle,
            "Drizzle ORM",
            "drizzle-orm",
            "Database",
            "#CA8A04",
          ),
          tech(id.techTiptap, "Tiptap", "tiptap", "CMS", "#18181B"),
          tech(
            id.techFramer,
            "Framer Motion",
            "framer-motion",
            "UI Engineering",
            "#71717A",
          ),
        ],
        ["slug"],
      );

      await upsert(
        tx,
        "skills",
        [
          skill(id.skillReact, "React", "react", "Frontend Core", "core_strength", "primary", "4+", true, 1),
          skill(id.skillNext, "Next.js", "next-js", "Frontend Core", "core_strength", "primary", "3+", true, 2),
          skill(id.skillTs, "TypeScript", "typescript", "Frontend Core", "production_ready", "primary", "4+", true, 3),
          skill(id.skillTailwind, "Tailwind CSS", "tailwind-css", "Styling & Design System", "production_ready", "primary", "4+", true, 4),
          skill(id.skillArchitecture, "Component Architecture", "component-architecture", "UI Engineering", "core_strength", "primary", "3+", true, 5),
          skill(id.skillAccessibility, "Accessibility", "accessibility", "UI Engineering", "production_ready", "secondary", "2+", true, 6),
          skill(id.skillPerformance, "Performance Optimization", "performance-optimization", "Performance & SEO", "production_ready", "secondary", "2+", true, 7),
          skill(id.skillTesting, "Testing Library", "testing-library", "Testing & Quality", "exploring", "learning", "1+", false, 8),
        ],
        ["slug"],
      );

      await upsert(tx, "resumes", [
        {
          id: id.resumeId,
          profile_id: id.profile,
          locale: "id",
          file_url: "/resume/frontend-engineer-id.pdf",
          version: "ID-2026.05",
          is_active: true,
          uploaded_at: now,
          created_at: now,
          updated_at: now,
        },
        {
          id: id.resumeEn,
          profile_id: id.profile,
          locale: "en",
          file_url: "/resume/frontend-engineer-en.pdf",
          version: "EN-2026.05",
          is_active: true,
          uploaded_at: now,
          created_at: now,
          updated_at: now,
        },
      ]);

      await upsert(tx, "experiences", [
        {
          id: id.experienceFrontend,
          company: "Independent Product Work",
          role_id: "Frontend Engineer",
          role_en: "Frontend Engineer",
          employment_type: "freelance",
          location: "Remote",
          start_date: "2024-01-01",
          end_date: null,
          description_id:
            "Membangun interface produk, landing page, dan fondasi CMS dengan perhatian pada performa, struktur konten, dan detail visual.",
          description_en:
            "Building product interfaces, landing pages, and CMS foundations with attention to performance, content structure, and visual details.",
          logo_url: null,
          sort_order: 1,
          created_at: now,
          updated_at: now,
        },
        {
          id: id.experienceSystems,
          company: "Frontend Systems Practice",
          role_id: "UI Engineering Learner",
          role_en: "UI Engineering Learner",
          employment_type: "education",
          location: "Indonesia",
          start_date: "2022-01-01",
          end_date: "2024-12-31",
          description_id:
            "Mendalami pola frontend modern melalui project dashboard, design system kecil, dan eksperimen interaksi.",
          description_en:
            "Practicing modern frontend patterns through dashboards, small design systems, and interaction experiments.",
          logo_url: null,
          sort_order: 2,
          created_at: now,
          updated_at: now,
        },
      ]);

      await upsert(
        tx,
        "experience_technologies",
        [
          relation(relationIds.expFrontendNext, "experience_id", id.experienceFrontend, "technology_id", id.techNext),
          relation(relationIds.expFrontendReact, "experience_id", id.experienceFrontend, "technology_id", id.techReact),
          relation(relationIds.expSystemsTailwind, "experience_id", id.experienceSystems, "technology_id", id.techTailwind),
          relation(relationIds.expSystemsFramer, "experience_id", id.experienceSystems, "technology_id", id.techFramer),
        ],
        ["experience_id", "technology_id"],
      );

      await upsert(
        tx,
        "projects",
        [
          project(id.projectPortfolio, "portfolio-cms-foundation", "Portfolio CMS Foundation", "Dynamic portfolio foundation", "Fullstack App", "published", true),
          project(id.projectDesign, "professional-design-token-kit", "Professional Design Token Kit", "Token kit for two visual modes", "UI System", "published", true),
          project(id.projectContent, "case-study-writing-system", "Case Study Writing System", "Editorial workflow for project narratives", "Dashboard", "draft", false),
        ],
        ["slug"],
      );

      await upsert(tx, "project_images", [
        image(id.projectImagePortfolio, "project_id", id.projectPortfolio, "/seed/projects/portfolio-cover.webp", "Portfolio CMS cover"),
        image(id.projectImageDesign, "project_id", id.projectDesign, "/seed/projects/design-token-cover.webp", "Design token cover"),
      ]);

      await upsert(
        tx,
        "project_technologies",
        [
          relation(relationIds.projectPortfolioNext, "project_id", id.projectPortfolio, "technology_id", id.techNext),
          relation(relationIds.projectPortfolioSupabase, "project_id", id.projectPortfolio, "technology_id", id.techSupabase),
          relation(relationIds.projectPortfolioDrizzle, "project_id", id.projectPortfolio, "technology_id", id.techDrizzle),
          relation(relationIds.projectDesignTailwind, "project_id", id.projectDesign, "technology_id", id.techTailwind),
          relation(relationIds.projectDesignReact, "project_id", id.projectDesign, "technology_id", id.techReact),
          relation(relationIds.projectContentTiptap, "project_id", id.projectContent, "technology_id", id.techTiptap),
        ],
        ["project_id", "technology_id"],
      );

      await upsert(
        tx,
        "post_categories",
        [
          {
            id: id.categoryUi,
            name_id: "UI Engineering",
            name_en: "UI Engineering",
            slug: "ui-engineering",
            description_id: "Catatan seputar interface, sistem komponen, dan kualitas UI.",
            description_en: "Notes on interfaces, component systems, and UI quality.",
            created_at: now,
            updated_at: now,
          },
          {
            id: id.categoryNext,
            name_id: "Next.js",
            name_en: "Next.js",
            slug: "next-js",
            description_id: "Catatan seputar App Router, RSC, dan performa public pages.",
            description_en: "Notes on App Router, RSC, and public page performance.",
            created_at: now,
            updated_at: now,
          },
        ],
        ["slug"],
      );

      await upsert(
        tx,
        "posts",
        [
          post(id.postPortfolio, id.categoryUi, "portfolio-as-product", "Membuat portfolio terasa seperti produk", "Making a portfolio feel like a product", "published", 5),
          post(id.postServer, id.categoryNext, "server-components-public-pages", "Server Component sebagai default publik", "Server Components as the public default", "draft", 6),
        ],
        ["slug"],
      );

      await upsert(
        tx,
        "case_studies",
        [
          caseStudy(id.caseStudyDesign, "professional-design-token-kit", "Professional Design Token Kit", "Design system setup", "published", true),
          caseStudy(id.caseStudyContent, "case-study-writing-system", "Case Study Writing System", "Editorial CMS flow", "draft", false),
        ],
        ["slug"],
      );

      await upsert(tx, "case_study_images", [
        image(id.caseStudyImageDesign, "case_study_id", id.caseStudyDesign, "/seed/case-studies/design-system.webp", "Design system case study"),
      ]);

      await upsert(
        tx,
        "case_study_technologies",
        [
          relation(relationIds.caseDesignTailwind, "case_study_id", id.caseStudyDesign, "technology_id", id.techTailwind),
          relation(relationIds.caseDesignReact, "case_study_id", id.caseStudyDesign, "technology_id", id.techReact),
          relation(relationIds.caseContentTiptap, "case_study_id", id.caseStudyContent, "technology_id", id.techTiptap),
        ],
        ["case_study_id", "technology_id"],
      );

      await upsert(
        tx,
        "playground_items",
        [
          playground(id.playgroundMotion, "motion-card-stack", "Motion Card Stack", "framer-card-stack", "Motion", "published"),
          playground(id.playgroundTheme, "theme-token-lab", "Theme Token Lab", "theme-token-lab", "Design System", "draft"),
        ],
        ["slug"],
      );

      await upsert(
        tx,
        "playground_technologies",
        [
          relation(relationIds.playgroundMotionFramer, "playground_item_id", id.playgroundMotion, "technology_id", id.techFramer),
          relation(relationIds.playgroundThemeTailwind, "playground_item_id", id.playgroundTheme, "technology_id", id.techTailwind),
        ],
        ["playground_item_id", "technology_id"],
      );

      await upsert(tx, "contact_messages", [
        {
          id: id.contactMessage,
          profile_id: id.profile,
          name: "Nadia Prameswari",
          email: "nadia@example.com",
          subject: "Frontend Engineer opportunity",
          purpose: "job_opportunity",
          message:
            "Hi, I would like to discuss a frontend role focused on design systems and performance.",
          read_at: null,
          created_at: now,
        },
      ]);

      await upsert(
        tx,
        "guestbook_statuses",
        [
          { id: id.guestPending, name: "pending" },
          { id: id.guestApproved, name: "approved" },
          { id: id.guestRejected, name: "rejected" },
        ],
        ["name"],
      );

      await upsert(tx, "guestbook_entries", [
        {
          id: id.guestEntry,
          name: "Raka Mahendra",
          message: "Clean portfolio direction. The professional mode reads clearly.",
          website_url: "https://example.com",
          status_id: id.guestApproved,
          approved_at: now,
          created_at: now,
        },
      ]);

      await upsert(tx, "analytics_sessions", [
        {
          id: id.session,
          session_key: "seed-session-2026-05",
          user_agent: "Seed script",
          referrer: "direct",
          country: "ID",
          created_at: now,
        },
      ]);

      await upsert(tx, "analytics_events", [
        {
          id: id.eventPageView,
          session_id: id.session,
          event_name: "page_view",
          path: "/id",
          metadata: { seeded: true, source: "seed.ts" },
          created_at: now,
        },
        {
          id: id.eventResume,
          session_id: id.session,
          event_name: "resume_download",
          path: "/id/resume",
          metadata: { locale: "id", seeded: true },
          created_at: now,
        },
      ]);
    });
  } finally {
    await sql.end();
  }

  console.log("Seed completed successfully.");
}

function tech(
  techId: string,
  name: string,
  slug: string,
  category: string,
  color: string,
) {
  return {
    id: techId,
    name,
    slug,
    icon_url: null,
    category,
    color,
    created_at: now,
    updated_at: now,
  };
}

function skill(
  skillId: string,
  name: string,
  slug: string,
  category: string,
  level: string,
  priority: string,
  years: string,
  featured: boolean,
  sortOrder: number,
) {
  return {
    id: skillId,
    name,
    slug,
    category,
    level,
    priority,
    proficiency: null,
    icon_url: null,
    short_description_id: `Digunakan untuk membangun ${name} dalam workflow portfolio dinamis.`,
    short_description_en: `Used to build ${name} inside the dynamic portfolio workflow.`,
    long_description_id: `Seed ${name} untuk halaman skills dan admin CMS.`,
    long_description_en: `Seeded ${name} for the skills page and admin CMS.`,
    years_of_experience: years,
    featured,
    sort_order: sortOrder,
    created_at: now,
    updated_at: now,
  };
}

function project(
  projectId: string,
  slug: string,
  title: string,
  excerpt: string,
  projectType: string,
  status: string,
  isFeatured: boolean,
) {
  return {
    id: projectId,
    slug,
    title_id: title,
    title_en: title,
    excerpt_id: excerpt,
    excerpt_en: excerpt,
    content_json_id: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: excerpt }] }] },
    content_json_en: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: excerpt }] }] },
    content_html_id: `<p>${excerpt}</p>`,
    content_html_en: `<p>${excerpt}</p>`,
    cover_image_url: `/seed/projects/${slug}.webp`,
    status,
    featured: isFeatured,
    project_type: projectType,
    complexity: "medium",
    started_at: "2025-01-01",
    completed_at: status === "published" ? "2026-05-15" : null,
    live_url: "https://example.com",
    repository_url: "https://github.com/example/portfolio",
    seo_title_id: title,
    seo_title_en: title,
    seo_description_id: excerpt,
    seo_description_en: excerpt,
    published_at: status === "published" ? "2026-05-15" : null,
    created_at: now,
    updated_at: now,
  };
}

function image(
  imageId: string,
  parentColumn: "project_id" | "case_study_id",
  parentId: string,
  imageUrl: string,
  alt: string,
) {
  return {
    id: imageId,
    [parentColumn]: parentId,
    image_url: imageUrl,
    alt_id: alt,
    alt_en: alt,
    caption_id: alt,
    caption_en: alt,
    sort_order: 1,
    created_at: now,
  };
}

function post(
  postId: string,
  categoryId: string,
  slug: string,
  titleId: string,
  titleEn: string,
  status: string,
  readingTime: number,
) {
  const excerpt = "Structured writing for frontend engineering, product UI, and portfolio content.";

  return {
    id: postId,
    category_id: categoryId,
    slug,
    title_id: titleId,
    title_en: titleEn,
    excerpt_id: excerpt,
    excerpt_en: excerpt,
    content_json_id: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: excerpt }] }] },
    content_json_en: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: excerpt }] }] },
    content_html_id: `<p>${excerpt}</p>`,
    content_html_en: `<p>${excerpt}</p>`,
    cover_image_url: `/seed/blog/${slug}.webp`,
    status,
    reading_time: readingTime,
    seo_title_id: titleId,
    seo_title_en: titleEn,
    seo_description_id: excerpt,
    seo_description_en: excerpt,
    published_at: status === "published" ? now : null,
    created_at: now,
    updated_at: now,
  };
}

function caseStudy(
  caseStudyId: string,
  slug: string,
  title: string,
  context: string,
  status: string,
  isFeatured: boolean,
) {
  const excerpt = `Process narrative for ${title}.`;

  return {
    id: caseStudyId,
    slug,
    title_id: title,
    title_en: title,
    excerpt_id: excerpt,
    excerpt_en: excerpt,
    content_json_id: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: excerpt }] }] },
    content_json_en: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: excerpt }] }] },
    content_html_id: `<p>${excerpt}</p>`,
    content_html_en: `<p>${excerpt}</p>`,
    cover_image_url: `/seed/case-studies/${slug}.webp`,
    client_or_context: context,
    role: "Frontend Engineer",
    status,
    featured: isFeatured,
    seo_title_id: title,
    seo_title_en: title,
    seo_description_id: excerpt,
    seo_description_en: excerpt,
    published_at: status === "published" ? now : null,
    created_at: now,
    updated_at: now,
  };
}

function playground(
  playgroundId: string,
  slug: string,
  title: string,
  componentKey: string,
  category: string,
  status: string,
) {
  return {
    id: playgroundId,
    slug,
    title,
    description: `Seeded playground item for ${title}.`,
    component_key: componentKey,
    thumbnail_url: `/seed/playground/${slug}.webp`,
    category,
    status,
    complexity: "medium",
    created_at: now,
    updated_at: now,
  };
}

function relation(
  relationId: string,
  firstColumn: string,
  firstId: string,
  secondColumn: string,
  secondId: string,
) {
  return {
    id: relationId,
    [firstColumn]: firstId,
    [secondColumn]: secondId,
  };
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
