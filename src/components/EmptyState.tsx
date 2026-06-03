import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
}

export const EmptyState = ({ icon: Icon, title, description, actionLabel, actionTo, onAction }: EmptyStateProps) => (
  <div className="grid place-items-center rounded-3xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
    <div className="relative">
      <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-2xl" />
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary shadow-soft">
        <Icon className="h-7 w-7 text-primary-foreground" />
      </div>
    </div>
    <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
    {actionLabel && (actionTo ? (
      <Button asChild variant="hero" className="mt-5"><Link to={actionTo}>{actionLabel}</Link></Button>
    ) : (
      <Button variant="hero" className="mt-5" onClick={onAction}>{actionLabel}</Button>
    ))}
  </div>
);