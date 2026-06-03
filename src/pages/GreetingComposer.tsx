import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Check, Copy, RefreshCw, Sparkles, Wand2, Send, Play } from "lucide-react";
import { toast } from "sonner";

const TEMPLATES = [
  { id: "t1", title: "Confetti Pop",  vibe: "Playful · upbeat",   hue: "from-corten/40 to-primary/30" },
  { id: "t2", title: "Slow Sunday",   vibe: "Cinematic · warm",   hue: "from-primary/40 to-accent/30" },
  { id: "t3", title: "Holiday Hearth",vibe: "Cozy · nostalgic",   hue: "from-corten/50 to-amber-500/30" },
  { id: "t4", title: "First Day",     vibe: "Hopeful · sunrise",  hue: "from-accent/40 to-primary/30" },
  { id: "t5", title: "Quiet Note",    vibe: "Minimal · intimate", hue: "from-muted to-primary/20" },
  { id: "t6", title: "Big Reveal",    vibe: "Bold · cinematic",   hue: "from-corten/50 to-primary/40" },
];

const TONES = ["Heartfelt","Funny","Romantic","Professional","Family-friendly"];

const TEMPLATE_GREETING = (n: string, occ: string, tone: string) =>
  `Dear ${n || "you"},\n\nThis is a ${tone.toLowerCase()} note on your ${occ.toLowerCase()}. You make the small days feel bright and the big ones feel safe — thank you for both. Today is yours, and I'm cheering you on from wherever I am.\n\nWith love,\nMe`;

const STEPS = ["Template","Details","Preview","Schedule"];

