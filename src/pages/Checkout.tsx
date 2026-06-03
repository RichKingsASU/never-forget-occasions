import { useMemo, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Check, ChevronLeft, ChevronRight, Truck, Mail, Sparkles, CreditCard, Lock, Apple, Edit, Loader2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrdersContext";
import { formatCurrency } from "@/lib/mock-data";
import { toast } from "sonner";
import { useContacts } from "@/hooks/useContacts";

const STEPS = ["Recipient", "Greeting", "Payment", "Review"] as const;
type StepIdx = 0 | 1 | 2 | 3;

const SHIPPING: { id: "std"|"exp"|"sd"; label: string; desc: string; cost: number }[] = [
  { id: "std", label: "Standard", desc: "Arrives in 3–5 days",          cost: 0  },
  { id: "exp", label: "Express",  desc: "Arrives in 1–2 business days", cost: 12 },
  { id: "sd",  label: "Same-day", desc: "Today, in select metros",      cost: 25 },
];

const TONES = ["Heartfelt", "Funny", "Romantic", "Professional", "Family-friendly"];

export const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  const { add } = useOrders();
  const navigate = useNavigate();

  const { data: contacts = [], isLoading: contactsLoading } = useContacts();

  const [step, setStep] = useState<StepIdx>(0);

  // Step 1
  const [contactId, setContactId] = useState("");
  const [newRecipient, setNewRecipient] = useState({ name: "", email: "", line1: "", city: "", zip: "", country: "US" });
  const [useNew, setUseNew] = useState(false);
  const [shipId, setShipId] = useState<typeof SHIPPING[number]["id"]>("std");

  // Pick first contact once loaded if none selected
  if (!contactId && contacts.length > 0) {
    setContactId(contacts[0].id);
  }

  // Step 2
  const [attachGreeting, setAttachGreeting] = useState(true);
  const [tone, setTone] = useState("Heartfelt");
  const [message, setMessage] = useState("");
  const [sendChannel, setSendChannel] = useState<"Email" | "SMS" | "Video Mail">("Email");
  const [sendDate, setSendDate] = useState("");
  const [sendTime, setSendTime] = useState("09:00");

  // Step 3
  const [savedCard, setSavedCard] = useState<"saved" | "new">("saved");
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvc: "", zip: "" });

  // Step 4
  const [tos, setTos] = useState(false);

  const shipping = SHIPPING.find((s) => s.id === shipId)!;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping.cost + tax;

  const recipientLabel = useMemo(() => {
    if (useNew) return newRecipient.name || "(new recipient)";
    return contacts.find((c) => c.id === contactId)?.name ?? "—";
  }, [useNew, newRecipient.name, contactId, contacts]);

  const greetingPreview = useMemo(() => {
    if (!attachGreeting) return null;
    if (message.trim()) return message.trim();
    const recipient = recipientLabel.split(" ")[0];
    return `Hi ${recipient}, just a quick note — thinking of you and sending warmth your way. Enjoy this little something on me.`;
  }, [attachGreeting, message, recipientLabel]);

  if (items.length === 0) return <Navigate to="/cart" replace />;

  const validateStep = (): boolean => {
    if (step === 0) {
      if (useNew && (!newRecipient.name.trim() || !newRecipient.line1.trim() || !newRecipient.city.trim())) {
        toast.error("Add a name and shipping address."); return false;
      }
      if (!useNew && !contactId) { toast.error("Pick a contact."); return false; }
      return true;
    }
    if (step === 2) {
      if (savedCard === "new") {
        if (card.number.replace(/\s/g,"").length < 16) { toast.error("Card number looks short."); return false; }
        if (!card.name.trim()) { toast.error("Add the name on card."); return false; }
        if (card.exp.length < 5) { toast.error("Add a valid expiry (MM/YY)."); return false; }
        if (card.cvc.length < 3) { toast.error("CVC looks short."); return false; }
      }
      return true;
    }
    if (step === 3 && !tos) { toast.error("Please accept the terms to continue."); return false; }
    return true;
  };

  const next = () => { if (validateStep()) setStep((s) => Math.min(3, s + 1) as StepIdx); };
  const prev = () => setStep((s) => Math.max(0, s - 1) as StepIdx);

  const placeOrder = () => {
    if (!validateStep()) return;
    const order = {
      id: `NFO-26-${Math.floor(1000 + Math.random() * 8999)}`,
      date: new Date().toISOString().slice(0,10),
      status: "placed",
      items: items.map((l) => ({ giftId: l.giftId, name: l.name, variant: l.variant, qty: l.qty, price: l.unitPrice, hue: l.hue })),
      recipient: { name: recipientLabel, address: useNew ? `${newRecipient.line1}, ${newRecipient.city}` : undefined },
      greeting: greetingPreview ?? undefined,
      channel: attachGreeting ? sendChannel : undefined,
      total,
    };
    add(order);
    clear();
    toast.success("Order placed!");
    navigate(`/orders/${order.id}?new=1`);
  };

  // Card formatting helpers
  const fmtCard = (v: string) => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g, "$1 ").trim();
  const fmtExp = (v: string) => {
    const d = v.replace(/\D/g,"").slice(0,4);
    return d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d;
  };

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
      </div>
      <Navigation currentPage="gifts" />

      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-[1200px] space-y-5">
            <header className="flex flex-col gap-2">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-corten">
                <Lock className="h-3 w-3" /> secure · checkout
              </p>
              <h1 className="font-display text-3xl font-semibold tracking-tight">Checkout</h1>
            </header>

            {/* Stepper */}
            <ol className="glass-panel flex items-center gap-2 overflow-x-auto p-3" aria-label="Checkout progress">
              {STEPS.map((label, i) => {
                const done = i < step, active = i === step;
                return (
                  <li key={label} className="flex flex-1 items-center gap-2 min-w-fit">
                    <button onClick={() => i <= step && setStep(i as StepIdx)} disabled={i > step}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition ${
                        active ? "border-corten/60 bg-corten/15 text-corten" :
                        done   ? "border-success/40 bg-success/10 text-success hover:opacity-80" :
                                 "border-border/60 text-muted-foreground"
                      }`}>
                      <span className={`grid h-5 w-5 place-items-center rounded-full font-mono text-[10px] ${active ? "bg-corten text-white" : done ? "bg-success/30" : "bg-card"}`}>
                        {done ? <Check className="h-3 w-3" /> : i + 1}
                      </span>
                      {label}
                    </button>
                    {i < STEPS.length - 1 && <ChevronRight className="hidden h-3 w-3 text-muted-foreground md:block" />}
                  </li>
                );
              })}
            </ol>

            <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                {/* STEP 1 */}
                {step === 0 && (
                  <Card className="glass-panel border-0 p-6 space-y-5">
                    <div>
                      <h2 className="font-display text-lg font-semibold">Who's it for?</h2>
                      <p className="text-xs text-muted-foreground">Pick someone from your contacts or add a new recipient.</p>
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={() => setUseNew(false)} className={`flex-1 rounded-lg border px-3 py-2 text-sm transition ${!useNew ? "border-corten bg-corten/15 text-corten" : "border-border/60"}`}>From contacts</button>
                      <button onClick={() => setUseNew(true)}  className={`flex-1 rounded-lg border px-3 py-2 text-sm transition ${useNew ? "border-corten bg-corten/15 text-corten" : "border-border/60"}`}>New recipient</button>
                    </div>

                    {!useNew ? (
                      contactsLoading ? (
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
                            <label key={c.id} className={`flex items-center gap-3 rounded-lg border p-3 transition cursor-pointer ${contactId === c.id ? "border-corten/60 bg-corten/5" : "border-border/60 hover:border-border"}`}>
                              <RadioGroupItem value={c.id} />
                              <Avatar className="h-9 w-9"><AvatarFallback className="bg-gradient-to-br from-primary to-corten text-[11px] font-semibold text-primary-foreground">{c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback></Avatar>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium">{c.name}</p>
                                <p className="truncate text-xs text-muted-foreground">{c.relationship} · {c.email ?? c.phone}</p>
                              </div>
                            </label>
                          ))}
                        </RadioGroup>
                      )
                    ) : (
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-1.5 md:col-span-2"><Label htmlFor="r-name">Name</Label><Input id="r-name" value={newRecipient.name} onChange={(e)=>setNewRecipient({...newRecipient,name:e.target.value})} /></div>
                        <div className="grid gap-1.5"><Label htmlFor="r-email">Email</Label><Input id="r-email" type="email" value={newRecipient.email} onChange={(e)=>setNewRecipient({...newRecipient,email:e.target.value})} /></div>
                        <div className="grid gap-1.5"><Label htmlFor="r-line">Address</Label><Input id="r-line" value={newRecipient.line1} onChange={(e)=>setNewRecipient({...newRecipient,line1:e.target.value})} placeholder="123 Main St" /></div>
                        <div className="grid gap-1.5"><Label htmlFor="r-city">City</Label><Input id="r-city" value={newRecipient.city} onChange={(e)=>setNewRecipient({...newRecipient,city:e.target.value})} /></div>
                        <div className="grid gap-1.5"><Label htmlFor="r-zip">ZIP</Label><Input id="r-zip" value={newRecipient.zip} onChange={(e)=>setNewRecipient({...newRecipient,zip:e.target.value})} /></div>
                      </div>
                    )}


                    <Separator className="bg-border/50" />
                    <div>
                      <h3 className="font-display text-base font-semibold">Delivery speed</h3>
                      <RadioGroup value={shipId} onValueChange={(v)=>setShipId(v as typeof shipId)} className="mt-3 grid gap-2 md:grid-cols-3">
                        {SHIPPING.map((s) => (
                          <label key={s.id} className={`flex flex-col gap-1 rounded-lg border p-3 cursor-pointer transition ${shipId === s.id ? "border-corten/60 bg-corten/5" : "border-border/60 hover:border-border"}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value={s.id} /><span className="text-sm font-medium">{s.label}</span>
                              </div>
                              <span className="font-mono text-xs tabular-nums">{s.cost === 0 ? "Free" : formatCurrency(s.cost)}</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground">{s.desc}</p>
                          </label>
                        ))}
                      </RadioGroup>
                    </div>
                  </Card>
                )}

                {/* STEP 2 */}
                {step === 1 && (
                  <Card className="glass-panel border-0 p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-display text-lg font-semibold">Add a greeting</h2>
                        <p className="text-xs text-muted-foreground">Pair your gift with a personal message — or skip it.</p>
                      </div>
                      <label className="flex items-center gap-2 text-xs">
                        <Checkbox checked={attachGreeting} onCheckedChange={(v) => setAttachGreeting(!!v)} />
                        Attach a greeting
                      </label>
                    </div>

                    {attachGreeting && (
                      <>
                        <div>
                          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Tone</p>
                          <div className="flex flex-wrap gap-1.5">
                            {TONES.map((t) => (
                              <button key={t} onClick={() => setTone(t)} className={`rounded-full border px-3 py-1 text-xs transition ${tone === t ? "border-corten bg-corten/15 text-corten" : "border-border/60"}`}>{t}</button>
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-1.5">
                          <Label htmlFor="g-msg">Message</Label>
                          <Textarea id="g-msg" rows={5} value={message} onChange={(e)=>setMessage(e.target.value)} placeholder={`Write your own, or leave blank for an AI-drafted ${tone.toLowerCase()} note.`} />
                          <p className="text-[11px] text-muted-foreground">Leave blank to use an AI-drafted message. You'll see a preview on the next step.</p>
                        </div>

                        <Separator className="bg-border/50" />

                        <div>
                          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Delivery channel</p>
                          <RadioGroup value={sendChannel} onValueChange={(v)=>setSendChannel(v as typeof sendChannel)} className="grid gap-2 md:grid-cols-3">
                            {[
                              { v: "Email",      i: Mail,     d: "To the recipient's inbox" },
                              { v: "SMS",        i: Sparkles, d: "A text on the morning of" },
                              { v: "Video Mail", i: Sparkles, d: "AI video with their name" },
                            ].map(({v,i:Ic,d}) => (
                              <label key={v} className={`flex flex-col gap-1 rounded-lg border p-3 cursor-pointer transition ${sendChannel === v ? "border-corten/60 bg-corten/5" : "border-border/60"}`}>
                                <div className="flex items-center gap-2"><RadioGroupItem value={v} /><Ic className="h-4 w-4 text-corten" /><span className="text-sm font-medium">{v}</span></div>
                                <p className="text-[11px] text-muted-foreground">{d}</p>
                              </label>
                            ))}
                          </RadioGroup>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="grid gap-1.5"><Label htmlFor="s-date">Send date</Label><Input id="s-date" type="date" value={sendDate} onChange={(e)=>setSendDate(e.target.value)} /></div>
                          <div className="grid gap-1.5"><Label htmlFor="s-time">Send time</Label><Input id="s-time" type="time" value={sendTime} onChange={(e)=>setSendTime(e.target.value)} /></div>
                        </div>
                      </>
                    )}
                  </Card>
                )}

                {/* STEP 3 */}
                {step === 2 && (
                  <Card className="glass-panel border-0 p-6 space-y-5">
                    <div>
                      <h2 className="font-display text-lg font-semibold">Payment</h2>
                      <p className="text-xs text-muted-foreground">All transactions are encrypted. This is a demo — no real card is charged.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border/60 bg-foreground text-background transition hover:opacity-90" onClick={() => toast.success("Apple Pay authorized (demo)")}>
                        <Apple className="h-5 w-5" fill="currentColor" /> <span className="text-sm font-medium">Pay</span>
                      </button>
                      <button className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border/60 bg-card transition hover:bg-card/70" onClick={() => toast.success("Google Pay authorized (demo)")}>
                        <span className="font-display text-sm font-semibold">G</span> <span className="text-sm font-medium">Pay</span>
                      </button>
                    </div>

                    <div className="relative">
                      <Separator className="bg-border/50" />
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-[10px] uppercase tracking-wider text-muted-foreground">or pay with card</span>
                    </div>

                    <RadioGroup value={savedCard} onValueChange={(v)=>setSavedCard(v as typeof savedCard)} className="space-y-2">
                      <label className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition ${savedCard === "saved" ? "border-corten/60 bg-corten/5" : "border-border/60"}`}>
                        <RadioGroupItem value="saved" />
                        <div className="grid h-8 w-12 place-items-center rounded-md bg-gradient-to-br from-primary to-corten font-mono text-[10px] font-bold text-primary-foreground">VISA</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Visa ending in 4242</p>
                          <p className="text-[11px] text-muted-foreground">Expires 08 / 28</p>
                        </div>
                      </label>
                      <label className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition ${savedCard === "new" ? "border-corten/60 bg-corten/5" : "border-border/60"}`}>
                        <RadioGroupItem value="new" />
                        <CreditCard className="h-5 w-5 text-corten" />
                        <span className="text-sm font-medium">Use a new card</span>
                      </label>
                    </RadioGroup>

                    {savedCard === "new" && (
                      <div className="grid gap-3 md:grid-cols-6">
                        <div className="grid gap-1.5 md:col-span-6"><Label htmlFor="cc-num">Card number</Label><Input id="cc-num" value={card.number} onChange={(e)=>setCard({...card,number:fmtCard(e.target.value)})} placeholder="1234 5678 9012 3456" inputMode="numeric" /></div>
                        <div className="grid gap-1.5 md:col-span-3"><Label htmlFor="cc-name">Name on card</Label><Input id="cc-name" value={card.name} onChange={(e)=>setCard({...card,name:e.target.value})} placeholder="ALEX RIVERA" /></div>
                        <div className="grid gap-1.5 md:col-span-1"><Label htmlFor="cc-exp">Expiry</Label><Input id="cc-exp" value={card.exp} onChange={(e)=>setCard({...card,exp:fmtExp(e.target.value)})} placeholder="MM/YY" /></div>
                        <div className="grid gap-1.5 md:col-span-1"><Label htmlFor="cc-cvc">CVC</Label><Input id="cc-cvc" value={card.cvc} onChange={(e)=>setCard({...card,cvc:e.target.value.replace(/\D/g,"").slice(0,4)})} placeholder="123" /></div>
                        <div className="grid gap-1.5 md:col-span-1"><Label htmlFor="cc-zip">ZIP</Label><Input id="cc-zip" value={card.zip} onChange={(e)=>setCard({...card,zip:e.target.value.replace(/\D/g,"").slice(0,5)})} placeholder="94110" /></div>
                      </div>
                    )}
                  </Card>
                )}

                {/* STEP 4 */}
                {step === 3 && (
                  <Card className="glass-panel border-0 p-6 space-y-5">
                    <div>
                      <h2 className="font-display text-lg font-semibold">Review & place order</h2>
                      <p className="text-xs text-muted-foreground">Edit anything before placing.</p>
                    </div>
                    <ReviewBlock title="Recipient & delivery" onEdit={() => setStep(0)}>
                      <p className="text-sm">{recipientLabel}</p>
                      <p className="text-xs text-muted-foreground">{shipping.label} · {shipping.cost === 0 ? "Free" : formatCurrency(shipping.cost)}</p>
                    </ReviewBlock>
                    <ReviewBlock title="Greeting" onEdit={() => setStep(1)}>
                      {attachGreeting ? (
                        <>
                          <p className="text-xs text-muted-foreground">{tone} · {sendChannel}{sendDate ? ` · ${sendDate} ${sendTime}` : ""}</p>
                          <p className="mt-2 whitespace-pre-wrap rounded-md border border-border/60 bg-background/50 p-3 text-sm">{greetingPreview}</p>
                        </>
                      ) : <p className="text-sm text-muted-foreground">No greeting attached.</p>}
                    </ReviewBlock>
                    <ReviewBlock title="Payment" onEdit={() => setStep(2)}>
                      <p className="text-sm">{savedCard === "saved" ? "Visa ending in 4242" : `Card ending in ${card.number.slice(-4) || "••••"}`}</p>
                    </ReviewBlock>

                    <label className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Checkbox checked={tos} onCheckedChange={(v)=>setTos(!!v)} className="mt-0.5" />
                      <span>I agree to the <Link to="/legal/terms" className="text-corten underline">Terms</Link> and <Link to="/legal/privacy" className="text-corten underline">Privacy Policy</Link>.</span>
                    </label>
                  </Card>
                )}

                <div className="flex items-center justify-between gap-2">
                  <Button variant="ghost" onClick={prev} disabled={step === 0}>
                    <ChevronLeft className="h-4 w-4" /> Back
                  </Button>
                  {step < 3 ? (
                    <Button onClick={next} className="bg-corten text-white hover:bg-corten/90">
                      Continue <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button onClick={placeOrder} className="bg-corten text-white hover:bg-corten/90">
                      <Lock className="h-4 w-4" /> Place order · {formatCurrency(total)}
                    </Button>
                  )}
                </div>
              </div>

              {/* Order summary rail */}
              <Card className="glass-panel sticky top-4 h-fit border-0 p-5">
                <h3 className="font-display text-base font-semibold">Order summary</h3>
                <ul className="mt-4 space-y-3">
                  {items.map((l) => (
                    <li key={l.id} className="flex gap-3">
                      <div className={`relative h-14 w-14 flex-shrink-0 rounded-lg bg-gradient-to-br ${l.hue}`}>
                        <Badge className="absolute -right-1 -top-1 h-5 min-w-5 border-0 bg-foreground px-1 font-mono text-[10px] text-background">{l.qty}</Badge>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-medium">{l.name}</p>
                        {l.variant && <p className="text-[11px] text-muted-foreground">{l.variant}</p>}
                      </div>
                      <span className="text-sm tabular-nums">{formatCurrency(l.qty * l.unitPrice)}</span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-4 bg-border/50" />
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">{formatCurrency(subtotal)}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="tabular-nums">{shipping.cost === 0 ? "Free" : formatCurrency(shipping.cost)}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd className="tabular-nums">{formatCurrency(tax)}</dd></div>
                  <Separator className="my-2 bg-border/50" />
                  <div className="flex items-baseline justify-between"><dt className="font-display text-base font-semibold">Total</dt><dd className="font-display text-xl font-semibold tabular-nums">{formatCurrency(total)}</dd></div>
                </dl>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground"><Truck className="h-3 w-3" /> Arrives {shipping.label.toLowerCase()}</p>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const ReviewBlock = ({ title, children, onEdit }: { title: string; children: React.ReactNode; onEdit: () => void }) => (
  <div className="rounded-xl border border-border/60 p-4">
    <div className="flex items-center justify-between">
      <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{title}</h3>
      <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs" onClick={onEdit}><Edit className="h-3 w-3" /> Edit</Button>
    </div>
    <div className="mt-2">{children}</div>
  </div>
);

export default Checkout;