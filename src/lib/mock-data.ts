export type Relationship = "Family" | "Close friend" | "Friend" | "Colleague" | "Partner";

export interface MockContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  relationship: Relationship;
  giftPreferences: string[];
}

export interface MockOccasion {
  id: string;
  contactId: string;
  contactName: string;
  event: string;
  date: string; // ISO yyyy-mm-dd
  channel: "Email" | "SMS" | "Video Mail" | "Slack";
  status: "scheduled" | "queued" | "draft";
  hasGift: boolean;
  giftName?: string;
}

export const mockContacts: MockContact[] = [
  { id: "c1", name: "Sarah Chen",  email: "sarah@example.com", phone: "+1 415 555 0142", relationship: "Close friend", giftPreferences: ["Coffee", "Books", "Plants"] },
  { id: "c2", name: "John & Lisa", email: "johnlisa@example.com",                         relationship: "Family",       giftPreferences: ["Wine", "Experiences"] },
  { id: "c3", name: "Mom",         phone: "+1 312 555 0199",                              relationship: "Family",       giftPreferences: ["Flowers", "Spa"] },
  { id: "c4", name: "Devon K.",    email: "devon@workmail.co",                            relationship: "Colleague",    giftPreferences: ["Food delivery", "Tech"] },
  { id: "c5", name: "Priya N.",    email: "priya.n@example.com",                          relationship: "Friend",       giftPreferences: ["Home goods", "Candles"] },
  { id: "c6", name: "Marcus T.",   email: "marcus@example.com", phone: "+1 646 555 0117", relationship: "Close friend", giftPreferences: ["Vinyl", "Whiskey"] },
];

export const mockOccasions: MockOccasion[] = [
  { id: "o1", contactId: "c1", contactName: "Sarah Chen",   event: "Birthday",     date: "2026-06-15", channel: "Email",      status: "scheduled", hasGift: true,  giftName: "Starbucks Gift Card" },
  { id: "o2", contactId: "c2", contactName: "John & Lisa",  event: "Anniversary",  date: "2026-06-22", channel: "Email",      status: "scheduled", hasGift: true,  giftName: "Rose Bouquet" },
  { id: "o3", contactId: "c3", contactName: "Mom",          event: "Mother's Day", date: "2026-06-08", channel: "Video Mail", status: "draft",     hasGift: false },
  { id: "o4", contactId: "c4", contactName: "Devon K.",     event: "Promotion",    date: "2026-06-28", channel: "Slack",      status: "queued",    hasGift: true,  giftName: "DoorDash $30" },
  { id: "o5", contactId: "c5", contactName: "Priya N.",     event: "Housewarming", date: "2026-07-04", channel: "Email",      status: "draft",     hasGift: false },
  { id: "o6", contactId: "c6", contactName: "Marcus T.",    event: "Birthday",     date: "2026-06-11", channel: "SMS",        status: "scheduled", hasGift: true,  giftName: "Vinyl Subscription" },
];

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

export const daysUntil = (iso: string) => {
  const now = new Date(); now.setHours(0,0,0,0);
  const then = new Date(iso + "T00:00:00");
  return Math.round((then.getTime() - now.getTime()) / 86400000);
};

// ─────────────────────── GIFTS ───────────────────────

export type GiftCategory = "Gift Cards" | "Flowers" | "Food & Treats" | "Experiences" | "Jewelry" | "Tech" | "Home" | "Wellness";
export type DeliverySpeed = "Instant" | "Same-day" | "Next-day" | "2-3 days";
export interface GiftVariant { id: string; label: string; priceDelta?: number; }
export interface MockGift {
  id: string;
  slug: string;
  name: string;
  category: GiftCategory;
  price: number;
  provider: string;
  creatorId?: string;
  rating: number;
  reviewCount: number;
  deliveryTime: DeliverySpeed;
  occasions: string[];
  description: string;
  longDescription: string;
  variants?: { label: string; options: GiftVariant[] };
  inStock: boolean;
  badges?: ("popular" | "eco" | "new" | "limited")[];
  hue: string;
}