export const GreetingComposer = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(params.get("template") ? 1 : 0);

  const [templateId, setTemplateId] = useState(params.get("template") ?? "t1");
  const [recipient, setRecipient] = useState("");
  const [occasion, setOccasion] = useState("Birthday");
  const [tone, setTone] = useState("Heartfelt");
  const [notes, setNotes] = useState("");

  const [output, setOutput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const timerRef = useRef<number | null>(null);

  const [channel, setChannel] = useState("Email");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");

  const template = TEMPLATES.find((t) => t.id === templateId);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const stream = () => {
    if (!recipient.trim()) { toast.error("Add a recipient name"); return; }
    const full = TEMPLATE_GREETING(recipient.trim(), occasion, tone);
    setOutput(""); setStreaming(true);
    let i = 0;
    const tick = () => {
      i += 2; setOutput(full.slice(0, i));
      if (i < full.length) timerRef.current = window.setTimeout(tick, 14);
      else setStreaming(false);
    };
    tick();
  };

  const next = () => {
    if (step === 1 && !recipient.trim()) { toast.error("Add a recipient first"); return; }
    if (step === 2 && !output) { stream(); return; }
    setStep((s) => Math.min(3, s + 1));
  };

  const submit = () => {
    if (!date) { toast.error("Pick a send date"); return; }
    toast.success(`Greeting scheduled · ${date} ${time}`);
    navigate("/dashboard");
  };

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
      </div>
      <Navigation currentPage="assistant" />

      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-4xl space-y-5">
            <Button asChild variant="ghost" size="sm" className="gap-1.5"><Link to="/dashboard"><ArrowLeft className="h-4 w-4" /> Dashboard</Link></Button>

            <header>
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-corten">
                <Wand2 className="h-3 w-3" /> greeting · composer
              </p>
              <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Compose a greeting</h1>
              <p className="mt-1 text-sm text-muted-foreground">Pick a look, give us the moment, we'll write it.</p>
            </header>

            <ol className="glass-panel flex items-center gap-1 overflow-x-auto p-2">
              {STEPS.map((s, i) => (
                <li key={s} className={`flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${i === step ? "bg-corten/15 text-corten" : i < step ? "text-success" : "text-muted-foreground"}`}>
                  <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${i === step ? "bg-corten text-white" : i < step ? "bg-success/30" : "bg-card"}`}>{i < step ? <Check className="h-3 w-3" /> : i+1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>

            <Card className="glass-panel border-0 p-6">
              {step === 0 && (
                <div className="space-y-4">
                  <h2 className="font-display text-lg font-semibold">Pick a template</h2>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {TEMPLATES.map((t) => (
                      <button key={t.id} onClick={() => setTemplateId(t.id)} className={`overflow-hidden rounded-xl border text-left transition ${templateId === t.id ? "border-corten ring-2 ring-corten/40" : "border-border/60 hover:border-border"}`}>
                        <div className={`relative aspect-video bg-gradient-to-br ${t.hue}`}>
                          <div className="absolute inset-0 grid place-items-center"><Play className="h-6 w-6 text-white/80" fill="currentColor" /></div>
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-medium">{t.title}</p>
                          <p className="text-[11px] text-muted-foreground">{t.vibe}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-display text-lg font-semibold">Tell us about the moment</h2>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-1.5"><Label htmlFor="r">Recipient</Label><Input id="r" value={recipient} onChange={(e)=>setRecipient(e.target.value)} placeholder="e.g. Sarah" /></div>
                    <div className="grid gap-1.5"><Label>Occasion</Label>
                      <Select value={occasion} onValueChange={setOccasion}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["Birthday","Anniversary","Promotion","Housewarming","Holiday","Mother's Day","Father's Day","Just because"].map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Tone</p>
                    <div className="flex flex-wrap gap-1.5">
                      {TONES.map((t) => (
                        <button key={t} onClick={()=>setTone(t)} className={`rounded-full border px-3 py-1 text-xs transition ${tone === t ? "border-corten bg-corten/15 text-corten" : "border-border/60"}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-1.5"><Label htmlFor="n">Notes (optional)</Label><Textarea id="n" rows={3} value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Inside jokes, shared memories, anything that should land in the message." /></div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg font-semibold">Preview</h2>
                    <div className="flex gap-1.5">
                      <Button size="sm" variant="ghost" onClick={stream} disabled={streaming}><RefreshCw className={`h-3.5 w-3.5 ${streaming ? "animate-spin" : ""}`} /> {output ? "Regenerate" : "Generate"}</Button>
                      <Button size="sm" variant="ghost" disabled={!output} onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied"); }}><Copy className="h-3.5 w-3.5" /> Copy</Button>
                    </div>
                  </div>
                  <div className={`overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br ${template?.hue}`}>
                    <div className="bg-background/80 backdrop-blur p-6">
                      {output ? (
                        <Textarea value={output} onChange={(e)=>setOutput(e.target.value)} rows={9} className="resize-none border-0 bg-transparent font-display text-[15px] leading-relaxed focus-visible:ring-0" />
                      ) : (
                        <div className="grid h-48 place-items-center text-center text-sm text-muted-foreground">
                          <div>
                            <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-corten/15 text-corten"><Sparkles className="h-4 w-4" /></div>
                            <p className="mt-3">Hit Generate and we'll draft the message.</p>
                            <Button size="sm" className="mt-3 bg-corten text-white hover:bg-corten/90" onClick={stream}><Sparkles className="h-4 w-4" /> Generate</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="font-display text-lg font-semibold">Schedule delivery</h2>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="grid gap-1.5"><Label>Channel</Label>
                      <Select value={channel} onValueChange={setChannel}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["Email","SMS","Video Mail","Slack"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1.5"><Label htmlFor="d">Date</Label><Input id="d" type="date" value={date} onChange={(e)=>setDate(e.target.value)} /></div>
                    <div className="grid gap-1.5"><Label htmlFor="tm">Time</Label><Input id="tm" type="time" value={time} onChange={(e)=>setTime(e.target.value)} /></div>
                  </div>
                  <Separator className="bg-border/50" />
                  <Card className="border-0 bg-background/40 p-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Summary</p>
                    <div className="mt-2 grid gap-1 text-sm">
                      <p><span className="text-muted-foreground">Template ·</span> {template?.title}</p>
                      <p><span className="text-muted-foreground">To ·</span> {recipient} ({occasion})</p>
                      <p><span className="text-muted-foreground">Tone ·</span> {tone}</p>
                      <p><span className="text-muted-foreground">Delivery ·</span> {channel}{date ? ` · ${date} ${time}` : ""}</p>
                    </div>
                  </Card>
                </div>
              )}
            </Card>

            <div className="flex items-center justify-between">
              <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s)=>Math.max(0,s-1))}><ArrowLeft className="h-4 w-4" /> Back</Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next} className="bg-corten text-white hover:bg-corten/90">
                  {step === 2 && !output ? <><Sparkles className="h-4 w-4" /> Generate</> : <>Continue <ArrowRight className="h-4 w-4" /></>}
                </Button>
              ) : (
                <Button onClick={submit} className="bg-corten text-white hover:bg-corten/90"><Send className="h-4 w-4" /> Schedule greeting</Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GreetingComposer;