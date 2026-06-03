import { useMemo, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Mail, Phone, Sparkles, Gift, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GreetingGenerator } from "@/components/ai/GreetingGenerator";
import { Link } from "react-router-dom";
import { useContacts, useCreateContact } from "@/hooks/useContacts";

const relationships = ["Family", "Close friend", "Friend", "Colleague", "Partner"] as const;
type Relationship = typeof relationships[number];

export const Contacts = () => {
  const { data: contacts = [], isLoading, error } = useContacts();
  const createContactMutation = useCreateContact();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Relationship | "all">("all");
  const [open, setOpen] = useState(false);

  const [draft, setDraft] = useState({ name: "", email: "", phone: "", relationship: "Friend" as Relationship, prefs: "" });

  const filtered = useMemo(
    () =>
      contacts.filter(
        (c) =>
          (filter === "all" || c.relationship === filter) &&
          (q.trim() === "" || c.name.toLowerCase().includes(q.toLowerCase()))
      ),
    [contacts, q, filter]
  );

  const counts = useMemo(() => {
    const total = contacts.length;
    const by = (r: Relationship) => contacts.filter((c) => c.relationship === r).length;
    return { total, family: by("Family"), close: by("Close friend"), colleagues: by("Colleague") };
  }, [contacts]);

  const submit = async () => {
    if (!draft.name.trim()) {
      toast.error("Name is required");
      return;
    }
    
    try {
      await createContactMutation.mutateAsync({
        name: draft.name.trim(),
        email: draft.email.trim() || null,
        phone: draft.phone.trim() || null,
        relationship: draft.relationship,
        // The profiles/contacts table has no giftPreferences array, let's look at the schema.
        // It has name, email, phone, relationship, notes, avatar_url. 
        // We will store preferences in notes or similar. For now, since notes matches text, let's map prefs to notes.
        notes: draft.prefs.trim() || null,
      });

      toast.success(`${draft.name.trim()} added to your circle`);
      setDraft({ name: "", email: "", phone: "", relationship: "Friend", prefs: "" });
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to create contact");
    }
  };

  if (error) {
    toast.error("Error loading contacts");
  }

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-corten/20 blur-[120px]" />
      </div>

      <Navigation currentPage="contacts" />

      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-[1400px] space-y-5">
            <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-corten">
                  <Users className="h-3 w-3" aria-hidden="true" /> people · directory
                </p>
                <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
                  Your circle
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {counts.total} contacts · {counts.family} family · {counts.close} close friends · {counts.colleagues} colleagues
                </p>
              </div>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-corten text-white hover:bg-corten/90">
                    <Plus className="h-4 w-4" /> Add contact
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-panel border-border/70">
                  <DialogHeader>
                    <DialogTitle className="font-display">Add a contact</DialogTitle>
                    <DialogDescription>
                      Save someone you never want to forget. You can schedule their occasions next.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="c-name">Name</Label>
                      <Input id="c-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Sarah Chen" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="grid gap-1.5">
                        <Label htmlFor="c-email">Email</Label>
                        <Input id="c-email" type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="sarah@example.com" />
                      </div>
                      <div className="grid gap-1.5">
                        <Label htmlFor="c-phone">Phone</Label>
                        <Input id="c-phone" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="+1 415 555 0142" />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Relationship</Label>
                      <Select value={draft.relationship} onValueChange={(v) => setDraft({ ...draft, relationship: v as Relationship })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {relationships.map((r) => (
                            <SelectItem key={r} value={r}>{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="c-prefs">Gift preferences <span className="text-muted-foreground">(comma separated)</span></Label>
                      <Input id="c-prefs" value={draft.prefs} onChange={(e) => setDraft({ ...draft, prefs: e.target.value })} placeholder="Coffee, Books, Plants" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button 
                      onClick={submit} 
                      className="bg-corten text-white hover:bg-corten/90"
                      disabled={createContactMutation.isPending}
                    >
                      {createContactMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" /> Add contact
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </header>

            <div className="glass-panel flex flex-col gap-3 p-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by name…"
                  className="h-10 border-border/60 bg-card/60 pl-9"
                  aria-label="Search contacts"
                />
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {(["all", ...relationships] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setFilter(r as Relationship | "all")}
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      filter === r
                        ? "border-corten/60 bg-corten/15 text-corten"
                        : "border-border/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r === "all" ? "All" : r}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-corten" />
              </div>
            ) : filtered.length === 0 ? (
              <Card className="glass-panel border-0 p-12 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-corten/15 text-corten">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="mt-3 font-display text-lg font-semibold">No contacts match</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try a different search or add someone new to your circle.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((c) => {
                  const initials = c.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                  const giftPreferences = c.notes ? c.notes.split(",").map((s) => s.trim()).filter(Boolean) : [];
                  return (
                    <Card key={c.id} className="glass-panel group border-0 p-5 transition hover:-translate-y-0.5">
                      <div className="flex items-start justify-between">
                        <Link to={`/contacts/${c.id}`} className="flex items-center gap-3">
                          <Avatar className="h-11 w-11">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-corten font-semibold text-primary-foreground">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-display text-base font-semibold leading-tight hover:text-corten">{c.name}</p>
                            <p className="text-xs text-muted-foreground">{c.relationship}</p>
                          </div>
                        </Link>
                      </div>

                      <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                        {c.email && (
                          <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {c.email}</p>
                        )}
                        {c.phone && (
                          <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {c.phone}</p>
                        )}
                      </div>

                      {giftPreferences.length > 0 && (
                        <div className="mt-4">
                          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">loves</p>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {giftPreferences.map((p) => (
                              <Badge key={p} variant="secondary" className="border-border/60 bg-background/40 text-[10px]">
                                {p}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-5 flex items-center gap-1.5">
                        <GreetingGenerator
                          initialRecipient={c.name}
                          trigger={
                            <Button size="sm" variant="ghost" className="h-8 flex-1 gap-1 border border-border/60 text-xs">
                              <Sparkles className="h-3.5 w-3.5" /> Greeting
                            </Button>
                          }
                        />
                        <Button size="sm" className="h-8 flex-1 gap-1 bg-corten text-xs text-white hover:bg-corten/90"
                          onClick={() => toast.success(`Opening gift picker for ${c.name}`)}>
                          <Gift className="h-3.5 w-3.5" /> Send gift
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contacts;