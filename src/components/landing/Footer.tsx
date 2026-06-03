import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const cols = [
  {
    title: "Product",
    items: ["Features", "AI Videos", "Marketplace", "Pricing", "Changelog"],
  },
  {
    title: "Company",
    items: ["About", "Careers", "Press", "Contact", "Partners"],
  },
  {
    title: "Resources",
    items: ["Help center", "Community", "API docs", "Status", "Brand"],
  },
  {
    title: "Legal",
    items: ["Privacy", "Terms", "Cookies", "Security", "DPA"],
  },
];

export const Footer = () => (
  <footer className="border-t border-border/60 bg-card/40">
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="grid gap-12 md:grid-cols-[1.4fr,3fr]">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-primary shadow-soft">
              <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="font-display text-lg font-bold">
              Never Forget <span className="text-gradient">Occasions</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Emotional intelligence as a service. Built in Stockholm and San Francisco.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="font-display text-sm font-semibold">{c.title}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {c.items.map((it) => (
                  <li key={it}>
                    <a href="#" className="text-muted-foreground transition hover:text-foreground">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
        <p>© 2026 Never Forget Occasions, Inc. All rights reserved.</p>
        <p>Made with care · v2.0</p>
      </div>
    </div>
  </footer>
);