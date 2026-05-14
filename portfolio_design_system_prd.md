# PRD & Design System Portfolio Dinamis

## 1. Ringkasan Produk

Portfolio ini adalah website personal profesional untuk kebutuhan kerja sebagai **Frontend Engineer**, dengan sistem konten dinamis berbasis database. Website tidak dibuat sebagai SPA penuh, melainkan sebagai **multi-page website** menggunakan Next.js App Router agar performa, SEO, dan struktur kontennya lebih kuat.

Website memiliki dua mode visual:

1. **Modern Simple Professional**  
   Nuansa: premium, elegant, clean, minimal, black and white. Terinspirasi dari Linear dan Raycast.

2. **Playful Modern**  
   Nuansa: creative, friendly, expressive, interactive. Terinspirasi dari Figma dan Gumroad, dengan sentuhan neo-brutalism yang tetap rapi dan tidak norak.

Tujuan utamanya bukan hanya menampilkan data diri, tetapi membuktikan kemampuan sebagai frontend engineer melalui kualitas UI, sistem desain, performa, SEO, dan cara menyusun produk digital.

---

## 2. Product Vision

Membangun portfolio yang terasa seperti produk digital profesional, bukan sekadar halaman profil. Website harus menunjukkan bahwa pemiliknya mampu:

- Mendesain interface yang matang.
- Membangun frontend modern dengan arsitektur yang rapi.
- Mengelola konten secara dinamis.
- Mengoptimalkan performa dan SEO.
- Menampilkan project dalam format case study yang kredibel.
- Menghadirkan pengalaman visual berbeda melalui dua mode desain.

---

## 3. Target Audience

### 3.1 Recruiter Perusahaan

Kebutuhan:

- Melihat skill utama dengan cepat.
- Melihat pengalaman dan project terbaik.
- Mengunduh CV.
- Menghubungi kandidat.
- Menilai profesionalitas dari tampilan portfolio.

Prioritas UX:

- Navigasi jelas.
- Konten ringkas dan kredibel.
- CTA ke resume dan contact mudah ditemukan.
- Tidak terlalu banyak efek visual yang mengganggu.

### 3.2 Startup Founder

Kebutuhan:

- Melihat kemampuan problem solving.
- Melihat hasil project nyata.
- Memahami style kerja dan teknis.
- Menilai apakah cocok untuk tim kecil yang cepat.

Prioritas UX:

- Case study kuat.
- Stack teknis jelas.
- Project detail menunjukkan impact.
- Bahasa tidak terlalu kaku.

### 3.3 Client Freelance

Kebutuhan:

- Melihat layanan atau kemampuan yang bisa ditawarkan.
- Melihat hasil visual project.
- Menghubungi dengan mudah.
- Percaya bahwa developer bisa deliver.

Prioritas UX:

- Project showcase visual.
- Contact form sederhana.
- Testimoni opsional.
- Penjelasan value yang mudah dipahami.

---

## 4. Goals

### 4.1 Business Goals

- Meningkatkan peluang diterima kerja sebagai Frontend Engineer.
- Meningkatkan kredibilitas personal branding.
- Menjadi pusat dokumentasi project, tulisan, dan eksperimen frontend.
- Memudahkan update konten tanpa perlu edit source code.

### 4.2 User Goals

- Pengunjung bisa memahami siapa pemilik portfolio dalam 10 detik pertama.
- Pengunjung bisa melihat project terbaik tanpa friction.
- Pengunjung bisa membaca case study secara nyaman.
- Pengunjung bisa menghubungi pemilik portfolio dengan cepat.
- Pengunjung bisa memilih pengalaman visual yang sesuai: professional atau playful.

### 4.3 Technical Goals

- Web ringan, cepat, dan SEO-friendly.
- Menggunakan SSR/SSG/hybrid rendering sesuai kebutuhan halaman.
- Admin CMS aman dan mudah dipakai.
- Konten bilingual: Indonesia dan Inggris.
- Struktur database scalable.
- Design token konsisten untuk dua mode visual.

---

## 5. Non-Goals

- Tidak membuat SPA penuh.
- Tidak membuat animasi berat di semua halaman.
- Tidak membuat website yang bergantung penuh pada client-side rendering.
- Tidak menampilkan efek visual jika tidak mendukung konten.
- Tidak menjadikan dashboard admin sebagai produk kompleks multi-user.
- Tidak memasukkan live GitHub stats karena statistik developer akan diatur sendiri secara terpisah.

---

## 6. Core Features

## 6.1 Public Website

### 6.1.1 Home Page

Tujuan:

- Memberi first impression kuat.
- Menjelaskan posisi sebagai Frontend Engineer.
- Menampilkan project unggulan.
- Mengarahkan ke resume, projects, dan contact.

Section:

- Hero.
- Short About.
- Featured Projects.
- Skills Snapshot.
- Experience Preview.
- Coding Stats Preview.
- Blog Preview.
- Contact CTA.

Professional mode:

- Layout editorial minimal.
- Bento grid ringan.
- Motion halus.
- Dominan hitam putih.

Playful mode:

- Layout lebih ekspresif.
- Kartu besar, warna cerah, outline tebal.
- Micro-interaction lebih banyak.
- Playground teaser tersedia.

---

### 6.1.2 About Page

