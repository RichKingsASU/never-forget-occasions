import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, ArrowLeft, Plus, Sparkles, Gift, Edit, Trash2, Package, Loader2, Calendar as CalIcon } from "lucide-react";
import { formatDate, daysUntil } from "@/lib/mock-data";
import { useOrders } from "@/context/OrdersContext";
import { GreetingGenerator } from "@/components/ai/GreetingGenerator";
import { toast } from "sonner";
import { useContact, useDeleteContact, useUpdateContact } from "@/hooks/useContacts";
import { useOccasionsByContact, useCreateOccasion } from "@/hooks/useOccasions";

export const ContactDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: contact, isLoading: contactLoading, error: contactError } = useContact(id);
  const { data: occasions = [], isLoading: occasionsLoading } = useOccasionsByContact(id);
  
  const deleteContactMutation = useDeleteContact();
  const updateContactMutation = useUpdateContact();
  const createOccasionMutation = useCreateOccasion();

  const { orders } = useOrders();

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ event: "Birthday", date: "", channel: "Email" });
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (contact) {
      setNotes(contact.notes || "");
    }
  }, [contact]);

  const myOrders = useMemo(() => orders.filter((o) => o.recipient.name === contact?.name), [orders, contact]);

  if (contactLoading) {
    return (
      <div className="dark min-h-dvh bg-background text-foreground flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-corten" />
      </div>
    );
  }

  if (contactError || !contact) {
    toast.error("Contact not found");
    return <Navigate to="/contacts" replace />;
  }

  const initials = contact.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const giftPreferences = contact.notes ? contact.notes.split(",").map((s) => s.trim()).filter(Boolean) : [];

  const addOccasion = async () => {
    if (!draft.date) { toast.error("Pick a date"); return; }
    try {
      await createOccasionMutation.mutateAsync({
        contact_id: contact.id,
        type: draft.event,
        date: draft.date,
        // Since there is no channel column in initial_schema on occasions,
        // let's look at the database.types.ts: occasions has (id, contact_id, date, recurring, reminder_days, status, type, created_at, updated_at, user_id).
        // Standard schema doesn't have a channel column here. So we only pass the columns it has.
        // We will default recurring to true for Birthday/Anniversary and false otherwise.
        recurring: ["Birthday", "Anniversary"].includes(draft.event),
        status: "draft",
      });

      setOpen(false);
      setDraft({ event: "Birthday", date: "", channel: "Email" });
      toast.success(`${draft.event} added for ${contact.name}`);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to add occasion");
    }
  };

  const saveNotes = async () => {
    try {
      await updateContactMutation.mutateAsync({
        id: contact.id,
        input: { notes },
      });
      toast.success("Notes saved");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to save notes");
    }
  };

  const deleteSelf = async () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      try {
        await deleteContactMutation.mutateAsync(contact.id);
        toast.success(`${contact.name} removed`);
        navigate("/contacts");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete contact");
      }
    }
  };

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
      </div>
      <Navigation currentPage="contacts" />

      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-[1200px] space-y-5">
            <Button asChild variant="ghost" size="sm" className="gap-1.5">
              <Link to="/contacts"><ArrowLeft className="h-4 w-4" /> All contacts</Link>
            </Button>

            <Card className="glass-panel border-0 p-6">
              <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-corten text-lg font-semibold text-primary-foreground">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-corten">{contact.relationship}</p>
                    <h1 className="font-display text-3xl font-semibold tracking-tight">{contact.name}</h1>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      {contact.email && <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {contact.email}</span>}
                      {contact.phone && <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {contact.phone}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast.info("Edit coming soon")}><Edit className="h-3.5 w-3.5" /> Edit</Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={deleteSelf}>
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </Button>
                </div>
              </div>
              {giftPreferences.length > 0 && (
                <>
                  <Separator className="my-5 bg-border/50" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Loves</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {giftPreferences.map((p) => (
                        <Badge key={p} variant="secondary" className="border-border/60 bg-background/40">{p}</Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </Card>

            <Tabs defaultValue="occasions" className="space-y-4">
              <TabsList className="glass-panel h-auto flex-wrap justify-start gap-1 border-0 bg-transparent p-1">
                {[["occasions","Occasions"],["gifts","Gift history"],["greetings","Greetings"],["notes","Notes"]].map(([v,l]) => (
                  <TabsTrigger key={v} value={v} className="data-[state=active]:bg-corten/20 data-[state=active]:text-corten">{l}</TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="occasions" className="m-0">
                <Card className="glass-panel border-0 p-0">
                  <div className="flex items-center justify-between border-b border-border/60 p-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {occasionsLoading ? "Loading..." : `${occasions.length} occasion${occasions.length===1?"":"s"}`}
                    </p>
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-corten text-white hover:bg-corten/90"><Plus className="h-4 w-4" /> Add occasion</Button>
                      </DialogTrigger>
                      <DialogContent className="glass-panel border-border/70">
                        <DialogHeader>
                          <DialogTitle className="font-display">Add an occasion</DialogTitle>
                          <DialogDescription>Schedule a moment you don't want to miss for {contact.name}.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-2">
                          <div className="grid gap-1.5"><Label>Occasion</Label>
                            <Select value={draft.event} onValueChange={(v)=>setDraft({...draft,event:v})}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {["Birthday","Anniversary","Promotion","Housewarming","Holiday","Mother's Day","Father's Day","Just because"].map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-1.5"><Label htmlFor="o-date">Date</Label><Input id="o-date" type="date" value={draft.date} onChange={(e)=>setDraft({...draft,date:e.target.value})} /></div>
                          <div className="grid gap-1.5"><Label>Channel</Label>
                            <Select value={draft.channel} onValueChange={(v)=>setDraft({...draft,channel:v})}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {["Email","SMS","Video Mail","Slack"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                          <Button onClick={addOccasion} className="bg-corten text-white hover:bg-corten/90">Add occasion</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  {occasionsLoading ? (
                    <div className="p-10 flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-corten" />
                    </div>
                  ) : occasions.length === 0 ? (
                    <div className="p-10 text-center">
                      <CalIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-3 font-display text-base font-semibold">No occasions yet</p>
                      <p className="mt-1 text-xs text-muted-foreground">Add a birthday, anniversary, or any moment that matters.</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-border/40">
                      {occasions.map((o) => {
                        const d = daysUntil(o.date);
                        return (
                          <li key={o.id} className="flex items-center gap-4 p-4">
                            <div className="grid h-12 w-12 place-items-center rounded-lg bg-background/60 ring-1 ring-border/60">
                              <span className="font-display text-base font-semibold tabular-nums">{new Date(o.date+"T00:00:00").getDate()}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium">{o.type}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(o.date)} {d >= 0 ? ` · in ${d}d` : ""}</p>
                            </div>
                            <GreetingGenerator initialRecipient={contact.name} initialOccasion={o.type} trigger={
                              <Button size="sm" variant="ghost" className="border border-border/60"><Sparkles className="h-3.5 w-3.5" /> Draft</Button>
                            } />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="gifts" className="m-0">
                <Card className="glass-panel border-0 p-0">
                  {myOrders.length === 0 ? (
                    <div className="p-10 text-center">
                      <Package className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-3 font-display text-base font-semibold">No gifts sent yet</p>
                      <Button asChild className="mt-3 bg-corten text-white hover:bg-corten/90"><Link to="/gifts">Browse gifts <Gift className="h-4 w-4" /></Link></Button>
                    </div>
                  ) : (
                    <ul className="divide-y divide-border/40">
                      {myOrders.map((o) => (
                        <li key={o.id}>
                          <Link to={`/orders/${o.id}`} className="flex items-center gap-4 p-4 hover:bg-card/40">
                            <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${o.items[0]?.hue || "from-primary to-secondary"}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{o.items.map(i=>i.name).join(", ")}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(o.date)} · {o.status}</p>
                            </div>
                            <span className="font-display text-sm font-semibold">${o.total}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="greetings" className="m-0">
                <Card className="glass-panel border-0 p-10 text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-3 font-display text-base font-semibold">Draft a greeting for {contact.name.split(" ")[0]}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Saved drafts will show up here.</p>
                  <GreetingGenerator initialRecipient={contact.name} trigger={
                    <Button className="mt-4 bg-corten text-white hover:bg-corten/90"><Sparkles className="h-4 w-4" /> New greeting</Button>
                  } />
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="m-0">
                <Card className="glass-panel border-0 p-6">
                  <textarea
                    rows={6}
                    placeholder={`Little things about ${contact.name.split(" ")[0]} — favorite coffee order, inside jokes, allergies, anything you want me to remember.`}
                    className="w-full resize-none rounded-lg border border-border/60 bg-background/40 p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-corten/40"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <div className="mt-3 flex justify-end">
                    <Button 
                      className="bg-corten text-white hover:bg-corten/90" 
                      onClick={saveNotes}
                      disabled={updateContactMutation.isPending}
                    >
                      {updateContactMutation.isPending ? "Saving..." : "Save notes"}
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContactDetail;