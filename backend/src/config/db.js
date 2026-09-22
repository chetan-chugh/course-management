const mongoose = require('mongoose');

/**
 * Connects to MongoDB. 
 */
async function connectDB() {
  const uri = process.env.DATABASE_URL;

  if (!uri) {
    console.error('DATABASE_URL is missing.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB is connected successfully`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;
