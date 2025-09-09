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
// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API Routes ---
// We'll prefix our routes with /api for good practice
app.use('/api', authRoutes);
app.use('/api', fileRoutes);


// --- Start Server ---
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});