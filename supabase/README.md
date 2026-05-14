# Supabase Setup

Milestone 2 expects an existing Supabase project with:

- Email/password auth enabled.
- `DATABASE_URL` set to the pooled Postgres connection string.
- `NEXT_PUBLIC_SUPABASE_URL` set to the project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` set to the public anon key.
- One admin Auth user.

After the admin Auth user exists, run `supabase/admin-setup.sql` in the SQL editor with the real admin email.

The Drizzle migrations create:

- Portfolio content tables from `erd.md`.
- Initial guestbook statuses.
- RLS policies.
- Storage buckets for `avatars`, `projects`, `blogs`, `case-studies`, `playground`, `resumes`, and `general`.
