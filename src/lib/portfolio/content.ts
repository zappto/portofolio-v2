import { cache } from "react";
import type { Locale } from "@/config/site";

type Localized<T> = Record<Locale, T>;

const profile: Localized<{
  name: string;
  role: string;
  eyebrow: string;
  summary: string;
  bio: string[];
  location: string;
  availability: string;
  identity: string[];
  principles: string[];
  interests: string[];
}> = {
  id: {
    name: "Frontend Engineer",
    role: "Frontend Engineer untuk produk web yang rapi dan cepat.",
    eyebrow: "Modern Simple Professional",
    summary:
      "Saya membangun interface produk yang jelas, cepat, dan terasa matang dari sistem desain sampai detail interaksi.",
    bio: [
      "Saya fokus pada frontend engineering untuk produk digital yang perlu terasa kredibel sejak layar pertama: struktur konten jelas, UI konsisten, performa ringan, dan pengalaman yang tidak berisik.",
      "Cara kerja saya berada di tengah desain dan engineering. Saya menerjemahkan kebutuhan produk menjadi sistem komponen, halaman yang mudah discan, dan implementasi yang siap dirawat.",
    ],
    location: "Indonesia, remote-friendly",
    availability: "Available untuk role Frontend Engineer dan proyek UI engineering terpilih.",
    identity: [
      "UI systems thinker",
      "Performance-conscious frontend engineer",
      "Design-aware developer",
      "Builder of polished web interfaces",
    ],
    principles: [
      "Mulai dari informasi paling penting, baru lapisan visual.",
      "Komponen harus mudah dipakai ulang sebelum terlihat pintar.",
      "Animasi dipakai untuk orientasi, bukan untuk mengalihkan perhatian.",
      "Keputusan UI harus bisa dijelaskan dengan dampak ke pengguna.",
    ],
    interests: [
      "Design systems",
      "React Server Components",
      "Performance budgets",
      "Accessible interaction patterns",
    ],
  },
  en: {
    name: "Frontend Engineer",
    role: "Frontend Engineer for polished and fast web products.",
    eyebrow: "Modern Simple Professional",
    summary:
      "I build product interfaces that feel clear, fast, and mature from design systems to interaction details.",
    bio: [
      "I focus on frontend engineering for digital products that need credibility from the first screen: clear content structure, consistent UI, lightweight performance, and calm interaction.",
      "My work sits between design and engineering. I translate product needs into component systems, scannable pages, and maintainable implementation.",
    ],
    location: "Indonesia, remote-friendly",
    availability: "Available for Frontend Engineer roles and selected UI engineering projects.",
    identity: [
      "UI systems thinker",
      "Performance-conscious frontend engineer",
      "Design-aware developer",
      "Builder of polished web interfaces",
    ],
    principles: [
      "Start with the most important information, then add visual layers.",
      "Components should be reusable before they try to feel clever.",
      "Motion should orient users, not distract them.",
      "UI decisions should map to user impact.",
    ],
    interests: [
      "Design systems",
      "React Server Components",
      "Performance budgets",
      "Accessible interaction patterns",
    ],
  },
};

const projects = [
  {
    title: "Portfolio CMS Foundation",
    type: "Fullstack App",
    excerpt: {
      id: "Fondasi portfolio dinamis dengan i18n, mode visual, auth admin, Supabase, Drizzle, dan sistem komponen.",
      en: "A dynamic portfolio foundation with i18n, visual modes, admin auth, Supabase, Drizzle, and component systems.",
    },
    impact: "Architecture-first build",
    href: "/projects/portfolio-cms-foundation",
    featured: true,
    tech: ["Next.js", "Supabase", "Drizzle", "Tailwind CSS"],
  },
  {
    title: "Case Study Writing System",
    type: "Dashboard",
    excerpt: {
      id: "Struktur konten untuk project detail dan case study agar recruiter bisa memahami problem, proses, dan hasil.",
      en: "A content structure for project details and case studies so recruiters can understand the problem, process, and result.",
    },
    impact: "Editorial project storytelling",
    href: "/projects/case-study-writing-system",
    featured: true,
    tech: ["Tiptap", "PostgreSQL", "RSC"],
  },
  {
    title: "Professional Design Token Kit",
    type: "UI System",
    excerpt: {
      id: "Token warna, typography, spacing, radius, shadow, dan motion untuk mode professional dan playful.",
      en: "Color, typography, spacing, radius, shadow, and motion tokens for professional and playful modes.",
    },
    impact: "Consistent visual language",
    href: "/projects/design-token-kit",
    featured: true,
    tech: ["Design System", "shadcn/ui", "CSS Tokens"],
  },
] as const;

