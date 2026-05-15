import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { Link } from "@/i18n/navigation";
import { getLatestPosts, normalizeLocale } from "@/lib/portfolio/content";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const posts = await getLatestPosts(locale);
  const copy = {
    id: {
      title: "Blog",
      description:
        "Preview tulisan terbaru. Search, kategori, dan article detail lengkap masuk milestone Blog & Case Study.",
      read: "Baca preview",
    },
    en: {
      title: "Blog",
      description:
        "A preview of latest writing. Search, categories, and full article detail belong to the Blog & Case Study milestone.",
      read: "Read preview",
    },
  }[locale];

  return (
    <>
      <PageHeader title={copy.title} description={copy.description} />
      <Container className="section-y">
        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.title} href="/blog" className="portfolio-card block p-5">
              <Badge variant="outline">{post.category}</Badge>
              <h2 className="mt-5 text-2xl">{post.title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{post.excerpt}</p>
              <p className="mt-6 text-sm font-medium">
                {copy.read} / {post.readTime}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
