import mongoose from 'mongoose';

let connectingPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (connectingPromise) return connectingPromise;
  try {
    connectingPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    await connectingPromise;
    globalThis.__MONGO_CONNECTED__ = true;
    console.log('✅ Successfully connected to MongoDB');
    return mongoose.connection;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    if (process.env.VERCEL) {
      // In serverless, don't exit; allow health endpoint to report
      return null;
    }
    process.exit(1);
  } finally {
    connectingPromise = null;
  }
};

export default connectDB;