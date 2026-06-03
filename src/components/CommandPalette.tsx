import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { LayoutDashboard, Calendar, Users, Sparkles, Video, Gift, Store, Settings, Bell, ShoppingCart, FileText, Plus } from "lucide-react";

const items = [
  { group: "Navigate", icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { group: "Navigate", icon: Calendar,        label: "Calendar",  to: "/calendar" },
  { group: "Navigate", icon: Users,           label: "Contacts",  to: "/contacts" },
  { group: "Navigate", icon: Sparkles,        label: "AI Assistant", to: "/assistant" },
  { group: "Navigate", icon: Video,           label: "Templates", to: "/templates" },
  { group: "Navigate", icon: Gift,            label: "Gift Marketplace", to: "/gifts" },
  { group: "Navigate", icon: Store,           label: "Creators",  to: "/creators" },
  { group: "Navigate", icon: ShoppingCart,    label: "Cart",      to: "/cart" },
  { group: "Navigate", icon: Bell,            label: "Notifications", to: "/notifications" },
  { group: "Navigate", icon: Settings,        label: "Settings",  to: "/settings" },
  { group: "Create",   icon: Plus,            label: "New occasion",  to: "/occasions/new" },
  { group: "Create",   icon: Sparkles,        label: "Draft a greeting", to: "/greetings/new" },
  { group: "Account",  icon: FileText,        label: "Terms of Service", to: "/legal/terms" },
  { group: "Account",  icon: FileText,        label: "Privacy Policy",   to: "/legal/privacy" },
];

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const groups = Array.from(new Set(items.map((i) => i.group)));

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, contacts, gifts…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        {groups.map((g, gi) => (
          <div key={g}>
            {gi > 0 && <CommandSeparator />}
            <CommandGroup heading={g}>
              {items.filter((i) => i.group === g).map((i) => {
                const Icon = i.icon;
                return (
                  <CommandItem
                    key={i.label}
                    onSelect={() => { setOpen(false); nav(i.to); }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{i.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;