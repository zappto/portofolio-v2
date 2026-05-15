import { Mail, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { getProfile, normalizeLocale } from "@/lib/portfolio/content";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const profile = await getProfile(locale);
  const copy = {
    id: {
      title: "Contact",
      description:
        "Kirim pesan untuk peluang kerja, proyek freelance, kolaborasi, atau pertanyaan umum.",
      info: "Contact info",
      email: "Email langsung",
      social: "Social links",
      status: "Availability",
      form: "Contact form",
      name: "Nama",
      subject: "Subject",
      message: "Pesan",
      purpose: "Purpose",
      send: "Kirim pesan",
      note: "Form ini masih UI placeholder. Integrasi submit masuk milestone contact berikutnya.",
      options: ["Job opportunity", "Freelance project", "Collaboration", "General message"],
    },
    en: {
      title: "Contact",
      description:
        "Send a message for job opportunities, freelance projects, collaboration, or general questions.",
      info: "Contact info",
      email: "Direct email",
      social: "Social links",
      status: "Availability",
      form: "Contact form",
      name: "Name",
      subject: "Subject",
      message: "Message",
      purpose: "Purpose",
      send: "Send message",
      note: "This form is still a UI placeholder. Submit integration belongs to the next contact milestone.",
      options: ["Job opportunity", "Freelance project", "Collaboration", "General message"],
    },
  }[locale];

  return (
    <>
      <PageHeader title={copy.title} description={copy.description} />
      <Container className="section-y grid gap-8 lg:grid-cols-[0.42fr_1fr]">
        <aside className="space-y-4">
          <div className="portfolio-card p-5">
            <p className="text-ui-label text-muted-foreground">{copy.info}</p>
            <h2 className="mt-3 text-2xl">{profile.name}</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{profile.summary}</p>
          </div>
          <div className="portfolio-card p-5">
            <Mail className="size-5 text-muted-foreground" aria-hidden="true" />
            <p className="mt-4 text-ui-label text-muted-foreground">{copy.email}</p>
            <a className="mt-2 block font-medium underline-offset-4 hover:underline" href="mailto:hello@example.com">
              hello@example.com
            </a>
          </div>
          <div className="portfolio-card p-5">
            <p className="text-ui-label text-muted-foreground">{copy.social}</p>
            <div className="mt-4 grid gap-2 text-sm font-medium">
              <a className="underline-offset-4 hover:underline" href="https://github.com" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="underline-offset-4 hover:underline" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="portfolio-card p-5">
            <p className="text-ui-label text-muted-foreground">{copy.status}</p>
            <Badge className="mt-4" variant="secondary">{profile.availability}</Badge>
          </div>
        </aside>

        <form className="portfolio-card space-y-5 p-6">
          <div>
            <p className="text-ui-label text-muted-foreground">{copy.form}</p>
            <h2 className="mt-2 text-3xl">{copy.send}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={copy.name}>
              <Input name="name" autoComplete="name" />
            </Field>
            <Field label="Email">
              <Input name="email" type="email" autoComplete="email" />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={copy.subject}>
              <Input name="subject" autoComplete="off" />
            </Field>
            <Field label={copy.purpose}>
              <select
                name="purpose"
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {copy.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label={copy.message}>
            <Textarea name="message" className="min-h-36" />
          </Field>
          <p className="rounded-lg border border-border bg-muted/35 p-3 text-sm text-muted-foreground">
            {copy.note}
          </p>
          <Button type="button">
            {copy.send}
            <Send aria-hidden="true" />
          </Button>
        </form>
      </Container>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