Konten:

- Bio lengkap.
- Foto/avatar.
- Value sebagai frontend engineer.
- Cara kerja.
- Interest teknis.
- Developer identity.

Developer identity yang disarankan:

- UI systems thinker.
- Performance-conscious frontend engineer.
- Design-aware developer.
- Builder of polished web interfaces.

Professional mode:

- Teks rapi, spacing lega, layout premium.

Playful mode:

- Lebih personal, friendly, card-based, visual sticker/label.

---

### 6.1.3 Skills Page

Kategori:

- Frontend.
- Styling.
- State Management.
- Backend Integration.
- Database.
- Tooling.
- Testing.
- Design Tools.

Data skill:

- Name.
- Category.
- Proficiency.
- Icon.
- Description.
- Years of usage.
- Featured flag.

UI:

- Filter by category.
- Search skill.
- Skill matrix.
- Tooltip explanation.

---

### 6.1.4 Experience Page

Konten:

- Work experience.
- Internship.
- Organization.
- Freelance.
- Education opsional.

Data:

- Role.
- Company.
- Employment type.
- Location.
- Start date.
- End date.
- Description.
- Achievements.
- Tech used.

UI:

- Timeline.
- Expandable details.
- Tags teknologi.

---

### 6.1.5 Projects Page

Fitur:

- List semua project.
- Filter by tech stack.
- Filter by type.
- Search.
- Sort by newest, featured, complexity.

Project type:

- Web App.
- Landing Page.
- Dashboard.
- Fullstack App.
- UI Experiment.
- Open Source.

Professional mode:

- Clean project grid.
- Strong typography.
- Subtle hover.

Playful mode:

- Bold card.
- Interactive hover.
- Tilt/drag optional.
- Sticker tags.

---

### 6.1.6 Project Detail Page

Struktur konten:

1. Hero project.
2. Overview.
3. Problem.
4. Goal.
5. Role.
6. Tech stack.
7. Features.
8. Architecture.
9. Design decisions.
10. Challenges.
11. Result.
12. Screenshots.
13. Links.
14. Related projects.

Data penting:

- Title.
- Slug.
- Excerpt.
- Content.
- Cover image.
- Gallery.
- Tech stack.
- Live URL.
- Repository URL.
- Status.
- Featured.
- Published.
- SEO title.
- SEO description.

---

### 6.1.7 Case Studies Page

Case study berbeda dari project biasa. Case study harus lebih naratif dan berorientasi proses.

Struktur:

- Context.
- Problem.
- Constraints.
- Process.
- Solution.
- Technical decisions.
- UI decisions.
- Result.
- Reflection.

Mode professional lebih cocok untuk case study utama. Mode playful bisa memberi visual tambahan, tapi isi tetap harus mudah dibaca.

---

### 6.1.8 Blog Page

Tujuan:

- SEO.
- Personal branding.
- Bukti kemampuan menjelaskan.
- Dokumentasi pembelajaran.

Kategori:

- Frontend.
- Next.js.
- UI Engineering.
- Performance.
- Database.
- Notes.
- Career.

Fitur:

- Search.
- Category filter.
- Reading time.
- Table of contents.
- Related posts.
- Draft/published dari CMS.

---

### 6.1.9 Playground Page

Catatan penting:

- Hanya tersedia pada **Playful Modern Mode**.
- Jika user memakai Professional Mode, menu Playground bisa disembunyikan atau diarahkan ke halaman yang menjelaskan bahwa playground tersedia di playful mode.

Isi playground:

- UI experiments.
- Micro-interaction demos.
- CSS experiments.
- Framer Motion experiments.
- Small frontend toys.
- Theme experiments.

Fitur:

- Preview card.
- Source snippet opsional.
- Difficulty tag.
- Interaction tag.

Performance rule:

- Playground harus lazy loaded.
- Heavy animation hanya aktif ketika visible.
- Tidak boleh membebani halaman utama.

---

### 6.1.10 Tech Stack Page

Tujuan:

- Menjelaskan tools yang digunakan.
- Menunjukkan pemahaman teknis.

Konten:

- Frontend stack.
- Backend stack.
- Database stack.
- CMS stack.
- Deployment.
- Analytics.
- Design tools.

UI:

- Stack cards.
- Why I use this.
- Related projects per tool.

---

### 6.1.11 Coding Stats Page

Karena live GitHub stats tidak dimasukkan sebagai requirement utama, coding stats bisa berupa curated stats dari database atau integrasi terpisah.

Contoh data:

- Total projects shipped.
- Articles written.
- UI experiments.
- Technologies used.
- Case studies published.
- Performance score highlights.

Prinsip:

- Jangan terlalu gimmick.
- Statistik harus mendukung kredibilitas.

---

### 6.1.12 Contact Page

Fitur:

- Contact form.
- Email direct link.
- Social links.
- Availability status.
- Response expectation.

Form fields:

- Name.
- Email.
- Subject.
- Message.
- Purpose.

Purpose options:

- Job opportunity.
- Freelance project.
- Collaboration.
- General message.

---

### 6.1.13 Resume Page

Fitur:

- Download CV.
- Preview resume.
- Version ID/EN.
- Last updated.

Data:

- Resume file URL.
- Locale.
- Version.
- Updated date.

---

