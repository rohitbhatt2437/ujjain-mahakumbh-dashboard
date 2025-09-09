import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Successfully connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    console.error('MONGO_URI provided:', process.env.MONGO_URI ? 'Yes' : 'No');
    // Don't exit in production (Vercel) - let it fail gracefully
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;