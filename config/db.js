import mongoose from 'mongoose';

let isConnecting = false;

// Ensures a single, reusable connection for serverless
const connectDB = async () => {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState === 1) return;
  if (isConnecting) return;

  try {
    isConnecting = true;
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not set');
    }
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err?.message || err);
    console.error('MONGO_URI provided:', process.env.MONGO_URI ? 'Yes' : 'No');
    // Do not exit in serverless/production; surface errors via API responses instead
    if (process.env.NODE_ENV !== 'production') {
      // In local dev, exiting helps reveal misconfiguration quickly
      process.exit(1);
    }
  } finally {
    isConnecting = false;
  }
};

export default connectDB;