### 6.1.14 Guestbook Page

Fitur:

- Visitor messages.
- Name.
- Message.
- Website/social link optional.
- Moderation from admin.

Security:

- Rate limit.
- Captcha/turnstile optional.
- Admin approval before publish.

---

## 7. Admin CMS Requirements

## 7.1 Authentication

- Single admin role.
- Login menggunakan Supabase Auth.
- Admin access hanya untuk user tertentu.
- Middleware protection untuk semua route `/admin`.

## 7.2 Admin Dashboard

Dashboard menampilkan:

- Total projects.
- Total blog posts.
- Total case studies.
- Draft count.
- Contact messages.
- Guestbook pending approval.
- Basic analytics.

## 7.3 Content Management

Admin bisa CRUD:

- Profile.
- Projects.
- Case studies.
- Blog posts.
- Skills.
- Experiences.
- Tech stack.
- Playground items.
- Resume.
- Guestbook moderation.

## 7.4 Editor

Editor yang disarankan:

- Tiptap sebagai WYSIWYG editor.
- Simpan content dalam JSON dan HTML hasil render.
- Untuk SEO dan performa, generate HTML statis dari content saat publish/update.

Editor features:

- Heading.
- Paragraph.
- Bold/italic.
- Link.
- Image.
- Code block.
- Bullet list.
- Ordered list.
- Quote.
- Callout.
- Divider.
- Table optional.

## 7.5 Draft & Publish

Setiap content entity utama harus punya status:

- draft.
- published.
- archived.

Field:

- published_at.
- updated_at.
- created_at.

## 7.6 Image Upload

Menggunakan Supabase Storage.

Bucket:

- avatars.
- projects.
- blogs.
- resumes.
- playground.

Rule:

- File image dikompresi sebelum upload jika memungkinkan.
- Gunakan format modern seperti WebP/AVIF jika pipeline mendukung.
- Maksimal ukuran file ditentukan.

## 7.7 Analytics

Minimum analytics:

- Page views.
- Project detail views.
- Blog views.
- Contact form submissions.
- Resume downloads.
- Theme mode usage.

Analytics bisa disimpan internal di database atau pakai provider eksternal yang ringan.

---

## 8. Information Architecture

## 8.1 Public Routes

```txt
/
/about
/skills
/experience
/projects
/projects/[slug]
/case-studies
/case-studies/[slug]
/blog
/blog/[slug]
/playground
/playground/[slug]
/tech-stack
/coding-stats
/contact
/resume
/guestbook
```

## 8.2 Locale Routes

Karena support ID + EN, struktur route disarankan:

```txt
/[locale]
/[locale]/about
/[locale]/projects
/[locale]/projects/[slug]
/[locale]/blog
/[locale]/blog/[slug]
```

Contoh:

```txt
/id/projects
/en/projects
```

## 8.3 Admin Routes

```txt
/admin
/admin/profile
/admin/projects
/admin/projects/new
/admin/projects/[id]/edit
/admin/case-studies
/admin/blog
/admin/skills
/admin/experience
/admin/tech-stack
/admin/playground
/admin/resume
/admin/guestbook
/admin/messages
/admin/analytics
/admin/settings
```

---

## 9. Rendering Strategy

Website tidak boleh berat dan tidak boleh jadi SPA penuh. Maka strategi rendering:

## 9.1 Static/SSG-style Pages

Cocok untuk:

- Home.
- About.
- Skills.
- Experience.
- Projects list.
- Blog list.
- Case studies list.
- Project detail.
- Blog detail.
- Case study detail.

Strategi:

- Cache data publik.
- Revalidate saat konten berubah.
- Gunakan server rendering dan static generation semaksimal mungkin.

## 9.2 Dynamic Server Pages

Cocok untuk:

- Guestbook.
- Contact form.
- Admin dashboard.
- Analytics.

## 9.3 Client Components

Gunakan client component hanya untuk:

- Theme switcher.
- Locale switcher.
- Interactive filter/search.
- Playground interactive widgets.
- Tiptap editor.
- Admin form.
- Framer Motion interactions.

Rule:

- Default semua component adalah Server Component.
- Client Component hanya jika butuh state, effect, event listener, animation, atau browser API.

---

## 10. Performance Requirements

## 10.1 Performance Targets

Target minimum:

- Lighthouse Performance: 90+.
- Lighthouse Accessibility: 95+.
- Lighthouse SEO: 95+.
- Largest Contentful Paint: < 2.5s.
- Cumulative Layout Shift: < 0.1.
- Interaction to Next Paint: < 200ms.
- First Load JS sekecil mungkin.

## 10.2 Performance Rules

- Gunakan Next.js Image untuk semua image penting.
- Hindari animasi global berat.
- Lazy load section non-kritis.
- Dynamic import untuk playground, editor, charts, dan komponen berat.
- Jangan load Framer Motion di semua page jika tidak perlu.
- Gunakan font self-hosted atau `next/font`.
- Batasi jumlah font weight.
- Jangan pakai terlalu banyak icon library sekaligus.
- Gunakan caching untuk data publik.
- Gunakan pagination untuk blog/project jika data banyak.
- Kompres gambar.
- Hindari video background kecuali benar-benar perlu.
- Preload hanya asset kritikal.

## 10.3 Animation Budget

