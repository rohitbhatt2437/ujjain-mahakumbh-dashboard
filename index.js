import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import fileRoutes from './routes/file.routes.js';

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the app once (reused across invocations on Vercel)
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', authRoutes);
app.use('/api', fileRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

// Local development server
const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'production') {
  // ensure DB connected in dev before listening
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Backend server listening at http://localhost:${PORT}`);
    });
  });
}

// Vercel serverless handler
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}

