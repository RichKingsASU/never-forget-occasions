import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, Copy, RefreshCw, Wand2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TONES = [
  { id: "heartfelt", label: "Heartfelt" },
  { id: "funny", label: "Funny" },
  { id: "romantic", label: "Romantic" },
  { id: "professional", label: "Professional" },
  { id: "family", label: "Family-friendly" },
];

const TEMPLATES: Record<string, (n: string, occ: string, rel: string) => string> = {
  heartfelt: (n, occ, rel) =>
    `Dear ${n},\n\nThere are people you meet in life who quietly become a part of who you are. You are one of those people to me. On your ${occ}, I just want to say thank you — for being the kind of ${rel} who shows up, who listens, who makes the ordinary days feel a little brighter.\n\nI hope this year brings you the soft mornings, the loud laughter, and the slow Sundays you deserve. Here's to you.\n\nWith love,\nMe`,
  funny: (n, occ, _rel) =>
    `${n}!\n\nFun fact: you've now survived another ${occ}, which scientifically makes you 1 year wiser, 1 year cooler, and statistically 7% more likely to fall asleep mid-sentence.\n\nNo gifts, no pressure — just my unwavering admiration for your ability to make every group chat 14% funnier. Don't peak too early today; we both know how that ended last time.\n\nLove you a normal amount,\nMe 🎉`,
  romantic: (n, occ, _rel) =>
    `My ${n},\n\nIf I had to choose a thousand times, I would still choose you — on quiet Tuesdays and chaotic Saturdays, in the kitchen we keep meaning to repaint, on every ${occ} from now until forever.\n\nThank you for being my favorite season, my softest landing, my reason to slow down. Today is yours, but every day after it is ours.\n\nForever,\nMe`,
  professional: (n, occ, _rel) =>
    `Hi ${n},\n\nOn behalf of the entire team, congratulations on your ${occ}. Your work continues to set the bar for what thoughtful, high-craft execution looks like, and your impact is felt across every project you touch.\n\nThank you for the steady leadership and the kindness you bring with it. We're grateful to have you with us — here's to the year ahead.\n\nWarmly,\nThe team`,
  family: (n, occ, rel) =>
    `${n}!\n\nHappy ${occ} from all of us. Being your ${rel} is one of the great joys of my life — the dinners, the inside jokes, the way you remember the small things nobody else notices.\n\nWe hope today is full of cake, hugs, and the people who love you (which, by the way, is a very long list).\n\nLove always,\nThe family`,
};

type Props = {
  trigger?: React.ReactNode;
  initialRecipient?: string;
  initialOccasion?: string;
  initialRelationship?: string;
};

export const GreetingGenerator = ({
  trigger,
  initialRecipient = "",
  initialOccasion = "Birthday",
  initialRelationship = "Friend",
}: Props) => {
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState(initialRecipient);
  const [occasion, setOccasion] = useState(initialOccasion);
  const [relationship, setRelationship] = useState(initialRelationship);
  const [notes, setNotes] = useState("");
  const [tone, setTone] = useState("heartfelt");
  const [output, setOutput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => { if (timerRef.current) window.clearTimeout(timerRef.current); }, []);

  const generate = () => {
    if (!recipient.trim()) {
      toast.error("Add a recipient name to start.");
      return;
    }
    const full = TEMPLATES[tone](recipient.trim(), occasion || "special day", relationship || "friend");
    setOutput("");
    setStreaming(true);
    let i = 0;
    const tick = () => {
      const next = full.slice(0, i + 2);
      setOutput(next);
      i += 2;
      if (i < full.length) {
        timerRef.current = window.setTimeout(tick, 14);
      } else {
        setStreaming(false);
      }
    };
    tick();
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Greeting copied to clipboard");
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="hero">
            <Sparkles className="h-4 w-4" /> Generate greeting
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0">
        <div className="grid md:grid-cols-[1fr,1.15fr]">
          {/* Form side */}
          <div className="border-r border-border/60 p-6">
            <DialogHeader className="space-y-1.5">
              <DialogTitle className="flex items-center gap-2 font-display text-xl">
                <Wand2 className="h-5 w-5 text-primary" />
                AI greeting generator
              </DialogTitle>
              <DialogDescription>
                Draft a personal message in seconds. Choose a tone — we'll do the rest.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="g-recipient">Recipient</Label>
                <Input
                  id="g-recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. Sarah"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="g-occ">Occasion</Label>
                  <Input
                    id="g-occ"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    placeholder="Birthday"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="g-rel">Relationship</Label>
                  <Input
                    id="g-rel"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    placeholder="Friend"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="g-notes">Notes (optional)</Label>
                <Textarea
                  id="g-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Inside jokes, shared memories, the small stuff…"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Tone</Label>
                <div className="flex flex-wrap gap-1.5">
                  {TONES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTone(t.id)}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                        tone === t.id
                          ? "border-transparent bg-gradient-primary text-primary-foreground shadow-soft"
                          : "border-border bg-card text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={generate} variant="hero" className="w-full" disabled={streaming}>
                <Sparkles className="h-4 w-4" />
                {streaming ? "Generating…" : output ? "Regenerate" : "Generate greeting"}
              </Button>
              <p className="text-[11px] text-muted-foreground">
                Demo mode · enable Lovable Cloud to power this with the real Lovable AI gateway.
              </p>
            </div>
          </div>

          {/* Output side */}
          <div className="relative flex flex-col bg-gradient-to-br from-card via-card to-primary/5 p-6">
            <div className="mb-3 flex items-center justify-between">
              <Badge className="border-0 bg-primary/10 text-primary">
                <Sparkles className="mr-1 h-3 w-3" /> Preview
              </Badge>
              <div className="flex gap-1.5">
                <Button size="icon" variant="ghost" onClick={generate} aria-label="Regenerate" disabled={streaming}>
                  <RefreshCw className={`h-4 w-4 ${streaming ? "animate-spin" : ""}`} />
                </Button>
                <Button size="icon" variant="ghost" onClick={copy} aria-label="Copy" disabled={!output}>
                  {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto rounded-2xl border border-border/60 bg-background/60 p-5 backdrop-blur min-h-[280px]">
              {output ? (
                <p className="whitespace-pre-wrap font-display text-[15px] leading-relaxed">
                  {output}
                  {streaming && (
                    <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-primary" />
                  )}
                </p>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10">
                    <Wand2 className="h-5 w-5 text-primary" />
                  </div>
                  <p className="mt-3 text-sm">Your generated message will appear here.</p>
                </div>
              )}
            </div>

            <Button variant="outline" className="mt-4" disabled={!output || streaming}>
              <Send className="h-4 w-4" />
              Schedule & send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};