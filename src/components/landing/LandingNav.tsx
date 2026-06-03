import { Heart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#marketplace", label: "Marketplace" },
  { href: "#pricing", label: "Pricing" },
];

export const LandingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border/60 bg-background/70 backdrop-blur-xl" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-primary opacity-60 blur-md transition group-hover:opacity-90" />
            <div className="relative grid h-9 w-9 place-items-center rounded-2xl bg-gradient-primary shadow-soft">
              <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
            </div>
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            Never Forget <span className="text-gradient">Occasions</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" asChild className="hidden md:inline-flex">
            <Link to="/dashboard">Sign in</Link>
          </Button>
          <Button variant="hero" asChild className="hidden md:inline-flex">
            <Link to="/dashboard">Start free</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
            <Button variant="hero" asChild className="mt-2 w-full">
              <Link to="/dashboard">Start free</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};