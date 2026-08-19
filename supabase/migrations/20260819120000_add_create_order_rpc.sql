-- =============================================================================
-- NFO / MomentAI — Add create_order() RPC (replacement write path)
-- Migration: 20260819120000_add_create_order_rpc.sql
--
-- Context:
--   20260609120000_revoke_client_writes_entitlement_tables.sql correctly
--   revoked client INSERT on orders/order_items but shipped no replacement
--   write path, leaving Checkout.tsx calling a dead insert that RLS now
--   rejects. This migration adds a SECURITY DEFINER RPC that is the only
--   supported way for an authenticated client to create an order.
--
-- Pricing note (flagged for follow-up):
--   Order totals are computed server-side from a hardcoded price table that
--   mirrors src/lib/mock-data.ts (mockGifts + variant priceDelta values).
--   This is intentional scaffolding until a real gift catalog table exists
--   in Postgres — the RPC is what must change when that catalog lands, not
--   the client.
-- =============================================================================

-- ── Hardcoded catalog price lookup (mirrors src/lib/mock-data.ts) ─────────────
-- STOPGAP: replace with a real `gift_catalog` table lookup once one exists.
create or replace function public._nfo_gift_price_cents(p_gift_id text, p_variant text)
returns int
language plpgsql
immutable
as $$
declare
  v_base_cents int;
  v_delta_cents int := 0;
begin
  v_base_cents := case p_gift_id
    when 'g1'  then 2500   -- Starbucks Gift Card
    when 'g2'  then 6500   -- Premium Rose Bouquet
    when 'g3'  then 3000   -- DoorDash Credit
    when 'g4'  then 8800   -- Mira's Dried Tulip Arrangement
    when 'g5'  then 12000  -- Hiro Tea Cup Pair
    when 'g6'  then 3600   -- Trade Coffee 3-Bag Sampler
    when 'g7'  then 6800   -- Sara's Patisserie Box
    when 'g8'  then 9500   -- Diego's Mezcal
    when 'g9'  then 22000  -- City Spa Day
    when 'g10' then 14500  -- Noah's Walnut Board
    when 'g11' then 4200   -- Lena's Letterpress Cards
    when 'g12' then 7000   -- Headspace · One Year
    else null
  end;

  if v_base_cents is null then
    return null;
  end if;

  v_delta_cents := case
    when p_gift_id = 'g1' and p_variant = '$15'  then -1000
    when p_gift_id = 'g1' and p_variant = '$50'  then 2500
    when p_gift_id = 'g1' and p_variant = '$100' then 7500
    when p_gift_id = 'g2' and p_variant = 'Two dozen'   then 4500
    when p_gift_id = 'g2' and p_variant = 'Three dozen' then 9000
    when p_gift_id = 'g3' and p_variant = '$50' then 2000
    when p_gift_id = 'g3' and p_variant = '$75' then 4500
    else 0
  end;

  return v_base_cents + v_delta_cents;
end;
$$;

-- ── create_order RPC ───────────────────────────────────────────────────────────
create or replace function public.create_order(
  recipient_contact_id uuid,
  channel text,
  items jsonb
)
returns public.orders
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id     uuid := auth.uid();
  v_order       public.orders;
  v_item        jsonb;
  v_gift_id     text;
  v_qty         int;
  v_label       text;
  v_variant     text;
  v_price_cents int;
  v_total_cents int := 0;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if items is null or jsonb_typeof(items) <> 'array' or jsonb_array_length(items) = 0 then
    raise exception 'At least one item is required';
  end if;

  if recipient_contact_id is not null and not exists (
    select 1 from public.contacts c
    where c.id = recipient_contact_id and c.user_id = v_user_id
  ) then
    raise exception 'Invalid recipient';
  end if;

  insert into public.orders (user_id, status, recipient_contact_id, channel, total_cents)
  values (v_user_id, 'placed', recipient_contact_id, channel, 0)
  returning * into v_order;

  for v_item in select * from jsonb_array_elements(items)
  loop
    v_gift_id := v_item->>'giftId';
    v_qty     := greatest(1, coalesce((v_item->>'qty')::int, 1));
    v_variant := v_item->>'variant';
    v_label   := coalesce(v_item->>'name', v_gift_id);

    v_price_cents := public._nfo_gift_price_cents(v_gift_id, v_variant);
    if v_price_cents is null then
      raise exception 'Unknown gift: %', v_gift_id;
    end if;

    insert into public.order_items (order_id, label, qty, price_cents)
    values (v_order.id, v_label, v_qty, v_price_cents);

    v_total_cents := v_total_cents + v_price_cents * v_qty;
  end loop;

  update public.orders set total_cents = v_total_cents
  where id = v_order.id
  returning * into v_order;

  return v_order;
end;
$$;

-- Client may only call the RPC, never the raw catalog helper.
revoke all on function public._nfo_gift_price_cents(text, text) from public, anon, authenticated;

revoke all on function public.create_order(uuid, text, jsonb) from public, anon;
grant execute on function public.create_order(uuid, text, jsonb) to authenticated;
