import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Gift, Calendar, Sparkles, Check, Mail } from "lucide-react";

interface Notification {
  id: string;
  type: "occasion" | "gift" | "ai" | "system";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const seed: Notification[] = [
  { id: "n1", type: "occasion", title: "Sarah's birthday in 5 days", body: "Greeting is drafted. Review before it sends Jun 15.", time: "2h ago", read: false },
  { id: "n2", type: "gift", title: "Order delivered", body: "Rose bouquet arrived at Mom's door.", time: "5h ago", read: false },
  { id: "n3", type: "ai", title: "3 new draft greetings", body: "AI prepared messages for upcoming occasions.", time: "1d ago", read: false },
  { id: "n4", type: "system", title: "Welcome to NFO", body: "Finish onboarding to unlock automations.", time: "2d ago", read: true },
  { id: "n5", type: "occasion", title: "Anniversary added", body: "John & Lisa - June 22.", time: "3d ago", read: true },
  { id: "n6", type: "gift", title: "Card declined", body: "Update your payment method to ship Devon's gift.", time: "4d ago", read: true },
  { id: "n7", type: "ai", title: "Tone preference updated", body: "AI greetings will now default to Warm.", time: "1w ago", read: true },
  { id: "n8", type: "system", title: "New feature: Video Mail", body: "Send a recorded video as your greeting.", time: "1w ago", read: true },
];

const icon = (t: Notification["type"]) => ({ occasion: Calendar, gift: Gift, ai: Sparkles, system: Mail }[t]);

export const NotificationsPage = () => {
  const [items, setItems] = useState(seed);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const filtered = items.filter((n) => (filter === "unread" ? !n.read : true));
  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="lg:ml-64">
        <div className="mx-auto max-w-3xl p-6 md:p-10">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-display text-3xl font-bold">Notifications</h1>
                {unread > 0 && <Badge className="bg-primary text-primary-foreground">{unread} new</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">Stay on top of every moment.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setItems(items.map((i) => ({ ...i, read: true })))}>
              <Check className="h-4 w-4" /> Mark all read
            </Button>
          </header>

          <div className="mb-4 flex gap-2">
            {(["all", "unread"] as const).map((f) => (
              <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)}>
                {f === "all" ? "All" : "Unread"}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            {filtered.length === 0 && (
              <Card className="grid place-items-center gap-2 p-12 text-center">
                <Bell className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">You're all caught up.</p>
              </Card>
            )}
            {filtered.map((n) => {
              const Icon = icon(n.type);
              return (
                <Card
                  key={n.id}
                  className={`flex items-start gap-4 p-4 transition hover:shadow-soft ${!n.read ? "border-primary/40 bg-primary/[0.03]" : ""}`}
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{n.title}</p>
                      <span className="text-xs text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                  </div>
                  {!n.read && (
                    <button
                      onClick={() => setItems(items.map((i) => (i.id === n.id ? { ...i, read: true } : i)))}
                      className="h-2 w-2 rounded-full bg-primary"
                      aria-label="Mark read"
                    />
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;