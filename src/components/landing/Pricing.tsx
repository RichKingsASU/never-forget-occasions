import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Plan = {
  name: string;
  monthly: number;
  yearly: number;
  blurb: string;
  features: string[];
  cta: string;
  popular?: boolean;
  enterprise?: boolean;
};

const plans: Plan[] = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    blurb: "For the occasional thoughtful moment.",
    features: ["5 AI greetings / mo", "Unlimited contacts", "Basic reminders", "Email delivery"],
    cta: "Start free",
  },
  {
    name: "Pro",
    monthly: 12,
    yearly: 9,
    blurb: "For people who don't miss a beat.",
    features: [
      "Unlimited AI greetings",
      "AI video templates",
      "SMS & WhatsApp delivery",
      "Full gift marketplace",
      "Calendar sync",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    popular: true,
  },
  {
    name: "Family",
    monthly: 20,
    yearly: 16,
    blurb: "Up to 5 accounts, one shared calendar.",
    features: [
      "Everything in Pro",
      "5 family seats",
      "Shared contacts",
      "Group gifting",
      "Family timeline",
    ],
    cta: "Start 14-day trial",
  },
  {
    name: "Enterprise HR",
    monthly: 0,
    yearly: 0,
    blurb: "For teams celebrating their people.",
    features: [
      "HRIS integrations",
      "Bulk scheduling",
      "Branded greetings",
      "Admin & SSO",
      "Dedicated CSM",
    ],
    cta: "Talk to sales",
    enterprise: true,
  },
];

const faqs = [
  {
    q: "How does the AI generate videos?",
    a: "We combine cinematic templates with an AI script tailored to the recipient, occasion, and tone. You review and approve before anything ships.",
  },
  {
    q: "Can I use my own gifts?",
    a: "Yes. You can ship from our curated marketplace or upload your own gift link — we'll schedule the reminder either way.",
  },
  {
    q: "Is my data private?",
    a: "Always. Contacts and calendars are encrypted at rest, never sold, and you can export or delete anything at any time.",
  },
  {
    q: "Do you support international delivery?",
    a: "Gifts ship to 38 countries via our partners. AI greetings and reminders work anywhere with internet.",
  },
];

export const Pricing = () => {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Pricing</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Honest pricing. Real magic.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when you want unlimited AI videos and the full gift marketplace.
          </p>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-soft">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                !yearly ? "bg-gradient-primary text-primary-foreground shadow-soft" : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                yearly ? "bg-gradient-primary text-primary-foreground shadow-soft" : "text-muted-foreground"
              }`}
            >
              Yearly · save 25%
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-4">
          {plans.map((p) => {
            const price = yearly ? p.yearly : p.monthly;
            return (
              <Card
                key={p.name}
                className={`relative flex flex-col border-0 p-7 transition hover:-translate-y-1 ${
                  p.popular
                    ? "bg-gradient-to-br from-card via-card to-primary/10 shadow-glow ring-2 ring-primary/30"
                    : "bg-card shadow-soft hover:shadow-card"
                }`}
              >
                {p.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 border-0 bg-gradient-primary text-primary-foreground shadow-soft">
                    <Sparkles className="mr-1 h-3 w-3" /> Most popular
                  </Badge>
                )}
                <div>
                  <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    {p.enterprise ? (
                      <span className="font-display text-3xl font-bold">Custom</span>
                    ) : (
                      <>
                        <span className="font-display text-4xl font-bold">${price}</span>
                        <span className="text-sm text-muted-foreground">/mo</span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="my-6 flex-1 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={p.popular ? "hero" : p.enterprise ? "outline" : "outline"}
                  asChild
                >
                  <Link to="/dashboard">{p.cta}</Link>
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="mx-auto mt-20 max-w-3xl">
          <h3 className="text-center font-display text-2xl font-semibold">Frequently asked</h3>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
                <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};