export const mockGifts: MockGift[] = [
  { id: "g1", slug: "starbucks-25", name: "Starbucks Gift Card", category: "Gift Cards", price: 25, provider: "Starbucks", rating: 4.8, reviewCount: 1240, deliveryTime: "Instant",  occasions: ["Birthday","Thank You","Holiday"], description: "Perfect for coffee lovers. Redeemable anywhere Starbucks is.", longDescription: "A timeless thank-you in cardboard-cup form. Delivered instantly via email, redeemable in-store or on the Starbucks app worldwide. Choose any denomination and add a personal note.", variants: { label: "Denomination", options: [{id:"15",label:"$15",priceDelta:-10},{id:"25",label:"$25"},{id:"50",label:"$50",priceDelta:25},{id:"100",label:"$100",priceDelta:75}] }, inStock: true, badges: ["popular"], hue: "from-emerald-700/40 to-emerald-900/30" },
  { id: "g2", slug: "rose-bouquet-premium", name: "Premium Rose Bouquet", category: "Flowers", price: 65, provider: "FTD", creatorId: "cr1", rating: 4.9, reviewCount: 412, deliveryTime: "Same-day", occasions: ["Anniversary","Valentine's Day","Birthday"], description: "A dozen velvet red roses, hand-tied and same-day delivered.", longDescription: "Cut at dawn, arranged by hand, and delivered the same day in 38 metros. Comes wrapped in linen and tied with a satin ribbon. Add a handwritten card at checkout.", variants: { label: "Size", options: [{id:"d",label:"Dozen"},{id:"d2",label:"Two dozen",priceDelta:45},{id:"d3",label:"Three dozen",priceDelta:90}] }, inStock: true, badges: ["popular"], hue: "from-corten/50 to-primary/30" },
  { id: "g3", slug: "doordash-30", name: "DoorDash Credit", category: "Gift Cards", price: 30, provider: "DoorDash", rating: 4.7, reviewCount: 980, deliveryTime: "Instant", occasions: ["Promotion","Thank You","Just because"], description: "Dinner on you. Redeemable at any DoorDash restaurant.", longDescription: "The modern thank-you. Sent as a digital code, applied with one tap, usable on every DoorDash order in the US, Canada, and Australia.", variants: { label: "Denomination", options: [{id:"30",label:"$30"},{id:"50",label:"$50",priceDelta:20},{id:"75",label:"$75",priceDelta:45}] }, inStock: true, hue: "from-rose-700/40 to-corten/30" },
  { id: "g4", slug: "mira-tulip-arrangement", name: "Mira's Dried Tulip Arrangement", category: "Flowers", price: 88, provider: "Mira Studio", creatorId: "cr1", rating: 4.9, reviewCount: 87, deliveryTime: "Next-day", occasions: ["Housewarming","Anniversary","Just because"], description: "Hand-arranged dried tulips in a ceramic vessel.", longDescription: "A small-batch arrangement of bleached and naturally dyed tulips, set in a hand-thrown ceramic vessel from Hiro Tanaka. Lasts for years if kept out of direct sun.", inStock: true, badges: ["new","limited"], hue: "from-amber-500/40 to-corten/30" },
  { id: "g5", slug: "hiro-tea-cup-pair", name: "Hiro Tea Cup Pair", category: "Home", price: 120, provider: "Hiro Ceramics", creatorId: "cr2", rating: 5.0, reviewCount: 64, deliveryTime: "2-3 days", occasions: ["Anniversary","Housewarming"], description: "Wheel-thrown, signed, dated. A pair.", longDescription: "Each cup is thrown on the wheel in Hiro Tanaka's Kyoto studio, glazed with a soft celadon, and finished with a textured foot. Signed and dated on the underside.", inStock: true, badges: ["limited"], hue: "from-accent/40 to-primary/30" },
  { id: "g6", slug: "trade-coffee-3", name: "Trade Coffee 3-Bag Sampler", category: "Food & Treats", price: 36, provider: "Trade Coffee", rating: 4.6, reviewCount: 312, deliveryTime: "2-3 days", occasions: ["Birthday","Thank You","Just because"], description: "Three bags from three top US roasters.", longDescription: "A curated trio of single-origin coffees, matched to the recipient's taste in a 30-second quiz. Whole bean or ground, delivered fresh-roasted.", variants: { label: "Grind", options: [{id:"wb",label:"Whole bean"},{id:"dr",label:"Drip"},{id:"es",label:"Espresso"}] }, inStock: true, badges: ["popular","eco"], hue: "from-amber-700/40 to-corten/30" },
  { id: "g7", slug: "sara-pastry-box", name: "Sara's Patisserie Box", category: "Food & Treats", price: 68, provider: "Sara Bakes", creatorId: "cr3", rating: 4.9, reviewCount: 224, deliveryTime: "Next-day", occasions: ["Birthday","Holiday","Thank You"], description: "Canelés, croissants, and a seasonal tart.", longDescription: "Sara Whitfield bakes this box overnight in Austin, ships next-morning on ice. Includes four canelés, two croissants, and one seasonal tart.", inStock: true, badges: ["new"], hue: "from-amber-500/40 to-corten/30" },
  { id: "g8", slug: "diego-mezcal-100", name: "Diego's Mezcal · Single Origin", category: "Food & Treats", price: 95, provider: "Diego Mezcal", creatorId: "cr4", rating: 4.9, reviewCount: 142, deliveryTime: "2-3 days", occasions: ["Promotion","Anniversary","Just because"], description: "Espadín mezcal from family palenques.", longDescription: "Distilled in copper stills by the Marín family in Sola de Vega, Oaxaca. 47% ABV, soft smoke, citrus finish. Age-verified at delivery.", inStock: true, hue: "from-corten/50 to-amber-500/30" },
  { id: "g9", slug: "spa-day-experience", name: "City Spa Day", category: "Experiences", price: 220, provider: "Resy", rating: 4.8, reviewCount: 76, deliveryTime: "Instant", occasions: ["Mother's Day","Birthday","Anniversary"], description: "60-min massage + thermal lounge.", longDescription: "Choose from 80+ spas across 12 US cities. Includes a 60-minute Swedish massage and same-day thermal lounge access. Booked instantly with the recipient's preferred date.", inStock: true, badges: ["popular"], hue: "from-primary/40 to-accent/30" },
  { id: "g10", slug: "noah-cutting-board", name: "Noah's Walnut Board", category: "Home", price: 145, provider: "Noah Woodshop", creatorId: "cr6", rating: 4.9, reviewCount: 53, deliveryTime: "2-3 days", occasions: ["Housewarming","Anniversary"], description: "Heirloom walnut board, hand-finished.", longDescription: "Cut from a single piece of Appalachian black walnut, finished with food-safe oil. Signed and dated. Engraving available at checkout.", inStock: true, hue: "from-amber-700/40 to-muted" },
  { id: "g11", slug: "lena-letterpress-set", name: "Lena's Letterpress Cards", category: "Home", price: 42, provider: "Lena Print", creatorId: "cr5", rating: 4.7, reviewCount: 198, deliveryTime: "2-3 days", occasions: ["Just because","Thank You"], description: "Set of 6 letterpress cards on cotton.", longDescription: "Pressed on 100% cotton stock in Portland. Includes six cards and six lined envelopes. Custom monograms add 2 days.", inStock: true, badges: ["eco"], hue: "from-primary/30 to-accent/40" },
  { id: "g12", slug: "headspace-year", name: "Headspace · One Year", category: "Wellness", price: 70, provider: "Headspace", rating: 4.7, reviewCount: 520, deliveryTime: "Instant", occasions: ["Just because","Thank You","Promotion"], description: "Meditation + sleep, full year of access.", longDescription: "A full year of Headspace, delivered instantly. Includes guided meditations, sleepcasts, and the kids library. Activated via the recipient's email.", inStock: true, hue: "from-accent/40 to-primary/30" },
];

