import { Button } from "@/components/ui/button";
import {
  Heart,
  Video,
  Users,
  Calendar,
  Settings,
  LogOut,
  Gift,
  LayoutDashboard,
  Sparkles,
  Store,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AppHeader } from "@/components/AppHeader";
import { MobileNav } from "@/components/MobileNav";

interface NavigationProps {
  currentPage?: string;
}

const items = [
  { id: "dashboard", to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "calendar", to: "/calendar", label: "Calendar", icon: Calendar },
  { id: "contacts", to: "/contacts", label: "Contacts", icon: Users },
  { id: "assistant", to: "/assistant", label: "AI Assistant", icon: Sparkles },
  { id: "templates", to: "/templates", label: "Video Templates", icon: Video },
  { id: "gifts", to: "/gifts", label: "Gift Marketplace", icon: Gift },
  { id: "creators", to: "/creators", label: "Creators", icon: Store },
  { id: "settings", to: "/settings", label: "Settings", icon: Settings },
];

export const Navigation = ({ currentPage = "dashboard" }: NavigationProps) => (
  <>
    <AppHeader />
    <MobileNav />
  <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-border bg-sidebar lg:flex lg:flex-col">
    <div className="flex-1 overflow-y-auto p-5">
      <Link to="/" className="mb-7 flex items-center gap-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-primary shadow-soft">
          <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
        </div>
        <div>
          <p className="font-display text-base font-bold leading-tight">
            Never Forget <span className="text-gradient">Occasions</span>
          </p>
          <p className="text-[11px] text-muted-foreground">Celebrate every moment</p>
        </div>
      </Link>

      <nav className="space-y-1" aria-label="Dashboard">
        {items.map((it) => {
          const Icon = it.icon;
          const active = currentPage === it.id;
          return (
            <Link
              key={it.id}
              to={it.to}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-gradient-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
    </div>

    <div className="border-t border-border p-5">
      <div className="mb-3 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-4">
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-semibold">Free plan</p>
          <span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            5 / 10
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 rounded-full bg-gradient-primary" />
        </div>
        <Button size="sm" variant="hero" className="mt-3 w-full">
          Upgrade to Pro
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" className="justify-start">
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
        <ThemeToggle />
      </div>
    </div>
  </aside>
  </>
);