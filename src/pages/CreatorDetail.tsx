import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, MapPin, Package } from "lucide-react";

const creators = [
  { id: "atelier-rose", name: "Atelier Rose",     location: "Brooklyn, NY",   rating: 4.9, reviews: 312, specialty: "Florals & Bouquets",  hue: "from-rose-400/30 to-pink-400/30",     bio: "Hand-tied bouquets composed daily with seasonal market flowers." },
  { id: "harvest-co",   name: "Harvest Co.",      location: "Portland, OR",   rating: 4.8, reviews: 207, specialty: "Artisan Food Boxes",  hue: "from-amber-400/30 to-orange-400/30",  bio: "Small-batch jams, granolas, and chocolates from PNW makers." },
  { id: "north-paper",  name: "North Paper",      location: "Toronto, ON",    rating: 4.9, reviews: 145, specialty: "Letterpress Stationery", hue: "from-indigo-400/30 to-sky-400/30", bio: "Cotton paper, hand-set type, debossed by foot-treadle press." },
  { id: "studio-ko",    name: "Studio Ko",        location: "Lisbon, PT",     rating: 4.7, reviews: 89,  specialty: "Ceramic Vessels",     hue: "from-stone-400/30 to-emerald-400/30", bio: "Wheel-thrown stoneware finished with a signature matte glaze." },
];

export const CreatorDetail = () => {
  const { id } = useParams();
  const c = creators.find((x) => x.id === id) ?? creators[0];

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="creators" />
      <main className="lg:ml-64">
        <div className="mx-auto max-w-5xl p-6 md:p-10">
          <Link to="/creators" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Creators
          </Link>

          <Card className="overflow-hidden">
            <div className={`h-48 bg-gradient-to-br ${c.hue}`} />
            <div className="p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="font-display text-3xl font-bold">{c.name}</h1>
                  <p className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{c.location}</span>
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-current text-amber-500" />{c.rating} · {c.reviews} reviews</span>
                  </p>
                  <Badge variant="secondary" className="mt-3">{c.specialty}</Badge>
                </div>
                <Button variant="hero">Follow creator</Button>
              </div>
              <p className="mt-5 max-w-2xl text-muted-foreground">{c.bio}</p>
            </div>
          </Card>

          <section className="mt-8">
            <h2 className="mb-3 font-display text-xl font-bold">From {c.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden transition hover:shadow-soft">
                  <div className={`aspect-square bg-gradient-to-br ${c.hue}`} />
                  <div className="p-3">
                    <p className="font-medium">Signature piece {i}</p>
                    <p className="text-xs text-muted-foreground">$48 · Ships in 2 days</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { i: Package, t: "Carbon-neutral", d: "Offset shipping on every order." },
              { i: Star,    t: "Top-rated",      d: "Maintained 4.7+ for 12 months." },
              { i: MapPin,  t: "Local-first",    d: "Sourced within 200mi when possible." },
            ].map(({ i: I, t, d }) => (
              <Card key={t} className="p-5">
                <I className="h-5 w-5 text-primary" />
                <p className="mt-3 font-medium">{t}</p>
                <p className="text-sm text-muted-foreground">{d}</p>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default CreatorDetail;