export const findGift = (slug: string) => mockGifts.find((g) => g.slug === slug);
export const findContact = (id: string) => mockContacts.find((c) => c.id === id);
export const findOccasion = (id: string) => mockOccasions.find((o) => o.id === id);

export const formatCurrency = (n: number) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const estimateDelivery = (speed: DeliverySpeed) => {
  const map: Record<DeliverySpeed, number> = { Instant: 0, "Same-day": 0, "Next-day": 1, "2-3 days": 3 };
  const d = new Date();
  d.setDate(d.getDate() + map[speed]);
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
};

// ─────────────────────── REVIEWS ───────────────────────

export interface MockReview { author: string; rating: number; date: string; body: string; }

export const mockReviews: Record<string, MockReview[]> = {};
mockGifts.forEach((g) => {
  mockReviews[g.id] = [
    { author: "Jordan P.", rating: 5, date: "2 weeks ago", body: `Sent ${g.name} for my sister's birthday — landed perfectly and the unboxing photos made my week.` },
    { author: "Riley K.",  rating: g.rating >= 4.8 ? 5 : 4, date: "1 month ago", body: "Quality is exactly as described. Delivery was on time, packaging felt thoughtful." },
    { author: "Sam D.",    rating: 5, date: "2 months ago", body: "Repeat buyer. NFO makes this the easiest gifting in my life." },
  ];
});