const skills = [
  {
    name: "React",
    category: "Frontend Core",
    level: "Core Strength",
    priority: "primary",
    years: "4+",
    description: "Component architecture, composition patterns, and rendering boundaries.",
    related: ["Next.js", "TanStack Query"],
    projects: ["Portfolio CMS Foundation", "Professional Design Token Kit"],
    featured: true,
  },
  {
    name: "Next.js",
    category: "Frontend Core",
    level: "Core Strength",
    priority: "primary",
    years: "3+",
    description: "App Router, Server Components, metadata, routing, and public performance.",
    related: ["RSC", "next-intl"],
    projects: ["Portfolio CMS Foundation", "Case Study Writing System"],
    featured: true,
  },
  {
    name: "TypeScript",
    category: "Frontend Core",
    level: "Production Ready",
    priority: "primary",
    years: "4+",
    description: "Typed UI contracts, safer component APIs, and maintainable data models.",
    related: ["Drizzle ORM", "Zod"],
    projects: ["Portfolio CMS Foundation"],
    featured: true,
  },
  {
    name: "Component Architecture",
    category: "UI Engineering",
    level: "Core Strength",
    priority: "primary",
    years: "3+",
    description: "Reusable layouts, variant systems, composition, and scalable page structure.",
    related: ["shadcn/ui", "Radix UI"],
    projects: ["Professional Design Token Kit"],
    featured: true,
  },
  {
    name: "Tailwind CSS",
    category: "Styling & Design System",
    level: "Production Ready",
    priority: "primary",
    years: "4+",
    description: "Token-driven styling, responsive systems, and component variants.",
    related: ["CSS Variables", "shadcn/ui"],
    projects: ["Professional Design Token Kit"],
    featured: true,
  },
  {
    name: "Accessibility",
    category: "UI Engineering",
    level: "Production Ready",
    priority: "secondary",
    years: "2+",
    description: "Semantic structure, focus visibility, keyboard paths, and readable contrast.",
    related: ["Forms", "Radix UI"],
    projects: ["Portfolio CMS Foundation"],
    featured: true,
  },
  {
    name: "Performance Optimization",
    category: "Performance & SEO",
    level: "Production Ready",
    priority: "secondary",
    years: "2+",
    description: "Server rendering boundaries, bundle awareness, metadata, and lightweight public pages.",
    related: ["Next.js", "Core Web Vitals"],
    projects: ["Portfolio CMS Foundation"],
    featured: true,
  },
  {
    name: "Design System Implementation",
    category: "Styling & Design System",
    level: "Core Strength",
    priority: "secondary",
    years: "3+",
    description: "Design tokens, typography scales, radius, shadows, and mode-specific component behavior.",
    related: ["CSS Variables", "shadcn/ui"],
    projects: ["Professional Design Token Kit"],
    featured: true,
  },
  {
    name: "Supabase",
    category: "Backend Integration",
    level: "Working Knowledge",
    priority: "supporting",
    years: "2+",
    description: "Auth, Postgres-backed content, storage, and server-side clients.",
    related: ["PostgreSQL", "RLS"],
    projects: ["Portfolio CMS Foundation"],
    featured: false,
  },
  {
    name: "Drizzle ORM",
    category: "Database",
    level: "Working Knowledge",
    priority: "supporting",
    years: "1+",
    description: "Typed schema design, migrations, and query ergonomics.",
    related: ["PostgreSQL", "TypeScript"],
    projects: ["Portfolio CMS Foundation"],
    featured: false,
  },
  {
    name: "React Hook Form",
    category: "State & Data Fetching",
    level: "Production Ready",
    priority: "secondary",
    years: "2+",
    description: "Accessible form composition with validation and clear error states.",
    related: ["Zod", "Server Actions"],
    projects: ["Contact Form UI"],
    featured: false,
  },
  {
    name: "Figma",
    category: "Design Tools",
    level: "Working Knowledge",
    priority: "secondary",
    years: "3+",
    description: "Design handoff, component audit, spacing systems, and visual QA.",
    related: ["Design Tokens", "Prototyping"],
    projects: ["Professional Design Token Kit"],
    featured: false,
  },
  {
    name: "Tiptap",
    category: "CMS & Content",
    level: "Working Knowledge",
    priority: "supporting",
    years: "1+",
    description: "Structured rich text editing for blog, case study, and project content.",
    related: ["Rich Text Rendering", "Content Modeling"],
    projects: ["Case Study Writing System"],
    featured: false,
  },
  {
    name: "Testing Library",
    category: "Testing & Quality",
    level: "Exploring",
    priority: "learning",
    years: "1+",
    description: "User-centered component tests for important interaction paths.",
    related: ["Vitest", "Accessibility"],
    projects: ["Frontend Systems Practice"],
    featured: false,
  },
  {
    name: "Playwright",
    category: "Testing & Quality",
    level: "Exploring",
    priority: "learning",
    years: "<1",
    description: "End-to-end checks and visual confidence for public user flows.",
    related: ["Visual QA", "CI"],
    projects: ["Frontend Systems Practice"],
    featured: false,
  },
] as const;

