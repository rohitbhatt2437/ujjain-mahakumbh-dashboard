require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth.routes');
const fileRoutes = require('./routes/file.routes');

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API Routes ---
app.use('/api', authRoutes);
app.use('/api', fileRoutes);

// --- START SERVER FOR LOCAL DEVELOPMENT ---
// This part will be ignored by Vercel, but will run on your machine.
const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ Backend server listening for local development at http://localhost:${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app;