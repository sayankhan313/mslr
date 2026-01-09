import "dotenv/config";
import mongoose from "mongoose";
import { connectToDatabase } from "../lib/db";
import SCC from "../models/SCC";



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
    await connectToDatabase();

    for (const code of SCC_CODES) {
      await SCC.updateOne(
        { code },
        { $setOnInsert: { code, used: false } },
        { upsert: true }
      );
    }

    console.log(" SCC seeded successfully");
  } catch (error) {
    console.error(" SCC seeding failed", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedSCC();
