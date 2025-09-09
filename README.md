# Ujjain Mahakumbh Dashboard

Unified React (Vite) frontend + Express/MongoDB backend deployed on Vercel.

## Stack
Frontend: React 18, React Router v6, Tailwind CSS, Leaflet, Recharts
Backend: Express 5, Mongoose, Multer (file uploads), JWT (auth)
Deployment: Vercel (static SPA + serverless Express entry `index.js`)

## Local Development
1. Copy env example:
	cp .env.example .env  (Windows: copy .env.example .env)
2. Fill real values for `MONGO_URI` and `JWT_SECRET`.
3. Install deps:
	npm install
4. Run full stack (single command):
	npm run dev:full
5. Open http://localhost:5173 (proxy forwards /api -> http://localhost:3001)
6. Health check: http://localhost:5173/api/health

## Tailwind
Configured via `tailwind.config.js` and `postcss.config.js`. Global imports live in `src/index.css`.
If classes don't appear, ensure:
 - Dev server restarted after adding new file paths
 - Class names aren't built dynamically (e.g. `bg-${color}`) without safelisting

## Build & Preview
Production build: npm run build
Preview locally:  npm run preview

## Deployment (Vercel)
`vercel.json` rewrites `/api/*` to the Express serverless function (`index.js`) and all other non-asset routes to `index.html` for SPA routing.

Env vars must be configured in Vercel dashboard (Settings > Environment Variables):
 - MONGO_URI
 - JWT_SECRET
 - VITE_API_URL (usually /api)

### GitHub → Vercel CI/CD
1. Push repo to GitHub.
2. In Vercel: New Project → Import GitHub repo.
3. Framework preset: Vite (auto-detected).
4. Build Command: `npm run build` (auto).
5. Output Directory: `dist` (auto).
6. Add env vars for Production & Preview.
7. Deploy.
8. Test: https://your-app.vercel.app/api/health should return `{ status: "ok" }`.

## Security Notes
Do NOT commit real secrets. Rotate the current committed credentials immediately (they were present in history).

## Scripts
dev        : Vite dev server
start      : Start backend only
start:api  : Alias of start
dev:full   : Run frontend + backend concurrently
build      : Production build (frontend)
preview    : Preview built frontend
lint       : Run ESLint

## Directory Structure (simplified)
index.js          # Express app (serverless entry on Vercel)
src/              # React app
routes/           # Express route definitions
controllers/      # Business logic
models/           # Mongoose schemas
uploads/          # Uploaded files (served at /uploads)

## Adding Features
1. Add new API route in `routes/` and controller logic in `controllers/`.
2. Import it in `index.js` and `app.use('/api', newRoute)`.
3. Consume from frontend via `fetchApi('/your-endpoint')` in `src/utils/api.js`.

## Troubleshooting
Tailwind not applying: Check that component file extension is in `tailwind.config.js` content array.
MIME type errors: Confirm `vercel.json` doesn't rewrite JS/CSS asset requests (current config preserves assets with file extensions).
Auth failing: Ensure `JWT_SECRET` has no trailing spaces (fixed) and token stored in localStorage.

---
Maintained and structured for clarity and production readiness.
