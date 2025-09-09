# Ujjain Mahakumbh Dashboard

React (Vite) SPA with an Express + MongoDB API, deployed on Vercel as a static site plus serverless function(s).

## Stack
- Frontend: React 18, React Router 6, Tailwind, Leaflet, Recharts
- Backend: Express 5, Mongoose, Multer (uploads), JWT auth
- Deploy: Vercel (SPA + serverless handler in `index.js`)

## Project Structure
- `index.js`: Express app and serverless handler (Vercel entry for `/api/*`)
- `config/`: DB connection (`db.js`)
- `routes/`, `controllers/`, `models/`: API layers
- `middleware/`: Multer configuration for uploads
- `src/`: React app (Vite). `src/utils/api.js` uses `import.meta.env.VITE_API_URL`
- `public/`: Static assets (e.g., `vite.svg`) served by Vite

## Environment Variables
Create `.env` for local dev (do not commit real secrets):

```
MONGO_URI=<your mongodb connection string>
JWT_SECRET=<your jwt secret>
VITE_API_URL=/api
```

On Vercel (Project → Settings → Environment Variables): set the same keys for Production and Preview environments. Set `NODE_ENV=production` in Production.

## Local Development
1. Copy example: `copy .env.example .env` (Windows) or `cp .env.example .env`
2. Fill `MONGO_URI` and `JWT_SECRET`
3. Install deps: `npm install`
4. Run both frontend and API: `npm run dev:full`
5. App: http://localhost:5173 (Vite proxies `/api` to `http://localhost:3001`)
6. Health check: http://localhost:5173/api/health

Run only the API locally: `npm run start` (listens on `:3001`).

## Build & Preview
- Build: `npm run build` (outputs to `dist/`)
- Preview: `npm run preview`

## Deploy on Vercel
- `vercel.json` routes:
  - `/api/(.*)` → `index.js` (serverless Express handler)
  - all other non-asset paths → `index.html` (SPA routing)
- Configure env vars on Vercel: `MONGO_URI`, `JWT_SECRET`, `VITE_API_URL=/api`, `NODE_ENV=production`
- Validate after deploy:
  - `https://<your-app>.vercel.app/api/health` → `{ "status": "ok", ... }`

## Uploads on Vercel
The server uses `/tmp/uploads` in production (Vercel’s writable but ephemeral storage). Files don’t persist across deployments or cold starts. For persistence, integrate object storage (e.g., S3 or Cloudinary). Local dev writes to `./uploads`.

## Scripts
- `dev`: Vite dev server
- `start` / `start:api`: Backend only
- `dev:full`: Frontend + backend concurrently
- `build`, `preview`, `lint`

## Troubleshooting
- API 500s: verify env vars on Vercel; check project logs
- Mongo connect errors: Atlas IP access rules and correct URI
- SPA 404s on refresh: `vercel.json` keeps asset extensions and rewrites others to `index.html`

---
Production‑ready with serverless API and Vite SPA. For persistent uploads, integrate S3/Cloudinary.

