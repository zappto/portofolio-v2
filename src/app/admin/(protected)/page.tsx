export default function AdminPage() {
  return (
    <section className="max-w-2xl rounded-lg border border-border bg-background p-6">
      <p className="text-sm font-medium uppercase text-muted-foreground">
        Admin CMS
      </p>
      <h1 className="mt-3 text-3xl font-semibold">Admin foundation</h1>
      <p className="mt-4 leading-7 text-muted-foreground">
        Supabase Auth, admin authorization, dan route protection dasar sudah
        tersedia. CRUD content tetap masuk milestone admin berikutnya.
      </p>
    </section>
  );
}
