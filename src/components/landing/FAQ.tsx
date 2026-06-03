import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Will NFO send anything without my approval?", a: "Never. Every greeting and gift requires your one-tap approval before it goes out — unless you explicitly turn on full automation for a specific recipient." },
  { q: "Where do the gifts ship from?", a: "From our network of vetted independent creators across North America and Europe. Most orders ship within 1–2 business days." },
  { q: "Can I write my own greetings instead of using AI?", a: "Yes. AI is the default for speed, but every draft is editable and you can compose from scratch in the Greeting Composer." },
  { q: "Does NFO read my contacts or calendar?", a: "Only what you import. We never sync silently — you choose what comes in and you can delete anything anytime in Settings." },
  { q: "What happens if I miss a payment?", a: "Scheduled greetings still send. Gift orders pause until your card is updated, and we'll notify you 48 hours before the occasion." },
  { q: "Can I share NFO with my family?", a: "Family plans support up to 5 members with a shared occasion calendar and gift history. Available on the Pro tier." },
];

export const FAQ = () => (
  <section id="faq" className="border-t border-border bg-background py-24">
    <div className="mx-auto max-w-3xl px-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">FAQ</p>
        <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
          Questions, <span className="text-gradient">answered.</span>
        </h2>
      </header>

      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);