import { useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Bell, Gift, Calendar, Sparkles, Loader2, UserPlus } from "lucide-react";
import { useContacts } from "@/hooks/useContacts";
import { useOccasions } from "@/hooks/useOccasions";

interface ActivityEvent {
  id: string;
  type: "contact" | "occasion";
  title: string;
  body: string;
  at: string;
}

const timeAgo = (iso: string) => {
  const ms = Date.now() - new Date(iso).getTime();
  const min = Math.round(ms / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 7) return `${day}d ago`;
  const wk = Math.round(day / 7);
  if (wk < 5) return `${wk}w ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

const COMING_SOON = [
  { key: "gift", label: "Gift delivery updates", icon: Gift },
  { key: "ai", label: "AI draft alerts", icon: Sparkles },
];

export const NotificationsPage = () => {
  const { data: contacts, isLoading: contactsLoading, isError: contactsError } = useContacts();
  const { data: occasions, isLoading: occasionsLoading, isError: occasionsError } = useOccasions();

  const isLoading = contactsLoading || occasionsLoading;
  const isError = contactsError || occasionsError;

  const events = useMemo<ActivityEvent[]>(() => {
    if (!contacts || !occasions) return [];
    const contactNameById = new Map(contacts.map((c) => [c.id, c.name]));

    const contactEvents: ActivityEvent[] = contacts.map((c) => ({
      id: `contact-${c.id}`,
      type: "contact",
      title: `Added ${c.name}`,
      body: `New contact${c.relationship ? ` · ${c.relationship}` : ""}`,
      at: c.created_at,
    }));

    const occasionEvents: ActivityEvent[] = occasions.map((o) => ({
      id: `occasion-${o.id}`,
      type: "occasion",
      title: `${o.type} added`,
      body: `For ${contactNameById.get(o.contact_id) ?? "a contact"} · ${new Date(o.date + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" })}`,
      at: o.created_at,
    }));

    return [...contactEvents, ...occasionEvents].sort(
      (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()
    );
  }, [contacts, occasions]);

  const icon = (t: ActivityEvent["type"]) => (t === "contact" ? UserPlus : Calendar);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="lg:ml-64">
        <div className="mx-auto max-w-3xl p-6 md:p-10">
          <header className="mb-6">
            <h1 className="font-display text-3xl font-bold">Notifications</h1>
            <p className="text-sm text-muted-foreground">Recent activity on your account.</p>
          </header>

          {isLoading ? (
            <Card className="grid place-items-center gap-2 p-12 text-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Loading activity…</p>
            </Card>
          ) : isError ? (
            <Card className="grid place-items-center gap-2 p-12 text-center">
              <Bell className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Couldn't load your activity. Try refreshing.</p>
            </Card>
          ) : events.length === 0 ? (
            <Card className="grid place-items-center gap-2 p-12 text-center">
              <Bell className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No activity yet — add a contact or occasion to get started.</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {events.map((n) => {
                const Icon = icon(n.type);
                return (
                  <Card key={n.id} className="flex items-start gap-4 p-4">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium">{n.title}</p>
                        <span className="text-xs text-muted-foreground">{timeAgo(n.at)}</span>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="mt-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Coming soon</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {COMING_SOON.map(({ key, label, icon: Icon }) => (
                <Card key={key} className="flex items-center gap-3 border-dashed p-4 opacity-60">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
