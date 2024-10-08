const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config()
const url = process.env.MONGO_URL;
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('error: ' + error.message);
    process.exit(1);
  }
};
module.exports = connectDb;
