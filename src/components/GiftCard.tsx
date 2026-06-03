import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Gift, Star, Clock, DollarSign, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

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
    <Card
      role="article"
      aria-label={`${name} by ${provider}, ${price} dollars`}
      className="glass-panel glass-inset group relative overflow-hidden p-3 transition hover:border-primary/40"
    >
      {isPopular && (
        <div className="absolute right-2 top-2 z-10">
          <Badge className="h-5 border-0 bg-corten/15 px-1.5 font-mono text-[10px] uppercase tracking-wider text-corten ring-1 ring-corten/40">
            <Star className="mr-1 h-3 w-3" aria-hidden="true" /> popular
          </Badge>
        </div>
      )}

      <div className="relative mb-3 aspect-square overflow-hidden rounded-lg border border-border/40 bg-background/40">
        {image_url ? (
          <img src={image_url} alt={name} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
        ) : (
          <div className="grid h-full w-full place-items-center bg-canvas-grid">
            <Gift className="h-10 w-10 text-primary" aria-hidden="true" />
          </div>
        )}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md border border-border/50 bg-background/70 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur">
          <Clock className="h-3 w-3" aria-hidden="true" /> {deliveryTime}
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="mb-0.5 flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold leading-tight">{name}</h3>
            <div className="font-display text-lg font-semibold tabular-nums text-corten">${price}</div>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{provider} · {category}</p>
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{description}</p>

        <div className="flex flex-wrap gap-1">
          {occasions.slice(0, 3).map((occasion, index) => (
            <Badge key={index} variant="secondary" className="h-5 border border-border/50 bg-background/40 px-1.5 text-[10px]">
              {occasion}
            </Badge>
          ))}
          {occasions.length > 3 && (
            <Badge variant="secondary" className="h-5 border border-border/50 bg-background/40 px-1.5 text-[10px]">+{occasions.length - 3}</Badge>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border/40 pt-2 text-[11px]">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-3 w-3 fill-corten text-corten" aria-hidden="true" />
            <span className="tabular-nums">{rating}</span>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" className="h-7 gap-1 bg-corten text-[11px] text-white hover:bg-corten/90">
                <DollarSign className="h-3 w-3" aria-hidden="true" /> Add ${price}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="glass-panel border-border/70">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-display flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-corten" aria-hidden="true" /> Confirm add-on
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Add <span className="text-foreground">{name}</span> by {provider} to the active greeting?
                  This reserves <span className="text-corten">${price}</span> on your next dispatch.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => toast.success(`${name} attached to greeting · $${price}`)}
                  className="bg-corten text-white hover:bg-corten/90"
                >
                  Attach gift
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
};