Professional mode:

- Fade in ringan.
- Slide kecil.
- Hover subtle.
- Tidak ada parallax berat.
- Tidak ada cursor custom.

Playful mode:

- Motion lebih banyak.
- Hover playful.
- Drag cards optional.
- Micro-interactions.
- Namun tetap lazy loaded dan scoped per halaman.

## 10.4 Bundle Strategy

- Tiptap hanya di admin/editor page.
- Chart library hanya di analytics/stat page.
- Playground component lazy loaded.
- Admin dependencies tidak masuk public bundle.
- Separate route groups untuk public dan admin.

---

## 11. SEO Requirements

## 11.1 Global SEO

- Dynamic metadata per page.
- Open Graph image per project/blog/case study.
- Twitter card metadata.
- Canonical URL.
- Sitemap.
- Robots.txt.
- Structured data.
- Locale alternate links.

## 11.2 Content SEO

Setiap blog/case study/project harus punya:

- SEO title.
- SEO description.
- Slug.
- Excerpt.
- Cover image alt text.
- Keywords optional.
- Published date.
- Updated date.

## 11.3 Structured Data

Gunakan schema:

- Person.
- WebSite.
- BlogPosting.
- CreativeWork.
- SoftwareSourceCode opsional untuk project tertentu.

---

## 12. Accessibility Requirements

- Keyboard navigation lengkap.
- Focus visible jelas.
- Contrast minimal WCAG AA.
- Semua image punya alt.
- Button dan link harus jelas.
- Motion respect `prefers-reduced-motion`.
- Form error harus accessible.
- Dialog dan command palette harus support focus trap.
- Jangan hanya mengandalkan warna untuk status.

---

# 13. Design System Overview

Design system terdiri dari:

- Color tokens.
- Typography tokens.
- Spacing tokens.
- Radius tokens.
- Shadow/elevation tokens.
- Border tokens.
- Motion tokens.
- Component tokens.
- Theme-specific style rules.

Dua mode desain tetap memakai struktur token yang sama agar implementasi Tailwind dan shadcn lebih mudah.

---

# 14. Design Direction: Modern Simple Professional

## 14.1 Personality

- Minimal.
- Premium.
- Elegant.
- Quiet confidence.
- Highly readable.
- Strong spacing.
- Tidak terlalu banyak warna.

## 14.2 Visual References

- Linear.
- Raycast.
- Vercel-like clarity.
- Editorial tech portfolio.

## 14.3 Layout Style

Disarankan:

- Hybrid editorial + bento grid.
- Banyak whitespace.
- Section-based pages.
- Typography hierarchy kuat.
- Card clean dengan border subtle.

## 14.4 Color Direction

Black and white dengan gray scale.

Prinsip:

- Background dominan putih atau near-black.
- Text sangat jelas.
- Accent minim, hanya untuk focus/interactive.
- Jangan pakai gradient berlebihan.

## 14.5 Typography

Karena tidak mau Poppins tapi tetap modern minimal, rekomendasi:

### Primary font

**Geist Sans**

Alasan:

- Modern.
- Clean.
- Cocok dengan Next.js ecosystem.
- Terasa teknis tapi tidak kaku.
- Sangat cocok untuk portfolio frontend profesional.

### Alternative

- Inter.
- Satoshi.
- Manrope.
- Plus Jakarta Sans.

### Mono font

**Geist Mono** atau **JetBrains Mono**.

Digunakan untuk:

- Code snippet.
- Metadata.
- Tech labels.
- Small system text.

---

# 15. Design Direction: Playful Modern

## 15.1 Personality

- Creative.
- Friendly.
- Energetic.
- Experimental.
- Modern.
- Sedikit neo-brutalist tapi tetap usable.

## 15.2 Visual References

- Figma.
- Gumroad.
- Modern neo-brutalism.
- Playful creator portfolio.

## 15.3 Layout Style

Disarankan:

- Bento + dashboard + playground card.
- Kartu berwarna.
- Border tebal.
- Offset shadow.
- Sticker/label visual.
- Section lebih ekspresif.

## 15.4 Color Direction

Playful boleh warna, tapi tetap konsisten. Gunakan warna utama yang terbatas.

Palette disarankan:

- Ink Black.
- Cream White.
- Electric Blue.
- Lemon Yellow.
- Coral Red.
- Mint Green.
- Lavender.

Rule:

- Jangan semua warna dipakai dalam satu section.
- Maksimal 2 warna aksen per section.
- Background tetap stabil.
- Warna terang dipakai untuk highlight, bukan body text panjang.

## 15.5 Typography

### Primary font

**Plus Jakarta Sans**

Alasan:

- Friendly.
- Modern.
- Rounded enough.
- Masih profesional.

### Display font optional

**Space Grotesk**

Digunakan untuk:

- Hero title.
- Playground title.
- Big card headline.

### Mono font

**JetBrains Mono**

Digunakan untuk:

- Code.
- Tags.
- Console-like details.

---

# 16. Design Tokens

## 16.1 Token Naming Convention

Gunakan semantic token, bukan token berdasarkan warna literal.

Contoh buruk:

```txt
black-500
blue-300
```

Contoh baik:

```txt
background
foreground
muted
primary
accent
border
card
```

---

# 17. Professional Theme Tokens

