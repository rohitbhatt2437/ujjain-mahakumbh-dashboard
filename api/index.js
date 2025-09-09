// api/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); // Path might need adjustment

// Adjust paths for the new structure
const authRoutes = require('./routes/auth.routes');
const fileRoutes = require('./routes/file.routes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Adjust path for uploads if needed, Vercel uses a temporary filesystem
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', authRoutes);
app.use('/api', fileRoutes);

// Export the app for Vercel
module.exports = app;