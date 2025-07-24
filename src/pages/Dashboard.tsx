import { Navigation } from "@/components/Navigation";
import { DashboardStats } from "@/components/DashboardStats";
import { ContactCard } from "@/components/ContactCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Gift, Calendar, Bell } from "lucide-react";

export const Dashboard = () => {
  const upcomingOccasions = [
    {
      name: "Sarah Chen",
      event: "Birthday",
      date: "March 15",
      daysUntil: 3,
      status: "scheduled"
    },
    {
      name: "Mom",
      event: "Mother's Day", 
      date: "May 12",
      daysUntil: 45,
      status: "pending"
    },
    {
      name: "John & Lisa",
      event: "Anniversary",
      date: "April 8",
      daysUntil: 28,
      status: "scheduled"
    }
  ];

  const recentContacts = [
    {
      name: "Sarah Chen",
      email: "sarah@email.com",
      relationship: "Friend",
      nextOccasion: {
        event: "Birthday",
        date: "March 15",
        daysUntil: 3
      },
      avatar: ""
    },
    {
      name: "Michael Rodriguez",
      email: "michael@email.com", 
      phone: "+1 (555) 123-4567",
      relationship: "Colleague",
      nextOccasion: {
        event: "Work Anniversary",
        date: "March 22",
        daysUntil: 10
      },
      avatar: ""
    },
    {
      name: "Emma Thompson",
      email: "emma@email.com",
      relationship: "Sister",
      nextOccasion: {
        event: "Graduation",
        date: "May 15",
        daysUntil: 48
      },
      avatar: ""
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="dashboard" />
      
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back! 👋</h1>
              <p className="text-muted-foreground">You have 5 upcoming occasions this month</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Calendar className="w-4 h-4" />
                View Calendar
              </Button>
              <Button variant="gradient">
                <Plus className="w-4 h-4" />
                Add Contact
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Upcoming Occasions */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Upcoming Occasions</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              
              <div className="space-y-4">
                {upcomingOccasions.map((occasion, index) => (
                  <Card key={index} className="p-4 hover:shadow-card transition-smooth border-0 shadow-soft">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                          <Gift className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{occasion.name}</h3>
                          <p className="text-sm text-muted-foreground">{occasion.event} • {occasion.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{occasion.daysUntil} days</p>
                          <p className={`text-xs px-2 py-1 rounded-full ${
                            occasion.status === 'scheduled' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {occasion.status}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Bell className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Contacts */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Recent Contacts</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              
              <div className="space-y-4">
                {recentContacts.slice(0, 2).map((contact, index) => (
                  <ContactCard key={index} {...contact} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};