## 17.1 Color Tokens

```json
{
  "theme": "modern-professional",
  "colors": {
    "background": "#FAFAFA",
    "foreground": "#0A0A0A",
    "surface": "#FFFFFF",
    "surfaceElevated": "#FFFFFF",
    "muted": "#F4F4F5",
    "mutedForeground": "#71717A",
    "primary": "#0A0A0A",
    "primaryForeground": "#FFFFFF",
    "secondary": "#F4F4F5",
    "secondaryForeground": "#18181B",
    "accent": "#18181B",
    "accentForeground": "#FFFFFF",
    "border": "#E4E4E7",
    "borderStrong": "#D4D4D8",
    "ring": "#18181B",
    "success": "#16A34A",
    "warning": "#CA8A04",
    "danger": "#DC2626",
    "info": "#2563EB"
  }
}
```

## 17.2 Dark Color Tokens

```json
{
  "theme": "modern-professional-dark",
  "colors": {
    "background": "#09090B",
    "foreground": "#FAFAFA",
    "surface": "#111113",
    "surfaceElevated": "#18181B",
    "muted": "#1F1F23",
    "mutedForeground": "#A1A1AA",
    "primary": "#FAFAFA",
    "primaryForeground": "#09090B",
    "secondary": "#18181B",
    "secondaryForeground": "#FAFAFA",
    "accent": "#E4E4E7",
    "accentForeground": "#09090B",
    "border": "#27272A",
    "borderStrong": "#3F3F46",
    "ring": "#FAFAFA",
    "success": "#22C55E",
    "warning": "#EAB308",
    "danger": "#EF4444",
    "info": "#60A5FA"
  }
}
```

## 17.3 Typography Tokens

```json
{
  "font": {
    "sans": "Geist Sans",
    "mono": "Geist Mono"
  },
  "fontSize": {
    "xs": "0.75rem",
    "sm": "0.875rem",
    "base": "1rem",
    "lg": "1.125rem",
    "xl": "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem"
  },
  "lineHeight": {
    "tight": "1.1",
    "snug": "1.25",
    "normal": "1.5",
    "relaxed": "1.7"
  },
  "fontWeight": {
    "regular": "400",
    "medium": "500",
    "semibold": "600",
    "bold": "700"
  }
}
```

## 17.4 Spacing Tokens

```json
{
  "spacing": {
    "0": "0px",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "32": "8rem"
  }
}
```

## 17.5 Radius Tokens

```json
{
  "radius": {
    "sm": "0.375rem",
    "md": "0.5rem",
    "lg": "0.75rem",
    "xl": "1rem",
    "2xl": "1.25rem",
    "full": "9999px"
  }
}
```

## 17.6 Shadow Tokens

```json
{
  "shadow": {
    "sm": "0 1px 2px rgba(0, 0, 0, 0.04)",
    "md": "0 8px 24px rgba(0, 0, 0, 0.06)",
    "lg": "0 16px 48px rgba(0, 0, 0, 0.08)",
    "none": "none"
  }
}
```

## 17.7 Motion Tokens

```json
{
  "motion": {
    "durationFast": "120ms",
    "durationBase": "180ms",
    "durationSlow": "260ms",
    "easeOut": "cubic-bezier(0.16, 1, 0.3, 1)",
    "easeInOut": "cubic-bezier(0.65, 0, 0.35, 1)",
    "scaleHover": "1.01",
    "translateHover": "-2px"
  }
}
```

---

# 18. Playful Theme Tokens

## 18.1 Color Tokens

```json
{
  "theme": "playful-modern",
  "colors": {
    "background": "#FFF8E7",
    "foreground": "#151515",
    "surface": "#FFFFFF",
    "surfaceElevated": "#FFFDF7",
    "muted": "#F2EAD3",
    "mutedForeground": "#5F5A4F",
    "primary": "#151515",
    "primaryForeground": "#FFFFFF",
    "secondary": "#FFE66D",
    "secondaryForeground": "#151515",
    "accent": "#5B7CFA",
    "accentForeground": "#FFFFFF",
    "accentAlt": "#FF6B6B",
    "accentSoft": "#B8F7D4",
    "accentLavender": "#C8B6FF",
    "border": "#151515",
    "borderStrong": "#000000",
    "ring": "#5B7CFA",
    "success": "#22C55E",
    "warning": "#F59E0B",
    "danger": "#EF4444",
    "info": "#3B82F6"
  }
}
```

## 18.2 Dark Playful Tokens

```json
{
  "theme": "playful-modern-dark",
  "colors": {
    "background": "#121212",
    "foreground": "#FFF8E7",
    "surface": "#1E1E1E",
    "surfaceElevated": "#252525",
    "muted": "#2E2E2E",
    "mutedForeground": "#CFC7B5",
    "primary": "#FFF8E7",
    "primaryForeground": "#151515",
    "secondary": "#FFE66D",
    "secondaryForeground": "#151515",
    "accent": "#7C9CFF",
    "accentForeground": "#111111",
    "accentAlt": "#FF8585",
    "accentSoft": "#8DF0BC",
    "accentLavender": "#D6C7FF",
    "border": "#FFF8E7",
    "borderStrong": "#FFFFFF",
    "ring": "#FFE66D",
    "success": "#4ADE80",
    "warning": "#FACC15",
    "danger": "#F87171",
    "info": "#60A5FA"
  }
}
```