const experiences: Localized<
  {
    role: string;
    company: string;
    type: string;
    location: string;
    range: string;
    description: string;
    achievements: string[];
    tech: string[];
  }[]
> = {
  id: [
    {
      role: "Frontend Engineer",
      company: "Independent Product Work",
      type: "Freelance",
      location: "Remote",
      range: "2024 - Sekarang",
      description:
        "Membangun interface produk, landing page, dan fondasi CMS dengan perhatian pada performa, struktur konten, dan detail visual.",
      achievements: [
        "Menyusun design token dan komponen reusable untuk mempercepat iterasi UI.",
        "Menerapkan routing, i18n, dan struktur halaman publik yang SEO-friendly.",
      ],
      tech: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    },
    {
      role: "UI Engineering Learner",
      company: "Frontend Systems Practice",
      type: "Project-based",
      location: "Indonesia",
      range: "2022 - 2024",
      description:
        "Mendalami pola frontend modern melalui project dashboard, design system kecil, dan eksperimen interaksi.",
      achievements: [
        "Membuat pattern card, form, layout, dan navigation yang konsisten.",
        "Mengukur keputusan UI dari sisi readability, responsiveness, dan maintainability.",
      ],
      tech: ["TypeScript", "shadcn/ui", "Framer Motion", "PostgreSQL"],
    },
  ],
  en: [
    {
      role: "Frontend Engineer",
      company: "Independent Product Work",
      type: "Freelance",
      location: "Remote",
      range: "2024 - Present",
      description:
        "Building product interfaces, landing pages, and CMS foundations with attention to performance, content structure, and visual details.",
      achievements: [
        "Created design tokens and reusable components to speed up UI iteration.",
        "Implemented routing, i18n, and SEO-friendly public page structure.",
      ],
      tech: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    },
    {
      role: "UI Engineering Learner",
      company: "Frontend Systems Practice",
      type: "Project-based",
      location: "Indonesia",
      range: "2022 - 2024",
      description:
        "Practicing modern frontend patterns through dashboards, small design systems, and interaction experiments.",
      achievements: [
        "Built consistent card, form, layout, and navigation patterns.",
        "Evaluated UI decisions through readability, responsiveness, and maintainability.",
      ],
      tech: ["TypeScript", "shadcn/ui", "Framer Motion", "PostgreSQL"],
    },
  ],
};

const posts: Localized<
  {
    title: string;
    category: string;
    excerpt: string;
    readTime: string;
    href: string;
  }[]
> = {
  id: [
    {
      title: "Membuat portfolio terasa seperti produk",
      category: "UI Engineering",
      excerpt:
        "Catatan tentang struktur informasi, ritme section, dan kenapa portfolio frontend perlu lebih dari daftar project.",
      readTime: "5 min read",
      href: "/blog/portfolio-as-product",
    },
    {
      title: "Server Component sebagai default publik",
      category: "Next.js",
      excerpt:
        "Pendekatan menjaga halaman publik tetap ringan dengan memindahkan interaksi hanya ke leaf component.",
      readTime: "6 min read",
      href: "/blog/server-components-public-pages",
    },
  ],
  en: [
    {
      title: "Making a portfolio feel like a product",
      category: "UI Engineering",
      excerpt:
        "Notes on information structure, section rhythm, and why a frontend portfolio needs more than a project list.",
      readTime: "5 min read",
      href: "/blog/portfolio-as-product",
    },
    {
      title: "Server Components as the public default",
      category: "Next.js",
      excerpt:
        "An approach for keeping public pages lightweight by moving interaction only to leaf components.",
      readTime: "6 min read",
      href: "/blog/server-components-public-pages",
    },
  ],
};

const techStack: Localized<
  {
    name: string;
    category: string;
    description: string;
    reason: string;
    relatedProject: string;
  }[]
