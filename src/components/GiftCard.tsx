import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Star, Clock, DollarSign } from "lucide-react";

interface GiftCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url?: string;
  provider: string;
  occasions: string[];
  description: string;
  rating?: number;
  isPopular?: boolean;
  deliveryTime?: string;
}

export const GiftCard = ({ 
  name, 
  category, 
  price, 
  image_url, 
  provider, 
  occasions, 
  description, 
  rating = 4.5,
  isPopular = false,
  deliveryTime = "Instant"
}: GiftCardProps) => {
  return (
    <Card className="p-4 hover:shadow-card transition-smooth border-0 shadow-soft group relative overflow-hidden">
      {isPopular && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-gradient-primary text-white text-xs">
            <Star className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}
      
      <div className="aspect-square bg-gradient-secondary rounded-lg mb-4 relative overflow-hidden group-hover:scale-105 transition-spring">
        {image_url ? (
          <img 
            src={image_url} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Gift className="w-12 h-12 text-primary" />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-foreground text-sm leading-tight">{name}</h3>
            <div className="text-lg font-bold text-primary">${price}</div>
          </div>
          <p className="text-xs text-muted-foreground">{provider}</p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-1">
          {occasions.slice(0, 3).map((occasion, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {occasion}
            </Badge>
          ))}
          {occasions.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{occasions.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{deliveryTime}</span>
          </div>
        </div>

        <Button className="w-full" variant="gradient" size="sm">
          <DollarSign className="w-4 h-4" />
          Add to Greeting
        </Button>
      </div>
    </Card>
  );
};