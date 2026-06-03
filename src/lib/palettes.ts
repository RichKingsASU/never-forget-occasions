export interface PaletteTokens {
  background: string;   // HSL e.g. "100 25% 98%"
  foreground: string;
  primary: string;
  primaryFg?: string;
  accent: string;
  accentFg?: string;
  card?: string;
  border?: string;
  muted?: string;
}

export interface Palette {
  id: string;
  name: string;
  tagline: string;
  gradient: string;     // tailwind classes for preview pill
  swatches: string[];   // hex array for swatch row
  light: PaletteTokens;
  dark: PaletteTokens;
}

/** All HSL token strings use the "H S% L%" format expected by `hsl(var(--token))`. */
export const PALETTES: Palette[] = [
  {
    id: "iced-matcha", name: "Iced Matcha", tagline: "Organic Tech Minimalism",
    gradient: "from-green-300 to-emerald-400",
    swatches: ["#86efac", "#22c55e", "#f7f9f6", "#0f172a"],
    light: { background: "100 25% 98%", foreground: "220 25% 10%", primary: "142 70% 45%", primaryFg: "0 0% 100%", accent: "142 70% 95%", accentFg: "142 70% 18%", card: "100 25% 99%", border: "100 15% 90%", muted: "100 15% 94%" },
    dark:  { background: "140 10% 6%",  foreground: "100 15% 92%", primary: "142 71% 58%", primaryFg: "140 50% 8%",  accent: "142 50% 18%", accentFg: "142 70% 85%", card: "140 12% 9%",  border: "140 10% 16%", muted: "140 10% 14%" },
  },
  {
    id: "cool-blue", name: "Cool Blue Aura", tagline: "Subzero Mid-Century",
    gradient: "from-sky-400 to-indigo-400",
    swatches: ["#38bdf8", "#6366f1", "#f0f7ff", "#0f172a"],
    light: { background: "210 100% 98%", foreground: "222 47% 11%", primary: "199 89% 48%", primaryFg: "0 0% 100%", accent: "199 89% 95%", accentFg: "210 80% 20%", card: "210 100% 99%", border: "210 60% 92%", muted: "210 40% 95%" },
    dark:  { background: "220 35% 7%",   foreground: "210 30% 92%", primary: "199 95% 74%", primaryFg: "220 50% 10%", accent: "220 30% 18%", accentFg: "199 90% 85%", card: "222 35% 11%", border: "220 25% 18%", muted: "220 25% 15%" },
  },
  {
    id: "cloud-clay", name: "Cloud Dancer & Clay", tagline: "Editorial Softness",
    gradient: "from-orange-400 to-amber-300",
    swatches: ["#f97316", "#fde047", "#fcfbfa", "#1c1917"],
    light: { background: "30 20% 99%",   foreground: "24 10% 10%",  primary: "25 95% 53%", primaryFg: "0 0% 100%", accent: "25 95% 95%", accentFg: "24 60% 22%", card: "30 25% 99%", border: "30 15% 92%", muted: "30 20% 95%" },
    dark:  { background: "24 12% 7%",    foreground: "30 15% 92%",  primary: "25 95% 62%", primaryFg: "24 40% 10%", accent: "24 30% 18%", accentFg: "25 85% 88%", card: "24 12% 10%", border: "24 10% 18%", muted: "24 10% 14%" },
  },
  {
    id: "mermaid", name: "Mermaidcore Iridescence", tagline: "Fluid Vaporware",
    gradient: "from-fuchsia-400 to-cyan-400",
    swatches: ["#d946ef", "#06b6d4", "#faf8ff", "#1e1b4b"],
    light: { background: "260 40% 99%",  foreground: "244 49% 10%", primary: "292 84% 61%", primaryFg: "0 0% 100%", accent: "292 84% 96%", accentFg: "292 60% 25%", card: "260 40% 99%", border: "270 40% 92%", muted: "260 30% 95%" },
    dark:  { background: "250 25% 9%",   foreground: "270 30% 92%", primary: "292 90% 75%", primaryFg: "250 50% 10%", accent: "270 30% 20%", accentFg: "292 80% 88%", card: "250 25% 12%", border: "250 20% 20%", muted: "250 20% 16%" },
  },
  {
    id: "pale-banana", name: "Pale Banana Tech", tagline: "Optimistic FinTech",
    gradient: "from-yellow-300 to-lime-400",
    swatches: ["#facc15", "#84cc16", "#fafaf5", "#1c1d15"],
    light: { background: "60 30% 98%",   foreground: "70 20% 10%",  primary: "48 96% 53%", primaryFg: "70 50% 10%", accent: "48 96% 93%", accentFg: "70 40% 18%", card: "60 30% 99%", border: "60 20% 90%", muted: "60 25% 94%" },
    dark:  { background: "70 12% 7%",    foreground: "60 20% 92%",  primary: "55 92% 70%", primaryFg: "70 50% 10%", accent: "70 20% 18%", accentFg: "55 80% 85%", card: "70 12% 10%", border: "70 10% 18%", muted: "70 10% 14%" },
  },
  {
    id: "lavender-haze", name: "Lavender Haze", tagline: "Premium Wellness",
    gradient: "from-purple-400 to-pink-400",
    swatches: ["#c084fc", "#f472b6", "#faf9fc", "#2e1065"],
    light: { background: "270 30% 99%",  foreground: "270 50% 11%", primary: "271 91% 65%", primaryFg: "0 0% 100%", accent: "271 91% 96%", accentFg: "271 70% 25%", card: "270 30% 99%", border: "271 40% 93%", muted: "270 30% 95%" },
    dark:  { background: "260 25% 8%",   foreground: "270 30% 92%", primary: "271 91% 80%", primaryFg: "270 50% 12%", accent: "270 30% 20%", accentFg: "271 80% 88%", card: "260 25% 12%", border: "260 20% 20%", muted: "260 20% 16%" },
  },
  {
    id: "carbon-mint", name: "Carbon Mint", tagline: "Minimal Developer-Core",
    gradient: "from-emerald-400 to-cyan-400",
    swatches: ["#10b981", "#06b6d4", "#f4fbf7", "#022c22"],
    light: { background: "150 45% 98%",  foreground: "164 85% 5%",  primary: "149 84% 39%", primaryFg: "0 0% 100%", accent: "149 84% 94%", accentFg: "164 60% 18%", card: "150 45% 99%", border: "150 35% 90%", muted: "150 30% 94%" },
    dark:  { background: "160 30% 5%",   foreground: "150 25% 92%", primary: "152 76% 52%", primaryFg: "160 80% 8%", accent: "160 30% 16%", accentFg: "152 70% 85%", card: "160 30% 8%",  border: "160 20% 18%", muted: "160 20% 14%" },
  },
  {
    id: "peach-blossom", name: "Digital Peach Blossom", tagline: "Human-Centric AI",
    gradient: "from-orange-400 to-rose-400",
    swatches: ["#fb923c", "#f43f5e", "#fffbfb", "#4c0519"],
    light: { background: "0 40% 99%",    foreground: "343 81% 10%", primary: "26 93% 61%", primaryFg: "0 0% 100%", accent: "26 93% 95%", accentFg: "343 60% 22%", card: "0 40% 99%",   border: "0 40% 92%",   muted: "0 30% 95%" },
    dark:  { background: "350 30% 9%",   foreground: "0 20% 92%",   primary: "26 95% 70%", primaryFg: "343 50% 10%", accent: "0 30% 18%",  accentFg: "26 90% 88%",  card: "350 30% 12%", border: "350 20% 20%", muted: "350 20% 16%" },
  },
  {
    id: "patina-copper", name: "Patina Blue & Copper", tagline: "Industrial Executive",
    gradient: "from-teal-500 to-amber-500",
    swatches: ["#0d9488", "#ca8a04", "#f8fafc", "#0f172a"],
    light: { background: "210 20% 98%",  foreground: "222 47% 11%", primary: "173 80% 32%", primaryFg: "0 0% 100%", accent: "173 80% 94%", accentFg: "173 60% 20%", card: "210 20% 99%", border: "210 20% 90%", muted: "210 15% 95%" },
    dark:  { background: "215 30% 8%",   foreground: "210 25% 92%", primary: "173 76% 50%", primaryFg: "215 50% 10%", accent: "210 30% 18%", accentFg: "173 70% 85%", card: "215 30% 12%", border: "215 20% 20%", muted: "215 20% 16%" },
  },
  {
    id: "solar-sunset", name: "Solar Sunset Flare", tagline: "High-Velocity Analytics",
    gradient: "from-orange-500 to-indigo-500",
    swatches: ["#ff5a1f", "#6366f1", "#f9fafb", "#030712"],
    light: { background: "220 15% 99%",  foreground: "224 71% 4%",  primary: "16 100% 56%", primaryFg: "0 0% 100%", accent: "16 100% 95%", accentFg: "16 70% 25%", card: "220 15% 100%", border: "220 15% 92%", muted: "220 15% 95%" },
    dark:  { background: "225 25% 6%",   foreground: "220 20% 92%", primary: "20 100% 64%", primaryFg: "225 50% 8%", accent: "225 25% 18%", accentFg: "20 90% 85%", card: "225 25% 10%", border: "225 20% 20%", muted: "225 20% 16%" },
  },
  {
    id: "wasabi-kick", name: "Wasabi Kick", tagline: "High-Voltage Neo-Minimalism",
    gradient: "from-lime-300 to-emerald-400",
    swatches: ["#a3e635", "#334155", "#f9faf6", "#0f172a"],
    light: { background: "80 20% 98%",   foreground: "222 47% 11%", primary: "84 81% 44%", primaryFg: "84 60% 10%", accent: "84 81% 93%", accentFg: "84 60% 18%", card: "80 20% 99%", border: "80 20% 90%", muted: "80 15% 94%" },
    dark:  { background: "100 12% 7%",   foreground: "80 15% 92%",  primary: "84 81% 65%", primaryFg: "100 50% 10%", accent: "100 15% 18%", accentFg: "84 70% 85%", card: "100 12% 10%", border: "100 10% 18%", muted: "100 10% 14%" },
  },
  {
    id: "jade-serenity", name: "Jade Serenity", tagline: "Elevated Biophilic",
    gradient: "from-emerald-500 to-blue-500",
    swatches: ["#059669", "#3b82f6", "#f5f8f6", "#064e3b"],
    light: { background: "140 15% 98%",  foreground: "166 85% 7%",  primary: "161 93% 30%", primaryFg: "0 0% 100%", accent: "161 93% 94%", accentFg: "161 70% 18%", card: "140 15% 99%", border: "140 15% 90%", muted: "140 10% 94%" },
    dark:  { background: "150 25% 5%",   foreground: "140 20% 92%", primary: "161 84% 40%", primaryFg: "150 50% 10%", accent: "150 25% 16%", accentFg: "161 80% 85%", card: "150 25% 8%",  border: "150 20% 18%", muted: "150 20% 14%" },
  },
  {
    id: "cafe-latte", name: "Café Latte", tagline: "Editorial Elegance",
    gradient: "from-amber-700 to-amber-500",
    swatches: ["#78350f", "#f59e0b", "#fdfbf7", "#451a03"],
    light: { background: "40 40% 99%",   foreground: "25 76% 14%",  primary: "35 84% 26%", primaryFg: "0 0% 100%", accent: "35 84% 95%", accentFg: "25 76% 22%", card: "40 40% 99%", border: "40 25% 90%", muted: "40 30% 95%" },
    dark:  { background: "30 15% 7%",    foreground: "40 20% 92%",  primary: "43 96% 56%", primaryFg: "30 50% 10%", accent: "30 20% 18%", accentFg: "43 80% 85%", card: "30 15% 10%", border: "30 12% 18%", muted: "30 12% 14%" },
  },
  {
    id: "arctic-frost", name: "Arctic Frost", tagline: "Hyper-Clean Cloud UI",
    gradient: "from-cyan-400 to-slate-400",
    swatches: ["#22d3ee", "#94a3b8", "#f8fafc", "#0f172a"],
    light: { background: "210 20% 98%",  foreground: "222 47% 11%", primary: "189 87% 48%", primaryFg: "0 0% 100%", accent: "189 87% 95%", accentFg: "189 70% 22%", card: "210 20% 99%", border: "210 25% 92%", muted: "210 20% 95%" },
    dark:  { background: "220 18% 7%",   foreground: "210 25% 92%", primary: "189 94% 67%", primaryFg: "220 50% 10%", accent: "220 18% 20%", accentFg: "189 80% 85%", card: "220 18% 10%", border: "220 15% 20%", muted: "220 15% 16%" },
  },
  {
    id: "velvet-plum", name: "Velvet Plum & Rosewood", tagline: "Premium Noir Light",
    gradient: "from-fuchsia-800 to-rose-400",
    swatches: ["#86198f", "#fda4af", "#fdfafb", "#4a044e"],
    light: { background: "340 20% 99%",  foreground: "297 90% 10%", primary: "297 70% 31%", primaryFg: "0 0% 100%", accent: "297 70% 95%", accentFg: "297 70% 22%", card: "340 20% 99%", border: "340 25% 93%", muted: "340 20% 95%" },
    dark:  { background: "300 25% 7%",   foreground: "320 25% 92%", primary: "292 95% 84%", primaryFg: "300 50% 10%", accent: "300 25% 20%", accentFg: "292 80% 88%", card: "300 25% 10%", border: "300 20% 20%", muted: "300 20% 16%" },
  },
];

export const DEFAULT_PALETTE_ID = "iced-matcha";
export const getPalette = (id: string) => PALETTES.find((p) => p.id === id) ?? PALETTES[0];