## 18.3 Typography Tokens

```json
{
  "font": {
    "sans": "Plus Jakarta Sans",
    "display": "Space Grotesk",
    "mono": "JetBrains Mono"
  },
  "fontSize": {
    "xs": "0.75rem",
    "sm": "0.875rem",
    "base": "1rem",
    "lg": "1.125rem",
    "xl": "1.25rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    "4xl": "2.5rem",
    "5xl": "3.5rem",
    "6xl": "4.5rem"
  },
  "lineHeight": {
    "tight": "1.05",
    "snug": "1.2",
    "normal": "1.5",
    "relaxed": "1.7"
  },
  "fontWeight": {
    "regular": "400",
    "medium": "500",
    "semibold": "600",
    "bold": "700",
    "black": "800"
  }
}
```

## 18.4 Radius Tokens

```json
{
  "radius": {
    "sm": "0.25rem",
    "md": "0.5rem",
    "lg": "0.875rem",
    "xl": "1.25rem",
    "2xl": "1.5rem",
    "blob": "38% 62% 63% 37% / 41% 44% 56% 59%",
    "full": "9999px"
  }
}
```

## 18.5 Shadow Tokens

```json
{
  "shadow": {
    "sm": "3px 3px 0 #151515",
    "md": "6px 6px 0 #151515",
    "lg": "10px 10px 0 #151515",
    "float": "0 16px 40px rgba(21, 21, 21, 0.14)",
    "none": "none"
  }
}
```

## 18.6 Motion Tokens

```json
{
  "motion": {
    "durationFast": "120ms",
    "durationBase": "220ms",
    "durationSlow": "420ms",
    "easeOut": "cubic-bezier(0.16, 1, 0.3, 1)",
    "easePop": "cubic-bezier(0.34, 1.56, 0.64, 1)",
    "scaleHover": "1.035",
    "rotateHover": "-1deg",
    "translateHover": "-4px"
  }
}
```

---

# 19. Component System

## 19.1 Button

Variants:

- primary.
- secondary.
- ghost.
- outline.
- destructive.
- link.

Professional style:

- Rounded `lg` atau `xl`.
- Border subtle.
- Hover background lembut.
- No playful rotation.

Playful style:

- Border tebal.
- Offset shadow.
- Hover translate.
- Optional rotate kecil.

States:

- default.
- hover.
- active.
- focus.
- disabled.
- loading.

## 19.2 Card

Variants:

- default.
- elevated.
- interactive.
- project.
- blog.
- stat.
- playful sticker.

Professional:

- Clean border.
- White/black surface.
- Subtle shadow.

Playful:

- Strong border.
- Color accents.
- Offset shadow.

## 19.3 Navbar

Requirements:

- Sticky optional.
- Locale switcher.
- Theme mode switcher.
- Resume CTA.
- Mobile navigation.

Professional:

- Minimal top nav.
- Transparent/blur subtle.

Playful:

- Pill nav atau dock nav.
- Bolder active states.

## 19.4 Project Card

Data:

- Title.
- Short description.
- Thumbnail.
- Tech tags.
- Featured label.
- Links.

Interaction:

- Hover preview.
- Click to detail page.
- Accessible link area.

## 19.5 Timeline

Dipakai untuk:

- Experience.
- Education.
- Project process.

Professional:

- Thin line.
- Minimal dots.

Playful:

- Chunkier dots.
- Colorful labels.

## 19.6 Command Palette

Optional developer identity.

Fitur:

- Quick navigation.
- Search projects.
- Search blog.
- Toggle theme.
- Toggle locale.

Performance:

- Load only after user interaction atau lazy import.

## 19.7 Theme Switcher

Theme switcher bukan hanya light/dark, tapi visual mode:

- Professional.
- Playful.

Di dalam masing-masing mode bisa support light/dark jika diinginkan.

State model:

```txt
visualMode: professional | playful
colorScheme: light | dark | system
```

## 19.8 Rich Text Renderer

Untuk render content Tiptap.

Features:

- Typography prose.
- Code block.
- Image.
- Callout.
- Table optional.
- Anchor headings.

Rule:

- Rendering public harus server-side/static HTML jika memungkinkan.
- Jangan mount editor di public content page.

---

# 20. Database Overview

## 20.1 Core Tables

### profiles

```txt
id
full_name
headline_id
headline_en
bio_id
bio_en
avatar_url
email
location
github_url
linkedin_url
resume_url_id
resume_url_en
created_at
updated_at
```

### projects

```txt
id
title_id
title_en
slug
excerpt_id
excerpt_en
content_json_id
content_json_en
content_html_id
content_html_en
cover_image_url
status
featured
project_type
complexity
started_at
completed_at
live_url
repository_url
seo_title_id
seo_title_en
seo_description_id
seo_description_en
published_at
created_at
updated_at
```

### project_images

```txt
id
project_id
image_url
alt_id
alt_en
caption_id
caption_en
sort_order
created_at
```

### technologies

```txt
id
name
slug
icon_url
category
color
created_at
```

### project_technologies

```txt
id
project_id
technology_id
```

### skills

```txt
id
name
slug
category
level
icon_url
description_id
description_en
featured
sort_order
created_at
updated_at
```

