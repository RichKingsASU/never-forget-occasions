import { useParams, Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Sparkles, Clock, Video } from "lucide-react";

const templates = [
  { id: "warm-birthday",   name: "Warm Birthday",    duration: "30s", tone: "Warm",         tags: ["Birthday"], hue: "from-rose-400/30 to-amber-300/30" },
  { id: "anniversary-cinema", name: "Anniversary Cinema", duration: "45s", tone: "Cinematic", tags: ["Anniversary"], hue: "from-fuchsia-500/30 to-purple-400/30" },
  { id: "promo-hype",      name: "Promotion Hype",   duration: "20s", tone: "Energetic",    tags: ["Career"],   hue: "from-emerald-400/30 to-cyan-400/30" },
  { id: "thank-you-quiet", name: "Quiet Thank You",  duration: "25s", tone: "Heartfelt",    tags: ["Thanks"],   hue: "from-sky-400/30 to-indigo-400/30" },
];

export const TemplateDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const t = templates.find((x) => x.id === id) ?? templates[0];

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="templates" />
      <main className="lg:ml-64">
        <div className="mx-auto max-w-5xl p-6 md:p-10">
          <Link to="/templates" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Templates
          </Link>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card className="overflow-hidden">
              <div className={`relative aspect-video bg-gradient-to-br ${t.hue}`}>
                <button className="absolute inset-0 grid place-items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-card/80 backdrop-blur transition hover:scale-105">
                    <Play className="h-7 w-7 text-foreground" fill="currentColor" />
                  </span>
                </button>
              </div>
              <div className="p-5">
                <div className="flex gap-2">
                  {t.tags.map((x) => <Badge key={x} variant="secondary">{x}</Badge>)}
                  <Badge variant="outline" className="ml-auto"><Clock className="mr-1 h-3 w-3" />{t.duration}</Badge>
                </div>
                <h1 className="mt-3 font-display text-2xl font-bold">{t.name}</h1>
                <p className="mt-1 text-sm text-muted-foreground">Tone: {t.tone}</p>
              </div>
            </Card>

            <div className="space-y-4">
              <Card className="p-5">
                <h2 className="font-display text-lg font-bold">Make it yours</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Customize this template with the recipient's name, your message, and a soundtrack.
                </p>
                <Button variant="hero" className="mt-4 w-full" onClick={() => nav("/assistant")}>
                  <Sparkles className="h-4 w-4" /> Use template
                </Button>
                <Button variant="outline" className="mt-2 w-full">
                  <Video className="h-4 w-4" /> Preview full clip
                </Button>
              </Card>

              <Card className="p-5">
                <h3 className="font-display font-bold">What's included</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  <li>• 4K animated scene</li>
                  <li>• Licensed soundtrack</li>
                  <li>• Editable text & colors</li>
                  <li>• MP4 + GIF export</li>
                </ul>
              </Card>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="mb-3 font-display text-xl font-bold">More like this</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates.filter((x) => x.id !== t.id).map((x) => (
                <Link key={x.id} to={`/templates/${x.id}`} className="group">
                  <Card className="overflow-hidden transition group-hover:shadow-soft">
                    <div className={`aspect-video bg-gradient-to-br ${x.hue}`} />
                    <div className="p-3">
                      <p className="font-medium">{x.name}</p>
                      <p className="text-xs text-muted-foreground">{x.duration} · {x.tone}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TemplateDetail;