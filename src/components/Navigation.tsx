import { Button } from "@/components/ui/button";
import { Heart, Video, Users, Calendar, Settings, LogOut, Gift } from "lucide-react";
import { Link } from "react-router-dom";

interface NavigationProps {
  currentPage?: string;
}

export const Navigation = ({ currentPage = "dashboard" }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Heart },
    { id: "contacts", label: "Contacts", icon: Users },
    { id: "occasions", label: "Occasions", icon: Calendar },
    { id: "templates", label: "Templates", icon: Video },
    { id: "gifts", label: "Gift Catalog", icon: Gift },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border shadow-card">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Never Forget Occasions
            </h1>
            <p className="text-xs text-muted-foreground">Celebrate every moment</p>
          </div>
        </div>

        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActive
                    ? "bg-gradient-secondary text-primary shadow-soft"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="p-4 bg-gradient-secondary rounded-lg mb-4">
          <h3 className="font-semibold text-sm mb-1">Free Plan</h3>
          <p className="text-xs text-muted-foreground mb-2">5/10 videos sent this month</p>
          <Button size="sm" variant="gradient" className="w-full">
            Upgrade to Pro
          </Button>
        </div>
        
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </nav>
  );
};