### experiences

```txt
id
company
role_id
role_en
employment_type
location
start_date
end_date
description_id
description_en
logo_url
sort_order
created_at
updated_at
```

### experience_technologies

```txt
id
experience_id
technology_id
```

### posts

```txt
id
title_id
title_en
slug
excerpt_id
excerpt_en
content_json_id
content_json_en
content_html_id
content_html_en
cover_image_url
category_id
status
reading_time
seo_title_id
seo_title_en
seo_description_id
seo_description_en
published_at
created_at
updated_at
```

### case_studies

```txt
id
title_id
title_en
slug
excerpt_id
excerpt_en
content_json_id
content_json_en
content_html_id
content_html_en
cover_image_url
client_or_context
role
status
featured
seo_title_id
seo_title_en
seo_description_id
seo_description_en
published_at
created_at
updated_at
```

### playground_items

```txt
id
title
description
slug
component_key
thumbnail_url
category
status
complexity
created_at
updated_at
```

### contact_messages

```txt
id
name
email
subject
purpose
message
read_at
created_at
```

### guestbook_entries

```txt
id
name
message
website_url
status
approved_at
created_at
```

### analytics_events

```txt
id
event_name
path
metadata
session_id
created_at
```

---

# 21. Suggested Tech Stack

## 21.1 Core

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Framer Motion.
- Supabase PostgreSQL.
- Supabase Auth.
- Supabase Storage.
- Drizzle ORM.
- TanStack Query.
- Tiptap.

## 21.2 Recommended Additions

- next-intl untuk i18n.
- next-safe-action atau server actions pattern untuk mutation.
- Zod untuk validation.
- React Hook Form untuk admin forms.
- nuqs untuk URL state filter/search.
- next-sitemap atau custom sitemap generator.
- Plausible/Umami atau internal analytics ringan.
- Sonner untuk toast.
- Resend untuk email notification dari contact form.

---

# 22. Folder Architecture

```txt
src/
├─ app/
│  ├─ [locale]/
│  │  ├─ (site)/
│  │  │  ├─ page.tsx
│  │  │  ├─ about/page.tsx
│  │  │  ├─ skills/page.tsx
│  │  │  ├─ experience/page.tsx
│  │  │  ├─ projects/page.tsx
│  │  │  ├─ projects/[slug]/page.tsx
│  │  │  ├─ case-studies/page.tsx
│  │  │  ├─ case-studies/[slug]/page.tsx
│  │  │  ├─ blog/page.tsx
│  │  │  ├─ blog/[slug]/page.tsx
│  │  │  ├─ playground/page.tsx
│  │  │  ├─ playground/[slug]/page.tsx
│  │  │  ├─ tech-stack/page.tsx
│  │  │  ├─ coding-stats/page.tsx
│  │  │  ├─ contact/page.tsx
│  │  │  ├─ resume/page.tsx
│  │  │  └─ guestbook/page.tsx
│  │  └─ layout.tsx
│  │
│  ├─ admin/
│  │  ├─ page.tsx
│  │  ├─ projects/
│  │  ├─ blog/
│  │  ├─ case-studies/
│  │  ├─ skills/
│  │  ├─ experience/
│  │  ├─ playground/
│  │  ├─ guestbook/
│  │  ├─ messages/
│  │  ├─ analytics/
│  │  └─ settings/
│  │
│  ├─ api/
│  ├─ sitemap.ts
│  ├─ robots.ts
│  └─ layout.tsx
│
├─ components/
│  ├─ ui/
│  ├─ layout/
│  ├─ shared/
│  ├─ marketing/
│  └─ rich-text/
│
├─ features/
│  ├─ projects/
│  ├─ blog/
│  ├─ case-studies/
│  ├─ skills/
│  ├─ experience/
│  ├─ playground/
│  ├─ guestbook/
│  ├─ contact/
│  └─ analytics/
│
├─ lib/
│  ├─ supabase/
│  ├─ db/
│  ├─ validations/
│  ├─ auth/
│  ├─ seo/
│  ├─ i18n/
│  ├─ analytics/
│  └─ utils/
│
├─ styles/
│  ├─ globals.css
│  ├─ tokens.css
│  └─ themes.css
│
├─ config/
│  ├─ site.ts
│  ├─ navigation.ts
│  └─ theme.ts
│
└─ server/
   ├─ queries/
   ├─ mutations/
   └─ actions/
```

---

# 23. UX Rules Per Mode

## 23.1 Professional Mode

Navigation:

- Clear top navigation.
- Resume CTA visible.
- Minimal mode switcher.

Home layout:

- Hero left aligned.
- Project preview in clean grid.
- Stats as subtle cards.
- Blog preview editorial.

Motion:

- Fade/slide subtle.
- No playful cursor.
- No intense hover.

Copywriting:

- Direct.
- Professional.
- Confident.

## 23.2 Playful Mode

Navigation:

- More expressive nav.
- Playground visible.
- Theme switcher more prominent.

Home layout:

- Bento grid.
- Playful cards.
- Larger visual accents.
- More interactive sections.

Motion:

- Hover scale.
- Drag/tilt for selected cards.
- Micro-interactions.
- Respect reduced motion.

Copywriting:

- Friendly.
- More casual.
- Still credible.

