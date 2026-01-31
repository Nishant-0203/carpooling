// backend/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
    console.error('💡 Possible fixes:');
    console.error('   1. Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for dev)');
    console.error('   2. Verify username/password in .env');
    console.error('   3. Use local MongoDB: mongodb://localhost:27017/cogo');
    process.exit(1);
  }
};

export default connectDB;
