-- Tech Academy · esquema de usuarios
-- Ejecuta este archivo completo en Supabase → SQL Editor.

create type public.user_role as enum ('student', 'admin');

create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  country     text,
  level       text check (level in ('principiante', 'intermedio', 'avanzado')),
  goal        text check (goal in ('primer-empleo', 'cambio-carrera', 'freelance', 'proyecto-propio', 'curiosidad')),
  interest    text check (interest in ('web', 'datos-ia', 'movil', 'ciberseguridad', 'explorar')),
  role        public.user_role not null default 'student',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Función auxiliar para saber si quien consulta es admin (evita recursión en RLS).
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;

create policy "Cada usuario ve su perfil"
  on public.profiles for select
  to authenticated
  using (id = (select auth.uid()));

create policy "Los admins ven todos los perfiles"
  on public.profiles for select
  to authenticated
  using (public.is_admin());

create policy "Cada usuario edita su perfil"
  on public.profiles for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Un estudiante solo puede cambiar estos campos; el rol nunca.
revoke update on public.profiles from authenticated;
grant update (full_name, country, level, goal, interest) on public.profiles to authenticated;

-- Crea el perfil automáticamente al registrarse (email, Google o GitHub).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
begin
  insert into public.profiles (id, full_name, country, level, goal, interest)
  values (
    new.id,
    nullif(coalesce(meta ->> 'full_name', meta ->> 'name'), ''),
    nullif(meta ->> 'country', ''),
    nullif(meta ->> 'level', ''),
    nullif(meta ->> 'goal', ''),
    nullif(meta ->> 'interest', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Para convertirte en admin (ejecútalo una vez con tu correo):
-- update public.profiles set role = 'admin'
--   where id = (select id from auth.users where email = 'tu-correo@ejemplo.com');
