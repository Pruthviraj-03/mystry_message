import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: boolean;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase",
      {}
    );

    connection.isConnected = mongoose.connection.readyState === 1;

    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