// ─────────────────────── ORDERS (seed) ───────────────────────

export type OrderStatus = "placed" | "preparing" | "shipped" | "delivered";
export interface OrderItem { giftId: string; name: string; variant?: string; qty: number; price: number; hue: string; }
export interface MockOrder {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  recipient: { name: string; address?: string };
  greeting?: string;
  channel?: string;
  total: number;
  tracking?: string;
}

export const seedOrders: MockOrder[] = [
  { id: "NFO-26-0411", date: "2026-05-28", status: "delivered", items: [{ giftId:"g2", name:"Premium Rose Bouquet", variant:"Dozen", qty:1, price:65, hue:"from-corten/50 to-primary/30" }], recipient:{ name:"Sarah Chen", address:"Brooklyn, NY" }, greeting:"Happy birthday, S — to slow mornings and loud laughter.", channel:"Email · SMS", total: 71, tracking:"1Z999AA10123456784" },
  { id: "NFO-26-0399", date: "2026-05-12", status: "shipped",   items: [{ giftId:"g6", name:"Trade Coffee 3-Bag Sampler", variant:"Whole bean", qty:1, price:36, hue:"from-amber-700/40 to-corten/30" }], recipient:{ name:"Devon K.", address:"Austin, TX" }, greeting:"Congrats on the promo. The team's lucky to have you.", channel:"Slack", total: 39, tracking:"1Z999AA10123456712" },
  { id: "NFO-26-0376", date: "2026-04-30", status: "preparing", items: [{ giftId:"g9", name:"City Spa Day", qty:1, price:220, hue:"from-primary/40 to-accent/30" }], recipient:{ name:"Mom" }, channel:"Email", total: 220 },
  { id: "NFO-26-0341", date: "2026-04-12", status: "delivered", items: [{ giftId:"g7", name:"Sara's Patisserie Box", qty:1, price:68, hue:"from-amber-500/40 to-corten/30" }], recipient:{ name:"Priya N.", address:"Chicago, IL" }, channel:"Email", total: 73, tracking:"1Z999AA10123456701" },
];

// ─────────────────────── NOTIFICATIONS ───────────────────────

export type NotificationType = "reminder" | "delivery" | "drop" | "system";
export interface MockNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  time: string; // human
  bucket: "today" | "week" | "earlier";
  read?: boolean;
}

export const seedNotifications: MockNotification[] = [
  { id: "n1", type: "reminder",  title: "Mom's birthday in 3 days", body: "You haven't picked a gift yet. Want a suggestion?", time: "2h ago",  bucket: "today" },
  { id: "n2", type: "delivery",  title: "Order NFO-26-0411 delivered", body: "Sarah Chen received your bouquet at 11:02 AM.", time: "5h ago", bucket: "today", read: true },
  { id: "n3", type: "drop",      title: "New from Hiro Ceramics", body: "Two new tea cup pairs just dropped. Limited quantities.", time: "Yesterday", bucket: "today" },
  { id: "n4", type: "reminder",  title: "John & Lisa's anniversary in 19 days", body: "We've drafted three greeting options for review.", time: "Tue", bucket: "week" },
  { id: "n5", type: "delivery",  title: "Order NFO-26-0399 shipped", body: "Devon's coffee box is on the truck. Tracking added.", time: "Mon", bucket: "week", read: true },
  { id: "n6", type: "system",    title: "Two-factor enabled", body: "Sign-in now requires a code from your authenticator.", time: "Sun", bucket: "week", read: true },
  { id: "n7", type: "drop",      title: "Mira Studio · Mother's Day collection", body: "Pre-orders open. Ships May 8.", time: "Apr 22", bucket: "earlier" },
  { id: "n8", type: "reminder",  title: "Devon's promotion · 1 month later", body: "Quick check-in? A short note goes a long way.", time: "Apr 15", bucket: "earlier", read: true },
];