---

# 24. Content Strategy

## 24.1 Hero Copy Direction

Professional:

```txt
Frontend Engineer focused on building polished, performant, and accessible web interfaces.
```

Playful:

```txt
I build web interfaces that feel fast, friendly, and a little too satisfying to click.
```

## 24.2 Project Writing Template

```txt
Title
Short Summary
Problem
Goal
My Role
Tech Stack
Key Features
Architecture
Challenges
Result
What I Learned
```

## 24.3 Blog Writing Topics

- Next.js performance notes.
- UI component architecture.
- Tailwind design token setup.
- Building admin CMS with Supabase.
- Tiptap editor implementation.
- Accessibility notes.
- Frontend debugging stories.

---

# 25. Security Requirements

- Supabase RLS enabled.
- Admin-only mutation.
- Validate all form input with Zod.
- Sanitize rich text output.
- Rate limit contact and guestbook forms.
- Protect admin routes with middleware.
- Use environment variables properly.
- Never expose service role key to client.
- Validate uploaded file type and size.
- Use signed URLs for private files if needed.

---

# 26. Acceptance Criteria

## 26.1 Public Website

- User can access all public pages without login.
- Website supports ID and EN.
- Website has professional and playful mode.
- Playground only appears in playful mode.
- Project detail pages are indexable.
- Blog pages are indexable.
- Resume can be downloaded.
- Contact form works.
- Guestbook supports moderation.

## 26.2 Admin

- Admin can login.
- Admin can create/edit/delete projects.
- Admin can create drafts.
- Admin can publish/unpublish content.
- Admin can upload images.
- Admin can edit rich text content.
- Admin can view messages.
- Admin can approve/reject guestbook entries.
- Admin can view analytics summary.

## 26.3 Performance

- Public pages do not load admin/editor bundle.
- Tiptap only loads in admin editor pages.
- Playground heavy components are lazy loaded.
- Images use optimization.
- Metadata exists for each content page.
- Sitemap and robots exist.

---

# 27. MVP Scope

## Phase 1: Core Portfolio

- Home.
- About.
- Projects.
- Project detail.
- Skills.
- Experience.
- Contact.
- Resume.
- Professional mode.
- Basic admin CRUD.

## Phase 2: Content & SEO

- Blog.
- Case studies.
- SEO metadata.
- Sitemap.
- OG image.
- ID + EN content.
- Rich text editor.

## Phase 3: Playful Mode

- Playful visual mode.
- Playground.
- Heavy interactions scoped.
- Guestbook.
- Coding stats.

## Phase 4: Polish

- Analytics.
- Advanced filtering.
- Command palette.
- Motion refinements.
- Performance audit.
- Accessibility audit.

---

# 28. Implementation Notes

## 28.1 Recommended Starting Point

Mulai dari Professional Mode dulu. Alasannya:

- Lebih cepat stabil.
- Lebih aman untuk recruiter.
- Lebih mudah bikin content structure.
- Setelah fondasi kuat, playful mode bisa dibangun di atas token dan component yang sama.

## 28.2 Theme Implementation

Gunakan CSS variables:

```css
:root[data-visual-mode="professional"] {
  --background: #FAFAFA;
  --foreground: #0A0A0A;
}

:root[data-visual-mode="playful"] {
  --background: #FFF8E7;
  --foreground: #151515;
}
```

Lalu mapping ke Tailwind/shadcn tokens.

## 28.3 Content Rendering

- Simpan Tiptap JSON sebagai source of truth.
- Simpan HTML hasil render untuk public page.
- Public page render HTML/prose tanpa mount editor.
- Gunakan sanitization.

## 28.4 Data Fetching

- Public query dilakukan di server.
- Admin query bisa pakai TanStack Query untuk UX CRUD.
- Mutation pakai server actions atau API route dengan validation.
- Cache public content.
- Revalidate saat publish/update.

---

# 29. Risks & Mitigation

## Risk: Website terlalu berat karena dua mode

Mitigation:

- Shared token system.
- Jangan duplicate component logic.
- Lazy load playful-only components.
- Conditional rendering dengan hati-hati.

## Risk: Admin CMS terlalu kompleks

Mitigation:

- Mulai dari CRUD sederhana.
- Tiptap basic dulu.
- Analytics basic dulu.

## Risk: Playful mode mengurangi profesionalitas

Mitigation:

- Professional mode sebagai default.
- Playful mode sebagai alternate personality.
- Playground hanya di playful mode.

## Risk: SEO terganggu karena konten dinamis

Mitigation:

- SSR/SSG public pages.
- Metadata dinamis.
- HTML rich text pre-rendered.
- Sitemap otomatis.

---

# 30. Final Recommendation

Bangun portfolio ini seperti produk serius dengan dua lapisan identitas:

1. **Professional Mode** sebagai default untuk recruiter, founder, dan client.
2. **Playful Mode** sebagai bukti kreativitas, frontend craft, dan interaktivitas.

Prioritas awal adalah struktur konten, performa, SEO, dan admin CMS. Visual playful bisa dibuat setelah fondasi public website dan data model stabil. Dengan cara ini, website tetap ringan, scalable, dan tidak berubah menjadi taman hiburan JavaScript yang membuat laptop pengunjung minta pensiun.

