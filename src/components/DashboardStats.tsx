import { Card } from "@/components/ui/card";
import { Video, Clock, CheckCircle, Users } from "lucide-react";

export const DashboardStats = () => {
  const stats = [
    {
      label: "Videos Sent",
      value: "47",
      change: "+12 this month",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      label: "Scheduled",
      value: "23",
      change: "Next 30 days",
      icon: Clock,
      color: "text-blue-600", 
      bgColor: "bg-blue-50"
    },
    {
      label: "Contacts",
      value: "156",
      change: "+8 this month",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      label: "Templates Used",
      value: "12",
      change: "Most popular: Birthday",
      icon: Video,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <Card key={index} className="p-6 hover:shadow-card transition-smooth border-0 shadow-soft group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-spring`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};