import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import fileRoutes from './routes/file.routes.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Validate required env vars early
const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
const missing = requiredEnv.filter(k => !process.env[k] || String(process.env[k]).trim() === '');
if (missing.length) {
  console.error('❌ Missing required environment variables:', missing.join(', '));
}

// Connect to Database (reuses existing connection in serverless warm starts)
connectDB();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API Routes ---
app.use('/api', authRoutes);
app.use('/api', fileRoutes);

// Health / diagnostics endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
    mongoConnected: !!(globalThis.__MONGO_CONNECTED__),
    missingEnv: missing,
  });
});

// --- START SERVER FOR LOCAL DEVELOPMENT ---
// This part will be ignored by Vercel, but will run on your machine.
const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ Backend server listening for local development at http://localhost:${PORT}`);
  });
}

// Export the app for Vercel
export default app;