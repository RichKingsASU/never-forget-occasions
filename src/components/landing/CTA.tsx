import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const CTA = () => (
  <section className="relative py-24">
    <div className="mx-auto max-w-5xl px-4 md:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-gradient-to-br from-primary/15 via-card to-accent/10 p-10 shadow-premium md:p-16">
        <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-primary opacity-40 blur-3xl" />
        <div aria-hidden className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent opacity-30 blur-3xl" />
        <div className="relative text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Be the friend who always <span className="text-gradient-hero">remembers</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Free forever for 5 greetings a month. Upgrade only when you want to be unforgettable.
          </p>
          <Button size="lg" variant="hero" asChild className="mt-8">
            <Link to="/dashboard">
              Start free · no card required
              <Sparkles className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);