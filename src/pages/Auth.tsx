import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Heart, Sparkles, Gift, Calendar } from "lucide-react";
import { toast } from "sonner";

export const Auth = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent, mode: "sign-in" | "sign-up") => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(mode === "sign-up" ? "Welcome to NFO" : "Welcome back");
      nav(mode === "sign-up" ? "/onboarding" : "/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Brand side */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/30 p-12 lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-primary shadow-soft">
            <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
          </div>
          <p className="font-display text-base font-bold">
            Never Forget <span className="text-gradient">Occasions</span>
          </p>
        </Link>
        <div className="relative z-10 space-y-6">
          <h1 className="font-display text-4xl font-bold leading-tight">
            Never miss a moment that matters.
          </h1>
          <p className="max-w-md text-muted-foreground">
            Automate thoughtful greetings, schedule gifts months in advance, and let AI write the words you don't have time to.
          </p>
          <div className="grid gap-3 pt-4">
            {[
              { i: Calendar, t: "Calendar of every occasion" },
              { i: Sparkles, t: "AI-written greetings in your voice" },
              { i: Gift, t: "Auto-shipped gifts on the right day" },
            ].map(({ i: I, t }) => (
              <div key={t} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 backdrop-blur">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary">
                  <I className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 Never Forget Occasions</p>
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center bg-background p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <Heart className="h-5 w-5 text-primary" fill="currentColor" />
            <span className="font-display font-bold">NFO</span>
          </Link>

          <Tabs defaultValue="sign-in">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign in</TabsTrigger>
              <TabsTrigger value="sign-up">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="sign-in" className="space-y-5 pt-6">
              <header>
                <h2 className="font-display text-2xl font-bold">Welcome back</h2>
                <p className="text-sm text-muted-foreground">Sign in to your NFO account</p>
              </header>
              <form onSubmit={(e) => submit(e, "sign-in")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button type="button" className="text-xs text-muted-foreground hover:text-foreground">Forgot?</button>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                  {loading ? "Signing in…" : "Sign in"}
                </Button>
              </form>
              <SocialAuth />
            </TabsContent>

            <TabsContent value="sign-up" className="space-y-5 pt-6">
              <header>
                <h2 className="font-display text-2xl font-bold">Start celebrating</h2>
                <p className="text-sm text-muted-foreground">7-day free trial. No card required.</p>
              </header>
              <form onSubmit={(e) => submit(e, "sign-up")} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="fn">First name</Label>
                    <Input id="fn" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ln">Last name</Label>
                    <Input id="ln" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="em">Work email</Label>
                  <Input id="em" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pw">Password</Label>
                  <Input id="pw" type="password" minLength={8} required />
                  <p className="text-xs text-muted-foreground">At least 8 characters.</p>
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                  {loading ? "Creating account…" : "Create account"}
                </Button>
              </form>
              <SocialAuth />
              <p className="text-center text-xs text-muted-foreground">
                By continuing you agree to our{" "}
                <Link to="/legal/terms" className="underline hover:text-foreground">Terms</Link> and{" "}
                <Link to="/legal/privacy" className="underline hover:text-foreground">Privacy</Link>.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const SocialAuth = () => (
  <div className="space-y-3">
    <div className="relative">
      <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">or continue with</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <Button variant="outline" type="button">Google</Button>
      <Button variant="outline" type="button">Apple</Button>
    </div>
  </div>
);

export default Auth;