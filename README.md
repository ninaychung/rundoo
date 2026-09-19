# Rundoo

Vite + React installer-management prototype, plus flooring field research hosted in the same app.

## App and Research

A persistent **App / Research** switcher sits at the top of every page.

| Mode | What you get | Local (`npm run dev`) | After deploy |
| --- | --- | --- | --- |
| **App** | The existing React installer workflow | [http://localhost:5173/](http://localhost:5173/) | Site root (`/`) |
| **Research** | Flooring field research (overview, market, playbook, sources) | [http://localhost:5173/research/](http://localhost:5173/research/) | `/research/` |

Research files live in `public/research/` and are copied into the Vite production build as static HTML, CSS, and JS. Relative links between those pages stay intact.

If you later host this repo as a GitHub Pages *project* site (`https://<user>.github.io/rundoo/`), set `base: '/rundoo/'` in `vite.config.js` so both modes resolve under that prefix. The switcher already uses Vite's `BASE_URL`, so the Research link will follow that setting.

## Scripts

```bash
npm install
npm run dev      # local server
npm run build    # production build (includes /research/)
npm run preview  # serve the build
```

This template uses [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) (Oxc).
