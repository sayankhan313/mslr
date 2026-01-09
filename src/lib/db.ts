import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants";

const DATABASE_URI = process.env.MONGODB_URI;

if (!DATABASE_URI) {
  throw new Error("MONGODB_URI is not defined");
}

type DatabaseConnectionState = {
  isConnected?: number;
};

const databaseState: DatabaseConnectionState = {};

export async function connectToDatabase(): Promise<void> {
  if (databaseState.isConnected) return;

  const connection = await mongoose.connect(
    `${DATABASE_URI}/${DB_NAME}`,
    { bufferCommands: false }
  );

  databaseState.isConnected = connection.connections[0].readyState;
  console.log("MongoDB connected");
}
