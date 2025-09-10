# Ujjain Mahakumbh Dashboard

A modern public-health and operations dashboard for the Ujjain Mahakumbh. It provides city operations teams with live mapping, sanitation management, team coordination, analytics, emergency response, and file management.

Live Demo: https://ujjain-mahakumbh-dashboard.vercel.app/

## Key Features
- Outbreak Map with routing, custom markers, and filtering (Leaflet)
- Sanitation Ops: dustbins and toilets with status tracking and CRUD
- Team Management: assign, view, and manage teams/shifts
- Analytics: charts for trends and KPIs (Recharts)
- Emergency Response: quick actions and situational overview
- File Uploads: upload and manage documents (e.g., SOPs, PDFs)
- Auth: JWT-based login and protected API routes
- Production-ready deploy on Vercel (SPA + serverless API)

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

## Pages & Modules
- `src/pages/Dashboard.jsx`: Overview with key widgets.
- `src/pages/Analytics.jsx`: Charts/KPIs (Recharts).
- `src/pages/EmergencyResponse.jsx`: Quick actions and incident view.
- `src/components/dashboard/OutbreakMap.jsx`: Interactive map (Leaflet) with routing and multiple layers.
- `src/components/dashboard/SanitationOps.jsx`: Dustbins and toilets management.
- `src/components/dashboard/TeamManagement.jsx`: Team assignments and status.
- `src/pages/Files.jsx` (and related routes/controllers): Document uploads and management.
- `src/context/*`: Auth and UI contexts.

## Quick Start
```bash
# 1) Clone and install
npm install

# 2) Configure env
cp .env.example .env
# set MONGO_URI, JWT_SECRET, VITE_API_URL=/api

# 3) Run full stack (frontend + API)
npm run dev:full

# Frontend: http://localhost:5173
# API proxied at /api (health check: http://localhost:5173/api/health)
```

## API Overview (Brief)
- Auth
  - `POST /api/auth/register` → create user
  - `POST /api/auth/login` → returns JWT
- Files
  - `GET /api/files` → list files
  - `POST /api/files` (multipart) → upload
  - `DELETE /api/files/:id` → delete

Protected routes expect `Authorization: Bearer <token>`.

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

