"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../utils/constants");
const DATABASE_URI = process.env.MONGODB_URI;
if (!DATABASE_URI) {
    throw new Error("MONGODB_URI is not defined");
}
const databaseState = {};
async function connectToDatabase() {
    if (databaseState.isConnected)
        return;
    const connection = await mongoose_1.default.connect(`${DATABASE_URI}/${constants_1.DB_NAME}`, { bufferCommands: false });
    databaseState.isConnected = connection.connections[0].readyState;
    console.log("MongoDB connected");
}