> = {
  id: [
    {
      name: "Next.js App Router",
      category: "Frontend",
      description: "Routing, Server Components, metadata, dan struktur multi-page.",
      reason: "Cocok untuk portfolio SEO-friendly yang tetap punya area admin dinamis.",
      relatedProject: "Portfolio CMS Foundation",
    },
    {
      name: "Tailwind CSS + tokens",
      category: "Styling",
      description: "Utility styling yang dikunci oleh CSS variables dari design system.",
      reason: "Cepat untuk iterasi, tetapi tetap konsisten lintas mode visual.",
      relatedProject: "Professional Design Token Kit",
    },
    {
      name: "Supabase",
      category: "Backend",
      description: "Auth, Postgres, storage, dan server-side client.",
      reason: "Memberi backend praktis untuk CMS tanpa membuat produk admin terlalu kompleks.",
      relatedProject: "Portfolio CMS Foundation",
    },
    {
      name: "Drizzle ORM",
      category: "Database",
      description: "Schema typed dan migration workflow untuk PostgreSQL.",
      reason: "Menjaga kontrak data eksplisit dan mudah diaudit.",
      relatedProject: "Portfolio CMS Foundation",
    },
    {
      name: "Tiptap",
      category: "CMS",
      description: "Editor rich text untuk blog, case study, dan project detail.",
      reason: "Fleksibel untuk konten naratif tanpa mengorbankan struktur data.",
      relatedProject: "Case Study Writing System",
    },
  ],
  en: [
    {
      name: "Next.js App Router",
      category: "Frontend",
      description: "Routing, Server Components, metadata, and multi-page structure.",
      reason: "Fits an SEO-friendly portfolio that still has a dynamic admin area.",
      relatedProject: "Portfolio CMS Foundation",
    },
    {
      name: "Tailwind CSS + tokens",
      category: "Styling",
      description: "Utility styling constrained by design-system CSS variables.",
      reason: "Fast to iterate while staying consistent across visual modes.",
      relatedProject: "Professional Design Token Kit",
    },
    {
      name: "Supabase",
      category: "Backend",
      description: "Auth, Postgres, storage, and server-side clients.",
      reason: "Provides a practical CMS backend without overcomplicating admin scope.",
      relatedProject: "Portfolio CMS Foundation",
    },
    {
      name: "Drizzle ORM",
      category: "Database",
      description: "Typed schema and migration workflow for PostgreSQL.",
      reason: "Keeps data contracts explicit and easy to audit.",
      relatedProject: "Portfolio CMS Foundation",
    },
    {
      name: "Tiptap",
      category: "CMS",
      description: "Rich text editor for blog, case study, and project details.",
      reason: "Flexible for narrative content without sacrificing data structure.",
      relatedProject: "Case Study Writing System",
    },
  ],
};

const stats = {
  projectsShipped: 7,
  articlesWritten: 2,
  uiExperiments: 11,
  technologiesUsed: 18,
  caseStudies: 3,
  performanceHighlights: "90+ Lighthouse target for public pages",
} as const;

const resume: Localized<{
  version: string;
  updated: string;
  fileLabel: string;
  fileUrl: string;
  summary: string;
  highlights: string[];
}> = {
  id: {
    version: "ID-2026.05",
    updated: "15 Mei 2026",
    fileLabel: "Download CV Bahasa Indonesia",
    fileUrl: "/resume/frontend-engineer-id.pdf",
    summary:
      "Ringkasan satu halaman tentang fokus frontend, project unggulan, stack utama, dan cara kerja.",
    highlights: [
      "Frontend Engineer dengan fokus UI system dan performa.",
      "Pengalaman membangun portfolio dinamis, CMS, dan component foundation.",
      "Siap untuk role product frontend, startup, dan proyek UI engineering.",
    ],
  },
  en: {
    version: "EN-2026.05",
    updated: "May 15, 2026",
    fileLabel: "Download English Resume",
    fileUrl: "/resume/frontend-engineer-en.pdf",
    summary:
      "A one-page summary of frontend focus, selected projects, core stack, and working style.",
    highlights: [
      "Frontend Engineer focused on UI systems and performance.",
      "Experience building dynamic portfolio, CMS, and component foundations.",
      "Ready for product frontend roles, startups, and UI engineering work.",
    ],
  },
};

export const getProfile = cache(async (locale: Locale) => profile[locale]);

export const getFeaturedProjects = cache(async (locale: Locale) =>
  projects.map((project) => ({
    ...project,
    excerpt: project.excerpt[locale],
  })),
);

export const getFeaturedSkills = cache(async () =>
  skills.filter((skill) => skill.featured),
);

export const getSkills = cache(async () => skills);

export const getLearningSkills = cache(async () =>
  skills.filter((skill) => skill.priority === "learning"),
);

export const getExperiencePreview = cache(async (locale: Locale) =>
  experiences[locale].slice(0, 2),
);

export const getExperiences = cache(async (locale: Locale) => experiences[locale]);

export const getLatestPosts = cache(async (locale: Locale) => posts[locale]);

export const getStatsSummary = cache(async () => stats);

export const getTechStack = cache(async (locale: Locale) => techStack[locale]);

export const getResume = cache(async (locale: Locale) => resume[locale]);

export function normalizeLocale(value: string): Locale {
  return value === "en" ? "en" : "id";
}

export function uniqueValues<T extends string>(values: readonly T[]) {
  return Array.from(new Set(values));
}
