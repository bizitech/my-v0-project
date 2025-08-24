create extension if not exists "pgcrypto";

-- Update salons table to include status column if it doesn't exist
alter table public.salons 
add column if not exists status text not null default 'pending' 
check (status in ('pending','approved','rejected'));

-- Enable RLS on salons table
alter table public.salons enable row level security;

-- Drop existing policies if they exist
drop policy if exists "public read approved salons" on public.salons;
drop policy if exists "allow insert from anyone" on public.salons;

-- Public can read only approved salons
create policy "public read approved salons"
on public.salons for select
to anon, authenticated
using (status = 'approved');

-- Allow inserts (simple start — tighten later)
create policy "allow insert from anyone"
on public.salons for insert
to anon, authenticated
with check (true);

-- Update existing salons to approved status if they don't have a status
update public.salons set status = 'approved' where status is null;
