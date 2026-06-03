import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Wand2, Bot, User, Lightbulb, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type Msg = { id: string; role: "user" | "assistant"; content: string };

const STARTERS = [
  "Draft a heartfelt birthday note for my sister",
  "What gift fits a coffee-loving coworker under $40?",
  "Plan a 14-day countdown for Mom's anniversary",
  "Help me say sorry without sounding corny",
];

const RESPONSES = [
  `Here's a warm draft you can edit:\n\n"You've been the steady in my noisy life — thank you for that. On your day, I'm wishing you slow mornings, loud laughter, and every good thing you keep giving to everyone else."\n\nWant it more playful or more sentimental?`,
  `A few coffee-forward picks under $40:\n\n• Trade Coffee 3-bag sampler — $36\n• Fellow Carter Move travel mug — $35\n• A local roaster gift card — $25\n\nWant me to schedule one with a note?`,
  `Day 14 · order the gift\nDay 7  · finalize the video script\nDay 3  · confirm delivery window\nDay 1  · send the greeting at 8:00 local\n\nI can add these to your calendar.`,
  `Try this — short, honest, no melodrama:\n\n"I got it wrong, and I've been thinking about it. I'm sorry. I'd love to make it right when you're ready."\n\nWant me to soften it or add specifics?`,
];

export const Assistant = () => {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m0",
      role: "assistant",
      content:
        "Hi — I'm your gifting co-pilot. Tell me who you're celebrating and what you want it to feel like. I'll handle the words, the timing, and the gift.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    const userMsg: Msg = { id: `u${Date.now()}`, role: "user", content };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);

    window.setTimeout(() => {
      const reply = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
      setMessages((m) => [...m, { id: `a${Date.now()}`, role: "assistant", content: reply }]);
      setThinking(false);
    }, 900);
  };

  const reset = () => {
    setMessages(messages.slice(0, 1));
    toast.success("Conversation cleared");
  };

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
        <div className="absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-primary/25 blur-[140px]" />
      </div>

      <Navigation currentPage="assistant" />

      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto grid max-w-[1400px] gap-4 xl:grid-cols-[1fr_300px]">
            <Card className="glass-panel flex h-[calc(100dvh-7rem)] flex-col border-0 p-0">
              <header className="flex items-center justify-between border-b border-border/60 px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
                    <Wand2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h1 className="font-display text-lg font-semibold leading-tight">AI Assistant</h1>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      gifting co-pilot · demo mode
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5 text-xs">
                  <RefreshCw className="h-3.5 w-3.5" /> New chat
                </Button>
              </header>

              <div className="flex-1 overflow-y-auto p-5">
                <div className="mx-auto max-w-2xl space-y-5">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                      <div
                        className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-full ${
                          m.role === "user"
                            ? "bg-corten/20 text-corten"
                            : "bg-gradient-primary text-primary-foreground"
                        }`}
                      >
                        {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div
                        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          m.role === "user"
                            ? "bg-corten/15 text-foreground ring-1 ring-corten/30"
                            : "bg-background/60 ring-1 ring-border/60"
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {thinking && (
                    <div className="flex gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="flex items-center gap-1 rounded-2xl bg-background/60 px-4 py-3 ring-1 ring-border/60">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:0ms]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:120ms]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:240ms]" />
                      </div>
                    </div>
                  )}
                  <div ref={endRef} />
                </div>
              </div>

              <div className="border-t border-border/60 p-4">
                <div className="mx-auto flex max-w-2xl items-end gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    rows={1}
                    placeholder="Ask anything — recipient, occasion, vibe…"
                    className="min-h-[44px] resize-none border-border/60 bg-card/60"
                    aria-label="Message the AI assistant"
                  />
                  <Button onClick={() => send()} disabled={!input.trim() || thinking} className="h-11 bg-corten text-white hover:bg-corten/90">
                    <Send className="h-4 w-4" /> Send
                  </Button>
                </div>
              </div>
            </Card>

            <aside className="space-y-3">
              <Card className="glass-panel border-0 p-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-corten" />
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">starters</h2>
                </div>
                <div className="mt-3 space-y-2">
                  {STARTERS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full rounded-lg border border-border/60 bg-background/40 p-3 text-left text-xs leading-relaxed transition hover:border-corten/50 hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="glass-panel border-0 p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">capabilities</h2>
                </div>
                <ul className="mt-3 space-y-2 text-xs">
                  {[
                    "Drafts greetings in 5 distinct tones",
                    "Recommends gifts by budget and vibe",
                    "Plans countdowns and reminders",
                    "Rewrites messages on request",
                  ].map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <Badge className="mt-0.5 h-4 w-4 border-0 bg-primary/15 p-0 text-primary">·</Badge>
                      <span className="text-muted-foreground">{c}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Assistant;