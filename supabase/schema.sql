-- ==============================================================================
-- STAYOS — MVP SCHEMA
-- ==============================================================================

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES (Extends auth.users for Hosts)
-- ------------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamp with time zone default now() not null
);

-- RLS
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Auto-create profile on signup trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ------------------------------------------------------------------------------
-- 2. PROPERTIES (Managed by Hosts)
-- ------------------------------------------------------------------------------
create table public.properties (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  slug text not null unique, -- e.g., 'alpine-retreat'
  address text not null,
  lat numeric,
  lng numeric,
  
  -- Essentials
  wifi_network text,
  wifi_password text,
  check_in_time text,
  check_out_time text,
  entry_instructions text,
  parking_info text,
  house_rules text,
  
  created_at timestamp with time zone default now() not null
);

-- RLS
alter table public.properties enable row level security;

-- Hosts can manage their own properties
create policy "Hosts can manage their properties"
  on public.properties for all
  using ( auth.uid() = host_id );

-- Anyone can view a property by slug (for the guest app)
create policy "Anyone can view properties"
  on public.properties for select
  using ( true );


-- ------------------------------------------------------------------------------
-- 3. PLACES (Region Pack)
-- ------------------------------------------------------------------------------
create type place_status as enum ('draft', 'approve', 'hide', 'pin');

create table public.places (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  category text not null, -- 'food', 'ski', 'nature', 'essentials'
  title text not null,
  description text,
  distance_text text,
  emoji text,
  lat numeric,
  lng numeric,
  google_place_id text,
  status place_status default 'draft' not null,
  created_at timestamp with time zone default now() not null
);

-- RLS
alter table public.places enable row level security;

create policy "Hosts can manage places for their properties"
  on public.places for all
  using ( auth.uid() in (select host_id from public.properties where id = property_id) );

create policy "Anyone can view approved/pinned places"
  on public.places for select
  using ( status in ('approve', 'pin') );


-- ------------------------------------------------------------------------------
-- 4. SUPPORT TICKETS
-- ------------------------------------------------------------------------------
create type ticket_status as enum ('open', 'in_progress', 'resolved');

create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  guest_name text,
  issue_type text not null, -- 'towels', 'cleaning', 'heating', 'other'
  description text,
  status ticket_status default 'open' not null,
  eta_message text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- RLS
alter table public.tickets enable row level security;

create policy "Hosts can manage tickets for their properties"
  on public.tickets for all
  using ( auth.uid() in (select host_id from public.properties where id = property_id) );

-- NOTE: Guests create tickets anonymously. In a real app we might use an anonymous token
-- For MVP, we allow insert access for anyone (or simple secret).
create policy "Anyone can create tickets"
  on public.tickets for insert
  with check ( true );

-- For MVP, allow viewing tickets. In prod, lock this to session ID.
create policy "Anyone can view tickets"
  on public.tickets for select
  using ( true );


-- ------------------------------------------------------------------------------
-- 5. UPSELLS (Catalog)
-- ------------------------------------------------------------------------------
create table public.upsells (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  title text not null,
  description text,
  price_text text not null,
  icon text,
  is_active boolean default true not null,
  created_at timestamp with time zone default now() not null
);

-- RLS
alter table public.upsells enable row level security;

create policy "Hosts can manage upsells for their properties"
  on public.upsells for all
  using ( auth.uid() in (select host_id from public.properties where id = property_id) );

create policy "Anyone can view active upsells"
  on public.upsells for select
  using ( is_active = true );


-- ------------------------------------------------------------------------------
-- 6. UPSELL REQUESTS
-- ------------------------------------------------------------------------------
create type upsell_request_status as enum ('pending', 'approved', 'paid', 'declined');

create table public.upsell_requests (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  upsell_id uuid not null references public.upsells(id) on delete cascade,
  guest_name text,
  status upsell_request_status default 'pending' not null,
  created_at timestamp with time zone default now() not null
);

-- RLS
alter table public.upsell_requests enable row level security;

create policy "Hosts can manage upsell requests"
  on public.upsell_requests for all
  using ( auth.uid() in (select host_id from public.properties where id = property_id) );

create policy "Anyone can create upsell requests"
  on public.upsell_requests for insert
  with check ( true );

-- Function to auto-update updated_at columns
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_tickets_updated_at
    before update on public.tickets
    for each row
    execute procedure public.update_updated_at_column();
