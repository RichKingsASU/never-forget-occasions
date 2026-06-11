import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Calendar as CalIcon, Check, Mail, Sparkles, Gift as GiftIcon, Loader2 } from "lucide-react";
import { mockGifts, formatCurrency } from "@/lib/mock-data";
import { toast } from "sonner";
import { useContacts } from "@/hooks/useContacts";
import { useCreateOccasion } from "@/hooks/useOccasions";

const STEPS = ["Recipient", "Event", "Schedule", "Greeting", "Gift", "Review"];

export const OccasionNew = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const { data: contacts = [], isLoading: contactsLoading } = useContacts();
  const createOccasionMutation = useCreateOccasion();

  const [contactId, setContactId] = useState("");
  const [event, setEvent] = useState("Birthday");
  const [date, setDate] = useState("");
  const [recurrence, setRecurrence] = useState<"none"|"yearly"|"monthly">("yearly");
  const [channel, setChannel] = useState<"Email"|"SMS"|"Video Mail">("Email");
  const [tone, setTone] = useState("Heartfelt");
  const [giftId, setGiftId] = useState<string | null>(null);

  // Pick first contact once loaded if none selected
  if (!contactId && contacts.length > 0) {
    setContactId(contacts[0].id);
  }

  const contact = contacts.find((c) => c.id === contactId);
  const gift = giftId ? mockGifts.find((g) => g.id === giftId) : null;

  const next = () => {
    if (step === 0 && !contactId) { toast.error("Pick a contact"); return; }
    if (step === 1 && !event.trim()) { toast.error("Name the occasion"); return; }
    if (step === 2 && !date) { toast.error("Pick a date"); return; }
    setStep((s) => Math.min(5, s + 1));
  };

  const submit = async () => {
    if (!contactId || !date || !event) return;
    try {
      await createOccasionMutation.mutateAsync({
        contact_id: contactId,
        type: event,
        date: date,
        recurring: recurrence !== "none",
        status: "draft",
      });
      toast.success(`${event} scheduled for ${contact?.name}`);
      navigate("/calendar");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to schedule occasion");
    }
  };

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
      </div>
      <Navigation currentPage="calendar" />

      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-3xl space-y-5">
            <Button asChild variant="ghost" size="sm" className="gap-1.5">
              <Link to="/calendar"><ArrowLeft className="h-4 w-4" /> Calendar</Link>
            </Button>

            <header>
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-corten">
                <CalIcon className="h-3 w-3" /> occasion · new
              </p>
              <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Schedule an occasion</h1>
            </header>

            <ol className="glass-panel flex items-center gap-1 overflow-x-auto p-2">
              {STEPS.map((s, i) => (
                <li key={s} className={`flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${i === step ? "bg-corten/15 text-corten" : i < step ? "text-success" : "text-muted-foreground"}`}>
                  <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${i === step ? "bg-corten text-white" : i < step ? "bg-success/30" : "bg-card"}`}>{i < step ? <Check className="h-3 w-3" /> : i+1}</span>
                  <span className="whitespace-nowrap">{s}</span>
                </li>
              ))}
            </ol>

            <Card className="glass-panel border-0 p-6">
              {step === 0 && (
                <div className="space-y-3">
                  <h2 className="font-display text-lg font-semibold">Who's it for?</h2>
                  {contactsLoading ? (
                    <div className="flex h-32 items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-corten" />
                    </div>
                  ) : contacts.length === 0 ? (
                    <div className="p-6 text-center">
                      <p className="text-sm text-muted-foreground">You don't have any contacts yet.</p>
                      <Button asChild size="sm" className="mt-3 bg-corten text-white hover:bg-corten/90">
                        <Link to="/contacts">Add a Contact</Link>
                      </Button>
                    </div>
                  ) : (
                    <RadioGroup value={contactId} onValueChange={setContactId} className="space-y-2">
                      {contacts.map((c) => (
                        <label key={c.id} className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition ${contactId === c.id ? "border-corten/60 bg-corten/5" : "border-border/60"}`}>
                          <RadioGroupItem value={c.id} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{c.name}</p>
                            <p className="text-xs text-muted-foreground">{c.relationship}</p>
                          </div>
                        </label>
                      ))}
                    </RadioGroup>
                  )}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-display text-lg font-semibold">What are we celebrating?</h2>
                  <div className="grid gap-1.5"><Label htmlFor="ev">Occasion</Label>
                    <Select value={event} onValueChange={setEvent}>
                      <SelectTrigger id="ev"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Birthday","Anniversary","Promotion","Housewarming","Holiday","Mother's Day","Father's Day","Just because","Custom…"].map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  {event === "Custom…" && <Input placeholder="Name this occasion" onChange={(e)=>setEvent(e.target.value)} />}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="font-display text-lg font-semibold">When?</h2>
                  <div className="grid gap-1.5"><Label htmlFor="dt">Date</Label><Input id="dt" type="date" value={date} onChange={(e)=>setDate(e.target.value)} /></div>
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Repeat</p>
                    <div className="flex gap-1.5">
                      {[["none","Once"],["yearly","Every year"],["monthly","Every month"]].map(([v,l]) => (
                        <button key={v} onClick={() => setRecurrence(v as typeof recurrence)} className={`flex-1 rounded-lg border px-3 py-2 text-xs transition ${recurrence===v ? "border-corten bg-corten/15 text-corten" : "border-border/60"}`}>{l}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="font-display text-lg font-semibold">How should we deliver it?</h2>
                  <RadioGroup value={channel} onValueChange={(v)=>setChannel(v as typeof channel)} className="grid gap-2 md:grid-cols-3">
                    {[
                      { v:"Email", d:"Inbox on the morning of" },
                      { v:"SMS", d:"A friendly text" },
                      { v:"Video Mail", d:"AI-generated video message" },
                    ].map(({v,d}) => (
                      <label key={v} className={`flex flex-col gap-1 rounded-lg border p-3 cursor-pointer transition ${channel===v ? "border-corten/60 bg-corten/5" : "border-border/60"}`}>
                        <div className="flex items-center gap-2"><RadioGroupItem value={v} /><Mail className="h-4 w-4 text-corten" /><span className="text-sm font-medium">{v}</span></div>
                        <p className="text-[11px] text-muted-foreground">{d}</p>
                      </label>
                    ))}
                  </RadioGroup>
                  <Separator className="bg-border/50" />
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Tone of the greeting</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Heartfelt","Funny","Romantic","Professional","Family-friendly"].map((t) => (
                        <button key={t} onClick={()=>setTone(t)} className={`rounded-full border px-3 py-1 text-xs transition ${tone===t ? "border-corten bg-corten/15 text-corten" : "border-border/60"}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="font-display text-lg font-semibold">Want to add a gift?</h2>
                  <p className="text-xs text-muted-foreground">Optional — you can always add one later.</p>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    <button onClick={()=>setGiftId(null)} className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-4 text-xs transition ${giftId === null ? "border-corten bg-corten/15 text-corten" : "border-border/60"}`}>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-background/60"><GiftIcon className="h-4 w-4" /></span>
                      <span>No gift</span>
                    </button>
                    {mockGifts.slice(0, 5).map((g) => (
                      <button key={g.id} onClick={()=>setGiftId(g.id)} className={`flex flex-col gap-2 rounded-lg border p-3 text-left transition ${giftId === g.id ? "border-corten bg-corten/5" : "border-border/60"}`}>
                        <div className={`aspect-square rounded-md bg-gradient-to-br ${g.hue}`} />
                        <div>
                          <p className="line-clamp-1 text-xs font-medium">{g.name}</p>
                          <p className="text-[11px] text-muted-foreground">{formatCurrency(g.price)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-xs"><Link to="/gifts">Browse full marketplace →</Link></Button>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-3">
                  <h2 className="font-display text-lg font-semibold">Review</h2>
                  <dl className="space-y-2 rounded-lg border border-border/60 bg-background/40 p-4 text-sm">
                    <Row k="Recipient" v={contact?.name ?? "—"} />
                    <Row k="Occasion" v={event} />
                    <Row k="Date" v={date || "—"} />
                    <Row k="Repeat" v={recurrence === "none" ? "Once" : recurrence === "yearly" ? "Every year" : "Every month"} />
                    <Row k="Channel" v={channel} />
                    <Row k="Tone" v={tone} />
                    <Row k="Gift" v={gift?.name ?? "None"} />
                  </dl>
                  {gift && (
                    <div className="flex items-center gap-3 rounded-lg border border-corten/40 bg-corten/5 p-3">
                      <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${gift.hue}`} />
                      <div className="flex-1"><p className="text-sm font-medium">{gift.name}</p><p className="text-xs text-muted-foreground">{formatCurrency(gift.price)} · {gift.deliveryTime}</p></div>
                      <Badge className="border-0 bg-corten/15 text-corten">attached</Badge>
                    </div>
                  )}
                </div>
              )}
            </Card>

            <div className="flex items-center justify-between">
              <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s)=>Math.max(0,s-1))}><ArrowLeft className="h-4 w-4" /> Back</Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next} className="bg-corten text-white hover:bg-corten/90">Continue <ArrowRight className="h-4 w-4" /></Button>
              ) : (
                <Button 
                  onClick={submit} 
                  className="bg-corten text-white hover:bg-corten/90"
                  disabled={createOccasionMutation.isPending}
                >
                  {createOccasionMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scheduling...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" /> Schedule occasion
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex items-baseline justify-between border-b border-border/40 pb-1.5 last:border-0 last:pb-0">
    <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{k}</dt>
    <dd className="text-sm">{v}</dd>
  </div>
);

export default OccasionNew;