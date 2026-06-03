import { NavLink } from "react-router-dom";
import { LayoutDashboard, Calendar, Gift, Sparkles, Users } from "lucide-react";

const items = [
  { to: "/dashboard", label: "Home",     icon: LayoutDashboard },
  { to: "/calendar",  label: "Calendar", icon: Calendar },
  { to: "/assistant", label: "AI",       icon: Sparkles },
  { to: "/gifts",     label: "Gifts",    icon: Gift },
  { to: "/contacts",  label: "People",   icon: Users },
];

export const MobileNav = () => (
  <nav
    aria-label="Primary"
    className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
  >
    <ul className="grid grid-cols-5">
      {items.map(({ to, label, icon: Icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`grid h-9 w-9 place-items-center rounded-2xl transition ${
                    isActive ? "bg-gradient-primary text-primary-foreground shadow-soft" : ""
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);