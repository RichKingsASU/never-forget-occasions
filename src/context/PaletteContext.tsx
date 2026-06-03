import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { DEFAULT_PALETTE_ID, getPalette, PALETTES, type Palette, type PaletteTokens } from "@/lib/palettes";

interface PaletteCtx {
  paletteId: string;
  palette: Palette;
  palettes: Palette[];
  setPaletteId: (id: string) => void;
  mode: "light" | "dark";
  setMode: (m: "light" | "dark" | "system") => void;
}

const Ctx = createContext<PaletteCtx | null>(null);
const KEY = "nfo.palette.v1";

const applyTokens = (tokens: PaletteTokens) => {
  const root = document.documentElement;
  const map: [keyof PaletteTokens, string][] = [
    ["background", "--background"],
    ["foreground", "--foreground"],
    ["primary",    "--primary"],
    ["primaryFg",  "--primary-foreground"],
    ["accent",     "--accent"],
    ["accentFg",   "--accent-foreground"],
    ["card",       "--card"],
    ["border",     "--border"],
    ["muted",      "--muted"],
  ];
  map.forEach(([k, v]) => {
    const val = tokens[k];
    if (val) root.style.setProperty(v, val);
  });
};

export const PaletteProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [paletteId, setPaletteIdState] = useState<string>(() => {
    try { return localStorage.getItem(KEY) ?? DEFAULT_PALETTE_ID; } catch { return DEFAULT_PALETTE_ID; }
  });

  const palette = getPalette(paletteId);
  const mode: "light" | "dark" = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    applyTokens(mode === "dark" ? palette.dark : palette.light);
    document.documentElement.dataset.palette = palette.id;
  }, [palette, mode]);

  const setPaletteId = (id: string) => {
    setPaletteIdState(id);
    try { localStorage.setItem(KEY, id); } catch {}
  };

  const value = useMemo<PaletteCtx>(() => ({
    paletteId, palette, palettes: PALETTES, setPaletteId,
    mode, setMode: (m) => setTheme(m),
  }), [paletteId, palette, mode, setTheme]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const usePalette = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePalette must be inside PaletteProvider");
  return v;
};