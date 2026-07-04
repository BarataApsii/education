# Kairuku District Education Office — Website

A public-facing, informational website for a district education office, built with **React + Vite** and **Tailwind CSS**. It is a static, front-end-only site (no backend, no authentication) suitable for a government or church-administration audience.

> The district name, contact details and all content are **placeholder data**. See [Customising content](#customising-content) to replace them.

## Features

- ⚡ **React 19 + Vite** — fast dev server and optimised production builds
- 🎨 **Tailwind CSS** — responsive, mobile-first, professional layout
- 🧭 **React Router** — client-side routing across six pages
- 🧩 **Reusable layout** — shared `Header`, `Footer`, `Nav` and `Layout` components
- 🔎 **SEO-friendly** — per-page `<title>`, meta description, canonical + Open Graph/Twitter tags (via React 19 native document metadata)
- 🗂️ **Static JSON data** — LLGs, schools and news/notices are driven by JSON files
- ▲ **Vercel-ready** — includes `vercel.json` with SPA rewrites

## Pages

| Route       | Page            | Contents                                            |
| ----------- | --------------- | --------------------------------------------------- |
| `/`         | Home            | Hero, district overview, latest notices             |
| `/about`    | About           | Mission, vision, values, about the office           |
| `/llgs`     | LLGs            | The three Local-Level Governments and their focus   |
| `/schools`  | Schools         | Filterable directory of schools (placeholder data)  |
| `/news`     | News & Notices  | List view with date, category and summary           |
| `/contact`  | Contact         | Address, phone, email and office hours              |
| `*`         | 404             | Not-found fallback                                   |

## Project structure

```
district-education/
├── public/                 # Static assets served as-is (favicon, robots.txt)
├── src/
│   ├── components/         # Reusable UI: Header, Footer, Layout, PageHeader, Seo
│   ├── data/              # Static content
│   │   ├── site.js         # Site-wide config (name, contact, URL)
│   │   ├── llgs.json       # Local-Level Governments
│   │   ├── schools.json    # School directory
│   │   └── news.json       # News & notices
│   ├── pages/             # One component per route
│   ├── App.jsx             # Route definitions
│   ├── main.jsx            # App entry (BrowserRouter)
│   └── index.css           # Tailwind directives + shared component classes
├── index.html              # HTML shell + default meta tags
├── tailwind.config.js
├── vercel.json             # SPA rewrite config for Vercel
└── vite.config.js
```

## Getting started

### Prerequisites

- **Node.js ≥ 20.19** (Node 22 recommended — see `.nvmrc`)
- npm (bundled with Node)

### Install & run

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev
```

### Other scripts

```bash
npm run build     # production build to dist/
npm run preview   # locally preview the production build
npm run lint      # run oxlint
```

## Customising content

All placeholder content lives in `src/data/`:

- **`site.js`** — district name, tagline, contact details and production `url` (used for canonical/OG tags). Update `url` to your real domain.
- **`llgs.json`** — the three Local-Level Governments.
- **`schools.json`** — the school directory.
- **`news.json`** — news items and notices (newest first is handled automatically).

You can also update the default `<title>` and description in `index.html`.

### Images

Placeholder imagery is hotlinked from [Unsplash](https://unsplash.com/) (free to use) via `image` fields in the data files and `site.heroImage` in `site.js`. Replace these URLs with your own hosted images (or files placed in `public/`) when ready.

## Deployment (Vercel)

This project is ready to deploy on [Vercel](https://vercel.com/) as a static site.

### Option A — Vercel dashboard

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In the Vercel dashboard, click **Add New → Project** and import the repo.
3. Vercel auto-detects Vite. Confirm the settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Click **Deploy**.

The included `vercel.json` rewrites all routes to `index.html` so client-side routing (e.g. `/about`) works on direct visits and refreshes.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

## License

Placeholder project — add your organisation's license before publishing.
