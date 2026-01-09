"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("../lib/db");
const SCC_1 = __importDefault(require("../models/SCC"));
const SCC_CODES = [
    "1AZN0FXJVM",
    "JOV50TOSYR",
    "SDUBJ5IOYB",
    "YFUVLYBQZR",
    "IGBQET8OOY",
    "R2ZHBUYO2V",
    "Z9HOC1LF4X",
    "9IJKHGHJK4",
    "N5J53QK9FO",
    "ZDN06T01V9",
    "4XRDN9O4AW",
    "921664ML8D",
    "A546AKU16A",
    "V0GB2G690L",
    "12EOU5RGVX",
    "0IXYCAH8UW",
    "GKJ3K1YBGE",
    "46HJV9KH1F",
    "S6K3AV3IVR",
    "IKKSZYJTSH",
];
async function seedSCC() {
    try {
        await (0, db_1.connectToDatabase)();
        for (const code of SCC_CODES) {
            await SCC_1.default.updateOne({ code }, { $setOnInsert: { code, used: false } }, { upsert: true });
        }
        console.log(" SCC seeded successfully");
    }
    catch (error) {
        console.error(" SCC seeding failed", error);
    }
    finally {
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
}
seedSCC();
