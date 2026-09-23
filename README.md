# OLL Website

Next.js conversion of The Organization Learning Labs marketing site (homepage, About, Privacy, Terms).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

## Routes

| Path | Page |
|---|---|
| `/` | Homepage (supports `?industry=it` or `?industry=bfsi`) |
| `/about` | About us |
| `/privacy` | Privacy policy |
| `/terms` | Terms and conditions |

Original Claude Artifact HTML is kept in `legacy/` for reference.

## SSR & SEO

- Pages render on the server (homepage uses `force-dynamic` + async content loader).
- Metadata: Open Graph, Twitter cards, canonical URLs, robots, sitemap.
- JSON-LD: Organization, WebSite, WebPage, BreadcrumbList.
- Set `NEXT_PUBLIC_SITE_URL` in `.env.local` (see `.env.example`) before production deploy.

## Future REST APIs

- Content loaders live in `lib/content.ts` — swap the local data imports for `fetch(OLL_API_BASE_URL/...)`.
- Health check: `GET /api/health`.
- Add further route handlers under `app/api/`.
