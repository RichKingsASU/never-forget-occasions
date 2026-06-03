import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";

const Shell = ({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between p-5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-2xl bg-gradient-primary">
            <Heart className="h-3.5 w-3.5 text-primary-foreground" fill="currentColor" />
          </div>
          <span className="font-display font-bold">NFO</span>
        </Link>
        <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
      </div>
    </header>
    <article className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>
      <div className="prose prose-invert mt-8 max-w-none space-y-6 text-foreground/90 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_li]:my-1">
        {children}
      </div>
    </article>
  </div>
);

export const Terms = () => (
  <Shell title="Terms of Service" updated="June 1, 2026">
    <p>Welcome to Never Forget Occasions ("NFO", "we", "us"). By using our service you agree to these terms.</p>
    <h2>1. Account</h2>
    <p>You're responsible for everything that happens under your account. Keep your password safe.</p>
    <h2>2. Acceptable use</h2>
    <ul>
      <li>No spam, harassment, or unsolicited bulk messaging.</li>
      <li>No content that's unlawful, hateful, or infringes others' rights.</li>
      <li>You own the contact data you import; we only process it to deliver the service.</li>
    </ul>
    <h2>3. Gifts & payments</h2>
    <p>Orders placed through the marketplace are fulfilled by us or our partner creators. All sales are final once an item ships.</p>
    <h2>4. AI content</h2>
    <p>AI-generated greetings are suggestions; you're responsible for reviewing them before they're sent.</p>
    <h2>5. Termination</h2>
    <p>You can cancel anytime in Settings. We may suspend accounts that violate these terms.</p>
    <h2>6. Disclaimer</h2>
    <p>The service is provided "as is". We do our best, but we're not liable for missed occasions caused by third-party outages.</p>
    <h2>7. Contact</h2>
    <p>Reach us at hello@nfo.app.</p>
  </Shell>
);

export const Privacy = () => (
  <Shell title="Privacy Policy" updated="June 1, 2026">
    <p>Your relationships are personal. We treat your data with the care it deserves.</p>
    <h2>What we collect</h2>
    <ul>
      <li>Account info: name, email, password hash.</li>
      <li>Contacts you import: names, emails, birthdays, notes.</li>
      <li>Usage: pages visited, features used (for product improvement).</li>
    </ul>
    <h2>How we use it</h2>
    <ul>
      <li>To deliver greetings, gifts, and reminders you've scheduled.</li>
      <li>To personalize AI suggestions.</li>
      <li>To send service emails (not marketing unless you opt in).</li>
    </ul>
    <h2>Who we share with</h2>
    <p>Only the vendors necessary to deliver your service: fulfillment partners, email/SMS providers, our AI model provider. We never sell your data.</p>
    <h2>Your rights</h2>
    <p>You can export or delete your data at any time from Settings → Account.</p>
    <h2>Contact</h2>
    <p>Privacy questions? Email privacy@nfo.app.</p>
  </Shell>
);

export default Terms;