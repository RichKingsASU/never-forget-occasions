import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs";
import { Settings as SettingsIcon, User, Bell, CreditCard, Lock, Plug, Sparkles, Palette as PaletteIcon, Sun, Moon, Check } from "lucide-react";
import { toast } from "sonner";
import { usePalette } from "@/context/PaletteContext";

export const Settings = () => {
  const { palettes, paletteId, setPaletteId, palette, mode, setMode } = usePalette();
  const [profile, setProfile] = useState({ name: "Alex Rivera", email: "alex@example.com", handle: "alex" });
  const [prefs, setPrefs] = useState({
    remindEmail: true,
    remindSms: false,
    weekly: true,
    creatorDrops: true,
    marketing: false,
  });

  const save = () => toast.success("Settings saved");

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
        <div className="absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-primary/20 blur-[140px]" />
      </div>

      <Navigation currentPage="settings" />

      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-[1100px] space-y-5">
            <header>
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-corten">
                <SettingsIcon className="h-3 w-3" /> account · preferences
              </p>
              <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Settings</h1>
              <p className="mt-1 text-sm text-muted-foreground">Manage your profile, notifications, billing, and integrations.</p>
            </header>

            <Tabs defaultValue="profile" className="space-y-4">
              <TabsList className="glass-panel h-auto flex-wrap justify-start gap-1 border-0 bg-transparent p-1">
                {[
                  { v: "profile",       l: "Profile",       i: User },
                  { v: "appearance",    l: "Appearance",    i: PaletteIcon },
                  { v: "notifications", l: "Notifications", i: Bell },
                  { v: "billing",       l: "Billing",       i: CreditCard },
                  { v: "security",      l: "Security",      i: Lock },
                  { v: "integrations",  l: "Integrations",  i: Plug },
                ].map(({ v, l, i: Icon }) => (
                  <TabsTrigger key={v} value={v} className="gap-1.5 data-[state=active]:bg-corten/20 data-[state=active]:text-corten">
                    <Icon className="h-3.5 w-3.5" /> {l}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* APPEARANCE */}
              <TabsContent value="appearance" className="m-0 space-y-4">
                <Card className="glass-panel border-0 p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="font-display text-lg font-semibold">Theme</h2>
                      <p className="text-xs text-muted-foreground">
                        Active palette · <span className="text-foreground">{palette.name}</span> · {palette.tagline}
                      </p>
                    </div>
                    <div className="inline-flex rounded-lg border border-border bg-card/60 p-1">
                      {([
                        { v: "light",  l: "Light",  I: Sun  },
                        { v: "dark",   l: "Dark",   I: Moon },
                        { v: "system", l: "Auto",   I: SettingsIcon },
                      ] as const).map(({ v, l, I }) => (
                        <button
                          key={v}
                          onClick={() => setMode(v)}
                          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition ${
                            (v === "system" ? false : mode === v) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <I className="h-3.5 w-3.5" /> {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`mt-5 overflow-hidden rounded-xl border border-border`}>
                    <div className={`h-24 w-full bg-gradient-to-r ${palette.gradient}`} />
                    <div className="grid grid-cols-2 gap-3 bg-background p-4 md:grid-cols-4">
                      <Preview label="Background" hex={palette.swatches[2]} />
                      <Preview label="Primary"    hex={palette.swatches[0]} />
                      <Preview label="Accent"     hex={palette.swatches[1]} />
                      <Preview label="Heading"    hex={palette.swatches[3]} />
                    </div>
                  </div>
                </Card>

                <Card className="glass-panel border-0 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-display text-base font-semibold">Choose a palette</h3>
                    <Badge className="border-0 bg-primary/15 px-2 py-0.5 font-mono text-[10px] uppercase text-primary">{palettes.length} themes</Badge>
                  </div>
                  <div role="radiogroup" aria-label="Color palette" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {palettes.map((p) => {
                      const active = p.id === paletteId;
                      return (
                        <button
                          key={p.id}
                          role="radio"
                          aria-checked={active}
                          onClick={() => { setPaletteId(p.id); toast.success(`Theme · ${p.name}`); }}
                          className={`group relative overflow-hidden rounded-xl border text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            active ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-foreground/30"
                          }`}
                        >
                          <div className={`relative h-20 w-full bg-gradient-to-r ${p.gradient}`}>
                            {active && (
                              <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-background text-primary shadow-sm">
                                <Check className="h-3.5 w-3.5" />
                              </span>
                            )}
                            <div className="absolute inset-x-3 bottom-2 flex gap-1">
                              {p.swatches.map((s, i) => (
                                <span key={i} aria-hidden className="h-3 w-3 rounded-full ring-1 ring-background/60" style={{ background: s }} />
                              ))}
                            </div>
                          </div>
                          <div className="bg-card/80 p-3">
                            <p className="text-sm font-semibold leading-tight">{p.name}</p>
                            <p className="mt-0.5 text-[11px] text-muted-foreground">{p.tagline}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              </TabsContent>

              {/* PROFILE */}
              <TabsContent value="profile" className="m-0">
                <Card className="glass-panel border-0 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-corten text-lg font-semibold text-primary-foreground">AX</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-display text-lg font-semibold">{profile.name}</p>
                      <p className="text-xs text-muted-foreground">{profile.email}</p>
                    </div>
                    <Button variant="ghost" className="ml-auto border border-border/60" onClick={() => toast.info("Avatar upload coming soon")}>
                      Change photo
                    </Button>
                  </div>

                  <Separator className="my-6 bg-border/50" />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="s-name">Full name</Label>
                      <Input id="s-name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="s-email">Email</Label>
                      <Input id="s-email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                    </div>
                    <div className="grid gap-1.5 md:col-span-2">
                      <Label htmlFor="s-handle">Username</Label>
                      <Input id="s-handle" value={profile.handle} onChange={(e) => setProfile({ ...profile, handle: e.target.value })} />
                      <p className="text-[11px] text-muted-foreground">neverforget.com/u/{profile.handle || "you"}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button className="bg-corten text-white hover:bg-corten/90" onClick={save}>Save changes</Button>
                  </div>
                </Card>
              </TabsContent>

              {/* NOTIFICATIONS */}
              <TabsContent value="notifications" className="m-0">
                <Card className="glass-panel border-0 p-6">
                  <h2 className="font-display text-lg font-semibold">How you want to be reminded</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Pick the channels that fit your life. You can change these anytime.</p>
                  <Separator className="my-5 bg-border/50" />
                  <div className="space-y-1">
                    {[
                      { k: "remindEmail",  l: "Occasion reminders via email", d: "Get a gentle nudge 7, 3, and 1 day before each occasion." },
                      { k: "remindSms",    l: "Occasion reminders via SMS",   d: "Same nudges, sent to your phone." },
                      { k: "weekly",       l: "Weekly digest",                d: "A Sunday summary of the week ahead." },
                      { k: "creatorDrops", l: "Creator drops",                d: "New collections from creators you follow." },
                      { k: "marketing",    l: "Product news",                 d: "Occasional updates about new features." },
                    ].map(({ k, l, d }) => (
                      <div key={k} className="flex items-start justify-between gap-4 border-b border-border/40 py-4 last:border-0">
                        <div>
                          <p className="text-sm font-medium">{l}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{d}</p>
                        </div>
                        <Switch checked={prefs[k as keyof typeof prefs]} onCheckedChange={(v) => setPrefs({ ...prefs, [k]: v })} aria-label={l} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button className="bg-corten text-white hover:bg-corten/90" onClick={save}>Save preferences</Button>
                  </div>
                </Card>
              </TabsContent>

              {/* BILLING */}
              <TabsContent value="billing" className="m-0 space-y-4">
                <Card className="glass-panel border-0 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <Badge className="border-0 bg-corten/15 text-corten">Pro · Yearly</Badge>
                      <h2 className="mt-2 font-display text-2xl font-semibold">$108 <span className="text-sm text-muted-foreground">/year</span></h2>
                      <p className="mt-1 text-sm text-muted-foreground">Next renewal · March 12, 2027</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => toast.info("Plan picker coming soon")}>Change plan</Button>
                      <Button variant="ghost" className="text-destructive hover:text-destructive" onClick={() => toast("Cancellation requires confirmation")}>Cancel</Button>
                    </div>
                  </div>
                </Card>

                <Card className="glass-panel border-0 p-6">
                  <h3 className="font-display text-base font-semibold">Payment method</h3>
                  <div className="mt-4 flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-14 place-items-center rounded-md bg-gradient-to-br from-primary to-corten font-mono text-xs font-bold text-primary-foreground">VISA</div>
                      <div>
                        <p className="text-sm font-medium">Visa ending in 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 08 / 28</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => toast.info("Update card coming soon")}>Update</Button>
                  </div>
                </Card>

                <Card className="glass-panel border-0 p-6">
                  <h3 className="font-display text-base font-semibold">Recent invoices</h3>
                  <ul className="mt-3 divide-y divide-border/40 text-sm">
                    {[
                      { d: "Mar 12, 2026", amt: "$108.00", id: "INV-2026-0312" },
                      { d: "Mar 12, 2025", amt: "$96.00",  id: "INV-2025-0312" },
                      { d: "Mar 12, 2024", amt: "$84.00",  id: "INV-2024-0312" },
                    ].map((i) => (
                      <li key={i.id} className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-medium">{i.d}</p>
                          <p className="font-mono text-[11px] text-muted-foreground">{i.id}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="tabular-nums">{i.amt}</span>
                          <Button variant="ghost" size="sm" onClick={() => toast.success(`Downloading ${i.id}`)}>Download</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              {/* SECURITY */}
              <TabsContent value="security" className="m-0 space-y-4">
                <Card className="glass-panel border-0 p-6">
                  <h2 className="font-display text-lg font-semibold">Password</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Use a strong, unique password.</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="grid gap-1.5"><Label>Current</Label><Input type="password" placeholder="••••••••" /></div>
                    <div className="grid gap-1.5"><Label>New</Label><Input type="password" placeholder="••••••••" /></div>
                    <div className="grid gap-1.5"><Label>Confirm</Label><Input type="password" placeholder="••••••••" /></div>
                  </div>
                  <div className="mt-5 flex justify-end">
                    <Button className="bg-corten text-white hover:bg-corten/90" onClick={() => toast.success("Password updated")}>Update password</Button>
                  </div>
                </Card>

                <Card className="glass-panel border-0 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-lg font-semibold">Two-factor authentication</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Add an extra layer of security at sign-in.</p>
                    </div>
                    <Switch aria-label="Enable two-factor authentication" />
                  </div>
                </Card>

                <Card className="glass-panel border-0 p-6">
                  <h2 className="font-display text-lg font-semibold text-destructive">Danger zone</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Permanently delete your account and all data.</p>
                  <Button variant="outline" className="mt-4 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => toast("Account deletion requires email confirmation")}>
                    Delete account
                  </Button>
                </Card>
              </TabsContent>

              {/* INTEGRATIONS */}
              <TabsContent value="integrations" className="m-0">
                <Card className="glass-panel border-0 p-6">
                  <h2 className="font-display text-lg font-semibold">Connected apps</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Sync occasions and contacts from the tools you already use.</p>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {[
                      { n: "Google Calendar", d: "Two-way sync for occasions and reminders.", connected: true },
                      { n: "Apple Contacts",  d: "Import birthdays from your address book.",   connected: true },
                      { n: "Slack",           d: "Dispatch greetings to channels or DMs.",     connected: false },
                      { n: "WhatsApp",        d: "Send greetings as rich media messages.",     connected: false },
                      { n: "Stripe",          d: "Pay for gifts and subscriptions.",           connected: true },
                      { n: "Shopify",         d: "Connect your own catalog as gifts.",         connected: false },
                    ].map((i) => (
                      <div key={i.n} className="flex items-start justify-between rounded-lg border border-border/60 bg-background/40 p-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-corten" />
                            <p className="text-sm font-medium">{i.n}</p>
                            {i.connected && <Badge className="h-4 border-0 bg-success/15 px-1.5 font-mono text-[9px] text-success">CONNECTED</Badge>}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{i.d}</p>
                        </div>
                        <Button size="sm" variant={i.connected ? "ghost" : "outline"} onClick={() => toast.success(`${i.connected ? "Disconnected" : "Connected"} ${i.n}`)}>
                          {i.connected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;

const Preview = ({ label, hex }: { label: string; hex: string }) => (
  <div className="flex items-center gap-2 rounded-lg border border-border bg-card/40 p-2">
    <span aria-hidden className="h-8 w-8 rounded-md ring-1 ring-border" style={{ background: hex }} />
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="font-mono text-[11px] tabular-nums">{hex}</p>
    </div>
  </div>
);