import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, ShoppingCart, Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCart } from "@/context/CartContext";

const openPalette = () => {
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
};

export const AppHeader = () => {
  const nav = useNavigate();
  const { count } = useCart();

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-primary shadow-soft">
            <Heart className="h-3.5 w-3.5 text-primary-foreground" fill="currentColor" />
          </div>
          <span className="font-display text-sm font-bold">NFO</span>
        </Link>
        <div className="flex items-center gap-1">
          <IconButton ariaLabel="Search" onClick={openPalette}><Search className="h-4 w-4" /></IconButton>
          <IconButton ariaLabel="Cart" onClick={() => nav("/cart")} badge={count}>
            <ShoppingCart className="h-4 w-4" />
          </IconButton>
          <IconButton ariaLabel="Notifications" onClick={() => nav("/notifications")} badge={3}>
            <Bell className="h-4 w-4" />
          </IconButton>
          <AvatarMenu />
        </div>
      </header>

      {/* Desktop floating cluster */}
      <div className="fixed right-6 top-5 z-30 hidden items-center gap-1.5 rounded-full border border-border bg-card/70 p-1 shadow-soft backdrop-blur lg:flex">
        <button
          onClick={openPalette}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <Search className="h-3.5 w-3.5" />
          Search
          <kbd className="ml-2 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">⌘K</kbd>
        </button>
        <IconButton ariaLabel="Cart" onClick={() => nav("/cart")} badge={count}>
          <ShoppingCart className="h-4 w-4" />
        </IconButton>
        <IconButton ariaLabel="Notifications" onClick={() => nav("/notifications")} badge={3}>
          <Bell className="h-4 w-4" />
        </IconButton>
        <AvatarMenu />
      </div>
    </>
  );
};

const IconButton = ({
  children,
  ariaLabel,
  onClick,
  badge,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  badge?: number;
}) => (
  <button
    aria-label={ariaLabel}
    onClick={onClick}
    className="relative grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
  >
    {children}
    {badge && badge > 0 ? (
      <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-semibold text-primary-foreground">
        {badge > 9 ? "9+" : badge}
      </span>
    ) : null}
  </button>
);

const AvatarMenu = () => {
  const nav = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label="Account" className="ml-1 rounded-full ring-offset-background transition hover:ring-2 hover:ring-primary/30 hover:ring-offset-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-primary text-xs font-semibold text-primary-foreground">AR</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>Alex Rivera</span>
          <span className="text-xs font-normal text-muted-foreground">alex@nfo.app</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => nav("/settings")}>Profile & settings</DropdownMenuItem>
        <DropdownMenuItem onClick={() => nav("/orders")}>Orders</DropdownMenuItem>
        <DropdownMenuItem onClick={() => nav("/notifications")}>Notifications</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => nav("/legal/terms")}>Terms</DropdownMenuItem>
        <DropdownMenuItem onClick={() => nav("/legal/privacy")}>Privacy</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => nav("/auth")} className="text-destructive">Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};