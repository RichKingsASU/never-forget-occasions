
# Plan — complete the frontend journey (no backend)

Build every page a user would touch from landing → order confirmed, plus the detail/edit screens behind the existing nav. All state is client-side (React + a tiny `CartContext`). No Supabase, no Stripe — buttons resolve to mocked success states with toasts.

## 1. Mock data layer (extend `src/lib/mock-data.ts`)

Add typed mocks + helpers so every page reads from one source:

- `mockGifts` (12 items) — id, name, slug, category, price, images[], provider, rating, reviewCount, deliveryTime, occasions[], description, longDescription, variants (size/color/denomination), inStock, badges (popular/eco/new).
- `mockOrders` (5 items) — id, date, status (placed/preparing/shipped/delivered), items[], recipient, total, tracking#.
- `mockNotifications` (8 items) — id, type, title, body, time, read.
- `mockReviews` for each gift (3 each).
- Helpers: `findGift(slug)`, `findContact(id)`, `formatCurrency`, `estimateDelivery`.

## 2. Cart + shared providers

- `src/context/CartContext.tsx` — `{items, add, remove, update, clear, subtotal, count}` persisted to `localStorage`.
- `src/context/OrdersContext.tsx` — append-only mock order log (in-memory + localStorage).
- Mount both providers in `App.tsx` above the router.
- Add a cart badge button to the Navigation sidebar footer + top bars.

## 3. Gift marketplace upgrade (`/gifts`)

Rebuild current `GiftCatalog.tsx` to:

- Pull from `mockGifts`.
- Sticky filter rail: category, occasion, price range slider, rating, delivery speed.
- Sort dropdown (Popular / Newest / Price ↑↓ / Rating).
- Grid → click card routes to `/gifts/:slug`.
- "Quick add" button on each card opens a side `Sheet` cart preview.
- Empty/loading/no-results states.

## 4. Gift detail (`/gifts/:slug`) — new

- Hero: image gallery (thumbnails + main), badges, rating, share button.
- Right column: price, variant selector (size/denomination), quantity stepper, "Add to cart" + "Buy now", delivery estimate, gift-message textarea, schedule-send date picker.
- Tabs: Description · Reviews · Shipping & returns · About the creator (links `/creators/:id`).
- "You might also like" carousel.
- Sticky mobile bottom bar with price + Add.

## 5. Cart (`/cart`) — new

- Line items with thumbnail, qty stepper, remove, "save for later".
- Promo code input (mock validates `NFO10` → 10% off).
- Sidebar: subtotal, est. shipping, est. tax, total, "Checkout" CTA.
- Trust strip (secure checkout, easy returns).
- Empty cart state with CTA back to `/gifts`.

## 6. Checkout (`/checkout`) — new, 4 steps

Single page, stepper at top, each step its own component under `src/components/checkout/`:

1. **Recipient & delivery** — pick from contacts or enter new; address form; delivery window radio cards (Standard / Express / Same-day).
2. **Greeting** — attach an AI greeting (opens `GreetingGenerator` inline) or skip; pick template; schedule send date/time.
3. **Payment** — mock card form (Stripe-style fields, formatted card #, expiry, CVC, billing zip); saved-cards radio; "Pay with Apple Pay" mock button.
4. **Review** — summary of all three, edit links per step, T&Cs checkbox, "Place order" → push to OrdersContext, navigate `/orders/:id?new=1`.

Order-summary card pinned right on `lg+`.

## 7. Order confirmation + history

- `/orders/:id` — confetti animation on `?new=1`, status timeline (Placed → Preparing → Shipped → Delivered), recipient + greeting preview, tracking #, "View all orders" + "Send another".
- `/orders` — list of past orders with filters (status, date), click → detail.

## 8. Contact detail (`/contacts/:id`) — new

- Header with avatar, relationship, edit/delete.
- Tabs: Occasions (list + Add occasion dialog), Gift history (orders sent), Greetings drafted, Notes.
- "Add occasion" dialog with name + date + recurrence + channel + optional gift suggestion.

## 9. Occasion flow

- `/occasions/new` — full-page form (recipient → event → date/recurrence → channel → AI greeting → optional gift → review).
- `/occasions/:id` — detail with countdown ring, scheduled greeting preview, attached gift, action bar (Edit, Duplicate, Dispatch now, Delete).

## 10. Greeting composer flow (`/greetings/new`)

Multi-step wizard replacing the modal for the long-form flow:
1. Pick template (from `/templates` grid).
2. Inputs (recipient, occasion, tone, notes).
3. Streaming preview + edit.
4. Schedule (date/time/channel) → confirmation screen.
Existing modal `GreetingGenerator` stays for quick inline use.

## 11. Template & creator detail

- `/templates/:id` — large preview player, tone/length, "Use template" → routes to greeting composer step 2 with template prefilled, "Similar templates" row.
- `/creators/:id` — banner, bio, follow, product grid filtered to that creator, recent reviews, "Message creator" mock.

## 12. Auth + onboarding (UI only)

- `/auth` — split-screen with marketing left / form right, tabs: Sign in · Sign up, Google + Apple mock buttons, magic-link path.
- `/onboarding` — 4 steps (Profile → Import contacts (mock CSV + Google placeholder) → Add first occasion → Pick plan), progress bar, skip per step.
- Mark auth as mocked; clicking submit just routes to `/dashboard`.

## 13. Notifications + search

- `/notifications` — grouped Today / This week / Earlier, mark-all-read, filter chips.
- Global `Cmd+K` palette (`src/components/CommandPalette.tsx` using shadcn `Command`) — navigate anywhere, run common actions (New greeting, Add contact, Open cart).

## 14. Misc polish

- Custom `404` with illustration + "Back to dashboard" + recent routes.
- `/legal/terms` and `/legal/privacy` placeholder pages with realistic copy (linked from footer).
- Footer + landing links updated to point at real routes.
- Every page already uses the existing `Navigation` sidebar, glass-panel tokens, and dark Walnut/Corten palette — no design-system changes.

## Out of scope

- Any Supabase, auth backend, payments, AI gateway calls, real email/SMS, persistence beyond localStorage.

## Technical notes

- New route files under `src/pages/` (GiftDetail, Cart, Checkout, OrderConfirmation, Orders, ContactDetail, OccasionNew, OccasionDetail, GreetingComposer, TemplateDetail, CreatorDetail, Auth, Onboarding, Notifications, Terms, Privacy).
- New components under `src/components/checkout/`, `src/components/cart/`, `src/components/composer/`.
- One `CartContext` + `OrdersContext` in `src/context/`.
- All routes registered in `src/App.tsx` above the `*` catch-all.
- Wire dynamic params via `react-router-dom` `useParams`.
- Confetti via lightweight CSS keyframes (already have `confetti-pop`).
- Estimated 18 new pages, 10 new components, ~2,500 LOC.

```text
landing ── auth ── onboarding ── dashboard
                                  ├─ contacts ── /:id ── occasion/new ── /:id
                                  ├─ calendar
                                  ├─ assistant
                                  ├─ templates ── /:id ─┐
                                  ├─ greetings/new ◀────┘
                                  ├─ gifts ── /:slug ── cart ── checkout ── orders/:id
                                  ├─ creators ── /:id
                                  ├─ notifications
                                  └─ settings
```

I'll execute top-to-bottom. Approve and I'll start with the mock data + cart context, then ship pages in the order above.
