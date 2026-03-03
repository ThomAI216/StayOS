-- ==============================================================================
-- STAYOS — DEMO SEED DATA
-- ==============================================================================

-- Create a helper function to seed demo data for a specific user
create or replace function public.seed_stayos_demo_data(p_host_id uuid) returns void as $$
declare
  v_property_id uuid := 'p0000000-0000-0000-0000-000000000001';
begin

  -- ----------------------------------------------------------------------------
  -- 1. Property: Alpine Retreat
  -- ----------------------------------------------------------------------------
  insert into public.properties (
    id, host_id, name, slug, address, lat, lng,
    wifi_network, wifi_password, check_in_time, check_out_time,
    entry_instructions, parking_info, house_rules
  ) values (
    v_property_id, p_host_id, 'Alpine Retreat', 'alpine-retreat', '123 Rue du Mont Blanc, Chamonix', 45.9237, 6.8694,
    'Alpine_Guest_5G', 'mountainsarecalling', '15:00', '10:00',
    'Keybox code is 4921. It is located on the wooden beam left of the front door.',
    'Spot #4 in the underground garage.',
    'No parties, quiet hours after 10 PM. No outdoor shoes inside.'
  ) on conflict (id) do nothing;

  -- ----------------------------------------------------------------------------
  -- 2. Places (Region Pack)
  -- ----------------------------------------------------------------------------
  insert into public.places (property_id, category, title, description, distance_text, emoji, lat, lng, status) values
    (v_property_id, 'food', 'Bakery du Village', 'Great morning bakery. Best croissants in town.', '5 min walk', '🥐', 45.924, 6.870, 'approve'),
    (v_property_id, 'food', 'Le Caveau', 'Best fondue in town, reservations required.', '10 min walk', '🧀', 45.922, 6.868, 'pin'),
    (v_property_id, 'food', 'Chamonix Center Café', 'Best espresso to kickstart the day.', '8 min walk', '☕', 45.925, 6.871, 'approve'),
    (v_property_id, 'ski', 'Alpine Rentals', 'Partner shop, 10% off with code ALPINE10.', '15 min walk', '🎿', 45.920, 6.865, 'approve'),
    (v_property_id, 'nature', 'Lac Blanc Trail', 'Scenic short hike perfect for early hours.', 'In the Valley', '🥾', 45.95, 6.89, 'approve'),
    (v_property_id, 'nature', 'River Walk', 'Easy flat walk along the Arve river.', '3 min walk', '🌲', 45.923, 6.867, 'pin'),
    (v_property_id, 'essentials', 'Super U Mini', 'Local grocery store for everyday needs.', '5 min walk', '🛒', 45.924, 6.869, 'approve'),
    (v_property_id, 'health', 'Mont Blanc Pharmacy', 'English-speaking staff.', '8 min walk', '⚕️', 45.925, 6.870, 'approve');

  -- ----------------------------------------------------------------------------
  -- 3. Upsells
  -- ----------------------------------------------------------------------------
  insert into public.upsells (property_id, title, description, price_text, icon) values
    (v_property_id, 'Late Checkout', 'Stay until 2 PM. Subject to availability.', '€50', 'Clock'),
    (v_property_id, 'Airport Transfer', 'Private luxury van to/from GVA.', '€180', 'Plane'),
    (v_property_id, 'Private Chef', '3-course local dinner cooked in your kitchen.', 'From €120/pp', 'ChefHat'),
    (v_property_id, 'In-house Massage', '60min deep tissue or relaxation.', '€100', 'Sparkles'),
    (v_property_id, 'Ski Rental Delivery', 'Premium gear fitted in your living room.', 'Partner Rates', 'Anchor');

  -- ----------------------------------------------------------------------------
  -- 4. Tickets (Mock Data)
  -- ----------------------------------------------------------------------------
  insert into public.tickets (property_id, guest_name, issue_type, description, status, eta_message, updated_at) values
    (v_property_id, 'Guest', 'towels', 'Need more towels', 'in_progress', 'ETA: 30 mins', now() - interval '1 hour'),
    (v_property_id, 'Guest', 'internet', 'Wi-Fi password not working', 'resolved', 'Done', now() - interval '1 day');

end;
$$ language plpgsql security definer;

-- Trigger to run this when a new user signs up:
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  
  -- Automatically seed data for this new host
  perform public.seed_stayos_demo_data(new.id);
  
  return new;
end;
$$ language plpgsql security definer;
