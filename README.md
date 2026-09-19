# Rundoo

Vite + React installer-management prototype, plus flooring field research hosted in the same app.

## App and Research

A persistent **App / Research** switcher sits at the top of every page.

Because `vite.config.js` sets `base: '/rundoo/'` (required for GitHub Pages), local URLs include that prefix:

| Mode | Local (`npm run dev`) | GitHub Pages |
| --- | --- | --- |
| **App** | [http://localhost:5173/rundoo/](http://localhost:5173/rundoo/) | https://ninaychung.github.io/rundoo/ |
| **Research** | [http://localhost:5173/rundoo/research/](http://localhost:5173/rundoo/research/) | https://ninaychung.github.io/rundoo/research/ |

Research files live in `public/research/` (`index.html` Market Insights, `gtm.html` GTM Plan, `transcripts.html` Sources) and are copied into the Vite production build as static HTML, CSS, and JS.

## Scripts

```bash
npm install
npm run dev      # local server
npm run build    # production build (includes /research/)
npm run preview  # serve the build
```

## GitHub Pages

Pages is already set to **GitHub Actions**. Do not use the suggested **GitHub Pages Jekyll** or **Static HTML** workflows on that settings screen — this app needs a Vite build.

The workflow in `.github/workflows/deploy-pages.yml` runs on every push to `master`. After it succeeds, anyone can open the GitHub Pages URLs above.

This template uses [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) (Oxc).
