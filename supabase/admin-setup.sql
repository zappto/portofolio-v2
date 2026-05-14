-- Run this after creating the admin user in Supabase Auth.
-- Replace the email with the admin email used for login.

insert into public.admin_users (user_id, email)
select id, email
from auth.users
where lower(email) = lower('admin@example.com')
on conflict (email) do update
set user_id = excluded.user_id,
    revoked_at = null;

-- Alternative bootstrap:
-- Set app_metadata.role = "admin" for the user in Supabase Auth.
-- The RLS helper public.is_admin() accepts either app_metadata.role = admin
-- or an active row in public.admin_users.
