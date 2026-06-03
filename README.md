# Never Forget Occasions

Automated AI video greetings & curated gifts so you never miss a birthday,
anniversary, or milestone.

Built with **Vite + React + TypeScript + Tailwind CSS (shadcn-ui)** and
**Supabase**, hosted on **Netlify**.

## Local development

Requires [Node.js](https://nodejs.org) 18+ and npm.

```sh
# Install dependencies
npm install

# Start the dev server (http://localhost:8080)
npm run dev
```

## Environment variables

The app talks to Supabase via two public, browser-safe variables. Copy the
template and fill in your values:

```sh
cp .env.example .env
```

| Variable                  | Description                                  |
| ------------------------- | -------------------------------------------- |
| `VITE_SUPABASE_URL`       | Your Supabase project URL                    |
| `VITE_SUPABASE_ANON_KEY`  | Supabase anon (public) key — safe in browser |

> Vite inlines `VITE_*` variables at **build time**. On Netlify, set them
> under **Site settings → Environment variables** (they're already configured
> for this project), then trigger a redeploy so the new build picks them up.

## Build

```sh
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

## Deployment (Netlify)

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- SPA routing and build settings are defined in [`netlify.toml`](./netlify.toml).

Pushes to the configured branch trigger an automatic deploy.

## Images

Landing-page imagery is served from [`public/images/`](./public/images/).
See the README in that folder for the expected filenames.
