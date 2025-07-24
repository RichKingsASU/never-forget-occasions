import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail, Phone, Edit, Gift } from "lucide-react";

interface ContactCardProps {
  name: string;
  email?: string;
  phone?: string;
  relationship: string;
  nextOccasion?: {
    event: string;
    date: string;
    daysUntil: number;
  };
  avatar?: string;
}

export const ContactCard = ({ 
  name, 
  email, 
  phone, 
  relationship, 
  nextOccasion, 
  avatar 
}: ContactCardProps) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <Card className="p-6 hover:shadow-card transition-smooth border-0 shadow-soft">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-gradient-primary text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{relationship}</p>
          </div>
        </div>
        
        <Button variant="ghost" size="sm">
          <Edit className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2 mb-4">
        {email && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            {email}
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4" />
            {phone}
          </div>
        )}
      </div>

      {nextOccasion && (
        <div className="p-3 bg-gradient-secondary rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{nextOccasion.event}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {nextOccasion.date} • {nextOccasion.daysUntil} days away
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="gradient" size="sm" className="flex-1">
          Send Greeting
        </Button>
        <Button variant="outline" size="sm">
          Add Occasion
        </Button>
      </div>
    </Card>
  );
};