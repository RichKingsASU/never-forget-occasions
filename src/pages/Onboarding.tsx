import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Check, Upload, Sparkles, Users, Calendar, Gift } from "lucide-react";
import { toast } from "sonner";

const steps = ["Profile", "Tone", "Import contacts", "First occasion"] as const;

export const Onboarding = () => {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [tone, setTone] = useState<string>("Warm");
  const [imported, setImported] = useState(0);

  const next = () => (step === steps.length - 1 ? finish() : setStep(step + 1));
  const finish = () => {
    toast.success("You're all set");
    nav("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 p-6">
      <div className="mx-auto max-w-2xl">
        {/* Stepper */}
        <div className="mb-10 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div
                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold transition ${
                  i <= step ? "bg-gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`h-0.5 flex-1 rounded ${i < step ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        <Card className="p-8">
          <h1 className="font-display text-2xl font-bold">{steps[step]}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {step === 0 && "Tell us about yourself so we can personalize NFO."}
            {step === 1 && "Pick a default voice for AI-written greetings."}
            {step === 2 && "Bring people into NFO. We'll never message them without your approval."}
            {step === 3 && "Schedule something thoughtful for the next 30 days."}
          </p>

          <div className="mt-6 space-y-5">
            {step === 0 && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>First name</Label><Input defaultValue="Alex" /></div>
                  <div className="space-y-2"><Label>Last name</Label><Input defaultValue="Rivera" /></div>
                </div>
                <div className="space-y-2"><Label>Time zone</Label><Input defaultValue="America/Los_Angeles" /></div>
              </>
            )}

            {step === 1 && (
              <div className="grid grid-cols-2 gap-3">
                {["Warm", "Witty", "Heartfelt", "Professional"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      tone === t ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <Sparkles className="mb-2 h-4 w-4 text-primary" />
                    <p className="font-medium">{t}</p>
                    <p className="text-xs text-muted-foreground">
                      {t === "Warm" && "Soft, kind, sincere."}
                      {t === "Witty" && "Playful & clever."}
                      {t === "Heartfelt" && "Deep, vulnerable, real."}
                      {t === "Professional" && "Polished & respectful."}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <>
                <button
                  type="button"
                  onClick={() => { setImported(42); toast.success("Imported 42 contacts (mock)"); }}
                  className="flex w-full items-center gap-4 rounded-2xl border-2 border-dashed border-border p-6 transition hover:border-primary/50 hover:bg-primary/5"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary">
                    <Upload className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Upload CSV</p>
                    <p className="text-sm text-muted-foreground">Name, email, birthday columns supported</p>
                  </div>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline"><Users className="h-4 w-4" />Google Contacts</Button>
                  <Button variant="outline"><Users className="h-4 w-4" />iCloud</Button>
                </div>
                {imported > 0 && (
                  <p className="rounded-xl bg-primary/10 p-3 text-sm">
                    <Check className="mr-2 inline h-4 w-4 text-primary" /> {imported} contacts imported.
                  </p>
                )}
              </>
            )}

            {step === 3 && (
              <div className="grid gap-3">
                {[
                  { i: Calendar, t: "Schedule a birthday", d: "Pick someone & a date" },
                  { i: Gift, t: "Send a thank-you gift", d: "From the marketplace" },
                  { i: Sparkles, t: "Draft with AI", d: "Let us write it for you" },
                ].map(({ i: I, t, d }) => (
                  <Card key={t} className="flex items-center gap-4 p-4">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent">
                      <I className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{t}</p>
                      <p className="text-sm text-muted-foreground">{d}</p>
                    </div>
                    <Button variant="ghost" size="sm">Start</Button>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>
              Back
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={finish}>Skip</Button>
              <Button variant="hero" onClick={next}>
                {step === steps.length - 1 ? "Finish" : "Continue"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;