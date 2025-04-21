const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MongoDB Connection String:", process.env.ATLASDB_URL); // Debugging
    const conn = await mongoose.connect(process.env.ATLASDB_URL, {
      serverSelectionTimeoutMS: 60000, // Increase timeout to 60 seconds
    });
    console.log(`Connected to MongoDB Atlas successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas:", err.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
