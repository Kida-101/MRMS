import mongoose from "mongoose";

const connectDB = async () => {
  const conn = process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_LOCAL;

  if (!conn) {
    throw new Error("MongoDB URI is not defined in the environment variables.");
  }

  // Event listeners for connection status
  mongoose.connection.on("connected", () => {
    console.log("Database connected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Database connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected");
  });

  try {
    await mongoose.connect(conn);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;