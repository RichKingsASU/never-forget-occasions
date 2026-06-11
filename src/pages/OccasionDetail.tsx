import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar as CalIcon, Sparkles, Send, Copy, Trash2, Package, ChevronRight, Loader2 } from "lucide-react";
import { formatDate, daysUntil } from "@/lib/mock-data";
import { GreetingGenerator } from "@/components/ai/GreetingGenerator";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useOccasion, useDeleteOccasion } from "@/hooks/useOccasions";
import { useContact } from "@/hooks/useContacts";

export const OccasionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: o, isLoading: occasionLoading, error: occasionError } = useOccasion(id);
  const { data: contact, isLoading: contactLoading } = useContact(o?.contact_id);

  const deleteOccasionMutation = useDeleteOccasion();

  if (occasionLoading || contactLoading) {
    return (
      <div className="dark min-h-dvh bg-background text-foreground flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-corten" />
      </div>
    );
  }

  if (occasionError || !o || !contact) {
    toast.error("Occasion not found");
    return <Navigate to="/calendar" replace />;
  }

  const d = daysUntil(o.date);
  const pct = Math.max(0, Math.min(100, 100 - (d / 60) * 100));

  const handleDelete = async () => {
    try {
      await deleteOccasionMutation.mutateAsync({ id: o.id, contactId: o.contact_id });
      toast.success("Occasion deleted");
      navigate("/calendar");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete occasion");
    }
  };

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
      </div>
      <Navigation currentPage="calendar" />

      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-[1100px] space-y-5">
            <Button asChild variant="ghost" size="sm" className="gap-1.5"><Link to="/calendar"><ArrowLeft className="h-4 w-4" /> Calendar</Link></Button>

            <Card className="glass-panel border-0 p-6">
              <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-5">
                  <div className="relative h-20 w-20">
                    <svg viewBox="0 0 36 36" className="h-20 w-20">
                      <path className="text-border" d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32" fill="none" stroke="currentColor" strokeWidth="2.5" />
                      <path className="text-corten" d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray={`${pct}, 100`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-display text-lg font-semibold tabular-nums">{d}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-corten">{o.type}</p>
                    <h1 className="font-display text-3xl font-semibold tracking-tight">{contact.name}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">{formatDate(o.date)} · in {d} days</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline"><CalIcon className="h-4 w-4" /> Edit</Button>
                  <Button variant="ghost" onClick={() => toast.success("Occasion duplicated")}><Copy className="h-4 w-4" /> Duplicate</Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /> Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this occasion?</AlertDialogTitle>
                        <AlertDialogDescription>This cancels the scheduled greeting and any attached gifts. You can't undo this.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>

            <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
              <Card className="glass-panel border-0 p-6">
                <h2 className="font-display text-lg font-semibold">Scheduled greeting</h2>
                <p className="mt-2 text-xs text-muted-foreground">Email · sends 09:00 local on {formatDate(o.date)}</p>
                <p className="mt-4 whitespace-pre-wrap rounded-lg border border-border/60 bg-background/40 p-4 text-sm leading-relaxed">
                  {`Hi ${contact.name.split(" ")[0]},\n\nA small note on your ${o.type.toLowerCase()} — thinking of you and hoping today brings you a little more of what you love. Here's to you.\n\nWith love.`}
                </p>
                <div className="mt-4 flex gap-2">
                  <GreetingGenerator initialRecipient={contact.name} initialOccasion={o.type} trigger={
                    <Button variant="outline"><Sparkles className="h-4 w-4" /> Edit with AI</Button>
                  } />
                  <Button className="bg-corten text-white hover:bg-corten/90" onClick={() => toast.success("Greeting dispatched now")}><Send className="h-4 w-4" /> Dispatch now</Button>
                </div>
              </Card>
              <div className="space-y-3">
                <Card className="glass-panel border-0 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Status</p>
                  <Badge className={`mt-2 h-6 border-0 px-2 font-mono text-[10px] uppercase ${o.status === "scheduled" ? "bg-success/15 text-success" : o.status === "queued" ? "bg-primary/15 text-primary" : "bg-corten/15 text-corten"}`}>{o.status}</Badge>
                </Card>
                <Card className="glass-panel border-0 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Attached gift</p>
                  <>
                    <p className="mt-2 text-sm text-muted-foreground">No gift attached.</p>
                    <Button asChild size="sm" className="mt-3 w-full bg-corten text-white hover:bg-corten/90">
                      <Link to="/gifts">Browse gifts <ChevronRight className="h-3.5 w-3.5" /></Link>
                    </Button>
                  </>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OccasionDetail;