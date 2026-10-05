-- Run once in the project's SQL Editor. Safe to rerun; does not erase records.
begin;
create table if not exists public.factory_workspace (
 id text primary key check (id='demo'),
 payload jsonb not null,
 version bigint not null default 0 check (version>=0),
 updated_at timestamptz not null default now()
);
create table if not exists public.factory_sessions (
 token_hash text primary key check (length(token_hash)=64),
 department text not null check (department in ('admin','receiving','warehouse','planning','production','qc','laboratory','dispatch','management')),
 expires_at timestamptz not null,
 created_at timestamptz not null default now()
);
create index if not exists factory_sessions_expiry_idx on public.factory_sessions(expires_at);
alter table public.factory_workspace enable row level security;
alter table public.factory_sessions enable row level security;
-- No browser role can read or write these tables. Only the role-checking Edge Function can.
revoke all on public.factory_workspace,public.factory_sessions from public,anon,authenticated;
grant select,insert,update,delete on public.factory_workspace,public.factory_sessions to service_role;
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('factory-attachments','factory-attachments',false,8388608,array['application/pdf','image/jpeg','image/png'])
on conflict (id) do nothing;
commit;
-- Verify: both rows should show true.
select tablename,rowsecurity from pg_tables where schemaname='public' and tablename in ('factory_workspace','factory_sessions');
