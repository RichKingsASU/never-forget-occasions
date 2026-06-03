
# Never Forget Occasions — Landing + Dashboard Polish

Scope locked for this round: world-class landing page, polished dashboard, full light/dark theming with system auto-switch, and one real backend feature — AI greeting generation via Lovable AI. Marketplace, creator portal, calendar sync, auth, and payments are intentionally deferred to future rounds.

## 1. Design system foundation

Rebuild `src/index.css` + `tailwind.config.ts` around the NFO palette as HSL semantic tokens.

- Colors: primary `#6D57E0`, gradient `#8358E0 → #AA63F2`, accent `#5AC8FA`, success `#34C759`, dark bg `#09090B`.
- Typography: load Inter Tight (display) + Inter (body) via Google Fonts; map to `font-display` / `font-sans`.
- Spacing: 8px scale (already Tailwind default — enforce via component usage).
- Tokens: `--background`, `--foreground`, `--primary`, `--primary-glow`, `--accent`, `--success`, `--muted`, `--card`, `--border`, plus gradients (`--gradient-hero`, `--gradient-primary`, `--gradient-card`) and shadows (`--shadow-glow`, `--shadow-card`, `--shadow-soft`).
- Light + dark variants for every token. `ThemeProvider` (next-themes) wired in `App.tsx` with `system` default + a header toggle.
- Motion utilities: extend existing tailwind keyframes with `float`, `shimmer`, `gradient-shift`, `confetti-pop`. Framer Motion used for hero, bento hover, and step transitions.

## 2. Landing page rebuild (`src/pages/Index.tsx` + new section components)

Replace the current single-file page with composable sections under `src/components/landing/`:

1. `Hero.tsx` — full-bleed gradient hero, animated aurora background, floating particle layer, headline "Celebrate Every Milestone With AI-Personalized Videos & Gifts", dual CTA, trust strip (avatars + "Join 10,000+"), animated dashboard mock peeking from bottom-right.
2. `HowItWorks.tsx` — 3-step horizontal timeline (Remember → Personalize → Deliver) with scroll-linked Framer Motion reveals and connecting animated line.
3. `FeatureBento.tsx` — 7-tile bento grid: AI Videos (large), Smart Reminders, Gift Marketplace, Family Plans, Creator Marketplace, Emotional Analytics, Group Gifting. Hover lift + glow.
4. `MarketplacePreview.tsx` — Pinterest-style masonry of category cards (Flowers, Gift Cards, Experiences, Handmade, Art, Subscriptions, Luxury) with mock ratings/creator badges. Static — no cart wired.
5. `SocialProof.tsx` — testimonial carousel, metric counters (occasions remembered, gifts sent, creators), press logo row.
6. `Pricing.tsx` — monthly/yearly toggle, 4 plans (Free, Pro, Family, Enterprise HR), feature checkmarks, "Most Popular" highlight, FAQ accordion below.
7. `Footer.tsx` — multi-column footer with product/company/legal/social links.
8. `LandingNav.tsx` — sticky glass nav with theme toggle.

All copy realistic, no Lorem. Generate one hero image asset via image gen (diverse celebration scene) and use it lazily.

## 3. Dashboard polish (`src/pages/Dashboard.tsx` + existing components)

Keep current structure, elevate execution:

- New `DashboardLayout` with collapsible left nav (existing `Navigation.tsx` refined), top bar (search, theme toggle, notifications, avatar).
- Stat cards: animated count-up, sparkline mini-charts (recharts), gradient icon chips.
- "Upcoming Occasions" → richer card design with countdown ring, gift status chip, quick actions (Generate Greeting, Send Gift).
- New `AIAssistantPanel` (right-side dock, collapsible) — chat UI for the greeting generator.
- New `EmotionalInsights` card — small bento with mock relationship engagement chart.
- New `QuickActions` row — Add Occasion, Generate Greeting (opens AI panel), Send Gift, Open Calendar.
- Empty/loading/error states for each widget using skeletons.

## 4. AI greeting generator (real backend)

New edge function `supabase/functions/generate-greeting/index.ts`:

- Inputs: recipient name, relationship, occasion, tone (Heartfelt / Funny / Romantic / Professional / Family-friendly), optional notes.
- Calls Lovable AI Gateway `google/gemini-3-flash-preview` with streaming SSE.
- System prompt enforces tone, length (~120 words), warm human voice, no clichés.
- Returns text stream; handles 429/402 with friendly errors.
- CORS enabled, public (no JWT required for this round).

Frontend:

- `src/components/ai/GreetingGenerator.tsx` — modal + assistant panel surface. Form for inputs, tone pill selector, streaming output area with typing animation, copy + regenerate buttons.
- Hooked into dashboard quick action and contact/occasion card "Generate Greeting" buttons.
- No persistence this round — generated text lives in component state (DB persistence is a future round).

Lovable Cloud must be enabled for this to work; plan assumes it gets enabled at build time.

## 5. Accessibility + responsive

- Single `<main>` per route, semantic headings, `aria-label` on every icon-only button.
- Focus-visible rings using `ring-primary`.
- `prefers-reduced-motion` respected — disable particles and large transforms.
- Mobile: hamburger nav, sticky bottom CTA on landing hero, dashboard nav becomes drawer < lg, bento collapses to single column.

## 6. Out of scope (explicitly deferred)

Auth, contact import, calendar sync, full marketplace + checkout, creator portal, Stripe, analytics backend, voice input, push/email notifications, settings/billing pages, support center, about page. Each is its own phase — happy to plan those next.

## Technical notes

- Stack stays Vite + React + Tailwind + shadcn (not Next.js as the prompt suggested — Lovable projects are Vite-based; SSR/Next is not available).
- New deps: `next-themes`, `framer-motion` (likely already present), `recharts` (already present).
- New files: `src/components/landing/*` (8 files), `src/components/ai/GreetingGenerator.tsx`, `src/components/ThemeToggle.tsx`, `src/components/ThemeProvider.tsx`, `supabase/functions/generate-greeting/index.ts`.
- Edited: `src/index.css`, `tailwind.config.ts`, `src/App.tsx`, `src/pages/Index.tsx`, `src/pages/Dashboard.tsx`, `src/components/Navigation.tsx`, `src/components/DashboardStats.tsx`, `index.html` (font links + meta).
- One new hero image via imagegen (premium quality, JPG).
