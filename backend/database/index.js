import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds for server selection
      connectTimeoutMS: 30000, // 30 seconds for initial connection
      socketTimeoutMS: 45000, // 45 seconds for socket inactivity
      maxPoolSize: 10, // Limit connection pool size
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connect;