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